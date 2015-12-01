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
