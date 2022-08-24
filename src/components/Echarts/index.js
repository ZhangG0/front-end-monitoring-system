import * as lodash from '@/utils/lodash'
export default {
  name: 'Echarts',
  data() {
    return {
      myEcharts: undefined,
    }
  },
  props: {
    width: Number,
    height: Number,
    titleName: {
      type: String,
      default: 'titleName',
    },
    titleDate: {
      type: Number,
      default: 0,
    },
    day: {
      type: String,
      default: 'day',
    },
    times: {
      type: String,
      default: 'times',
    },
    echartOption: {
      type: Object,
      default: () => {},
    },
  },
  watch: {
    echartOption: {
      handler() {
        this.echartsInit()
      },
      deep:true//考虑到更新option下的子属性
    },
  },
  computed: {},
  mounted() {
    this.echartsInit()
    this.initEvent()
  },
  methods: {
    echartsInit() {
      this.$nextTick(() => {
        if (this.myEcharts) {
          this.myEcharts.clear()
        }
        this.myEcharts = this.$echarts.init(this.$refs.echarts)
        this.myEcharts.resize()
        this.myEcharts.setOption(this.echartOption)
      })
    },
    //自适应
    initEvent() {
      let resiazCall = lodash.throttle(this.echartsInit, 200)
      window.addEventListener('resize', resiazCall)
    },
  },
}
