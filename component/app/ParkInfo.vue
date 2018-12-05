<template>
  <div class="parkinfo">
    <div class="rateBox">
      <p class="title">第 <span style="color: #FF0000">{{ focusAim }}</span> 车位剩余时间</p>
      <count-down class="countDown" :data-diff="deadTime" ref="count"></count-down>
      <!--<button @click="chuangjian">chuangjian</button>-->
    </div>
    <Table :columns="columns1" :data="filter.list" @on-row-click="checkTime"></Table>
    <Modal
      v-model="modalSet"
      title="请输入占用时间（小时）"
      @on-ok="ok"
      @on-cancel="cancel">
      <Input v-model="value" placeholder="请输入占用时间……" style="width: 300px"></Input>
    </Modal>
  </div>
</template>

<script>

import CountDown from 'component/common/countDown.vue';
import Base from 'framework/vue/common/base';
import moment from 'moment';

export default {
  mixins: [Base],
  data() {
    return {
      modalSet: false,
      value: 0,
      module: 'occupy',
      deadTime: '00:00:00',
      focusAim: 'X',
      params: {},
      _id: '',
      columns1: [
        {
          title: '车位编号',
          key: 'number',
          align: 'center'
        },
        {
          title: '占用情况',
          key: 'occupy',
          align: 'center'
        },
        {
          title: '重置时间',
          key: 'action',
          align: 'center',
          render: (h, params) => {
            return h('div', [
              h('Button', {
                props: {
                  type: 'primary',
                },
                style: {
                  marginRight: '5px'
                },
                on: {
                  click: () => {
                    this.setTime(params.row._id, params);
                  }
                }
              }, '创建占用时间'),
              h('Button', {
                props: {
                  type: 'primary',
                },
                on: {
                  click: () => {
                    this.oneTime(params.row._id, params);
                  }
                }
              }, '重置占用情况')
            ]);
          }
        }
      ],
    };
  },
  components: {
    'count-down': CountDown,
  },
  methods: {
    checkTime(index) {
      this.getData();
      this.deadTime = index.deadtime;
      this.focusAim = index.number;
      this.$refs.count.initTime(this.deadTime)
    },
    setTime(_id, params) {
      this.modalSet = true;
      this.params = params;
      this._id = _id;
    },
    oneTime(_id, params) {
      if (params.row.lasttime === 0) {
        this.$Message.success('已空置，无需清零');
        return;
      } else {
        const data = {
          number: params.row.number,
          lasttime: 0,
          date: new Date().getTime(),
        };
        this.$http.put(`http://localhost:3000/occupy/data/${_id}`, data)
          .then(res => {
            this.getData();
            this.$Message.success('设置占用成功!');
            this.modal = false;
          });
      }
    },
    // chuangjian() {
    //   const data = {
    //     number: 5,
    //     lasttime: 4
    //   };
    //   this.$http.post(`http://localhost:3000/occupy/data`, data)
    //     .then(res => {
    //       this.getData();
    //       this.$Message.success('设置占用成功!');
    //       this.modal = false;
    //     });
    // },
    ok () {
      const data = {
        number: this.params.row.number,
        lasttime: this.value,
        date: new Date().getTime(),
      };
      this.$http.put(`http://localhost:3000/occupy/data/${this._id}`, data)
        .then(res => {
          this.getData();
          this.$Message.success('设置占用成功!');
          this.modal = false;
        });
    },
    cancel () {
      this.$Message.info('Clicked cancel');
    }
  },
  mounted() {

  },
};
</script>

<style lang="less">

.parkinfo{
  .rateBox {
    width: 100%;
    height: 200px;
    text-align: center;
  }
  .title{
    text-align: center;
    font-size: 28px;
    line-height: 60px;
  }
  .countDown{
    position: relative;
    top: 20px;
  }
}

</style>
