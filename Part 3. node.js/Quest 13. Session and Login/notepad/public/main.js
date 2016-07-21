$.ajax({
    url: "/note",
    method: "GET",
    success: function(res) {
        if(res.status == "success") {
            res.contents.forEach(function(content, i) {
                var container = $("<div class='notepad-container'></div>");
                var filenameTextarea = $("<textarea class='content' rows='1' id='filename'></textarea>");
                var contentTextarea = $("<textarea class='content' rows='10' id='notepad'></textarea>");
                var saveButton = $("<button id='save' class='btn-save'>Save</button>");
                var deleteButton = $("<button id='delete' class='btn-delete'>Delete</button>");

                var box = $("<button class='btn-show'> note </button>");

                $("body").append(container);

                $(container).append(filenameTextarea);
                $(container).append(contentTextarea);
                $(container).append(saveButton);
                $(container).append(deleteButton);
                $(container).prepend(box);

                filenameTextarea.val(res.filenames[i]);
                contentTextarea.val(content);
            });
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

$(".btn-new").click(function(e) {
    var container = $("<div class='notepad-container'></div>");
    var filenameTextarea = $("<textarea class='content' rows='1' id='filename'></textarea>");
    var contentTextarea = $("<textarea class='content' rows='10' id='notepad'></textarea>");
    var saveButton = $("<button id='save' class='btn-save'>Save</button>");
    var deleteButton = $("<button id='delete' class='btn-delete'>Delete</button>");

    var box = $("<button class='btn-show'> note </button>");

    $("body").append(container);

    $(container).append(filenameTextarea);
    $(container).append(contentTextarea);
    $(container).append(saveButton);
    $(container).append(deleteButton);
    $(container).prepend(box);

    $(saveButton).click(function(e) {
        e.preventDefault();
        var filename = container.find("#filename").val();
        var content = container.find("#notepad").val();

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
});
