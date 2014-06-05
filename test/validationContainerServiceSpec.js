describe('validationContainerService test', function () {

	var configProvider;

	/// providerMethods
	describe("",function(){	
		it('', function(){

			var fakeApp = angular.module('fakeApp',[]);

			fakeApp.config(['validationContainerServiceProvider',function (validationContainerServiceProvider){
				configProvider=validationContainerServiceProvider;
			}]);

			angular.mock.module('fakeApp');

			inject(function(){});
		});
	});

	/// extractValidations
	describe("when a control doesnt have any validation set, the method 'extractValidations'",function(){	
		it('should return an empty array',function(){

			// Arrange
			var $injector =angular.injector(['ng','ngValidationSummary']);
			var validationContainerService = $injector.get('validationContainerService');

			// Act
			var ctrl = { $error:{} };
			var validations = validationContainerService.extractValidations(ctrl);

			//Assert
			expect(validations).toEqual([]);

		});

	});

	describe("when a control just contains a 'required' validation, the method 'extractValidations'",function(){	
		it('should return an an array containing the corresponding item',function(){

			// Arrange
			var $injector =angular.injector(['ng','ngValidationSummary']);
			var validationContainerService = $injector.get('validationContainerService');

			// Act
			var ctrl = { $error:{required:true} };
			var validations = validationContainerService.extractValidations(ctrl);

			//Assert
			var expectedExtractedValidations = [{validationType:'required',passValidation:false}];
			expect(validations).toEqual(expectedExtractedValidations);

		});

	});

	describe("when a control contains a 'required' and 'pattern' validations, the method 'extractValidations'",function(){	
		it('should return an an array containing the corresponding items',function(){

			// Arrange
			var $injector =angular.injector(['ng','ngValidationSummary']);
			var validationContainerService = $injector.get('validationContainerService');

			// Act
			var ctrl = { $error:{required:true, pattern:true} };
			var validations = validationContainerService.extractValidations(ctrl);

			//Assert
			var expectedExtractedValidations = [{validationType:'required',passValidation:false},{validationType:'pattern', passValidation:false}];
			expect(validations).toEqual(expectedExtractedValidations);

		});

	});

	describe("when a control contains a 'required', 'pattern' and 'minlength' validations, the method 'extractValidations'",function(){	
		it('should return an an array containing the corresponding items',function(){

			// Arrange
			var $injector =angular.injector(['ng','ngValidationSummary']);
			var validationContainerService = $injector.get('validationContainerService');

			// Act
			var ctrl = { $error:{required:true, pattern:true, minlength:false} };
			var validations = validationContainerService.extractValidations(ctrl);

			//Assert
			var expectedExtractedValidations = [{validationType:'required',passValidation:false},{validationType:'pattern', passValidation:false}, {validationType:'minlength', passValidation:true}];
			expect(validations).toEqual(expectedExtractedValidations);

		});

	});

	describe("when a control contains a 'required', 'pattern', 'minlength' and 'maxlength' validations, the method 'extractValidations'",function(){	
		it('should return an an array containing the corresponding items',function(){

			// Arrange
			var $injector =angular.injector(['ng','ngValidationSummary']);
			var validationContainerService = $injector.get('validationContainerService');

			// Act
			var ctrl = { $error:{required:true, pattern:true, minlength:false, maxlength:true} };
			var validations = validationContainerService.extractValidations(ctrl);

			//Assert
			var expectedExtractedValidations = 
			[
			{validationType:'required',	passValidation:false},
			{validationType:'pattern', 	passValidation:false}, 
			{validationType:'maxlength',passValidation:false},
			{validationType:'minlength',passValidation:true}
			];
			expect(validations).toEqual(expectedExtractedValidations);

		});

	});

	describe("when a control contains a undefined validation error, the method 'extractValidations'",function(){	
		it('should return an empty array',function(){

			// Arrange
			var $injector =angular.injector(['ng','ngValidationSummary']);
			var validationContainerService = $injector.get('validationContainerService');

			// Act
			var ctrl = { $error:{required:undefined} };
			var validations = validationContainerService.extractValidations(ctrl);

			//Assert
			expect(validations).toEqual([]);

		});

	});

	describe("when a control contains an undefined and a defined validation error, the method 'extractValidations'",function(){	
		it('should return an array containg the corresponding item to the defined validation',function(){

			// Arrange
			var $injector =angular.injector(['ng','ngValidationSummary']);
			var validationContainerService = $injector.get('validationContainerService');

			// Act
			var ctrl = { $error:{required:undefined, maxlength:true} };
			var validations = validationContainerService.extractValidations(ctrl);

			//Assert
			var expectedExtractedValidations = 
			[
			{validationType:'maxlength',passValidation:false}
			];
			expect(validations).toEqual(expectedExtractedValidations);

		});

	});

	describe("when a control contains a defined and an undefined validation error, the method 'extractValidations'",function(){	
		it('should return an array containg the corresponding item to the defined validation',function(){

			// Arrange
			var $injector =angular.injector(['ng','ngValidationSummary']);
			var validationContainerService = $injector.get('validationContainerService');

			// Act
			var ctrl = { $error:{required:true, maxlength:undefined} };
			var validations = validationContainerService.extractValidations(ctrl);

			//Assert
			var expectedExtractedValidations = 
			[
			{validationType:'required',passValidation:false}
			];
			expect(validations).toEqual(expectedExtractedValidations);

		});

	});

	describe("when validationbuble has been defined to a DOM element that doesnt contain a $error property",function(){	
		it('should return an empty array and a WARN message',function(){

			// Arrange
			var $injector =angular.injector(['ng','ngValidationSummary']);
			var validationContainerService = $injector.get('validationContainerService');

			// Act
			var ctrl = { };
			var validations = validationContainerService.extractValidations(ctrl);

			//Assert
			var expectedExtractedValidations = [];
			expect(validations).toEqual(expectedExtractedValidations);

		});

	});
	
});