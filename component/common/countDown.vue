<template>
  <span class="time" ref="time">
    <span class="hours">{{this.hourss}}</span>
    :
    <span class="minutes">{{this.minutess}}</span>
    :
    <span class="seconds">{{this.secondss}}</span>
  </span>
</template>

<script>
  export default {
    data() {
      return {
        difftime: '',
        hours: 0,
        minutes: 0,
        seconds: 0,
        times: [],
      };
    },
    components: {},
    computed: {
      minutess() {
        return this.padFront(this.minutes);
      },
      secondss() {
        return this.padFront(this.seconds);
      },
      hourss() {
        return this.padFront(this.hours);
      }
    },
    methods: {
      initTime(time) {
        this.difftime = time || this.$refs.time.dataset.diff;
        clearInterval(this.interval);
        this.times = this.difftime.split(':');
        if (this.times.length < 3) {
          return;
        }
        this.hours = parseInt(this.times[0]);
        this.minutes = parseInt(this.times[1]);
        this.seconds = parseInt(this.times[2]);
        this.setInterval();
      },
      setInterval() {
        this.interval = setInterval(this.reduce.bind(this), 1000);
      },
      reduce() {
        if (this.seconds !== 0) {
          this.seconds--;
        } else if (this.minutes !== 0) {
          this.minutes--;
          this.seconds = 59;
        } else if (this.hours !== 0) {
          this.hours--;
          this.minutes = 59;
          this.seconds = 59;
        } else {
          return;
        }
        if (this.seconds === 0 && this.minutes === 0 && this.hours === 0) {
          clearInterval(this.interval);
          this.$emit('onStop');
        }
      },
      padFront(dom) {
        const sdom = dom.toString();
        let newdom = '';
        if (sdom.length < 2) {
          newdom = '0' + sdom;
        } else {
          newdom = sdom;
        }
        return newdom;
      }
    },
    mounted() {
      this.initTime();
    }
  };
</script>

<style lang='less'>
  .time{
    font-weight: bold;
    color: #333333;
    font-size: 30px;
    span{
      background: #000000;
      color: #FFFFFF;
      padding: 4px;
      border-radius: 2px;
    }
    &.counttime__active{
      color: #FB0628;
    }
  }
</style>
