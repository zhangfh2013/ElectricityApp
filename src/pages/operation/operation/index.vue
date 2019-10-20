<template>
  <div id="operationHome">
    <navHead :title="title"></navHead>

    <!-- one -->
    <div class="operFirst" @click="facilityInfo">
      <div class="operFirstText">设备档案信息</div>
      <img src="../../../../static/img/oper-order@2x.png">
    </div>
    <!-- two -->
    <div class="operTwo" @click="order">
      <div class="operTwoText">工单管理</div>
      <img src="../../../../static/img/oper-archives@2x.png">
    </div>

    <navFoot :idx="3"></navFoot>
  </div>
</template>

<script>
import navFoot from "../../../components/navFoot.vue"
import navHead from "../../../components/navHead.vue"

export default {
  name: 'operationHome',
  components: {
    'navFoot': navFoot,
    'navHead': navHead,
  },
  data () {
    return {
      value:'',
      title:'运维'
    }
  },
  methods:{
    facilityInfo(){
      this.$router.push("/operation/facilityInfo")
    },
    order(){
      this.$router.push("/operation/order")
    }
  }
}
</script>
<style>
#operationHome{
    height:100%;
    text-align: center;
}
#operationHome #navHead{
  box-shadow:0 0.02rem 0.1rem 0 rgba(0,0,0,0.45);
}

#operationHome .operFirst,#operationHome .operTwo{
  width: 6.7rem;
  height: 3.6rem;
  font-size: 0.4rem;
  color: #fff;
  border-radius:0.2rem;
  margin: 0.4rem auto 0.4rem auto;
  box-shadow:0 0.04rem 0.1rem 0 rgba(0,0,0,0.1);
  position: relative;
}
#operationHome .operTwo img,#operationHome .operFirst img{
  display: block;
  width: 6.7rem;
}
/* #operationHome .operFirst{
  background: url('../../../../static/img/oper-order@2x.png');
  background-size: 6.7rem;
}
#operationHome .operTwo{
  background: url('../../../../static/img/oper-archives@2x.png');
  background-size: 6.7rem;
} */
#operationHome .operFirstText,#operationHome .operTwoText{
  width: 2.4rem;
  position: absolute;
  top: 0.9rem;
  left: 0.7rem;
  text-align: left;
}
</style>
