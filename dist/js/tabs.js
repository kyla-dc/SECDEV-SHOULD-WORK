function showFeed() {
	$.get('/getTabsFeed', {}, function (results) {
		if (results != null) {
			console.log(results);
			createTabs(results);
		}
	});
}

function createTabs(results) {
	if (results.length == 0) {
		var div = document.createElement("div");
		var text = document.createElement("h1");
		var container = document.getElementById("feed");

		$(text).text("No Tabs Found!");
		text.id = "errormsg";
		div.style.margin = "auto";
		div.id = "errormsg_div";

		div.append(text);
		container.append(div);
	}
	else {
		console.log(results.length);
		var numTabs = results.length;
		numTabs--;
		console.log(numTabs);
		for (var i = numTabs; i >= 0; i--) {
			var container = document.getElementById("feed");
			var feedbreak = document.createElement("div");
			var tabs_block = document.createElement("div");
			var tabs_name = document.createElement("a");
			var tabs_instrument = document.createElement("div");
			var divider = document.createElement("div");

			// Assigning IDs
			tabs_block.id = "tabs_block";
			tabs_name.id = "tabs_name";
			tabs_instrument.id = "tabs_instrument";
			divider.id = "divider";
			feedbreak.id = "feed-break";

			tabs_name.href = "/tabs/"+results[i].URL;

			$(tabs_name).text(results[i].tabsName);
			$(tabs_instrument).text(results[i].tabsInstrument);

			// Append Post Divs
			$(container).append(tabs_block);
			$(container).append(feedbreak);
			$(tabs_block).append(tabs_name);
			$(tabs_block).append(divider);
			$(tabs_block).append(tabs_instrument);
		}
	}
}