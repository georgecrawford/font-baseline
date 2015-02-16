var fontBaseline = window['font-baseline'];

function takeScreenshot() {
	if (window.callPhantom) {
		var date = new Date();
		var filename = "screenshots/" + date.getTime();
		console.log("Taking screenshot " + filename);
		callPhantom({'screenshot': filename});
	}
}

afterEach(function () {
	if (this.currentTest.state == 'failed') {
		takeScreenshot();
	}
});

describe('Font Baseline', function() {

	it('should measure the baseline of OpenSans as 5px at 16px font-size', function() {
		assert.equal(fontBaseline(document.querySelector('.measure .open-sans')), 5);
	});

	it('should measure the baseline of Pacifico as 7px at 16px font-size', function() {
		assert.equal(fontBaseline(document.querySelector('.measure .pacifico')), 7);
	});

	it('should measure in the body by default, inheriting OpenSans font', function() {
		assert.equal(fontBaseline(document.querySelector('.measure .open-sans')), 5);
	});
});
