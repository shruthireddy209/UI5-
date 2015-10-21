sap.ui.controller("view.App", {

/**
* Called when a controller is instantiated and its View controls (if available) are already created.
* Can be used to modify the View before it is displayed, to bind event handlers and do other one-time initialization.
* @memberOf view.App
*/
	onInit: function() {
		this._router = sap.ui.core.UIComponent.getRouterFor(this); 
	},

/**
* Similar to onAfterRendering, but this hook is invoked before the controller's View is re-rendered
* (NOT before the first rendering! onInit() is used for that one!).
* @memberOf view.App
*/
//	onBeforeRendering: function() {
//
//	},
	customerPress:function()
	{
		this._router.navTo("Customer")
		this.getView().byId("myShell").setShowPane(false);
	},
	   salesPress:function()
       {
     	
     	  this._router.navTo("Sales");
     	 sap.ui.getCore().byId("myShell").setShowPane(false);
       },
       claimsPress:function()
       {
     	 
     	  this._router.navTo("Claims");
     	 sap.ui.getCore().byId("myShell").setShowPane(false);
       },
       callsPress:function()
       {
     	 
     	  this._router.navTo("Calls");
     	 sap.ui.getCore().byId("myShell").setShowPane(false);
       },
	homePress:function()
	{
		this._router.navTo("Home")
	}
/**
* Called when the View has been rendered (so its HTML is part of the document). Post-rendering manipulations of the HTML could be done here.
* This hook is the same one that SAPUI5 controls get after being rendered.
* @memberOf view.App
*/
//	onAfterRendering: function() {
//
//	},

/**
* Called when the Controller is destroyed. Use this one to free resources and finalize activities.
* @memberOf view.App
*/
//	onExit: function() {
//
//	}

});