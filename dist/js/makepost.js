function prepend() {
	str = document.getElementById('tags').value;
	str = str.replace(/[-!$%^&*()_+|~=`{}\[\]:";'<>?,.@#£\/]/g, '');
	tagged = str.replace(/#/g, '').replace(/([^" "]+)/g, '#'+'$1');
	document.getElementById('tags').value = tagged;
}

async function submitPost() {
	var numPosts = $('#postNum').val();
	numPosts++;

	// Post ID Calculator
	var userID = $('#userID').val();
	var postID = userID.concat(numPosts);
	
	// Append Values
	$('#postID').attr('value', postID);
}