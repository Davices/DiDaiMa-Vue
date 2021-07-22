<template>
  <div class="login-container">
    <div class="content">
      <img class="leftImg" src="~@/assets/login/left.png" alt="" />
      <div class="right">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="login-form"
        >
          <h3 class="title">智慧低代码开发平台</h3>
          <p class="tips">八维上海物联网学院</p>
          <el-form-item
            placeholder="请输入登录账号"
            suffix-icon="el-icon-user"
            autoComplete="on"
            prop="userName"
          >
            <el-input v-model="ruleForm.userName"></el-input>
          </el-form-item>
          <el-form-item
            placeholder="请输入密码"
            type="password"
            autoComplete="on"
            prop="userPWd"
          >
            <el-input
              v-model="ruleForm.userPWd"
              :type="passw"
              clearable
              @blur="onBlur"
            >
              <!-- input中加图标必须要有slot="suffix"属性，不然无法显示图标 -->
              <i slot="suffix" :class="icon" @click="showPass"></i>
            </el-input>
          </el-form-item>
          <el-form-item prop="tenantid">
            <!-- <span class="icon iconfont icon-yonghuguanli"></span> -->
            <el-select
              v-model="tenant"
              placeholder="请选择"
              @change="tenantChange"
            >
              <el-option
                v-for="item in tenants"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button
              v-waves
              type="primary"
              style="width:400px;background:#4452D5;font-size: 24px;height: 50px;"
              :loading="loading"
              @click.native.prevent="handleLogin"
            >
              登 录
            </el-button>
          </el-form-item>
          <el-form-item>
            <div class="right-center">
              <p class="tip">默认System登录后，会拥有所有权限</p>
              <p class="tip">
                admin登录后，会少一点权限，资源管理/分类管理的字段会少一点
              </p>
              <p class="tip">
                test/test登录后，权限会更少，资源管理/分类管理的字段也更少
              </p>
            </div>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      icon: "el-input__icon el-icon-view",
      passw: "password",
      ruleForm: {
        userName: "System",
        userPWd: "123456"
      },
      tenant: this.tenantid || "OpenAuthDBContext", //当前选择的租户
      tenants: [
        {
          value: "OpenAuthDBContext",
          label: "默认租户"
        },
        {
          value: "ErrorId404",
          label: "模拟一个不存在的租户"
        }
      ],
      rules: {
        userName: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        userPWd: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    showPass() {
      //点击图标是密码隐藏或显示
      if (this.passw == "text") {
        this.passw = "userPWd";
        //更换图标
        this.icon = "el-input__icon el-icon-view";
      } else {
        this.passw = "text";
        this.icon = "el-input__icon el-icon-loading";
        setTimeout(() => {
          this.icon = "";
        }, 500);
      }
    },
    //密码失焦事件
    onBlur(){
         this.passw = "password";
         this.icon = "el-input__icon el-icon-view";
    },
    //登录
    handleLogin()
    {
      //alert(123);

    }
  }
};
</script>

<style scoped>
.right {
  display: inline-block;
  width: 570px;
  height: 500px;
  position: fixed;
  top: 50%;
  right: 16vw;
  transform: translateY(-50%);
}

.login-container {
  height: 100vh;
  background: url("~@/assets/login/bg.png") no-repeat;
  background-color: #ebebea;
  background-position: 0 0;
  background-size: 62% 100%;
  text-align: center;
}
.el-input,
.el-select {
  display: inline-block;
  height: 48px;
  width: 85%;
}

.right-center {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  font-size: 12px;
  text-indent: 10px;
}

.right-center p {
  line-height: 24px;
}

.el-form-item {
  margin-bottom: 15px;
  border-radius: 5px;
  color: #454545;
}
.el-form-item__content {
  background: #fff;
  border: 1px solid rgba(223, 223, 223, 1);
}
.content {
  display: inline-block;
  vertical-align: middle;
}
.content img {
  width: 580px;
  margin-right: 480px;
  vertical-align: middle;
  margin-top: 80px;
}
.title {
  font-size: 26px;
  font-weight: 400;
  color: #4452d5;
  margin: 0;
}

.tips {
  color: #959595;
  font-size: 14px;
  margin-top: 0;
  margin-bottom: 40px;
  margin-right: 100px;
}
.tip {
  color: #959595;
  font-size: 14px;
  margin-top: 0;
  margin-bottom: 40px;
  margin-left: 25px;
}
</style>
