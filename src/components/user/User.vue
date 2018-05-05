<template>
    <div>
        <Input v-model="filter.name" style="padding: 5px">
            <Button slot="prepend" @click="onAdd">添加记录</Button>
            <Button slot="prepend" @click="onDeletes">删除所选记录</Button>
            <Button slot="append" icon="ios-search" @click="onSearch"></Button>
        </Input>
        <Table border :columns="columns"
               :data="filter.list"
               @on-selection-change="onSelectionChange"
        ></Table>
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
                @on-cancel="cancel">
            <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
                <FormItem label="姓名" prop="name">
                    <Input v-model="formValidate.name" placeholder="请输入姓名"></Input>
                </FormItem>
                <FormItem label="密码" prop="password">
                    <Input v-model="formValidate.password" placeholder="请输入密码"></Input>
                </FormItem>
                <FormItem label="注册车辆信息" prop="carInfo">
                    <Input v-model="formValidate.carInfo" placeholder="请输入车辆信息"></Input>
                </FormItem>
                <FormItem label="车主性别" prop="gender">
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
    import Base from '../../common/base';
    export default {
        mixins:[Base],
        data () {
            return {
                module:'users',
                columns: [
                    {
                        type: 'selection',
                        width: 60,
                        align: 'center'
                    },
                    {
                        title: '用户名',
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
                        title: '登陆密码',
                        key: 'password'
                    },
                    {
                        title: '性别',
                        key: 'gender'
                    },
                    {
                        title: '注册车辆信息',
                        key: 'carInfo'
                    },
                    {
                        title: '注册时间',
                        key: 'date',
                        width: 160
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
                formValidate: {
                    name: '',
                    password: '',
                    gender: '',
                    carInfo:''
                },
                ruleValidate: {
                    name: [
                        {required: true, message: '姓名不能为空', trigger: 'blur'}
                    ],
                    mail: [
                        {required: true, message: '密码不能为空', trigger: 'blur'},
                    ],
                    gender: [
                        {required: true, message: '请选择性别', trigger: 'change'}
                    ],
                    carInfo: [
                        {required: true, message: '车辆信息不能为空', trigger: 'blur'}
                    ],
                }
            }
        },
    }
</script>