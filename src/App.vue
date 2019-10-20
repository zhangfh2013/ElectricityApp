<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
  body{
    margin:0;
  }
  #app{
    height:100vh;
    background: linear-gradient(#2E3944,#445260 );
    background: -webkit-linear-gradient(#2E3944,#445260 ); /* Safari 5.1 - 6.0 */
    background: -o-linear-gradient(#2E3944,#445260 ); /* Opera 11.1 - 12.0 */
    background: -moz-linear-gradient(#2E3944,#445260 ); /* Firefox 3.6 - 15 */
  }
</style>
