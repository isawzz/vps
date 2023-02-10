
function onclickCodeInSidebar(ev) {
	let key = isString(ev)?ev:ev.target.innerHTML;
	let text = CODE.justcode[key];

	let ta = AU.ta; let dParent = null;
	if (nundef(ta)) {
		dParent = valf(dFiddle, dTable, document.body);
		let talist = dTable.getElementsByTagName('textarea');
		if (isEmpty(talist)) ta = mTextarea(null, null, dParent, { w: '100%' });
		else ta = talist[0];
	} else dParent = ta.parentNode;
	ta.value = text;
	let hideal = ta.scrollHeight;
	console.log('ta.scrollheight', hideal)

	//wie gross soll dParent sein? h sowie sidebar
	let hsidebar = window.innerHeight-68; // getComputedStyle(dSidebar, 'height');
	mStyle(dParent, { hmax: hsidebar });

	let lines = text.split('\n');
	let min = lines.length + 1;

	mStyle(ta,{h:hideal,hmin:50,hmax:hsidebar-44});
	ta.scrollTop = 0; 

	let download = false;
	if (download) downloadAsText(text, 'hallo', 'js');
	return text;
}






















