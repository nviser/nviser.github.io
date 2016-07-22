$(function  () {
	/*Height of aside*/
	(setInterval(h_foo, 1000));
	function h_foo () {
		var h = $('.main_wrap').height();
		var w = $('.main_wrap').width();
		if(w < 545) {
			$('aside').height('100%');
		} else {			
			$('aside').height(h+35);
		}
	}	
	/*Tabs*/
	$('.main_content ul li').click(function () {
		$('.main_content ul li').each(function () {
			$(this).removeClass('active');
		});
		$(this).addClass('active');
	});
	/*Menu func*/
	$('.menu').click(function () {
		$(this).toggleClass('open');
		$('.menu_expand').toggleClass('open');
	});

	/*Slider*/
	
	var wdth = $('.slider').width();
	$('.slides').width(wdth);
	var size = $('.slides').size();
	$('.list').width(wdth*size);

	//position
	$('.list').css('left', -wdth);
	$('.slides:last-child').prependTo('.list');

	//move slides forward
	function nextSlide () {
		$('.list').animate({
			'margin-left': -wdth
		}, 500, function () {
			$('.slides:first-child').appendTo('.list');
			$('.list').css('margin-left', 0);
			//det();
		});
	}

	//move slides backward

	function prevSlide () {
		$('.list').animate({
			'margin-left': wdth
		}, 500, function () {
			$('.slides:last-child').prependTo('.list');
			$('.list').css('margin-left', 0);
		});
	}

	function both () {
		  det();
		  nextSlide();
	}

	// auto slide
	function start () {
		  Id = setInterval(both, 5000);
	}
	start();

	function pz () {
		 clearInterval(Id); 
	}

	$('.slider').hover(pz, start);
//display active button
	function det () {
		  var sl = parseInt($('.slides:nth-child(3)').attr('class'));
		  $('.side_pg').each(function () {
			  $(this).removeClass('act');
			  var txt = $(this).text();
			  if (+txt == sl) $(this).addClass('act');
		});

		  
	}

	//navigation

	$('.side_pg').click(function () {
		$('.side_pg').each(function () {
			  $(this).removeClass('act');
		});
		$(this).addClass('act');
		var text = parseInt($(this).text());
		var nsl = parseInt($('.slides:nth-child(2)').attr('class'));
		var count = 0;
		if(text > nsl) {
			count = text - nsl;
			for (var i = 0; i < count; i++){
				nextSlide();
			}
		} else {
			count = nsl - text;
			for (var i = 0; i < count; i++){
				prevSlide();
			}
		}
	});

});