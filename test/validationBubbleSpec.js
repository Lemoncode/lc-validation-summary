describe('validationBubble test', function () {

	var element;
	var $scope;

	beforeEach(function(){
		module("app");
		inject(function($compile, $rootScope){
			$scope = $rootScope;
			element=angular.element("<div>{{2+2}}</div>")
			$compile(element)($rootScope)

		})

	});

	it("should equal 4", function(){
		$scope.$digest();
		expect(element.html()).toEqual("4");

	})

	// describe("when a control doesnt have any validation set, the method 'extractValidations'",function(){	
	// 	it('should return an empty array',function(){

	// 		// Arrange
	// 		var $injector =angular.injector(['ng','ngValidationSummary']);
	// 		var validationContainerService = $injector.get('validationContainerService');

	// 		// Act
	// 		var ctrl = { $error:{} };
	// 		var validations = validationContainerService.extractValidations(ctrl);

	// 		//Assert
	// 		expect(validations).toEqual([]);

	// 	});

	// });

});