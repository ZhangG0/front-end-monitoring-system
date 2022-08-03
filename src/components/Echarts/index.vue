<template>
  <div id="echarts">
    <el-card class="card">
      <div class="card-header">
        <div class="card-header-title">
          <div class="title-name">
            <span>123213213</span>
            <span>
              <el-tooltip
                class="item"
                effect="dark"
                content="Top Center 提示文字"
                placement="top"
              >
                <el-button>上边</el-button>
              </el-tooltip>
            </span>
          </div>
          <div class="title-date">
            <span>0.98%</span>
          </div>
        </div>
        <div class="card-header-data">
          <div class="data-name">
            <span>2022-12-23</span>
          </div>
          <div class="data-date">
            <span>前一周</span>
          </div>
        </div>
      </div>
      <div
        ref="echarts"
        class="card-main"
        style="width: 100%; height: calc(100% - 48px)"
      />
    </el-card>
  </div>
</template>

<script src="./index.js"></script>
<style src="./indexStyle.scss" lang="scss" scoped></style>