<template>
  <div id="facilityInfo">
      <!-- <navHeadLeft :title="title"></navHeadLeft> -->
      <div fixed id="navHeadLeft"  >
        <div class="navHeadBox">
            <div class="goBack" @click="navBack"><img src="../../../../static/img/back.png" alt="" /></div>
            <div class="nhl-text"  @click="look = !look">{{title}}<img src="../../../../static/img/pathwhite@2x.png" class="xiala" alt=""></div>
        </div>
        <!-- Tree -->
        <div class="treeBox" @click="look = false" v-if="look"></div>
        <div class="treeBoxO" v-if="look">
          <div class="overShow">
            <div class="treeShow"><!-- @click.stop="change(items.id,items.name) :class="items.id == ser ? 'titleClick' : 'titleStyle'"" -->
              <div class="facText" @click="nowChange(item)" v-for="(item,index) in dataList">{{item.substation.substationName}}</div>
            </div>
          </div>

        </div>
      </div>
      <div class="mytab">
          <div class="head" @click="isnone">
              <div>设备编号</div>
              <div>设备名称</div>
              <!-- <div>有无告警</div> -->
              <div>状态</div>
          </div>
          <div class="scroll">
            <div class="mytable">
              <div class="content" v-for="(item,index) in listArr">
                <div @click="isshowrua(index)">{{item.deviceCode}}</div>
                <div class="isshow" :ref="'isshow' + index" v-if="index === rua ? true : false">{{item.deviceCode}}</div>
                <div @click="isnone">{{item.deviceName}}</div>
                <!-- 有无告警 -->
                <!-- <div>
                  <div class="state1" v-if="!item.delFlag">
                    有
                  </div>
                  <div class="state2" v-else>
                    无
                  </div>
                </div> -->
                <div @click="isnone">
                  <div class="line1" v-if="item.onlineFlag == 0">
                    在线
                  </div>
                  <div class="line2" v-else>
                    离线
                  </div>
                </div>
              </div>
            </div>

          </div>
      </div>
  </div>
</template>

<script>
import navHeadLeft from "../../../components/navHeadLeft.vue"
import data from "../../../utils/mock.js"
const mydata = data.facilityInfo

export default {
  name:"aboutUs",  
  components: {
    "navHeadLeft": navHeadLeft
  },
  data () {
    return {
        title:"设备档案信息",
        data:{},
        mystate:"state2",
        listArr:[],
        rua:"",
        look:false,
        af:false,
        dataList:[]
    }
  },
  mounted(){
    this.data = mydata
    this.$axios({
      method:"GET",
      url:"/api/app/EnergyAnalysis/monitoringDevicelist"
    }).then((res)=>{
      console.log(res)
      this.listArr = res.data
    }).catch((err)=>{
      console.log("网络错误")
    })


    // /api/app/EnergyAnalysis/getSubstation
    this.$axios({
      method:"GET",
      url:"/api/app/EnergyAnalysis/getSubstation"
    }).then((res)=>{
      console.log(res)
      this.dataList = res.data
    }).catch((err)=>{
      console.log("网络错误")
    })

  },
  methods:{
    nowChange(val){
      this.look = false
      this.title = val.substation.substationName
      // /api/app/EnergyAnalysis/monitoringDevicelist?substationId=55
      this.$axios({
        method:"GET",
        url:"/api/app/EnergyAnalysis/monitoringDevicelist?substationId="+val.substation.id
      }).then((res)=>{
        console.log(res)
        this.listArr = res.data
      }).catch((err)=>{
        console.log("网络错误")
      })

    },
    isshowrua(val){
      this.rua = val
    },
    isnone(){
      this.rua = ""
    },
    navBack(){
      this.$router.back(-1)
    },
    // 点击
    change(id,name){
      console.log(id);
      this.ser = id;
      this.headName = name
    },
  }

}
</script>
<style>
#facilityInfo{
  font-size:0.26rem;
}
#facilityInfo .head{
  width:100%;
  height:0.8rem;
  background:rgba(38,48,58,1);
  font-size:0.26rem;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:rgba(98,214,239,1);
  line-height:0.36rem;
  display:flex;
  align-items: center;
  justify-content: space-between;
}
#facilityInfo .head>div{
  height:0.6rem;
  width:33.3%;
  text-align:center;
  line-height:0.6rem;
}
#facilityInfo .content{
  height:1rem;
  width:100%;
  font-size:0.24rem;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:rgba(233,242,252,1);
  line-height:0.36rem;
  display:flex;
  position:relative;
  justify-content: space-between;
}
#facilityInfo .content>div{
  height:1rem;
  width:33.3%;
  text-align:center;
  line-height:1rem;
  text-overflow : ellipsis;
  overflow: hidden
}
#facilityInfo .isshow{
  width:calc(100% - 0.5rem) !important;
  background:rgba(0,0,0,0.45);
  height:1rem;
  position:absolute;
  top:0.5rem;
  left:0.5rem;
  z-index:888;
}
#facilityInfo .content>div:nth-of-type(3){
  display:flex;
  justify-content: center;
  /* align-items: center; */
}
#facilityInfo .content:nth-of-type(odd){
  background:#313C48;
}
#facilityInfo .content:nth-of-type(even){
  background:rgba(38,48,58,1);
}
#facilityInfo .scroll{
  height:calc(100vh - 2rem);
  width:100%;
  overflow:scroll;
}
#facilityInfo .state1{
  width:0.8rem;
  height:0.32rem;
  background:rgba(247,160,63,1);
  border-radius:0.08rem;
  text-align:center;
  line-height:0.32rem;
  font-size:0.24rem;
}
#facilityInfo .state2{
  width:0.8rem;
  height:0.32rem;
  background:rgba(76,84,93,1);
  border-radius:0.08rem;
  text-align:center;
  line-height:0.32rem;
}
#facilityInfo .line1{
  font-size:0.24rem;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:#62FFDB;
  line-height:1rem;
}
#facilityInfo .line2{
  font-size:0.24rem;
  font-family:PingFangSC-Regular;
  font-weight:400;
  color:#FF5585;
  line-height:1rem;
}
#navHeadLeft{
    width: 100%;
    position:relative;
}
#navHeadLeft .navHeadBox{
    width: 100%;
    height: 1rem;
    padding-top: 0.4rem;
    display: flex;
    background: #2E3944;
    box-shadow:0 0.02rem 0.1rem 0 rgba(0,0,0,0.45);
}

#navHeadLeft .goBack{
    width: 50px;
    height: 100%;
}
#navHeadLeft .goBack img{
  width: 20px;
  display: block;
  margin-top: 15px;
  margin-left: 13px;
}
#navHeadLeft .nhl-text{
  height: 0.9rem;
  line-height: 0.9rem;
  font-size: 0.32rem;
  color: #fff;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
}
#navHeadLeft .xiala{
  width: 3.5vw;
  height: 1.5vw;
  position: absolute;
  right: -4.5vw;
  top: 5.5vw;
}
#navHeadLeft .downList{
  width:100%;
  position:absolute;
  top:1.4rem;
  background:white;
  z-index:666;
} 
#facilityInfo ul,#facilityInfo li{
  padding:0;
  margin:0;
  list-style:none
}
/* Tree */
#facilityInfo .treeShow{
  width: 100%;
  max-height: 7rem;
  background: #fff;
  color: #111519;
  text-align: left;
  overflow-x: hidden;
  overflow-y: scroll;
  font-size:0.28rem;
  font-family:PingFangSC-Regular;
  font-weight:400;
  line-height: 0.6rem;
  position:absolute;
  z-index: 999;
}
#facilityInfo .treeBox{
  width:100%;
  position: absolute;
  height:calc(100vh - 1.4rem);
  background:rgba(0,0,0,0.5);
  z-index: 2;
}
#facilityInfo .treeShow div{
  margin-left:0.35rem;
}
#facilityInfo .facText{
    font-size: 0.28rem;
    font-family: PingFangSC-Regular;
    font-weight: 400;
    line-height: 0.6rem;
}
#facilityInfo .treeShow ul{
  padding: 0rem 0 0rem 0.4rem;
  line-height: 0.6rem;
}
#facilityInfo .treeShow ul li{
  margin-left: -0.3rem;
  line-height: 0.6rem;
}
#facilityInfo .treeShow ul li p{
  margin:0 0 0 0.7rem;
}
#facilityInfo .picTrue{
    vertical-align:middle;
    margin-right: 0.1rem;
    width: 0.2rem;
}
#facilityInfo .titleStyle{
    color: #111519;
}
#facilityInfo .titleClick{
    color: #00AFD5;
}
#facilityInfo .overShow{
  width:100%;
  max-height:6rem;
  overflow:hidden;
}
</style>
