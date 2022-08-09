<template>
  <div id="app">

    <layout />
  </div>
</template>

<script>
import layout from './layout'
import axios from 'axios';

let orignOpen=XMLHttpRequest.prototype.open 
function Myopen(method,url,async,username,password){
    console.log("捕捉到xmlhttprequest.open")
    console.log('request info need report-----',method,url,async,username,password) 
    orignOpen.call(this,method,url,async,username,password) 
    let that=this;
    that.addEventListener.call(that, 'load', function(event){
        console.log("捕捉到xmlhttprequest.load")
        console.log(event)
       
    });
} 
XMLHttpRequest.prototype.open=Myopen

axios.get('https://autumnfish.cn/api/joke/').then(response=>{
  
  console.log(response.data);
});

const addListener=(xhr)=>{ 
  xhr.addEventListener('load',(msg)=>{
    console.log("监听load")
    console.log(msg)
  }); 
} 




export default {
  name: "App",
  components: {
    layout
  }
};
</script>

<style>

</style>
