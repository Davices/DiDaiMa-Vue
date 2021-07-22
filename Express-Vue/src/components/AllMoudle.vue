<template>
  <div class="wrapper">
    <el-header style="text-align: right; font-size: 12px">
      <h2>
        <img
          src="~@/assets/logo copy.png"
          width="30"
          height="30"
        />智慧低代码开发平台
      </h2>
      <span style="font-size: 15px">欢迎您，System</span>
      <el-dropdown>
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item>个人中心</el-dropdown-item>
          <el-dropdown-item
            >切换主题<el-switch v-model="value1" @change="switchChange">
            </el-switch
          ></el-dropdown-item>
          <el-dropdown-item>退出</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </el-header>
    <el-container style="height: 800px; border: 1px solid #eee">
      <el-aside width="180px" style="background-color: #304156">
        <el-menu
          :default-active="activeIndex"
          class="el-menu-vertical-demo"
          background-color="#304156"
          text-color="#fff"
          :router="true"
          active-text-color="#1670ff"
          @select="handleSelect"
        >
          <div v-for="item in data" :key="item.id">
            <el-submenu v-if="item.children" :index="item.index">
              <template slot="title"
                ><i :class="item.icon"></i>{{ item.name }}</template
              >
              <el-menu-item
                v-for="v in item.children"
                :key="v.id"
                :index="v.index"
                ><i :class="v.icon"></i>{{ v.name }}
              </el-menu-item>
            </el-submenu>

            <el-menu-item v-else :index="item.index"
              ><template slot="title"
                ><i :class="item.icon"></i>{{ item.name }}</template
              ></el-menu-item
            >
          </div>
        </el-menu>
      </el-aside>
      <el-container>
        <div class="main-view">
          <div class="main-tag-list">
            <el-tag
              :key="tag.id"
              v-for="tag in tabList"
              closable
              :disable-transitions="false"
              @close="handleClose(tag)"
              @click="handleGo(tag)"
            >
              {{ tag.title }}
            </el-tag>
          </div>
          <div class="main-view-contain">
            <router-view />
          </div>
        </div>
      </el-container>
    </el-container>
  </div>
</template>
<style>
.el-tag + .el-tag {
  margin-left: 10px;
}
.button-new-tag {
  margin-left: 10px;
  height: 32px;
  line-height: 30px;
  padding-top: 0;
  padding-bottom: 0;
}
.input-new-tag {
  width: 90px;
  margin-left: 10px;
  vertical-align: bottom;
}
* {
  margin: 0;
  padding: 0;
  list-style: none;
  text-decoration: none;
  box-sizing: border-box;
}

.el-menu > div {
  position: relative;
  left: -20px;
}

html,
body,
#app {
  width: 100%;
  height: 100%;
}
.wrapper {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  overflow-y: hidden;
}
.el-header {
  width: 100%;
  background-color: #333333;
  color: #fff;
  line-height: 60px;
  padding: 0 20px;
}
.el-aside {
  color: #333;
}
h2 {
  float: left;
}

.main-view {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
}

.main-tag-list {
  width: 100%;
  border-bottom: 1px solid #000;
  height: 40px;
  display: flex;
  align-items: center;
  padding: 0 20px;
}
</style>

<script>
import { mapState } from "vuex";
export default {
  data() {
    return {
      data: [
        {
          name: "主页",
          index: "/MainPage",
          icon: "el-icon-view"
        },
        {
          name: "接口文档",
          index: "/interface",
          icon: "el-icon-connection"
        },
        {
          name: "代码生成",
          index: "/code_generation",
          icon: "el-icon-circle-check"
        },
        {
          name: "基础配置",
          index: "4",
          icon: "el-icon-setting",
          children: [
            {
              name: "数据权限",
              index: "/base/datapermission",
              icon: "el-icon-s-operation"
            },
            {
              name: "模块管理",
              index: "/base/modulemange",
              icon: "el-icon-s-order"
            },
            {
              name: "定时任务",
              index: "/base/timedtask",
              icon: "el-icon-edit-outline"
            },
            {
              name: "角色管理",
              index: "/base/rolemanagement",
              icon: "el-icon-user"
            },
            {
              name: "用户管理",
              index: "/base/usermanagement",
              icon: "el-icon-user-solid"
            },
            {
              name: "部门管理",
              index: "/base/departmentmanagement",
              icon: "el-icon-edit"
            },
            {
              name: "表单设计",
              index: "/base/formdesign",
              icon: "el-icon-document"
            },
            {
              name: "流程设计",
              index: "/base/processdesign",
              icon: "el-icon-set-up"
            },
            {
              name: "字典分类",
              index: "/base/dictionaryclass",
              icon: "el-icon-notebook-2"
            },
            {
              name: "资源管理",
              index: "/base/resourcemanagement",
              icon: "el-icon-coin"
            }
          ]
        },
        {
          name: "流程中心",
          index: "5",
          icon: "el-icon-guide",
          children: [
            {
              name: "待处理流程",
              index: "/process/pending",
              icon: "el-icon-edit"
            },
            {
              name: "我的流程",
              index: "/process/myprocess",
              icon: "el-icon-user-solid"
            },
            {
              name: "已处理流程",
              index: "/process/finishprocess",
              icon: "el-icon-success"
            }
          ]
        },
        {
          name: "仓储中心",
          index: "6",
          icon: "el-icon-folder-opened",
          children: [
            {
              name: "入库订单",
              index: "/storagecenter/incomingorders",
              icon: "el-icon-school"
            }
          ]
        },
        {
          name: "附件管理",
          index: "/attachmentmanagement",
          icon: "el-icon-tickets"
        },
        {
          name: "消息日志",
          index: "8",
          icon: "el-icon-search",
          children: [
            {
              name: "系统日志",
              index: "/messagelog/systemlogs",
              icon: "el-icon-document-copy"
            },
            {
              name: "我的消息",
              index: "/messagelog/mynews",
              icon: "el-icon-folder"
            }
          ]
        }
      ],
      activeIndex: "1"
    };
  },
  created() {
    // 设置默认选中
    this.activeIndex = this.$route.path;
  },
  methods: {
    handleClose(item) {
      this.$store.commit("del_tabList", {
        title: item.name,
        index: item.index
      });
    },
    //列表获取菜单
    // Getlist() {
    //   this.$axios.get("api/Menu/GetMenu").then(res => {
    //     console.log(res);
    //     this.data = res.data;
    //   });
    // },
    handleSelect(key, keyPath) {
      // console.log(key, keyPath);//可以吧
      // 点击切换高亮
      this.activeIndex = key;
      // 数组扁平化
      const newArr = this.flatten(this.data);
      const item = newArr.find(item => item.index === key);
      // console.log(newArr)
      this.$store.commit("add_tabList", {
        title: item.name,
        index: item.index
      });
    },
    handleGo(item) {
      this.$router.push(item.index);
    },
    // 数组扁平化函数
    flatten(arr) {
      return arr.reduce((result, item) => {
        return result.concat(
          item.children && Array.isArray(item.children)
            ? this.flatten(item.children)
            : item
        );
      }, []);
    }
  },

  computed: {
    ...mapState(["tabList"])
  }
};
</script>