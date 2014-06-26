var lcValidationSummary = angular.module('lcValidationSummary', []);
lcValidationSummary.directive('lcValidationBubble', function () {
  var checkDirectivePrerequisites = function (attr, form, validationsContainer) {
    if (!attr.name) {
      throw 'validationbubble must be set on an input element that has a \'name\' attribute';
    }
    if (!attr.validationFriendlyName) {
      throw 'validationbubble must define a \'validationFriendlyName\' attribute for the control (this friendly name will be displayed in the validationSummary)';
    }
    if (!form.$name) {
      throw 'validationbubble requires that a name is assigned to the ng-form containing the validated input';
    }
  };
  return {
    require: [
      'ngModel',
      '^form',
      '^lcValidationsContainer'
    ],
    restrict: 'A',
    link: function (scope, element, attr, ctrls) {
      var model = ctrls[0];
      var form = ctrls[1];
      var lcValidationsContainer = ctrls[2];
      var validationFriendlyName = attr.validationFriendlyName;
      var validationCustomErrorDirective = attr.validationCustomErrorDirective;
      var validationCustomErrorMessage = attr.validationCustomErrorMessage;
      checkDirectivePrerequisites(attr, form, lcValidationsContainer);
      var propertyToWatch = form.$name + '.' + model.$name + '.$valid';
      scope.$watch(propertyToWatch, function (isValid, lastValue) {
        if (typeof isValid !== 'undefined') {
          lcValidationsContainer.$updateValidationResult(model, validationFriendlyName, validationCustomErrorDirective, validationCustomErrorMessage);
        }
      });
    }
  };
});
lcValidationSummary.directive('lcValidationSummary', [function () {
    return {
      restrict: 'A',
      require: '^lcValidationsContainer',
      templateUrl: './src/directives/lcValidationSummary.html',
      link: function (scope, element, attr, ctrl) {
        var valContainer = ctrl;
        scope.validationsSummary = valContainer.getValidationMessages();
      }
    };
  }]);
lcValidationSummary.directive('lcValidationsContainer', [
  'arrayUtilities',
  'validationContainerService',
  function (arrayUtilities, validationContainerService) {
    return {
      restrict: 'A',
      link: function (scope, element, attr, ctrl) {
      },
      controller: [
        '$scope',
        '$element',
        function ($scope, $element) {
          $scope.validationMessages = [];
          this.getValidationMessages = function () {
            return $scope.validationMessages;
          };
          this.$updateValidationResult = function (elementModel, friendlyControlName, validationCustomerrordirective, validationCustomErrorMessage) {
            var validationKeys = validationContainerService.extractValidations(elementModel);
            angular.forEach(validationKeys, function (value, key) {
              var currentValidationKey = validationContainerService.buildValidationKey(elementModel.$name, value.validationType);
              var indexItemValidationMessage = arrayUtilities.firstIndexMatchingCriteriaOrMinusOne($scope.validationMessages, 'key', [currentValidationKey]);
              var entryExistsInValidationMessage = indexItemValidationMessage != -1;
              if (value.passValidation == true) {
                // Search in the master list of errors and remove the entry if exists
                if (entryExistsInValidationMessage) {
                  arrayUtilities.removeElementFromArray($scope.validationMessages, indexItemValidationMessage);
                }
              } else {
                // Search in the master list of errors and add the entry if it doesn't exists
                if (!entryExistsInValidationMessage) {
                  // Add element, push
                  var item = validationContainerService.buildValidationSummaryEntry(currentValidationKey, friendlyControlName, value.validationType, validationCustomerrordirective, validationCustomErrorMessage);
                  $scope.validationMessages.push(item);
                }
              }
            });
          };
        }
      ]
    };
  }
]);
lcValidationSummary.provider('validationContainerService', function () {
  var supportedValidations = [
      {
        type: 'required',
        friendlyDescription: 'this field is mandatory'
      },
      {
        type: 'pattern',
        friendlyDescription: 'this field doesn\'t match the pattern set'
      },
      {
        type: 'maxlength',
        friendlyDescription: 'this field exceeds the maximum length'
      },
      {
        type: 'minlength',
        friendlyDescription: 'this field doesn\'t reach the minimum length'
      }
    ];
  return {
    removeDefaultSupportedValidations: function () {
      supportedValidations = [];
    },
    addValidation: function (validation) {
      if (validation.type != 'undefined' && validation.friendlyDescription != 'undefined') {
        supportedValidations.push(validation);
      }
    },
    $get: [
      '$log',
      function ($log) {
        function buildValidationItem(validationType, passValidation) {
          var validationItem = {};
          validationItem.validationType = validationType;
          validationItem.passValidation = passValidation;
          return validationItem;
        }
        return {
          extractValidations: function (elementModel) {
            var validations = [];
            var validationItem = null;
            if (typeof elementModel.$error == 'undefined') {
              $log.warn('The validationBubble has been set to an element with no $error property');
              return validations;
            }
            angular.forEach(supportedValidations, function (supportedValidation, key) {
              var validationType = supportedValidation.type;
              if (typeof elementModel.$error[validationType] !== 'undefined') {
                validationItem = buildValidationItem(validationType, elementModel.$error[validationType] == false);
                validations.push(validationItem);
              }
            });
            return validations;
          },
          buildValidationKey: function (controlName, validationType) {
            return controlName + '$' + validationType;
          },
          buildValidationFriendlyMessage: function (controlFriendlyName, validation) {
            var validationText = controlFriendlyName + ': ';
            var validationsLength = supportedValidations.length;
            var currentIndex = 0;
            for (currentIndex = 0; currentIndex < validationsLength; currentIndex++) {
              var currentValidation = supportedValidations[currentIndex];
              if (validation == currentValidation.type) {
                validationText += currentValidation.friendlyDescription;
                break;
              }
            }
            return validationText;
          },
          buildValidationSummaryEntry: function (validationKey, controlFriendlyName, validation, validationCustomErrorDirective, validationCustomErrorMessage) {
            var item = {};
            item.key = validationKey;
            if (typeof validationCustomErrorDirective != 'undefined' && validationCustomErrorDirective == validation) {
              item.errorMessage = validationCustomErrorMessage;
            } else {
              item.errorMessage = this.buildValidationFriendlyMessage(controlFriendlyName, validation);
            }
            return item;
          }
        };
      }
    ]
  };
});
lcValidationSummary.factory('arrayUtilities', [function () {
    return {
      findAvailableNextNumericKey: function (originalList, fieldName) {
        var maxvalue = 0;
        for (var originalListcurrentIndex = 0; originalListcurrentIndex < originalList.length; originalListcurrentIndex++) {
          var originEntity = originalList[originalListcurrentIndex];
          if (maxvalue < originEntity[fieldName]) {
            maxvalue = originEntity[fieldName];
          }
        }
        return maxvalue + 1;
      },
      firstOrDefault: function (originalList, filterbyFieldName, filterValues) {
        var selectedValue = null;
        for (var originalListcurrentIndex = 0; originalListcurrentIndex < originalList.length; originalListcurrentIndex++) {
          var originEntity = originalList[originalListcurrentIndex];
          for (var i = 0; i < filterValues.length; i++) {
            if (filterValues[i] == originEntity[filterbyFieldName]) {
              selectedValue = originEntity;
              break;
            }
          }
          if (selectedValue != null) {
            break;
          }
        }
        return selectedValue;
      },
      firstIndexMatchingCriteriaOrMinusOne: function (originalList, filterbyFieldName, filterValues) {
        var selectedIndex = -1;
        for (var originalListcurrentIndex = 0; originalListcurrentIndex < originalList.length; originalListcurrentIndex++) {
          var originEntity = originalList[originalListcurrentIndex];
          for (var i = 0; i < filterValues.length; i++) {
            if (filterValues[i] == originEntity[filterbyFieldName]) {
              selectedIndex = originalListcurrentIndex;
              break;
            }
          }
          if (selectedIndex != -1) {
            break;
          }
        }
        return selectedIndex;
      },
      removeElementFromArray: function (originalList, index) {
        originalList.splice(index, 1);
      },
      take: function (originalList, indexStart, ntake) {
        var indexStartTake = indexStart + 1;
        var totalElements = originalList.length;
        var nElementsAvailable = totalElements - indexStartTake;
        var nAvailableTake = nElementsAvailable > ntake ? ntake : nElementsAvailable;
        var indexEnd = indexStartTake + nAvailableTake;
        return originalList.slice(indexStartTake, indexEnd);
      },
      removeFirstElementByFilter: function (originalList, fieldFilter, fieldValue) {
        var elementIndex = this.firstIndexMatchingCriteriaOrMinusOne(originalList, fieldFilter, fieldValue);
        if (elementIndex > -1) {
          this.removeElementFromArray(originalList, elementIndex);
          return true;
        } else {
          return false;
        }
      }
    };
  }]);