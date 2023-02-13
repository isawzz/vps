onload = _start;

async function _start() {
	test15();
	return;
	set_run_state_no_server(); // set_run_state_no_server | set_run_state_local | set_run_state_vps
	onpagedeactivated(() => { fiddleSave(); dbSave(); });
	await load_syms();
	await load_db();
	await loadCodebase();

	//jetzt hab ich bereits alles was ich brauche!
	//kann buttons zu dTestButtons geben...
	dFiddle.innerHTML = '';
	mStyle(dFiddle, { padding: 0, box: true });



	let ta = AU.ta = mTextArea(dFiddle, { padding: 0, box: true, w: '100%', h: 'rest', outline: 'none', overflow: 'hidden' });

}

function mDomRest(dParent,styles,opts){
	if (nundef(styles.w) && nundef(styles.w100))	addKeys({wrest:true},styles);
	if (nundef(styles.h) && nundef(styles.h100))	addKeys({hrest:true},styles);
	return mDom(dParent,styles,opts);
}
function mDom100(dParent,styles,opts){
	if (nundef(styles.w) && nundef(styles.wrest))	addKeys({w100:true},styles);
	if (nundef(styles.h) && nundef(styles.hrest))	addKeys({h100:true},styles);
	return mDom(dParent,styles,opts);
}
function mDom(dParent, styles={}, opts={}) {
	let tag = valf(opts.tag, 'div');
	let d = document.createElement(tag);;
	mAppend(dParent, d);
	if (tag == 'textarea') styles.wrap = 'hard';
	const aliases = {
		classes: 'className',
		inner: 'innerHTML',
		html: 'innerHTML',

	};
	for (const opt in opts) { d[valf(aliases[opt], opt)] = opts[opt] };
	mStyle1(d, styles);
	return d;
}
function mTaPlain(dParent, styles = {}, opts = {}) {
	opts.tag = 'textarea';
	let ta = mDom(dParent, styles, opts);
	mClass(ta, 'plain');
	return ta;
}



