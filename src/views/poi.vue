<template>
  <div>
      <div class="poi_nav">
          <ul>
            <li><router-link to="/poi/choose">条件选择</router-link></li>
            <li><router-link to="/poi/rank">签到排名</router-link></li>
            <li><router-link to="/poi/distribute">数据分布</router-link></li>
            <li><router-link to="/poi/user">用户画像</router-link></li>
            <li><router-link to="/poi/change">变化情况</router-link></li>
          </ul>
      </div>
      <div class="main1">
          <router-view></router-view>
      </div>
  </div>
</template>

<script>

  import {mapState} from 'vuex';
  /*import {moment} from 'assets/js/moment.js';
  import {datePicker1} from 'assets/js/daterangepicker.js';*/

  export default {
    data () {
      return {
        mes:'',
        list:[]
      }
    },
    methods: {
      async getContent () {
        //const response = await fetch('/api/hello');
        //this.content = await response.text();
      }
    },
    mounted () {
     // this.mes=this.$store.state.message;
     // this.list = this.$store.state.todoList;
     // this.$store.commit('Todo','tomota');
     // this.$store.commit('MESSAGE', '哈哈哈');
      //this.getContent();
    },

  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
  .poi_nav{
    position:fixed;
    right:10px;
    top:50%;
    z-index:998;
    li{
      margin:2px 0;
      a{
        color:#1fbf8f;
      }
    }

  }
  .poi_nav a.router-link-active{
     color:#275547;
     font-size:15px;
     font-weight:700;
  }
  
</style>
