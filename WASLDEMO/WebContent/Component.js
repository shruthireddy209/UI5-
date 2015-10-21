jQuery.sap.require("jquery.sap.storage");
sap.ui.core.UIComponent.extend("sap.ui.hul.projectmanagement.Component", {
  metadata: {
    routing: {
      config: {
        viewType: "XML",
        viewPath: "view",
        targetControl: "splitApp",
        clearTarget: false,
        transition: "slide"
      },
      routes: [
        {
          pattern: "Home",
          name: "Home",
          view: "Home",
          targetAggregation: "pages"
        },
        {
          pattern: "Customer",
          name: "Customer",
          view: "Customer",
          targetAggregation: "pages"
        },
        {
            pattern: "Sales",
            name: "Sales",
            view: "sales",
            targetAggregation: "pages"
          },
          {
              pattern: "Claims",
              name: "Claims",
              view: "claims",
              targetAggregation: "pages"
            },
            {
                pattern: "Calls",
                name: "Calls",
                view: "supportCalls",
                targetAggregation: "pages"
              },
        {
          pattern: "",
          name: "default",
          view: "Home",
          targetAggregation: "pages"
        },
        {
			pattern: "Customers/{cust}",
			name: "Customers",
			view: "CustomerDetail",
			viewLevel: 2,
			targetAggregation: "pages",
			subroutes: [
				{
					pattern: "Prod/{cat}/lineId/{id}/product/{productId}",
					name: "product",
					view: "ProductDetail",
					viewLevel: 3,
					targetAggregation: "detailPages"
				}
			]

		}
      ]
    }
  },
  init : function () {
    jQuery.sap.require("sap.m.routing.RouteMatchedHandler");
    jQuery.sap.require("sap.ui.core.routing.HashChanger");
    jQuery.sap.require("sap.ui.hul.projectmanagement.myRouter");
    jQuery.sap.storage.put("model",null);
    // call overwritten init (calls createContent)
    sap.ui.core.UIComponent.prototype.init.apply(this, arguments);
    //extend the router
    this._router = this.getRouter();
    jQuery.extend(this._router, sap.ui.hul.projectmanagement.myRouter);
    //navigate to initial page for !phone
   
      this._router._myNavToWithoutHash("view.Home", "XML", false);
    
    // initialize the router
    this._routeHandler = new sap.m.routing.RouteMatchedHandler(this._router);
    this._router.initialize();
    
  },
  destroy : function () {
    if (this._routeHandler) {
      this._routeHandler.destroy();
    }
    // call overriden destroy
    sap.ui.core.UIComponent.prototype.destroy.apply(this, arguments);
  },
  createContent : function () {
    // set i18n model
    var oI18nModel = new sap.ui.model.resource.ResourceModel({
      bundleUrl : "i18n/messageBundle.properties"
    });
 
    sap.ui.getCore().setModel(oI18nModel, "i18n");
    // create root view
    var oView = sap.ui.view({
      id : "app",
      viewName : "view.App",
      type : "JS",
      viewData : { component : this }
    });
    oView.setModel(oI18nModel, "i18n");
    var url_zoneCallList ="http://A2COEMS00002V.mindtree.com:8000/sap/opu/odata/sap/Z_CRM_IC_CALLS_SRV/CallsSet?$filter=IagentId eq 'M1021732' and ItimeZone eq 'EST'&$format=json";
    var oModel_ZoneCallList = new sap.ui.model.json.JSONModel(url_zoneCallList);
	// debugger;
 oView.setModel(oModel_ZoneCallList, "oModel_ZoneCallList");
 var length={visibleRowLength:undefined,
		 visibleRowLengthUnAssigned:undefined,
		 visibleRowLengthNotAcknowledged:undefined,
		 visibleRowLengthMissed:undefined,
		 visibleRowLengthPending:undefined}; 
 var lengthModel=new sap.ui.model.json.JSONModel(length);
 oView.setModel(lengthModel,"lengthModel");
 var statusData={statusArray:[{status:"Unassigned"},{status:"Not Acknowledged"},{status:"Missed"},{status:"Pending"}]}; 
 var statusModel=new sap.ui.model.json.JSONModel(statusData);
 oView.setModel(statusModel,"statusModel");
 debugger
 //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 
 var url_STATUS ="http://A2COEMS00002V.mindtree.com:8000/sap/opu/odata/sap/ZCRM_IC_MASTERDATA_SRV/StatusesSet?$filter= IListType eq 'ESTAT_SR' and ISpras eq '' &$format=json";
	
	jQuery.sap.require("sap.ui.model.odata.datajs");
	$.ajax({
		type:"GET",
		contentType : 'application/json',
		dataType : 'json',
		crossDomain: true,
		url:url_STATUS,
		headers: { 
         "Content-Type": "application/atom+xml;type=entry; charset=utf-8",
         "X-CSRF-TOKEN":"Fetch"
			},
		success : function(json,status,request) { 
			debugger;
			 token=request.getResponseHeader("x-csrf-token");
		   // alert("S1 token1 : "+token);
			 var oModel_STATUS = new sap.ui.model.json.JSONModel(url_STATUS);
				// debugger;
			 oView.setModel(oModel_STATUS, "oModel_STATUS");
			 
		},
		error : function(jqXHR, textStatus, errorThrown) {
			
		}
	});
 //@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@@
 
 
 
 var displayServiceRequestUrl="http://a2coems00002v.mindtree.com:8000/sap/opu/odata/sap/Z_WASL_SR_DISPLAY_SRV/ServicerequestsSet?$format=json";
 var oModel_DisplaySR=new sap.ui.model.json.JSONModel(displayServiceRequestUrl);
 oModel_DisplaySR.attachRequestCompleted(function(evt){
	 //sap.ui.getCore().byId("app").getModel("lengthModel").getData().visibleRowLengthUnAssigned=evt.getSource().getData().d.results.length; 
//	if(evt.getSource().getData().d.results.length>10)
//		{
//		evt.getSource().getData().d.results.length=10;
//		}
	 sap.ui.getCore().byId("app").getModel("lengthModel").getData().visibleRowLength= evt.getSource().getData().d.results.length;
	
	 sap.ui.getCore().byId("app").getModel("lengthModel").refresh();
	 //sap.ui.getCore().byId("AccountCP1-table").setBusy(false); 
	 debugger
 })

 oView.setModel(oModel_DisplaySR, "oModel_DisplaySR");
 
 
 
 debugger;
    var oModel=new sap.ui.model.json.JSONModel();
    oView.setModel(oModel);
    if(jQuery.sap.storage.get("model")==null)
    {
    	oModel.loadData("model/mock.json")
    	oModel.attachRequestCompleted(function(oEvt){
    		jQuery.sap.storage.put("model",oModel.getJSON())
    		oModel.setJSON(jQuery.sap.storage.get("model"));
    	});
    	oModel.attachRequestFailed(function(oEvt){
    		if(jQuery.sap.storage.get("model")!=null)
    			{
    			oModel.setJSON(jQuery.sap.storage.get("model"));
    			}
    		debugger;
    	});
    }
    var oDeviceModel = new sap.ui.model.json.JSONModel({
        isTouch : sap.ui.Device.support.touch,
        isNoTouch : !sap.ui.Device.support.touch,
        isPhone : sap.ui.Device.system.phone,
        isNoPhone : !sap.ui.Device.system.phone,
        listMode : (sap.ui.Device.system.phone) ? "None" : "SingleSelectMaster",
        listItemType : (sap.ui.Device.system.phone) ? "Active" : "Inactive"
      });
      oDeviceModel.setDefaultBindingMode("OneWay");
      oView.setModel(oDeviceModel, "device");



   
    // done
    return oView;
  }
});