import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'app-pivot-table',
  templateUrl: './pivot-table.component.html',
  styleUrls: ['./pivot-table.component.scss'],
})
export class PivotTableComponent {
  title:string = `
  <!DOCTYPE html>
  <html>
      <head>
          <title>Pivot Demo From Local CSV</title>
          <script>
            (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
            (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
            m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
            })(window,document,'script','https://www.google-analytics.com/analytics.js','ga');
  
            ga('create', 'UA-46914903-2', 'auto');
            ga('send', 'pageview');
  
          </script>
          <!-- external libs from cdnjs -->
          <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jquery/1.11.2/jquery.min.js"></script>
          <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script>
          <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/d3/3.5.5/d3.min.js"></script>
          <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/jqueryui-touch-punch/0.2.3/jquery.ui.touch-punch.min.js"></script>
          <script type="text/javascript" src="https://cdnjs.cloudflare.com/ajax/libs/PapaParse/4.1.2/papaparse.min.js"></script>
          <script src="https://cdn.plot.ly/plotly-basic-latest.min.js"></script>
  
          <!-- PivotTable.js libs from ../dist -->
          <link rel="stylesheet" type="text/css" href="https://localhost:8110/vgmsg/js/pivot.css">
          <script type="text/javascript" src="https://localhost:8110/vgmsg/js/pivot.js"></script>
          <script type="text/javascript" src="https://localhost:8110/vgmsg/js/d3_renderers.js"></script>
          <script type="text/javascript" src="https://localhost:8110/vgmsg/js/plotly_renderers.js"></script>
          <script type="text/javascript" src="https://localhost:8110/vgmsg/js/export_renderers.js"></script>
  
          <style>
              html { height:100%; }
              body {
                  font-family: Verdana;
                  min-height: 95%;
                  border: 5px dotted;
              }
              .whiteborder {border-color: white;}
              .greyborder {border-color: lightgrey;}
              #filechooser {
                  color: #555;
                  text-decoration: underline;;
                  cursor: pointer; /* "hand" cursor */
              }
              .node {
                border: solid 1px white;
                font: 10px sans-serif;
                line-height: 12px;
                overflow: hidden;
                position: absolute;
                text-indent: 2px;
              }
          </style>
      </head>
      <body class="whiteborder">
          <script type="text/javascript">
              $(function(){
                  var renderers = $.extend(
                      $.pivotUtilities.renderers,
                      $.pivotUtilities.plotly_renderers,
                      $.pivotUtilities.d3_renderers,
                      $.pivotUtilities.export_renderers
                      );
  
                  var parseAndPivot = function(f) {
                      $("#output").html("<p align='center' style='color:grey;'>(processing...)</p>")
                      Papa.parse(f, {
                          skipEmptyLines: true,
                          error: function(e){ alert(e) },
                          complete: function(parsed){
                              $("#output").pivotUI(parsed.data, { renderers: renderers }, true);
                          }
                      });
                  };
  
                  $("#csv").bind("change", function(event){
                      parseAndPivot(event.target.files[0]);
                  });
  
                  $("#textarea").bind("input change", function(){
                      parseAndPivot($("#textarea").val());
                  });
  
                  var dragging = function(evt) {
                      evt.stopPropagation();
                      evt.preventDefault();
                      evt.originalEvent.dataTransfer.dropEffect = 'copy';
                      $("body").removeClass("whiteborder").addClass("greyborder");
                  };
  
                  var endDrag = function(evt) {
                      evt.stopPropagation();
                      evt.preventDefault();
                      evt.originalEvent.dataTransfer.dropEffect = 'copy';
                      $("body").removeClass("greyborder").addClass("whiteborder");
                  };
  
                  var dropped = function(evt) {
                      evt.stopPropagation();
                      evt.preventDefault();
                      $("body").removeClass("greyborder").addClass("whiteborder");
                      parseAndPivot(evt.originalEvent.dataTransfer.files[0]);
                  };
  
                  $("html")
                      .on("dragover", dragging)
                      .on("dragend", endDrag)
                      .on("dragexit", endDrag)
                      .on("dragleave", endDrag)
                      .on("drop", dropped);
               });
          </script>
          <p><a href="index.html">&laquo; back to PivotTable.js examples</a></p>
          <p align="center" style="line-height: 1.5">
              Drop a CSV file on this page or
              <label id="filechooser">click here to choose one<input id="csv" type="file" style="display:none"/></label>
              <br /><br />
              <textarea placeholder="or type or paste CSV text here" style="width: 300px;" id="textarea"></textarea>
              <br />
              <em><small>note: the data never leaves your browser!</small></em>
          </p>
  
          <div id="output" style="margin: 10px;"></div>
  
      </body>
  </html>
  `;
  constructor(private sanitizer: DomSanitizer) {}

  sanitizeHtml(html: string): SafeHtml {
    return this.sanitizer.bypassSecurityTrustHtml(html);
  }
}
