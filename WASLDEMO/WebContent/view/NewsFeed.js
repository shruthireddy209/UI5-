 jQuery.sap.declare("view.NewsFeed");  
sap.ui.core.Control.extend('view.NewsFeed', {
  metadata: {
    properties: {
      text: {type: 'string', defaultValue: 'Example'},
      width : {type : 'sap.ui.core.CSSSize', defaultValue: '100%'},
      scrolldelay: {type: 'integer', defaultValue: 100}
    }
  },

  renderer: function(oRm, oCtrl) {
	  debugger
    oRm.write('<div style="width:' + oCtrl.getWidth() + '" ');
    oRm.writeControlData(oCtrl);
    oRm.addClass('dennisseahNewsFeed');
    oRm.writeClasses();
    oRm.write('>');
    oRm.write('<marquee scrolldelay="' + oCtrl.getScrolldelay() + '">' + oCtrl.getText() + '</marquee>');
    oRm.write('</div>');
  }
});
