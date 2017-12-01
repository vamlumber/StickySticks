var app = angular.module('Stick_notes', ["ui.router"]);

app.config(['$stateProvider','$urlRouterProvider','$locationProvider',function($stateProvider,$urlRouterProvider,$locationProvider) {
	$locationProvider.hashPrefix('');
	$urlRouterProvider.otherwise("/");
	$stateProvider
	.state('home',{
		url : '/note' ,
		templateUrl : 'views/notes.html',
		controller : 'noteCtrl'
	})
	.state('login',{
		url : '/' ,
		templateUrl : 'views/login.html' ,
		controller : 'loginCtrl'
	})
	.state('register',{
		url : '/register' ,
		templateUrl : 'views/register.html' ,
		controller : 'registerCtrl'
	})
}]);



