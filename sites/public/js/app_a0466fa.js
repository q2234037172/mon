var gatherModule=angular.module("GatherModule",["ui.router","MainModule"]);gatherModule.config(["$stateProvider","$urlRouterProvider",function(e,t){t.otherwise("/index"),e.state("index",{url:"/index",views:{"":{templateUrl:"tpls/main.html"},"choosePanel@index":{templateUrl:"tpls/choosePanel.html"},"contents@index":{templateUrl:"tpls/contents.html"}}})}]);