<template>
  <div id="orderWait">
    <navHeadLeft :title="title"></navHeadLeft>

    <div class="orderHead">
      <div class="HeadIcon"></div>
      <div class="HeadNum">编号{{workId == null ? "无" :workId}}</div>
      <div class="HeadDate">{{createTime == null ? "无" : createTime}}</div>
    </div>

    <div class="orderComment">
      <div class="comBox">
        <div class="comName">变电所名称：</div>
        <div class="comText">{{subName == null ? "无" : subName}}</div>
      </div>
      <div class="comBox">
        <div class="comName">设备名称： </div>
        <div class="comText">{{deviceName == null ? "无" : deviceName}}</div>
      </div>
      <div class="comBox">
        <div class="comName">工单描述：</div>
        <div class="comText">{{workDesc == null ? "无" : workDesc}}</div>
      </div>
      <div class="comBox">
        <div class="comName">工单创建人：</div>
        <div class="comText">{{createName == null ? "无" : createName}}</div>
      </div>
      <div class="comBox">
        <div class="comName">工单审核人：</div>
        <div class="comText">{{reviewName == null ? "无" : reviewName}}</div>
      </div>
      <div class="comBox">
        <div class="comName">工单派发人：</div>
        <div class="comText">{{disName == null ? "无" : disName}}</div>
      </div>
      <div class="comBox">
        <div class="comName">工单图片:</div>
        <div class="comText"></div>
      </div>
    </div>

    <div class="comPics">
      <img :src="url1" alt="">
      <img :src="url2" alt="">
      <img :src="url3" alt="">
    </div>

    <div class="orderBtnBox" @click="receiving" v-if="isShow">接单</div>

  </div>
</template>

<script>
import navHeadLeft from "../../../components/navHeadLeft.vue"
import hgf from '../../../utils/demo.js'
const toast = hgf.toast
export default {
  name: 'orderWait',
  components: {
    'navHeadLeft': navHeadLeft,
  },
  data () {
    return {
      value:'',
      title:'工单详情',
      subName:"",
   	  deviceName:"",
  	  workDesc:"",
  	  createTime:"",
      status:"",
      workId:"",
      createName:"",
      reviewName:"",
      isShow:false,
      disName:"",
      url1:"",
      url2:"",
      url3:""
    }
  },
  mounted(){
    if(window.localStorage.handleWork == "1" || window.handleWork == "1"){
      this.isShow = true
    }
    let workId = this.$router.history.current.query.workId
    this.workId = workId
    console.log(this.workId)
    let param = new URLSearchParams()
    param.append('workId', workId)
    this.$axios({
      method:"POST",
      url:"/api/app/workOrder/workOrderInfo",
      data:param,
      headers:{
        'Content-Type':'application/x-www-form-urlencoded'
      }
    }).then((res)=>{
      console.log(res)
      let data = res.data.workOrder
      this.subName = data.subName
      this.deviceName = data.deviceName
      this.workDesc = data.workDesc
      this.createTime = data.createTime
      this.createName = data.createName
      this.reviewName = data.reviewName
      this.disName = data.disName
      let allImgs = res.data.workOrder.imgs.split(",")
      // 图片
      if(allImgs[0]){
        this.url1 = "/api/profile/image/" + allImgs[0]
      }
      if(allImgs[1]){
        this.url2 = "/api/profile/image/" + allImgs[1]
      }
      if(allImgs[2]){
        this.url3 = "/api/profile/image/" + allImgs[2]
      }
    })
  },
  methods:{
    receiving(){
      console.log("接单")
      let param = new URLSearchParams()
      param.append('workId', this.workId)
      param.append('state', "3")
      this.$axios({
          method:"POST",
          url:"/api/app/workOrder/edit",
          data:param,
          headers:{
            'Content-Type':'application/x-www-form-urlencoded'
          }
      }).then((res)=>{
          console.log(res)
          toast("接单成功")
          this.$router.back();
      }).catch((err)=>{
          toast("网络错误")
          console.log("网络错误")
      })
    }
  }
}
</script>
<style lang="scss" >
$HeadHegight:0.8rem;
  .comPics>img{
    width:2rem;
    height:1.2rem;
    margin-right:0.2rem;
  }
#orderWait{
  height:100%;
  text-align: center;
  color: #fff;
  // Head
  .orderHead{
    width: 100%;
    height: $HeadHegight;
    display: flex;
    border-bottom:0.02rem solid rgba(30,38,45,1);  
      .HeadIcon{
        @extend .orderHead;
        width: 0.3rem;
        background: url('../../../../static/img/orderIcon@2x.png') no-repeat;
        background-size: 0.28rem;
        background-position-y: 0.28rem;
        margin: 0 0.1rem 0 0.2rem;
      }
      .HeadNum{
        width: 4rem;
        text-align: left;
        line-height: $HeadHegight;
        font-size: 0.28rem;
      }
      .HeadDate{
        width: 2.4rem;
        font-size: 0.24rem;
        line-height: $HeadHegight;
        position: absolute;
        right: 0.2rem;
      }
  }
  
  // Comment
  .orderComment{
    width: 100%;
    height: auto;
    padding: 0 0.2rem;
    box-sizing: border-box;
  }
  .comBox{
    @extend .orderComment;
    height: auto;
    display:flex;
    padding: 0;
    font-size: 0.26rem;
    text-align: left;
    .comName{
      line-height: 0.56rem;
      width: auto;
    }
    .comText{
      width: 5.52rem;
      height: auto;
      line-height: 0.56rem;
      word-wrap:break-word;
      word-break:break-all;
    }
  }
  // comPics
  .comPics{
    width: 6.6rem;
    height: 2.6rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 0.16rem auto;
  }
  .comPic{
      width: 2rem;
      height: 1.2rem;
      background: rgb(78, 77, 77);
      margin:0 0 0.2rem 0.2rem; 
  }
  // btn
  .orderBtnBox{
    width: 2.4rem;
    height: 0.68rem;
    font-size: 0.3rem;
    line-height: 0.68rem;
    position: absolute;
    bottom: 0.6rem;
    left: 50%;
    margin-left: -1.2rem;
    background:linear-gradient(135deg,rgba(45,201,235,1) 0%,rgba(20,210,184,1) 100%);
    box-shadow:0 0.04rem 0.12rem 0 rgba(0,0,0,0.3);
    border-radius:0.08rem;
    text-align: center;
  }
}

</style>
