sap.ui.define([
	"root/controller/BaseController", 
	"sap/ui/model/json/JSONModel"
], function(Controller, JSONModel) {
	"use strict"; 

	return Controller.extend("root.controller.ManageController",  {
        onInit:function() {
			this.getRouter().attachRouteMatched(this._onObjectMatched, this); 
		}, 

		_onObjectMatched:function() {
			var sUserId = sessionStorage.getItem("UserId"); 
			var oData =  {
				userId:sUserId
			}; 
            var oModel = new JSONModel(oData); 
            this.getView().setModel(oModel, "user"); 
			if ( ! sUserId || Number(sUserId) < 0) {
				this.getRouter().navTo("login"); 
			}
		}, 

		onHome:function() {
			this.getRouter().navTo("home"); 
		}, 

		onDashboard:function() {
			this.getRouter().navTo("dashboards");}, 
		
		onLogout:function() {
			sessionStorage.removeItem("UserId"); 
			this.getRouter().navTo("login"); 
		}
    }); 
}); 