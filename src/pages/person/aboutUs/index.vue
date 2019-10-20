<template>
  <div id="aboutUs">
      <navHeadLeft :title="title"></navHeadLeft>
      <div class="content">
          <p class="top">公司名称</p>
          <p class="oth">昂顿科技（上海）有限公司 </p>
          <p class="oth">EnergieDaten Technology (Shanghai) Co., Ltd.</p>
          <div class="line"></div>

          <p class="top">网站地址</p>
          <p class="oth">www.energiedaten.com</p>
          <div class="line"></div>

          <p class="top">联系电话</p>
          <p class="oth">021-61255088</p>
          <div class="line"></div>
      </div>
  </div>
</template>

<script>
import navHeadLeft from "../../../components/navHeadLeft.vue"

export default {
  name:"aboutUs",  
  components: {
    "navHeadLeft": navHeadLeft
  },
  data () {
    return {
        title:"关于我们"
    }
  },

}
</script>
<style>
#aboutUs{
    width:100%;
    height:100%;
    background:rgba(255,255,255,1);
}
#aboutUs .content{
    height:6rem;
    width:100%;
    padding:0.4rem 0.62rem;
    box-sizing: border-box;
    /* background:greenyellow; */
}
#aboutUs .top{
    font-size:0.32rem;
    font-family:PingFangSC-Medium;
    font-weight:600;
    color:rgba(17,21,25,1);
    line-height:0.44rem;
    margin-bottom:0;
}
#aboutUs .oth{
    font-size:0.28rem;
    font-family:PingFangSC-Regular;
    font-weight:400;
    color:rgba(17,21,25,1);
    line-height:0.5rem;
    margin-bottom:0;
    margin-top:0;
}
#aboutUs .line{
  width:6.4rem;
  height:0.02rem;
  background:rgba(224,224,225,1);
  margin: 0.2rem auto;
}
</style>
