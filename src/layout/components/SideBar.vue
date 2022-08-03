<template>
  <div>
    <el-menu
      default-active="/"
      class="el-menu-vertical-demo"
      :router="true"
    >
      <el-menu-item
        v-for="(item, index) in menuList"
        :key="item.path+index"
        :index="item.path"
      >
        <span class="iconfont">{{ iconfont(item.icon) }}</span>
        <span slot="title">{{ item.name }}</span>
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
       icon: '&#xe631;',
       name: '概览',
      },
      {
       path:'/health',
       icon: '&#xe655;',
       name: '健康情况',
    },
     {
       path:'/Performance',
       icon: '&#xe605;',
       name: '性能预览',
    },
    ]
    }
    
  },
  created(){
    console.log(this.$router);
  },
  methods: {
      
      iconfont: function (icon) {
					const reg = /(&#x)?(.*)/
					let iconfontName
					if(reg.test(icon)) {
						iconfontName = reg.exec(icon)[2]
					}
					return String.fromCharCode(parseInt(iconfontName, 16))
				}


  }
}
</script>

<style>
@import '../../style/iconfont/iconfont.css'
</style>