jQuery.sap.require("util.Formatter");
jQuery.sap.require("jquery.sap.storage");
sap.ui.controller("view.Home",
        {
          /**
           * Called when a controller is instantiated and its View
           * controls (if available) are already created. Can be used
           * to modify the View before it is displayed, to bind event
           * handlers and do other one-time initialization.
           *
           * @memberOf view.Home
           */
          onInit : function() {
        	  that=this;
              this._router = sap.ui.core.UIComponent.getRouterFor(this);
              var data={"modelData":[{"revenue":"1223","name":"MOC Achievement"},{"revenue":"1323","name":"Balance to Achieve MOC Target"}]}
              var oModel  = new sap.ui.model.json.JSONModel();
              oModel.setData(data);
              	this.getView().setModel(oModel);
              	var oTable=this.byId('AccountCP1');
//              	oTable.onAfterRendering = function() {
//              		debugger
//              	  if (sap.ui.table.Table.prototype.onAfterRendering) {
//              	    sap.ui.table.Table.prototype.onAfterRendering.apply(this, arguments);
//              	  }
//              	  var tbl = this;
//              	 
//              	  this.$().find('.sapUiTableTr').each(function() {
//              	    var row = sap.ui.getCore().byId($(this).attr('id'));
//              	    var cxt = row.getBindingContext("oModel_DisplaySR");
//              	    if (cxt) {
//              	      var obj = cxt.getObject();
//              	      
//              	    }
//              	  });
//              	}
              	//oTable.attachBrowserEvent("mouseover", this.enableValues);
            
          },
      /*    
          enableValues: function(oEvent) {
        	  debugger
        	  if( oEvent.target.childNodes[0].id.search('row') != -1 )
        		{
        	  var x=oEvent.target.attributes.id.value;//__text3-col3-row10
        	 var currentRow=x.substr(x.length-2);
        	 console.log("currentRow : "+currentRow)
        		}
        	 else
        		 {return}
          	  var oData = this.getBindingContext("oModel_DisplaySR").getModel().getData(this.getBindingContext("oModel_DisplaySR").sPath);
          },*/
          onPressSoldToParty: function(evt)
          {
        		
      		
        	  
        		if (!this._oserviceRequest) {
        			this._oserviceRequest = sap.ui
        					.xmlfragment(
        							"view.hoverFragment",
        							this);

        			debugger;
        			this.getView().addDependent(
        					this._oserviceRequest);
        		} 
        		 this.bindingContext=evt.getSource().getParent().oBindingContexts;
          		this.pathIndex=this.bindingContext.oModel_DisplaySR.sPath.split("/")[3];
          		var data=this.bindingContext.oModel_DisplaySR.oModel.oData.d.results[this.pathIndex];
          		var objArray=[];
          		objArray.push(data);
          		var oModel_SelectedDisplaySR= new sap.ui.model.json.JSONModel(objArray);
          		this._oserviceRequest.setModel(oModel_SelectedDisplaySR,"oModel_SelectedDisplaySR");
          		
          		 if (!this._oTicket) {
         			this._oTicket = sap.ui
         					.xmlfragment(
         							"view.Ticket",
         							this);

         			debugger;
         			this.getView().addDependent(
         					this._oTicket);
         		} 
          		this._oTicket.setModel(oModel_SelectedDisplaySR,"oModel_SelectedDisplaySR");
        		this._oserviceRequest.openBy(evt.getSource());
          },
          
          handleServiceRequest : function(evt)
          {debugger;

    		 if (!this._oTicket) {
        			this._oTicket = sap.ui
        					.xmlfragment(
        							"view.Ticket",
        							this);

        			debugger;
        			this.getView().addDependent(
        					this._oTicket);
        		} 
    		 this.bindingContext=evt.getSource().getParent().oBindingContexts;
     		this.pathIndex=this.bindingContext.oModel_DisplaySR.sPath.split("/")[3];
     		var data=this.bindingContext.oModel_DisplaySR.oModel.oData.d.results[this.pathIndex];
     		var objArray=[];
     		objArray.push(data);
     		var oModel_SelectedDisplaySR= new sap.ui.model.json.JSONModel(objArray);
     		this._oTicket.setModel(oModel_SelectedDisplaySR,"oModel_SelectedDisplaySR");
     		debugger
     		
//     		this.ServiceRequestId=this.bindingContext.oModel_DisplaySR.oModel.oData.d.results[this.pathIndex].ServiceRequestId;
//     		var displayServiceRequestUrl="http://A2COEMS00002V.mindtree.com:8000/sap/opu/odata/sap/Z_WASL_SR_DISPLAY_SRV/ServicerequestsSet?$format=json";	
//     		var displayServiceRequestUrl1="http://a2coems00002v.mindtree.com:8000/sap/opu/odata/sap/Z_WASL_SR_DISPLAY_SRV/ServicerequestsSet?$filter=%20IobjectId%20eq%20%27ServiceRequestId%27%20&$format=json";
//     		var oModel= sap.ui.getCore().byId("app").getModel("oModel_DisplaySR"); 		
//      oModel.loadData(displayServiceRequestUrl);
//        oModel.attachRequestCompleted(function(evt){
//     	   sap.ui.getCore().byId("app").getModel("oModel_DisplaySR").refresh();
// 	 debugger
//  }); 
 
   		 
        		this._oTicket.open();
          },
          closeTicketPopOver: function(evt)
          {
        	  this._oTicket.close();//service request id link fragment
          },
          closeSoldToPartyPopOver: function(evt)
          {
        	  //this._oserviceRequest.close();//closing hover popover //sold to party link
        	  if (!this._oTicket) {
      			this._oTicket = sap.ui
      					.xmlfragment(
      							"view.Ticket",
      							this);

      			debugger;
      			this.getView().addDependent(
      					this._oTicket);
      		} 
        	  this._oTicket.open();
          },
          
          onFilterResizeTable:function(oEvent)
          {
        	  debugger;
                var query=oEvent.getParameter("value");
                var filterArray=[];
                var contains = sap.ui.model.FilterOperator.Contains;
                var EQ = sap.ui.model.FilterOperator.EQ;
                var filters = new sap.ui.model.Filter(
                		[new sap.ui.model.Filter("SoldToPartyName",contains, query),
                		new sap.ui.model.Filter("RentalUnit",contains, query),
                		new sap.ui.model.Filter("CreatedDate",contains, query),
                		new sap.ui.model.Filter("Status",contains, query),
                		new sap.ui.model.Filter("PriorityCode",contains, query),
                		new sap.ui.model.Filter("EmployeeName",contains, query),
                		new sap.ui.model.Filter("ServiceRequestId",contains, query)],
                		 false);
                filterArray.push(filters);
                var oTable=this.byId("AccountCP1");
                var bindings=oTable.getBinding("rows");
                bindings.filter(filterArray);
                var length=oTable.getBinding("rows").iLength;
          
                sap.ui.getCore().byId("app").getModel("lengthModel").oData.visibleRowLength=length;
                sap.ui.getCore().byId("app").getModel("lengthModel").refresh();
                debugger;
              
          },
          IconBarSelect:function(evt)
          {
        	  var selectedKey=evt.getSource().getSelectedKey();
        	  if(selectedKey==1)
        	  {
        		  var query="Unassigned";
        	  }
        	  else if(selectedKey==2)
        	  {
        		  var query="Not Acknowledged";
        	  }
        	  else if(selectedKey==3)
        	  {
        		  var query="Missed";
        	  }
        	  else
        	  {
        		  var query="Pending";
        	  }
              var filterArray=[];
              var contains = sap.ui.model.FilterOperator.Contains;
              var EQ = sap.ui.model.FilterOperator.EQ;
              var filters = new sap.ui.model.Filter(
              		[
              		new sap.ui.model.Filter("Status",contains, query)
              	],
              		 false);
              filterArray.push(filters);
              var oTable=this.byId("AccountCP1");
              var bindings=oTable.getBinding("rows");
              bindings.filter(filterArray);
              var length=oTable.getBinding("rows").iLength;
            
              if(selectedKey==1)
        	  {
            	   sap.ui.getCore().byId("app").getModel("lengthModel").oData.visibleRowLengthUnAssigned=length;        	
            	   }
        	  else if(selectedKey==2)
        	  {
        		  sap.ui.getCore().byId("app").getModel("lengthModel").oData.visibleRowLengthNotAcknowledged=length;
        	  }
        	  else if(selectedKey==3)
        	  {
        		  sap.ui.getCore().byId("app").getModel("lengthModel").oData.visibleRowLengthMissed=length;
        	  }
        	  else
        	  {
        		  sap.ui.getCore().byId("app").getModel("lengthModel").oData.visibleRowLengthPending=length;
        	  }
     		
     		
              sap.ui.getCore().byId("app").getModel("lengthModel").oData.visibleRowLength=length;
           
            
             
              
              sap.ui.getCore().byId("app").getModel("lengthModel").refresh();
        	  debugger;
          },
          SaveUpdatedRecord:function()
          {
        	  var statusCode="";
        	  var value= sap.ui.getCore().byId("iStatusCombo").getValue();
        	  if(value=="Unassigned")
        		  {
        		  
        		  statusCode="E0001";
        		  }
        	  else if(value=="Not Acknowledged")
        		  {
        		  statusCode="E0002";
        		  }
        	  else if(value=="Missed")
    		  {
    		  statusCode="E0005";
    		  }
        	  else if(value=="Pending")
    		  {
    		  statusCode="E0006";
    		  }
        	  debugger
        	 //var statusCode= this._oTicket.getModel("oModel_SelectedDisplaySR").getData()[0].StatusCode;
        	 var ServiceRequestId=this._oTicket.getModel("oModel_SelectedDisplaySR").getData()[0].ServiceRequestId
        	 debugger;
         var xml="<?xml version='1.0' encoding='utf-8'?>"
        	 +"<entry xml:base='http://A2COEMS00002V.mindtree.com:8000/sap/opu/odata/sap/Z_WASL_SR_DISPLAY_SRV/' xmlns='http://www.w3.org/2005/Atom' xmlns:m='http://schemas.microsoft.com/ado/2007/08/dataservices/metadata' xmlns:d='http://schemas.microsoft.com/ado/2007/08/dataservices'>"
        	 +"<id>http://A2COEMS00002V.mindtree.com:8000/sap/opu/odata/sap/Z_WASL_SR_DISPLAY_SRV/UpdateRequestsSet(IactiveStatus='"+statusCode+"',IbusTransactionId='"+ServiceRequestId+"')</id>"
        	 +"<title type='text'>UpdateRequestsSet(IactiveStatus='"+statusCode+"',IbusTransactionId='"+ServiceRequestId+"')</title>"
        	 +"<updated>2015-10-15T13:55:40Z</updated>"
        	 +"<category term='Z_WASL_SR_DISPLAY_SRV.UpdateRequests' scheme='http://schemas.microsoft.com/ado/2007/08/dataservices/scheme'/>"
        	 +"<link href=\"UpdateRequestsSet(IactiveStatus='"+statusCode+"',IbusTransactionId='"+ServiceRequestId+"')\" rel='self' title='UpdateRequests'/>"
        	 +"<content type='application/xml'>"
        	  +"<m:properties>"
        	    +"<d:IactiveStatus>"+statusCode+"</d:IactiveStatus>"
        	    +"<d:IbusTransactionId>"+ServiceRequestId+"</d:IbusTransactionId>"
        	    +"<d:EmsgType/>"
        	    +"<d:Emessage/>"
        	   +"</m:properties>"
        	  +"</content>"
        	 +"</entry>";
        	  
        	  
        	  var url="http://A2COEMS00002V.mindtree.com:8000/sap/opu/odata/sap/Z_WASL_SR_DISPLAY_SRV/UpdateRequestsSet(IactiveStatus='"+statusCode+"',IbusTransactionId='"+ServiceRequestId+"')";
         
      		$.ajax({
    			contentType: 'application/xml',
    			data: xml,
    			crossDomain: true,
    				url: url,
    				dataType: "json",
    				type: 'PUT',
    				headers: { 
    					  "X-Requested-With": "XMLHttpRequest",
    		              "Content-Type": "application/xml",
    		              "DataServiceVersion": "2.0",       
    		              "X-CSRF-TOKEN":token,
    		             "Accepts":"application/json"
    					},
    					
    				success : function(data, textStatus, request){
    			
    						 debugger;
    					
    						 sap.ui.getCore().byId("app").getModel("lengthModel").refresh(); 
    						 sap.ui.getCore().byId("app").getModel("oModel_DisplaySR").refresh(); 
    						 location.reload();
    						 sap.m.MessageToast.show("Status Updated Successfully\n");
    						 that._oTicket.close();
    						  },
    				error : function(jqXHR,  textStatus,  errorThrown) {
    					
    					sap.m.MessageToast.show("Error while updating status\n");
    					this._oTicket.open();
    					}
    				});
          },
           onBeforeRendering:function()
          {
        	 
//        	   this.byId("daterangesel").setMax(new Date(2015, 9, 21));
//         		this.byId("daterangesel").setMin(new Date(2015, 9, 15));
//         		this.byId("daterangesel").setValue2(new Date(2015, 9, 21));
//         		this.byId("daterangesel").setValue(new Date(2015, 9, 15));
//       		this.byId("daterangesel").setDateFormat(sap.ui.core.format.DateFormat.getDateInstance(new sap.ui.core.Locale("de")));
//    		this.byId("daterangesel").setLabels(['Day1','Day2','Day3','Day4', 'Day5', 'Day6', 'Day7']);
           //this.getView().byId("dateRangeSlider").setMax(new Date())
          },
          onAfterRendering: function() {
        	  this.byId("daterangesel").setDateFormat(sap.ui.core.format.DateFormat.getDateInstance(new sap.ui.core.Locale("de")));
        	  this.byId("daterangesel").setMin(new Date(2015, 9, 17));
        	  this.byId("daterangesel").setValue(new Date(2015, 9, 17));
        	 
        	  
        	  this.byId("daterangesel").setMax(new Date(2015, 9, 21));
        	  this.byId("daterangesel").setValue2(new Date(2015, 9, 21));
        	 
        	
        	
        
       		 
       		
       		 this.byId("daterangesel").setSmallStepWidth(1);
     	      this.byId("daterangesel").setTotalUnits(4);
     		  this.byId("daterangesel").setLabels(['Day1','Day2','Day3','Day4', 'Day5']); 
  		
        	 
//        	  idTableControl= this.byId('AccountCP1').sId;
//        	  $("#" + idTableControl).on('mouseover',function(evt){  
//                var x=  $("#" + idTableControl).find('.sapUiTableRowHvr')  ;
//                alert(x);
      //  })  
        	  
//              debugger;
//              var controller = this;
//              var tab = this.byId('AccountCP1');
//              var c = this;
//              window.table1 = tab;
//              tab.constructor.prototype.onAfterRendering = function() {
//                     this.$().bind("mouseover", jQuery.proxy(this.handleClick, this));  
//                     this.$().bind("mouseout", jQuery.proxy(this.handleClick2, this));
//              };
//                     
//              tab.constructor.prototype.handleClick = function(oEvent) {
//                     //console.log(oEvent);
//                     if( oEvent.target.childNodes[0] !== undefined && oEvent.target.childNodes[0].id !== undefined) {
//                           var rowId = oEvent.target.childNodes[0].id.substr(-1);
//                           console.log(rowId);
//                           if(rowId !== undefined && rowId !== null && rowId !== "" && rowId.toString() !== 'NaN') {
//                                  rowId = parseInt(rowId);   
//                                  console.log(rowId+1);
//                                  if (!c.oPop) {
//                                         c.oPop = sap.ui.xmlfragment("view.hoverFragment", c);
//                                         c.getView().addDependent(c.oPop);
//                                  }
//                                  var context = this.getContextByIndex(rowId);
//                                  c.oPop.setBindingContext(context);
//                                  var col0 = tab.getRows()[rowId].getCells()[0]; 
//                                  c.oPop.openBy(col0);
//                           }
//                     }      
//              };
//              
//              tab.constructor.prototype.handleClick2 = function(oEvent) {
//                     if(!c.oPop) {
//                           return;
//                     }
//                     else{
//                          c.oPop.close();
//                     }
//              }
              

      	},

                 });