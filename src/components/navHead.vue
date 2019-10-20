<template>
  <div fixed id="navHead" >
    <div class="navHeadBox">
        <div class="goBack" @click="navPerson"><img src="../../static/img/person@2x.png" alt="" /></div>
        <div class="nhl-text">{{title}}</div>
        <div class="Save" @click="navSave"><img src="../../static/img/alarm@2x.png" alt="" /></div>
    </div>
  </div>
</template>

<script>
import hgf from '../utils/demo.js'
const toast = hgf.toast

export default {
  name: 'navHead',
  components: {
  },
  data () {
    return {
      
    }
  },
  methods:{
    navPerson(){
        this.$router.push('/person/person');
    },
    navSave(){  
        this.$router.push('/alarm/alarm');    
    }
  },
  props:[
    'title',
  ]
}
</script>
<style>
#navHead{
    width: 100%;
}
#navHead .navHeadBox{
    width: 100%;
    height: 0.9rem;
    padding-top: 0.4rem;
    display: flex;
    background: rgba(0,0,0,0);
    color: #fff;

}
#navHead .goBack,#navHead .Save{
    width: 50px;
    height: 0.9rem;
}
#navHead .goBack img{
  width: 0.4rem;
  display: block;
  margin-top: 0.25rem;
  margin-left: 0.25rem;
}
#navHead .Save img{
  width: 0.4rem;
  display: block;
  margin-top: 0.25rem;
  margin-left: 0.25rem;
}
#navHead .Cancel,#navHead .Save{
    width: 50px;
    line-height: 55px;
    font-size: 16px;
    position: absolute;
}
#navHead .Cancel{   
    left: 0;
}
#navHead .Save{
    right: 0;
}
#navHead .nhl-text{
  width: 1.5rem;
  height: 0.9rem;
  line-height: 0.9rem;
  font-size: 0.32rem;
  position: absolute;
  left: 50%;
  margin-left: -0.75rem;
  text-align: center;
}
</style>
