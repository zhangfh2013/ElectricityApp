<template>
  <div id="personHome">
    <navHeadLeft  :title="title"></navHeadLeft>
    <!-- 个人中心-第一部分内容 -->
    <div class="per-head" @click="perChange">
      <div class="per-headbox">
        <div class="per-img"><img src="../../../../static/img/img_2.jpg" /></div>
        <div class="per-namebox">
          <div class="per-name">admin</div>
          <div class="per-comp">上海昂顿云</div>
        </div>
        <div class="per-write"><img src="../../../../static/img/write.png" /></div>
      </div>     
    </div>
    <!-- 个人中心-列表内容 -->
    <div class="per-list">
      <ul>
        <li @click="changePassword">
          <div class="per-list-img"><img src="../../../../static/img/personPassword@2x.png" /></div>
          <div class="per-list-text" >修改密码</div>
          <div class="per-list-write"><img src="../../../../static/img/write.png" /></div>
        </li>
        <li @click="versions">
          <div class="per-list-img"><img src="../../../../static/img/personVersion@2x.png" /></div>
          <div class="per-list-text">关于版本</div>
          <div class="per-list-write"><img src="../../../../static/img/write.png" /></div>
        </li>
        <li @click="aboutUs">
          <div class="per-list-img"><img src="../../../../static/img/personAbout@2x.png" /></div>
          <div class="per-list-text">关于我们</div>
          <div class="per-list-write"><img src="../../../../static/img/write.png" /></div>
        </li>
      </ul>
    </div>  
    <!-- 退出登录 -->
    <div class="exitLogin" @click="back">退出登录</div> 
  </div>
</template>

<script>
import navHeadLeft from "../../../components/navHeadLeft.vue"
import hgf from '../../../utils/demo.js'
const toast = hgf.toast

export default {
  name: 'personHome',
  components: {
    'navHeadLeft': navHeadLeft
  },
  data () {
    return {
      selected:'',
      title:'个人中心',
    }
  },
  methods:{
    perChange(){
      this.$router.push({path:'/person/perChange'});
    },
    changePassword(){
      this.$router.push({path:'/person/perChangePassword'});
    },
    aboutUs(){
      this.$router.push({path:'/person/aboutUs'});
    },
    versions(){
      toast("该功能暂未开放")
    },
    back(){
      console.log("退出登录")
      this.$axios({
        method:"GET",
        url:"/api/loginOut"
      }).then((res)=>{
        console.log(res)
        toast("退出成功")
        window.localStorage.clear();
        this.$router.push({path:"/"})
      })

    }
  }
}
</script>
<style>
#personHome{
    height:100%;
    text-align: center;
    background: #F4F4F4;
}
/* 第一部分 */
#personHome .per-head{
  width: 100%;
  height: 2.4rem;
  margin-top: 0.38rem;
  border-top: 0.01rem solid #E0E0E1;
  border-bottom: 0.01rem solid #E0E0E1;
  background: #fff;
}
#personHome .per-headbox{
  width: 6.78rem;
  height: 1.6rem;
  margin-left: auto;
  margin-right: auto;
  position:relative;
  top:50%;
  margin-top:-0.8rem;
  display: flex;
}
#personHome .per-img{
  width: 1.6rem;
  height: 1.6rem;
  border-radius: 0.05rem;
  margin-right: 0.25rem;
  overflow: hidden;
}
#personHome .per-img img{
  width: 1.6rem;
}
#personHome .per-namebox{
  width: 3rem;
  height: 100%;
  font-weight:400;
  text-align: left;
}
#personHome .per-name{
  font-size: 0.36rem;
  color:rgba(17,21,25,1);
  margin-top: 0.3rem;
}
#personHome .per-comp{
  font-size: 0.26rem;
  color: #4C545D;
  margin-top: 0.1rem;
}
#personHome .per-write{
  width: 0.25rem;
  margin-left: 1.4rem;
}
#personHome .per-write img{
  width: 0.4rem;
}
/* per-list */
#personHome .per-list{
  width: 100%;
  margin-top: 0.38rem;
  border-top: 0.01rem solid #E0E0E1;
  border-bottom: 0.01rem solid #E0E0E1;
  background: #fff;
}
#personHome ul,li{
   padding:0;margin:0;list-style:none;
   font-size: 0.15rem;
   
}
#personHome li{
  width: 6.7rem;
  margin-left: auto;
  margin-right: auto;
  padding:0.3rem 0;
  text-align: left;
  border-bottom: 0.01rem solid #E0E0E1;
  display: flex;
  height: 0.38rem;
}
#personHome .per-list-img img{
  width: 0.28rem;
  height:0.28rem;
}
#personHome .per-list-write img{
  width: 0.3rem;
}
#personHome .per-list-img,#personHome .per-list-write{
  width: 0.42rem;
  height: 0.42rem;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;  
}
#personHome .per-list-text{
  width: 6.4rem;
  height: 0.42rem;
  margin-left: 0.2rem;
  line-height: 0.42rem;
  font-size: 0.3rem;
}
/* 退出登录 */
.exitLogin{
  width: 6.7rem;
  height: 1rem;
  color: #FD5739;
  font-size: 0.34rem;
  background: #fff;
  line-height: 1rem;
  margin: 2.7rem auto 0 auto;
}
</style>
