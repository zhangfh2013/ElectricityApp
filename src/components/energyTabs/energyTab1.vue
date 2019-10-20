<template>
  <div id="energyTab1">
      <div class="times" @click="openPicker"><span>{{showtime}}<img class="xiala" src="../../../static/img/selectTime@2x.png" alt=""></span></div>
      <div class="mycharts">
          <div class="h3">构成分析</div>
          <div class="ul">
              <div>
                  <div>
                      <div id="echarts1"></div>
                       <div>-- %</div><!-- {{(energyAnalysis.tip / energyAnalysisall).toFixed(2) + '%'}} -->
                  </div>
                  <div>
                      <span>尖:</span>
                      <span>--</span>
                      <span> kWh</span>
                  </div>
              </div>
              <div>
                  <div>
                      <div id="echarts2"></div>
                      <div>-- %</div><!--{{(energyAnalysis.top / energyAnalysisall).toFixed(2)  + '%'}} -->
                  </div>
                  <div>
                      <span>峰:</span>
                      <span>--</span>
                      <span> kWh</span>
                  </div>
              </div>
              <div>
                  <div>
                      <div id="echarts3"></div>
                      <div>-- %</div><!-- {{(energyAnalysis.flat / energyAnalysisall).toFixed(2)  + '%'}} -->
                  </div>
                  <div>
                      <span>平:</span>
                      <span>--</span>
                      <span> kWh</span>
                  </div>
              </div>
              <div>
                  <div>
                      <div id="echarts4"></div>
                      <div class="blod">-- %</div><!-- {{(energyAnalysis.valley / energyAnalysisall).toFixed(2)  + '%'}} -->
                  </div>
                  <div>
                      <span>谷:</span>  
                      <span>--</span>
                      <span> kWh</span>
                  </div>
              </div>
          </div>
      </div>

         <div class="mytab">
            <div class="head">
                <div>时间</div>
                <div>尖电量</div>
                <div>峰电量</div>
                <div>平电量</div>
                <div>谷电量</div>
            </div>
            <div class="scroll">
              <div class="mytable">
                <div class="content" v-for="(item,index) in timeArr">
                  <div>{{item}}</div>
                  <div>--</div>
                  <div>--</div>
                  <div>--</div>
                  <div>--</div>
                </div>
              </div>

            </div>
        </div>
        <pickertime :status="status" v-on:childArr="changeDate" mouthorday="mouth"></pickertime>
        
  </div>
</template>

<script>
import demo from "../../utils/demo.js"
import mock from '@/utils/mock.js'
import echarts from "echarts"
import BScroll from 'better-scroll'
const changeTime = demo.changeTime
const mocktab1 = mock.energyAnalysis

import pickertime from "../pickerTime.vue"
import { isIP } from 'net';

export default {
  name: 'energyTab1',
  components: {
    pickertime
  },
  data () {
    return {
      energyAnalysisall: -(-mocktab1.tip - mocktab1.top - mocktab1.flat - mocktab1.valley),
      energyAnalysis: mocktab1,
      mocktab1: mocktab1.monthElectricity,
      status:false,
      showtime:"请选择时间段",
      timeArr:[]
    }
  },
  mounted(){
    setTimeout(() => {
      let eCharts1 = echarts.init(document.getElementById('echarts1'));
      let eCharts2 = echarts.init(document.getElementById('echarts2'));
      let eCharts3 = echarts.init(document.getElementById('echarts3'));
      let eCharts4 = echarts.init(document.getElementById('echarts4'));
       eCharts1.setOption(this.myPie([0, 0], '#E0E7EF'))//#FF5585
      eCharts2.setOption(this.myPie([0, 0], '#E0E7EF'))//#FBFE86
      eCharts3.setOption(this.myPie([0, 0], '#E0E7EF'))//#53DEBE
      eCharts4.setOption(this.myPie([0, 0], '#E0E7EF'))//#50ABDB
    }, 100)

    let date = new Date()
    let mouth = date.getMonth()+1
    let year = date.getFullYear()
    console.log(mouth.toString().length)
    let arr = []  
    for(var i=0;i<mouth;i++){
      if(mouth.toString().length == 1){
        arr.push(year+"-0"+(i+1))
      }else{
        arr.push(year+"-"+(i+1))
      }
    }
    this.timeArr = arr
    

  },
  methods: {
    openPicker(){
      this.status = !this.status
    },
    changeDate(val){
      this.showtime = val.startTime[0].replace(/[^0-9]/ig,"") + '/' + val.startTime[1].replace(/[^0-9]/ig,"") + '/' + "-" + val.finishTime[0].replace(/[^0-9]/ig,"") + '/' + val.finishTime[1].replace(/[^0-9]/ig,"")
      // console.log(this.showtime);
      // console.log(val)
      // console.log(val.startTime[0].slice(0,4))
      // console.log(val.finishTime[0].slice(0,4))
      // let arr = []
      // let differ = parseInt(val.finishTime[0].slice(0,4)) - parseInt(val.startTime[0].slice(0,4))
      // console.log(differ)
      // for(let i=0;i<differ;i++){
      //   if(val.startTime[1].slice(0,1) == 1){

      //   }
      // }
      // console.log(val.startTime[1].slice(0,1))
      // console.log(arr)

    },
    myPie(data,color){
      let option = {
        series: [
          {
            // animationDuration: 2000,
            silent: true,
            name: '访问来源',
            type: 'pie',
            // hoverOffsset: 10,
            radius: ['80%', '100%'],
            avoidLabelOverlap: false,
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [
              {
                value: data[0],
                name: 'as',
                itemStyle: {
                  color: color
                }
                // label: {
                //   fontSize: '12',
                //   // fontWeight: 'bold',
                //   color: '#111519',
                //   formatter: Math.round(data[0] / (data[0] + data[1])) + '%',
                //   position: 'inside',
                //   align: 'center',
                //   verticalAlign: 'center'
                // },
              },
              {
                value: data[1],
                name: 'asas',
                itemStyle: {
                  color: '#E0E7EF'
                }
              }
            ]
          }
        ]
      }
      return option
    }
  }

}
</script>
<style>
.mint-tab-item-label{
  font-size:0.28rem !important;
}
.xiala{
  height:0.06rem;
  width:0.12rem;
  position: absolute;
  right: 2.6rem;
  top: 0.4rem;
}
#energyTab1{
  width: 100%;
  text-align:center;
}
#energyTab1 .times{
  height: 0.8rem;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #62D6EF;
  font-size: 0.26rem;
  position:relative;
}
.mycharts{
  /*width: 7.1rem;*/
  margin: 0 0.2rem;
  height: 3.8rem;
  border-radius: 0.2rem;
  background: #ffffff;
  box-shadow:0 0.04rem 0.12rem 0 rgba(0,0,0,0.1);
}
#energyTab1 .h3{
  height: 0.36rem;
  line-height: 0.36rem;
  font-size: 0.26rem;
  color: #111519;
  padding-top: 0.32rem;
  margin-left: 0.2rem;
  text-align: left;
}
#energyTab1 .ul{
  margin-top: 0.44rem;
  display: flex;
  flex-wrap: wrap;
}
#energyTab1 .ul>div{
  width: calc(50% - 0.33rem);
  padding-left: 0.33rem;
  display: flex;
  align-items: center;
}
#energyTab1 .ul>div:nth-of-type(n+3){
  margin-top: 0.6rem;
}
#energyTab1 .ul>div>div:nth-of-type(1){
  width: 0.8rem;
  height: 0.8rem;
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  /*background-color: red;*/
}
#energyTab1 .ul>div>div:nth-of-type(1)>div:nth-of-type(1){
  position: absolute;
  left: -0.09rem;
  top: -0.1rem;
  bottom: 0;
  right: 0;
}
#energyTab1 .ul>div>div:nth-of-type(1)>div:nth-of-type(2){
  font-size: 0.20rem;
  color: #111519;
  font-weight: 550;
}
#energyTab1 .ul>div>div:nth-of-type(2){
  display: flex;
  align-items: end;
}
/*#echarts1{*/
#echarts1,#echarts2,#echarts3,#echarts4{
  width: 1rem;
  height: 1rem;
  
}
/*}*/
#energyTab1 .ul>div>div>span:nth-of-type(1){
  font-size: 0.24rem;
  line-height: 0.24rem;
  color: #111519;
  margin-left: 0.24rem;
}
#energyTab1 .ul>div>div>span:nth-of-type(2){
  font-size: 0.3rem;
  line-height: 0.3rem;
  color: #62D6ef;
  margin-left: 0.1rem;
}
#energyTab1 .ul>div>div>span:nth-of-type(3){
  font-size: 0.36rem;
  line-height: 0.36rem;
  color:rgba(76,84,93,0.7);
  transform: scale(0.5);
  transform-origin: left center;
}
#energyTab1 .mytab{
  margin-top:0.24rem;
}
#energyTab1 .mytab .head,#energyTab1 .mytab .content{
    width:100%;
    height:0.6rem;
    display:flex;
    justify-content: center;
    align-items: center;
    font-size:0.26rem;
    color:rgba(233,242,252,1);
    line-height:0.6rem;
}
#energyTab1 .mytab .head{
    background:rgba(52,64,76,1);
}
#energyTab1 .mytab .content:nth-of-type(odd){
    background:rgba(57,69,79,1);
}
#energyTab1 .mytab .head>div,#energyTab1 .mytab .content>div{
  width:20%;
  height:100%;
  text-align:center;
}
#energyTab1 .scroll{
  height:calc(100vh - 8.7rem);
  overflow-y:scroll;
}

</style>
