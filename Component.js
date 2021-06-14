'use strict'
jQuery.sap.require('SapUI5Tutorial.Router')
sap.ui.define(
  [
    'sap/ui/core/UIComponent',
    'SapUI5Tutorial/Application/PersonelList/Service/PersonellistService',
    'SapUI5Tutorial/Application/ProjeList/service/Projelistservice',
    'SapUI5Tutorial/Application/addTicket/service/addTicketservice'
  ],
  function (UIComponent,PersonellistService) {
    return UIComponent.extend('SapUI5Tutorial.Component', {
      metadata: {
        routing: {
          config: {
            routerClass: SapUI5Tutorial.Router,
            viewType: 'XML',
            targetAggregation: 'pages',
            clearTarget: false
          },
          routes: [
          {
            pattern: 'Login',
            viewPath: 'SapUI5Tutorial.Application.Login.view',
            name: 'Login',
            view: 'Login',
            targetControl: 'masterAppView'
          },
          {
            pattern: 'PersonelList',
            viewPath: 'SapUI5Tutorial.Application.PersonelList.view',
            name: 'PersonelList',
            view: 'PersonelList',
            targetControl: 'masterAppView'
          },
          {
            pattern: 'TicketList',
            viewPath: 'SapUI5Tutorial.Application.TicketList.view',
            name: 'TicketList',
            view: 'TicketList',
            targetControl: 'masterAppView'
          },
          {
            pattern: 'ProjeList',
            viewPath: 'SapUI5Tutorial.Application.ProjeList.view',
            name: 'ProjeList',
            view: 'ProjeList',
            targetControl: 'masterAppView'
          },
          {
            pattern: '',
            viewPath: 'SapUI5Tutorial.Application.addTicket.view',
            name: 'addTicket',
            view: 'addTicket',
            targetControl: 'masterAppView'
          },
        ]
        }
      },
      init: function () {
        sap.ui.core.UIComponent.prototype.init.apply(this, arguments);
        var mConfig = this.getMetadata().getConfig();
        this.getRouter().initialize();
        
      },
      createContent: function () {
        var oViewData = {
          component: this
        }
        return sap.ui.view({
          viewName: 'SapUI5Tutorial.RootApp',
          type: sap.ui.core.mvc.ViewType.XML,
          id: 'app',
          viewData: oViewData
        })
      }
    })
  }
)