//allcode overrides!
function runcode(code, callback = null) {
	let x = eval(code);
	if (callback) callback(x);
	else {
		console.log('===>result:', x);
		if (isdef(dMessage)) dMessage.innerHTML = isDict(x) ? JSON.stringify(x) : isdef(x)? x.toString() : x;
	}
}


















