<template>
  <div id="perChangePassword">
    <navHeadSave   :title="title" :user="user" :password="password" :aginpassword="aginpassword"></navHeadSave>
    <!-- 个人中心-修改密码 -->
      <mt-field label="旧密码" placeholder="请填写旧的密码" type="password" v-model="user"></mt-field>
      <mt-field label="新密码" placeholder="请输入新的密码" type="password" v-model="password"></mt-field>
      <mt-field label="确认密码" placeholder="请再次输入新的密码" type="password" v-model="aginpassword"></mt-field>   
  </div>
</template>

<script>
import navHeadSave from "../../../components/navHeadSave.vue"

export default {
  name: 'perChangePassword',
  components: {
    'navHeadSave': navHeadSave,
  },
  data () {
    return {
      selected:'',
      title:'修改密码',
      user:'',
      password:'',
      aginpassword:''
    }
  },
  methods:{

    
  },
}
</script>
<style>
#perChangePassword{
    height:100%;
    text-align: center;
    background: #fff;
}
/* per-list */
#perChangePassword .mint-cell-wrapper{
  background-image:none;
  width: 93%;
  margin: 0 auto;
  border-bottom: 0.01rem solid #E0E0E1;
  padding: 0.1rem 0;
}
#perChangePassword .mint-cell-title{
  text-align: left;
}
#perChangePassword 
  input::-webkit-input-placeholder{ color:#999; }
  input::-moz-placeholder{ color:#999; }/* Mozilla Firefox 19+ */
  input:-moz-placeholder{ color:#999; }/* Mozilla Firefox 4 to 18 */
  input:-ms-input-placeholder{ color:#999; }/* Internet Explorer 10-11 */ 
</style>
