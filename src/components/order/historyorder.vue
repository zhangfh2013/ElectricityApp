<template>
  <div id="historyorder">
      <div class="scroll">
        <div class="content" v-for="item in workList">
            <div class="topbox">
                <div>编号{{item.workId}}</div>
                <div class="myleft1" v-if="item.status === '0'">一般</div>
                <div class="myleft2" v-else>严重</div>
            </div>
            <div class="line"></div>
            <p>变电所名称：{{item.deviceName}}</p>
            <p>设备名称：{{item.subName === null ? "空" :item.subName}}</p>
            <p>故障描述：{{item.workDesc}}</p>
            <div class="line" style="margin-top:0.12rem"></div>
            <div class="info">
                <div class="boxinfo" @click="toInfo(item.workId)">查看详情</div>
            </div>
        </div>
      </div>
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
  props:["mybindData"],
  data () {
    return {
        title:"我的工单",
        workState:{},
        workList:[],
        workId:""
    }
  },
  watch:{
      mybindData(val){
          console.log(val)
          this.workList = val
      }
  },
  mounted(){
      console.log(this.mybindData)
      this.workState = orderTodo
      let param = new URLSearchParams()
      param.append('state', 5)
      this.$axios({
        method:"POST",
        url:"/api/app/workOrder/list",
        data:param,
        headers:{
          'Content-Type':'application/x-www-form-urlencoded'
        }
      }).then((res)=>{
          this.workList = res.data.rows
         console.log( this.workList)
      }).catch((err)=>{
          console.log("网络错误")
      })
  },
  methods:{
      toInfo(workId){
        this.$router.push({
            path:"/operation/orderHistory",
            query:{
                workId:workId
            }
        })
      }
  }
}
</script>
<style lang="scss" type="text/css">
#historyorder .content{
    height:3rem;
    width:100%;
    margin-top:0.16rem;
    background:rgba(255,255,255,0.03);
    font-size:0.28rem;
}
#historyorder .content>p{
    font-size:0.26rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(255,255,255,1);
    line-height:0.5rem;
    margin:0;
    padding-left:0.2rem;
    box-sizing: border-box;
}
#historyorder .topbox{
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
#historyorder .info{
    height:0.66rem;
    width:100%;
    display:flex;
    justify-content: flex-end;
    align-items: center;
}
#historyorder .line{
    height:0.02rem;
    background:#2E3945;
}
#historyorder .boxinfo{
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
#historyorder .myleft1{
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
#historyorder .myleft2{
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
#historyorder .othstate0{
    color:rgba(255,79,79,1);
    font-size:0.24rem;
    position: absolute;
    right:0.34rem;
}
#historyorder .othstate1{
    color:rgba(255,179,61,1);
    font-size:0.24rem;
    position: absolute;
    right:0.34rem;
}
#historyorder .othstate2{
    color:rgba(255,228,69,1);
    font-size:0.24rem;
    position: absolute;
    right:0.34rem;
}
#historyorder .othstate3{
    color:rgba(98,214,239,1);
    font-size:0.24rem;
    position: absolute;
    right:0.34rem;
}
#historyorder .scroll{
    height:calc(100vh - 3.5rem);
    overflow-y:scroll;
}
</style>
