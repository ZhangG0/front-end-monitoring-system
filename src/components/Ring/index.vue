<template>
  <div>
    <div
      ref="ringChart"
      class="ringChart"
    />

    <!-- demo  class用来制定宽度和高度-->
    <!-- <ring class="overview_test" color="darkBlue" :data="{value: 83.33}"/> -->
  </div>
</template>

<script>
export default {
  name: "Ring",
  props: {
    //颜色
    color: {
      type: String,
      default() {
        return "blue";
      },
    },
    //数据
    data: {
      type: Number,
      default() {
        return 0;
      },
    },
  },
  data() {
    return {};
  },
  mounted() {
    const option = {
      title: {
        text:this.data+"%",
          // ((this.data.value / (50 + this.data.value)) * 100).toFixed(2) + "%",
        left: "center",
        top: "center",
        textStyle: {
          color: "#595959",
          fontSize: 13,
        },
      },
    //   legend: {
    //     orient: "vertical",
    //     left: "center",
    //     top: "80%",
    //     selectedMode: false,
    //     icon: "none",
    //     formatter: function (sdf) {
    //       return "Legend ";
    //     },
    //   },
      visualMap: {
        show: false,
      },
      series: [
        {
          type: "pie",
          //环形显示饼状图，实际上显示的是50-80之间的部分
          //上限不建议设置为100，echarts自带动画效果，设置为100动画效果很丑
          radius: ["60%", "80%"],
          center: ["50%", "50%"],
          data: [
            //itemStyle是单项的背景颜色设置。
            { value: 100-this.data, itemStyle: { color: "#f1f1f1" } },
            { value: this.data, itemStyle: { color: this.color } },
          ],
          label: {
            //将视觉引导图关闭
            show: false,
          },
          itemStyle: {
            //设置的是每项之间的留白
            borderWidth: 7,
            borderColor: "#fff",
          },
          // 初始化echarts的动画效果
          animation: false,
          silent: true,
        },
      ],
    };
    const chartObj = this.$echarts.init(this.$refs.ringChart);
    chartObj.setOption(option);
  },
};
</script>

<style lang="scss">
.ringChart {
  width: 100%;
  height: 100%;
}
</style>
