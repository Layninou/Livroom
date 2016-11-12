(function() {
"use strict";

angular.module('common')
.factory('loadingHttpInterceptor', LoadingHttpInterceptor);

/**
 * Tracks when a request begins and finishes. When a
 * request starts, a progress event is emitted to allow
 * listeners to determine when a request has been initiated.
 * When the response completes or a response error occurs,
 * we assume the request has ended and emit a finish event.
 */


LoadingHttpInterceptor.$inject = ['$rootScope','$q'];
function LoadingHttpInterceptor($rootScope, $q) {

  var loadCount = 0;
  var loadEventName = 'spinner:activate';

  return {
    request: function (config) {


      if (++loadCount === 1) {
        $rootScope.$broadcast(loadEventName, {on: true});
      }

      return config;
    },

    response: function (response) {
      if (--loadCount === 0) {
        $rootScope.$broadcast(loadEventName, {on: false});
      }

      return response;
    },

    responseError: function (response) {
      if (--loadCount === 0) {
        $rootScope.$broadcast(loadEventName, {on: false});
      }

      return $q.reject(response);
    }
  };
}

})();
