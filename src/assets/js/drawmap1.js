export default {
  install: function (Vue, options) {
     //添加的js内容写在这里面 
     console.log('map')
     Vue.doubleNumber = function (val) {
     	   console.log('这里可以引入外界的c')
     };
     Vue.setMap = function(map_type,dataVal){
      //data里面包含了多个系列
    alert('a1')
    console.log('a1')
    console.log(dataVal)
    var series_data=[];
    var max=0;
    var min=0;
    var num=20;
    var legend=[];
    for(var i =0;i<dataVal.length;i++){
        var obj = {
            name:dataVal[i][0].serie,
            type: 'map',
            mapType:map_type,
            data: dataVal[i],
            symbolSize: 12,
            label: {
                normal: {
                    formatter:'{b}',
                    position:'right',
                    show: false
                },
                emphasis: {
                    show: false
                }
            },
            itemStyle:{
                normal:{
                    borderColor:'rgba(100,149,237,1)',
                    borderWidth:1.5,
                    areaStyle:{
                        color: '#1b1b1b'
                    }
                }
            },
             data : [],
             markPoint : {
                symbolSize: 2,
                large: true,
                effect : {
                    show: true
                },
                data : (function(){
                    var data = [];
                    var len = dataVal[i].length;
                    var geoCoord
                    while(len--) {
                        data.push({
                            name : dataVal[i][len].name,
                            value : (dataVal[i][len].value)[2],
                            geoCoord : [
                                (dataVal[i][len].value)[0] + Math.random() * 5 - 2.5,
                                (dataVal[i][len].value)[1] + Math.random() * 3 - 1.5
                            ]
                        })
                    }
                    return data;
                })()
            }
        };
        num+=20;
        obj.name = dataVal[i][0].serie;
        legend.push(dataVal[i][0].serie);
        series_data.push(obj);
        for(var k =0;k<dataVal[i].length;k++){
            var n = dataVal[i][k].value[2];
            max = Math.max(max,n);
            min = Math.min(min,n);
        }
    };
  
    var option={
        backgroundColor: '#1b1b1b',
        title: {
            text: '签到地域分布图',
            x:'center',
            textStyle: {
                color: '#111'
            }
        },
        color: ['#00f0ff', '#ffd200', '#f00'],
        legend:{
                orient: 'vertical',
                x:'left',
                data:legend,
                textStyle : {
                    color: '#f00'
                }
        },
        /*tooltip: {
            trigger: 'item',
            formatter: function (params) {
                return params.name + ' : ' + params.value[2];
            }
        },*/
        /*visualMap: {
            min: min,
            max: max,
            calculable: true,
            inRange: {
                color: ['#00f0ff', '#ffd200', '#f00']
            },
            textStyle: {
                color: '#111'
            }
        },*/
        /*geo: {
            map: map_type,
            roam:true,
            label: {
                emphasis: {
                    show: false
                }
            },
            itemStyle: {
                normal: {
                    areaColor: '#cfcfcf',
                    borderColor: '#111'
                },
                emphasis: {
                    areaColor: '#c6deff'
                }
            }
        },*/
           series: series_data,
           graphic: [
                {
                    type: 'image',
                    id: 'logo',
                    left: '30%',
                    top: 150,
                    z:5,
                    bounding: 'raw',
                    origin: [75, 75],
                    style: {
                        image: '/static/images/logo.png',
                        width: 249,
                        height: 36,
                        opacity: 0.3
                    }
                }
          ]
        };
        console.log('option obj')
        console.log(option)
        return option;
   }
     //Vue.prototype.doubleNumber = new doubleNumber();
  }
};
