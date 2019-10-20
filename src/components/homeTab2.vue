<template>
  <div id="homeTab2">

    <div class="ht-01-up">
        <div class="ht-up-01">
            <div class="ht-text-01">{{countp}}</div>
            <div class="ht-text-02">本月有功功率 (kW)</div>
        </div>
        <div class="ht-up-02">
            <div class="htUp-01">
                <div class="htname-01">本月无功功率</div>
                <div class="htnum-01">{{countq}}</div>
                <div class="htkw-01">kVar</div>
            </div>
            <div class="htUp-02">
                <div class="htname-01">功率因素</div>
                <div class="htnum-01">{{countpf}}</div>
                <div class="htkw-01">kWh</div>
            </div>
        </div>
    </div>

    <div class="ht-01-down">
        <div class="scroll">
            <div class="boxer">
                <div class="down-title-box" v-for="(item,index) in substationList">
                    <div :class="item.id == rua ? 'mytitle2' : 'mytitle1'" @click="tableclick(item.id)">{{item.substationName}}</div>
                </div>
            </div>
        </div>


        <div class="boxList">
            <div id="leftIcon" @click="goLeft"></div>
            <div class="allList">
                <div id="lbox" ref="lbox">
                    <div class="listNum" v-for="(item, index) in transformerList" v-show="isshow">
                        <div class="listName">{{item.transformerName}}</div>
                        <div class="list-1">负载率：<span class="bl">轻载</span></div>
                        <div class="list-1">容量：<span class="bl">{{item.transformerRecord.rc}}</span>kVA</div>
                        <mt-progress :value="item.transformerRecord.pf" >
                            <div slot="start" id="jin">{{item.transformerRecord.pf}}%</div>
                        </mt-progress>
                    </div>
                    <!-- 无数据 -->
                    <div class="listNum" v-show="!isshow">
                        <div class="listName"></div>
                        <div class="list-1">负载率：<span class="bl">无</span></div>
                        <div class="list-1">容量：<span class="bl">--</span>kVA</div>
                        <mt-progress :value="0" >
                            <div slot="start" id="jin">暂无数据</div>
                        </mt-progress>
                    </div>
                </div>
            </div>
            <div id="rightIcon" @click="goRight"></div>
        </div>
    </div>
    
  </div>
</template>

<script>
import data from '../utils/mock.js'
const mydata = data.PowerLoad.allSubstation
import mock from '@/utils/mock.js'
import { Indicator } from 'mint-ui';
const PowerLoad = mock.PowerLoad
const electricitySummary = mock.electricitySummary

export default {
  name: 'homeTab2',
  components: {
  },
  data () {
    return {
        mydata:{},
        PowerLoad: PowerLoad,
        statistics: electricitySummary.statistics,
        allSubstation: mock.PowerLoad.allSubstation,
        gvhj:"1",
        adjo:'1',
        mytitle:"mytitle2",
        num:0,
        rua:"1",
        substationList:[],
        transformerList:[],
        isshow:true,
        countp: "--",
        countpf: "--",
        countq: "--",
    }
  },
  mounted(){
    this.mydata = mydata
    //所有变电所
    Indicator.open("加载中")
    this.$axios({
        method:"GET",
        url:"/api/app/index/getSubstation"
    }).then((res)=>{
        let arr = res.data
        this.substationList = arr
        this.tableclick(arr[0].id)
        console.log(res)
    }).catch(()=>{
        console.log("网络错误")
        Indicator.close()
    })

    // /api/app/index/newComRecord
    this.$axios({
        method:"GET",
        url:"/api/app/index/newComRecord",
    }).then((res)=>{
        console.log(res)
        //本月有功功率
        this.countp = res.data.countp ? Math.round(res.data.countp*100)/100 : "--"
        //功率因素
        this.countpf =res.data.countpf ? Math.round(res.data.countpf*100)/100 : "--"
        //本月无功功率
        this.countq = res.data.countq ? Math.round(res.data.countq*100)/100 : "--"
        Indicator.close()
    })
  },
  methods:{
      tableclick(id){
        Indicator.open("加载中")
        this.rua = id
        this.$refs.lbox.style.left = 0 + "rem"
        this.adjo = 1
        this.gvhj = 1
        this.$axios({
            method:"GET",
            url:"/api/app/index/transformerlist/?substationId="+id
        }).then((res)=>{
            this.transformerList = res.data
            if(this.transformerList.length == "0"){
                this.isshow = false
            }else{
                this.isshow=true
            }
            Indicator.close()
        }).catch(()=>{
            console.log("网络错误")
            Indicator.close()
        })

      },
      goLeft(){
          if(this.gvhj > 1){
            this.$refs.lbox.style.left = (5.8 * this.adjo) + "rem";
            this.adjo = parseInt(this.adjo) + 1; 
            this.gvhj = parseInt(this.gvhj) - 1;
          } 
      },
      goRight(){    
          if(this.gvhj >= 1 & this.gvhj < (this.$refs.lbox.childNodes.length - 2)){
            this.$refs.lbox.style.left = -(5.8 * this.gvhj) + "rem";
            this.gvhj = parseInt(this.gvhj) + 1;   
            this.adjo = parseInt(this.adjo) - 1;  
          }      
      }
  }
}
</script>
<style lang="scss">
#homeTab2{
  width: 100%;
  text-align:center;
  color: #fff;
}
#homeTab2 .ht-01-up{
    width: 7.1rem;
    height: 2.4rem;
    margin: 0.1rem auto 0.12rem auto;
    display: flex;
}
#homeTab2 .ht-up-01,#homeTab2 .ht-down-02,
#homeTab2 .htUp-01,#homeTab2 .htUp-02,#homeTab2 .ht-01-down{
    background:rgba(223,240,255,0.1);
    box-shadow:0rem 0.02rem 0.08rem 0rem rgba(0,0,0,0.1);
    border-radius: 0.04rem;
}
#homeTab2 .ht-up-01{
    width: 3rem;
    height: 100%;
    margin-right: 0.1rem;
}
#homeTab2 .ht-text-01,#homeTab2 .ht-text-02{
    width: 2.1rem;
    margin: 0 auto 0 auto;
    text-align: center;
}
#homeTab2 .ht-text-01{  
    font-size: 0.5rem;
    color: #62D6EF;
    margin-top: 0.65rem;
}
#homeTab2 .ht-text-02{
    font-size: 0.24rem;
    color: #fff;
    margin-top: 0.1rem;
}
#homeTab2 .ht-up-02{
    width: 4rem;
    height: 100%;
}
#homeTab2 .htUp-01,#homeTab2 .htUp-02{
    width: 100%;
    height: 1.16rem;
    margin-bottom: 0.05rem;
    display: flex;
    font-size: 0.24rem;
    line-height: 1.2rem;
    color: #fff;
}
#homeTab2 .htname-01{
    margin-left: 0.28rem;
    width: 1.5rem;
    text-align: left;
}
#homeTab2 .htnum-01{
    width: 1rem;
    text-align: right;
    margin-left: 0.5rem;
    font-size: 0.3rem;
    color: #62D6EF;
}
#homeTab2 .htkw-01{
    margin-left: 0.05rem;
}
/* 下部分 */
#homeTab2 .ht-01-down{
    width: 7.1rem;
    height: 3.75rem;
    margin: 0 auto 0 auto;
    display: flex;
}
#homeTab2 .down-title-box{
    width: 100%;
    height: 0.8rem;
    display: flex;
    border-bottom:0.02rem solid rgba(58,70,83,1);
}
#homeTab2 .mytitle1{
    width: 1.75rem;
    height: 0.8rem;
    text-align: center;
    font-size: 0.26rem;
    color:rgba(255,255,255,1);
    line-height: 0.8rem;
    border-right: 0.02rem solid rgba(58,70,83,1);
}
#homeTab2 .mytitle2{
    width: 1.75rem;
    height: 0.8rem;
    text-align: center;
    font-size: 0.26rem;
    color: #62D6EF;
    line-height: 0.8rem;
    border-right: 0.02rem solid rgba(58,70,83,1);
}
#homeTab2 .boxer{
    height:0.8rem;
    display:flex;
    border-bottom:0.02rem solid rgba(58,70,83,1);
}
#homeTab2 .scroll{
    width:100%;
    height:0.82rem;
    overflow-x:auto;
}
/* 变电所中变压器的切换 */
#homeTab2 .boxList{
    width: 7.1rem;
    height: 3rem;
    position: absolute;
    margin-top: 0.82rem;
    display: flex;
}
#homeTab2 #leftIcon{
    width:0.65rem;
    height: 3rem;
    background: url('../../static/img/HomeTab2-icon-left@2x.png') no-repeat;
    background-position-y: 1.3rem;
    background-position-x: 0.2rem;
    background-size: 0.15rem;
}

#homeTab2 #rightIcon{
    width:0.65rem;
    height: 3rem;
    background: url('../../static/img/HomeTab2-icon-right@2x.png') no-repeat;
    background-position-y: 1.3rem;
    background-position-x: 0.2rem;
    background-size: 0.15rem;
    position: absolute;
    right: 0;
}
#homeTab2 .allList{
    width: 5.75rem;;
    height: 3rem;
    overflow: hidden;
    position: relative;
}
#homeTab2 #lbox{
    width: 100rem;
    height: 3rem;
    position: absolute;
    left:0;
    transition:left 0.5s;
    -moz-transition:left 0.5s; /* Firefox 4 */
    -webkit-transition:left 0.5s; /* Safari and Chrome */
    -o-transition:left 0.5s; /* Opera */
}
#homeTab2 .listNum{
    width: 5.8rem;;
    height: 3rem;
    float: left;
}
#homeTab2 .listName{
    width: 100%;
    height: 0.48rem;
    font-size: 0.26rem;
    margin: 0.18rem 0.18rem 0 0;
    border-bottom:0.02rem solid rgba(58,70,83,1);
    text-align: left;
}
#homeTab2 .list-1{
    width: 100%;
    height: 0.48rem;
    font-size: 0.26rem;
    margin: 0.18rem 0 0 0;
    text-align: left;
    line-height: 0.48rem;
}
#homeTab2 .bl{
    color: #62FFDB;
    margin-right: 0.1rem;
}
#homeTab2 .mt-progress-runway{
    height: 0.28rem !important;
    width: 5.5rem !important;
    background:rgba(61,74,88,1);
    border-radius:0.08rem;
}
#homeTab2 .mt-progress-progress{
    // width:0% !important;
    height: 0.28rem !important;
    background:linear-gradient(90deg,rgba(83,202,227,1) 0%,rgba(255,85,133,1) 100%);
    border-radius:0.08rem 0 0 0.08rem;
}
#homeTab2 #jin{
    font-size: 0.18rem;
    color: #FF7FA3;
    position: absolute;
    left:50%;
    transform: translate(-50%);
    z-index: 999;
}
#homeTab2 .mint-navbar .mint-tab-item{
    padding: 0.17rem 0;
}
</style>
