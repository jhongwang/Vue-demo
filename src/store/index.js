/**
 * Created by an.han on 16/10/15.
 * 总存储器
 */

export default {
  state: {
    formMsg: {
       city:'全国',
       citycode:'000',
       curcityarr:[{name:'全国',code:'000'}],
       wd:'请选择维度',
       yw:0,
       rq:'',
       sd:0,
       pw:20,
       sq:'',
       ctype:10,  //citybox的选项单选1多选10
       cbtn:false //citybox的显示
    },
    poiData:['apple','banana','orange'],
    cateData:['apple','banana','orange'],
    cityData:['apple','banana','orange']
  },
  mutations: {
    ChangeFormMsg (state,obj) {
       for(var o in obj){
         state.formMsg[o] = obj[o] || '';
       }
    },
    ChangeFormMsgOnly(state,o,value){
       state.formMsg[o] = value;
    }
    /*MESSAGE (state, value) {
      state.message = value || state.message;
    },
    Todo (state, value) {
    	state.todoList.push(value);
    }*/
  }
}