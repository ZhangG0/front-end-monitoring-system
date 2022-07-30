<template>
  <div>
    <el-menu
      default-active="/"
      class="el-menu-vertical-demo"
      :router="true"
      >
      <el-menu-item v-for="(item, index) in menuList"  :key="item.path+index" :index="item.path">
        <i class="el-icon-menu"></i>
        <span slot="title">{{item.name}}</span>
      </el-menu-item>
      
    </el-menu>
  </div>
</template>

<script>
export default {
  data(){
    return {
      menuList: [
      {
       path:'/',
       icon: '',
       name: '概览',
      },
      {
       path:'/foot',
       icon: '',
       name: '健康情况',
    },
    ]
    }
    
  },
  created(){
    console.log(this.$router);
  },
  methods: {

  }
}
</script>

<style>

</style>