<template>
  <div fixed id="navHeadSave" >
    <div class="navHeadBox">
        <div class="Cancel" @click="navCancel">取消</div>
        <div class="nhl-text">{{title}}</div>
        <div class="Save" @click="navSave">完成</div>
    </div>
  </div>
</template>

<script>
import hgf from '../utils/demo.js'
const toast = hgf.toast

export default {
  name: 'navHeadSave',
  components: {
  },
  mounted(){
  },
  methods:{
    navCancel(){
        this.$router.back(-1);
    },
    navSave(){
        console.log("rua")
        //// /api/app/updatePassword?oldPass=1234567&newPass=123456&confirmpass=123456
        if(this.user === ""){
          toast("旧密码不能为空")
          return
        }
        if(this.password === ""){
          toast("新密码不能为空")
          return
        }
        if(this.password !== this.aginpassword){
          toast("两次输入密码不一致")
          return
        }
        let param = new URLSearchParams()
        param.append('oldPass', this.user)
        param.append('newPass', this.password)
        param.append('confirmpass', this.aginpassword)
        this.$axios({
          method:"POST",
          url:"/api/app/updatePassword",
          data:param,
          headers:{
            'Content-Type':'application/x-www-form-urlencoded'
          }
        }).then((res)=>{
          console.log(res)
          toast("您已成功修改密码");   
          this.$router.back(-1);    
        }).catch((err)=>{
          toast("网络错误")
        })
  
    }
  },
  props:[
    'title',
    'user',
    'password',
    'aginpassword'
  ]
}
</script>
<style>
#navHeadSave{
    width: 100%;
}
#navHeadSave .navHeadBox{
    width: 100%;
    height: 0.9rem;
    padding-top: 0.4rem;
    display: flex;
    background: #2E3944;
    color: #fff;
}
#navHeadSave .Cancel,#navHeadSave .Save{
    width: 1rem;
    line-height: 0.9rem;
    font-size: 0.28rem;
    position: absolute;
}
#navHeadSave .Cancel{   
    left: 0;
}
#navHeadSave .Save{
    right: 0;
}
#navHeadSave .nhl-text{
  width: 3.8rem;
  height: 0.9rem;
  line-height: 0.9rem;
  font-size: 0.32rem;
  position: absolute;
  left: 50%;
  margin-left: -1.9rem;
  text-align: center;
}
</style>
