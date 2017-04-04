<template>
  <!--======== intro 数据选项 =========-->
 <div class="section intro" id="intro" >
  <transition enter-active-class="animated zoomIn" leave-active-class="animated zoomOutRight">
        <div v-show="btn">
            <div class="container" >
                <div class="row">
                    <div class="col-md-12 col-sm-12 col-xs-12">
                        <div class="intro-content">
                            <div class="row">
                                <div class="col-md-4 col-sm-4 col-xs-4">
                                    城市：<input type="text" class="cityinput" name="form_city" value='' id="city_login" @click="fun_city"  data-value="" :value="msg.city">
                                </div>
                                <div class="col-md-4 col-sm-4 col-xs-4">
                                  维度:<input type="text" class="" name="form_wd" v-model="msg.wd" id="form_wd" data-value=""  onclick="appendCity_wd(this,'duoxuan_wd')" />
                                  <!-- <div id="gjz">
                                          <span title="景区景点、餐饮、商场、酒店、综合市场">景区景点、餐饮、商场...</span> 
                                      </div> -->
                                </div>
                                <div class="col-md-4 col-sm-4 col-xs-4">
                                    业务: 
                                       <div class="btn-group" v-bind:class="{open:isyw}">
                                        <button type="button" id="form_yw" name="form_yw" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="fun_yw"  data-value="">{{msg.ywResult}}<span class="caret"></span>
                                         </button>
                                         <ul class="dropdown-menu form_ul" id="form_yw_ul">
                                           <li v-for="item in msg.ywselects" @click="ywselectFun(item)"><a href="#">{{item.name}}</a></li>
                                         </ul>
                                       </div> 
                                </div>
                                
                            </div>
                            <div class="row intro-content-div">
                                <div class="col-md-4 col-sm-4 col-xs-4">
                                    日期：<!-- <input type="text" class="cityinput"  name="reser" id="form_rq" style="font-family:Arial;" v-model="msg.rq" readonly> -->
                                    <!-- <mz-datepicker format="yyyy-MM-dd"  range  ></mz-datepicker> -->
                                    <mz-datepicker format="yyyy-MM-dd" :s-time.sync="startTime" :e-time.sync="endTime" range en confirm v-on:confirmup="confrim"></mz-datepicker>
                                </div>
                                <div class="col-md-4 col-sm-4 col-xs-4">
                                    时段: 
                                        <div class="btn-group" v-bind:class="{open:issd}">
                                          <button type="button" id="form_sd" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="fun_sd" v-model="msg.sd" data-value="0~24">
                                            {{msg.sdResult}}<span class="caret"></span>
                                          </button>
                                          <ul class="dropdown-menu form_ul" id="form_sd_ul">
                                            <li v-for="item in msg.sdselects" @click="sdselectFun(item)"><a href="#">{{item.name}}</a></li>
                                          </ul>
                                        </div>
                                </div>
                                <div class="col-md-4 col-sm-4 col-xs-4 ">
                                    排位: <input type="text" class="" id="form_pw" v-model="msg.pw">
                                    <div class="alert alert-danger alert_pw" role="alert">
                                       请输入正确的排位值！(1~50)
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                              <div class="col-md-4 hidden_now">商圈：<input type="text" class="" id="form_sq" v-model="msg.sq" placeholder="例如：中关村"></div>
                              <!-- <div class="col-md-4 intro-content-submit">
                                <a class="btn btn-default" href="#" role="button" id="form_submit" type="submit">提  交</a></i></a>
                              </div> -->
                            </div>
                            <div class="row intro-content-submit">
                               <a class="btn btn-default" href="#" role="button" id="form_submit" data-toggle="popover" data-trigger="click" data-content=""  type="" @click="poi_submit">提  交</a></i></a>
                            </div>
                            <div><i class="fa fa-caret-down"></i></div>    
                        </div>
                    </div>
                </div>
            </div>
            <city-box :cbtn='iscbtn' :curcity="msg.curcityarr" v-on:cityClose='fun_city' v-on:citySure = 'fun_cityresult(arguments[0])'></city-box>
        </div>
    </transition>
   </div><!--======== end intro =========-->
</template>
<script>
  import Vue from 'vue';
  import {mapState} from 'vuex';
  const cityBoxing = r => require(['views/cityBoxing'], r);
  const dateBoxing = r => require(['views/dateBoxing'], r);
  //import {ajs} from 'assets/js/ci.js';
  //准备一个空的实例对象
  //var Event=new Vue();
  export default {
    data () {
      return {
        msg:{
          city:'',
          citycode:'',
          curcityarr:[],
          wd:'',
          ywselects:[{name:'微信朋友圈签到',value:'wechat_friend'},{name:'微信发送位置',value:'wechat_send'},{name:'手q发送位置',value:'qq'},{name:'Qzone签到',value:'qzone'}],
          ywResult:'微信朋友圈签到',
          ywResultVal:'wechat_friend',
          rq:'',
          sdselects:[{name:'全天 00：00 - 24：00',value:'0~24'},{name:'早上 07：00 - 10：00',value:'7~10'},{name:'上午 10：00 - 12：00',value:'10~12'},{name:'中午 12：00 - 14：00',value:'12~14'},{name:'下午 14：00 - 19：00',value:'14~19'},{name:'晚上 19：00 - 24：00',value:'19~24'}],
          sdResult:'全天 00：00 - 24：00',
          sdResultVal:'0~24',
          pw:20,
          sq:''
        },
        btn:false,
        isyw:false,
        issd:false,
        iscbtn:false,
        time: '2016-05-15',
        startTime: new Date('2017-03-30').getTime(),
        endTime: new Date('2017-03-30').getTime(),
        en:false
      }
    },
    methods: {
      poi_submit () {
        var self = this;
        self.$router.push({path:'/poi/rank'});//其中login是你定义的一个路由模块
        var url='https://apis.map.qq.com/ws/place/v1/search?output=jsonp&boundary=region(%E5%8C%97%E4%BA%AC,0)&keyword=%E6%88%90%E9%83%BD&page_size=20&page_index=1&orderby=_distance&key=WC4BZ-TFI24-M45UM-DI57V-SVUH3-LQFUV';
        $.ajax({
              type:'get',
              url:url,
              dataType:'jsonp',
              jsonpCallback:'cb',
              success:function(res){
                if(res){
                  //console.log('返回来的数据')
                  //console.log(res)
                  res = Vue.beijing;
                  self.draw_data(res);
                }
                

              },
              error:function(){

              }
        });
       // this.draw_data(Vue.beijing) 

        //http://10.173.142.164:8080/nearby_data_server/nearby_data.php?city=&category_list=100000|110000|101000_101100&date=20170328~20170331&hour=10~12&num=20&ref=WechatSend&cb=index_load&_=1491037816560
        //http://apis.map.qq.com/ws/place/v1/search?output=jsonp&boundary=region(北京,0)&keyword=成都&page_size=20&page_index=1&orderby=_distance&key=WC4BZ-TFI24-M45UM-DI57V-SVUH3-LQFUV
         //console.log(this.msg)
         //appendCity(this,'danxuan');
         //console.log(Vue.cityShow('123'))
         //console.log(Vue.doubleNumber)
         self.msg.pw = Vue.doubleNumber(50);
         self.$store.commit('ChangeFormMsg',this.msg);
      },
      draw_data (data){
         console.log('暂时是模拟的数据');
        console.log(data)
      },
      fun_city (){
          this.iscbtn = !this.iscbtn;
          //this.$store.commit('ChangeFormMsgOnly','cbtn',true);
          //Event.$emit('a-msg',this.a);
          //this.$store.commit('ChangeFormMsgOnly','ctype',1);
          //Vue.cityShow(document.getElementById('city_login'),'danxuan');
      },
      fun_cityresult(a){
          console.log(a)
          console.log(a[0].code)
          this.msg.city = a[0].name;
          this.fun_city ();
      },
      fun_yw () {
         this.isyw = !this.isyw;
      },
      fun_sd () {
         this.issd = !this.issd;
      },
      ywselectFun(val){
         this.msg.ywResult = val.name;
         this.msg.ywResultVal = val.value;
         this.isyw = !this.isyw;
      },
      sdselectFun(val){
         this.msg.sdResult = val.name;
         this.msg.sdResultVal = val.value;
         this.issd = !this.issd;
      },
      init () {
           this.btn = !this.btn;
           for(var o in this.$store.state.formMsg){
             this.msg[o] = this.$store.state.formMsg[o] || '';
           }
      },
      confrim(startTime,endTime) {
          console.log('confirm')
          console.log(startTime);
          console.log(endTime);
      },
    },
    mounted () {
       this.init();
       //this.msg.city=this.$store.state.formMsg.city;
       //this.msg.wd=this.$store.state.formMsg.wd;
       //this.msg.yw=this.$store.state.formMsg.yw;
       //this.msg.rq=this.$store.state.formMsg.rq;
       //this.msg.sd=this.$store.state.formMsg.sd;
       //this.msg.pw=this.$store.state.formMsg.pw;
       //this.msg.sq=this.$store.state.formMsg.sq;
     // this.list = this.$store.state.todoList;
     // this.$store.commit('Todo','tomota');
     // this.$store.commit('MESSAGE', '哈哈哈');
      //this.getContent();
    },
    components:{ //局部组件
        'city-box':cityBoxing,
        'mz-datepicker':dateBoxing
    }

  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
.intro {
      background: url("../assets/images/intro-bg3.jpg") no-repeat fixed top center/ cover;
}
</style>
