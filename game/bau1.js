
function mGridFrom(d,m,cols,rows){
	let gta = '';
	let words = [];
	for (const line of m) {
		gta = gta + `'${line}' `;
		let warr = toWords(line);
		//console.log('warr',warr)
		for(const w of warr) if (!words.includes(w)) words.push(w);
		//w.map(x => addIf(words, w));

	}
	//console.log('gta',gta);
	console.log('words',words);
	let dParent = mDom100(d, { display: 'grid', 'grid-template-areas': gta});
	dParent.style.gridTemplateColumns = cols;
	dParent.style.gridTemplateRows = rows;
	for(const w of words){
		window[w] = mDom(dParent, { 'grid-area': w, bg: rColor(25) }, {id:w,html:w.substring(1)})

	}
	//console.log('dParent',dParent); return;
	return dParent;
}




















