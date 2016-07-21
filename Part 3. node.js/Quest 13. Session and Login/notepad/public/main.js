$.ajax({
    url: "/note",
    method: "GET",
    success: function(res) {
      if(res.status == "success") {
  //      for(var i = 0; res.content.length; i++) {
          $("#filename").val(res.filename);
          $("#notepad").val(res.content);
  //      }
      }
    }
});

$(".btn-save").click(function(e) {
  e.preventDefault();
  var filename = $("#filename").val();
  var content = $("#notepad").val();
  $.ajax({
      url: "/note",
      method: "POST",
      data: {
          filename: filename,
          content: content
      },
      success: function(response) {
          if(response.status == "success") {
              alert("노트가 성공적으로 저장되었습니다.");
          } else {
              alert("노트 저장이 실패했습니다.");
          }
      }
  });
});

/* $(".btn-new").click(function(e) {
  var note = $("<textarea class='content' rows='1' id='filename'></textarea> <textarea class='content' rows='10' id='notepad'></textarea><button id='save' class='btn-save'>Save</button><button id='delete' class='btn-delete'>Delete</button> <br> </br>");
  var box = $("<button class = 'btn-show'> note </button>");

  $("body").append(note);
  $("body").prepend(box);

  $(".btn-save").click(function(e) {
    e.preventDefault();
    var filename = $("#filename").val();
    var content = $("#notepad").val();
    $.ajax({
        url: "/note",
        method: "POST",
        data: {
            filename: filename,
            content: content
        },
        success: function(response) {
            if(response.status == "success") {
                alert("노트가 성공적으로 저장되었습니다.");
            } else {
                alert("노트 저장이 실패했습니다.");
            }
        }
    });
  });

  $(".btn-delete").click(function(e) {
    e.preventDefault();
    note.hide();
    $(".btn-show").click(function(e) {
      note.show();
    })
  });
}); */
