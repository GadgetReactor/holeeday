/*-----------------------------------------------------------------------------------
/*
/* Init JS
/*
-----------------------------------------------------------------------------------*/

jQuery(document).ready(function($) {

/*---------------------------------------------------- */
/* Preloader
------------------------------------------------------ */ 
  	$(window).load(function() {

   	// will first fade out the loading animation 
    	$("#status").fadeOut("slow"); 

    	// will fade out the whole DIV that covers the website. 
    	$("#preloader").delay(500).fadeOut("slow").remove();      

  	}) 

/*---------------------------------------------------- */
/* Menu
------------------------------------------------------ */  
  	var toggle_button = $("<a>", {                         
                        id: "toggle-btn", 
                        html : "Menu",
                        title: "Menu",
                        href : "#" } 
                        );
  	var nav_wrap = $('nav#nav-wrap')
  	var nav = $("ul#nav");  

  	/* id JS is enabled, remove the two a.menu-btns 
  	and dynamically prepend a.toggle-btn to #nav-wrap */
  	nav_wrap.find('a.menu-btn').remove(); 
  	nav_wrap.prepend(toggle_button); 

  	toggle_button.on("click", function(e) {
   	e.preventDefault();
    	nav.slideToggle("fast");     
  	});

  	if (toggle_button.is(':visible')) nav.addClass('mobile');
  	$(window).resize(function(){
   	if (toggle_button.is(':visible')) nav.addClass('mobile');
    	else nav.removeClass('mobile');
  	});

  	$('ul#nav li a').on("click", function(){      
   	if (nav.hasClass('mobile')) nav.fadeOut('fast');      
  	});


/*----------------------------------------------------*/
/* Backstretch Settings
------------------------------------------------------ */

	$("#intro").backstretch("images/header-background.jpg");


/*----------------------------------------------------*/
/*	Back To Top Button
/*----------------------------------------------------*/
	var pxShow = 300; //height on which the button will show
	var fadeInTime = 400; //how slow/fast you want the button to show
	var fadeOutTime = 400; //how slow/fast you want the button to hide
	var scrollSpeed = 300; //how slow/fast you want the button to scroll to top. can be a value, 'slow', 'normal' or 'fast'

   // Show or hide the sticky footer button
	jQuery(window).scroll(function() {

		if (jQuery(window).scrollTop() >= pxShow) {
			jQuery("#go-top").fadeIn(fadeInTime);
		} else {
			jQuery("#go-top").fadeOut(fadeOutTime);
		}

	});


/*----------------------------------------------------*/
/*  Placeholder Plugin Settings
------------------------------------------------------ */  	 
	$('input, textarea').placeholder()

/*----------------------------------------------------*/
/*	holidays settings
------------------------------------------------------*/

	function parseDate(str) {
		var ymd = str.split('-')
		return new Date(ymd[0], ymd[1]-1, ymd[2]);
	}

	function daydiff(first, second) {
		return (second-first)/(1000*60*60*24);
	}
	
	function todayDate() {
		var d = new Date();

		var month = d.getMonth()+1;
		var day = d.getDate();

		var output = d.getFullYear() + '-' +
			(month<10 ? '0' : '') + month + '-' +
			(day<10 ? '0' : '') + day;
		return output;
	}
	var nextDate = "2015-01-01";
	var country = "Singapore"; // default is Singapore
	var country_code= "SG";
	var countryDict = {	"SG":"Singapore","US":"USA","CN":"China","AD":"Andorra","AE":"UAE","AF":"afghanistan","AR":"ar","AU":"australia",
						"BA":"bosniaandherzegovina", "BE":"belgium", "BG": "bulgaria", "BN":"brunei","BR":"brazilian","CA":"canadian","CH":"switzerland",
						"CL":"chile", "CO":"colombia", "CR":"costarica", "CZ":"czech", "DE":"German", "DK":"Denmark", "DZ":"Algeria", "EC":"Ecuador", 
						"IN":"indian", "MY":"Malaysia", "EG":"egypt", "ES":"spain", "FI":"finland", "FR":"france", "GB": "United Kingdom", "GH":"Ghana",
						"GR":"Greece", "HK":"Hongkong", "HR":"Croatia", "ID":"Indonesia", "IE":"Ireland", "IL":"Israel", "IQ":"Iraq", "IR":"Iran", 
						"IS":"Iceland", "IT":"Italy", "JM":"Jamaica", "JP":"Japan", "KG":"Kyrgyzstan", "KH":"Cambodia", "KR":"southkorea",
						"LA":"Laos", "LK":"srilanka", "MA":"Morocco", "MC":"Monaco", "MM":"Myanmar", "MX":"Mexico", "NL":"Netherlands", "NO":"Norway",
						"NP":"Nepal", "NZ":"newzealand",
						"RU":"russian",
															
	};
	
	for (var key in countryDict) {
		$('#countrySelector').append(
						$("<option></option>").text(countryDict[key]).val(key)
					);		
	}	

	$('select').change(function () {
		var optionSelected = $(this).find("option:selected");
		country_code  = optionSelected.val();
		country   	  = optionSelected.text();
		$("#details").html();
		getNextHoliday();
		$('html, body').animate({ scrollTop: 0 }, 'slow');
	});	
	
	var jxqhr = $.get("http://www.telize.com/geoip", function (response) {
		$("#ip").html("IP: " + response.ip);
		country = response.country;
		country_code = response.country_code;		
	}, "jsonp");
	jxqhr.complete(getNextHoliday);

	function getNextHoliday() {
		$("#address").html("<p>Looks like you are from ... " + country + "(" + country_code +")</p>");

		googleCountry = countryDict[country_code];		
		$.get("https://www.googleapis.com/calendar/v3/calendars/en."+googleCountry+"%23holiday%40group.v.calendar.google.com/events?singleEvents=true&key=AIzaSyACSxVDhiubNZPZCgcrtvELI2vLeldstDk&orderBy=startTime&timeMin=2014-11-05T00:00:00Z&timeMax=2014-12-31T23:59:59Z", function (response2) {
			$("#details").html(	"<p>The next holiday will be</p><p><span>"+response2.items[0].summary + 
								"</span></p><p>That's going to be on " + response2.items[0].start.date + " followed by " + response2.items[1].summary
								+ " (" + response2.items[1].start.date + ")</p>"
			);

			var d = new Date();
			nextDate = response2.items[0].start.date;
			var finalDate =nextDate;

			$('div#counter').countdown(finalDate)
			.on('update.countdown', function(event) {

				$(this).html(event.strftime('<span>%D <em>days</em></span>' + 
													 '<span>%H <em>hours</em></span>' + 
													 '<span>%M <em>minutes</em></span>' +
													 '<span>%S <em>seconds</em></span>'));

		   }); 
			var day = d.getDate();
		}, "jsonp");			
	}	

/*----------------------------------------------------*/
/* Smooth Scrolling
------------------------------------------------------ */

   $('.smoothscroll').on('click',function (e) {
	    e.preventDefault();

	    var target = this.hash,
	    $target = $(target);

	    $('html, body').stop().animate({
	        'scrollTop': $target.offset().top
	    }, 800, 'swing', function () {
	        window.location.hash = target;
	    });
	});


/*----------------------------------------------------*/
/* Highlight the current section in the navigation bar
------------------------------------------------------*/

	var sections = $("section");
	var navigation_links = $("#nav-wrap a");



/*----------------------------------------------------*/
/*	Make sure that #intro height is
/* equal to the browser height.
------------------------------------------------------ */

   $('#intro, #map').css({ 'height': $(window).height() });
   $(window).on('resize', function() {

        $('#intro, #map').css({ 'height': $(window).height() });
        $('body').css({ 'width': $(window).width() })

        $("#intro").backstretch("images/header-background.jpg");
   });


});