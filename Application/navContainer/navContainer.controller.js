sap.ui.define(['sap/ui/core/mvc/Controller'],
	function(Controller) {
	"use strict";
	var base = ""
    var that, navContainer;
	return Controller.extend("SapUI5Tutorial.Application.navContainer.controller.navContainer", {
		onInit: function() {
			that = this;
			base = this;
			navContainer = this.byId("navCon");
		},
		update:function(ticketno){
			navContainer.to(that.byId("page"));
			sap.ui.controller("SapUI5Tutorial.Application.addTicket.controller.addTicket").getTicket(ticketno);
		}
	});
});