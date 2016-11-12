(function () {
"use strict";

angular.module('common')
.service('BooksService', BooksService);


BooksService.$inject = ['$http'];
function BooksService($http) {
  var service = this;

  service.getListBooks = function () {
    return $http.get('json/data.json').then(function (response) {
      return response.data;
    });
  };

  service.getGain = function () {
    return $http.get('json/don.json').then(function (response) {
      return response.data;
    })
  };

}

})();
