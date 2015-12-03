describe('validationContainer Spec', function () {

  var scope;
  var compile;

  beforeEach(function(){
    module('lcValidationSummary');
    inject(function($compile, $rootScope){
      scope = $rootScope.$new();
      compile = $compile;
    });
  });

  it('Should add no validations when using validations in a form and forcing them to pass ',function(){
    // Arrange
    var html = "<div ng-init='person = {name: 2}'>" +
            "<div lc-validations-container=''>" +
              "<form name='personInformation'>"+
              "<input type='text' id='personName' name='personName' ng-model='person.name'"+
              "ng-required='true' lc-validation-bubble='' validation-friendly-name='Name'/>"+
              "<input type='text' id='personName' name='personName' ng-model='person.surName'"+
              "ng-minlength='4' lc-validation-bubble='' validation-friendly-name='Name'/>"+
              "</form>" +
              "<div lc-validation-summary=''></div>" +
            "</div>" +
             "</div>";

    var element = angular.element(html); // If jQuery is available, angular.element is an alias for the jQuery function. If jQuery is not available, angular.element delegates to Angular's built-in subset of jQuery called jQuery lite

    // Act
    var compiled = compile(element)(scope);
    scope.$digest();
    scope.person.name = "";
    scope.person.surName = "t";
    scope.$digest();
    scope.person.name = "pass";
    scope.person.surName = "pass";
    scope.$digest();

    // Assert
    expect(scope.validationMessages.length).toBe(0);
  });

  it('Should add one validationmessage when using a validation in a form and forcing it fail ',function(){
    // Arrange
    var html = "<div ng-init='person = {name: 2}'>" +
            "<div lc-validations-container=''>" +
              "<form name='personInformation'>"+
              "<input type='text' id='personName' name='personName' ng-model='person.name'"+
              "ng-required='true' lc-validation-bubble='' validation-friendly-name='Name'/>"+
              "</form>" +
              "<div lc-validation-summary=''></div>" +
            "</div>" +
             "</div>";

    var element = angular.element(html); // If jQuery is available, angular.element is an alias for the jQuery function. If jQuery is not available, angular.element delegates to Angular's built-in subset of jQuery called jQuery lite

    // Act
    var compiled = compile(element)(scope);
    scope.$digest();
    scope.person.name = "test";
    scope.$digest();
    scope.person.name = "";
    scope.$digest();

    // Assert
    expect(scope.validationMessages.length).toBe(1);
  });

  it('Should add two validationmessages when using two validations in a form and forcing them fail ',function(){
    // Arrange
    var html = "<div ng-init='person = {name: 2, surName: 3}'>" +
            "<div lc-validations-container=''>" +
              "<form name='personInformation'>"+
              "<input type='text' id='personName' name='personName' ng-model='person.name'"+
              "ng-required='true' lc-validation-bubble='' validation-friendly-name='Name'/>"+
              "<input type='text' id='personSurName' name='personSurName' ng-model='person.surName'"+
              "ng-minlength='4' lc-validation-bubble='' validation-friendly-name='SurName'/>"+
              "</form>" +
              "<div lc-validation-summary=''></div>" +
            "</div>" +
             "</div>";

    var element = angular.element(html); // If jQuery is available, angular.element is an alias for the jQuery function. If jQuery is not available, angular.element delegates to Angular's built-in subset of jQuery called jQuery lite

    // Act
    var compiled = compile(element)(scope);
    scope.$digest();
    scope.person.name = "test";
    scope.person.surName = "test";
    scope.$digest();
    scope.person.name = "";
    scope.person.surName = "p";
    scope.$digest();

    // Assert
    expect(scope.validationMessages.length).toBe(2);
  });


  it('Should add one validationmessage when using two validations in a form and forcing just one to fail ',function(){
    // Arrange
    var html = "<div ng-init='person = {name: 2, surName: 3}'>" +
            "<div lc-validations-container=''>" +
              "<form name='personInformation'>"+
              "<input type='text' id='personName' name='personName' ng-model='person.name'"+
              "ng-required='true' lc-validation-bubble='' validation-friendly-name='Name'/>"+
              "<input type='text' id='personSurName' name='personSurName' ng-model='person.surName'"+
              "ng-minlength='4' lc-validation-bubble='' validation-friendly-name='SurName'/>"+
              "</form>" +
              "<div lc-validation-summary=''></div>" +
            "</div>" +
             "</div>";

    var element = angular.element(html); // If jQuery is available, angular.element is an alias for the jQuery function. If jQuery is not available, angular.element delegates to Angular's built-in subset of jQuery called jQuery lite

    // Act
    var compiled = compile(element)(scope);
    scope.$digest();
    scope.person.name = "test";
    scope.person.surName = "test";
    scope.$digest();
    scope.person.name = "test";
    scope.person.surName = "p";
    scope.$digest();

    // Assert
    expect(scope.validationMessages.length).toBe(1);
  });

});
