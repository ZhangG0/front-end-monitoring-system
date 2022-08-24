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
    <div v-big="num" />
    <div ref="numRef">
      {{ num }}
    </div>
  </div>
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
  },
  beforeCreate(){
    console.log("beforeCreate",this.num);
  },
  created() {
    console.log("created",this.num);
    this.a()
  },
  beforeMount(){
    console.log(this.$refs.numRef);
    
  },
  methods:{
    a(){
      console.log(2222);
    }
  },
};
</script>

<style lang="scss" scoped>
</style>