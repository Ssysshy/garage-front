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
    }
</script>