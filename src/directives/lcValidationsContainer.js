lcValidationSummary.directive('lcValidationsContainer', ['arrayUtilities', 'validationContainerService', function (arrayUtilities, validationContainerService) {
  return {
    restrict: "A",
    link: function (scope, element, attr, ctrl) {

    },
    controller: ['$scope', '$element', function ($scope, $element) {
      $scope.validationMessages = [];

      this.getValidationMessages = function () {
        return $scope.validationMessages;
      };
      
      this.$updateValidationResult = function (elementModel, friendlyControlName, validationCustomerrordirective, validationCustomErrorMessage) {
        var validationKeys = validationContainerService.extractValidations(elementModel);

        angular.forEach(validationKeys, function (value, key) {
          var currentValidationKey = validationContainerService.buildValidationKey(elementModel.$name, value.validationType);
          var indexItemValidationMessage = arrayUtilities.firstIndexMatchingCriteriaOrMinusOne($scope.validationMessages, 'key', [currentValidationKey]);
          var entryExistsInValidationMessage = (indexItemValidationMessage != -1);

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
    }]
  };
}]);