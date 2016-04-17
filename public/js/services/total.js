angular.module('totalService', [])

	// super simple service
	// each function returns a promise object 
	.factory('total', ['$http',function($http) {
		return {
			get : function() {
				return $http.get('/api/total');
			}
		}
	}]);