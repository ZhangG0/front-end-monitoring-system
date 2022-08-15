import * as lodash from "@/utils/lodash"
export default {
  name:"Echarts",
  data() {
    return {
      times:'前一周',
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
  watch:{
    echartOption:{
      handler(){
        this.echartsInit()
      }
    },
    times:{
      handler(){
        this.getBeforeWeek()
      }
    }
  },
  computed: {
    
  },
  created() {
    this.$bus.$on('changeTimes',(e)=>{
      this.times = e
    })
  },
  mounted() {
    this.getBeforeWeek()
    this.echartsInit()
    this.initEvent()
  },
  methods: {
    getBeforeWeek() {
      switch (this.times) {
        case '前一周':
          this.beforeWeek = this.$dayjs().subtract(1, 'week').format('YYYY-MM-DD');
          break;
        case '前二周':
          this.beforeWeek = this.$dayjs().subtract(2, 'week').format('YYYY-MM-DD');
          break;
          case '前一天':
          this.beforeWeek = this.$dayjs().subtract(1, 'day').format('YYYY-MM-DD');
          break;
      }
     
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