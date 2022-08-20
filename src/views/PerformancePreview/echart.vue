<template>
  <div>
    <Echarts
      :width="500"
      :height="400"
      :title-name="titleName"
      :title-date="titleDate"
      :echart-option="option"
      :day="day"
      times="较前一周"
    >
      <template #explain>
        <slot name="explain" />
      </template>
    </Echarts>
  </div>
</template>

<script>
import dayjs from "dayjs";

// 计算上周七天的坐标轴
let weekAxis = [];
for (let i = 1; i <= 7; i++) {
  weekAxis.unshift(dayjs().subtract(i, "d").format("MM-DD"));
}

// 计算今日坐标轴
let todayAxis = [];

// TODO 到时候上线记得改成new Date()
let nowHour = new Date().getHours();

for (let i = 0; i <= nowHour; i++) {
  todayAxis.push(i + ":00");
}

// Echarts要用到的颜色
const colors = ["#AEBDEE", "#FF9724"];

// 传给Echarts左上角的day
let myDay = dayjs().subtract(1, "week").format("YYYY-MM-DD");
console.log(myDay);

export default {
  props: {
    titleName: {
      type: String,
      default: "null",
    },
    titleDate: {
      type: Number,
      default: 0,
    },
    week: Array,
    today: Array,
  },
  data() {
    return {
      // 传给Echarts的day
      day: myDay,
    };
  },
  computed: {
    option() {
      return {
        color: colors,
        tooltip: {
          trigger: "none",
          axisPointer: {
            type: "cross",
          },
        },
        legend: {},
        grid: {
          top: 70,
          bottom: 50,
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false, // 坐标轴两边不留白，才能保持两条线左右始终对齐
            axisLine: {
              onZero: false,
              lineStyle: {
                color: colors[1],
              },
            },
            // 橙线提示
            axisPointer: {
              label: {
                formatter: function (params) {
                  let left = params.value.match(/(\S*):00/)[1] - 0;
                  let right =
                    // TODO 到时候上线记得改成new Date()"1995-12-17T13:24:00"
                    left + 1 > new Date().getHours()
                      ? "现在"
                      : `${left + 1}:00`;

                  // let left = mid - 2 < 0 ? mid : mid - 2;
                  // let right = mid + 2 > 24 ? mid : mid + 2;
                  return (
                    params.value +
                    "-" +
                    right +
                    " 平均值" +
                    (params.seriesData.length
                      ? "：" + params.seriesData[0].data
                      : "")
                  );
                },
              },
            },
            // 底部橙色X坐标轴
            data: todayAxis,
          },
          {
            type: "category",
            boundaryGap: false,
            axisLine: {
              onZero: false,
              lineStyle: {
                color: colors[0],
              },
            },
            // 蓝线提示
            axisPointer: {
              label: {
                formatter: function (params) {
                  return (
                    params.value +
                    " 平均值" +
                    (params.seriesData.length
                      ? "：" + params.seriesData[0].data
                      : "")
                  );
                },
              },
            },
            // 顶部蓝色X坐标轴
            data: weekAxis,
          },
        ],
        yAxis: [
          {
            type: "value",
          },
        ],
        series: [
          {
            name: "一周前",
            type: "line",
            xAxisIndex: 1,
            smooth: true,
            emphasis: {
              focus: "series",
            },
            // 蓝线的值(一周前)
            data: this.week,
            // 填充渐变
            areaStyle: {
              normal: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 1,
                  x2: 0,
                  y2: 0,
                  colorStops: [
                    {
                      offset: 0,
                      color: "white",
                    },
                    {
                      offset: 1,
                      color: colors[0],
                    },
                  ],
                  global: false,
                },
              },
            },
          },
          {
            name: "今日",
            type: "line",
            smooth: true,
            emphasis: {
              focus: "series",
            },
            // 橙线的值(今日)
            data: this.today,
            // 填充渐变
            areaStyle: {
              normal: {
                color: {
                  type: "linear",
                  x: 0,
                  y: 1,
                  x2: 0,
                  y2: 0,
                  colorStops: [
                    {
                      offset: 0,
                      color: "white",
                    },
                    {
                      offset: 1,
                      color: colors[1],
                    },
                  ],
                  global: false,
                },
              },
            },
          },
        ],
      };
    },
  },
};
</script>

<style lang="scss" scoped></style>
