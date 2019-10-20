<template>
  <div id="monitorTab1">

    <!-- 采集时间 -->
    <div class="mTimeBox">采集时间 {{nowTime}}</div>

    <!-- 采集信息头部 -->
    <div class="mHeadBox">
      <div class="nHead nHeadMargin">
        <div class="nHeadText">{{this.m1paNum || '--'}}<span class="nhm" v-if="dispA">kW</span></div>
        <div class="nHeadBei">A相负荷</div>
        <div class="nHeadBorder nHeadColor01"></div>
      </div>
      <div class="nHead nHeadMargin">
        <div class="nHeadText">{{this.m1pbNum || '--'}}<span class="nhm" v-if="dispB">kW</span></div>
        <div class="nHeadBei">B相负荷</div>
        <div class="nHeadBorder nHeadColor02"></div>
      </div>
      <div class="nHead">
        <div class="nHeadText">{{this.m1pcNum || '--'}}<span class="nhm" v-if="dispC">kW</span></div>
        <div class="nHeadBei">C相负荷</div>
        <div class="nHeadBorder nHeadColor03"></div>
      </div>
    </div>

    <!-- 统计图 -->
    <div class="nEchar">
      <div v-if="dis" class="noEcharUp">
        <p class="nodata" >暂无数据</p>
        <img class="noimg"  src="../../../static/img/noDate@2x.png">
      </div>
      <div id="m1Echars" v-else ></div>
      <div class="echarNumBox">
        <div class="echarNum">
          <div class="NumWidth">最大负荷(kW)</div>
          <div class="NumCon NumWidth">{{this.m1tpMax}}</div>
          <div class="NumWidthTime">发生时间</div>
          <div class="NumCon NumWidth NumLine">{{this.m1tpMaxTime}}</div>
        </div>
        <div class="echarNum">
          <div class="NumWidth">最大负荷(kW)</div>
          <div class="NumCon NumWidth">{{this.m1ypMax}}</div>
          <div class="NumWidthTime">发生时间</div>
          <div class="NumCon NumWidth NumLine">{{this.m1ypMaxTime}}</div>
        </div>       
      </div>
    </div>

    <!-- 选择时间 -->
    <div class="nChooseTime" @click="openPicker">
      <div class="nTimeText">选择时间</div>
      <div class="nTime">{{nowdatam1}}</div>
      <div class="nTimeBtn"></div>
    </div>
    <mt-datetime-picker
        ref="picker"
        type="date"
        year-format="{value} 年"
        month-format="{value} 月"
        date-format="{value} 日"
        @confirm="m1handleConfirm"
        :visible-item-count="5" 
      >
    </mt-datetime-picker>

  </div>
</template>

<script>
import echarts from "echarts"
import demo from "../../utils/demo.js"
import mock from '@/utils/mock.js'
import pickertime from "../pickerTime.vue"
import { Indicator } from 'mint-ui';
const changeTime = demo.changeTime
const nowTime = demo.nowTime
const loadOnLine = mock.loadOnLine
const slots = demo.slots
export default {
  name: 'monitorTab1',
  components: {
    pickertime
  },
  data () {
    return {
      dataVal:"",
      nowdatam1:"",
      savetime:"",
      dis: false,
      dispA:true,
      dispB:true,
      dispC:true,
      loadOnLine:mock.loadOnLine,
      echartsLoad:loadOnLine.echartsLoad,
      slots:slots,
      status:false,
      //A/B/C向负荷
      m1paNum:'--',
      m1pbNum:'--',
      m1pcNum:'--',
      // 最大负荷-产生时间（今日/昨日）
      m1tpMax:'--',
      m1tpMaxTime:'--',
      m1ypMax:'--',
      m1ypMaxTime:'--',
    }
  },
  created(){
    this.nowTimes();
  },
  mounted(){
    this.nowdatam1 = nowTime();
    this.startPLoad();
   // 根据是否有数据，判断是否加载echars
    if(this.echartsLoad.lasttoday.length && this.echartsLoad.today.length != 0){
      setTimeout(() => {
        let m1EcharsBox = echarts.init(document.getElementById('m1Echars'));
        m1EcharsBox.setOption(this.m1Echars())
      }, 0);
    }else{
      this.dis = 'true';
    }; 
    //数据为空，不显示单位
    if(loadOnLine.loadA == ''){
      this.dispA = false;
    };
    if(loadOnLine.loadB == ''){
      this.dispB = false;
    };
    if(loadOnLine.loadC == ''){
      this.dispC = false;
    };
  },
  methods: {
    startPLoad(){
      Indicator.open("加载中")
      this.$axios({
          method:"GET",
          //获取第一个变压器id
          url:"/api/app/EnergyAnalysis/getSubstation",
        }).then((res)=>{
          this.firstId = res.data[0].substation.looplist[0].id
          this.$axios({
              method:"GET",
              url:"/api/app/index/getSubstation"
          }).then((res)=>{
            //今日负荷
            this.$axios({
                method:"GET",
                url:"/api/app/EnergyAnalysis/intoLineRecord?intolineId="+this.firstId+"&appEndTime="+this.nowday("end")+"&appStartTime="+this.nowday("start")
              }).then((res)=>{
                // A/B/C向负荷
                this.m1paNum = res.data[0].pa
                this.m1pbNum = res.data[0].pb
                this.m1pcNum = res.data[0].pc
                // 今日PA
                let data = res.data
                let m1Pay = []
                for(let i = 0; i<8 ; i++){
                      m1Pay.push(data[i].pa)
                }
                //昨日负荷
                this.$axios({
                    method:"GET",
                    url:"/api/app/EnergyAnalysis/intoLineRecord?intolineId="+this.firstId+"&appEndTime="+this.yesday("yesEnd")+"&appStartTime="+this.yesday("yesStart")
                  }).then((res)=>{
                    //初始化的echarts
                    let data = res.data
                    let m1Pa = []
                    for(let i = 0; i<8 ; i++){
                      m1Pa.push(data[i].pa)
                    }
                    let timer = ['00:00', '03:20', '06:40', '10:00', '13:20', '16:40', '20:00', '23:20']
                    setTimeout(() => {
                      let eCharts = echarts.init(document.getElementById('m1Echars'));
                      eCharts.clear()
                      eCharts.setOption(this.m1Echars(m1Pa,m1Pay,timer),true)
                    },0)
                  }).catch(()=>{
                    console.log("网络错误")
                    Indicator.close()
                  })
              }).catch(()=>{
                console.log("网络错误")
                Indicator.close()
              })

              //最大负荷
              this.$axios({
                method:"GET",
                url:"/api/app/EnergyAnalysis/intoLineRecordmax?intolineId="+this.firstId+"&appEndTime="+this.nowday("end")+"&appStartTime="+this.nowday("start")
              }).then((res)=>{
                // 最大负荷
                this.m1tpMax = res.data.max.p
                this.m1tpMaxTime = res.data.max.createTime
              }).catch(()=>{
                console.log("网络错误")
                Indicator.close()
              })
              //最大-昨日
              this.$axios({
                method:"GET",
                url:"/api/app/EnergyAnalysis/intoLineRecordmax?intolineId="+this.firstId+"&appEndTime="+this.yesday("yesEnd")+"&appStartTime="+this.yesday("yesStart")
              }).then((res)=>{
                // 最大负荷
                this.m1ypMax = res.data.max.p
                this.m1ypMaxTime = res.data.max.createTime
                Indicator.close()
              }).catch(()=>{
                console.log("网络错误")
                Indicator.close()
              })
          })
        }).catch(()=>{
          console.log("网络错误")
          Indicator.close()
      })
    },
    // 今天日期
    nowday(timer){
      let date = new Date()
      let year = date.getFullYear();
      let mouth = date.getMonth()+1;
      let day = date.getDate();
      if(mouth.toString().length == 1){
        mouth = "0" + mouth
      }
      if(day.toString().length == 1){
        day = "0" + day
      }
      if(timer == "start"){
        return year + "-" + mouth + "-" + day + " 00:00:00"
      }else{
        return year + "-" + mouth + "-" + day + " 23:59:59"
      }
    },
    // 昨天日期
    yesday(timer){
      let date = new Date()
      let year = date.getFullYear();
      let mouth = date.getMonth()+1;
      let day = date.getDate();
      if(mouth.toString().length == 1){
        mouth = "0" + mouth
      }
      if(day.toString().length == 1){
        day = "0" + day
      }
      if(timer == "yesStart"){
        return year + "-" + mouth + "-" + (day-1) + " " + "00:00:00"
      }else{
        return year + "-" + mouth + "-" + (day-1) + " " + "23:59:59"
      }
    },
    
    //年月日 转换成对的格式
    toSureTimer(val){
      val = val.split("-")
      if(val[1].toString().length == 1){
        val[1] = "0" + val[1] 
      }
      if(val[2].toString().length == 1){
        val[2] = "0" + val[2] 
      }
      return val[0] + "-" + val[1] + "-" + val[2]
    },
    // 选择时间后重画Echars
    m1handleConfirm(value){
      Indicator.open("加载中")
      let mytime = changeTime(value)
      this.nowdatam1 = mytime
      let selectStar = mytime + ' 00:00:00'
      let selectEnd = mytime + ' 23:59:59'
      let yselectStar = (mytime-1) + ' 00:00:00'
      let yselectEnd = (mytime-1) + ' 23:59:59'
      console.log(selectStar,selectEnd,yselectStar,yselectEnd)
      this.$axios({
          method:"GET",
          //获取第一个变压器id
          url:"/api/app/EnergyAnalysis/getSubstation",
        }).then((res)=>{
          this.firstId = res.data[0].substation.looplist[0].id
          this.$axios({
              method:"GET",
              url:"/api/app/index/getSubstation"
          }).then((res)=>{
            //选择时间后请求-当前的一天
            this.$axios({
                method:"GET",
                url:"/api/app/EnergyAnalysis/intoLineRecord?intolineId="+this.firstId+"&appEndTime="+selectEnd+"&appStartTime="+selectStar
              }).then((res)=>{
                //初始化的echarts
                console.log(res)
                let data = res.data
                console.log(data)
                let m1Pach = []
                for(let i = 0; i<8 ; i++){
                  m1Pach.push(data[i].pa)
                }
                //选择时间后请求-前一天
                this.$axios({
                    method:"GET",
                    url:"/api/app/EnergyAnalysis/intoLineRecord?intolineId="+this.firstId+"&appEndTime="+this.yesday("yesEnd")+"&appStartTime="+this.yesday("yesStart")
                  }).then((res)=>{
                    //初始化的echarts
                    let data = res.data
                    let m1Pay = []
                    for(let i = 0; i<8 ; i++){
                      m1Pay.push(data[i].pa)
                    }
                    let timer = ['00:00', '03:20', '06:40', '10:00', '13:20', '16:40', '20:00', '23:20']
                    let eCharts = echarts.init(document.getElementById('m1Echars'));
                    eCharts.clear();
                    eCharts.setOption(this.m1Echars(m1Pach,m1Pay,timer),true)
                    Indicator.close()
                  }).catch(()=>{
                    console.log("网络错误")
                    Indicator.close()
                  })               
              }).catch(()=>{
                console.log("网络错误")
                Indicator.close()
              })
            })
          }).catch(()=>{
            console.log("网络错误")
            Indicator.close()
          })
      
    },
    openPicker() {
      this.$refs.picker.open();
    },
    // 获取当前时间函数
    nowTimes(){
        let year = new Date().getFullYear();
        let month =new Date().getMonth() + 1 < 10? "0" + (new Date().getMonth() + 1): new Date().getMonth() + 1;
        let date =new Date().getDate() < 10? "0" + new Date().getDate(): new Date().getDate();
        let hh =new Date().getHours() < 10? "0" + new Date().getHours(): new Date().getHours();
        let mm =new Date().getMinutes() < 10? "0" + new Date().getMinutes(): new Date().getMinutes();
        this.nowTime = year + "-" + month + "-" + date +" "+" "+hh+":"+mm ;
    },
    // monitor-tab1-echars
    m1Echars(dataPA,dataPAY,timer){
        var option = {
          title: {
              text: '单位：kW',
              textStyle: {
                  fontWeight: 'normal',
                  fontSize: 14,
                  color: '#F1F1F3'
              },
              left: '0%',
              top:'2%'
          },
          tooltip: {
              trigger: 'axis',
              axisPointer: {
                  lineStyle: {
                      color: '#57617B'
                  }
              }
          },
          legend: {
              icon: 'circle',
              itemWidth: 8,
              itemHeight: 8,
              itemGap: 13,
              data: ['01月12日负荷', '01月13日负荷'],
              right: '0%',
              textStyle: {
                  fontSize: 12,
                  color: '#fff',
              },
              top:'2%'
          },
          xAxis: {
            type: 'category',
            data: timer,
            axisLine: {
              lineStyle: {       // 属性lineStyle控制线条样式
                color: '#68707A',
                width: 1,
                type: 'solid'
              },
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: 'rgba(255,255,255,0.7)',
              interval: '0',
              rotate: 0,
              margin: 8,
            }
          },
          grid: {
            left: '12%',
            top: '20%',
            right: '0%',
            bottom: '18%',
          },
          yAxis: {
            type: 'value',
            max:200,
            nameTextStyle: {
              color: '#ffffff',
              align: 'left',
              padding: [0, 13, 0, 0]
            },
            splitLine: {
              lineStyle: {
                color: '#68707A'
              }
            },
            axisLine: {
              lineStyle: {       // 属性lineStyle控制线条样式
              color: '#68707A',
              width: 1,
              type: 'solid'
              },
            },
            axisTick: {
              show: false
            },
            axisLabel: {
              color: 'rgba(255,255,255,0.7)'
            }
          },
          series: [{
              name: '01月12日负荷',
              type: 'line',
              smooth: true,
              symbol: 'circle',
              symbolSize: 5,
              showSymbol: false,
              lineStyle: {
                  normal: {
                      width: 2
                  },
              },
              itemStyle: {
                  normal: {
                      color: '#F2C431',
                  }
              },
              data: dataPA
          },{
              name: '01月13日负荷',
              type: 'line',
              smooth: true,
              symbol: 'circle',
              symbolSize: 5,
              showSymbol: false,
              lineStyle: {
                  normal: {
                      width: 2
                  }
              },
              itemStyle: {
                  normal: {
                      color: '#388CDA',
                  }
              },
              data: dataPAY
          }, ]
      };
      return option
      }
  }
}
</script>
<style>
#monitorTab1  .mint-datetime-confirm{
      text-align: right;
      padding-right: 20px;
      box-sizing: border-box;
      color: #00AFD5;
  }
#monitorTab1  .mint-datetime-cancel{
      text-align: left;
      padding-left: 20px;
      box-sizing: border-box;
      color: #4C545D;
  }
#monitorTab1{
  width: 100%;
  text-align:center;
  color: #fff;
  height:calc(100vh - 3.28rem);
  overflow: scroll;
}
/* #monitorTab1 .disp{
  display: none;
} */
/* 采集时间 */
#monitorTab1 .mTimeBox{
  width: 7.1rem;
  height: 0.68rem;
  font-size: 0.24rem;
  text-align: right;
  line-height: 0.68rem;
  margin: 0 auto 0 auto;
}
/* 采集信息头部 */
#monitorTab1 .mHeadBox{
  width: 7.1rem;
  height: 1.2rem;
  margin-top: 0.24rem;
  margin: 0 auto 0 auto;
  display: flex;
}
#monitorTab1 .nHead{
  width: 2.2rem;
  height: 1.2rem;
  background:rgba(63,75,89,1);
  box-shadow:0rem 0.04rem 0.1rem 0rem rgba(0,0,0,0.1);
  border-radius:0.08rem;
  position: relative;
}
#monitorTab1 .nHeadBorder{
  width: 2.2rem;
  height: 0.08rem;
  position: absolute;
  bottom: 0;
  box-shadow:0rem 0.04rem 0.1rem 0rem rgba(0,0,0,0.1);
  border-radius:0rem 0rem 0.08rem 0.08rem;
}
#monitorTab1 .nHeadText{
  height: 0.4rem;
  font-size: 0.3rem;
  margin-top: 0.2rem;
  font-weight: 5rem;
}
#monitorTab1 .nHeadBei{
  font-size: 0.24rem;
  margin-top: 0.05rem;
}
#monitorTab1 .nHeadMargin{
  margin-right: 0.26rem;
}
#monitorTab1 .nHeadColor01{
  background:#FFF063;
}
#monitorTab1 .nHeadColor02{
  background:#4DEFC7;
}
#monitorTab1 .nHeadColor03{
  background:#FD667B;
}
#monitorTab1 .nhm{
  font-size: 0.16rem;
}
#monitorTab1 .noimg{
  width:5rem;
  margin-top:0.1rem;
}
#monitorTab1 .nodata{
  text-align:center;
  line-height:2.7rem;
  font-size: 0.3rem;
  position:absolute;
  left:50%;
  margin-left:-0.55rem;
}
/* 统计图 */
#monitorTab1 .nEchar{
  width:6.9rem;
  height:6.6rem;
  background:rgba(255,255,255,0.03);
  box-shadow:0rem 0.08rem 0.32rem 0rem rgba(0,0,0,0.3);
  border-radius:0.16rem;
  margin: 0.24rem auto 0 auto;
}
/* 统计图 - 统计图盒子 */
#monitorTab1 #m1Echars,#monitorTab1 .noEcharUp{
  width: 6.5rem;
  height: 3.98rem;
  margin: 0.24rem 0.2rem;
  border-bottom: 0.02rem solid rgba(46,57,69,1);
}
/* 统计图 - 内容盒子 */
#monitorTab1 .echarNumBox{
  width: 6.2rem;
  height: 2.1rem;
  margin: 0 auto;
}
#monitorTab1 .echarNum{
  width: 100%;
  height: 50%;
  font-size: 0.24rem;
  color: #fff;
  text-align: center;
  display: flex;
}
#monitorTab1 .echarNum div{
  height: 100%;
  line-height: 1rem;
  text-align: left;
}
#monitorTab1 .NumCon{
  color: #62D6EF;
}
#monitorTab1 .NumWidthTime{
  width: 20%;
}
#monitorTab1 .NumLine{
  text-align: center !important;
  line-height: 0.4rem !important;
  margin-top: 0.2rem;
}
#monitorTab1 .NumWidth{
  width: 25%;
}
/* 选择时间 */
#monitorTab1 .nChooseTime{
  width:7.5rem;
  height:0.9rem;
  background:rgba(255,255,255,0.03);
  box-shadow:0rem 0.04rem 0.1rem 0rem rgba(0,0,0,0.1);
  margin-top: 0.24rem;
  position: relative;
  font-size: 0.26rem;
  display: flex;
}
#monitorTab1 .nTimeText{
  height:0.9rem;
  line-height: 0.9rem;
  text-align: left;
  margin-left: 0.34rem;
}
#monitorTab1 .nTime{
  width: 1.5rem;
  line-height: 0.9rem;
  position: absolute;
  left: 50%;
  margin-left: -0.75rem;
  color: #62D6EF;
}
#monitorTab1 .nTimeBtn{
  width: 0.2rem;
  height:0.9rem;
  background: url('../../../static/img/selectTime@2x.png') no-repeat;
  background-size: 0.2rem;
  position: absolute;
  right: 0.4rem;
  top:0.4rem;
}





#monitorTab1 .onepick{
    position: absolute;
    top: 0.7rem;
    width: 100%;
    background: #fff;
}
#monitorTab1 .twopick{
    position: absolute;
    top: 2.7rem;
    width: 100%;
    background: #fff;
}
#monitorTab1 .picker-item{
  text-align:center;
  opacity: 0.3;
  transform: rotateX(50deg)
}
#monitorTab1 .picker-item.picker-selected{
  opacity: 1;
  transform: rotateX(0deg)
}
#monitorTab1 .datatime{
  height:4.7rem;
  position: fixed;;
  bottom:0;
  width:100%;
  z-index:667;
}
#monitorTab1 .sure{
  height:0.7rem;
  width:100%;
  padding:0 0.32rem;
  display:flex;
  justify-content: space-between;
  align-items: center;
  font-size:0.26rem;
  background:#fff;
  box-sizing: border-box;
  color:rgba(76,84,93,1);
  text-align:left;
  line-height:0.5rem;
}
#monitorTab1 .sure>div{
  height:100%;
  width:30%;
  line-height:0.7rem;
}
#monitorTab1 .sure>div:nth-of-type(2){
  color:rgba(0,175,213,1);
  text-align:right;
}
#monitorTab1 .shadow{
  height:100vh;
  width:100%;
  background:rgba(0,0,0,0.2);
  position:fixed;
  top:0;
  left:0;
  z-index:666;
}
</style>
