/**
 * A copyOnClick plugin for jQuery.
 *
 * Usage:
 *
 *     $("#my-button").copyOnClick('text');
 *
 *     $("#my-other-button").copyOnClick(function(e){
 *         return $("#some-textarea").val();
 *     });
 *
 *     $("#yet-another-button").copyOnClick(function(e){
 *         return $("#a-div").html();
 *     });
 *
 * This plugin wraps ZeroClipboard with jQuery goodness:
 *
 *     http://code.google.com/p/zeroclipboard/
 * 
 * @author Justin Hileman <justin@shopopensky.com>
 */
;(function($){

$.fn.copyOnClick = function(txt) {

	return this.each(function() {
		var $$ = $(this);

		if ($.browser.msie) {
			$$.mousedown(function(e) {
				window.clipboardData.setData('Text', typeof txt == 'function' ? txt(e) : txt);
			});
		} else {
			var clip = $$.data('clip');
			if (typeof clip == 'undefined') {
				clip = new ZeroClipboard.Client();
				$$.data('clip', clip);
			}

			var container_id = "copyonclick-container-" + Math.floor(Math.random()*10000).toString(16);
			$$.wrap("<div id='" + container_id + "' class='copyonclick-container' style='position:relative'></div>");

			$$.mousedown(function(e) {
				clip.setText(typeof txt == 'function' ? txt(e) : txt);
			});

			clip.glue(this, container_id);

			// only show a hand on <a> tags.
			if (this.nodeType != 1) {
				clip.setHandCursor(false);
			}

			// pass events through the flash overlay
			$.each(['mouseDown','mouseOver', 'mouseOut', 'mouseUp'], function(i,el) {
				clip.addEventListener(el, function(client) {
					$$.trigger(el.toLowerCase(), client);
				});
			});
		}
	});
};

var base = $('script[src*=jquery.copyonclick]').attr('src').replace(/jquery\.copyonclick(\.min)?\.js/, '');
ZeroClipboard.setMoviePath(base + 'ZeroClipboard.swf');

})(jQuery);