var standardApp = angular.module('standardApp', [
    'ngRoute',
    'ui.bootstrap',
	'ngAnimate'
]);

standardApp.directive('ngTabs', function() {
   return function(scope, elm) {
      setTimeout(function() {
        elm.tabs();
      },0);
   };
});

standardApp.directive('settingTabs', function() {
    return {
        restrict: 'A',
        link: function(scope, elm, attrs) {
            var jqueryElm = $(elm[0]);
            $(jqueryElm).tabs()
        }
    };
});


/* Routing logic of the app */
standardApp.config(['$routeProvider', function($routeProvider){
	
	var src_dir="app/pages/";
	
	$routeProvider
		.when('/',{templateUrl: src_dir +'home.html',
			controller:"homeCtrl"})
		.when('/history', {
						templateUrl: src_dir +'history.html'
			})
		.when('/settings', {
			templateUrl: src_dir+'settings.html',
			controller:"settingsCtrl"
			})
	;
}]);
// Routing logic ends


// HTML Head Controller
standardApp.controller("headController",function($scope, $http){

$scope.title = "Falcon ";

});

// HTML Navigation Controller
standardApp.controller("NavController", function($scope, $http){

	$scope.search_title="Go";
	
	$scope.menuItems = [{"name":"Home", "url": "/", "onClick":"home"},		
						{"name":"History", "url": "history" , "onClick":"history"},
						{"name":"Settings", "url": "settings", "onClick":"settings"}
					   ];
	
	$scope.settings = function(){ };
});


//Any Specific controller for the App
// Settings Controller
standardApp.controller("settingsCtrl", function($scope, $http){
	
	$scope.dataSources = [{ "folder" : "c:/windows/abcdef" },
					 { "folder" : "d:/backup" },
					 { "folder" : "d:/contents/books" }					 
					];
});

// Home Controller
standardApp.controller("homeCtrl", function($scope, $http){
	$scope.dataSourcesa = [{ "folder" : "c:/windows/abcdef" },
					 { "folder" : "d:/backup" },
					 { "folder" : "d:/contents/books" }					 
					];
	$scope.sq="";
	$scope.dataSources = "0";
	$scope.responseHeader = "";
	
	var host = "localhost"; // Solr running host
	var port = "8983"; // Solr running port 
	var applicaiton = "solr";  // Solr application name
	
	var collection = "gettingstarted"; //Name of the collection in solr

	var url = "http://" + host + ":" +port + "/" + applicaiton + "/" + collection +"/select?indent=on&q=" + $scope.sq + "&wt=json&callback=JSON_CALLBACK";
	
	//var url = "data.json"
	
	$scope.search = function() {
		
		url = "http://" + host + ":" +port + "/" + applicaiton + "/" + collection +"/select?indent=on&q=" + $scope.sq + "&wt=json&callback=JSON_CALLBACK";

		console.log("URL :" + url);
		
		$http({
			method:'GET',
			url: url,
			headers: {
			   'Content-Type': 'application/json'
			 }}).then(function(data, status, headers, config) {

			console.log(data);
			console.log("Status:" + data.status + " :" + data.statusText);
			
			
			$scope.dataSources = data.data;
			
			$scope.responseHeader = data.data.responseHeader;			

		}, function(data, status, headers, config) {
			//TODO : No data found needs to be shown in UI
          $scope.data = data.data || 'Request failed';
          $scope.status = data.status;
			console.log(" Error " + data.statusText);
			console.log("Status " + data.status);
      });
	}
	
function j_callback(){
		console.log("JSON Callback function");
	}		
});