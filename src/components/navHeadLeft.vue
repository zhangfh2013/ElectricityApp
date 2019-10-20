<template>
  <div fixed id="navHeadLeft"  >
    <div class="navHeadBox">
        <div class="goBack" @click="navBack"><img src="../../static/img/back.png" alt="" /></div>
        <div class="nhl-text">{{title}}</div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'navHeadLeft',
  components: {
  },
  data () {
    return {
      
    }
  },
  methods:{
      navBack(){
        this.$router.back(-1)
    },
  },
  props:[
    'title',
  ]
}
</script>
<style>
#navHeadLeft{
    width: 100%;
}
#navHeadLeft .navHeadBox{
    width: 100%;
    height: 1rem;
    padding-top: 0.4rem;
    display: flex;
    background: #2E3944;
    box-shadow:0 0.02rem 0.1rem 0 rgba(0,0,0,0.45);
}

#navHeadLeft .goBack{
    width: 50px;
    height: 100%;
}
#navHeadLeft .goBack img{
  width: 20px;
  display: block;
  margin-top: 15px;
  margin-left: 13px;
}
#navHeadLeft .nhl-text{
  height: 0.9rem;
  line-height: 0.9rem;
  font-size: 0.32rem;
  color: #fff;
  position: absolute;
  left: 50%;
  transform: translate(-50%)
}
</style>
