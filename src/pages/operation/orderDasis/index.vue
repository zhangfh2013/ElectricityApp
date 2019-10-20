<template>
  <div id="orderDasis">
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
        <div class="comText">{{disName}}</div>
      </div>
      <div class="comBox">
        <div class="comName">工单接收人：</div>
        <div class="comText">{{accName}}</div>
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

    <div class="MaintenanceBox">
      <div class="MaiCon" v-for="item in workLogs">
        <img src="../../../../static/img/group@2x.png">
        <div class="conTextBox">
          <div class="conTime">{{item.createTime}}</div>
          <div class="conText">{{item.description}}</div>
          <div class="conPics">
              <img :src="item.imgs == null ? '' :'/api/profile/image/'+item.imgs.split(',')[0]" alt="">
              <img :src="item.imgs == null ? '' :'/api/profile/image/'+item.imgs.split(',')[1]" alt="">
              <img :src="item.imgs == null ? '' :'/api/profile/image/'+item.imgs.split(',')[2]" alt="">
          </div>
        </div>
      </div>
    </div>

    <div class="orderBtnBox" v-if="isShow">
      <div class="orderBtn oM" @click="doAgain">重新执行</div>
      <div class="orderBtn" @click="sure">确认</div>
    </div>

  </div>
</template>

<script>
import navHeadLeft from "../../../components/navHeadLeft.vue"
import hgf from '../../../utils/demo.js'
const toast = hgf.toast
export default {
  name: 'orderDasis',
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
      workLogs:'',
      isShow:false,
      url1:"",
      url2:"",
      url3:"",
      disName:"",
      accName:"",
    }
  },
  mounted(){
    if(window.localStorage.examineWork == "1" || window.examineWork == "1"){
      this.isShow = true
    }
    console.log(this.$router.history.current.query.workId)
    let workId = this.$router.history.current.query.workId
    this.workId = workId
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
      this.workLogs = data.workLogs
      this.disName = data.disName
      this.accName = data.accName
      console.log(this.workLogs)
      let allImgs = res.data.workOrder.imgs.split(",")
      console.log(allImgs[0],allImgs[1],allImgs[2])
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
    doAgain(){
      console.log("重新执行")
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
          this.$router.back();
      }).catch((err)=>{
          console.log("网络错误")
      })
    },
    sure(){
      console.log("确认")
      let param = new URLSearchParams()
      param.append('workId', this.workId)
      param.append('state', "5")
      this.$axios({
          method:"POST",
          url:"/api/app/workOrder/edit",
          data:param,
          headers:{
            'Content-Type':'application/x-www-form-urlencoded'
          }
      }).then((res)=>{
          toast("确认成功")
          console.log(res)
          this.$router.back();
      }).catch((err)=>{
          console.log("网络错误")
      })
    }
  }
}
</script>
<style lang="scss" >
$HeadHegight:0.8rem;
#orderDasis{
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
  .comPics{
    width: 6.6rem;
    height: 2.6rem;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin: 0 auto;
  }
  .comPics>img{
    width:2rem;
    height:1.2rem;
    margin-right:0.2rem;
  }
  .comPic{
      width: 2rem;
      height: 1.2rem;
      background: rgb(78, 77, 77);
      margin:0 0 0.2rem 0.2rem; 
  }
  // btn
  .orderBtnBox{
    width: 5.1rem;
    height: 0.68rem;
    font-size: 0.3rem;
    line-height: 0.68rem;
    position: absolute;
    bottom: 0.6rem;
    left: 50%;
    margin-left: -2.55rem;
    display: flex;
  }
  .orderBtn{
    width:2.4rem;
    height:0.68rem;
    background:linear-gradient(135deg,rgba(45,201,235,1) 0%,rgba(20,210,184,1) 100%);
    box-shadow:0 0.04rem 0.12rem 0 rgba(0,0,0,0.3);
    border-radius:0.08rem;
  }
  .oM{
    margin-right: 0.3rem;
  }
  // 添加工单
  .MaintenanceBox{
    width: 6.3rem;
    height: 3.5rem;
    margin: 0.2rem 0 0 0.7rem;
    overflow: scroll;
    position: relative;
  }
  .MaiCon{
    width: 6.1rem;
    height: auto;
    font-size: 0.26rem;
    font-weight:400;
    text-align: left;
    margin-left: 0.12rem;
    padding:0.12rem 0 0.5rem 0; 
    border-left:0.04rem solid rgba(233,233,233,0.5);
    display: flex;
  }
  .MaiCon img{
    width: 0.24rem;
    height: 0.24rem;
    margin: 0.12rem 0 0 -0.14rem;
  }
  .conTextBox{
    width: 6.1rem;
    height: auto;
    margin-left: 0.1rem; 
  }
  .conTime{
    width: 100%;
    line-height: 0.5rem;
    text-align: left;
  }
  .conText{
    width: 100%;
    height:0.8rem;
    line-height:0.4rem;
  }
  .conPics{
    width: 100%;
    height: 0.72rem;
    margin: 0.1rem 0 0 0;
    display: flex;
  }
  .conPics>img{
    width:1.8rem;
    height:1rem;
  }
  .conPic{
    width:1.2rem;
    height:0.72rem;
    border-radius:0.02rem;
    background-color: rgb(202, 202, 202);
    margin-right: 0.15rem;
  }
}

</style>
