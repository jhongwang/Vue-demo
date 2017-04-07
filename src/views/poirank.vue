<template>
  <div class="section intro" id="intro" >
  <transition enter-active-class="animated fadeIn" leave-active-class="animated zoomOutRight">
    <div>
        <div v-show="btn">
               <div class="row">
                    <div class="col-md-8 col-md-offset-2 text-center">  
                        <h2 class="section-title" style="font-size:26px;font-weight:700;color:#496174">签到排名</h2>
                        <p style="font-size:12px;font-weight:400;margin-bottom:30px;color:#999;">Sign data display diagram can export the current page, as well as batch export watermark.</p>
                    </div>
                </div> 
             <div class="containerbox" id="rankBox">
                 <div v-for="(item,index) in listNew"  v-if="!(index%2)" v-bind:class="{row:!index%2}">
                     <div class="col-md-6 col-sm-8 col-xs-12" style="margin-bottom:30px;">
                       <div class="media">
                         <div id="index" class="canvas_charts" v-bind:style="{color:'#f00',minHeight:'400px',width:'100%'}">
                           <div class="echart" v-bind:style="{width:'100%',height:style.height}">
                             <i-echarts  v-if="btn" :option="item.showData" :loading="loading" :resizable="true" ></i-echarts>
                           </div>
                         </div>
                       </div>
                     </div>
                     <div v-if="(index+1)<list.length" class="col-md-6 col-sm-8 col-xs-12">
                       <div class="media">
                         <div id="index+1" class="canvas_charts" v-bind:style="{color:'#f00'}">
                           <div class="echart" v-bind:style="{width:'100%',height:style.height}">
                             <i-echarts v-if="btn" :option="list[index+1].showData" :loading="loading" :resizable="true" ></i-echarts>
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
              </div></div>
    </div>
 </transition>
</div>
</template>

<script>

  import {mapState} from 'vuex';
  const IEcharts = r => require(['views/chartfull'], r);

  export default {
    data () {
      return {
        list:[],
        btn:false,//控制界面显示
        numHeight:730,
        loading: false,
    style: {width:'100%',height:'100%'},
    bar: [{
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
    }, {
      title: {
        text: 'ECharts 入门示例2'
      },
      tooltip: {},
      xAxis: {
        data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子']
      },
      yAxis: {},
      series: [{
        name: '销量',
        type: 'line',
        data: [18, 17, 86, 64, 44, 23]
      }]
    }]
      }
    },
    computed:{
      listNew(){
        var self = this;
        var arr_new=[];
        var arr = self.list;
        console.log('arr')
        console.log(arr)
        for(var i=0;i<arr.length;i++){
            var title1 = arr[i].text;
            var arr_now = arr[i].data.sort(self.down_json);
            var id = 'chart_'+i;
            var floatTitle='签到值';
            var color=['#7cb5ec'];
            var yarr = [];
            var xarr = [];
            for(var j = 0; j<arr_now.length; j++){
                yarr.push(arr_now[j].name);
                xarr.push(arr_now[j].click_num);
            }
            var subtitle = arr[i].subtitle?arr[i].subtitle:null;
            arr[i].showData = {
            title: {
                text: title1,
                x:'center',
                subtext:subtitle,
                textStyle:{
                    color: '#496174',
                    fontWeight:'bolder',
                    fontFamily: 'Microsoft Yahei',
                    fontSize:18
                },
                subtextStyle:{
                    color:'#333',
                    fontWeight:'bolder'
                }
            },
            tooltip: {
                trigger: 'axis',
                axisPointer: {
                    type: 'shadow'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            yAxis: {
                type: 'category',
                boundaryGap: [0, 0.01],
                data: yarr
            },
            xAxis: {
                type: 'value',
               /* boundaryGap:false,*/
                 axisLabel: {
                    interval: 0
                }
            },
            series: [
                {
                    name: floatTitle,
                    type: 'bar',
                   data: xarr
                }
            ],
            color:color,
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
            ]
        };
          arr_new.push(arr[i]);
        }
        console.log('arr_new')
        console.log(arr_new)
        if(arr_new[0]&&arr_new[0].data&&arr_new[0].data.length&&arr_new[0].data.length>30){
          console.log('改了')
          self.style.height = '730px';
        }
        return arr_new;
      }
    },
    methods: {
      down_json(x,y) {
       return (parseFloat(x.click_num) > parseFloat(y.click_num)) ? 1 : -1
      } 
    },
    mounted () {
      console.log(this.btn)
      this.numHeight = this.$store.state.formMsg.pw>30?730:530;
      console.log('以下是rank的数据')
      this.list = this.$store.state.indexData.zhanshi_data;
      this.btn = this.list.length>0?(!this.btn):(this.btn);
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
