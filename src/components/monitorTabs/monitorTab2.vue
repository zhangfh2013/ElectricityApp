<template>
  <div id="monitorTab2">

    <!-- 采集时间 -->
    <div class="mTimeBox">采集时间 {{nowTime}}</div>

    <!-- 采集信息头部 -->
    <div class="mHeadBox">
      <div class="nHead nHeadMargin">
        <div class="nHeadText">{{this.m2iaNum || '--'}}<span class="nhm" v-if="dispA">A</span></div>
        <div class="nHeadBei">A相电流</div>
        <div class="nHeadBorder nHeadColor01"></div>
      </div>
      <div class="nHead nHeadMargin">
        <div class="nHeadText">{{this.m2ibNum || '--'}}<span class="nhm" v-if="dispB">A</span></div>
        <div class="nHeadBei">B相电流</div>
        <div class="nHeadBorder nHeadColor02"></div>
      </div>
      <div class="nHead">
        <div class="nHeadText">{{this.m2icNum || '--'}}<span class="nhm" v-if="dispC">A</span></div>
        <div class="nHeadBei">C相电流</div>
        <div class="nHeadBorder nHeadColor03"></div>
      </div>
    </div>
    <!-- 统计图 -->
    <div class="nEchar">
        <div v-if="dis">
          <p class="nodata" >暂无数据</p>
          <img class="noimg"  src="../../../static/img/noDate@2x.png">
      </div>
      <div id="m2EcharsBox" v-else></div>
    </div>
    <!-- 选择时间 -->
    <div class="nChooseTime" @click="openPicker">
        <div class="nTimeText">选择时间</div>
        <div class="nTime">{{nowdatam2}}</div>
        <div class="nTimeBtn"></div>
    </div>
    <mt-datetime-picker
      ref="picker"
      type="date"
      year-format="{value} 年"
      month-format="{value} 月"
      date-format="{value} 日"
      @confirm="m2handleConfirm"
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
const electricityInLine = mock.electricityInLine
export default {
  name: 'monitorTab2',
  components: {

  },
  data () {
    return {
      nowdatam2:"",
      m2dis:false,
      m2dispA: true,
      m2dispB: true,
      m2dispC: true,
      electricityInLine: mock.electricityInLine,
      echartsElectricity: mock.electricityInLine.echartsElectricity,
      //A/B/C向电流
      m2iaNum:'--',
      m2ibNum:'--',
      m2icNum:'--',
    }
  },  
  created(){
    this.nowTimes();
  },
  mounted(){
    this.nowdatam2 = nowTime();
    this.startILoad();
    // 根据是否有数据，判断是否加载echars
    if(this.echartsElectricity.dataA.length && this.echartsElectricity.dataB.length && 
        this.echartsElectricity.dataC.length != 0){
      setTimeout(() => {
          let m2EcharsBox = echarts.init(document.getElementById('m2EcharsBox'));
          m2EcharsBox.setOption(this.m2Echars())
      }, 0);
    }else{
      this.m2dis = true;
    };
    //数据为空，不显示单位
    if(electricityInLine.electricityA == ''){
      this.m2dispA = false;
    };
    if(electricityInLine.electricityB == ''){
      this.m2dispB = false;
    };
    if(electricityInLine.electricityC == ''){
      this.m2dispC = false;
    }
  },
  methods: {
    startILoad(){
      this.$axios({
          method:"GET",
          //获取第一个变压器id
          url:"/api/app/EnergyAnalysis/getSubstation",
        }).then((res)=>{
          this.firstId = res.data[0].substation.looplist[0].id
          console.log(this.firstId)
          this.$axios({
              method:"GET",
              url:"/api/app/index/getSubstation"
          }).then((res)=>{
            //电流
            this.$axios({
              method:"GET",
              url:"/api/app/EnergyAnalysis/intoLineRecord?intolineId="+this.firstId+"&appEndTime="+this.nowday("end")+"&appStartTime="+this.nowday("start")
            }).then((res)=>{
              // A/B/C向电流
              this.m2iaNum = res.data[0].ia
              this.m2ibNum = res.data[0].ib
              this.m2icNum = res.data[0].ic
              //初始化的echarts，选择第一个变压器的数据
              let data = res.data
              let m2Ia = []
              let m2Ib = []
              let m2Ic = []
              for(let i = 0; i<8 ; i++){
                m2Ia.push(data[i].ia)
                m2Ib.push(data[i].ib)
                m2Ic.push(data[i].ic)
              }
              // 初始化Echars
              let timer = ['00:00', '03:20', '06:40', '10:00', '13:20', '16:40', '20:00', '23:20']
              setTimeout(() => {
                let eCharts = echarts.init(document.getElementById('m2EcharsBox'));
                eCharts.clear()
                eCharts.setOption(this.m2Echars(m2Ia,m2Ib,m2Ic,timer),true)
              },0)
            }).catch(()=>{
              console.log("网络错误")
            })
          })
        }).catch(()=>{
          console.log("网络错误")
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
    // 选择时间后重绘Echars
    m2handleConfirm(value){
      Indicator.open("加载中")
      this.nowdatam2 = changeTime(value)
      let mytime = changeTime(value)
      let selectStar = mytime + ' ' + '00' + ':' + '00' + ':' + '00'
      let selectEnd = mytime + ' ' + '23' + ':' + '59' + ':' + '59'
      console.log(selectStar,selectEnd)
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
                if(res.data.length == 0){
                  console.log('没有数据：' + 111111111111111);
                  Indicator.close()
                }else{
                  //初始化的echarts
                  console.log(res);
                  let data = res.data
                  let m2Iay = []
                  let m2Iby = []
                  let m2Icy = []
                  for(let i = 0; i<8 ; i++){
                    m2Iay.push(data[i].ia)
                    m2Iby.push(data[i].ib)
                    m2Icy.push(data[i].ic)
                  }
                  let timer = ['00:00', '03:20', '06:40', '10:00', '13:20', '16:40', '20:00', '23:20']
                  let eCharts = echarts.init(document.getElementById('m2EcharsBox'));
                  eCharts.clear();
                  eCharts.setOption(this.m2Echars(m2Iay,m2Iby,m2Icy,timer),true)    
                  Indicator.close()
                }
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
    handleConfirm(value){
      let mytime = changeTime(value)
      this.nowdatam2 = mytime
    },
    nowTimes(){
        let year = new Date().getFullYear();
        let month =new Date().getMonth() + 1 < 10? "0" + (new Date().getMonth() + 1): new Date().getMonth() + 1;
        let date =new Date().getDate() < 10? "0" + new Date().getDate(): new Date().getDate();
        let hh =new Date().getHours() < 10? "0" + new Date().getHours(): new Date().getHours();
        let mm =new Date().getMinutes() < 10? "0" + new Date().getMinutes(): new Date().getMinutes();
        this.nowTime = year + "-" + month + "-" + date +" "+" "+hh+":"+mm ;
    },
    //折线图
    m2Echars(dataPA,dataPB,dataPC,timer){
    let  option = {
    legend: {
              icon: 'circle',
              itemWidth: 8,
              itemHeight: 8,
              itemGap: 13,
              data: ['A', 'B','C'],
              right: '2%',
              top:'2%',
              textStyle: {
                  fontSize: 12,
                  color: '#fff'
              }
    },
    tooltip: {
        trigger: 'axis',
        axisPointer: {
            lineStyle: {
                color: '#57617B'
            }
        }
    },
    title: {
              text: '单位：A',
              textStyle: {
                  fontWeight: 'normal',
                  fontSize: 12,
                  color: '#F1F1F3'
              },
              left: '1%',
              top:'2%'
          },
    grid: {
        left: '3%',
        right: '6%',
        bottom: '3%',
        top:'12%',
        containLabel: true
    },
     xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['00:00', '03:20', '06:40', '10:00', '13:20', '16:40', '20:00', '23:20'],
            axisLine: {
              show: true,//false，去掉横纵坐标的刻度线
              lineStyle: {// 属性lineStyle控制线条样式
                color: '#68707A',
                width: 1,
                type: 'solid'
              }
            },
            axisTick: {
              show: false
            },
            axisPointer: {
                show: true
            },
            axisLabel: {
              color: 'rgba(255,255,255,0.7)'
            }
          },
    yAxis:{
        type: 'value',
        nameTextStyle: {
              color: '#ffffff',
              align: 'left',
              padding: [0, 13, 0, 0]
        },
        axisTick: {
            show: false
        },
        axisLine: {
            show: true,//false，去掉横纵坐标的刻度线
            lineStyle: {       // 属性lineStyle控制线条样式
              color: '#68707A',
              width: 1,
              type: 'solid'
            },
        },
        axisLabel: {
              color: 'rgba(255,255,255,0.7)'
        },
        splitLine: {//控制纵坐标每一刻度的横向标识
          lineStyle: {
              color: '#68707A'
          }
        }
    },
    
    series: [{
        name: 'A',
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
                color: '#FFF063',
                borderWidth: 12,
            }
        },
        data: dataPA
    }, {
        name: 'B',
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
                color: '#4DEFC7',
                borderWidth: 12
            }
        },
        data: dataPB
    },{
        name: 'C',
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
                color: '#FD667B',
                borderWidth: 12
            }
        },
        data: dataPC 
    }, ]
    };
    return option
    }
  }
}
</script>
<style>
#monitorTab2  .mint-datetime-confirm{
      text-align: right;
      padding-right: 20px;
      box-sizing: border-box;
      color: #00AFD5;
  }
#monitorTab2  .mint-datetime-cancel{
      text-align: left;
      padding-left: 20px;
      box-sizing: border-box;
      color: #4C545D;
  }
#monitorTab2 .disp{
  display: none;
}
#monitorTab2{
  width: 100%;
  text-align:center;
  color: #fff;
  height:calc(100vh - 3.28rem);
  overflow: scroll;
}
/* 采集时间 */
#monitorTab2 .mTimeBox{
  width: 7.1rem;
  height: 0.68rem;
  font-size: 0.24rem;
  text-align: right;
  line-height: 0.68rem;
  margin: 0 auto 0 auto;
}
/* 采集信息头部 */
#monitorTab2 .mHeadBox{
  width: 7.1rem;
  height: 1.2rem;
  margin-top: 0.24rem;
  margin: 0 auto 0 auto;
  display: flex;
}
#monitorTab2 .nHead{
  width: 2.2rem;
  height: 1.2rem;
  background:rgba(63,75,89,1);
  box-shadow:0 0.04rem 0.1rem 0 rgba(0,0,0,0.1);
  border-radius: 0.08rem;
  position: relative;
}
#monitorTab2 .nHeadBorder{
  width: 2.2rem;
  height: 0.08rem;
  position: absolute;
  bottom: 0;
  box-shadow:0 0.04rem 0.1rem 0 rgba(0,0,0,0.1);
  border-radius:0rem 0rem 0.08rem 0.08rem;
}
#monitorTab2 .nHeadText{
  height:0.4rem;
  font-size: 0.3rem;
  margin-top: 0.2rem;
  font-weight: 5rem;
}
#monitorTab2 .nHeadBei{
  font-size: 0.24rem;
  margin-top: 0.05rem;
}
#monitorTab2 .nHeadMargin{
  margin-right: 0.26rem;
}
#monitorTab2 .nHeadColor01{
  background:#FFF063;
}
#monitorTab2 .nHeadColor02{
  background:#4DEFC7;
}
#monitorTab2 .nHeadColor03{
  background:#FD667B;
}
#monitorTab2 .nhm{
  font-size: 0.16rem;
}
#monitorTab2 .noimg{
  width:5rem;
  margin-top:2rem;
}
#monitorTab2 .nodata{
  text-align:center;
  line-height:6.6rem;
  font-size: 0.3rem;
  position:absolute;
  left:50%;
  margin-left:-0.55rem;
}
/* 统计图 */
#monitorTab2 .nEchar{
  width:6.9rem;
  height:6.6rem;
  background:rgba(255,255,255,0.03);
  box-shadow:0 0.08rem 0.32rem 0 rgba(0,0,0,0.3);
  border-radius: 0.16rem;
  margin: 0.24rem auto 0 auto;
}
#m2EcharsBox{
  width:6.9rem;
  height:6.6rem;
  overflow: hidden; 
}
/* 选择时间 */
.nChooseTime{
  width:7.5rem;
  height:0.9rem;
  background:rgba(255,255,255,0.03);
  box-shadow:0 0.04rem 0.1rem 0 rgba(0,0,0,0.1);
  margin-top: 0.24rem;
  position: relative;
  font-size: 0.26rem;
  display: flex;
}

#monitorTab2 .nTimeText{
  height:0.9rem;
  line-height: 0.9rem;
  text-align: left;
  margin-left: 0.34rem;
}
#monitorTab2 .nTime{
  width: 1.5rem;
  line-height: 0.9rem;
  position: absolute;
  left: 50%;
  margin-left: -0.75rem;
  color: #62D6EF;
}
#monitorTab2 .nTimeBtn{
  width: 0.2rem;
  height:0.9rem;
  background: url('../../../static/img/selectTime@2x.png') no-repeat;
  background-size: 0.2rem;
  position: absolute;
  right: 0.4rem;
  top:0.4rem;
}
</style>
