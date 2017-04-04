/**
 * @file
 * Created by hanan on 16/10/15.
 */
const Poi = r => require(['views/poi'], r);
const Cate = r => require(['views/cate'], r);
const City = r => require(['views/city'], r);
const PoiChoose = r => require(['views/poichoose'], r);
const PoiRank = r => require(['views/poirank'], r);
const PoiDistribute = r => require(['views/poidistribute'], r);
const PoiUser = r => require(['views/poiuser'], r);
const PoiChange = r => require(['views/poichange'], r);
const NotFound = r => require(['views/notfound'], r);

// 根目录
const rootPath = '';

// 页面路由
const routes = [
  {
  	 path: '/poi', component: Poi,
  	 children:[
        {path:'/',component:PoiChoose,name:'/poi/choose'},
        {path:'choose',component:PoiChoose},
        {path:'rank',component:PoiRank},
        {path:'distribute',component:PoiDistribute},
        {path:'user',component:PoiUser},
        {path:'change',component:PoiChange}
     ]
  },
  {path: '/cate', component: Cate, name: '/cate'},
  {path: '/city', component: City, name: '/city'},
  {path: '*', redirect: {name: '/poi/choose'}},
].map(route => {
  route.path = rootPath + route.path;
  return route;
});

// 404 页
routes.push({path: '*', component: NotFound, name: 'notfound'});

export default routes;
