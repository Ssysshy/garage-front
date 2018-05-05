<template>
  <div class="parkinfo">
    <div class="rateBox">
      <p class="title">第 <span style="color: #FF0000">{{ focusAim }}</span> 车位剩余时间</p>
      <count-down class="countDown" :data-diff="deadTime" ref="count"></count-down>
    </div>
    <Table :columns="columns1" :data="data1" @on-row-click="checkTime"></Table>
  </div>
</template>

<script>
import CountDown from 'component/common/countDown.vue';

export default {
  data() {
    return {
      deadTime: '12:22:00',
      focusAim: 0,
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
                on: {
                  click: () => {
                    console.log(1);
                  }
                }
              }, '重置占用情况')
            ]);
          }
        }
      ],
      data1: [
        {
          number: 0,
          occupy: '占用',
          deadtime: '12:12:22'
        },
        {
          number: 1,
          occupy: '占用',
          deadtime: '13:13:23'
        },
        {
          number: 2,
          occupy: '占用',
          deadtime: '14:14:14'
        },
        {
          number: 3,
          occupy: '占用',
          deadtime: '15:15:15'
        },
        {
          number: 4,
          occupy: '占用',
          deadtime: '16:16:16'
        },
        {
          number: 5,
          occupy: '占用',
          deadtime: '17:17:17'
        },
      ]
    };
  },
  components: {
    'count-down': CountDown,
  },
  methods: {
    checkTime(index) {
      this.deadTime = index.deadtime;
      this.focusAim = index.number;
      this.$refs.count.initTime(this.deadTime)
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
