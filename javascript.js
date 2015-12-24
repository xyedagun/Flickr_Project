(function() {
	function FlickrProject() {
		this.init();
	}
	
	FlickrProject.prototype = {
		init: function() {
			//this is the user's id
			this.user = "9885480@N02"; 
			//album id
			this.album = "72157662152102980"; 
			//photos are retrieved once the window opens
			window.getPhotos = this.getPhotos; 
			//JSON request from flickr
			this.getJSON();	
		},

		//function to get jSon file
		getJSON: function() {
			//flickr link to request json files
			var src = "http://api.flickr.com/services/feeds/photoset.gne?nsid=" + this.user + "&set=" + this.album + "&format=json&jsoncallback=getPhotos";	
			// http://api.flickr.com/services/feeds/photoset.gne?nsid=9885480@N02&set=72157660390506564&format=json&jsoncallback=getPhotos

			var script = document.createElement( "script" );
				script.src = src;
				document.body.appendChild( script );
		},


		//function that takes photo info and links from jsondata
		getPhotos: function( photo ) {
			var limit = 20;
			
			if( photo && photo.items ) {
				var title = photo.title;
				//media properties from Json file
				var items = photo.items;
				//link of the thumbnail photo
				var media = photo.media;
				//Deleting "Content from" on the title from Json
				var albumName = title.replace( "Content from ", "" );
				//Album name from jSon and adding it to html 
				var html = "<h3>" + albumName + "</h3>";
				    html += "<div class='images'>";


				for( var i = 0; i < items.length; ++i ) {
					var item = items[i];
					//Editing the link of thumbnail image to a bigger size image by adding "b.jpg"
					var source = item.media.m.slice(0,-5) + "b.jpg";
					//Adding every source to the photoSet arrray
					var picture = item.media.m.slice(0,-5) + "n.jpg";
					//photo title
					var photoTitle = item.title;
				
					//Adding photos to html
					var n = i + 1;
					if( n <= limit ) {
					html += '<li>';
					html += "<a href=#photo" + i + " data-title=" + photoTitle + "'><img src='" + picture + "' alt='' /></a>";
					html += '<article id=photo' + i + ">";
					html += '<figure>';
					html += "<img src='" + source + "' alt='' /></a>";
					html += '<figcaption>' + photoTitle + '</figcaption>';
					html += '</figure>';
					html += '<nav>'
					html += '<a class="close" href="#close">CLOSE</a>';
					html += '<a class="arrow prev" href="#photo' + [i-1] + '">Previous</a>';
					html += '<a class="arrow next" href="#photo' + [i+1] + '">Next</a>';
					html += '</nav>'
					html += '</article>';
					html += '</li>';
					}
				} //end for

				//closing div for class=images
				html += "</div>";
				
				document.querySelector( ".gallery" ).innerHTML = html;
			}	
		}
	};
	

	document.addEventListener( "DOMContentLoaded", function() {
		var flickrFeed = new FlickrProject();
});

	
})();