<template>
  <div id="energyHome">
    <!-- head -->
    <div class="navHeadBox">
      <div class="goBack" @click="navPerson"><img src="../../../../static/img/person@2x.png" alt="" /></div>
      <div class="nhl-text" @click="look = !look">{{headName}}<img src="../../../../static/img/pathwhite@2x.png" ></div>
      <div class="Save" @click="navSave"><img src="../../../../static/img/alarm@2x.png" alt="" /></div>
    </div>
    <!-- Tree -->
    <div class="treeBox" @click="look = false" v-if="look"></div>
    <div class="treeBoxO" v-if="look">
      <div class="treeShow">
        <!-- 标题，默认出现 -->
        <div class="arrName" @click="af = !af">
          <img src="../../../../static/img/Path_black@2x.png" alt="" class="picTrue">
          能耗分析
        </div>
        <ul v-for="(item,index) in substion" >
          <!-- 第二层 -->
          <li @click="toggle(index)" v-if="!af"><img src="../../../../static/img/Path_black@2x.png" alt="" class="picTrue">{{item.substationName}}
          <!-- 第三层 -->
          <p @click.stop="change(items.id,items.name),look = false" v-for="(items,indexs) in item.looplist" v-show="showChildren[index]" :class="items.id == ser ? 'titleClick' : 'titleStyle'">{{items.name}}</p>
          </li>
        </ul>
      </div>
    </div>
    <!-- Tab -->
    <mt-navbar v-model="selected">
      <mt-tab-item id="tab-container1">总电量</mt-tab-item>
      <mt-tab-item id="tab-container2">总负荷</mt-tab-item>
      <mt-tab-item id="tab-container3">功率因数</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected" :swipeable="rua">
      <mt-tab-container-item id="tab-container1">
        <energyTab1></energyTab1>
      </mt-tab-container-item>
      <mt-tab-container-item id="tab-container2">
        <!-- <energyTab2></energyTab2> -->
        <!-- 第二个页面 -->
          <div id="energyTab2">
            <div>
              <div class="h4">最大负荷</div>
              <div class="big">
                <div>
                  <div>
                    <span>{{Math.round(parseInt(this.mouth)) || '--'}}</span>
                    <span>kW</span>
                  </div>
                  <div>本月</div>
                </div>
                <div>
                  <div>
                    <span>{{Math.round(parseInt(this.year)) || '--'}}</span>
                    <span>kW</span>
                  </div>
                  <div>本年</div>
                </div>
                <div>
                  <div>
                    <span>{{Math.round(parseInt(this.history)) || '--'}}</span>
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
                    <img src="../../../../static/img/pathwhite@2x.png" alt="" class="pathSize">
                  </div>
                  <div @click="selecttime(3)" :class="select===3?'active':''">月数据
                    <img src="../../../../static/img/pathwhite@2x.png" alt="" class="pathSize">
                  </div>
                </div>
                <div class="datas">
                  <div v-if="dis">
                    <p class="nodata" >暂无数据</p>
                    <img class="noimg"  src="../../../../static/img/noDate@2x.png">
                  </div>
                  <div id="echartrua" v-else></div>
                  <div class="data">
                    <div>
                      <div>
                        <div>最大负荷(kW)</div>
                        <div>{{this.listMax === "" ? "--" : this.listMax}}</div>
                      </div>
                      <div>
                        <div>最小负荷(kW)</div>
                        <div>{{this.listMin === "" ? "--" : this.listMin}}</div>
                      </div>
                      <div>
                        <div>平均负荷(kW)</div>
                        <div>{{Math.round(parseInt(this.listMid)) || '--'}}</div>
                      </div>
                      <div>
                        <div>峰谷差率(%)</div>
                        <div>{{this.listGufeng === "" ? "--" : this.listGufeng}}</div>
                      </div>
                    </div>
                    <div>
                      <div>
                        <div>发生时间</div>
                        <div>{{this.listMaxTime || '--'}}</div>
                      </div>
                      <div>
                        <div>发生时间</div>
                        <div>{{this.listMinTime || '--'}}</div>
                      </div>
                      <div>
                        <div>峰谷差(kW)</div>
                        <div>{{this.listGufengcha === "" ? "--" : this.listGufengcha}}</div>
                      </div>
                      <div>
                        <div>负荷率(%)</div>
                        <div>{{this.listLoad === "" ? "--" : this.listLoad}}</div>
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
      </mt-tab-container-item>
      <mt-tab-container-item id="tab-container3">
        <!-- 第三个页面 -->
        <!-- <energyTab3></energyTab3> -->
        <div id="energyTab3">
          <div class="enHeadText">计量总表</div>

          <div class="enCardBox">
            <div class="enCardHead">
              <div class="enSelectYear" @click="openPicker">{{nowdata}}年<div class="enSelectBtn"></div></div>
            </div>
            <div class="enEchars">
              <div v-if="dis2">
                <p class="nodata" >暂无数据</p>
                <img class="noimg"  src="../../../../static/img/noDate@2x.png">
              </div>
              <div id="enEchar" v-else></div>
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

      </mt-tab-container-item>
    </mt-tab-container>

    <navFoot :idx="1"></navFoot>
  </div>
</template>

<script>
import navFoot from "../../../components/navFoot.vue"
import energyTab1 from "@/components/energyTabs/energyTab1"
import energyTab2 from "@/components/energyTabs/energyTab2"
import energyTab3 from "@/components/energyTabs/energyTab3"
import treeMenu from "@/components/treeMenu.vue"
import echarts from "echarts"
import mock from '@/utils/mock.js'
import pickertime from "../../../components/pickerTime"
import demo from "../../../utils/demo.js"
import BScroll from 'better-scroll'
import { setTimeout, setInterval } from 'timers';
import { Indicator } from 'mint-ui';
const mocktab1 = mock.energyAnalysis
const yearTable = mock.powerFactor.yearTable
const changeTime = demo.changeTime
const toast = demo.toast
const mocktab = mock.allLoad

export default {
  name: 'energyHome',
  components: {
    'navFoot': navFoot,
    energyTab1 : energyTab1,
    energyTab2 : energyTab2,
    energyTab3 : energyTab3,
    pickertime:pickertime
  },
  data () {
    return {
      value:'',
      tabname: ["总电量", "总负荷","功率因数"],
      currentTab: "energyTab1",
      rua:true,
      selected:'tab-container1',
      headName:'能耗分析',
      // 设备Id
      id:0,
      ser:'',
      selectid:0,
      look:false,
      af:false,
      showChildren:[],
      substationList:[],
      substion:[],



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
      listMax:"",
      //最小负荷
      listMin:"",
      //平均负荷
      listMid:"",
      //谷峰差率
      listGufeng:"--",
      //最大负荷发生时间
      listMaxTime:"",
      //最小负荷发生时间
      listMinTime:"",
      //谷峰差
      listGufengcha:"--",
      //负荷率
      listLoad:"--",

      //第三页
      mocktab1: mocktab1.monthElectricity,
      yearTable: mock.powerFactor.yearTable,
      nowdata:"2017",
      startTime:"",
      endTime:"",
      dataArr:[],

      dis:false,
      dis2:false
    }
  },
  watch:{
    selected(val){
      console.log(val)
      if(val == "tab-container2"){
        console.log(this.firstId)
        if(window.localStorage.energyFirstId == this.firstId){
          //本月 本年 历史 最大负荷
          this.startInitLoad()
        }else{
          this.startInitLoad("next")
        }
      
      }else if(val == "tab-container3"){
        if(window.localStorage.energyFirstId == this.firstId){
          //第三个页面的
          this.initThree()  
        }else{
          this.initThree("next")
        }
      }
    }
  },
  mounted(){
    this.nowdata = new Date().getFullYear()
    this.startTime = new Date().getFullYear()
    //energyTree
    this.$axios({
      method:"GET",
      url:"/api/app/EnergyAnalysis/getSubstation"
    }).then((res)=>{
      let arr = res.data
      this.substationList = arr
      let subArr = this.substationList.map((item)=>{
        return item.substation
      })
      this.substion = subArr
      this.substion.map((val)=>{
        this.showChildren.push(false)
      })
    }).catch(()=>{
      Indicator.close()
      console.log("网络错误")
    })

    this.echartsData = mocktab.echartsData
    this.changeLoad = mocktab.changeLoad
    this.bigload = mocktab.maxload

    this.$axios({
      method:"GET",
      //获取第一个变压器id
      url:"/api/app/EnergyAnalysis/getSubstation",
    }).then((res)=>{
      if(!window.localStorage.energyFirstId){
        window.localStorage.energyFirstId = res.data[0].substation.looplist[0].id
      }
      this.firstId = res.data[0].substation.looplist[0].id
    })

  },
  methods: {
      //主页方法
      // tab切换
      showTab: function(tab) {
        this.currentTab = tab; // tab 为当前触发标签页的组件名
      },
      // 头部两端的点击跳转
      navPerson(){
        this.$router.push('/person/person');
      },
      navSave(){
        this.$router.push('/alarm/alarm');
      },
      // 第一层
      zeroClick(){
          look = true
      },
      // 第二层点击
      toggle(index){
        this.showChildren[index]=!this.showChildren[index]
        this.showChildren.push(1)
      },
      
      // 第三层点击
      change(id,name){
        console.log(id);
        this.ser = id;
        this.headName = name
        //选择之后的执行
        this.firstId = id
        this.startInitLoad("next")
        //第三个页面的
        this.initThree("next")
      },
      startInitLoad(next){
        Indicator.open("加载中")
        console.log(222)
        this.$axios({
          method:"GET",
          //获取第一个变压器id
          url:"/api/app/EnergyAnalysis/getSubstation",
        }).then((res)=>{
          console.log("true")
          if(!window.localStorage.energyFirstId){
            window.localStorage.energyFirstId = res.data[0].substation.looplist[0].id
          }
          if(!next){
            this.firstId = res.data[0].substation.looplist[0].id
          }
              // /app/EnergyAnalysis/intoLineRecord?intolineId=60&appEndTime=”2019-03-18 23:59:59&appStartTime=”2019-03-18 00:00:00”
              //月数据
              this.$axios({
                method:"GET",
                url:"/api/app/EnergyAnalysis/intoLineRecordmax1?intolineId="+this.firstId+"&appEndTime="+this.endMouth()+"&appStartTime="+this.startMouth(),
              }).then((res)=>{
                if(res.data.max){
                  this.mouth = res.data.max
                }else{
                  this.mouth = "--"
                }
              }).catch(()=>{
                console.log("网络错误")
                Indicator.close()
              })
              //年数据
              this.$axios({
                method:"GET",
                url:"/api/app/EnergyAnalysis/intoLineRecordmax1?intolineId="+this.firstId+"&appEndTime="+this.endYear()+"&appStartTime="+this.startYear(),
              }).then((res)=>{
                if(res.data.max){
                  this.year = res.data.max
                }else{
                  this.year = "--"
                }
              }).catch(()=>{
                console.log("网络错误")
                Indicator.close()
              })
              // 历史数据
              this.$axios({
                method:"GET",
                url:"/api/app/EnergyAnalysis/intoLineRecordmax1?intolineId="+this.firstId,
              }).then((res)=>{
                if(res.data.max){
                  this.history = res.data.max
                }else{
                  this.history = "--"
                }
              }).catch(()=>{
                console.log("网络错误")
                Indicator.close()
              })

              this.nowListrua()


        }).catch((err)=>{
          console.log(err,"false")
          toast("网络错误")
          Indicator.close();
        })
      },
      //列表和echart图的数据
      nowListrua(){
              //列表初始化
              this.$axios({
                method:"GET",
                url:"/api/app/EnergyAnalysis/intoLineRecordmax?intolineId="+this.firstId+"&appEndTime="+this.nowday("end")+"&appStartTime="+this.nowday("start")
              }).then((res)=>{
                console.log(111)
                console.log(res,"初始化列表数据")
                if(res.data.max == null){
                  this.dis = true
                  this.listMax = '--'
                  this.listMin = '--'
                  this.listMid = '--'
                  this.listMaxTime = '--'
                  this.listMinTime = '--'
                  Indicator.close()
                }else{
                  this.dis = false
                  this.listMax = res.data.max.p
                  this.listMin = res.data.min.p
                  this.listMid = (res.data.max.p + res.data.min.p)/2
                  this.listMaxTime = res.data.max.createTime
                  this.listMinTime = res.data.min.createTime
                  //@todo  http://192.168.3.154:81/app/EnergyAnalysis/intoLineRecordmax?intolineId=65&appEndTime=2019-03-28%2001%3A00%3A00&appStartTime=2019-03-28%2000%3A00%3A00
                  //用这个接口查询10次获得数据
                  //初始化的echarts
                  let arr = []
                  // if(!window.localStorage.realTime){
                    arr = [this.listMax]
                    for(var i=0;i<7;i++){
                      let random = Math.random()*(this.listMax-this.listMin)
                      arr.push(random)
                    }
                    arr.push(this.listMin)
                    console.log(arr)
                    // window.localStorage.realTime = arr
                  // }else{
                  //   arr = window.localStorage.realTime.split(",")
                  // }



                  let timer = ['0:00', '2:00', '4:00',"6:00","8:00","10:00","12:00","14:00","16:00","18:00"]
                  setTimeout(() => {
                    let eCharts = echarts.init(document.getElementById('echartrua'));
                    eCharts.clear()
                    eCharts.setOption(this.options(arr,timer),true)
                  },0)
                  Indicator.close()
                }
              }).catch((err)=>{
                toast("网络错误")
                Indicator.close()
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
        Indicator.open("加载中")
        this.$axios({
          method:"GET",
          url:"/api/app/EnergyAnalysis/intoLineRecordmax?intolineId="+this.firstId+"&appEndTime="+this.toSureTimer(this.dayendData)+"&appStartTime="+this.toSureTimer(this.daystartData),
        }).then((res)=>{
          console.log(res)
          if(res.data.max !== null){
            this.dis = false
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
              if(arr.length == 0){
                this.dis = true
                Indicator.close()
              }else{
                this.dis = false
                let timer = ["1号", "3号", "6号", "9号", "12号", "15号", "18号", "21号", "24号", "27号"]
                console.log(arr)
                setTimeout(() => {
                  let eCharts = echarts.init(document.getElementById('echartrua'));
                  eCharts.clear()
                  eCharts.setOption(this.options(arr,timer),true)
                },0)
                Indicator.close()
              }
            }).catch(()=>{
              console.log("网络错误")
              Indicator.close()
            })
          }else{
            this.dis = true
            this.listMax = "--"
            this.listMin = "--"
            this.listMid = "--"
            this.listGufeng = "--"
            this.listMaxTime = "--"
            this.listMinTime = "--"
            this.listGufengcha = "--"
            this.listLoad = "--"
            Indicator.close()
          }
        }).catch(()=>{
          console.log("网络错误")
          Indicator.close()
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
        Indicator.open("加载中")
        this.$axios({
          method:"GET",
          url:"/api/app/EnergyAnalysis/intoLineRecordmax?intolineId="+this.firstId+"&appEndTime="+this.toSureTimer(endTimer)+"&appStartTime="+this.toSureTimer(startTimer),
        }).then((res)=>{
          console.log(res)
          if(res.data.max !== null){
            this.dis = false
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
            if(arr.length == 0){
                this.dis = true
                Indicator.close()
            }else{
              this.dis = false
              let timer = ["1月", "2月", "3月", "4月", "5月", "6月", "7月", "8月", "9月", "10月","11月","12月"]
              setTimeout(() => {
                let eCharts = echarts.init(document.getElementById('echartrua'));
                eCharts.clear()
                eCharts.setOption(this.options(arr,timer),true)
              },0)
              Indicator.close()
            }
          }else{
            this.listMax = "--"
            this.listMin = "--"
            this.listMid = "--"
            this.listGufeng = "--"
            this.listMaxTime = "--"
            this.listMinTime = "--"
            this.listGufengcha = "--"
            this.listLoad = "--"
            this.dis = true
            Indicator.close()
          }
        }).catch(()=>{
          console.log("网络错误")
          Indicator.close()
        })

      },
      selecttime(num) {
        this.select = num;
        //实时数据选择
        if(num == "1"){
          console.log("实时数据选择")
          this.nowListrua()
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
      },


      //第三页方法
        initThree(next){
        Indicator.open("加载中")

        this.$axios({
          method:"GET",
          //获取第一个变压器id
          url:"/api/app/EnergyAnalysis/getSubstation",
        }).then((res)=>{
          this.$axios({
            method:"GET",
            url:"/api/app/index/getSubstation"
          }).then((res)=>{
            console.log(res,"now")
          })
          if(!next){
            this.firstId = res.data[0].substation.looplist[0].id
          }
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
            if(arr.length == 0){
              this.dis2 = true
              Indicator.close()
            }else{
              this.dis2 = false
              setTimeout(()=>{
                let eCharts = echarts.init(document.getElementById('enEchar'));
                eCharts.clear()
                eCharts.setOption(this.optionsthree(arr))
              },0)
              Indicator.close()
            }
          })
          }).catch(()=>{
              toast("网络错误")
              Indicator.close()
          })
      },
      openPicker() {
        this.$refs.picker.open();
      },
      handleConfirm(value){
        let mytime = changeTime(value)
        this.startTime = mytime.slice(0,4)
        this.nowdata = mytime.slice(0,4)
        this.endTime = this.nowdata + "-12-31 " + "23:59:59"
        this.initThree("next")
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
                data: ["1","1","1"]
            }]
        };
        return option
        },
    },




  
}
</script>
<style>
#energyHome{
    height:100%;
    text-align: center;
}
#energyHome ul,#energyHome li{
  padding:0;
  margin:0;
  list-style:none
}
/* list */
#energyHome .treeBox{
  width:100%;
  position: absolute;
  height:calc(100vh - 1.3rem);
  background:rgba(0,0,0,0.5);
  z-index: 2;
}
#energyHome .treeBoxO{
  width:100%;
  position: absolute;
  max-height: 4rem;
  background:rgba(0,0,0,0);
  z-index: 2;
}
#energyHome ul,#energyHome li{
  width: 100%;
  list-style: none;
  font-size: 14px;
  background: #fff;
}
#energyHome li img{
  width: 0.2rem;
  margin: 0 0.3rem;
}
#energyHome li{
  /* height: 0.6rem; */
  line-height: 0.6rem;
}
#energyHome .enFlex{
  display: flex;
  position: relative;
}
#energyHome .layerNav{
  margin-left: 0.3rem;
}
#energyHome .navTr img{
  margin-left: 0.9rem;
}
#energyHome .navOp img{
  margin-left: 1.2rem;
}
#energyHome .layerOp{
  margin-left: 0.3rem;
}
#energyHome .layerOpe{
  margin-left: 0.3rem;
  color: #00AFD5;
}
/* head */
#energyHome{
    width: 100%;
}
#energyHome .navHeadBox{
    width: 100%;
    height: 0.9rem;
    padding-top: 0.4rem;
    display: flex;
    background: rgba(0,0,0,0);
    color: #fff;
}
#energyHome .goBack,#energyHome .Save{
    width: 50px;
    height: 0.9rem;
}
#energyHome .goBack img{
  width: 0.4rem;
  display: block;
  margin-top: 0.25rem;
  margin-left: 0.25rem;
}
#energyHome .Save img{
  width: 0.4rem;
  display: block;
  margin-top: 0.25rem;
  margin-left: 0.25rem;
}
#energyHome .Cancel,#energyHome .Save{
    width: 50px;
    line-height: 50px;
    font-size: 16px;
    position: absolute;
}
#energyHome .Cancel{
    left: 0;
}
#energyHome .Save{
    right: 0;
}
#energyHome .nhl-text {
  height: 0.9rem;
  line-height: 0.9rem;
  font-size: 0.32rem;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
}
#energyHome .nhl-text img{
  width: 0.2rem;
  margin-left: 0.1rem;
  position: relative;
  top: -0.05rem;
}
/* Tab */
#energyHome .homeTabBox{
  width: 100%;
  height: 0.82rem;
  display: flex;
  border-bottom: 0.01rem solid rgba(144,159,175,0.5);
}
#energyHome .ht-tab{
  width: 50%;
  height: 0.82rem;
  font-size: 0.28rem;
  line-height: 0.82rem;
  color: rgba(255,255,255,0.7);
}
#energyHome .current{
  color:  rgba(255,255,255,1);
  border-bottom: 0.04rem solid;
  border-image:linear-gradient(to right,#398ADC, #2DC4AC) 1 10;
  position:relative;
}
#energyHome .current:after{
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
#energyHome .homeTabWarp{
  width: 100%;
  height: auto;
  overflow: hidden;
}
/* mint-ui style */
#energyHome .mint-navbar{
  background-color: rgba(0,0,0,0);
  color: rgba(255,255,255,0.7);;
}
#energyHome .mint-tab-item{
  border-bottom: 2px solid rgba(144,159,175,0.5);
  font-size: 0.28rem !important;
}
#energyHome .is-selected{
  color: #fff;
  border-image:linear-gradient(to right,#398ADC, #2DC4AC) 1 10;
  border-image-slice: 0 0 100% 0;
}
#energyHome .mint-navbar .mint-tab-item.is-selected{
  margin-bottom: 0;
}
/* Tree */
#energyHome .treeShow{
  height: 7rem;
  background: #fff;
  color: #111519;
  text-align: left;
  padding: 0.08rem 0.15rem;
  overflow-x: hidden;
  overflow-y: scroll;
}
#energyHome .arrName{
  font-size:0.28rem;
  font-family:PingFangSC-Regular;
  font-weight:400;
  line-height: 0.6rem;
}
#energyHome .treeShow ul{
  padding: 0rem 0 0rem 0.4rem;
  line-height: 0.6rem;
}
#energyHome .treeShow ul li{
  /* padding: 0rem 0 0rem 0.2rem; */
  margin-left: -0.3rem;
  line-height: 0.6rem;
}
#energyHome .treeShow ul li p{
  margin:0 0 0 0.7rem;
}
#energyHome .picTrue{
    vertical-align:middle;
    margin-right: 0.1rem;
    width: 0.2rem;
}
#energyHome .titleStyle{
    color: #111519;
}
#energyHome .titleClick{
    color: #00AFD5;
}


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
    height: 6.75rem;
    border-radius: 0.16rem;
    background: rgba(255, 255, 255, 0.03);
    box-shadow: 0 0.08rem 0.32rem 0 rgba(0, 0, 0, 0.3);
    padding: 0 0.16rem 0 0.18rem;
  }
  #energyTab2 #echartrua {
    height: 3.46rem;
    /* border-bottom: 0.04rem solid rgba(46, 57, 69, 1); */
    width:6.56rem;
  }
  #energyTab2 .datas > div:nth-of-type(1){
    border-bottom: 0.04rem solid rgba(46, 57, 69, 1);
  }
  #energyTab2 .data {
    width: 200%;
    padding-top: 0.18rem;
    height: 5.6rem;
    display: flex;
    transform-origin: top left;
    transform: scale(0.5);
    /* border-top: 0.04rem solid rgba(46, 57, 69, 1); */
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

  /* 第三页样式 */
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
  background: url('../../../../static/img/selectTime@2x.png') no-repeat;
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
#energyTab3 .picker-slot-center:nth-of-type(2),#energyTab3 .picker-slot-center:nth-of-type(3){
  display:none;
}

.noimg{
  width: 5rem;
  margin-top: -0.4rem;
}
.nodata{
  text-align: center;
  line-height: 2rem;
  font-size: 0.3rem;
  position: absolute;
  color: #fff;
  left: 50%;
  margin-left: -0.55rem;
}
</style>
