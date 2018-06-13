// custom JS code 
$(document).ready( function(){
    // startDate and endDate deskBooking    
    $(function(){
        DrawFloorMap();
        DragSigner();
        DragMe();
    });

    //remove the dragsigner when click on close icon
    $(document).on("click", ".closeIt", function(){
        var parent = $(this).parent();
        parent.remove();
      });
      
    function DrawFloorMap() {
        var getDOM = localStorage.getItem('floorzonemap');
        $("#floorZone").html(getDOM);
    }  

    function DragSigner(){
        $(".dragSigners").draggable({
          helper: 'clone',
          cursor: 'move',
          tolerance: 'fit',
          revert: true 
        });
        $("#floorZone").droppable({
            accept: '.dragSigners',
            activeClass: "drop-area",
            drop: function(e, ui) {
                
                var x_cord, y_cord;
                dragEl = ui.helper.clone();
                ui.helper.remove();

                document_id   = dragEl.data("document-id");
                signer_id     = dragEl.data("signer-id");
                leftPosition  = ui.offset.left - $(this).offset().left;
                topPosition   = ui.offset.top - $(this).offset().top;
       
                // debug current dropped position
                $(".result1").text("Result 1:- top: " + topPosition + ", left: " + leftPosition);
                dragEl.data("signer-id", signer_id);

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
                // append element to #floorZone
                dragEl.addClass("dragMe");
                dragEl.removeClass("dragSigners col-sm-6 parent");
                dragEl.find("span.closeIt").removeClass("hideIt");
                dragEl.appendTo('#floorZone');
                // update draged element position to database
                // updateDraggedPosition(dragEl, stopPosition, document_id, signer_id)
                // activate dragging for cloned element
                DragMe();
            }
        });
    }

    function DragMe(){
        var document_id;        
        $(".dragMe").draggable({
            containment: "#floorZone",
            cursor: 'move',
            // opacity: 0.35,
            stack: $('#floorZone'),
            scroll: false,
            appendTo: $("#floorZone"),
            start: function(event, ui) {
                startPosition = $(this).position();
            },
            stop: function(event, ui) {
                dragEl        = $(this);
                stopPosition  = dragEl.position();
                document_id   = dragEl.data("document-id");
                signer_id     = dragEl.data("signer-id");
                x_cord = $(dragEl).css('left');
                y_cord = $(dragEl).css('top');
                $(dragEl).attr('data-x-cord', x_cord).attr('data-y-cord', y_cord);
                // debug current dropped position
                // this position is working perfectly fine.
                // above drag, drop and clone position should behave like this
                $(".result2").text("Result 2:- top: " + stopPosition.top + ", left: " + stopPosition.left); 
                  
                console.log(dragEl.hasClass("parent"))
                if(!dragEl.hasClass("parent")){
                 // updateDraggedPosition(dragEl, stopPosition, document_id, signer_id)
                }
            }
        });
      }
      
      $("#saveData").on("click", function(){
        var elem = $("#floorZone").html();
        localStorage.setItem('floorzonemap', elem);
      });
});
