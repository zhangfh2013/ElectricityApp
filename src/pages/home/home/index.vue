<template>
  <div id="home">
    <!-- herd -->
    <div fixed id="navHead" >
      <div class="navHeadBox">
          <div class="goBack" @click="navPerson"><img src="../../../../static/img/person@2x.png" alt="" /></div>
          <div class="nhl-text">智慧用电</div>
          <div class="Save" @click="navSave"><img src="../../../../static/img/alarm@2x.png" alt="" /></div>
      </div>
    </div>
    
    <!-- banner -->
      <!-- <mt-swipe :auto="4000">
        <mt-swipe-item><img src="../../../../static/img/banner-1@2x.png"></mt-swipe-item>
        <mt-swipe-item><img src="../../../../static/img/banner-2@2x.png"></mt-swipe-item>
        <mt-swipe-item><img src="../../../../static/img/banner-3@2x.png"></mt-swipe-item>
      </mt-swipe> -->

      <div class="swiper-container">
        <div class="swiper-wrapper">
            <div class="swiper-slide"><img class="myimg" src="../../../../static/img/banner-1@2x.png"></div>
            <div class="swiper-slide"><img class="myimg" src="../../../../static/img/banner-2@2x.png"></div>
            <div class="swiper-slide"><img class="myimg" src="../../../../static/img/banner-3@2x.png"></div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>
    </div>

    <!-- 头部信息 -->
    <div class="homeHead">
      <div class="homeHead-01">
        <div class="h-01-up"> {{distribution}}</div> 
        <div class="h-01-down point1"> 配电所数量</div>
      </div>
      <div class="homeHead-01">
        <div class="h-01-up">{{transformer}}</div>
        <div class="h-01-down point2">变压器数量</div>
      </div>
      <div class="homeHead-01">
        <div class="h-01-up">{{facilityNum?facilityNum:"--"}}</div>
        <div class="h-01-down point3">设备数量</div>
      </div>
    </div>

    <!-- Tab -->
    <mt-navbar v-model="selected">
      <mt-tab-item id="tab-container1">电量概述</mt-tab-item>
      <mt-tab-item id="tab-container2">用电负荷</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected" >
      <mt-tab-container-item id="tab-container1">
        <home-tab1 :nowMouth="nowMouth" :lastMouth="lastMouth" :thisYear="thisYear" :selected="selected"></home-tab1>
      </mt-tab-container-item>
      <mt-tab-container-item id="tab-container2">
        <home-tab2></home-tab2>
      </mt-tab-container-item>
    </mt-tab-container>
    <!-- <div class="homeTabBox">
      <div class="ht-tab" v-for="(item,index) in tabname" :key="index" 
      @click="iscur=index,showTab('homeTab'+(index+1))" :class="{current:iscur==index}">{{item}}</div>
    </div>
    <div class="homeTabWarp">
      <keep-alive>
        <component :is="currentTab"></component>
      </keep-alive>
    </div> -->

    <navFoot :idx="0"></navFoot>
  </div>
 
</template>

<script>
import navFoot from "../../../components/navFoot.vue"
import navHead from "../../../components/navHead.vue"
import homeTab1 from "@/components/homeTab1.vue";
import homeTab2 from "@/components/homeTab2.vue";
import { Indicator } from 'mint-ui';

import mock from '@/utils/mock.js'
const electricitySummary = mock.electricitySummary
import hgf from '@/utils/demo.js'
const toast = hgf.toast
import Swiper from 'swiper';

export default {
  name: 'home',
  components: {
    'navFoot': navFoot,
    'navHead': navHead,
    homeTab1 : homeTab1,
    homeTab2 : homeTab2
  },
  data () {
    return {
      selected:'tab-container1',
      iscur: 0,
      tabname: ["电量概述", "用电负荷"],
      currentTab: "homeTab1",
      title:"智慧用电",
      equipment:electricitySummary.equipment,
      rua:true,
      distribution:"--",
      transformer:"--",
      nowMouth:"--",
      lastMouth:"--",
      thisYear:"--",
      facilityNum:""
    }
  },
  watch:{
    // selected(){
    //   console.log(this.selected)
    //   if(this.selected == 'tab-container1'){
        
    //   }
    //   if(this.selected == 'tab-container2'){

    //   }
    // }
  },
  mounted(){
    new Swiper ('.swiper-container', {
      loop: true,
      // 如果需要分页器
      pagination: {
        el: '.swiper-pagination',
        type: 'bullets'
      }
    })
    
    Indicator.open("加载中")
    let thisMouth = ""
    let lastMouth = ""
    let thisYear = new Date().getFullYear()
    console.log(new Date().getMonth().toString().length)
    if(new Date().getMonth().toString().length == 1){
      thisMouth = new Date().getFullYear() + "-0" + (new Date().getMonth()+1).toString() 
      lastMouth = new Date().getFullYear() + "-0" + new Date().getMonth().toString() 
    }else{
      thisMouth = new Date().getFullYear() +"-"+ (new Date().getMonth()+1).toString() 
      lastMouth = new Date().getFullYear() +"-"+ new Date().getMonth().toString() 
    }
    console.log(thisMouth)
    this.$axios({
      method:"GET",
      url:"/api/app/EnergyAnalysis/monitoringDevicelist"
    }).then((res)=>{
      this.facilityNum = res.data.length
    })

    this.$axios({
      method:"GET",
      url:"/api/app/index/getSubstation"
    }).then((res)=>{
      let myid = res.data[0].id
      // /api/app/index/selectLineMonth?endTime=2019-03-01&substationId=22
      //本月的电量
      this.$axios({
        method:"GET",
        ///api/app/index/selectLineMonth?endTime=2019-02&substationId=22
        url:"/api/app/index/selectLineMonth?endTime=" + thisMouth + "&substationId=" + myid
      }).then((res)=>{
        this.nowMouth = res.data.intotal
      }).catch((err)=>{
        console.log(err)
      })

      //上月电量
      this.$axios({
        method:"GET",
        ///api/app/index/selectLineMonth?endTime=2019-02&substationId=22
        url:"/api/app/index/selectLineMonth?endTime=" + lastMouth + "&substationId=" + myid
      }).then((res)=>{
        this.lastMouth = res.data.intotal
      }).catch((err)=>{
        console.log(err)
      })

      //今年电量
      this.$axios({
        method:"GET",
        ///api/app/index/selectLineMonth?endTime=2019-02&substationId=22
        url:"/api/app/index/selectLineMonth?endTime=" + thisYear + "&substationId=" + myid
      }).then((res)=>{
        this.thisYear = res.data.intotal
      }).catch((err)=>{
        console.log(err)
      })

    })
    // http://192.168.1.109:81/app/EnergyAnalysis/getSubstation
    this.$axios({
      method:"GET",
      url:"/api/app/EnergyAnalysis/getSubstation"
    }).then((res)=>{
      this.distribution = res.data.length
    }).catch((err)=>{
      Indicator.close()
    })

    this.$axios({
      method:"GET",
      url:"/api/app/EnergyAnalysis/getSubstationtran"
    }).then((res)=>{
      let arr = []
      res.data.forEach((item)=>{
        arr.push(item.substation.looplist.length)
      })
      let num = 0
      arr.forEach((item)=>{
        num +=item
      })
      this.transformer = num
      Indicator.close()
    }).catch((err)=>{
      Indicator.close()
    })

  },
  methods: {
    showTab: function(tab) {
      this.currentTab = tab; // tab 为当前触发标签页的组件名
    },
    navPerson(){
      this.$router.push('/person/person');
    },
    navSave(){  
      this.$router.push('/alarm/alarm');    
    }
  },
}
</script>
<style>
#home .swiper-pagination-bullet{
  background:rgba(255,255,255,0.8);
  height:0.08rem;
  width:0.08rem;
}
#home .swiper-pagination-bullet-active{
  background:rgba(255,255,255,1)
}
#home .swiper-container {
  width: 100%;
  height: 4rem;
  top:-1.3rem;
}
#home .myimg{
  height:4rem;
  width:100%;
}
#home{
  height:100%;
  text-align:center;
}
#home #navFoot{
  position: fixed;
  bottom: 0;
}
/* head */
#home .navHeadBox{
    width: 100%;
    height: 0.9rem;
    padding-top: 0.4rem;
    display: flex;
    background: rgba(0,0,0,0);
    color: #fff;
    position: relative;
    z-index:2;
}
#home .goBack,#home .Save{
    width: 50px;
    height: 0.9rem;
}
#home .goBack img{
  width: 0.4rem;
  display: block;
  margin-top: 0.25rem;
  margin-left: 0.25rem;
}
#home .Save img{
  width: 0.4rem;
  display: block;
  margin-top: 0.25rem;
  margin-left: 0.25rem;
}
#home .Cancel,#home .Save{
    width: 50px;
    line-height: 55px;
    font-size: 16px;
    position: absolute;
}
#home .Cancel{   
    left: 0;
}
#home .Save{
    right: 0;
}
#home .nhl-text{
  width: 1.5rem;
  height: 0.9rem;
  line-height: 0.9rem;
  font-size: 0.32rem;
  position: absolute;
  left: 50%;
  margin-left: -0.75rem;
  text-align: center;
}
/* banner */
#home .mint-swipe-indicators{
 display: none;
}
#home .mint-swipe,#home .mint-swipe-item{
  height: 4rem;
  position: relative;
  z-index: 1;
  overflow: hidden;
}
#home .mint-swipe{
    top:-1.3rem;
}
#home .mint-swipe-item img{
  /* height: 240px; */
  width: 100%;
}
/* 头部信息 */
#home .homeHead{
  width: 7.1rem;
  height: 1.3rem;
  margin: -1.7rem   auto 0 auto;
  border-radius: 0.1rem;
  background:rgba(63,75,89,1);
  box-shadow:0 0.04rem 0.14rem 0 rgba(0,0,0,0.1);
  display: flex;
  position: relative;
  z-index: 3;
}
#home .homeHead-01{
  width:33.3%;
}
#home .homeHead-01 .h-01-up{
  width: 100%;
  height: 0.5rem;
  font-size: 0.34rem;
  font-weight:400;
  color:rgba(255,255,255,1);
  line-height: 0.5rem;
  margin-top: 0.2rem;
}
#home .homeHead-01 .h-01-down{
  width: 100%;
  height: 0.5rem;
  font-size: 0.24rem;
  font-weight:400;
  color:rgba(255,255,255,1);
  position:relative;
}
#home .homeHead-01 .h-01-down:before{
  content: "";
  position:absolute;
  height:0.12rem;
  width:0.12rem;
  left:0.4rem;
  top:0.1rem;  
  border-radius:50%;
}
.point1:before{
  background:#5FE3FF
}
.point2:before{
  background:#9F81FF
}
.point3:before{
  background:#FBFE86
}

#home .h-01-cir{
  width: 0.2rem;
  height: 0.2rem;
  border-radius: 0.5rem;
  background-color: aqua;
  margin: 0.2rem 0 0 0.3rem;
  display: block;
}
/* Tab */
#home .homeTabBox{
  width: 100%;
  height: 0.82rem;
  display: flex;
  border-bottom: 0.01rem solid rgba(144,159,175,0.5);
  z-index: 4;
  position: relative;
  overflow: scroll;
}
#home .ht-tab{
  width: 50%;
  height: 0.82rem;
  font-size: 0.28rem;
  line-height: 0.82rem;
  color: rgba(255,255,255,0.7);
}
#home .current{
  color:  rgba(255,255,255,1);
  border-bottom: 0.04rem solid;
  border-image:linear-gradient(to right,#398ADC, #2DC4AC) 1 10;
  position:relative;
}
#home .current:after{
  content: "";
  position:absolute;
  right:0rem;
  bottom:-0.08rem;
  height:0.11rem;
  width:0.11rem;
  background:rgba(98,255,219,1);
  box-shadow:0 0.1rem 0.2rem 0 rgba(33,211,160,0.27);
  border-radius:50%;
}
#home .homeTabWarp{
  width: 100%;
  height: 7rem; 
  overflow: hidden;
}
/* mint-ui style */
#home .mint-navbar{
  background-color: rgba(0,0,0,0);
  color: rgba(255,255,255,0.7);;
}
#home .mint-tab-item{
  border-bottom: 2px solid rgba(144,159,175,0.5);
  font-size: 0.28rem;
}
#home .is-selected{
  color: #fff;
  border-image:linear-gradient(to right,#398ADC, #2DC4AC) 1 10;
  border-image-slice: 0 0 100% 0;
}
#home .mint-navbar .mint-tab-item.is-selected{
  margin-bottom: 0;
}
#home .mint-tab-container{
  height:calc(100vh - 6.72rem);
  overflow: scroll;
}
</style>
