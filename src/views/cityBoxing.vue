<template>
<div class="aui_state_box"  id="aui_state_box" v-show="cbtn" >
<div class="aui_state_box_bg"></div>
  <div class="aui_alert_zn aui_outer">
    <table class="aui_border" style="border:2px solid #fff;">
      <tbody>
        <tr>
          <td class="aui_w"></td>
          <td class="aui_c">
            <div class="aui_inner">
              <table class="aui_dialog">
                <tbody>
                  <tr>
                    <td class="aui_header"  v-drag  colspan="2"><div class="aui_titleBar">
                        <div class="aui_title" style="cursor: move;">选择城市信息</div>
                        <a href="javascript:;" class="aui_close" onclick="Close()">×</a></div></td>
                  </tr>
                  <tr>
              <td class="aui_icon" style="display: none;"><div class="aui_iconBg" style="background: transparent none repeat scroll 0% 0%;"></div></td>
                     <td class="aui_main" style="width: auto; height: auto;">
                      <div class="aui_content" style="padding: 0px; position:relative">
                        <div id="" style="width: 900px; position:relative;">
                            <div class="data-result"><em>最多只能选择<strong>{{cityNum}}</strong>个城市</em><ul><li v-for="item in resultArr"><span class='svae_box aui-titlespan'>{{item.name}}</span><i>×</i></li></ul></div>
                            <div class="data-error" style="display: none;">最多只能选择{{cityNum}}项</div>
                            <div class="data-tabs">
                              <ul>
                                <li @click="removeProvinces" data-selector="tab-all" class="active"><a href="javascript:;"><span>全部</span><em></em></a></li>
                                <li v-if="tabsTitlebtn"  data-selector="tab-all" class="active"><a href="javascript:;"><span>{{tabsTitle}}</span><em></em></a></li>
                              </ul>
                             <!--  $('.data-tabs ul').append('<li data-code=' + $(con).data("code") + ' data-name=' + $(con).data("name") + ' class="active" onclick="removenode_area(this)"><a href="javascript:;"><span>' + $(con).data("name") + '</span><em></em></a></li>'); -->
                            </div>
                            <div class="data-container data-container-city">
                                <div class="view-all" id="" v-if="!tabsTitlebtn">
                                   <p class="data-title">热门城市</p>
                                   <div class="data-list data-list-hot">
                                     <ul class="clearfix">
             <li v-for="item in hotcitys"><a href="javascript:;" @click="upSpan(item)" data-code="item.code" data-name="item.name" class="d-item">{{item.name}}<label>0</label></a></li>
                                     </ul>
                                   </div>
                                   <p class="data-title">全部省份</p>
                                   <div class="data-list">
                                     <ul class="clearfix">
            <li v-for="item in provinces"><a href="javascript:;" @click="upProvince(item)" data-code="item.code" data-name="item.name" class="d-item">{{item.name}}<label>0</label></a></li>
                                     </ul>
                                   </div>
                              </div>
                             <ul class="clearfix" v-if="tabsTitlebtn">
                                   <li v-for="item in tabsTitleResultCitys"><a href="javascript:;" class="d-item" data-code="item.code"  data-name="item.name" 
                                   @click="upSpan(item)" >{{item.name}}<label>0</label></a></li>
                             </ul>
                          </div>
                      </div>
                      </div>
                    </td>
                  </tr>
                  <tr>
                    <td class="aui_footer" colspan="2"><div class="aui_buttons">
                      <button class="aui-btn aui-btn-primary" @click="citySure()" type="button">确定</button>
                        <button class="aui-btn aui-btn-light" @click="cityClose()" type="button">取消</button>
                      </div>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div></td>
          <td class="aui_e"></td>
        </tr>
      </tbody>
    </table>
  </div>
 </div>
</template>
<script>
  import Vue from 'vue';
  import {mapState} from 'vuex';

  export default {
    props:{
      cbtn:{
        default:false
      }
    },
    data () {
      return {
        cityNum: 1,
        hotcitys: [],
        provinces: [],
        cityList:[],
        relations:[],//各省份对应的城市
        resultArr:[],
        tabsTitle:'', //选择省份
        tabsTitlebtn:false,
        tabsTitleResultCitys:[]
      }
    },
    computed:{
       
    },
    methods: {
      cityClose(){
          this.$emit('cityClose')
      },
      citySure(){
          this.$emit('citySure',this.resultArr);
      },
      upSpan(item) {
         if(this.cityNum===1){
           //这里是单选
            this.resultArr=[item];
            console.log(this.resultArr)
         }else{

         }
      },
      upProvince(item){
        this.tabsTitlebtn = !this.tabsTitlebtn;
        this.tabsTitle = item.name;
        this.tabsTitleResultCitys = this.arrCode(this.relations[item.code]);
      },
      removeProvinces (){
        this.tabsTitlebtn = false;
      },
      arrCode(prearr) {
         var arr=[];
         for(var i=0;i<prearr.length;i++){
             arr.push({name:this.cityList[prearr[i]][0],code:prearr[i]});
         }
         return arr;
      }
    },
    updated(){
    },
    mounted(){
       this.relations = Vue.__LocalDataCities.relations;
       this.cityList = Vue.__LocalDataCities.list;
       this.hotcitys = this.arrCode(Vue.__LocalDataCities.category.hotcities);
       this.provinces = this.arrCode(Vue.__LocalDataCities.category.provinces);
       //this.cityBtn = this.$store.state.formMsg.cbtn;
       //Event.$on('city-off',function(a){
       //    alert('c')
       //    this.cityBtn=a;
       //}.bind(this));
     // this.mes=this.$store.state.message;
     // this.list = this.$store.state.todoList;
     // this.$store.commit('Todo','tomota');
     // this.$store.commit('MESSAGE', '哈哈哈');
      //this.getContent();
    },
    directives: {
      drag: {
        inserted: function(el){
          var oDiv = document.getElementById('aui_state_box');//这里获取的是js dom元素
          oDiv.onmousedown = function(ev){
            var disX = ev.clientX - oDiv.offsetLeft;
            var disY = ev.clientY - oDiv.offsetTop; 
            document.onmousemove = function(ev){
              var l = ev.clientX-disX; 
              var t = ev.clientY-disY;
              oDiv.style.left = l +'px';
              oDiv.style.top = t +'px';
            };
            document.onmouseup = function(){
              document.onmousedown = null;
              document.onmousemove = null;
            }
          }
        }
      }
    }

  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
.cityb{
  position:absolute;
  top: 20px;
  left: 20px;
  color:red;
  z-index:9999;
  height:300px;
  width:500px;
  background-color: #0f0;
}
</style>
