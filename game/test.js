function startloop() { FR = 30; DA.interval = setInterval(xdraw, FR) }
function pauseloop() { clearInterval(DA.interval); }
function rPosition(o) { return [rNumber(0, o.width), rNumber(0, o.height)]; }
function rInc(o, prop, min, max) { o[prop] += rNumber(min, max); return o[prop]; }
function xdraw() {
	cEllipse(rInc(CV, 'x', -1, 2), rInc(CV, 'y', -1, 2), 30, 20, { bg: 'blue', fg:'green' });
}
function test1_p5_init() {
	dTable = mBy('dTable'); mCenterFlex(dTable);
	let o = mCanvas(dTable, { w: 600, h: 400 }, {}, startloop, pauseloop);
	[CV, CX] = [o.cv, o.cx];

	//enhance canvas object:
	addKeys({ x: 0, y: 0 }, CV); //{ x: CV.width / 2, y: CV.height / 2 }, CV);
	console.log('w', CV.width);
}

function test0_random() {

	let n = rNumber(12, 20); //there is no function random in js (it is in p5)
	console.log('n', n)

}













