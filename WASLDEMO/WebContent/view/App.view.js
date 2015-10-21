sap.ui.jsview("view.App", {

	getControllerName : function() {
		return "view.App";
	},
	createContent: function (oController) {
		
		this.setDisplayBlock(true);
		return new sap.ui.unified.Shell({
			id:"myShell",
			busy : false, // boolean
			busyIndicatorDelay : 1000, // int
			visible : true, // boolean
			showPane :"{device>/isNoPhone}", // boolean
			headerHiding : false, // boolean
			headerVisible : true, // boolean
			icon :"./images/wasl_193x43.png", // sap.ui.core.URI
			showCurtain : false, // boolean
			showCurtainPane : false, // boolean
			searchVisible : true, // boolean, since 1.18
			content :[new sap.m.App("splitApp", {backgroundColor :"#E2E2E2"})], // sap.ui.core.Control
			paneContent : [sap.ui.xmlfragment("view.sidePanel", oController)], // sap.ui.core.Control
			
			headItems : [ new sap.ui.unified.ShellHeadItem({
				id:"myRotatedIcon-icon",
				startsSection : true, // boolean
				showSeparator : false, // boolean, since 1.22.5
				selected : false, // boolean
				showMarker : false, // boolean
				icon : "sap-icon://menu2", // sap.ui.core.URI
				visible : true, // boolean, since 1.18
				press : [ function(oEvent) {
					
					debugger
					var control = oEvent.getSource();
				if(control.getIcon()=="sap-icon://menu2")
				{
					control.setIcon("./images/flip.PNG");
				}
				else{
					control.setIcon("sap-icon://menu2")
				    }
					
					 var oShell = sap.ui.getCore().byId("myShell");
		        	    var bState = oShell.getShowPane();
		        	    oShell.setShowPane(!bState);
		        	   // oItem.setShowMarker(!bState);
		        	   // oItem.setSelected(!bState);
				}, this ]
			}) ], // sap.ui.unified.ShellHeadItem
			headEndItems : [ new sap.ui.unified.ShellHeadItem({
				startsSection : true, // boolean
				showSeparator : false, // boolean, since 1.22.5
				selected : false, // boolean
				showMarker : false, // boolean
				icon : "sap-icon://home", // sap.ui.core.URI
				visible : true, // boolean, since 1.18
				press : [ function(oEvent) {
					var control = oEvent.getSource();
					oController.homePress(oEvent);
				}, this ]
			})], // sap.ui.unified.ShellHeadItem
			search :new sap.m.SearchField({
				busy : false, // boolean
				busyIndicatorDelay : 1000, // int
				visible : true, // boolean
				value : undefined, // string
				width :"100%", // sap.ui.core.CSSSize
				enabled : true, // boolean
				visible : true, // boolean
				maxLength : 0, // int
				placeholder : "", // string
				showMagnifier : true, // boolean
				showRefreshButton : false, // boolean, since 1.16
				refreshButtonTooltip : undefined, // string, since 1.16
				showSearchButton : true, // boolean, since 1.23
				selectOnFocus : true, // boolean, since 1.20
				search : [ function(oEvent) {
					var control = oEvent.getSource();
				}, this ],
				liveChange : [ function(oEvent) {
					var control = oEvent.getSource();
				}, this ]
			// since 1.9.1
			}), // sap.ui.core.Control
			user : new sap.ui.unified.ShellHeadUserItem({
				username : "User", // string
				showPopupIndicator : true, // boolean, since 1.27.0
				image : undefined, // sap.ui.core.URI
				press : [ function(oEvent) {
					var control = oEvent.getSource();
				}, this ]
			})
		// sap.ui.unified.ShellHeadUserItem, since 1.22.0
		}).addStyleClass("shell");
		 
		
		
		
	}
});