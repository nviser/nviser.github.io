$(document).ready(function () {
	 $("nav li").click(function () {
	 	  nav_header();
	 	  $(this).addClass("active");
	 });
	 
	 function nav_header () {
	 	$("nav li").each(function () {
	 		$(this).removeClass("active");
	 	});
	 };

	 $(".portfolio_btns li").click(function () {
	 	  nav_portfolio();
	 	  $(this).addClass("p_active");
	 });
	 
	 function nav_portfolio () {
	 	$(".portfolio_btns li").each(function () {
	 		$(this).removeClass("p_active");
	 	});
	 };

	 $(".social_netw li").click(function () {
	 	  nav_social();
	 	  $(this).addClass("visit");
	 });
	 
	 function nav_social () {
	 	$(".social_netw li").each(function () {
	 		$(this).removeClass("visit");
	 	});
	 };
}); /* End ready*/