<template>
  <el-container style="height: 100%;">
    <el-header
      style="height: auto;padding:0;border-bottom: 1px solid #ccc;background:white;"
    >
      <div class="components-list" style="padding-bottom:0">
        <template v-if="basicFields.length">
          <draggable
            tag="ul"
            :list="basicComponents"
            v-bind="{
              group: { name: 'people', pull: 'clone', put: false },
              sort: false,
              ghostClass: 'ghost'
            }"
            @end="handleMoveEnd"
            @start="handleMoveStart"
            :move="handleMove"
            style="padding-bottom: 0;"
          >
            <template v-for="(item, index) in basicComponents">
              <li
                v-if="basicFields.indexOf(item.type) >= 0"
                class="form-edit-created-label"
                :class="{ 'no-put': item.type == 'divider' }"
                :key="index"
              >
                <a>
                  <i class="icon iconfont" :class="item.icon"></i>
                  <span>{{ item.name }}</span>
                </a>
              </li>
            </template>
          </draggable>
        </template>
      </div>
    </el-header>
    <el-container>
      <el-main>
        <el-container>
          <el-main class="MainBox"> 
            
          </el-main>
          <el-header style="background:yellow;width:100%"> </el-header>
        </el-container>
      </el-main>
      <el-aside
        class="created-config-container"
        style="background:yellow;width:300px"
      >
        <el-container>
          <el-header height="45px" style="font-size: 0;">
            <div
              class="config-tab"
              :class="{ active: configTab == 'created' }"
              @click="handleConfigSelect('created')"
            >
              字段属性
            </div>
            <div
              class="config-tab"
              :class="{ active: configTab == 'form' }"
              @click="handleConfigSelect('form')"
            >
              表单属性
            </div>
          </el-header>
          <el-main class="config-content"> </el-main>
        </el-container>
      </el-aside>
    </el-container>
  </el-container>
</template>

<script>
import Draggable from "vuedraggable";
import { basicComponents } from "./config.js";
//import PutArea from "../../Form_Design/PutArea/index.vue";
export default {
  components: {
    Draggable,
    // PutArea
  },
  props: {
    basicFields: {
      type: Array,
      default: () => [
        "grid",
        "input",
        "textarea",
        "number",
        "radio",
        "checkbox",
        "time",
        "date",
        "rate",
        "color",
        "select",
        "switch",
        "slider",
        "text",
        "imgupload"
      ]
    }
  },
  data() {
    return {
      basicComponents
    };
  },
  created() {
    this._loadComponents();
  },
  methods: {
    _loadComponents() {
      const fields = {
        input: "单行文本",
        textarea: "多行文本",
        number: "计数器",
        radio: "单选框组",
        checkbox: "多选框组",
        time: "时间选择器",
        date: "日期选择器",
        select: "下拉选择框",
        switch: "开关",
        text: "文字",
        imgupload: "图片/文件",
        grid: "栅格布局"
      };
    },
    handleMoveEnd() {},
    handleMoveStart() {},
    handleMove() {
      return true;
    }
  }
};
</script>

<style scoped>
.form-edit-created-label {
  float: left;
  margin-left: 15px;
  color: rgb(93, 157, 241);
  border: 1px solid rgb(250, 242, 242);
  width: 100px;
  height: 40px;
  line-height: 40px;
  text-align: center;
  margin-top: 5px;
  margin-bottom: 5px;
  font-size: 1px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  display: block;
}
.MainBox {
  background: white;
  width: 100%;
  height: 430px;
  border-bottom: 1px solid #ccc;
}
:hover {
  color: primary-color;
  border: 1px dashed primary-color;
}
ul {
  position: relative;
  overflow: hidden;
  padding: 0 10px 20px;
  margin: 0;
}
</style>