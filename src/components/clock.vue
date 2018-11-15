<template>
    <div class='clock'>
        <div class="meridiem-area">
            <div class="theme-line-top"></div>
            <span class="meridiem-text">{{ timeObj.meridiem }}</span>
        </div>
        <div class="time-area">
            <div class="theme-line-top"></div>
            <span class="time-text">{{ timeObj.time }}</span>
        </div>
        <div class="date-area">
            <div class="theme-line-top"></div>
            <h6 class="date-text">{{ timeObj.date }}</h6>
            <h5 class="weekday-text">{{ timeObj.weekday }}</h5>
        </div>
    </div>
</template>

<script lang='ts'>
import Vue from "vue";
import moment from "moment";

export default Vue.extend({
  name: "clock",
  data() {
    return {
      timeObj: {
        meridiem: "AM",
        time: "10:00",
        date: "2018/11/15",
        weekday: "Thursday"
      }
    };
  },
  methods: {
    /** 刷新畫面顯示時間 */
    refreshTime() {
      const currentTime = moment();
      this.timeObj = {
        meridiem: currentTime.format("a").toUpperCase(),
        time: currentTime.format("hh:mm"),
        date: currentTime.format("YYYY/MM/DD"),
        weekday: currentTime.format("dddd")
      };
      setTimeout(() => {
        this.refreshTime();
      }, 500);
    }
  },
  created() {
    this.refreshTime();
  }
});
</script>

<!-- Add 'scoped' attribute to limit CSS to this component only -->
<style scoped lang='less'>
.area-background() {
  height: 80px;
  position: relative;
  background-color: rgba(64, 64, 64, 0.6);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  transition: background-color 0.3s, color 0.3s;
  -webkit-transition: background-color 0.3s, color 0.3s;
  &:hover {
    background-color: transparent;
  }
}
.theme-text() {
  color: #cbe6ff;
  text-shadow: 0em 0em 0.3em #1870c7, 0em 0em 0.1em #cbe6ff;
}
.clock {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  .meridiem-area {
    .area-background();
    width: 110px;
    .meridiem-text {
      font-size: 32px;
      .theme-text();
    }
  }
  .time-area {
    .area-background();
    width: 130px;
    .time-text {
      font-size: 32px;
      .theme-text();
    }
  }
  .date-area {
    .area-background();
    width: 150px;
    .date-text {
      margin-top: 2px;
      font-size: 16px;
      .theme-text();
    }
    .weekday-text {
      font-size: 20px;
      .theme-text();
    }
  }
}
.theme-line-top {
  position: absolute;
  top: 2px;
  width: 100%;
  height: 6px;
  background-color: #004489;
}
</style>
