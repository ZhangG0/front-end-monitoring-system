<template>
  <div id="app">
    <layout />
  </div>
</template>

<script>
import layout from './layout'
import axios from 'axios';

// let orignOpen=XMLHttpRequest.prototype.open 
// function Myopen(method,url,async,username,password){
//     console.log("捕捉到xmlhttprequest.open")
//     console.log('request info need report-----',method,url,async,username,password) 
//     orignOpen.call(this,method,url,async,username,password) 
//     let that=this;
//     that.addEventListener.call(that, 'load', function(event){
//     console.log("捕捉到xmlhttprequest.load")
//     //console.log(event)
// });
// } 
// XMLHttpRequest.prototype.open=Myopen

// axios.get('https://autumnfish.cn/api/joke/').then(response=>{

// //  console.log(response.data);
// });





export default {
  name: "App",
  components: {
    layout,
  },
  mounted() {
    let monitorWhiteScreenNode = document.querySelector('#app');

    if (monitorWhiteScreenNode) {
        setTimeout(() => {
            try { 
                console.log("app节点："+monitorWhiteScreenNode);
                console.log("APP.vue中：innerhtml:"+monitorWhiteScreenNode.innerHTML)
                if (!monitorWhiteScreenNode.innerHTML) {
                  // 重要节点没有内容
                  console.log("app.vue白屏啦" )  
                }else{
                  console.log("app.vue没有白屏") 
                }
            } catch (err) {  
              console.log("错误");
            }
        }, 2000);
    }
  }
};
</script>

<style>
</style>
