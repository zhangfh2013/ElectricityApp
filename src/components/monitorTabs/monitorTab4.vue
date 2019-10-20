<template>
  <div id="monitorTab4">
        <!-- 采集时间 -->
    <div class="mTimeBox">采集时间 {{nowTime}}</div>

    <!-- 采集信息头部 -->
    <div class="mHeadBox">
      <div class="nHead nHeadMargin">
        <div class="nHeadText">{{m4ta}}<span class="nhm" v-if="m4dispA">℃</span></div>
        <div class="nHeadBei">A相绕组温度</div>
        <div class="nHeadBorder nHeadColor01"></div>
      </div>
      <div class="nHead nHeadMargin">
        <div class="nHeadText">{{m4tb}}<span class="nhm" v-if="m4dispB">℃</span></div>
        <div class="nHeadBei">B相绕组温度</div>
        <div class="nHeadBorder nHeadColor02"></div>
      </div>
      <div class="nHead">
        <div class="nHeadText">{{m4tc}}<span class="nhm" v-if="m4dispC">℃</span></div>
        <div class="nHeadBei">C相绕组温度</div>
        <div class="nHeadBorder nHeadColor03"></div>
      </div>
    </div>
    <!-- 统计图 -->
    <div class="nEchar">
      <div v-if="dis" class="noEcharUp">
        <p class="nodata">暂无数据</p>
        <img class="noimg" src="../../../static/img/noDate@2x.png">
      </div>
      <div id="nEchars4" v-else></div>
      <div class="echarNumBox">
        <!-- 需要参数进行循环取值 -->
        <div class="echarNum">
          <div class="NumWidth">最高温度℃</div>
          <div class="NumCon NumWidth">{{m4TodayTc}}</div>
          <div class="NumWidthTime">发生时间</div>
          <div class="NumCon NumWidth">{{m4TodayTime == "--" ? m4TodayTime :m4TodayTime.slice(5,16)}}</div>
        </div>
        <div class="echarNum">
          <div class="NumWidth">最高温度℃</div>
          <div class="NumCon NumWidth">{{m4TodayTcLast}}</div>
          <div class="NumWidthTime">发生时间</div>
          <div class="NumCon NumWidth">{{m4TodayTimeLast == "--" ? m4TodayTimeLast :m4TodayTimeLast.slice(5,16)}}</div>
        </div>       
      </div>
    </div>
    <!-- 选择时间 -->
    <div class="nChooseTime" @click="m4openPicker">
      <div class="nTimeText">选择时间</div>
      <div class="nTime">{{nowdatam4}}</div>
      <div class="nTimeBtn"></div>
    </div>
    <mt-datetime-picker
      ref="m4picker"
      type="date"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      @confirm="handleConfirmm4"
      :visible-item-count="5" 
    >
    </mt-datetime-picker>
  </div>
</template>

<script>
import echarts from "echarts"
import demo from "../../utils/demo.js"
import mock from '@/utils/mock.js'
import { Indicator } from 'mint-ui';
const changeTime = demo.changeTime
const nowTime = demo.nowTime
const loadFactor = mock.loadFactor

export default {
  name: 'monitorTab4',
  components: {

  },
  data () {
    return {
      nowdatam4:"",
      m4dis:false,
      m4dispA: true,
      m4dispB: true,
      m4dispC: true,
      loadFactor: mock.loadFactor,
      othId:"0",
      m4ta:"--",
      m4tb:"--",
      m4tc:"--",
      m4TodayTc:"--",
      m4TodayTime:"--",
      m4TodayTcLast:"--",
      m4TodayTimeLast:"--",
      m4LastTodayTc:"--",
      m4LastTodayTime:"--",
      lastDayShowTime:"",
      dayShowTime:""
    }
  },
  created(){
    this.nowTimes();
  },
  mounted(){
    this.nowdatam4 = nowTime();
    // 根据是否有数据，判断是否加载echars
    if(this.loadFactor.echarsLoadFactor.yesterdayData.length && this.loadFactor.echarsLoadFactor.todayData.length != 0){
      setTimeout(() => {
          let nEcharBox = echarts.init(document.getElementById('nEchars4'));
          nEcharBox.setOption(this.myEcharmon4())
      }, 0);
    }else{
      this.m4dis = 'true';
    };
    //数据为空，不显示单位
    if(loadFactor.windingTempA == ''){
      this.m4dispA = false;
    };
    if(loadFactor.windingTempB == ''){
      this.m4dispB = false;
    };
    if(loadFactor.windingTempC == ''){
      this.m4dispC = false;
    };
    //普通数据
    this.m4Init()
    //2天的echarts数据
    this.towDaysDataInit()
  },
  methods: {
    m4Init(){ 
      this.$axios({
          method:"GET",
          url:"/api/app/EnergyAnalysis/getSubstationtran"
      }).then((res)=>{
        this.othId = res.data[0].substation.looplist[0].id
        console.log(this.othId)
        // http://192.168.1.106:81/app/EnergyAnalysis/transformerRecordmax?transformerId=4&appEndTime=2019-03-21%2023%3A59%3A59&appStartTime=2019-03-21%2000%3A00%3A00
        this.$axios({
          method:"GET",
          url:"/api/app/EnergyAnalysis/transformerRecordmax?transformerId=" + this.othId + "&appEndTime=" + this.nowdatam4 + " "+ "23:59:59" + "&appStartTime=" + this.nowdatam4 + " "+  "00:00:00"
        }).then((res)=>{
          console.log(res)
          if(res.data){
            this.m4ta = res.data.ta
            this.m4tb = res.data.tb
            this.m4tc = res.data.tc
            this.m4TodayTc = res.data.tc
            this.m4TodayTime = res.data.createtime
          }
        })
        this.$axios({
          method:"GET",
          url:"/api/app/EnergyAnalysis/transformerRecordmax?transformerId=" + this.othId + "&appEndTime=" + this.lastToday()[0] + "&appStartTime=" + this.lastToday()[1] 
        }).then((res)=>{
          console.log(res)
          if(res.data){
            this.m4TodayTcLast = res.data.tc
            this.m4TodayTimeLast = res.data.createtime
          }
        })
      }).catch(()=>{
          console.log("网络错误")
      })

    },
    //2天的echarts图
    towDaysDataInit(){
      Indicator.open("加载中")
        this.$axios({
            method:"GET",
            url:"/api/app/EnergyAnalysis/getSubstationtran"
        }).then((res)=>{
          this.othId = res.data[0].substation.looplist[0].id
          this.$axios({
          method:"GET",
          url:"/api/app/EnergyAnalysis/transformerRecord?transformerId=" + this.othId + "&appEndTime=" + this.nowdatam4 + " "+ "23:59:59" + "&appStartTime=" + this.nowdatam4 + " "+  "00:00:00"
        }).then((res)=>{
          var arrone = []
          console.log(res)
          if(res.data.length){
            var data = res.data
            for(var i=0;i<10;i++){
              arrone.push(data[i].tc)
            }
          }

          this.$axios({
            method:"GET",
            url:"/api/app/EnergyAnalysis/transformerRecord?transformerId=" + this.othId +  "&appEndTime=" + this.lastToday()[0] + "&appStartTime=" + this.lastToday()[1] 
          }).then((res)=>{
            var arrtwo = []
            if(res.data.length){
              var data = res.data
              for(var i=0;i<10;i++){
                arrtwo.push(data[i].tc)
              }
            }
            setTimeout(() => {
                let nEcharBox = echarts.init(document.getElementById('nEchars4'));
                nEcharBox.setOption(this.myEcharmon4(arrone,arrtwo))
            }, 0);
            Indicator.close()
          })
        })

        }).catch(()=>{
            console.log("网络错误")
            Indicator.close()
        })
       
    },
    repetitionChange(startTime,endTime){
      Indicator.open("加载中")
        this.$axios({
            method:"GET",
            url:"/api/app/EnergyAnalysis/getSubstationtran"
        }).then((res)=>{
          this.othId = res.data[0].substation.looplist[0].id
           this.$axios({
          method:"GET",
          url:"/api/app/EnergyAnalysis/transformerRecord?transformerId=" + this.othId + "&appEndTime=" + endTime + "&appStartTime=" + startTime
        }).then((res)=>{
          var arrone = []
          var arrtwo = []
          if(res.data.length){
            var data = res.data
            for(var i=0;i<10;i++){
              arrone.push(data[i].tc)
              arrtwo.push(data[i].tb)
            }
            setTimeout(() => {
                let nEcharBox = echarts.init(document.getElementById('nEchars4'));
                nEcharBox.setOption(this.myEcharmon4(arrone,arrtwo))
            }, 0);
            Indicator.close()
          }else{
            //没数据的时候变成那啥的空数据页面
            console.log("空数据页面")
            Indicator.close()
          }


        })
        }).catch(()=>{
            console.log("网络错误")
            Indicator.close()
        })
    },
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
        return year + "-" + mouth + "-" + day + " " + "00:00:00"
      }else{
        return year + "-" + mouth + "-" + day + " " + "23:59:59"
      }
    },
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
    
    m4openPicker() {
      this.$refs.m4picker.open();
    },
    handleConfirmm4(value){
      let mytime = changeTime(value)
      console.log(mytime)
      this.nowdatam4 = mytime
      let startTimer = mytime + " " + "00:00:00"
      let endTimer = mytime + " " + "23:59:59"
      console.log(startTimer)
      console.log(endTimer)
      this.repetitionChange(startTimer,endTimer)
      this.m4Init()

    },
    lastToday(){
      let abc = this.nowdatam4
      let str = abc.split("-")[0]+"-"+abc.split("-")[1]+"-"+(parseInt(abc.split("-")[2])-1)
      this.lastDayShowTime = abc.split("-")[1]+"-"+(parseInt(abc.split("-")[2])-1)
      this.dayShowTime = abc.split("-")[1]+"-"+parseInt(abc.split("-")[2])
      return [str + " 23:59:59" , str + " 00:00:00"]
    },
    nowTimes(){
        let year = new Date().getFullYear();
        let month =new Date().getMonth() + 1 < 10? "0" + (new Date().getMonth() + 1): new Date().getMonth() + 1;
        let date =new Date().getDate() < 10? "0" + new Date().getDate(): new Date().getDate();
        let hh =new Date().getHours() < 10? "0" + new Date().getHours(): new Date().getHours();
        let mm =new Date().getMinutes() < 10? "0" + new Date().getMinutes(): new Date().getMinutes();
        this.nowTime = year + "-" + month + "-" + date +" "+" "+hh+":"+mm ;
    },
    // monitor-tab1-echars
    myEcharmon4(data1,data2){
        var option = {
          title: {
              text: '单位：℃',
              textStyle: {
                  fontWeight: 'normal',
                  fontSize: 12,
                  color: '#F1F1F3'
              },
              left: '0%',
              top:'4%'
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
              itemGap: 10,
              data: [this.lastDayShowTime, this.dayShowTime],
              right: '0%',
              textStyle: {
                  fontSize: 12,
                  color: '#fff',
              },
              top:'4%'
          },
          xAxis: {
            type: 'category',
            data: ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00'],
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
              name: this.lastDayShowTime,
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
              data: data1
          },{
              name: this.dayShowTime,
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
              data: data2
          }, ]
      };
      return option
      }
  }
}
</script>
<style>
#monitorTab4  .mint-datetime-confirm{
      text-align: right;
      padding-right: 20px;
      box-sizing: border-box;
      color: #00AFD5;
  }
#monitorTab4  .mint-datetime-cancel{
      text-align: left;
      padding-left: 20px;
      box-sizing: border-box;
      color: #4C545D;
  }
#monitorTab4{
  width: 100%;
  text-align:center;
  color:#fff;
  height:calc(100vh - 3.28rem);
  overflow: scroll;
}
/* 采集时间 */
#monitorTab4 .mTimeBox{
  width: 7.1rem;
  height: 0.68rem;
  font-size: 0.24rem;
  text-align: right;
  line-height: 0.68rem;
  margin: 0 auto 0 auto;
}
/* 采集信息头部 */
#monitorTab4 .mHeadBox{
  width: 7.1rem;
  height: 1.2rem;
  margin-top: 0.24rem;
  margin: 0 auto 0 auto;
  display: flex;
}
#monitorTab4 .nHead{
  width: 2.2rem;
  height: 1.2rem;
  background:rgba(63,75,89,1);
  box-shadow:0 0.04rem 0.1rem 0 rgba(0,0,0,0.1);
  border-radius: 0.08rem;
  position: relative;
}
#monitorTab4 .nHeadBorder{
  width: 2.2rem;
  height: 0.08rem;
  position: absolute;
  bottom: 0;
  box-shadow:0 0.04rem 0.1rem 0 rgba(0,0,0,0.1);
  border-radius:0rem 0rem 0.08rem 0.08rem;
}
#monitorTab4 .nHeadText{
  height:0.4rem;
  font-size: 0.3rem;
  margin-top: 0.2rem;
  font-weight: 5rem;
}
#monitorTab4 .nHeadBei{
  font-size: 0.24rem;
  margin-top: 0.05rem;
}
#monitorTab4 .nHeadMargin{
  margin-right: 0.26rem;
}
#monitorTab4 .nHeadColor01{
  background:#FFF063;
}
#monitorTab4 .nHeadColor02{
  background:#4DEFC7;
}
#monitorTab4 .nHeadColor03{
  background:#FD667B;
}
#monitorTab4 .nhm{
  font-size: 0.16rem;
}
/* 统计图 */
#monitorTab4 .nEchar{
  width:6.9rem;
  height:6.6rem;
  background:rgba(255,255,255,0.03);
  box-shadow:0 0.08rem 0.32rem 0 rgba(0,0,0,0.3);
  border-radius: 0.16rem;
  margin: 0.24rem auto 0 auto;
}
#monitorTab4 .noimg{
  width:5rem;
  margin-top:0.1rem;
}
#monitorTab4 .nodata{
  text-align:center;
  line-height:2.7rem;
  font-size: 0.3rem;
  position:absolute;
  left:50%;
  margin-left:-0.55rem;
}
/* 统计图 - 统计图盒子 */
#monitorTab4 #nEchars4,#monitorTab4 .noEcharUp{
  width: 6.5rem;
  height: 3.98rem;
  margin: 0.24rem 0.2rem;
  border-bottom: 0.02rem solid rgba(46,57,69,1);
}
/* 统计图 - 内容盒子 */
#monitorTab4 .echarNumBox{
  width: 6.2rem;
  height: 2.1rem;
  margin: 0 auto;
}
#monitorTab4 .echarNum{
  width: 100%;
  height: 50%;
  font-size: 0.24rem;
  color: #fff;
  text-align: center;
  display: flex;
}
#monitorTab4 .NumLine{
  text-align: center !important;
  line-height: 0.4rem !important;
  margin-top: 0.2rem;
}
#monitorTab4 .echarNum div{
  height: 100%;
  line-height: 1rem;
  text-align: left;
}
#monitorTab4 .NumCon{
  color: #62D6EF;
}
#monitorTab4 .NumWidthTime{
  width: 20%;
}
#monitorTab4 .NumWidth{
  width: 25%;
}
/* 选择时间 */
#monitorTab4 .nChooseTime{
  width:7.5rem;
  height:0.9rem;
  background:rgba(255,255,255,0.03);
  box-shadow:0 0.04rem 0.1rem 0 rgba(0,0,0,0.1);
  margin-top: 0.24rem;
  position: relative;
  font-size: 0.26rem;
  display: flex;
}

#monitorTab4 .nTimeText{
  height:0.9rem;
  line-height: 0.9rem;
  text-align: left;
  margin-left: 0.34rem;
}
#monitorTab4 .nTime{
  width: 1.5rem;
  line-height: 0.9rem;
  position: absolute;
  left: 50%;
  margin-left: -0.75rem;
  color: #62D6EF;
}
#monitorTab4 .nTimeBtn{
  width: 0.2rem;
  height:0.9rem;
  background: url('../../../static/img/selectTime@2x.png') no-repeat;
  background-size: 0.2rem;
  position: absolute;
  right: 0.4rem;
  top:0.4rem;
}
</style>
