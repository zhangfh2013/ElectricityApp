<template>
  <div class="hello" id="login">
    <div class="login">
      <div class="app-name"><img src="../../static/img/logo@2x.png"></div>
      <div class="mylogin">
          <p>账号/用户名/手机号</p>
          <input class="myinput" type="text" v-model="user" placeholder="请输入账号">
          <p style="margin-top:0.37rem">密码</p>
          <input class="myinput" :type="inputType" v-model="password" placeholder="请输入密码">
          <img class="loginPas" :src="lookImg" alt="" @click="look" >
      </div>
      <div class="login-rember">
        <!-- <img src='../../static/img/img_1.jpg'> -->
      </div>
      <div type="button" class="login-run" @click="login">登 录</div>
      <div class="copyFoot" v-show="hidShow">Copyright@2016-2019 EnergieGaten Technology (Shanghai) Co.,Ltd All rights reserved</div>
    </div>
  </div>
</template>

<script>
import method from '../utils/demo.js'

const toast = method.toast
export default {
  name: 'login',
  data () {
    return {
      user:'',
      password:'',
      inputType:'password',
      lookImg:'.//static/img/unLook@2x.png',
      docmHeight: document.documentElement.clientHeight, // 默认屏幕高度
      showHeight: document.documentElement.clientHeight, // 实时屏幕高度
      hidShow: true, // 显示或者隐藏footer,
      tologin:domain.login
    }
  },
  watch: {
    showHeight: function () {
      if (this.docmHeight > this.showHeight) {
        this.hidShow = false
      } else {
        this.hidShow = true
      }
    },
  },
  mounted(){
    this.$router.push("/home/home")
    // let vm = this
    // // window.resize监听页面高度的变化
    // window.onresize = () => {
    //   return (() => {
    //     this.showHeight = document.body.clientHeight
    //   })()
    // }
    // if(window.localStorage.user){
    //   // alert(window.localStorage.user)qinghaicddl
    //   // alert(window.localStorage.password)123456
    //   let param = new URLSearchParams()
    //   param.append('userName', window.localStorage.user)
    //   param.append('password', window.localStorage.password)

    //   this.$axios({
    //     method:"POST",
    //     url:"/api/app/login",
    //     data:param,
    //     headers:{
    //       'Content-Type':'application/x-www-form-urlencoded'
    //     }
    //   }).then((res)=>{
    //     if(res.data.code === "0"){
    //       //全局保存权限值
    //       this.$axios({
    //         method:"POST",
    //         url:"/api/app/workOrder/getOrderPerms"
    //       }).then((res)=>{
    //         console.log(res)
    //         //提交权限
    //         window.localStorage.submissionWork = res.data.perms.submissionWork
    //         window.submissionWork = res.data.perms.submissionWork
    //         //查看权限
    //         window.localStorage.examineWork = res.data.perms.examineWork
    //         window.examineWork = res.data.perms.examineWork
    //         //操作权限
    //         window.localStorage.handleWork = res.data.perms.handleWork
    //         window.handleWork =  res.data.perms.handleWork
    //       }).catch((err)=>{
    //         console.log(err)
    //       })
    //       toast(res.data.msg)
    //       this.$router.push("/home/home")
    //     }else{
    //       toast(res.data.msg)
    //     }
    //   }).catch((err)=>{
    //     console.log(err)
    //     return
    //   })
    // }
    
  },
  methods:{
    // 控制密码显示/隐藏
    look(){
      if(this.inputType == 'password'){
        this.inputType = 'text';
        this.lookImg = './/static/img/look@2x.png'
      }else{
        this.inputType = 'password';
        this.lookImg = './/static/img/unLook@2x.png'
      }
    },
    // 登录判断
    login(){
      if(this.user === ""){
        toast("用户名不能为空")
        return;
      }
      if(this.password === ""){
        toast("密码不能为空")
        return;
      }
      let param = new URLSearchParams()
      param.append('userName', this.user)
      param.append('password', this.password)

      this.$axios({
        method:"POST",
        url:"/api/app/login",
        data:param,
        headers:{
          'Content-Type':'application/x-www-form-urlencoded'
        }
      }).then((res)=>{
        if(res.data.code === "0"){
          //全局保存权限值
          this.$axios({
            method:"POST",
            url:"/api/app/workOrder/getOrderPerms"
          }).then((res)=>{
            console.log(res)
            window.localStorage.user = this.user
            window.localStorage.password = this.password
            //提交权限
            window.localStorage.submissionWork = res.data.perms.submissionWork
            window.submissionWork = res.data.perms.submissionWork
            //查看权限
            window.localStorage.examineWork = res.data.perms.examineWork
            window.examineWork = res.data.perms.examineWork
            //操作权限
            window.localStorage.handleWork = res.data.perms.handleWork
            window.handleWork =  res.data.perms.handleWork
          }).catch((err)=>{
            console.log(err)
          })
          toast(res.data.msg)
          this.$router.push("/home/home")
        }else{
          toast(res.data.msg)
        }
      }).catch((err)=>{
        console.log(err)
        return
      })
    }
  }
}
</script>
<style>
#login{
    height:100%;
  }
#login .login{
    width: 100%;
    height: 100%;
    background:rgba(53,65,77,1);
    position:relative;
  }
#login .login-reg{
    width: 45px;
    float: right;
    font-size: 18px;
    letter-spacing: 2px;
    margin-right: 25px;
    margin-top: 20px;
    color: #fff;
  }
#login .app-name{
    width: 3.2rem;
    height:1.1rem;
    margin: 0 auto 0 auto;
    padding-top:2.04rem; 
  }
#login .app-name img{
    width:3.2rem;
  }
#login .login-input{
    margin-top: 120px;
    width: 330px;
    margin-left: auto;
    margin-right: auto; 
  }
#login .login-input a{
    width: 330px;
    margin-bottom: 25px;
    border-radius: 50px;
    background-color:(255,255,255,0.5); 
  }
 #login .mint-cell-title{
    padding-left: 20px;
    box-sizing: border-box;
  }
 #login .mint-cell-title{
    width: 80px;
  }
 #login .login-run{
  width: 6rem;
  height: 1rem;
  letter-spacing: 2px;
  margin-top: 0.98rem;
  border-radius: 50px;
  font-size: 0.4rem;
  text-align: center;
  line-height: 48px;
  margin-left: auto;
  margin-right: auto;
  color: #fff;
  background:linear-gradient(305deg,rgba(55,198,181,1) 0%,rgba(56,140,218,1) 100%);
  box-shadow:0px 4px 10px 0px rgba(0,0,0,0.1);
  border-radius:4px;
  }
#login .mylogin>p{
  margin:0;
}
#login .mylogin{
  width: 6rem;
  font-size:0.3rem; 
  box-sizing: border-box;
  color:rgba(255,255,255,1);
  margin-top:1.6rem;
  position: relative;
  left: 50%;
  width: 6rem;
  transform: translate(-50%);
}
#login .myinput{
  font-size: 0.3rem;
  width:6rem;
  height:0.6rem;
  outline: none;
  border: none;
  background: none;
  border-bottom:0.02rem solid rgba(255,255,255,0.3);
  color:rgba(255,255,255,1);
  background:transparent !important;
  -webkit-appearance:none;/*清除ios默认圆角*/
  border-radius:0;
}
#login .copyFoot{
    font-size: 0.2rem;
    text-align: center;
    color: #fff;
    position: absolute;
    box-sizing: border-box;
    line-height: 0.28rem;
    bottom: 0.5rem;
    color:rgba(255,255,255,0.4)
}
#login .loginPas{
  position: absolute;
  right:0;
  bottom: 0rem;
  width: 0.34rem;
  padding: 0.2rem;
}
</style>
