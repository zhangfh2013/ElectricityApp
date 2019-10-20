<template>
  <div id="alarmHome">
    <navHeadLeft  :title="title"></navHeadLeft>

   <mt-loadmore :top-method="loadTop"  ref="loadmore"> <!-- :bottom-method="loadBottom" :bottom-all-loaded="allLoaded" -->
      <div class="alaBox" v-for="(item,index) in dataArr">
        <div class="alaColor" :class="item.readFlag === 1 ? 'offLine' : 'inLine'"></div>
        <div class="alaMsgBox">
          <div class="alaMsg-01">
            {{item.substationName}}
            <span :class="item.readFlag === 1 ? 'notrue' : 'true'" @click="del(item.id,index)">确认</span>
          </div>
          <div class="alaMsg-02">{{item.description}}</div>
          <div class="alaMsg-03">{{item.startTime}}</div>
        </div>
      </div>   
    </mt-loadmore>

    <!-- <div class="alaBox" v-for="item in alarmlist">
      <!-- <div class="alaColor" v-if="item.alaState === '0'"><img src="../../../../static/img/alarmOffline@2x.png"></div>
      <div class="alaColor" v-else><img src="../../../../static/img/alarmInline@2x.png"></div> -->
      <!-- <div class="alaColor" :class="item.select === 0 ? 'offLine' : 'inLine'"></div>
      <div class="alaMsgBox">
        <div class="alaMsg-01">{{item.alaName}}<span :class="item.select === 1 ? 'notrue' : ''" >确认</span></div>
        <div class="alaMsg-02">{{item.alaMsg}}</div>
        <div class="alaMsg-03">{{item.alaTime}}</div>
      </div>
    </div> -->

  </div>
</template>

<script>
import navHeadLeft from "../../../components/navHeadLeft.vue"
import mock from '@/utils/mock.js'
const alarmlist = mock.alarmlist

export default {
  name: 'alarmHome',
  components: {
    'navHeadLeft': navHeadLeft,
    
  },
  data () {
    return {
      look:true,
      title:'告警列表',
      eqdqa:true,
      alarmlist:mock.alarmlist,
      dataArr:[]
    }
  },
  mounted(){
    console.log("rua")
    this.$axios({
      method:"GET",
      url:"/api/app/index/limitlist"
    }).then((res)=>{
      this.dataArr = res.data
      console.log(res)
    })
  },
  methods:{
    loadTop() {
      // load more data
      this.$refs.loadmore.onTopLoaded();
    },
    del(val,index){
      this.$axios({
        method:"GET",
        url:"/api/app/index/updatelimitlist?id="+val
      }).then((res)=>{
        console.log(res)
        this.dataArr[index].readFlag = 1
      })

    }
  }
}
</script>
<style>
#alarmHome{
    height:100%;
    text-align: center;
   touch-action:none;
}
#alarmHome #navHeadLeft{
  box-shadow:0 0.02rem 0.1rem 0 rgba(0,0,0,0.45);
}
/* 第一部分 */
#alarmHome .per-head{
  width: 100%;
  height: 2.4rem;
  margin-top: 0.38rem;
  border-top: 0.01rem solid #E0E0E1;
  border-bottom: 0.01rem solid #E0E0E1;
  background: #fff;
}
#alarmHome .alaBox{
  width: 6.9rem;
  height: 1.6rem;
  background:rgba(255,255,255,0.03);
  box-shadow:0 0.04rem 0.12rem 0 rgba(0,0,0,0.15);
  border-radius: 0.12rem;
  margin: 0.3rem auto 0 auto;
  overflow: hidden;
  display: flex;
}
#alarmHome .alaColor{
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  box-shadow:0 0.04rem 0.1rem 0 rgba(0,0,0,0.1);
  margin: 0.3rem 0 0 0.3rem;
  line-height: 0.8rem;
  text-align: center;
  font-size: 0.3rem;
  color: #fff;
}
#alarmHome .alaColor img{
  width: 1.2rem;
  height: 1rem;
}
#alarmHome .alaA{
  background:linear-gradient(305deg,rgba(240,213,42,1) 0%,rgba(248,140,70,1) 100%);
}
#alarmHome .alaB{
  background:linear-gradient(305deg,rgba(255,128,164,1) 0%,rgba(250,65,45,1) 100%);
}
#alarmHome .alaMsgBox{
  width: 5.5rem;
  height: 1.6rem;
}
#alarmHome .alaMsg-01,#alarmHome .alaMsg-02,#alarmHome .alaMsg-03{
  text-align: left;
  margin-left: 0.24rem;
  margin-top: 0.08rem;
}
#alarmHome .alaMsg-01{
  font-size: 0.29rem;
  margin-top: 0.2rem;
  color: #fff;
  position: relative;
}
#alarmHome .alaMsg-02{
  font-size: 0.24rem;
  color: #ccc;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
#alarmHome .alaMsg-03{
  font-size: 0.22rem;
  color: #ccc;
}
#alarmHome .true{
  border-radius: 0.04rem;
  font-size: 0.2rem;
  padding: 0.02rem 0.2rem 0.05rem 0.2rem;
  color: rgba(247,160,63,1);
  border:0.01rem solid rgba(247,160,63,1);
  /* margin-left: 0.2rem; */
  background:rgba(247,160,63,0.1);
  box-shadow:0 0.02rem 0.04rem 0 rgba(247,160,63,0.3);
  position: absolute;
  right: 0.1rem;
}
#alarmHome .notrue{
  display: none;
}
#alarmHome .offLine{
  background: url('../../../../static/img/alarmOffline@2x.png');
  background-size: 1.2rem;
  background-position-x:-0.1rem;
  background-position-y:-0.06rem;
}
#alarmHome .inLine{
  background: url('../../../../static/img/alarmInline@2x.png');
  background-size: 1.2rem;
  background-position-x:-0.1rem;
  background-position-y:-0.06rem;
}
/* mui */
#alarmHome .mint-loadmore-text{
  color: #fff;
  font-size: 0.26rem;
}
#alarmHome .mint-loadmore{
  height:calc(100vh - 1.3rem);
  overflow-y: auto;
}

</style>
