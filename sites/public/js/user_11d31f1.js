var gatherModule=angular.module("GatherModule",["ui.router","MainModule"]);gatherModule.config(["$stateProvider","$urlRouterProvider",function(e,t){t.otherwise("/index"),e.state("index",{url:"/index",views:{"":{templateUrl:"tpls/main.html"},"choosePanel@index":{templateUrl:"tpls/choosePanel.html"},"contents@index":{templateUrl:"tpls/contents.html"}}})}]);
;var mainModule=angular.module("MainModule",[]);mainModule.factory("choosesData",["$http",function(e){var t=0,n=[{name:"ZD423",ischecked:!0,detail:"专注绿软，分享软件、传递最新软件资讯",href:"http://www.zdfans.com/",site:"zd"},{name:"CCAV",ischecked:!0,detail:"Yanu - 分享优秀、纯净、绿色、实用的精品软件",href:"http://www.ccav1.com/",site:"ccav"},{name:"llm",ischecked:!0,detail:"浏览迷(原浏览器之家)是一个关注浏览器及软件、IT的科技博客,致力于为广大浏览器爱好者提供一个关注浏览器、交流浏览器、折腾浏览器的专门网站",href:"http://liulanmi.com/",site:"llm"},{name:"qiuquan",ischecked:!0,detail:"专注于软件的绿化、精简与打包，承接 Inno Setup 安装包定制",href:"http://www.qiuquan.cc/",site:"qiuquan"},{name:"爱Q生活网",ischecked:!0,detail:"爱Q生活网 - 亮亮'blog -关注最新QQ活动动态, 掌握QQ第一资讯",href:"http://www.iqshw.com/",site:"iqq"}];return{hadChooses:[],getAllSitesChoose:function(){return n},setTimeSelect:function(e){t=e},getTimeSelect:function(){return t},saveChooses:function(){for(var e={},t=0,o=n.length;o>t;t++)n[t].ischecked&&(e[n[t].site]=!0);localStorage.setItem("shang_chooses",JSON.stringify(e))},getData:function(t,n,o){this.saveChooses(),n?e.get("getlatest").success(function(e){try{t&&t(e)}catch(n){}}).error(function(e){}):(o=o||0,e.get("getinfo?start="+o).success(function(e){try{t&&t(e)}catch(n){}}).error(function(e){}))},getUpdateTime:function(t){e.get("getupdatetime").success(function(e){t(e.time)}).error(function(){t(0)})}}}]),mainModule.controller("ChooseCtrl",["$rootScope","$scope","choosesData",function(e,t,n){t.ishow=!1,t.changeShow=function(){t.ishow=!t.ishow},t.forceUpdate=function(){e.$broadcast("force.update")},t.$on("force.update.end",function(){n.getUpdateTime(function(e){t.updateTime=e})}),t.getData=function(){e.$broadcast("info.update"),n.getUpdateTime(function(e){t.updateTime=e})},t.selectValue={value:0,str:"不限"},t.dataChooses=[{value:0,str:"不限"},{value:1,str:"1天内"},{value:2,str:"2天内"},{value:3,str:"3天内"},{value:5,str:"5天内"}],t.selectChange=function(){n.setTimeSelect(t.selectValue)},t.CheckChange=function(){n.saveChooses()},t.updateTime=0,n.getUpdateTime(function(e){t.updateTime=e});var o=null;try{o=JSON.parse(localStorage.getItem("shang_chooses")).data}catch(a){o=null}if(o){for(var i=n.getAllSitesChoose(),c=0,s=i.length;s>c;c++)i[c].ischecked=o.hasOwnProperty(i[c].site);t.hadChooses=i}else t.hadChooses=n.getAllSitesChoose();n.saveChooses()}]),mainModule.controller("contentsCtrl",["$scope","$rootScope","$http","choosesData",function(e,t,n,o){var a=0;e.contents=[],e.isloading=!0,e.addMoreInfo="加载更多~",o.getData(function(t){e.contents=t,a+=t.length,e.isloading=!1}),e.addMore=function(){o.getData(function(t){0===t.length?e.addMoreInfo="没有更多了~":(a+=t.length,e.contents=e.contents.concat(t),e.isloading=!1)},!1,a)},e.$on("info.update",function(){e.isloading=!0,o.getData(function(t){e.contents=t,a=t.length,e.addMoreInfo="加载更多~",e.isloading=!1})}),e.$on("force.update",function(){e.isloading=!0,o.getData(function(n){e.contents=n,e.isloading=!1,t.$broadcast("force.update.end")},!0)})}]),mainModule.filter("imgUrlChange",function(){return function(e){return e&&-1!==e.indexOf("zdfans")?"getImg?imgurl="+encodeURIComponent(e):e}}),mainModule.filter("timeFilter",["choosesData",function(e){return function(t){var n=e.getTimeSelect()||0,o=new Date,a=[];if(0===n)return t;n=24*n*60*60*1e3;for(var i=0;i<t.length;i++){var c=t[i];o-new Date(c.time)<n&&a.push(c)}return a}}]),mainModule.filter("contentFilter",["choosesData",function(e){return function(t){for(var n=e.getAllSitesChoose(),o={},a=0,i=n.length;i>a;a++)n[a].ischecked&&(o[n[a].site]=!0);var c=[];for(a=0;a<t.length;a++)o.hasOwnProperty(t[a].site)&&c.push(t[a]);return c}}]),mainModule.filter("updateTimeFilter",["$filter",function(e){return function(t){return t?e("date")(t,"yy-MM-dd HH:mm"):"未知时间"}}]);