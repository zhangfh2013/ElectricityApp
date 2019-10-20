<template>
    <div class="treeMenu">
        <div @click="toggleChildren(label)" :style="indent" :class="(istrue === label) ? 'titleClick' : 'titleStyle'" id="sty">
            <img src="../../static/img/Path_black@2x.png" alt="" class="picTrue" v-if='!isFolder'>
            {{label}}
        </div>
        <tree-menu 
            v-for="(node,index) in nodes"
            v-if="showChildren"
            :key="index"
            :nodes='node.nodes'
            :label="node.label"
            :depth="depth + 1"
            ></tree-menu>
    </div>
</template>
<script>
export default {
    name:'treeMenu',
    label : 'treeMenu',
    props:['label','nodes','depth'],
    data(){
        return{
            showChildren:false,
            istrue:'',
            isFolder:true
        }
    },
    mounted(){
        //将isFolder放在这里判断可以识别出最底层菜单【是否有子数组】，然后改变图标
        this.isFolder = !this.nodes;
    },
    methods:{ 
        // 点击出现下一层
        toggleChildren(label){
            this.showChildren = !this.showChildren; 
            if(this.isFolder){
                this.istrue = label;
                console.log(label)
            }
        },
    },
    computed:{
        // 控制chilren的left距离
        indent(){
             if(this.isFolder){
                return {transform:`translate(${this.depth * 0.4}rem)`}
            }else{
                return {transform:`translate(${this.depth * 0.3}rem)`}
            } 
        },
        // 文字颜色改变
        // titleStyle() {
        //     if(this.isFolder){
        //         return {
        //             'titleStyle': !this.showChildren,
        //             'titleClick': this.showChildren
        //         }
        //     }
        // },
    }  
}
</script>
<style>
.treeMenu{
    max-height: calc(100vh - 4.3rem);;
    overflow: scroll;
    font-size: 0.28rem;
    background: #fff;
    text-align: left;
}
.titleStyle{
    color: #111519;
}
.titleClick{
    color: #00AFD5;
}
#sty{
    margin-left: 0.3rem;
    padding: 0.16rem 0;
}
.picTrue{
    vertical-align:middle;
    margin-right: 0.1rem;
    width: 0.2rem;
}
.picFalse{
    display: none;
}
</style>