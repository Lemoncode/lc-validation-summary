describe('arrayUtilties test', function () {
  describe('when I call findAvailableNextNumericKey passing as param a list of numeric fields', function () {
    it('returns the next key available" ', function () {
      // http://stackoverflow.com/questions/13400687/cant-retrieve-the-injector-from-angular

      // Arrange
      var $injector = angular.injector(['ng', 'lcValidationSummary']);
      var myArrayUtilities = $injector.get('arrayUtilities');
      var myList = [
        { id: 1, name: 'john' },
        { id: 2, name: 'mark' }
      ];

      // Act
      var availableKey = myArrayUtilities.findAvailableNextNumericKey(myList, "id");

      // Assert
      expect(availableKey).toEqual(3);
    });
  });

  describe('when I call findAvailableNextNumericKey passing as param a list of numeric non ordered fields', function () {
    it('returns the next key available" ', function () {
        // http://stackoverflow.com/questions/13400687/cant-retrieve-the-injector-from-angular

        // Arrange
        var $injector = angular.injector(['ng', 'lcValidationSummary']);
        var myArrayUtilities = $injector.get('arrayUtilities');
        var myList = [
          { id: 3, name: 'john' },
          { id: 2, name: 'mark' },
          { id: 1, name: 'peter' }
        ];

        // Act
        var availableKey = myArrayUtilities.findAvailableNextNumericKey(myList, "id");

        // Assert
        expect(availableKey).toEqual(4);
    });
  });


  describe('when I call findAvailableNextNumericKey passing as param an empty list', function () {
    it('returns the next key available" ', function () {
        // http://stackoverflow.com/questions/13400687/cant-retrieve-the-injector-from-angular

        // Arrange
        var $injector = angular.injector(['ng', 'lcValidationSummary']);
        var myArrayUtilities = $injector.get('arrayUtilities');
        var myList = [
        ];

        // Act
        var availableKey = myArrayUtilities.findAvailableNextNumericKey(myList, "id");

        // Assert
        expect(availableKey).toEqual(1);
    });
  });

  describe('when I call findAvailableNextNumericKey passing as param a list of numeric non ordered fields', function () {
    it('returns the next key available" ', function () {
        // http://stackoverflow.com/questions/13400687/cant-retrieve-the-injector-from-angular

        // Arrange
        var $injector = angular.injector(['ng', 'lcValidationSummary']);
        var myArrayUtilities = $injector.get('arrayUtilities');
        var myList = [
          { id: 1, name: 'john' },
          { id: 12, name: 'mark' },
          { id: 24, name: 'peter' },
          { id: 3, name: 'john' },
          { id: 21, name: 'mark' },
          { id: 2, name: 'peter' }
        ];

        // Act
        var availableKey = myArrayUtilities.findAvailableNextNumericKey(myList, "id");

        // Assert
        expect(availableKey).toEqual(25);
    });
  });

  describe('when I call take passing as param an array of 6 elements, index 2, and three to take', function () {
    it('returns 3 values ([3],[4],[5]) ', function () {
      // http://stackoverflow.com/questions/13400687/cant-retrieve-the-injector-from-angular

      // Arrange
      var $injector = angular.injector(['ng', 'lcValidationSummary']);
      var myArrayUtilities = $injector.get('arrayUtilities');
      var myList = [
        "item0",
        "item1",
        "item2",
        "item3",
        "item4",
        "item5"
      ];

      // Act
      var resultingArray = myArrayUtilities.take(myList, 2, 3);

      // Assert
      expect(resultingArray.length).toEqual(3);
      expect(resultingArray[0]).toEqual("item3");
      expect(resultingArray[1]).toEqual("item4");
      expect(resultingArray[2]).toEqual("item5");
    });
  });

  describe('when I call take passing as param an array of 6 elements, index 3, and three to take', function () {
    it('returns 2 values ([4],[5]) ', function () {
      // http://stackoverflow.com/questions/13400687/cant-retrieve-the-injector-from-angular

      // Arrange
      var $injector = angular.injector(['ng', 'lcValidationSummary']);
      var myArrayUtilities = $injector.get('arrayUtilities');
      var myList = [
        "item0",
        "item1",
        "item2",
        "item3",
        "item4",
        "item5"
      ];

      // Act
      var resultingArray = myArrayUtilities.take(myList, 3, 3);

      // Assert
      expect(resultingArray.length).toEqual(2);
      expect(resultingArray[0]).toEqual("item4");
      expect(resultingArray[1]).toEqual("item5");
    });
  });


  describe('when I call take passing as param an array of 6 elements, index 5, and three to take', function () {
    it('returns 0 values () ', function () {
        // http://stackoverflow.com/questions/13400687/cant-retrieve-the-injector-from-angular

        // Arrange
        var $injector = angular.injector(['ng', 'lcValidationSummary']);
        var myArrayUtilities = $injector.get('arrayUtilities');
        var myList = [
          "item0",
          "item1",
          "item2",
          "item3",
          "item4",
          "item5"
        ];

        // Act
        var resultingArray = myArrayUtilities.take(myList, 5, 3);

        // Assert
        expect(resultingArray.length).toEqual(0);
    });
  });


  describe('when I call removeFirstElementByFilter passing as param an array of 5 elements with the fields "id" and "name", id as filter, and an existing id value of 3', function () {
    it('returns true, removes the element, and the list length decreases in one ', function () {

      // Arrange
      var $injector = angular.injector(['ng', 'lcValidationSummary']);
      var myArrayUtilities = $injector.get('arrayUtilities');

      describe('removeFirstelementByFilter', function () {

        var myList = [
          { id: 1, name: 'john' },
          { id: 2, name: 'mark' },
          { id: 3, name: 'peter' },
          { id: 4, name: 'john' },
          { id: 5, name: 'mark' }
        ];
        var lengthBefore = myList.length;

        //Act
        var removeElementOperation = myArrayUtilities.removeFirstElementByFilter(myList, "id", [3]);

        //Assert
        expect(removeElementOperation).toEqual(true);
        expect(myArrayUtilities.firstIndexMatchingCriteriaOrMinusOne(myList, "id", [3])).toEqual(-1);
        expect(myList.length).toEqual(lengthBefore - 1);
      });

    });

  });

  describe('when I call removeFirstElementByFilter passing as param an array of 5 elements with the fields "id" and "name", id as filter, and a non existing id value of 9', function () {
    it('returns false,the element remains unexistent, and the list length doesnt vary at all ', function () {

      // Arrange
      var $injector = angular.injector(['ng', 'lcValidationSummary']);
      var myArrayUtilities = $injector.get('arrayUtilities');

      describe('removeFirstelementByFilter', function () {

        spyOn(myArrayUtilities, 'firstIndexMatchingCriteriaOrMinusOne').andReturn(-1);

        var myList = [
          { id: 1, name: 'john' },
          { id: 2, name: 'mark' },
          { id: 3, name: 'peter' },
          { id: 4, name: 'john' },
          { id: 5, name: 'mark' }
        ];
        var lengthBefore = myList.length;

        //Act
        var removeElementOperation = myArrayUtilities.removeFirstElementByFilter(myList, "id", [9]);

        //Assert
        expect(removeElementOperation).toEqual(false);
        expect(myArrayUtilities.firstIndexMatchingCriteriaOrMinusOne(myList, "id", [9])).toEqual(-1);
        expect(myList.length).toEqual(lengthBefore);
      });

    });

  });

});