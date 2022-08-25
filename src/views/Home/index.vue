<template>
  <el-card>
    <h2>欢迎来到，前端监控平台</h2>
    <p>本监控旨在监控业务项目的前端错误问题，性能为题，接口问题，以及用户习惯等，为的是使前端功能稳定</p>
    <h1>注意事项</h1>
    <ol>
      <li>
        在页面无切换的情况下，在为了用户体验和必要性的综合考虑下，我们的数据将会五分钟刷新一次最新数据并展示。
      </li>
      <li>展示图表右上方百分比仅表示今日属于与对比数据的差距，其颜色不做好与坏的心理暗示。</li>
      <li>因时间原因，我们并没有完成我们心里的百分百完美，但是此监控已可部署到应用进行前端的监控能够及时抓住错误趋势，我们此后将会持续增加更新功能。</li>
    </ol>
  </el-card>
</template>

<script>
export default {
  directives:{
    big(element,bing){
      const {value} = bing
      element.innerText = value * 20
    }
  },
  data() {
    return {
      num:20,
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
  }
};
</script>

<style lang="scss" scoped>
</style>
