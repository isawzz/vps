function add_transaction(cmd) {
	if (!DA.simulate) start_transaction();
	DA.transactionlist.push(cmd);
}

function ari_make_selectable(item, dParent, dInstruction) {
	let A = Z.A;
	switch (item.itemtype) {
		case 'card': make_card_selectable(item); break;
		case 'container': make_container_selectable(item); break;
		case 'string': make_string_selectable(item); break;
	}
}

function ari_make_selected(item) {
	let A = Z.A;
	switch (item.itemtype) {
		case 'card': make_card_selected(item); break;
		case 'container': make_container_selected(item); break;
		case 'string': make_string_selected(item); break;
	}
}

function ari_make_unselectable(item) {
	let A = Z.A;
	switch (item.itemtype) {
		case 'card': make_card_unselectable(item); break;
		case 'container': make_container_unselectable(item); break;
		case 'string': make_string_unselectable(item); break;
	}
}

function ari_make_unselected(item) {
	let A = Z.A;
	switch (item.itemtype) {
		case 'card': make_card_unselected(item); break;
		case 'container': make_container_unselected(item); break;
		case 'string': make_string_unselected(item); break;
	}
}

function clear_selection() {
	let [plorder, stage, A, fen, uplayer, pl] = [Z.plorder, Z.stage, Z.A, Z.fen, Z.uplayer, Z.fen.players[Z.uplayer]];
	if (nundef(Z.A) || isEmpty(A.selected)) return;
	let selitems = A.selected.map(x => A.items[x]);
	for (const item of selitems) { ari_make_unselected(item); }
	A.selected = [];
}

function clear_transaction() {
	DA.simulate = false; DA.transactionlist = [];
}

function continue_after_error() {
	dError.innerHTML = ''; if (isdef(DA.callback)) { DA.callback(); delete (DA.callback); }
}

function make_card_selectable(item) {
	let d = iDiv(item.o); mClass(d, 'selectable'); if (Z.game != 'aristo') { spread_hand(item.path, .3); } mClass(d.parentNode, 'selectable_parent');
}

function make_card_selected(item) {
	let color = isdef(Z.func.get_selection_color) ? Z.func.get_selection_color(item) : 'red';
	set_card_border(item, 13, color);
	if (DA.magnify_on_select) mClass(iDiv(item.o), 'mag');
}

function make_card_unselectable(item) {
	let d = iDiv(item.o); d.onclick = null; mClassRemove(d, 'selectable'); mClassRemove(d.parentNode, 'selectable_parent'); spread_hand(item.path);
}

function make_card_unselected(item) {
	set_card_border(item); if (DA.magnify_on_select) mClassRemove(iDiv(item.o), 'mag');
}

function make_container_selectable(item) {
	let d = iDiv(item); mClass(d, 'selectable'); mClass(d, 'selectable_parent');
}

function make_container_selected(item) {
	let d = iDiv(item); mClass(d, 'selected_parent');
}

function make_container_unselectable(item) {
	let d = iDiv(item); d.onclick = null; mClassRemove(d, 'selectable'); mClassRemove(d, 'selectable_parent');
}

function make_container_unselected(item) {
	let d = iDiv(item); mClassRemove(d, 'selected_parent');
}

function make_deck_selectable(item) {
}

function make_deck_selected(item) {
}

function make_deck_unselectable(item) {
}

function make_deck_unselected(item) {
}

function make_hand_selectable(item) {
}

function make_hand_selected(item) {
}

function make_hand_unselectable(item) {
}

function make_hand_unselected(item) {
}

function make_market_selectable(item) {
}

function make_market_selected(item) {
}

function make_market_unselectable(item) {
}

function make_market_unselected(item) {
}

function make_string_selectable(item) {
	let d = mBy(item.id); mClass(d, 'selectable_button');
}

function make_string_selected(item) {
	let d = mBy(item.id); item.bg = mGetStyle(d, 'bg'); item.fg = mGetStyle(d, 'fg'); mStyle(d, { bg: 'yellow', fg: 'black' });
}

function make_string_unselectable(item) {
	let d = mBy(item.id); d.onclick = null; mClassRemove(d, 'selectable_button');
}

function make_string_unselected(item) {
	let d = mBy(item.id); mStyle(d, { bg: item.bg, fg: item.fg });
}

function pack_table(o) {
	for (const k of ['players', 'fen', 'state', 'player_status', 'options', 'scoring', 'notes', 'turn']) {
		let val = o[k];
		if (isdef(val)) o[k] = JSON.stringify(val);
	}
	return JSON.stringify({ table: o, playerdata: JSON.stringify(o.playerdata) });
}

function remove_from_selection(card) {
	if (nundef(Z.A)) return;
	let A = Z.A;
	let item = firstCond(A.items, x => x.id == card.id);
	if (isdef(item)) {
		let idx = item.index;
		A.items.splice(item.index, 1);
		removeInPlace(A.selected, item.index);
		make_card_unselectable(item);
		make_card_unselected(item);
		reindex_items(A.items);
	}
}

function restart_selection_process() {
	let [plorder, stage, A, fen, uplayer, pl] = [Z.plorder, Z.stage, Z.A, Z.fen, Z.uplayer, Z.fen.players[Z.uplayer]];
	if (Z.game != 'ferro') {
		console.log('attempt to restart selection process in non-ferro game!!!');
		return;
	}
	A.selectedCards.map(x => ari_make_unselected(x));
	mClear('dSelections0');
	Z.A = { level: 0, di: {}, ll: [], items: [], selected: [], tree: null, breadcrumbs: [], sib: [], command: null };
	Z.stage = 'card_selection';
	ferro_pre_action();
}

function select_add_items(items, callback = null, instruction = null, min = 0, max = 100, prevent_autoselect = false) {
	let A = Z.A;
	select_clear_previous_level();
	A.level++; A.items = items; A.callback = callback; A.selected = []; A.minselected = min; A.maxselected = max;
	console.log('A.level', A.level)
	show_stage();
	let dInstruction = mBy('dSelections0');
	mClass(dInstruction, 'instruction');
	mCenterCenterFlex(dInstruction);
	dInstruction.innerHTML = (Z.role == 'active' ? `${get_waiting_html()}<span style="color:red;font-weight:bold;max-height:25px">You</span>` : `${Z.uplayer}`) + "&nbsp;" + instruction;
	if (too_many_string_items(A)) { mLinebreak(dInstruction, 4); }
	let has_submit_items = false;
	let buttonstyle = { maleft: 10, vmargin: 2, rounding: 6, padding: '4px 12px 5px 12px', border: '0px solid transparent', outline: 'none' }
	for (const item of A.items) {
		let type = item.itemtype = is_card(item) ? 'card' : isdef(item.o) ? 'container' : 'string';
		if (isdef(item.submit_on_click)) { has_submit_items = true; }
		let id = item.id = lookup(item, ['o', 'id']) ? item.o.id : getUID(); A.di[id] = item;
		if (type == 'string') {
			let handler = ev => select_last(item, isdef(item.submit_on_click) ? callback : select_toggle, ev);
			item.div = mButton(item.a, handler, dInstruction, buttonstyle, null, id);
		} else {
			let ui = item.div = iDiv(item.o);
			ui.onclick = ev => select_last(item, select_toggle, ev);
			ui.id = id;
		}
	}
	let show_submit_button = !has_submit_items && (A.minselected != A.maxselected || !A.autosubmit);
	if (show_submit_button) { mButton('submit', callback, dInstruction, buttonstyle, 'selectable_button', 'bSubmit'); }
	let show_restart_button = A.level > 1;
	if (show_restart_button) { mButton('restart', onclick_reload, dInstruction, buttonstyle, 'selectable_button', 'bReload'); }
	let dParent = window[`dActions${A.level}`];
	for (const item of A.items) { ari_make_selectable(item, dParent, dInstruction); }
	assertion(A.items.length >= min, 'less options than min selection!!!!', A.items.length, 'min is', min);
	if (A.items.length == min && !is_ai_player() && !prevent_autoselect) {
		for (const item of A.items) { A.selected.push(item.index); ari_make_selected(item); }
		if (A.autosubmit) {
			loader_on();
			setTimeout(() => { if (callback) callback(); loader_off(); }, 800);
		}
	} else if (is_ai_player()) {
		ai_move();
	} else if (TESTING && isdef(DA.test)) {
		if (DA.test.iter >= DA.auto_moves.length) {
			if (isdef(DA.test.end)) DA.test.end();
			activate_ui();
			return;
		}
		let selection = DA.auto_moves[DA.test.iter++];
		if (selection) {
			deactivate_ui();
			let numbers = [];
			for (const el of selection) {
				if (el == 'last') {
					numbers.push(A.items.length - 1);
				} else if (el == 'random') {
					numbers.push(rNumber(0, A.items.length - 1));
				} else if (isString(el)) {
					let commands = A.items.map(x => x.key);
					let idx = commands.indexOf(el);
					numbers.push(idx);
				} else numbers.push(el);
			}
			selection = numbers;
			A.selected = selection;
			if (selection.length == 1) A.command = A.items[A.selected[0]].key;
			A.last_selected = A.items[A.selected[0]];
			select_highlight();
			setTimeout(() => {
				if (A.callback) A.callback();
			}, 1000);
		} else { activate_ui(); }
	} else { activate_ui(); }
}

function select_clear_previous_level() {
	let A = Z.A;
	if (!isEmpty(A.items)) {
		console.assert(A.level >= 1, 'have items but level is ' + A.level);
		A.ll.push({ items: A.items, selected: A.selected });
		let dsel = mBy(`dSelections1`);
		mStyle(dsel, { display: 'flex', 'align-items': 'center', padding: 10, box: true, gap: 10 });
		for (const item of A.items) {
			ari_make_unselectable(item);
			if (A.keep_selection) continue;
			ari_make_unselected(item);
			if (!A.selected.includes(item.index)) continue;
			if (item.itemtype == 'card') {
				let d = iDiv(item);
				let card = item.o;
				let mini = mDiv(dsel, { bg: 'yellow', fg: 'black', hpadding: 2, border: '1px solid black' }, null, card.friendly);
			} else if (item.itemtype == 'container') {
				let list = item.o.list;
				let cards = list.map(x => ari_get_card(x, 30, 30 * .7));
				let cont2 = ui_make_hand_container(cards, dsel, { bg: 'transparent' });
				ui_add_cards_to_hand_container(cont2, cards, list);
			} else if (item.itemtype == 'string') {
				let db = mDiv(dsel, { bg: 'yellow', fg: 'black', border: 'black', hpadding: 4 }, item.id, item.a);
			}
		}
	}
}

function select_confirm_weiter(callback) {
	select_add_items(ui_get_string_items(['weiter']), callback, 'may click to continue', 1, 1, Z.mode == 'multi');
}

function select_error(msg, callback = null, stay = false) {
	let [A] = [Z.A];
	DA.callback = callback;
	if (A.maxselected == 1 && A.selected.length > 0) {
		let item = A.items[A.selected[0]];
		ari_make_unselected(item);
		A.selected = [];
	} else if (A.selected.length == 2) {
		let item = A.items[A.selected[1]];
		ari_make_unselected(item);
		A.selected = [A.selected[0]];
	}
	dError.innerHTML = msg;
	if (stay) {
		dError.innerHTML += '<br><button onclick="continue_after_error()">CLICK TO CONTINUE</button>';
	} else {
		TO.error = setTimeout(continue_after_error, 3000);
	}
}

function select_highlight() {
	let A = Z.A; for (const i of A.selected) { let a = A.items[i]; ari_make_selected(a, true); }
}

function select_last(item, callback, ev) {
	if (isdef(ev)) evNoBubble(ev);
	Z.A.last_selected = item; callback(item, ev);
}

function select_timer(ms, callback) {
	let d = mBy('dSelections0');
	let dtimer = mDiv(d, { w: 80, maleft: 10, fg: 'red', weight: 'bold' }, 'dTimer');
	if (isdef(DA.timer)) { DA.timer.clear(); DA.timer = null; }
	let timer = DA.timer = new SimpleTimer(dtimer, 1000, null, ms, callback);
	timer.start();
	return dtimer;
}

function select_toggle() {
	if (!uiActivated) { console.log('ui is deactivated!!!'); return; }
	let A = Z.A;
	let item = A.last_selected;
	if (A.selected.includes(item.index)) {
		removeInPlace(A.selected, item.index);
		ari_make_unselected(item);
	} else {
		if (A.maxselected == 1 && !isEmpty(A.selected)) { ari_make_unselected(A.items[A.selected[0]]); A.selected = []; }
		A.selected.push(item.index);
		ari_make_selected(item);
		if (!DA.ai_is_moving && A.selected.length >= A.maxselected && A.autosubmit) {
			setTimeout(() => A.callback(), 100);
		}
	}
}

function start_transaction() {
	if (DA.simulate) return;
	DA.simulate = true;
	DA.snapshot = { fen: jsCopy(Z.fen), stage: Z.stage, round: Z.round, phase: Z.phase, turn: Z.turn };
	DA.transactionlist = [];
}

function stop_timer() {
	if (isdef(DA.timer)) {
		let res = DA.timer.clear();
		DA.timer = null;
		return isNumber(res) ? res : 0;
	}
	return 0;
}

