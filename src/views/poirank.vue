<template>
  <div class="section intro" id="intro" >
  <transition enter-active-class="animated fadeIn" leave-active-class="animated zoomOutRight">
        <div v-show="btn">
             <div class="container">
                 <div v-for="(item,index) in list"  v-if="!(index%2)" v-bind:class="{row:!index%2}">
                     <div class="col-md-6 col-sm-8 col-xs-12"><div class="media"><div id="index" class="canvas_charts" v-bind:style="{maxHeight:numHeight+'px',color:'#f00'}">{{index}}</div></div></div>
                     <div v-if="(index+1)<list.length" class="col-md-6 col-sm-8 col-xs-12"><div class="media"><div id="index+1" class="canvas_charts" v-bind:style="{maxHeight:numHeight+'px',color:'#f00'}">{{index+1}}</div></div></div>
                 </div>
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
        list:[],
        btn:false,//控制界面显示
        numHeight:730
      }
    },
    methods: {
      
    },
    mounted () {
      console.log(this.btn)
      this.btn = !this.btn;
      this.numHeight = this.$store.state.formMsg.pw>30?730:530;
      console.log('以下是rank的数据')
      this.list = this.$store.state.indexData.zhanshi_data;
      console.log(this.$store.state.formMsg)
      console.log(this.$store.state.indexData)
      console.log(this.btn)
      console.log(this.list)
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
  background-color: #0f0;
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
