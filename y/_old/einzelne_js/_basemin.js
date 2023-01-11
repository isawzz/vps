function HSLAToRGBA(hsla, isPct) {
	let ex = /^hsla\(((((([12]?[1-9]?\d)|[12]0\d|(3[0-5]\d))(\.\d+)?)|(\.\d+))(deg)?|(0|0?\.\d+)turn|(([0-6](\.\d+)?)|(\.\d+))rad)(((,\s?(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2},\s?)|((\s(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2}\s\/\s))((0?\.\d+)|[01]|(([1-9]?\d(\.\d+)?)|100|(\.\d+))%)\)$/i;
	if (ex.test(hsla)) {
		let sep = hsla.indexOf(',') > -1 ? ',' : ' ';
		hsla = hsla
			.substr(5)
			.split(')')[0]
			.split(sep);
		if (hsla.indexOf('/') > -1) hsla.splice(3, 1);
		isPct = isPct === true;
		let h = hsla[0],
			s = hsla[1].substr(0, hsla[1].length - 1) / 100,
			l = hsla[2].substr(0, hsla[2].length - 1) / 100,
			a = hsla[3];
		if (h.indexOf('deg') > -1) h = h.substr(0, h.length - 3);
		else if (h.indexOf('rad') > -1) h = Math.round((h.substr(0, h.length - 3) / (2 * Math.PI)) * 360);
		else if (h.indexOf('turn') > -1) h = Math.round(h.substr(0, h.length - 4) * 360);
		if (h >= 360) h %= 360;
		let c = (1 - Math.abs(2 * l - 1)) * s,
			x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
			m = l - c / 2,
			r = 0,
			g = 0,
			b = 0;
		if (0 <= h && h < 60) {
			r = c;
			g = x;
			b = 0;
		} else if (60 <= h && h < 120) {
			r = x;
			g = c;
			b = 0;
		} else if (120 <= h && h < 180) {
			r = 0;
			g = c;
			b = x;
		} else if (180 <= h && h < 240) {
			r = 0;
			g = x;
			b = c;
		} else if (240 <= h && h < 300) {
			r = x;
			g = 0;
			b = c;
		} else if (300 <= h && h < 360) {
			r = c;
			g = 0;
			b = x;
		}
		r = Math.round((r + m) * 255);
		g = Math.round((g + m) * 255);
		b = Math.round((b + m) * 255);
		let pctFound = a.indexOf('%') > -1;
		if (isPct) {
			r = +((r / 255) * 100).toFixed(1);
			g = +((g / 255) * 100).toFixed(1);
			b = +((b / 255) * 100).toFixed(1);
			if (!pctFound) {
				a *= 100;
			} else {
				a = a.substr(0, a.length - 1);
			}
		} else if (pctFound) {
			a = a.substr(0, a.length - 1) / 100;
		}
		return 'rgba(' + (isPct ? r + '%,' + g + '%,' + b + '%,' + a + '%' : +r + ',' + +g + ',' + +b + ',' + +a) + ')';
	} else {
		return 'Invalid input color';
	}
}

function HSLToRGB(hsl, isPct) {
	let ex = /^hsl\(((((([12]?[1-9]?\d)|[12]0\d|(3[0-5]\d))(\.\d+)?)|(\.\d+))(deg)?|(0|0?\.\d+)turn|(([0-6](\.\d+)?)|(\.\d+))rad)((,\s?(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2}|(\s(([1-9]?\d(\.\d+)?)|100|(\.\d+))%){2})\)$/i;
	if (ex.test(hsl)) {
		let sep = hsl.indexOf(',') > -1 ? ',' : ' ';
		hsl = hsl
			.substr(4)
			.split(')')[0]
			.split(sep);
		isPct = isPct === true;
		let h = hsl[0],
			s = hsl[1].substr(0, hsl[1].length - 1) / 100,
			l = hsl[2].substr(0, hsl[2].length - 1) / 100;
		if (h.indexOf('deg') > -1) h = h.substr(0, h.length - 3);
		else if (h.indexOf('rad') > -1) h = Math.round((h.substr(0, h.length - 3) / (2 * Math.PI)) * 360);
		else if (h.indexOf('turn') > -1) h = Math.round(h.substr(0, h.length - 4) * 360);
		if (h >= 360) h %= 360;
		let c = (1 - Math.abs(2 * l - 1)) * s,
			x = c * (1 - Math.abs(((h / 60) % 2) - 1)),
			m = l - c / 2,
			r = 0,
			g = 0,
			b = 0;
		if (0 <= h && h < 60) {
			r = c;
			g = x;
			b = 0;
		} else if (60 <= h && h < 120) {
			r = x;
			g = c;
			b = 0;
		} else if (120 <= h && h < 180) {
			r = 0;
			g = c;
			b = x;
		} else if (180 <= h && h < 240) {
			r = 0;
			g = x;
			b = c;
		} else if (240 <= h && h < 300) {
			r = x;
			g = 0;
			b = c;
		} else if (300 <= h && h < 360) {
			r = c;
			g = 0;
			b = x;
		}
		r = Math.round((r + m) * 255);
		g = Math.round((g + m) * 255);
		b = Math.round((b + m) * 255);
		if (isPct) {
			r = +((r / 255) * 100).toFixed(1);
			g = +((g / 255) * 100).toFixed(1);
			b = +((b / 255) * 100).toFixed(1);
		}
		return 'rgb(' + (isPct ? r + '%,' + g + '%,' + b + '%' : +r + ',' + +g + ',' + +b) + ')';
	} else {
		return 'Invalid input color';
	}
}

function RGBAToHSLA(rgba) {
	let ex = /^rgba\((((((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]),\s?)){3})|(((([1-9]?\d(\.\d+)?)|100|(\.\d+))%,\s?){3}))|(((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5])\s){3})|(((([1-9]?\d(\.\d+)?)|100|(\.\d+))%\s){3}))\/\s)((0?\.\d+)|[01]|(([1-9]?\d(\.\d+)?)|100|(\.\d+))%)\)$/i;
	if (ex.test(rgba)) {
		let sep = rgba.indexOf(',') > -1 ? ',' : ' ';
		rgba = rgba
			.substr(5)
			.split(')')[0]
			.split(sep);
		if (rgba.indexOf('/') > -1) rgba.splice(3, 1);
		for (let R in rgba) {
			let r = rgba[R];
			if (r.indexOf('%') > -1) {
				let p = r.substr(0, r.length - 1) / 100;
				if (R < 3) {
					rgba[R] = Math.round(p * 255);
				}
			}
		}
		let r = rgba[0] / 255,
			g = rgba[1] / 255,
			b = rgba[2] / 255,
			a = rgba[3],
			cmin = Math.min(r, g, b),
			cmax = Math.max(r, g, b),
			delta = cmax - cmin,
			h = 0,
			s = 0,
			l = 0;
		if (delta == 0) h = 0;
		else if (cmax == r) h = ((g - b) / delta) % 6;
		else if (cmax == g) h = (b - r) / delta + 2;
		else h = (r - g) / delta + 4;
		h = Math.round(h * 60);
		if (h < 0) h += 360;
		l = (cmax + cmin) / 2;
		s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
		s = +(s * 100).toFixed(1);
		l = +(l * 100).toFixed(1);
		return 'hsla(' + h + ',' + s + '%,' + l + '%,' + a + ')';
	} else {
		return 'Invalid input color';
	}
}

function RGBAToHex9(rgba) {
	let n = allNumbers(rgba);
	if (n.length < 3) {
		return randomHexColor();
	}
	let a = n.length > 3 ? n[3] : 1;
	let sa = alphaToHex(a);
	if (rgba.includes('%')) {
		n[0] = Math.round((n[0] * 255) / 100);
		n[1] = Math.round((n[1] * 255) / 100);
		n[2] = Math.round((n[2] * 255) / 100);
	}
	return '#' + ((1 << 24) + (n[0] << 16) + (n[1] << 8) + n[2]).toString(16).slice(1) + sa;
}

function RGBToHSL(rgb) {
	let ex = /^rgb\((((((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]),\s?)){2}|((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5])\s)){2})((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]))|((((([1-9]?\d(\.\d+)?)|100|(\.\d+))%,\s?){2}|((([1-9]?\d(\.\d+)?)|100|(\.\d+))%\s){2})(([1-9]?\d(\.\d+)?)|100|(\.\d+))%))\)$/i;
	if (ex.test(rgb)) {
		let sep = rgb.indexOf(',') > -1 ? ',' : ' ';
		rgb = rgb
			.substr(4)
			.split(')')[0]
			.split(sep);
		for (let R in rgb) {
			let r = rgb[R];
			if (r.indexOf('%') > -1) rgb[R] = Math.round((r.substr(0, r.length - 1) / 100) * 255);
		}
		let r = rgb[0] / 255,
			g = rgb[1] / 255,
			b = rgb[2] / 255,
			cmin = Math.min(r, g, b),
			cmax = Math.max(r, g, b),
			delta = cmax - cmin,
			h = 0,
			s = 0,
			l = 0;
		if (delta == 0) h = 0;
		else if (cmax == r) h = ((g - b) / delta) % 6;
		else if (cmax == g) h = (b - r) / delta + 2;
		else h = (r - g) / delta + 4;
		h = Math.round(h * 60);
		if (h < 0) h += 360;
		l = (cmax + cmin) / 2;
		s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
		s = +(s * 100).toFixed(1);
		l = +(l * 100).toFixed(1);
		return 'hsl(' + h + ',' + s + '%,' + l + '%)';
	} else {
		return 'Invalid input color';
	}
}

function RGBToHex7(c) {
	let n = allNumbers(c);
	if (c.includes('%')) {
		n[0] = Math.round((n[0] * 255) / 100);
		n[1] = Math.round((n[1] * 255) / 100);
		n[2] = Math.round((n[2] * 255) / 100);
	}
	return '#' + ((1 << 24) + (n[0] << 16) + (n[1] << 8) + n[2]).toString(16).slice(1);
}

function aFlip(d, ms = 300, x = 0, y = 1, easing = 'cubic-bezier(1,-0.03,.27,1)') {
	return d.animate({ transform: `scale(${2}px,${y}px)` }, { easing: easing, duration: ms });
}

function aJumpby(elem, h = 40, ms = 1000) {
	anime({
		targets: elem,
		keyframes: [
			{ translateY: 2, scaleX: 1.05, scaleY: .95 },
			{ translateY: 2, scaleX: 1.05, scaleY: .95 },
			{ translateY: -h, scaleX: .9, scaleY: 1.1 },
			{ translateY: -h, scaleX: .9, scaleY: 1.1 },
			{ translateY: 0, scaleX: 1, scaleY: 1 },
			{ translateY: -7, scaleX: 1, scaleY: 1 },
			{ translateY: 0, scaleX: 1, scaleY: 1 },
			{ translateY: 0, scaleX: 1, scaleY: 1 },
			{ translateY: 0, scaleX: 1, scaleY: 1 },
			{ translateY: 0, scaleX: 1, scaleY: 1 },
		],
		duration: 1000,
		easing: 'easeInOutSine',
	});
}

function aMove(d, dSource, dTarget, callback, offset, ms, easing, fade) {
	let b1 = getRect(dSource);
	let b2 = getRect(dTarget);
	if (nundef(offset)) offset = { x: 0, y: 0 };
	let dist = { x: b2.x - b1.x + offset.x, y: b2.y - b1.y + offset.y };
	d.style.zIndex = 100;
	let a = d.animate({ opacity: valf(fade, 1), transform: `translate(${dist.x}px,${dist.y}px)` }, { easing: valf(easing, 'EASE'), duration: ms });
	a.onfinish = () => { d.style.zIndex = iZMax(); if (isdef(callback)) callback(); };
}

function aRollby(elem, dx, ms = 3000) {
	anime({ targets: elem, translateX: dx, rotate: '1turn', duration: ms });
}

function aRotate(d, ms = 2000) {
	return d.animate({ transform: `rotate(360deg)` }, ms);
}

function aRotateAccel(d, ms) {
	return d.animate({ transform: `rotate(1200deg)` }, { easing: 'cubic-bezier(.72, 0, 1, 1)', duration: ms });
}

function aSvg(dParent) {
	if (!dParent.style.position) dParent.style.position = 'relative';
	let svg1 = gSvg();
	svg1.setAttribute('width', '100%');
	svg1.setAttribute('height', '100%');
	let style = 'margin:0;padding:0;position:absolute;top:0px;left:0px;';
	svg1.setAttribute('style', style);
	dParent.appendChild(svg1);
	return svg1;
}

function aSvgg(dParent, originInCenter = true) {
	if (!dParent.style.position) dParent.style.position = 'relative';
	let svg1 = gSvg();
	svg1.setAttribute('width', '100%');
	svg1.setAttribute('height', '100%');
	let style = 'margin:0;padding:0;position:absolute;top:0px;left:0px;';
	svg1.setAttribute('style', style);
	dParent.appendChild(svg1);
	let g1 = document.createElementNS('http:/' + '/www.w3.org/2000/svg', 'g');
	svg1.appendChild(g1);
	if (originInCenter) { g1.style.transform = "translate(50%, 50%)"; }
	return g1;
}

function aTranslateBy(d, x, y, ms) {
	return d.animate({ transform: `translate(${x}px,${y}px)` }, ms);
}

function aTranslateByEase(d, x, y, ms, easing = 'cubic-bezier(1,-0.03,.27,1)') {
	return d.animate({ transform: `translate(${x}px,${y}px)` }, { easing: easing, duration: ms });
}

function aTranslateFadeBy(d, x, y, ms) {
	return d.animate({ opacity: .5, transform: `translate(${x}px,${y}px)` }, { easing: MyEasing, duration: ms });
}

function addIf(arr, el) {
	if (!arr.includes(el)) arr.push(el);
}

function addKeys(ofrom, oto) {
	for (const k in ofrom) if (nundef(oto[k])) oto[k] = ofrom[k]; return oto;
}

function addMonthToDate(date, months) {
	let d = new Date(date);
	d.setMonth(d.getMonth() + months);
	return d;
}

function addWeekToDate(date, weeks) {
	let d = new Date(date);
	d.setDate(d.getDate() + (weeks * 7));
	return d;
}

function agCircle(g, sz) {
	let r = gEllipse(sz, sz); g.appendChild(r); return r;
}

function agColoredShape(g, shape, w, h, color) {
	SHAPEFUNCS[shape](g, w, h);
	gBg(g, color);
}

function agEllipse(g, w, h) {
	let r = gEllipse(w, h); g.appendChild(r); return r;
}

function agG(g) {
	let g1 = gG(); g.appendChild(g1); return g1;
}

function agHex(g, w, h) {
	let pts = size2hex(w, h); return agPoly(g, pts);
}

function agLine(g, x1, y1, x2, y2) {
	let r = gLine(x1, y1, x2, y2); g.appendChild(r); return r;
}

function agPoly(g, pts) {
	let r = gPoly(pts); g.appendChild(r); return r;
}

function agRect(g, w, h) {
	let r = gRect(w, h); g.appendChild(r); return r;
}

function agShape(g, shape, w, h, color, rounding) {
	let sh = gShape(shape, w, h, color, rounding);
	g.appendChild(sh);
	return sh;
}

function aggregate_elements(list_of_object, propname) {
	let result = [];
	for (let i = 0; i < list_of_object.length; i++) {
		let obj = list_of_object[i];
		let arr = obj[propname];
		for (let j = 0; j < arr.length; j++) {
			result.push(arr[j]);
		}
	}
	return result;
}

function allNumbers(s) {
	let m = s.match(/\-.\d+|\-\d+|\.\d+|\d+\.\d+|\d+\b|\d+(?=\w)/g);
	if (m) return m.map(v => Number(v)); else return null;
}

function alphaToHex(zero1) {
	zero1 = Math.round(zero1 * 100) / 100;
	var alpha = Math.round(zero1 * 255);
	var hex = (alpha + 0x10000)
		.toString(16)
		.slice(-2)
		.toUpperCase();
	var perc = Math.round(zero1 * 100);
	return hex;
}

function animateProperty(elem, prop, start, middle, end, msDuration, forwards) {
	let kflist = [];
	for (const v of [start, middle, end]) {
		let o = {};
		o[prop] = isString(v) || prop == 'opacity' ? v : '' + v + 'px';
		kflist.push(o);
	}
	let opts = { duration: msDuration };
	if (isdef(forwards)) opts.fill = forwards;
	elem.animate(kflist, opts);
}

function animatePropertyX(elem, prop, start_middle_end, msDuration, forwards, easing, delay) {
	let kflist = [];
	for (const perc in start_middle_end) {
		let o = {};
		let val = start_middle_end[perc];
		o[prop] = isString(val) || prop == 'opacity' ? val : '' + val + 'px';
		kflist.push(o);
	}
	let opts = { duration: msDuration, fill: valf(forwards, 'none'), easing: valf(easing, 'ease-it-out'), delay: valf(delay, 0) };
	elem.animate(kflist, opts);
}

function arrAdd(arr1, arr2) {
	let i = 0; return arr1.map(x => x + arr2[i++]);
}

function arrBuckets(arr, func, sortbystr) {
	let di = {};
	for (const a of arr) {
		let val = func(a);
		if (nundef(di[val])) di[val] = { val: val, list: [] };
		di[val].list.push(a);
	}
	let res = []
	let keys = get_keys(di);
	if (isdef(sortbystr)) {
		keys.sort((a, b) => sortbystr.indexOf(a) - sortbystr.indexOf(b));
	}
	return keys.map(x => di[x]);
}

function arrChildren(elem) {
	return [...toElem(elem).children];
}

function arrClear(arr) {
	arr.length = 0;
}

function arrCount(arr, func) {
	return arr.filter(func).length;
}

function arrCycle(arr, count) {
	return arrRotate(arr, count);
}

function arrExtend(arr, list) {
	list.map(x => arr.push(x)); return arr;
}

function arrFirst(arr) {
	return arr.length > 0 ? arr[0] : null;
}

function arrFlatten(arr) {
	let res = [];
	for (let i = 0; i < arr.length; i++) {
		for (let j = 0; j < arr[i].length; j++) {
			res.push(arr[i][j]);
		}
	}
	return res;
}

function arrFromIndex(arr, i) {
	return arr.slice(i);
}

function arrFromTo(arr, iFrom, iTo) {
	return takeFromTo(arr, iFrom, iTo);
}

function arrFunc(n, func) {
	let res = []; for (let i = 0; i < n; i++) res.push(func()); return res;
}

function arrIndices(arr, func) {
	let indices = [];
	for (let i = 0; i < arr.length; i++) { if (func(arr[i])) indices.push(i); }
	return indices;
}

function arrLast(arr) {
	return arr.length > 0 ? arr[arr.length - 1] : null;
}

function arrLastOfLast(arr) {
	if (arr.length > 0) { let l = arrLast(arr); return isList(l) ? arrLast(l) : null; } else return null;
}

function arrMax(arr, f) {
	return arr_get_max(arr, f);
}

function arrMin(arr, f) {
	return arr_get_min(arr, f);
}

function arrMinMax(arr, func) {
	if (nundef(func)) func = x => x;
	let min = func(arr[0]), max = func(arr[0]), imin = 0, imax = 0;
	for (let i = 1, len = arr.length; i < len; i++) {
		let v = func(arr[i]);
		if (v < min) {
			min = v; imin = i;
		} else if (v > max) {
			max = v; imax = i;
		}
	}
	return { min: min, imin: imin, max: max, imax: imax, elmin: arr[imin], elmax: arr[imax] };
}

function arrMinus(a, b) {
	if (isList(b)) return a.filter(x => !b.includes(x)); else return a.filter(x => x != b);
}

function arrNoDuplicates(arr) {
	let di = {};
	let arrNew = [];
	for (const el of arr) {
		if (!isLiteral(el)) continue;
		if (isdef(di[el])) continue;
		di[el] = true;
		arrNew.push(el);
	}
	return arrNew;
}

function arrPlus(a, b) {
	b.map(x => a.push(x)); return a;
}

function arrRange(from = 1, to = 10, step = 1) {
	let res = []; for (let i = from; i <= to; i += step)res.push(i); return res;
}

function arrRemove(arr, listweg) {
	arrReplace(arr, listweg, []);
}

function arrRemoveDuplicates(items, prop) {
	let di = {};
	let res = [];
	for (const item of items) {
		if (isdef(di[item[prop].toLowerCase()])) { continue; }
		res.push(item);
		di[item[prop].toLowerCase()] = true;
	}
	return res;
}

function arrRemoveLast(arr) {
	arr.length -= 1;
}

function arrRemovip(arr, el) {
	let i = arr.indexOf(el);
	if (i > -1) arr.splice(i, 1);
	return i;
}

function arrRepeat(n, el) {
	let res = []; for (let i = 0; i < n; i++) res.push(el); return res;
}

function arrReplace(arr, listweg, listdazu) {
	arrExtend(arr, listdazu);
	listweg.map(x => arrRemovip(arr, x));
	return arr;
}

function arrReplace1(arr, elweg, eldazu) {
	let i = arr.indexOf(elweg);
	arr[i] = eldazu;
	return arr;
}

function arrReverse(arr) {
	return jsCopy(arr).reverse();
}

function arrRotate(arr, count) {
	var unshift = Array.prototype.unshift,
		splice = Array.prototype.splice;
	var len = arr.length >>> 0, count = count >> 0;
	let arr1 = jsCopy(arr);
	unshift.apply(arr1, splice.call(arr1, count % len, len));
	return arr1;
}

function arrShufflip(arr) {
	if (isEmpty(arr)) return []; else return fisherYates(arr);
}

function arrSplitAtIndex(arr, i) {
	return [arr.slice(0, i), arr.slice(i)];
}

function arrSplitByIndices(arr, indices) {
	let [a1, a2] = [[], jsCopy(arr)];
	for (let i = 0; i < indices.length; i++) {
		let el = arr[indices[i]];
		a1.push(el);
		removeInPlace(a2, el);
	}
	return [a1, a2];
}

function arrSum(arr, props) {
	if (nundef(props)) return arr.reduce((a, b) => a + b);
	if (!isList(props)) props = [props];
	return arr.reduce((a, b) => a + (lookup(b, props) || 0), 0);
}

function arrSwap(arr, i, j) {
	let h = arr[i]; arr[i] = arr[j]; arr[j] = h;
}

function arrTake(arr, n = 0, from = 0) {
	if (isDict(arr)) {
		let keys = Object.keys(arr);
		return n > 0 ? keys.slice(from, from + n).map(x => (arr[x])) : keys.slice(from).map(x => (arr[x]));
	} else return n > 0 ? arr.slice(from, from + n) : arr.slice(from);
}

function arrTakeLast(arr, n, from = 0) {
	let res = [];
	if (isDict(arr)) {
		let keys = Object.keys(arr);
		let ilast = keys.length - 1; for (let i = ilast - from; i >= 0 && i > ilast - from - n; i--) { res.unshift(arr[keys[i]]); }
	} else {
		let ilast = arr.length - 1; for (let i = ilast - from; i >= 0 && i > ilast - from - n; i--) { res.unshift(arr[i]); }
	}
	return res;
}

function arrTakeWhile(arr, func) {
	let res = [];
	for (const a of arr) {
		if (func(a)) res.push(a); else break;
	}
	return res;
}

function arrWithout(arr, b) {
	return arrMinus(arr, b);
}

function arrZip(arr1, arr2) {
	let res = [];
	for (let i = 0; i < Math.min(arr1, arr2); i++) {
		let o = {};
		addKeys(arr1[i], o);
		addKeys(arr2[i], o);
		res.push(o);
	}
	return res;
}

function arr_get_max(arr, func) {
	if (isEmpty(arr)) return null;
	if (nundef(func)) func = x => x;
	let i = 0; let aug = arr.map(x => ({ el: jsCopy(x), val: func(x), i: i++ }));
	sortByDescending(aug, 'val');
	let max = aug[0].val;
	let res = arrTakeWhile(aug, x => x.val == max); return res.map(x => arr[x.i]);
}

function arr_get_min(arr, func) {
	if (isEmpty(arr)) return null;
	if (nundef(func)) func = x => x;
	let i = 0; let aug = arr.map(x => ({ el: jsCopy(x), val: func(x), i: i++ }));
	sortBy(aug, 'val');
	let min = aug[0].val;
	let res = arrTakeWhile(aug, x => x.val == min); return res.map(x => arr[x.i]);
}

function assertion(cond) {
	if (!cond) {
		let args = [...arguments];
		for (const a of args) {
			console.log('\n', a);
		}
		throw new Error('TERMINATING!!!')
	}
}

function audio_beep(vol, freq, duration) {
	console.log('sollte beepen!!!');
	if (nundef(_AUDIOCONTEXT)) _AUDIOCONTEXT = new AudioContext();
	let a = _AUDIOCONTEXT;
	v = a.createOscillator()
	u = a.createGain()
	v.connect(u)
	v.frequency.value = freq
	v.type = "square";
	u.connect(a.destination)
	u.gain.value = vol * 0.01
	v.start(a.currentTime)
	v.stop(a.currentTime + duration * 0.001);
}

function audio_onclick_pp() {
	audio_toggle('mozart');
	if (audio_playing()) { hide0('bPlay'); show0('bPause'); } else { hide0('bPause'); show0('bPlay'); }
}

function audio_pause() {
	_qSound = [];
	if (_loaded && isdef(_sndPlayer)) {
		clearTimeout(_TOSound);
		_sndPlayer.onended = null;
		_sndPlayer.onpause = _whenSoundPaused;
		_sndPlayer.pause();
	}
}

function audio_play(key, wait = true) {
	if (!wait) _qSound = [];
	_enqSound(key);
	if (_idleSound) { _idleSound = false; _deqSound(); }
}

function audio_playing() {
	return DA.isSound;
}

function audio_toggle(key) {
	if (DA.isSound == true) { audio_pause(); DA.isSound = false; return; }
	audio_play(key);
	DA.isSound = true;
}

function autocomplete(inp, arr) {
	/* inp...input element, arr...array of possible autocompleted values:*/
	var currentFocus;
	inp = toElem(inp);
	inp.addEventListener('input', e => { /*execute a func when someone writes in the text field:*/
		var a, b, i, val = this.value;    /*close any already open lists of autocompleted values*/
		autocomplete_closeAllLists();
		if (!val) { return false; }
		currentFocus = -1;
		a = document.createElement('DIV'); /*create a DIV element that will contain the items (values):*/
		a.setAttribute('id', this.id + 'autocomplete-list');
		a.setAttribute('class', 'autocomplete-items');
		this.parentNode.appendChild(a); /*append the DIV element as a child of the autocomplete container:*/
		for (i = 0; i < arr.length; i++) {
			if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
				b = document.createElement('DIV'); /*create a DIV element for each matching element:*/
				b.innerHTML = '<strong>' + arr[i].substr(0, val.length) + '</strong>'; /*make the matching letters bold:*/
				b.innerHTML += arr[i].substr(val.length);
				b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>"; /*insert a input field that will hold the current array item's value:*/
				b.addEventListener('click', e => {
					inp.value = this.getElementsByTagName('input')[0].value; /*insert the value for the autocomplete text field:*/
					autocomplete_closeAllLists();
				});
				a.appendChild(b);
			}
		}
	});
	inp.addEventListener('keydown', e => {
		var x = document.getElementById(this.id + 'autocomplete-list');
		if (x) x = x.getElementsByTagName('div');
		if (e.keyCode == 40) {
			currentFocus++;
			autocomplete_addActive(x);
		} else if (e.keyCode == 38) {
			currentFocus--;
			autocomplete_addActive(x);
		} else if (e.keyCode == 13) {
			e.preventDefault();
			if (currentFocus > -1) {
				if (x) x[currentFocus].click();
			}
		}
	});
	inp.addEventListener('dblclick', e => { evNoBubble(e); });
	document.addEventListener('click', e => {
		autocomplete_closeAllLists(e.target);
	});
}

function autocomplete_addActive(x) {
	if (!x) return false;
	autocomplete_removeActive(x);
	if (currentFocus >= x.length) currentFocus = 0;
	if (currentFocus < 0) currentFocus = x.length - 1;
	x[currentFocus].classList.add('autocomplete-active');
}

function autocomplete_closeAllLists(elmnt) {
	var x = document.getElementsByClassName('autocomplete-items');
	for (var i = 0; i < x.length; i++) {
		if (elmnt != x[i] && elmnt != inp) {
			x[i].parentNode.removeChild(x[i]);
		}
	}
}

function autocomplete_removeActive(x) {
	for (var i = 0; i < x.length; i++) {
		x[i].classList.remove('autocomplete-active');
	}
}

function bottom_elem_from_to(arr1, arr2) {
	last_elem_from_to(arr1, arr2);
}

function bottom_elem_from_to_top(arr1, arr2) {
	arr2.unshift(arr1.pop());
}

function cCenterOrigin(cnv, ctx) {
	cSetOrigin(ctx, cnv.width / 2, cnv.height / 2);
}

function cClear(cnv = null, ctx = null) {
	if (nundef(cnv)) { cnv = CV; ctx = CX; if (!ctx) return; }
	ctx.save();
	ctx.setTransform(1, 0, 0, 1, 0, 0);
	ctx.clearRect(0, 0, cnv.width, cnv.height);
	ctx.restore();
}

function cColor(fill, cvx) {
	if (nundef(cvx)) cvx = CX; CX.fillStyle = fill;
}

function cEllipse(x, y, w, h, styles = null, angle = 0, ctx = null) {
	if (nundef(ctx)) { ctx = CX; if (!ctx) return; }
	if (styles) cStyle(styles, ctx);
	ctx.beginPath();
	ctx.ellipse(x, y, w / 2, h / 2, -angle, 0, 2 * Math.PI);
	if (isdef(styles.bg) || nundef(styles.fg)) ctx.fill();
	if (isdef(styles.fg)) ctx.stroke();
}

function cLine(x1, y1, x2, y2, styles = null, ctx = null) {
	if (nundef(ctx)) { ctx = CX; if (!ctx) return; }
	if (styles) cStyle(styles, ctx);
	ctx.beginPath();
	ctx.moveTo(x1, y1);
	ctx.lineTo(x2, y2)
	ctx.stroke();
}

function cRect(x, y, w, h, styles = null, ctx = null) {
	if (nundef(ctx)) { ctx = CX; if (!ctx) return; }
	if (styles) cStyle(styles, ctx);
	if (isdef(styles.bg) || nundef(styles.fg)) ctx.fillRect(x, y, w, h);
	if (isdef(styles.fg)) ctx.strokeRect(x, y, w, h);
}

function cSetOrigin(ctx, x, y) {
	ctx.translate(x, y);
}

function cShadow(ctx, color, offx, offy, blur) {
	ctx.shadowColor = color;
	ctx.shadowOffsetX = offx;
	ctx.shadowOffsetY = offy;
	ctx.shadowBlur = blur;
}

function cStyle(styles, ctx) {
	if (nundef(ctx)) { ctx = CX; if (nundef(ctx)) { console.log('ctx undefined!!!!!!!'); return; } }
	const di = { bg: 'fillStyle', fill: 'fillStyle', stroke: 'strokeStyle', fg: 'strokeStyle', thickness: 'lineWidth', thick: 'lineWidth', cap: 'lineCap', ending: 'lineCap' };
	if (isdef(styles)) {
		for (const k in styles) { ctx[isdef(di[k]) ? di[k] : k] = styles[k]; }
	}
}

function cStyle_dep(cvx, fill, stroke, wline, cap) {
	cvx.fillStyle = fill;
	if (isdef(stroke)) cvx.strokeStyle = stroke;
	if (isdef(wline)) cvx.lineWidth = wline;
	if (isdef(cap)) cvx.lineCap = cap;
}

function calculateDaysBetweenDates(begin, end) {
	var oneDay = 24 * 60 * 60 * 1000;
	var firstDate = new Date(begin);
	var secondDate = new Date(end);
	var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate.getTime()) / (oneDay)));
	return diffDays;
}

function cap_each_word(s) {
	let arr = s.split(' ');
	let res = '';
	for (const a of arr) { res += capitalize(a) + ' '; }
	return res.slice(0, -1);
}

function capitalize(s) {
	if (typeof s !== 'string') return '';
	return s.charAt(0).toUpperCase() + s.slice(1);
}

function choose(arr, n, excepti) {
	return rChoose(arr, n, null, excepti);
}

function chooseRandom(arr) {
	return rChoose(arr);
}

function clamp(x, min, max) {
	return Math.min(Math.max(x, min), max);
}

function clearElement(elem) {
	if (isString(elem)) elem = document.getElementById(elem);
	if (window.jQuery == undefined) { elem.innerHTML = ''; return elem; }
	while (elem.firstChild) {
		$(elem.firstChild).remove();
	}
	return elem;
}

function clearFleetingMessage() {
	if (isdef(dFleetingMessage)) {
		dFleetingMessage.remove();
		dFleetingMessage = null;
	}
}

function clear_select(selected, selstyle = 'selected') {
	for (const item of selected) {
		item.isSelected = false;
		let ui = iDiv(item);
		if (isString(selstyle)) {
			mClassRemove(ui, selstyle);
		} else if (isdef(item.style)) {
			mStyle(ui, item.style);
		} else {
			mStyleUndo(ui, selstyle);
		}
	}
	return [];
}

function clear_timeouts() {
	for (const k in TO) clearTimeout(TO[k]);
	stop_simple_timer();
}

function coin(percent = 50) {
	return Math.random() * 100 < percent;
}

function colorChannelMixer(colorChannelA, colorChannelB, amountToMix) {
	var channelA = colorChannelA * amountToMix;
	var channelB = colorChannelB * (1 - amountToMix);
	return parseInt(channelA + channelB);
}

function colorDark(c, percent = 50, log = true) {
	if (nundef(c)) c = rColor(); else c = colorFrom(c);
	let zero1 = -percent / 100;
	return pSBC(zero1, c, undefined, !log);
}

function colorFrom(cAny, a, allowHsl = false) {
	if (isString(cAny)) {
		if (cAny[0] == '#') {
			if (a == undefined) return cAny;
			cAny = cAny.substring(0, 7);
			return cAny + (a == 1 ? '' : alphaToHex(a));
		} else if (isdef(ColorDi) && lookup(ColorDi, [cAny])) {
			let c = ColorDi[cAny].c;
			if (a == undefined) return c;
			c = c.substring(0, 7);
			return c + (a == 1 ? '' : alphaToHex(a));
		} else if (startsWith(cAny, 'rand')) {
			let spec = capitalize(cAny.substring(4));
			if (isdef(window['color' + spec])) {
				c = window['color' + spec]();
			} else c = rColor();
			if (a == undefined) return c;
			return c + (a == 1 ? '' : alphaToHex(a));
		} else if (startsWith(cAny, 'linear')) {
			return cAny;
		} else if (cAny[0] == 'r' && cAny[1] == 'g') {
			if (a == undefined) return cAny;
			if (cAny[3] == 'a') {
				if (a < 1) {
					return stringBeforeLast(cAny, ',') + ',' + a + ')';
				} else {
					let parts = cAny.split(',');
					let r = firstNumber(parts[0]);
					return 'rgb(' + r + ',' + parts[1] + ',' + parts[2] + ')';
				}
			} else {
				if (a < 1) {
					return 'rgba' + cAny.substring(3, cAny.length - 1) + ',' + a + ')';
				} else {
					return cAny;
				}
			}
		} else if (cAny[0] == 'h' && cAny[1] == 's') {
			if (allowHsl) {
				if (a == undefined) return cAny;
				if (cAny[3] == 'a') {
					if (a < 1) {
						return stringBeforeLast(cAny, ',') + ',' + a + ')';
					} else {
						let parts = cAny.split(',');
						let r = firstNumber(parts[0]);
						return 'hsl(' + r + ',' + parts[1] + ',' + parts[2] + ')';
					}
				} else {
					return a == 1 ? cAny : 'hsla' + cAny.substring(3, cAny.length - 1) + ',' + a + ')';
				}
			} else {
				if (cAny[3] == 'a') {
					cAny = HSLAToRGBA(cAny);
				} else {
					cAny = HSLToRGB(cAny);
				}
				return colorFrom(cAny, a, false);
			}
		} else {
			ensureColorDict();
			let c = ColorDi[cAny];
			if (nundef(c)) {
				if (startsWith(cAny, 'rand')) {
					let spec = cAny.substring(4);
					if (isdef(window['color' + spec])) {
						c = window['color' + spec](res);
					} else c = rColor();
				} else {
					console.log('color not available:', cAny);
					throw new Error('color not found: ' + cAny)
					return '#00000000';
				}
			} else c = c.c;
			if (a == undefined) return c;
			c = c.substring(0, 7);
			return c + (a == 1 ? '' : alphaToHex(a));
		}
	} else if (Array.isArray(cAny)) {
		if (cAny.length == 3 && isNumber(cAny[0])) {
			let r = cAny[0];
			let g = cAny[1];
			let b = cAny[2];
			return a == undefined || a == 1 ? `rgb(${r},${g},${b})` : `rgba(${r},${g},${b},${a})`;
		} else {
			return rChoose(cAny);
		}
	} else if (typeof cAny == 'object') {
		if ('h' in cAny) {
			let hslString = '';
			if (a == undefined || a == 1) {
				hslString = `hsl(${cAny.h},${Math.round(cAny.s <= 1.0 ? cAny.s * 100 : cAny.s)}%,${Math.round(cAny.l <= 1.0 ? cAny.l * 100 : cAny.l)}%)`;
			} else {
				hslString = `hsla(${cAny.h},${Math.round(cAny.s <= 1.0 ? cAny.s * 100 : cAny.s)}%,${Math.round(cAny.l <= 1.0 ? cAny.l * 100 : cAny.l)}%,${a})`;
			}
			if (allowHsl) {
				return hslString;
			} else {
				return colorFrom(hslString, a, allowHsl);
			}
		} else if ('r' in cAny) {
			if (a !== undefined && a < 1) {
				return `rgba(${cAny.r},${cAny.g},${cAny.b},${a})`;
			} else {
				return `rgb(${cAny.r},${cAny.g},${cAny.b})`;
			}
		}
	}
}

function colorFromHSL(hue, sat = 100, lum = 50) {
	return hslToHex(valf(hue, rHue()), sat, lum);
}

function colorHSL(cAny, asObject = false) {
	let res = colorFrom(cAny, undefined, true);
	let shsl = res;
	if (res[0] == '#') {
		if (res.length == 9) {
			shsl = hexAToHSLA(res);
		} else if (res.length == 7) {
			shsl = hexToHSL(res);
		}
	} else if (res[0] == 'r') {
		if (res[3] == 'a') {
			shsl = RGBAToHSLA(res);
		} else {
			shsl = RGBToHSL(res);
		}
	}
	let n = allNumbers(shsl);
	if (asObject) {
		return { h: n[0], s: n[1] / 100, l: n[2] / 100, a: n.length > 3 ? n[3] : 1 };
	} else {
		return shsl;
	}
}

function colorHSLBuild(hue, sat = 100, lum = 50) {
	let result = "hsl(" + hue + ',' + sat + '%,' + lum + '%)'; return result;
}

function colorHex(cAny) {
	let c = colorFrom(cAny);
	if (c[0] == '#') {
		return c;
	} else {
		let res = pSBC(0, c, 'c');
		return res;
	}
}

function colorHue(cAny) {
	let hsl = colorHSL(cAny, true); return hsl.h;
}

function colorHueWheel(contrastTo, minDiff = 25, mod = 30, start = 0) {
	let hc = colorHue(contrastTo);
	let wheel = [];
	while (start < 360) {
		let d1 = Math.abs((start + 360) - hc);
		let d2 = Math.abs((start) - hc);
		let d3 = Math.abs((start - 360) - hc);
		let min = Math.min(d1, d2, d3);
		if (min > minDiff) wheel.push(start);
		start += mod;
	}
	return wheel;
}

function colorIdealText(bg, grayPreferred = false) {
	let rgb = colorRGB(bg, true);
	const nThreshold = 105;
	let r = rgb.r;
	let g = rgb.g;
	let b = rgb.b;
	var bgDelta = r * 0.299 + g * 0.587 + b * 0.114;
	var foreColor = 255 - bgDelta < nThreshold ? 'black' : 'white';
	if (grayPreferred) foreColor = 255 - bgDelta < nThreshold ? 'dimgray' : 'snow';
	return foreColor;
}

function colorLight(c, percent = 20, log = true) {
	if (nundef(c)) {
		return colorFromHSL(rHue(), 100, 85);
	} else c = colorFrom(c);
	let zero1 = percent / 100;
	return pSBC(zero1, c, undefined, !log);
}

function colorMap(spec) {
	const Colormap = {
		"jet": [{ "index": 0, "rgb": [0, 0, 131] }, { "index": 0.125, "rgb": [0, 60, 170] }, { "index": 0.375, "rgb": [5, 255, 255] }, { "index": 0.625, "rgb": [255, 255, 0] }, { "index": 0.875, "rgb": [250, 0, 0] }, { "index": 1, "rgb": [128, 0, 0] }],
		"hsv": [{ "index": 0, "rgb": [255, 0, 0] }, { "index": 0.169, "rgb": [253, 255, 2] }, { "index": 0.173, "rgb": [247, 255, 2] }, { "index": 0.337, "rgb": [0, 252, 4] }, { "index": 0.341, "rgb": [0, 252, 10] }, { "index": 0.506, "rgb": [1, 249, 255] }, { "index": 0.671, "rgb": [2, 0, 253] }, { "index": 0.675, "rgb": [8, 0, 253] }, { "index": 0.839, "rgb": [255, 0, 251] }, { "index": 0.843, "rgb": [255, 0, 245] }, { "index": 1, "rgb": [255, 0, 6] }],
		"hot": [{ "index": 0, "rgb": [0, 0, 0] }, { "index": 0.3, "rgb": [230, 0, 0] }, { "index": 0.6, "rgb": [255, 210, 0] }, { "index": 1, "rgb": [255, 255, 255] }],
		"spring": [{ "index": 0, "rgb": [255, 0, 255] }, { "index": 1, "rgb": [255, 255, 0] }],
		"summer": [{ "index": 0, "rgb": [0, 128, 102] }, { "index": 1, "rgb": [255, 255, 102] }],
		"autumn": [{ "index": 0, "rgb": [255, 0, 0] }, { "index": 1, "rgb": [255, 255, 0] }],
		"winter": [{ "index": 0, "rgb": [0, 0, 255] }, { "index": 1, "rgb": [0, 255, 128] }],
		"bone": [{ "index": 0, "rgb": [0, 0, 0] }, { "index": 0.376, "rgb": [84, 84, 116] }, { "index": 0.753, "rgb": [169, 200, 200] }, { "index": 1, "rgb": [255, 255, 255] }],
		"copper": [{ "index": 0, "rgb": [0, 0, 0] }, { "index": 0.804, "rgb": [255, 160, 102] }, { "index": 1, "rgb": [255, 199, 127] }],
		"greys": [{ "index": 0, "rgb": [0, 0, 0] }, { "index": 1, "rgb": [255, 255, 255] }],
		"yignbu": [{ "index": 0, "rgb": [8, 29, 88] }, { "index": 0.125, "rgb": [37, 52, 148] }, { "index": 0.25, "rgb": [34, 94, 168] }, { "index": 0.375, "rgb": [29, 145, 192] }, { "index": 0.5, "rgb": [65, 182, 196] }, { "index": 0.625, "rgb": [127, 205, 187] }, { "index": 0.75, "rgb": [199, 233, 180] }, { "index": 0.875, "rgb": [237, 248, 217] }, { "index": 1, "rgb": [255, 255, 217] }],
		"greens": [{ "index": 0, "rgb": [0, 68, 27] }, { "index": 0.125, "rgb": [0, 109, 44] }, { "index": 0.25, "rgb": [35, 139, 69] }, { "index": 0.375, "rgb": [65, 171, 93] }, { "index": 0.5, "rgb": [116, 196, 118] }, { "index": 0.625, "rgb": [161, 217, 155] }, { "index": 0.75, "rgb": [199, 233, 192] }, { "index": 0.875, "rgb": [229, 245, 224] }, { "index": 1, "rgb": [247, 252, 245] }],
		"yiorrd": [{ "index": 0, "rgb": [128, 0, 38] }, { "index": 0.125, "rgb": [189, 0, 38] }, { "index": 0.25, "rgb": [227, 26, 28] }, { "index": 0.375, "rgb": [252, 78, 42] }, { "index": 0.5, "rgb": [253, 141, 60] }, { "index": 0.625, "rgb": [254, 178, 76] }, { "index": 0.75, "rgb": [254, 217, 118] }, { "index": 0.875, "rgb": [255, 237, 160] }, { "index": 1, "rgb": [255, 255, 204] }],
		"bluered": [{ "index": 0, "rgb": [0, 0, 255] }, { "index": 1, "rgb": [255, 0, 0] }],
		"rdbu": [{ "index": 0, "rgb": [5, 10, 172] }, { "index": 0.35, "rgb": [106, 137, 247] }, { "index": 0.5, "rgb": [190, 190, 190] }, { "index": 0.6, "rgb": [220, 170, 132] }, { "index": 0.7, "rgb": [230, 145, 90] }, { "index": 1, "rgb": [178, 10, 28] }],
		"picnic": [{ "index": 0, "rgb": [0, 0, 255] }, { "index": 0.1, "rgb": [51, 153, 255] }, { "index": 0.2, "rgb": [102, 204, 255] }, { "index": 0.3, "rgb": [153, 204, 255] }, { "index": 0.4, "rgb": [204, 204, 255] }, { "index": 0.5, "rgb": [255, 255, 255] }, { "index": 0.6, "rgb": [255, 204, 255] }, { "index": 0.7, "rgb": [255, 153, 255] }, { "index": 0.8, "rgb": [255, 102, 204] }, { "index": 0.9, "rgb": [255, 102, 102] }, { "index": 1, "rgb": [255, 0, 0] }],
		"rainbow": [{ "index": 0, "rgb": [150, 0, 90] }, { "index": 0.125, "rgb": [0, 0, 200] }, { "index": 0.25, "rgb": [0, 25, 255] }, { "index": 0.375, "rgb": [0, 152, 255] }, { "index": 0.5, "rgb": [44, 255, 150] }, { "index": 0.625, "rgb": [151, 255, 0] }, { "index": 0.75, "rgb": [255, 234, 0] }, { "index": 0.875, "rgb": [255, 111, 0] }, { "index": 1, "rgb": [255, 0, 0] }],
		"portland": [{ "index": 0, "rgb": [12, 51, 131] }, { "index": 0.25, "rgb": [10, 136, 186] }, { "index": 0.5, "rgb": [242, 211, 56] }, { "index": 0.75, "rgb": [242, 143, 56] }, { "index": 1, "rgb": [217, 30, 30] }],
		"blackbody": [{ "index": 0, "rgb": [0, 0, 0] }, { "index": 0.2, "rgb": [230, 0, 0] }, { "index": 0.4, "rgb": [230, 210, 0] }, { "index": 0.7, "rgb": [255, 255, 255] }, { "index": 1, "rgb": [160, 200, 255] }],
		"earth": [{ "index": 0, "rgb": [0, 0, 130] }, { "index": 0.1, "rgb": [0, 180, 180] }, { "index": 0.2, "rgb": [40, 210, 40] }, { "index": 0.4, "rgb": [230, 230, 50] }, { "index": 0.6, "rgb": [120, 70, 20] }, { "index": 1, "rgb": [255, 255, 255] }],
		"electric": [{ "index": 0, "rgb": [0, 0, 0] }, { "index": 0.15, "rgb": [30, 0, 100] }, { "index": 0.4, "rgb": [120, 0, 100] }, { "index": 0.6, "rgb": [160, 90, 0] }, { "index": 0.8, "rgb": [230, 200, 0] }, { "index": 1, "rgb": [255, 250, 220] }],
		"alpha": [{ "index": 0, "rgb": [255, 255, 255, 0] }, { "index": 1, "rgb": [255, 255, 255, 1] }],
		"viridis": [{ "index": 0, "rgb": [68, 1, 84] }, { "index": 0.13, "rgb": [71, 44, 122] }, { "index": 0.25, "rgb": [59, 81, 139] }, { "index": 0.38, "rgb": [44, 113, 142] }, { "index": 0.5, "rgb": [33, 144, 141] }, { "index": 0.63, "rgb": [39, 173, 129] }, { "index": 0.75, "rgb": [92, 200, 99] }, { "index": 0.88, "rgb": [170, 220, 50] }, { "index": 1, "rgb": [253, 231, 37] }],
		"inferno": [{ "index": 0, "rgb": [0, 0, 4] }, { "index": 0.13, "rgb": [31, 12, 72] }, { "index": 0.25, "rgb": [85, 15, 109] }, { "index": 0.38, "rgb": [136, 34, 106] }, { "index": 0.5, "rgb": [186, 54, 85] }, { "index": 0.63, "rgb": [227, 89, 51] }, { "index": 0.75, "rgb": [249, 140, 10] }, { "index": 0.88, "rgb": [249, 201, 50] }, { "index": 1, "rgb": [252, 255, 164] }],
		"magma": [{ "index": 0, "rgb": [0, 0, 4] }, { "index": 0.13, "rgb": [28, 16, 68] }, { "index": 0.25, "rgb": [79, 18, 123] }, { "index": 0.38, "rgb": [129, 37, 129] }, { "index": 0.5, "rgb": [181, 54, 122] }, { "index": 0.63, "rgb": [229, 80, 100] }, { "index": 0.75, "rgb": [251, 135, 97] }, { "index": 0.88, "rgb": [254, 194, 135] }, { "index": 1, "rgb": [252, 253, 191] }],
		"plasma": [{ "index": 0, "rgb": [13, 8, 135] }, { "index": 0.13, "rgb": [75, 3, 161] }, { "index": 0.25, "rgb": [125, 3, 168] }, { "index": 0.38, "rgb": [168, 34, 150] }, { "index": 0.5, "rgb": [203, 70, 121] }, { "index": 0.63, "rgb": [229, 107, 93] }, { "index": 0.75, "rgb": [248, 148, 65] }, { "index": 0.88, "rgb": [253, 195, 40] }, { "index": 1, "rgb": [240, 249, 33] }],
		"warm": [{ "index": 0, "rgb": [125, 0, 179] }, { "index": 0.13, "rgb": [172, 0, 187] }, { "index": 0.25, "rgb": [219, 0, 170] }, { "index": 0.38, "rgb": [255, 0, 130] }, { "index": 0.5, "rgb": [255, 63, 74] }, { "index": 0.63, "rgb": [255, 123, 0] }, { "index": 0.75, "rgb": [234, 176, 0] }, { "index": 0.88, "rgb": [190, 228, 0] }, { "index": 1, "rgb": [147, 255, 0] }],
		"cool": [{ "index": 0, "rgb": [125, 0, 179] }, { "index": 0.13, "rgb": [116, 0, 218] }, { "index": 0.25, "rgb": [98, 74, 237] }, { "index": 0.38, "rgb": [68, 146, 231] }, { "index": 0.5, "rgb": [0, 204, 197] }, { "index": 0.63, "rgb": [0, 247, 146] }, { "index": 0.75, "rgb": [0, 255, 88] }, { "index": 0.88, "rgb": [40, 255, 8] }, { "index": 1, "rgb": [147, 255, 0] }],
		"rainbow-soft": [{ "index": 0, "rgb": [125, 0, 179] }, { "index": 0.1, "rgb": [199, 0, 180] }, { "index": 0.2, "rgb": [255, 0, 121] }, { "index": 0.3, "rgb": [255, 108, 0] }, { "index": 0.4, "rgb": [222, 194, 0] }, { "index": 0.5, "rgb": [150, 255, 0] }, { "index": 0.6, "rgb": [0, 255, 55] }, { "index": 0.7, "rgb": [0, 246, 150] }, { "index": 0.8, "rgb": [50, 167, 222] }, { "index": 0.9, "rgb": [103, 51, 235] }, { "index": 1, "rgb": [124, 0, 186] }],
		"bathymetry": [{ "index": 0, "rgb": [40, 26, 44] }, { "index": 0.13, "rgb": [59, 49, 90] }, { "index": 0.25, "rgb": [64, 76, 139] }, { "index": 0.38, "rgb": [63, 110, 151] }, { "index": 0.5, "rgb": [72, 142, 158] }, { "index": 0.63, "rgb": [85, 174, 163] }, { "index": 0.75, "rgb": [120, 206, 163] }, { "index": 0.88, "rgb": [187, 230, 172] }, { "index": 1, "rgb": [253, 254, 204] }],
		"cdom": [{ "index": 0, "rgb": [47, 15, 62] }, { "index": 0.13, "rgb": [87, 23, 86] }, { "index": 0.25, "rgb": [130, 28, 99] }, { "index": 0.38, "rgb": [171, 41, 96] }, { "index": 0.5, "rgb": [206, 67, 86] }, { "index": 0.63, "rgb": [230, 106, 84] }, { "index": 0.75, "rgb": [242, 149, 103] }, { "index": 0.88, "rgb": [249, 193, 135] }, { "index": 1, "rgb": [254, 237, 176] }],
		"chlorophyll": [{ "index": 0, "rgb": [18, 36, 20] }, { "index": 0.13, "rgb": [25, 63, 41] }, { "index": 0.25, "rgb": [24, 91, 59] }, { "index": 0.38, "rgb": [13, 119, 72] }, { "index": 0.5, "rgb": [18, 148, 80] }, { "index": 0.63, "rgb": [80, 173, 89] }, { "index": 0.75, "rgb": [132, 196, 122] }, { "index": 0.88, "rgb": [175, 221, 162] }, { "index": 1, "rgb": [215, 249, 208] }],
		"density": [{ "index": 0, "rgb": [54, 14, 36] }, { "index": 0.13, "rgb": [89, 23, 80] }, { "index": 0.25, "rgb": [110, 45, 132] }, { "index": 0.38, "rgb": [120, 77, 178] }, { "index": 0.5, "rgb": [120, 113, 213] }, { "index": 0.63, "rgb": [115, 151, 228] }, { "index": 0.75, "rgb": [134, 185, 227] }, { "index": 0.88, "rgb": [177, 214, 227] }, { "index": 1, "rgb": [230, 241, 241] }],
		"freesurface-blue": [{ "index": 0, "rgb": [30, 4, 110] }, { "index": 0.13, "rgb": [47, 14, 176] }, { "index": 0.25, "rgb": [41, 45, 236] }, { "index": 0.38, "rgb": [25, 99, 212] }, { "index": 0.5, "rgb": [68, 131, 200] }, { "index": 0.63, "rgb": [114, 156, 197] }, { "index": 0.75, "rgb": [157, 181, 203] }, { "index": 0.88, "rgb": [200, 208, 216] }, { "index": 1, "rgb": [241, 237, 236] }],
		"freesurface-red": [{ "index": 0, "rgb": [60, 9, 18] }, { "index": 0.13, "rgb": [100, 17, 27] }, { "index": 0.25, "rgb": [142, 20, 29] }, { "index": 0.38, "rgb": [177, 43, 27] }, { "index": 0.5, "rgb": [192, 87, 63] }, { "index": 0.63, "rgb": [205, 125, 105] }, { "index": 0.75, "rgb": [216, 162, 148] }, { "index": 0.88, "rgb": [227, 199, 193] }, { "index": 1, "rgb": [241, 237, 236] }],
		"oxygen": [{ "index": 0, "rgb": [64, 5, 5] }, { "index": 0.13, "rgb": [106, 6, 15] }, { "index": 0.25, "rgb": [144, 26, 7] }, { "index": 0.38, "rgb": [168, 64, 3] }, { "index": 0.5, "rgb": [188, 100, 4] }, { "index": 0.63, "rgb": [206, 136, 11] }, { "index": 0.75, "rgb": [220, 174, 25] }, { "index": 0.88, "rgb": [231, 215, 44] }, { "index": 1, "rgb": [248, 254, 105] }],
		"par": [{ "index": 0, "rgb": [51, 20, 24] }, { "index": 0.13, "rgb": [90, 32, 35] }, { "index": 0.25, "rgb": [129, 44, 34] }, { "index": 0.38, "rgb": [159, 68, 25] }, { "index": 0.5, "rgb": [182, 99, 19] }, { "index": 0.63, "rgb": [199, 134, 22] }, { "index": 0.75, "rgb": [212, 171, 35] }, { "index": 0.88, "rgb": [221, 210, 54] }, { "index": 1, "rgb": [225, 253, 75] }],
		"phase": [{ "index": 0, "rgb": [145, 105, 18] }, { "index": 0.13, "rgb": [184, 71, 38] }, { "index": 0.25, "rgb": [186, 58, 115] }, { "index": 0.38, "rgb": [160, 71, 185] }, { "index": 0.5, "rgb": [110, 97, 218] }, { "index": 0.63, "rgb": [50, 123, 164] }, { "index": 0.75, "rgb": [31, 131, 110] }, { "index": 0.88, "rgb": [77, 129, 34] }, { "index": 1, "rgb": [145, 105, 18] }],
		"salinity": [{ "index": 0, "rgb": [42, 24, 108] }, { "index": 0.13, "rgb": [33, 50, 162] }, { "index": 0.25, "rgb": [15, 90, 145] }, { "index": 0.38, "rgb": [40, 118, 137] }, { "index": 0.5, "rgb": [59, 146, 135] }, { "index": 0.63, "rgb": [79, 175, 126] }, { "index": 0.75, "rgb": [120, 203, 104] }, { "index": 0.88, "rgb": [193, 221, 100] }, { "index": 1, "rgb": [253, 239, 154] }],
		"temperature": [{ "index": 0, "rgb": [4, 35, 51] }, { "index": 0.13, "rgb": [23, 51, 122] }, { "index": 0.25, "rgb": [85, 59, 157] }, { "index": 0.38, "rgb": [129, 79, 143] }, { "index": 0.5, "rgb": [175, 95, 130] }, { "index": 0.63, "rgb": [222, 112, 101] }, { "index": 0.75, "rgb": [249, 146, 66] }, { "index": 0.88, "rgb": [249, 196, 65] }, { "index": 1, "rgb": [232, 250, 91] }],
		"turbidity": [{ "index": 0, "rgb": [34, 31, 27] }, { "index": 0.13, "rgb": [65, 50, 41] }, { "index": 0.25, "rgb": [98, 69, 52] }, { "index": 0.38, "rgb": [131, 89, 57] }, { "index": 0.5, "rgb": [161, 112, 59] }, { "index": 0.63, "rgb": [185, 140, 66] }, { "index": 0.75, "rgb": [202, 174, 88] }, { "index": 0.88, "rgb": [216, 209, 126] }, { "index": 1, "rgb": [233, 246, 171] }],
		"velocity-blue": [{ "index": 0, "rgb": [17, 32, 64] }, { "index": 0.13, "rgb": [35, 52, 116] }, { "index": 0.25, "rgb": [29, 81, 156] }, { "index": 0.38, "rgb": [31, 113, 162] }, { "index": 0.5, "rgb": [50, 144, 169] }, { "index": 0.63, "rgb": [87, 173, 176] }, { "index": 0.75, "rgb": [149, 196, 189] }, { "index": 0.88, "rgb": [203, 221, 211] }, { "index": 1, "rgb": [254, 251, 230] }],
		"velocity-green": [{ "index": 0, "rgb": [23, 35, 19] }, { "index": 0.13, "rgb": [24, 64, 38] }, { "index": 0.25, "rgb": [11, 95, 45] }, { "index": 0.38, "rgb": [39, 123, 35] }, { "index": 0.5, "rgb": [95, 146, 12] }, { "index": 0.63, "rgb": [152, 165, 18] }, { "index": 0.75, "rgb": [201, 186, 69] }, { "index": 0.88, "rgb": [233, 216, 137] }, { "index": 1, "rgb": [255, 253, 205] }],
		"cubehelix": [{ "index": 0, "rgb": [0, 0, 0] }, { "index": 0.07, "rgb": [22, 5, 59] }, { "index": 0.13, "rgb": [60, 4, 105] }, { "index": 0.2, "rgb": [109, 1, 135] }, { "index": 0.27, "rgb": [161, 0, 147] }, { "index": 0.33, "rgb": [210, 2, 142] }, { "index": 0.4, "rgb": [251, 11, 123] }, { "index": 0.47, "rgb": [255, 29, 97] }, { "index": 0.53, "rgb": [255, 54, 69] }, { "index": 0.6, "rgb": [255, 85, 46] }, { "index": 0.67, "rgb": [255, 120, 34] }, { "index": 0.73, "rgb": [255, 157, 37] }, { "index": 0.8, "rgb": [241, 191, 57] }, { "index": 0.87, "rgb": [224, 220, 93] }, { "index": 0.93, "rgb": [218, 241, 142] }, { "index": 1, "rgb": [227, 253, 198] }]
	};
	var indicies, fromrgba, torgba, nsteps, cmap, colormap, format, nshades, colors, alpha, i;
	if (!spec) spec = {};
	nshades = (spec.nshades || 72) - 1;
	format = spec.format || 'hex';
	colormap = spec.colormap;
	if (!colormap) colormap = 'jet';
	if (typeof colormap === 'string') {
		colormap = colormap.toLowerCase();
		if (!Colormap[colormap]) {
			throw Error(colormap + ' not a supported colorscale');
		}
		cmap = Colormap[colormap];
	} else if (Array.isArray(colormap)) {
		cmap = colormap.slice();
	} else {
		throw Error('unsupported colormap option', colormap);
	}
	if (cmap.length > nshades + 1) {
		throw new Error(
			colormap + ' map requires nshades to be at least size ' + cmap.length
		);
	}
	if (!Array.isArray(spec.alpha)) {
		if (typeof spec.alpha === 'number') {
			alpha = [spec.alpha, spec.alpha];
		} else {
			alpha = [1, 1];
		}
	} else if (spec.alpha.length !== 2) {
		alpha = [1, 1];
	} else {
		alpha = spec.alpha.slice();
	}
	indicies = cmap.map(c => {
		return Math.round(c.index * nshades);
	});
	alpha[0] = Math.min(Math.max(alpha[0], 0), 1);
	alpha[1] = Math.min(Math.max(alpha[1], 0), 1);
	var steps = cmap.map((c, i) => {
		var index = cmap[i].index
		var rgba = cmap[i].rgb.slice();
		if (rgba.length === 4 && rgba[3] >= 0 && rgba[3] <= 1) {
			return rgba
		}
		rgba[3] = alpha[0] + (alpha[1] - alpha[0]) * index;
		return rgba
	})
	var colors = []
	for (i = 0; i < indicies.length - 1; ++i) {
		nsteps = indicies[i + 1] - indicies[i];
		fromrgba = steps[i];
		torgba = steps[i + 1];
		for (var j = 0; j < nsteps; j++) {
			var amt = j / nsteps
			colors.push([
				Math.round(lerp(fromrgba[0], torgba[0], amt)),
				Math.round(lerp(fromrgba[1], torgba[1], amt)),
				Math.round(lerp(fromrgba[2], torgba[2], amt)),
				lerp(fromrgba[3], torgba[3], amt)
			])
		}
	}
	colors.push(cmap[cmap.length - 1].rgb.concat(alpha[1]))
	if (format === 'hex') colors = colors.map(rgb2hex);
	else if (format === 'rgbaString') colors = colors.map(rgbaStr);
	else if (format === 'float') colors = colors.map(rgb2float);
	return colors;
}

function colorMix(c1, c2, percent = 50) {
	return pSBC(percent / 100, colorHex(c1), colorHex(c2), true);
	let o1 = colorRGB(c1, true); let rgbA = [o1.r, o1.g, o1.b];
	let o2 = colorRGB(c2, true); let rgbB = [o2.r, o2.g, o2.b];
	amountToMix = percent / 100;
	var r = colorChannelMixer(rgbA[0], rgbB[0], amountToMix);
	var g = colorChannelMixer(rgbA[1], rgbB[1], amountToMix);
	var b = colorChannelMixer(rgbA[2], rgbB[2], amountToMix);
	return "rgb(" + r + "," + g + "," + b + ")";
}

function colorMixer(rgbA, rgbB, amountToMix) {
	var r = colorChannelMixer(rgbA[0], rgbB[0], amountToMix);
	var g = colorChannelMixer(rgbA[1], rgbB[1], amountToMix);
	var b = colorChannelMixer(rgbA[2], rgbB[2], amountToMix);
	return "rgb(" + r + "," + g + "," + b + ")";
}

function colorPalette(color, type = 'shade') {
	color = colorFrom(color);
	return colorShades(color);
}

function colorPaletteFromImage(img) {
	if (nundef(ColorThiefObject)) ColorThiefObject = new ColorThief();
	let palette0 = ColorThiefObject.getPalette(img);
	let palette = [];
	for (const pal of palette0) {
		let color = colorFrom(pal);
		palette.push(color);
	}
	return palette;
}

function colorPaletteFromUrl(path) {
	let img = mCreateFrom(`<img src='${path}' />`);
	let pal = colorPaletteFromImage(img);
	return pal;
}

function colorRGB(cAny, asObject = false) {
	let res = colorFrom(cAny);
	let srgb = res;
	if (res[0] == '#') {
		srgb = pSBC(0, res, 'c');
	}
	let n = allNumbers(srgb);
	if (asObject) {
		return { r: n[0], g: n[1], b: n[2], a: n.length > 3 ? n[3] : 1 };
	} else {
		return srgb;
	}
}

function colorShades(color) {
	let res = [];
	for (let frac = -0.8; frac <= 0.8; frac += 0.2) {
		let c = pSBC(frac, color, undefined, true);
		res.push(c);
	}
	return res;
}

function colorTrans(cAny, alpha = 0.5) {
	return colorFrom(cAny, alpha);
}

function colorTransPalette(color = '#000000') {
	let res = [];
	for (const alpha of [.0, .1, .2, .3, .4, .5, .6, .7, .8, .9, 1]) res.push(colorTrans(color, alpha));
	return res;
}

function colorWheel(contrastTo, n) {
	let hc = colorHue(contrastTo);
	let wheel = [];
	let start = hc;
	let inc = Math.round(360 / (n + 1));
	start += inc;
	for (let i = 0; i < n; i++) {
		wheel.push(start % 360);
		start += inc;
	}
	return wheel.map(x => colorHSLBuild(x));
}

function colorsFromBFA(bg, fg, alpha) {
	if (fg == 'contrast') {
		if (bg != 'inherit') bg = colorFrom(bg, alpha);
		fg = colorIdealText(bg);
	} else if (bg == 'contrast') {
		fg = colorFrom(fg);
		bg = colorIdealText(fg);
	} else {
		if (isdef(bg) && bg != 'inherit') bg = colorFrom(bg, alpha);
		if (isdef(fg) && fg != 'inherit') fg = colorFrom(fg);
	}
	return [bg, fg];
}

function complexCompare(obj1, obj2) {
	const obj1Keys = Object.keys(obj1);
	const obj2Keys = Object.keys(obj2);
	if (obj1Keys.length !== obj2Keys.length) {
		return false;
	}
	for (let objKey of obj1Keys) {
		if (obj1[objKey] !== obj2[objKey]) {
			if (typeof obj1[objKey] == "object" && typeof obj2[objKey] == "object") {
				if (!isEqual(obj1[objKey], obj2[objKey])) {
					return false;
				}
			}
			else {
				return false;
			}
		}
	}
	return true;
}

function contains(s, sSub) {
	return s.toLowerCase().includes(sSub.toLowerCase());
}

function convert_to_range(x, min1, max1, min2, max2) {
	return (x - min1) * ((max2 - min2) / (max1 - min1)) + min2;
}

function copyKeys(ofrom, oto, except = {}, only = null) {
	let keys = isdef(only) ? only : Object.keys(ofrom);
	for (const k of keys) {
		if (isdef(except[k])) continue;
		oto[k] = ofrom[k];
	}
	return oto;
}

function correctPolys(polys, approx = 10) {
	let clusters = [];
	for (const p of polys) {
		for (const pt of p) {
			let found = false;
			for (const cl of clusters) {
				for (const v of cl) {
					let dx = Math.abs(v.x - pt.x);
					let dy = Math.abs(v.y - pt.y);
					if (dx < approx && dy < approx) {
						cl.push(pt);
						found = true;
						break;
					}
				}
				if (found) break;
			}
			if (!found) {
				clusters.push([pt]);
			}
		}
	}
	let vertices = [];
	for (const cl of clusters) {
		let sumx = 0;
		let sumy = 0;
		let len = cl.length;
		for (const pt of cl) {
			sumx += pt.x;
			sumy += pt.y;
		}
		vertices.push({ x: Math.round(sumx / len), y: Math.round(sumy / len) });
	}
	for (const p of polys) {
		for (const pt of p) {
			let found = false;
			for (const v of vertices) {
				let dx = Math.abs(v.x - pt.x);
				let dy = Math.abs(v.y - pt.y);
				if (dx < approx && dy < approx) {
					if (dx != 0 || dy != 0) {
						pt.x = v.x;
						pt.y = v.y;
					}
					found = true;
				}
				if (found) break;
			}
			if (!found) {
				error('point not found in vertices!!! ' + pt.x + ' ' + pt.y);
			}
		}
	}
	return vertices;
}

function countAll(s, scount) {
	let letters = toLetters(scount);
	function counter(total, ch) { if (letters.includes(ch)) return total + 1; else return total; }
	let res = [...s].reduce(counter, 0);
	return res;
}

function csv2list(allText, hasHeadings = true) {
	var numHeadings = 11;
	var allTextLines = allText.split(/\r\n|\n/);
	var headings = allTextLines[0].split(',');
	numHeadings = headings.length;
	let entries = allTextLines.splice(1);
	var records = [];
	for (const e of entries) {
		let o = {};
		let values = e.split(',');
		for (let i = 0; i < numHeadings; i++) {
			let k = headings[i];
			o[k] = values[i];
		}
		records.push(o);
	}
	return records;
}

function cycle(x, min, max) {
	let d = max - min; return (x - min) % d + min;
}

function dSquare(pos1, pos2) {
	let dx = pos1.x - pos2.x;
	dx *= dx;
	let dy = pos1.y - pos2.y;
	dy *= dy;
	return dx + dy;
}

function date2locale(date) {
	return date.toLocaleDateString();
}

function db_create(table, rec, db) {
	if (!db) { db = DB; }
	lookupAddToList(db, ['appdata', table], rec);
	return db;
}

function db_delete(table, i, db) {
	if (!db) { db = DB; }
	if (nundef(i)) delete db.appdata[table]; else arrRemovip(lookup(db, ['appdata', table])[i]);
	return db;
}

function db_init(db) {
	DB = db; return db;
}

function db_readall(db) {
	if (!db) { db = DB; }
	return db;
}

function db_save_client(IP = 'localhost', port = 3000) {
	post_json(`http:/` + `/${IP}:${port}/post/json`, { filename: 'db', data: DB }, () => console.log('saved db'));
}

function db_update(table, i, rec, save = false) {
	if (isdef(DB)) { let list = lookup(DB, ['appdata', table]); list[i] = rec; }
	if (NODEJS) post_json(SERVERURL + `/update`, { table: table, i: i, rec: rec, save: save }, () => console.log('updated db'));
}

function default_allowDrop(ev) {
	ev.preventDefault();
}

function dict2list(d, keyName = 'id') {
	let res = [];
	for (const key in d) {
		let val = d[key];
		let o;
		if (isDict(val)) { o = jsCopy(val); } else { o = { value: val }; }
		o[keyName] = key;
		res.push(o);
	}
	return res;
}

function distance(x1, y1, x2, y2) {
	return Math.sqrt(dSquare({ x: x1, y: y1 }, { x: x2, y: y2 }));
}

function divInt(a, b) {
	return Math.trunc(a / b);
}

function doit(secs, f, interval) {
	if (get_now() - DA.start < secs * 1000) setTimeout(() => { f(); doit(secs, f, interval); }, interval);
	else console.log('DONE!!!');
}

function downloadAsText(s, filename, ext = 'txt') {
	saveFileAtClient(
		filename + "." + ext,
		"data:application/text",
		new Blob([s], { type: "" }));
}

function downloadAsYaml(o, filename) {
	let y = jsyaml.dump(o);
	downloadAsText(y, filename, 'yaml');
}

function downloadJson(o, filename) {
	if (filename.indexOf('.') < 0) filename = filename.json;
	let txt = (typeof o == 'object') ? encodeURIComponent(JSON.stringify(o)) : o;
	let dl = document.getElementById('downloadAnchorElement');
	if (nundef(dl)) dl = mCreateFrom(`<a id="downloadAnchorElem" style="display:none"></a>`);
	var dataStr = "data:text/json;charset=utf-8," + txt;
	dl.setAttribute("href", dataStr);
	dl.setAttribute("download", "_aaa\\scene.json");
	dl.click();
}

function drawFlatHex(dParent, styles, classes, sizing) {
	if (nundef(styles)) styles = { w: 100, h: 100, bg: 'blue' };
	if (nundef(classes)) classes = ['frameOnHover'];
	if (nundef(sizing)) sizing = { hgrow: true, wgrow: true };
	let d = mDiv(dParent, styles, null, null, classes, sizing);
	mStyle(d, { 'clip-path': 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)' });
	return d;
}

function drawHex(dParent, styles, classes, sizing) {
	if (nundef(styles)) styles = { w: 100, h: 100, bg: 'blue' };
	if (nundef(classes)) classes = ['frameOnHover'];
	if (nundef(sizing)) sizing = { hgrow: true, wgrow: true };
	let d = mDiv(dParent, styles, null, null, classes, sizing);
	mStyle(d, { 'clip-path': 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)' });
	return d;
}

function drawPlainCircle(c) {
	let item = mPic('heart', dMain, { fz: 8, bg: 'red', rounding: '50%', padding: 1 });
	mPos(iDiv(item), c.x, c.y);
	return item;
}

function drawShape(key, dParent, styles, classes, sizing) {
	if (nundef(styles)) styles = { w: 96, h: 96, bg: 'random' };
	if (nundef(sizing)) sizing = { hgrow: true, wgrow: true };
	let d = mDiv(dParent, styles, null, null, classes, sizing);
	if (key == 'circle' || key == 'ellipse') mStyle(d, { rounding: '50%' });
	else mStyle(d, { 'clip-path': PolyClips[key] });
	return d;
}

function drawSym(sym, c) {
	let item = mPic(sym, dMain, { fz: 25, bg: 'skyblue', rounding: '50%', padding: 4 });
	mPos(iDiv(item), c.x, c.y);
	return item;
}

function drawText(text, c) {
	let item = mText(text, dMain, { fz: 16, bg: 'skyblue', rounding: '50%', padding: 4 });
	mPos(iDiv(item), c.x, c.y);
	return item;
}

function drawTriangle(dParent, styles, classes, sizing) {
	if (nundef(styles)) styles = { w: 100, h: 100, bg: 'blue' };
	if (nundef(classes)) classes = ['frameOnHover'];
	if (nundef(sizing)) sizing = { hgrow: true, wgrow: true };
	let d = mDiv(dParent, styles, null, null, classes, sizing);
	mStyle(d, { 'clip-path': 'polygon(50% 0%, 100% 100%, 0% 100%)' });
	return d;
}

function draw_from_deck_to(deck, arr) {
	top_elem_from_to(deck, arr);
}

function draw_from_deck_to_board(deck, arr) {
	top_elem_from_to_top(deck, arr);
}

function elem_from_to(el, arr1, arr2) {
	removeInPlace(arr1, el); arr2.push(el);
}

function elem_from_to_top(el, arr1, arr2) {
	removeInPlace(arr1, el); arr2.unshift(el);
}

function endsWith(s, sSub) {
	let i = s.indexOf(sSub); return i >= 0 && i == s.length - sSub.length;
}

function ensureColorDict() {
	if (isdef(ColorDi)) return;
	ColorDi = {};
	let names = getColorNames();
	let hexes = getColorHexes();
	for (let i = 0; i < names.length; i++) {
		ColorDi[names[i].toLowerCase()] = { c: '#' + hexes[i] };
	}
	const newcolors = {
		black: { c: '#000000', D: 'schwarz' },
		blue: { c: '#0000ff', D: 'blau' },
		BLUE: { c: '#4363d8', E: 'blue', D: 'blau' },
		BLUEGREEN: { c: '#004054', E: 'bluegreen', D: 'blaugrün' },
		BROWN: { c: '#96613d', E: 'brown', D: 'braun' },
		deepyellow: { c: '#ffed01', E: 'yellow', D: 'gelb' },
		FIREBRICK: { c: '#800000', E: 'darkred', D: 'rotbraun' },
		gold: { c: 'gold', D: 'golden' },
		green: { c: 'green', D: 'grün' },
		GREEN: { c: '#3cb44b', E: 'green', D: 'grün' },
		grey: { c: 'grey', D: 'grau' },
		lightblue: { c: 'lightblue', D: 'hellblau' },
		LIGHTBLUE: { c: '#42d4f4', E: 'lightblue', D: 'hellblau' },
		lightgreen: { c: 'lightgreen', D: 'hellgrün' },
		LIGHTGREEN: { c: '#afff45', E: 'lightgreen', D: 'hellgrün' },
		lightyellow: { c: '#fff620', E: 'lightyellow', D: 'gelb' },
		NEONORANGE: { c: '#ff6700', E: 'neonorange', D: 'neonorange' },
		NEONYELLOW: { c: '#efff04', E: 'neonyellow', D: 'neongelb' },
		olive: { c: 'olive', D: 'oliv' },
		OLIVE: { c: '#808000', E: 'olive', D: 'oliv' },
		orange: { c: 'orange', D: 'orange' },
		ORANGE: { c: '#f58231', E: 'orange', D: 'orange' },
		PINK: { c: 'deeppink', D: 'rosa' },
		pink: { c: 'pink', D: 'rosa' },
		purple: { c: 'purple', D: 'lila' },
		PURPLE: { c: '#911eb4', E: 'purple', D: 'lila' },
		red: { c: 'red', D: 'rot' },
		RED: { c: '#e6194B', E: 'red', D: 'rot' },
		skyblue: { c: 'skyblue', D: 'himmelblau' },
		SKYBLUE: { c: 'deepskyblue', D: 'himmelblau' },
		teal: { c: '#469990', D: 'blaugrün' },
		TEAL: { c: '#469990', E: 'teal', D: 'blaugrün' },
		transparent: { c: '#00000000', E: 'transparent', D: 'transparent' },
		violet: { c: 'violet', E: 'violet', D: 'violett' },
		VIOLET: { c: 'indigo', E: 'violet', D: 'violett' },
		white: { c: 'white', D: 'weiss' },
		yellow: { c: 'yellow', D: 'gelb' },
		yelloworange: { c: '#ffc300', E: 'yellow', D: 'gelb' },
		YELLOW: { c: '#ffe119', E: 'yellow', D: 'gelb' },
	};
	for (const k in newcolors) {
		let cnew = newcolors[k];
		if (cnew.c[0] != '#' && isdef(ColorDi[cnew.c])) cnew.c = ColorDi[cnew.c].c;
		ColorDi[k] = cnew;
	}
}

function errlog() {
	console.log('ERROR!', ...arguments);
}

function evNoBubble(ev) {
	ev.preventDefault(); ev.cancelBubble = true;
}

function evToClass(ev, className) {
	let elem = findParentWithClass(className);
	return elem;
}

function evToClosestId(ev) {
	let elem = findParentWithId(ev.target);
	return elem.id;
}

function evToId(ev) {
	let elem = findParentWithId(ev.target);
	return elem.id;
}

function evToItem(ev) {
	let id = evToId(ev);
	let item = Items[id];
	return item;
}

function evToProp(ev, prop) {
	let x = ev.target;
	while (isdef(x) && nundef(x.getAttribute(prop))) x = x.parentNode;
	return isdef(x) ? x.getAttribute(prop) : null;
}

function evToTargetAttribute(ev, attr) {
	let val = ev.target.getAttribute(attr);
	if (nundef(val)) { val = ev.target.parentNode.getAttribute(attr); }
	return val;
}

function exchange_by_index(arr1, i1, arr2, i2) {
	let temp = arr1[i1];
	arr1[i1] = arr2[i2];
	arr2[i2] = temp;
}

function findAncestorElemOfType(el, type) {
	while (el) {
		let t = getTypeOf(el);
		if (t == type) break;
		el = el.parentNode;
	}
	return el;
}

function findAncestorElemWithParentOfType(el, type) {
	while (el && el.parentNode) {
		let t = getTypeOf(el);
		let tParent = getTypeOf(el.parentNode);
		if (tParent == type) break;
		el = el.parentNode;
	}
	return el;
}

function findAttributeInAncestors(elem, attr) {
	let val;
	while (elem && nundef(val = elem.getAttribute(attr))) { elem = elem.parentNode; }
	return val;
}

function findChildOfType(type, parentElem) {
	let children = arrChildren(parentElem);
	for (const ch of children) {
		if (getTypeOf(ch) == type) return ch;
	}
	return null;
}

function findChildWithClass(className, parentElem) {
	testHelpers(parentElem);
	let children = arrChildren(parentElem);
	for (const ch of children) {
		if (ch.classList.includes(className)) return ch;
	}
	return null;
}

function findChildWithId(id, parentElem) {
	testHelpers(parentElem);
	let children = arrChildren(parentElem);
	for (const ch of children) {
		if (ch.id == id) return ch;
	}
	return null;
}

function findChildrenOfType(type, parentElem) {
	let children = arrChildren(parentElem);
	let res = [];
	for (const ch of children) {
		if (getTypeOf(ch) == type) res.push(ch);
	}
	return res;
}

function findDescendantOfType(type, parent) {
	if (getTypeOf(parent) == type) return parent;
	let children = arrChildren(parent);
	if (isEmpty(children)) return null;
	for (const ch of children) {
		let res = findDescendantOfType(type, ch);
		if (res) return res;
	}
	return null;
}

function findDescendantWithId(id, parent) {
	if (parent.id == id) return parent;
	let children = arrChildren(parent);
	if (isEmpty(children)) return null;
	for (const ch of children) {
		let res = findDescendantWithId(id, ch);
		if (res) return res;
	}
	return null;
}

function findKeys(s) {
	return SymKeys.filter(x => contains(x, s) || contains(Syms[x].E, s) || isdef(Syms[x].D) && contains(Syms[x].D, s));
}

function findParentWithClass(elem, className) {
	while (elem && !mHasClass(elem, className)) { elem = elem.parentNode; } return elem;
}

function findParentWithId(elem) {
	while (elem && !(elem.id)) { elem = elem.parentNode; } return elem;
}

function find_minimum(array) {
	let min = array[0];
	for (let i = 1; i < array.length; i++) {
		if (array[i] < min) min = array[i];
	}
	return min;
}

function find_minimum_by_function(array, func) {
	let min = func(array[0]);
	for (let i = 1; i < array.length; i++) {
		if (func(array[i]) < func(min)) min = array[i];
	}
	return min;
}

function fireClick(elem) {
	const evt = new Event("click", { "bubbles": true, "cancelable": false });
	elem.dispatchEvent(evt);
}

function fireKey(k, { control, alt, shift } = {}) {
	console.log('fireKey called!' + document.createEvent)
	if (document.createEvent) {
		console.log('fireKey: createEvent and node.dispatchEvent exist!!!', k, control, alt, shift);
		window.dispatchEvent(new KeyboardEvent('keypress', { key: '+', ctrlKey: true }));
	} else if (document.createEventObject) {
		console.log('fireClick: createEventObject and node.fireEvent exist!!!', node)
		node.fireEvent('onclick');
	} else if (typeof node.onclick == 'function') {
		console.log('fireClick: node.onclick exists!!!', node)
		node.onclick();
	}
}

function fireWheel(node) {
	if (document.createEvent) {
		var evt = document.createEvent('MouseEvents');
		evt.initEvent('wheel', true, false);
		console.log('fireClick: createEvent and node.dispatchEvent exist!!!', node)
		node.dispatchEvent(evt);
	} else if (document.createEventObject) {
		console.log('fireClick: createEventObject and node.fireEvent exist!!!', node)
		node.fireEvent('onclick');
	} else if (typeof node.onclick == 'function') {
		console.log('fireClick: node.onclick exists!!!', node)
		node.onclick();
	}
}

function firstCond(arr, func) {
	if (nundef(arr)) return null;
	for (const a of arr) {
		if (func(a)) return a;
	}
	return null;
}

function firstCondDict(dict, func) {
	for (const k in dict) { if (func(dict[k])) return k; }
	return null;
}

function firstCondDictKey() {
	return firstCondDictKeys(...arguments);
}

function firstCondDictKeys(dict, func) {
	for (const k in dict) { if (func(k)) return k; }
	return null;
}

function firstNCond(n, arr, func) {
	if (nundef(arr)) return [];
	let result = [];
	let cnt = 0;
	for (const a of arr) {
		cnt += 1; if (cnt > n) break;
		if (func(a)) result.push(a);
	}
	return result;
}

function firstNumber(s) {
	if (s) {
		let m = s.match(/-?\d+/);
		if (m) {
			let sh = m.shift();
			if (sh) { return Number(sh); }
		}
	}
	return null;
}

function fisherYates(arr) {
	if (arr.length == 2 && coin()) { return arr; }
	var rnd, temp;
	let last = arr[0];
	for (var i = arr.length - 1; i; i--) {
		rnd = Math.random() * i | 0;
		temp = arr[i];
		arr[i] = arr[rnd];
		arr[rnd] = temp;
	}
	return arr;
}

function fleetingMessage(msg, d, styles, ms, fade) {
	if (isString(msg)) {
		dFleetingMessage.innerHTML = msg;
		mStyle(dFleetingMessage, styles);
	} else {
		mAppend(dFleetingMessage, msg);
	}
	if (fade) Animation1 = mAnimate(dFleetingMessage, 'opacity', [1, .4, 0], null, ms, 'ease-in', 0, 'both');
	return dFleetingMessage;
}

function forAll(arr, func) {
	for (const a of arr) if (!func(a)) return false; return true;
}

function formatDate(d) {
	const date = isdef(d) ? d : new Date();
	const month = ('0' + date.getMonth()).slice(0, 2);
	const day = date.getDate();
	const year = date.getFullYear();
	const dateString = `${month}/${day}/${year}`;
	return dateString;
}

function format_currency(num) {
	return '$' + num.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function format_date(date) {
	let d = new Date(date);
	let month = '' + (d.getMonth() + 1);
	let day = '' + d.getDate();
	let year = d.getFullYear();
	if (month.length < 2) month = '0' + month;
	if (day.length < 2) day = '0' + day;
	return [month, day, year].join('/');
}

function fromLocalStorage(name = '_all') {
	return JSON.parse(localStorage.getItem(name));
}

function fromUmlaut(w) {
	if (isList(w)) {
		let res = [];
		for (const w1 of w) res.push(fromUmlaut(w1));
		return res;
	} else {
		w = replaceAll(w, 'ü', 'ue');
		w = replaceAll(w, 'ä', 'ae');
		w = replaceAll(w, 'ö', 'oe');
		w = replaceAll(w, 'Ü', 'UE');
		w = replaceAll(w, 'Ä', 'AE');
		w = replaceAll(w, 'Ö', 'OE');
		return w;
	}
}
class TimeIt {
	constructor(msg = '*', showOutput = true) {
		this.showOutput = showOutput;
		this.init(msg);
	}
	getTotalTimeElapsed() {
		let tNew = new Date();
		let tDiffStart = tNew.getTime() - this.namedTimestamps.start.getTime();
		return tDiffStart;
	}
	tacit() { this.showOutput = false; }
	timeStamp(name) {
		let tNew = new Date();
		let tDiff = tNew.getTime() - this.namedTimestamps.start.getTime();
		if (this.showOutput) console.log('___', tDiff, 'msecs * to', name);
		this.t = tNew;
		this.namedTimestamps[name] = tNew;
	}
	reset() { this.init('timing start') }
	init(msg) {
		this.t = new Date();
		if (this.showOutput) console.log('___', msg);
		this.namedTimestamps = { start: this.t };
	}
	showSince(name, msg = 'now') {
		let tNew = new Date();
		let tNamed = this.namedTimestamps[name];
		if (this.showOutput) if (!tNamed) { console.log(name, 'is not a timestamp!'); return; }
		let tDiff = tNew.getTime() - tNamed.getTime();
		if (this.showOutput) console.log('___', tDiff, 'msecs', name, 'to', msg);
		this.t = tNew;
	}
	format(t) { return '___' + t.getSeconds() + ':' + t.getMilliseconds(); }
	show(msg) { this.showTime(msg); }
	showTime(msg = '*') {
		let tNew = new Date();
		let tDiff = tNew.getTime() - this.t.getTime();
		let tDiffStart = tNew.getTime() - this.namedTimestamps.start.getTime();
		if (this.showOutput) console.log('___ ', tDiff, 'msecs to', msg, '(' + tDiffStart, 'total)');
		this.t = tNew;
	}
	start_of_cycle(msg) {
		this.init(msg);
	}
	end_of_cycle(msg) {
		let tNew = new Date();
		let tDiff = tNew.getTime() - this.t.getTime();
		let tDiffStart = tNew.getTime() - this.namedTimestamps.start.getTime();
		if (this.showOutput) console.log('___ ' + tDiff + ' msecs', msg, 'to EOC (total: ' + tDiffStart + ')');
	}
}
class SimpleTimer {
	constructor(elem, msTick, onTick, msTotal, onElapsed) {
		this.elem = elem;
		this.msTotal = this.msLeft = msTotal;
		this.onTick = onTick;
		this.onElapsed = onElapsed;
		this.interval = msTick;
		this.running = false;
		this.paused = false;
		this.TO = null;
	}
	togglePause() { if (this.paused) this.continue(); else this.pause(); }
	clear() { let elapsed = this.stop(); clearElement(this.elem); return elapsed; }
	continue() {
		if (!this.running) this.start();
		else if (!this.paused) return;
		else { this.paused = false; this.TO = setInterval(this.tickHandler.bind(this), this.interval); }
	}
	tickHandler() {
		this.msLeft -= this.interval;
		this.msElapsed = this.msTotal - this.msLeft;
		this.output();
		if (isdef(this.onTick)) this.onTick();
		if (this.msLeft <= 0) {
			this.stop();
			this.msLeft = 0;
			if (isdef(this.onElapsed)) {
				this.onElapsed(0);
			}
		}
	}
	start() {
		if (this.running) this.stop();
		this.started = new Date().now;
		this.msLeft = this.msTotal;
		this.msElapsed = 0;
		this.running = true;
		this.output();
		this.TO = setInterval(this.tickHandler.bind(this), this.interval);
	}
	output() {
		this.elem.innerHTML = timeConversion(Math.max(this.msLeft, 0), 'msh');
	}
	stop() {
		if (!this.running) return;
		clearInterval(this.TO);
		this.TO = null;
		this.running = false;
		return this.msLeft;
	}
	pause() {
		if (this.paused || !this.running) return;
		clearInterval(this.TO);
		this.paused = true;
	}
}

function fromYaml(x) {
	return jsyaml.load(x);
}

function gBg(g, color) {
	g.setAttribute('fill', color);
}

function gCanvas(area, w, h, color, originInCenter = true) {
	let dParent = mBy(area);
	let div = stage3_prepContainer(dParent);
	div.style.width = w + 'px';
	div.style.height = h + 'px';
	let svg = gSvg();
	let style = `margin:0;padding:0;position:absolute;top:0px;left:0px;width:100%;height:100%;`
	svg.setAttribute('style', style);
	mColor(svg, color);
	div.appendChild(svg);
	let g = gG();
	if (originInCenter) g.style.transform = "translate(50%, 50%)";
	svg.appendChild(g);
	return g;
}

function gCreate(tag) {
	return document.createElementNS('http:/' + '/www.w3.org/2000/svg', tag);
}

function gEllipse(w, h) {
	let r = gCreate('ellipse'); r.setAttribute('rx', w / 2); r.setAttribute('ry', h / 2); return r;
}

function gFg(g, color, thickness) {
	g.setAttribute('stroke', color); if (thickness) g.setAttribute('stroke-width', thickness);
}

function gG() {
	return gCreate('g');
}

function gHex(w, h) {
	let pts = size2hex(w, h); return gPoly(pts);
}

function gLine(x1, y1, x2, y2) {
	let r = gCreate('line'); r.setAttribute('x1', x1); r.setAttribute('y1', y1); r.setAttribute('x2', x2); r.setAttribute('y2', y2); return r;
}

function gPoly(pts) {
	let r = gCreate('polygon'); if (pts) r.setAttribute('points', pts); return r;
}

function gPos(g, x, y) {
	g.style.transform = `translate(${x}px, ${y}px)`;
}

function gRect(w, h) {
	let r = gCreate('rect'); r.setAttribute('width', w); r.setAttribute('height', h); r.setAttribute('x', -w / 2); r.setAttribute('y', -h / 2); return r;
}

function gRounding(r, rounding) {
	r.setAttribute('rx', rounding);
	r.setAttribute('ry', rounding);
}

function gShape(shape, w = 20, h = 20, color = 'green', rounding) {
	let el = gG();
	if (nundef(shape)) shape = 'rect';
	if (shape != 'line') agColoredShape(el, shape, w, h, color);
	else gStroke(el, color, w);
	if (isdef(rounding) && shape == 'rect') {
		let r = el.children[0];
		gRounding(r, rounding);
	}
	return el;
}

function gSize(g, w, h, shape = null, iChild = 0) {
	let el = (getTypeOf(g) != 'g') ? g : g.children[iChild];
	let t = getTypeOf(el);
	switch (t) {
		case 'rect': el.setAttribute('width', w); el.setAttribute('height', h); el.setAttribute('x', -w / 2); el.setAttribute('y', -h / 2); break;
		case 'ellipse': el.setAttribute('rx', w / 2); el.setAttribute('ry', h / 2); break;
		default:
			if (shape) {
				switch (shape) {
					case 'hex': let pts = size2hex(w, h); el.setAttribute('points', pts); break;
				}
			}
	}
	return el;
}

function gSizeToContent(svg) {
	var bbox = svg.getBBox();
	svg.setAttribute("width", bbox.x + bbox.width + bbox.x);
	svg.setAttribute("height", bbox.y + bbox.height + bbox.y);
}

function gStroke(g, color, thickness) {
	g.setAttribute('stroke', color); if (thickness) g.setAttribute('stroke-width', thickness);
}

function gSvg() {
	return gCreate('svg');
}

function genCats(n) {
	let di = {};
	let cats = Object.keys(Categories);
	for (let i = 0; i < n; i++) {
		let cat = chooseRandom(cats);
		let incompat = DA.incompatibleCats[cat];
		cats = arrMinus(cats, incompat);
		removeInPlace(cats, cat);
		di[cat] = Categories[cat];
	}
	return di;
}

function germanize(s) {
	return toUmlaut(s);
}

function getAnimals() {
	let gr = 'Animals & Nature';
	let result = [];
	for (const sg in ByGroupSubgroup[gr]) {
		if (startsWith(sg, 'anim')) result = result.concat(ByGroupSubgroup[gr][sg]);
	}
	return result;
}

function getCirclePoints(rad, n, disp = 0) {
	let pts = [];
	let i = 0;
	let da = 360 / n;
	let angle = disp;
	while (i < n) {
		let px = rad * Math.cos(toRadian(angle));
		let py = rad * Math.sin(toRadian(angle));
		pts.push({ X: px, Y: py });
		angle += da;
		i++;
	}
	return pts;
}

function getColorHexes(x) {
	return [
		'f0f8ff',
		'faebd7',
		'00ffff',
		'7fffd4',
		'f0ffff',
		'f5f5dc',
		'ffe4c4',
		'000000',
		'ffebcd',
		'0000ff',
		'8a2be2',
		'a52a2a',
		'deb887',
		'5f9ea0',
		'7fff00',
		'd2691e',
		'ff7f50',
		'6495ed',
		'fff8dc',
		'dc143c',
		'00ffff',
		'00008b',
		'008b8b',
		'b8860b',
		'a9a9a9',
		'a9a9a9',
		'006400',
		'bdb76b',
		'8b008b',
		'556b2f',
		'ff8c00',
		'9932cc',
		'8b0000',
		'e9967a',
		'8fbc8f',
		'483d8b',
		'2f4f4f',
		'2f4f4f',
		'00ced1',
		'9400d3',
		'ff1493',
		'00bfff',
		'696969',
		'696969',
		'1e90ff',
		'b22222',
		'fffaf0',
		'228b22',
		'ff00ff',
		'dcdcdc',
		'f8f8ff',
		'ffd700',
		'daa520',
		'808080',
		'808080',
		'008000',
		'adff2f',
		'f0fff0',
		'ff69b4',
		'cd5c5c',
		'4b0082',
		'fffff0',
		'f0e68c',
		'e6e6fa',
		'fff0f5',
		'7cfc00',
		'fffacd',
		'add8e6',
		'f08080',
		'e0ffff',
		'fafad2',
		'd3d3d3',
		'd3d3d3',
		'90ee90',
		'ffb6c1',
		'ffa07a',
		'20b2aa',
		'87cefa',
		'778899',
		'778899',
		'b0c4de',
		'ffffe0',
		'00ff00',
		'32cd32',
		'faf0e6',
		'ff00ff',
		'800000',
		'66cdaa',
		'0000cd',
		'ba55d3',
		'9370db',
		'3cb371',
		'7b68ee',
		'00fa9a',
		'48d1cc',
		'c71585',
		'191970',
		'f5fffa',
		'ffe4e1',
		'ffe4b5',
		'ffdead',
		'000080',
		'fdf5e6',
		'808000',
		'6b8e23',
		'ffa500',
		'ff4500',
		'da70d6',
		'eee8aa',
		'98fb98',
		'afeeee',
		'db7093',
		'ffefd5',
		'ffdab9',
		'cd853f',
		'ffc0cb',
		'dda0dd',
		'b0e0e6',
		'800080',
		'663399',
		'ff0000',
		'bc8f8f',
		'4169e1',
		'8b4513',
		'fa8072',
		'f4a460',
		'2e8b57',
		'fff5ee',
		'a0522d',
		'c0c0c0',
		'87ceeb',
		'6a5acd',
		'708090',
		'708090',
		'fffafa',
		'00ff7f',
		'4682b4',
		'd2b48c',
		'008080',
		'd8bfd8',
		'ff6347',
		'40e0d0',
		'ee82ee',
		'f5deb3',
		'ffffff',
		'f5f5f5',
		'ffff00',
		'9acd32'
	];
}

function getColorNames() {
	return [
		'AliceBlue',
		'AntiqueWhite',
		'Aqua',
		'Aquamarine',
		'Azure',
		'Beige',
		'Bisque',
		'Black',
		'BlanchedAlmond',
		'Blue',
		'BlueViolet',
		'Brown',
		'BurlyWood',
		'CadetBlue',
		'Chartreuse',
		'Chocolate',
		'Coral',
		'CornflowerBlue',
		'Cornsilk',
		'Crimson',
		'Cyan',
		'DarkBlue',
		'DarkCyan',
		'DarkGoldenRod',
		'DarkGray',
		'DarkGrey',
		'DarkGreen',
		'DarkKhaki',
		'DarkMagenta',
		'DarkOliveGreen',
		'DarkOrange',
		'DarkOrchid',
		'DarkRed',
		'DarkSalmon',
		'DarkSeaGreen',
		'DarkSlateBlue',
		'DarkSlateGray',
		'DarkSlateGrey',
		'DarkTurquoise',
		'DarkViolet',
		'DeepPink',
		'DeepSkyBlue',
		'DimGray',
		'DimGrey',
		'DodgerBlue',
		'FireBrick',
		'FloralWhite',
		'ForestGreen',
		'Fuchsia',
		'Gainsboro',
		'GhostWhite',
		'Gold',
		'GoldenRod',
		'Gray',
		'Grey',
		'Green',
		'GreenYellow',
		'HoneyDew',
		'HotPink',
		'IndianRed',
		'Indigo',
		'Ivory',
		'Khaki',
		'Lavender',
		'LavenderBlush',
		'LawnGreen',
		'LemonChiffon',
		'LightBlue',
		'LightCoral',
		'LightCyan',
		'LightGoldenRodYellow',
		'LightGray',
		'LightGrey',
		'LightGreen',
		'LightPink',
		'LightSalmon',
		'LightSeaGreen',
		'LightSkyBlue',
		'LightSlateGray',
		'LightSlateGrey',
		'LightSteelBlue',
		'LightYellow',
		'Lime',
		'LimeGreen',
		'Linen',
		'Magenta',
		'Maroon',
		'MediumAquaMarine',
		'MediumBlue',
		'MediumOrchid',
		'MediumPurple',
		'MediumSeaGreen',
		'MediumSlateBlue',
		'MediumSpringGreen',
		'MediumTurquoise',
		'MediumVioletRed',
		'MidnightBlue',
		'MintCream',
		'MistyRose',
		'Moccasin',
		'NavajoWhite',
		'Navy',
		'OldLace',
		'Olive',
		'OliveDrab',
		'Orange',
		'OrangeRed',
		'Orchid',
		'PaleGoldenRod',
		'PaleGreen',
		'PaleTurquoise',
		'PaleVioletRed',
		'PapayaWhip',
		'PeachPuff',
		'Peru',
		'Pink',
		'Plum',
		'PowderBlue',
		'Purple',
		'RebeccaPurple',
		'Red',
		'RosyBrown',
		'RoyalBlue',
		'SaddleBrown',
		'Salmon',
		'SandyBrown',
		'SeaGreen',
		'SeaShell',
		'Sienna',
		'Silver',
		'SkyBlue',
		'SlateBlue',
		'SlateGray',
		'SlateGrey',
		'Snow',
		'SpringGreen',
		'SteelBlue',
		'Tan',
		'Teal',
		'Thistle',
		'Tomato',
		'Turquoise',
		'Violet',
		'Wheat',
		'White',
		'WhiteSmoke',
		'Yellow',
		'YellowGreen'
	];
}

function getConsonants(w, except = []) {
	w = w.toLowerCase();
	let vowels = 'aeiouy' + except.join('');
	let res = [];
	for (let i = 0; i < w.length; i++) {
		if (!vowels.includes(w[i])) res.push({ i: i, letter: w[i] });
	}
	return res;
}

function getEllipsePoints(radx, rady, n, disp = 0) {
	let pts = [];
	let i = 0;
	let da = 360 / n;
	let angle = disp;
	while (i < n) {
		let px = radx * Math.cos(toRadian(angle));
		let py = rady * Math.sin(toRadian(angle));
		pts.push({ X: px, Y: py });
		angle += da;
		i++;
	}
	return pts;
}

function getFruid(pref = '') {
	const alpha = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
	FRUIDCounter += 1;
	if (FRUIDCounter < alpha.length) return pref + alpha[FRUIDCounter];
	return pref + FRUIDCounter - alpha.length;
}

function getFunctionCallerName() {
	return new Error().stack.match(/at (\S+)/g)[1].slice(3);
}

function getFunctionsNameThatCalledThisFunction() {
	let c1 = getFunctionsNameThatCalledThisFunction.caller;
	if (nundef(c1)) return 'no caller!';
	let c2 = c1.caller;
	if (nundef(c2)) return 'no caller!';
	return c2.name;
}

function getGSGElements(gCond, sCond) {
	let keys = [];
	let byg = ByGroupSubgroup;
	for (const gKey in byg) {
		if (!gCond(gKey)) continue;
		for (const sKey in byg[gKey]) {
			if (!sCond(sKey)) continue;
			keys = keys.concat(byg[gKey][sKey]);
		}
	}
	return keys.sort();
}

function getHexPoly(x, y, w, h) {
	let hex = [[0, -0.5], [0.5, -0.25], [0.5, 0.25], [0, 0.5], [-0.5, 0.25], [-0.5, -0.25]];
	return getPoly(hex, x, y, w, h);
}

function getKeySets() {
	makeCategories();
	let res = {};
	for (const k in Syms) {
		let info = Syms[k];
		if (nundef(info.cats)) continue;
		for (const ksk of info.cats) {
			lookupAddIfToList(res, [ksk], k);
		}
	}
	res.animals = getAnimals();
	res.nature = getNature();
	localStorage.setItem('KeySets', JSON.stringify(res));
	return res;
}

function getLettersExcept(w, except = []) {
	w = w.toLowerCase();
	let res = [];
	for (let i = 0; i < w.length; i++) {
		if (!except.includes(w[i])) res.push({ i: i, letter: w[i] });
	}
	return res;
}

function getNature() {
	let gr = 'Animals & Nature';
	let result = [];
	for (const sg in ByGroupSubgroup[gr]) {
		result = result.concat(ByGroupSubgroup[gr][sg]);
	}
	return result;
}

function getPoly(offsets, x, y, w, h) {
	let poly = [];
	for (let p of offsets) {
		let px = Math.round(x + p[0] * w);
		let py = Math.round(y + p[1] * h);
		poly.push({ x: px, y: py });
	}
	return poly;
}

function getQuadPoly(x, y, w, h) {
	q = [[0.5, -0.5], [0.5, 0.5], [-0.5, 0.5], [-0.5, -0.5]];
	return getPoly(q, x, y, w, h);
}

function getRandomLetter(w, except = []) {
	let cons = getLettersExcept(w, except); return chooseRandom(cons);
}

function getRect(elem, relto) {
	if (isString(elem)) elem = document.getElementById(elem);
	let res = elem.getBoundingClientRect();
	if (isdef(relto)) {
		let b2 = relto.getBoundingClientRect();
		let b1 = res;
		res = {
			x: b1.x - b2.x,
			y: b1.y - b2.y,
			left: b1.left - b2.left,
			top: b1.top - b2.top,
			right: b1.right - b2.right,
			bottom: b1.bottom - b2.bottom,
			width: b1.width,
			height: b1.height
		};
	}
	let r = { x: res.left, y: res.top, w: res.width, h: res.height };
	addKeys({ l: r.x, t: r.y, r: r.x + r.w, b: r.t + r.h }, r);
	return r;
}

function getSizeNeeded(elem) {
	var d = elem.cloneNode(true);
	d.style.width = 'auto';
	document.body.appendChild(d);
	let cStyles = {};
	cStyles.position = 'fixed';
	cStyles.opacity = 0;
	cStyles.top = '-9999px';
	mStyle(d, cStyles);
	height = d.clientHeight;
	width = d.clientWidth;
	d.parentNode.removeChild(d);
	return { w: Math.round(width), h: Math.round(height) };
}
var UIDCounter = 0;

function getStyleProp(elem, prop) {
	return getComputedStyle(elem).getPropertyValue(prop);
}

function getTextWidth(text, font) {
	var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement('canvas'));
	var context = canvas.getContext('2d');
	context.font = font;
	var metrics = context.measureText(text);
	return metrics.width;
}

function getTriangleDownPoly(x, y, w, h) {
	let tridown = [[-0.5, 0.5], [0.5, 0.5], [-0.5, 0.5]];
	return getPoly(tridown, x, y, w, h);
}

function getTriangleUpPoly(x, y, w, h) {
	let triup = [[0, -0.5], [0.5, 0.5], [-0.5, 0.5]];
	return getPoly(triup, x, y, w, h);
}

function getTypeOf(param) {
	let type = typeof param;
	if (type == 'string') {
		return 'string';
	}
	if (type == 'object') {
		type = param.constructor.name;
		if (startsWith(type, 'SVG')) type = stringBefore(stringAfter(type, 'SVG'), 'Element').toLowerCase();
		else if (startsWith(type, 'HTML')) type = stringBefore(stringAfter(type, 'HTML'), 'Element').toLowerCase();
	}
	let lType = type.toLowerCase();
	if (lType.includes('event')) type = 'event';
	return type;
}

function getUID(pref = '') {
	UIDCounter += 1;
	return pref + '_' + UIDCounter;
}
var FRUIDCounter = -1;

function getVowels(w, except = []) {
	w = w.toLowerCase();
	let vowels = 'aeiouy';
	let res = [];
	for (let i = 0; i < w.length; i++) {
		if (vowels.includes(w[i]) && !except.includes(w[i])) res.push({ i: i, letter: w[i] });
	}
	return res;
}

function get_checked_radios(rg) {
	let inputs = rg.getElementsByTagName('INPUT');
	let list = [];
	for (const ch of inputs) {
		let checked = ch.getAttribute('checked');
		if (ch.checked) list.push(ch.value);
	}
	return list;
}

function get_keys(o) {
	return Object.keys(o);
}

function get_mouse_pos(ev) {
	let x = ev.pageX - document.body.scrollLeft;
	let y = ev.pageY - document.body.scrollTop;
	return ({ x: x, y: y });
}

function get_next_in_list(el, list) {
	let i = list.indexOf(el);
	let nextplayer = list[(i + 1) % list.length];
	return nextplayer;
}

function get_now() {
	return Date.now();
}

function get_timestamp() {
	return Date.now();
}

function get_values(o) {
	return Object.values(o);
}

function get_weekday(date) {
	let d = new Date(date);
	return d.getDay();
}

function hasWhiteSpace(s) {
	return /\s/g.test(s);
}

function hexAToHSLA(H) {
	let ex = /^#([\da-f]{4}){1,2}$/i;
	if (ex.test(H)) {
		let r = 0,
			g = 0,
			b = 0,
			a = 1;
		if (H.length == 5) {
			r = '0x' + H[1] + H[1];
			g = '0x' + H[2] + H[2];
			b = '0x' + H[3] + H[3];
			a = '0x' + H[4] + H[4];
		} else if (H.length == 9) {
			r = '0x' + H[1] + H[2];
			g = '0x' + H[3] + H[4];
			b = '0x' + H[5] + H[6];
			a = '0x' + H[7] + H[8];
		}
		r /= 255;
		g /= 255;
		b /= 255;
		let cmin = Math.min(r, g, b),
			cmax = Math.max(r, g, b),
			delta = cmax - cmin,
			h = 0,
			s = 0,
			l = 0;
		if (delta == 0) h = 0;
		else if (cmax == r) h = ((g - b) / delta) % 6;
		else if (cmax == g) h = (b - r) / delta + 2;
		else h = (r - g) / delta + 4;
		h = Math.round(h * 60);
		if (h < 0) h += 360;
		l = (cmax + cmin) / 2;
		s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
		s = +(s * 100).toFixed(1);
		l = +(l * 100).toFixed(1);
		a = (a / 255).toFixed(3);
		return 'hsla(' + h + ',' + s + '%,' + l + '%,' + a + ')';
	} else {
		return 'Invalid input color';
	}
}

function hexToHSL(H) {
	let ex = /^#([\da-f]{3}){1,2}$/i;
	if (ex.test(H)) {
		let r = 0,
			g = 0,
			b = 0;
		if (H.length == 4) {
			r = '0x' + H[1] + H[1];
			g = '0x' + H[2] + H[2];
			b = '0x' + H[3] + H[3];
		} else if (H.length == 7) {
			r = '0x' + H[1] + H[2];
			g = '0x' + H[3] + H[4];
			b = '0x' + H[5] + H[6];
		}
		r /= 255;
		g /= 255;
		b /= 255;
		let cmin = Math.min(r, g, b),
			cmax = Math.max(r, g, b),
			delta = cmax - cmin,
			h = 0,
			s = 0,
			l = 0;
		if (delta == 0) h = 0;
		else if (cmax == r) h = ((g - b) / delta) % 6;
		else if (cmax == g) h = (b - r) / delta + 2;
		else h = (r - g) / delta + 4;
		h = Math.round(h * 60);
		if (h < 0) h += 360;
		l = (cmax + cmin) / 2;
		s = delta == 0 ? 0 : delta / (1 - Math.abs(2 * l - 1));
		s = +(s * 100).toFixed(1);
		l = +(l * 100).toFixed(1);
		return 'hsl(' + h + ',' + s + '%,' + l + '%)';
	} else {
		return 'Invalid input color';
	}
}

function hide(elem) {
	if (isString(elem)) elem = document.getElementById(elem);
	if (nundef(elem)) return;
	if (isSvg(elem)) {
		elem.setAttribute('style', 'visibility:hidden;display:none');
	} else {
		elem.style.display = 'none';
	}
}

function hide0(id) {
	mBy(id).style.display = "none";
}

function hslToHex(h, s, l) {
	l /= 100;
	const a = s * Math.min(l, 1 - l) / 100;
	const f = n => {
		const k = (n + h / 30) % 12;
		const color = l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
		return Math.round(255 * color).toString(16).padStart(2, '0');
	};
	return `#${f(0)}${f(8)}${f(4)}`;
}

function iAdd(item, liveprops, addprops) {
	let id, l;
	if (isString(item)) { id = item; item = valf(Items[id], {}); }
	let el = valf(liveprops.div, liveprops.ui, iDiv(item), null);
	id = valnwhite(item.id, (el ? el.id : getUID()), getUID());
	item.id = id; if (nundef(Items[id])) Items[id] = item; if (el) el.id = id;
	if (nundef(item.live)) item.live = {};
	l = item.live;
	for (const k in liveprops) {
		let val = liveprops[k];
		if (nundef(val)) { continue; }
		l[k] = val;
		if (isdef(val.id) && val.id != id) { lookupAddIfToList(val, ['memberOf'], id); }
	}
	if (isdef(addprops)) copyKeys(addprops, item);
	return item;
}

function iClear(item) {
	if (isString(item)) { let id = item; if (isdef(Items[id])) item = Items[id]; else item = toElem(id); }
	let d = iDiv(item);
	if (isdef(d)) {
		let desc = Array.from(d.querySelectorAll('[id]:not([id=""])'));
		desc = desc.filter(x => isdef(Items[x.id]))
		for (const item1 of desc) iDelete(item1.id);
		mClear(d);
	}
}

function iDelete(id) {
	delete Items[id];
}

function iDiv(i) {
	return isdef(i.live) ? i.live.div : isdef(i.div) ? i.div : i;
}

function iG(i) {
	return isdef(i.live) ? i.live.g : isdef(i.g) ? i.g : i;
}

function iMeasure(item, sizingOptions) {
	if (nundef(iDiv(item))) return;
	setRect(iDiv(item), valf(sizingOptions, { hgrow: true, wgrow: true }));
}

function iReg(item, liveprops, addprops) {
	iRepair(item);
	if (isdef(liveprops)) for (const k in liveprops) { lookupSetOverride(item, ['live', k], liveprops[k]) }
	if (isdef(addprops)) copyKeys(addprops, item);
	let umain = iDiv(item); if (nundef(umain) && isdef(item.live)) { umain = get_values(item.live)[0]; }
	let id = item.id;
	if (nundef(id) && umain) { id = valnwhite(umain.id, getUID()); item.id = id; }
	else if (nundef(id)) { id = getUID(); item.id = id; }
	if (umain) { umain.id = id; }
	if (nundef(Items[id])) Items[id] = item;
	return item;
}

function iRegister(item, id) {
	let uid = isdef(id) ? id : getUID(); Items[uid] = item; return uid;
}

function iRepair(item) {
	let todelete = [];
	delete item.funcs;
	for (const k in item) {
		let val = item[k];
		if (isDOM(val) || k == 'cx') {
			lookupSetOverride(item, ['live', k], val);
			todelete.push(k);
		} else if (typeof val == 'function') {
			lookupSet(item, ['funcs', k], true);
		}
	}
	for (const k of todelete) delete item[k];
	return item;
}

function iSvg(i) {
	return isdef(i.live) ? i.live.svg : isdef(i.svg) ? i.svg : i;
}

function iTrim(item, serialize = true) {
	let todelete = [];
	for (const k in item) {
		let val = item[k];
		if (isDOM(val)) {
			if (!serialize) { if (isEmptyOrWhiteSpace(val.id)) val.id = getUID(); lookupSetOverride(item, ['live', val.id], val); }
			todelete.push(k);
		} else if (typeof val == 'function') {
			console.log('funcname', val.name);
			if (serialize) item[k] = val.name;
			else { lookupSetOverride(item, ['funcs', val.name], val); todelete.push(k); }
		}
	}
	if (serialize) { delete item.live; delete item.funcs };
	for (const k of todelete) delete item[k];
	return item;
}

function if_plural(n) {
	return n == 1 ? '' : 's';
}

function if_stringified(obj) {
	return is_stringified(obj) ? JSON.parse(obj) : obj;
}

function if_stringified_or_dict(obj) {
	return nundef(obj) ? {} : is_stringified(obj) ? JSON.parse(obj) : obj;
}

function if_stringified_or_list(obj) {
	return nundef(obj) ? [] : is_stringified(obj) ? JSON.parse(obj) : obj;
}

function if_stringified_or_string(obj) {
	return nundef(obj) ? '' : is_stringified(obj) ? JSON.parse(obj) : obj;
}

function incInput(inp, n = 1) {
	let val = Number(inp.innerHTML);
	val += n;
	inp.innerHTML = val;
}

function indexOfAny(s, list, pos) {
	let min = 1000000;
	let match = null;
	for (const w of list) {
		let i = s.indexOf(w, pos);
		if (i >= 0 && i < min) { min = i; match = w; }
	}
	return match ? [min, match] : [-1, null];
}

function intersection(arr1, arr2) {
	let res = [];
	for (const a of arr1) {
		if (arr2.includes(a)) {
			addIf(res, a);
		}
	}
	return res;
}

function isAlphaNum(s) {
	query = /^[a-zA-Z0-9]+$/; return query.test(s);
}

function isCloseTo(n, m, acc = 10) {
	return Math.abs(n - m) <= acc + 1;
}

function isDOM(x) {
	let c = lookup(x, ['constructor', 'name']); return c ? startsWith(c, 'HTML') || startsWith(c, 'SVG') : false;
}

function isDict(d) {
	let res = (d !== null) && (typeof (d) == 'object') && !isList(d); return res;
}

function isDictOrList(d) {
	return typeof (d) == 'object';
}

function isDigit(s) {
	return /^[0-9]$/i.test(s);
}

function isEmpty(arr) {
	return arr === undefined || !arr
		|| (isString(arr) && (arr == 'undefined' || arr == ''))
		|| (Array.isArray(arr) && arr.length == 0)
		|| Object.entries(arr).length === 0;
}

function isEmptyOrWhiteSpace(s) {
	return isEmpty(s.trim());
}

function isLetter(s) {
	return /^[a-zA-Z]$/i.test(s);
}

function isList(arr) {
	return Array.isArray(arr);
}

function isListOf(arr, predfunc) {
	return Array.isArray(arr) && !firstCond(arr, x => !predfunc(x));
}

function isLiteral(x) {
	return isString(x) || isNumber(x);
}

function isNumber(x) {
	return x !== ' ' && x !== true && x !== false && isdef(x) && (x == 0 || !isNaN(+x));
}

function isOverflown(element) {
	return element.scrollHeight > element.clientHeight || element.scrollWidth > element.clientWidth;
}

function isString(param) {
	return typeof param == 'string';
}

function isSvg(elem) {
	return startsWith(elem.constructor.name, 'SVG');
}

function isVisible(elem) {
	if (isString(elem)) elem = document.getElementById(elem);
	let x = elem.style.flex;
	return (elem.style.display != 'none' || elem.offsetParent !== null) && (nundef(elem.style.flex) || !endsWith(elem.style.flex, '0%'));
}

function isWhiteSpace(ch) {
	return /\s/.test(ch)
}

function isWhiteSpace2(ch) {
	const alphanum = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ_';
	return !alphanum.includes(ch);
}

function isWhiteSpaceString(s) {
	return isEmptyOrWhiteSpace(s);
}

function is_key_down(key) {
	if (nundef(DA.keystate)) {
		DA.keystate = {};
		window.addEventListener('keyup', (e) => state[e.key] = false);
		window.addEventListener('keydown', (e) => { state[e.key] = true; });
	}
	let state = DA.keystate;
	state.hasOwnProperty(key) && state[key] || false;
}

function is_stringified(obj) {
	if (isString(obj)) {
		return '"\'{[('.includes(obj[0]);
	}
	return false;
}

function isdef(x) {
	return x !== null && x !== undefined;
}

function jsClean(o) {
	if (nundef(o)) return o;
	else if (isDOM(o)) return null;
	else if (isLiteral(o)) return o;
	else if (isList(o)) {
		let onew = o.map(x => jsClean(x));
		return onew.filter(x => x !== null);
	} else if (isDict(o)) {
		for (const k in o) o[k] = jsClean(o[k]);
		let onew = {};
		for (const k in o) if (o[k] !== null) onew[k] = o[k];
		return onew;
	}
}

function jsCopy(o) {
	return JSON.parse(JSON.stringify(o));
}

function jsCopySafe(o) {
	return JSON.parse(JSON.stringify(jsClean(o)));
}

function jsonToYaml(o) {
	let y = jsyaml.dump(o); return y;
}

function lastCond(arr, func) {
	if (nundef(arr)) return null;
	for (let i = arr.length - 1; i >= 0; i--) { let a = arr[i]; if (func(a)) return a; }
	return null;
}

function lastDescendantOfType(type, parent) {
	if (getTypeOf(parent) == type) return parent;
	let children = arrChildren(parent);
	if (isEmpty(children)) return null;
	for (const ch of children.reverse()) {
		let res = lastDescendantOfType(type, ch);
		if (res) return res;
	}
	return null;
}

function lastIndexOfAny(s, list, pos) {
	let min = -1;
	let match = null;
	for (const w of list) {
		let i = s.lastIndexOf(w, pos);
		if (i >= 0 && i > min) { min = i; match = w; }
	}
	return match ? [min, match] : [-1, null];
}

function last_elem_from_to(arr1, arr2) {
	arr2.push(arr1.pop());
}

function lerp(a, b, t) {
	return a + (b - a) * t;
}

function list2dict(arr, keyprop = 'id', uniqueKeys = true) {
	let di = {};
	for (const a of arr) {
		if (uniqueKeys) lookupSet(di, [a[keyprop]], a);
		else lookupAddToList(di, [a[keyprop]], a);
	}
	return di;
}

function load_assets_direct(obj) {
	Config = jsyaml.load(obj.config);
	Syms = jsyaml.load(obj.syms);
	SymKeys = Object.keys(Syms);
	ByGroupSubgroup = jsyaml.load(obj.symGSG);
	Info = jsyaml.load(obj.info);
	KeySets = getKeySets();
	console.assert(isdef(Config), 'NO Config!!!!!!!!!!!!!!!!!!!!!!!!');
}

async function load_assets_fetch(basepath, baseminpath) {
	let path = basepath + 'assets/';
	Config = await route_path_yaml_dict(baseminpath + 'config.yaml');
	DB = await route_path_yaml_dict(basepath + 'DB.yaml');
	Syms = await route_path_yaml_dict(path + 'allSyms.yaml');
	SymKeys = Object.keys(Syms);
	ByGroupSubgroup = await route_path_yaml_dict(path + 'symGSG.yaml');
	C52 = await route_path_yaml_dict(path + 'c52.yaml');
	Cinno = await route_path_yaml_dict(path + 'fe/inno.yaml');
	Info = await route_path_yaml_dict(path + 'lists/info.yaml');
	create_card_assets_c52();
	KeySets = getKeySets();
	console.assert(isdef(Config), 'NO Config!!!!!!!!!!!!!!!!!!!!!!!!');
	return { users: dict2list(DB.users, 'name'), games: dict2list(Config.games, 'name'), tables: [] };
}

async function load_config(port = 3000, apps = true, tables = false) {
	Config = await route_path_yaml_dict('../y/config.yaml');
	let server = 'http:/' + '/localhost:' + port;
	if (apps) {
		let files = await route_path_json(server + '/files?dir=appdata');
		console.log('apps', files)
		for (const f of files) {
			let appname = stringBefore(f, '.');
			Config.apps[appname].data = await route_path_yaml_dict(`../y/appdata/${appname}.yaml`);
		}
	}
	if (tables) {
		let files = await route_path_json(server + '/files?dir=tables');
		console.log('tables', files)
		Tables = {};
		for (const f of files) {
			let id = stringBefore(f, '.');
			Tables[id] = await route_path_yaml_dict(`../y/tables/${id}.yaml`);
		}
	}
}

async function load_config_fast(applist = [], tablelist = []) {
	Config = await route_path_yaml_dict('../y/config.yaml');
	for (const appname of applist) {
		Config.apps[appname].data = await route_path_yaml_dict(`../y/appdata/${appname}.yaml`);
		Config.apps[appname].name = appname;
	}
	Tables = {};
	for (const tableid of tablelist) {
		Tables[tableid] = await route_path_yaml_dict(`../y/tables/${tableid}.yaml`);
		Tables[tableid].name = tableid;
	}
}

async function load_config_new() {
	Config = await route_path_yaml_dict('../y/config.yaml');
	let data = await route_path_yaml_dict('../y/appdata.yaml');
	for (const k in data) {
		Config.apps[k].data = data[k];
	}
}

async function load_db() {
	DB = await route_path_yaml_dict('../y/db.yaml');
}

async function load_syms(path) {
	if (nundef(path)) path = '../base/assets/';
	Syms = await route_path_yaml_dict(path + 'allSyms.yaml');
	SymKeys = Object.keys(Syms);
	ByGroupSubgroup = await route_path_yaml_dict(path + 'symGSG.yaml');
	KeySets = getKeySets();
	Info = await route_path_yaml_dict(path + 'lists/info.yaml');
	assertion(Syms, 'Syms undefined!');
}

function loader_off() {
	let d = mBy('loader_holder'); if (isdef(d)) d.className = 'loader_off';
}

function loader_on() {
	let d = mBy('loader_holder'); if (isdef(d)) d.className = 'loader_on';
}

function log_array(arr) {
	arr.map(x => console.log(x));
}

function log_object(o = {}, msg = '', props = [], indent = 0) {
	console.log(indent ? '.'.repeat(indent) : '____', msg, indent ? '' : `(caller:${getFunctionsNameThatCalledThisFunction()})`);
	let keys = get_keys(o); keys.sort();
	for (const k of keys) {
		if (isEmpty(props) || props.includes(k)) {
			if (isDict(o[k])) { log_object(o[k], k, get_keys(o[k]).join(' '), indent + 1); console.log(); }
			else if (isListOf(o[k], isLiteral)) console.log(' '.repeat(indent), k + ':', o[k].join(','));
			else console.log(' '.repeat(indent), k + ':', o[k]);
		}
	}
}

function lookup(dict, keys) {
	let d = dict;
	let ilast = keys.length - 1;
	let i = 0;
	for (const k of keys) {
		if (k === undefined) break;
		let e = d[k];
		if (e === undefined || e === null) return null;
		d = d[k];
		if (i == ilast) return d;
		i += 1;
	}
	return d;
}

function lookupAddIfToList(dict, keys, val) {
	let lst = lookup(dict, keys);
	if (isList(lst) && lst.includes(val)) return;
	lookupAddToList(dict, keys, val);
}

function lookupAddToList(dict, keys, val) {
	let d = dict;
	let ilast = keys.length - 1;
	let i = 0;
	for (const k of keys) {
		if (i == ilast) {
			if (nundef(k)) {
				console.assert(false, 'lookupAddToList: last key indefined!' + keys.join(' '));
				return null;
			} else if (isList(d[k])) {
				d[k].push(val);
			} else {
				d[k] = [val];
			}
			return d[k];
		}
		if (nundef(k)) continue;
		if (d[k] === undefined) d[k] = {};
		d = d[k];
		i += 1;
	}
	return d;
}

function lookupSet(dict, keys, val) {
	let d = dict;
	let ilast = keys.length - 1;
	let i = 0;
	for (const k of keys) {
		if (nundef(k)) continue;
		if (d[k] === undefined) d[k] = (i == ilast ? val : {});
		if (nundef(d[k])) d[k] = (i == ilast ? val : {});
		d = d[k];
		if (i == ilast) return d;
		i += 1;
	}
	return d;
}

function lookupSetOverride(dict, keys, val) {
	let d = dict;
	let ilast = keys.length - 1;
	let i = 0;
	for (const k of keys) {
		if (i == ilast) {
			if (nundef(k)) {
				return null;
			} else {
				d[k] = val;
			}
			return d[k];
		}
		if (nundef(k)) continue;
		if (nundef(d[k])) d[k] = {};
		d = d[k];
		i += 1;
	}
	return d;
}

function mAnimate(elem, prop, valist, callback, msDuration = 1000, easing = 'cubic-bezier(1,-0.03,.86,.68)', delay = 0, forwards = 'none') {
	let kflist = [];
	for (const perc in valist) {
		let o = {};
		let val = valist[perc];
		o[prop] = isString(val) || prop == 'opacity' ? val : '' + val + 'px';
		kflist.push(o);
	}
	let opts = { duration: msDuration, fill: forwards, easing: easing, delay: delay };
	let a = toElem(elem).animate(kflist, opts);
	if (isdef(callback)) { a.onfinish = callback; }
	return a;
}

function mAnimateList(elem, ogoal, callback, msDuration = 1000, easing = 'cubic-bezier(1,-0.03,.86,.68)', delay = 0) {
	for (const k in ogoal) {
		ogoal[k] = isString(ogoal[k]) || k == 'opacity' ? ogoal[k] : '' + ogoal[k] + 'px';
	}
	let kflist = [ogoal];
	let opts = { duration: msDuration, fill: 'forwards', easing: easing, delay: delay };
	let a = toElem(elem).animate(kflist, opts);
	if (isdef(callback)) { a.onfinish = callback; }
	return a;
}

function mAnimateTo(elem, prop, val, callback, msDuration = 1000, easing = 'cubic-bezier(1,-0.03,.86,.68)', delay = 0) {
	let o = {};
	o[prop] = isString(val) || prop == 'opacity' ? val : '' + val + 'px';
	let kflist = [o];
	let opts = { duration: msDuration, fill: 'forwards', easing: easing, delay: delay };
	let a = toElem(elem).animate(kflist, opts);
	if (isdef(callback)) { a.onfinish = callback; }
	return a;
}

function mAppear(d, ms = 800, callback = null) {
	return mAnimateTo(d, 'opacity', 1, callback, ms);
}

function mAppend(d, child) {
	toElem(d).appendChild(child); return child;
}

function mAttrs(elem, attrs) {
	for (const k in attrs) { elem.setAttribute(k, attrs[k]); }
}

function mAutocomplete(dParent) {
	let form = mCreateFrom(`
    <form class='form' autocomplete="off" action="javascript:void(0);">
      <div class="autocomplete" style="width: 200px">
        <input id="myInput" type="text" name="myCity" placeholder="City" onclick="select()" />
      </div>
      <input style="margin-left:-15px" type="submit" value="Go!" />
    </form>
  `  );
	form.onsubmit = () => {
		let c = mBy('myInput').value.toLowerCase();
		let o = Geo.cities[c];
		if (nundef(o)) { c = toUmlaut(c); o = Geo.cities[c]; }
		console.log('c', c);
		let center = o.center;
		M.map.flyTo(center, M.map.getZoom(), { animate: false })
	}
	let d = mAppend(dParent, form);
	autocomplete('myInput', get_values(Geo.cities).map(x => x.name));
}

function mBackground(bg, fg) {
	mStyle(document.body, { bg: bg, fg: fg });
}

function mBoxFromMargins(dParent, t, r, b, l, styles, id, inner, classes) {
	let d = mDiv(dParent, { position: 'absolute', top: t, right: r, bottom: b, left: l }, id, inner, classes);
	let pos = dParent.style.position;
	if (pos != 'absolute') dParent.style.position = 'relative';
	if (isdef(styles)) mStyle(d, styles);
	return d;
}
var SHAPEFUNCS = {
	'circle': agCircle,
	'hex': agHex,
	'rect': agRect,
}

function mButton(caption, handler, dParent, styles, classes, id) {
	let x = mCreate('button');
	x.innerHTML = caption;
	if (isdef(handler)) x.onclick = handler;
	if (isdef(dParent)) toElem(dParent).appendChild(x);
	if (isdef(styles)) mStyle(x, styles);
	if (isdef(classes)) mClass(x, classes);
	if (isdef(id)) x.id = id;
	return x;
}

function mButtonX(dParent, handler, pos = 'tr', sz = 25, color = 'white') {
	let d2 = mDiv(dParent, { fg: color, w: sz, h: sz, pointer: 'cursor' }, null, `<i class="fa fa-times" style="font-size:${sz}px;"></i>`, 'btnX');
	mPlace(d2, pos, 2);
	d2.onclick = handler;
	return d2;
}

function mBy(id) {
	return document.getElementById(id);
}

function mCanvas(dParent, styles = {}, bstyles = {}, play = null, pause = null, origin = 'tl') {
	let cv = mCreate('canvas');
	mAppend(toElem(dParent), cv);
	addKeys({ w: 500, h: 500, bg: '#222', rounding: 10 }, styles);
	mStyle(cv, styles);
	let [w, h] = [cv.width, cv.height] = [styles.w, styles.h];
	let cx = cv.getContext('2d');
	let [x, y] = posToPoint(origin, w, h);
	cx.translate(x, y);
	if (!play) return { cv: cv, cx: cx, origin: { x: x, y: y }, x: 0, y: 0, w: w, h: h };
	mLinebreak(dParent)
	addKeys({ fz: 28, fg: 'skyblue', display: 'flex', ajcenter: true, w: styles.w }, bstyles)
	let controls = mPlayPause(dParent, bstyles, play, pause);
	return { cv: cv, cx: cx, origin: { x: x, y: y }, x: 0, y: 0, w: w, h: h, controls: controls.ui, play: controls.play, pause: controls.pause, stop: controls.play, stop: controls.pause };
}

function mCard(dParent, styles, classtr = '', id = null) {
	let classes = toWords("card300 wb " + classtr);
	return mDiv(dParent, styles, id, null, classes);
}

function mCardButton(caption, handler, dParent, styles, classtr = '', id = null) {
	let classes = toWords("card300 wb fett no_outline btn" + classtr);
	return mButton(caption, handler, dParent, styles, classes, id);
}

function mCardText(ckey, sz, color) {
	return is_jolly(ckey) ? '<span style="font-family:Algerian">jolly</span>' : `${ckey[0]}${mSuit(ckey, sz, color)}`;
}

function mCenter(d, gap) {
	mCenterFlex(d, true, false, true, gap);
}

function mCenterCenter(d, gap) {
	mCenterCenterFlex(d, gap);
}

function mCenterCenterFlex(d, gap) {
	mCenterFlex(d, true, true, true, gap);
}

function mCenterFlex(d, hCenter = true, vCenter = false, wrap = true, gap = null) {
	let styles = { display: 'flex' };
	if (hCenter) styles['justify-content'] = 'center';
	styles['align-content'] = vCenter ? 'center' : 'flex-start';
	if (wrap) styles['flex-wrap'] = 'wrap';
	if (gap) styles.gap = gap;
	mStyle(d, styles);
}

function mClass(d) {
	d = toElem(d);
	if (arguments.length == 2) {
		let arg = arguments[1];
		if (isString(arg) && arg.indexOf(' ') > 0) { arg = [toWords(arg)]; }
		else if (isString(arg)) arg = [arg];
		if (isList(arg)) {
			for (let i = 0; i < arg.length; i++) {
				d.classList.add(arg[i]);
			}
		}
	} else for (let i = 1; i < arguments.length; i++) d.classList.add(arguments[i]);
}

function mClass0(d) {
	d = toElem(d); d.className = '';
}

function mClassRemove(d) {
	d = toElem(d); for (let i = 1; i < arguments.length; i++) d.classList.remove(arguments[i]);
}

function mClassReplace(d, weg, her) {
	mClassRemove(d, weg); mClass(d, her);
}

function mClassToggle(d, classes) {
	let wlist = toWords(classes);
	d = toElem(d);
	for (const c of wlist) if (d.classList.contains(c)) mClassRemove(d, c); else mClass(d, c);
}

function mClear(d) {
	clearElement(toElem(d));
}

function mColFlex(dParent, chflex = [1, 5, 1], bgs) {
	let styles = { opacity: 1, display: 'flex', aitems: 'stretch', 'flex-flow': 'nowrap' };
	mStyle(dParent, styles);
	let res = [];
	for (let i = 0; i < chflex.length; i++) {
		let bg = isdef(bgs) ? bgs[i] : null;
		let d1 = mDiv(dParent, { flex: chflex[i], bg: bg });
		res.push(d1);
	}
	return res;
}

function mColorLetters(s, brightness) {
	return toLetters(s).map(x => `<div style='display:inline-block;transform:rotate(${rChoose([10, 5, -10, -5])}deg);color:${rColor(brightness)}'>${x == ' ' ? '&nbsp;' : x}</div>`).join('');
}

function mColorPickerBehavior(value, targetImage, elem, handler) {
	let hues = arrTake(colorHueWheel(value), 10);
	let colorPalette = hues.map(x => colorFrom(colorHSLBuild(x)));
	let palette = isdef(targetImage) ? colorPaletteFromImage(targetImage) : colorPalette;
	mStyle(elem, { bg: value });
	let inp = new JSColor(elem, { alpha: 'ff', closeButton: true, value: value, palette: palette, });
	inp.onInput = () => { let c = inp.toHEXAString(); handler(c); }
	return inp;
}

function mColorPickerControl(label, value, targetImage, dParent, handler, styles = { hpadding: 25 }) {
	let d = mDiv(dParent, styles);
	let hpad = valf(styles.hpadding, 6);
	let dLabel = mDiv(d, { 'vertical-align': 'top', w: '35%', align: 'right', hpadding: hpad, display: 'inline-block' }, null, label);
	let hues = arrTake(colorHueWheel(value), 10);
	let colorPalette = hues.map(x => colorFrom(colorHSLBuild(x)));
	let palette = isdef(targetImage) ? colorPaletteFromImage(targetImage) : colorPalette;
	let elem = mDiv(d, { w: '55%', hpadding: hpad, h: 24, rounding: hpad, display: 'inline-block' });
	let inp = new JSColor(elem, {
		alpha: 'ff',
		closeButton: true,
		value: value,
		palette: palette,
	});
	inp.onInput = () => { let c = inp.toHEXAString(); handler(c); }
	return inp;
}

function mConfine(n, modul, min, max) {
	rem = n % modul; n = n - rem;
	while (n < min) n += modul;
	while (n > max) n -= modul;
	return n;
}

function mCreate(tag, styles, id) {
	let d = document.createElement(tag); if (isdef(id)) d.id = id; if (isdef(styles)) mStyle(d, styles); return d;
}

function mCreateFrom(htmlString) {
	var div = document.createElement('div');
	div.innerHTML = htmlString.trim();
	return div.firstChild;
}

function mDataTable(reclist, dParent, rowstylefunc, headers, id, showheaders = true) {
	if (nundef(headers)) headers = get_keys(reclist[0]);
	let t = mTable(dParent, headers, showheaders);
	if (isdef(id)) t.id = `t${id}`;
	let rowitems = [];
	let i = 0;
	for (const u of reclist) {
		let rid = isdef(id) ? `r${id}_${i}` : null;
		r = mTableRow(t, u, headers, rid);
		if (isdef(rowstylefunc)) mStyle(r.div, rowstylefunc(u));
		rowitems.push({ div: r.div, colitems: r.colitems, o: u, id: rid, index: i });
		i++;
	}
	return { div: t, rowitems: rowitems };
}

function mDiv(dParent, styles, id, inner, classes, sizing) {
	dParent = toElem(dParent);
	let d = mCreate('div');
	if (dParent) mAppend(dParent, d);
	if (isdef(styles)) mStyle(d, styles);
	if (isdef(classes)) mClass(d, classes);
	if (isdef(id)) d.id = id;
	if (isdef(inner)) d.innerHTML = inner;
	if (isdef(sizing)) { setRect(d, sizing); }
	return d;
}

function mDiv100(dParent, styles, id, sizing = true) {
	let d = mDiv(dParent, styles, id); mSize(d, 100, 100, '%', sizing); return d;
}

function mDivItem(dParent, styles, id, content) {
	if (nundef(id)) id = getUID();
	let d = mDiv(dParent, styles, id, content);
	return mItem(id, { div: d });
}

function mDivLR(dParent, styles, id, innerlist, classes) {
	let d = mDiv(dParent, styles, id, `<div>${innerlist[0]}</div><div>${innerlist[1]}</div>`, classes);
	mStyle(d, { display: 'flex', 'justify-content': 'space-between', 'align-items': 'center' });
	return d;
}

function mDivLine(dParent, styles = {}, id = null, innerlist = ['', '', ''], classes = null) {
	addKeys({ w: '100%', box: true, padding: 4 }, styles);
	let d = mDiv(dParent, styles, id, `<div>${innerlist[0]}</div><div>${innerlist[1]}</div><div>${innerlist[2]}</div>`, classes);
	mStyle(d, { display: 'flex', 'justify-content': 'space-between', 'align-items': 'center' });
	return d;
}

function mDover(dParent, styles = {}, sizing = true) {
	let d = mDiv(dParent, styles);
	mIfNotRelative(dParent);
	mStyle(d, { position: 'absolute', left: 0, top: 0, w: '100%', h: '100%' });
	setRect(d, sizing);
	return d;
}

function mDraggable(item) {
	let d = iDiv(item);
	d.draggable = true;
	d.ondragstart = drag;
}

function mDroppable(item, handler, dragoverhandler) {
	let d = iDiv(item);
	d.ondragover = isdef(dragoverhandler) ? dragoverhandler : default_allowDrop;
	d.ondrop = handler;
}

function mEdit(label, value, dParent, handler, styles, classes, id) {
	let d = mDiv(dParent, styles);
	let hpad = valf(styles.hpadding, 4);
	let dLabel = mDiv(d, { w: '50%', align: 'right', hpadding: hpad, display: 'inline-block' }, null, label);
	let inp = mCreateFrom(`<div contenteditable="true" spellcheck="false">${value}</div>  `)
	mAppend(d, inp);
	mStyle(inp, { display: 'inline-block', w: '50%', align: 'left', hpadding: hpad });
	inp.addEventListener('keydown', unfocusOnEnter);
	inp.addEventListener('focusout', ev => { handler(inp.innerHTML, ev); });
	inp.onclick = ev => selectText(ev.target);
	if (isdef(classes)) mClass(inp, classes);
	if (isdef(id)) inp.id = id;
	return inp;
}

function mEditNumber(label, value, dParent, handler, styles, classes, id, triggerOnChange = false) {
	let d = mDiv(dParent, styles);
	let hpad = valf(styles.hpadding, 4);
	let dLabel = mDiv(d, { w: '50%', align: 'right', hpadding: hpad, display: 'inline-block' }, null, label);
	if (nundef(handler)) handler = x => console.log(x);
	let inp = mCreateFrom(`<div contenteditable="true" spellcheck="false">${value}</div>  `)
	mAppend(d, inp);
	mStyle(inp, { display: 'inline-block', w: '40%', align: 'left', hpadding: hpad });
	inp.addEventListener('keydown', unfocusOnEnter);
	inp.addEventListener('focusout', ev => { handler(inp.innerHTML, ev); });
	inp.onclick = ev => selectText(ev.target);
	if (isdef(classes)) mClass(inp, classes);
	if (isdef(id)) inp.id = id;
	return inp;
}

function mEditRange(label, value, min, max, step, dParent, handler, styles, classes, id, triggerOnChange = true) {
	let d = mDiv(dParent, styles);
	let hpad = valf(styles.hpadding, 4);
	let dLabel = mDiv(d, { w: '30%', align: 'right', hpadding: hpad, display: 'inline-block' }, null, label);
	let inpText = mCreateFrom(`<input type='number'  step=${step} min="${min}" max="${max}" value="${value}" ></input>`);
	let inp = mCreateFrom(`<input type="range" step=${step} min="${min}" max="${max}" value="${value}" ></input>`);
	mAppend(d, inpText);
	mAppend(d, inp);
	mStyle(inpText, { display: 'inline', w: '20%', align: 'left', hpadding: hpad });
	mStyle(inp, { display: 'inline', w: '40%', hpadding: hpad });
	inpText.onchange = (ev) => { inp.value = inpText.value; handler(inpText.value, ev); };
	inpText.onclick = ev => selectText(ev.target);
	inp.onchange = (ev) => { inpText.value = inp.value; handler(inpText.value, ev); };
	if (isdef(classes)) mClass(inp, classes);
	if (isdef(id)) inp.id = id;
	return inpText;
}

function mEditX(label, val, dParent, styles, classes, handler, id, opt = {}) {
	let defOptions = {
		alignLabel: 'right',
		fgLabel: 'silver',
		wminLabel: 120,
		alignInput: 'left',
		fgInput: 'white',
		wminInput: 50,
		wminRight: 120,
		align: 'center',
	}
	addKeys(defOptions, opt);
	let wminTotal = wminLabel + wminRight;
	if (nundef(styles)) styles = {};
	if (nundef(styles.wmin)) styles.wmin = 0;
	styles.wmin = Math.max(styles.wmin, wminTotal);
	styles.align = opt.align;
	let dOuter = mDiv(dParent, styles, id, null, classes);
	let dLabel = mDiv(dOuter, { fg: opt.fgLabel, wmin: opt.wminLabel, align: opt.alignLabel }, null, label);
	let dInput = mDiv(dOuter, { contenteditable: true, spellcheck: false, fg: opt.fgInput, wmin: opt.wminInput, align: opt.alignInput }, null, val);
	dInput.onfocusout = ev => handler(dInput.innerHTML, ev);
	dInput.onkeydown = (ev) => {
		if (ev.key === 'Enter') {
			ev.preventDefault();
			mBy('dummy').focus();
		}
	}
	return dInput;
}

function mEditableInput(dParent, label, val, styles, classes, id) {
	let labelElem = mCreateFrom(`<span>${label}</span>  `)
	let elem = mCreateFrom(`<span contenteditable="true" spellcheck="false">${val}</span>  `)
	elem.addEventListener('keydown', (ev) => {
		if (ev.key === 'Enter') {
			ev.preventDefault();
			mBy('dummy').focus();
		}
	});
	let dui = mDiv(dParent, { margin: 2 });
	mAppend(dui, labelElem);
	mAppend(dui, elem);
	if (isdef(styles)) {
		if (isdef(styles.wInput)) mStyle(elem, { wmin: styles.wInput });
		mStyle(elem, styles);
	}
	if (isdef(classes)) mStyle(elem, classes);
	if (isdef(id)) elem.id = id;
	return elem;
}

function mEditableOnEdited(id, dParent, label, initialVal, onEdited, onOpening, styles, classes) {
	let inp = mEditableInput(dParent, label, initialVal, styles, classes);
	inp.id = id;
	if (isdef(onOpening)) { inp.addEventListener('focus', ev => onOpening(ev)); }
	inp.addEventListener('focusout', ev => {
		window.getSelection().removeAllRanges();
		if (isdef(onEdited)) onEdited(inp.innerHTML, ev);
	});
	return inp;
}

function mFade(d, ms = 800, callback = null) {
	return mAnimateTo(d, 'opacity', 0, callback, ms);
}

function mFadeClear(d, ms = 800, callback = null) {
	return mAnimateTo(d, 'opacity', 0, () => { mClear(d); if (callback) callback(); }, ms);
}

function mFadeClearShow(d, ms = 800, callback = null) {
	return mAnimate(d, 'opacity', [1, 0], () => { mClear(d); if (callback) callback(); }, ms);
}

function mFadeRemove(d, ms = 800, callback = null) {
	return mAnimateTo(d, 'opacity', 0, () => { mRemove(d); if (callback) callback(); }, ms);
}

function mFall(d, ms = 800, dist = 50) {
	toElem(d).animate([{ opacity: 0, transform: `translateY(-${dist}px)` }, { opacity: 1, transform: 'translateY(0px)' },], { fill: 'both', duration: ms, easing: 'ease' });
}

function mFlex(d, or = 'h') {
	d = toElem(d);
	d.style.display = 'flex';
	d.style.flexFlow = (or == 'v' ? 'column' : 'row') + ' ' + (or == 'w' ? 'wrap' : 'nowrap');
}

function mFlexColumn(d, or = 'h') {
	d = toElem(d);
	d.style.display = 'flex';
	d.style.flexFlow = (or == 'v' ? 'column' : 'row') + ' ' + (or == 'w' ? 'wrap' : 'nowrap');
	d.style.alignItems = 'stretch';
	d.style.alignContent = 'stretch';
	d.style.justiifyItems = 'stretch';
	d.style.justifyContent = 'stretch';
}

function mFlexEvenly(d) {
	let styles = { display: 'flex' };
	styles['justify-content'] = 'space-evenly';
	mStyle(d, styles);
}

function mFlexLR(d) {
	mStyle(d, { display: 'flex', 'justify-content': 'space-between', 'align-items': 'center' });
}

function mFlexSpacebetween(d) {
	mFlexLR(d);
}

function mFlexWrap(d) {
	mFlex(d, 'w');
}

function mFlip(card, ms, callback) {
	let a = mAnimate(iDiv(card), 'transform', [`scale(1,1)`, `scale(0,1)`],
		() => {
			if (card.faceUp) face_down(card); else face_up(card);
			mAnimate(iDiv(card), 'transform', [`scale(0,1)`, `scale(1,1)`], callback, ms / 2, 'ease-in', 0, 'both');
		},
		ms / 2, 'ease-out', 0, 'both');
}

function mForm(dParent) {
	return mAppend(dParent, mCreate('form'));
}

function mFromPoint(x, y) {
	var element, elements = [];
	var old_visibility = [];
	while (true) {
		element = document.elementFromPoint(x, y);
		if (!element || element === document.documentElement) {
			break;
		}
		elements.push(element);
		old_visibility.push(element.style.visibility);
		element.style.visibility = 'hidden';
	}
	for (var k = 0; k < elements.length; k++) {
		elements[k].style.visibility = old_visibility[k];
	}
	elements.reverse();
	return elements;
}

function mGetStyle(elem, prop) {
	let val;
	elem = toElem(elem);
	if (prop == 'bg') { val = getStyleProp(elem, 'background-color'); if (isEmpty(val)) return getStyleProp(elem, 'background'); }
	else if (isdef(STYLE_PARAMS[prop])) { val = getStyleProp(elem, STYLE_PARAMS[prop]); }
	else {
		switch (prop) {
			case 'vmargin': val = stringBefore(elem.style.margin, ' '); break;
			case 'hmargin': val = stringAfter(elem.style.margin, ' '); break;
			case 'vpadding': val = stringBefore(elem.style.padding, ' '); break;
			case 'hpadding': val = stringAfter(elem.style.padding, ' '); break;
			case 'box': val = elem.style.boxSizing; break;
			case 'dir': val = elem.style.flexDirection; break;
		}
	}
	if (nundef(val)) val = getStyleProp(elem, prop);
	if (val.endsWith('px')) return firstNumber(val); else return val;
}

function mGrid(rows, cols, dParent, styles = {}) {
	let d = mDiv(dParent, styles);
	d.style.gridTemplateColumns = 'repeat(' + cols + ',1fr)';
	d.style.gridTemplateRows = 'repeat(' + rows + ',1fr)';
	d.style.display = 'inline-grid';
	d.style.padding = valf(styles.padding, styles.gap) + 'px';
	return d;
}

function mHide(d, ms = 0) {
	if (ms > 0) mFade(d, ms); else mStyle(d, { opacity: 0 });
}

function mIfNotRelative(d) {
	if (isEmpty(d.style.position)) d.style.position = 'relative';
}

function mImage() {
	return mImg(...arguments);
}

function mImg(path, dParent, styles, classes, callback) {
	let d = mCreate('img');
	if (isdef(callback)) d.onload = callback;
	d.src = path;
	if (isdef(dParent)) mAppend(dParent, d);
	if (isdef(styles)) mStyle(d, styles);
	if (isdef(classes)) mClass(d, classes);
	if (isdef(styles.w)) d.setAttribute('width', styles.w + 'px');
	if (isdef(styles.h)) d.setAttribute('height', styles.h + 'px');
	return d;
}

function mInput(dParent, styles, id, placeholder, classtr = 'input', tabindex = null, value = '') {
	let html = `<input type="text" id=${id} class="${classtr}" placeholder="${valf(placeholder, '')}" tabindex="${tabindex}" value="${value}">`;
	let d = mAppend(dParent, mCreateFrom(html));
	if (isdef(styles)) mStyle(d, styles);
	return d;
}

function mInsert(dParent, el, index = 0) {
	dParent.insertBefore(el, dParent.childNodes[index]); return el;
}

function mInsertAfter(dParent, el, index = 0) {
	if (dParent.childNodes.length == index) mAppend(dParent, el);
	else mInsert(dParent, el, index + 1);
}

function mInsertAt(dParent, el, index = 0) {
	mInsert(dParent, el, index);
}

function mInsertFirst(dParent, el) {
	mInsert(dParent, el, 0);
}

function mItem(id, diDOM, di = {}, addSizing = false) {
	let item = di;
	id = isdef(id) ? id : isdef(diDOM) && isdef(diDOM.div) && !isEmpty(diDOM.div.id) ? diDOM.div.id : getUID();
	item.id = iRegister(item, id);
	if (isdef(diDOM) && isdef(diDOM.div)) { diDOM.div.id = id; iAdd(item, diDOM); }
	if (addSizing) {
		if (nundef(item.sizing)) item.sizing = 'sizeToContent';
		if (nundef(item.positioning)) { item.positioning = 'absolute'; }
		if (nundef(item.posType)) { item.posType = 'center'; }
		if (isdef(diDOM) && item.sizing == 'sizeToContent') iMeasure(item, item.sizingOptions);
	}
	return item;
}

function mLine(dParent, styles) {
	return mDiv(dParent, styles, null, '<hr>');
}

function mLinebreak(dParent, gap) {
	dParent = toElem(dParent);
	let d;
	let display = getComputedStyle(dParent).display;
	if (display == 'flex') {
		d = mDiv(dParent, { fz: 2, 'flex-basis': '100%', h: 0, w: '100%' }, null, ' &nbsp; ');
	} else {
		d = mDiv(dParent, {}, null, '<br>');
	}
	if (isdef(gap)) { d.style.minHeight = gap + 'px'; d.innerHTML = ' &nbsp; '; d.style.opacity = .2; }
	return d;
}

function mLinebreakFlex(dParent, gap) {
	dParent = toElem(dParent);
	let d = mDiv(dParent, { fz: 2, 'flex-basis': '100%', h: 0, w: '100%' }, null, ' &nbsp; ');
	if (isdef(gap)) { d.style.minHeight = gap + 'px'; d.innerHTML = ' &nbsp; '; d.style.opacity = .2; }
	return d;
}

function mLink(href, dParent, styles, id, inner, classes, sizing) {
	let d = mCreate('a');
	if (dParent) mAppend(dParent, d);
	d.href = valf(href, '#');
	if (isdef(styles)) mStyle(d, styles);
	if (isdef(classes)) mClass(d, classes);
	if (isdef(id)) d.id = id;
	if (isdef(inner)) d.innerHTML = inner;
	if (isdef(sizing)) { setRect(d, sizing); }
	return d;
}

function mMagnifyOnHoverControl(elem) {
	elem.onmouseenter = ev => { if (ev.ctrlKey) mClass(elem, 'magnify_on_hover'); }
	elem.onmouseleave = ev => mClassRemove(elem, 'magnify_on_hover');
}

function mMagnifyOnHoverControlPopup(elem) {
	elem.onmouseenter = ev => {
		if (ev.ctrlKey) {
			let r = getRect(elem, document.body);
			let popup = mDiv(document.body, { rounding: 4, position: 'absolute', top: r.y, left: r.x }, 'popup');
			let clone = elem.cloneNode(true);
			popup.appendChild(clone);
			mClass(popup, 'doublesize')
			popup.onmouseleave = () => popup.remove();
		}
	}
}

function mMagnifyOnHoverControlRemove(elem) {
	elem.onmouseenter = elem.onmouseleave = null;
	mClassRemove(elem, 'magnify_on_hover');
}

function mMeasure(d) {
	let r = getRect(d); mStyle(d, { w: r.w, h: r.h }); return r;
}

function mNode(o, dParent, title) {
	recConvertLists(o);
	console.log('mNode o', o);
	let d = mCreate('div');
	mYaml(d, o);
	let pre = d.getElementsByTagName('pre')[0];
	pre.style.fontFamily = 'inherit';
	if (isdef(title)) mInsert(d, mText(title));
	if (isdef(dParent)) mAppend(dParent, d);
	if (isDict(o)) d.style.textAlign = 'left';
	return d;
}

function mPlace(elem, pos, offx, offy) {
	elem = toElem(elem);
	pos = pos.toLowerCase();
	let dParent = elem.parentNode; if (dParent.style.position != 'absolute') dParent.style.position = 'relative';
	let vert = valf(offx, 0);
	let hor = isdef(offy) ? offy : vert;
	if (pos[0] == 'c' || pos[1] == 'c') {
		let rParent = getRect(dParent);
		let [wParent, hParent] = [rParent.w, rParent.h];
		let rElem = getRect(elem);
		let [wElem, hElem] = [rElem.w, rElem.h];
		switch (pos) {
			case 'cc': mStyle(elem, { position: 'absolute', left: hor + (wParent - wElem) / 2, top: vert + (hParent - hElem) / 2 }); break;
			case 'tc': mStyle(elem, { position: 'absolute', left: hor + (wParent - wElem) / 2, top: vert }); break;
			case 'bc': mStyle(elem, { position: 'absolute', left: hor + (wParent - wElem) / 2, bottom: vert }); break;
			case 'cl': mStyle(elem, { position: 'absolute', left: hor, top: vert + (hParent - hElem) / 2 }); break;
			case 'cr': mStyle(elem, { position: 'absolute', right: hor, top: vert + (hParent - hElem) / 2 }); break;
		}
		return;
	}
	let di = { t: 'top', b: 'bottom', r: 'right', l: 'left' };
	elem.style.position = 'absolute';
	elem.style[di[pos[0]]] = hor + 'px'; elem.style[di[pos[1]]] = vert + 'px';
}

function mPlayPause(dParent, styles = {}, handle_play = null, handle_pause = null) {
	if (!handle_play) handle_play = audio_onclick_pp;
	if (!handle_pause) handle_pause = handle_play;
	let html = `
    <div id="dButtons">
      <a id="bPlay" href="#">
        <i class="fa fa-play fa-2x"></i>
      </a>
      <a id="bPause" href="#" style="display: none">
        <i class="fa fa-pause fa-2x"></i>
      </a>
    </div>
  `;
	let pp = mCreateFrom(html);
	mAppend(dParent, pp);
	addKeys({ fz: 28, fg: 'lightgreen', display: 'flex', ajcenter: true, w: getRect(dParent).w }, styles);
	mStyle(pp, styles);
	mBy('bPlay').onclick = () => { hide0('bPlay'); show0('bPause'); handle_play(); }
	mBy('bPause').onclick = () => { hide0('bPause'); show0('bPlay'); handle_pause(); }
	let [fg, fz] = [styles.fg, styles.fz];
	mStyle(mBy('bPlay'), { fg: fg, fz: fz })
	mStyle(mBy('bPause'), { fg: fg, fz: fz })
	return { ui: pp, play: () => fireClick(mBy('bPlay')), pause: () => fireClick(mBy('bPause')) };
}

function mPopup(content, dParent, styles, id) {
	if (isdef(mBy(id))) mRemove(id);
	mIfNotRelative(dParent);
	if (nundef(styles)) styles = { top: 0, left: 0 };
	styles.position = 'absolute';
	let d1 = mDiv(dParent, styles, valf(id, getUID()), content);
	return d1;
}

function mPos(d, x, y, unit = 'px') {
	mStyle(d, { left: x, top: y, position: 'absolute' }, unit);
}

function mPulse(d, ms, callback = null) {
	mClass(d, 'onPulse'); TO[getUID()] = setTimeout(() => { mClassRemove(d, 'onPulse'); if (callback) callback(); }, ms);
}

function mPulse1(d, callback) {
	mPulse(d, 1000, callback);
}

function mPulse2(d, callback) {
	mPulse(d, 2000, callback);
}

function mPulse3(d, callback) {
	mPulse(d, 3000, callback);
}

function mPuppet(key, dParent, styles = {}, dist = 250) {
	if (nundef(dParent)) dParent = document.body; else dParent = toElem(dParent);
	addKeys({ position: 'fixed', fz: 40, left: 40, top: 40 }, styles);
	dPuppet = miPic(key, dParent, styles);
	aRollby(dPuppet, dist);
}

function mRadio(label, val, name, dParent, styles = {}, handler, group_id, is_on) {
	let cursor = styles.cursor; delete styles.cursor;
	let d = mDiv(dParent, styles, group_id + '_' + val);
	let id = isdef(group_id) ? `i_${group_id}_${val}` : getUID();
	let type = isdef(group_id) ? 'radio' : 'checkbox';
	let checked = isdef(is_on) ? is_on : false;
	let inp = mCreateFrom(`<input class='radio' id='${id}' type="${type}" name="${name}" value="${val}">`);
	if (checked) inp.checked = true;
	let text = mCreateFrom(`<label for='${inp.id}'>${label}</label>`);
	if (isdef(cursor)) { inp.style.cursor = text.style.cursor = cursor; }
	mAppend(d, inp);
	mAppend(d, text);
	if (isdef(handler)) {
		inp.onclick = ev => {
			ev.cancelBubble = true;
			if (handler == 'toggle') {
			} else if (isdef(handler)) {
				handler(val);
			}
		};
	}
	return d;
}

function mRadio1(label, val, dParent, styles = {}, handler, group_id) {
	let cursor = styles.cursor; delete styles.cursor;
	let d = mDiv(dParent, styles, group_id + '_' + val);
	let inp = mCreateFrom(`<input class='radio' id='i_${group_id}_${val}' type="radio" name="${group_id}" value="${val}" >`);
	let text = mCreateFrom(`<label for='${inp.id}'>${label}</label>`);
	if (isdef(cursor)) { inp.style.cursor = text.style.cursor = cursor; }
	mAppend(d, inp);
	mAppend(d, text);
	if (isdef(handler)) d.onclick = () => handler(val);
	return d;
}

function mRadioGroup(dParent, styles, id, legend, legendstyles) {
	let f = mCreate('fieldset');
	f.id = id;
	if (isdef(styles)) mStyle(f, styles);
	if (isdef(legend)) {
		let l = mCreate('legend');
		l.innerHTML = legend;
		mAppend(f, l);
		if (isdef(legendstyles)) { mStyle(l, legendstyles); }
	}
	mAppend(dParent, f);
	return f;
}

function mRadioToggle(label, val, dParent, styles = {}, is_on = true) {
	let cursor = styles.cursor; delete styles.cursor;
	let d = mDiv(dParent, styles);
	let id = getUID();
	let inp = mCreateFrom(`<input class='radio' id='${id}' type="checkbox" checked="${is_on}" value="${val}" >`);
	let text = mCreateFrom(`<label for='${id}'>${label}</label>`);
	if (isdef(cursor)) { inp.style.cursor = text.style.cursor = cursor; }
	mAppend(d, inp);
	mAppend(d, text);
	return d;
}

function mRemove(elem) {
	elem = toElem(elem);
	var a = elem.attributes, i, l, n;
	if (a) {
		for (i = a.length - 1; i >= 0; i -= 1) {
			n = a[i].name;
			if (typeof elem[n] === 'function') {
				elem[n] = null;
			}
		}
	}
	a = elem.childNodes;
	if (a) {
		l = a.length;
		for (i = a.length - 1; i >= 0; i -= 1) {
			mRemove(elem.childNodes[i]);
		}
	}
	elem.remove();
}

function mRemoveChildrenFromIndex(dParent, i) {
	while (dParent.children[i]) { mRemove(dParent.children[i]); }
}

function mRise(d, ms = 800) {
	toElem(d).animate([{ opacity: 0, transform: 'translateY(50px)' }, { opacity: 1, transform: 'translateY(0px)' },], { fill: 'both', duration: ms, easing: 'ease' });
}

function mScale(d, scale) {
	mStyle(d, { 'transform-origin': 'top', transform: `scale(${scale})` });
}

function mSearch(handler, dParent, styles, classes) {
	let html = `
    <form id="fSearch" action="javascript:void(0);" class='form'>
      <label>Keywords:</label>
      <input id="iKeywords" type="text" name="keywords" style="flex-grow:1" />
      <button type="submit" class='hop1' >Search</button>
    </form>
  `;
	let elem = mCreateFrom(html);
	mAppend(dParent, elem);
	elem.onsubmit = handler;
	return elem;
}

function mSection(styles = {}, id, inner, tag, classes) {
	let d = mBy(id);
	addKeys({ position: 'relative' }, styles);
	mStyle(d, styles);
	if (isdef(tag) && isdef(inner)) inner = `<${tag}>${inner}</${tag}>`;
	if (isdef(inner)) d.innerHTML = inner;
	if (isdef(classes)) mClass(d, classes);
	return d;
}

function mSelectTableRow(r, color = 'pink') {
	let t = r.parentNode;
	for (const ch of t.children) mStyle(ch, { background: 'transparent' });
	mStyle(r, { background: color });
}

function mShield(dParent, styles = { bg: '#00000020' }, id = null, classnames = null, hideonclick = false) {
	dParent = toElem(dParent);
	let d = mDiv(dParent, styles, id, classnames);
	lookupAddIfToList(DA, ['shields'], d);
	mIfNotRelative(dParent);
	mStyle(d, { position: 'absolute', left: 0, top: 0, w: '100%', h: '100%' });
	if (hideonclick) d.onclick = ev => { evNoBubble(ev); d.remove(); };
	else d.onclick = ev => { evNoBubble(ev); };
	mClass(d, 'topmost');
	return d;
}

function mShieldsOff() {
	if (nundef(DA.shields)) return; for (const d of DA.shields) d.remove();
}

function mShow(d, ms = 0) {
	if (ms > 0) mAppear(d, ms); else mStyle(d, { opacity: 1 });
}

function mShrink(d, x = .75, y = .75, ms = 800, callback = null) {
	let anim = toElem(d).animate([{ transform: `scale(${1},${1})` }, { transform: `scale(${x},${y})` },], { fill: 'both', duration: ms, easing: 'ease' });
	anim.onfinish = callback;
}

function mShrinkTranslate(child, scale, newParent, ms = 800, callback) {
	let [dx, dy] = get_screen_distance(child, newParent);
	mAnimate(child, 'transform', [`translateX(${dx}px) translateY(${dy}px) scale(${scale})`], callback, ms, 'ease');
}
var MyEasing = 'cubic-bezier(1,-0.03,.86,.68)';

function mShrinkUp(d, x = .75, y = 0, ms = 800, callback = null) {
	let anim = toElem(d).animate([{ transform: `scale(${1},${1})`, opacity: 1 }, { transform: `scale(${x},${y})`, opacity: 0 },], { fill: 'none', duration: ms, easing: 'ease' });
	anim.onfinish = mClear(d);
}

function mSize(d, w, h, unit = 'px', sizing) {
	if (nundef(h)) h = w; mStyle(d, { width: w, height: h }, unit); if (isdef(sizing)) setRect(d, sizing);
}

function mSpan(dParent, styles, innerHTML) {
	let d = mCreate('span');
	if (isdef(styles)) mStyle(d, styles);
	if (isdef(innerHTML)) d.innerHTML = innerHTML;
	if (isdef(dParent)) mAppend(dParent, d);
	return d;
}

function mStamp(d1, text, color, sz) {
	mStyle(d1, { position: 'relative' });
	let r = getRect(d1);
	let [w, h] = [r.w, r.h];
	color = valf(color, 'black');
	sz = valf(sz, r.h / 7);
	let [padding, border, rounding, angle] = [sz / 10, sz / 6, sz / 8, rChoose([-16, -14, -10, 10, 14])];
	let d2 = mDiv(d1, {
		fg: color,
		position: 'absolute', top: 25, left: 5,
		transform: `rotate(${angle}deg)`,
		fz: sz,
		hpadding: 2,
		vpadding: 0,
		rounding: rounding,
		border: `${border}px solid ${colorTrans(color, .8)}`,
		'-webkit-mask-size': `${w}px ${h}px`,
		'-webkit-mask-position': `50% 50%`,
		'-webkit-mask-image': 'url("../base/assets/images/textures/grunge.png")',
		weight: 400,
		display: 'inline-block',
		'text-transform': 'uppercase',
		family: 'blackops',
		'mix-blend-mode': 'multiply',
	}, null, text);
}

function mStyle(elem, styles, unit = 'px') {
	elem = toElem(elem);
	let bg, fg;
	if (isdef(styles.bg) || isdef(styles.fg)) {
		[bg, fg] = colorsFromBFA(styles.bg, styles.fg, styles.alpha);
	}
	if (isdef(styles.vpadding) || isdef(styles.hpadding)) {
		styles.padding = valf(styles.vpadding, 0) + unit + ' ' + valf(styles.hpadding, 0) + unit;
	}
	if (isdef(styles.vmargin) || isdef(styles.hmargin)) {
		styles.margin = valf(styles.vmargin, 0) + unit + ' ' + valf(styles.hmargin, 0) + unit;
	}
	if (isdef(styles.upperRounding) || isdef(styles.lowerRounding)) {
		let rtop = '' + valf(styles.upperRounding, 0) + unit;
		let rbot = '' + valf(styles.lowerRounding, 0) + unit;
		styles['border-radius'] = rtop + ' ' + rtop + ' ' + rbot + ' ' + rbot;
	}
	if (isdef(styles.box)) styles['box-sizing'] = 'border-box';
	if (isdef(styles.round)) styles['border-radius'] = '50%';
	for (const k in styles) {
		let val = styles[k];
		let key = k;
		if (isdef(STYLE_PARAMS[k])) key = STYLE_PARAMS[k];
		else if (k == 'font' && !isString(val)) {
			let fz = f.size; if (isNumber(fz)) fz = '' + fz + 'px';
			let ff = f.family;
			let fv = f.variant;
			let fw = isdef(f.bold) ? 'bold' : isdef(f.light) ? 'light' : f.weight;
			let fs = isdef(f.italic) ? 'italic' : f.style;
			if (nundef(fz) || nundef(ff)) return null;
			let s = fz + ' ' + ff;
			if (isdef(fw)) s = fw + ' ' + s;
			if (isdef(fv)) s = fv + ' ' + s;
			if (isdef(fs)) s = fs + ' ' + s;
			elem.style.setProperty(k, s);
			continue;
		} else if (k == 'classname') {
			mClass(elem, styles[k]);
		} else if (k == 'border') {
			if (isNumber(val)) val = `solid ${val}px ${isdef(styles.fg) ? styles.fg : '#ffffff80'}`;
			if (val.indexOf(' ') < 0) val = 'solid 1px ' + val;
		} else if (k == 'ajcenter') {
			elem.style.setProperty('justify-content', 'center');
			elem.style.setProperty('align-items', 'center');
		} else if (k == 'layout') {
			if (val[0] == 'f') {
				val = val.slice(1);
				elem.style.setProperty('display', 'flex');
				elem.style.setProperty('flex-wrap', 'wrap');
				let hor, vert;
				if (val.length == 1) hor = vert = 'center';
				else {
					let di = { c: 'center', s: 'start', e: 'end' };
					hor = di[val[1]];
					vert = di[val[2]];
				}
				let justStyle = val[0] == 'v' ? vert : hor;
				let alignStyle = val[0] == 'v' ? hor : vert;
				elem.style.setProperty('justify-content', justStyle);
				elem.style.setProperty('align-items', alignStyle);
				switch (val[0]) {
					case 'v': elem.style.setProperty('flex-direction', 'column'); break;
					case 'h': elem.style.setProperty('flex-direction', 'row'); break;
				}
			} else if (val[0] == 'g') {
				val = val.slice(1);
				elem.style.setProperty('display', 'grid');
				let n = allNumbers(val);
				let cols = n[0];
				let w = n.length > 1 ? '' + n[1] + 'px' : 'auto';
				elem.style.setProperty('grid-template-columns', `repeat(${cols}, ${w})`);
				elem.style.setProperty('place-content', 'center');
			}
		} else if (k == 'layflex') {
			elem.style.setProperty('display', 'flex');
			elem.style.setProperty('flex', '0 1 auto');
			elem.style.setProperty('flex-wrap', 'wrap');
			if (val == 'v') { elem.style.setProperty('writing-mode', 'vertical-lr'); }
		} else if (k == 'laygrid') {
			elem.style.setProperty('display', 'grid');
			let n = allNumbers(val);
			let cols = n[0];
			let w = n.length > 1 ? '' + n[1] + 'px' : 'auto';
			elem.style.setProperty('grid-template-columns', `repeat(${cols}, ${w})`);
			elem.style.setProperty('place-content', 'center');
		}
		if (key == 'font-weight') { elem.style.setProperty(key, val); continue; }
		else if (key == 'background-color') elem.style.background = bg;
		else if (key == 'color') elem.style.color = fg;
		else if (key == 'opacity') elem.style.opacity = val;
		else if (key == 'wrap') elem.style.flexWrap = 'wrap';
		else if (startsWith(k, 'dir')) {
			isCol = val[0] == 'c';
			elem.style.setProperty('flex-direction', 'column');
		} else if (key == 'flex') {
			if (isNumber(val)) val = '' + val + ' 1 0%';
			elem.style.setProperty(key, makeUnitString(val, unit));
		} else {
			elem.style.setProperty(key, makeUnitString(val, unit));
		}
	}
}

function mStyleGet(elem, prop) {
	return mGetStyle(elem, prop);
}

function mStyleOrClass(elem, st) {
	if (isString(st)) mClass(elem, st); else mStyle(elem, st);
}

function mStyleRemove(elem, prop) {
	if (isdef(STYLE_PARAMS[prop])) prop = STYLE_PARAMS[prop];
	elem.style.removeProperty(prop);
}

function mStyleUndo(ui, styles = {}) {
	for (const k in styles) {
		let key = valf(STYLE_PARAMS[k], k);
		ui.style[key] = null;
	}
}

function mSuit(ckey, sz = 20, color = null) {
	let suit = ckey.length == 1 ? ckey : ckey[1];
	let di = { S: '&spades;', H: '&hearts;', D: '&diams;', C: '&clubs;' };
	color = valf(color, suit == 'H' || suit == 'D' ? 'red' : 'black');
	let html = `<span style='color:${color};font-size:${sz}px'>${di[suit]}</span>`;
	return html;
}

function mSym(key, dParent, styles = {}, pos, classes) {
	let info = Syms[key];
	styles.display = 'inline-block';
	let family = info.family;
	styles.family = family;
	let sizes;
	if (isdef(styles.sz)) { sizes = mSymSizeToBox(info, styles.sz, styles.sz); }
	else if (isdef(styles.w) && isdef(styles.h)) { sizes = mSymSizeToBox(info, styles.w, styles.h); }
	else if (isdef(styles.fz)) { sizes = mSymSizeToFz(info, styles.fz); }
	else if (isdef(styles.h)) { sizes = mSymSizeToH(info, styles.h); }
	else if (isdef(styles.w)) { sizes = mSymSizeToW(info, styles.w); }
	else { sizes = mSymSizeToFz(info, 25); }
	styles.fz = sizes.fz;
	styles.w = sizes.w;
	styles.h = sizes.h;
	styles.align = 'center';
	if (isdef(styles.bg) && info.family != 'emoNoto') { styles.fg = styles.bg; delete styles.bg; }
	let x = mDiv(dParent, styles, null, info.text);
	if (isdef(classes)) mClass(x, classes);
	if (isdef(pos)) { mPlace(x, pos); }
	return x;
}

function mSymSizeToBox(info, w, h) {
	let fw = w / info.w;
	let fh = h / info.h;
	let f = Math.min(fw, fh);
	return { fz: 100 * f, w: info.w * f, h: info.h * f };
}

function mSymSizeToFz(info, fz) {
	let f = fz / 100; return { fz: fz, w: info.w * f, h: info.h * f };
}

function mSymSizeToH(info, h) {
	let f = h / info.h; return { fz: 100 * f, w: info.w * f, h: h };
}

function mSymSizeToW(info, w) {
	let f = w / info.w; return { fz: 100 * f, w: w, h: info.h * f };
}

function mSymText(s, dParent, styles = {}, pos, classes) {
	styles.display = 'inline-block';
	styles.w = valfi(styles.w, styles.sz, styles.h, '25%');
	styles.h = valfi(styles.h, styles.sz, styles.w, styles.fz, '25%');
	styles.fz = valfi(styles.fz, styles.sz * 4 / 5, styles.h * 4 / 5, styles.w * 2, '20%');
	styles.align = 'center';
	let x = mDiv(dParent, styles, null, s); mCenterCenterFlex(x);
	if (isdef(classes)) mClass(x, classes);
	if (isdef(pos)) { mPlace(x, pos); }
	return x;
}

function mTable(dParent, headers, showheaders, styles = { mabottom: 0 }, className = 'table') {
	let d = mDiv(dParent);
	let t = mCreate('table');
	mAppend(d, t);
	if (isdef(className)) mClass(t, className);
	if (isdef(styles)) mStyle(t, styles);
	if (showheaders) {
		let code = `<tr>`;
		for (const h of headers) {
			code += `<th>${h}</th>`
		}
		code += `</tr>`;
		t.innerHTML = code;
	}
	return t;
}

function mTableCol(r, val) {
	let col = mCreate('td');
	mAppend(r, col);
	if (isdef(val)) col.innerHTML = val;
	return col;
}

function mTableCommandify(rowitems, di) {
	for (const item of rowitems) {
		for (const index in di) {
			let colitem = item.colitems[index];
			colitem.div.innerHTML = di[index](item, colitem.val);
		}
	}
}

function mTableCommandifyList(rowitem, val, func) {
	let names = isString(val) ? val.replaceAll(' ', ',').split(',') : val;
	let html = '';
	for (const name of names) {
		html += func(rowitem, name);
	}
	return html;
}

function mTableHeader(t, val) {
	let col = mCreate('th');
	mAppend(t.firstChild, col);
	col.innerHTML = val;
	return col;
}

function mTableRow(t, o, headers, id) {
	let elem = mCreate('tr');
	if (isdef(id)) elem.id = id;
	mAppend(t, elem);
	let colitems = [];
	for (const k of headers) {
		let val = isdef(o[k]) ? isDict(o[k]) ? JSON.stringify(o[k]) : isList(o[k]) ? o[k].join(', ') : o[k] : '';
		let col = mTableCol(elem, val);
		colitems.push({ div: col, key: k, val: val });
	}
	return { div: elem, colitems: colitems };
}

function mTableTransition(d, ms = 800) {
	toElem(d).animate([{ opacity: .25 }, { opacity: 1 },], { fill: 'both', duration: ms, easing: 'ease' });
}

function mTag(tag, inner = null, dParent = null, styles = {}, id = null, classes = null) {
	let el = mCreate(tag);
	if (inner) el.innerHTML = inner;
	if (dParent) mAppend(dParent, el);
	if (styles) mStyle(el, styles);
	if (id) el.id = id;
	if (classes) mClass(el, classes);
	return el;
}
const STYLE_PARAMS = {
	align: 'text-align',
	aspectRatio: 'aspect-ratio',
	bg: 'background-color',
	dir: 'flex-direction',
	fg: 'color',
	hgap: 'column-gap',
	vgap: 'row-gap',
	jcontent: 'justify-content',
	jitems: 'justify-items',
	justify: 'justify-content',
	acontent: 'align-content',
	aitems: 'align-items',
	matop: 'margin-top',
	maleft: 'margin-left',
	mabottom: 'margin-bottom',
	maright: 'margin-right',
	origin: 'transform-origin',
	overx: 'overflow-x',
	overy: 'overflow-y',
	patop: 'padding-top',
	paleft: 'padding-left',
	pabottom: 'padding-bottom',
	paright: 'padding-right',
	place: 'place-items',
	rounding: 'border-radius',
	w: 'width',
	h: 'height',
	wmin: 'min-width',
	hmin: 'min-height',
	wmax: 'max-width',
	hmax: 'max-height',
	fontSize: 'font-size',
	fz: 'font-size',
	family: 'font-family',
	weight: 'font-weight',
	x: 'left',
	y: 'top',
	z: 'z-index'
};

function mText(text, dParent, styles, classes) {
	if (!isString(text)) text = text.toString();
	let d = mDiv(dParent);
	if (!isEmpty(text)) { d.innerHTML = text; }
	if (isdef(styles)) mStyle(d, styles);
	if (isdef(classes)) mClass(d, classes);
	return d;
}

function mTextArea(rows, cols, dParent, styles = {}, id) {
	let html = `<textarea id="${id}" rows="${rows}" cols="${cols}" wrap="hard"></textarea>`;
	let t = mCreateFrom(html);
	mAppend(dParent, t);
	mStyle(t, styles);
	return t;
}

function mTextWidth(txt, fz = 16) {
	let len = txt.length;
	let wprox = (len + 1.5) * fz / 2;
	return wprox;
}

function mToggle(label, dParent, styles = {}, handler, is_on, styleyes, styleno, classes = null) {
	let cursor = styles.cursor; delete styles.cursor;
	let name = replaceWhite(label);
	let checked = isdef(is_on) ? is_on : false;
	let b = mButton(label, null, dParent, styles, classes);
	mClass(b, 'noactive');
	b.setAttribute('checked', checked);
	b.onclick = ev => {
		ev.cancelBubble = true;
		let b = ev.target;
		assertion(b == ev.target, 'NOOOOOOOOOOOOOOOOOOOOOOO')
		let oldval = b.getAttribute('checked') == 'false' ? false : true;
		let newval = oldval ? false : true;
		if (newval === true) {
			mStyle(b, styleyes);
		} else {
			mStyle(b, styleno);
		}
		b.setAttribute('checked', newval);
		handler(name, newval);
	};
	return b;
}

function mTogglebar(di, handler, styleyes, styleno, dParent, styles, bstyles, id, classes, bclasses) {
	let d = mDiv(dParent, styles, id, classes);
	for (const k in di) {
		mToggle(k, d, bstyles, handler, di[k], styleyes, styleno, bclasses);
	}
}

function mToolbar(buttons, handler, dParent, styles = {}, bstyles = {}, id = null, classes = null, bclasses = null) {
	let d = mDiv(dParent, styles, id, classes);
	for (const arg of buttons) {
		let funcname = replaceWhite(arg);
		mButton(arg, () => handler(arg), d, bstyles, bclasses, `b${funcname}`);
	}
	return d;
}

function mTranslate(child, newParent, ms = 800, callback = null) {
	let [dx, dy] = get_screen_distance(child, newParent);
	onend = () => { mAppend(newParent, child); if (callback) callback(); };
	mAnimate(child, 'transform', [`translateX(${dx}px) translateY(${dy}px)`], onend, ms, 'ease');
}

function mTranslateBy(elem, x, y, ms = 800, callback = null) {
	mAnimate(elem, 'transform', [`translateX(${x}px) translateY(${y}px)`], callback, ms, 'ease');
}

function mTranslateByFade(elem, x, y, ms = 800, callback = null) {
	mAnimate(elem, 'transform', [`translateX(${x}px) translateY(${y}px)`], callback, ms, 'ease');
	let a = toElem(elem).animate([{ opacity: .25 }, { opacity: 1 },], { fill: 'both', duration: ms, easing: 'ease' });
}

function mYaml(d, js) {
	d.innerHTML = '<pre>' + jsonToYaml(js) + '</pre>';
	return d;
}

function maButton(caption, handler, dParent, styles) {
	let a = mLink("javascript:void(0)", dParent, {}, null, caption, 'a');
	a.onclick = handler;
	if (isdef(styles)) mStyle(a, styles);
	return a;
}

function makeCategories() {
	let keys = Categories = {
		animal: getGSGElements(g => g == 'Animals & Nature', s => startsWith(s, 'animal')),
		clothing: getGSGElements(g => g == 'Objects', s => s == 'clothing'),
		emotion: getGSGElements(g => g == 'Smileys & Emotion', s => startsWith(s, 'face') && !['face-costume', 'face-hat'].includes(s)),
		food: getGSGElements(g => g == 'Food & Drink', s => startsWith(s, 'food')),
		'game/toy': (['sparkler', 'firecracker', 'artist palette', 'balloon', 'confetti ball'].concat(ByGroupSubgroup['Activities']['game'])).sort(),
		gesture: getGSGElements(g => g == 'People & Body', s => startsWith(s, 'hand')),
		job: ByGroupSubgroup['People & Body']['job'],
		mammal: ByGroupSubgroup['Animals & Nature']['animal-mammal'],
		music: getGSGElements(g => g == 'Objects', s => startsWith(s, 'musi')),
		object: getGSGElements(g => g == 'Objects', s => true),
		place: getGSGElements(g => g == 'Travel & Places', s => startsWith(s, 'place')),
		plant: getGSGElements(g => g == 'Animals & Nature' || g == 'Food & Drink', s => startsWith(s, 'plant') || s == 'food-vegetable' || s == 'food-fruit'),
		sport: ByGroupSubgroup['Activities']['sport'],
		tool: getGSGElements(g => g == 'Objects', s => s == 'tool'),
		transport: getGSGElements(g => g == 'Travel & Places', s => startsWith(s, 'transport')),
	};
	let incompatible = DA.incompatibleCats = {
		animal: ['mammal'],
		clothing: ['object'],
		emotion: ['gesture'],
		food: ['plant', 'animal'],
		'game/toy': ['object', 'music'],
		gesture: ['emotion'],
		job: ['sport'],
		mammal: ['animal'],
		music: ['object', 'game/toy'],
		object: ['music', 'clothing', 'game/toy', 'tool'],
		place: [],
		plant: ['food'],
		sport: ['job'],
		tool: ['object'],
		transport: [],
	}
}

function makeUnitString(nOrString, unit = 'px', defaultVal = '100%') {
	if (nundef(nOrString)) return defaultVal;
	if (isNumber(nOrString)) nOrString = '' + nOrString + unit;
	return nOrString;
}

function map_range(x, min1, max1, min2, max2) {
	return convert_to_range(x, min1, max1, min2, max2);
}

function measureText(text, styles = {}, cx = null) {
	if (!cx) {
		var canvas = getTextWidth.canvas || (getTextWidth.canvas = document.createElement('canvas'));
		cx = canvas.getContext('2d');
	}
	cx.font = isdef(styles.font) ? styles.font : `${styles.fz}px ${styles.family}`;
	var metrics = cx.measureText(text);
	return { w: metrics.width, h: metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent };
}

function measure_fieldset(fs) {
	let legend = fs.firstChild;
	let r = getRect(legend);
	let labels = fs.getElementsByTagName('label');
	let wmax = 0;
	for (const l of labels) {
		let r1 = getRect(l);
		wmax = Math.max(wmax, r1.w);
	}
	let wt = r.w;
	let wo = wmax + 24;
	let diff = wt - wo;
	if (diff >= 10) {
		for (const l of labels) { let d = l.parentNode; mStyle(d, { maleft: diff / 2 }); }
	}
	let wneeded = Math.max(wt, wo) + 10;
	mStyle(fs, { wmin: wneeded });
	for (const l of labels) { let d = l.parentNode; mStyle(l, { display: 'inline-block', wmin: 50 }); mStyle(d, { wmin: wneeded - 40 }); }
}

function mgSvg(dParent, attrs) {
	return mgTag('svg', dParent, attrs);
}

function mgTag(tag, dParent, attrs, styles = {}, innerHTML) {
	let elem = gCreate(tag);
	mStyle(elem, styles);
	mAttrs(elem, attrs);
	if (isdef(innerHTML)) elem.innerHTML = innerHTML;
	if (isdef(dParent)) mAppend(dParent, elem);
	return elem;
}

function mgText(text, dParent, attrs, styles) {
	return mgTag('text', dParent, attrs, styles, text);
}

function miPic(item, dParent, styles, classes) {
	let info = isString(item) ? Syms[item] : isdef(item.info) ? item.info : item;
	let d = mDiv(dParent);
	d.innerHTML = info.text;
	if (nundef(styles)) styles = {};
	let family = info.family;
	addKeys({ family: family, fz: 50, display: 'inline-block' }, styles);
	mStyle(d, styles);
	if (isdef(classes)) mClass(d, classes);
	mCenterCenterFlex(d);
	return d;
}

function normalize_string(s, sep = '_') {
	s = s.toLowerCase().trim();
	let res = '';
	for (let i = 0; i < s.length; i++) { if (isAlphaNum(s[i])) res += s[i]; else if (s[i] == ' ') res += sep; }
	return res;
}

function nundef(x) {
	return x === null || x === undefined;
}

function object2string(o, props = [], except_props = []) {
	let s = '';
	if (nundef(o)) return s;
	if (isString(o)) return o;
	let keys = Object.keys(o).sort();
	for (const k of keys) {
		if (!isEmpty(props) && props.includes(k) || !except_props.includes(k)) {
			let val = isList(o[k]) ? o[k].join(',') : isDict(o[k]) ? object2string(o[k].props, except_props) : o[k];
			let key_part = isEmpty(s) ? '' : `, ${k}:`;
			s += val;
		}
	}
	return s;
}

function old_mButtonX(dParent, pos = 'tr', handler = null, defaultBehavior = 'hide', sz = 40) {
	dParent = toElem(dParent);
	let styles = { cursor: 'pointer', w: sz, h: sz };
	let d2 = mDiv(dParent, styles, null, `<svg width='100%' height='100%' ><use xlink:href="#Times" /></svg>`);
	mClass(d2, 'svgbtnX');
	d2.onclick = isdef(handler) ? handler : defaultBehavior == 'hide' ? () => hide(dParent) : () => dParent.remove();
	mPlace(d2, pos, 10);
	return d2;
}

function oneWordKeys(keys) {
	return keys.filter(x => !x.includes(' '));
}

function onpagedeactivated(handler) {
	document.addEventListener('visibilitychange',
		() => {
			console.log('visibilityState', document.visibilityState);
			if (document.visibilityState !== 'visible') handler();
		});
}

function oscillate_between(x, min, max, step) {
	x += step;
	if (x <= min || x >= max) step = -step;
	return [x, step];
}

function pSBC(p, c0, c1, l) {
	let r,
		g,
		b,
		P,
		f,
		t,
		h,
		i = parseInt,
		m = Math.round,
		a = typeof c1 == 'string';
	if (typeof p != 'number' || p < -1 || p > 1 || typeof c0 != 'string' || (c0[0] != 'r' && c0[0] != '#') || (c1 && !a)) return null;
	if (!this.pSBCr)
		this.pSBCr = d => {
			let n = d.length,
				x = {};
			if (n > 9) {
				([r, g, b, a] = d = d.split(',')), (n = d.length);
				if (n < 3 || n > 4) return null;
				(x.r = i(r[3] == 'a' ? r.slice(5) : r.slice(4))), (x.g = i(g)), (x.b = i(b)), (x.a = a ? parseFloat(a) : -1);
			} else {
				if (n == 8 || n == 6 || n < 4) return null;
				if (n < 6) d = '#' + d[1] + d[1] + d[2] + d[2] + d[3] + d[3] + (n > 4 ? d[4] + d[4] : '');
				d = i(d.slice(1), 16);
				if (n == 9 || n == 5) (x.r = (d >> 24) & 255), (x.g = (d >> 16) & 255), (x.b = (d >> 8) & 255), (x.a = m((d & 255) / 0.255) / 1000);
				else (x.r = d >> 16), (x.g = (d >> 8) & 255), (x.b = d & 255), (x.a = -1);
			}
			return x;
		};
	(h = c0.length > 9),
		(h = a ? (c1.length > 9 ? true : c1 == 'c' ? !h : false) : h),
		(f = pSBCr(c0)),
		(P = p < 0),
		(t = c1 && c1 != 'c' ? pSBCr(c1) : P ? { r: 0, g: 0, b: 0, a: -1 } : { r: 255, g: 255, b: 255, a: -1 }),
		(p = P ? p * -1 : p),
		(P = 1 - p);
	if (!f || !t) return null;
	if (l) (r = m(P * f.r + p * t.r)), (g = m(P * f.g + p * t.g)), (b = m(P * f.b + p * t.b));
	else (r = m((P * f.r ** 2 + p * t.r ** 2) ** 0.5)), (g = m((P * f.g ** 2 + p * t.g ** 2) ** 0.5)), (b = m((P * f.b ** 2 + p * t.b ** 2) ** 0.5));
	(a = f.a), (t = t.a), (f = a >= 0 || t >= 0), (a = f ? (a < 0 ? t : t < 0 ? a : a * P + t * p) : 0);
	if (h) return 'rgb' + (f ? 'a(' : '(') + r + ',' + g + ',' + b + (f ? ',' + m(a * 1000) / 1000 : '') + ')';
	else return '#' + (4294967296 + r * 16777216 + g * 65536 + b * 256 + (f ? m(a * 255) : 0)).toString(16).slice(1, f ? undefined : -2);
}

function plural(n) {
	return n == 0 || n > 1 ? 's' : '';
}

function polyPointsFrom(w, h, x, y, pointArr) {
	x -= w / 2;
	y -= h / 2;
	let pts = pointArr.map(p => [p.X * w + x, p.Y * h + y]);
	let newpts = [];
	for (const p of pts) {
		newp = { X: p[0], Y: Math.round(p[1]) };
		newpts.push(newp);
	}
	pts = newpts;
	let sPoints = pts.map(p => '' + p.X + ',' + p.Y).join(' ');
	return sPoints;
}

function posToPoint(pos = 'cc', w, h, offx = 0, offy = 0) {
	let di = { t: 0, b: h, l: 0, r: w };
	let py = pos[0] == 'c' ? h / 2 : di[pos[0]];
	let px = pos[1] == 'c' ? w / 2 : di[pos[1]];
	return [px + offx, py + offy];
}

function post_json(url, o, callback) {
	fetch(url, {
		method: 'POST',
		headers: {
			'Accept': 'application/json',
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(o)
	}).then(response => response.json()).then(response => callback(response));
}

function rAdd(dmin = -1, dmax = 1) {
	return x => x + dmin + Math.random() * (dmax - dmin);
}

function rAddSub(d) {
	return x => x + (coin() ? d : -d);
}

function rAddSubRange(d) {
	return x => x + (Math.random() * 2 * d - d);
}

function rAlphanums(n) {
	return rChoose(toLetters('0123456789abcdefghijklmnopq'), n);
}

function rCard(postfix = 'n', ranks = '*A23456789TJQK', suits = 'HSDC') {
	return rChoose(ranks) + rChoose(suits) + postfix;
}

function rChoose(arr, n = 1, func = null, exceptIndices = null) {
	let indices = arrRange(0, arr.length - 1);
	if (isdef(exceptIndices)) {
		for (const i of exceptIndices) removeInPlace(indices, i);
	}
	if (isdef(func)) indices = indices.filter(x => func(arr[x]));
	if (n == 1) {
		let idx = Math.floor(Math.random() * indices.length);
		return arr[indices[idx]];
	}
	arrShufflip(indices);
	return indices.slice(0, n).map(x => arr[x]);
}

function rCoin(percent = 50) {
	let r = Math.random();
	r *= 100;
	return r < percent;
}

function rColor(cbrightness, c2, alpha = null) {
	if (isdef(c2)) {
		let c = colorMix(cbrightness, c2, rNumber(0, 100));
		return colorTrans(c, alpha ?? Math.random());
	}
	if (isdef(cbrightness)) {
		let hue = rHue();
		let sat = 100;
		let b = isNumber(cbrightness) ? cbrightness : cbrightness == 'dark' ? 25 : cbrightness == 'light' ? 75 : 50;
		return colorFromHSL(hue, sat, b);
	}
	let s = '#';
	for (let i = 0; i < 6; i++) {
		s += rChoose(['f', 'c', '9', '6', '3', '0']);
	}
	return s;
}

function rConsonant(w, except = []) {
	let vowels = w ? getConsonants(w, except) : toLetters('aeiouy'); return chooseRandom(vowels);
}

function rDate(before, after) {
	let after_date = new Date(after);
	let before_date = new Date(before);
	let random_date = new Date(Math.random() * (before_date.getTime() - after_date.getTime()) + after_date.getTime());
	return random_date;
}

function rDigits(n) {
	return rChoose(toLetters('0123456789'), n);
}

function rFloat(min = -1, max = 1) {
	return Math.random() * (max - min) + min;
}

function rGaussian(min, max, int = false) {
	function rGauss() {
		var rand = 0;
		for (var i = 0; i < 6; i += 1) { rand += Math.random(); }
		return rand / 6;
	}
	return int ? Math.floor(min + rGauss() * (max - min + 1)) : min + rGauss() * (max - min);
}

function rHue() {
	return (rNumber(0, 36) * 10) % 360;
}

function rLetter(except) {
	return rLetters(1, except)[0];
}

function rLetters(n, except = []) {
	let all = 'abcdefghijklmnopqrstuvwxyz';
	for (const l of except) all = all.replace(l, '');
	console.log('all', all, except)
	return rChoose(toLetters(all), n);
}

function rNumber(min = 0, max = 100) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

function rPassword(n) {
	return rChoose(toLetters('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ!.?*&%$#@:;_'), n).join('');
}

function rPerlin(x, y = 0, z = 0) {
	Perlin.lastx = x;
	if (Perlin.perlin == null) {
		Perlin.perlin = new Array(Perlin.PERLIN_SIZE + 1);
		for (let i = 0; i < Perlin.PERLIN_SIZE + 1; i++) {
			Perlin.perlin[i] = Math.random();
		}
	}
	if (x < 0) { x = -x; }
	if (y < 0) { y = -y; }
	if (z < 0) { z = -z; }
	let xi = Math.floor(x), yi = Math.floor(y), zi = Math.floor(z);
	let xf = x - xi;
	let yf = y - yi;
	let zf = z - zi;
	let rxf, ryf;
	let r = 0;
	let ampl = 0.5;
	let n1, n2, n3;
	for (let o = 0; o < Perlin.perlin_octaves; o++) {
		let of = xi + (yi << Perlin.PERLIN_YWRAPB) + (zi << Perlin.PERLIN_ZWRAPB);
		rxf = Perlin.scaled_cosine(xf);
		ryf = Perlin.scaled_cosine(yf);
		n1 = Perlin.perlin[of & Perlin.PERLIN_SIZE];
		n1 += rxf * (Perlin.perlin[(of + 1) & Perlin.PERLIN_SIZE] - n1);
		n2 = Perlin.perlin[(of + Perlin.PERLIN_YWRAP) & Perlin.PERLIN_SIZE];
		n2 += rxf * (Perlin.perlin[(of + Perlin.PERLIN_YWRAP + 1) & Perlin.PERLIN_SIZE] - n2);
		n1 += ryf * (n2 - n1);
		of += Perlin.PERLIN_ZWRAP;
		n2 = Perlin.perlin[of & Perlin.PERLIN_SIZE];
		n2 += rxf * (Perlin.perlin[(of + 1) & Perlin.PERLIN_SIZE] - n2);
		n3 = Perlin.perlin[(of + Perlin.PERLIN_YWRAP) & Perlin.PERLIN_SIZE];
		n3 += rxf * (Perlin.perlin[(of + Perlin.PERLIN_YWRAP + 1) & Perlin.PERLIN_SIZE] - n3);
		n2 += ryf * (n3 - n2);
		n1 += Perlin.scaled_cosine(zf) * (n2 - n1);
		r += n1 * ampl;
		ampl *= Perlin.perlin_amp_falloff;
		xi <<= 1;
		xf *= 2;
		yi <<= 1;
		yf *= 2;
		zi <<= 1;
		zf *= 2;
		if (xf >= 1.0) { xi++; xf--; }
		if (yf >= 1.0) { yi++; yf--; }
		if (zf >= 1.0) { zi++; zf--; }
	}
	return r;
};

function rPrimaryColor() {
	let c = '#' + rChoose(['ff', '00']) + rChoose(['ff', '00']); c += c == '#0000' ? 'ff' : c == '#ffff' ? '00' : rChoose(['ff', '00']); return c;
}

function rRank(ranks = 'A23456789TJQK') {
	return rChoose(ranks);
}

function rSuit(suit = 'HSDC') {
	return rChoose(suit);
}

function rVowel(w, except = []) {
	let vowels = w ? getVowels(w, except) : toLetters('aeiouy'); return chooseRandom(vowels);
}

function rWheel(n = 1, hue = null, sat = 100, bri = 50) {
	let d = 360 / n;
	let h = valf(hue, rHue());
	let arr = [];
	for (let i = 0; i < n; i++) {
		console.log('h', h)
		let r = colorFromHSL(h, sat, bri);
		h = (h + d) % 360;
		arr.push(r);
	}
	return arr;
}

function randomColor() {
	return rColor();
}

function range(f, t, st = 1) {
	if (nundef(t)) {
		t = f - 1;
		f = 0;
	}
	let arr = [];
	for (let i = f; i <= t; i += st) {
		arr.push(i);
	}
	return arr;
}

function recConvertLists(o, maxlen = 25) {
	for (const k in o) {
		let val = o[k];
		if (isList(val)) {
			if (val.length > maxlen) val = val.slice(0, maxlen).toString() + '...';
			else val = val.toString();
			o[k] = val;
		} else if (isDict(val)) recConvertLists(val);
	}
}

function removeDuplicates(keys, prop) {
	let di = {};
	let res = [];
	let items = keys.map(x => Syms[x]);
	for (const item of items) {
		if (isdef(di[item.best])) { continue; }
		res.push(item);
		di[item.key] = true;
	}
	return res.map(x => x.key);
}

function removeInPlace(arr, el) {
	arrRemovip(arr, el);
}

function replaceAll(str, sSub, sBy) {
	let regex = new RegExp(sSub, 'g');
	return str.replace(regex, sBy);
}

function replaceAllFast(str, sSub, sBy) {
	return replaceAll(str, sSub, sBy);
}

function replaceAllSafe(str, sSub, sBy) {
	return replaceAllSpecialChars(str, sSub, sBy);
}

function replaceAllSpecialChars(str, sSub, sBy) {
	return str.split(sSub).join(sBy);
}

function replaceAllX(str, sSub, sBy) {
	return replaceAllSpecialChars(str, sSub, sBy);
}

function replaceAtString(s, i, ssub) {
	return s.substring(0, i) + ssub + s.substring(i + 1);
}

function replaceEvery(w, letter, nth) {
	let res = '';
	for (let i = 1; i < w.length; i += 2) {
		res += letter;
		res += w[i];
	}
	if (w.length % 2) res += w[0];
	return res;
}

function replaceWhite(s, sby = '_') {
	let w = toWords(s); return w.join(sby);
}

function resetUIDs() {
	UIDCounter = 0; FRUIDCounter = -1;
}

function return_elem_to_deck_from(el, arr, deck) {
	elem_from_to(el, arr, deck);
}

function reverse(x) {
	if (isString(x)) {
		var newString = "";
		for (var i = x.length - 1; i >= 0; i--) {
			newString += x[i];
		}
		return newString;
	}
	if (isList(x)) return x.reverse();
	if (isDict(x)) return dict2list(x, 'value').reverse();
	return x;
}

function rgb2float(rgba) {
	return [
		rgba[0] / 255,
		rgba[1] / 255,
		rgba[2] / 255,
		rgba[3]
	]
}

function rgb2hex(rgba) {
	var dig, hex = '#';
	for (var i = 0; i < 3; ++i) {
		dig = rgba[i];
		dig = dig.toString(16);
		hex += ('00' + dig).substr(dig.length);
	}
	return hex;
}

function rgbToHex(rgbStr) {
	return rgbStr && '#' + rgbStr.slice(4, -1).split(',').map(x => (+x).toString(16).padStart(2, '0')).join('');
}

function rgbaStr(rgba) {
	return 'rgba(' + rgba.join(',') + ')';
}

async function route_path_json(url) {
	let data = await fetch(url);
	let o = await data.json();
	return o;
}

async function route_path_text(url) {
	let data = await fetch(url);
	let text = await data.text();
	return text;
}

async function route_path_yaml_dict(url) {
	let data = await fetch(url);
	let text = await data.text();
	let dict = jsyaml.load(text);
	return dict;
}

function route_post_json(url, o, callback) {
	post_json(url, o, callback);
}

function run_for_seconds(secs, f, interval = 50) {
	DA.start = get_now(); doit(secs, f, interval);
}

function sameList(l1, l2) {
	if (l1.length != l2.length) return false;
	for (const s of l1) {
		if (!l2.includes(s)) return false;
	}
	return true;
}

function saveFileAtClient(name, type, data) {
	if (data != null && navigator.msSaveBlob) return navigator.msSaveBlob(new Blob([data], { type: type }), name);
	let a = document.createElement('a');
	a.style.display = 'none';
	let url = window.URL.createObjectURL(new Blob([data], { type: type }));
	a.href = url;
	a.download = name;
	document.body.appendChild(a);
	simulateClick(a);
	setTimeout(function () {
		window.URL.revokeObjectURL(url);
		a.remove();
	}, 500);
}

function say(text, lang, callback, volume, rate, pitch) {
	function sayit(text, lang, callback, volume, rate, pitch) {
		var text = valf(text, 'Hello, world!');
		var msg = new SpeechSynthesisUtterance();
		var voices = DA.voicelist;
		let voice = voices.filter(x => x.lang.includes(lang));
		if (isEmpty(voice)) voice = voices.filter(x => x.name.toLowerCase().includes(lang));
		msg.voice = valf(rChoose(voice), rChoose(voices));
		if (isdef(volume)) msg.volume = volume;
		if (isdef(rate)) msg.rate = rate;
		if (isdef(pitch)) msg.pitch = pitch;
		msg.text = text;
		msg.onend = e => {
			if (callback) callback(); else console.log('ENDE', e.utterance, 'Finished in ' + e.elapsedTime + ' seconds.');
		};
		speechSynthesis.speak(msg);
	}
	if (!('speechSynthesis' in window)) { alert('speech not supported!!! connect to internet?'); return; }
	if (nundef(DA.voicelist)) {
		speechSynthesis.onvoiceschanged = function () {
			DA.voicelist = speechSynthesis.getVoices();
			sayit(text, lang, callback, volume, rate, pitch);
		}
	} else sayit(text, lang, callback, volume, rate, pitch);
}

function selectText(el) {
	if (el instanceof HTMLTextAreaElement) { el.select(); return; }
	var sel, range;
	if (window.getSelection && document.createRange) {
		sel = window.getSelection();
		if (sel.toString() == '') {
			window.setTimeout(function () {
				range = document.createRange();
				range.selectNodeContents(el);
				sel.removeAllRanges();
				sel.addRange(range);
			}, 1);
		}
	} else if (document.selection) {
		sel = document.selection.createRange();
		if (sel.text == '') {
			range = document.body.createTextRange();
			range.moveToElementText(el);
			range.select();
		}
	}
}

function setKeys({ allowDuplicates, nMin = 25, lang, key, keySets, filterFunc, param, confidence, sortByFunc } = {}) {
	let keys = jsCopy(keySets[key]);
	if (isdef(nMin)) {
		let diff = nMin - keys.length;
		let additionalSet = diff > 0 ? nMin > 100 ? firstCondDictKeys(keySets, k => k != key && keySets[k].length > diff) : 'best100' : null;
		if (additionalSet) KeySets[additionalSet].map(x => addIf(keys, x));
	}
	let primary = [];
	let spare = [];
	for (const k of keys) {
		let info = Syms[k];
		info.best = info[lang];
		if (nundef(info.best)) {
			let ersatzLang = (lang == 'D' ? 'D' : 'E');
			let klang = 'best' + ersatzLang;
			if (nundef(info[klang])) info[klang] = lastOfLanguage(k, ersatzLang);
		}
		let isMatch = true;
		if (isdef(filterFunc)) isMatch = isMatch && filterFunc(param, k, info.best);
		if (isdef(confidence)) isMatch = info[klang + 'Conf'] >= confidence;
		if (isMatch) { primary.push(k); } else { spare.push(k); }
	}
	if (isdef(nMin)) {
		let len = primary.length;
		let nMissing = nMin - len;
		if (nMissing > 0) { let list = choose(spare, nMissing); spare = arrMinus(spare, list); primary = primary.concat(list); }
	}
	if (isdef(sortByFunc)) { sortBy(primary, sortByFunc); }
	if (isdef(nMin)) console.assert(primary.length >= nMin);
	if (nundef(allowDuplicates)) {
		primary = removeDuplicates(primary);
	}
	return primary;
}

function setRect(elem, options) {
	let r = getRect(elem);
	elem.rect = r;
	elem.setAttribute('rect', `${r.w} ${r.h} ${r.t} ${r.l} ${r.b} ${r.r}`);
	if (isDict(options)) {
		if (options.hgrow) mStyle(elem, { hmin: r.h });
		else if (options.hfix) mStyle(elem, { h: r.h });
		else if (options.hshrink) mStyle(elem, { hmax: r.h });
		if (options.wgrow) mStyle(elem, { wmin: r.w });
		else if (options.wfix) mStyle(elem, { w: r.w });
		else if (options.wshrink) mStyle(elem, { wmax: r.w });
	}
	return r;
}

function set_run_state(singleclient = true, sockets = false, port = 3000, localhost = true, testing = true, liveserver = true, nodejs = true) {
	SERVER = localhost ? '127.0.0.1' : '216.250.112.218';
	PORT = port;
	SERVERURL = `http:/` + `${SERVER}:${PORT}`;
	NODEJS = nodejs;
	LIVE_SERVER = liveserver;
	TESTING = testing;
	SINGLECLIENT = singleclient;
	if (sockets) {
		Socket = liveserver ? io(SERVERURL) : io();
		Socket.on('message', x => console.log('got message', x));
		Socket.on('disconnect', x => console.log('got disconnect', x));
		Socket.on('update', x => console.log('got update', x));
	}
	console.log('SERVER:' + SERVERURL, 'LIVE:' + LIVE_SERVER, 'Socket:' + Socket, TESTING ? 'TESTING' : '', SINGLECLIENT ? 'SINGLE' : '');
}

function show(elem, isInline = false) {
	if (isString(elem)) elem = document.getElementById(elem);
	if (isSvg(elem)) {
		elem.setAttribute('style', 'visibility:visible');
	} else {
		elem.style.display = isInline ? 'inline-block' : null;
	}
	return elem;
}

function show0(id) {
	mBy(id).style.display = "block";
}

function showFleetingMessage(msg, dParent, styles = {}, ms = 3000, msDelay = 0, fade = true) {
	clearFleetingMessage();
	dFleetingMessage = mDiv(dParent);
	if (msDelay) {
		TOFleetingMessage = setTimeout(() => fleetingMessage(msg, dFleetingMessage, styles, ms, fade), msDelay);
	} else {
		TOFleetingMessage = setTimeout(() => fleetingMessage(msg, dFleetingMessage, styles, ms, fade), 10);
	}
}

function show_special_message(msg, stay = false, ms = 3000, delay = 0, styles = {}, callback = null) {
	let dParent = mBy('dBandMessage');
	if (nundef(dParent)) dParent = mDiv(document.body, {}, 'dBandMessage');
	show(dParent);
	clearElement(dParent);
	addKeys({ position: 'fixed', top: 200, classname: 'slow_gradient_blink', vpadding: 10, align: 'center', position: 'absolute', fg: 'white', fz: 24, w: '100vw' }, styles);
	if (!isEmpty(styles.classname)) { mClass(dParent, styles.classname); }
	delete styles.classname;
	mStyle(dParent, styles);
	dParent.innerHTML = msg;
	if (delay > 0) TO.special = setTimeout(() => { mFadeRemove(dParent, ms, callback); }, delay);
	else mFadeRemove(dParent, ms, callback);
}

function shuffle(arr) {
	if (isEmpty(arr)) return []; else return fisherYates(arr);
}

function shuffleChildren(dParent) {
	shuffle_children(dParent);
}

function shuffle_children(d) {
	let arr = Array.from(d.children);
	shuffle(arr);
	for (const ch of arr) { mAppend(d, ch); }
}

function simpleCompare(o1, o2) {
	let s1 = object2string(o1);
	let s2 = object2string(o2);
	return s1 == s2;
}

function simulateClick(elem) {
	var evt = new MouseEvent('click', { bubbles: true, cancelable: true, view: window });
	var canceled = !elem.dispatchEvent(evt);
}

function size2hex(w = 100, h = 0, x = 0, y = 0) {
	let hexPoints = [{ X: 0.5, Y: 0 }, { X: 1, Y: 0.25 }, { X: 1, Y: 0.75 }, { X: 0.5, Y: 1 }, { X: 0, Y: 0.75 }, { X: 0, Y: 0.25 }];
	if (h == 0) {
		h = (2 * w) / 1.73;
	}
	return polyPointsFrom(w, h, x, y, hexPoints);
}

function size2tridown(w = 100, h = 0, x = 0, y = 0) {
	let triPoints = [{ X: 1, Y: 0 }, { X: 0.5, Y: 1 }, { X: 0, Y: 0 }];
	if (h == 0) { h = w; }
	return polyPointsFrom(w, h, x, y, triPoints);
}

function size2triup(w = 100, h = 0, x = 0, y = 0) {
	let triPoints = [{ X: 0.5, Y: 0 }, { X: 1, Y: 1 }, { X: 0, Y: 1 }];
	if (h == 0) { h = w; }
	return polyPointsFrom(w, h, x, y, triPoints);
}

function sortBy(arr, key) {
	arr.sort((a, b) => (a[key] < b[key] ? -1 : 1)); return arr;
}

function sortByDescending(arr, key) {
	arr.sort((a, b) => (a[key] > b[key] ? -1 : 1)); return arr;
}

function sortByFunc(arr, func) {
	arr.sort((a, b) => (func(a) < func(b) ? -1 : 1)); return arr;
}

function sortByFuncDescending(arr, func) {
	arr.sort((a, b) => (func(a) > func(b) ? -1 : 1)); return arr;
}

function sortNumbers(ilist) {
	ilist.sort(function (a, b) { return a - b }); return ilist;
}

function splitAtAnyOf(s, sep) {
	let arr = [], w = '';
	for (let i = 0; i < s.length; i++) {
		let ch = s[i];
		if (sep.includes(ch)) {
			if (!isEmpty(w)) arr.push(w);
			w = '';
		} else {
			w += ch;
		}
	}
	if (!isEmpty(w)) arr.push(w);
	return arr;
}

function splitIntoNumbersAndWords(s) {
	let arr = [], i = 0;
	while (i < s.length) {
		let ch = s[i];
		let w = '';
		if (isDigit(ch)) while (i < s.length && isDigit(ch)) { w += ch; i++; ch = s[i]; }
		else if (isLetter(ch)) while (i < s.length && isLetter(ch)) { w += ch; i++; ch = s[i]; }
		else { i++; continue; }
		arr.push(w);
	}
	return arr;
}

function start_simple_timer(dtimer, msInterval, onTick, msTotal, onElapsed) {
	if (isdef(DA.timer)) { DA.timer.clear(); DA.timer = null; }
	let timer = DA.timer = new SimpleTimer(dtimer, msInterval, onTick, msTotal, onElapsed);
	timer.start();
}

function startsWith(s, sSub) {
	return s.substring(0, sSub.length) == sSub;
}

function stop_simple_timer() {
	if (isdef(DA.timer)) { DA.timer.clear(); DA.timer = null; }
}

function stringAfter(sFull, sSub) {
	let idx = sFull.indexOf(sSub);
	if (idx < 0) return '';
	return sFull.substring(idx + sSub.length);
}

function stringAfterLast(sFull, sSub) {
	let parts = sFull.split(sSub);
	return arrLast(parts);
}

function stringBefore(sFull, sSub) {
	let idx = sFull.indexOf(sSub);
	if (idx < 0) return sFull;
	return sFull.substring(0, idx);
}

function stringBeforeLast(sFull, sSub) {
	let parts = sFull.split(sSub);
	return sFull.substring(0, sFull.length - arrLast(parts).length - 1);
}

function stringBetween(sFull, sStart, sEnd) {
	return stringBefore(stringAfter(sFull, sStart), isdef(sEnd) ? sEnd : sStart);
}

function stringBetweenLast(sFull, sStart, sEnd) {
	let s1 = stringBeforeLast(sFull, isdef(sEnd) ? sEnd : sStart);
	return stringAfterLast(s1, sStart);
}

function stripToKeys(o, di) {
	let res = {};
	for (const k in o) {
		if (isdef(di[k])) res[k] = o[k];
	}
	return res;
}

function timeConversion(duration, format = 'Hmsh') {
	const portions = [];
	const msInHour = 1000 * 60 * 60;
	const hours = Math.trunc(duration / msInHour);
	if (format.includes('H')) portions.push((hours < 10 ? '0' : '') + hours);
	duration = duration - (hours * msInHour);
	const msInMinute = 1000 * 60;
	const minutes = Math.trunc(duration / msInMinute);
	if (format.includes('m')) portions.push((minutes < 10 ? '0' : '') + minutes);
	duration = duration - (minutes * msInMinute);
	const msInSecond = 1000;
	const seconds = Math.trunc(duration / 1000);
	if (format.includes('s')) portions.push((seconds < 10 ? '0' : '') + seconds);
	duration = duration - (seconds * msInSecond);
	const hundreds = duration / 10;
	if (format.includes('h')) portions.push((hundreds < 10 ? '0' : '') + hundreds);
	return portions.join(':');
}

function toDegree(rad) {
	return Math.floor(180 * rad / Math.PI);
}

function toElem(d) {
	return isString(d) ? mBy(d) : d;
}

function toLetters(s) {
	return [...s];
}

function toLocalStorage(o, name = '_all') {
	localStorage.setItem(name, JSON.stringify(o));
}
var TOFleetingMessage, dFleetingMessage, Animation1;

function toModulo(n, modul) {
	rem = n % modul; n = n - rem; if (n < 0) n = 0; return n;
}

function toRadian(deg) {
	return deg * (Math.PI / 180);
}

function toUmlaut(w) {
	if (isList(w)) {
		let res = [];
		for (const w1 of w) res.push(toUmlaut(w1));
		return res;
	} else {
		w = replaceAll(w, 'ue', 'ü');
		w = replaceAll(w, 'ae', 'ä');
		w = replaceAll(w, 'oe', 'ö');
		w = replaceAll(w, 'UE', 'Ü');
		w = replaceAll(w, 'AE', 'Ä');
		w = replaceAll(w, 'OE', 'Ö');
		return w;
	}
}

function toWords(s) {
	let arr = s.split(/(?:,|\s|!)+/);
	return arr.filter(x => !isEmpty(x));
}

function toYaml(o) {
	return jsonToYaml(o);
}

function toggleSelection(pic, selected, clSelected = 'framedPicture', clUnselected = null) {
	let ui = iDiv(pic);
	pic.isSelected = !pic.isSelected;
	if (pic.isSelected) {
		if (isdef(clUnselected)) mClassRemove(ui, clUnselected);
		mClass(ui, clSelected);
	} else {
		mClassRemove(ui, clSelected);
		if (isdef(clUnselected)) mClass(ui, clUnselected);
	}
	if (isdef(selected)) {
		if (isList(selected)) {
			if (pic.isSelected) {
				console.assert(!selected.includes(pic), 'UNSELECTED PIC IN PICLIST!!!!!!!!!!!!')
				selected.push(pic);
			} else {
				console.assert(selected.includes(pic), 'PIC NOT IN PICLIST BUT HAS BEEN SELECTED!!!!!!!!!!!!')
				removeInPlace(selected, pic);
			}
		} else {
			mClassRemove(iDiv(selected), clSelected);
			if (isdef(clUnselected)) mClass(iDiv(selected), clUnselected);
			selected.isSelected = false;
		}
	}
	return pic.isSelected ? pic : null;
}

function toggleSelectionOfPicture(pic, selectedPics, className = 'framedPicture') {
	let ui = iDiv(pic);
	pic.isSelected = !pic.isSelected;
	if (pic.isSelected) mClass(ui, className); else mClassRemove(ui, className);
	if (isdef(selectedPics)) {
		if (pic.isSelected) {
			console.assert(!selectedPics.includes(pic), 'UNSELECTED PIC IN PICLIST!!!!!!!!!!!!')
			selectedPics.push(pic);
		} else {
			console.assert(selectedPics.includes(pic), 'PIC NOT IN PICLIST BUT HAS BEEN SELECTED!!!!!!!!!!!!')
			removeInPlace(selectedPics, pic);
		}
	}
}

function toggle_select(item, selected, selstyle = 'selected') {
	let ui = iDiv(item);
	item.isSelected = !item.isSelected;
	if (item.isSelected) {
		mStyleOrClass(ui, selstyle);
	} else if (isString(selstyle)) {
		mClassRemove(ui, selstyle);
	} else if (isdef(item.style)) {
		mStyle(ui, item.style);
	} else {
		mStyleUndo(ui, selstyle);
	}
	if (isdef(selected)) {
		if (isList(selected)) {
			if (item.isSelected) {
				console.assert(!selected.includes(item), 'UNSELECTED PIC IN PICLIST!!!!!!!!!!!!')
				selected.push(item);
			} else {
				console.assert(selected.includes(item), 'PIC NOT IN PICLIST BUT HAS BEEN SELECTED!!!!!!!!!!!!')
				removeInPlace(selected, item);
			}
		} else {
			mStyle(iDiv(selected), selected.style);
			selected.isSelected = false;
		}
	}
	return item.isSelected ? item : null;
}

function top_elem_from_to(arr1, arr2) {
	arr2.push(arr1.shift());
}

function top_elem_from_to_top(arr1, arr2) {
	arr2.unshift(arr1.shift());
}

function unfocusOnEnter(ev) {
	if (ev.key === 'Enter') {
		ev.preventDefault();
		mBy('dummy').focus();
	}
}

function valf() {
	for (const arg of arguments) if (isdef(arg)) return arg;
	return null;
}

function valfi() {
	for (const arg of arguments) {
		if (isdef(arg)) return arg;
	}
	return null;
}

function valnwhite() {
	for (const arg of arguments) if (isdef(arg) && !isEmptyOrWhiteSpace(arg)) return arg;
	return null;
}

