<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <div class="home">
    <div class="home__title">核心数据</div>
    <div class="top">
      <div class="top__title">流量数据</div>
      <div class="traffic__data">
        <div
          class="traffic__data__item"
          v-for="(item, index) in dataGroups"
          :key="item + index"
        >
          <div class="traffic__data__item__title">{{ item.title }}</div>
          <div class="traffic__data__item__number">{{ item.number }}</div>
          <div class="traffic__data__item__percent">
            较昨日 {{ item.percent }}
          </div>
        </div>
      </div>
    </div>
    <div id="middleChart" :style="{ width: '300px', height: '300px' }"></div>
    <div class="bottom">
      <div class="bottom__chart1" id="chart1"></div>
      <div class="bottom__chart2" id="chart2"></div>
      <div class="bottom__chart3" id="chart3"></div>
    </div>
  </div>
</template>

<script>
import { option1, option2 } from "./variables";
export default {
  name: "Home",
  mounted() {
    this.drawLine();
    this.renderChart1();
    this.renderChart2();
    this.renderChart3();
  },
  data() {
    return {
      dataGroups: [
        { title: "浏览量(PV)", number: "2109832", percent: "16.57%" },
        { title: "浏览量(PV)", number: "2109832", percent: "16.57%" },
        { title: "浏览量(PV)", number: "2109832", percent: "16.57%" },
        { title: "浏览量(PV)", number: "2109832", percent: "16.57%" },
        { title: "浏览量(PV)", number: "2109832", percent: "16.57%" },
        { title: "浏览量(PV)", number: "2109832", percent: "16.57%" },
      ],
    };
  },
  methods: {
    drawLine() {
      let myChart = this.$echarts.init(document.getElementById("middleChart"));
      var option = {
        title: {
          text: "ECharts 入门示例",
        },
        tooltip: {},
        legend: {
          data: ["销量"],
        },
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"],
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20],
          },
        ],
      };

      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    },
    renderChart1() {
      let bottomChart1 = this.$echarts.init(document.getElementById("chart1"));

      let bottomChart3 = this.$echarts.init(document.getElementById("chart3"));

      option1 && bottomChart1.setOption(option1);
    },
    renderChart2() {
      let bottomChart2 = this.$echarts.init(document.getElementById("chart2"));
      let option2 = {
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
        },
        yAxis: {
          type: "value",
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line",
            areaStyle: {},
          },
        ],
      };
      option2 && bottomChart2.setOption(option2);
    },
    renderChart3() {
      let bottomChart3 = this.$echarts.init(document.getElementById("chart3"));

      let base = +new Date(1968, 9, 3);
      let oneDay = 24 * 3600 * 1000;
      let date = [];
      let data = [Math.random() * 300];
      for (let i = 1; i < 20000; i++) {
        var now = new Date((base += oneDay));
        date.push(
          [now.getFullYear(), now.getMonth() + 1, now.getDate()].join("/")
        );
        data.push(Math.round((Math.random() - 0.5) * 20 + data[i - 1]));
      }
      let option = {
        tooltip: {
          trigger: "axis",
          position: function (pt) {
            return [pt[0], "10%"];
          },
        },
        title: {
          left: "center",
          text: "Large Area Chart",
        },
        toolbox: {
          feature: {
            dataZoom: {
              yAxisIndex: "none",
            },
            restore: {},
            saveAsImage: {},
          },
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: date,
        },
        yAxis: {
          type: "value",
          boundaryGap: [0, "100%"],
        },
        dataZoom: [
          {
            type: "inside",
            start: 0,
            end: 10,
          },
          {
            start: 0,
            end: 10,
          },
        ],
        series: [
          {
            name: "Fake Data",
            type: "line",
            symbol: "none",
            sampling: "lttb",
            itemStyle: {
              color: "rgb(255, 70, 131)",
            },
            areaStyle: {
              color: new this.$echarts.graphic.LinearGradient(0, 0, 0, 1, [
                {
                  offset: 0,
                  color: "rgb(255, 158, 68)",
                },
                {
                  offset: 1,
                  color: "rgb(255, 70, 131)",
                },
              ]),
            },
            data: data,
          },
        ],
      };

      option && bottomChart3.setOption(option);
    },
  },
};
</script>

<style lang="scss" scoped>
.home {
  &__title {
    font-size: 18px;
    font-weight: 600;
    color: #434343;
    height: 66px;
    line-height: 66px;
  }

  .top {
    &__title {
      display: inline-block;
      -webkit-box-flex: 1;
      -ms-flex: 1;
      flex: 1;
      padding-bottom: 16px;
      overflow: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }

    .traffic__data {
      display: flex;
      &__item {
        padding: 0 8px 8px 8px;
        &__title {
          font-size: 13px;
          color: #666;
        }
        &__number {
          font-size: 30px;
          color: #363b52;
        }
      }
    }
  }

  .bottom {
    display: flex;

    &__chart1 {
      width: 300px;
      height: 200px;
    }
    &__chart2 {
      width: 300px;
      height: 200px;
    }
    &__chart3 {
      width: 300px;
      height: 200px;
    }
  }
}
</style>