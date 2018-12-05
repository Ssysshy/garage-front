<style lang="less" scoped>

</style>

<template>
  <div class="layout">
    <Input v-model="filter.name" style="padding: 5px">
      <Button slot="prepend" @click="onAdd">添加资源储存</Button>
      <Button slot="prepend" @click="onDeletes">删除所选储存资源</Button>
      <Button slot="append" icon="ios-search" @click="onSearch"></Button>
    </Input>

    <Table border :columns="columns"
           :data="filter.list"
           @on-selection-change="onSelectionChange"></Table>

    <Page :total="filter.total" size="small"
          show-elevator
          show-sizer
          show-total
          style="padding:5px"
          @on-change="onChangePage"
          @on-page-size-change="onChangePageSize"></Page>

    <Modal v-model="modal"
           title="数据操作"
           @on-ok="ok"
           @on-cancel="cancel">
      <Form ref="formValidate" :model="formValidate" :rules="ruleValidate" :label-width="100">
        <FormItem label="资源名称" prop="resourceName">
          <Input v-model="formValidate.resourceName" placeholder="请输入资源名称"></Input>
        </FormItem>
        <FormItem label="网盘地址" prop="resourceUrl">
          <Input v-model="formValidate.resourceUrl" placeholder="请输入资源对应的网盘地址"></Input>
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
  import Base from 'framework/vue/common/base';

  export default {
    name: 'disk',
    mixins: [Base],
    data() {
      return {
        module: 'disk',
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '资源名称',
            key: 'resourceName'
          },
          {
            title: '资源地址',
            key: 'resourceUrl'
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
                      this.show(params);
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
                      this.remove(params.index, params.row._id);
                    }
                  }
                }, '删除')
              ]);
            }
          }
        ],
        formValidate: {
          resourceName: '',
          resourceUrl: '',
        },
        ruleValidate: {
          resourceName: [
            { required: true, message: '资源名称不能为空', trigger: 'blur' }
          ],
          resourceUrl: [
            { required: true, message: '资源地址不能为空', trigger: 'blur' }
          ]
        }
      }
    }
  };
</script>


