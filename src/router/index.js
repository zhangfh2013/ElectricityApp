import Vue from 'vue'
import Router from 'vue-router'
import login from '@/components/login'
import Home from '@/pages/home/home'
//个人中心
import PersonHome from '@/pages/person/person'
import energyHome from '@/pages/energy/energy'
import monitorHome from '@/pages/monitor/monitor'
import operationHome from '@/pages/operation/operation'
import perChange from "@/pages/person/perChange"
import perChangePassword from "@/pages/person/perChangePassword"
import aboutUs from "@/pages/person/aboutUs"
//告警
import alarmHome from "@/pages/alarm/alarm"
//运维
import facilityInfo from '@/pages/operation/facilityInfo'
import order from '@/pages/operation/order'
// 工单处理- 待审核
import orderDetails from '@/pages/operation/orderDetails'
// 工单处理- 待派发
import orderWait from '@/pages/operation/orderWait'
// 工单处理- 接单
import orderReceive from '@/pages/operation/orderReceive'
// 工单处理- 处理
import orderDeal from '@/pages/operation/orderDeal'
// 工单处理- 基础
import orderDasis from '@/pages/operation/orderDasis'
// 工单处理- 历史工单详情
import orderHistory from '@/pages/operation/orderHistory'
import repair from '@/pages/operation/repair'

Vue.use(Router)
if(!window.Promise){
  window.Promise = Promise;
}

export default new Router({
  routes: [
    {//登陆页
      path: '/',
      name: 'login',
      component: login
    },
    {//首页
      path: '/home/home',
      name: 'home',
      component: Home
    },
    {//能耗分析
      path: '/energy/energy',
      name: 'energyHome',
      component: energyHome
    },
    {//在线监测
      path: '/monitor/monitor',
      name: 'monitorHome',
      component: monitorHome
    },
    {//运维
      path: '/operation/operation',
      name: 'operationHome',
      component: operationHome
    },
    {//个人中心
      path: '/person/person',
      name: 'PersonHome',
      component: PersonHome
    },
    {//个人中心-修改信息
      path: '/person/perChange',
      name: 'perChange',
      component: perChange
    },
    {//个人中心-修改密码
      path: '/person/perChangePassword',
      name: 'perChangePassword',
      component: perChangePassword
    },
    {//个人中心-关于我们
      path: '/person/aboutUs',
      name: 'aboutUs',
      component: aboutUs
    },
    {//告警
      path: '/alarm/alarm',
      name: 'alarmHome',
      component: alarmHome
    },
    {//运维-设备档案信息
      path: '/operation/facilityInfo',
      name: 'facilityInfo',
      component: facilityInfo
    },
    {
      //运维-设备档案信息
      path: '/operation/order',
      name: 'order',
      component: order
    },
    {
      //运维-工单管理-工单详情（待审核）
      path: '/operation/orderDetails',
      name: 'orderDetails',
      component: orderDetails
    },
    {
      //运维-工单管理-工单详情（待派发）
      path: '/operation/orderWait',
      name: 'orderWait',
      component: orderWait
    },
    {
      //运维-工单管理-工单详情（接单）
      path: '/operation/orderReceive',
      name: 'orderReceive',
      component: orderReceive
    },
    {
      //运维-工单管理-工单详情（处理）
      path: '/operation/orderDeal',
      name: 'orderDeal',
      component: orderDeal
    },
    {
      //运维-工单管理-工单详情（基础）
      path: '/operation/orderDasis',
      name: 'orderDasis',
      component: orderDasis
    },
    {
      //运维-工单管理-工单详情（历史工单详情）
      path: '/operation/orderHistory',
      name: 'orderHistory',
      component: orderHistory
    },
    {  //运维-工单管理-工单报修
      path: '/operation/repair',
      name: 'repair',
      component: repair
    }

  ]
})
