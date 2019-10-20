import { Toast } from 'mint-ui'
const method={
    toast(message){
        if(window.rua){
            window.rua.close();
        }
        window.rua = Toast({
            message:message,
            duration:3000
        })
    },
    nowTime(){
        let year = new Date().getFullYear();
        let month =new Date().getMonth() + 1 < 10? "0" + (new Date().getMonth() + 1): new Date().getMonth() + 1;
        let date =new Date().getDate() < 10? "0" + new Date().getDate(): new Date().getDate();
        return(year + "-" + month + "-" + date)
    },
    changeTime(value){
        let data = value
        let str = data.toString()
        let arr = str.substring(4,15).split(" ")
        let mouthArr=[
            {
            name:"Jan",
            num:"01"
            },
            {
            name:"Feb",
            num:"02"
            },
            {
            name:"Mar",
            num:"03"
            },
            {
            name:"Apr",
            num:"04"
            },
            {
            name:"May",
            num:"05"
            },
            {
            name:"Jun",
            num:"06"
            },
            {
            name:"Jal",
            num:"07"
            },
            {
            name:"Aug",
            num:"08"
            },
            {
            name:"Sep",
            num:"09"
            },
            {
            name:"Oct",
            num:"10"
            },{
            name:"Nov",
            num:"11"
            },
            {
            name:"Dec",
            num:"12"
            }]
        let mynum = ""
        mouthArr.forEach((item)=>{
            if(item.name === arr[0]){
            mynum = item.num
            }
        })
        return(arr[2]+"-"+mynum+"-"+arr[1]) 
    },
    slotsday:
    [
        {
            flex: 1,
            values: ['2009年', '2010年', '2011年', '2012年', '2013年','2014年','2015年','2016年','2017年','2018年','2019年','2020年','2021年','2022年','2023年','2024年','2025年','2026年','2027年','2028年','2029年'],
            className: 'year',
            textAlign: 'left'
        }, {
            flex: 1,
            values: ['1月', '2月', '3月', '4月', '5月','6月','7月','8月','9月','10月','11月','12月'],
            className: 'mouth',
            textAlign: 'mid'
        }, {
            flex: 1,
            values: ["1日", "2日", "3日", "4日", "5日", "6日", "7日", "8日", "9日", "10日", "11日", "12日", "13日", "14日", "15日", "16日", "17日", "18日", "19日", "20日", "21日", "22日", "23日", "24日", "25日", "26日", "27日", "28日", "29日", "30日"],
            className: 'day',
            textAlign: 'right'
        }
    ],
    slotsmouth:
    [
        {
            flex: 1,
            values: ['2009年', '2010年', '2011年', '2012年', '2013年','2014年','2015年','2016年','2017年','2018年','2019年','2020年','2021年','2022年','2023年','2024年','2025年','2026年','2027年','2028年','2029年'],
            className: 'year',
            textAlign: 'left'
        }, {
            flex: 1,
            values: ['1月', '2月', '3月', '4月', '5月','6月','7月','8月','9月','10月','11月','12月'],
            className: 'mouth',
            textAlign: 'mid'
        }
    ]
}
export default method