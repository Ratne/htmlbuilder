$(document).ready(function() {
  function initEditor(selector){
    0 < $(selector).length && tinymce.init({
        selector: "textarea"+selector,
        height: 300,
        plugins: ["code preview"],
        toolbar: "code preview",
        style_formats: [{
            title: "Bold text",
            inline: "b"
        }, {
            title: "Red text",
            inline: "span",
            styles: {
                color: "#ff0000"
            }
        }, {
            title: "Red header",
            block: "h1",
            styles: {
                color: "#ff0000"
            }
        }, {
            title: "Example 1",
            inline: "span",
            classes: "example1"
        }, {
            title: "Example 2",
            inline: "span",
            classes: "example2"
        }, {
            title: "Table styles"
        }, {
            title: "Table row 1",
            selector: "tr",
            classes: "tablerow1"
        }],
        setup: function(ed){
          ed.on('change',function(e){
            if(window.onTinyMCEContentChange){
              window.onTinyMCEContentChange(ed.getContent())
            }
          })
          ed.on('KeyDown',function(ed2,evt){
              if($("#elm1").data('max-chars') && $.trim(ed.getContent().replace(/(<([^>]+)>)/ig, "")).length>$("#elm1").data('max-chars')){
                  ed2.preventDefault();
                  ed2.stopImmediatePropagation();
                  return false;
              }
          })
        }
    })
  }

  if($("#elm1").length) initEditor("#elm1");
  if($(".textarea-editor").length) initEditor(".textarea-editor");
});