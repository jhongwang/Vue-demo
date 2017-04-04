<template>
  <!--======== intro 数据选项 =========-->
 <div class="section intro" id="intro" >
  <transition enter-active-class="animated fadeInLeft" leave-active-class="animated zoomOutRight">
        <div v-show="btn">
            <div class="container">
                <div class="row">
                    <div class="col-md-12 col-sm-12 col-xs-12">
                        <div class="intro-content">
                            <div class="row">
                                <div class="col-md-4 col-sm-4 col-xs-4">
                                    城市：<input type="text" class="cityinput" name="form_city" value='' id="city_login" @click="fun_city"  data-value="" v-model="msg.city">
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
                                        <button type="button" id="form_yw" name="form_yw" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="fun_yw" v-model="msg.yw" data-value="">
                                           微信朋友圈签到 <span class="caret"></span>
                                         </button>
                                         <ul class="dropdown-menu form_ul" id="form_yw_ul">
                                           <li><a href="#" data-value="wechat_friend">微信朋友圈签到</a></li>
                                           <li><a href="#" data-value="wechat_send">微信发送位置</a></li>
                                           <li><a href="#" data-value="qq">手q发送位置</a></li>
                                           <li><a href="#" data-value="qzone">Qzone签到</a></li>
                                         </ul>
                                       </div> 
                                </div>
                                
                            </div>
                            <div class="row intro-content-div">
                                <div class="col-md-4 col-sm-4 col-xs-4">
                                    日期：<mz-datepicker format="yyyy-MM-dd" :s-time.sync="startTime" :e-time.sync="endTime" range en confirm v-on:confirmup="confrim"></mz-datepicker>
                                </div>
                                <div class="col-md-4 col-sm-4 col-xs-4">
                                    时段: 
                                        <div class="btn-group" v-bind:class="{open:issd}">
                                          <button type="button" id="form_sd" class="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false" @click="fun_sd" v-model="msg.sd" data-value="0~24">
                                            全天 00：00 - 24：00 <span class="caret"></span>
                                          </button>
                                          <ul class="dropdown-menu form_ul" id="form_sd_ul">
                                            <li><a href="#" data-value="0~24">全天 00：00 - 24：00</a></li>
                                            <li><a href="#" data-value="0~7">凌晨 00：00 - 07：00</a></li>
                                            <li><a href="#" data-value="7~10">早上 07：00 - 10：00</a></li>
                                            <li><a href="#" data-value="10~12">上午 10：00 - 12：00</a></li>
                                            <li><a href="#" data-value="12~14">中午 12：00 - 14：00</a></li>
                                            <li><a href="#" data-value="14~19">下午 14：00 - 19：00</a></li>
                                            <li><a href="#" data-value="19~24">晚上 19：00 - 24：00</a></li>
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
  var Event=new Vue();
  export default {
    data () {
      return {
        msg:{
          city:'',
          citycode:'',
          curcityarr:[],
          wd:'',
          yw:0,
          rq:'',
          sd:0,
          pw:20,
          sq:''
        },
        isyw:false,
        issd:false,
        iscbtn:false,
        btn:false,
        time: '2016-05-15',
        startTime: new Date('2017-03-30').getTime(),
        endTime: new Date('2017-03-30').getTime(),
        en:false
      }
    },
    methods: {
      poi_submit () {
         //console.log(this.msg)
         //appendCity(this,'danxuan');
         //console.log(Vue.cityShow('123'))
         //console.log(Vue.doubleNumber)
         this.msg.pw = Vue.doubleNumber(50);
         this.$store.commit('ChangeFormMsg',this.msg);
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
      }
    },
    mounted () {
       this.init();
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
   .intro{
      background: url("../assets/images/cate-bg.jpg") no-repeat fixed bottom center/ cover;
   }
</style>
