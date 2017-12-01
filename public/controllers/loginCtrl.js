"use strict";
var app = angular.module('Stick_notes');
app.controller('loginCtrl', ['$scope','$http','$state', function($scope,$http,$state){
	//var $ctrl = this ;
	$scope.eroor = false ;
	$scope.logn = {};
	
	// $scope.onSignUp = function () {
	// 	if ($scope.regis.newpass == $scope.regis.conf_pass) {
	// 	var data1 = {
	// 		userame : $scope.regis.new_user_Name,
	// 		name : $scope.regis.name ,
	// 		password : $scope.regis.newpass ,
	// 		confPass : $scope.regis.conf_pass ,
	// 		emailID : $scope.regis.new_mail	
	// 		};
	// 	$http.post('/register',data1).then(function(response) {
	// 		console.log("Sucess");
	// 		$state.go('home');
	// 	},function(response) {
	// 		console.log('Failed');
	// 	});
	// 	}
	// }
	$scope.onLogin = function () {
		if ($scope.logn.user_Name === '' || $scope.logn.password === '' ) {
			$scope.eroor = true ;
		}else{
				$scope.eroor = false;
				var data = {
								username : $scope.logn.user_Name,
								password : $scope.logn.password ,
							};
				$http.post('/login',data).then(function (response) {
					console.log("Login Sucessful");
					$state.go('home',({user_Name : $scope.regis.new_user_Name}));

					},function (response){
						console.log('Failed');	
					})
		}
	}
}]);
app.controller('registerCtrl', ['$scope','$http','$state', function($scope,$http,$state){
	$scope.regis= {};
	$scope.regis = {
		user_Name : "",
		new_user_Name : "",
		name : "",
		password : "",
		newpass :"",
		conf_pass : "",
		new_mail : ""
 	} ;
	$scope.onSignUp = function () {
		if ($scope.regis.newpass == $scope.regis.conf_pass) {
		var data1 = {
			username : $scope.regis.new_user_Name,
			name : $scope.regis.name ,
			password : $scope.regis.newpass ,
			confPass : $scope.regis.conf_pass ,
			emailID : $scope.regis.new_email	
			};
		$http.post('/register',data1).then(function(response) {
			console.log("Sucess");
			console.log(response.data.msg);
			$state.go('home',({user_Name : $scope.regis.new_user_Name}));
		},function(response) {
			console.log('Failed');
		});
		}
	}
}])