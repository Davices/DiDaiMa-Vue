import Vue from 'vue'
import Router from 'vue-router'
import login from '@/views/login'
import axios from '../utils/http'

Vue.use(Router)
Vue.prototype.$axios=axios;
export default new Router({
  mode: 'history', //去掉url中的#
  routes: [   
    {
      path: '/',
      name: 'login',
      component: login  
    },
    {
      path: '/main',
      name: 'Main',
      component: () => import('@/components/AllMoudle.vue'),
      redirect:"/mainpage",
      children:[
        {
          path: '/mainpage',
          name: 'MainPage',
          component: () => import('@/views/MainPage/index.vue')
        },
        {
          path: '/interface',
          name: 'Interface',
          component: () => import('@/views/interface/index.vue')
        },
        {
          path: '/code_generation',
          name: 'code_generation',
          component: () => import('@/views/Generation/index.vue')
        },
        {
          path: '/base/datapermission',  //数据权限
          name: 'DataPermission',
          component: () => import('@/views/Base/DataPermission/index.vue')
        },
        {
          path: '/base/modulemange', //模块管理
          name: 'ModuleMange',
          component: () => import('@/views/Base/ModuleMange/index.vue')
        },
        {
          path: '/base/timedtask', //定时任务
          name: 'TimedTask',
          component: () => import('@/views/Base/TimedTask/index.vue')
        },
        {
          path: '/base/rolemanagement', //角色管理
          name: 'RoleManagement',
          component: () => import('@/views/Base/RoleManagement/index.vue')
        },
        {
          path: '/base/usermanagement', //用户管理
          name: 'UserManagement',
          component: () => import('@/views/Base/UserManagement/index.vue')
        },
        {
          path: '/base/departmentmanagement', //部门管理
          name: 'DepartmentManagement',
          component: () => import('@/views/Base/DepartmentManagement/index.vue')
        },
        {
          path: '/base/formdesign', //表单设计
          name: 'FormDesign',
          component: () => import('@/views/Base/FormDesign/index.vue')
        },
        {
          path: '/base/formdesign/addform', //表单添加
          name: 'FormDesignadd',
          component: () => import('@/views/Base/FormDesign/addform.vue')
        },
        
        {
          path: '/base/processdesign', //流程设计
          name: 'ProcessDesign',
          component: () => import('@/views/Base/ProcessDesign/index.vue')
        },
        {
          path: '/base/dictionaryclass', //字典分类
          name: 'DictionaryClass',
          component: () => import('@/views/Base/DictionaryClass/index.vue')
        },
        {
          path: '/base/resourcemanagement', //资源管理
          name: 'ResourceManagement',
          component: () => import('@/views/Base/ResourceManagement/index.vue')
        },
        {
          path: '/process/pending', //待处理流程
          name: 'Pending',
          component: () => import('@/views/process/Pending/index.vue')
        },
        {
          path: '/process/myprocess', //我的流程
          name: 'MyProcess',
          component: () => import('@/views/process/MyProcess/index.vue')
        },
        {
          path: '/process/finishprocess', //已处理流程
          name: 'FinishProcess',
          component: () => import('@/views/process/FinishProcess/index.vue')
        },
        {
          path: '/storagecenter/incomingorders', //入库订单
          name: 'IncomingOrders',
          component: () => import('@/views/StorageCenter/IncomingOrders/index.vue')
        },
        {
          path: '/attachmentmanagement', //附件管理
          name: 'AttachmentManagement',
          component: () => import('@/views/AttachmentManagement/index.vue')
        },
        {
          path: '/messagelog/systemlogs', //系统日志
          name: 'SystemLogs',
          component: () => import('@/views/MessageLog/SystemLogs/index.vue')
        },
        {
          path: '/messagelog/mynews', //我的日志
          name: 'MyNews',
          component: () => import('@/views/MessageLog/MyNews/index.vue')
        },
      ]
    },
  ]
})
