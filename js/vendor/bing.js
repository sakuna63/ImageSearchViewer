/*! Bing Search Helper v1.0.0 - requires jQuery v1.7.2 */

$(function(){
	// Attaches a click handler to the button.
	$('#search-btn').click(function(e){
		$('.mygallery').remove();
		$('#content').append('<div class="mygallery"><div class="tn3 album"><ol></ol></div></div>');
		$('#not-found').remove();
		$('#load-image').remove();
		
		e.preventDefault();
		// Clear the results div.
		var query = $('#image-query').val();
		if (query){
			$('.message-area').append("<img id='load-image' src='img/ajax-loader.gif' style='margin-top:50px;'/>");
			search(query);
		}
	});
	
	$("#image-query").keypress(function(e) {
	  	if ( e.which == 13 ) {
	    	e.preventDefault();
	   		$('#search-btn').click();
	   	}
	});
	
	// Performs the search.
	function search(query){
		// Establish the data to pass to the proxy.
		var data = { q: query, sop: "Image", market: 'en-us' };
		// Calls the proxy, passing the query, service operation and market.
		$.getJSON('php/bing_proxy.php', data, function(obj){
			if (obj.d !== undefined){
				var items = obj.d.results;
				if(items.length != 0){
					for (var k = 0, len = items.length; k < len; k++){
						showImageResult(items[k]);
					}
					loadJs1();					
				}else{			
				 	$('#load-image').remove();
				 	$('.message-area').append("<h3 id='not-found' style='margin-top:50px;'>Not found</h3>");
				}
			}
		});
	}
	
	// Shows one item of Image result.
	function showImageResult(item){
		var text = ["<li>",
						"<h4>"+item.Title+"</h4>",
						"<div class='tn3 description'></div>",
						"<a href='"+item.MediaUrl+"'>",
						"<img src='"+item.MediaUrl+"' style='width:35px;height:35px;'/>",
					"</li>"].join("");
		
		
		$('.album ol').append(text);
	}
	
	function loadJs1(){
		$.ajax({
			dataType: "script",
			scriptCharset:"UTF-8",
			url: "./js/jquery.tn3lite.min.js",
			success: function(msg){
				loadJs2();
			},
			error: function(){
				return false;
			}
		 });
	}
	function loadJs2(){
		$.ajax({
			dataType: "script",
			scriptCharset:"UTF-8",
			url: "./js/main.js",
			success: function(msg){
			},
			error: function(){
				return false;
			}
		 });
		 $('#load-image').remove();
	}
});