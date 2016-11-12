(function() {
"use strict";

angular.module('public')
.config(routeConfig);


// Config the routes and views

routeConfig.$inject = ['$stateProvider'];
function routeConfig ($stateProvider) {
  // Routes
  $stateProvider
    .state('public', {
      absract: true,
      templateUrl: 'angular/public/public.html'
    })
    .state('public.home', {
      url: '/',
      templateUrl: 'angular/public/template/home.html'
    })
    .state('public.books', {
      url: '/books',
      templateUrl: 'angular/public/template/books.html',
      controller: 'BooksController',
      controllerAs: 'booksCtrl',
      resolve: {
        booksList: ['BooksService', function (BooksService) {
          return BooksService.getListBooks();
        }]
      }
    })
    .state('public.gain', {
      url: '/gain',
      templateUrl: 'angular/public/template/gain.html',
      controller: 'GainController',
      controllerAs: 'gainCtrl',
      resolve: {
        money: ['BooksService', function (BooksService) {
          return BooksService.getGain();
        }]
      }
    });
}
})();
