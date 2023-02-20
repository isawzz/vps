function addDummy(dParent) {
	let dummy = mCreate('button');
	mAppend(dParent, dummy);
	mStyle(dummy, { position: 'absolute', opacity: 0, h: 0, w: 0, padding: 0, margin: 0, outline: 'none', border: 'none', bg: 'transparent' });
	dummy.id = 'dummy';

}
function ohneRegexMix(s) {
	let arr = CODE.codelist;
	//s=`-e +fi`
	let ws = parseSearchString(s);
	let [sno, syes, smay] = [[], [], []];
	for (const w of ws) {
		if (w[0] == '-') sno.push(w.substring(1));
		else if (w[0] == '+') syes.push(w.substring(1));
		else smay.push(w);
	}

	let res = [];
	let opts = lookup(CODE, ['searchOptions', 'case']) == true ? '' : 'i';
	let prop = lookup(CODE, ['searchOptions', 'fulltext']) == true ? 'value' : 'key';
	let prefix = lookup(CODE, ['searchOptions', 'where']); // == true ? 'value' : 'key';

	for (const el of arr) {
		let text = el[prop]; //or x.value
		if (sno.some(x => text.includes(x))) continue;
		if (syes.some(x => !text.includes(x))) continue;
		let patt = smay.join('|');
		if (prefix) patt = '\\b' + patt;
		let regex = new RegExp(patt, opts);
		if (regex.test(text)) res.push(el.key);
		//if (!isEmpty(syes) || smay.some(x => text.includes(x))) res.push(el.key);
	}
	CODE.selectedKeys = res; // arr.filter(x => regex.test(x.key)).map(x => x.key);
	console.log('res', res.length > 20 ? res.length : res)
	if (!isEmpty(res)) show_sidebar(res, myOnclickCodeInSidebar); //console.log('keys', res);
}

function stringMinusLast(s, n = 1) {
	return s.substring(0, s.length - n);
}
function lookupToggle(o, list) {
	let x = lookup(o, list);
	let val = !x;
	lookupSetOverride(o, list, val);
	return val;
}
function onclickFulltext(ev) {
	let val = lookupToggle(CODE, ['searchOptions', 'fulltext']);
	let b = ev.target;
	b.innerHTML = val ? 'fulltext' : 'name';
}
function onclickCase(ev) {
	let val = lookupToggle(CODE, ['searchOptions', 'case']);
	let b = ev.target;
	b.innerHTML = val ? 'case-sensitive' : 'insensitive';
}
function onclickWhere(ev) {
	let val = lookupToggle(CODE, ['searchOptions', 'where']);
	let b = ev.target;
	b.innerHTML = val ? 'start' : 'anywhere';
}
















