sap.ui.define([
	"root/controller/ManageController", 
	"sap/ui/model/json/JSONModel"
], function(BaseController, JSONModel) {
	"use strict"; 
	return BaseController.extend("root.controller.Home",  {
		onInit:function () {
			BaseController.prototype.onInit.apply(this, arguments);
			this.initLogDataModel(); 
		}, 
		
		initLogDataModel:function() {
			var oController = this; 
			$.ajax( {
				url:"./resources/logs.json", 
				type:"GET", 
				dataType:"json", 
				success:function(oResponseData) {
					var oView = oController.getView(); 
					var oData = []; 
					var oModel = new JSONModel(); 
					if (oResponseData && oResponseData.length > 0) {
						for (var index = 0; index < oResponseData.length; index++ ) {
							if(oResponseData[index].LogItems && oResponseData[index].LogItems.length > 0){
								for (var i = 0; i < oResponseData.length; i++ ) {
									oData.push(oResponseData[index].LogItems[i]);
								}
							}
						}
					}
					oModel.setData(oData); 
					oView.setModel(oModel, "log"); 
				}, 
				error:function(data) {
					//
				}
			}); 
		}
	}); 
}); 