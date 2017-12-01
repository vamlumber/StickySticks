var app = angular.module('Stick_notes');

app.controller('noteCtrl', ['$scope','$http','$state','$stateParams',function($scope,$http,$state,$stateParams){
	$scope.username = $stateParams.user_Name;
	$scope.reset= function () {
		$scope.new_title = '';
		$scope.new_type = '' ;
		$scope.new_note = '';
	}
	$scope.logout = function () {
		$http.get('/logout').then(function(response) {
			$state.go('login');
		},function (response) {
			console.log("Failed");
		})	
	}
}]);

