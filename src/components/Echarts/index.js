import * as lodash from "@/utils/lodash"
export default {
  name:"Echarts",
  data() {
    return {
      beforeWeek: undefined,
      myEcharts:undefined
    }
  },
  props: {
    width: Number,
    height: Number, 
    echartOption:{
      type:Object,
      default:{}
    },
    titleName:String,
    titleDate:{
      type:Number,
      default:0
    }
  },
  computed: {
    
  },
  mounted() {
    this.getBeforeWeek()
    this.echartsInit()
    this.initEvent()
  },
  methods: {
    getBeforeWeek() {
      this.beforeWeek = this.$dayjs().subtract(1, 'week').format('YYYY-MM-DD');
    },
    echartsInit(){
     
      this.$nextTick(() => {
        if(this.myEcharts){
          this.myEcharts.clear()
        }
        this.myEcharts = this.$echarts.init(this.$refs.echarts)
        this.myEcharts.resize()
        this.myEcharts.setOption(this.echartOption)
      })

    },
    //自适应
    initEvent(){
      let resiazCall = lodash.throttle(this.echartsInit,200)
      window.addEventListener('resize', resiazCall)
     
    }
   
  },
}