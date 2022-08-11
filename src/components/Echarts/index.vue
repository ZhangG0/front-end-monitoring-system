<template>
  <div id="echarts">
    <el-card
      class="card"
      :style="`width:${width}px;height:${height}px`"
    >
      <div
        class="card-header"
      >
        <div class="card-header-title">
          <div class="title-name">
            <span>{{ titleName }}</span>
            <span class="icon">
              <el-tooltip
                class="item"
                effect="dark"
                placement="top"
              >
                <div slot="content">
                  <slot name="explain" />
                </div>
                <span class="iconfont icon-wenhao" />
              </el-tooltip>
            </span>
          </div>
          <div class="title-date">
            <span
              :style="titleDate >= 0 ?'color:red':'color:greed' "
            >{{ titleDate }}%</span>
          </div>
        </div>
        <div class="card-header-data">
          <div class="data-name">
            <span>{{ beforeWeek }}</span>
          </div>
          <div class="data-date">
            <span>前一周</span>
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