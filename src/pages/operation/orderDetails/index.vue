<template>
  <div id="orderDeal">
    <navHeadLeft :title="title"></navHeadLeft>

    <div class="orderHead">
      <div class="HeadIcon"></div>
      <div class="HeadNum">编号{{workIdShow == null ? "无" :workIdShow}}</div>
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
        <div class="comName">工单图片:</div>
        <div class="comText"></div>
      </div>
    </div>

    <div class="comPics">
      <img :src="url1" alt="">
      <img :src="url2" alt="">
      <img :src="url3" alt="">
    </div>

    <div class="orderBtnBox" v-if="btnShow">
      <div class="orderBtn oM" @click="nopass">未通过</div>
      <div class="orderBtn" @click="pass">通过</div>
    </div>

    <div class="upTextBox" v-show="look">
      <div class="trueBox">
        <div class="no" @click="upText">取消</div>
        <div class="ok" @click="orderSave">确定</div>
      </div>
      <div class="cont">
        <div class="contText"><span>*</span> 文字说明</div>
        <textarea type="text" v-model="orderText"></textarea>
      </div>
      <div class="conPic">上传图片<span>(最多上传3张)</span></div>
      <div class="pics">
        <div class="picList">
          <!-- <img src="../../../../static/img/addimg3.png">
          <img src="../../../../static/img/addimg3.png">
          <img src="../../../../static/img/addimg3.png"> -->
        </div>
        <div class="upPic"><img src="../../../../static/img/addimg3.png"></div>
      </div>
    </div>
  </div>
</template>

<script>
import navHeadLeft from "../../../components/navHeadLeft.vue"
import hgf from '../../../utils/demo.js'
const toast = hgf.toast

export default {
  name: 'orderDeal',
  components: {
    'navHeadLeft': navHeadLeft,
  },
  data () {
    return {
      value:'',
      title:'工单详情',
      look:false,
      orderText:'',
      workIdShow:"",
      createTime:"",
      subName:"",
      deviceName:"",
      workDesc:"",
      createName:"",
      btnShow:false,
      url1:"",
      url2:"",
      url3:""
    }
  },
  mounted(){
    if(window.localStorage.examineWork == "1" || window.examineWork == "1"){
      this.btnShow = true
    }
    if(this.$router.history.current.query){
      let workId = this.$router.history.current.query.workId
      console.log(workId)
      // http://192.168.1.103:81/app/workOrder/workOrderInfo?workId=2019-03-22%2012%3A53%3A26
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
          let server = "http://101.200.44.220:8090/profile/face/image"
          console.log(res)
          let data = res.data.workOrder
          this.workIdShow = data.workId
          this.createTime = data.createTime
          this.subName = data.subName
          this.deviceName = data.deviceName
          this.workDesc = data.workDesc
          this.createName = data.createName
          let allImgs = res.data.workOrder.imgs.split(",")
          console.log(allImgs[0],allImgs[1],allImgs[2])
          // 图片
          this.url1 = "/api/profile/image/" + allImgs[0]
          this.url2 = "/api/profile/image/" + allImgs[1]
          this.url3 = "/api/profile/image/" + allImgs[2]
          console.log(this.url1)
      }).catch((err)=>{
          console.log("网络错误")
      })
    }

  },
  methods:{
    upText(){
      this.look = !this.look
    },
    orderSave(){
        if(this.orderText === ""){
          toast("文字描述不能为空")
          return
        }
        toast("您已成功提交");   
        this.look = !this.look  
    },
    //未通过按钮
    nopass(){
      console.log("未通过")
      // /api/app/workOrder/edit?workId=2019-03-22%2012%3A53%3A26
      let param = new URLSearchParams()
      param.append('workId', this.workIdShow)
      param.append('delFlag', "1")
      this.$axios({
          method:"POST",
          url:"/api/app/workOrder/edit",
          data:param,
          headers:{
            'Content-Type':'application/x-www-form-urlencoded'
          }
      }).then((res)=>{
          console.log(res)
          toast("工单审核未通过")
          this.$router.back();
      }).catch((err)=>{
          console.log("网络错误")
      })

    },
    //通过按钮
    pass(){
      console.log("通过")
      let param = new URLSearchParams()
      param.append('workId', this.workIdShow)
      param.append('state', "1")
      this.$axios({
          method:"POST",
          url:"/api/app/workOrder/edit",
          data:param,
          headers:{
            'Content-Type':'application/x-www-form-urlencoded'
          }
      }).then((res)=>{
          console.log(res)
          toast("工单审核通过")
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
#orderDeal{
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
    margin: 0.16rem auto;
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
  .upTextBox{
    width:100%;
    height:4.52rem;
    background:rgba(255,255,255,1);
    position: fixed;
    bottom: 0;
  }
  .trueBox{
    width:100%;
    height: 0.66rem;
    font-size: 0.26rem;
    line-height: 0.66rem;
    color: #4C545D;
    border-bottom:0.02rem solid rgba(228,228,228,1); 
    position: relative;
  }
  .no{
    position: absolute;
    left: 0.3rem;
  }
  .ok{
    position: absolute;
    right: 0.3rem;
  }
  .cont{
    width: 100%;
    height: 1.36rem;
    overflow: scroll;
    border-bottom:0.02rem solid rgba(228,228,228,1); 
    position: relative;
  }
  textarea{
    height: 1rem;
    width: 5.2rem;
    position:absolute;
    top: 0.15rem;
    left:1.8rem;
    border:none;
    outline:none;
    white-space:normal;
    word-wrap:break-word;
    word-break:break-all
  }
  .contText{
    position: absolute;
    font-size: 0.28rem;
    color: #111519;
    margin:0.15rem 0 0 0.3rem;
  }
  .contText span{
    color: red;
  }
  .conPic{
    color: #111519;
    font-size: 0.28rem;
    text-align: left;
    margin:0.15rem 0 0 0.3rem;
  }
  .conPic span{
    color: #4C545D;
  }
  .pics{
    width: 6.9rem;
    height: 1.2rem;
    margin: 0.3rem 0 0 0.3rem;
    position: relative;
  }
  .picList{
    width: 4.6rem;
    height: 1.2rem;
    position: absolute;
    left: 0;
    display: flex;
    overflow: scroll;
  }
  .upPic{
    width:2.04rem;
    height:1.2rem;
    background:rgba(234,234,234,1); 
    position: absolute;
    right: 0;
  }
  .upPic img{
    width: 0.36rem;
    position: absolute;
    top: 0.45rem;
    left: 50%;
    margin-left: -0.16rem;
  }
}

</style>
