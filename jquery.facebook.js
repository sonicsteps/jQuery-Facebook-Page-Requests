(function($) {

	//Attach this new method to jQuery  
    $.fn.extend({   
          
        //----------------------------------------------------------//
        // Title: Haven't decided on a name
        // Author: Jordan Brown
        // Company: MediaFuel
        // Date: 09/22/10
        //----------------------------------------------------------//
         
        facebook: function(page, type, options) {
			
			var defaults = {
				link: false,
				limit: 5
			}
		
			var options = $.extend(defaults, options);
			
			var cookiesEnabled = (function() {
			
				// the id is our test value
				var id = new Date().getTime();
				
				// generate a cookie to probe cookie access
				document.cookie = '__cookieprobe='+id+';path=/';
				
				// if the cookie has been set, then we're good
				return (document.cookie.indexOf(id) !== -1)
			
			})();
			
			cookiesEnabled = ( cookiesEnabled && Modernizr.localstorage ) ? true : false;
			
			if (cookiesEnabled) {
				var listItem = localStorage.getItem('Facebook')
				if (listItem) {
					listItem = listItem.split(',');
					for (x in listItem) {
						$(this).append(listItem[x]);
					}
				}
			}
			else {
				var listItem = new Array();
			}
			
			return this.each(function() {
			
				var o = options;
				
				var obj = $(this);
				
				$.ajax({
					type: "GET",
					url: "https://graph.facebook.com/"+page+"/"+type+"?limit="+o.limit+"&access_token=123975213079|nqKWO89vVW4QH_bNmKH-Wiy3W0w&callback=?",
					dataType: "jsonp",
					success: function(json) {
						var status = new Array();
						for (var i = 0; i < o.limit; i++) {
							console.log(i+", ");
							var print = json.data[i].message;
							var message = (i == 0) ? "<li class='first'>" : "<li>";
							message += print+"</li>";
							status.push(message);
						}
						if (listItem && (listItem.join(',') != status.join(','))) {
							if (cookiesEnabled) localStorage.setItem('Facebook', status);
							obj.fadeOut('fast', function() {
								$(this).html(status.join('')).fadeIn('fast');
							});
							console.log('Not the same');
						}
						else {
							obj.html(status.join('')).fadeIn('fast');
						}
					}
				});
			
			});
			
		}
	});	
				
})(jQuery);