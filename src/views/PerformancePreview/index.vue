<template>
  <div class="container" >
    <p class="minititle">页面加载耗时统计</p>
    
    <el-card class="overview">
      <div class="content">
        <div class="counts">
            <p class="legend">近7天页面加载耗时分段统计</p>
            <div>{{a}}</div>
            <button  @click="fnbtn">点击</button>
        </div>
        <div class="trendGraph">
          <p class="legend">近7天页面加载耗时变化趋势</p>
        </div>
      </div>
    </el-card>
    <p class="minititle">页面列表</p>
    <el-card >
      <div class="details">
        <div class="pageList">
          <div class="pageList_item"
            v-for="(item, index) in pageList"
            :key="item + index">
            <div class="pageList_item_url">{{item.url}}</div>
          </div>
          
        </div>
        <div class="waterfallChart">
          <p>页面加载瀑布图</p>
        </div>
      </div>
    </el-card>
    
  </div>
</template>

<script>


export default {
  data() {
    return {
      pageList: [
        {url: 'http://baidu.com'},
        {url: 'http://baidu.com'},
        {url: 'http://baidu.com'},
        {url: 'http://baidu.com'}

      ]
    }
  },
  fnbtn() {
      this.a=1;
  },
  
  mounted() {
    console.log("处理性能页面啦")
    let monitorWhiteScreenNode = document.querySelector('.container');

    if (monitorWhiteScreenNode) {
        setTimeout(() => {
            try { 
                
                console.log("性能页面innerhtml:"+monitorWhiteScreenNode.innerHTML)
                if (!monitorWhiteScreenNode.innerHTML) {
                  // 重要节点没有内容
                  console.log("性能页面白屏啦")   
                }else{
                  console.log("性能页面没有白屏")
                }
            } catch (err) {
              console.log("错误")
            }
        }, 2000);
    }
  } 
};
</script>

<style lang="scss" scoped>
.container {
  display: flex;
  flex-direction: column;
  margin: 20px 10px 0 10px;
 
}
.overview {
  display: flex;
  height: 300px;
  
  margin-bottom: 40px;
  justify-content:space-between
  
}
.content {
  display: flex;
}
.counts {
  display: flex;
  margin-left: 10px;
}
.trendGraph {
  display: flex;
  margin-left: 80px;
}
.legend {
  text-align: center;
 
}

.details {
  display: flex;
  height: 300px;
  
}
.pageList {
  display: flex;
  flex-direction: column;
  &_item {
    margin: 5px 5px;
    padding: 15px 40px;
    background-color:#f5f5f5;
    
  }
}
.waterfallChart {
  display: flex;
  margin-left: 300px;
}
.minititle {
  margin: 0px 5px 15px 5px;
  
}

</style>