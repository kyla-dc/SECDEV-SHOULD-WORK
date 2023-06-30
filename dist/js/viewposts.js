function showFeed() {
	var sessionname = $('#hiddenSessionName').val();
	var feedname = $('#hiddenFeedName').val();

	document.title = feedname+"'s Posts";
	$.get('/getUserPosts', {feedname: feedname}, function (results) {
		if (results != null) {
			console.log(results);
			createPost(results);
		}
	});
}

function createPost(results) {
	var sessionname = $('#hiddenSessionName').val();
	var feedname = $('#hiddenFeedName').val();

	// Checks if post number is = 0
	if (results.length == 0) {
		var div = document.createElement("div");
		var text = document.createElement("h1");
		var container = document.getElementById("feed");

		$(text).text("No Posts found! Why not make one?");
		text.id = "errormsg";
		div.style.margin = "auto";
		div.id = "errormsg_div";

		div.append(text);
		container.append(div);
	}
	else {
		console.log(results.length);
		var numPosts = results.length;
		numPosts--;
		console.log(numPosts);
		for (var i = numPosts; i >= 0; i--) {
			var post = document.createElement("div");
			var feedbreak = document.createElement("div");
			var container = document.getElementById("feed");
			var content = document.createElement("div");
			var img = document.createElement("img");
			var namediv = document.createElement("div");
			var divider = document.createElement("div");
			var description = document.createElement("div");
			var namelink = document.createElement("a");
			var likeicon = document.createElement("img");
			var footerdivider = document.createElement("div");
			var footer = document.createElement("div");
			var likes = document.createElement("p");
			var commentlink = document.createElement("a");
			var commentButton = document.createElement("button");
			var video = document.createElement("video");
			var audio = document.createElement("audio");
			var deleteButton = document.createElement("button");

			// Assigning IDs
			$(post).attr('name', results[i].postID);
			$(footer).attr('name', results[i].postID);
			likes.id = "likes-num"+i;
			likes.className = "likes-num";
			post.id = "post";
			feedbreak.id = "feed-break";
			content.id = "post-content";
			img.id = "post-image";
			namediv.id = "post-user";
			img.src = results[i].contentPath;
			divider.id = "divider";
			description.id = "post-desc";
			footer.id = "footer";
			footerdivider.id = "divider";
			likeicon.id = "like-icon";
			commentButton.id = "comment-button";
			deleteButton.id = "delete-button";
			video.id = "post-video";
			video.src = results[i].contentPath;
			audio.id = "post-audio";
			audio.src = results[i].contentPath;

			// Assigning Attributes
			namelink.href = "/profile/"+results[i].username;
			commentlink.href = "/comment/"+results[i].postID;
			likeicon.src = "../images/like-icon24.png";
			$(namelink).text(results[i].username);
			$(likes).text(results[i].likes.length);
			$(commentButton).text("Comment...");
			$(deleteButton).text("Delete");
			$(video).attr('controls', true);
			$(audio).attr('controls', true);

			// Append Post Divs
			$(container).append(post);
			$(container).append(feedbreak);
			$(post).append(content);
			$(post).append(namediv);
			$(post).append(divider);
			$(post).append(description);
			$(post).append(footerdivider);
			$(post).append(footer);

			//Append Actual Content
			if (results[i].type == 'image') {
				$(content).append(img);
			}
			else if (results[i].type == 'video') {
				$(content).append(video);
			}
			else if (results[i].type == 'audio') {
				$(content).append(audio);
			}

			$(namediv).append(namelink);
			$(description).append(results[i].description);
			$(footer).append(likeicon);
			$(footer).append(likes);
			$(footer).append(commentlink);

			if (sessionname == results[i].username) 
				$(footer).append(deleteButton);

			$(commentlink).append(commentButton);

			//Create Function for Like
			createOnClickEvent(likeicon, results[i].postID);

			if (sessionname == results[i].username)
				createDeleteEvent(deleteButton, results[i].postID);
		}
	}
}

function createOnClickEvent(icon, postID) {
	icon.onclick = function() {
		$.post('/postLike/'+postID, function (result) {
			var numLikes = $('#likes-num').text();
			if (result) {
				numLikes++;
				icon.src = "../images/liked-icon24.png";
				$('#likes-num').text(numLikes);
			}
			else {
				icon.src = "../images/liked-icon24.png";
				$('#likes-num').text(numLikes);
			}
		});
	}
}

function createDeleteEvent(button, postID) {
	button.onclick = function() {
		if (confirm("Are you sure you want to delete your post?")) {
			$.post('/deletePost/'+postID, function (result) {
				if (result) {
					alert('Post successfully deleted.');
					window.location.href = window.location.href;
				}
				else {
					alert('Post was unable to be deleted.');
					window.location.href = window.location.href;
				}
			});
		}
	}
}