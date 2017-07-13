sap.ui.define([
	"root/controller/BaseController", 
	"sap/ui/model/json/JSONModel"
], function(BaseController, JSONModel) {
	"use strict"; 
	return BaseController.extend("root.controller.Login",  {
		 
		onInit:function() {
			var oController = this;
			this.getRouter().getRoute("login").attachPatternMatched(function () {
				var oData =  {
					username:"", 
					password:""
				}; 
				var oModel = new JSONModel(oData); 
				oController.getView().setModel(oModel); 
				sessionStorage.removeItem("UserId"); 
			}, this);  
		}, 

		onLogin:function() {
			sap.ui.core.BusyIndicator.show(0); 
			var oController = this; 
			var oUserData = oController.getView().getModel(); 
			$.ajax( {
				url:"./resources/users.json", 
				type:"GET", 
				dataType:"json", 
				success:function(oResponseData) {
					sap.ui.core.BusyIndicator.hide(); 
					if (oResponseData && oResponseData.length > 0) {
						for (var index = 0; index < oResponseData.length; index++ ) {
							if (oResponseData[index].UserId === oUserData.getProperty("/username") && oResponseData[index].Password === oUserData.getProperty("/password")) {
								sessionStorage.setItem("UserId", oResponseData[index].UserId); 
								oController.getRouter().navTo("home"); 
								return; 
							}
						}
						sap.ui.getCore().getControl("__component0---Login--xs_username").setValueState("Error"); 
						sap.ui.getCore().getControl("__component0---Login--xs_password").setValueState("Error"); 
					}
					else {
						sap.ui.getCore().getControl("__component0---Login--xs_username").setValueState("Error"); 
						sap.ui.getCore().getControl("__component0---Login--xs_password").setValueState("Error"); 
					}
				}, 
				error:function(data) {
					sap.ui.core.BusyIndicator.hide(); 
				}
			}); 
		}
	}); 
}); 