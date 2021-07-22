<template>
  <div>
    <div>
      <el-row :gutter="40" class="panel-group">
        <el-col :xs="12" :sm="12" :lg="6" class="card-panel-col">
          <div class="card-panel">
            <div class="card-panel-icon-wrapper icon-people">
              <span class="el-icon-user" style="font-size: xxx-large;"></span>
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">新用户</div>
              <count-to
                class="card-panel-num"
                :startVal="0"
                :endVal="102400"
                :duration="2600"
              ></count-to>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="card-panel">
            <div class="card-panel-icon-wrapper icon-people">
              <span
                class="el-icon-chat-dot-round"
                style="font-size: xxx-large;"
              ></span>
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">消息</div>
              <count-to
                class="card-panel-num"
                :startVal="0"
                :endVal="81212"
                :duration="3000"
              ></count-to>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="card-panel">
            <div class="card-panel-icon-wrapper icon-people">
              <span
                class="el-icon-star-on"
                style="font-size: xxx-large;"
              ></span>
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">金额</div>
              <count-to
                class="card-panel-num"
                :startVal="0"
                :endVal="9280"
                :duration="3200"
              ></count-to>
            </div>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="card-panel">
            <div class="card-panel-icon-wrapper icon-people">
              <span class="el-icon-s-data" style="font-size: xxx-large;"></span>
            </div>
            <div class="card-panel-description">
              <div class="card-panel-text">销量</div>
              <count-to
                class="card-panel-num"
                :startVal="0"
                :endVal="13600"
                :duration="3600"
              ></count-to>
            </div>
          </div>
        </el-col>
      </el-row>
    </div>
    <div class='text-type'>
      <el-row :gutter="20">
        <el-col :span="24">
          <el-card class="box-card">
            <el-tag type="danger">说明</el-tag>
            <p></p>
            系统默认System账号登录，可以查看所有权限，如果用其他账号（如：admin/test）可以查看相应的授权情况。
            <p></p>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
import CountTo from "vue-count-to";
export default {
  components: {
    CountTo
  }
};
</script>

<style scoped>
.panel-group {
  margin-top: 18px;
}
.card-panel-col {
  margin-bottom: 32px;
}
.card-panel {
  height: 108px;
  cursor: pointer;
  font-size: 12px;
  position: relative;
  overflow: hidden;
  color: #666;
  background: #fff;
  box-shadow: 4px 4px 40px rgba(0, 0, 0, 0.05);
  border-color: rgba(0, 0, 0, 0.05);
}
.icon-people {
  color: #40c9c6;
}
.el-icon-chat-dot-round {
  color: #36a3f7;
}
.el-icon-star-on {
  color: #f4516c;
}
.el-icon-s-data {
  color: #34bfa3;
}
.card-panel-icon-wrapper {
  float: left;
  margin: 14px 0 0 14px;
  padding: 16px;
  transition: all 0.38s ease-out;
  border-radius: 6px;
}
.card-panel-icon {
  float: left;
  font-size: 48px;
}
.card-panel-description {
  float: right;
  font-weight: bold;
  margin: 26px;
  margin-left: 0px;
}
.card-panel-text {
  line-height: 18px;
  color: rgba(0, 0, 0, 0.45);
  font-size: 16px;
  margin-bottom: 12px;
}
.card-panel-num {
  font-size: 20px;
}
.text-type{
  text-align:left;
}

</style>
