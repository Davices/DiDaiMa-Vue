<template>
  <el-container style="height:100%;background:whitesmoke">
    <el-header style="background:none">
      <div class="filter-container">
        <el-button
          class="submitbtn"
          v-loading="loading"
          size="mini"
          @click="submitForm"
          >保存
        </el-button>
      </div>
    </el-header>
    <el-container>
      <el-aside width="400px;height:500px">
        <el-card class="box-card">
          <el-form
            class="form-container"
            :model="postForm"
            :rules="rules"
            ref="postForm"
            label-position="top"
          >
            <div
              class="createPost-main-container"
              style="margin: 0;height: 100%;"
            >
              <el-form-item prop="name" label="标题" label-position="top">
                <el-input
                  name="name"
                  v-model="postForm.name"
                  required
                  :maxlength="100"
                >
                </el-input>
              </el-form-item>

              <el-form-item label="摘要" label-position="top">
                <el-input
                  type="textarea"
                  :rows="6"
                  placeholder="请输入内容"
                  v-model="postForm.description"
                >
                </el-input>
                <span class="word-counter" v-show="contentShortLength"
                  >{{ contentShortLength }}字</span
                >
              </el-form-item>

              <el-form-item label="表单类型" label-position="top">
                <el-select
                  v-model="postForm.frmType"
                  placeholder=""
                  style="width: 100%;"
                >
                  <el-option
                    v-for="item in options"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>

                <el-select
                  style="margin-top: 10px;width: 100%;"
                  v-model="postForm.webId"
                  v-if="postForm.frmType == 1"
                  placeholder="请选择系统内置的页面"
                >
                  <el-option
                    v-for="item in options1"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
          </el-form>
        </el-card>
      </el-aside>
       <DesignForm> </DesignForm>
    </el-container>
  </el-container>
</template>

<script>
  import DesignForm from "./module.vue"
export default {
  components: {
      DesignForm
  },
  data() {
    return {
      postForm: {
        description: "",
        frmType: "2",
        webId: ""
      },

      options: [
        {
          value: "0",
          label: "动态表单"
        },
        {
          value: "1",
          label: "自定义开发页面"
        },
        {
          value: "2",
          label: "可拖拽动态表单"
        }
      ],
      options1: [
        {
          value: "FrmLeaveReq",
          label: "请假条"
        },
        {
          value: "BaWeiGoOutOnBusiness",
          label: "因公外出单"
        },
        {
          value: "BaWeiAbnormalAttendanceInstruction",
          label: "异常考勤情况说明"
        }
      ],
      rules: {
        name: [{ required: true, message: "标题不能为空", trigger: "blur" }]
      }
    };
  },
  methods: {},
  computed: {
    //统计富文本框的值
    contentShortLength() {
      return this.postForm && this.postForm.description
        ? this.postForm.description.length
        : 0;
    }
  }
};
</script>

<style scoped>
.box-card {
  width: 320px;
  height: 750px;
  background-color: white;
}
.main {
  width: 500px;
  height: 500px;
  float: right;
  border: 1px gainsboro solid;
}
.word-counter {
  width: 40px;
  position: absolute;
  right: -10px;
  top: 0px;
}
.submitbtn {
  float: right;
  margin-top: 15px;
}
</style>