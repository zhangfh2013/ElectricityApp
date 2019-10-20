<template>
  <div id="navFoot">
    <div class="tail-navigation">
      <div v-for='(item,index) of items' :class='[item.cls,{on:index === idx}]' @click="$router.push(item.push)" >
        <img :src="index===idx?item.iconSelect:item.icon" />
				<div class="navFootFont">{{item.name}}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'home',
  props:['idx'],
	data(){
		return {
			items:[{
				cls:"home",
				name:"首页",
				push:"/home/home",
				icon:"./static/img/navFoot_01@2x.png",
				iconSelect:"./static/img/navFoot_001@2x.png"
			},
			{
				cls:"shares",
				name:"能耗分析",
				push:"/energy/energy",
				icon:"./static/img/navFoot_02@2x.png",
				iconSelect:"./static/img/navFoot_002@2x.png"
			},
			{
				cla:"community",
				name:"在线监测",
				push:"/monitor/monitor",
				icon:"./static/img/navFoot_03@2x.png",
				iconSelect:"./static/img/navFoot_003@2x.png"
			},
			{
				cla:"mine",
				name:"运维",
				push:"/operation/operation",
				icon:"./static/img/navFoot_04@2x.png",
				iconSelect:"./static/img/navFoot_004@2x.png"
			}]
		}
	},
	mounted(){

	}
}
</script>
<style>
#navFoot .tail-navigation{
  width: 100%;
  height: 1rem;
  position: fixed;
  bottom: 0;
  font-size: 0.2rem;
  background:linear-gradient(180deg,rgba(255,255,255,0.1) 0%,rgba(255,255,255,0) 100%);
  display: flex;
	/* z-index:600; */
}
#navFoot>div>div{
  width:25%;
  height: 0.96rem;
  display: flex;
  display: table-cell;
  vertical-align: middle;
	color:#fff;
}
#navFoot div img{
  display: block;
  margin: 0.15rem auto 0 auto;
  width: 0.4rem;
	height:0.34rem;
}
#navFoot .navFootFont{
	text-align: center;
	font-size: 0.2rem;
	height: 0.2rem;
	margin-top: 0.1rem;
}
#navFoot div .on{
	color:#53CAE3 ;
}
</style>
