(function(){
  'use strict';
  angular
    .module('invoicesApp')
    .controller('AppCtrl', AppCtrl)
    .controller('ListBottomSheetCtrl', ListBottomSheetCtrl)
    .controller('DemoCtrl', DemoCtrl)
    .config(function ($mdThemingProvider) {
        var customBlueMap = $mdThemingProvider.extendPalette('light-blue', {
            'contrastDefaultColor': 'light',
            'contrastDarkColors': ['50'],
            '50': 'ffffff'
        });
        $mdThemingProvider.definePalette('customBlue', customBlueMap);
        $mdThemingProvider.theme('default').primaryPalette('customBlue', {
            'default': '500',
            'hue-1': '50'
        }).accentPalette('pink');
        $mdThemingProvider.theme('input', 'default').primaryPalette('grey');
    })
    .config(function ($mdIconProvider) {
        $mdIconProvider.iconSet('action', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-action.svg', 24).iconSet('alert', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-alert.svg', 24).iconSet('av', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-av.svg', 24).iconSet('communication', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-communication.svg', 24).iconSet('content', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-content.svg', 24).iconSet('device', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-device.svg', 24).iconSet('editor', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-editor.svg', 24).iconSet('file', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-file.svg', 24).iconSet('hardware', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-hardware.svg', 24).iconSet('image', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-image.svg', 24).iconSet('maps', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-maps.svg', 24).iconSet('navigation', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-navigation.svg', 24).iconSet('notification', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-notification.svg', 24).iconSet('social', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-social.svg', 24).iconSet('toggle', 'https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-toggle.svg', 24).iconSet('avatars', 'https://raw.githubusercontent.com/angular/material/master/docs/app/icons/avatar-icons.svg', 24).defaultIconSet('https://raw.githubusercontent.com/google/material-design-icons/master/sprites/svg-sprite/svg-sprite-action.svg', 24);
    })
    .config([
      'gravatarServiceProvider', function(gravatarServiceProvider) {
        gravatarServiceProvider.defaults = {
          size     : 40,
          "default": 'mm'  // Mystery man as default for missing avatars
        };

        // Use https endpoint
        gravatarServiceProvider.secure = true;

      }
    ]);
  AppCtrl.$inject = ['$scope', '$mdBottomSheet', '$mdSidenav', '$mdDialog', 'IPC'];
  function AppCtrl($scope, $mdBottomSheet, $mdSidenav, $mdDialog, IPC) {
      $scope.customers = [];
      $scope.toggleSearch = function (element) {
          $scope.showSearch = !$scope.showSearch;
      };
      $scope.toggleSidenav = function (menuId) {
          $mdSidenav(menuId).toggle();
      };
      $scope.menu = [
          {
              link: '',
              title: 'Facturas',
              icon: 'action:ic_dashboard_24px'
          },
          {
              link: '',
              title: 'Presupuestos',
              icon: 'communication:ic_message_24px'
          },
          {
              link: '',
              title: 'Empresas',
              icon: 'communication:ic_message_24px'
          },
          {
              link: '',
              title: 'Clientes',
              icon: 'social:ic_group_24px'
          }
      ];
      $scope.admin = [
          {
              link: '',
              title: 'Usarios',
              icon: 'social:ic_group_24px'
          },
          {
              link: 'showListBottomSheet($event)',
              title: 'Configuración',
              icon: 'action:ic_settings_24px'
          }
      ];
      IPC.on('get-customers', function(customers) {
        $scope.$apply(function() {
            $scope.customers = customers;
        });
      });
      IPC.send('get-customers', true);
      $scope.alert = '';
      $scope.showListBottomSheet = function ($event) {
          $scope.alert = '';
          $mdBottomSheet.show({
              template: '<md-bottom-sheet class="md-list md-has-header"><md-list><md-list-item class="md-2-line" ng-repeat="item in items" role="link" md-ink-ripple><md-icon md-svg-icon="{{item.icon}}" aria-label="{{item.name}}"></md-icon><div class="md-list-item-text"><h3>{{item.name}}</h3></div></md-list-item> </md-list></md-bottom-sheet>',
              controller: 'ListBottomSheetCtrl',
              targetEvent: $event
          }).then(function (clickedItem) {
              $scope.alert = clickedItem.name + ' clicked!';
          });
      };
      $scope.showAdd = function (ev) {

        var addCustomerTpl =
          '<md-dialog aria-label="Form">' +
            '<md-content class="md-padding">' +
              '<form name="customerForm">' +
                '<md-input-container flex> ' +
                  '<label>Razon Social</label> ' +
                  '<input ng-model="customer.name"> ' +
                '</md-input-container>' +
                '<div layout layout-sm="column">' +
                  '<md-input-container flex> ' +
                    '<label>Email</label> ' +
                    '<input ng-model="customer.email"> ' +
                  '</md-input-container>' +
                  '<md-input-container flex> ' +
                    '<label>Cedula o RIF</label> ' +
                    '<input ng-model="customer.rif"> ' +
                  '</md-input-container>' +
                '</div>' +
                '<md-input-container flex> ' +
                  '<label>Dirección</label> ' +
                  '<textarea ng-model="customer.address" columns="1" md-maxlength="150"></textarea> ' +
                '</md-input-container>' +
              '</form>' +
            '</md-content>' +
            '<div class="md-actions" layout="row">' +
              '<span flex></span>' +
              '<md-button ng-click="answer(false)"> Cancelar </md-button>' +
              '<md-button ng-click="answer(customer)" class="md-primary"> Guardar </md-button>' +
            '</div>' +
          '</md-dialog>';
          $mdDialog.show({
              controller: DialogController,
              template: addCustomerTpl,
              targetEvent: ev
          }).then(function (answer) {
              $scope.alert = 'You said the information was "' + answer + '".';
          }, function () {
              $scope.alert = 'You cancelled the dialog.';
          });
      };
  }
  function ListBottomSheetCtrl($scope, $mdBottomSheet) {
      $scope.items = [
          {
              name: 'Compartir',
              icon: 'social:ic_share_24px'
          },
          {
              name: 'Upload',
              icon: 'file:ic_cloud_upload_24px'
          },
          {
              name: 'Copy',
              icon: 'content:ic_content_copy_24px'
          },
          {
              name: 'Imprimir esta página',
              icon: 'action:ic_print_24px'
          }
      ];
      $scope.listItemClick = function ($index) {
          var clickedItem = $scope.items[$index];
          $mdBottomSheet.hide(clickedItem);
      };
  };

  function DialogController($scope, $mdDialog, IPC) {
      $scope.hide = function () {
          $mdDialog.hide();
      };
      $scope.cancel = function () {
          $mdDialog.cancel();
      };
      $scope.answer = function (answer) {
          IPC.send('add-customer', answer);
          $mdDialog.hide(answer);
      };
  };
  function DemoCtrl($timeout, $q) {
      var self = this;
      self.states = loadAll();
      self.selectedItem = null;
      self.searchText = null;
      self.querySearch = querySearch;
      function querySearch(query) {
          var results = query ? self.states.filter(createFilterFor(query)) : [];
          return results;
      }
      function loadAll() {
          var allStates = 'Ali Conners, Alex, Scott, Jennifer,               Sandra Adams, Brian Holt,               Trevor Hansen';
          return allStates.split(/, +/g).map(function (state) {
              return {
                  value: state.toLowerCase(),
                  display: state
              };
          });
      }
      function createFilterFor(query) {
          var lowercaseQuery = angular.lowercase(query);
          return function filterFn(state) {
              return state.value.indexOf(lowercaseQuery) === 0;
          };
      }
  };
})();
