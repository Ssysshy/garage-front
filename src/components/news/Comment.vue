<template>
    <div>
        <Input v-model="filter.comment" style="padding: 5px">
            <Button slot="prepend" @click="onAdd">添加记录</Button>
            <Button slot="prepend" @click="onDeletes">删除所选记录</Button>
            <Button slot="prepend" @click="goNews">返回新闻页</Button>
            <Button slot="append" icon="ios-search" @click="onSearch"></Button>
        </Input>
        <Table border :columns="columns"
               :data="filter.list"
               @on-selection-change="onSelectionChange"
        ></Table>
        <Page :total="this.filter.total" size="small"
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
                @on-cancel="cancel">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="80">
                <FormItem label="评论人" prop="commenter">
                    <Input v-model="formValidate.commenter" placeholder="请输入评论人"></Input>
                </FormItem>
                <FormItem label="评论" prop="comment">
                    <!--<Input v-model="formValidate.comment" placeholder="请输入评论"></Input>-->
                    <quill-editor v-model="formValidate.comment"
                                  ref="myQuillEditor">
                    </quill-editor>
                </FormItem>
                <input type="text" v-model="this.filter.id" style="display: none">
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                    <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>

<script>
    import Base from '../../common/base';
    export default {
        mixins:[Base],
        data () {
            return {
                filter:{
                    comment:'',
                    commenter:'',
                },
                module:'comment',
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '评论人',
                        key: 'commenter'
                    },
                    {
                        title: '评论',
                        key: 'comment'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
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
                                            this.filter.id = params.row.id
                                            this.show(params)
                                        }
                                    }
                                }, '修改'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
//                                            this.remove(params.index, params.row._id)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                formValidate: {
                    comment: '',
                    commenter: '',
                },
                ruleValidate: {
                    commenter: [
                        {required: true, message: '评论人不能为空', trigger: 'blur'}
                    ],
                    comment: [
                        {required: true, message: '评论不能为空', trigger: 'blur'},
                    ],
                }
            }
        },
        created(){
            this.filter.id = this.$route.params.newsId;
        },
        methods:{
            goNews(){
                this.$router.push({ name: 'news'});
            }
        }
    }
</script>