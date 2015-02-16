;(function(define){define(function(require,exports,module){

	function fontBaseline(container) {

		var div   = document.createElement('div'),
			style = document.createElement('style'),
			strut = document.createElement('span'),
			computedStyle, baselineHeight, strutHeight, fontSize;

		container = container || document.body;

		strut.innerText = 'T';
		style.innerText = ".font-baseline{visibility:hidden;height:100px;}.font-baseline span:after{content:'';height:100%;display:inline-block;}";

		div.appendChild(strut);
		div.appendChild(style);
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
