<!--suppress ALL -->
<template>
  <div id="app">
    <div class="header">
       <div class="containerbox container-fluid">
         <div class="row">
            <div class="col-md-3 text-left logo">签到榜单</div>
            <div class="col-md-9 text-right">
                <router-link to="/poi">POI</router-link>
                <router-link to="/cate">类别</router-link>
                <router-link to="/city">城市</router-link>
            </div>
         </div>
       </div>
    </div>
    <div class="main">
         <router-view></router-view>
    </div>
  </div>
</template>
<script>
  import Vue from 'vue';
  import {mapState} from 'vuex';
  
  export default {
    data (){
      return {
          cbtn: true //citybox的按钮 对应组件 city-box
      }
    },
    methods :{
      
    }
  }
</script>
<style>

</style>
