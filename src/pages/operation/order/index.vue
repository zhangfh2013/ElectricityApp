<template>
  <div id="order">
    <navHeadLeft :title="title"></navHeadLeft>

    <div class="nChooseTime" v-if="show" @click="openPicker">
      <div class="nTimeText">选择时间</div>
      <div class="nTime">{{orderBegin}}<span>至</span>{{orderEnd}}</div>
      <div class="nTimeBtn"></div>
    </div>
    
    <mt-navbar v-model="selected">
        <mt-tab-item id="tab-container1">待办工单</mt-tab-item>
        <mt-tab-item id="tab-container2">历史工单</mt-tab-item>
    </mt-navbar>

    <mt-tab-container v-model="selected" :swipeable="rua">
      <mt-tab-container-item id="tab-container1">
        <myorder></myorder>
      </mt-tab-container-item>
      <mt-tab-container-item id="tab-container2">
        <historyorder :mybindData ="transferData"></historyorder>
      </mt-tab-container-item>
    </mt-tab-container>

    <pickertime :status="status" v-on:childArr="changeDate"></pickertime>

      <!-- table   mytab&&historytab -->

      <!-- <div class="scroll">
        <div class="content" v-for="item in workState">
            <div class="topbox">
                <div>编号{{item.orderNumber}}</div>
                <div class="myleft1" v-if="item.orderState === '0'">严重</div>
                <div class="myleft2" v-else>一般</div>
                <div :class="'othstate'+item.workState">{{item.workState === "0" ? "待审核" : item.workState === "1" ? "待派发" :item.workState === "2" ? "待确认" : "执行中" }}</div>
            </div>
            <div class="line"></div>
            <p>变电所名称：{{item.substationName}}</p>
            <p>设备名称：{{item.deviceName}}</p>
            <p>故障描述：{{item.errorInfo}}</p>
            <div class="line" style="margin-top:0.12rem"></div>
            <div class="info">
                <div class="boxinfo" @click="toInfo">查看详情</div>
            </div>
        </div>
      </div>
      <div class="repair" @click="repair">我要报修</div> -->

  </div>
</template>

<script>
import navHeadLeft from "../../../components/navHeadLeft.vue"
import data from "../../../utils/mock.js"
import myorder from "../../../components/order/myorder.vue";
import demo from "../../../utils/demo.js"
import historyorder from "../../../components/order/historyorder.vue";
const orderTodo = data.orderTodo
import pickertime from "../../../components/pickerTime.vue"
const changeTime = demo.changeTime

export default {
  name:"order",  
  components: {
    "navHeadLeft": navHeadLeft,
    myorder : myorder,
    historyorder : historyorder,
    pickertime
  },
  data () {
    return {
        rua:true,
        selected:'tab-container1',
        title:"我的工单",
        workState:{},
        show:false,
        status:false,
        orderBegin:'开始时间',
        orderEnd:'结束时间',
        transferData:[]
    }
  },
    mounted(){
        this.workState = orderTodo
    },
    watch: {
        selected(val) {
            if(this.selected === "tab-container1"){
                this.show = false
            }else{
                this.show = true
            }
        }
    },
    methods:{
        toInfo(){
          this.$router.push("/operation/orderHistory")
          //'1'=orderDetails(待审核) '2'=orderWait(待派发) orderReceive(接单) orderDeal(处理) orderDasis(基础) orderHistory(历史工单详情)
        },
        repair(){
            this.$router.push("/operation/repair")
        },
        openPicker(){
          this.status = !this.status
        },
        changeDate(val){
          this.orderBegin = val.startTime[0].replace(/[^0-9]/ig,"") + '-' + val.startTime[1].replace(/[^0-9]/ig,"") + '-' + val.startTime[2].replace(/[^0-9]/ig,"")
          this.orderEnd = val.finishTime[0].replace(/[^0-9]/ig,"") + '-' + val.finishTime[1].replace(/[^0-9]/ig,"") + '-' + val.finishTime[2].replace(/[^0-9]/ig,"")
          console.log(this.orderBegin)
          console.log(this.orderEnd)
          let myStartTime =  this.orderBegin + " 00:00:00"
          let myEndTime =  this.orderEnd + " 23:59:59"
          let param = new URLSearchParams()
          param.append('state', 5)
          param.append('startTime', myStartTime)
          param.append('endTime', myEndTime)
          this.$axios({
            method:"POST",
            url:"/api/app/workOrder/list",
            data:param,
            headers:{
              'Content-Type':'application/x-www-form-urlencoded'
            }
          }).then((res)=>{
              console.log(res)
              this.transferData = res.data.rows
          }).catch((err)=>{
              console.log("网络错误")
          })
        },
    }
}
</script>
<style lang="scss" type="text/css">
#order .content{
    height:3rem;
    width:100%;
    margin-top:0.16rem;
    background:rgba(255,255,255,0.03);
    font-size:0.28rem;
}
#order .content>p{
    font-size:0.26rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height:0.5rem;
    margin:0;
    padding-left:0.2rem;
    box-sizing: border-box;
}
#order .topbox{
    padding-left:0.2rem;
    box-sizing: border-box;
    font-size:0.28rem;
    color:#FFFFFF;
    height:0.6rem;
    width:100%;
    display:flex;
    align-items: center;
    position:relative;
}
#order .info{
    height:0.66rem;
    width:100%;
    display:flex;
    justify-content: flex-end;
    align-items: center;
}
#order .line{
    height:0.02rem;
    // border:0.01rem solid rgba(46,57,69,1);
    background:#2E3945;
}
#order .boxinfo{
    width:1.40rem;
    height:0.4rem;
    border-radius:8px;
    border:0.02rem solid rgba(88,224,174,1);
    text-align:center;
    color:rgba(98,214,239,1);
    font-size:0.24rem;
    line-height:0.4rem;
    margin-right:0.4rem;
}
#order .myleft1{
    margin-left:0.2rem;
    width:0.80rem;
    height:0.32rem;
    background:rgba(247,160,63,1);
    box-shadow:0px 0.04rem 0.10rem 0px rgba(0,0,0,0.1);
    border-radius:0.08rem;
    font-size:0.22rem;
    text-align:center;
    line-height:0.32rem;
}
#order .myleft2{
    margin-left:0.2rem;
    width:0.80rem;
    height:0.32rem;
    background:rgba(56,166,202,1);
    box-shadow:0px 0.04rem 0.10rem 0px rgba(0,0,0,0.1);
    border-radius:0.08rem;
    font-size:0.22rem;
    text-align:center;
    line-height:0.32rem;
}
#order .othstate0{
    color:rgba(255,79,79,1);
    font-size:0.24rem;
    position: absolute;
    right:0.34rem;
}
#order .othstate1{
    color:rgba(255,179,61,1);
    font-size:0.24rem;
    position: absolute;
    right:0.34rem;
}
#order .othstate2{
    color:rgba(255,228,69,1);
    font-size:0.24rem;
    position: absolute;
    right:0.34rem;
}
#order .othstate3{
    color:rgba(98,214,239,1);
    font-size:0.24rem;
    position: absolute;
    right:0.34rem;
}
#order .scroll{
    height:calc(100vh - 1.2rem);
    overflow-y:scroll;
}
#order .repair{
    width:3.92rem;
    height:0.68rem;
    background:linear-gradient(135deg,rgba(45,201,235,1) 0%,rgba(20,210,184,1) 100%);
    box-shadow:0px 0.12rem 0.20rem 0px rgba(0,0,0,0.3);
    border-radius:0.08rem;
    position:fixed;
    bottom:0.36rem;;
    font-size:0.30rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height:0.68rem;
    text-align:center;
    transform: translate(-50%);
    left:50%;
}
#order .mint-navbar{
  background-color: rgba(0,0,0,0);
  color: rgba(255,255,255,0.7);;
}
#order .mint-tab-item{
  border-bottom: 0.04rem solid rgba(144,159,175,0.5);
  font-size: 0.28rem;
}
#order .is-selected{
  color: #fff;
  border-image:linear-gradient(to right,#398ADC, #2DC4AC) 1 10;
  border-image-slice: 0 0 100% 0;
}
#order .mint-navbar .mint-tab-item.is-selected{
  margin-bottom: 0;
}

// 选择时间
#order .nChooseTime{
  margin:0;
  width:7.5rem;
  height:0.9rem;
  background:rgba(255,255,255,0.03);
  box-shadow:0rem 0.04rem 0.1rem 0rem rgba(0,0,0,0.1);
  position: relative;
  font-size: 0.26rem;
  display: flex;
  align-items: center;
}
#order .nTimeText{
  height:0.9rem;
  line-height: 0.9rem;
  text-align: left;
  margin-left: 0.34rem;
  color:rgba(255,255,255,1);
}
#order .nTime{
  width: auto;
  line-height: 0.9rem;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  color: #62D6EF;
  span{
      color:rgba(255,255,255,1);
      margin:0 0.1rem;
  }
}
#order .nTimeBtn{
  width: 0.2rem;
  height:0.9rem;
  background: url('../../../../static/img/selectTime@2x.png') no-repeat;
  background-size: 0.2rem;
  position: absolute;
  right: 0.4rem;
  top:0.4rem;
}
</style>
