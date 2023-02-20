

function ohneRegex(s) {
	let arr = CODE.codelist;
	//s=`-e +fi`
	let ws = toWordsX(s);
	let [sno, syes, smay] = [[], [], []];
	for (const w of ws) {
		if (w[0] == '-') sno.push(w.substring(1));
		else if (w[0] == '+') syes.push(w.substring(1));
		else smay.push(w);
	}

	let res = [];
	for (const el of arr) {
		let text = el.key; //or x.value
		if (sno.some(x => text.includes(x))) continue;
		if (syes.some(x => !text.includes(x))) continue;
		if (!isEmpty(syes) || smay.some(x => text.includes(x))) res.push(el.key);
	}
	CODE.selectedKeys = res; // arr.filter(x => regex.test(x.key)).map(x => x.key);
	console.log('res', res.length > 20 ? res.length : res)
	if (!isEmpty(res)) show_sidebar(res, myOnclickCodeInSidebar); //console.log('keys', res);

}

function keyPlusMinus(s) {
	let arr = CODE.codelist;

	s = `-e -i -u -y -g -o`
	let ws = toWordsX(s);
	let sno = '(', syes = '(';
	for (const w of ws) {
		if (w[0] == '-') sno += w.substring(1) + '|';
		else if (w[0] == '+') syes += w.substring(1) + '|';
		else syes += w + '|';
	}
	if (sno.length > 1) sno = stringMinusLast(sno) + ')'; else sno = null;
	if (syes.length > 1) syes = stringMinusLast(syes) + ')'; else syes = null;
	console.log('sno', sno, 'syes', syes);

	//return;
	let [s1, s2] = ['(e|o|i|u|y|g)', '(a)']; //ok =>pattern ^(?!.*(e|o|i|u|y|g)).*a.*$
	console.log('s1', s1, 's2', s2)

	let xno = 'hallo'; // `(?!${sno.substring(1)}\S+`; console.log('xno',xno)
	//xno=`.*[^${sno}].*`;
	xno = `^(?!(a|e)).*`;

	// let patt = sno && syes ? `^(?!.*${s1}).*${s2}.*$` : sno ? xno : syes;
	let patt = sno && syes ? `^(?!.*${sno}).*${syes}.*$` : sno ? xno : syes;
	console.log('pattern', patt)

	let regex = new RegExp(patt, 'i');

	let res = CODE.selectedKeys = arr.filter(x => regex.test(x.key)).map(x => x.key);
	console.log('res', res.length > 20 ? res.length : res)
	if (!isEmpty(res)) show_sidebar(res, myOnclickCodeInSidebar); //console.log('keys', res);
}


function searchCode(s, any = false, casesensitive = false, fulltext = false, how = 'start') {

	console.log('opts', any, casesensitive, fulltext, how)

	let arr = CODE.codelist;
	let kws = toWordsX(s);
	//if some word is prefixed by '+' this word MUST be present in text
	let patt = any ? '(' + toWords(s).join('|') + ')' : s;

	if (how == 'start') patt = '\\b' + patt;
	else if (how == 'end') patt = patt + '\\b';
	else if (how == 'either') patt = '(' + patt + '\\b' + '|' + '\\b' + patt + ')';

	let opts = casesensitive ? '' : 'i';

	let regex = new RegExp(patt, opts);
	let fsel = fulltext ? x => x.value : x => x.key;
	let res = CODE.selectedKeys = arr.filter(x => regex.test(fsel(x))).map(x => x.key);
	show_sidebar(res, myOnclickCodeInSidebar); console.log('keys', res.length > 20 ? res.length : res);
}

function codeContainsString(s) {
	let arr = CODE.codelist;
	let patt = s;

	let regex = new RegExp(patt, 'i');

	let res = CODE.selectedKeys = arr.filter(x => regex.test(x.value)).map(x => x.key);


	show_sidebar(res, myOnclickCodeInSidebar); //console.log('keys', res);	
}
function keyContainsString(s) {
	let arr = CODE.codelist;

	let patt = s;

	let regex = new RegExp(patt, 'i');

	let res = CODE.selectedKeys = arr.filter(x => regex.test(x.key)).map(x => x.key);

	show_sidebar(res, myOnclickCodeInSidebar); //console.log('keys', res);	
}
function keyContainsAnyWord(s) {
	let arr = CODE.codelist;

	let patt = toWords(s).join('|');

	let regex = new RegExp(patt, 'i');
	let res = CODE.selectedKeys = arr.filter(x => regex.test(x.key)).map(x => x.key);
	show_sidebar(res, myOnclickCodeInSidebar); //console.log('keys', res);	
}
function keyStartsWithAnyWord(s) {
	let arr = CODE.codelist;

	let patt = '\\b' + toWords(s).join('|'); console.log('patt', patt)

	let regex = new RegExp(patt, 'i');
	let res = CODE.selectedKeys = arr.filter(x => regex.test(x.key)).map(x => x.key);
	show_sidebar(res, myOnclickCodeInSidebar); console.log('keys', res);
}
function keyEndsWithAnyWord(s) {
	let arr = CODE.codelist;

	let patt = toWords(s).join('|') + '\\b'; console.log('patt', patt)

	let regex = new RegExp(patt, 'i');
	let res = CODE.selectedKeys = arr.filter(x => regex.test(x.key)).map(x => x.key);
	show_sidebar(res, myOnclickCodeInSidebar); console.log('keys', res);
}
function keyStartsOrEndsWithAnyWord(s) {
	let arr = CODE.codelist;

	// let patt = '\\b' + toWords(s).join('|') + '\\b'; console.log('patt', patt)
	//let patt = '\\W' + toWords(s).join('|') + '\\W'; console.log('patt', patt)

	// let patt = '\\b' + 'mDom' + '\\w*' + '\\b'; console.log('patt', patt)
	let w = toWords(s).join('|');
	let patt = `(\\b(${w})|(${w})\\b)`; console.log('patt', patt)
	let regex = new RegExp(patt, 'i');

	let res = CODE.selectedKeys = arr.filter(x => regex.test(x.key)).map(x => x.key);
	show_sidebar(res, myOnclickCodeInSidebar); console.log('keys', res);
}

















