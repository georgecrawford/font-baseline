;(function(define){define(function(require,exports,module){

	function fontBaseline(container) {

		var div   = document.createElement('div'),
			style = document.createElement('style'),
			strut = document.createElement('span'),
			computedStyle, baselineHeight, strutHeight, fontSize, lineHeight;

		container = container || document.body;

		// Webkit hack: http://davidwalsh.name/add-rules-stylesheets
		style.appendChild(document.createTextNode(''));
		document.head.appendChild(style);
		style.sheet.insertRule('.font-baseline{visibility:hidden;height:100px;}', 0);
		style.sheet.insertRule('.font-baseline span:after{content:\'\';height:100%;display:inline-block;}', 1);

		// Thanks to Alan Stearns for the hack!
		// http://blogs.adobe.com/webplatform/2014/08/13/one-weird-trick-to-baseline-align-text/
		strut.textContent = 'T';
		div.appendChild(strut);
		div.classList.add('font-baseline');
		container.appendChild(div);

		computedStyle  = window.getComputedStyle(strut);
		fontSize       = parseInt(computedStyle.fontSize, 10);
		lineHeight     = parseInt(computedStyle.lineHeight, 10);

		strut.style.lineHeight = 0;

		strutHeight    = strut.offsetHeight;
		baselineHeight = strut.offsetTop + strutHeight - div.offsetHeight - div.offsetTop;

		lineHeight     = lineHeight || strutHeight;

		div.parentNode.removeChild(div);
		style.parentNode.removeChild(style);

		return {
			baseline:   baselineHeight,
			content:    strutHeight,
			font:       fontSize,
			line:       lineHeight,
			multiplier: fontSize / strutHeight,
			offset:     ((lineHeight - strutHeight) / 2) + baselineHeight
		};
	}

	module.exports = fontBaseline;

});})(typeof define=='function'&&define.amd?define
:(function(n,w){'use strict';return typeof module=='object'?function(c){
c(require,exports,module);}:function(c){var m={exports:{}};c(function(n){
return w[n];},m.exports,m);w[n]=m.exports;};})('font-baseline',this));
