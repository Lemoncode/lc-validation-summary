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
      var nElementsAvailable = (totalElements - indexStartTake);
      var nAvailableTake = (nElementsAvailable > ntake) ? ntake : nElementsAvailable;
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