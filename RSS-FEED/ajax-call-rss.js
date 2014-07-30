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
	feedTitleDiv.className = 'row';
	feedTitleDiv.style.marginLeft = '0px';
	var feedTitleTextDiv = document.createElement('div');
	feedTitleTextDiv.className = 'col';

	var feedTitle = document.createElement('h2');
	feedTitle.innerHTML = feedResponse.responseData.feed.title;
	feedTitleTextDiv.appendChild(feedTitle);
	feedTitleDiv.appendChild(feedTitleTextDiv);	
	
	var feedTitleDescriptionDiv = document.createElement('div');
	feedTitleDescriptionDiv.className = 'col';
	feedTitleDescriptionDiv.innerHTML = feedResponse.responseData.feed.description;
	feedTitleDiv.appendChild(feedTitleDescriptionDiv);
	containerDiv.appendChild(feedTitleDiv);

	for(var feedEntryCount=0; feedEntryCount < feedResponse.responseData.feed.entries.length;feedEntryCount++) {
		var color;
		if(feedEntryCount%2==0) {
			color = '#E1E0D4';
		}
		else {
			color = '#D1D0D4';
		}

		var entryDiv = document.createElement('div');
		entryDiv.className = 'row';
		entryDiv.style.backgroundColor = color;
		entryDiv.style.marginTop = '7px';
		var titleAndTimeStampDiv = document.createElement('div');
		titleAndTimeStampDiv.className = 'col col-md-12 col-xs-12 col-lg-12 col-sm-12';
		titleAndTimeStampDiv.style.marginTop = '8px';
		var entryTitleDiv = document.createElement('div');
		var timeStampDiv = document.createElement('div');
		timeStampDiv.innerHTML = feedResponse.responseData.feed.entries[feedEntryCount].publishedDate;
		entryTitleDiv.className = 'pull-left';
		timeStampDiv.className = 'pull-right';
		var entryTitleLink = document.createElement('a');
		entryTitleLink.innerHTML = feedResponse.responseData.feed.entries[feedEntryCount].title;
		entryTitleLink.href = feedResponse.responseData.feed.entries[feedEntryCount].link;

		var entryContent = document.createElement('div');
		entryContent.className = 'col col-md-12 col-xs-12 col-lg-12 col-sm-12';
		var contentText = feedResponse.responseData.feed.entries[feedEntryCount].content;
		contentText = contentText.substring(contentText.indexOf('<'),contentText.substring(contentText.indexOf('>')));
		entryContent.innerHTML = contentText;
		var breakLinwOne = document.createElement('br');
		var breakLinwTwo = document.createElement('br');
		var breakLinwThree = document.createElement('br');
		entryContent.appendChild(breakLinwOne);
		entryContent.appendChild(breakLinwTwo);
		entryContent.appendChild(breakLinwThree);

		entryTitleDiv.appendChild(entryTitleLink);
		titleAndTimeStampDiv.appendChild(entryTitleDiv);
		titleAndTimeStampDiv.appendChild(timeStampDiv);
		entryDiv.appendChild(titleAndTimeStampDiv);
		entryDiv.appendChild(entryContent);

		containerDiv.appendChild(entryDiv);
	}
}