<template>
  <div id="energyTab2">
    <div>
      <div class="h4">最大负荷</div>
      <div class="big">
        <div>
          <div>
            <span>{{this.mouth === "" ? "--" :this.mouth}}</span>
            <span>kW</span>
          </div>
          <div>本月</div>
        </div>
        <div>
          <div>
            <span>{{this.year === "" ? "--" : this.year}}</span>
            <span>kW</span>
          </div>
          <div>本年</div>
        </div>
        <div>
          <div>
            <span>{{this.history === "" ? "--" :this.history}}</span>
            <span>kW</span>
          </div>
          <div>历史</div>
        </div>
      </div>
      <div class="h4">负荷分析</div>
      <div class="analysis">
        <div class="selecttime">
          <div @click="selecttime(1)" :class="select===1?'active':''">实时数据
            <!-- <img src="../../../static/img/pathwhite@2x.png" alt="" class="pathSize"> -->
          </div>
          <div @click="selecttime(2)" :class="select===2?'active':''">日数据
            <img src="../../../static/img/pathwhite@2x.png" alt="" class="pathSize">
          </div>
          <div @click="selecttime(3)" :class="select===3?'active':''">月数据
            <img src="../../../static/img/pathwhite@2x.png" alt="" class="pathSize">
          </div>
        </div>
        <div class="datas">
          <div id="echartrua"></div>
          <div class="data">
            <div>
              <div>
                <div>最大负荷(kW)</div>
                <div>{{this.listMax}}</div>
              </div>
              <div>
                <div>最小负荷(kW)</div>
                <div>{{this.listMin}}</div>
              </div>
              <div>
                <div>平均负荷(kW)</div>
                <div>{{this.listMid}}</div>
              </div>
              <div>
                <div>峰谷差率(%)</div>
                <div>{{this.listGufeng}}</div>
              </div>
            </div>
            <div>
              <div>
                <div>发生时间</div>
                <div>{{this.listMaxTime}}</div>
              </div>
              <div>
                <div>发生时间</div>
                <div>{{this.listMinTime}}</div>
              </div>
              <div>
                <div>峰谷差(kW)</div>
                <div>{{this.listGufengcha}}</div>
              </div>
              <div>
                <div>负荷率(%)</div>
                <div>{{this.listLoad}}</div>
              </div>
            </div>
          </div>
        </div>
        
      </div>
    </div>
    

    <!-- 实时数据选择时间 -->
    <mt-datetime-picker
        ref="picker"
        type="date"
        year-format="{value} 年"
        month-format="{value} 月"
        date-format="{value} 日"
        @confirm="handleConfirm"
        :visible-item-count="5" 
      >
    </mt-datetime-picker>
    <!-- 日数据选择时间 -->
    <pickertime :status="status" v-on:childArr="changeDate"></pickertime>
    <!-- 月数据选择 -->
    <pickertime :status="statusmouth" v-on:childArr="changeMouth" mouthorday="mouth"></pickertime>
  </div>
</template>

<script>
  import echarts from "echarts"
  import mock from '@/utils/mock.js'
  import pickertime from "../pickerTime.vue"
  import demo from "../../utils/demo.js"
  const changeTime = demo.changeTime

  const mocktab = mock.allLoad
  export default {
    name: 'energyTab2',
    components: {
      pickertime
    },
    data() {
      return {
        select: 1,
        bigload:[],
        echartsData: [],
        changeLoad: [],
        status:false,
        statusmouth:false,
        treeArr:[],
        firstId:"0",
        year:"",
        mouth:"",
        history:"",
        //选择日数据
        daystartData:"",
        dayendData:"",
        //选择月数据
        mouthstartData:"",
        mouthendData:"",
        //列表数据
        //最大负荷
        listMax:"--",
        //最小负荷
        listMin:"--",
        //平均负荷
        listMid:"--",
        //谷峰差率
        listGufeng:"--",
        //最大负荷发生时间
        listMaxTime:"--",
        //最小负荷发生时间
        listMinTime:"--",
        //谷峰差
        listGufengcha:"--",
        //负荷率
        listLoad:"--",
      }
    },
    mounted() {
      this.echartsData = mocktab.echartsData
      this.changeLoad = mocktab.changeLoad
      this.bigload = mocktab.maxload
      //本月 本年 历史 最大负荷
      this.startInitLoad()





    },
    methods: {
      echartData(){

      },
      startInitLoad(){
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
              // /app/EnergyAnalysis/intoLineRecord?intolineId=60&appEndTime=”2019-03-18 23:59:59&appStartTime=”2019-03-18 00:00:00”
              //月数据
              this.$axios({
                method:"GET",
                url:"/api/app/EnergyAnalysis/intoLineRecordmax?intolineId="+this.firstId+"&appEndTime="+this.endMouth()+"&appStartTime="+this.startMouth(),
              }).then((res)=>{
                if(res.data.max.p){
                  this.mouth = res.data.max.p
                }else{
                  this.mouth = "--"
                }
              }).catch(()=>{
                console.log("网络错误")
              })
              //年数据
              this.$axios({
                method:"GET",
                url:"/api/app/EnergyAnalysis/intoLineRecordmax?intolineId="+this.firstId+"&appEndTime="+this.endYear()+"&appStartTime="+this.startYear(),
              }).then((res)=>{
                if(res.data.max.p){
                  this.year = res.data.max.p
                }else{
                  this.year = "--"
                }
              }).catch(()=>{
                console.log("网络错误")
              })
              // 历史数据
              this.$axios({
                method:"GET",
                url:"/api/app/EnergyAnalysis/intoLineRecordmax?intolineId="+this.firstId,
              }).then((res)=>{
                if(res.data.max.p){
                  this.history = res.data.max.p
                }else{
                  this.history = "--"
                }
              }).catch(()=>{
                console.log("网络错误")
              })
              //列表初始化
              this.$axios({
                method:"GET",
                url:"/api/app/EnergyAnalysis/intoLineRecordmax?intolineId="+this.firstId+"&appEndTime="+this.nowday("end")+"&appStartTime="+this.nowday("start")
              }).then((res)=>{
                console.log(res,"初始化列表数据")
                this.listMax = res.data.max.p
                this.listMin = res.data.min.p
                this.listMid = (res.data.max.p + res.data.min.p)/2
                this.listMaxTime = res.data.max.createTime
                this.listMinTime = res.data.min.createTime
                //初始化的echarts
                //http://192.168.1.103:81/app/EnergyAnalysis/intoLineRecord?intolineId=60&appEndTime=2019-03-20%2023%3A59%3A59&appStartTime=2019-03-20%2000%3A00%3A00
                let arr = [this.listMax]
                for(var i=0;i<7;i++){
                  let random = Math.random()*(this.listMax-this.listMin)
                  arr.push(random)
                }
                arr.push(this.listMin)
                console.log(arr)
                let timer = ['0:00', '2:00', '4:00',"6:00","8:00","10:00","12:00","14:00","16:00","18:00"]
                setTimeout(() => {
                  let eCharts = echarts.init(document.getElementById('echartrua'));
                  eCharts.clear()
                  eCharts.setOption(this.options(arr,timer),true)
                },0)
              }).catch(()=>{
                console.log("网络错误")
              })

          }).catch(()=>{
              console.log("网络错误")
          })
        })
      },
      //开始时间
      startMouth(){
        let date = new Date()
        let year = date.getFullYear();
        let mouth = date.getMonth()+1;
        if(mouth.toString().length == 1){
          mouth = "0"+mouth
        }
        return year + "-" + mouth + "-" + "01" + " " + "00:00:00"
      },
      endMouth(){
        let date = new Date()
        let year = date.getFullYear();
        let mouth = date.getMonth()+1;
        if(mouth.toString().length == 1){
          mouth = "0"+mouth
        }
        return year + "-" + mouth + "-" + "28" + " " + "23:59:59"
      },
      startYear(){
        let date = new Date()
        let year = date.getFullYear();
        return year + "-" + "01" + "-" + "01" + " " + "00:00:00"
      },
      endYear(){
        let date = new Date()
        let year = date.getFullYear();
        return year + "-" + "12" + "-" + "31" + " " + "23:59:59"
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
      //选择日数据
      changeDate(val){  
        this.daystartData = val.startTime[0].replace(/[^0-9]/ig,"") + '-' + val.startTime[1].replace(/[^0-9]/ig,"") + "-" + val.startTime[2].replace(/[^0-9]/ig,"")
        this.dayendData = val.finishTime[0].replace(/[^0-9]/ig,"") + '-' + val.finishTime[1].replace(/[^0-9]/ig,"") + "-" + val.finishTime[2].replace(/[^0-9]/ig,"")
        console.log(this.toSureTimer(this.daystartData))
        console.log(this.toSureTimer(this.dayendData))
        console.log(this.firstId)
        this.$axios({
          method:"GET",
          url:"/api/app/EnergyAnalysis/intoLineRecordmax?intolineId="+this.firstId+"&appEndTime="+this.toSureTimer(this.dayendData)+"&appStartTime="+this.toSureTimer(this.daystartData),
        }).then((res)=>{
          console.log(res)
          if(res.data.max !== null){
            this.listMax = res.data.max.p
            this.listMin = res.data.min.p
            this.listMid = (res.data.max.p + res.data.min.p)/2
            this.listMaxTime = res.data.max.createTime
            this.listMinTime = res.data.min.createTime
            //选择完成后重新加载echarts
            this.$axios({
              method:"GET",
              url:"/api/app/EnergyAnalysis/intoLineRecord?intolineId="+this.firstId+"&appEndTime="+this.toSureTimer(this.dayendData)+"&appStartTime="+this.toSureTimer(this.daystartData)
            }).then((res)=>{
              console.log("jinlaile")
              let arr = [this.listMax]
              for(var i=0;i<7;i++){
                let random = Math.random()*(this.listMax-this.listMin)
                arr.push(random)
              }
              arr.push(this.listMin)
              let timer = ["1号", "3号", "6号", "9号", "12号", "15号", "18号", "21号", "24号", "27号"]
              console.log(arr)
              setTimeout(() => {
                let eCharts = echarts.init(document.getElementById('echartrua'));
                eCharts.clear()
                eCharts.setOption(this.options(arr,timer),true)
              },0)
            }).catch(()=>{
              console.log("网络错误")
            })
          }else{
            this.listMax = "--"
            this.listMin = "--"
            this.listMid = "--"
            this.listGufeng = "--"
            this.listMaxTime = "--"
            this.listMinTime = "--"
            this.listGufengcha = "--"
            this.listLoad = "--"
          }
        }).catch(()=>{
          console.log("网络错误")
        })




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
      openPicker(){
        this.status = !this.status
      },
      handleConfirm(value){
        let mytime = changeTime(value)
        this.nowdata = mytime
        let eCharts = echarts.init(document.getElementById('echartrua'));
        eCharts.clear();
        eCharts.setOption(this.options(),true)
      },
      changeMouth(value){
        console.log(value)
        let startTimer = value.startTime[0].replace(/[^0-9]/ig,"") + '-' + value.startTime[1].replace(/[^0-9]/ig,"") + "-" +"1"
        let endTimer = value.finishTime[0].replace(/[^0-9]/ig,"") + '-' + value.finishTime[1].replace(/[^0-9]/ig,"") + "-" + "28"
        console.log(this.toSureTimer(startTimer))
        console.log(this.toSureTimer(endTimer))

        this.$axios({
          method:"GET",
          url:"/api/app/EnergyAnalysis/intoLineRecordmax?intolineId="+this.firstId+"&appEndTime="+this.toSureTimer(endTimer)+"&appStartTime="+this.toSureTimer(startTimer),
        }).then((res)=>{
          console.log(res)
          if(res.data.max !== null){
            this.listMax = res.data.max.p
            this.listMin = res.data.min.p
            this.listMid = (res.data.max.p + res.data.min.p)/2
            this.listMaxTime = res.data.max.createTime
            this.listMinTime = res.data.min.createTime
            let arr = [this.listMax]
            for(var i=0;i<9;i++){
              let random = Math.random()*(this.listMax-this.listMin)
              arr.push(random)
            }
            arr.push(this.listMin)
            let timer = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月","11月","12月"]
            setTimeout(() => {
              let eCharts = echarts.init(document.getElementById('echartrua'));
              eCharts.clear()
              eCharts.setOption(this.options(arr,timer),true)
            },0)

          }else{
            this.listMax = "--"
            this.listMin = "--"
            this.listMid = "--"
            this.listGufeng = "--"
            this.listMaxTime = "--"
            this.listMinTime = "--"
            this.listGufengcha = "--"
            this.listLoad = "--"
          }
        }).catch(()=>{
          console.log("网络错误")
        })


        //选择完成后重新加载echarts
        this.$axios({
          method:"GET",
          url:"/api/app/EnergyAnalysis/intoLineRecord?intolineId="+this.firstId+"&appEndTime="+this.toSureTimer(endTimer)+"&appStartTime="+this.toSureTimer(startTimer)
        }).then((res)=>{
          console.log(res)
          let data = res.data
          let newarr = []
          for(let i = 0; i<10 ; i++){
            newarr.push(data[i].p)
          }
          console.log(newarr)
          // let timer = []
          setTimeout(() => {
            let eCharts = echarts.init(document.getElementById('echartrua'));
            eCharts.clear()
            eCharts.setOption(this.options(newarr))
          },0)
        }).catch(()=>{
          console.log("网络错误")
        })

      },
      selecttime(num) {
        this.select = num;
        //实时数据选择
        if(num == "1"){
          console.log("实时数据选择")
        //日数据选择
        }else if(num == "2"){
          this.status = !this.status
        //月数据选择  
        }else if(num == "3"){
          this.statusmouth = !this.statusmouth
        }
      },
      options(data,timer,maxdata,mindata) {
        let option = {
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
              color: 'rgba(255,255,255,0.7)'
            }
          },
          grid: {
            left: '12%',
            top: '26%',
            right: '8%',
            bottom: '18%'
          },
          yAxis: {
            type: 'value',
            name: '单位:kW',
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
          series: [
            {
              data: maxdata,
              type: 'line',
              smooth: true,
              showSymbol: false,
              lineStyle: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 1,
                  y2: 0,
                  colorStops: [{
                    offset: 0, color: '#388CDA' // 0% 处的颜色
                  }, {
                    offset: 1, color: '#00BEDB' // 100% 处的颜色
                  }],
                  global: false // 缺省为 false
                }
              }
            },
            {
              data: mindata,
              type: 'line',
              smooth: true,
              showSymbol: false,
              lineStyle: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 1,
                  y2: 0,
                  colorStops: [{
                    offset: 0, color: '#388CDA' // 0% 处的颜色
                  }, {
                    offset: 1, color: '#00BEDB' // 100% 处的颜色
                  }],
                  global: false // 缺省为 false
                }
              }
            },
            {
              data: data,
              // name: '01月12日负载率',
              type: 'line',
              smooth: true,
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
            }
          ],
          tooltip: {
            show: true,
            trigger: 'axis',
            formatter: (params) => {
              return params[0].data + '<br>时间：' + params[0].axisValue
            },
            axisPointer: {
              lineStyle: {
                color: {
                  type: 'linear',
                  x: 0,
                  y: 0,
                  x2: 0,
                  y2: 1,
                  colorStops: [{
                    offset: 0, color: '#3C4754' // 0% 处的颜色
                  }, {
                    offset: 1, color: '#FFFFFF' // 100% 处的颜色
                  }],
                  global: false // 缺省为 false
                },
                width: 2
              }
            }
          },
          legend: {
              top:'2%'
          }
        };
        return option
      }
    }
  }
</script>
<style>
#energyTab2  .mint-datetime-confirm{
      text-align: right;
      padding-right: 20px;
      box-sizing: border-box;
      color: #00AFD5;
  }
#energyTab2  .mint-datetime-cancel{
      text-align: left;
      padding-left: 20px;
      box-sizing: border-box;
      color: #4C545D;
  }
  #energyTab2 {
    width: 100%;
    text-align: center;
    height:calc(100vh - 3.28rem);
    overflow: scroll;
  }

  #energyTab2 > div {
    padding: 0.12rem 0.28rem 0 0.32rem;
  }

  #energyTab2 .h4 {
    font-size: 0.26rem;
    line-height: 0.36rem;
    height: 0.36rem;
    color: rgba(233, 242, 252, 1);
    text-align: left;
    margin: 0;
    font-weight: 400;
  }

  #energyTab2 .big {
    display: flex;
    justify-content: space-between;
    margin: 0.08rem 0 0.2rem;
  }

  #energyTab2 .big > div {
    width: 2.2rem;
    height: 0.88rem;
    background: linear-gradient(305deg, rgba(255, 128, 164, 1) 0%, rgba(251, 74, 124, 1) 100%);
    box-shadow: 0 0.04rem 0.1rem 0 rgba(0, 0, 0, 0.1);
    border-radius: 0.08rem;
    padding-top: 0.12rem;
    font-weight: 400;
  }

  #energyTab2 .big > div:nth-of-type(2) {
    background: linear-gradient(305deg, rgba(55, 198, 181, 1) 0%, rgba(56, 140, 218, 1) 100%);
  }

  #energyTab2 .big > div:nth-of-type(3) {
    background: linear-gradient(305deg, rgba(240, 213, 42, 1) 0%, rgba(248, 140, 70, 1) 100%);
  }

  #energyTab2 .big > div > div {
    line-height: 0.34rem;
    height: 0.34rem;
    font-size: 0.24rem;
    color: white;
  }

  #energyTab2 .big > div > div:nth-of-type(1) {
    height: 0.44rem;
  }

  #energyTab2 .big > div > div > span:nth-of-type(1) {
    font-size: 0.32rem;
  }

  #energyTab2 .big > div > div > span:nth-of-type(2) {
    font-size: 0.18rem;
  }

  #energyTab2 .selecttime {
    margin: 0.22rem 0.1rem 0.22rem 0.1rem;
    display: flex;
    justify-content: space-between;
  }

  #energyTab2 .selecttime > div {
    width: 1.8rem;
    height: 0.52rem;
    font-size: 0.26rem;
    color: rgba(255, 255, 255, 0.7);
    border-radius: 0.39rem;
    display: flex;
    justify-content: center;
    align-items: center;
    line-height: 0.52rem;
  }

  #energyTab2 .selecttime .active {
    background: linear-gradient(305deg, rgba(96, 232, 171, 1) 0%, rgba(25, 159, 188, 1) 97%);
    box-shadow: 0 0.04rem 0.1rem 0 rgba(0, 0, 0, 0.1);
    color: white;
  }

  #energyTab2 .datas {
    width: 6.56rem;
    margin: 0 auto;
    height: 6.96rem;
    border-radius: 0.16rem;
    background: rgba(255, 255, 255, 0.03);
    box-shadow: 0 0.08rem 0.32rem 0 rgba(0, 0, 0, 0.3);
    padding: 0 0.16rem 0 0.18rem;
  }

  #energyTab2 #echartrua {
    height: 3.46rem;
    border-bottom: 0.04rem solid rgba(46, 57, 69, 1);
    width:6.56rem;
  }

  #energyTab2 .data {
    width: 200%;
    margin-top: 0.48rem;
    height: 5.6rem;
    display: flex;
    transform-origin: top left;
    transform: scale(0.5);
  }

  #energyTab2 .data > div {
    height: 100%;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
  }

  #energyTab2 .data > div > div {
    width: 100%;
    display: flex;
  }

  #energyTab2 .data > div > div > div:nth-of-type(1) {
    font-size: 0.48rem;
    color: white;
    text-align: left;
  }

  #energyTab2 .data > div > div > div:nth-of-type(2) {
    font-size: 0.48rem;
    color: #62d6ef;
  }

  #energyTab2 .data > div:nth-of-type(1) {
    width: 6.08rem;
    border-right: 0.04rem solid rgba(46, 57, 69, 1);
  }

  #energyTab2 .data > div:nth-of-type(1) > div > div:nth-of-type(1) {
    margin-left: 0.24rem;
    width: 3.24rem;
  }

  #energyTab2 .data > div:nth-of-type(1) > div > div:nth-of-type(2) {
    width: 1.6rem;
    text-align: center;
  }

  #energyTab2 .data > div:nth-of-type(2) {
    width: 6.96rem;
  }

  #energyTab2 .data > div:nth-of-type(2) > div > div:nth-of-type(1) {
    margin-left: 1rem;
    width: 2.76rem;
  }

  #energyTab2 .data > div:nth-of-type(2) > div > div:nth-of-type(2) {
    width: 3.2rem;
    text-align: center;
  }

  #energyTab2 .pathSize{
    width: 0.2rem;
    margin-left: 0.1rem;
    padding-top: 0.05rem;
  }
</style>
