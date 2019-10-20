<template>
  <div id="homeTab1">
      <div class="ht-01-box">
          <div class="ht-01-up">
                <div class="ht-up-01">
                    <div class="down-name-01">本月电量（kWh）</div>
                    <div class="sunNum">--</div>
                    <div id="echartsPic2"></div>
                    <div class="remark">
                        <div>
                            <p>尖</p>
                            <div class="box" style="background:#FF5585"></div>
                        </div>
                        <div>
                            <p>峰</p>
                            <div class="box" style="background:#FBFE86"></div>
                        </div>
                        <div>
                            <p>谷</p>
                            <div class="box" style="background:#50ABDB"></div>
                        </div>
                    </div>
                </div>
                <div class="ht-up-02">
                    <div class="htUp-01">
                        <div class="htname-01">本月电量</div>
                        <div class="htnum-01"><div class="ht">{{nowMouth}}</div><div class="htkw-01">kWh</div></div>
                        
                    </div>
                    <div class="htUp-02">
                        <div class="htname-01">上月电量</div>
                        <div class="htnum-01"><div class="ht">{{lastMouth}}</div><div class="htkw-01">kWh</div></div>
                        
                    </div>
                    <div class="htUp-03">
                        <div class="htname-01">今年电量</div>
                        <div class="htnum-01"><div class="ht">{{thisYear}}</div><div class="htkw-01">kWh</div></div>
                        
                    </div>
                </div>
          </div>
          <div class="ht-01-down">
            <div v-if="isshow">
                <p class="nodata" >暂无数据</p>
                <img class="noimg"  src="../../static/img/noDate@2x.png">
            </div>
            <div id="echartsBar1" v-else></div>
          </div>
      </div>
  </div>
</template>

<script>
import echarts from "echarts"
import { setTimeout } from 'timers';
export default {
  name: 'homeTab1',
  components: {

  },
  props:["nowMouth","lastMouth","thisYear","selected"],
  data () {
    return {
        isshow:false
    }
  },
  mounted(){
    console.log(this.nowMouth)
    console.log(this.lastMouth)
    console.log(this.thisYear)
    if(!this.nowMouth){
        this.nowMouth = "--"
    }
    if(!this.lastMouth){
        this.lastMouth = "--"
    }
    if(!this.thisYear){
        this.thisYear = "--"
    }
    console.log(this.selected)
    // /api/app/index/selectLineevery?endTime=2019&substationId=22
    let thisyear = new Date().getFullYear()
    let lastyear = new Date().getFullYear()-1
    this.$axios({
      method:"GET",
      url:"/api/app/index/getSubstation"
    }).then((res)=>{
        let myid = res.data[0].id
        this.$axios({
            method:"GET",
            ///api/app/index/selectLineMonth?endTime=2019-02&substationId=22
            url:"/api/app/index/selectLineevery?endTime=" + thisyear + "&substationId=" + myid
        }).then((res)=>{
            console.log(res)
            let data = res.data
            let numarr1 = []
            let isShow1 = false
            let isShow2 = false
            data.forEach((item)=>{
                if(item == null){
                    item = 0
                }else{
                    isShow1 = true
                }
                numarr1.push(item)
            })
            this.$axios({
                method:"GET",
                ///api/app/index/selectLineMonth?endTime=2019-02&substationId=22
                url:"/api/app/index/selectLineevery?endTime=" + lastyear + "&substationId=" + myid
            }).then((res)=>{
                console.log(res)
                let data = res.data
                let numarr2 = []
                data.forEach((item)=>{
                    if(item == null){
                        item = 0
                    }else{
                        isShow2 = true
                    }
                    numarr2.push(item)
                })
                if(!isShow1&&!isShow2){
                    this.isshow = true
                }else{
                    console.log(numarr1)
                    console.log(numarr2)
                    setTimeout(()=>{
                        let eCharts1 = echarts.init(document.getElementById('echartsBar1'));
                        eCharts1.setOption(this.myBar(numarr1,numarr2))
                    },0)
                }

            })
        })


    })



    setTimeout(()=>{
        let eCharts2 = echarts.init(document.getElementById('echartsPic2'));
        eCharts2.setOption(this.myPie("","65420"))
    },0)

  },
  methods:{
    myPie(allnum,num,color,hundred){
    var  option = {
      tooltip: {
          trigger: 'item',
          formatter: name + "{a} <br/>{b}: {c} ({d}%)",
          position:'inside',
      },
      series: [
          {
              name: '本月电量',
              type:'pie',
              radius: ['40%', '56%'],
              avoidLabelOverlap: false,
              hoverAnimation:true,
              hoverOffset:5,
              label: {
                  normal: {
                      show: false,
                      position: 'center',
                      textStyle: {
                          fontSize: '15',
                          fontWeight: '500',
                          color:"#62D6EF"
                      }
                  }
              },
              data:[
                  {value:50, name:'谷 '},
                  {value:30, name:'峰 '},
                  {value:30, name:'尖 '}
              ],
              color:["#50ABDB","#FBFE86","#FF5585"]
          }
      ]
    }
    return option
  },
        myBar(data1,data2){
            var option = {
                    backgroundColor: '#4C5A68',
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'shadow'
                        },
                    },
                    legend: {
                        data: ['今年', '去年'],
                        orient: 'horizontal',
                        x: 'center',
                        y: 'top',  
                        align: 'right',
                        right: 10,
                        textStyle: {
                            color: "#fff"
                        },
                        itemWidth: 10,
                        itemHeight: 10,
                        itemGap: 35
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '2%',
                        height: '115',
                        containLabel: true
                    },
                    xAxis: [{
                        type: 'category',
                        data: ['1',
                            '2',
                            '3',
                            '4',
                            '5',
                            '6',
                            '7',
                            '8',
                            '9',
                            '10 ',
                            '11 ',
                            '12 '
                        ],
                        axisLine: {
                            show: true,
                            lineStyle: {
                                color: "#4C5A68",
                                width: 1,
                                type: "solid"
                            }
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLabel: {
                            show: true,
                            textStyle: {
                                color: "#fff",
                            }
                        },
                    }],
                    yAxis: [{
                        type: 'value',
                        axisLabel: {
                            formatter: ''
                        },
                        axisTick: {
                            show: false,
                        },
                        axisLine: {
                            show: false,
                            lineStyle: {
                                color: "#4C5A68",
                                width: 1,
                                type: "solid"
                            },
                        },
                        splitLine: {
                            lineStyle: {
                                color: "#4C5A68",
                            }
                        }
                    }],
                    series: [{
                        name: '今年',
                        type: 'bar',
                        data: data1,
                        barWidth: 8, //柱子宽度
                        barGap: 0, //柱子之间间距
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#FFBC4C'
                                }]),
                                opacity: 1,
                            }
                        }
                    },{
                        name: '去年',
                        type: 'bar',
                        data: data2,
                        barWidth: 8,
                        barGap: 0,
                        itemStyle: {
                            normal: {
                                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                                    offset: 0,
                                    color: '#6EC3FF'
                                }]),
                                opacity: 1,
                            }
                        }
                    }]
                };
            return option
        }
  }
}
</script>
<style>
#homeTab1{
    width: 100%;
    text-align:center;
}
#homeTab1 .ht-01-box{
    width: 100%;
    /* height: 7.5rem; */
}
#homeTab1 .ht-01-up{
    width: 7.1rem;
    height: 3rem;
    margin: 0.1rem auto 0.12rem auto;
    display: flex;
}
#homeTab1 .ht-up-01,#homeTab1 .ht-down-01,#homeTab1 .ht-down-02,
#homeTab1 .htUp-01,#homeTab1 .htUp-02,#homeTab1 .htUp-03{
    background:rgba(223,240,255,0.1);
    box-shadow:0rem 0.02rem 0.08rem 0rem rgba(0,0,0,0.1);
    border-radius: 0.04rem;
}
#homeTab1 .ht-up-01{
    width: 3rem;
    height: 3rem;
    margin-right: 0.1rem;
    position: relative;
}
#homeTab1 .ht-text-01,#homeTab1 .ht-text-02{
    width: 1.55rem;
    margin: 0 auto 0 auto;
    text-align: center;
}
#homeTab1 .ht-text-01{  
    font-size: 0.5rem;
    color: #62D6EF;
    margin-top: 0.65rem;
}
#homeTab1 .ht-text-02{
    font-size: 0.24rem;
    color: #fff;
    margin-top: 0.1rem;
}
#homeTab1 .ht-up-02{
    width: 4rem;
    height: 3rem;
}
#homeTab1 .htUp-01,#homeTab1 .htUp-02,#homeTab1 .htUp-03{
    width: 100%;
    height: 0.96rem;
    margin-bottom: 0.06rem;
    display: flex;
    font-size: 0.24rem;
    line-height: 0.96rem;
    color: #fff;
    position: relative;
}
#homeTab1 .ht{
    width: 2rem;
    overflow: scroll;
}
#homeTab1 .htname-01{
    margin-left: 0.28rem;
}
#homeTab1 .htnum-01{
    width: 2.4rem;
    text-align: right;
    /* margin-left: 0.9rem; */
    font-size: 0.3rem;
    color: #62D6EF;
    text-align: right;
    /* margin-left: 0.9rem; */
    position: absolute;
    right: 0.2rem;
    display: flex;
}
#homeTab1 .htkw-01{
    margin-left: 0.1rem;
    color: #fff;
}
#homeTab1 .down-name-01{
    width: 3rem;
    height: 0.5rem;
    line-height: 0.5rem;
    font-size: 0.22rem;
    color :#fff;
}
#homeTab1 .sunNum{
    font-size: 0.3rem;
    color: #62D6EF;
    position: absolute;
    top: 1.2rem;
    left: 50%;
    transform: translate(-50%);
}
/* 下部分 */
#homeTab1 .ht-01-down{
    width: 7.1rem;
    height: 3.13rem;
    margin: 0.14rem auto 0 auto;
    display: flex;
    background:rgba(223,240,255,0.1);
    box-shadow:0rem 0.02rem 0.08rem 0rem rgba(0,0,0,0.1);
    border-radius:0.04rem;
}
#echartsPic1,#echartsPic2{
    height:100%;
    width:100%;
    margin-top: -0.55rem;

}
#homeTab1 .remark{
    width:3rem;
    height:auto;
    display:flex;
    justify-content: center;
    align-items: center;
    font-size: 0.22rem;
    position:absolute;
    bottom:0.09rem;
    left:0;
    color:rgba(255,255,255,1);
}
#homeTab1 .remark>div{
    width:30%;
}
#homeTab1 .remark>div p{
    margin-bottom:0.08rem;
}
#homeTab1 .box{
    width:0.26rem;
    height:0.1rem;
    margin:0 auto;
}
/* 柱状图 */
#echartsBar1{
    width: 7.1rem;
    height: 3rem;
    padding-top:0.1rem;
}
#homeTab1 .noimg{
  width:5rem;
  margin:-0.47rem 0 0 1rem;
}
#homeTab1 .nodata{
  text-align:center;
  line-height:1.8rem;
  font-size: 0.3rem;
  position:absolute;
  left:50%;
  margin-left:-0.55rem;
  color:#fff;
}
</style>
