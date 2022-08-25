export default {
    data() {
        return {
            date: [],
            PvOptionData: [],
            UvOptionData: [],
            dataGroups: [
                { title: "网页量(UV)", number: 0, percent: 0 },
                { title: "页面量(PV)", number: 0, percent: 0 },
                { title: "用户停留时间", number: 0, percent: 0 },
            ],
            PvData: [],
            UvData: [],
            today: undefined,
            pageStopArr:[]
        };
    },
    created() {

    },
    mounted() {
        this.today = this.$dayjs().format("YYYY-MM-DD")
        for (let i = 0; i < 7; i++) {
            this.date.push(this.$dayjs(new Date().getTime() - (86400000 * (i))).format('MM-DD'));
        }
        this.getUvOrPv();
        this.getPageStopTime()
    },
    computed: {
        PvOption() {
            return {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: this.date,
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: 'Direct',
                        type: 'bar',
                        barWidth: '60%',
                        data: this.PvOptionData
                    }
                ]
            };
        },
        UvOption() {
            return {
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {
                        type: 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: [
                    {
                        type: 'category',
                        data: this.date,
                        axisTick: {
                            alignWithLabel: true
                        }
                    }
                ],
                yAxis: [
                    {
                        type: 'value'
                    }
                ],
                series: [
                    {
                        name: 'Direct',
                        type: 'bar',
                        barWidth: '60%',
                        data: this.UvOptionData
                    }
                ]
            };
        },
        option(){
            return function(data){
                return{
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: this.date,
                            axisTick: {
                                alignWithLabel: true
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: 'Direct',
                            type: 'bar',
                            barWidth: '60%',
                            data:data
                        }
                    ]
                };
            }
        }


    },
    methods: {
        async getUvOrPv() {
            let { status, data } = await this.$api.getUvOrPv();
            if (status === 200) {
                console.log('开始执行');
                let arr = ['today','one','two','thr','fou','fiv']
                for (let i in data) {
                    arr.forEach(item => {
                        if(item === i){
                            this.PvOptionData.push( (data[i][0] ? data[i][0].userbehaviorPv : 0));
                            this.UvOptionData.push( (data[i][0] ? data[i][0].userbehaviorUv : 0));
                        }
                    })
                    this.PvData.push({ [i]: data[i][0]?.userbehaviorPv });
                    this.UvData.push({ [i]: data[i][0]?.userbehaviorUv });
                }
                let indexPv = this.PvData.findIndex((item) => {
                    if (JSON.parse(JSON.stringify(item)).today) {
                        return item;
                    }
                });
                let indexUv = this.UvData.findIndex((item) => {
                    if (item.today) {
                        return item;
                    }
                });
                //昨天indexPv
                let indexPvAfter = this.PvData.findIndex((item) => {
                    if (item.one) {
                        return item;
                    }
                });
                //昨天indexUv
                let indexUvAfter = this.UvData.findIndex((item) => {
                    if (item.one) {
                        return item;
                    }
                });
                this.dataGroups[1].number =
                    indexPv !== -1 ? this.PvData[indexPv]["today"] : 0;
                this.dataGroups[0].number =
                    indexUv !== -1 ? this.UvData[indexUv]["today"] : 0;

                //pv比较昨天
                if (indexPv === -1 && indexPvAfter === -1) {
                    this.dataGroups[1].percent = 0.0;
                } else if (indexPv !== -1 && indexPvAfter === -1) {
                    this.dataGroups[1].percent = 100;
                } else if (indexPv === -1 && indexPvAfter !== -1) {
                    this.dataGroups[1].percent = -100;
                } else {
                    this.dataGroups[1].percent =
                        Math.floor(
                            ((this.PvData[indexPv]["today"] -
                                this.PvData[indexPvAfter]["one"]) /
                                this.PvData[indexPvAfter]["one"]) *
                            10000
                        ) / 100;
                }
                //UV比较昨天
                if (indexUv === -1 && indexUvAfter === -1) {
                    this.dataGroups[0].percent = 0.0;
                } else if (indexUv !== -1 && indexUvAfter === -1) {
                    this.dataGroups[0].percent = 100;
                } else if (indexUv === -1 && indexUvAfter !== -1) {
                    this.dataGroups[0].percent = -100;
                } else {
                    this.dataGroups[0].percent =
                        Math.floor(
                            ((this.UvData[indexUv]["today"] -
                                this.UvData[indexUvAfter]["one"]) /
                                this.UvData[indexUvAfter]["one"]) *
                            10000
                        ) / 100;
                }
            }
        },
        async getPageStopTime(){
            let {status,data} =  await this.$api.getPageStopTime()
            if(status === 200){
                this.pageStopArr = data.page
                let sum = 0
                let sum1= 0
                this.pageStopArr.forEach(item => {
                    item.pageData = item.pageData.split(',').slice(0,7)
                    item.percent = Math.floor((item.pageData[0] - item.pageData[1]) / item.pageData[1] * 10000) /100
                     sum =  this.dataGroups[2].number +=  parseInt(item.pageData[0])
                     sum1 +=  parseInt(item.pageData[1])
                    item.title = `这是${item.page}页面的总访问时间`
                });
                this.dataGroups[2].percent = Math.floor((sum - sum1)/sum1*10000) /100
            }
            
        }
    },
};