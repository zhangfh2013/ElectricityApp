<template>
  <div id="myorder">
      <div class="scroll">
        <div class="content" v-for="item in workList">
            <div class="topbox">
                <div>编号{{item.workId}}</div>
                <div class="myleft1" v-if="item.status === '0'">一般</div>
                <div class="myleft2" v-else>严重</div>
                <div :class="'othstate'+item.state">{{item.state === "0" ? "待审核" : item.state === "1" ? "待派发" :item.state === "2" ? "待接单" :item.state === "3" ? "执行中" :item.state === "4"? "待确认":"完成" }}</div>
            </div>
            <div class="line"></div>
            <p>变电所名称：{{item.deviceName}}</p>
            <p>设备名称：{{item.subName}}</p>
            <p>故障描述：{{item.workDesc}}</p>
            <div class="line" style="margin-top:0.12rem"></div>
            <div class="info">
                <div class="boxinfo" @click="toInfo(item.workId,item.state)">查看详情</div>
            </div>
        </div>
      </div>
      <div class="repair" @click="repair" v-if="isShow">我要报修</div>

  </div>
</template>

<script>
import navHeadLeft from "../navHeadLeft.vue"
import data from "../../utils/mock.js"
const orderTodo = data.orderTodo

export default {
  name:"myorder",  
  components: {
    "navHeadLeft": navHeadLeft
  },
  data () {
    return {
        title:"我的工单",
        workState:{},
        workList:[],
        workId:"",
        isShow:false
    }
  },
  mounted(){
      //提交工单权限判断
      if(window.localStorage.submissionWork == "1" || window.submissionWork == "1"){
          this.isShow = true
      }
      this.workState = orderTodo
      this.$axios({
          method:"POST",
          url:"/api/app/workOrder/list"
      }).then((res)=>{
          this.workList = res.data.rows
          console.log(res)
      }).catch((err)=>{
          console.log("网络错误")
      })
  },
  methods:{
      toInfo(workId,state){
          console.log(state)
          if(state == "0"){
            this.$router.push({
                path:"/operation/orderDetails",
                query:{
                    workId:workId
                }
            })
          }else if(state == "1"){
            this.$router.push({
                path:"/operation/orderWait",
                query:{
                    workId:workId
                }
            })
          }else if(state == "2"){
            this.$router.push({
                path:"/operation/orderReceive",
                query:{
                    workId:workId
                }
            })
          }else if(state == "3"){
            this.$router.push({
                path:"/operation/orderDeal",
                query:{
                    workId:workId
                }
            })
          }else if(state == "4"){
            this.$router.push({
                path:"/operation/orderDasis",
                query:{
                    workId:workId
                }
            })
          }
          //'1'=orderDetails(待审核) '2'=orderWait(待派发) orderReceive(接单) orderDeal(处理) orderDasis(基础) orderHistory(历史工单详情)
      },
      repair(){
          this.$router.push("/operation/repair")
      }
  }
}
</script>
<style lang="scss" type="text/css">
#myorder .content{
    height:3rem;
    width:100%;
    margin-top:0.16rem;
    background:rgba(255,255,255,0.03);
    font-size:0.28rem;
}
#myorder .content>p{
    font-size:0.26rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height:0.5rem;
    margin:0;
    padding-left:0.2rem;
    box-sizing: border-box;
}
#myorder .topbox{
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
#myorder .info{
    height:0.66rem;
    width:100%;
    display:flex;
    justify-content: flex-end;
    align-items: center;
}
#myorder .line{
    height:0.02rem;
    background:#2E3945;
}
#myorder .boxinfo{
    width:1.40rem;
    height:0.4rem;
    border-radius:0.08rem;
    border:0.02rem solid rgba(88,224,174,1);
    text-align:center;
    color:rgba(98,214,239,1);
    font-size:0.24rem;
    line-height:0.4rem;
    margin-right:0.4rem;
}
#myorder .myleft1{
    margin-left:0.2rem;
    width:0.80rem;
    height:0.32rem;
    background:rgba(247,160,63,1);
    box-shadow:0 0.04rem 0.10rem 0 rgba(0,0,0,0.1);
    border-radius:0.08rem;
    font-size:0.22rem;
    text-align:center;
    line-height:0.32rem;
}
#myorder .myleft2{
    margin-left:0.2rem;
    width:0.80rem;
    height:0.32rem;
    background:rgba(56,166,202,1);
    box-shadow:0 0.04rem 0.10rem 0 rgba(0,0,0,0.1);
    border-radius:0.08rem;
    font-size:0.22rem;
    text-align:center;
    line-height:0.32rem;
}
#myorder .othstate0{
    color:rgba(255,79,79,1);
    font-size:0.24rem;
    position: absolute;
    right:0.34rem;
}
#myorder .othstate1{
    color:rgba(255,179,61,1);
    font-size:0.24rem;
    position: absolute;
    right:0.34rem;
}
#myorder .othstate2{
    color:rgba(255,228,69,1);
    font-size:0.24rem;
    position: absolute;
    right:0.34rem;
}
#myorder .othstate3{
    color:rgba(98,214,239,1);
    font-size:0.24rem;
    position: absolute;
    right:0.34rem;
}
#myorder .othstate4{
    color:rgba(91,232,176,1);
    font-size:0.24rem;
    position: absolute;
    right:0.34rem;
}
#myorder .scroll{
    height:calc(100vh - 2.4rem);
    overflow-y:scroll;
}
#myorder .repair{
    width:3.92rem;
    height:0.68rem;
    background:linear-gradient(135deg,rgba(45,201,235,1) 0%,rgba(20,210,184,1) 100%);
    box-shadow:0 0.12rem 0.20rem 0 rgba(0,0,0,0.3);
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
</style>
