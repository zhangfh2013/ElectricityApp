<template>
  <div id="monitorHome">
    <!-- head -->
    <div class="navHeadBox">
      <div class="goBack" @click="navPerson"><img src="../../../../static/img/person@2x.png" alt="" /></div>
      <div class="nhl-text" @click="look = !look">{{headName}}<img src="../../../../static/img/pathwhite@2x.png" ></div>
      <div class="Save" @click="navSave"><img src="../../../../static/img/alarm@2x.png" alt="" /></div>
    </div>
    <!-- Tree -->
    <div v-if="treeshow">
    <div class="treeBox" @click="look = false" v-if="look" ></div>
    <div class="treeBoxO" v-if="look">
      <div class="treeShow">
        <!-- 标题，默认出现 -->
        <div class="arrName" @click="af = !af">
          <img src="../../../../static/img/Path_black@2x.png" alt="" class="picTrue">
          在线监测
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
    </div>
    <!-- Tree -->
    <div v-if="!treeshow">
    <div class="treeBox 22222" @click="look = false" v-if="look" ></div>
    <div class="treeBoxO" v-if="look">
      <div class="treeShow">
        <!-- 标题，默认出现 -->
        <div class="arrName" @click="af = !af">
          <img src="../../../../static/img/Path_black@2x.png" alt="" class="picTrue">
          在线监测
        </div>
        <ul v-for="(item,index) in substionOth" >
          <!-- 第二层 -->
          <li @click="toggle(index)" v-if="!af"><img src="../../../../static/img/Path_black@2x.png" alt="" class="picTrue">{{item.substationName}}
          <!-- 第三层 -->
            <p @click.stop="changeOth(items.id,items.name),look = false" v-for="(items,indexs) in item.looplist" v-show="showChildrenOth[index]" :class="items.id == ser ? 'titleClick' : 'titleStyle'">{{items.name}}</p>
          </li>
        </ul>
      </div>
    </div>
    </div>
    <!-- Tab -->
    <mt-navbar v-model="selected">
      <mt-tab-item id="tab-container1">负荷</mt-tab-item>
      <mt-tab-item id="tab-container2">电流</mt-tab-item>
      <mt-tab-item id="tab-container3">电能质量</mt-tab-item>
      <mt-tab-item id="tab-container4">负载率</mt-tab-item>
    </mt-navbar>

    <!-- tab-container -->
    <mt-tab-container v-model="selected" :swipeable="rua">
      <mt-tab-container-item id="tab-container1">
        <!-- 在线监测负荷 -->
        <!-- <monitor-tab1></monitor-tab1> -->
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
            <div v-if="dis">
              <p class="nodata" >暂无数据</p>
              <img class="noimg"  src="../../../../static/img/noDate@2x.png">
            </div>
            <div id="m1Echars" v-else ></div>
            <div class="echarNumBox">
              <div class="echarNum">
                <div class="NumWidth">最大负荷(kW)</div>
                <div class="NumCon NumWidth">{{Math.round(parseInt(this.m1tpMax)) || '--'}}</div>
                <div class="NumWidthTime">发生时间</div>
                <div class="NumCon NumWidth NumLine">{{this.m1tpMaxTime || '--'}}</div>
              </div>
              <div class="echarNum">
                <div class="NumWidth">最大负荷(kW)</div>
                <div class="NumCon NumWidth">{{Math.round(parseInt(this.m1ypMax)) || '--'}}</div>
                <div class="NumWidthTime">发生时间</div>
                <div class="NumCon NumWidth NumLine">{{this.m1ypMaxTime || '--'}}</div>
              </div>       
            </div>
          </div>

          <!-- 选择时间 -->
          <div class="nChooseTime" @click="m1openPicker">
            <div class="nTimeText">选择时间</div>
            <div class="nTime">{{nowdatam1}}</div>
            <div class="nTimeBtn"></div>
          </div>
          <mt-datetime-picker
              ref="m1picker"
              type="date"
              v-model="testruaruam1"
              year-format="{value} 年"
              month-format="{value} 月"
              date-format="{value} 日"
              @confirm="m1handleConfirm"
              :visible-item-count="5" 
            >
          </mt-datetime-picker>

        </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="tab-container2">
        <!-- 在线监测 电流 -->
        <!-- <monitor-tab2></monitor-tab2> -->
        <div id="monitorTab2">

            <!-- 采集时间 -->
            <div class="mTimeBox">采集时间 {{nowTime}}</div>

            <!-- 采集信息头部 -->
            <div class="mHeadBox">
              <div class="nHead nHeadMargin">
                <div class="nHeadText">{{this.m2iaNum || '--'}}<span class="nhm" v-if="m2dispA">A</span></div>
                <div class="nHeadBei">A相电流</div>
                <div class="nHeadBorder nHeadColor01"></div>
              </div>
              <div class="nHead nHeadMargin">
                <div class="nHeadText">{{this.m2ibNum || '--'}}<span class="nhm" v-if="m2dispB">A</span></div>
                <div class="nHeadBei">B相电流</div>
                <div class="nHeadBorder nHeadColor02"></div>
              </div>
              <div class="nHead">
                <div class="nHeadText">{{this.m2icNum || '--'}}<span class="nhm" v-if="m2dispC">A</span></div>
                <div class="nHeadBei">C相电流</div>
                <div class="nHeadBorder nHeadColor03"></div>
              </div>
            </div>
            <!-- 统计图 -->
            <div class="nEchar">
              <div v-if="m2dis">
                  <p class="nodata" >暂无数据</p>
                  <img class="noimg"  src="../../../../static/img/noDate@2x.png">
              </div>
              <div id="m2EcharsBox" v-else></div>
            </div>
            <!-- 选择时间 -->
            <div class="nChooseTime" @click="m2openPicker">
                <div class="nTimeText">选择时间</div>
                <div class="nTime">{{nowdatam2}}</div>
                <div class="nTimeBtn"></div>
            </div>
            <mt-datetime-picker
              ref="m2picker"
              type="date"
              v-model="testruaruam2"
              year-format="{value} 年"
              month-format="{value} 月"
              date-format="{value} 日"
              @confirm="m2handleConfirm"
              :visible-item-count="5" 
            >
            </mt-datetime-picker>
          </div>
        </mt-tab-container-item>
        <mt-tab-container-item id="tab-container3">
          <!-- 在线监测 电能质量 -->
          <!-- <monitor-tab3></monitor-tab3> -->
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
          <div v-if="m3dis">
              <p class="nodatam3">暂无数据</p>
              <img class="noimgm3" src="../../../../static/img/noDate@2x.png">
          </div>
          <div id="m3EcharsUp" v-else></div>
        </div>
        <div class="m3EcharDown">
          <div v-if="m3dis">
              <p class="nodatam3">暂无数据</p>
              <img class="noimgm3" src="../../../../static/img/noDate@2x.png">
          </div>
          <div id="m3EcharDown" v-else></div>
        </div>

        <!-- 选择时间 -->
        <div class="nChooseTime" @click="m3openPicker">
          <div class="nTimeText">选择时间</div>
          <div class="nTime">{{nowdatam3}}</div>
          <div class="nTimeBtn"></div>
        </div>
        <mt-datetime-picker
          ref="m3picker"
          type="date"
          v-model="testruaruam3"
          year-format="{value} 年"
          month-format="{value} 月"
          date-format="{value} 日"
          @confirm="m3handleConfirm"
          :visible-item-count="5" 
        >
        </mt-datetime-picker>
      </div>
      </mt-tab-container-item>
      <mt-tab-container-item id="tab-container4">
        <!-- 在线监测负载率 -->
        <!-- <monitor-tab4></monitor-tab4> -->
        <div id="monitorTab4">
        <!-- 采集时间 -->
          <div class="mTimeBox">采集时间 {{nowTime}}</div>

          <!-- 采集信息头部 -->
          <div class="mHeadBox">
            <div class="nHead nHeadMargin">
              <div class="nHeadText">{{Math.round(parseInt(m4ta)) || '--'}}<span class="nhm" v-if="m4dispA">℃</span></div>
              <div class="nHeadBei">A相绕组温度</div>
              <div class="nHeadBorder nHeadColor01"></div>
            </div>
            <div class="nHead nHeadMargin">
              <div class="nHeadText">{{Math.round(parseInt(m4tb)) || '--'}}<span class="nhm" v-if="m4dispB">℃</span></div>
              <div class="nHeadBei">B相绕组温度</div>
              <div class="nHeadBorder nHeadColor02"></div>
            </div>
            <div class="nHead">
              <div class="nHeadText">{{Math.round(parseInt(m4tc)) || '--'}}<span class="nhm" v-if="m4dispC">℃</span></div>
              <div class="nHeadBei">C相绕组温度</div>
              <div class="nHeadBorder nHeadColor03"></div>
            </div>
          </div>
          <!-- 统计图 -->
          <div class="nEchar">
            <div v-if="m4dis">
              <p class="nodata">暂无数据</p>
              <img class="noimg" src="../../../../static/img/noDate@2x.png">
            </div>
            <div id="nEchars4" v-else></div>
            <div class="echarNumBox">
              <!-- 需要参数进行循环取值 -->
              <div class="echarNum">
                <div class="NumWidth">最高温度℃</div>
                <div class="NumCon NumWidth">{{Math.round(parseInt(m4TodayTc)) || '--'}}</div>
                <div class="NumWidthTime">发生时间</div>
                <div class="NumCon NumWidth">{{m4TodayTime == "" ? m4TodayTime.slice(5,16) : "--"}}</div>
              </div>
              <div class="echarNum">
                <div class="NumWidth">最高温度℃</div>
                <div class="NumCon NumWidth">{{Math.round(parseInt(m4TodayTcLast)) || '--'}}</div>
                <div class="NumWidthTime">发生时间</div>
                <div class="NumCon NumWidth">{{m4TodayTimeLast == "" ? m4TodayTimeLast.slice(5,16) : "--"}}</div>
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
            v-model="testruaruam4"
            year-format="{value} 年"
            month-format="{value} 月"
            date-format="{value} 日"
            @confirm="handleConfirmm4"
            :visible-item-count="5" 
          >
          </mt-datetime-picker>
        </div>
      </mt-tab-container-item>
    </mt-tab-container>

    <navFoot :idx="2"></navFoot>
  </div>
</template>

<script>
import navFoot from "../../../components/navFoot.vue"
import navHead from "../../../components/navHead.vue"
import monitorTab1 from "@/components/monitorTabs/monitorTab1.vue"
import monitorTab2 from "@/components/monitorTabs/monitorTab2.vue"
import monitorTab3 from "@/components/monitorTabs/monitorTab3.vue"
import monitorTab4 from "@/components/monitorTabs/monitorTab4.vue"
import echarts from "echarts"
import demo from "../../../utils/demo.js"
import mock from '@/utils/mock.js'
import pickertime from "../../../components/pickerTime.vue"
import { Indicator } from 'mint-ui';

const qualityOnLine = mock.qualityOnLine
const electricityInLine = mock.electricityInLine
const changeTime = demo.changeTime
const nowTime = demo.nowTime
const loadOnLine = mock.loadOnLine
const slots = demo.slots
const loadFactor = mock.loadFactor



export default {
  name: 'monitorHome',
  components: {
    'navFoot': navFoot,
    'navHead': navHead,
    monitorTab1 : monitorTab1,
    monitorTab2 : monitorTab2,
    monitorTab3 : monitorTab3,
    monitorTab4 : monitorTab4,
    pickertime:pickertime
  },
  data () {
    return {
      selected:'tab-container1',
      tabname: ["负荷", "电流", "电能质量", "负载率"],
      currentTab: "monitorTab1",
      headName:'在线监测',
      rua:true,
      // Tree
      look:false,
      ser:'',
      af:false,
      istrue:'',
      showChildren:[],
      monitorList:[],
      substion:[],
      showChildrenOth:[],
      monitorListOth:[],
      substionOth:[],
      treeshow:true,
      isChangeFirstId:"",
      


      //在线监测负荷
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
      m1paNum:'',
      m1pbNum:'',
      m1pcNum:'',
      // 最大负荷-产生时间（今日/昨日）
      m1tpMax:'',
      m1tpMaxTime:'',
      m1ypMax:'',
      m1ypMaxTime:'',


      //在线监测电流
      nowdatam2:"",
      m2dis:false,
      m2dispA: true,
      m2dispB: true,
      m2dispC: true,
      electricityInLine: mock.electricityInLine,
      echartsElectricity: mock.electricityInLine.echartsElectricity,
      //A/B/C向电流
      m2iaNum:'',
      m2ibNum:'',
      m2icNum:'',


      //在线监测 电能质量
      select: 1,
      nowdatam3:"",
      qualityOnLine:mock.qualityOnLine,
      timeSelect:mock.qualityOnLine.timeOne,
      noChoose:true,
      firstId:"0",
      m3dis:false,
      m3block:true,
      m3dispA: true,
      m3dispB: true,
      m3dispC: true,




      //在线监测 负载率
      nowdatam4:"",
      m4dis:false,
      m4block:true,
      m4dispA: true,
      m4dispB: true,
      m4dispC: true,
      loadFactor: mock.loadFactor,
      othId:"0",
      m4ta:"",
      m4tb:"",
      m4tc:"",
      m4TodayTc:"",
      m4TodayTime:"--",
      m4TodayTcLast:"",
      m4TodayTimeLast:"--",
      m4LastTodayTc:"",
      m4LastTodayTime:"",
      lastDayShowTime:"",
      dayShowTime:"",


      fixName:"",
      fixNameOth:"",
      testruaruam1:"",
      testruaruam2:"",
      testruaruam3:"",
      testruaruam4:"",
    }
  },
  created(){
    this.nowTimes();
  },
  watch:{
    selected(val){
      if(val == "tab-container4"){
        //在线监测 负载率m4
        this.nowdatam4 = nowTime();

        if(window.localStorage.othId == this.othId){
          //普通数据
          this.m4Init()
          //2天的echarts数据
          this.towDaysDataInit()
        }else{
          this.m4Init("next")
          this.towDaysDataInit("next")
        }
        this.treeshow = false
        if(this.fixNameOth){
          this.headName = this.fixNameOth
        }else{
          this.headName = "在线监测"
        }
      }else if(val == "tab-container2"){
        console.log(this.firstId)
        //在线监测 电流m2
        if(window.localStorage.firstId == this.firstId){
          this.startILoad();
        }else{
          this.startILoad("next");
        }
        this.nowdatam2 = nowTime();
        this.treeshow = true
        if(this.fixName){
          this.headName = this.fixName
        }else{
          this.headName = "在线监测"
        }
      }else if(val == "tab-container3"){
        // 在线监测 电能质量m3
        this.nowdatam3 = nowTime()
        if(window.localStorage.firstId == this.firstId){
          this.m3init();
        }else{
          this.m3init("next");
        }
        this.treeshow = true
        if(this.fixName){
          this.headName = this.fixName
        }else{
          this.headName = "在线监测"
        }
      }else if(val == "tab-container1"){
        //在线监测 负荷m1
        if(window.localStorage.firstId == this.firstId){
          this.startPLoad();
        }else{
          this.startPLoad("next");
        }

        this.treeshow = true
        if(this.fixName){
          this.headName = this.fixName
        }else{
          this.headName = "在线监测"
        }
      }
    }
  },
  mounted(){
    this.testruaruam1 = new Date()
    this.testruaruam2 = new Date()
    this.testruaruam3 = new Date()
    this.testruaruam4 = new Date()
    //monitorTree
    Indicator.open("加载中")
    this.$axios({
        method:"GET",
        url:"/api/app/EnergyAnalysis/getSubstation"
    }).then((res)=>{
      let arr = res.data
      this.monitorList = arr
      let monArr = this.monitorList.map((item)=>{
          return item.substation
      })
      this.substion = monArr
      this.substion.map((val)=>{
        this.showChildren.push(false)
      })
    }).catch(()=>{
        console.log("网络错误")
        Indicator.close()
    })

    //monitorTreeOther
    this.$axios({
        method:"GET",
        url:"/api/app/EnergyAnalysis/getSubstationtran"
    }).then((res)=>{
      let arr = res.data
      this.monitorListOth = arr
      let monArr = this.monitorListOth.map((item)=>{
          return item.substation
      })
      this.substionOth = monArr
      this.substionOth.map((val)=>{
        this.showChildrenOth.push(false)
      })
    }).catch(()=>{
        console.log("网络错误")
        Indicator.close()
    })

    this.nowdatam1 = nowTime();
    this.startPLoad();
    this.lastTodaym1()
  },
  methods:{
    // tab切换
    showTab: function(tab) {
      this.currentTab = tab; // tab 为当前触发标签页的组件名
    },
    // 头部两侧跳转
    navPerson(){
        this.$router.push('/person/person');
    },
    navSave(){  
        this.$router.push('/alarm/alarm');    
    },
    // 第二层点击
    toggle(index){
      this.showChildren[index]=!this.showChildren[index]
      this.showChildren.push(1)
      this.showChildrenOth[index]=!this.showChildrenOth[index]
      this.showChildrenOth.push(1)
    },
    // 第三层点击
    change(id,name){
      //当前选择的id
      this.isChangeFirstId = id
      this.firstId = id
      console.log(id);
      console.log(name);
      this.ser = id;
      this.headName = name
      this.fixName = name
      //在线监测负荷
      this.startPLoad("next")
      //在线监测电流
      this.startILoad("next")
      // 在线监测电能质量
      this.m3init("next")
    },
    changeOth(id,name){
      this.othId = id
      console.log(id)
      console.log(name)
      this.headName = name
      this.fixNameOth = name
      this.m4Init("next")
      this.towDaysDataInit("next")
    },

    //在线监测负荷--------------------------------------------------------------------
    startPLoad(next){
      Indicator.open("加载中")
      this.$axios({
          method:"GET",
          //获取第一个变压器id
          url:"/api/app/EnergyAnalysis/getSubstation",
        }).then((res)=>{
          if(!window.localStorage.firstId){
            window.localStorage.firstId = this.firstId
          }
          if(!next){
            this.firstId = res.data[0].substation.looplist[0].id
          }
          this.$axios({
            method:"GET",
            url:"/api/app/index/getSubstation"
          }).then((res)=>{
            //今日负荷-----------
            this.$axios({
                method:"GET",
                url:"/api/app/EnergyAnalysis/intoLineRecord?intolineId="+this.firstId+"&appEndTime="+this.nowday("end")+"&appStartTime="+this.nowday("start")
              }).then((res)=>{
                console.log(res,"papapapapapapapapap")
                // A/B/C向负荷
                if(res.data.length == 0){
                  this.dis = true;
                  m1tpMax = '--',
                  m1tpMaxTime = '--',
                  m1ypMax = '--',
                  m1ypMaxTime = '--',
                  Indicator.close()
                }else{
                  this.dis = false;
                  this.m1paNum = res.data[0].pa
                  this.m1pbNum = res.data[0].pb
                  this.m1pcNum = res.data[0].pc
                  // 今日PA
                  let data = res.data
                  let m1Pay = []
                  let timeA = new Date()
                  let Ahour = timeA.getHours()
                  let xian = ''
                  if(0<=Ahour && Ahour<4){
                    xian = 2
                  }else if(4<=Ahour && Ahour<8){
                    xian = 2
                  }else if(8<=Ahour && Ahour<12){
                    xian = 3
                  }else if(12<=Ahour && Ahour<16){
                    xian = 4
                  }else if(16<=Ahour && Ahour<20){
                    xian = 5
                  }else if(20<=Ahour && Ahour<24){
                    xian = 6
                  }else if(Ahour = 24){
                    xian = 7
                  }
                  console.log(xian)
                  for(let i = 0; i<xian ; i++){
                        m1Pay.push(data[i].pa)
                  }
                  //昨日负荷-------
                  this.$axios({
                      method:"GET",
                      url:"/api/app/EnergyAnalysis/intoLineRecord?intolineId="+this.firstId+"&appEndTime="+this.yesday("yesEnd")+"&appStartTime="+this.yesday("yesStart")
                    }).then((res)=>{
                      //初始化的echarts
                      if(res.data.length == 0){
                        this.dis = true;
                        
                        Indicator.close()
                      }else{
                        this.dis = false;
                        let data = res.data
                        let m1Pa = []
                        for(let i = 0; i<7 ; i++){
                          m1Pa.push(data[i].pa)
                        }
                        let timer = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00']
                        setTimeout(() => {
                          let eCharts = echarts.init(document.getElementById('m1Echars'));
                          eCharts.clear()
                          eCharts.setOption(this.m1Echars(m1Pa,m1Pay,timer),true)
                        },0)
                        Indicator.close()
                      }
                      Indicator.close()
                    }).catch(()=>{
                      console.log("网络错误")
                      Indicator.close()
                    })
                }
              }).catch(()=>{
                console.log("网络错误")
                Indicator.close()
              })

              //最大负荷
              this.$axios({
                method:"GET",
                url:"/api/app/EnergyAnalysis/intoLineRecordmax?intolineId="+this.firstId+"&appEndTime="+this.nowday("end")+"&appStartTime="+this.nowday("start")
              }).then((res)=>{
                console.log(res)
                if(res.data.max!==null){
                  // 最大负荷
                  this.m1tpMax = res.data.max.p
                  this.m1tpMaxTime = res.data.max.createTime
                }else{
                  this.m1tpMax = '--'
                  this.m1tpMaxTime = '--'
                }

              }).catch((err)=>{
                console.log("网络错误")
                Indicator.close()
              })
              //最大-昨日
              this.$axios({
                method:"GET",
                url:"/api/app/EnergyAnalysis/intoLineRecordmax?intolineId="+this.firstId+"&appEndTime="+this.yesday("yesEnd")+"&appStartTime="+this.yesday("yesStart")
              }).then((res)=>{
                if(res.data.max!==null){
                  // 最大负荷
                  console.log(res)
                  this.m1ypMax = res.data.max.p
                  this.m1ypMaxTime = res.data.max.createTime
                }else{
                  this.m1ypMax = '--'
                  this.m1ypMaxTime = '--'
                }
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
      this.testruaruam1 = value
      let mytime = changeTime(value)
      this.nowdatam1 = mytime
      let selectStar = mytime + ' 00:00:00'
      let selectEnd = mytime + ' 23:59:59'
      console.log(selectStar,selectEnd)
      console.log(this.lastTodaym1()[0],this.lastTodaym1()[1])
      this.$axios({
          method:"GET",
          //获取第一个变压器id
          url:"/api/app/EnergyAnalysis/getSubstation",
        }).then((res)=>{
          this.firstId = res.data[0].substation.looplist[0].id
          if(this.isChangeFirstId){
            this.firstId = this.isChangeFirstId
          }
          this.$axios({
              method:"GET",
              url:"/api/app/index/getSubstation"
          }).then((res)=>{
            //选择时间后请求-现在这天
            this.$axios({
                method:"GET",
                url:"/api/app/EnergyAnalysis/intoLineRecord?intolineId="+this.firstId+"&appEndTime="+selectEnd+"&appStartTime="+selectStar
            }).then((res)=>{
                console.log(res,"tetetetetetetete")
                //初始化的echarts
                if(res.data.length == 0){
                  this.m1tpMax = '--'
                  this.m1tpMaxTime = '--'
                  this.m1ypMax = '--'
                  this.m1ypMaxTime = '--'
                  this.dis = true;
                  Indicator.close()
                }else{
                  this.$axios({
                    method:"GET",
                    url:"/api/app/EnergyAnalysis/intoLineRecordmax?intolineId="+this.firstId+"&appEndTime="+selectEnd+"&appStartTime="+selectStar
                  }).then((res)=>{
                    console.log(res)
                    if(res.data.max!==null){
                      // 最大负荷
                      this.m1tpMax = res.data.max.p
                      this.m1tpMaxTime = res.data.max.createTime
                    }
                  }).catch((err)=>{
                    console.log("网络错误")
                    Indicator.close()
                  })
                  //最大-昨日
                  this.$axios({
                    method:"GET",
                    url:"/api/app/EnergyAnalysis/intoLineRecordmax?intolineId="+this.firstId+"&appEndTime="+this.lastTodaym1()[0]+"&appStartTime="+this.lastTodaym1()[1]
                  }).then((res)=>{
                    if(res.data.max!==null){
                      // 最大负荷
                      console.log(res)
                      this.m1ypMax = res.data.max.p
                      this.m1ypMaxTime = res.data.max.createTime
                    }
                  }).catch(()=>{
                    console.log("网络错误")
                    Indicator.close()
                  })
                  // Echars----今天
                  this.dis = false;
                  let data = res.data
                  let m1Pach = []
                  let bij = new Date()
                  let year = bij.getFullYear();
                  let mouth = bij.getMonth()+1;
                  let day = bij.getDate();
                  if(mouth.toString().length == 1){
                    mouth = "0" + mouth
                  }
                  if(day.toString().length == 1){
                    day = "0" + day
                  }
                  let nTime = year + "-" + mouth + "-" + day
                  if(mytime == nTime){//判断是不是今天
                    this.startPLoad()
                  }else{
                    for(let i = 0; i<7 ; i++){
                      m1Pach.push(data[i].pa)
                    }
                    // this.m1paNum = res.data[0].pa
                    // this.m1pbNum = res.data[0].pb
                    // this.m1pcNum = res.data[0].pc
                    //选择时间后请求-前一天
                    this.$axios({
                      method:"GET",
                      url:"/api/app/EnergyAnalysis/intoLineRecord?intolineId="+this.firstId+"&appEndTime="+this.lastTodaym1()[0]+"&appStartTime="+this.lastTodaym1()[1]
                    }).then((res)=>{
                      console.log(res)
                      if(res.data.length == 0){
                        this.dis = true;
                        Indicator.close()
                      }else{
                      //初始化的echarts
                        this.dis = false;
                        let data = res.data
                        let m1Pay = []
                        for(let i = 0; i<7 ; i++){
                          m1Pay.push(data[i].pa)
                        }
                        let timer = ['00:00', '04:00', '08:00', '12:00', '16:00', '20:00', '24:00']
                        let eCharts = echarts.init(document.getElementById('m1Echars'));
                        eCharts.clear();
                        eCharts.setOption(this.m1Echars(m1Pach,m1Pay,timer),true)
                        Indicator.close()
                      }
                  }).catch(()=>{
                    console.log("网络错误")
                    Indicator.close()
                  }) 
                }
              }//是不是今天
            }).catch(()=>{
              console.log("网络错误")
              Indicator.close()
            })               
          }).catch(()=>{
            console.log("网络错误")
            Indicator.close()
          })
        }).catch(()=>{
          console.log("网络错误")
          Indicator.close()
        })      
    },
    m1openPicker() {
      this.$refs.m1picker.open();
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
    //获取昨天的数据
    lastTodaym1(){
      let abc = this.nowdatam1
      let str = abc.split("-")[0]+"-"+abc.split("-")[1]+"-"+(parseInt(abc.split("-")[2])-1)
      this.lastDayShowTime = abc.split("-")[1]+"月"+(parseInt(abc.split("-")[2])-1) + '日负荷'
      this.dayShowTime = abc.split("-")[1]+"月"+parseInt(abc.split("-")[2]) + '日负荷'
      return [str + " 23:59:59" , str + " 00:00:00"]
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
              data: [this.lastDayShowTime, this.dayShowTime],
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
              data: dataPA
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
              data: dataPAY
          }, ]
      };
      return option
      },

    //在线监测 电流-----------------------------------------------------------------
      startILoad(next){
        Indicator.open("加载中...")
        this.$axios({
            method:"GET",
            //获取第一个变压器id
            url:"/api/app/EnergyAnalysis/getSubstation",
          }).then((res)=>{
            if(!next){
              this.firstId = res.data[0].substation.looplist[0].id
            }
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
                console.log(res)
                if(res.data.length == 0){
                  this.m2dis = true;
                  Indicator.close()
                }else{
                this.m2iaNum = res.data[0].ia
                this.m2ibNum = res.data[0].ib
                this.m2icNum = res.data[0].ic
                //初始化的echarts，选择第一个变压器的数据
                  this.m2dis = false;
                  let data = res.data
                  let m2Ia = []
                  let m2Ib = []
                  let m2Ic = []
                  let timeA = new Date()
                  let Ahour = timeA.getHours()
                  let xian = ''
                  if(0<=Ahour && Ahour<4){
                    xian = 2
                  }else if(2<=Ahour && Ahour<3){
                    xian = 2
                  }else if(4<=Ahour && Ahour<6){
                    xian = 3
                  }else if(6<=Ahour && Ahour<8){
                    xian = 4
                  }else if(8<=Ahour && Ahour<10){
                    xian = 5
                  }else if(10<=Ahour && Ahour<12){
                    xian = 6
                  }else if(12<=Ahour && Ahour<14){
                    xian = 7
                  }else if(14<=Ahour && Ahour<16){
                    xian = 8
                  }else if(16<=Ahour && Ahour<18){
                    xian = 9
                  }else if(18<=Ahour && Ahour<20){
                    xian = 10
                  }else if(20<=Ahour && Ahour<22){
                    xian = 11
                  }else if(22<=Ahour && Ahour<24){
                    xian = 12
                  }else if(Ahour = 24){
                    xian = 13
                  }
                  console.log(xian)
                  for(let i = 0; i<xian; i++){
                    m2Ia.push(data[i].ia)
                    m2Ib.push(data[i].ib)
                    m2Ic.push(data[i].ic)
                  }
                  // 初始化Echars
                  let timer = ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '24:00']
                  setTimeout(() => {
                    let eCharts = echarts.init(document.getElementById('m2EcharsBox'));
                    eCharts.clear()
                    eCharts.setOption(this.m2Echars(m2Ia,m2Ib,m2Ic,timer),true)
                  },0)
                  Indicator.close()
                }
              }).catch(()=>{
                Indicator.close()
                console.log("网络错误")
              })
            })
          }).catch(()=>{
            Indicator.close()
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
        this.testruaruam2 = value
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
            if(this.isChangeFirstId){
              this.firstId = this.isChangeFirstId
            }
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
                    this.m2dis = true;
                    Indicator.close()
                  }else{
                    // this.m2iaNum = res.data[0].ia
                    // this.m2ibNum = res.data[0].ib
                    // this.m2icNum = res.data[0].ic
                    console.log(this.m2iaNum +'qqqqqqq' + this.m2ibNum + 'qqqqqqq' + this.m2icNum + 'qqqqqqqqqqq')
                    //初始化的echarts                   
                    this.m2dis = false
                    let data = res.data
                    let m2Iay = []
                    let m2Iby = []
                    let m2Icy = []
                    let bij = new Date()
                    let year = bij.getFullYear();
                    let mouth = bij.getMonth()+1;
                    let day = bij.getDate();
                    if(mouth.toString().length == 1){
                      mouth = "0" + mouth
                    }
                    if(day.toString().length == 1){
                      day = "0" + day
                    }
                    let nTime = year + "-" + mouth + "-" + day
                    if(mytime == nTime){
                      let timeA = new Date()
                  let Ahour = timeA.getHours()
                  let xian = ''
                  if(0<=Ahour && Ahour<4){
                    xian = 2
                  }else if(2<=Ahour && Ahour<3){
                    xian = 2
                  }else if(4<=Ahour && Ahour<6){
                    xian = 3
                  }else if(6<=Ahour && Ahour<8){
                    xian = 4
                  }else if(8<=Ahour && Ahour<10){
                    xian = 5
                  }else if(10<=Ahour && Ahour<12){
                    xian = 6
                  }else if(12<=Ahour && Ahour<14){
                    xian = 7
                  }else if(14<=Ahour && Ahour<16){
                    xian = 8
                  }else if(16<=Ahour && Ahour<18){
                    xian = 9
                  }else if(18<=Ahour && Ahour<20){
                    xian = 10
                  }else if(20<=Ahour && Ahour<22){
                    xian = 11
                  }else if(22<=Ahour && Ahour<24){
                    xian = 12
                  }else if(Ahour = 24){
                    xian = 13
                  }
                  console.log(xian)
                      for(let i = 0; i<xian ; i++){
                        m2Iay.push(data[i].ia)
                        m2Iby.push(data[i].ib)
                        m2Icy.push(data[i].ic)
                      }
                      let timer = ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '24:00']
                      setTimeout(() => {
                        let eCharts = echarts.init(document.getElementById('m2EcharsBox'));
                        eCharts.clear();
                        eCharts.setOption(this.m2Echars(m2Iay,m2Iby,m2Icy,timer),true)   
                      },0) 
                      Indicator.close()
                    }else{
                      for(let i = 0; i<13 ; i++){
                      m2Iay.push(data[i].ia)
                      m2Iby.push(data[i].ib)
                      m2Icy.push(data[i].ic)
                    }
                    let timer = ['00:00', '02:00', '04:00', '06:00', '08:00', '10:00', '12:00', '14:00', '16:00', '18:00', '20:00', '22:00', '24:00']
                    setTimeout(() => {
                      let eCharts = echarts.init(document.getElementById('m2EcharsBox'));
                      eCharts.clear();
                      eCharts.setOption(this.m2Echars(m2Iay,m2Iby,m2Icy,timer),true)   
                    },0) 
                    Indicator.close()
                    }
                  }
                })
              })
            }).catch(()=>{
              console.log("网络错误")
              Indicator.close()
            }) 
      },
      m2openPicker() {
        this.$refs.m2picker.open();
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
      m2Echars(dataIa,dataIb,dataIc,timer){
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
              data: timer,
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
                color: 'rgba(255,255,255,0.7)',
                // interval: 0
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
          data: dataIa
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
          data: dataIb
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
          data: dataIc 
      }, ]
      };
      return option
      },


  //在线监测 电能质量
   // 默认时间为一小时
    m3init(next){
      Indicator.open("加载中...")
      this.$axios({
          method:"GET",
          url:"/api/app/EnergyAnalysis/getSubstation"
      }).then((res)=>{
        if(!next){
          this.firstId = res.data[0].substation.looplist[0].id
        }
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
              this.m3dis = true
              Indicator.close()
            }else{
              // 第一个Echars的初始化，选择第一个变压器的数据
                this.m3dis = false
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
                Indicator.close()
              }
          })
          })
      }).catch(()=>{
          console.log("网络错误")
          Indicator.close()
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
          if(res.data.length == 0){
            this.m3dis = true
            Indicator.close()
          }else{
          this.m3dis = false
          console.log(num);
          // 选择一小时---------------------------------------------------------------------------------------
          if(num == 1){
            this.$axios({
              method:"GET",
              url:"/api/app/EnergyAnalysis/intoLineRecord?intolineId=" + this.firstId+"&appEndTime=" + this.oneHour("end") + "&appStartTime=" + this.oneHour("onehour")
            }).then((res)=>{
              console.log(res);
              if(res.data.length == 0){
                this.m3dis = true
                Indicator.close()
              }else{
                // 第一个Echars的初始化，选择第一个变压器的数据
                  this.m3dis = false
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
                this.m3dis = true
                Indicator.close()
              }else{
                // 第一个Echars的初始化，选择第一个变压器的数据
                  this.m3dis = false
                  let data = res.data
                  let m3Ia = []
                  let m3Ib = []
                  let m3Ic = []
                  for(let i = 3; i<10 ; i++){
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
                this.m3dis = true
                Indicator.close()
              }else{
                // 第一个Echars的初始化，选择第一个变压器的数据
                  this.m3dis = false
                  let data = res.data
                  let m3Ia = []
                  let m3Ib = []
                  let m3Ic = []
                  let timeA = new Date()
                  let Ahour = timeA.getHours()
                  let xian = ''
                  if(0<=Ahour && Ahour<4){
                    xian = 2
                  }else if(4<=Ahour && Ahour<8){
                    xian = 2
                  }else if(8<=Ahour && Ahour<12){
                    xian = 3
                  }else if(12<=Ahour && Ahour<16){
                    xian = 4
                  }else if(16<=Ahour && Ahour<20){
                    xian = 5
                  }else if(20<=Ahour && Ahour<24){
                    xian = 6
                  }else if(Ahour = 24){
                    xian = 7
                  }
                  for(let i = 0; i<xian ; i++){
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
                  for(let i = 0; i<xian ; i++){
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
          }}
        })
      }).catch(()=>{
          console.log("网络错误")
          Indicator.close()
      })
    },

    // 选择时间后重绘Echars
    m3handleConfirm(value){
      Indicator.open("加载中")
      this.testruaruam3 = value
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
              this.m3dis = true
              Indicator.close()
            }else{
              let bij = new Date()
              let year = bij.getFullYear();
              let mouth = bij.getMonth()+1;
              let day = bij.getDate();
              if(mouth.toString().length == 1){
                mouth = "0" + mouth
              }
              if(day.toString().length == 1){
                day = "0" + day
              }
              let nTime = year + "-" + mouth + "-" + day
              if(mytime == nTime){//是不是今天
                this.m3initselect(1)
                Indicator.close()
              }else{
                // 第一个Echars的初始化，选择第一个变压器的数据
                this.m3dis = false
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
            }
          })
          })
      }).catch(()=>{
          console.log("网络错误")
          Indicator.close()
      })
      
      // this.noChoose = !this.noChoose
    },
    m3openPicker() {
      this.$refs.m3picker.open();
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

      //在线监测 负载率
      m4Init(next){ 
      Indicator.open("加载中...")
      this.$axios({
          method:"GET",
          url:"/api/app/EnergyAnalysis/getSubstationtran"
      }).then((res)=>{
        if(!window.localStorage.othId){
            window.localStorage.othId = this.othId
        }
        if(!next){
          this.othId = res.data[0].substation.looplist[0].id
        }
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
          }else{
            this.m4TodayTc = "--"
            this.m4TodayTime = "--"
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
          }else{
            this.m4TodayTcLast = "--"
            this.m4TodayTimeLast = "--"
          }
        })
      }).catch(()=>{
          console.log("网络错误")
          Indicator.close()
      })

    },
    //2天的echarts图
    towDaysDataInit(next){
        Indicator.open("加载中...")
        this.$axios({
            method:"GET",
            url:"/api/app/EnergyAnalysis/getSubstationtran"
        }).then((res)=>{
          if(!next){
            this.othId = res.data[0].substation.looplist[0].id
          }
          this.$axios({
          method:"GET",
          url:"/api/app/EnergyAnalysis/transformerRecord?transformerId=" + this.othId + "&appEndTime=" + this.nowdatam4 + " "+ "23:59:59" + "&appStartTime=" + this.nowdatam4 + " "+  "00:00:00"
        }).then((res)=>{
          if(res.data.length == 0){
            this.m4dis = true;
            this.m4TodayTc = "--"
            this.m4TodayTime = "--"
			      this.m4TodayTcLast = "--"
            this.m4TodayTimeLast = "--"
            Indicator.close()
          }else{
            this.m4dis = false;
            var arrone = []
            console.log(res)
            if(res.data.length){
              var data = res.data
              for(var i=0;i<8;i++){
                arrone.push(data[i].tc)
              }
            }
            this.$axios({
              method:"GET",
              url:"/api/app/EnergyAnalysis/transformerRecord?transformerId=" + this.othId +  "&appEndTime=" + this.lastToday()[0] + "&appStartTime=" + this.lastToday()[1] 
            }).then((res)=>{
              if(res.data.length == 0){
                this.m4dis = true;
                Indicator.close()
              }else{
                var arrtwo = []
                if(res.data.length){
                  var data = res.data
                  let timeA = new Date()
                  let Ahour = timeA.getHours()
                  let xian = ''
                  if(0<=Ahour && Ahour<4){
                    xian = 2
                  }else if(4<=Ahour && Ahour<8){
                    xian = 2
                  }else if(8<=Ahour && Ahour<12){
                    xian = 3
                  }else if(12<=Ahour && Ahour<16){
                    xian = 4
                  }else if(16<=Ahour && Ahour<20){
                    xian = 5
                  }else if(20<=Ahour && Ahour<24){
                    xian = 6
                  }else if(Ahour = 24){
                    xian = 7
                  }
                  for(var i=0;i<xian;i++){
                    arrtwo.push(data[i].tc)
                  }
                }
                setTimeout(() => {
                    let nEcharBox = echarts.init(document.getElementById('nEchars4'));
                    nEcharBox.setOption(this.myEcharmon4(arrone,arrtwo))
                }, 0);
                Indicator.close()
              }
            })
          }
        })

        }).catch(()=>{
            console.log("网络错误")
            Indicator.close()
        })
       
    },
    repetitionChange(startTime,endTime,mytime44){
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
            this.m4dis = false;
            var data = res.data
            this.dis = false;
            let data = res.data
            let m1Pach = []
            let bij = new Date()
            let year = bij.getFullYear();
            let mouth = bij.getMonth()+1;
            let day = bij.getDate();
            if(mouth.toString().length == 1){
              mouth = "0" + mouth
            }
            if(day.toString().length == 1){
              day = "0" + day
            }
            let nTime = year + "-" + mouth + "-" + day
            if(mytime44 == nTime){

                this.towDaysDataInit()


            }else{
              for(var i=0;i<10;i++){
                arrone.push(data[i].tc)
                arrtwo.push(data[i].tb)
              }
              setTimeout(() => {
                  let nEcharBox = echarts.init(document.getElementById('nEchars4'));
                  nEcharBox.setOption(this.myEcharmon4(arrone,arrtwo))
              }, 0);
              Indicator.close()
            }
          }else{
            //没数据的时候变成那啥的空数据页面
            console.log("空数据页面")
            this.m4dis = true;
            Indicator.close();
            this.m4TodayTc = "--"
            this.m4TodayTime = "--"
			      this.m4TodayTcLast = "--"
            this.m4TodayTimeLast = "--"
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
      this.testruaruam4 = value
      let mytime = changeTime(value)
      let mytime44 = mytime
      console.log(mytime)
      this.nowdatam4 = mytime
      let startTimer = mytime + " " + "00:00:00"
      let endTimer = mytime + " " + "23:59:59"
      console.log(startTimer)
      console.log(endTimer)
      this.repetitionChange(startTimer,endTimer,mytime44)
      // this.m4Init()
       Indicator.open("加载中...")
      this.$axios({
          method:"GET",
          url:"/api/app/EnergyAnalysis/getSubstationtran"
      }).then((res)=>{
        if(!window.localStorage.othId){
            window.localStorage.othId = this.othId
        }
        if(!next){
          this.othId = res.data[0].substation.looplist[0].id
        }
        // http://192.168.1.106:81/app/EnergyAnalysis/transformerRecordmax?transformerId=4&appEndTime=2019-03-21%2023%3A59%3A59&appStartTime=2019-03-21%2000%3A00%3A00
        this.$axios({
          method:"GET",
          url:"/api/app/EnergyAnalysis/transformerRecordmax?transformerId=" + this.othId + "&appEndTime=" + this.nowdatam4 + " "+ "23:59:59" + "&appStartTime=" + this.nowdatam4 + " "+  "00:00:00"
        }).then((res)=>{
          console.log(res)
          if(res.data){
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
          Indicator.close()
      })

    },
    lastToday(){
      let abc = this.nowdatam4
      let str = abc.split("-")[0]+"-"+abc.split("-")[1]+"-"+(parseInt(abc.split("-")[2])-1)
      this.lastDayShowTime = abc.split("-")[1]+"月"+(parseInt(abc.split("-")[2])-1)+"日负荷"
      this.dayShowTime = abc.split("-")[1]+"月"+parseInt(abc.split("-")[2])+"日负荷"
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
#monitorHome{
    height:100%;
    text-align:center;
}
#monitorHome ul,#monitorHome li{
  padding:0;
  margin:0;
  list-style:none;
  font-size: 14px;
}
#monitorHome .treeBox{
  width: 100%;
  height:calc(100vh - 1.3rem);
  background:rgba(0,0,0,0.5);
  position: absolute;
  z-index: 2;
}
#monitorHome .treeBoxO{
  width: 100%;
  max-height:4rem;
  background:rgba(0,0,0,0);
  position: absolute;
  z-index: 2;
}
/* head */
#monitorHome{
    width: 100%;
}
#monitorHome .navHeadBox{
    width: 100%;
    height: 0.9rem;
    padding-top: 0.4rem;
    display: flex;
    background: rgba(0,0,0,0);
    color: #fff;
}
#monitorHome .goBack,#monitorHome .Save{
    width: 50px;
    height: 0.9rem;
}
#monitorHome .goBack img{
  width: 0.4rem;
  display: block;
  margin-top: 0.25rem;
  margin-left: 0.25rem;
}
#monitorHome .Save img{
  width: 0.4rem;
  display: block;
  margin-top: 0.25rem;
  margin-left: 0.25rem;
}
#monitorHome .Cancel,#monitorHome .Save{
    width: 50px;
    line-height: 55px;
    font-size: 16px;
    position: absolute;
}
#monitorHome .Cancel{   
    left: 0;
}
#monitorHome .Save{
    right: 0;
}
#monitorHome .nhl-text{
  height: 0.9rem;
  line-height: 0.9rem;
  font-size: 0.32rem;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
}
#monitorHome .nhl-text img{
  width: 0.2rem;
  margin-left: 0.1rem;
  position: relative;
  top: -0.05rem;
}
/* Tab */
#monitorHome .monitorTabBox{
  width: 100%;
  height: 0.9rem;
  display: flex;
  border-bottom: 0.01rem solid rgba(144,159,175,0.5);
}
#monitorHome .ht-tab{
  width: 50%;
  height: 0.7rem;
  font-size: 0.28rem;
  padding: 0.1rem 0;
  line-height: 0.7rem;
  color: rgba(255,255,255,0.7);
}
#monitorHome .current{
  color:  rgba(255,255,255,1);
  border-bottom: 0.03rem solid;
  border-image:linear-gradient(to right,#398ADC, #2DC4AC) 1 10;
  position:relative;
}
#monitorHome .current:after{
  content: "";
  position:absolute;
  right:0rem;
  bottom:-0.07rem;
  height:0.11rem;
  width:0.11rem;
  background:rgba(98,255,219,1);
  box-shadow:0 0.1rem 0.2rem 0 rgba(33,211,160,0.27);
  border-radius:50%;
}
#monitorHome .monitorTabWarp{
  width: 100%;
  height: 10.6rem; 
  overflow: hidden;
}
/* mint-ui style */
#monitorHome .mint-navbar{
  background-color: rgba(0,0,0,0);
  color: rgba(255,255,255,0.7);;
}
#monitorHome .mint-tab-item{
  border-bottom: 2px solid rgba(144,159,175,0.5);
  font-size: 0.28rem;
}
#monitorHome .is-selected{
  color: #fff;
  border-image:linear-gradient(to right,#398ADC, #2DC4AC) 1 10;
  border-image-slice: 0 0 100% 0;
}
#monitorHome .mint-navbar .mint-tab-item.is-selected{
  margin-bottom: 0;
}
#monitorHome .mint-tab-item-label{
  font-size: 0.28rem;
}
/* #monitorHome .mint-navbar .mint-tab-item{
  padding: 0.1rem 0 0.34rem 0;
} */
/* Tree */
#monitorHome .treeShow{
  height: 7rem;
  background: #fff;
  color: #111519;
  text-align: left;
  padding: 0.08rem 0.15rem;
  overflow-x: hidden;
  overflow-y: scroll;
}
#monitorHome .arrName{
  font-size:0.28rem;
  font-family:PingFangSC-Regular;
  font-weight:400;
  line-height: 0.6rem;
}
#monitorHome .treeShow ul{
  font-size:14px;
  padding: 0rem 0 0rem 0.6rem;
  line-height: 0.6rem;
}
#monitorHome .treeShow ul li{
  /* padding: 0rem 0 0rem 0.2rem; */
  margin-left: -0.3rem;
  line-height: 0.6rem;
  font-size:14px;
}
#monitorHome .treeShow ul li p{
  margin: 0 0 0 0.6rem;
  font-size:14px;
}
#monitorHome .picTrue{
  vertical-align:middle;
  margin-right: 0.1rem;
  width: 0.2rem;
}
#monitorHome .titleStyle{
  color: #111519;
}
#monitorHome .titleClick{
  color: #00AFD5;
}


/* 在线监测负荷 */
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
  height:6.4rem;
  background:rgba(255,255,255,0.03);
  box-shadow:0rem 0.08rem 0.32rem 0rem rgba(0,0,0,0.3);
  border-radius:0.16rem;
  margin: 0.24rem auto 0 auto;
  padding: 0 0.2rem;
}
#monitorTab1 .nEchar > div:nth-of-type(1){
  border-bottom: 0.02rem solid rgba(46,57,69,1);
  height: 3.98rem;
}
/* 统计图 - 统计图盒子 */
#monitorTab1 #m1Echars,#monitorTab1 .noEcharUpm1{
  width: 6.5rem;
  margin: 0.1rem 0.1rem;
}
/* 统计图 - 内容盒子 */
#monitorTab1 .echarNumBox{
  width: 6.5rem;
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
  width: 29%;
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
  width: 1.6rem;
  line-height: 0.9rem;
  position: absolute;
  left: 50%;
  margin-left: -0.8rem;
  color: #62D6EF;
}
#monitorTab1 .nTimeBtn{
  width: 0.2rem;
  height:0.9rem;
  background: url('../../../../static/img/selectTime@2x.png') no-repeat;
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

/* 在线监测 电流 */
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
  height:6.4rem;
  background:rgba(255,255,255,0.03);
  box-shadow:0 0.08rem 0.32rem 0 rgba(0,0,0,0.3);
  border-radius: 0.16rem;
  margin: 0.24rem auto 0 auto;
}
#monitorTab2 #m2EcharsBox{
  width:6.9rem;
  height:6.6rem;
  overflow: hidden; 
}
/* 选择时间 */
#monitorTab2 .nChooseTime{
  width:7.5rem;
  height:0.9rem;
  background:rgba(255,255,255,0.03);
  box-shadow:0 0.04rem 0.1rem 0 rgba(0,0,0,0.1);
  margin-top: 0.24rem;
  position: relative;
  font-size: 0.26rem;
  display: flex;
}
#monitorTab2 .picker-item{
  text-align:center;
  opacity: 0.3;
  transform: rotateX(50deg)
}
#monitorTab2 .picker-item.picker-selected{
  opacity: 1;
  transform: rotateX(0deg)
}
#monitorTab2 .nTimeText{
  height:0.9rem;
  line-height: 0.9rem;
  text-align: left;
  margin-left: 0.34rem;
}
#monitorTab2 .nTime{
  width: 1.6rem;
  line-height: 0.9rem;
  position: absolute;
  left: 50%;
  margin-left: -0.8rem;
  color: #62D6EF;
}
#monitorTab2 .nTimeBtn{
  width: 0.2rem;
  height:0.9rem;
  background: url('../../../../static/img/selectTime@2x.png') no-repeat;
  background-size: 0.2rem;
  position: absolute;
  right: 0.4rem;
  top:0.4rem;
}

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
  margin: 0.32rem auto 0 auto;
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
#monitorTab3 .picker-item{
  text-align:center;
  opacity: 0.3;
  transform: rotateX(50deg)
}
#monitorTab3 .picker-item.picker-selected{
  opacity: 1;
  transform: rotateX(0deg)
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
  height:3.68rem;
  margin: 0 auto 0.17rem auto;
  background:rgba(255,255,255,0.03);
  box-shadow:0 0.08rem 0.32rem 0 rgba(0,0,0,0.3);
  border-radius:0.16rem;
}
#monitorTab3 .m3EcharsUp{
  margin-top: 0.24rem;
}
.noimgm3,.noimgm3{
  width:5rem;
  margin-top:0.1rem;
}
.nodatam3,.nodatam3{
  text-align:center;
  line-height:2.7rem;
  font-size: 0.3rem;
  position:absolute;
  left:50%;
  margin-left:-0.55rem;
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
  width: 1.6rem;
  line-height: 0.9rem;
  position: absolute;
  left: 50%;
  margin-left: -0.8rem;
  color: #62D6EF;
}
#monitorTab3 .nTimeBtn{
  width: 0.2rem;
  height:0.9rem;
  background: url('../../../../static/img/selectTime@2x.png') no-repeat;
  background-size: 0.2rem;
  position: absolute;
  right: 0.4rem;
  top:0.4rem;
}

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
#monitorTab4 .picker-item{
  text-align:center;
  opacity: 0.3;
  transform: rotateX(50deg)
}
#monitorTab4 .picker-item.picker-selected{
  opacity: 1;
  transform: rotateX(0deg)
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
  height:6.4rem;
  background:rgba(255,255,255,0.03);
  box-shadow:0 0.08rem 0.32rem 0 rgba(0,0,0,0.3);
  border-radius: 0.16rem;
  margin: 0.24rem auto 0 auto;
  padding:0 0.2rem;
}
#monitorTab4 .nEchar > div:nth-of-type(1){
  border-bottom: 0.02rem solid rgba(46,57,69,1) !important;
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
  margin: 0.24rem auto;
  border:none;
}
/* 统计图 - 内容盒子 */
#monitorTab4 .echarNumBox{
  width: 6.2rem;
  height: 2.1rem;
  margin: 0 auto;
 /* border-top: 0.02rem solid rgba(46,57,69,1);*/
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
  width: 1.6rem;
  line-height: 0.9rem;
  position: absolute;
  left: 50%;
  margin-left: -0.8rem;
  color: #62D6EF;
}
#monitorTab4 .nTimeBtn{
  width: 0.2rem;
  height:0.9rem;
  background: url('../../../../static/img/selectTime@2x.png') no-repeat;
  background-size: 0.2rem;
  position: absolute;
  right: 0.4rem;
  top:0.4rem;
}
</style>
