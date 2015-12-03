describe('validationSummary Spec', function () {

  var scope;
  var compile;

  beforeEach(function(){

    module('lcValidationSummary');

    inject(function($compile, $rootScope){
      scope = $rootScope.$new();
      compile = $compile;
    });

  });

  it('Should show up and find an element inside the errorListContainer when using a validation in a form and forcing it fail', function(){

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
    var length= $(element[0]).find('#errorListContainer').children().length;

    expect(length).toBe(1);
    expect($(element[0]).find('.validation-summary-box.ng-hide').length).toBe(0);
  });

  it('Should show up and find two elements inside the errorListContainer when using two validations in a form and forcing them fail', function(){

    // Arrange
    var html = "<div ng-init='person = {name: 2, surName:3}'>" +
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
    var length= $(element[0]).find('#errorListContainer').children().length;

    expect(length).toBe(2);
    expect($(element[0]).find('.validation-summary-box.ng-hide').length).toBe(0);
  });

  it('should find no elements and be hidden when no error is present', function(){

    // Arrange
    var html = "<div ng-init='person = {name: 2, surName:3}'>" +
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
    scope.person.name = "test";
    scope.person.surName = "test";
    scope.$digest();

    // Assert
    var length= $(element[0]).find('#errorListContainer').children().length;

    expect(length).toBe(0);
    expect($(element[0]).find('.validation-summary-box.ng-hide').length).toBe(1);
  });

});
