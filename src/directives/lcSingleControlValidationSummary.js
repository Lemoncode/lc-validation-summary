lcValidationSummary.directive('lcSingleControlValidationSummary', [function () {
	return {
		restrict: "A",
		scope:{
			elementName: '@lcSingleControlValidationSummary',
      showOnlyFirstValidation: '='
		},
		require: "^lcValidationsContainer",
		templateUrl: './src/directives/lcSingleControlValidationSummary.html',

		link: function (scope, element, attr, ctrl) {
			var valContainer = ctrl;
			scope.validationsSummary = valContainer.getValidationMessages();
		}
	};
}]);
