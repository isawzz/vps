function ui_type_ga(ga, d, styles, classes) {
	//return item and store in Items
	//assumes ga has logo, color, name, friendly, options
	let item = {};
	copyKeys(ga, item);
	let [sym, bg, id] = [Syms[ga.logo], ga.color, getUID()];
	item.id = id; item.isOpen = true;

	function open() {
		//move logo ins eck
		let item = Items[id];
		if (item.isOpen) return; item.isOpen = true;
		let d1 = iDiv(item); mClear(d1);
		//d1.onclick = onclick_apps_menu_item;
		let d2 = mDiv(d1, { position: 'absolute', top: 2, left: 2, display: 'flex', gap: 2 });
		let sz = 20;
		mDiv(d2, { fz: sz, family: sym.family, 'line-height': sz }, null, sym.text);
		mDiv(d2, { fz: sz - 5, 'line-height': sz }, null, item.friendly);
	}
	function close() {
		//move logo in middle
		let item = Items[id];
		if (!item.isOpen) return; item.isOpen = false;
		let d1 = iDiv(item); mClear(d1);

		mDiv(d1, { fz: 50, family: sym.family, 'line-height': 55 }, null, sym.text);
		mLinebreak(d1, 4);
		mDiv(d1, { fz: 18, align: 'center' }, null, item.friendly);

	}
	function toggle(ev){
		evNoBubble(ev);
		let item = Items[id];
		if (item.isOpen) close(); else open();
		//console.log('div',iDiv(item).children.length)
	}

	let d1 = mDiv(d, { cursor: 'pointer', 'user-select': 'none', rounding: 10, margin: 10, vpadding: 15, hmin: 90, wmin: 140, bg: bg, position: 'relative' }, id, null, 'hop1');
	d1.setAttribute('name', ga.name);
	mCenterFlex(d1);
	iAdd(item, { div: d1 });
	console.log('Item',Items[id]);
	d1.onclick = toggle;
	close();

	return {
		item: item,
		open: open,
		close: close,
		toggle: toggle,
	}
}























