(function(){
  'use strict'
  angular
    .module('invoicesApp',['ngRoute', 'ngMaterial', 'ui.gravatar'])
    .constant('IPC', require('ipc'));
})();
