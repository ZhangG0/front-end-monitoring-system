<template>
  <div>
    <Echarts
      :width="500"
      :height="500"
      :echart-option="echartOption"
      :title-date="0.9"
      title-name="我"
    >
      <div slot="explain">
        提示文字1111111111111111111111111111111111111111111111
      </div>
    </Echarts>
    <Echarts
      :width="500"
      :height="500"
      :echart-option="echartOption"
      :title-date="0.9"
      title-name="我"
    >
      <div slot="explain">
        提示文字
      </div>
    </Echarts>
  </div>
</template>

<script>
export default {
  data() {
    return {
      echartOption: {
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
      },
    };
  },
};
</script>

<style lang="scss" scoped>
</style>