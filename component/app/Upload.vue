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
          <div>
            <Upload
              multiple
              type="drag"
              name="avatar"
              :action='uploadUrl'
              :before-upload="getTypeValue"
              :on-success="reGet"
            >
              <div style="padding: 20px 0">
                <Icon type="ios-cloud-upload" size="52" style="color: #3399ff"></Icon>
                <p>点击或将文件拖拽到这里上传</p>
                <p>上传前点击想要上传的分类</p>
              </div>
            </Upload>
          </div>
          <div style="margin-top: 10px">
            <Input style="padding: 5px" v-model="filter.originalname">
            <Button slot="prepend" @click="onDeletes">删除所选记录</Button>
            <Button slot="append" icon="ios-search" @click="onSearch"></Button>
            </Input>
            <Table border :columns="columns"
                   :data="this.filter.list"
                   @on-selection-change="onSelectionChange"
                   highlight-row
                   @on-current-change="onRowClick">

            </Table>
            <Page :total="filter.total" size="small"
                  show-elevator
                  show-sizer
                  show-total
                  style="padding:5px"
                  @on-change="onChangePage"

                  @on-page-size-change="onChangePageSize"
            ></Page>
          </div>
        </div>
        </Col>
      </Row>
    </div>
  </div>
</template>

<script>
  import Base from 'framework/vue/common/base';

  export default {
    mixins: [Base],
    props: {
      newsSrc: {
        type: Object,
        required: false
      }

    },
    data() {
      return {
        thumb: {},
        filter: {
          originalname: '',
          typeValue: 0,
          cateId: ''
        },
        mixins: [Base],
        dataTree: [],
        ids: [],
        module: 'upload',
        typeValue: 0,
        uploadUrl: 'http://localhost:3000/upload/uploadfile',
        columns: [
          {
            type: 'selection',
            width: 60,
            align: 'center'
          },
          {
            title: '文件名',
            key: 'originalname'
          },
          {
            title: '文件类型',
            key: 'mimetype'
          },
          {
            title: '路径',
            key: 'path'
          },
          {
            title: '上传时间',
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
                      this.show(params.index);
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
        data: []
      };
    },
    created() {
      this.$http.get('http://localhost:3000/cate/list')
        .then(res => {
          this.dataTree = res.data;
        });
    },
    methods: {
      selectionNode(node) {
        var vm = this;
        this.typeValue = node[0].typeValue;
        this.filter.typeValue = node[0].typeValue;
        this.filter.cateId = node[0]._id;

        this.uploadUrl = 'http://localhost:3000/upload/uploadfile/' + this.filter.cateId;

        this.$http.post('http://localhost:3000/cate/findids', { id: this.filter.cateId })
          .then(res => {
            this.ids = res.data;
            vm.$http.post('http://localhost:3000/upload/list', { ids: this.ids })
              .then(resq => {
                this.filter.list = resq.data.rows;
                this.filter.page = resq.data.page;
                this.filter.total = resq.data.total;
              });
          });
      },
      show(index) {
        this.$Modal.info({
          title: '记录信息',
          content: `文件名：${this.filter.list[index].originalname}<br>文件类型：${this.filter.list[index].mimetype}<br>上传时间：${this.filter.list[index].date}`
        });
      },
      getTypeValue() {
        if (this.typeValue < 1) {
          this.$Notice.error({
            title: '通知',
            desc: '请选择分类'
          });
          return false;
        } else {
          return true;
        }
        ;
      },
      reGet() {
        this.$http.post('http://localhost:3000/upload/list', { ids: this.ids })
          .then(resq => {
            this.filter.list = resq.data.rows;
            this.filter.page = resq.data.page;
            this.filter.total = resq.data.total;
          });
      },
      onRowClick(node) {
        this.thumb = node;
        this.$emit('srcWasEdited', this.thumb);
      }
    }
  };
</script>
