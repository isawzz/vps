
function mStyle1(d, styles) {
	if (isdef(styles.whrest)) { delete styles.whrest; styles.w = styles.h = 'rest'; } else if (isdef(styles.wh100)) { styles.w = styles.h = '100%'; delete styles.wh100;  }
	if (isdef(styles.w100)) styles.w = '100%'; else if (isdef(styles.wrest)) styles.w = 'rest';
	if (isdef(styles.h100)) styles.h = '100%'; else if (isdef(styles.hrest)) styles.h = 'rest';
	console.log('styles',d.id,styles)
	let dParent = d.parentNode;
	let pad = parseInt(valf(dParent.style.padding, '0'));
	let r = getRect(d, dParent);
	if (styles.w == 'rest') {
		let left = r.l;
		let w = getRect(dParent).w;
		let wrest = w - left - pad;
		styles.w = wrest;

	}
	if (styles.h == 'rest') {
		let top = r.t;
		let h = getRect(dParent).h;
		let hrest = h - top - pad;
		styles.h = hrest;

	}
	mStyle(d, styles);
}


















