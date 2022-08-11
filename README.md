# 工程开发说明
已经引入 dayjs包
## 工作流




## 组件用法（全局注册）
### Echarts用法
    width：宽 
    height：高 （不是echarts的宽高，是包着他的）
    echart-option:echarts配置
    title-name:图标名字
    title-date:图标值
    slot="explain" ：提示文字
<Echarts
    :width="100"
    :height="500"
    :echart-option="echartOption"
    :title-date="0.9"
    :title-name="'我'"
    >
        <div slot="explain">
        提示文字
        </div>
    </Echarts>



1、【新功能开发】以dev分支为主开发分支，新建自己的开发分支，开发完成自测后，合并dev分支


## 开发使用手册

### host配置

### 环境条件配置

+ Nodejs > 10

+ 了解Vue.js

### 安装

```

运行安装命令
npm i 或 npm install
```

### 命令行

1、开发环境（非mock）

```
npm run dev


### 路由

```
// 所有的路由记录在/routes文件夹中
新建路由在route.js中声明即可
```

### 菜单栏创建
在layout/comonents/SideBar 文件数组中添加即可，icon是iconfont中对应的编码，新建icon需要更新style/iconfont中的文件

### 工程命名规范建议

在路径src/views下新建自己的开发模块，例如:PerformancePreview
