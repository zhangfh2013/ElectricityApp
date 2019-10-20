<template>
  <div class="home">
    <div class="webBox" @click="map">web</div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      msg: ''
    }
  },
  methods:{
    map(){
      this.$router.push({path:'/zs-map'});
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .home{
    width: 450px;
    height: 50px;
    margin: 100px auto 0 auto;
    display: flex;
  }
  .webBox{
    width: 200px;
    height: 50px;
    line-height: 50px;
    text-align: center;
    background-color: orange;
    color: white;
    cursor: pointer;
  }
</style>
