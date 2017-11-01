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
                                    <quill-editor v-model="formValidate.comment"
                                                  ref="myQuillEditor">
                                    </quill-editor>
                                </FormItem>
                                <FormItem>
                                    <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                                    <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
                                </FormItem>
                            </Form>
                        </Modal>
                    </div>
                </Col>
            </Row>
        </div>
    </div>
</template>


<script>

    import Base from '../../common/base';

    export default {
        mixins:[Base],
        data(){
            return {
                filter:{
                    title:''
                },
                dataTree: [],
                module: 'news',
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
            this.$http.get('http://localhost:3000/cate/list')
                .then(res => {
                    this.dataTree = res.data;
                });
        },
        methods:{
            selectionNode(node){
                this.typeValue = node[0].typeValue;
                this.filter.typeValue = node[0].typeValue;
                this.getData();
                console.log(this.filter);
            },
            getTypeValue(){
//                if (this.typeValue<1) {
//                    this.$Notice.error({
//                        title: '通知',
//                        desc: '请选择分类'
//                    });
//                    return false
//                }else{
//                    return true
//                };
                console.log(1);
            }
        }
    }
</script>