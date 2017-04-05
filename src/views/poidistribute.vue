<template>
  <div class="section intro" id="intro" >
  <transition enter-active-class="animated fadeIn" leave-active-class="animated zoomOutRight">
    <div>
        <div v-show="btn">
               <div class="row">
                    <div class="col-md-8 col-md-offset-2 text-center">  
                        <h2 class="section-title" style="font-size:26px;font-weight:700;color:#496174">签到数据分布</h2>
                        <p style="font-size:12px;font-weight:400;margin-bottom:30px;color:#999;">The sign data distribution includes the geographical distribution of symbols and time distribution.</p>
                    </div>
                </div> 
             <div class="containerbox" id="rankBox">
                <div v-for="(item,index) in mapShow"  v-if="!(index%2)">
                     <div class="col-md-6 col-sm-8 col-xs-12" style="margin-bottom:30px;">
                       <div class="media">
                         <div id="index" class="canvas_charts" v-bind:style="{maxHeight:numHeight+'px',color:'#f00',minHeight:'400px',width:'100%'}">
                           <div class="echart" v-bind:style="{width:'100%',height:style.height}">
                             <i-echarts  :option="item" :loading="loading" :resizable="true" ></i-echarts>
                           </div>
                         </div>
                       </div>
                     </div>
                 </div>
                 <div v-for="(item,index) in listNewC"  v-if="!(index%2)">
                     <div class="col-md-6 col-sm-8 col-xs-12" style="margin-bottom:30px;">
                       <div class="media">
                         <div id="index" class="canvas_charts" v-bind:style="{maxHeight:numHeight+'px',color:'#f00',minHeight:'400px',width:'100%'}">
                           <div class="echart" v-bind:style="{width:'100%',height:style.height}">
                             <i-echarts  :option="item" :loading="loading" :resizable="true" ></i-echarts>
                           </div>
                         </div>
                       </div>
                     </div>
                 </div>
             </div>
        </div>
        <div v-show="!btn">
            <div class="containerbox">
              <h3 style="color:#666;font-size:14px;">亲,您还没有进行条件选择呢！</h3>
              </div>
        </div>
    </div>
 </transition>
</div>
</template>

<script>
  import Vue from 'vue';
  import {mapState} from 'vuex';
  const IEcharts = r => require(['views/chartfull'], r);
  export default {
    data () {
      return {
        list:[],//time时段图
        maplist:[],//map图数据
        btn:false,//控制界面显示
        numHeight:530,
        mapCity:'',//选中的城市或者省份名字
        mapCode:'',//为了获取省份里面某个城市的code 从而获得所属省份名称
        loading: false,
        style: {width:'100%',height:'530px'},
        bar: {
          title: {
            text: 'ECharts 入门示例1'
          },
          tooltip: {},
          xAxis: {
            type:"value"
            
          },
          yAxis: {
             type:"category",
             data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
          },
          series: [{
            name: '销量',
            type: 'bar',
            data: [5, 20, 36, 10, 10, 20]
          }],
          color:['#0f0'],
          graphic: [{
            type: 'image',
            id: 'logo',
            left: '30%',
            top: 130,
            z: 5,
            bounding: 'raw',
            origin: [75, 75],
            style: {
              image: 'http://s.map.qq.com/themes/default/img/icons.png?v=v4.2.49',
              width: 249,
              height: 36,
              opacity: 0.1
            }
          }]
        }
      }
    },
    computed:{
      listNewC(){
        var self = this;
        var arr = self.list;
        var arr_new =[];
        if(arr.length>0){
          console.log('distarr')
          console.log(arr)
          arr_new.push({
              title:{
                text:'签到时段分布图',
                x:'center'
              },
              calculable : true,
              legend: {
                  top:'28',
                  data:arr[0].xarr_legend
              },
              tooltip : {
                  trigger: 'item'
              },
              xAxis: [
                  {
                      type : 'category',
                      data : arr[0].xarr
                  }
              ],
              yAxis: [
                  {
                      type : 'value',
                  }
              ],
              series : arr[0].yarr,
              graphic: [
                  {
                      type: 'image',
                      id: 'logo',
                      left: '30%',
                      top: 130,
                      z:5,
                      bounding: 'raw',
                      origin: [75, 75],
                      style: {
                          image: '../static/images/logo.png',
                          width: 249,
                          height: 36,
                          opacity: 0.1
                      }
                  }
              ],
             // color:['#D48265','#61A0A8','#C23531','#2F4554']
             // color:['#DC580F','#00D037','#D91749','#099DDB']
             color:['#DC580F','#00D037','#D91749','#099DDB']
          });
        }
        console.log('arr_new')
        console.log(arr_new)
        return arr_new;
      },
      mapShow(){
         console.log('a')
         if(this.mapCity){
           console.log('b')
           console.log(this.mapCity)
           var type;
           if(this.mapCity == '全国'){
              type = 'china';
           }else{
              var city_myCode = this.mapCode.slice(0,3); //得到省的前三位字符串 050 广东省
            console.log('mycode')
           console.log(this.mapCode)
              var city_myCode_province = Vue.__LocalDataCities.list[city_myCode][0].slice(0,2); //得到广东二字
              type = Vue.__LocalDataCities.city_names[city_myCode_province];
           }
           console.log('mapshow')
           console.log(type)
           Vue.setMap(type,this.maplist);
         }
      }
    },
    methods: {
      down_json(x,y) {
       return (parseFloat(x.click_num) > parseFloat(y.click_num)) ? 1 : -1
      } 
    },
    mounted () {
      console.log(this.btn)
      console.log('以下是rank的数据')
      this.list=[];
      console.log(this.list.length)
      if(this.$store.state.indexData.time_xarr&&this.$store.state.indexData.time_xarr.length>0){
        this.list.push({xarr:this.$store.state.indexData.time_xarr,yarr:this.$store.state.indexData.time_yarr,xarr_legend:this.$store.state.indexData.time_xarr_legend});
      }
      if(this.$store.state.indexData.map_poi&&this.$store.state.indexData.map_poi.length>0){
        this.maplist = this.$store.state.indexData.map_poi;
        this.mapCity = this.$store.state.formMsg.curcityarr[0].name;
        this.mapCode = this.$store.state.formMsg.curcityarr[0].code;
      }
      console.log(this.mapCode)
      this.btn = this.list.length>0?(!this.btn):(this.btn);
      console.log(this.$store.state.formMsg)
      console.log(this.$store.state.indexData)
      console.log(this.btn)
      console.log(this.list)
      console.log('maplist')
      console.log(this.mapCity)
     // this.mes=this.$store.state.message;
     // this.list = this.$store.state.todoList;
     // this.$store.commit('Todo','tomota');
     // this.$store.commit('MESSAGE', '哈哈哈');
      //this.getContent();
    },
    components: {
      'i-echarts':IEcharts
    }

  }

</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" rel="stylesheet/scss" scoped>
.intro{
  height:auto;
} 
</style>