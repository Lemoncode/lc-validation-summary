// validationContainerService test
describe('validationContainerService test', function () {

	var $injector;
	var validationContainerService;

	beforeEach(function(){
		$injector =angular.injector(['ng','ngValidationSummary']);
		validationContainerService = $injector.get('validationContainerService');
	});

	/// extractValidations
	it("when a control doesnt have any validation set, the method 'extractValidations' should return an empty array",function(){	
			//Arrange

			// Act
			var ctrl = { $error:{} };
			var validations = validationContainerService.extractValidations(ctrl);

			//Assert
			expect(validations).toEqual([]);

		});

	it("when a control just contains a 'required' validation, the method 'extractValidations' should return an an array containing the corresponding item",function(){	
			// Arrange

			// Act
			var ctrl = { $error:{required:true} };
			var validations = validationContainerService.extractValidations(ctrl);

			//Assert
			var expectedExtractedValidations = [{validationType:'required',passValidation:false}];
			expect(validations).toEqual(expectedExtractedValidations);

		});

	it("when a control contains a 'required' and 'pattern' validations, the method 'extractValidations' should return an an array containing the corresponding items",function(){	
			// Arrange

			// Act
			var ctrl = { $error:{required:true, pattern:true} };
			var validations = validationContainerService.extractValidations(ctrl);

			//Assert
			var expectedExtractedValidations = [{validationType:'required',passValidation:false},{validationType:'pattern', passValidation:false}];
			expect(validations).toEqual(expectedExtractedValidations);

		});
	
	it("when a control contains a 'required', 'pattern' and 'minlength' validations, the method 'extractValidations' should return an an array containing the corresponding items",function(){
			// Arrange

			// Act
			var ctrl = { $error:{required:true, pattern:true, minlength:false} };
			var validations = validationContainerService.extractValidations(ctrl);

			//Assert
			var expectedExtractedValidations = [{validationType:'required',passValidation:false},{validationType:'pattern', passValidation:false}, {validationType:'minlength', passValidation:true}];
			expect(validations).toEqual(expectedExtractedValidations);

		});

	it("when a control contains a 'required', 'pattern', 'minlength' and 'maxlength' validations, the method 'extractValidations' should return an an array containing the corresponding items",function(){
			// Arrange

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


	it("when a control contains a undefined validation error, the method 'extractValidations' should return an empty array",function(){
			// Arrange

			// Act
			var ctrl = { $error:{required:undefined} };
			var validations = validationContainerService.extractValidations(ctrl);

			//Assert
			expect(validations).toEqual([]);
		});

	it("when a control contains an undefined and a defined validation error, the method 'extractValidations' should return an array containg the corresponding item to the defined validation",function(){
			// Arrange

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


	it("when a control contains a defined and an undefined validation error, the method 'extractValidations' should return an array containg the corresponding item to the defined validation",function(){
			// Arrange

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


	it('should return an empty array and a WARN message when validationbuble has been defined to a DOM element that doesnt contain a $error property',function(){
			// Arrange

			// Act
			var ctrl = { };
			var validations = validationContainerService.extractValidations(ctrl);

			//Assert
			var expectedExtractedValidations = [];
			expect(validations).toEqual(expectedExtractedValidations);
		});	
});
// #ValidationContainerService test 

// =validationContainerServiceProvider test
describe("validationContainerService Provider test", function(){
	var configProvider;
	var validationService;

	beforeEach(function(){
		angular.mock.module('ngValidationSummary');

		module(function(validationContainerServiceProvider){
			configProvider=validationContainerServiceProvider;
		});
		inject(function ($log, validationContainerService){
			validationService = validationContainerService;
		});
	});
	
	it('when configuring the validationContainerService to not to have any supportedValidation initially, the method extractValidations should return an empty array when the control where it was defined has validations set', function(){
			//Arrange
			
			//Act
			var ctrl = { $error:{required:true, pattern:true, minlength:false, maxlength:true} };
			configProvider.removeDefaultSupportedValidations();
			var validations = validationService.extractValidations(ctrl);
			
			expect(validations).toEqual([]);
		});
	
	it('when adding a custom validation to the validationContainerService, the method extractValidations should return an array containgin the custom validation', function(){
			//Arrange

			//Act
			var ctrl = { $error:{checktwofieldsmatch:true} };
			configProvider.addValidation({type: 'checktwofieldsmatch', friendlyDescription: 'The fields must match'});
			var validations = validationService.extractValidations(ctrl);
			var expectedExtractedValidations = 
			[
			{validationType:'checktwofieldsmatch',passValidation:false}
			];
			expect(validations).toEqual(expectedExtractedValidations);
		});

	it("when adding a custom validation and setting this one plus a 'required' validation to an element should return an array containgin the custom and the 'required' validation", function(){
			//Arrange

			//Act
			var ctrl = { $error:{required:true, checktwofieldsmatch:true} };
			configProvider.addValidation({type: 'checktwofieldsmatch', friendlyDescription: 'The fields must match'});
			var validations = validationService.extractValidations(ctrl);
			var expectedExtractedValidations = 
			[
			{validationType:'required',passValidation:false},
			{validationType:'checktwofieldsmatch',passValidation:false}
			];
			expect(validations).toEqual(expectedExtractedValidations);
		});

	it("when adding an invalid validation item should return an empty array", function(){
			//Arrange

			//Act
			var ctrl = { $error:{invalidValidationName:true} };
			configProvider.addValidation({invalidValidation:'invalidValidationName'});
			var validations = validationService.extractValidations(ctrl);

			//Assert
			expect(validations).toEqual([]);
		});
	
	//buildValidationSummaryEntry
	
	it("when adding a custom validation, the metod 'buildValidationSummaryEntry' should return a correctly built item", function(){
			//Arrange
			var validationKey="checktwofieldsmatch$ctrltest";
			var controlFriendlyName= "inputTest";
			var validation="checktwofieldsmatch";
			var customErrorDirective="checktwofieldsmatch";
			var customErrorMessage="The fields must match";

			//Act                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   
			configProvider.addValidation({type: 'checktwofieldsmatch', friendlyDescription: 'The fields must match'});
			var item=validationService.buildValidationSummaryEntry(validationKey,controlFriendlyName, validation, customErrorDirective, customErrorMessage);

			//Assert
			var expetedItem={key:"checktwofieldsmatch$ctrltest", errorMessage:"The fields must match"};
			expect(item).toEqual(expetedItem);
		});

});
// #validationContainerServiceProvider test 