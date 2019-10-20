<template>
  <div id="perChange">
    <navHeadLeft   :title="title"></navHeadLeft>
    <!-- 个人中心-列表内容 -->
    <div class="per-list">
      <ul>
        <!-- <li>
          <div class="per-list-text">头像</div>
          <div class="per-list-img"><img src="../../../../static/img/img_2.jpg" /></div>
          <div class="per-list-write"><img src="../../../../static/img/write.png" /></div>
        </li> -->
        <li>
          <div class="per-list-text">昵称</div>
          <div class="per-list-img">{{userName}}</div>
          <div class="per-list-write"><img src="../../../../static/img/write.png" /></div>
        </li>
        <li>
          <div class="per-list-text">电话</div>
          <div class="per-list-img">{{phoneNum}}</div>
          <div class="per-list-write"><img src="../../../../static/img/write.png" /></div>
        </li>
        <li>
          <div class="per-list-text">所在企业</div>
          <div class="per-list-img">{{compName}}</div>
          <div class="per-list-write"><img src="../../../../static/img/write.png" /></div>
        </li>
      </ul>
      <button @click="okChange" v-if="ok">确定</button>
    </div> 
    
  </div>
</template>

<script>
import navHeadLeft from "../../../components/navHeadLeft.vue"
import { Indicator } from 'mint-ui';
import demo from "../../../utils/demo.js"
const toast = demo.toast

export default {
  name: 'perChange',
  components: {
    'navHeadLeft': navHeadLeft,
  },
  data () {
    return {
      selected:'',
      title:'个人信息',
      cName:false,
      ok:false,
      userName:'',
      phoneNum:'',
      compName:''
    }
  },
  mounted(){
    this.per()
  },
  methods:{
    okChange(){
      this.cName = false
      this.ok = false
    },
    per(){
      Indicator.open("加载中")
      this.$axios({
        method:"GET",
        url:"/api/app/getUser"
      }).then((res)=>{
        console.log(res)
        let data = res.data
        this.userName = data.loginName
        this.phoneNum = data.phonenumber
        this.compName = data.userName
        Indicator.close()
      }).catch(()=>{
        toast("网络错误")
        console.log("网络错误")
        Indicator.close()
      })
    }
  }
}
</script>
<style>
#perChange{
    height:100%;
    text-align: center;
    background: #F4F4F4;
}
/* per-list */
#perChange .per-list{
  width: 100%;
  margin-top: 0.38rem;
  border-top: 0.01rem solid #E0E0E1;
  border-bottom: 0.01rem solid #E0E0E1;
  background: #fff;
}
#perChange ul,li{
   padding:0;margin:0;list-style:none;
   font-size: 0.15rem;
}
 #perChange li{
  width: 6.7rem;
  margin-left: auto;
  margin-right: auto;
  padding:0.3rem 0;
  text-align: left;
  border-bottom: 0.01rem solid #E0E0E1;
  display: flex;
}
#perChange li img{
  width: 0.67rem;
}
#perChange .per-list-img{
  font-size: 0.3rem;
  text-align: right;
  width: 10rem;
  height: 0.67rem;
  overflow: hidden;
  color: #999;
  margin-right: 0.07rem;
  line-height: 0.67rem;
}
#perChange .per-list-text{
  font-size: 0.3rem;
  width: 6.4rem;
  /* margin-left: 0.2rem; */
  line-height: 0.67rem;
}
#perChange .per-list-write img{
  width: 0.47rem;
  margin-top: 0.1rem;
}
</style>
