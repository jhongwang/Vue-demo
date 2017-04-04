
export default {
  install: function (Vue, options) {
     //添加的js内容写在这里面	
     var c = 'ccc'; //局部变量 √
     function a(n){
     	alert('a函数 内部变量 √');
     	return n+1;
     };
     Vue.doubleNumber = function (val) {
     	   console.log('这里可以引入外界的c')
		    if (typeof val === 'number') {
		        return val*2+1;
		    } else if (!isNaN(Number(val))) {
		        return Number(val) * 2;
		    } else {
		        return null
		    }
     };
     //Vue.prototype.doubleNumber = new doubleNumber();
  }
};
