sap.ui.core.Control.extend("customControls.Pyramid", { 

   metadata : {

         properties: {
           
              /*width: {type: 'int', defaultValue: 600},
              height: {type: 'int', defaultValue: 500},*/
           ctd:{type: 'int', defaultValue: 500},
           pop:{type: 'int', defaultValue: 500},
           val:{type: 'int', defaultValue: 500},
              model: {type : "any", defaultValue: new sap.ui.model.json.JSONModel()}
            }
      },
      
      renderer : function(oRm, oControl) {

            oRm.write("<div height='18rem'");
            oRm.writeControlData(oControl);
            oRm.addClass("Pyramid");
            oRm.writeClasses();
            oRm.write('>');
            oRm.write("</div>");
          },
       rerender:function(oRm, oControl)
       {

       },
      
          
     onAfterRendering: function(oEvent) {

     },
     
     
     loadChart:function(chartValue)
     {
       debugger;
       that=this;
       //$(this.oParent.getDomRef()).height("20rem")
       $(".Pyramid").empty();
       
        b = [200,10,50,310,350,310];
        a = [200,10,50,310,350,310];
      /* b = [300,30,210,180,390,180];
       a = [300,30,210,180,390,180];*/
        var svgContainer = d3.select(".Pyramid")
              .append("svg")
              .attr("width",$(this.oParent.getDomRef()).width()-85)
              .attr("height",$(this.oParent.getDomRef()).height()-85);
       
       if(chartValue.length>0)
         {
         if(chartValue[0].CTD<0)
           {
           chartValue[0].CTD=0;
           }
         if(chartValue[0].POP<0)
         {
         chartValue[0].POP=0;
         }

         if(chartValue[0].TOTAL>0)
           {
           ctdPerc=chartValue[0].CTD;
          popPerc=chartValue[0].POP;
         var totalWidth=($(this.oParent.getDomRef()).width());
          var totalHeight=($(this.oParent.getDomRef()).height());
          totalWidth=totalHeight;
          
         var  x1=0;
         var y1=0;;
         var x2=totalWidth*0.05;;
         var y2=totalHeight*0.75;
         var x3=totalWidth*0.90;
        var y3=y2;
        var midBaseX=((x3-x2)/2)+x2;
        var midBaseY=y2;
        var BigTriangleArea=(Math.sqrt(3)/4)*Math.pow(x3-x2, 2);
        var BigTriangleHeight=(Math.sqrt(3)/2)*(x3-x2);
        x1=midBaseX;
        y1=midBaseY-BigTriangleHeight;
        a=[x1,y1,x2,y2,x3,y3]
        //b=[76,183,20,280,300,280]
        //c=[216,134.5,20,280,300,280]

        var slopeLeft=(y2-y1)/(x2-x1);
        var slopeRight=(y3-y1)/(x3-x1);

        var leftConstant=y2-(slopeLeft*x2);
        var rightConstant=y3-(slopeRight*x3);

        var CTDTriangleArea=BigTriangleArea*ctdPerc;
        var CTDHeight=(2*CTDTriangleArea)/(x3-x2);
        var CTDY1=y2-CTDHeight;
        var CTDX1=(CTDY1-rightConstant)/slopeRight;
        c=[CTDX1,CTDY1,x2,y2,x3,y3];

        var POPTriangleArea=BigTriangleArea*popPerc;
        var POPHeight=(2*POPTriangleArea)/(x3-x2);
        var POPY1=y2-POPHeight;
        var POPX1=(POPY1-leftConstant)/slopeLeft;
        b=[POPX1,POPY1,x2,y2,x3,y3]

        var ctdColor,popColor

    // sumit changed     
        svgContainer.append("rect")
               .style("fill","green")
               .attr("x", x2+x3-70).attr("y", 40).attr("height", 15).attr("width", 15);
              
              svgContainer.append("text").text("Efforts :  "+ parseFloat((chartValue[0].TOTAL)).toFixed(0)).attr("x", x2+x3-45).attr("y", 53);
             
        
        svgContainer.append("rect")
               .style("fill","blue")
               .attr("x", x2+x3-70).attr("y", 70).attr("height", 15).attr("width", 15);
              
              svgContainer.append("text").text("CTD :  "+ (ctdPerc*100).toFixed(0) + "%").attr("x", x2+x3-45).attr("y", 83);
             // svgContainer.append("text").text("%age: "+  ctdPerc*100+"%").attr("x", x2+x3-5).attr("y", 103);
              
              
              svgContainer.append("rect")
                   .style("fill", "orange")
                   .attr("x", x2+x3-70).attr("y", 100).attr("height", 15).attr("width", 15);
              
              svgContainer.append("text").text("POP :  "+ (popPerc*100).toFixed(0) +"%").attr("x",x2+x3-45).attr("y", 113);
             // svgContainer.append("text").text("%age: "+ popPerc*100+"%").attr("x",x2+x3-5).attr("y", 133);

         svgContainer.append("polygon")
         .style("stroke", "darkgreen")
         .style("stroke-width","3")
         .style("fill","green")
         .attr("points", a);
         
         if(CTDTriangleArea <= POPTriangleArea)
      {
           svgContainer.append("polygon")
             .style("stroke", "darkorange")
             .style("stroke-width","1")
             .style("fill", "orange")
             .attr("points", b); 
            
             svgContainer.append("polygon")
             .style("stroke", "darkblue")
             .style("stroke-width","1")
             .style("fill", "blue")
             .attr("points",c);
      }
         else
           {

            
             svgContainer.append("polygon")
             .style("stroke", "darkblue")
             .style("stroke-width","1")
             .style("fill", "blue")
             .attr("points",c);
             svgContainer.append("polygon")
             .style("stroke", "darkorange")
             .style("stroke-width","1")
             .style("fill", "orange")
             .attr("points", b); 
           }
           }
         else
           {

           svgContainer.append("rect")
                   .style("fill","white")
                   .attr("x", 210).attr("y", 120).attr("height",200).attr("width", 200);
           }
//         svgContainer.append("rect")
//               .style("fill","red")
//               .attr("x", x2).attr("y", 120).attr("height", 100).attr("width", 200);
//             svgContainer.append("text").text("No Data").attr("x",x2+100).attr("y", 170);
         
   }
       else
         {
         var svgContainer = d3.select(".Pyramid")
                 .append("svg")
                 .attr("width",$(this.oParent.getDomRef()).width())
                 .attr("height",$(this.oParent.getDomRef()).height());
         svgContainer.append("rect")
                 .style("fill","white")
                 .attr("x", 210).attr("y", 120).attr("height",200).attr("width", 200);
         }
     }
      
      
})