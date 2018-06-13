// custom JS code 
$(document).ready( function(){

    // All functions call
    $(function(){
        DrawFloorMap();
        dragDesk();
        DragMe();
    });

    //remove the indivual desk when click on close icon
    $(document).on("click", ".closeIt", function(){
        var parent = $(this).parent();
        parent.remove();
      });
      
    // DrawFloorMap data in localStorage
    function DrawFloorMap() {
        var getDOM = localStorage.getItem('floorzonemap');
        $("#floorZone").html(getDOM);
    }  

    function dragDesk(){
        $(".dragDesk").draggable({
          helper: 'clone',
          cursor: 'move',
          tolerance: 'fit',
          revert: true 
        });
        $("#floorZone").droppable({
            accept: '.dragDesk',
            drop: function(e, ui) {                
                var x_cord, y_cord;
                dragEl = ui.helper.clone();
                ui.helper.remove();

                leftPosition  = ui.offset.left - $(this).offset().left;
                topPosition   = ui.offset.top - $(this).offset().top;
       
                dragEl.draggable({
                  helper: 'original',
                  cursor: 'move',
                  tolerance: 'fit',
                  drop: function (event, ui) {
                    $(ui.draggable).remove();
                  }
                });

                x_cord = $(dragEl).css('left');
                y_cord = $(dragEl).css('top');
                $(dragEl).attr('data-x-cord', x_cord).attr('data-y-cord', y_cord);
                
                dragEl.addClass("dragMe");
                dragEl.removeClass("dragDesk col-sm-6 parent");
                dragEl.find("span.closeIt").removeClass("hideIt");
                dragEl.appendTo('#floorZone');
                DragMe();
            }
        });
    }

    function DragMe(){
        //var document_id;        
        $(".dragMe").draggable({
            containment: "#floorZone",
            cursor: 'move',
            stack: $('#floorZone'),
            scroll: false,
            appendTo: $("#floorZone"),
            start: function(event, ui) {
                startPosition = $(this).position();
            },
            stop: function(event, ui) {
                dragEl        = $(this);
                stopPosition  = dragEl.position();
                x_cord = $(dragEl).css('left');
                y_cord = $(dragEl).css('top');
                $(dragEl).attr('data-x-cord', x_cord).attr('data-y-cord', y_cord);                
            }
        });
      }
      // save data in localStorage
      $("#saveData").on("click", function(){
        var elem = $("#floorZone").html();
        localStorage.setItem('floorzonemap', elem);
      });
});
