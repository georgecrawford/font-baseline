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

	it('should measure the baseline of OpenSans', function() {
		assert.equal(fontBaseline(document.getElementById('open-sans')), 5);

	});

	it('should measure the baseline of Pacifico', function() {
		assert.equal(fontBaseline(document.getElementById('pacifico')), 7);
	});

	it('should measure in the body by default, inheriting OpenSans font', function() {
		assert.equal(fontBaseline(), 5);
	});
});
