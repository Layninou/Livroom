( function () {
"use strict";

angular.module('public')
.component('bookList', {
  templateUrl: 'angular/public/template/books.component.html',
  bindings: {
    bookdata: '<'
  }
});

})();
