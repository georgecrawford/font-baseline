;(function(define){define(function(require,exports,module){

	function fontBaseline(container) {

		var div   = document.createElement('div'),
			style = document.createElement('style'),
			strut = document.createElement('span'),
			height;

		container = container || document.body;

		strut.innerText = 'T';
		style.innerText = ".font-baseline{visibility:hidden;height:100px;}.font-baseline span{line-height:0;}.font-baseline span:after{content:'';height:100%;display:inline-block;}";

		div.appendChild(strut);
		div.appendChild(style);
		div.classList.add('font-baseline');

		container.appendChild(div);
		height = strut.offsetTop + strut.offsetHeight - div.offsetHeight - div.offsetTop;
		div.parentNode.removeChild(div);

		return height;
	}

	module.exports = fontBaseline;

});})(typeof define=='function'&&define.amd?define
:(function(n,w){'use strict';return typeof module=='object'?function(c){
c(require,exports,module);}:function(c){var m={exports:{}};c(function(n){
return w[n];},m.exports,m);w[n]=m.exports;};})('font-baseline',this));
