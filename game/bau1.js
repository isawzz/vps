
function onclickTest(x) {
	console.log('TEST!', x)
}
function mButton(caption, handler, dParent, styles = {}, opts = {}) {
	addKeys({ bg: '#00000080', hpadding: 10, vpadding: 4, rounding: 8, cursor: 'pointer' }, styles);
	addKeys({ html: caption, onclick: handler, className: 'hop1' }, opts);
	return mDom(dParent, styles, opts);
}
function mSearch(label, handler, dParent, styles = {}, opts = {}) {
	let html = `
    <form action="javascript:void(0);">
		<label>${label}</label>
    </form>
  `;
	let elem = mCreateFrom(html);
	mAppend(dParent, elem);
	mStyle(elem, { display: 'grid','align-items':'center', w100: true, gap: 4, 'grid-template-columns': 'auto 1fr auto' });
	//mStyle(elem, { display: 'grid', w100: true, gap: 4, 'grid-template-columns': 'auto 1fr auto' });

	let inp = mInput(elem, styles, opts);

	let myhandler = () => handler(toWords(mBy(inp.id).value));
	mButton('GO', myhandler, elem);
	elem.onsubmit = myhandler;

	return elem;
}
function mInput(dParent, styles = {}, opts = {}) {
	addKeys({ fz: 'inherit', fg: 'inherit', 'flex-grow': 1, bg: '#00000080', hpadding: 10, vpadding: 4, rounding: 8, cursor: 'pointer' }, styles);
	addKeys({ id: 'inpSearch', name: 'searchResult', className: 'hop1 plain', type: 'text', tag: 'input' }, opts)
	return mDom(dParent, styles, opts);

}

function myOnclickCodeInSidebar(ev) {
	let key = isString(ev) ? ev : ev.target.innerHTML;
	let text = CODE.justcode[key];
	AU.ta.value = text;
	let download = false;
	if (download) downloadAsText(text, 'hallo', 'js');
	return text;
}

function mySearch(kws) {
	let words = isList(kws) ? kws : toWords(mBy('iKeywords').value);
	console.log('fiddleSearch: keywords are', words);
	let di = CODE.justcode;
	let dilist = dict2list(di, 'key');
	//console.log('dilist',dilist); return;
	// let records = dilist.filter(x => words.some(w => x.value.includes(w)));

	//let regex=new RegExp(`\\${w}\\b`,'i');
	let records = dilist.filter(x => words.some(w => x.key.match(new RegExp(`\\${w}\\b`,'i'))));
	console.log('records', records)
	show_sidebar(records.map(x => x.key), myOnclickCodeInSidebar);
	return records;
}


















