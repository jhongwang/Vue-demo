<template>
<div class="section intro" id="intro" >
  <transition enter-active-class="animated fadeIn" leave-active-class="animated zoomOutRight">
        <div v-show="btn">
             <div class="container">
                 <h1>change</h1>
             </div>
        </div>
 </transition>
</div>
</template>

<script>

  import {mapState} from 'vuex';

  export default {
    data () {
      return {
        mes:'',
        list:[],
        btn:false
      }
    },
    methods: {
      async getContent () {
        //const response = await fetch('/api/hello');
        //this.content = await response.text();
      }
    },
    mounted () {
      this.btn = !this.btn;
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
  /* div.section{
    background-color: pink;
  } */
  /* h1 {
    color: #42b983;
  }
  
  .logo {
    width: 100px;
    height: 100px;
    a {
      color: #42b983;
      text-decoration: none;
    }
  } */
</style>
