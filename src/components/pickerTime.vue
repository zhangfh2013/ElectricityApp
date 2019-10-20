<template>
    <div id="pickerTime">
        <div v-show="showtime">
            <div class="shadow" @click="hide"></div>
            <div class="datatime" >
                <div class="sure">
                <div @click="unsure">取消</div>
                <div @click="sure">确认</div>
                </div>
                <mt-picker class="onepick" @change="onValuesChange1" :slots="slots" :visible-item-count="3"></mt-picker>
                <mt-picker class="twopick" @change="onValuesChange2" :slots="slots" :visible-item-count="3"></mt-picker>
            </div>
        </div>
    </div>
</template>
<script>
import demo from "@/utils/demo.js"
const slotsday = demo.slotsday
const slotsmouth = demo.slotsmouth
import method from '../utils/demo.js'
const toast = method.toast
export default {
    name:'pickerTime',
    props:["status","mouthorday"],
    data(){
        return{
            slotsday:slotsday,
            showtime:false,
            changeDate:{
                startTime:["2009年","01月","01日"],
                finishTime:["2009年","01月","01日"]
            },
            slots:[]
        }
    },
    mounted(){
        if(this.mouthorday == "mouth"){
            this.slots = slotsmouth
        }else{
            this.slots = slotsday
        }
    },
    watch:{
        status(){
            this.showtime = !this.showtime
        }
    },
    methods:{
        hide(){
            this.showtime = false
        },
        unsure(){
            this.showtime = false
        },
        sure(){
            if(this.mouthorday == "mouth"){
                //判断时间段选择是否正确
                let myyear1 = this.changeDate.startTime[0].slice(0,4)
                let myyear2 = this.changeDate.finishTime[0].slice(0,4)
                let mymouth1 = this.changeDate.startTime[1].slice(0,this.changeDate.startTime[1].length-1)
                let mymouth2 = this.changeDate.finishTime[1].slice(0,this.changeDate.finishTime[1].length-1)
                if(myyear1>myyear2){
                    toast("请选择正确的时间段")
                    return
                }
                if(myyear1 == myyear2 && mymouth1>mymouth2){
                    toast("请选择正确的时间段")
                    return
                }
            }else{
                //判断时间段选择是否正确
                let myyear1 = this.changeDate.startTime[0].slice(0,4)
                let myyear2 = this.changeDate.finishTime[0].slice(0,4)
                let mymouth1 = this.changeDate.startTime[1].slice(0,this.changeDate.startTime[1].length-1)
                let mymouth2 = this.changeDate.finishTime[1].slice(0,this.changeDate.finishTime[1].length-1)
                let myday1 = this.changeDate.startTime[2].slice(0,this.changeDate.startTime[2].length-1)
                let myday2 = this.changeDate.finishTime[2].slice(0,this.changeDate.finishTime[2].length-1)
                if(myyear1>myyear2){
                    toast("请选择正确的时间段")
                    return
                }
                if(myyear1 == myyear2 && mymouth1>mymouth2){
                    toast("请选择正确的时间段")
                    return
                }
                if(myyear1 == myyear2 && mymouth1 == mymouth2 && parseInt(myday1)>parseInt(myday2)){
                    toast("请选择正确的时间段")
                    return
                }
            }

            this.showtime = false
            this.$emit('childArr', this.changeDate)
        },
        onValuesChange1(picker,values){
            if(values.length){
                this.changeDate.startTime = values
            }
        },  
        onValuesChange2(picker,values){
             if(values.length){
                this.changeDate.finishTime = values
            }
        },
    }
}
</script>
<style>
#pickerTime .onepick{
    position: absolute;
    top: 0.7rem;
    width: 100%;
    background: #fff;
}
#pickerTime .twopick{
    position: absolute;
    top: 2.7rem;
    width: 100%;
    background: #fff;
}
#pickerTime .picker-item{
  text-align:center;
  opacity: 0.3;
  transform: rotateX(50deg)
}
#pickerTime .picker-item.picker-selected{
  opacity: 1;
  transform: rotateX(0deg)
}
#pickerTime .datatime{
  height:4.7rem;
  position: fixed;;
  bottom:0;
  width:100%;
  left:0;
  z-index:667;
}
#pickerTime .sure{
  height:0.7rem;
  width:100%;
  padding:0 0.32rem;
  display:flex;
  justify-content: space-between;
  align-items: center;
  font-size:0.26rem;
  background:#fff;
  box-sizing: border-box;
  color:rgba(76,84,93,1);
  text-align:left;
  line-height:0.5rem;
}
#pickerTime .sure>div{
  height:100%;
  width:30%;
  line-height:0.7rem;
}
#pickerTime .sure>div:nth-of-type(2){
  color:rgba(0,175,213,1);
  text-align:right;
}
#pickerTime .shadow{
  height:100vh;
  width:100%;
  background:rgba(0,0,0,0.2);
  position:fixed;
  top:0;
  left:0;
  z-index:666;
}
</style>