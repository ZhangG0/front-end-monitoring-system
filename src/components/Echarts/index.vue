<template>
  <div id="echarts">
    <el-card
      class="card"
      :style="`width:${width}px;height:${height}px`"
    >
      <div class="card-header">
        <div class="card-header-title">
          <div class="title-name">
            <span>{{ titleName }}</span>
            <span class="icon">
              <Tooltip
                class="item"
                effect="dark"
                placement="top"
              >
                <div slot="content">
                  <slot name="explain" />
                </div>
                <span class="iconfont icon-wenhao" />
              </Tooltip>
            </span>
          </div>
          <div class="title-date">
            <span :style="color">{{ titleDate }}%</span>
          </div>
        </div>
        <div class="card-header-data">
          <div class="data-name">
            <span>{{ day }}</span>
          </div>
          <div class="data-date">
            <span>{{ times }}</span>
          </div>
        </div>
      </div>
      <div
        ref="echarts"
        class="card-main"
        style="width: 100%; height: calc(100% - 55px)"
      />
    </el-card>
  </div>
</template>

<script src="./index.js"></script>
<style src="./indexStyle.scss" lang="scss" scoped></style>