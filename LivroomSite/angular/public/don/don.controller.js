(function () {
"use strict";

angular.module('public')
.controller('GainController', GainController);

GainController.$inject = ['money'];
function GainController(money) {
  var $ctrl = this;
  $ctrl.money = money;
}


})();
