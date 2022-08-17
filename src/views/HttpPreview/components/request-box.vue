<template>
  <div class="box">
    <div class="box_header">
      <div class="box_header_title">{{ title }}</div>
      <el-tooltip
        class="item"
        effect="dark"
        :content="tips"
        placement="top-start"
      >
        <span class="iconfont box_header_icon">&#xe72d;</span>
      </el-tooltip>
    </div>

    <div class="box_num">{{ num }}</div>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      require: true,
    },
    num: {
      type: [Number ,String],
      require: true,
    },
    tips: {
      type: String,
      require: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.box {
  width: 535px;
  height: 120px;
  &_header {
    display: flex;
    &_title{
        font-size: 16px;
    }
    &_icon {
      font-size: 16px;
      line-height: 23px;
      margin-left: 2px;
    }
  }
  &_num{
    margin-top: 20px;
    font-size: 32px;
    font-weight: 700;
  }
}
</style>