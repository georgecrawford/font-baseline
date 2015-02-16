var fontBaseline = window['font-baseline'];

var openSansEl, pacificoEl;

function takeScreenshot() {
	if (window.callPhantom) {
		var date = new Date();
		var filename = "screenshots/" + date.getTime();
		console.log("Taking screenshot " + filename);
		callPhantom({'screenshot': filename});
	}
}

describe('Font Baseline', function() {

	beforeEach(function() {
		openSansEl = document.querySelector('.measure .open-sans');
		pacificoEl = document.querySelector('.measure .pacifico');

		openSansEl.style.fontSize = '12px';
		openSansEl.style.lineHeight = '20px';
		pacificoEl.style.fontSize = '12px';
		pacificoEl.style.lineHeight = '20px';
	});

	afterEach(function () {
		if (this.currentTest.state == 'failed') {
			takeScreenshot();
		}

		openSansEl.style.fontSize = '';
		openSansEl.style.lineHeight = '';
		pacificoEl.style.fontSize = '';
		pacificoEl.style.lineHeight = '';
	});

	it('should measure the baseline of OpenSans as 4px at 12px font-size', function() {
		var metrics = fontBaseline(openSansEl);
		assert.equal(metrics.baseline, 4);
	});

	it('should measure the baseline of Pacifico as 5px at 12px font-size', function() {
		var metrics = fontBaseline(pacificoEl);
		assert.equal(metrics.baseline, 5);
	});

	it('should measure the font size', function() {
		var metrics = fontBaseline(openSansEl);
		assert.equal(metrics.font, 12);
	});

	it('should measure the line height', function() {
		var metrics = fontBaseline(openSansEl);
		assert.equal(metrics.line, 20);
	});

	it('should measure the content height', function() {
		var metrics = fontBaseline(openSansEl);
		assert.equal(metrics.content, 17);
	});

	it('should report the content height multiplier', function() {
		var metrics = fontBaseline(openSansEl);
		assert.equal(metrics.multiplier, 12 / 17);
	});

	it('should report the baseline offset', function() {
		var metrics = fontBaseline(openSansEl);
		assert.equal(metrics.offset, ((20 - 17) / 2) + 4);
	});

	it('should measure in the body by default, inheriting OpenSans font', function() {
		var metrics = fontBaseline();
		assert.equal(metrics.baseline, 5);
		assert.equal(metrics.content, 22);
		assert.equal(metrics.font, 16);
		assert.equal(metrics.line, 22);
		assert.equal(metrics.offset, 5);
		assert.equal(metrics.multiplier, 16 / 22);
	});

});
