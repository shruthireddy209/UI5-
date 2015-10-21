jQuery.sap.declare("util.Formatter");
jQuery.sap.require("sap.ui.core.format.DateFormat");
jQuery.sap.require("sap.ui.core.format.NumberFormat");
jQuery.sap.require("sap.ui.model.type.Date");

util.Formatter = {
	getValue : function(value1) {

		if (value1 != null) {

			var obj = this.oParent.getBindingContext().getObject();
			return obj.AZTOTFEES / obj.AZMANDAYS;
		} else
			return null;

	},
	date : function (value) {
		
		if (value) {
			
			var year=value.substr(0,4);
			var month=value.substr(4,2);
			var date=value.substr(6,2);
			
			var requiredFormat= date+"/"+month+"/"+year;
			return requiredFormat;
			
			//var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern: "dd/mm/yyyy"}); 
			//return oDateFormat.format(new Date(value));
		} else {
			return value;
		}
	},
	date1 : function (value) {
	
		if (value) {
			var JsExpression=eval("new " + value.split('/')[1]);
//			debugger;
		var oDateFormat = sap.ui.core.format.DateFormat.getDateTimeInstance({pattern: "dd/MM/yyyy"});

		return oDateFormat.format(new Date(JsExpression));
		} else {
		return JsExpression;
		}
	},

	

};