export default {
    name:"Tooltip",
    data() {
        return {
            isShow:false,
            el:{
                x:0,
                y:0
            }
        }
    },
    props:{
        effect:{
            type:String,
            default:"dark"
        },
        placement:{
            type:String,
            default:"bottom"
        }
    },
    methods: {
        enter(e){
            switch(this.placement){
                case "top":
                this.el.x = e.clientX - 180
                this.el.y = e.offsetY
                break;
            }
            this.isShow = true
        },
        leave(){
            this.isShow = false
        }
    },
}
