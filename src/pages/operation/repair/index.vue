<template>
  <div id="repair">
      <navHeadLeft :title="title"></navHeadLeft>
      <div class="tochange">
          <span>变电所名称</span>
          <input type="text" v-model="subName">
      </div>
      <div class="tochange">
          <span>设备名称</span>
          <input type="text" v-model="deviceName">
      </div>
      <div class="tochange">
          <span>工单描述</span>
          <input type="text" v-model="workDesc">
      </div>
      <!-- <div class="tochange">
          <input type="text" v-model="createTime">
          <span>创建时间</span>
      </div> -->
      <div class="seriousness">
        <form class="form1">
            <div>
                <input type="radio" id="change4"  name="mychange" ref="change4" checked="checked" @click="status1">
                <label for="change1">一般</label>
            </div>
            <div>
                <input type="radio" id="change5" name="mychange" ref="change5" @click="status2">
                <label for="change2">严重</label>
            </div>
        </form>
      </div>
      <div class="addImg">
            <span>上传图片</span>
            <div style="clear:both;"></div>
            <div class="erimg" v-if="!imgurl">
                <img src="../../../../static/img/addimg3.png" alt="">
            </div>
            <div class="erimgOth" v-else>
                <img :src="imgurl" alt="">
                <img :src="imgurl2" alt="">
                <img :src="imgurl3" alt="">
            </div>

        <input  id="file" name="file" @change="uploading($event)" type="file" accept="image/*"/>


      </div>
      <div class="submit" @click="submit">提交</div>
  </div>
</template>

<script>
import navHeadLeft from "../../../components/navHeadLeft.vue"
import demo from "../../../utils/demo.js"
const toast =  demo.toast

export default {
  name:"repair",  
  components: {
    "navHeadLeft": navHeadLeft
  },
  data () {
    return {
        title:"工单报修",
        statusAll:"0",
        subName:"",
        deviceName:"",
        workDesc:"",
        // createTime:"",
        imgurl:"",
        imgurl2:"",
        imgurl3:"",
        path1:"",
        path2:"",
        path3:""
    }
  },
  methods:{
      submit(){
        //三张图片的地址
        let allPath = this.path1+","+this.path2+","+this.path3
        console.log("提交")
        console.log(this.subName)
        console.log(this.deviceName)
        console.log(this.workDesc)
        // console.log(this.createTime)
        console.log(this.statusAll)
        if(this.subName == ""){
            toast("变电所名称不能为空")
            return
        }
        if(this.deviceName == ""){
            toast("设备名称不能为空")
            return
        }
        if(this.workDesc == ""){
            toast("工单描述不能为空")
            return
        }
        // if(this.createTime == ""){
        //     toast("创建时间不能为空")
        //     return
        // }
        console.log(this.nowtime())
        let param = new URLSearchParams()
        param.append('subName', this.subName)
        param.append('deviceName', this.deviceName)
        param.append('workDesc', this.workDesc)
        param.append('createTime', this.nowtime())
        param.append('status', this.statusAll)
        param.append('imgs', allPath)
        this.$axios({
            method:"POST",
            url:"/api/app/workOrder/add",
            data:param,
            headers:{
            'Content-Type':'application/x-www-form-urlencoded'
            }
        }).then((res)=>{
            console.log(res)
            toast("提交成功")
            this.$router.back()
        }).catch((err)=>{
            console.log(err)
        })
      },
      status1(e){
          this.statusAll = "0"
      },
      status2(e){
          this.statusAll = "1"
      },
      nowtime(){
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();
        var hour = date.getHours();
        var min = date.getMinutes();
        var sec = date.getSeconds();
        
        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        var currentdate = year + seperator1 + month + seperator1 + strDate + ' ' + hour + ':' + min + ':' + sec;
        return currentdate;
      },
      uploading(event){
        var formdata=new FormData();
        //可以通过append()方法来追加数据
        formdata.append("avatar",event.target.files[0]);
        // this.imgurl = URL.createObjectURL(event.target.files[0])
        // let param = new URLSearchParams()
        // param.append('avatar', event)
        // /api/app/workOrder/workOrder/image
        this.$axios({
            method:"POST",
            url:"/api/app/workOrder/workOrder/image",
            data:formdata
        }).then((res)=>{
            console.log(res)
            if(!this.imgurl){
                this.imgurl = URL.createObjectURL(event.target.files[0])
                this.path1 = res.data.path
            }else if(!this.imgurl2){
                this.imgurl2 = URL.createObjectURL(event.target.files[0])
                this.path2 = res.data.path
            }else if(!this.imgurl3){
                this.imgurl3 = URL.createObjectURL(event.target.files[0])
                this.path3 = res.data.path
            }else{
                toast("只能同时上传三张图片")
            }
        })
      }
  }
}
</script>
<style lang="scss" >
#file{
    height:2.3rem;
    width:100%;
    position:absolute;
    left:0;
    top:0;

}
#repair{
    width:100%;
    height:100%;
    background:rgba(255,255,255,1);
    font-size:0.24rem;
    .tochange{
        margin:0 0.2rem;
        height:1rem;
        border-bottom:0.04rem solid rgba(226,226,226,1);
        display:flex;
        align-items: center;
        font-size:0.24rem;
        font-family:PingFangSC-Regular;
        font-weight:400;
        color:#111519;
        line-height:0.34rem;
        position:relative;
        span{
            margin-left:0.1rem;
            position:relative;
        }
        input{
            height: 0.5rem;
            width: 5rem;
            position:absolute;
            left:1.5rem;
            border:none;
            outline:none;
        }
    }
    .seriousness{
        margin:0 0.2rem;
        height:1rem;
        .form1{
            display: flex;
            align-items: center;
            height: 1rem;
            div{
                margin-right:0.2rem;
            }
        }
    }
    .addImg{
        position:relative;
        margin-top:0.26rem;
        margin-left:0.3rem;
        margin-right:0.2rem;
        height:2.3rem;
        border-bottom:0.04rem solid rgba(226,226,226,1);
        .erimgOth{
            width: 100%;
            height: 1.2rem;
            background: #eaeaea;
            border-radius: 0.04rem;
            float: right;
            margin-top: 0.4rem;
            display: flex;
            justify-content: center;
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            justify-content: space-around;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            img{
                width:2rem;
                height:1.2rem;

            }
        }
        .erimg{
            width:2rem;
            height:1.2rem;
            background:rgba(234,234,234,1);
            border-radius:0.04rem;
            float:right;
            margin-top:0.4rem;
            margin-right:0.2rem;
            display:flex;
            justify-content: center;
            align-items: center;
            img{
                height:0.32rem;
                width:0.28rem;
            }
        }
    }
}
.tochange>span:before{
    content:"*";
    position: absolute;
    left: -0.12rem;
    top: 0.04rem;
    color:red;
}
#repair .submit{
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
</style>
