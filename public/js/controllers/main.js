angular.module('foodController', [])

	// inject the food service factory into our controller and the total service controller
	
	.controller('mainController', ['$scope','$http','foods','total',function($scope, $http, foods,total) {
		$scope.formData = {};
		$scope.loading = true;

		// GET =====================================================================
		// when landing on the page, get all foods and show them
		// use the service to get all the foods
			
			foods.get()
				.success(function(data) {
					$scope.foods = data;
					$scope.loading = false;
				});

				
		// CREATE ==================================================================
		// when submitting the add form, send the text to the node API
		
			$scope.createfood = function() {

			// validate the formData to make sure that something is there
			// if form is empty, nothing will happen
			
			if ($scope.formData.text != undefined) {
					if($scope.formData.price)
					$scope.loading = true;

					// call the create function from our service (returns a promise object)
					foods.create($scope.formData)

					// if successful creation, call our get function to get all the new foods
					.success(function(data) {
						$scope.loading = false;
						$scope.formData = {}; // clear the form so our user is ready to enter another
						$scope.foods = data; // assign our new list of foods
					});
				}
					else {
						alert(" Can you cook something which is not there, mate ?"); // handles empty formData
					}
			};


		// DELETE ==================================================================
		// delete a food after checking it
		
			$scope.deletefood = function(id) {
			$scope.loading = true;

			foods.delete(id)
				// if successful creation, call our get function to get all the new foods
				.success(function(data) {
					$scope.loading = false;
					$scope.totalVAT = false;
					$scope.foods = data; // assign our new list of foods
					/*if(data == 0){
						$scope.totalVAT = false;
					}*/
				});
		};
// get the total food price including the vat
			
			$scope.createtotal = function(){
				total.get()
				.success(function(data)
					{
						if(data == 0){
							alert("Can't Total nothing, enter something nice to eat");
						}
						else{
							$scope.total = data;
							$scope.totalVAT = true;
							console.log(data);
							$scope.loading = false;
				
						}
					});
			
			};
			
// To delete the Current Users Cart and Move to the Next order , we dont maintain the previous users session
		
		$scope.deleteall = function(){
			if($scope.foods == 0){
				alert("cant go to next order, this one is empty");
			}
			foods.get().success(function(data)
			{	
				$scope.foods = data;
					for(var i=0;i<data.length;i++){
					{
					foods.delete(data[i]._id);
					}
			}
			$scope.foods ={};
			});
			$scope.totalVAT = false;
		};
}]);