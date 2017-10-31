<template>
    <div>

        <Input v-model="filter.name" style="padding: 5px">
        <Button slot="prepend" @click="onAdd">添加记录</Button>
        <Button slot="prepend" @click="onDeletes">删除所选记录</Button>
        <Button slot="append" icon="ios-search" @click="onSearch"></Button>
        </Input>
        <Table border :columns="columns7"
               :data="filter.list"
               @on-selection-change="onSelectionChange"
        ></Table>
        <Page :total="40" size="small"
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
                <FormItem label="姓名" prop="name">
                    <Input v-model="formValidate.name" placeholder="请输入姓名"></Input>
                </FormItem>
                <FormItem label="密码" prop="password">
                    <Input v-model="formValidate.password" placeholder="请输入密码"></Input>
                </FormItem>
                <FormItem label="城市" prop="city">
                    <Select v-model="formValidate.city" placeholder="请选择所在地">
                        <Option value="beijing">北京市</Option>
                        <Option value="shanghai">上海市</Option>
                        <Option value="shenzhen">深圳市</Option>
                        <Option value="ningbo">宁波市</Option>
                        <Option value="hangzhou">杭州市</Option>
                    </Select>
                </FormItem>
                <FormItem label="性别" prop="gender">
                    <RadioGroup v-model="formValidate.gender">
                        <Radio label="male">男</Radio>
                        <Radio label="female">女</Radio>
                    </RadioGroup>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="handleSubmit('formValidate')">提交</Button>
                    <Button type="ghost" @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
                </FormItem>
            </Form>
        </Modal>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                columns7: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '姓名',
                        key: 'name',
                        render: (h, params) => {
                            return h('div', [
                                h('Icon', {
                                    props: {
                                        type: 'person'
                                    }
                                }),
                                h('strong', params.row.name)
                            ]);
                        }
                    },
                    {
                        title: '密码',
                        key: 'password'
                    },
                    {
                        title: '性别',
                        key: 'gender'
                    },
                    {
                        title: '城市',
                        key:'city'
                    },
                    {
                        title: '时间',
                        key: 'date'
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
                                            this.show(params)
                                        }
                                    }
                                }, '查看'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.index, params.row._id)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                ids: [],
                filter: {
                    list: [],
                    total: 0,
                    page: 1,
                    rows: 10,  //每页限制条数
                    name: '',
                    id: ''
                },
                modal: false,


                formValidate: {
                    name: '',
                    password: '',
                    city: '',
                    gender: '',
                },
                ruleValidate: {
                    name: [
                        {required: true, message: '姓名不能为空', trigger: 'blur'}
                    ],
                    mail: [
                        {required: true, message: '密码不能为空', trigger: 'blur'},
                    ],
                    city: [
                        {required: true, message: '请选择城市', trigger: 'change'}
                    ],
                    gender: [
                        {required: true, message: '请选择性别', trigger: 'change'}
                    ],
                }
            }
        },

        methods: {
            onAdd(){
                this.$refs['formValidate'].resetFields();
                delete this.formValidate._id;
                this.modal = true;
            },
            show (params) {
                console.log(params);
                this.modal = true;
                Object.assign(this.$data.formValidate,params.row)
            },
            getData(){
                this.$http.post('http://localhost:3000/users/list', this.filter)
                    .then(res => {
                        this.filter.list = res.data.rows;
                        this.filter.page = res.data.page;
                        this.filter.total = res.data.total;
                    })
            },
            remove (index, id) {

                this.$Modal.confirm({
                    title: '确认删除该条数据',
                    content: '<p>删除将无法恢复</p>',
                    onOk: () => {
                        this.filter.list.splice(index, 1);
//                console.log(id);
                        this.filter.id = id;
                        this.$http.delete('http://localhost:3000/users/data/' + this.filter.id)
                            .then(res => {
                                this.$Message.info('删除成功');
                            })
                    },
                    onCancel: () => {
                        this.$Message.info('取消删除');
                    }
                });

            },
            onChangePage(page){
                console.log(page);
                this.filter.page = page;
                this.getData();
            },
            onChangePageSize(size){

                this.filter.rows = size;
                this.getData();
            },
            onSearch(){
                this.getData();
            },
            onDeletes(){
                if (this.ids && this.ids.length > 0) {
                    this.$Modal.confirm({
                        title: '确认删除该条数据',
                        content: '<p>删除将无法恢复</p>',
                        onOk: () => {
                            this.$http.post('http://localhost:3000/users/deletes', {ids: this.ids.toString()})
                                .then(res => {
                                    this.$Message.info('删除成功');
                                    this.getData();
                                })
                        },
                        onCancel: () => {
                            this.$Message.info('取消删除');
                        }
                    });
                }
                ;
            },
            onSelectionChange(selection){
                if (selection && selection.length > 0) {
                    var ids = [];
                    var leng = selection.length;
                    for (var i = 0; i < leng; i++) {
                        ids.push(selection[i]._id);
                    }
                    ;
                    this.ids = ids;
                }
                ;
            },
            ok () {
                this.$Message.info('确定');
            },
            cancel () {
                this.$Message.info('取消');
            },
            handleSubmit (name) {
                this.$refs[name].validate((valid) => {
                    if (valid) {
                        
                        if (this.formValidate._id && this.formValidate._id.length>0) {
                            this.$http.put('http://localhost:3000/users/data/'+this.formValidate._id,this.formValidate)
                                .then(res=>{
                                    this.getData();
                                    this.$Message.success('修改成功!');
                                    this.modal = false;
                                })
                        }else{
                            this.$http.post('http://localhost:3000/users/data',this.formValidate)
                                .then(res=>{
                                    this.getData();
                                    this.$Message.success('提交成功!');
                                    this.modal = false;
                                })
                        };
                        
                        
                        
                        
                        console.log(this.formValidate);

                    } else {
                        this.$Message.error('表单验证失败!');
                    }
                })
            },
            handleReset (name) {
                this.$refs[name].resetFields();
            }
        },
        created(){
//            console.log(this.filter);
            this.getData();
//            this.$http({
//                url:'http://localhost:3000/users/list',
//                method:'post',
//                data:this.filter
//            }).then(res=>{
//                this.filter.list = res.data.rows;
//            })
        }
    }
</script>