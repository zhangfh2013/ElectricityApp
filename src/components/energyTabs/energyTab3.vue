<template>
  <div id="energyTab3">
    <div class="enHeadText">计量总表</div>

    <div class="enCardBox">
      <div class="enCardHead">
        <div class="enSelectYear" @click="openPicker">{{nowdata}}年<div class="enSelectBtn"></div></div>
        <!-- <div class="enDate">结算日：<span>25</span></div> -->
      </div>
      <div class="enEchars">
        <div id="enEchar"></div>
      </div>
    </div>

    <div class="entab">
            <div class="head">
                <div>时间</div>
                <div>有功功率</div>
                <div>无功功率</div>
                <div>功率因数</div>
            </div>
            <div class="scroll">
              <div class="entable">
                <div class="content" v-for="(item,index) in dataArr">
                  <div>{{item.createTime.slice(0,7)}}</div>
                  <div>{{item.p}}</div>
                  <div>{{item.q}}</div>
                  <div>{{item.pf}}</div>
                </div>
              </div>

            </div>
        </div>
        <mt-datetime-picker
            ref="picker"
            type="date"
            year-format="{value} 年"
            @confirm="handleConfirm"
            :visible-item-count="5" 
          >
        </mt-datetime-picker>

  </div>
</template>

<script>
import echarts from "echarts"
import BScroll from 'better-scroll'
import mock from '@/utils/mock.js'
import demo from "../../utils/demo.js"
import { setTimeout } from 'timers';
const changeTime = demo.changeTime
const mocktab1 = mock.energyAnalysis
const yearTable = mock.powerFactor.yearTable

export default {
  name: 'energyTab3',
  components: {

  },
  data () {
    return {
      mocktab1: mocktab1.monthElectricity,
      yearTable: mock.powerFactor.yearTable,
      nowdata:"2017",
      startTime:"",
      endTime:"",
      dataArr:[]
    }
  },
  mounted(){
    this.initThree()

    


  },
  methods: {
    initThree(){
      this.startTime = new Date().getFullYear()
      this.$axios({
        method:"GET",
        //获取第一个变压器id
        url:"/api/app/EnergyAnalysis/getSubstation",
      }).then((res)=>{
        this.firstId = res.data[0].substation.looplist[0].id
        console.log(this.startTime)
        // console.log(this.endTime)
        // http://192.168.1.106:81/app/EnergyAnalysis/intoLineRecordyear?intolineId=60&appStartTime=2019
        this.$axios({
          method:"GET",
          url:"/api/app/EnergyAnalysis/intoLineRecordyear?intolineId=" + this.firstId + "&appStartTime=" + this.startTime
        }).then((res)=>{
          console.log(res)
          let data = res.data
          this.dataArr = res.data
          let arr = []
          data.forEach((item)=>{
            arr.push(item.pf)
          })
          setTimeout(()=>{
            let eCharts = echarts.init(document.getElementById('enEchar'));
            eCharts.clear()
            eCharts.setOption(this.optionsthree(arr))
          },0)
        })



        }).catch(()=>{
            console.log("网络错误")
        })
    },
    openPicker() {
      this.$refs.picker.open();
    },
    handleConfirm(value){
      let mytime = changeTime(value)
      this.startTime = mytime + " 00:00:00"
      this.nowdata = mytime.slice(0,4)
      this.endTime = this.nowdata + "-12-31 " + "23:59:59"
      console.log(this.startTime)
      console.log(this.endTime)
      console.log(this.firstId)
    },
    // energy-echars
    optionsthree(data){
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
              data: ['实际值', '合格门限值'],
              right: '2%',
              textStyle: {
                  fontSize: 12,
                  color: '#fff',
              },
              top:'2%'
          },
          grid: {
            left: '12%',
            top: '20%',
            right: '1%',
            bottom: '18%',
          },
          xAxis: {
            type: 'category',
            data: ['1月',"2月", '3月',"4月",'5月',"6月",'7月',"8月",'9月',"10月",'11月',"12月"],
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
          yAxis: {
            type: 'value',
            max:1.0,
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
              interval: 0 ,
              color: 'rgba(255,255,255,0.7)'
            }
          },
          series: [{
              name: '实际值',
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
                      color: '#00BEDB',
                  }
              },
              data: data
          },{
              name: '合格门限值',
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
                      color: '#FF7CA1',
                  }
              },
              data: ["1","1","1","1","1","1","1","1","1","1","1","1"]
          }]
      };
      return option
      },
  }
}
</script>
<style>

#energyTab3  .mint-datetime-confirm{
      text-align: right;
      padding-right: 20px;
      box-sizing: border-box;
      color: #00AFD5;
  }
#energyTab3  .mint-datetime-cancel{
      text-align: left;
      padding-left: 20px;
      box-sizing: border-box;
      color: #4C545D;
  }
#energyTab3{
  width: 100%;
  text-align:center;
  color:rgba(233,242,252,1);
  height:calc(100vh - 3.38rem);
  overflow: scroll;
}
#energyTab3 .enHeadText{
  width:1.04rem;
  height:0.36rem;
  font-size:0.26rem;
  font-weight:400;
  line-height:0.36rem;
  margin: 0.14rem 0 0.1rem 0.18rem;
}
#energyTab3 .enCardBox{
  width: 6.9rem;
  height: 4rem;
  background:rgba(255,255,255,0.03);
  box-shadow:0 0.08rem 0.32rem 0 rgba(0,0,0,0.3);
  border-radius:0.16rem;
  margin: 0 auto 0.26rem auto;
}
#energyTab3 .enCardHead{
  width: 6.9rem;
  height: 0.7rem;
  border-bottom: 0.02rem solid rgba(46,57,69,1);
  display: flex;
  position: relative;
}
#energyTab3 .enSelectYear{
  width:1.2rem;
  height:0.7rem;
  font-size:0.26rem;
  font-weight:400;
  color:rgba(98,214,239,1);
  line-height:0.7rem;
  margin-left: 0.2rem;
  display: flex;
}
#energyTab3 .enSelectBtn{
  width:0.2rem;
  height:0.7rem;
  background: url('../../../static/img/selectTime@2x.png') no-repeat;
  background-size: 0.2rem;
  background-position-y: 0.32rem;
  margin-left: 0.1rem;
}
#energyTab3 .enDate{
  width:1.52rem;
  height:0.4rem;
  background:linear-gradient(305deg,rgba(96,232,171,1) 0%,rgba(25,159,188,1) 97%);
  border-radius:0.08rem;
  font-size:0.24rem;
  margin: 0.16rem 0 0 0;
  line-height: 0.4rem;
  position: absolute;
  right: 0.2rem;
}
#energyTab3 .enEchars,#energyTab3 #enEchar{
  width: 6.9rem;
  height: 3.24rem;
}
/* list */
#energyTab3 .entab .head,#energyTab3 .entab .content{
    width:100%;
    height:0.6rem;
    display:flex;
    justify-content: center;
    align-items: center;
    font-size:0.26rem;
    color:rgba(233,242,252,1);
    line-height:0.6rem;
}
#energyTab3 .entab .head{
    background:rgba(52,64,76,1);
}
#energyTab3 .entab .content:nth-of-type(odd){
    background:rgba(57,69,79,1);
}
#energyTab3 .entab .head>div,#energyTab3 .entab .content>div{
  width:25%;
  height:100%;
  text-align:center;
}
#energyTab3 .scroll{
  height:calc(100vh - 8.85rem);
  overflow-y:scroll;
}
</style>
