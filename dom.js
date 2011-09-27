chrome.extension.onRequest.addListener(
	function(request, sender, sendResponse) {
		console.log(
			sender.tab ?
				"from a content script:" + sender.tab.url :
				"from the extension"
		);
		if (request.greeting == "getFeeds") {
			var links = document.head.getElementsByTagName('link');
			var feeds = [];
			for (var i = 0; i < links.length; i++) {
				l = links[i];
				if(l.rel == "alternate") {
					feeds.push(
						{
							"href":l.href,
							"title":l.title
						}
					);
				}
			}
			sendResponse({feeds_list: feeds});
		}
		else {
			sendResponse({}); // snub them.
		}
	}
);
