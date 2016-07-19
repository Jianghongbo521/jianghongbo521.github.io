$(function(){
	$('.slider').mousedown(function(ev){
		var disX = ev.clientX - $('.slider').position().left;
		function fnmove(ev){
			var l= ev.clientX-disX;
			if(l<=20){
				l=20;
			}
			if(l>=$('.lock').outerWidth()-$('.slider').outerWidth()-20){
				l=$('.lock').outerWidth()-$('.slider').outerWidth()-20;
				location.href = 'index.html';
			}
			$('.slider').css('left',l)
		}
		function fnup(){
			var left = $('.slider').position().left;
			if(left<$('.lock').outerWidth()-$('.slider').outerWidth()-20){
				$('.slider').stop().animate({left:20});
			}
			$(document).unbind('mousemove',fnmove);
			$(document).unbind('mouseup',fnup);
		}
		$(document).bind('mousemove',fnmove);
		$(document).bind('mouseup',fnup);
		return false;
	})
})