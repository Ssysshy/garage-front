<template>
  <div> 
    <div class="rateBox">
      <p class="title">车位占用情况</p>
      <Circle :percent="parkRate" class="parkRate">
        <span class="demo-circle-inner" style="font-size:24px">{{parkRate}}%</span>
      </Circle>
    </div>
    <Table :columns="columns1" :data="data1"></Table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      parkRate: 0,
      deadLine: 14400 /*四个小时的停车时间限制*/,
      percentLine: {
        line0: 0,
        line1: 0,
        line2: 0,
        line3: 0,
        line4: 0,
        line5: 0,
        line6: 0,
        line7: 0
      },
      columns1: [
        {
          title: "Name",
          key: "name"
        },
        {
          title: "Age",
          key: "age"
        },
        {
          title: "Address",
          key: "address"
        },
        {
          title: "Date",
          key: "date"
        }
      ],
      data1: [
        {
          name: "John Brown",
          age: 18,
          address: "New York No. 1 Lake Park",
          date: "2016-10-03"
        },
        {
          name: "Jim Green",
          age: 24,
          address: "London No. 1 Lake Park",
          date: "2016-10-01"
        },
        {
          name: "Joe Black",
          age: 30,
          address: "Sydney No. 1 Lake Park",
          date: "2016-10-02"
        },
        {
          name: "Jon Snow",
          age: 26,
          address: "Ottawa No. 2 Lake Park",
          date: "2016-10-04"
        }
      ]
    };
  }
};
</script>

<style>
.rateBox {
  width: 100%;
  height: 200px;
  text-align: center;
}
.parkRate {
  margin: 0px auto;
}
.title{
  text-align: center;
  font-size: 28px;
  line-height: 60px;
}
</style>
