// 配置全局接口域名
//服务器地址
//登陆
const server = 'http://192.168.1.103:81';
const substationName = server + "/app/index/getSubstation"
const transformerList = server + "/app/index/transformerlist"
const login = server + "/app/login"
const energyTree = server + "/app/EnergyAnalysis/getSubstation"
const monitorTree = server + "/app/EnergyAnalysis/getSubstationtran"
export default {
    substationName:substationName,
    transformerList:transformerList,
    login:login,
    energyTree:energyTree,
    monitorTree:monitorTree
}
