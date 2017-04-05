
export default {
  install: function (Vue, options) {
     //添加的js内容写在这里面 
     console.log('map')
     Vue.doubleNumber = function (val) {
     	   console.log('这里可以引入外界的c')
     };
     Vue.setMap = function(map_type,data){
    //data格式[{name:'海门',value:[121.15,31.89,275]},
    // {name:'鄂尔多斯',value=[109.781327,39.608266,12,556]},
    // {name:'招远',value:[120.38,37.35,146]},
    // {name:'舟山',value:[122.207216,29.985295,57]},
    // {name:'鄂尔多斯',value:[109.781327,39.608266,152]},
    // {name:'清华',value:[116.32697,40.0036,112]},
    // {name:'北京站',value:[116.39772,39.90323,112]},
    // {name:'天安门',value:[116.321136,39.894994,112]},
    // {name:'平谷京东',value:[117.17093,40.24059]}
    //]
    //map_type是指 china,beijing,shanghai,shanxi,.....拼音为了对应着调入json地图数据
     
    //data里面包含了多个系列
    alert('a1')
    console.log(data)
    var series_data=[];
    var max=0;
    var min=0;
    for(var i =0;i<data.length;i++){
        var obj = {
            type: 'scatter',
            coordinateSystem: 'geo',
            data: data[i],
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
            itemStyle: {
                emphasis: {
                    borderColor: '#fff',
                    borderWidth: 1
                }
            }
        };
        obj.name = data[i][0].serie;
        series_data.push(obj);
        for(var k =0;k<data[i].length;k++){
            var n = data[i][k].value[2];
            max = Math.max(max,n);
            min = Math.min(min,n);
        }
    };
    $.get('../static/city_json/'+map_type+'.json', function (chinaJson) {
        echarts.registerMap(map_type, chinaJson);
        var option={
        title: {
            text: '签到地域分布图',
            x:'center',
            textStyle: {
                color: '#111'
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: function (params) {
                return params.name + ' : ' + params.value[2];
            }
        },
        visualMap: {
            min: min,
            max: max,
            calculable: true,
            inRange: {
                color: ['#00f0ff', '#ffd200', '#f00']
            },
            textStyle: {
                color: '#111'
            }
        },
        geo: {
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
        },
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
                        image: '../static/images/logo.png',
                        width: 249,
                        height: 36,
                        opacity: 0.3
                    }
                }
            ]
        };
        console.log(option)
        return option;
    });
   };
     //Vue.prototype.doubleNumber = new doubleNumber();
  }
};
