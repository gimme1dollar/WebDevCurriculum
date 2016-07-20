$.ajax({
    url: "/note",
    method: "GET",
    success: function(res) {
      if(res.status == "success") {
        $("#filename").val(res.filename);
        $("#notepad").val(res.content);
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
