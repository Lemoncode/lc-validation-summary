ngValidationSummary.directive('validationsContainer', ['arrayUtilities', 'validationContainerService', function (arrayUtilities, validationContainerService) {
    return {
        restrict: "A",
        link: function (scope, element, attr, ctrl) {

        },
        controller: ['$scope', '$element', function ($scope, $element) {
            $scope.validationMessages = [];

            this.getValidationMessages = function () {
                return $scope.validationMessages;
            },
            this.$updateValidationResult = function (ctrl, friendlyControlName) {
                var validationKeys = validationContainerService.extractValidations(ctrl);                

                angular.forEach(validationKeys, function (value, key) {
                    var currentValidationKey = validationContainerService.buildValidationKey(ctrl.$name, value.validationType);
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
                            var item = validationContainerService.buildValidationSummaryEntry(currentValidationKey, friendlyControlName, value.validationType);
                            $scope.validationMessages.push(item);
                        }
                    }
                });
            };
        }]
    };
}]);