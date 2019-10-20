<template>
  <div id="monitorTab3">

    <!-- 选择时间段 -->
    <div class="power" v-show="noChoose">
      <div class="mMargin" @click="selecttime(1)" :class="select===1?'active':''">1小时
            <!--<img src="" alt="">-->
      </div>
      <div class="mMargin" @click="selecttime(2)" :class="select===2?'active':''">6小时</div>
      <div @click="selecttime(3)" :class="select===3?'active':''">一天</div>
    </div>

    <!-- 统计图 -->
    <div class="m3EcharsUp">
      <div id="m3EcharsUp"></div>
    </div>
    <div class="m3EcharDown">
      <div id="m3EcharDown"></div>
    </div>

    <!-- 选择时间 -->
    <div class="nChooseTime" @click="openPicker">
      <div class="nTimeText">选择时间</div>
      <div class="nTime">{{nowdatam3}}</div>
      <div class="nTimeBtn"></div>
    </div>
    <mt-datetime-picker
      ref="picker"
      type="date"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      @confirm="m3handleConfirm"
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
const qualityOnLine = mock.qualityOnLine
export default {
  name: 'monitorTab3',
  components: {

  },
  data () {
    return {
      select: 1,
      nowdatam3:"",
      qualityOnLine:mock.qualityOnLine,
      timeSelect:mock.qualityOnLine.timeOne,
      noChoose:true,
      firstId:"0"
    }
  },
  mounted(){
    this.nowdatam3 = nowTime()
    this.m3init();

  },
  methods: {
    // 默认时间为一小时
    m3init(){
      this.$axios({
          method:"GET",
          url:"/api/app/EnergyAnalysis/getSubstation"
      }).then((res)=>{
        this.firstId = res.data[0].substation.looplist[0].id
        this.$axios({
            method:"GET",
            url:"/api/app/index/getSubstation"
        }).then((res)=>{
          this.$axios({
            method:"GET",
            url:"/api/app/EnergyAnalysis/intoLineRecord?intolineId=" + this.firstId+"&appEndTime=" + this.oneHour("end") + "&appStartTime=" + this.oneHour("onehour")
            // url:"/api/app/EnergyAnalysis/intoLineRecord?intolineId=" + this.firstId+"&appEndTime=" + this.nowday("end") + "&appStartTime=" + this.nowday("start")
          }).then((res)=>{
            console.log(res);
            if(res.data.length == 0){
              console.log('暂无数据')
            }else{
              // 第一个Echars的初始化，选择第一个变压器的数据
                let data = res.data
                let m3Ia = []
                let m3Ib = []
                let m3Ic = []
                for(let i = 0; i<8 ; i++){
                  m3Ia.push(data[i].ia)
                  m3Ib.push(data[i].ib)
                  m3Ic.push(data[i].ic)
                }
                // 初始化Echars
                let date = new Date();
                let hour = date.getHours();
                if(hour.toString().length == 1){
                  hour =  "0" + hour
                }
                let timer = [(hour-1) + ':00', (hour-1) + ':10', (hour-1) + ':20', (hour-1) + ':30', (hour-1) + ':40',(hour-1) +  ':50',(hour-1) +  ':50',(hour) +  ':00']
                setTimeout(() => {
                  let eCharts = echarts.init(document.getElementById('m3EcharsUp'));
                  eCharts.clear()
                  eCharts.setOption(this.m3Echars1(m3Ia,m3Ib,m3Ic,timer),true)
                },0)
                // 第二个Echars的初始化，选择第一个变压器的数据
                let m3Ua = []
                let m3Ub = []
                let m3Uc = []
                for(let i = 0; i<8 ; i++){
                  m3Ua.push(data[i].ua)
                  m3Ub.push(data[i].ub)
                  m3Uc.push(data[i].uc)
                }
                console.log(m3Ua,m3Ub,m3Uc)
                // 初始化Echars
                setTimeout(() => {
                  let eCharts = echarts.init(document.getElementById('m3EcharDown'));
                  eCharts.clear()
                  eCharts.setOption(this.m3Echars2(m3Ua,m3Ub,m3Uc,timer),true)
                },0)
              }
          })
          })
      }).catch(()=>{
          console.log("网络错误")
      })
    },
    // 选择时间一小时/六小时/一天
    m3initselect(num){
      Indicator.open("加载中")
      this.$axios({
          method:"GET",
          url:"/api/app/EnergyAnalysis/getSubstation"
      }).then((res)=>{
        this.$axios({
            method:"GET",
            url:"/api/app/index/getSubstation"
        }).then((res)=>{
          console.log(num);
          // 选择一小时---------------------------------------------------------------------------------------
          if(num == 1){
            this.$axios({
              method:"GET",
              url:"/api/app/EnergyAnalysis/intoLineRecord?intolineId=" + this.firstId+"&appEndTime=" + this.oneHour("end") + "&appStartTime=" + this.oneHour("onehour")
            }).then((res)=>{
              console.log(res);
              if(res.data.length == 0){
                console.log('1小时：暂无数据')
                Indicator.close()
              }else{
                // 第一个Echars的初始化，选择第一个变压器的数据
                  let data = res.data
                  let m3Ia = []
                  let m3Ib = []
                  let m3Ic = []
                  for(let i = 0; i<8 ; i++){
                    m3Ia.push(data[i].ia)
                    m3Ib.push(data[i].ib)
                    m3Ic.push(data[i].ic)
                  }
                  // 初始化Echars
                  let date = new Date();
                  let hour = date.getHours();
                  if(hour.toString().length == 1){
                    hour =  "0" + hour
                  }
                  let timer = [(hour-1) + ':00', (hour-1) + ':10', (hour-1) + ':20', (hour-1) + ':30', (hour-1) + ':40',(hour-1) +  ':50',(hour-1) +  ':50',(hour) +  ':00']
                  setTimeout(() => {
                    let eCharts = echarts.init(document.getElementById('m3EcharsUp'));
                    eCharts.clear()
                    eCharts.setOption(this.m3Echars1(m3Ia,m3Ib,m3Ic,timer),true)
                  },0)
                  // 第二个Echars的初始化，选择第一个变压器的数据
                  let m3Ua = []
                  let m3Ub = []
                  let m3Uc = []
                  for(let i = 0; i<8 ; i++){
                    m3Ua.push(data[i].ua)
                    m3Ub.push(data[i].ub)
                    m3Uc.push(data[i].uc)
                  }
                  // 初始化Echars
                  setTimeout(() => {
                    let eCharts = echarts.init(document.getElementById('m3EcharDown'));
                    eCharts.clear()
                    eCharts.setOption(this.m3Echars2(m3Ua,m3Ub,m3Uc,timer),true)
                  },0)
                  Indicator.close()
                }
              }).catch(()=>{
                console.log("网络错误")
                Indicator.close()
            })
          // 选择六小时-------------------------------------------------------------------------------
          }else if(num == 2){
              this.$axios({
              method:"GET",
              url:"/api/app/EnergyAnalysis/intoLineRecord?intolineId=" + this.firstId+"&appEndTime=" + this.sixHour("end") + "&appStartTime=" + this.sixHour("sixhour")
            }).then((res)=>{
              console.log(res);
              if(res.data.length == 0){
                console.log('6小时：暂无数据')
                Indicator.close()
              }else{
                // 第一个Echars的初始化，选择第一个变压器的数据
                  let data = res.data
                  let m3Ia = []
                  let m3Ib = []
                  let m3Ic = []
                  for(let i = 10; i<17 ; i++){
                    m3Ia.push(data[i].ia)
                    m3Ib.push(data[i].ib)
                    m3Ic.push(data[i].ic)
                  }
                  // 初始化Echars
                  let date = new Date();
                  let hour = date.getHours();
                  if(hour.toString().length == 1){
                    hour =  "0" + hour
                  }
                  let timer = [(hour-6) + ':00', (hour-5) + ':00', (hour-4) + ':00', (hour-3) + ':00', (hour-2) + ':00',(hour-1) +  ':00',hour +  ':00']
                  setTimeout(() => {
                    let eCharts = echarts.init(document.getElementById('m3EcharsUp'));
                    eCharts.clear()
                    eCharts.setOption(this.m3Echars1(m3Ia,m3Ib,m3Ic,timer),true)
                  },0)
                  // 第二个Echars的初始化，选择第一个变压器的数据
                  let m3Ua = []
                  let m3Ub = []
                  let m3Uc = []
                  for(let i = 0; i<8 ; i++){
                    m3Ua.push(data[i].ua)
                    m3Ub.push(data[i].ub)
                    m3Uc.push(data[i].uc)
                  }
                  // 初始化Echars
                  setTimeout(() => {
                    let eCharts = echarts.init(document.getElementById('m3EcharDown'));
                    eCharts.clear()
                    eCharts.setOption(this.m3Echars2(m3Ua,m3Ub,m3Uc,timer),true)
                  },0)
                  Indicator.close()
                }
              }).catch(()=>{
                console.log("网络错误")
                Indicator.close()
            })
            // 选择一天-------------------------------------------------------------------------------
          }else if(num == 3){
            this.$axios({
              method:"GET",
              url:"/api/app/EnergyAnalysis/intoLineRecord?intolineId=" + this.firstId+"&appEndTime=" + this.nowday("end") + "&appStartTime=" + this.nowday("start")
            }).then((res)=>{
              console.log(res);
              if(res.data.length == 0){
                console.log('1天:暂无数据')
                Indicator.close()
              }else{
                // 第一个Echars的初始化，选择第一个变压器的数据
                  let data = res.data
                  let m3Ia = []
                  let m3Ib = []
                  let m3Ic = []
                  for(let i = 0; i<7 ; i++){
                    m3Ia.push(data[i].ia)
                    m3Ib.push(data[i].ib)
                    m3Ic.push(data[i].ic)
                  }
                  // 初始化Echars
                  let timer = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00']
                  setTimeout(() => {
                    let eCharts = echarts.init(document.getElementById('m3EcharsUp'));
                    eCharts.clear()
                    eCharts.setOption(this.m3Echars1(m3Ia,m3Ib,m3Ic,timer),true)
                  },0)
                  // 第二个Echars的初始化，选择第一个变压器的数据
                  let m3Ua = []
                  let m3Ub = []
                  let m3Uc = []
                  for(let i = 0; i<7 ; i++){
                    m3Ua.push(data[i].ua)
                    m3Ub.push(data[i].ub)
                    m3Uc.push(data[i].uc)
                  }
                  // 初始化Echars
                  setTimeout(() => {
                    let eCharts = echarts.init(document.getElementById('m3EcharDown'));
                    eCharts.clear()
                    eCharts.setOption(this.m3Echars2(m3Ua,m3Ub,m3Uc,timer),true)
                  },0)
                  Indicator.close()
                }
              }).catch(()=>{
                console.log("网络错误")
                Indicator.close()
            })
          }
        })
      }).catch(()=>{
          console.log("网络错误")
          Indicator.close()
      })
    },

    // 选择时间后重绘Echars
    m3handleConfirm(value){
      Indicator.open("加载中")
      this.nowdatam3 = changeTime(value)
      let mytime = changeTime(value)
      let selectStar = mytime + ' ' + '00' + ':' + '00' + ':' + '00'
      let selectEnd = mytime + ' ' + '23' + ':' + '59' + ':' + '59'
      let hide = this.nowdayymd()
      if(mytime == hide){
        this.noChoose = true;
      }else{
        this.noChoose = false;
      }
      this.$axios({
          method:"GET",
          url:"/api/app/EnergyAnalysis/getSubstation"
      }).then((res)=>{
        this.firstId = res.data[0].substation.looplist[0].id
        this.$axios({
            method:"GET",
            url:"/api/app/index/getSubstation"
        }).then((res)=>{
          this.$axios({
            method:"GET",
            url:"/api/app/EnergyAnalysis/intoLineRecord?intolineId="+this.firstId+"&appEndTime="+selectEnd+"&appStartTime="+selectStar
          }).then((res)=>{
            if(res.data.length == 0){
              console.log('暂无数据')
              // 初始化Echars1
                setTimeout(() => {
                  let eCharts = echarts.init(document.getElementById('m3EcharsUp'));
                  eCharts.clear()
                  eCharts.setOption(this.m3Echars1(),true)
                },0)
              // 初始化Echars2
                setTimeout(() => {
                  let eCharts = echarts.init(document.getElementById('m3EcharDown'));
                  eCharts.clear()
                  eCharts.setOption(this.m3Echars2(),true)
                },0)
                Indicator.close()
            }else{
              // 第一个Echars的初始化，选择第一个变压器的数据
                let data = res.data
                let m3Ia = []
                let m3Ib = []
                let m3Ic = []
                for(let i = 0; i<7 ; i++){
                  m3Ia.push(data[i].ia)
                  m3Ib.push(data[i].ib)
                  m3Ic.push(data[i].ic)
                }
                // 初始化Echars
                let timer = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00']
                setTimeout(() => {
                  let eCharts = echarts.init(document.getElementById('m3EcharsUp'));
                  eCharts.clear()
                  eCharts.setOption(this.m3Echars1(m3Ia,m3Ib,m3Ic,timer),true)
                },0)
                // 第二个Echars的初始化，选择第一个变压器的数据
                let m3Ua = []
                let m3Ub = []
                let m3Uc = []
                for(let i = 0; i<7 ; i++){
                  m3Ua.push(data[i].ua)
                  m3Ub.push(data[i].ub)
                  m3Uc.push(data[i].uc)
                }
                console.log(m3Ua,m3Ub,m3Uc)
                // 初始化Echars
                setTimeout(() => {
                  let eCharts = echarts.init(document.getElementById('m3EcharDown'));
                  eCharts.clear()
                  eCharts.setOption(this.m3Echars2(m3Ua,m3Ub,m3Uc,timer),true)
                },0)
                Indicator.close()
              }
          })
          })
      }).catch(()=>{
          console.log("网络错误")
          Indicator.close()
      })
      
      // this.noChoose = !this.noChoose
    },
    openPicker() {
      
      this.$refs.picker.open();
    },
    // 今天日期-年月日
    nowdayymd(){
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
        return year + "-" + mouth + "-" + day
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
        return year + "-" + mouth + "-" + day + " " + "00:00:00"
      }else{
        return year + "-" + mouth + "-" + day + " " + "23:59:59"
      }
    },
    //取一小时的时间段  返回例子["2011-05-01 18:00:00", "2011-05-01 17:00:00"]
    oneHour(timer){
      let date = new Date();
      let hour = date.getHours();
      if(hour.toString().length == 1){
        hour =  "0" + hour
      }
      // return [this.nowdatam3 + " "+ (hour+2) + ":00:00" ,this.nowdatam3 + " "+ (hour+1) + ":00:00" ]
      if(timer == "onehour"){
        return this.nowdatam3 + " "+ (hour-2) + ":00:00"
      }else{
        return this.nowdatam3 + " "+ (hour-1) + ":00:00"
      }
    },
    //取6小时的时间段
    sixHour(timer){
      let date = new Date();
      let hour = date.getHours();
      if(hour.toString().length == 1){
        hour =  "0" + hour
      }
      // return [this.nowdatam3 + " "+ (hour+7) + ":00:00" ,this.nowdatam3 + " "+ (hour+6) + ":00:00" ]
      if(timer == "sixhour"){
        return this.nowdatam3 + " "+ (hour-7) + ":00:00"
      }else{
        return this.nowdatam3 + " "+ (hour-1) + ":00:00"
      }
    },
    //取一天的时间段
    oneDay(){
      return [this.nowdatam3 + " "+ "23:59:59" ,this.nowdatam3 + " "+  "00:00:00" ]
    },
    // echars选择1小时，6小时,1天
    selecttime(num) {
      if(num == '1'){
        this.m3initselect(num)
      }else if(num == '2'){
        this.m3initselect(num)
      }else if(num == '3'){
        this.m3initselect(num)
      }
      this.select = num      
    },
    // monitor-tab3-echars-1
    m3Echars1(m3data1,m3data2,m3data3,timer){
        let option = {
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
              data: ['I1', 'I2','I3'],
              right: '0%',
              textStyle: {
                  fontSize: 12,
                  color: '#fff',
              },
              top:'4%'
          },
          grid: {
            left: '12%',
            top: '20%',
            right: '0%',
            bottom: '18%',
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
          yAxis: {
            type: 'value',
            max:800,
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
              color: 'rgba(255,255,255,0.7)',
            }
          },
          series: [{
              name: 'I1',
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
                      color: '#FF7CA1',
                  }
              },
              data: m3data1
          },{
              name: 'I2',
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
                      color: '#F2C431',
                  }
              },
              data: m3data2
          }, {
              name: 'I3',
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
                      color: '#00BEDB',
                  }
              },
              data: m3data3
          }]
      };
      return option
      },
    // monitor-tab3-echars-2
    m3Echars2(m3data11,m3data22,m3data33,timer){
        let option = {
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
              data: ['U1', 'U2','U3'],
              right: '0%',
              textStyle: {
                  fontSize: 12,
                  color: '#fff',
              },
              top:'4%'
          },
          grid: {
            left: '12%',
            top: '20%',
            right: '0%',
            bottom: '18%',
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
              show:true,
              color: 'rgba(255,255,255,0.7)',
              interval: '0',
              rotate: 0,
              margin: 8,
            }
          },
          yAxis: {
            type: 'value',
            max:400,
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
              name: 'U1',
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
                      color: '#FF7CA1',
                  }
              },
              data: m3data11
          },{
              name: 'U2',
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
                      color: '#F2C431',
                  }
              },
              data: m3data22
          }, {
              name: 'U3',
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
                      color: '#00BEDB',
                  }
              },
              data: m3data33
          }]
      };
      return option
      },
  }
}
</script>
<style>
#monitorTab3  .mint-datetime-confirm{
      text-align: right;
      padding-right: 20px;
      box-sizing: border-box;
      color: #00AFD5;
  }
#monitorTab3  .mint-datetime-cancel{
      text-align: left;
      padding-left: 20px;
      box-sizing: border-box;
      color: #4C545D;
  }
#monitorTab3{
  width: 100%;
  text-align:center;
  color: #fff;
  height:calc(100vh - 3.28rem);
  overflow: scroll;
}
/* 时间选项卡 */
#monitorTab3 .power{
  width: 5.16rem;
  height: 0.4rem;
  margin: 0.32rem auto 0.24rem auto;
  display: flex;
  justify-content: space-between;
}
#monitorTab3 .power div {
  width: 1.8rem;
  height: 0.4rem;
  font-size: 0.24rem;
  color: rgba(255, 255, 255, 0.7);
  border-radius: 0.08rem;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #4F5963;
}
#monitorTab3 .mMargin{
  margin-right: 0.3rem;
}
#monitorTab3 .power .active {
  background: linear-gradient(305deg, rgba(96, 232, 171, 1) 0%, rgba(25, 159, 188, 1) 97%);
  box-shadow: 0 0.04rem 0.1rem 0 rgba(0, 0, 0, 0.1);
  color: white;
}
/* Echars */
#monitorTab3 .m3EcharsUp,#monitorTab3 .m3EcharDown{
  width:6.9rem;
  height:3.8rem;
  margin: 0 auto 0.17rem auto;
  background:rgba(255,255,255,0.03);
  box-shadow:0 0.08rem 0.32rem 0 rgba(0,0,0,0.3);
  border-radius:0.16rem;
}
/* Echars-1 */
#monitorTab3 #m3EcharsUp{
  width: 6.7rem;
  height:3.8rem;
}
/* Echars-2 */
#monitorTab3 #m3EcharDown{
  width: 6.7rem;
  height:3.8rem;
}
/* 选择时间 */
#monitorTab3 .nChooseTime{
  width:7.5rem;
  height:0.9rem;
  background:rgba(255,255,255,0.03);
  box-shadow:0 0.04rem 0.1rem 0 rgba(0,0,0,0.1);
  margin-top: 0.24rem;
  position: relative;
  font-size: 0.26rem;
  display: flex;
}

#monitorTab3 .nTimeText{
  height:0.9rem;
  line-height: 0.9rem;
  text-align: left;
  margin-left: 0.34rem;
}
#monitorTab3 .nTime{
  width: 1.5rem;
  line-height: 0.9rem;
  position: absolute;
  left: 50%;
  margin-left: -0.75rem;
  color: #62D6EF;
}
#monitorTab3 .nTimeBtn{
  width: 0.2rem;
  height:0.9rem;
  background: url('../../../static/img/selectTime@2x.png') no-repeat;
  background-size: 0.2rem;
  position: absolute;
  right: 0.4rem;
  top:0.4rem;
}
</style>
