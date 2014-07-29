window.onload = function () {
	var urlInput = document.getElementById('urlInput');
	urlInput.addEventListener('keypress',fetchRssInfo);
}

var fetchRssInfo = function () {
	if(event.keyCode == 13) {
		var ajaxRequest;
		try {
			ajaxRequest = new XMLHttpRequest();
		}
		catch(e) {
			try {
				ajaxRequest = new ActiveXObject("Msxml2.XMLHTTP");
			}
			catch(e) {
				try {

				}
				catch(e) {
					ajaxRequest = new ActiveXObject("Microsoft.XMLHTTP");
					alert("Your browser broke!");
		     		return false;
				}
			}
		}

		ajaxRequest.onreadystatechange = function(){
		   if(ajaxRequest.readyState == 4 && ajaxRequest.status==200){
		      var resp = ajaxRequest.responseText;
		      parseJsonResp(resp);
		   }
		 }

		var urlInput = document.getElementById('urlInput');
		var feedApiUrl = 'http://googlefeed.appacitive.com/?q=' + urlInput.value;

		 ajaxRequest.open("GET",feedApiUrl, true);
		 ajaxRequest.send(null); 
	}
}

var parseJsonResp = function(resp) {
	var feedResponse = JSON.parse(resp);
	var containerDiv = document.getElementById('rss-feed-data-container-div');
	var feedTitleDiv = document.createElement('div');
	feedTitleDiv.class = 'row';

	var feedTitleTextDiv = document.createElement('div');
	feedTitleTextDiv.class = 'col';

	var feedTitle = document.createElement('h2');
	feedTitle.innerHTML = feedResponse.responseData.feed.title;
	feedTitleTextDiv.appendChild(feedTitle);
	feedTitleDiv.appendChild(feedTitleTextDiv);	
	
	var feedTitleDescriptionDiv = document.createElement('div');
	feedTitleDescriptionDiv.class = 'col';
	feedTitleDescriptionDiv.innerHTML = feedResponse.responseData.feed.description;
	feedTitleDiv.appendChild(feedTitleDescriptionDiv);
	containerDiv.appendChild(feedTitleDiv);

	for(int feedEntryCount=0; feedEntryCount < feedResponse.responseData.feed.entries.length;feedEntryCount++) {
		
	}
}