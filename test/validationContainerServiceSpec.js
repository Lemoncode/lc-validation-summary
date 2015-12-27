// validationContainerService test
describe('validationContainerService test', function () {

  var $injector;
  var validationContainerService;

  beforeEach(function(){
    $injector =angular.injector(['ng','lcValidationSummary']);
    validationContainerService = $injector.get('validationContainerService');
  });

  it("when calling extractValidations passing an empty control,"+
    "it returns an empty array",function(){
    // Arrange
    var ctrl = { };

    // Act
    var validations = validationContainerService.extractValidations(ctrl);

    //Assert
    var expectedExtractedValidations = [];
    expect(validations).toEqual(expectedExtractedValidations);
  });

  it("when calling extractValidations passing a control with empty validation,"+
    "it returns an array with default validations (required, pattern, maxlength and minlength) ",function(){
    // Arrange
    var ctrl = { $error:{} };

    // Act
    var validations = validationContainerService.extractValidations(ctrl);

    //Assert
    expect(validations.length).toEqual(4);
    expect(validations[0].validationType).toEqual('required');
    expect(validations[1].validationType).toEqual('pattern');
    expect(validations[2].validationType).toEqual('maxlength');
    expect(validations[3].validationType).toEqual('minlength');
  });

  it("when calling extractValidations passing a control with empty validation,"+
    "it returns an array with default supported validations with passValidation equals true",function(){
    //Arrange
    var ctrl = { $error:{} };
    var allValidationsPassing = true;

    // Act
    var validations = validationContainerService.extractValidations(ctrl);

    //Assert
    var allValidationsPassing = _.every(validations, function(validation){
      return validation.passValidation;
    });

    expect(allValidationsPassing).toBeTruthy();
  });

  it("when calling extractValidations passing a control with 'required' validation equals undefined,"+
    "it returns an array with all default supported validations with passValidation equals true",function(){
    // Arrange
    var ctrl = { $error:{required:undefined} };

    // Act
    var validations = validationContainerService.extractValidations(ctrl);

    //Assert
    var allValidationsPassing = _.every(validations, function(validation){
      return validation.passValidation;
    });

    expect(allValidationsPassing).toBeTruthy();
  });

  it("when calling extractValidations passing a control with 'required' validation equals null,"+
    "it returns an array with all default supported validations with passValidation equals true",function(){
    // Arrange
    var ctrl = { $error:{required:null} };

    // Act
    var validations = validationContainerService.extractValidations(ctrl);

    //Assert
    var allValidationsPassing = _.every(validations, function(validation){
      return validation.passValidation;
    });

    expect(allValidationsPassing).toBeTruthy();
  });

  it("when calling extractValidations passing a control with 'required' validation equals false,"+
    "it returns an array with all default supported validations with passValidation equals true",function(){
    // Arrange
    var ctrl = { $error:{required:false} };

    // Act
    var validations = validationContainerService.extractValidations(ctrl);

    //Assert
    var allValidationsPassing = _.every(validations, function(validation){
      return validation.passValidation;
    });

    expect(allValidationsPassing).toBeTruthy();
  });

  it("when calling extractValidations passing a control with 'required' validation,"+
    "it returns an array with all default supported validations with passValidation equals true,"+
    "except required validation with passValidation equals false",function(){
    // Arrange
    var ctrl = { $error:{required:true} };

    // Act
    var validations = validationContainerService.extractValidations(ctrl);

    //Assert
    var expectedFailedValidations = _.where(validations, { passValidation: false});

    expect(expectedFailedValidations.length).toEqual(1);
    expect(expectedFailedValidations[0].validationType).toEqual('required');
  });

  it("when calling extractValidations passing a control with 'required' and 'pattern' validations,"+
    "it returns an array with all default supported validations with passValidation equals true,"+
    "except required and pattern validations with passValidation equals false",function(){
    // Arrange
    var ctrl = { $error:{required:true, pattern:true} };

    // Act
    var validations = validationContainerService.extractValidations(ctrl);

    //Assert
    var expectedFailedValidations = _.where(validations, { passValidation: false});

    expect(expectedFailedValidations.length).toEqual(2);
    expect(expectedFailedValidations[0].validationType).toEqual('required');
    expect(expectedFailedValidations[1].validationType).toEqual('pattern');
  });

  it("when calling extractValidations passing a control with 'required', 'pattern' and 'minlength' validations,"+
    "it returns an array with all default supported validations with passValidation equals true,"+
    "except required, pattern and minlength validations with passValidation equals false",function(){
    // Arrange
    var ctrl = { $error:{required:true, pattern:true, minlength:true} };

    // Act
    var validations = validationContainerService.extractValidations(ctrl);

    //Assert
    var expectedFailedValidations = _.where(validations, { passValidation: false});

    expect(expectedFailedValidations.length).toEqual(3);
    expect(expectedFailedValidations[0].validationType).toEqual('required');
    expect(expectedFailedValidations[1].validationType).toEqual('pattern');
    expect(expectedFailedValidations[2].validationType).toEqual('minlength');
  });

  it("when calling extractValidations passing a control with 'required', 'pattern', 'minlength' and 'maxlength' validations,"+
    "it returns an array with all default supported validations with passValidation equals true,"+
    "except required, pattern, minlength and maxlength validations with passValidation equals false",function(){
    // Arrange
    var ctrl = { $error:{required:true, pattern:true, maxlength:true, minlength:true} };

    // Act
    var validations = validationContainerService.extractValidations(ctrl);

    //Assert
    var expectedFailedValidations = _.where(validations, { passValidation: false});

    expect(expectedFailedValidations.length).toEqual(4);
    expect(expectedFailedValidations[0].validationType).toEqual('required');
    expect(expectedFailedValidations[1].validationType).toEqual('pattern');
    expect(expectedFailedValidations[2].validationType).toEqual('maxlength');
    expect(expectedFailedValidations[3].validationType).toEqual('minlength');
  });
});
// #ValidationContainerService test

// =validationContainerServiceProvider test
describe("validationContainerService Provider test", function(){
  var configProvider;
  var validationService;

  beforeEach(function(){
    angular.mock.module('lcValidationSummary');

    module(function(validationContainerServiceProvider){
      configProvider = validationContainerServiceProvider;
    });
    inject(function ($log, validationContainerService){
      validationService = validationContainerService;
    });
  });

  it("when calling removeDefaultSupportedValidations, and we passing a control with empty validation"+
    "extractValidations returns an empty array",function(){
    // Arrange
    var ctrl = { $error:{} };

    // Act
    configProvider.removeDefaultSupportedValidations();

    //Assert
    var validations = validationService.extractValidations(ctrl);
    expect(validations).toEqual([]);
  });

  it("when calling addValidation passing an null custom validation, and we passing a control with empty validation"+
    "extractValidations returns an array with default validations", function(){
      //Arrange
      var customValidation = null;
      var ctrl = { $error:{} };

      //Act
      configProvider.addValidation(customValidation);

      //Assert
      var validations = validationService.extractValidations(ctrl);

      expect(validations.length).toEqual(4);
  });

  it("when calling addValidation passing an undefined custom validation, and we passing a control with empty validation"+
    "extractValidations returns an array with default validations", function(){
      //Arrange
      var customValidation = undefined;
      var ctrl = { $error:{} };

      //Act
      configProvider.addValidation(customValidation);

      //Assert
      var validations = validationService.extractValidations(ctrl);

      expect(validations.length).toEqual(4);
  });

  it("when calling addValidation passing an true custom validation, and we passing a control with empty validation"+
    "extractValidations returns an array with default validations", function(){
      //Arrange
      var customValidation = true;
      var ctrl = { $error:{} };

      //Act
      configProvider.addValidation(customValidation);

      //Assert
      var validations = validationService.extractValidations(ctrl);

      expect(validations.length).toEqual(4);
  });

  it("when calling addValidation passing an false custom validation, and we passing a control with empty validation"+
    "extractValidations returns an array with default validations", function(){
      //Arrange
      var customValidation = false;
      var ctrl = { $error:{} };

      //Act
      configProvider.addValidation(customValidation);

      //Assert
      var validations = validationService.extractValidations(ctrl);

      expect(validations.length).toEqual(4);
  });

  it("when calling addValidation passing an invalid custom validation, and we passing a control with empty validation"+
    "extractValidations returns an array with default validations", function(){
      //Arrange
      var customValidation = { invalidValidation: 'invalidValidationName' };
      var ctrl = { $error:{} };

      //Act
      configProvider.addValidation(customValidation);

      //Assert
      var validations = validationService.extractValidations(ctrl);

      expect(validations.length).toEqual(4);
  });

  it("when calling addValidation passing a valid custom validation, and we passing a control with empty validation"+
    "extractValidations returns an array with length equals 5", function(){
      //Arrange
      var customValidation = {type: 'checktwofieldsmatch', friendlyDescription: 'The fields must match'};
      var ctrl = { $error:{} };

      //Act
      configProvider.addValidation(customValidation);

      //Assert
      var validations = validationService.extractValidations(ctrl);

      expect(validations.length).toEqual(5);
      expect(validations[4].validationType).toEqual('checktwofieldsmatch');
  });

  //buildValidationSummaryEntry
  it("when calling buildValidationSummaryEntry passing validationKey equals 'validationKeyTest', controlFriendlyName equals 'friendlyNameTest'" +
    "and validation equals 'validationTest' without adding this custom validation" +
    "it returns a correctly built item like { key: 'validationKeyTest', errorMessage: 'friendlyNameTest: '}", function(){
      //Arrange
      var validationKey = 'validationKeyTest';
      var controlFriendlyName = 'friendlyNameTest';
      var validation = 'validationTest';

      //Act
      var item = validationService.buildValidationSummaryEntry(validationKey, controlFriendlyName, validation, null, null);

      //Assert
      expect(item).toEqual({ key: validationKey, errorMessage: 'friendlyNameTest: '});
  });

  it("when calling buildValidationSummaryEntry passing validationKey equals 'validationKeyTest', controlFriendlyName equals 'friendlyNameTest'" +
    "and validation equals 'validationTest' and adding this custom validation" +
    "it returns a correctly built item like { key: 'validationKeyTest', errorMessage: 'friendlyNameTest: friendlyDescription test'}", function(){
      //Arrange
      var validationKey = 'validationKeyTest';
      var controlFriendlyName = 'friendlyNameTest';
      var validation = 'validationTest';
      var customValidation = {type: validation, friendlyDescription: 'friendlyDescription test'};

      //Act
      configProvider.addValidation(customValidation);
      var item = validationService.buildValidationSummaryEntry(validationKey, controlFriendlyName, validation, null, null);

      //Assert
      expect(item).toEqual({ key: validationKey, errorMessage: 'friendlyNameTest: friendlyDescription test'});
  });

  it("when calling buildValidationSummaryEntry passing validationKey equals 'validationKeyTest', controlFriendlyName equals 'friendlyNameTest'" +
    "validation equals 'validationTest', validationCustomErrorDirective equals validation and validationCustomErrorMessage equals 'Test'" +
    "it returns a correctly built item like { key: 'validationKeyTest', errorMessage: 'Test'}", function(){
      //Arrange
      var validationKey = 'validationKeyTest';
      var controlFriendlyName = 'friendlyNameTest';
      var validation = 'validationTest';
      var validationCustomErrorDirective = 'validationTest';
      var validationCustomErrorMessage = 'Test';
      var customValidation = {type: validation, friendlyDescription: 'friendlyDescription test'};

      //Act
      configProvider.addValidation(customValidation);
      var item = validationService.buildValidationSummaryEntry(validationKey, controlFriendlyName, validation, validationCustomErrorDirective, validationCustomErrorMessage);

      //Assert
      expect(item).toEqual({ key: validationKey, errorMessage: 'Test'});
  });
});
// #validationContainerServiceProvider test
