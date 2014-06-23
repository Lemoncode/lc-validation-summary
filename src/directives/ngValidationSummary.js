ngValidationSummary.directive('ngValidationSummary', [function () {
  return {
    restrict: "A",
    require: "^ngValidationsContainer",
    templateUrl: './src/directives/ngValidationSummary.html',

    link: function (scope, element, attr, ctrl) {
      var valContainer = ctrl;
      scope.validationsSummary = valContainer.getValidationMessages();
    }
  };
}]);
