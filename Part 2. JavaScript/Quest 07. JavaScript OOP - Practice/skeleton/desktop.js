var Desktop = function()
{
	$('.button_Icon').click(function() {
		var icon = $("<button class='Icon'></button>")
		$("body").append(icon);
		console.log("Icon created");
		icon.mousedown(function()	{
			icon.mousemove(function(e) {
				var y = e.pageY;
				var x = e.pageX;
				icon.css({'top': y - 50});
				icon.css({'left': x - 50});
				icon.click(function() {
				icon.off("mousemove");
				});
			});
		});

		icon.dblclick(function()
		{
			var notepad = $("<div class='Notepad'><div class='Notepad_option_moving'></button><button class='Notepad_option_saving'></button><button class='Notepad_option_closing'></button><input class='Notepad_note'></div>");
			$("body").append(notepad);
			console.log("Notepad opened");
			$('.Notepad_option_moving').dblclick(function()	{
				$('.Notepad_option_moving').mousemove(function(e) {
					var y = e.pageY;
					var x = e.pageX;
					notepad.css({'top': y - 5});
					notepad.css({'left': x - 200});
					$('.Notepad_option_moving').click(function() {
					$('.Notepad_option_moving').off("mousemove");
					});
				});
			});
			$('.Notepad_option_saving').click(function() {
				$('.Notepad').submit(function(event) {
					event.preventDefault();
				});
				console.log("Notepad saved");
			});
			$('.Notepad_option_closing').click(function() {
				notepad.hide();
				console.log("Notepad closed");
				icon.off("dblclick");
				icon.dblclick(function() {
					notepad.show();
					console.log("Notepad opened again");
				});
			});
		});

	$('.button_Folder').click(function() {
		var folder = $("<button class='Folder'></button>");
		$("body").append(folder);
		console.log("Folder created");
		folder.mousedown(function()	{
			folder.mousemove(function(e) {
				var y = e.pageY;
				var x = e.pageX;
				folder.css({'top': y - 50});
				folder.css({'left': x - 50});
				folder.click(function() {
					folder.off("mousemove");
				});
			});
		});

		folder.dblclick(function() {
			var Window = $("<div class='Window'><div class='Window_option_moving'></button><button class='Window_option_maximizing'></button><button class='Window_option_resizing'></button><button class='Window_option_closing'></button></div>");
			$("body").prepend(Window);
			console.log("Folder opened");

			$('.Window_option_moving').dblclick(function()	{
				$('.Window_option_moving').mousemove(function(e) {
					var y = e.pageY;
					var x = e.pageX;
					Window.css({'top': y - 5});
					Window.css({'left': x - 200});
					$('.Window_option_moving').click(function() {
					$('.Window_option_moving').off("mousemove");
					});
				});
			});

			$('.Window_option_maximizing').click(function() {
				Window.css({'position' : 'absolute'}).animate({
					top : '0px',
					left : '0px',
					width: '100%',
				  height : '100%'
				},300);
				console.log("Window maximized");
			});

			$('.Window_option_resizing').click(function() {
				Window.css({'position' : 'absolute'}).animate({
					top : '30px',
					left : '50px',
					width : '400px',
					height : '300px'
				},300);
				console.log("Window resized");
			});

			$('.Window_option_closing').click(function() {
				$('.Window').submit(function(event) {
					event.preventDefault();
				});
				Window.hide();
				console.log("Window closed");
				folder.off("dblclick");
				folder.dblclick(function() {
					Window.show();
					console.log("Window opened again");
				});
			});

			icon.click(function() {
				if((icon.css("left") < Window.css("left"))&&(icon.css("top") < Window.css("top"))&&(icon.css("right") > Window.css("right"))&&(icon.css("bottom") > Window.css("bottom"))) {
					console.log("Icon in Window");
				}
			});
		});
	});
	});
};
