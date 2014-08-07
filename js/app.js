

var myCustomers = angular.module('myCustomers', []);

myCustomers.factory('CustomerFactory', function() {
	var factory = {};
	var customers = [
		// {name: 'Michael Choi', created_at: 'April 3rd 2014'},
		// {name: 'John Supsupin', created_at: 'April 3rd 2014'},
		// {name: 'Trey Villafane', created_at: 'April 1st 2014'},
		// {name: 'India Meisner', created_at: 'March 15th 2014'}
	];
	factory.getCustomers = function() {
		return customers;
	}
	factory.addNewCustomer = function(name) {
		if(name == null) {
			var error = 'Customer name is a required field.';
			return error;
		} else {
			var flag = false;
			for (var i = 0; i < customers.length; i++) {
				if(customers[i].name == name) {
					flag = true;
				}
			};
			if(!flag) {
				customers.push({
					name: name,
					created_at: new Date().getTime()
				})
			} else {
				var error = 'A customer with the name, '+name+', already exists.';
				return error;
			}
		}
	}
	factory.removeCustomer = function(item) {
		var index = customers.indexOf(item);
		customers.splice(index,1);
	}
	return factory;
})

myCustomers.controller('customersController', function($scope, CustomerFactory) {
	$scope.customers = CustomerFactory.getCustomers();
	$scope.addNewCustomer = function() {
		$scope.data = CustomerFactory.addNewCustomer($scope.new_customer);
	}
	$scope.removeCustomer = function(name) {
		CustomerFactory.removeCustomer(name);
	}
})