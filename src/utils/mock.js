const mock = {
    //1.登录 
    login:[
        {
            userName:"admin",
            passWord:"admin",
            userId:"110"
        }
    ],
     
      
    //2.首页 个人中心 
    // 通过userid
    // 查询 username 和company
    main:{
        username:"钱一",
        company:"杭州卓见云科技有限公司"
    },
    
    //3.信息修改
    // 通过userid
    // 查询 username ,company,phoneNum,pic
    //修改上传字段
    changeInfo:{
        username:"钱一",
        company:"杭州卓见云科技有限公司",
        phoneNum:"1242255441",
        pic:"http://img.juimg.com/tuku/yulantu/140218/330598-14021R23A410.jpg"
    },
    //4.通过userid修改密码
    changePassword:{
        userId:"110",
        password:"2131651616",
        newpassword:"651644646"
    } ,
  
    //5.首页 电量概述
    electricitySummary:{
        //5.1设备数量
        equipment:{
            //变电所数量
            roomNum:"12",
            //变压器数量
            transformerNum:"16",
            //设备数量
            equipmentNum:"2"
        },
        //5.2本月电量 尖 峰 谷值
        monthElectricity:{
            highNum:"100",
            midNum:"200",
            lowNum:"300"
        },
        //5.3电量统计
        statistics:{
            //本月电量
            mouthElectricity:"66716",
            //上月电量
            lastMouthElectricity:"248552",
            //今年电量
            yearElectricity:"65420"
        },
        //5.4今年电量和去年电量对比  ：每个月的对比！！！
        contrast:{
            lastYear:["20","30","50","20","30","50","20","30","50","20","30","50"],
            thisYear:["30","50","20","30","30","50","20","30","30","50","20","30",]
        }
    },
    //6。首页 用电负荷
    PowerLoad:{
        //6.1本月最大负荷
        maxNum:"1012.00",
        //实时负荷
        nowNum:"679.00",
        //功率因素
        Power:"0.98",
        //6.2变电所
        allSubstation:[
            {
                //变电所id
                bid:"1",
                data:[
                    {
                        //变压器id不知道要不要
                        //总容量
                        capacity:"1250",
                        //当前负载数量
                        nowCapacity:"600"
                    }
                ]
                
            },
            {
                bid:"2",
                data:[
                    {
                        capacity:"1250",
                        nowCapacity:"300"
                    }
                ]
            },
            {
                bid:"3",
                data:[
                    {
                        capacity:"1250",
                        nowCapacity:"500"
                    }
                ]
            },
            {
                bid:"4",
                data:[
                    {
                        capacity:"1250",
                        nowCapacity:"150"
                    }
                ]
            },
            {
                bid:"5",
                data:[
                    {
                        capacity:"1250",
                        nowCapacity:"800"
                    }
                ]
            },
            {
                bid:"6",
                data:[
                    {
                        capacity:"1250",
                        nowCapacity:"400"
                    }
                ]
            },
            {
                bid:"7",
                data:[
                    {
                        capacity:"1250",
                        nowCapacity:"300"
                    }
                ]
            },
            {
                bid:"8",
                data:[
                    {
                        capacity:"1250",
                        nowCapacity:"120"
                    }
                ]
            },
            {
                bid:"9",
                data:[
                    {
                        capacity:"1250",
                        nowCapacity:"900"
                    }
                ]
            },
            {
                bid:"10",
                data:[
                    {
                        capacity:"1250",
                        nowCapacity:"150"
                    }
                ]
            },
            {
                bid:"11",
                data:[
                    {
                        capacity:"1250",
                        nowCapacity:"300"
                    }
                ]
            },
            {
                bid:"12",
                data:[
                    {
                        capacity:"1250",
                        nowCapacity:"500"
                    }
                ]
            },
        ]
    },
    //7.能耗分析 总电量

    // 能耗分析 导航栏树形结构
    energyTree:{
        label:'能耗分析',//一级菜单
        nodes:[
          {
            label: '1#变电所',//二级菜单
            nodes:[
              {
                label: '1#变压器',//三级菜单
                nodes:[
                  {
                    label: '1#变压器总开',//四级菜单
                  }
                ]
              }
            ]
          },{
            label: '2#变电所',
            nodes:[
              {
                label: 'A回路',
                nodes:[
                  {
                    label: 'A1回路',
                  }
                ]
              }
            ]
          },
        ]
      },
    //根据时间段 查询接口
    // datajson:{
    //     timeSlot:"2019-1-1 2011-1-1",
    //     userId:"110"
    // },
    //8.能传时间段  具体上传 需沟通
    energyAnalysis:{
        //8.1 以下4个值
        //尖
        tip:"46468",
        //峰
        top:"22440",
        //平
        flat:"1",
        //谷
        valley:"4724",
        //8.2查询每个月的电量情况
        monthElectricity:[
            {
                //月份
                time:"2017-1",
                //尖电量
                tip:100,
                //峰电量
                top:20,
                //平电量
                flat:20,
                //谷电量
                valley:5
            },
            {
                time:"2017-1",
                tip:100,
                top:20,
                flat:20,
                valley:5
            },
            {
                time:"2017-1",
                tip:100,
                top:20,
                flat:20,
                valley:5
            },
            {
                time:"2017-1",
                tip:100,
                top:20,
                flat:20,
                valley:5
            },
            {
                time:"2017-1",
                tip:100,
                top:20,
                flat:20,
                valley:5
            },
            {
                time:"2017-1",
                tip:100,
                top:20,
                flat:20,
                valley:5
            },
            {
                time:"2017-1",
                tip:100,
                top:20,
                flat:20,
                valley:5
            },
            {
                time:"2017-1",
                tip:100,
                top:20,
                flat:20,
                valley:5
            },
            {
                time:"2017-1",
                tip:100,
                top:20,
                flat:20,
                valley:5
            },
            {
                time:"2017-1",
                tip:100,
                top:20,
                flat:20,
                valley:5
            },
            {
                time:"2017-1",
                tip:100,
                top:20,
                flat:20,
                valley:5
            }
        ],
    },
    

    //9.能效分析 负荷  
    allLoad:{
        //9.1最大负荷
        maxload:{
            //月负荷
            mouthLoad:"524.7",
            //年负荷
            yearLoad:"612.5",
            //历史负荷
            historyLoad:"987.6"
        },
        //9.2传时间段
        //echart图表的三组数据（实时数据只有一条！！！！！！）
        // datajson:{
        //     year:"2009",
        //     mouth:"12",
        //     day:"10"
        // },
        echartsData:{
            max:[100,200,300,400,500,600],
            mid:[500,200,600,300,100,100],
            min:[500,600,700,200,500,100]
        },
        //9.3实时数据，日数据，月数据
        changeLoad:{
            //最大负荷
            maxLoad:"186.75",
            //最大负荷时间
            maxLoadTime:"2017-08-06",
            //最小负荷
            minLoad:"109.8",
            //最小负荷时间
            minLoadTime:"2017-08-09",
            //平均负荷
            averageLoad:"140.78",
            //谷峰差
            averageLoadRate:"76.95",
            //谷峰差率
            rate:"41.2",
            //负荷率
            loadRate:"75.39"
        }
    },
    //10.能效分析  功率因素
    // datajson:{
    //     dataTime:"2009-01-01",
    //     userId:"110"
    // },
    powerFactor:{
        //年度计量总表
        yearTable:{
            //实际值
            actual:[0.2,0.7,0.4,0.62,0.35,0.45,0.23],
            //合格值
            qualified:[0.15, 0.35, 0.2, 0.85, 0.45, 0.32, 0.18]
        },
        //列表数据
        tableData:[
            {
                //时间
                time:"2017-1",
                //有功功率
                activePower:"100",
                //无功功率
                reactivePower:"20",
                //功率因素
                powerFactor:"20"
            },
            {
                time:"2017-1",
                activePower:"100",
                reactivePower:"20",
                powerFactor:"20"
            },
            {
                time:"2017-1",
                activePower:"100",
                reactivePower:"20",
                powerFactor:"20"
            },
            {
                time:"2017-1",
                activePower:"100",
                reactivePower:"20",
                powerFactor:"20"
            },
            {
                time:"2017-1",
                activePower:"100",
                reactivePower:"20",
                powerFactor:"20"
            },
            {
                time:"2017-1",
                activePower:"100",
                reactivePower:"20",
                powerFactor:"20"
            },
            {
                time:"2017-1",
                activePower:"100",
                reactivePower:"20",
                powerFactor:"20"
            },
            {
                time:"2017-1",
                activePower:"100",
                reactivePower:"20",
                powerFactor:"20"
            },
            {
                time:"2017-1",
                activePower:"100",
                reactivePower:"20",
                powerFactor:"20"
            },
        ]
    },
    
    //11.在线检测 负荷
    loadOnLine:{
        //A相负荷
        loadA:"132.00",
        //B相负荷
        loadB:"120.00",
        //C相负荷
        loadC:"116.00",
        //echarts 数据
        echartsLoad:{
            //昨日负荷
            lasttoday:[80, 132, 121, 74, 110, 80, 100, 125, 135, 110, 155, 122],
            //今日负荷
            today:[120, 100, 115, 130, 94, 128, 90, 150, 120, 110, 165, 122]
        },
        minLoad:{
            load:"186.75",
            time:"01-12 11:00"
        },
        maxLoad:{
            load:"364.00",
            time:"01-13 10:15"
        }
        //根据时间段选择数据
    },
    //12. 在线监测 顶部下拉
    //这个需商议！！！！
    monitorTree:{
        //一级菜单 名称
        label:'在线监测',
        //一级菜单 数据
        nodes:[
          {
            //二级菜单 名称
            label: '1#变电所',
            //二级菜单 数据
            nodes:[
              {
                //三级菜单 名称
                label: 'A回路',
                //三级菜单 数据
                nodes:[
                  {
                    //四级菜单 名称  四级菜单为最后一层菜单
                    label: 'A1回路',
                  },{
                    //四级菜单 名称
                    label: 'A2回路',
                  }
                ]
              }
            ]
          },{
            label: '2#变电所',
            nodes:[
              {
                label: 'B回路',
                nodes:[
                  {
                    label: 'B1回路',
                  }
                ]
              }
            ]
          },
        ]
      },
    //13.在线监测 电流
    electricityInLine:{
        //A相电流（当天总和）
        electricityA:"524.00",
        //B相电流
        electricityB:"488.00",
        //C相电流
        electricityC:"468.00",
        //echarts 数据
        echartsElectricity:{
            //a电流走势
            dataA:[220, 182, 191, 104, 160, 80, 140, 210],
            //b电流走势
            dataB:[120, 110, 80, 125, 90, 135, 122, 180],
            //c电流走势
            dataC:[230, 182, 125, 145, 100, 191, 134, 150],
        },
    },

    //14.在线监测 电能质量
    qualityOnLine:{
        //具体什么值 不清楚
        u1Data:[100,600,200,300,500,200],
        u2Data:[100,600,200,300,500,200],
        u3Data:[100,600,200,300,500,200],
        i1Data:[100,600,200,300,500,200],
        i2Data:[100,600,200,300,500,200],
        i3Data:[100,600,200,300,500,200],
        //1小时以内的 每隔10分钟一个数据
        timeOne:['17:00','17:10', '17:20', '17:30', '17:40', '17:50', '18:00'],
        //6小时以内的 每隔1小时一个数据
        timeSix:['9:00', '10:00', '11:00', '12:00', '13:00', '14:00'],
        //1天以内的 每隔4小时一个数据
        timeDay:['0:00', '4:00', '8:00', '12:00', '16:00', '20:00', '24:00']
    },
    
    //15.在线监测 负载率
    loadFactor:{
        //A相绕组温度
        windingTempA:"46.00",
        //B相绕组温度
        windingTempB:"54.00",
        //C相绕组温度
        windingTempC:"72.00",
        //echars数据
        echarsLoadFactor:{
            //昨日数据
            yesterdayData: [80, 132, 121, 74, 110, 80, 100, 125, 135, 110, 155, 122],
            // 今日数据
            todayData: [120, 100, 115, 130, 94, 128, 90, 150, 120, 110, 165, 122]
        },
        maxTempToday:{
            temp:"68.00",
            time:"01-12 11：00"
        },
        maxTempYesterday:{
            temp:"72.30",
            time:"01-13 11：00"
        }
    },

    //16.运维设备档案信息
    facilityInfo:[
        {
            //设备编号
            number:"6019",
            name:"4503成品库电梯",
            //0 没有告警  1有告警
            state:0,
            //0 离线 1在线
            lineState:0,
            //设备id
            id:"110"
        },
        {
            number:"6012",
            name:"4503成品库电梯",
            state:1,
            lineState:0,
            id:"111"
        },
        {
            number:"6012",
            name:"4503成品库电梯",
            state:0,
            lineState:1,
            id:"111"
        },
        {
            number:"6012",
            name:"4503成品库电梯",
            state:1,
            lineState:0,
            id:"111"
        },
        {
            number:"6012",
            name:"4503成品库电梯",
            state:0,
            lineState:1,
            id:"111"
        },
        {
            number:"6012",
            name:"4503成品库电梯",
            state:0,
            lineState:0,
            id:"111"
        },
        {
            number:"6012",
            name:"4503成品库电梯",
            state:0,
            lineState:0,
            id:"111"
        },
        {
            number:"6012",
            name:"4503成品库电梯",
            state:0,
            lineState:0,
            id:"111"
        },
        {
            number:"6012",
            name:"4503成品库电梯",
            state:0,
            lineState:0,
            id:"111"
        },
        {
            number:"6012",
            name:"4503成品库电梯",
            state:0,
            lineState:0,
            id:"111"
        },
        {
            number:"6012",
            name:"4503成品库电梯",
            state:0,
            lineState:0,
            id:"111"
        },
        {
            number:"6012",
            name:"4503成品库电梯",
            state:0,
            lineState:0,
            id:"111"
        },
        {
            number:"6012",
            name:"4503成品库电梯",
            state:0,
            lineState:0,
            id:"111"
        },
        {
            number:"6012",
            name:"4503成品库电梯",
            state:0,
            lineState:0,
            id:"111"
        },
        {
            number:"6012",
            name:"4503成品库电梯",
            state:0,
            lineState:0,
            id:"111"
        }
    ],

    //17.运维 待办工单（可能包含其他数据！！！ 图片什么的）
    orderTodo:[
        {
            //设备id
            id:"110",
            //工单标号
            orderNumber:"1001121351",
            //工单状态   0 严重 1一般
            orderState:"0",
            //变电所名称
            substationName:"中恒大厦轻装",
            //设备名称
            deviceName:"1#变压器低压总开",
            //故障描述
            errorInfo:"严重电流三相不平衡，电流三相不平衡=34.78%…",
            //任务状态
            workState:"0"
        },
        {
            id:"111",
            orderNumber:"1001121351",
            orderState:"1",
            substationName:"中恒大厦轻装",
            deviceName:"1#变压器低压总开",
            errorInfo:"严重电流三相不平衡，电流三相不平衡=34.78%…",
            workState:"3"
        },
        {
            id:"112",
            orderNumber:"1001121351",
            orderState:"1",
            substationName:"中恒大厦轻装",
            deviceName:"1#变压器低压总开",
            errorInfo:"严重电流三相不平衡，电流三相不平衡=34.78%…",
            workState:"1"
        },
        {
            id:"113",
            orderNumber:"1001121351",
            orderState:"0",
            substationName:"中恒大厦轻装",
            deviceName:"1#变压器低压总开",
            errorInfo:"严重电流三相不平衡，电流三相不平衡=34.78%…",
            workState:"3"
        },
        {
            id:"114",
            orderNumber:"1001121351",
            orderState:"0",
            substationName:"中恒大厦轻装",
            deviceName:"1#变压器低压总开",
            errorInfo:"严重电流三相不平衡，电流三相不平衡=34.78%…",
            workState:"1"
        },
    ],

    //18.工单详情  通过id查询  
    orderInfo:{
        //订单编号
        orderNumber:"1001121351",
        //订单生成时间
        time:"2018-08-07 12:12:12",
        //变电所名称
        substationName:"中恒大厦轻装",
        //设备名称
        deviceName:"1#变压器低压总开",
        //工单描述
        errorInfo:"严重电流三相不平衡，电流三相不平衡=34.78%…",
        //工单创建人
        createPeople:"王明",
        //工单审核人
        checkPeople:"张三",
        //工单派发人
        payoutPeople:"李四",
        //工单接收人
        receivePeople:"王五",
        //工单图片
        orderPics:[
            "http://img.juimg.com/tuku/yulantu/140218/330598-14021R23A410.jpg",
            "http://img.juimg.com/tuku/yulantu/140218/330598-14021R23A410.jpg",
            "http://img.juimg.com/tuku/yulantu/140218/330598-14021R23A410.jpg",
            "http://img.juimg.com/tuku/yulantu/140218/330598-14021R23A410.jpg"
        ],
        //工单维修记录
        record:[
            {
                //历史工单时间
                time:"2018-11-15",
                //历史工单描述
                describe:"工单记录工单记录工单记录",
                //历史工单图片
                orderPic:[
                    "http://img.juimg.com/tuku/yulantu/140218/330598-14021R23A410.jpg",
                    "http://img.juimg.com/tuku/yulantu/140218/330598-14021R23A410.jpg",
                    "http://img.juimg.com/tuku/yulantu/140218/330598-14021R23A410.jpg"
                ]
            },
            {
                time:"2018-11-15",
                describe:"工单记录工单记录工单记录",
                orderPic:[
                    "http://img.juimg.com/tuku/yulantu/140218/330598-14021R23A410.jpg",
                    "http://img.juimg.com/tuku/yulantu/140218/330598-14021R23A410.jpg",
                    "http://img.juimg.com/tuku/yulantu/140218/330598-14021R23A410.jpg"
                ]
            },
            {
                time:"2018-11-15",
                describe:"工单记录工单记录工单记录",
                orderPic:[
                    "http://img.juimg.com/tuku/yulantu/140218/330598-14021R23A410.jpg",
                    "http://img.juimg.com/tuku/yulantu/140218/330598-14021R23A410.jpg",
                    "http://img.juimg.com/tuku/yulantu/140218/330598-14021R23A410.jpg"
                ]
            }
        ]
    },

    //19.工单报修
    // 上传字段
    json:{
        //变电所名称
        substationName:"中恒大厦轻装",
        //设备名称
        deviceName:"1#变压器低压总开",
        //工单描述
        errorInfo:"严重电流三相不平衡，电流三相不平衡=34.78%…",
        //创建时间
        createTime:"561161614611",
        //上传图片
        picUrl:"http://img.juimg.com/tuku/yulantu/140218/330598-14021R23A410.jpg"
    },

    //运维 历史工单(同orderTodo！！！！！)
    //20.状态 4 完成
    historyOrder:{
        //设备id
        id:"110",
        //工单标号
        orderNumber:"1001121351",
        //工单状态   0 严重 1一般
        orderState:"0",
        //变电所名称
        substationName:"中恒大厦轻装",
        //设备名称
        deviceName:"1#变压器低压总开",
        //故障描述
        errorInfo:"严重电流三相不平衡，电流三相不平衡=34.78%…",
        //任务状态
        workState:"4"
    },

    //21.告警列表  
    alarmlist:[
        {
          //告警列表数量ID
          id:1,
          //是否处理过 0：已处理 1：未处理
          select: 1,
          // 告警为严重还是不严重 0:不严重 1：严重
          fire: 1,   
          // 设备名称
          alaName : '设备名称',
          //告警信息   
          alaMsg : '[交大智能电网蓝盒子] 变为在线变为在线',
          //设备状态 0 一般 1 严重
          orderStatus:0,
          //告警时间   
          alaTime : '2019-1-04 09:12',
        },{
          id:2,
          select: 0,
          fire: 0, 
          alaName : '设备名称111',
          alaMsg : '[交大智能电网蓝盒子] 变为在线',
          alaTime : '2019-1-04 09:12',
          orderStatus:0
        },{
          id:3,
          select: 0,
          fire: 0, 
          alaName : '设备名称',
          alaMsg : '[交大智能电网蓝盒子] 变为在线变为在线',
          alaTime : '2019-1-04 09:12',
          orderStatus:0,
        },{
          id:4,
          select: 1,
          fire: 1, 
          alaName : '设备名称',
          alaMsg : '[交大智能电网蓝盒子] 变为在线',
          alaTime : '2019-1-04 09:12',
          orderStatus:0,
        },{
          id:5,
          select: 0,
          fire: 0, 
          alaName : '设备名称',
          alaMsg : '[交大智能电网蓝盒子] 变为在线',
          alaTime : '2019-1-04 09:12',
          orderStatus:0
        }
        ],




}

export default mock