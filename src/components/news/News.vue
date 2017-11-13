<style scoped>
    .layout {
        border: 1px solid #d7dde4;
        background: #f5f7f9;
    }

    .layout-content {
        min-height: 200px;
        margin: 15px;
        overflow: hidden;
        background: #fff;
        border-radius: 4px;
    }

    .layout-content-main {
        padding: 10px;
    }
</style>
<template>
    <div class="layout">
        <div class="layout-content">
            <Row>
                <Col span="5" style="width: 150px;">
                    <Tree :data="dataTree" @on-select-change="selectionNode"></Tree>
                </Col>
                <Col span="19" style="border-left: 1px solid #ccc;margin: 5px;min-height: 200px">
                    <div class="layout-content-main">
                        <Input style="padding: 5px" v-model="filter.title">
                            <Button slot="prepend" @click="onAdd">添加记录</Button>
                            <Button slot="prepend" @click="onDeletes">删除所选记录</Button>
                            <Button slot="append" icon="ios-search" @click="onSearch"></Button>
                        </Input>
                        <Table border :columns="columns" :data="this.filter.list" @on-selection-change="onSelectionChange"></Table>
                        <Page :total="filter.total" size="small"
                              show-elevator
                              show-sizer
                              show-total
                              style="padding:5px"
                              @on-change="onChangePage"
                              @on-page-size-change="onChangePageSize"
                        ></Page>
                        <Modal
                                v-model="modal"
                                title="数据操作"
                                @on-ok="ok"
                                @on-cancel="cancel"
                        >
                            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                                <FormItem label="新闻标题" prop="title">
                                    <Input v-model="formValidate.title" placeholder="请输入标题"></Input>
                                </FormItem>
                                <FormItem label="新闻内容" prop="content">
                                    <!--<Input v-model="formValidate.content" placeholder="请输入内容"></Input>-->
                                    <quill-editor v-model="formValidate.content"
                                                  ref="myQuillEditor">
                                    </quill-editor>
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" @click="openChoose">选择缩略图</Button>
                                    <img :src="src" alt="暂无上传图片.jpg" style="width: 80px;height: 50px">
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                                    <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
                                </FormItem>
                            </Form>
                        </Modal>
                        <Modal
                                title="对话框标题"
                                v-model="modalChoose"
                                :styles="{top: '20px',width:'1000px'}"
                                @on-ok="showSrc"
                        >
                            <!--调用CATE模块-->
                            <app-upload @srcWasEdited="getThumb"></app-upload>
                        </Modal>
                    </div>
                </Col>
            </Row>
        </div>
    </div>
</template>


<script>

    import Base from '../../common/base';
    import Upload from '../upload/Upload.vue';
    import { eventBus } from '../../main';
    export default {
        mixins:[Base],
        components:{
            'app-upload':Upload
        },
        data(){
            return {
                filter:{
                    title:'',
                    thumb:{},
                    cateId:''
                },
                dataTree: [],
                srcObject:{},
                src:'',
                module: 'news',
                modalChoose: false,
                typeValue: 0,
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: 'ID',
                        key: '_id',
                    },
                    {
                        title: '标题名',
                        key: 'title'
                    },
                    {
                        title: '上传时间',
                        key: 'date'
                    },
                    {
                        title: '评论数',
                        key: 'CommentNum'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 180,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.show(params)
                                        }
                                    }
                                }, '查看'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index, params.row._id)
                                        }
                                    }
                                }, '删除'),
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.$router.push({ name: 'comment',params:{newsId:params.row._id}})
//                                            router.push({ name: 'user', params: { userId: 123 }})
//                                             带查询参数，变成 /register?plan=private
//                                            router.push({ path: 'register', query: { plan: 'private' }})
                                        }
                                    }
                                }, '评论')
                            ]);
                        }
                    }
                ],
                data: [],
                formValidate: {
                    title: '',
                    content: '',
                    thumb:{},
                    cateId:''
                },
                ruleValidate: {
                    title: [
                        {required: true, message: '标题不能为空', trigger: 'blur'}
                    ],
                    content: [
                        {required: true, message: '内容不能为空', trigger: 'blur'},
                    ],
                }
            }
        },
        created(){
             this.$http.post('http://localhost:3000/cate/device',{typeValue:2})
                .then(res => {
                    this.data = res.data;
                    this.dataTree = res.data;
                })
        },
        methods:{
            reWriteSrc(event){
                this.src = event;
                console.log(this.src);
            },
            selectionNode(node){
                var vm = this;
                this.typeValue = node[0].typeValue;
                this.filter.typeValue = node[0].typeValue;
                this.formValidate.cateId = node[0]._id;
                this.filter.cateId = node[0]._id;
                this.$http.post('http://localhost:3000/cate/findids',{id:this.filter.cateId})
                .then(res=>{
                    var ids = res.data;
                    vm.$http.post('http://localhost:3000/news/list',{ids:ids})
                    .then(resq=>{
                        this.filter.list = resq.data.rows;
                        this.filter.page = resq.data.page;
                        this.filter.total = resq.data.total;
                    })
                })
            },
            openChoose(){
                this.modalChoose = true;
            },
            getThumb(obj){
                console.log(obj);
                this.srcObject = obj;
            },
            showSrc(){
                this.src = 'http://localhost:3000/' +this.srcObject.filename;
                this.formValidate.thumb = this.srcObject;
            }
        }
    }
</script>