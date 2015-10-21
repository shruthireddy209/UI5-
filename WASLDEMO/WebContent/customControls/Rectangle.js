sap.ui.core.Control.extend("customControls.Rectangle", { 
	
	 metadata : {

	       properties: {
	            /*width: {type: 'int', defaultValue: 600},
	            height: {type: 'int', defaultValue: 500},*/
	            model: {type : "any", defaultValue: new sap.ui.model.json.JSONModel()}
	          }
	    },
	    
	    renderer : function(oRm, oControl) {
	          oRm.write("<div");
	          oRm.writeControlData(oControl);
	          oRm.addClass("Rectangle");
	          oRm.writeClasses();
	          oRm.write('>');
	          oRm.write("</div>");
	        },
	    
	        
	   onAfterRendering: function(oEvent) {
		   
		      
	   },
	   
	   loadChart :function(chartValue)
	   {
		   
		   that=this;
		   //$(this.oParent.getDomRef()).height("20rem")
		   $(".Rectangle").empty();
		     const height = 160;
			 const y = 30;
			 var width =($(this.oParent.getDomRef()).width())/10;
			 var gp1 = 0, gp2 = 0;
			 
			 
			 var svgContainer = d3.select(".Rectangle")
           .append("svg")
           .attr("width",$(this.oParent.getDomRef()).width())
           .attr("height",$(this.oParent.getDomRef()).height());

			 
			 if(chartValue.length>0)
			 {
				/*var OnOffTotalCost = parseFloat(chartValue[0].OnCost)+parseFloat(chartValue[0].OffCost);
				var OnOffTotalEffort = parseFloat(chartValue[0].OnEffort)+parseFloat(chartValue[0].OffEffort);*/
				var  RegionCost = parseFloat(chartValue[0].AZINDCOST)+parseFloat(chartValue[0].AZPHCOST)+parseFloat(chartValue[0].AZOTHCOST);
				var  RegionEffort = parseFloat(chartValue[0].AZINDEFF)+parseFloat(chartValue[0].AZPHEFF)+parseFloat(chartValue[0].AZOTHEFF);
				if(RegionCost<=0 || RegionEffort<=0)
					{
					
					
					}
				else
					{
				if(chartValue[0].AZINDEFF<0){chartValue[0].AZINDEFF=0;}
				if(chartValue[0].AZPHEFF<0){chartValue[0].AZPHEFF=0;}
				if(chartValue[0].AZOTHEFF<0){chartValue[0].AZOTHEFF=0;}
				if(chartValue[0].AZINDCOST<0){chartValue[0].AZINDCOST=0;}
				if(chartValue[0].AZPHCOST<0){chartValue[0].AZPHCOST=0;}
				if(chartValue[0].AZOTHCOST<0){chartValue[0].AZOTHCOST=0;}

				var  IndCost=Math.round((chartValue[0].AZINDCOST/RegionCost)*100);;
				var  PhiCost =Math.round((chartValue[0].AZPHCOST/RegionCost)*100);;
				var  OthCost = Math.round((chartValue[0].AZOTHCOST/RegionCost)*100);;
				var IndEffort= Math.round((chartValue[0].AZINDEFF/RegionEffort)*100);;
				var PhiEffort =Math.round((chartValue[0].AZPHEFF/RegionEffort)*100);
				var  OthEffort= Math.round((chartValue[0].AZOTHEFF/RegionEffort)*100);
				
				var OnCost =OthCost;
				var OffCost =IndCost+PhiCost;
				var  OnEffort=OthEffort;
				var  OffEffort =IndEffort+PhiEffort;
			 
			  if (IndCost == 0)
				  {
				  	gp1=0;
				  }
			  else 
				  {
				  	gp1 =10;
				  }
			  if (IndEffort == 0)
				  {
				  	gp2 = 0 
				  }
			  else gp2=10;
			  //Rectangle height calculator
			 function CalcHeight(Perc)
			   {
				  return (height * Perc)/100;
			   } 
			  
			  function CalcYCord(H)
			  {
				  return Math.round(H + y);
			  }
			  
			 /* var OnCost = 43, OffCost = 57, IndCost = 53, PhiCost = 4, OthCost= 43;
	 			 var OnEffort = 25, OffEffort = 75, IndEffort = 73, PhiEffort = 2, OthEffort = 25;
				  */
	 			 var IndCostH = CalcHeight(IndCost), PhCostH = CalcHeight(PhiCost), OthCostH = CalcHeight(OthCost);
	 			var IndEffH = CalcHeight(IndEffort), PhEffH = CalcHeight(PhiEffort), OthEffH = CalcHeight(OthEffort);
	 			  //Rectangle height calculator
	 			 function CalcHeight(Perc)
	 			   {
	 				  return (height * Perc)/100;
	 			   } 
	 			  
	 			  function CalcYCord(H)
	 			  {
	 				  return (H + y);
	  
	 			  }
	 			 svgContainer.append("text").text("Cost Mix").attr("font-size",16).attr("x", width*2).attr("y", y-10);
	 			 svgContainer.append("text").text("Effort Mix").attr("font-size",16).attr("x", width*5.5).attr("y", y-10);
	 		//CostMix	 
	 			 
		 			
	 		    svgContainer.append("rect").style("fill","brown").attr("x", width+width*0.50).attr("y",y).attr("height", IndCostH+PhCostH+10).attr("width", width);
		 		svgContainer.append("rect").style("fill","aqua").attr("x", width+width*0.50).attr("y", y+IndCostH+PhCostH+20).attr("height", OthCostH).attr("width", width);
		 		svgContainer.append("rect").style("fill","blue").attr("x", (3*width/2)+width+width*0.50).attr("y",y).attr("height",IndCostH ).attr("width", width);	 			
	 			svgContainer.append("rect").style("fill","green").attr("x", (3*width/2)+width+width*0.50).attr("y", y+IndCostH+gp1).attr("height",PhCostH).attr("width", width);
	 			svgContainer.append("rect").style("fill","yellow").attr("x", (3*width/2)+width+width*0.50).attr("y", y+IndCostH+PhCostH+20).attr("height",OthCostH).attr("width", width);
	 			 
	 			svgContainer.append("rect").style("fill","brown").attr("x", width*0.05).attr("y", 235).attr("height", 10).attr("width", width*0.20);
		       	svgContainer.append("text").text("Offshore : "+OffEffort+"%").attr("font-size",13).attr("x", width*0.30).attr("y", 245);
		        svgContainer.append("rect").style("fill","aqua").attr("x",width*0.05 ).attr("y", 255).attr("height", 10).attr("width", width*0.20);
		        svgContainer.append("text").text("Onsite : "+OnEffort+"%").attr("font-size",13).attr("x", width*0.30).attr("y", 265);
		           
		           
			           svgContainer.append("rect").style("fill","blue").attr("x",width*0.05).attr("y", 50).attr("height", 10).attr("width",width*0.05);
			       	   svgContainer.append("text").text("Ind : "+IndEffort+"%").attr("font-size",13).attr("x",width*0.15).attr("y", 60);
			           svgContainer.append("rect").style("fill","green").attr("x",width*0.05).attr("y", 90).attr("height", 10).attr("width",width*0.05);
			           svgContainer.append("text").text("Phil : "+PhiEffort+"%").attr("font-size",13).attr("x",width*0.15).attr("y", 100);
			           svgContainer.append("rect").style("fill","yellow").attr("x",width*0.05).attr("y", 130).attr("height", 10).attr("width",width*0.05);
			           svgContainer.append("text").text("Oth : "+OthEffort+"%").attr("font-size",13).attr("x",width*0.15).attr("y", 140);
	 			
	 		//Effort Mix	
	 			svgContainer.append("rect").style("fill","blue").attr("x", width+((7*width)/2)+width*0.50).attr("y",y).attr("height",IndEffH ).attr("width", width);
	 			svgContainer.append("rect").style("fill","green").attr("x",width+((7*width)/2)+width*0.50).attr("y", y+IndEffH+10).attr("height", PhEffH).attr("width", width);
	 			svgContainer.append("rect").style("fill","yellow").attr("x",width+((7*width)/2)+width*0.50).attr("y", y+IndEffH+PhEffH+20).attr("height",OthEffH ).attr("width", width);
	 			svgContainer.append("rect").style("fill","brown").attr("x",width+(5*width)+width*0.50).attr("y",y).attr("height", IndEffH+PhEffH+gp2).attr("width", width);
	 			svgContainer.append("rect").style("fill","aqua").attr("x",width+(5*width)+width*0.50).attr("y", y+IndEffH+PhEffH+20).attr("height", OthEffH).attr("width", width);
	 			
	 			
	 			 svgContainer.append("rect").style("fill","brown").attr("x", 7*width).attr("y", 235).attr("height", 10).attr("width", width*.20);
		       	 svgContainer.append("text").text("Offshore : "+OffCost+"%").attr("font-size",13).attr("x",7*width + width*.30).attr("y", 245);
		           svgContainer.append("rect").style("fill","aqua").attr("x", 7*width).attr("y", 255).attr("height", 10).attr("width", width*.20);
		           svgContainer.append("text").text("Onsite : "+OnCost+"%").attr("font-size",13).attr("x", 7*width + width*.30).attr("y", 265);
		            
		           
		          svgContainer.append("rect").style("fill","blue").attr("x",8*width-width*0.10).attr("y", 50).attr("height", 10).attr("width",width*0.05);
		       	   svgContainer.append("text").text("Ind : "+IndCost+"%").attr("font-size",13).attr("x",8*width).attr("y", 60);
		           svgContainer.append("rect").style("fill","green").attr("x",8*width-width*0.10).attr("y", 90).attr("height", 10).attr("width",width*0.05);
		           svgContainer.append("text").text("Phil : "+PhiCost+"%").attr("font-size",13).attr("x",8*width).attr("y", 100);
		           svgContainer.append("rect").style("fill","yellow").attr("x",8*width-width*0.10).attr("y", 130).attr("height", 10).attr("width",width*0.05);
		           svgContainer.append("text").text("Oth : "+OthCost+"%").attr("font-size",13).attr("x",8*width).attr("y", 140);
		           
		   
		          /* svgContainer.append("text").text(OnCost+"%").attr("x", 70).attr("y", y+(IndCostH+PhCostH)/2);
		       	svgContainer.append("text").text(OffCost+"%").attr("x", 70).attr("y", y+IndCostH+PhCostH+OthCostH/2+10);
	 			svgContainer.append("text").text(IndCost+"%").attr("x", 200).attr("y", y+(IndCostH)/2);
	 			svgContainer.append("text").text(PhiCost+"%").attr("x", 200).attr("y", y+IndCostH+PhCostH/2+10);
	 			svgContainer.append("text").text(OthCost+"%").attr("x", 160).attr("y", y+IndCostH+PhCostH+OthCostH/2+20);*/
	 			
	 			/*svgContainer.append("text").text(OthCost+"%").attr("x", 80).attr("y", y+(OthCostH)/2);
	 			svgContainer.append("text").text(OthCost+"%").attr("x", 80).attr("y", y+(OthCostH)/2);
	 			svgContainer.append("text").text(OthCost+"%").attr("x", 80).attr("y", y+(OthCostH)/2);
	 			svgContainer.append("text").text(OthCost+"%").attr("x", 80).attr("y", y+(OthCostH)/2);
	 			svgContainer.append("text").text(OthCost+"%").attr("x", 80).attr("y", y+(OthCostH)/2);*/
					}
			 }
	   }
	    
	    
})