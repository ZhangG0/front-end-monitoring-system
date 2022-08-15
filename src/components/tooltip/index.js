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
    mounted() {

    },
    methods: {
        enter(e){
            switch(this.effect){
                case "dark":
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
