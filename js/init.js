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
	var country_name = "Singapore"; // default is Singapore
	var country_code= "SG";
	
/*----------------------------------------------------*/
/*	calendar data and matching code for Google Calendar
------------------------------------------------------*/
	
	var countryDict = {	"AL":"Albania", "AD":"Andorra","AR":"Argentina","AM":"Armenia", "AU":"Australia",
						"AT":"Austria",
						"BA":"Bosnia and Herzegovina", "BE":"Belgium", "BG": "Bulgaria", "BN":"Brunei","BR":"Brazil","CA":"Canada",
						"KH":"Cambodia", "CL":"Chile", "CN":"China", "CO":"Colombia", "CR":"Costa Rica", "HR":"Croatia", "CZ":"Czech Republic", "DK":"Denmark", "EC":"Ecuador", 
						"EG":"Egypt", "FI":"Finland", "FR":"France", "GH":"Ghana",
						"GR":"Greece", "DE":"Germany", "HK":"Hong Kong", "ID":"Indonesia", "IE":"Ireland", "IL":"Israel", "IQ":"Iraq", "IR":"Iran", 
						"IS":"Iceland", "IN":"India", "IT":"Italy", "JM":"Jamaica", "JP":"Japan", "KG":"Kyrgyzstan",  
						"LA":"Laos", "MY":"Malaysia", "MX":"Mexico", "MA":"Morocco", "MC":"Monaco", "MM":"Myanmar", "NL":"Netherlands", "NO":"Norway",
						"NP":"Nepal", "NZ":"New Zealand",
						"SG":"Singapore", "ES":"Spain", "KR":"South Korea", "LK":"Sri Lanka", "CH":"Switzerland",
						"RU":"Russia",
						"TW":"Taiwan", "TH":"Thailand", "TR":"Turkey", "AE":"United Arab Emirates", "GB": "United Kingdom", "US":"United States", "UY":"Uruguay", "VN":"Vietnam",
															
	};
	
	var googleDict = {	"SG":"Singapore","US":"USA","CN":"China","AD":"AD","AR":"ar","AM":"AM","AU":"australian","AT":"austrian",
						"BA":"BA", "BE":"BE", "BG": "bulgarian", "BN":"BN","BR":"brazilian","CA":"canadian","CH":"CH",
						"CL":"CL", "CO":"CO", "CR":"CR", "CZ":"czech", "DE":"German", "DK":"Danish", "DZ":"DZ", "EC":"EC", 
						"IN":"indian", "MY":"Malaysia", "EG":"EG", "ES":"spain", "FI":"finnish", "FR":"french", "GB": "UK", "GH":"Gh",
						"GR":"Greek", "HK":"hong_kong", "HR":"Croatian", "ID":"Indonesian", "IE":"Irish", "IL":"jewish", "IQ":"IQ", "IR":"IR", 
						"IS":"IS", "IT":"italian", "JM":"JM", "JP":"japanese", "KG":"Kg", "KH":"KH", "KR":"south_korea",
						"LA":"LA", "LK":"lk", "MA":"MA", "MC":"MC", "MM":"MM", "MX":"Mexican", "NL":"Dutch", "NO":"Norwegian",
						"NP":"Np", "NZ":"new_zealand","AE":"AE",
						"RU":"russian",
						"TW":"Taiwan", "TH":"TH", "TR":"Turkish", "UY":"UY", "VN":"Vietnamese",															
	};	
	
	for (var key in countryDict) {
		$('#countrySelector').append(
						$("<option></option>").text(countryDict[key]).val(key)
					);		
	}	
	$("#countrySelector").val(country_code);
	
	$('select').change(function () {
		var optionSelected = $(this).find("option:selected");
		country_code  = optionSelected.val();
		country_name  = optionSelected.text();
		$("#details").html();
		getNextHoliday();
		$("#address").html(	"<p>We have pre-selected  <a class='smoothscroll' href='#countrySelect'>"
							+ country_name + "(" + country_code +") (click to change)</a></p>");
		
		$('html, body').animate({ scrollTop: 0 }, 'slow');
	});	
		
	$.ajax({
		url: "https://ip.nf/me.json",
		error: function(){
			country_name = "Singapore";
			country_code = "SG";
			getNextHoliday();
			$("#address").html(	"<p>We could not detect where you are from and have set it as  <a class='smoothscroll' href='#countrySelect'>"
							+ country_name + "(" + country_code +") (click to change)</a></p>");
			

		},
		success: function(response){
			country_name = response.ip.country;
			country_code = response.ip.country_code;
			getNextHoliday();
			$("#address").html(	"<p>Looks like you are from ... <a class='smoothscroll' href='#countrySelect'>"
							+ country_name + "(" + country_code +")</a></p>");
			
		},
		timeout: 3000 // sets timeout to 3 seconds
	});		

	function getNextHoliday() {

		var currentdate = new Date(); 
		var todaydate = currentdate.getFullYear() + "-"
                + (currentdate.getMonth()+1)  + "-" 
                + (currentdate.getDate());				
		var todaytime = "T"+currentdate.getHours() + ":"  
                + currentdate.getMinutes() + ":" 
                + currentdate.getSeconds() + "Z";
							
		googleCountry = googleDict[country_code];		
		$.get("https://www.googleapis.com/calendar/v3/calendars/en."+googleCountry+"%23holiday%40group.v.calendar.google.com/events?singleEvents=true&key=AIzaSyACSxVDhiubNZPZCgcrtvELI2vLeldstDk&orderBy=startTime&timeMin="+todaydate+todaytime+"&timeMax="+ currentdate.getFullYear()+1 +"-12-31T23:59:59Z", function (response2) {
			
			nextDate = response2.items[0].start.date;

			if (nextDate == todaydate) {
				$('div#counter').countdown(nextDate)
				.on('stop.countdown', function(event) {
				});
				$("#details").html(	"<p>The next holiday is</p><p><span>"+response2.items[0].summary + 
									"</span></p><p>That's TODAY, followed by " + response2.items[1].summary
									+ " on " + response2.items[1].start.date + ". What are you doing checking this? Go out and have fun!</p>"
				);
				
				

				$('div#counter').html('<span>0 <em>days</em></span>' + 
						'<span>0 <em>hours</em></span>' + 
						'<span>0 <em>minutes</em></span>' +
						'<span>0 <em>seconds</em></span>');				
			} else {
				$("#details").html(	"<p>The next holiday will be</p><p><span>"+response2.items[0].summary + 
									"</span></p><p>That's going to be on " + response2.items[0].start.date + ", followed by " + response2.items[1].summary
									+ " on " + response2.items[1].start.date + ". Have you made plans yet?</p>"
				);

				$('div#counter').countdown(nextDate)
				.on('update.countdown', function(event) {

					$(this).html(event.strftime('<span>%D <em>days</em></span>' + 
														 '<span>%H <em>hours</em></span>' + 
														 '<span>%M <em>minutes</em></span>' +
														 '<span>%S <em>seconds</em></span>'));

			   }); 
			};
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
