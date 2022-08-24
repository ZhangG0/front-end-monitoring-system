import {PvOption} from './echarts'
export default {
    data() {
        return {
            PvOption:PvOption,
            dataGroups: [
                { title: "网页量(UV)", number: 0, percent: 0 },
                { title: "页面量(PV)", number: 0, percent: 0 },
                { title: "用户停留时间", number: 0, percent: 0 },
            ],
            PvData: [],
            UvData: [],
            today:undefined
        };
    },

    mounted() {
        this.today = this.$dayjs().format("YYYY-MM-DD")
        this.getUvOrPv();
    },
    methods: {
        async getUvOrPv() {
            let { status, data } = await this.$api.getUvOrPv();
            if (status === 200) {
                console.log('开始执行');
                for (let i in data) {
                    switch (i) {
                        case 'one':
                            this.PvOption.series[0].data[0] = (data[i][0] ? data[i][0].userbehaviorPv : 0);
                            break
                        case 'two':
                            this.PvOption.series[0].data[1] = (data[i][0] ? data[i][0].userbehaviorPv : 0)
                            break
                        case 'thr':
                            this.PvOption.series[0].data[2] = (data[i][0] ? data[i][0].userbehaviorPv : 0)
                            break
                        case 'fou':
                            this.PvOption.series[0].data[3] = (data[i][0] ? data[i][0].userbehaviorPv : 0)
                            break
                        case 'fiv':
                            this.PvOption.series[0].data[4] = (data[i][0] ? data[i][0].userbehaviorPv : 0)
                            break
                        case 'six':
                            this.PvOption.series[0].data[5] = (data[i][0] ? data[i][0].userbehaviorPv : 0)
                    }
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
    },
};