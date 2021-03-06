
export default {
  install: function (Vue, options) {
     //添加的js内容写在这里面 
     console.log('map')
     Vue.doubleNumber = function (val) {
     	   console.log('这里可以引入外界的c')
     };
     Vue.setMap = function(map_type,data){

    alert('a1')
    console.log('a1')
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
                        image: '/static/images/logo.png',
                        width: 249,
                        height: 36,
                        opacity: 0.3
                    }
                }
            ]
        };
        console.log(option)
        return option;
   };
     //Vue.prototype.doubleNumber = new doubleNumber();
  }
};
