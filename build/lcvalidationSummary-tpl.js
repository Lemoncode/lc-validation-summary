angular.module('lcValidationSummary').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('./src/directives/lcValidationSummary.html',
    "<div class='validation-summary-box' ng-show='validationsSummary.length>0'>\r" +
    "\n" +
    "  <div class=\"summaryTitle\">\r" +
    "\n" +
    "    <h4>Please review the following fields:</h4>\r" +
    "\n" +
    "  </div>\r" +
    "\n" +
    "  <ul id=\"errorListContainer\">\r" +
    "\n" +
    "    <li ng-repeat='item in validationsSummary'>{{item.errorMessage}}</li>\r" +
    "\n" +
    "  </ul>\r" +
    "\n" +
    "</div>"
  );

}]);
