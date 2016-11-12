(function () {
"use strict";

angular.module('public')
.controller('BooksController', BooksController);

BooksController.$inject = ['booksList'];
function BooksController(booksList) {
  var $ctrl = this;
  $ctrl.booksList = booksList;
}


})();
