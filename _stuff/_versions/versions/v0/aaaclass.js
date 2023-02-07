class _grid {
	constructor(o, pool, boardInfo, fieldInfo) {
		this.boardInfo = boardInfo;
		this.fieldInfo = fieldInfo;
		let { board, fields, corners, edges } = this.skeleton = this.gridSkeleton(o, pool, this.boardInfo, this.fieldInfo);
		board.oid = o.oid;
	}
	gridSkeleton(omap, pool, gridInfoFunc, fieldInfoFunc) {
		let board = { o: omap, info: gridInfoFunc(omap.rows, omap.cols) };
		let fields = {};
		for (const fid of getElements(omap.fields)) {
			let o = pool[fid];
			fields[fid] = { oid: fid, o: pool[fid], info: fieldInfoFunc(board.info, o.row, o.col) };
		}
		board.info.vertices = correctPolys(Object.values(fields).map(x => x.info.poly), 1);
		let dhelp = {};
		let corners = {};
		for (const fid in fields) {
			let f = fields[fid];
			let i = 0;
			for (const cid of getElements(f.o.corners)) {
				if (cid && nundef(dhelp[cid])) {
					let pt = f.info.poly[i];
					corners[cid] = { oid: cid, o: pool[cid], info: { shape: 'circle', memType: 'corner', x: pt.x, y: pt.y, w: 1, h: 1 } };
					dhelp[cid] = true;
				}
				i += 1;
			}
		}
		dhelp = {};
		let edges = {};
		for (const fid in fields) {
			let f = fields[fid];
			for (const eid of getElements(f.o.edges)) {
				if (eid && nundef(dhelp[eid])) {
					let el = pool[eid];
					let n1 = corners[el.corners[0]._obj];
					let n2 = corners[el.corners[1]._obj];
					let [x1, y1, x2, y2] = [n1.info.x, n1.info.y, n2.info.x, n2.info.y];
					edges[eid] = { oid: eid, o: el, info: { shape: 'line', memType: 'edge', x1: x1, y1: y1, x2: x2, y2: y2, x: (x1 + x2) / 2, y: (y1 + y2) / 2, thickness: 1, w: 1, h: 1 } };
					dhelp[eid] = true;
				}
			}
		}
		return { board: board, fields: fields, corners: corners, edges: edges };
	}
}
class AAddress extends APasscode {
	constructor(k, dbInfo, userInfo) {
		super(k, dbInfo, userInfo);
	}
	clear() { super.clear(); Speech.setLanguage(Settings.language); window.onclick = null; }
	presentInit() {
		this.msgPrompt = 'enter your address';
		this.lastHintPrompt = 'please complete entering address!';
		this.goal = { label: '17448 NE 98th Way Redmond 98052' };
		Speech.setLanguage('E')
		let wr = 'your address is:';
		let sp = 'your address is 1 7 4 4 8 - North-East 98th Way - Redmond, 9 8 0 5 2';
		showInstruction(this.goal.label, wr, this.dInstruction, true, sp, 12);
		this.goal.div = mText(this.goal.label, this.dMain, { fz: 40 });
		this.TOList.push(setTimeout(anim1, 300, this.goal, 500));
	}
	presentPrompt() {
		Speech.setLanguage('E');
		stdInstruction(this.msgPrompt, this.dInstruction, this.msgPrompt, { voice: 'zira' });
		this.input = stdInput(this.dMain, { w: 600, fz: 24 });
		this.input.id = this.defaultFocusElement = 'inputAddon';
		this.nCorrect = 0;
	}
	activate() {
		window.onclick = () => mBy(this.defaultFocusElement).focus();
		this.input.onkeyup = ev => {
			if (ev.key === "Enter") {
				ev.cancelBubble = true;
				this.processInput(ev);
			}
		};
		this.input.focus();
		super.activate();
	}
	eval() {
		let correctPrefix = this.correctPrefix = getCorrectPrefix(this.goal.label, this.input.value);
		return correctPrefix == this.goal.label;
	}
	getHint() {
		let oldHintLength = isdef(this.hintLength) ? this.hintLength : 0;
		if (nundef(this.hintLength)) this.hintLength = 0;
		this.input.value = this.correctPrefix;
		let progress = this.correctPrefix.length > this.nCorrect;
		if (this.correctPrefix.length > this.nCorrect) {
			this.hintLength = 1;
			this.nCorrect = this.correctPrefix.length;
		} else if (this.hintLength < this.goal.label.length - this.nCorrect) this.hintLength += 1;
		if (this.hintLength == 0) this.hintLength = 1;
		let wr = substringOfMinLength(this.goal.label, this.correctPrefix.length, this.hintLength);
		let sp = oldHintLength == this.hintLength && !progress ? this.lastHintPrompt : null;
		return [wr, sp];
	}
}
class ABattle {
	constructor(assets, loc, b, stage) {
		this.assets = assets;
		this.location = loc;
		this.b = b;
		this.stage = stage;
		this.roundCounter = 0;
		this.factions = [b.attacker, b.defender];
		this.allUnitTypes = Array.from(new Set(b.fire_order.map(x => x.unit.type)));
		this.ms = {};
		this.selected = false;
		this.msFire = null;
		this.nColsPerFaction = this.calcMaxUnitTypePerFaction();
		let hTitle = 25 * 2;
		let usz = assets.SZ.cadreDetail;
		let hGap = 4;
		let hRow = usz + hGap;
		let hTotal = hRow * this.allUnitTypes.length + hTitle + 2 * hGap;
		if (b.isSeaBattle) {
			hTotal += 30;
		}
		let wGap = hGap;
		let wFactionGap = 10 * hGap;
		let wCol = usz + wGap;
		let wColTotal = Object.values(this.nColsPerFaction).reduce((a, b) => a + b, 0);
		let wColsPerFaction = {};
		let xStartPerFaction = {};
		let xAkku = wGap;
		for (const f of this.factions) {
			wColsPerFaction[f] = this.nColsPerFaction[f] * wCol;
			xStartPerFaction[f] = xAkku;
			xAkku += wColsPerFaction[f] + wFactionGap;
		}
		let yStartPerUnitType = {};
		let yAkku = hGap + 25;
		for (const t of this.allUnitTypes) {
			yStartPerUnitType[t] = yAkku;
			yAkku += hRow;
		}
		this.xStartPerFaction = xStartPerFaction;
		this.yStartPerUnitType = yStartPerUnitType;
		this.wColsPerFaction = wColsPerFaction;
		let wTotal = wGap + wColTotal * wCol + wFactionGap * this.factions.length + wGap;
		this.size = { w: wTotal, h: hTotal };
		this.unitSize = { w: wCol, h: hRow };
		this.gap = { w: wGap, h: hGap, col: wFactionGap };
	}
	highlightBattleGroups(b) {
		let units = b.fire_order;
		let battleGroups = b.battle_groups;
		for (const u of units) {
			let bgIndex = battleGroups.indexOf(u.battle_group);
			if (bgIndex >= 0) {
				let c = getpal(2, 0, 'b', this.battleGroupPalette);
				let ms = this.ms[u.id];
				ms.selKeyColor(c, 'bg' + bgIndex, 0.2);
			}
		}
	}
	coverBattleGroup(bg, b) {
		for (const u of b.fire_order) {
			if (u.battle_group == bg) {
				let ms = this.ms[u.id];
				let sz = this.assets.SZ.cadreDetail;
				ms.cover('grey');
			}
		}
	}
	uncoverBattleGroup(bg, b) {
		for (const u of b.fire_order) {
			if (u.battle_group == b.battle_group) {
				let ms = this.ms[u.id];
				ms.uncover();
			}
		}
	}
	selectBattle() {
		this.battleDiv.style.border = '4px solid yellow';
	}
	unselectBattle() {
		this.battleDiv.style.border = '1px solid ' + getpal(6);
	}
	selectFireUnit() {
		if (this.msFire) this.msFire.unhighlight();
		this.msFire = this.ms[this.b.fire.id];
		this.msFire.highlight();
	}
	unhighlightUnits() {
		for (const id in this.ms) {
			let ms = this.ms[id];
			if (ms.getTag('dead') || ms.getTag('removed')) continue;
			ms.unhighlight();
			ms.unselKeyColor();
		}
	}
	highlightANS(pl) {
		for (const id in this.ms) {
			let ms = this.ms[id];
			let type = ms.getTag('type');
			let owner = ms.getTag('owner');
			if (owner == pl && isANS(type)) {
				if (!ms.getTag('dead') && !ms.getTag('removed')) {
					ms.highlight();
				}
			}
		}
	}
	highlightTargetClass() {
		for (const u of this.b.target_units) {
			let ms = this.ms[u.id];
			ms.highlight();
		}
	}
	unhighlightTargetClass() {
		for (const u of this.b.target_units) {
			let ms = this.ms[u.id];
			ms.unhighlight();
		}
	}
	markMandatoryRebased(b_old, b) {
		for (const u of b_old.fire_order) {
			let id = u.id;
			let unitInB = firstCond(b.fire_order, x => x.id == id);
			if (!unitInB) {
				this.markAsRetreated(id);
			}
		}
	}
	markAsRetreated(id) {
		let ms = this.ms[id];
		ms.unhighlight();
		ms.selKeyColor('darkSlateGrey', 'retreated', 0.7);
		ms.tag('removed', true);
	}
	selectTheDead(b_old, b_new) {
		let degraded = '';
		let removed = '';
		let message = '';
		for (const u of b_old.fire_order) {
			let id = u.id;
			let ms = this.ms[id];
			let uNew = firstCond(b_new.fire_order, x => x.id == id);
			if (uNew) {
				let cv_old = u.unit.cv;
				let cv_new = uNew.unit.cv;
				if (cv_old != cv_new) {
					this.updateCv(ms, cv_new);
					degraded += ' ' + id.toString();
				}
			} else {
				this.updateCv(ms, 0);
				ms.selColor('black', 0.8);
				ms.tag('dead', true);
				removed += ' ' + id.toString();
			}
		}
		if (!empty(degraded)) message += degraded + ' degraded. ';
		if (!empty(removed)) message += removed + ' removed. ';
		message += 'Please accept!';
		return message;
	}
	selectUnitsHit(b) {
		for (const u of b.units_hit) {
			let id = u.id;
			let ms = this.ms[id];
			ms.selKeyColor('red');
		}
	}
	startDiceAnimation(fire) {
		this.fire = fire;
		let dDice = fire.owner == this.b.attacker ? this.attackerDiceDiv : this.defenderDiceDiv;
		this.diceRolling = true;
		dDice.classList.add('pulseOn');
	}
	stopDiceAnimation(fire) {
		let dDice = fire.owner == this.b.attacker ? this.attackerDiceDiv : this.defenderDiceDiv;
		dDice.classList.remove('pulseOn');
		this.diceRolling = false;
	}
	showHits(hits) {
		let dDice = this.b.fire.owner == this.b.attacker ? this.attackerDiceDiv : this.defenderDiceDiv;
		let html = dDice.innerHTML;
		dDice.innerHTML = html + '<br>' + hits;
		divscrolldown(dDice.id);
	}
	createUnit(u, id, gName, type, nationality) {
		let owner = getUnitOwner(nationality);
		let imagePath = '/a/assets/images/' + type + '.svg';
		let isMinorColor = !(nationality in this.assets.troopColors);
		let color = isMinorColor ? this.assets.troopColors['Minor'] : this.assets.troopColors[nationality];
		let darker = darkerColor(color[0], color[1], color[2]);
		if (this.b.isSeaBattle) {
			let bgroup = u.battle_group;
			if (bgroup) {
				let ibg = this.battleGroups.indexOf(bgroup);
				darker = getpal(ibg, 0, 'b', this.battleGroupPalette);
			}
		}
		let sz = this.assets.SZ.cadreDetail;
		let sz80 = sz * 0.86;
		let szImage = sz / 1.5;
		let y = szImage / 6;
		let ms = new MS(id, gName)
			.roundedRect({ className: 'ground', w: sz, h: sz, fill: color, rounding: sz * 0.1 })
			.roundedRect({ w: sz80, h: sz80, fill: darker, rounding: sz * 0.1 })
			.image({ path: imagePath, y: y, w: szImage, h: szImage })
			.roundedRect({ className: 'unit overlay', w: sz, h: sz, fill: darker, rounding: sz * 0.1 });
		ms.tag('type', type);
		ms.tag('owner', owner);
		ms.tag('nationality', nationality);
		return ms;
	}
	calcMaxUnitTypePerFaction() {
		let unitTypeCountPerFaction = {};
		let byTypeAndFaction = new Counter(this.b.fire_order, x => x.unit.type + '_' + x.owner);
		for (let g of cartesian(this.allUnitTypes, this.factions)) {
			let type = stringBefore(g, '_');
			let faction = stringAfter(g, '_');
			if (!(faction in unitTypeCountPerFaction)) unitTypeCountPerFaction[faction] = {};
			let count = byTypeAndFaction.get(g);
			unitTypeCountPerFaction[faction][type] = count ? count : 0;
		}
		let nColsPerFaction = {};
		for (const f of this.factions) {
			nColsPerFaction[f] = getItemWithMaxValue(unitTypeCountPerFaction[f])[1];
		}
		return nColsPerFaction;
	}
	mirror_units(data, H) {
		unitTestMirrorBattle('new data:', data);
		unitTestMirrorBattle('H:', H);
		for (const u of data.battle.fire_order) {
			let o = H.objects[u.id];
			if (u.unit.cv != o.cv) {
				this.updateCv(this.ms[u.id], o.cv);
			}
		}
		if ('dead' in data.battle) {
			for (const u of data.battle.dead) {
				if (u.id in H.objects) {
					unitTestMirrorBattle('H still contains dead unit', u.id);
				} else {
					unitTestMirrorBattle('dead unit', u.id, 'has been removed from H');
					if (u.id in this.ms) {
						let ms = this.ms[u.id];
						if (!ms.getTag('dead')) {
							this.updateCv(ms, 0);
							ms.unhighlight();
							ms.select();
							ms.tag('dead', true);
						} else {
							unitTestMirrorBattle('unit', u.id, 'has already been marked dead!!!');
						}
					} else {
						unitTestMirrorBattle('ERROR!!! dead unit', u.id, 'not in ms!!!!');
					}
				}
			}
		}
	}
	populate(dBattleOuter, gid, bg, fg) {
		let dBattleLeft = addDivClass(dBattleOuter, 'dBattleLeft', 'battleLeft');
		let dBattleRight = addDivClass(dBattleOuter, 'dBattleRight', 'battleRight');
		let dBattleMiddle = addDivClass(dBattleOuter, 'dBattleMiddle', 'battleMiddle');
		let dBattleTitle = addDivClass(dBattleMiddle, 'dBattleTitle', 'battleTitle');
		dBattleTitle.innerHTML = this.location;
		let dBattleFactions = addDivClass(dBattleMiddle, 'dBattleFactions', 'battleFactions');
		dBattleFactions.style.width = this.size.w + 'px';
		let topBottom = 25 + this.b.isSeaBattle ? 30 : 0;
		dBattleFactions.style.height = this.size.h - topBottom + 'px';
		let g1 = addSvgg(dBattleFactions, gid);
		if (this.b.isSeaBattle) {
			this.battleGroups = this.b.battle_groups;
			let dBattleGroups = addDivClass(dBattleMiddle, 'dBattleGroups', 'battleGroups');
			let n = this.battleGroups.length;
			this.battleGroupPalette = paletteFromRGBArray(assets.troopColors[this.b.attacker]);
			for (const gr of this.battleGroups) {
				let i = this.battleGroups.indexOf(gr);
				let bg = getpal(i, 0, 'b', this.battleGroupPalette);
				let fg = getpal(i, 0, 'f', this.battleGroupPalette);
				let sp = addSpanColor(dBattleGroups, 'sp' + gr, bg, fg);
				sp.innerHTML = gr;
			}
		}
		this.gid = gid;
		this.battleDiv = dBattleOuter;
		this.attackerDiceDiv = dBattleLeft;
		this.defenderDiceDiv = dBattleRight;
		let i = 0;
		for (const f of this.factions) {
			let id = 't' + i;
			i += 1;
			let x = this.xStartPerFaction[f] + this.wColsPerFaction[f] / 2;
			let msTitle = new MS(id, gid)
				.text({ txt: f, fill: fg })
				.setPos(x, 15)
				.draw();
		}
		let xStart = this.gap.w;
		let yStart = this.gap.h;
		let x = xStart;
		let y = yStart;
		let curFaction = null;
		let curType = null;
		for (const u of this.b.fire_order) {
			let type = u.unit.type;
			let faction = u.owner;
			if (faction != curFaction) {
				x = this.xStartPerFaction[faction];
			}
			if (type != curType) {
				y = this.yStartPerUnitType[type];
				x = this.xStartPerFaction[faction];
			}
			let usz = this.unitSize.w / 2;
			let ms = this.createUnit(u, 'u' + u.id, gid, type, u.unit.nationality);
			ms.setPos(x + usz, y + usz).draw();
			this.updateCv(ms, u.unit.cv);
			this.ms[u.id] = ms;
			curType = type;
			curFaction = faction;
			x += this.unitSize.w + this.gap.w;
		}
	}
	roundEnding() {
		unitTestCombatStage('roundEnding!!!');
		for (const id in this.ms) {
			this.ms[id].unhighlight();
		}
	}
	update(data, H) {
		let c = data.temp.combat;
		let b_old = this.b;
		this.b = c.battle;
		let b = this.b;
		unitTestBattle('_______b.stage:', b.stage, b);
		console.log('b.stage', b.stage);
		let message = '';
		if (b.stage == 'battle_start_ack') {
			message = 'Battle starting in ' + b.tilename.toUpperCase() + ': please accept!';
			this.selectBattle();
		} else if (b.stage == 'battle_round_start_ack') {
			message = b.attacker + ', please select active battle group!';
			this.unhighlightUnits();
			if (b.isSeaBattle) {
				for (const bg of b.battle_groups) {
					this.coverBattleGroup(bg, b);
				}
				this.battleGroupsCovered = true;
			}
		} else if (b.stage == 'select_combat_action_ack') {
			this.unhighlightUnits();
			message = b.fire.owner + ', please select combat action!';
			if (b.isSeaBattle && this.battleGroupsCovered) {
				this.uncoverBattleGroup(b.battle_group, b);
				this.battleGroupsCovered = false;
			}
			this.selectFireUnit(b);
		} else if (b.stage == 'hit_ack') {
			message = b.fire.owner + ' targeting class ' + b.target_class + ': PLEASE ACCEPT!';
			this.highlightTargetClass();
			this.startDiceAnimation(b.fire);
		} else if (b.stage == 'have_hits_ack' || b.stage == 'no_hits_ack') {
			message = b.hits + ' hits left! (accept or select type)';
			this.stopDiceAnimation(b.fire);
			if (b.hits == b.outcome) this.showHits(b.outcome);
		} else if (b.stage == 'damage_ack') {
			this.unhighlightTargetClass(b_old);
			this.selectUnitsHit(b);
			message = this.selectTheDead(b_old, b);
		} else if (b.stage == 'battle_ends_ack') {
			this.unhighlightUnits();
			this.selectTheDead(b_old, b);
			this.markMandatoryRebased(b_old, b);
			message = 'Battle ends!!';
		} else if (b.stage == 'mandatory_rebase_ack') {
			this.unhighlightUnits();
			this.highlightANS(H.player);
			message = 'Select mandatory rebase option!!';
		} else if (b.stage == 'retreat_ack') {
			message = b.selectedRetreatUnit + ' HAS RETREATED TO ' + b.selectedRetreatTile;
			this.markAsRetreated(b.fire.id);
		} else {
			return 'NOT IMPLEMENTED!!!!!';
		}
		unitTestBattle('____________');
		return message;
	}
	update_dep(data, H) {
		let c = data.temp.combat;
		if (c.battle.isSeaBattle) return this.updateSeaBattle(data, H);
		let b_old = this.b;
		let b = (this.b = c.battle);
		unitTestBattle('_______b.stage:', b.stage, b);
		let message = '';
		if (b.stage == 'battle_start_ack') {
			message = 'BATTLE STARTING IN ' + b.tilename.toUpperCase() + ': PLEASE ACCEPT!';
			this.selectBattle();
		} else if (b.stage == 'select_command') {
			message = 'SELECT TARGET CLASS OR RETREAT OPTIONS OR ACCEPT!!!';
			this.selectFireUnit();
		} else if (b.stage == 'ack_combat_action') {
			this.selectFireUnit();
			if (b.combat_action == 'hit') {
				message = b.fire.owner + ' TARGETING CLASS ' + b.target_class + ': PLEASE ACCEPT!';
				this.highlightTargetClass();
				this.startDiceAnimation(b.fire);
			} else {
				message = b.fire.owner + ' RETREATING TO ' + b.retreat_options[0][1] + ': PLEASE ACCEPT!';
			}
		} else if (b.stage == 'select_hit_type') {
			message = b.outcome + ' HITS, PLEASE SELECT TYPE TO HIT FIRST!';
			this.stopDiceAnimation(b.fire);
			this.showHits(b.outcome);
		} else if (b.stage == 'ack_retreat') {
			message = b.selectedRetreatUnit + ' HAS RETREATED TO ' + b.selectedRetreatTile;
			this.markAsRetreated(b.fire.id);
		} else if (b.stage == 'select_mandatory_rebase') {
			this.markMandatoryRebased(b_old, b);
			message = H.player + ', SELECT MANDATORY REBASE OPTION';
			this.unhighlightUnits();
			this.highlightANS(H.player);
		} else if (b.stage == 'accept_outcome') {
			if (this.diceRolling) {
				message = b.outcome + ' HITS HITTING ' + b.units_hit.map(u => u.id + '(' + u.type + ')').join(' ') + ': PLEASE ACCEPT!';
				this.stopDiceAnimation(b.fire);
				this.showHits(b.outcome);
				let f = b.fire_order[b.idx];
			} else {
				message = this.selectTheDead(b_old, b);
			}
		} else if (b.stage == 'ack_combat_action_done') {
			this.unhighlightTargetClass(b_old);
			if (b.combat_action == 'hit') {
				message = this.selectTheDead(b_old, b);
			} else {
				message = b.fire.id + ' has retreated. Please accept!';
			}
		} else if (b.stage == 'ack_battle_interrupted_no_enemy_units_left') {
			if (b.combat_action == 'hit') {
				this.selectTheDead(b_old, b);
			}
			message = 'BATTLE ENDS HERE: NO ENEMY UNITS LEFT!!!';
		} else if (b.stage == 'ack_battle_decided') {
			if (b.winner == b.owner) {
				message = b.winner + ' has defended his territory! please accept!';
			} else {
				message = b.winner + ' has conquered new territory!!! please accept!';
			}
			this.selectTheDead(b_old, b);
		} else if (b.stage == 'ack_cleanup_battle') {
			message = 'battle in ' + b.tilename + ' is ending! please accept!';
			this.unhighlightUnits();
			this.markMandatoryRebased(b_old, b);
			this.unselectBattle();
		}
		if (b.stage == 'battle_round_start_ack') {
			message = b.attacker + ', please select active battle group!';
			this.highlightBattleGroups(b);
		}
		unitTestBattle('____________');
		return message;
	}
	updateSeaBattle(data, H) {
		let c = data.temp.combat;
		let b_old = this.b;
		this.b = c.battle;
		let b = this.b;
		unitTestBattle('_______b.stage:', b.stage, b);
		let message = '';
		if (b.stage == 'battle_start_ack') {
			message = 'BATTLE STARTING IN ' + b.tilename.toUpperCase() + ': PLEASE ACCEPT!';
			this.selectBattle();
		} else if (b.stage == 'battle_round_start_ack') {
			message = b.attacker + ', please select active battle group!';
			this.highlightBattleGroups(b);
		} else if (b.stage == 'select_combat_action_ack') {
			message = b.attacker + ', please select combat action!';
			this.coverOtherBattleGroups(b);
			this.selectFireUnit(b);
		}
		if (b.stage == 'ack_combat_action') {
			this.selectFireUnit();
			if (b.combat_action == 'hit') {
				message = b.fire.owner + ' TARGETING CLASS ' + b.target_class + ': PLEASE ACCEPT!';
				this.highlightTargetClass();
				this.startDiceAnimation(b.fire);
			} else {
				message = b.fire.owner + ' RETREATING TO ' + b.retreat_options[0][1] + ': PLEASE ACCEPT!';
			}
		} else if (b.stage == 'select_hit_type') {
			message = b.outcome + ' HITS, PLEASE SELECT TYPE TO HIT FIRST!';
			this.stopDiceAnimation(b.fire);
			this.showHits(b.outcome);
		} else if (b.stage == 'ack_retreat') {
			message = b.selectedRetreatUnit + ' HAS RETREATED TO ' + b.selectedRetreatTile;
			this.markAsRetreated(b.fire.id);
		} else if (b.stage == 'select_mandatory_rebase') {
			this.markMandatoryRebased(b_old, b);
			message = H.player + ', SELECT MANDATORY REBASE OPTION';
			this.unhighlightUnits();
			this.highlightANS(H.player);
		} else if (b.stage == 'accept_outcome') {
			if (this.diceRolling) {
				message = b.outcome + ' HITS HITTING ' + b.units_hit.map(u => u.id + '(' + u.type + ')').join(' ') + ': PLEASE ACCEPT!';
				this.stopDiceAnimation(b.fire);
				this.showHits(b.outcome);
				let f = b.fire_order[b.idx];
			} else {
				message = this.selectTheDead(b_old, b);
			}
		} else if (b.stage == 'ack_combat_action_done') {
			this.unhighlightTargetClass(b_old);
			if (b.combat_action == 'hit') {
				message = this.selectTheDead(b_old, b);
			} else {
				message = b.fire.id + ' has retreated. Please accept!';
			}
		} else if (b.stage == 'ack_battle_interrupted_no_enemy_units_left') {
			if (b.combat_action == 'hit') {
				this.selectTheDead(b_old, b);
			}
			message = 'BATTLE ENDS HERE: NO ENEMY UNITS LEFT!!!';
		} else if (b.stage == 'ack_battle_decided') {
			if (b.winner == b.owner) {
				message = b.winner + ' has defended his territory! please accept!';
			} else {
				message = b.winner + ' has conquered new territory!!! please accept!';
			}
			this.selectTheDead(b_old, b);
		} else if (b.stage == 'ack_cleanup_battle') {
			message = 'battle in ' + b.tilename + ' is ending! please accept!';
			this.unhighlightUnits();
			this.markMandatoryRebased(b_old, b);
			this.unselectBattle();
		}
		unitTestBattle('____________');
		return message;
	}
	updateCv(ms, cv) {
		ms.removeFromChildIndex(5);
		let sz = this.assets.SZ.cadreDetail;
		let dx = sz / (cv + 1);
		let xStart = -sz / 2;
		let y = -sz / 3.2;
		let diam = Math.min(dx / 1.5, sz / 5);
		let x = dx + xStart;
		for (let i = 0; i < cv; i++) {
			ms.circle({ sz: diam, x: x, y: y, fill: 'white' });
			x += dx;
		}
		ms.tag('cv', cv);
	}
}
class ABattleSea {
	constructor(assets, loc, b, stage) {
		this.assets = assets;
		this.location = loc;
		this.b = b;
		this.stage = stage;
		this.roundCounter = 0;
		this.factions = [b.attacker, b.defender];
		this.allUnitTypes = Array.from(new Set(b.fire_order.map(x => x.unit.type)));
		this.battle_groups = b.battle_groups;
		console.log('battle_groups', this.battle_groups)
		this.ms = {};
		this.selected = false;
		this.msFire = null;
		this.nColsPerFaction = this.calcMaxUnitTypePerFaction();
		let hTitle = 25 * 2;
		let usz = assets.SZ.cadreDetail;
		let hGap = 4;
		let hRow = usz + hGap;
		let hTotal = hRow * this.allUnitTypes.length + hTitle + 2 * hGap;
		let wGap = hGap;
		let wFactionGap = 10 * hGap;
		let wCol = usz + wGap;
		let wColTotal = Object.values(this.nColsPerFaction).reduce((a, b) => a + b, 0);
		let wColsPerFaction = {};
		let xStartPerFaction = {};
		let xAkku = wGap;
		for (const f of this.factions) {
			wColsPerFaction[f] = this.nColsPerFaction[f] * wCol;
			xStartPerFaction[f] = xAkku;
			xAkku += wColsPerFaction[f] + wFactionGap;
		}
		let yStartPerUnitType = {};
		let yAkku = hGap + 25;
		for (const t of this.allUnitTypes) {
			yStartPerUnitType[t] = yAkku;
			yAkku += hRow;
		}
		this.xStartPerFaction = xStartPerFaction;
		this.yStartPerUnitType = yStartPerUnitType;
		this.wColsPerFaction = wColsPerFaction;
		let wTotal = wGap + wColTotal * wCol + wFactionGap * this.factions.length + wGap;
		this.size = { w: wTotal, h: hTotal };
		this.unitSize = { w: wCol, h: hRow };
		this.gap = { w: wGap, h: hGap, col: wFactionGap };
	}
	selectBattle() {
		this.battleDiv.style.border = '4px solid yellow';
	}
	unselectBattle() {
		this.battleDiv.style.border = '1px solid ' + getpal(6);
	}
	selectFireUnit() {
		if (this.msFire) this.msFire.unhighlight();
		this.msFire = this.ms[this.b.fire.id];
		this.msFire.highlight();
	}
	unhightlightUnits() {
		for (const id in this.ms) {
			let ms = this.ms[id];
			console.log('unhighlighting', ms.getTag('owner'), ms.getTag('type'));
			ms.unhighlight();
		}
	}
	highlightANS(pl) {
		for (const id in this.ms) {
			let ms = this.ms[id];
			let type = ms.getTag('type');
			let owner = ms.getTag('owner');
			if (owner == pl && isANS(type)) {
				if (!ms.getTag('dead') && !ms.getTag('removed')) {
					ms.highlight();
				}
			}
		}
	}
	highlightTargetClass() {
		for (const id in this.b.target_units) {
			let ms = this.ms[id];
			ms.highlight();
		}
	}
	unhighlightTargetClass() {
		for (const id in this.b.target_units) {
			let ms = this.ms[id];
			ms.unhighlight();
		}
	}
	markMandatoryRebased(b_old, b) {
		for (const u of b_old.fire_order) {
			let id = u.id;
			let unitInB = firstCond(b.fire_order, x => x.id == id);
			if (!unitInB) {
				this.markAsRetreated(id);
			}
		}
	}
	markAsRetreated(id) {
		let ms = this.ms[id];
		ms.unhighlight();
		ms.selKeyColor('darkSlateGrey', 'retreated', 0.7);
		ms.tag('removed', true);
	}
	selectTheDead(b_old, b_new) {
		let degraded = '';
		let removed = '';
		let message = '';
		for (const u of b_old.fire_order) {
			let id = u.id;
			let ms = this.ms[id];
			let uNew = firstCond(b_new.fire_order, x => x.id == id);
			if (uNew) {
				let cv_old = u.unit.cv;
				let cv_new = uNew.unit.cv;
				if (cv_old != cv_new) {
					this.updateCv(ms, cv_new);
					degraded += ' ' + id.toString();
				}
			} else {
				this.updateCv(ms, 0);
				ms.selColor('black', 0.8);
				ms.tag('dead', true);
				removed += ' ' + id.toString();
			}
		}
		if (!empty(degraded)) message += degraded + ' degraded. ';
		if (!empty(removed)) message += removed + ' removed. ';
		message += 'Please accept!';
		return message;
	}
	startDiceAnimation(fire) {
		this.fire = fire;
		let dDice = fire.owner == this.b.attacker ? this.attackerDiceDiv : this.defenderDiceDiv;
		this.diceRolling = true;
		dDice.classList.add('pulseOn');
	}
	stopDiceAnimation(fire) {
		let dDice = fire.owner == this.b.attacker ? this.attackerDiceDiv : this.defenderDiceDiv;
		dDice.classList.remove('pulseOn');
		this.diceRolling = false;
	}
	showHits(hits) {
		let dDice = this.b.fire.owner == this.b.attacker ? this.attackerDiceDiv : this.defenderDiceDiv;
		let html = dDice.innerHTML;
		dDice.innerHTML = html + '<br>' + hits;
	}
	addUnit(id, gName, type, nationality, cv, x, y) {
		let ms = this.createUnit(id, gName, type, nationality);
		ms.setPos(x, y).draw();
		this.updateCv(ms, cv);
		return ms;
	}
	createUnit(id, gName, type, nationality) {
		let owner = getUnitOwner(nationality);
		let imagePath = '/a/assets/images/' + type + '.svg';
		let isMinorColor = !(nationality in this.assets.troopColors);
		let color = isMinorColor ? this.assets.troopColors['Minor'] : this.assets.troopColors[nationality];
		let darker = darkerColor(color[0], color[1], color[2]);
		let sz = this.assets.SZ.cadreDetail;
		let sz80 = sz * 0.86;
		let szImage = sz / 1.5;
		let y = szImage / 6;
		let ms = new MS(id, gName)
			.roundedRect({ className: 'ground', w: sz, h: sz, fill: color, rounding: sz * 0.1 })
			.roundedRect({ w: sz80, h: sz80, fill: darker, rounding: sz * 0.1 })
			.image({ path: imagePath, y: y, w: szImage, h: szImage })
			.roundedRect({ className: 'unit overlay', w: sz, h: sz, fill: darker, rounding: sz * 0.1 });
		ms.tag('type', type);
		ms.tag('owner', owner);
		ms.tag('nationality', nationality);
		return ms;
	}
	calcMaxUnitTypePerFaction() {
		let unitTypeCountPerFaction = {};
		let byTypeAndFaction = new Counter(this.b.fire_order, x => x.unit.type + '_' + x.owner);
		for (let g of cartesian(this.allUnitTypes, this.factions)) {
			let type = stringBefore(g, '_');
			let faction = stringAfter(g, '_');
			if (!(faction in unitTypeCountPerFaction)) unitTypeCountPerFaction[faction] = {};
			let count = byTypeAndFaction.get(g);
			unitTypeCountPerFaction[faction][type] = count ? count : 0;
		}
		let nColsPerFaction = {};
		for (const f of this.factions) {
			nColsPerFaction[f] = getItemWithMaxValue(unitTypeCountPerFaction[f])[1];
		}
		return nColsPerFaction;
	}
	mirror_units(data, H) {
		unitTestMirrorBattle('new data:', data);
		unitTestMirrorBattle('H:', H);
		for (const u of data.battle.fire_order) {
			let o = H.objects[u.id];
			if (u.unit.cv != o.cv) {
				this.updateCv(this.ms[u.id], o.cv);
			}
		}
		if ('dead' in data.battle) {
			for (const u of data.battle.dead) {
				if (u.id in H.objects) {
					unitTestMirrorBattle('H still contains dead unit', u.id);
				} else {
					unitTestMirrorBattle('dead unit', u.id, 'has been removed from H');
					if (u.id in this.ms) {
						let ms = this.ms[u.id];
						if (!ms.getTag('dead')) {
							this.updateCv(ms, 0);
							ms.unhighlight();
							ms.select();
							ms.tag('dead', true);
						} else {
							unitTestMirrorBattle('unit', u.id, 'has already been marked dead!!!');
						}
					} else {
						unitTestMirrorBattle('ERROR!!! dead unit', u.id, 'not in ms!!!!');
					}
				}
			}
		}
	}
	populate(dBattleOuter, gid, bg, fg) {
		let dBattleLeft = addDivClass(dBattleOuter, 'dBattleLeft', 'battleLeft');
		let dBattleRight = addDivClass(dBattleOuter, 'dBattleRight', 'battleRight');
		let dBattleMiddle = addDivClass(dBattleOuter, 'dBattleMiddle', 'battleMiddle');
		let dBattleTitle = addDivClass(dBattleMiddle, 'dBattleTitle', 'battleTitle');
		dBattleTitle.innerHTML = this.location;
		let dBattleFactions = addDivClass(dBattleMiddle, 'dBattleFactions', 'battleFactions');
		dBattleFactions.style.width = this.size.w + 'px';
		dBattleFactions.style.height = this.size.h - 25 + 'px';
		let g1 = addSvgg(dBattleFactions, gid);
		this.gid = gid;
		this.battleDiv = dBattleOuter;
		this.attackerDiceDiv = dBattleLeft;
		this.defenderDiceDiv = dBattleRight;
		let i = 0;
		for (const f of this.factions) {
			let id = 't' + i;
			i += 1;
			let x = this.xStartPerFaction[f] + this.wColsPerFaction[f] / 2;
			let msTitle = new MS(id, gid)
				.text({ txt: f, fill: fg })
				.setPos(x, 15)
				.draw();
		}
		let xStart = this.gap.w;
		let yStart = this.gap.h;
		let x = xStart;
		let y = yStart;
		let curFaction = null;
		let curType = null;
		for (const u of this.b.fire_order) {
			let type = u.unit.type;
			let faction = u.owner;
			if (faction != curFaction) {
				x = this.xStartPerFaction[faction];
			}
			if (type != curType) {
				y = this.yStartPerUnitType[type];
				x = this.xStartPerFaction[faction];
			}
			let usz = this.unitSize.w / 2;
			let ms = this.createUnit('u' + u.id, gid, type, u.unit.nationality);
			ms.setPos(x + usz, y + usz).draw();
			this.updateCv(ms, u.unit.cv);
			this.ms[u.id] = ms;
			curType = type;
			curFaction = faction;
			x += this.unitSize.w + this.gap.w;
		}
	}
	roundEnding() {
		unitTestCombatStage('roundEnding!!!');
		for (const id in this.ms) {
			this.ms[id].unhighlight();
		}
	}
	update(data, H) {
		let c = data.temp.combat;
		let b_old = this.b;
		let b = (this.b = c.battle);
		unitTestBattle('_______b.stage:', b.stage, b);
		let message = '';
		if (b.stage == 'battle_start_ack') {
			message = 'BATTLE STARTING IN ' + b.tilename.toUpperCase() + ': PLEASE ACCEPT!';
			this.selectBattle();
		} else if (b.stage == 'select_command') {
			message = 'SELECT TARGET CLASS OR RETREAT OPTIONS OR ACCEPT!!!';
			this.selectFireUnit();
		} else if (b.stage == 'ack_combat_action') {
			this.selectFireUnit();
			if (b.combat_action == 'hit') {
				message = b.fire.owner + ' TARGETING CLASS ' + b.target_class + ': PLEASE ACCEPT!';
				this.highlightTargetClass();
				this.startDiceAnimation(b.fire);
			} else {
				message = b.fire.owner + ' RETREATING TO ' + b.retreat_options[0][1] + ': PLEASE ACCEPT!';
			}
		} else if (b.stage == 'select_hit_type') {
			message = b.outcome + ' HITS, PLEASE SELECT TYPE TO HIT FIRST!';
			this.stopDiceAnimation(b.fire);
			this.showHits(b.outcome);
		} else if (b.stage == 'ack_retreat') {
			message = b.selectedRetreatUnit + ' HAS RETREATED TO ' + b.selectedRetreatTile;
			this.markAsRetreated(b.fire.id);
		} else if (b.stage == 'select_mandatory_rebase') {
			this.markMandatoryRebased(b_old, b);
			message = H.player + ', SELECT MANDATORY REBASE OPTION';
			this.unhightlightUnits();
			this.highlightANS(H.player);
		} else if (b.stage == 'accept_outcome') {
			if (this.diceRolling) {
				message = b.outcome + ' HITS HITTING ' + b.units_hit.map(u => u.id + '(' + u.type + ')').join(' ') + ': PLEASE ACCEPT!';
				this.stopDiceAnimation(b.fire);
				this.showHits(b.outcome);
				let f = b.fire_order[b.idx];
			} else {
				message = this.selectTheDead(b_old, b);
			}
		} else if (b.stage == 'ack_combat_action_done') {
			this.unhighlightTargetClass(b_old);
			if (b.combat_action == 'hit') {
				message = this.selectTheDead(b_old, b);
			} else {
				message = b.fire.id + ' has retreated. Please accept!';
			}
		} else if (b.stage == 'ack_battle_interrupted_no_enemy_units_left') {
			if (b.combat_action == 'hit') {
				this.selectTheDead(b_old, b);
			}
			message = 'BATTLE ENDS HERE: NO ENEMY UNITS LEFT!!!';
		} else if (b.stage == 'ack_battle_decided') {
			if (b.winner == b.owner) {
				message = b.winner + ' has defended his territory! please accept!';
			} else {
				message = b.winner + ' has conquered new territory!!! please accept!';
			}
			this.selectTheDead(b_old, b);
		} else if (b.stage == 'ack_cleanup_battle') {
			message = 'battle in ' + b.tilename + ' is ending! please accept!';
			this.unhightlightUnits();
			this.markMandatoryRebased(b_old, b)
			this.unselectBattle();
		}
		unitTestBattle('____________');
		return message;
	}
	updateCv(ms, cv) {
		ms.removeFromChildIndex(5);
		let sz = this.assets.SZ.cadreDetail;
		let dx = sz / (cv + 1);
		let xStart = -sz / 2;
		let y = -sz / 3.2;
		let diam = Math.min(dx / 1.5, sz / 5);
		let x = dx + xStart;
		for (let i = 0; i < cv; i++) {
			ms.circle({ sz: diam, x: x, y: y, fill: 'white' });
			x += dx;
		}
		ms.tag('cv', cv);
	}
}
class ACards {
	constructor(assets) {
		this.assets = assets;
		this.hands = {};
		this.player = null;
		for (const f of ['Axis', 'West', 'USSR']) {
			let hand = new AHand(this.assets, 'handG_' + f, 'hand_area', f);
			this.hands[f] = hand;
		}
		this.hands['openCards'] = new AHand(this.assets, 'openCardG', 'cards2_area', 'open');
		this.visibleHand = null;
	}
	createCard(id, o) {
		let hand = this.findCardHand(o);
		if (hand) {
			let ms = hand.addNew(id, o);
		}
	}
	findCardHand(o) {
		let vis = getVisibleSet(o);
		if (!vis || (!('owner' in o) && vis.length < 3)) return null;
		if (vis.length < 3) {
			return this.hands[o.owner];
		} else {
			return this.hands['openCards'];
		}
	}
	getCardMs(id) {
		if (this.inVisibleHand(id)) {
			return this.visibleHand.cards[id].ms;
		} else return null;
	}
	inVisibleHand(id) {
		return this.visibleHand == null ? false : id in this.visibleHand.cards;
	}
	updateHandView(player) {
		for (const pl of ['Axis', 'USSR', 'West']) {
			let hand = this.hands[pl];
			if (pl == player) {
				hand.show();
			} else hand.hide();
		}
	}
	update(player, data, G) {
		if (player != this.player) {
			this.updateHandView(player);
			this.player = player;
			this.visibleHand = this.hands[player];
		}
		if (!('created' in data)) {
			unitTestCards('cards update: no created in data: nothing to create or update!');
			return;
		}
		for (const id in data.created) {
			const o_new = data.created[id];
			if (!isCardType(o_new)) {
				unitTestCards('o_new not cardType:', o_new.obj_type);
				continue;
			}
			if (!(id in G)) {
				if (!isVisibleToPlayer(o_new, player) && !('owner' in o_new)) {
					unitTestCards('not visible and no owner', o_new);
					continue;
				}
				let hand = this.findCardHand(o_new);
				hand.addNew(id, o_new);
				G[id] = o_new;
				unitTestCards('created card', id, 'for hand', hand.id, o_new);
			} else {
				let o_old = G[id];
				let d = propDiff(o_old, o_new);
				if (!d.hasChanged) continue;
				unitTestCards('card change', id, d.summary.toString());
				if (d.summary.includes('visible')) {
					let hand_new = this.findCardHand(o_new);
					let hand_old = this.findCardHand(o_old);
					let ms = hand_old.remove(id);
					let title = ms.getTag('title');
					unitTestCards('removed card', id, title, 'from hand', hand_old.id);
					if (hand_new) {
						hand_new.addExisting(id, o_new, ms);
						G[id] = o_new;
						unitTestCards('added card', id, title, 'to hand', hand_new.id);
					} else {
						delete G[id];
						unitTestCards('DELETED card', id, title);
					}
				} else {
				}
			}
		}
	}
}
class ACombat {
	constructor(page, assets, data, repDivName) {
		this.page = page;
		this.assets = assets;
		this.c = data;
		this.dArea = repDivName;
		this.pal = set_palette(199, 1);
		this.battles = null;
		if (Object.keys(data.battles).length > 0) {
			this.initBattles(data)
		}
	}
	initBattles(cData) {
		let c = this.c = cData;
		this.page.battleView();
		this.locations = Object.keys(cData.battles);
		this.battleCounter = 0;
		this.battles = {};
		this.battle = null;
		for (const loc of this.locations) {
			this.battles[loc] = new ABattle(this.assets, loc, this.c.battles[loc], this.c.stage);
		}
		let sizes = this.locations.map(loc => this.battles[loc].size);
		this.containerSize = { w: getItemWithMax(sizes, 'w')[2], h: getItemWithMax(sizes, 'h')[2] + 12 };
		let dCombatArea = document.getElementById(this.dArea);
		clearElement(dCombatArea);
		let dCombat = addDivFullClass(dCombatArea, 'dCombat', 'combatContainer');
		let dCombatTitles = addDivClass(dCombat, 'dCombatTitles', 'combatTitles');
		let dCombatTitle = addDivClass(dCombatTitles, 'dCombatTitle', 'combatTitle');
		let title = 'COMBAT!!! Battle' + (this.locations.length > 1 ? 's' : '') + ' in ' + this.locations.join(', ');
		dCombatTitle.innerHTML = title;
		this.dCombatSubtitle = addDivClass(dCombatTitles, 'dCombatSubtitle', 'combatSubtitle');
		let dBattleGrid = addDivClass(dCombat, 'dBattleOverview', 'battleGrid');
		let ipal = 0,
			bg,
			fg,
			d;
		for (const loc of this.locations) {
			[bg, fg, d] = this.makeDBattleOuter(dBattleGrid, ipal);
			ipal += 1;
			this.battles[loc].populate(d, 'g' + loc, bg, fg);
		}
	}
	clear_area() {
		let d = document.getElementById(this.dArea);
		clearElement(d);
	}
	makeDBattleOuter(dBattleGrid, ipal) {
		let dBattleOuter = addDivClass(dBattleGrid, 'dBattleOuter', 'battleOuterOverview');
		let wSides = 80;
		let bg = getpal(ipal, 0, 'b');
		let fg = getpal(ipal, 0, 'f');
		dBattleOuter.style.backgroundColor = bg;
		dBattleOuter.style.color = fg;
		ipal += 1;
		dBattleOuter.style.width = 2 * wSides + this.containerSize.w + 'px';
		dBattleOuter.style.height = this.containerSize.h + 'px';
		dBattleOuter.style.border = '1px solid ' + getpal(6);
		dBattleOuter.style.margin = '10px';
		dBattleOuter.style.textAlign = 'center';
		return [bg, fg, dBattleOuter];
	}
	update(data, H) {
		let c = data.temp.combat;
		unitTestCombat('_______________combat update');
		unitTestCombatStage('Combat stage=' + c.stage, c, this.battles);
		if (c.stage == 'opt') {
			return;
		} else if (!this.battles && c.stage == 'battle') {
			this.initBattles(c);
		}
		let message = '';
		if (c.stage == 'opt') {
			return;
		} else if (c.stage == 'next') {
			message = 'SELECT NEXT BATTLE!';
		} else if (c.stage == 'battle') {
			if (c.battle.stage == 'battle_start_ack') {
				if (this.battle) {
					this.battle.unselectBattle();
				}
				this.battle = this.battles[c.battle.tilename];
			}
			message = this.battle.update(data, H);
		} else if (c.stage == 'ack_combat_end') {
			message = 'COMBAT ENDS!!!'
		}
		this.dCombatSubtitle.innerHTML = message;
		unitTestCombat('_____________________');
	}
}
class Activator {
	static maxZIndex = 0;
	constructor(n, ui, R) {
		this.n = n;
		this.ui = isdef(n.uiActive) ? n.uiActive : ui;
		this.uid = n.uid;
		this.R = R;
		this.hoverActive = false;
		this.clickActive = false;
	}
	activate(fEnter, fLeave, fClick) {
		this.activateHover(fEnter, fLeave); this.activateClick(fClick);
	}
	activateHover(fEnter, fLeave) {
		if (this.hoverActive) return;
		this.hoverActive = true;
		this.ui.onmouseenter = (ev) => { ev.stopPropagation(); fEnter(this.uid, this.R); }
		this.ui.onmouseleave = (ev) => { ev.stopPropagation(); fLeave(this.uid, this.R); }
	}
	activateClick(fClick) {
		if (this.clickActive) return;
		this.clickActive = true;
		this.ui.onclick = (ev) => { ev.stopPropagation(); fClick(this.uid, this.R); }
	}
	deactivate() {
		if (!this.hoverActive && !this.clickActive) return;
		this.deactivateHover();
		this.deactivateClick();
	}
	deactivateHover() {
		if (!this.hoverActive) return;
		this.hoverActive = false;
		removeEvents(this.ui, 'mouseenter', 'mouseleave');
	}
	deactivateClick() {
		if (!this.clickActive) return;
		this.clickActive = false;
		removeEvents(this.ui, 'click');
	}
}
class AddonClass extends LiveObject {
	constructor(k, dbInfo, userInfo) {
		super(k);
		copyKeys(dbInfo, this);
		copyKeys(userInfo, this);
		this.running = false;
		this.uiState = this.immediateStart ? LiveObject.States.ready : LiveObject.States.none;
		this.startTime = Date.now();
		this.callback = this.div = this.dContent = null;
	}
	//#region internal
	_createDivs() {
		this.dInstruction = mDiv(this.dContent);
		this.dMain = mDiv(this.dContent);
		this.dHint = mDiv(this.dContent); this.dHint.innerHTML = 'hallo'; this.dHint.style.opacity = 0;
	}
	_createScreen() {
		show(mBy('dAddons'));
		let bg = colorTrans('silver', .25);
		let d = mScreen(mBy('dAddons'), { bg: bg, display: 'flex', layout: 'fvcc' });
		let dContent = mDiv(d, { display: 'flex', layout: 'fvcs', fg: 'contrast', fz: 24, bg: 'silver', patop: 50, pabottom: 50, matop: -50, w: '100vw' });
		return [d, dContent];
	}
	//#endregion
	checkEndCondition() {
		let c = this.endsWhen;
		let res = false;
		if (isdef(c) && this[c.prop] == c.value) res = true;
		console.log('condition:', res, 'tNext', this.tNext)
		return res;
	}
	exit() {
		hide('dAddons');
		this.tNext *= this.tFactor;
		this.startTime = Date.now();
		this.clear();
		this.callback();
	}
	init() {
		[this.div, this.dContent] = this._createScreen();
		this._createDivs();
		this.setRunning();
		let caption = this.presentInit();
		mButton(isdef(caption) ? caption : 'Got it!', this.prompt.bind(this), this.dContent, { fz: 32, matop: 10 });
	}
	isTimeForAddon() {
		switch (this.uiState) {
			case LiveObject.States.none: this.getReady(this.tNext); return false;
			case LiveObject.States.gettingReady: return false;
			case LiveObject.States.ready: return true;
			case LiveObject.States.running: return Date.now() - this.startTime >= this.tNext;
		}
	}
	presentInit() { console.log('presenting initial information'); }
	presentPrompt() { console.log('prompting user to do something') }
	prompt() {
		clearElement(this.dContent);
		this.trialsNeeded = 0;
		this._createDivs();
		this.presentPrompt();
		this.activate();
	}
	processInput() {
		if (!this.uiActivated) return;
		this.uiActivated = false;
		let isCorrect = this.eval(...arguments);
		if (isCorrect) {
			this.positive();
			this.exit();
		} else {
			this.negative();
			this.trialPrompt();
		}
	}
	positive() {
		this.trialNumber = null;
		delete this.dHint;
	}
	negative() {
		if (nundef(this.trialNumber)) this.trialNumber = 1; else this.trialNumber += 1;
	}
	run() {
		show('dAddons');
		if (this.running) { this.prompt(); } else this.init();
	}
	trialPrompt() {
		this.trialsNeeded += 1;
		let [wr, sp] = this.getHint();
		this.hintLength = wr.length;
		if (isdef(sp)) sayRandomVoice(sp);
		this.dHint.innerHTML = 'Hint: ' + wr; this.dHint.style.opacity = 1;
		this.activate();
	}
}
class ADecisiongen {
	constructor(assets, map, cards, units, sender) {
		this.assets = assets;
		this.autoplay = true;
		this.decisionMode = 'server';
		this.priorityDecisions = [];
		this.scenario = null;
		this.seed = null;
		this.player = null;
		this.phase = null;
		this.callback = null;
		this.tuple = null;
		this.tuples = [];
		this.choiceCompleted = false;
		this.choiceList = {};
		this.UI = new ADecisionUI(assets, map, cards, units);
		this.playerStrategy = {};
		this.playerStrategy['Axis'] = new AStrategy(this.assets);
		this.playerStrategy['West'] = new AStrategy(this.assets);
		this.playerStrategy['USSR'] = new AStrategy(this.assets);
	}
	decideAutoplay(G) {
		unitTestDecision('decideAutoplay', G, this.decisionMode);
		this.player = G.player;
		if (!this.choiceCompleted) {
			this.choiceCompleted = true;
			if (this.decisionMode == 'scenario' && this.scenario != null) {
				this.tuple = this.scenario.findMatch(G);
				if (!this.tuple) {
					this.tuple = this.tuples[0];
				}
			} else if (this.decisionMode == 'priority') {
				let found = false;
				for (const keyword of this.priorityDecisions) {
					let t = firstCond(this.tuples, t => t.includes(keyword));
					if (t) {
						this.tuple = t;
						found = true;
						break;
					}
				}
				if (!found) this.tuple = this.tuples[0];
			} else if (this.decisionMode == 'server') {
				let info = G.serverData.choice;
				if (info.count != this.tuples.length) {
					alert('decideAutoplay: wrong tuple count!!!! ' + this.tuples.length + ' should be ' + info.count);
				}
				let n = info.random;
				this.tuple = this.tuples[n];
				if (!sameList(this.tuple, info.tuple)) {
					alert('decideAutoplay: tuple incorrect!!! ' + this.tuple.toString() + ' should be ' + info.tuples.toString());
				}
			} else if (this.decisionMode == 'seed') {
				let n = this.nextRandom(this.tuples.length);
				this.tuple = this.tuples[n];
				unitTestChoice('decideAutoplay seed decision:', n, this.tuple);
			} else {
				this.tuple = this.playerStrategy[G.player].chooseTuple(G);
			}
			this.UI.restoreNoFilterHighlightType(false);
			this.highlightChosenTuple(this.tuple);
			setTimeout(() => this.callback(this.tuple), 10);
		} else {
			alert('decideAutoplay: already selected!!!');
		}
	}
	genMove(G, callback, autoplay = true) {
		unitTestDecision('new genMove call!!! phase:', G.phase, 'autoplay:', autoplay);
		this.callback = callback;
		this.tuples = G.tuples;
		this.tuple = null;
		if (this.seed == null) {
			this.seed = G.start.seed;
		}
		if (autoplay != this.autoplay) {
			this.autoplay = autoplay;
		}
		if (G.phase != this.phase) {
			this.phase = G.phase;
		}
		this.UI.clearHoverTuple();
		let container = this.presentTuples(this.tuples);
		this.choiceCompleted = false;
		if (autoplay) {
			this.UI.hideUI();
			this.decideAutoplay(G);
		} else {
			this.UI.startManualSelection(this.phase, this.tuples, container, this.onSelected.bind(this));
		}
	}
	highlightChosenTuple(tuple, msecs = 30) {
		let index = this.tuples.indexOf(tuple);
		let i = Object.keys(this.choiceList).length;
		let s = '' + index + ':' + tuple.toString();
		unitTestChoicemin('' + i + ': ' + this.player + '(' + index + '/' + this.tuples.length + '): ' + this.tuple.toString());
		this.choiceList[i] = { index: index, tuple: tuple };
		let d = document.getElementById('divSelect');
		let els = document.getElementsByTagName('a');
		let el = els[index];
		el.classList.add('selected');
		ensureInView(d, el);
	}
	loadScenario(data, G) {
		this.scenario = new Scenario(this.assets, data, G, this);
		this.decisionMode = 'scenario';
	}
	nextRandom(max) {
		unitTestRandom('nextRandom max =', max, ', this.seed =', this.seed);
		var x = Math.sin(this.seed++) * 10000;
		let res = Math.floor((x - Math.floor(x)) * max);
		return res;
	}
	onClickStep(G) {
		if (!this.choiceCompleted) {
			if (!sameList(this.tuples, G.tuples)) {
				alert('onClickStep: this.tuples not same as G.tuples!');
			}
			this.decideAutoplay(G);
		}
	}
	onSelected(ev) {
		if (!this.choiceCompleted) {
			this.choiceCompleted = true;
			let id = evToIdTNT(ev);
			let idx = firstNumber(id);
			this.tuple = this.tuples[idx];
			unitTestHover('select', this.tuple);
			this.highlightChosenTuple(this.tuple);
			this.UI.restoreNoFilterHighlightType(false);
			this.callback(this.tuple);
		}
	}
	presentTuples(tuples) {
		let d = document.getElementById('divSelect');
		clearElement(d);
		d.scrollTop = 0;
		let i = 0;
		for (const t of tuples) {
			let el = document.createElement('a');
			el.id = 'aaa' + i;
			i += 1;
			el.textContent = t;
			d.appendChild(el);
		}
		return d;
	}
}
class ADecisionUI {
	constructor(assets, map, cards, units) {
		this.map = map;
		this.cards = cards;
		this.units = units;
		this.assets = assets;
		this.buttons = {};
		this.types = ['tile', 'unit', 'nation', 'other'];
		for (const type of this.types) {
			let b = document.getElementById('b' + type);
			this.unselectButton(b);
			this.buttons[type] = b;
		}
		this.extraTypes = [];
		this.highlightType = null;
		this.phase = null;
		this.tuples;
		this.elTuples;
		this.byS = {};
		this.byType = {};
		this.ituplesByS = {};
		this.ihideByS = {};
		this.ituplesByType = {};
		this.sInTuples = [];
		this.msSelected = null;
		this.hoverTuple = null;
	}
	clearHoverTuple() {
		unitTestHover('clearHoverTuple');
		if (this.hoverTuple) {
			unitTestHover('clearHoverTuple', this.hoverTuple.id);
			for (const s of this.hoverTuple.tuple) {
				let ms = this.get(s).ms;
				if (ms) ms.stopSelGreen();
			}
			this.hoverTuple = null;
		}
	}
	filterByS(ev) {
		let idElem = evToIdTNT(ev);
		let clickedOnSelected = this.msSelected && this.msSelected.elem.id == idElem;
		this.restoreNoFilterHighlightType();
		if (clickedOnSelected) return;
		let id = idElem in this.assets.uid2id ? this.assets.uid2id[idElem] : idElem;
		let ms = this.byS[id].ms;
		this.msSelected = ms;
		unitTestFilter('filterByS', idElem, id);
		for (let i = 0; i < this.tuples.length; i++) {
			const t = this.tuples[i];
			const el = this.elTuples[i];
			if (!t.includes(id)) {
				el.style = 'display:none';
			} else if (this.phase == 'Movement' && t.length > 1 && this.get(id).type == 'tile' && t[1] != id) {
				el.style = 'display:none';
			} else {
				for (const s of t) {
					if (this.phase == 'Setup' && this.get(s).type == 'nation') continue;
					let ms = this.get(s).ms;
					if (ms) ms.select();
				}
			}
		}
	}
	filterByType() {
		let type = this.highlightType;
		unitTestFilterByType('filterByType', type, this.tuples.length, this.ituplesByType[type].toString());
		for (let i = 0; i < this.tuples.length; i++) {
			if (!this.ituplesByType[type].includes(i)) {
				this.elTuples[i].style = 'display:none';
			}
		}
	}
	get(s) {
		if (s in this.byS) {
			return this.byS[s];
		}
		let type = null;
		let ms = null;
		if (s in this.units.uis) {
			ms = this.units.uis[s].ms;
			type = 'unit';
		} else if (s in this.map.tiles) {
			ms = this.map.tiles[s];
			type = 'tile';
		} else if (s in this.map.nations) {
			ms = this.map.nations[s];
			type = 'nation';
		} else if (s in this.map.influences) {
			ms = this.map.influences[s];
			unitTestFilterNation('ms', ms);
			type = 'nation';
		} else if (this.cards.inVisibleHand(s)) {
			ms = this.cards.getCardMs(s);
			type = 'card';
		} else {
			type = 'other';
		}
		this.byS[s] = { ms: ms, type: type };
		return this.byS[s];
	}
	hideUI() {
		Object.values(this.buttons).map(x => hide(x));
	}
	highlightObjects() {
		let ids = this.byType[this.highlightType];
		if (this.highlightType == 'other') {
			this.extraTypes.map(t => this.byType[t].map(s => ids.push(s)));
		}
		unitTestFilterByType('highlightType:', this.highlightType, 'ids', ids);
		for (const s of ids) {
			let ms = this.byS[s].ms;
			if (ms) {
				ms.makeSelectable(this.filterByS.bind(this));
			}
		}
		let tilesVisible = this.map.tiles['London'].isVisible;
		let nationsVisible = this.map.nations['Britain'].isVisible;
		if (this.highlightType == 'nation') {
			if (tilesVisible) Object.values(this.map.tiles).map(o => o.hide());
		} else if (!tilesVisible) {
			Object.values(this.map.tiles).map(o => o.show());
		}
		if (this.highlightType == 'tile') {
			if (nationsVisible) Object.values(this.map.nations).map(o => o.hide());
		} else if (!nationsVisible) {
			Object.values(this.map.nations).map(o => o.show());
		}
		unitTestFilterByType('ids.length', ids.length);
		if (this.tuples.length > 24) {
			this.filterByType();
		}
	}
	onExitTuple(ev) {
		if (this.hoverTuple) {
			unitTestHover('exit', this.hoverTuple.id);
		} else {
			unitTestHover('exit null');
		}
		this.clearHoverTuple();
	}
	onEnterTuple(ev) {
		let idTuple = evToIdTNT(ev);
		unitTestHover('enter', idTuple);
		if (this.hoverTuple != null && this.hoverTuple.id == idTuple) return;
		let idx = firstNumber(idTuple);
		let tuple = this.tuples[idx];
		this.hoverTuple = { id: idTuple, idx: idx, tuple: tuple };
		for (const s of tuple) {
			let ms = this.get(s).ms;
			if (ms) ms.selGreen();
		}
	}
	restoreNoFilterHighlightType(highlight = true) {
		this.elTuples.map(el => (el.style = ''));
		this.clearHoverTuple();
		for (const s of this.sInTuples) {
			let ms = this.get(s).ms;
			if (ms) {
				ms.stopSelGreen();
				ms.makeUnselectable();
			}
		}
		this.msSelected = null;
		if (highlight) this.highlightObjects();
		else {
			let tilesVisible = this.map.tiles['London'].isVisible;
			let nationsVisible = this.map.nations['Britain'].isVisible;
			if (!tilesVisible) {
				Object.values(this.map.tiles).map(o => o.show());
			}
			if (!nationsVisible) {
				Object.values(this.map.nations).map(o => o.show());
			}
		}
	}
	startManualSelection(phase, tuples, container, onSelectedHandler) {
		this.tuples = tuples;
		this.elTuples = arrChildren(container);
		for (const el of this.elTuples) {
			el.addEventListener('click', onSelectedHandler);
			el.addEventListener('mouseenter', this.onEnterTuple.bind(this));
			el.addEventListener('mouseleave', this.onExitTuple.bind(this));
		}
		this.sInTuples = [];
		this.byType = {};
		this.ituplesByType = {};
		this.ihideByType = {};
		this.ituplesByS = {};
		for (const [i, t] of this.tuples.entries()) {
			for (const s of t) {
				if (this.assets.nationalityNames.includes(s) || this.assets.unitTypeNames.includes(s)) {
					if (t.length > 1) continue;
				}
				addIf_dep(s, this.sInTuples);
				let o = this.get(s);
				if (['Albania', 'Malta', 'Gibraltar'].includes(s)) {
					if (this.phase == 'Movement') {
						if (t.length == 1) {
							o.type = 'nation';
						} else {
							o.type = 'tile';
						}
					} else if (this.phase == 'Government') {
						if (any(t, x => startsWith(x, 'action_'))) {
							o.type = 'nation';
						} else {
							o.type = 'tile';
						}
					}
				}
				addIf_depDict(o.type, s, this.byType);
				addIf_depDict(o.type, i, this.ituplesByType);
				addIf_depDict(s, i, this.ituplesByS);
			}
		}
		let types = Object.keys(this.byType);
		for (const t of this.types) {
			if (!types.includes(t)) {
				hide(this.buttons[t]);
			} else {
				show(this.buttons[t]);
			}
		}
		this.extraTypes = [];
		for (const t of types) {
			if (!this.types.includes(t)) {
				this.extraTypes.push(t);
			}
		}
		let recommendedHighlightType = this.checkPhaseChange(phase);
		unitTestFilterByType('270: ', recommendedHighlightType);
		if (!types.includes(recommendedHighlightType)) {
			recommendedHighlightType = types[0];
			unitTestFilterByType('273: ', recommendedHighlightType, types);
		}
		this.highlightType = recommendedHighlightType;
		unitTestFilterByType('nach setting highlightType 277: ', recommendedHighlightType, this.highlightType);
		for (const t in this.buttons) {
			if (t == this.highlightType) {
				this.selectButton(this.buttons[t]);
			} else {
				this.unselectButton(this.buttons[t]);
			}
		}
		this.highlightObjects();
	}
	setHighlightType(button) {
		if (this.highlightType != null) {
			this.unselectButton(this.buttons[this.highlightType]);
		}
		this.highlightType = button.id.substring(1);
		unitTestFilterByType('setting new highlightType 292:', this.highlightType);
		this.selectButton(button);
		this.restoreNoFilterHighlightType();
	}
	selectButton(b) {
		b.style.backgroundColor = '#2196f3';
		b.style.color = 'white';
	}
	unselectButton(b) {
		b.style.backgroundColor = 'white';
		b.style.color = '#2196f3';
	}
	checkPhaseChange(newPhase) {
		if (this.phase == newPhase) return this.highlightType;
		this.phase = newPhase;
		switch (this.phase) {
			case 'Government':
				return 'nation';
			case 'Movement':
			case 'Battle':
			case 'Land_Battle':
			case 'Sea_Battle':
				return 'unit';
			case 'Spring':
			case 'Summer':
			case 'Fall':
				return 'other';
			case 'Setup':
			case 'Production':
			default:
				return 'tile';
		}
	}
}
class AFilterList {
	constructor() {
	}
}
class Agent {
	constructor(home, speed, zackig, aussehen, startpos) {
		this.home = home;
		this.isMap = is_map(home);
		console.log('is_map?', this.isMap);
		this.pos = isdef(startpos) ? startpos : this.isMap ? home.options.center : null;
		this.speed = speed;
		this.rGen = zackig ? rFloat : rGaussian;
		this.ui = create_agent(home, aussehen);
		if (isdef(startpos)) this.moveto(startpos);
	}
	moveto(coords) {
		if (this.isMap) map_moveto(this.ui, coords); else mPos(this.ui, coords[0], coords[1]);
		this.pos = coords;
	}
	movefor(secs) {
		let f = x => x + this.rGen(-this.speed, this.speed);
		run_for_seconds(secs, () => { map_moveby(this.ui, f, f); })
	}
	move() {
		let f = x => x + rGen(-speed, speed);
		this.interval = setInterval(() => map_moveby(this.ui, f, f), 50);
	}
	stop_moving() { clearInterval(this.interval); }
}
class AHand {
	constructor(assets, gName, divName, ownerOrOpen) {
		this.id = ownerOrOpen;
		this.cards = {};
		this.cardWidth = assets.SZ.cardWidth;
		this.cardHeight = assets.SZ.cardHeight;
		this.gap = assets.SZ.gap;
		this.startPos = { x: 80 + this.gap + this.cardWidth / 2, y: this.gap + this.cardHeight / 2 };
		this.div = document.getElementById(divName);
		this.g = document.getElementById(gName);
		this.wDiv = this.div.offsetWidth;
		this.hDiv = firstNumber(this.div.style.height);
		this.xNext = this.startPos.x;
		this.yNext = this.startPos.y;
	}
	addExisting(id, o, ms) {
		ms.parent = this.g;
		this.positionAndAdd(id, ms, o);
		return ms;
	}
	addNew(id, o) {
		let parentName = this.g.id;
		let ms = new MS(id, parentName);
		this.setCardContent(ms, o);
		this.positionAndAdd(id, ms, o);
		return ms;
	}
	getNextPosition() {
		let x = this.xNext;
		let y = this.yNext;
		if (x + this.cardWidth / 2 + this.gap > this.wDiv) {
			x = this.startPos.x;
			y += this.cardHeight + this.gap;
			let sizeNeeded = y + this.cardHeight / 2 + this.gap;
			if (this.hDiv < sizeNeeded) {
				this.hDiv = sizeNeeded;
				this.div.style.height = this.hDiv + "px";
			}
		}
		this.xNext = x + this.gap + this.cardWidth;
		this.yNext = y;
		let pos = { x: x, y: y };
		return pos;
	}
	hide() {
		hide(this.g);
	}
	getTitle(id) {
		if (id in this.cards) {
			return this.cards[id].ms.getTag('title');
		} else { return 'unknown' }
	}
	positionAndAdd(id, ms, o) {
		let pos = this.getNextPosition();
		ms.setPos(pos.x, pos.y).draw();
		this.cards[id] = { ms: ms, o: jsCopy(o) };
	}
	relayout() {
		this.xNext = this.startPos.x;
		this.yNext = this.startPos.y;
		for (const id in this.cards) {
			const ms = this.cards[id].ms;
			let pos = this.getNextPosition();
			ms.setPos(pos.x, pos.y).draw();
		}
	}
	relayoutExcept(id) {
		this.xNext = this.startPos.x;
		this.yNext = this.startPos.y;
		for (const id1 in this.cards) {
			if (id1 == id) continue;
			const ms = this.cards[id1].ms;
			let pos = this.getNextPosition();
			ms.setPos(pos.x, pos.y).draw();
		}
	}
	remove(id) {
		if (!(id in this.cards)) {
			return null;
		}
		let ms = this.cards[id].ms;
		ms.removeFromUI();
		this.relayoutExcept(id);
		let chLast = this.g.lastChild;
		if ("id" in chLast) {
			let idLast = chLast.id;
			if (idLast in this.cards) {
				let msLast = this.cards[idLast].ms;
				let posLast = msLast.getPos();
				let hNeeded = posLast.y + this.cardHeight / 2 + this.gap;
				let otherHNeeded = msLast.bounds.b + this.gap;
				if (hNeeded != otherHNeeded) {
				}
				if (hNeeded < 200) hNeeded = 200;
				if (this.hDiv > hNeeded && isVisible(this.g)) {
					this.hDiv = hNeeded;
					this.div.style.height = this.hDiv + "px";
				}
			}
		}
		delete this.cards[id];
		return ms;
	}
	setCardContent(ms, o) {
		let txt = [];
		let title = "";
		if ("top" in o) {
			if (o.obj_type == "action_card") {
				txt = [o.top, " ", o.season, o.priority + o.value, " ", o.bottom];
			} else {
				txt = [o.top, " ", " ", o.value ? o.value.toString() : " ", " ", " ", o.bottom];
			}
			title = o.top;
		} else if ("wildcard" in o) {
			txt = [o.wildcard, " ", o.season, o.priority + o.value, " ", " "];
			title = o.wildcard;
		} else if ("intelligence" in o) {
			txt = [o.intelligence, " ", " ", o.value ? o.value.toString() : " ", " ", " ", " "];
			title = o.intelligence;
		} else if ("science" in o) {
			txt = [o.value + "   (" + o.year.toString() + ")"];
			o.science.map(x => txt.push(x));
			title = o.year;
		}
		if (txt.length > 0) {
			txt = txt.map(x => x.replace(/_/g, " "));
		}
		let cardWidth = this.cardWidth;
		let cardHeight = this.cardHeight;
		let testText = ms.id;
		if ("owner" in o) {
			testText += " " + o.owner;
		}
		ms.roundedRect({ className: 'ground', w: cardWidth, h: cardHeight, fill: "white" })
			.text({ txt: testText, fill: "red", y: cardHeight / 2, fz: cardWidth / 7 })
			.textMultiline({ txt: txt, maxWidth: cardWidth, fz: cardWidth / 7 })
			.roundedRect({ className: "overlay", w: cardWidth, h: cardHeight });
		ms.tag("content", txt);
		ms.tag("type", o.obj_type);
		ms.tag("title", title);
		ms.tag("json", JSON.stringify(o));
		return ms;
	}
	show() {
		show(this.g);
		let divHeight = firstNumber(this.div.style.height);
		if (this.hDiv != divHeight) {
			this.div.style.height = this.hDiv + "px";
		}
	}
	sort(prop) { }
	update(id, o_new) {
	}
}
class AIPlayer {
	constructor(max_depth = -1) {
		this.id = getUID('AI');
		this.color = randomColor();
		this.type = 'ai';
		this.score = 0;
	}
	setData(o) { copyKeys(o, this); }
}
class AMap {
	constructor(assets) {
		this.assets = assets;
		this.tiles = {};
		this.chips = {};
		this.influences = {};
		this.vpts = { Axis: [], West: [], USSR: [] };
		this.calculateStatsPositions();
		this.dowPositions = this.calculateDowPositions();
		this.nations = this.assets.drawNationPositions();
	}
	calculateDowPositions() {
		let dp = {};
		dp[this.dowKey('West', 'USSR')] = { x: 1244, y: 142 };
		dp[this.dowKey('West', 'Axis')] = { x: 1178, y: 142 };
		dp[this.dowKey('Axis', 'West')] = { x: 613, y: 2054 };
		dp[this.dowKey('Axis', 'USSR')] = { x: 679, y: 2054 };
		dp[this.dowKey('USSR', 'West')] = { x: 3332, y: 268 };
		dp[this.dowKey('USSR', 'Axis')] = { x: 3332, y: 334 };
		return dp;
	}
	calculateStatsPositions() {
		let arr = [];
		let x = 580;
		let y = 2120;
		for (let i = 0; i < 25; i++) {
			arr.push({ x: x, y: y });
			x += 66;
		}
		this.vpts.Axis = arr;
		arr = [];
		x = 1310;
		y = 76;
		for (let i = 0; i < 20; i++) {
			arr.push({ x: x, y: y });
			x -= 66;
		}
		for (let i = 20; i < 25; i++) {
			arr.push({ x: x, y: y });
			y += 66;
		}
		this.vpts.West = arr;
		arr = [];
		x = 2210;
		y = 76;
		for (let i = 0; i < 18; i++) {
			arr.push({ x: x, y: y });
			x += 66;
		}
		for (let i = 18; i < 25; i++) {
			arr.push({ x: x, y: y });
			y += 66;
		}
		this.vpts.USSR = arr;
	}
	createChip(id, { text = '', filename = '', prefix = '', faction = '', color = 'beige' } = {}) {
		let sz = this.assets.SZ.chip;
		let pts = this.vpts[faction];
		let pos = pts[0];
		let ms = new MS(id, 'mapG', assets.getUniqueId(id))
			.roundedRect({ w: sz, h: sz, fill: color })
			.text({ txt: text, fill: 'white', weight: 'bold' })
			.setPos(pos.x + sz / 2, pos.y + sz / 2)
			.draw();
		return ms;
	}
	createInfluence(id, nation, faction, value) {
		unitTestMap('createInfluence', id, nation, faction, value);
		let ms = new MS(id, 'mapG', assets.getUniqueId(id));
		this.drawInfluence(ms, nation, faction, value);
		let pos = this.assets.nationPositions[nation];
		let x = pos.x;
		let y = pos.y;
		ms.setPos(x, y).draw();
		return ms;
	}
	createTile(id, o) {
		let pos = this.assets.tilePositions[id];
		let sz = this.assets.SZ.tile;
		let ms = new MS(id, 'mapG', this.assets.getUniqueId(id))
			.circle({ className: 'ground', fill: 'transparent', sz: sz })
			.circle({ className: 'overlay region', sz: sz })
			.setPos(pos.x, pos.y)
			.draw();
		if ('owner' in o) {
			ms.tag('owner', o.owner);
		}
		return ms;
	}
	dowKey(declarer, other) {
		return declarer + 'DoW' + other;
	}
	drawInfluence(ms, nation, faction, level) {
		if (faction === undefined) {
			alert('drawInfluence faction undefined!!!');
		}
		let imagePath = '/a/assets/images/' + faction + '.svg';
		let color = colorArrToString(...this.assets.troopColors[faction]);
		let darker = pSBC(-0.4, color);
		let lighter = pSBC(0.4, color);
		let sz = this.assets.SZ.influence + 10 * level;
		let szOuter = sz + 10;
		let szFrame = szOuter + 10;
		let szImage = sz;
		let y = szImage / 6;
		let text = level;
		let rd = dlColor(0.5, 255, 0, 0);
		let fontColor = level != 2 ? 'black' : rd;
		ms.circle({ className: 'ground', fill: darker, alpha: 1, sz: szFrame })
			.circle({ fill: color, alpha: 1, sz: szOuter })
			.image({ path: imagePath, w: szImage, h: sz })
			.text({ txt: text, fill: fontColor, fz: szImage - 5, weight: 'bold' })
			.circle({ className: 'overlay', sz: szOuter });
		ms.tag('nation', nation);
		ms.tag('faction', faction);
		ms.tag('level', level);
		ms.tag('type', 'influence');
		return ms;
	}
	setPopulation(faction, n) {
		this.setChip('pop', 'P', faction, n, 'sienna');
	}
	setIndustry(faction, n) {
		this.setChip('ind', 'I', faction, n, 'red');
	}
	setResource(faction, n) {
		this.setChip('res', 'R', faction, n, 'green');
	}
	setChip(prefix, text, faction, n, color) {
		n -= 1;
		let pts = this.vpts[faction];
		if (n < 0 || (n >= pts.length && !GLOBAL_ALERT)) {
			alert(text + 'setChip!!!! ' + (n + 1) + ', ' + prefix + ', ' + text + ', ' + faction);
			GLOBAL_ALERT = true;
			STOP = true;
		}
		let id = prefix + faction;
		if (!(id in this.chips)) {
			this.chips[id] = this.createChip(id, { text: text, prefix: prefix, faction: faction, color: color });
		}
		let ms = this.chips[id];
		if (n >= 0 && n < pts.length) {
			let pos = pts[n];
			let offset = 7;
			let yOffset = text == 'P' ? -offset : text == 'I' ? 0 : offset;
			let xOffset = text == 'P' ? -offset : text == 'I' ? 0 : offset;
			pos = { x: pos.x + xOffset, y: pos.y + yOffset };
			ms.setPos(pos.x, pos.y);
		} else {
			ms.hide();
		}
	}
	updateInfluence(id, nation, faction, value) {
		unitTestMap('updateInfluence', id, nation, faction, value);
		let ms = this.influences[id];
		ms.show();
		ms.removeFromChildIndex(1);
		this.drawInfluence(ms, nation, faction, value);
	}
	update(data, gameObjs) {
		if ('created' in data) {
			for (const id in data.created) {
				let o_new = data.created[id];
				if (o_new.obj_type == 'tile') {
					if (id in this.tiles) {
						let ms = this.tiles[id];
						let owner_old = ms.getTag('owner');
						if ('owner' in o_new && owner_old != o_new.owner) {
							ms.tag('owner', o_new.owner);
						}
						let blockaded_old = ms.getTag('blockaded');
						if ('blockaded' in o_new && o_new.blockaded && !blockaded_old) {
							ms.addBorder('black');
							ms.tag('blockaded', true);
						} else if (blockaded_old) {
							ms.tag('blockaded', false);
							ms.removeBorder();
						}
						let blockaded_afr_old = ms.getTag('blockaded_afr');
						if ('blockaded_afr' in o_new && o_new.blockaded_afr && !blockaded_afr_old) {
							ms.addBorder('red');
							ms.tag('blockaded_afr', true);
						} else if (blockaded_afr_old) {
							ms.tag('blockaded_afr', false);
							ms.removeBorder();
						}
						continue;
					}
					this.tiles[id] = this.createTile(id, o_new);
					gameObjs[id] = o_new;
				} else if (o_new.obj_type == 'influence' && 'nation' in o_new && 'faction' in o_new) {
					unitTestMap('map update', id, this.influences);
					if (id in this.influences) {
						unitTestMap(id, 'is in this.influences');
						let o_old = gameObjs[id];
						unitTestMap('vor propDiff', o_old, o_new);
						let d = propDiff(o_old, o_new);
						if (d.hasChanged) {
							unitTestMap('influence has changed props:', d.summary.toString());
							this.updateInfluence(id, o_new.nation, o_new.faction, o_new.value);
						}
					} else {
						this.influences[id] = this.createInfluence(id, o_new.nation, o_new.faction, o_new.value);
					}
					gameObjs[id] = o_new;
				}
			}
		}
		if ('removed' in data) {
			for (const id in data.removed) {
				if (id in gameObjs) {
					let o = gameObjs[id];
					if (o.obj_type == 'influence') {
						let ms = this.influences[id];
						ms.removeFromUI();
						delete gameObjs[id];
						delete this.influences[id];
					}
				}
			}
		}
		if ('players' in data.info) {
			for (const faction in data.info.players) {
				let pl = data.info.players[faction];
				this.setPopulation(faction, pl.tracks.POP);
				this.setResource(faction, pl.tracks.RES);
				this.setIndustry(faction, pl.tracks.IND);
				for (const other in pl.DoW) {
					if (pl.DoW[other]) {
						let dowId = this.dowKey(faction, other);
						if (!(dowId in this.chips)) {
							let pos = this.dowPositions[dowId];
							this.chips[dowId] = new MS(dowId, 'mapG', this.assets.getUniqueId(dowId))
								.circle({ className: 'dowChip', fill: 'transparent', sz: 60 })
								.setPos(pos.x, pos.y)
								.draw();
						}
					}
				}
			}
		}
	}
}
class Anim {
	constructor(id, gid) {
		this.timer = null;
	}
	start() {
	}
	end() {
	}
}
class AnimationQueue {
	constructor() {
		this.anilist = {};
	}
	end() {
	}
	enqueue(anim) {
	}
	start() {
	}
}
class APasscode extends AddonClass {
	constructor(k, dbInfo, userInfo) {
		super(k, dbInfo, userInfo);
		this.needNewPasscode = true;
	}
	presentInit() {
		let keys = getRandomKeysFromGKeys(1);
		let options = { rows: 1 };
		this.pictures = getPics(null, {}, options, keys);
		this.goal = this.pictures[0];
		this.passcode = this.goal.label;
		let dParent = this.dContent;
		let d_title = mDiv(dParent);
		showInstruction(this.goal.label, Settings.language == 'E' ? 'the passcode is' : 'das Codewort ist', d_title, true);
		let d_pics = mDiv(dParent);
		presentItems(this.pictures, d_pics, options.rows);
		this.TOList.push(setTimeout(anim1, 300, this.goal, 500));
	}
	presentPrompt() {
		let keys = getRandomKeysIncluding(this.numPics, this.goal.key, 'all');
		let iGoal = keys.indexOf(this.goal.key);
		let options = { rows: 2, showLabels: true };
		this.pictures = getPics(this.processInput.bind(this), undefined, { rows: 2, showLabels: true }, keys);
		this.goal = this.pictures[iGoal];
		showInstruction('', 'click ' + (Settings.language == 'E' ? 'the passcode' : 'das Codewort'), this.dInstruction, true);
		presentItems(this.pictures, this.dMain, options.rows);
	}
	eval(ev) {
		ev.cancelBubble = true;
		let item = findItemFromEvent(this.pictures, ev);
		Selected = { pic: item, feedbackUI: item.div, sz: getBounds(item.div).height };
		Selected.reqAnswer = this.goal.label;
		Selected.answer = item.label;
		if (item.label == this.goal.label) { return true; } else { return false; }
	}
	getHint() {
		let hintLength, spoken;
		if (this.trialNumber > this.passcode.length * 2) {
			hintLength = this.passcode.length;
			spoken = 'click ' + this.passcode.toUpperCase() + '!!!';
		} else if (this.trialNumber > this.passcode.length * 2 - 1) {
			hintLength = this.passcode.length;
			spoken = (Settings.language == 'E' ? 'REMEMBER ' : 'MERKE DIR ') + this.passcode.toUpperCase() + '!!!';
		} else if (this.trialNumber > this.passcode.length) {
			hintLength = (this.trialNumber - this.passcode.length);
			let letters = this.passcode.substring(0, hintLength);
			let letters1 = letters.split();
			spoken = (Settings.language == 'E' ? 'the passcode starts with' : 'das Codewort beginnt mit') + ' ' + letters1.join(', ');
		} else {
			hintLength = this.trialNumber;
			spoken = null;
		}
		return [this.passcode.substring(0, hintLength), spoken];
	}
}
class APassword extends AAddress {
	presentInit() {
		this.goal = null;
		Speech.setLanguage('E');
		let msg = 'create a new password!';
		this.msgPrompt = 'enter your password';
		this.lastHintPrompt = 'please complete entering password!';
		stdInstruction(msg, this.dInstruction, msg, { voice: 'zira' });
		this.input = stdInputVal(this.dMain, { w: 600, fz: 24 }, 'hallo');
		this.input.id = this.defaultFocusElement = 'inputAddon';
		window.onclick = () => mBy(this.defaultFocusElement).focus();
		return 'set password';
	}
	presentPrompt() {
		if (nundef(this.goal)) this.goal = { label: this.input.value.trim() };
		super.presentPrompt();
	}
}
class ASender {
	constructor(options) {
		this.serverData = {};
		this.akku = {};
		this.msgCounter = 0;
		this.stepCounter = 0;
		this.callback = null;
		this.options = options;
		this.backendUrl = 'http://localhost:5001/';
	}
	augment(data) {
		this.stepCounter += 1;
		this.akku = extend(true, this.akku, data);
		if (this.options.output == 'fine') {
			logFormattedData(this.serverData, this.stepCounter);
		} else if (this.options.output == 'raw') {
		}
	}
	chainSend(msgChain, player, callback) {
		this.stepCounter = 0;
		this.akku = { game: { player: player } };
		this.callback = callback;
		this.chainSendRec({}, msgChain, callback);
	}
	chainSendRec(data, msgChain, callback) {
		this.augment(data);
		if (msgChain.length > 0) {
			this.send(msgChain[0], d => this.chainSendRec(d, msgChain.slice(1), callback));
		} else {
			testOutput({ 3: ['sender akku:', this.akku] });
			callback(this.akku);
		}
	}
	send(url, callback) {
		url = this.backendUrl + url;
		this.msgCounter += 1;
		unitTestRequest(this.msgCounter + ': request sent: ' + url);
		$.ajax({
			url: url,
			type: 'GET',
			success: response => {
				unitTestResponse('server:', response.substring(0, 200));
				if (response[0] != '{') {
					unitTestResponse(response);
					callback(JSON.parse('{"response":"' + response + '"}'));
				} else {
					this.serverData = JSON.parse(response);
					unitTestResponse(this.serverData);
					if ('removed' in this.serverData) {
						for (const id in this.serverData.removed) {
							unitTestRemoved(this.serverData.removed.toString());
							break;
						}
					}
					if ('error' in this.serverData) {
						error(this.serverData);
						error(this.serverData.error);
					} else {
						callback(this.serverData);
					}
				}
			},
			error: err => {
				error(err);
			}
		});
	}
}
class AStrategy {
	constructor(assets, initialStrategy = {}) {
		this.choiceIndex = 0;
		this.choiceModulo = 5;
		this.assets = assets;
		this.phasePred = initialStrategy;
		this.deterministic = true;
	}
	chooseTuple(G) {
		let n = -1;
		if (this.deterministic) {
			n = this.choiceIndex;
			this.choiceIndex = (this.choiceIndex + 1) % this.choiceModulo;
		}
		unitTestStrategy("chooseTuple:", G.player, G.phase, this.phasePred);
		let tuples = G.tuples;
		if (G.phase in this.phasePred) {
			unitTestStrategy("found strategy!", this.phasePred[G.phase]);
			return chooseDeterministicOrRandom(n, tuples, this.phasePred[G.phase]);
		} else {
			unitTestStrategy("no strategy available!!");
			return chooseDeterministicOrRandom(n, tuples, t => !t.includes("pass"));
		}
	}
	chooseFavIfPossible(tuples, fav) {
		if (tuples.length == 1) return tuples[0];
		else {
			let favTuples = tuples.filter(t => t.includes(fav));
			let tuple = empty(favTuples) ? chooseRandomElement(tuples, t => !t.includes("pass")) : favTuples[0];
			return tuple;
		}
	}
	getChooser(phase) {
		switch (phase) {
			case "spring":
			case "summer":
			case "fall":
			case "winter":
			case "season":
				return this.phase.season.favAction;
				break;
			default:
				return this.phase[phase].favAction;
				break;
		}
	}
	setFav(phase, cond) {
		switch (phase) {
			case "spring":
			case "summer":
			case "fall":
			case "winter":
			case "season":
				this.phase.season.favAction = cond;
				break;
			default:
				this.phase[phase].favAction = cond;
				break;
		}
	}
}
class AUnits {
	constructor(assets) {
		this.assets = assets;
		this.SZ = this.assets.SZ;
		this.snailPos = calcSnailPositions(0, 0, this.SZ.cadreDetail, 25);
		this.units = { Axis: {}, West: {}, USSR: {}, Minor: {} };
		this.uis = {};
		this.hiddenUnits = { Axis: {}, West: {}, USSR: {} };
		this.previousPlayer = null;
	}
	addUnit(id, ms, o) {
		let tile = o.tile;
		let owner = ms.getTag('owner');
		let neutral = ms.getTag('neutral');
		if (!(tile in this.units[owner])) {
			this.units[owner][tile] = [id];
		} else {
			addIf_dep(id, this.units[owner][tile]);
		}
		this.uis[id] = { o: jsCopy(o), ms: ms };
		if (o.type == 'Convoy') {
			unitTestConvoy('addUnit of type CONVOY!!!', o, ms)
		}
		unitTestUnits('added', id, ms, o, owner, tile);
		unitTestMoving('added', id, ms, o, owner, tile, this.units[owner]);
	}
	addHiddenUnit(msHidden) {
		console.assert(msHidden != null, 'addHiddenUnit ms == NULL!!!!!!!!!!');
		let idHidden = msHidden.id;
		if (idHidden in this.uis) {
			unitTestUnits('addHiddenUnit ERROR!!!!, already have hidden unit', idHidden);
		}
		let tile = msHidden.getTag('tile');
		let owner = msHidden.getTag('owner');
		this.hiddenUnits[owner][tile] = idHidden;
		let o = { obj_type: 'hidden_unit', owner: owner, tile: tile, count: 1 };
		this.uis[idHidden] = { o: o, ms: msHidden };
		unitTestUnits('addHiddenUnit', idHidden, msHidden, o, owner, tile);
	}
	calcStartPos(tile, faction) {
		let pTile = this.getPosition(tile);
		if (faction == 'Minor') return { x: pTile.x, y: pTile.y };
		let pFaction = this.SZ['p' + faction];
		return { x: pTile.x + pFaction.x, y: pTile.y + pFaction.y };
	}
	createHiddenUnit(id, owner, tile) {
		unitTestUnits('create HIDDEN unit', id, owner, tile, '.........');
		let color = this.assets.troopColors[owner];
		let darker = darkerColor(color[0], color[1], color[2]);
		let sz = this.SZ.sumCadre;
		let sz80 = sz * 0.86;
		let szImage = sz / 1.5;
		let y = szImage / 6;
		let ms = new MS(id, 'mapG')
			.roundedRect({ w: sz, h: sz, fill: color, rounding: sz * 0.1 })
			.roundedRect({ w: sz80, h: sz80, fill: darker, rounding: sz * 0.1 })
			.text({ txt: 1, fz: sz / 2, fill: 'white' })
			.roundedRect({ className: 'unit overlay', w: sz, h: sz, fill: darker, rounding: sz * 0.1 });
		ms.tag('type', 'hidden_unit');
		ms.tag('count', 1);
		ms.tag('owner', owner);
		ms.tag('tile', tile);
		this.placeHiddenUnit(ms, owner, tile);
		this.addHiddenUnit(ms);
		return ms;
	}
	createUnit(id, o, player) {
		let nationality = o.nationality;
		let owner = getUnitOwner(nationality);
		let isNeutral = owner == 'Minor';
		unitTestUnits('__________', id, o, nationality, owner, isNeutral);
		let type = o.type;
		if (type === undefined) {
			unitTestUnits('CANNOT CREATE UNIT BECAUSE TYPE UNKNOWN!!!', player, owner);
			unitTestUnits(';;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;;');
		} else {
			unitTestUnits('create unit', id, o, '...player is', player);
			if (type == 'Convoy') {
				type = o.carrying;
			}
			let imagePath = '/a/assets/images/' + type + '.svg';
			let color = isNeutral ? this.assets.troopColors['Minor'] : this.assets.troopColors[nationality];
			let darker = darkerColor(color[0], color[1], color[2]);
			let sz = this.SZ.cadreDetail;
			let sz80 = sz * 0.86;
			let szImage = sz / 1.5;
			let y = szImage / 6;
			let ms = new MS(id, 'mapG')
				.roundedRect({ className: 'ground', w: sz, h: sz, fill: color, rounding: sz * 0.1 })
				.roundedRect({ w: sz80, h: sz80, fill: darker, rounding: sz * 0.1 })
				.image({ path: imagePath, y: y, w: szImage, h: szImage })
				.roundedRect({ className: 'unit overlay', w: sz, h: sz, fill: darker, rounding: sz * 0.1 });
			ms.tag('type', 'unit');
			ms.tag('owner', owner);
			ms.tag('nationality', nationality);
			ms.tag('neutral', isNeutral);
			unitTestUnits('vor placeUnit call', ms, o.tile);
			this.placeUnit(ms, o.tile);
			o.owner = owner;
			this.addUnit(id, ms, o);
			if ('cv' in o) {
				unitTestUnits('vor updateCv call', ms, o.cv);
				this.updateCv(ms, o.cv);
			}
			if (o.type == 'Convoy') {
				this.markAsConvoy(id, ms, null, o);
			}
		}
		if (isNeutral) return;
		let idHidden = this.getHiddenId(owner, o.tile);
		if (!(idHidden in this.uis)) {
			this.createHiddenUnit(idHidden, owner, o.tile);
		} else {
			unitTestUnits('hidden unit already there!!!!!!!!!!!!!', idHidden, owner, o.tile);
			this.updateUnitCounter(owner, o.tile);
		}
		this.updateVisibility(id, o, player);
	}
	getHiddenId(faction, tile) {
		return comp_(faction, tile);
	}
	getPosition(idTile) {
		let pos = this.assets.tilePositions[idTile];
		return pos;
	}
	getUnit(id) {
		return id in this.uis ? this.uis[id] : null;
	}
	markAsConvoy(id, ms, o_old, o_new) {
		if (o_new.type == 'Convoy') {
			ms.tag('isConvoy', true);
			this.uis[id].o = jsCopy(o_new);
			unitTestConvoy('unit', id, 'becomes convoy', o_new)
			ms.addBorder('blue')
		} else {
			ms.tag('isConvoy', false);
			this.uis[id].o = jsCopy(o_new);
			unitTestConvoy('going back from convoy: unit', id, 'becomes', o_new.type, o_new)
			ms.removeBorder();
		}
	}
	moveUnit(id, tile_old, o_new) {
		if (o_new.type == 'Convoy') {
			unitTestConvoy('move unit', id, 'is a CONVOY!!!!!!!!')
		}
		if (!(id in this.uis)) {
			unitTestUnits('PROBLEM: moveUnit', id, ' NOT in uis!');
			alert('PROBLEM: moveUnit ' + id + ' NOT in uis!');
		}
		let ms = this.uis[id].ms;
		let owner = ms.getTag('owner');
		let tile = ms.getTag('tile')
		this.removeUnitFromUnitsOwnerTile(id, owner, tile);
		let tile_new = o_new.tile;
		this.addUnit(id, ms, o_new);
		this.placeUnit(ms, tile_new);
		this.updateUnitCounter(owner, tile_old);
		let idHiddenNew = this.getHiddenId(owner, tile_new);
		if (!(idHiddenNew in this.uis)) {
			let msHidden_new = this.createHiddenUnit(idHiddenNew, owner, tile_new);
			this.addHiddenUnit(msHidden_new);
			unitTestUnits('moveUnit: created hidden unit', idHiddenNew);
		} else {
			this.updateUnitCounter(owner, tile_new);
		}
	}
	placeUnit(ms, tile) {
		let owner = ms.getTag('owner');
		let isNeutral = ms.getTag('neutral');
		let pStart = this.calcStartPos(tile, owner);
		let x = pStart.x;
		let y = pStart.y;
		if (!isNeutral) {
			let iUnit = tile in this.units[owner] ? this.units[owner][tile].length : 0;
			let pSnailOffset = this.snailPos[iUnit];
			x = pStart.x + pSnailOffset.x;
			y = pStart.y + pSnailOffset.y;
			unitTestUnits('index of this unit', iUnit, 'pos', x, y);
		}
		ms.setPos(x, y).draw();
		ms.tag('tile', tile);
	}
	placeHiddenUnit(msHidden, faction, tile) {
		let p = this.calcStartPos(tile, faction);
		msHidden.setPos(p.x, p.y).draw();
	}
	removeUnitFromUnitsOwnerTile(id, owner, tile) {
		unitTestMoving('vor removeUnit', id, owner, tile, this.units[owner]);
		unitTestRemove('vor removeUnit', id, owner, tile, this.units[owner]);
		removeInPlace(this.units[owner][tile], id);
	}
	resnail(owner, tile) {
		unitTestResnail('in resnail:', this.units[owner][tile]);
		let pStart = this.calcStartPos(tile, owner);
		let x = pStart.x;
		let y = pStart.y;
		let iUnit = 0;
		for (const id of this.units[owner][tile]) {
			unitTestResnail('in resnail:', id, owner, tile, x, y);
			let ms = this.uis[id].ms;
			ms.setPos(x, y);
			iUnit += 1;
			let pSnailOffset = this.snailPos[iUnit];
			x = pStart.x + pSnailOffset.x;
			y = pStart.y + pSnailOffset.y;
			unitTestResnail('in resnail:', id, owner, tile, x, y);
		}
	}
	updateUnitCounter(owner, tile) {
		unitTestUnits('updateUnitCounter', owner, tile);
		unitTestRemove('updateUnitCounter', owner, tile);
		if (!(tile in this.units[owner])) {
			unitTestRemove('nothing to update because no unit of', owner, 'has been created!');
			return;
		}
		let n = this.units[owner][tile].length;
		unitTestRemove('updateUnitCounter: units[', owner, '][', tile, '].length', n);
		let idHidden = this.getHiddenId(owner, tile);
		let msHidden = this.uis[idHidden].ms;
		let oHidden = this.uis[idHidden].o;
		if (n == 0) {
			oHidden.count = n;
			msHidden.tag('count', n);
			unitTestRemove('!!!!!!!!!!!!!!SUCCESS!!!!!!!!!!!!!!!!');
		} else {
			oHidden.count = n;
			let color = this.assets.troopColors[owner];
			let darker = darkerColor(color[0], color[1], color[2]);
			let sz = this.SZ.sumCadre;
			msHidden.removeFromChildIndex(3);
			msHidden.text({ txt: n, fz: sz / 2, fill: 'white' }).roundedRect({
				className: 'unit overlay',
				w: sz,
				h: sz,
				fill: darker,
				rounding: sz * 0.1
			});
			msHidden.tag('count', n);
			unitTestUnits('updateUnitCounter', owner, tile, 'to', n, oHidden, msHidden);
		}
	}
	updateCv(ms, cv) {
		ms.removeFromChildIndex(5);
		let sz = this.SZ.cadreDetail;
		let dx = sz / (cv + 1);
		let xStart = -sz / 2;
		let y = -sz / 3.2;
		let diam = Math.min(dx / 1.5, sz / 5);
		let x = dx + xStart;
		for (let i = 0; i < cv; i++) {
			ms.circle({ sz: diam, x: x, y: y, fill: 'white' });
			x += dx;
		}
		ms.tag('cv', cv);
		this.uis[ms.id].o.cv = cv;
		unitTestUnits('updateCv', ms.id, ms.getTag('owner'), ms.getTag('tile'), 'to', cv);
	}
	updateVisibility(id, o, player) {
		unitTestUnitVisibility('update Visibility', 'id', id, 'o', o, 'player', player);
		let ms = id in this.uis ? this.uis[id].ms : null;
		unitTestUnitVisibility('update Visibility ms=', ms);
		let tile = o.tile;
		let owner = getUnitOwner(o.nationality);
		unitTestRemove('updating Visibility of', id, owner, tile)
		let idHidden = this.getHiddenId(owner, tile);
		let vis = isVisibleToPlayer(o, player);
		unitTestRemove('-------------vis', vis, 'idHidden', idHidden)
		if (idHidden in this.uis) {
			let msHidden = this.uis[idHidden].ms;
			unitTestRemove('-------------msHidden', msHidden)
			if (vis) {
				msHidden.hide();
			} else {
				if (msHidden.getTag('count') > 0) msHidden.show(); else msHidden.hide();
			}
		}
		if (ms) {
			if (vis) {
				ms.show();
			} else {
				ms.hide();
			}
		}
	}
	update(data, gObjects, player) {
		if ('created' in data) {
			for (const id in data.created) {
				let o_new = data.created[id];
				if (o_new.obj_type != 'unit') continue;
				if (!(id in gObjects)) {
					unitTestUnits('about to create unit', id, o_new);
					this.createUnit(id, o_new, player);
					if (id in this.uis) {
						gObjects[id] = o_new;
					} else {
						unitTestUnits(':::::::UNIT WAS NOT CREATED!!!');
					}
				} else {
					let o_old = gObjects[id];
					console.assert(id in this.uis, 'unit in G but not in uis', id, o_new);
					let d = propDiff(o_old, o_new);
					if (d.hasChanged) {
						let owner = getUnitOwner(o_old.nationality);
						if (d.summary.includes('type')) {
							console.assert(player != owner || o_old.type == 'Convoy' || o_new.type == 'Convoy', 'type change other than convoy!!!!');
							if ('type' in o_new) {
								console.assert(o_old.type == 'Convoy' || o_new.type == 'Convoy', 'type change other than convoy!!!!');
								unitTestUnits('!!!!!!! for not this temp type change NOT reflected in G!!!!');
								this.markAsConvoy(id, this.uis[id].ms, o_old, o_new);
								unitTestUnits('>>>>>MARK AS CONVOY!!!!!!!!!!!!');
								unitTestUnits(id, 'type was ' + o_old.type + ' new=' + o_new.type);
							}
						}
						if (d.summary.includes('cv') && o_new.cv != undefined) {
							unitTestUnits('cv change!!!!! ' + o_old.cv + ' ' + o_new.cv);
							this.updateCv(this.uis[id].ms, o_new.cv);
							gObjects[id] = o_new;
						}
						if (d.summary.includes('tile')) {
							let oldTile = o_old.tile;
							gObjects[id].tile = o_new.tile;
							this.moveUnit(id, oldTile, gObjects[id]);
							unitTestResnail('vor resnail: unit', id, o_new.nationality, o_new.type, 'moved to', o_new.tile)
							this.resnail(owner, oldTile);
							unitTestUnits('unit', id, 'has moved from', oldTile, 'to', gObjects[id].tile);
							unitTestMoving('unit', id, 'has moved from', oldTile, 'to', gObjects[id].tile);
						}
						if (d.summary.includes('visible')) {
							gObjects[id].visible = o_new.visible;
							this.uis[id].o.visible = o_new.visible;
						}
					}
				}
			}
		}
		if ('removed' in data) {
			for (const id in data.removed) {
				if (id in gObjects) {
					let o = gObjects[id];
					if (o.obj_type == 'unit') {
						let ms = this.uis[id].ms;
						let owner = ms.getTag('owner');
						let tile = ms.getTag('tile');
						this.removeUnitFromUnitsOwnerTile(id, owner, tile);
						let neutral = ms.getTag('neutral');
						unitTestRemove('vor aufruf UpdateUnitCounter', o, id, data.removed[id]);
						if (!neutral) this.updateUnitCounter(owner, tile);
						ms.removeFromUI();
						delete this.uis[id];
						delete gObjects[id];
						unitTestRemove('nach remove unit', id, gObjects, this.units, this.uis)
						unitTestResnail('vor resnail: unit', id, o.nationality, o.type, 'removed from', tile)
						this.resnail(owner, tile);
					}
				}
			}
		}
		unitTestUnits('...visibility is updated for all units!');
		for (const id in this.uis) {
			const ms = this.uis[id].ms;
			const owner = ms.getTag('owner');
			const o = this.uis[id].o;
			const isHidden = o.obj_type == 'hidden_unit';
			if (isHidden) {
				let cnt = ms.getTag('count');
				if (cnt == 0) ms.hide();
				unitTestRemove('HIDING HIDDEN UNIT WITH COUNT 0', id)
			} else {
				this.updateVisibility(id, o, player);
			}
		}
		unitTestUnits('player', player, 'previousPlayer:', this.previousPlayer);
		this.previousPlayer = player;
	}
}
class Banner {
	constructor(pos, dParent) { this.pos = pos; this.dParent = isdef(dParent) ? dParent : dBanner; this.init(); }
	clear() { clearElement(this.dParent); this.dParent.onclick = null; hide(this.dParent); }
	_createDivs() {
		this.dInstruction = mDiv(this.dContent);
		this.dMain = mDiv(this.dContent);
		this.dHint = mDiv(this.dContent); this.dHint.innerHTML = 'hallo'; this.dHint.style.opacity = 0;
	}
	_createScreen() {
		show(this.dParent);
		let bg = colorTrans('silver', .25);
		let d = mScreen(this.dParent, { bg: bg, display: 'flex', layout: 'fvcc' });
		let dContent = mDiv(d, { display: 'flex', layout: 'fvcs', fg: 'contrast', fz: 24, bg: 'silver', patop: 50, pabottom: 50, matop: -50, w: '100vw' });
		if (isdef(this.pos)) mStyleX(dContent, { matop: this.pos });
		return [d, dContent];
	}
	init() {
		[this.div, this.dContent] = this._createScreen();
		this.dParent.onclick = () => this.clear();
		this._createDivs();
	}
	message(arr, callback) {
		this.dInstruction.innerHTML = arr.join(' ');
		if (isdef(callback)) this.dParent.onclick = () => { this.clear(); callback(); };
	}
}
class Board {
	constructor(rows, cols, handler, cellStyle) {
		let styles = isdef(cellStyle) ? cellStyle : { margin: 4, w: 150, h: 150, bg: 'white', fg: 'black' };
		this.rows = rows;
		this.cols = cols;
		let items = this.items = iGrid(this.rows, this.cols, dTable, styles);
		items.map(x => {
			let d = iDiv(x);
			mCenterFlex(d);
			d.onclick = handler;
		});
	}
	get(ir, c) {
		if (isdef(c)) {
			let idx = ir * this.cols + c;
			return this.items[idx];
		} else {
			return this.items[ir];
		}
	}
	getState() {
		return this.items.map(x => x.label);
	}
	setState(arr, colors) {
		if (isEmpty(arr)) return;
		if (isList(arr[0])) { arr = arrFlatten(arr); }
		for (let i = 0; i < arr.length; i++) {
			let item = this.items[i];
			let val = arr[i];
			if (!EmptyFunc(val)) {
				addLabel(item, val, { fz: 60, fg: colors[val] });
			} else item.label = val;
		}
	}
	clear() {
		for (const item of this.items) {
			let dLabel = iLabel(item);
			if (isdef(dLabel)) { removeLabel(item); item.label = null; }
		}
	}
}
class Board2D {
	constructor(rows, cols, dParent, cellStyles, boardStyles, handler) {
		cellStyles = this.cellStyles = isdef(cellStyles) ? cellStyles : { margin: 4, w: 150, h: 150, bg: 'white', fg: 'black' };
		boardStyles = this.boardStyles = isdef(boardStyles) ? boardStyles : { bg: 'silver', fg: 'black' };
		this.rows = rows;
		this.cols = cols;
		this.dParent = dParent;
		let dBoard = this.dBoard = mDiv(dParent);
		let items = this.items = this.fill(dBoard, this.rows, this.cols, null, cellStyles);
	}
	fill(d, rows, cols, items, cellStyles) {
		if (nundef(items)) items = [];
		clearElement(d);
		mStyleX(d, { display: 'grid', 'grid-template-columns': cols });
		for (let i = 0; i < rows * cols; i++) {
			let item = items[i];
			if (isdef(item)) {
				let d1 = iDiv(item);
				if (isdef(d1)) mAppend(d, iDiv(item));
				else {
					d1 = mDiv(d, cellStyles); iAdd(item, { div: d1 }); mAppend(d, d1);
				}
			} else {
				let [r, c] = iToRowCol(i);
				item = { row: r, col: c, index: i };
				let d1 = mDiv(d, cellStyles); iAdd(item, { div: d1 }); mAppend(d, d1);
			}
			mStyleX(iDiv(item), cellStyles);
			items.push(item)
		}
		return items;
	}
	get(ir, c) {
		if (isdef(c)) {
			let idx = ir * this.cols + c;
			return this.items[idx];
		} else {
			return this.items[ir];
		}
	}
	getState() {
		return this.items.map(x => x.label);
	}
	setState(arr, colors) {
		if (isEmpty(arr)) return;
		if (isList(arr[0])) { arr = arrFlatten(arr); }
		for (let i = 0; i < arr.length; i++) {
			let item = this.items[i];
			let val = arr[i];
			if (!EmptyFunc(val)) {
				addLabel(item, val, { fz: 60, fg: colors[val] });
			} else item.label = val;
		}
	}
	clear() {
		for (const item of this.items) {
			let dLabel = iLabel(item);
			if (isdef(dLabel)) { removeLabel(item); item.label = null; }
		}
	}
}
class CacheDict {
	constructor(primKey, { func = null } = {}, useLocal = true) {
		this.primKey = primKey;
		this.func = func;
		this.live = null;
		this.useLocal = useLocal;
	}
	async load() {
		if (this.live) return this;
		return this._local() || await this._server();
	}
	invalidate() {
		localStorage.removeItem(this.primKey);
		this.live = null;
	}
	async reload() { this.invalidate(); return await this.load(); }
	_local() {
		if (!this.useLocal) return null;
		let res = localStorage.getItem(this.primKey);
		if (res) this.live = JSON.parse(res);
		return res;
	}
	async _server() {
		if (this.func) {
			this.live = await this.func();
			if (this.useLocal) localStorage.setItem(this.primKey, JSON.stringify(this.live));
		}
		return this.func;
	}
}
class Calculus {
	limRightOf(x, func) {
		if (this.canPlugin(x, func)) {
			return func(x);
		}
		if (Math.abs(x) == Infinity) {
			return this.toInfinty(x, func);
		}
		var right1 = func(x + 0.000000000000001);
		var right2 = func(x + 0.00000000000001);
		var right3 = func(x + 0.0000000000001);
		var rightDif1 = right2 - right1;
		var rightDif2 = right3 - right2;
		if (rightDif1 < rightDif2 && rightDif2 < 0) {
			return Infinity;
		}
		if (rightDif1 > rightDif2 && rightDif2 > 0) {
			return -1 * Infinity;
		}
		return this.round(right1);
	}
	limLeftOf(x, func) {
		if (this.canPlugin(x, func)) {
			return func(x);
		}
		if (Math.abs(x) == Infinity) {
			return this.toInfinty(x, func);
		}
		var left1 = func(x - 0.000000000000001);
		var left2 = func(x - 0.00000000000001);
		var left3 = func(x - 0.0000000000001);
		var leftDif1 = left2 - left3;
		var leftDif2 = left1 - left2;
		if (leftDif2 > leftDif1 && leftDif2 > 0) {
			return Infinity;
		}
		if (leftDif2 < leftDif1 && leftDif2 < 0) {
			return -1 * Infinity;
		}
		return this.round(left1);
	}
	limAt(x, func) {
		if (this.canPlugin(x, func)) {
			return func(x);
		}
		if (Math.abs(x) == Infinity) {
			return this.toInfinty(x, func);
		}
		var left1 = func(x - 0.000000000000001);
		var right1 = func(x + 0.000000000000001);
		if (Math.abs(left1 - right1) < 0.00001) {
			return this.round((left1 + right1) / 2);
		}
		return NaN;
	}
	canPlugin(x, func) {
		var at = func(x);
		return at === at && Math.abs(at) != Infinity;
	}
	toInfinty(x, func) {
		if (x > 0) {
			var pos1 = Number.MAX_VALUE * 0.99999;
			var pos2 = Number.MAX_VALUE;
			var dif = pos2 - pos1;
			if (dif > 0) {
				return Infinity;
			} else {
				return -1 * Infinity;
			}
		} else {
			var pos1 = Number.MIN_VALUE;
			var pos2 = Number.MIN_VALUE * 0.99999;
			var dif = pos2 - pos1;
			if (dif < 0) {
				return Infinity;
			} else {
				return -1 * Infinity;
			}
		}
	}
	deriv(x1, func) {
		var at = func(x1);
		if (Math.abs(at) == Infinity || at !== at) {
			return NaN;
		}
		var y1 = func(x1);
		var x0 = x1 - 0.000000000000001;
		var y0 = func(x0);
		var x2 = x1 + 0.000000000000001;
		var y2 = func(x2);
		var slope1 = this.slope(x0, y0, x1, y1);
		var slope2 = this.slope(x1, y1, x2, y2);
		if (Math.abs(slope1 - slope2) > 0.1) {
			return NaN;
		}
		return (slope1 + slope2) / 2;
	}
	nthDeriv(n, x1, func) {
		var vals = [];
		var start = -1 * Math.round(n / 2);
		for (var i = start; i <= n + start + 1; i++) {
			var newX = x1 + i * 0.000000000000001;
			var newY = func(newX);
			vals.push(newY);
		}
		for (var i = 0; i < n; i++) {
			var diffs = [];
			for (var j = 1; j < vals.length; j++) {
				diffs.push(vals[j] - vals[j - 1]);
			}
			vals = diffs;
		}
		var out = (vals[0] + vals[1]) / 0.000000000000002;
		return out;
	}
	integral(min, max, func, num) {
		var sum = 0;
		var dx = (max - min) / num;
		var currentX = min + dx / 2;
		for (var i = 0; i < num; i++) {
			var currentY = func(currentX);
			sum += dx * currentY;
			currentX += dx;
		}
		return sum;
	}
	averageValue(min, max, func, num) {
		return this.integral(min, max, func, num) / (max - min);
	}
	distance(x1, y1, x2, y2) {
		return Math.sqrt((x1 - x2) * (x1 - x2) - (y1 - y2) * (y1 - y2));
	}
	slope(x1, y1, x2, y2) {
		return (y1 - y2) / (x1 - x2);
	}
	round(num) {
		var factor = 100000000000000;
		return Math.round(num * factor) / factor;
	}
}
class Card52 {
	static toString(c) { return c.rank + ' of ' + c.suit; }
	static _getKey(i) {
		if (i >= 52) return 'card_J1';
		let rank = Card52.getRank(i);
		let suit = Card52.getSuit(i);
		return 'card_' + rank + suit;
	}
	static _fromKey(k) {
		let ranks = 'A23456789TJQK';
		let suits = 'SHDC';
		let ir = ranks.indexOf(k[0]);
		let is = suits.indexOf(k[1]);
		return is * 13 + ir;
	}
	static getRankValue(i) { if (nundef(i)) return null; let r = i % 13; return r == 0 ? 12 : r - 1; }
	static getRank(i) {
		let rank = (i % 13);
		if (rank == 0) rank = 'A';
		else if (rank >= 9) rank = ['T', 'J', 'Q', 'K'][rank - 9];
		else rank = rank + 1;
		return rank;
	}
	static getSuit(i) {
		let s = ['S', 'H', 'D', 'C'][divInt(i, 13)];
		return s;
	}
	static getShortString(c) { return c.suit + c.rank; }
	static turnFaceDown(c, color) {
		if (!c.faceUp) return;
		let svgCode = C52.card_2B;
		c.div.innerHTML = svgCode;
		if (isdef(color)) c.div.children[0].children[1].setAttribute('fill', color);
		c.faceUp = false;
	}
	static turnFaceUp(c) {
		if (c.faceUp) return;
		c.div.innerHTML = C52[c.key];
		c.faceUp = true;
	}
	static fromSR(sr, h) { return Card52.fromShortString(sr, h); }
	static fromShortString(sr, h) {
		let key = sr[1].toUpperCase() + sr[0].toUpperCase();
		let i = Card52._fromKey(key);
		console.log('card from ', sr, 'is', key, 'i', i)
		return Card52.getItem(i, h);
	}
	static get(sr, h) { return Card52.fromSR(sr, h); }
	static getItem(i, h = 110, w) {
		if (nundef(w)) w = h * .7;
		if (nundef(i)) i = randomNumber(0, 51);
		if (isString(i) && i.length == 2) { i = Card52._fromKey(i[1].toUpperCase() + i[0].toUpperCase()); }
		let c = Card52._createUi(i, undefined, w, h);
		c.i = c.val = i;
		return c;
	}
	static _createUi(irankey, suit, w, h) {
		//#region set rank and suit from inputs
		let rank = irankey;
		if (nundef(irankey) && nundef(suit)) {
			[rank, suit] = Card52.randomRankSuit();
		} else if (nundef(irankey)) {
			irankey = '2';
			suit = 'B';
		} else if (nundef(suit)) {
			if (isNumber(irankey)) irankey = Card52._getKey(irankey);
			rank = irankey[5];
			suit = irankey[6];
		}
		if (rank == '10') rank = 'T';
		if (rank == '1') rank = 'A';
		if (nundef(suit)) suit = 'H'; else suit = suit[0].toUpperCase();
		//#endregion
		//#region load svg for card_[rank][suit] (eg. card_2H)
		let cardKey = 'card_' + rank + suit;
		let svgCode = C52[cardKey];
		svgCode = '<div>' + svgCode + '</div>';
		let el = createElementFromHTML(svgCode);
		if (isdef(h) || isdef(w)) { mSize(el, w, h); }
		//#endregion
		return { rank: rank, suit: suit, key: cardKey, div: el, w: w, h: h, faceUp: true };
	}
	static random() { return Card52.getItem(randomNumber(0, 51)); }
	static randomRankSuit() {
		let c = Card52.random();
		return [c.rank, c.suit];
	}
	static show(icard, dParent, h = 110, w = undefined) {
		if (isNumber(icard)) {
			if (nundef(w)) w = h * .7;
			icard = Card52.getItem(icard, h, w);
		}
		mAppend(dParent, icard.div);
	}
}
class Cardz {
	static toString(c) { return c.rank + ' of ' + c.suit; }
	static _getKey(i) {
		if (i >= 52) return 'card_J1';
		let rank = Card52.getRank(i);
		let suit = Card52.getSuit(i);
		return 'card_' + rank + suit;
	}
	static _fromKey(k) {
		let ranks = 'A23456789TJQK';
		let suits = 'SHDC';
		let ir = ranks.indexOf(k[0]);
		let is = suits.indexOf(k[1]);
		return is * 13 + ir;
	}
	static getRankValue(i) { if (nundef(i)) return null; let r = i % 13; return r == 0 ? 12 : r - 1; }
	static getRank(i) {
		let rank = (i % 13);
		if (rank == 0) rank = 'A';
		else if (rank >= 9) rank = ['T', 'J', 'Q', 'K'][rank - 9];
		else rank = rank + 1;
		return rank;
	}
	static getSuit(i) {
		let s = ['S', 'H', 'D', 'C'][divInt(i, 13)];
		return s;
	}
	static getShortString(c) { return c.suit + c.rank; }
	static turnFaceDown(c, color) {
		if (!c.faceUp) return;
		let svgCode = C52.card_2B;
		c.div.innerHTML = svgCode;
		if (isdef(color)) c.div.children[0].children[1].setAttribute('fill', color);
		c.faceUp = false;
	}
	static turnFaceUp(c) {
		if (c.faceUp) return;
		c.div.innerHTML = C52[c.key];
		c.faceUp = true;
	}
	static fromSR(sr) { return Card52.fromShortString(sr); }
	static fromShortString(sr) {
		let key = sr[1].toUpperCase() + sr[0].toUpperCase();
		let i = Card52._fromKey(key);
		console.log(key, 'i', i)
		return Card52.getItem(i);
	}
	static getItem(i, h = 110, w) {
		if (nundef(w)) w = h * .7;
		if (nundef(i)) i = randomNumber(0, 51);
		if (isString(i) && i.length == 2) { i = Card52._fromKey(i[1].toUpperCase() + i[0].toUpperCase()); }
		let c = Card52._createUi(i, undefined, w, h);
		c.i = c.val = i;
		return c;
	}
	static _createUi(irankey, suit, w, h) {
		//#region set rank and suit from inputs
		let rank = irankey;
		if (nundef(irankey) && nundef(suit)) {
			[rank, suit] = Card52.randomRankSuit();
		} else if (nundef(irankey)) {
			irankey = '2';
			suit = 'B';
		} else if (nundef(suit)) {
			if (isNumber(irankey)) irankey = Card52._getKey(irankey);
			rank = irankey[5];
			suit = irankey[6];
		}
		if (rank == '10') rank = 'T';
		if (rank == '1') rank = 'A';
		if (nundef(suit)) suit = 'H'; else suit = suit[0].toUpperCase();
		//#endregion
		//#region load svg for card_[rank][suit] (eg. card_2H)
		let cardKey = 'card_' + rank + suit;
		let svgCode = C52[cardKey];
		svgCode = '<div>' + svgCode + '</div>';
		let el = createElementFromHTML(svgCode);
		if (isdef(h) || isdef(w)) { mSize(el, w, h); }
		//#endregion
		return { rank: rank, suit: suit, key: cardKey, div: el, w: w, h: h, faceUp: true };
	}
	static random() { return Card52.getItem(randomNumber(0, 51)); }
	static randomRankSuit() {
		let c = Card52.random();
		return [c.rank, c.suit];
	}
	static show(icard, dParent, h = 110, w = undefined) {
		if (isNumber(icard)) {
			if (nundef(w)) w = h * .7;
			icard = Card52.getItem(icard, h, w);
		}
		mAppend(dParent, icard.div);
	}
}
class CCanvas {
	constructor(dParent, styles, bstyles, play, pause, origin = 'cc') {
		let o = mCanvas(dParent, styles, bstyles, play, pause);
		[this.cv, this.cx, this.play, this.pause] = [o.cv, o.cx, o.play, o.pause];
		let [w, h] = [this.w, this.h] = [this.cv.width, this.cv.height];
		this.defaultsize = 20;
		this.origin = this.init_origin(origin);
		this.cx.translate(this.origin.x, this.origin.y);
		this.maxx = w - this.origin.x; this.minx = this.maxx - w;
		this.maxy = h - this.origin.y; this.miny = this.maxy - h;
		this.items = [];
	}
	add(o = {}) {
		addKeys({ canvas: this, x: 0, y: 0, color: rColor(50), w: this.defaultsize, h: this.defaultsize, a: 0, draw: null }, o);
		this.items.push(o);
		return o;
	}
	clear() { cClear(this.cv, this.cx); }
	clamp(item) { item.x = clamp(item.x, this.minx + item.w / 2, this.maxx - item.x / 2); item.y = clamp(item.y, this.miny + item.h / 2, this.maxy - item.h / 2) }
	cycle(item) { item.x = cycle(item.x, this.minx, this.maxx); item.y = cycle(item.y, this.miny, this.maxy) }
	draw() {
		this.clear();
		for (const item of this.items) {
			this.draw_item(item);
		}
	}
	draw_item(item) {
		let cx = this.cx;
		cx.save();
		cx.translate(item.x, item.y);
		cx.rotate(toRadian(item.a));
		if (isdef(item.draw)) { item.draw(this, item); }
		else cEllipse(0, 0, item.w, item.h, { bg: item.color }, 0, cx);
		cx.restore();
	}
	init_origin(origin) {
		if (nundef(origin)) origin = 'cc';
		let pt = origin;
		if (isString(origin)) {
			let v = origin[0], h = origin[1];
			let y = v == 't' ? 0 : v == 'c' ? this.cv.height / 2 : this.cv.height;
			let x = h == 'l' ? 0 : h == 'c' ? this.cv.width / 2 : this.cv.width;
			pt = { x: x, y: y };
		}
		return pt;
	}
	update() {
		let n = 0;
		for (const item of this.items) { if (isdef(item.update)) { n += item.update(this, item) ? 1 : 0; } }
		return n > 0;
	}
}
class CCanvasNoClear extends CCanvas {
	clear() { }
}
class CCanvasPlot extends CCanvas {
	clear() {
		cClear(this.cv, this.cx);
		this.draw_axes();
	}
	draw_axes() {
		let ctx = this.cx;
		ctx.beginPath();
		ctx.strokeStyle = "rgb(128,128,128)";
		ctx.moveTo(this.minx, 0); ctx.lineTo(this.maxx, 0);
		ctx.moveTo(0, this.miny); ctx.lineTo(0, this.maxy);
		ctx.stroke();
	}
	draw() {
		this.clear();
		for (const item of this.items) {
			if (isdef(item.func)) this.plot(item.func, item.color, item.thickness);
			else {
				super.draw_item(item);
			}
		}
	}
	pp(x, y, label = 'hallo', styles = {}) {
		addKeys({ fg: 'silver', bg: 'silver', w: 3, h: 3 }, styles)
		cEllipse(x, y, styles.w, styles.h, { bg: styles.bg }, 0, this.cx);
		addKeys({ x: x, y: y, offy: 'below 4', offx: 'center', family: 'arial narrow', fz: 20 }, styles);
		draw_text(this, label, styles);
	}
	plot(func, color, thick, filled = false) {
		let cx = this.cx;
		var xx, yy, dx = 4, x0 = 0, y0 = 0, scale = this.scale = 40;
		var imax = Math.round(this.maxx / dx);
		var imin = Math.round(this.minx / dx);
		cx.beginPath();
		cx.lineWidth = thick;
		cx.strokeStyle = cx.fillStyle = color;
		for (var i = imin; i <= imax; i++) {
			xx = dx * i; yy = scale * func(xx / scale);
			if (i == imin) cx.moveTo(x0 + xx, y0 - yy);
			else cx.lineTo(x0 + xx, y0 - yy);
		}
		cx.stroke(); if (filled) cx.fill();
	}
}
class CItemWalker {
	constructor(name, options = {}) {
		options.label = name;
		addKeys({ x: 0, y: 0, color: rColor(60) }, options);
		if (isdef(options.sz)) options.w = options.h = options.sz;
		addKeys(options, this);
	}
	update() { move_random(this, this.canvas); }
	draw() { draw_label(this.canvas, this); }
}
class ControllerSolitaire {
	constructor(g, user) { this.g = g; this.player = user; }
	stopGame() { resetState(); }
	startGame() {
		resetState();
		this.g.successFunc = successPictureGoal;
		this.g.failFunc = failPictureGoal;
		this.g.correctionFunc = showCorrectWord;
		this.g.startGame();
		this.startLevel();
	}
	startLevel() {
		Settings.updateGameValues(this.player, this.g);
		this.g.start_Level();
		this.startRound();
	}
	startRound() {
		resetRound();
		uiActivated = false;
		this.g.startRound();
		TOMain = setTimeout(() => this.prompt(), 300);
	}
	prompt() {
		QContextCounter += 1;
		showStats();
		this.g.trialNumber = 0;
		this.g.prompt();
	}
	promptNextTrial() {
		QContextCounter += 1;
		clearTimeout(TOTrial);
		uiActivated = false;
		let delay = this.g.trialPrompt(this.g.trialNumber);
		TOMain = setTimeout(() => this.activateUi(), delay);
	}
	activateUi() {
		Selected = null;
		uiActivated = true;
		this.g.activate();
	}
	evaluate() {
		if (!canAct()) return;
		uiActivated = false; clearTimeouts();
		IsAnswerCorrect = this.g.eval(...arguments);
		if (IsAnswerCorrect === undefined) { this.promptNextTrial(); return; }
		this.g.trialNumber += 1;
		if (!IsAnswerCorrect && this.g.trialNumber < this.g.trials) { this.promptNextTrial(); return; }
		if (IsAnswerCorrect) { DELAY = isdef(Selected.delay) ? Selected.delay : this.g.spokenFeedback ? 1500 : 300; this.g.successFunc(); }
		else { DELAY = this.g.correctionFunc(); this.g.failFunc(); }
		let nextLevel = scoring(IsAnswerCorrect);
		if (DELAY > 2000) showActiveMessage('click to continue...', () => this.gotoNext(nextLevel));
		TOMain = setTimeout(() => this.gotoNext(nextLevel), DELAY);
	}
	gotoNext(nextLevel) {
		onclick = null;
		removeMarkers();
		clearTimeouts();
		if (Score.gameChange) {
			setNextGame();
			if (GameTimer.unitTimeUp()) { gameOver('Great job! Time for a break!'); } else { GC.startGame(); }
		} else if (Score.levelChange && nextLevel <= this.g.maxLevel) {
			this.g.level = nextLevel;
			setBadgeLevel(this.g.level);
			this.startLevel();
		} else { this.startRound(); }
	}
}
class ControllerSolitaireMinimal extends ControllerSolitaire {
	clear() { if (isdef(this.timer)) this.timer.clear(); }
	startLevel() {
		Settings.updateGameValues(this.player, this.g);
		this.g.start_Level();
		this.startRound();
	}
	prompt() {
		QContextCounter += 1;
		showStats(false);
		this.g.trialNumber = 0;
		this.g.prompt();
	}
	activateUi() {
		Selected = null;
		uiActivated = true;
		if (isdef(this.timer)) this.timer.start();
		this.g.activate();
	}
	gotoNext(nextLevel) {
		onclick = null;
		removeMarkers();
		clearTimeouts();
		if (isdef(this.timer)) this.timer.clear();
		if (Score.levelChange && nextLevel <= this.g.maxLevel) {
			this.g.level = nextLevel;
			setBadgeLevel(this.g.level);
			this.startLevel();
		} else {
			this.startRound();
		}
	}
}
class ControllerTTT {
	constructor(g, user) {
		this.g = g;
		this.createPlayers(user);
		GameCounter = 0;
	}
	write() { write('gc', ...arguments); }
	createPlayers(user) {
		this.write('create players')
		let players = this.players = this.g.players = [];
		let h = this.human = this.g.human = new SoloPlayer(user);
		let a = this.ai = this.g.ai = new AIPlayer();
		players.push(this.human);
		players.push(this.ai);
		this.ai.color = RED;
	}
	startGame() {
		this.write('start game')
		GameCounter += 1;
		resetState();
		this.g.startGame();
		this.startRound();
	}
	startRound() {
		this.write('start round')
		this.deactivateUi();
		this.g.startRound();
		showStats();
		this.prompt();
	}
	prompt() {
		this.write('prompt')
		this.g.prompt();
	}
	uiInteract(ev) { if (canHumanAct()) this.g.interact(ev); }
	activateUi() {
		this.write('activate');
		if (this.g.plTurn == this.g.ai) aiActivated = true; else uiActivated = true;
		this.g.activate();
	}
	deactivateUi() { aiActivated = uiActivated = false; }
	evaluate() {
		this.write('evaluate')
		this.deactivateUi();
		this.g.eval(...arguments);
		this.write('gameOver', this.g.gameOver)
		if (this.g.gameOver) {
			let msg, sp;
			if (this.g.winner && this.g.winner == this.ai) { msg = 'AI wins!'; sp = 'A.I. wins!'; this.ai.score += 1; }
			else if (this.g.winner) { msg = sp = 'You win!!!'; this.human.score += 1; }
			else { msg = "It's a tie"; sp = 'tie: no one wins'; if (nundef(this.tie)) this.tie = 1; else this.tie += 1; }
			if (this.g.info) msg += ' ' + this.g.info;
			Score.nTotal += 1;
			Score.nCorrect = Score.nWins = this.human.score;
			Score.nLoses = this.ai.score;
			Score.nTied = this.tie;
			showScore();
			showInstruction('', msg, dTitle, !this.g.silentMode, sp);
			TOMain = setTimeout(() => {
				if (GameCounter <= 3) this.bPlay = mButton('play again', () => { resetRound(); this.startGame(); }, dTable, { fz: 28, margin: 20, rounding: 10, vpadding: 6, hpadding: 12, border: 8 }, ['buttonClass']);
				this.bPlay = mButton('next game', () => { setNextGame(); GC.startGame(); }, dTable, { fz: 28, margin: 20, rounding: 10, vpadding: 6, hpadding: 12, border: 8 }, ['buttonClass']);
			}, 1500);
		} else {
			this.g.changePlayer();
			this.startRound();
		}
	}
}
class CountdownTimer {
	constructor(ms, elem) {
		this.timeLeft = ms;
		this.msStart = Daat.now();
		this.elem = elem;
		this.tick();
	}
	msElapsed() { return Date.now() - this.msStart; }
	tick() {
		this.timeLeft -= this.msElapsed;
		this.elem.innerHTML = this.timeLeft;
		if (this.timeLeft > 1000) {
			setTimeout(this.tick.bind(this), 500);
		} else this.elem.innerHTML = 'timeover';
	}
}
class CTimer {
	constructor(elem, msTick, onTick, msTotal, onElapsed) {
		this.elem = elem;
		this.msTotal = this.msLeft = msTotal;
		this.onTick = onTick;
		this.onElapsed = onElapsed;
		this.interval = msTick;
		this.running = false;
		this.paused = false;
		this.game = G.name;
		this.button = mButton('click', this.togglePause.bind(this), this.elem, { transition: 'all 1s ease', display: 'inline-block', fz: 20, rounding: 12, bg: GREEN, w: 260 }, 'mybutton');
		this.TO = null;
	}
	togglePause() { if (this.paused) this.continue(); else this.pause(); }
	clear() { this.stop(); clearElement(this.elem); }
	continue() {
		if (!this.running) this.start();
		else if (!this.paused) return;
		else { this.paused = false; this.TO = setInterval(this.tickHandler.bind(this), this.interval); }
	}
	tickHandler() {
		this.msLeft -= this.interval;
		let [ms, unit] = [this.msLeft, this.msTotal / 6];
		this.msElapsed = this.msTotal - this.msLeft;
		this.button.innerHTML = timeConversion(Math.max(this.msLeft, 0), 'sh');
		let bg = ms > unit * 4 ? GREEN : ms > unit * 2 ? YELLOW : ms > unit ? 'orange' : RED;
		this.button.style.background = bg;
		if (isdef(this.onTick)) this.onTick();
		if (this.msLeft <= 0) {
			this.stop();
			if (isdef(this.onElapsed)) {
				console.assert(G.name == this.game, 'game not the same!!! ' + G.name + ' ' + this.game);
				this.onElapsed();
			}
		}
	}
	start() {
		if (this.running) this.stop();
		this.started = new Date().now;
		this.msLeft = this.msTotal;
		this.msElapsed = 0;
		this.running = true;
		this.TO = setInterval(this.tickHandler.bind(this), this.interval);
	}
	stop() {
		if (!this.running) return;
		clearInterval(this.TO);
		this.running = false;
	}
	pause() {
		if (this.paused || !this.running) return;
		clearInterval(this.TO);
		this.paused = true;
	}
}
class CTimer_dep {
	constructor(elem, msTick, onTick, msTotal, onElapsed) {
		this.elem = elem;
		this.msTotal = this.msLeft = msTotal;
		this.onTick = onTick;
		this.onElapsed = onElapsed;
		this.interval = msTick;
		this.running = false;
		this.paused = false;
		this.game = G.name;
		this.button = mButton('click', this.togglePause.bind(this), this.elem, { transition: 'all 1s ease', display: 'inline-block', fz: 20, rounding: 12, bg: GREEN, w: 260 }, 'mybutton');
		this.TO = null;
	}
	togglePause() { if (this.paused) this.continue(); else this.pause(); }
	clear() { this.stop(); clearElement(this.elem); }
	continue() {
		if (!this.running) this.start();
		else if (!this.paused) return;
		else { this.paused = false; this.TO = setInterval(this.tickHandler.bind(this), this.interval); }
	}
	tickHandler() {
		this.msLeft -= this.interval;
		let [ms, unit] = [this.msLeft, this.msTotal / 6];
		this.msElapsed = this.msTotal - this.msLeft;
		this.button.innerHTML = timeConversion(Math.max(this.msLeft, 0), 'sh');
		let bg = ms > unit * 4 ? GREEN : ms > unit * 2 ? YELLOW : ms > unit ? 'orange' : RED;
		this.button.style.background = bg;
		if (isdef(this.onTick)) this.onTick();
		if (this.msLeft <= 0) {
			this.stop();
			if (isdef(this.onElapsed)) {
				console.assert(G.name == this.game, 'game not the same!!! ' + G.name + ' ' + this.game);
				this.onElapsed();
			}
		}
	}
	start() {
		if (this.running) this.stop();
		this.started = new Date / 1e3 | 0;
		this.msLeft = this.msTotal;
		this.msElapsed = 0;
		this.running = true;
		this.TO = setInterval(this.tickHandler.bind(this), this.interval);
	}
	stop() {
		if (!this.running) return;
		clearInterval(this.TO);
		this.running = false;
	}
	pause() {
		if (this.paused || !this.running) return;
		clearInterval(this.TO);
		this.paused = true;
	}
}
class Deck1 extends Array {
	initTest(n, shuffled = true) { range(0, n).map(x => this.push(Card52.getItem(x))); if (shuffled) this.shuffle(); }
	initEmpty() { }
	init52(shuffled = true, jokers = 0) {
		range(0, 51 + jokers).map(x => this.push(Card52.getItem(x)));
		if (shuffled) this.shuffle();
	}
	add(otherDeck) { while (otherDeck.length > 0) { this.unshift(otherDeck.pop()); } return this; }
	count() { return this.length; }
	static transferTopFromToBottom(d1, d2) { let c = d1.pop(); d2.putUnderPile(c); return c; }
	deal(n) { return this.splice(0, n); }
	getIndices() { return this.map(x => x.i); }
	log() { console.log(this); }
	putUnderPile(x) { this.push(x); }
	putOnTop(x) { this.unshift(x); }
	showDeck(dParent, splay, ovPercent = 0, faceUp = undefined, contStyles = {}) {
		if (isdef(faceUp)) { if (faceUp == true) this.turnFaceUp(); else this.turnFaceDown(); }
		splayout(this, dParent, contStyles, ovPercent, splay);
	}
	shuffle() { shuffle(this); }
	topCard() { return this[this.length - 1]; }
	turnFaceUp() {
		if (isEmpty(this) || this[0].faceUp) return;
		this.map(x => Card52.turnFaceUp(x));
	}
	turnFaceDown() {
		if (isEmpty(this) || !this[0].faceUp) return;
		this.map(x => Card52.turnFaceDown(x));
	}
}
class DeckMS {
	constructor(oid, o) {
		this.o = o;
		this.oid = this.id = oid;
		this.elem = document.createElement('div');
		this.elem.id = oid;
		o.mount(this.elem);
		registerElement(this);
	}
	detach() {
		if (this.parent) {
			this.parent.removeChild(this.elem);
			this.parent = null;
		}
	}
	attachTo(div, { placeInCenter = true } = {}) {
		this.detach();
		this.parent = div;
		div.appendChild(this.elem);
		if (placeInCenter) this.center();
	}
	center() {
		if (this.parent) {
			let d = this.elem;
			let wParent = this.parent.offsetWidth;
			let wElem = this.o.cards.length > 0 ? this.o.cards[0].elem.offsetWidth : 78;
			let hParent = this.parent.offsetHeight;
			let hElem = this.o.cards.length > 0 ? this.o.cards[0].elem.offsetHeight : 110;
			d.style.position = 'relative';
			this.centerX = (wParent - wElem) / 2;
			this.centerY = (hParent - hElem) / 2;
			this.w = wElem;
			this.h = hElem;
			d.style.left = '' + this.centerX + 'px';
			d.style.top = '' + this.centerY + 'px';
		}
	}
	setPos(x, y) {
		this.elem.style.left = '' + (this.centerX + x) + 'px';
		this.elem.style.top = '' + (this.centerY + y) + 'px';
	}
}
class Engine {
	constructor() {
		this.examples = { a: 5, b: 0 };
		this.sDataExamples = ['a00', 'b00'];
		this.urls = [];
		let serverDataName = null;
		this.iTest = 0;
		for (const [k, v] of Object.entries(this.examples)) {
			let urlServerData = '/EXAMPLES/' + k + '00/serverData.yaml';
			for (let i = 0; i <= v; i++) {
				let fdName = k + '0' + i;
				let testInfo = {
					urlSpec: '/EXAMPLES/spec/' + fdName + '.yaml',
					urlServerData: urlServerData,
				}
				this.urls.push(testInfo);
			}
		}
		console.log(this.urls);
	}
	loadNextExample() {
	}
}
class FakeServerClass {
	constructor(io, perlenDict, settings, state) {
		this.io = io;
		this.perlenDict = perlenDict;
		this.settings = {};
		this.state = {};
		this.initState(state, settings);
		this.players = {};
	}
	initState(state, settings) {
		base.copyKeys(state, this.state);
		base.copyKeys(settings, this.settings);
		this.maxPoolIndex = base.initServerPool(this.settings, this.state, this.perlenDict);
	}
	initStateOld(settings, state) {
		if (isdef(settings)) copyKeys(settings, this.settings);
		let byIndex = this.byIndex = {}; this.maxIndex = 0; this.State = state;
		if (nundef(state)) {
			state = this.State = {};
			let board = state.board = createServerBoard();
			state.boardArr = [];
			state.pool = byIndex;
			state.poolArr = [];
			let keys = createServerPoolKeys();
			keys.map(x => this.addToPool(this.perlenDict[x]));
		}
		this.initPlayers();
	}
	addPlayer(client, x) {
		let username = x;
		let id = client.id;
		let pl = { id: id, client: client, name: username, username: username, arr: [] };
		this.players[id] = pl;
		this.initPlayerState(pl.id);
		return pl;
	}
	addToPool(perle) {
		let index = this.maxIndex;
		this.maxIndex += 1;
		let p = this.byIndex[index] = { key: perle.path, index: index };
		if (isdef(this.State.poolArr)) this.State.poolArr.push(index);
		return p;
	}
	boardLayoutChange(client, x) {
		let state = this.State;
		state.boardArr = x.boardArr;
		state.poolArr = x.poolArr;
		state.board = { rows: x.rows, cols: x.cols };
		this.safeEmitState(false, false, false, true);
	}
	safeEmitState(emitSettings, emitPool, emitPerlenDict, emitBoardLayout, client, moreData) {
		let o = { state: { boardArr: this.State.boardArr, poolArr: this.State.poolArr } };
		if (emitSettings) o.settings = this.settings;
		if (emitPool) o.state.pool = this.State.pool;
		if (emitPerlenDict) o.perlenDict = this.perlenDict;
		if (emitBoardLayout) o.state.board = this.board;
		DB.tables.perlen = this.State;
		utils.toYamlFile({ settings: this.settings, state: this.State }, './lastState.yaml');
		if (isdef(moreData)) copyKeys(modeData, o);
		if (isdef(client)) client.emit('gameState', o); else this.io.emit('gameState', o);
	}
	getNumActivePlayers() { return this.state.players.length; }
	getNumPlayers() { return Object.keys(this.players).length; }
	getPlayerNames() { return this.State.players.map(x => x.name).join(','); }
	getPlayerState(plid) { return firstCond(this.State.players, x => x.id == plid); }
	getPerleByFilename(filename) {
		for (const k in this.byIndex) {
			let p = this.byIndex[k];
			if (p.path == filename) return p;
		}
		return null;
	}
	getPerlenName(iPerle) { return this.byIndex[iPerle].text; }
	getTurn() { return this.state.turn; }
	initPlayerState(plid) {
		let pl = this.players[plid];
		pl.arr = [];
		pl.isInitialized = false;
		let plState = { id: pl.id, name: pl.name, username: pl.username, arr: pl.arr, isInitialized: pl.isInitializes };
		if (nundef(this.State.players)) this.State.players = [];
		this.State.players.push(plState);
		return pl;
	}
	initPlayers() { this.State.players = []; for (const plid in this.players) { this.initPlayerState(plid); } }
	initBoardTraditional(settings) {
		let [rows, cols] = [valf(settings.rows, 4), valf(settings.cols, 4)];
		return { rows: rows, cols: cols, nFields: rows * cols };
	}
	initBoardImage(settings) {
		let filename = settings.filename; //'brett02cropped.png'; // [valf(settings.rows, 4), valf(settings.cols, 4)];
		let name = stringBefore(filename, '.');
		let info = settings.bretter[name];
		let nums = allNumbers(info);
		let algo = stringAfter(info, ' ');
		return { filename: filename, algo: algo, nFields: nums[0] };
	}
	initialPoolDone(client, x) {
		let pl = this.players[client.id];
		pl.isInitialized = true;
		this.updatePlayerState(pl);
	}
	sendInitialOrState(client) {
		if (this.settings.individualSelection) {
			let data = { state: this.State, perlenDict: this.perlenDict, instruction: 'pick your set of pearls!' };
			client.emit('initialPool', data);
		} else {
			logSend('gameState');
			this.safeEmitState(true, true, true, true, client);
		}
	}
	playerJoins(client, x) {
		let pl = this.addPlayer(client, x);
		this.sendInitialOrState(client);
		this.io.emit('userMessage', {
			username: x,
			msg: `user ${pl.name} joined! (players:${this.getPlayerNames()})`,
		});
	}
	playerLeft(client, data) {
		let id = client.id;
		let players = this.players;
		delete players[id];
		let plState = this.getPlayerState(id);
		if (plState) removeInPlace(this.State.players, plState);
	}
	playerMovesPerle(client, x) {
		let iPerle = x.iPerle;
		let iFrom = x.iFrom;
		let iTo = x.iTo;
		let username = x.username;
		let perle = this.byIndex[iPerle];
		let boardArr = this.State.boardArr;
		boardArr[iFrom] = null;
		boardArr[iTo] = iPerle;
		this.State.boardArr = boardArr;
		if (isdef(x.displaced)) {
			this.State.poolArr.unshift(x.displaced);
		}
		this.safeEmitState(false, false, false, false);
	}
	playerPlacesPerle(client, x) {
		let iPerle = x.iPerle;
		let iField = x.iField;
		let username = x.username;
		let state = this.State;
		let perle = state.pool[iPerle];
		removeInPlace(state.poolArr, iPerle);
		if (isdef(x.displaced)) { state.poolArr.unshift(x.displaced); }
		state.boardArr[iField] = iPerle;
		this.safeEmitState(false, false, false, false);
	}
	playerRemovesPerle(client, x) {
		let iPerle = x.iPerle;
		let iFrom = x.iFrom;
		let state = this.State;
		state.boardArr[iFrom] = null;
		state.poolArr.unshift(iPerle);
		let pl = this.players[client.id];
		this.safeEmitState(false, false, false, false);
	}
	playerReset(client, x) {
		this.initState(x.settings);
		let username = x.username;
		this.sendInitialOrState(client);
	}
	updatePlayerState(pl) {
		let plState = firstCond(this.State.players, x => x.id == pl.id);
		plState.isInitialized = pl.isInitialized;
	}
}
class FakeSocketClass {
	constructor() {
		if (VerboseSocket) console.log('FAKE SOCKET!!!');
	}
	emit() { if (VerboseSocket) console.log('client emits', ...arguments); }
}
class FileUploadForm {
	constructor(dParent, title, route, onSubmit) {
		this.dParent = dParent;
		this.title = title;
		this.route = route;
		this.onSubmit = onSubmit;
		let id = this.id = getUID();
		this.uploadUrl = SERVERURL + route;
		this.createHtml(route)
	}
	bretter() { this.createHtml('bretter'); }
	perlen() { this.createHtml('perlen'); }
	createHtml(route) {
		let elem = createElementFromHTML(`
    <div>
      <form action="/${route}" enctype="multipart/form-data" method="post">
        <input type="file" name="${route}" accept='image/*' multiple>
        <input type="submit" value="Upload">
      </form>  
    </div>
    `);
		mAppend(this.dParent, elem);
	}
}
class FixedWidthWrapGrid {
	constructor(ms, cols, { wGrid, hGrid, hField, margin = 10, gap = 4 } = {}) {
		this.cont = ms;
		this.g = ms.elem;
		setOrigin(this.g, false);
		this.cols = cols;
		this.margin = margin;
		this.gap = gap;
		if (isdef(wGrid) && isdef(hGrid)) { this.wCont = wGrid; this.hCont = hGrid; }
		else[this.wCont, this.hCont] = ms.getSize();
		this.iNext = 0;
		this.bounds = [];
		this.w = this.wCont - 2 * margin;
		this.h = this.hCont - 2 * margin;
		this.origin = { x: margin, y: margin };
		this.wField = this.w / this.cols;
		this.hField = isdef(hField) ? hField : this.wField;
	}
	nextBounds() {
		let i = this.iNext;
		let irow = Math.floor(i / this.cols);
		let icol = i % this.cols;
		let x = this.origin.x + this.wField / 2 + icol * this.wField;
		let y = this.origin.y + this.hField / 2 + irow * this.hField;
		let w = this.wField - this.gap;
		let h = this.hField - this.gap;
		this.iNext += 1;
		return [x, y, w, h];
	}
}
class G2Player {
	constructor(name, o) {
		this.name = name;
		copyKeys(o, this);
		this.maxLevel = isdef(this.levels) ? Object.keys(this.levels).length - 1 : 0;
		this.id = name;
		this.color = getColorDictColor(this.color);
		this.moveCounter = 0;
	}
	startGame() {
		this.moveCounter = 0;
		this.winner = this.gameOver = null;
		this.setStartPlayer();
	}
	clear() { clearTimeout(this.TO); }
	changePlayer() {
		let idx = this.iPlayer = (this.iPlayer + 1) % this.players.length;
		this.setPlayers();
	}
	heuristic(state) { return 1; }
	setPlayers() {
		this.plTurn = this.playerOrder[this.iPlayer];
		this.plOpp = this.plTurn == this.ai ? this.human : this.ai;
	}
	setStartPlayer() {
		if (this.startPlayer == 'human') this.playerOrder = [this.human, this.ai];
		else if (this.startPlayer == 'ai') this.playerOrder = [this.ai, this.human];
		else this.playerOrder = chooseRandom([[this.human, this.ai], [this.ai, this.human]]);
		this.iPlayer = 0;
		this.setPlayers();
	}
	startRound() { }
	prompt() { }
	eval() { }
	activate() { }
}
class GAbacus extends Game {
	constructor(name, o) { super(name, o); }
	startGame() { this.successFunc = successThumbsUp; this.failFunc = failThumbsDown; this.correctionFunc = this.showCorrectSequence.bind(this); }
	showCorrectSequence() { let t = correctBlanks(); if (this.level <= 1 && (this.step <= 3 || this.op != 'mult')) showSayHint(3); return t + 1000; }
	start_Level() { if (!isList(this.steps)) this.steps = [this.steps]; this.numPics = 2; }
	prompt() {
		mLinebreak(dTable, 2);
		showHiddenThumbsUpDown(110);
		mLinebreak(dTable);
		this.seq = makeExpSequence();
		let panel = mDiv(dTable, { bg: '#00000080', padding: 20, rounding: 10 });
		[this.words, this.letters] = showEquation(this.seq, panel);
		setNumberSequenceGoal();
		mLinebreak(dTable, 30);
		let wr = (this.language == 'E' ? 'calculate' : "rechne");
		let spOp = this.oop.sp; if (this.language == 'D') spOp = DD[spOp];
		let sp = this.operand + ' ' + spOp + ' ' + this.step + ' ?';
		show_instruction(wr, dTitle, sp);
		if (this.level <= 1 && this.showHint && (this.step <= 3 || this.op != 'mult'))
			hintEngineStart(getOperationHintString, [0, 1], 5000 + this.level * 1000);
		this.controller.activateUi.bind(this.controller)();
	}
	trialPrompt() {
		if (this.level <= 1 && this.showHint && (this.step <= 3 || this.op != 'mult')) hintEngineStart(getOperationHintString, [0, 1], 5000 + this.level * 1000);
		TOMain = setTimeout(() => getWrongChars().map(x => unfillChar(x)), 500);
		return 600;
	}
	activate() { addKeyup('G', this.interact.bind(this)); }
	interact(ev) {
		if (!isNumber(ev.key) && ev.key != '-') return;
		clearFleetingMessage();
		if (!canAct()) return;
		let sel = Selected = onKeyWordInput(ev);
		if (nundef(sel)) return;
		let lastInputCharFilled = sel.target;
		console.assert(sel.isMatch == (lastInputCharFilled.letter == sel.ch), lastInputCharFilled, sel.ch);
		if (sel.isMatch && sel.isVeryLast) {
			deactivateFocusGroup();
			this.controller.evaluate.bind(this.controller)(true);
		} else if (sel.isMatch && sel.isLastOfGroup) {
			sel.target.isBlank = false;
			sel.target.group.hasBlanks = false;
			removeInPlace(Goal.blankWords, sel.target.group);
			removeInPlace(Goal.blankChars, sel.target);
			deactivateFocusGroup();
			console.log('haaaaaaaaaaaalo', Goal.isFocus)
		} else if (sel.isMatch) {
			removeInPlace(Goal.blankChars, sel.target);
			sel.target.isBlank = false;
		} else if (sel.isVeryLast) {
			Selected.words = getInputWords();
			Selected.answer = getInputWordString();
			Selected.req = getCorrectWordString();
			deactivateFocusGroup();
			this.controller.evaluate.bind(this.controller)(false);
		} else if (sel.isLastOfGroup) {
			Selected.words = getInputWords();
			Selected.answer = getInputWordString();
			Selected.req = getCorrectWordString();
			deactivateFocusGroup();
			this.controller.evaluate.bind(this.controller)(false);
		} else {
			if (!this.silent) { writeSound(); playSound('incorrect1'); }
			deactivateFocusGroup();
			showFleetingMessage('does NOT fit: ' + Selected.ch, 0, { fz: 24 });
			setTimeout(() => unfillCharInput(Selected.target), 500);
		}
	}
	eval(isCorrect) { return isCorrect; }
}
class GameTimed extends Game {
	constructor(name, o) { super(name, o); }
	clear() { clearInterval(this.TOI); super.clear(); this.timer = null; }
	makeTimer() {
		this.timer = true;
		if (nundef(this.msTotal)) this.msTotal = 5000;
		if (nundef(this.msInterval)) this.msInterval = 100;
		let w = this.wTimerOuter = 200;
		this.dTimeOuter = mDiv(dTable, { w: w, h: 25, border: 'white', rounding: 10, position: 'relative' });
		[this.wTimer, this.r, this.g] = [0, 0, 255];
		this.dTimeInner = mDiv(this.dTimeOuter, { h: 25, w: this.wTimer, rounding: 10, bg: `rgb(${this.r},${this.g},0)`, position: 'absolute', left: 0, top: 0 });
		this.dTimeDisplay = mDiv(this.dTimeOuter, { patop: 2, align: 'center', h: 25, w: w, position: 'absolute', left: 0, top: 0 });
		mLinebreak(dTable);
		this.dPause = mDiv(dTable, { cursor: 'pointer', fz: 12, hpadding: 30, vpadding: 10 }, null, 'click to pause');
		this.dPause.onclick = () => this.pause();
	}
	pause() {
		if (nundef(this.timer)) return;
		clearInterval(this.TOI);
		this.dPause.innerHTML = 'click to resume...';
		this.dPause.onclick = () => this.resume();
	}
	resume() {
		if (nundef(this.timer)) return;
		this.dPause.innerHTML = 'click to pause...';
		this.dPause.onclick = () => this.pause();
		this.TOI = setInterval(this.onTick.bind(this), this.msInterval);
	}
	activate() {
		if (nundef(this.timer)) return;
		this.msLeft = valf(this.msTotal, 10000);
		this.dTimeDisplay.innerHTML = timeConversion(this.msLeft, 'sh');
		this.TOI = setInterval(this.onTick.bind(this), this.msInterval);
	}
	onTick() {
		this.msLeft -= this.msInterval;
		this.wTimer += this.wTimerOuter * this.msInterval / this.msTotal;
		let inc_color = 255 * this.msInterval / this.msTotal;
		this.r += inc_color; this.g -= inc_color;
		mStyle(this.dTimeInner, { w: this.wTimer, bg: `rgb(${this.r},${this.g},0)` });
		this.dTimeDisplay.innerHTML = timeConversion(this.msLeft, 'sh');
		if (this.msLeft < 100) {
			clearInterval(this.TOI);
			this.dPause.style.opacity = 0;
			this.onTimeup();
		}
	}
}
class GameTimed1 extends Game {
	constructor(name, o) { super(name, o); }
	clear() { clearInterval(this.TOI); super.clear(); }
	makeTimer() {
		if (nundef(this.msTotal)) this.msTotal = 5000;
		if (nundef(this.msInterval)) this.msInterval = 100;
		let w = this.wTimerOuter = 200;
		this.dTimeOuter = mDiv(dTable, { w: w, h: 25, border: 'white', rounding: 10, position: 'relative' });
		[this.wTimer, this.r, this.g] = [0, 0, 255];
		this.dTimeInner = mDiv(this.dTimeOuter, { h: 25, w: this.wTimer, rounding: 10, bg: `rgb(${this.r},${this.g},0)`, position: 'absolute', left: 0, top: 0 });
		this.dTimeDisplay = mDiv(this.dTimeOuter, { patop: 2, align: 'center', h: 25, w: w, position: 'absolute', left: 0, top: 0 });
		mLinebreak(dTable);
		this.dPause = mDiv(dTable, { cursor: 'pointer', fz: 12, hpadding: 30, vpadding: 10 }, null, 'click to pause');
		this.dPause.onclick = () => this.pause();
	}
	pause() {
		clearInterval(this.TOI);
		this.dPause.innerHTML = 'click to resume...';
		this.dPause.onclick = () => this.resume();
	}
	resume() {
		this.dPause.innerHTML = 'click to pause...';
		this.dPause.onclick = () => this.pause();
		this.TOI = setInterval(this.onTick.bind(this), this.msInterval);
	}
	activate() {
		this.msLeft = valf(this.msTotal, 10000);
		this.dTimeDisplay.innerHTML = timeConversion(this.msLeft, 'sh');
		this.TOI = setInterval(this.onTick.bind(this), this.msInterval);
	}
	onTick() {
		this.msLeft -= this.msInterval;
		this.wTimer += this.wTimerOuter * this.msInterval / this.msTotal;
		let inc_color = 255 * this.msInterval / this.msTotal;
		this.r += inc_color; this.g -= inc_color;
		mStyle(this.dTimeInner, { w: this.wTimer, bg: `rgb(${this.r},${this.g},0)` });
		this.dTimeDisplay.innerHTML = timeConversion(this.msLeft, 'sh');
		if (this.msLeft < 100) {
			clearInterval(this.TOI);
			this.dPause.style.opacity = 0;
			this.onTimeup();
		}
	}
}
class GAnagram extends Game {
	constructor(name, o) {
		super(name, o);
		if (this.language == 'C') {
			this.realLanguage = this.language;
			this.language = chooseRandom('E', 'S', 'F', 'D');
		}
	}
	clear() { super.clear(); if (isdef(this.language)) this.language = this.language; }
	start_Level() {
		this.keys = setKeysG(this, filterWordByLengthG, 10);
		if (this.keys.length < 10) { this.keys = setKeysG(this, filterWordByLengthG, 10, 'all'); }
	}
	prompt() {
		myShowPics(null, {}, {});
		if (this.hidden) {
			let d = iDiv(Pictures[0]);
			animate(d, 'aniAppearMinute', 100000);
		}
		setGoal();
		let w = this.showWord ? Goal.label : '';
		let wr = `drag letters to form ${w}`;
		let sp = `form ${w}`;
		show_instruction(wr, dTitle, sp);
		mLinebreak(dTable, 22);
		let word = Goal.label.toUpperCase();
		let wlen = word.length;
		let wTable = getRect(mBy('table')).w;
		let wmax = wTable / wlen;
		let gap = 4;
		let fzMax = wTable / wlen - 3 * gap;
		let fz = Math.min(70, fzMax);
		let dpEmpty = createLetterInputsX(word, dTable, { pabottom: 5, bg: 'grey', display: 'inline-block', fz: fz, w: fz, h: fz * 1.1, margin: gap });
		let inputs = blankInputs(dpEmpty, range(0, wlen - 1), false);
		for (let i = 0; i < inputs.length; i++) {
			let l = iDiv(inputs[i]);
			ipadd(l);
			mClass(l, 'dropzone');
			l.id = 'input' + i;
		}
		this.inputs = inputs;
		let x = mLinebreak(dTable, 35);
		fz = Math.min(60, fzMax);
		let dp = createLetterInputsX(word, dTable, { bg: 'silver', display: 'inline-block', fz: fz, w: fz, h: fz * 1.1, margin: 4 });
		scrambleInputs(dp);
		let letters = Array.from(dp.children);
		for (let i = 0; i < letters.length; i++) {
			let l = letters[i];
			l.setAttribute('draggable', true);
			ipadd(l);
			l.id = 'letter' + i;
		}
		this.letters = letters;
		mLinebreak(dTable, 35);
		this.bDone = mButton('Done!', this.controller.evaluate.bind(this.controller), dTable, { fz: 28, matop: 10, rounding: 10, padding: 16, border: 8 }, ['buttonClass']);
		if (this.hidden) showFleetingMessage('category: ' + Pictures[0].info.subgroup, 5000);
		else if (!this.showWord) { showLabelPercentHintAfter(50, 6000); }
		this.controller.activateUi.bind(this.controller)();
	}
	trialPrompt() {
		sayTryAgain();
		setTimeout(() => {
			this.inputs.map(x => iDiv(x).innerHTML = '_')
		}, 1500);
		return 10;
	}
	eval() {
		let s = this.inputs.map(x => iDiv(x).innerHTML);
		let w = s = s.join('');
		let word = Goal.label.toUpperCase();
		Selected = { answer: w, reqAnswer: word, feedbackUI: iDiv(Goal) };
		return w == word;
	}
	onTimeup() { this.controller.evaluate(); }
}
class GAnagram_MESSY extends Game {
	constructor(name, o) {
		super(name, o);
		if (this.language == 'C') {
			this.realLanguage = this.language;
			this.language = chooseRandom('E', 'S', 'F', 'D');
		}
	}
	clear() { super.clear(); if (isdef(this.language)) this.language = this.language; }
	start_Level() {
		this.keys = setKeysG(this, filterWordByLengthG, 10);
		if (this.keys.length < 10) { this.keys = setKeysG(this, filterWordByLengthG, 10, 'all'); }
	}
	prompt() {
		myShowPics(null, {}, {});
		if (this.hidden) {
			let d = iDiv(Pictures[0]);
			animate(d, 'aniAppearMinute', 100000);
		}
		setGoal();
		showInstruction(this.showWord ? Goal.label : '', this.language == 'E' ? 'drag letters to form' : "forme", dTitle, true);
		mLinebreak(dTable, 25);
		let fz = 120; let word = Goal.label.toUpperCase(); let wlen = word.length;
		let dpEmpty = createLetterInputsX(word, dTable, { pabottom: 5, bg: 'grey', display: 'inline-block', fz: fz, w: fz, h: fz * 1.1, margin: 4 });
		let inputs = blankInputs(dpEmpty, range(0, wlen - 1), false);
		for (let i = 0; i < inputs.length; i++) {
			let l = iDiv(inputs[i]);
			l.ondragover = ev => ev.preventDefault();
			l.ondrop = event => {
				event.preventDefault();
				var data = event.dataTransfer.getData("Text");
				event.target.innerHTML = data;
			}
			makeDraggableInner(l);
			mClass(l, 'dropzone');
			l.id = 'input' + i;
		}
		this.inputs = inputs;
		let x = mLinebreak(dTable, 50);
		fz = 60; word = Goal.label.toUpperCase();
		let dp = createLetterInputsX(word, dTable, { bg: 'silver', display: 'inline-block', fz: fz, w: fz, h: fz * 1.1, margin: 4 });
		scrambleInputs(dp);
		let letters = Array.from(dp.children);
		for (let i = 0; i < letters.length; i++) {
			let l = letters[i];
			l.setAttribute('draggable', true);
			makeDraggableInner(l);
			l.id = 'letter' + i;
		}
		this.letters = letters;
		if (this.hidden) showFleetingMessage('category: ' + Pictures[0].info.subgroup, 5000);
		else if (!this.showWord) { showLabelPercentHintAfter(50, 6000); }
		this.controller.activateUi.bind(this.controller)();
	}
	trialPrompt() {
		sayTryAgain();
		setTimeout(() => {
			this.inputs.map(x => iDiv(x).innerHTML = '_')
		}, 1500);
		return 10;
	}
	eval(w, word) {
		Selected = { answer: w, reqAnswer: word, feedbackUI: iDiv(Goal) };
		return w == word;
	}
}
class GAnagram_orig extends Game {
	constructor(name, o) {
		super(name, o);
		if (this.language == 'C') {
			this.realLanguage = this.language;
			this.language = chooseRandom('E', 'S', 'F', 'D');
		}
	}
	clear() { super.clear(); if (isdef(this.language)) this.language = this.language; }
	start_Level() {
		this.keys = setKeysG(this, filterWordByLengthG, 10);
		if (this.keys.length < 10) { this.keys = setKeysG(this, filterWordByLengthG, 10, 'all'); }
	}
	prompt() {
		myShowPics(null, {}, {});
		if (this.hidden) {
			let d = iDiv(Pictures[0]);
			animate(d, 'aniAppearMinute', 100000);
		}
		setGoal();
		showInstruction(this.showWord ? Goal.label : '', this.language == 'E' ? 'drag letters to form' : "forme", dTitle, true);
		mLinebreak(dTable, 25);
		this.inputs = createDropInputs();
		let x = mLinebreak(dTable, 50);
		this.letters = createDragLetters();
		if (this.hidden) showFleetingMessage('category: ' + Pictures[0].info.subgroup, 5000);
		else if (!this.showWord) { showLabelPercentHintAfter(50, 6000); }
		this.controller.activateUi.bind(this.controller)();
	}
	trialPrompt() {
		sayTryAgain();
		setTimeout(() => {
			this.inputs.map(x => iDiv(x).innerHTML = '_')
		}, 1500);
		return 10;
	}
	eval(w, word) {
		Selected = { answer: w, reqAnswer: word, feedbackUI: iDiv(Goal) };
		return w == word;
	}
}
class GAnagram_PCOnly extends Game {
	constructor(name, o) {
		super(name, o);
		if (this.language == 'C') {
			this.realLanguage = this.language;
			this.language = chooseRandom('E', 'S', 'F', 'D');
		}
	}
	clear() { super.clear(); if (isdef(this.language)) this.language = this.language; }
	start_Level() {
		this.keys = setKeysG(this, filterWordByLengthG, 10);
		if (this.keys.length < 10) { this.keys = setKeysG(this, filterWordByLengthG, 10, 'all'); }
	}
	prompt() {
		myShowPics(null, {}, {});
		if (this.hidden) {
			let d = iDiv(Pictures[0]);
			animate(d, 'aniAppearMinute', 100000);
		}
		setGoal();
		showInstruction(this.showWord ? Goal.label : '', this.language == 'E' ? 'drag letters to form' : "forme", dTitle, true);
		mLinebreak(dTable, 25);
		let fz = 120; let word = Goal.label.toUpperCase(); let wlen = word.length;
		let dpEmpty = createLetterInputsX(word, dTable, { pabottom: 5, bg: 'grey', display: 'inline-block', fz: fz, w: fz, h: fz * 1.1, margin: 4 });
		let inputs = blankInputs(dpEmpty, range(0, wlen - 1), false);
		for (let i = 0; i < inputs.length; i++) {
			let l = iDiv(inputs[i]);
			l.ondragover = ev => ev.preventDefault();
			l.ondrop = event => { event.preventDefault(); var data = event.dataTransfer.getData("Text"); event.target.innerHTML = data; }
			makeDraggableInner(l);
			mClass(l, 'dropzone');
			l.id = 'input' + i;
		}
		this.inputs = inputs;
		let x = mLinebreak(dTable, 50);
		fz = 60; word = Goal.label.toUpperCase();
		let dp = createLetterInputsX(word, dTable, { bg: 'silver', display: 'inline-block', fz: fz, w: fz, h: fz * 1.1, margin: 4 });
		scrambleInputs(dp);
		let letters = Array.from(dp.children);
		for (let i = 0; i < letters.length; i++) {
			let l = letters[i];
			l.setAttribute('draggable', true);
			makeDraggableInner(l);
			l.id = 'letter' + i;
		}
		this.letters = letters;
		mLinebreak(dTable, 50);
		this.bDone = mButton('Done!', this.controller.evaluate.bind(this.controller), dTable, { fz: 28, matop: 10, rounding: 10, padding: 16, border: 8 }, ['buttonClass']);
		if (this.hidden) showFleetingMessage('category: ' + Pictures[0].info.subgroup, 5000);
		else if (!this.showWord) { showLabelPercentHintAfter(50, 6000); }
		this.controller.activateUi.bind(this.controller)();
	}
	trialPrompt() {
		sayTryAgain();
		setTimeout(() => {
			this.inputs.map(x => iDiv(x).innerHTML = '_')
		}, 1500);
		return 10;
	}
	eval() {
		let s = this.inputs.map(x => iDiv(x).innerHTML);
		let w = s = s.join('');
		let word = Goal.label.toUpperCase();
		Selected = { answer: w, reqAnswer: word, feedbackUI: iDiv(Goal) };
		return w == word;
	}
}
class GAnagramBROKEN extends Game {
	constructor(name, o) {
		super(name, o);
		if (this.language == 'C') {
			this.realLanguage = this.language;
			this.language = chooseRandom('E', 'S', 'F', 'D');
		}
	}
	clear() { super.clear(); if (isdef(this.language)) this.language = this.language; }
	start_Level() {
		this.keys = setKeysG(this, filterWordByLengthG, 10);
		if (this.keys.length < 10) { this.keys = setKeysG(this, filterWordByLengthG, 10, 'all'); }
	}
	prompt() {
		myShowPics(null, {}, {});
		if (this.hidden) {
			let d = iDiv(Pictures[0]);
			animate(d, 'aniAppearMinute', 100000);
		}
		setGoal();
		let w = this.showWord ? Goal.label : '';
		let wr = `drag letters to form ${w}`;
		let sp = `forme ${w}`;
		show_instruction(wr, dTitle, sp);
		mLinebreak(dTable, 22);
		let word = Goal.label.toUpperCase();
		let wlen = word.length;
		let wTable = getRect(mBy('table')).w;
		let wmax = wTable / wlen;
		let gap = 4;
		let fzMax = wTable / wlen - 3 * gap;
		let fz = Math.min(70, fzMax);
		let dpEmpty = createLetterInputsX(word, dTable, { pabottom: 5, bg: 'grey', display: 'inline-block', fz: fz, w: fz, h: fz * 1.1, margin: gap });
		let inputs = blankInputs(dpEmpty, range(0, wlen - 1), false);
		for (let i = 0; i < inputs.length; i++) {
			let l = iDiv(inputs[i]);
			ipadd(l);
			mClass(l, 'dropzone');
			l.id = 'input' + i;
		}
		this.inputs = inputs;
		let x = mLinebreak(dTable, 35);
		fz = Math.min(60, fzMax);
		let dp = createLetterInputsX(word, dTable, { bg: 'silver', display: 'inline-block', fz: fz, w: fz, h: fz * 1.1, margin: 4 });
		scrambleInputs(dp);
		let letters = Array.from(dp.children);
		for (let i = 0; i < letters.length; i++) {
			let l = letters[i];
			l.setAttribute('draggable', true);
			ipadd(l);
			l.id = 'letter' + i;
		}
		this.letters = letters;
		mLinebreak(dTable, 35);
		this.bDone = mButton('Done!', this.controller.evaluate.bind(this.controller), dTable, { fz: 28, matop: 10, rounding: 10, padding: 16, border: 8 }, ['buttonClass']);
		if (this.hidden) showFleetingMessage('category: ' + Pictures[0].info.subgroup, 5000);
		else if (!this.showWord) { showLabelPercentHintAfter(50, 6000); }
		this.controller.activateUi.bind(this.controller)();
	}
	trialPrompt() {
		sayTryAgain();
		setTimeout(() => {
			this.inputs.map(x => iDiv(x).innerHTML = '_')
		}, 1500);
		return 10;
	}
	eval() {
		let s = this.inputs.map(x => iDiv(x).innerHTML);
		let w = s = s.join('');
		let word = Goal.label.toUpperCase();
		Selected = { answer: w, reqAnswer: word, feedbackUI: iDiv(Goal) };
		return w == word;
	}
	onTimeup() { this.controller.evaluate(); }
}
class GAristo { }
class GC4 extends GTTT {
	startGame() {
		super.startGame();
	}
	createBoard() {
		this.board = new Board(this.rows, this.cols, this.controller.uiInteract.bind(this.controller), { margin: 6, w: 60, h: 60, bg: 'white', fg: 'black', rounding: '50%' });
	}
	setStartPosition() {
		let positions = [
			[[0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0]],
			[[0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0],
			['O', 'X', 0, 0, 0, 0, 0],
			['O', 'X', 0, 0, 0, 0, 0]],
			[[0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0],
			['O', 'X', 0, 0, 0, 0, 0],
			['O', 'X', 0, 0, 0, 0, 0],
			['O', 'X', 0, 0, 0, 0, 0]],
			[[0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 'O', 0, 0, 0],
			['O', 'X', 0, 'O', 0, 0, 0],
			['O', 'X', 0, 'O', 0, 0, 0]],
			[[0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, "X", 0, 0, 0],
			["X", 0, 0, "O", 0, 0, 0],
			["O", "X", 0, "O", 0, 0, 0],
			["O", "X", "O", "O", 0, 0, 0]],
			[[0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0, 0],
			["X", 0, 0, 0, 0, 0, 0],
			["X", 0, 0, 0, "O", "O", 0]],
		];
		this.iPosition = 4;
		if (isdef(this.iPosition)) {
			let idx = this.iPosition + 1; idx = idx % positions.length; this.iPosition = idx;
		} else this.iPosition = 0;
		let state = nundef(this.startPosition) || this.startPosition == 'empty' ? positions[0]
			: this.startPosition == 'random' ? chooseRandom(positions)
				: positions[this.iPosition];
		this.board.setState(state, { X: this.ai.color, O: this.human.color });
	}
	checkFinal(state) {
		if (nundef(state)) state = this.getState();
		let isTie = false;
		let isWin = checkWinnerC4(state, this.rows, this.cols, this.stride);
		if (!isWin) { isTie = checkBoardFull(state); }
		return isWin ? 2 : isTie ? 1 : 0;
	}
	checkLegal(tile) {
		let col = tile.col;
		let topmost = this.board.items[col];
		if (EmptyFunc(topmost.label)) return true; else return false;
	}
	findBottomEmptyTileInColumn(col) {
		let x = lastCond(this.board.items, x => x.col == col && EmptyFunc(x.label));
		return x;
	}
	interact(ev) {
		let tile = evToItemC(ev);
		let legal = this.checkLegal(tile);
		if (!legal) { console.log('illegal move!'); return; }
		let pl = this.plTurn;
		let bottomMost = this.findBottomEmptyTileInColumn(tile.col);
		addLabel(bottomMost, pl.sym, { fz: 60, fg: pl.color });
		this.controller.evaluate(tile);
	}
	getAvailableMoves(state) {
		let moves = [];
		for (let c = 0; c < G.cols; c++) {
			for (let r = G.rows - 1; r >= 0; r--) {
				let i = r * G.cols + c;
				if (EmptyFunc(state[i])) { moves.push(i); break; }
			}
		}
		shuffle(moves)
		return moves;
	}
	evalState(node, depth) {
		let x = checkWinnerC4(node);
		if (checkBoardFull(node) || x) {
			let res = { reached: true, val: (!x ? 0 : (10 - depth) * (x == MAXIMIZER.sym ? 1 : -1)) };
			return res;
		}
		return { reached: false };
	}
}
class GCats extends Game {
	constructor(name, o) { super(name, o); }
	startGame() { this.correctionFunc = showCorrectPictureLabels; this.failFunc = failSomePictures; }
	dropHandler(source, target, isCopy = true) {
		let dSource = iDiv(source);
		let dTarget = iDiv(target);
		if (!isCopy) {
			mAppend(dTarget, dSource);
		} else {
			let dNew = mText(dSource.innerHTML, dTarget, { wmin: 100, fz: 20, padding: 4, margin: 4, display: 'inline-block' });
			addDDSource(dNew, false);
		}
		if (isOverflown(dTarget)) {
			let d = dTarget.parentNode;
			let r = getRect(d);
			let w = r.w + 100;
			mSize(d, w, r.h);
			console.log('overflow!!!!', r.w, '=>', w)
		}
	}
	prompt() {
		let items;
		let data = this.keysByCat = genCats(this.numCats);
		this.keylists = [], this.catsByKey = {};
		for (const cat in data) {
			this.keylists.push({ keys: data[cat], cat: cat });
			for (const k of data[cat]) {
				this.catsByKey[k] = cat;
			}
		}
		this.cats = Object.keys(this.keysByCat);
		this.allKeys = Object.keys(this.catsByKey);
		this.options = {}; _extendOptions(this.options);
		if (this.pickRandom == false) {
			items = Pictures = getNItemsPerKeylist(this.numPics, this.keylists, this.options);
		} else {
			let keys = choose(this.allKeys, this.numPics * this.numCats);
			items = Pictures = genItemsFromKeys(keys, this.options);
			items.map(x => x.cat = this.catsByKey[x.key]);
		}
		shuffle(items);
		let wr = this.language == 'E' ? 'drag pictures to categories' : "ordne die bilder in kategorien";
		show_instruction(wr, dTitle, wr);
		mLinebreak(dTable);
		let dArea = mDiv(dTable, { display: 'flex', 'flex-wrap': 'wrap' });
		let containers, dWordArea;
		containers = this.containers = createContainers(this.cats, dArea, { w: 'auto', wmin: 150, wmax: 300, hmin: 250, fz: 24, fg: 'contrast' });
		mLinebreak(dTable);
		dWordArea = this.dWordArea = mDiv(dTable, { h: 70, display: 'flex', 'flex-wrap': 'wrap', layout: 'fhcc' });
		for (const item of items) { let d = miPic(item, dWordArea); iAdd(item, { div: d }); }
		enableDD(items, containers, this.dropHandler.bind(this), false);
		mLinebreak(dTable, 50);
		mButton('Done!', this.controller.evaluate.bind(this.controller), dTable, { fz: 28, matop: 10, rounding: 10, padding: 16, border: 8 }, ['buttonClass']);
		this.controller.activateUi.bind(this.controller)();
	}
	trialPrompt() {
		sayTryAgain();
		TOMain = setTimeout(() => {
			for (const p of Pictures) {
				if (!p.isCorrect) {
					mAppend(this.dWordArea, iDiv(p));
					if (this.trialNumber == 1) miAddLabel(p, { bg: '#00000080', margin: 4, fz: 20 });
				}
			}
		}, 1000);
		return 1200;
	}
	eval() {
		this.piclist = Pictures;
		Selected = { piclist: this.piclist, feedbackUI: this.piclist.map(x => iDiv(x)), sz: getRect(iDiv(this.piclist[0])).h };
		let isCorrect = true;
		for (const p of Pictures) {
			let label = p.label;
			let d = iDiv(p);
			let cont = d.parentNode;
			for (const c of this.containers) {
				if (iDiv(c) == cont) {
					p.classified = true;
					if (p.cat == c.label) p.isCorrect = true;
					else { p.isCorrect = isCorrect = false; }
					break;
				}
			}
			if (!p.classified) p.isCorrect = isCorrect = false;
		}
		return isCorrect;
	}
}
class GChess extends G2Player {
	clear() { super.clear(); if (isdef(this.game)) { this.game.reset(); } }
	startGame() {
		super.startGame();
		this.createBoard();
		this.game = new Chess();
		this.setStartPosition();
		let c = this.game.turn();
		if (c == 'b') { this.plTurn.color = 'black'; this.plOpp.color = 'white'; } else { this.plTurn.color = 'white'; this.plOpp.color = 'black'; }
		showFleetingMessage(`You play ${this.human.color}`)
	}
	createBoard() {
		let d = mDiv(dTable, { h: 500, w: 500 }, 'dChessBoard');
		let config = {
			pieceTheme: '../alibs/chessBoard/img/chesspieces/wikipedia/{piece}.png',
			draggable: true,
			onDragStart: this.onDragStart.bind(this),
			onDrop: this.onDrop.bind(this),
			onSnapEnd: this.onSnapEnd.bind(this),
		}
		this.board = ChessBoard('dChessBoard', config);
		mLinebreak(dTable);
	}
	setStartPosition() {
		let positions = [
			'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
			// //'8/8/8/8/8/8/8/8 b KQkq - 0 1', //black starts
		];
		if (nundef(this.iPosition)) this.iPosition = 0;
		let state = nundef(this.startPosition) || this.startPosition == 'empty' ? positions[0] : this.startPosition == 'random' ? chooseRandom(positions) : positions[this.iPosition];
		if (!isString(state)) state = arrToFen(state.arr, state.plStart);
		this.game.load(state); //'r1bqkbnr/pppp1ppp/2n5/1B2p3/4P3/5N2/PPPP1PPP/RNBQK2R b KQkq - 0 1');
		this.board.position(this.game.fen());
		let idx = this.iPosition + 1; idx = idx % positions.length; this.iPosition = idx;
	}
	prompt() {
		let msg = this.plTurn == this.ai && !this.manual ? `Ai (${this.ai.color.toUpperCase()}) thinking...`
			: `player: ${this.plTurn.color.toUpperCase()}`;
		showInstruction(this.game.in_check() ? '- CHECK!!!' : '', msg, dTitle, false);
		this.controller.activateUi();
	}
	activate() {
		let pl = this.plTurn;
		let autoplay = false;
		if (autoplay || pl == this.ai) {
			if (this.ai == pl) { uiActivated = false; aiActivated = true; }
			this.TO = setTimeout(() => {
				let color = this.game.turn();
				if (color === 'b') { var move = getBestMove(this.game, color, globalSum)[0]; }
				else { var move = getBestMove(this.game, color, -globalSum)[0]; }
				globalSum = evaluateBoard(move, globalSum, 'b');
				this.game.move(move);
				this.board.position(this.game.fen());
				this.controller.evaluate();
			}, 100);
		} else { aiActivated = false; uiActivated = true; }
	}
	getTurnColor() { return this.getPlayer(this.game.turn() == 'b' ? 'black' : 'white'); }
	getOppColor() { return this.getPlayer(this.game.turn() == 'b' ? 'white' : 'black'); }
	getPlayer(color) { return firstCond(this.players, x => x.color == color); }
	changePlayer() { this.plTurn = this.game.turn() == 'b' ? this.getPlayer('black') : this.getPlayer('white'); }
	onDragStart(source, piece, position, orientation) {
		if (this.game.game_over() || !uiActivated) return false;
		if ((this.game.turn() === 'w' && piece.search(/^b/) !== -1) ||
			(this.game.turn() === 'b' && piece.search(/^w/) !== -1)) {
			return false
		}
	}
	onDrop(source, target) {
		var move = this.game.move({
			from: source,
			to: target,
			promotion: 'q'
		});
		if (move === null) return 'snapback';
		this.controller.evaluate();
	}
	onSnapEnd() { this.board.position(this.game.fen()) }
	eval() {
		this.info = null;
		let over = this.gameOver = this.game.game_over();
		if (this.game.in_draw()) { this.tie = true; console.log('in_draw'); this.info = '(draw)'; }
		if (this.game.in_stalemate()) { this.tie = true; console.log('in_stalemate'); this.info = '(stalemate)'; }
		if (this.game.in_threefold_repetition()) { this.tie = true; console.log('in_threefold_repetition'); this.info = '(threefold repetition)'; }
		if (this.game.in_checkmate()) {
			this.tie = false;
			this.winner = this.getOppColor();
			console.log('in_checkmate');
			this.info = `(${this.winner.color.toUpperCase()})`;
		}
	}
}
class GColoku extends Game {
	startGame() {
		this.correctionFunc = () => {
			if (this.qName == 'isThisSudokuCorrect') {
				mStyle(Goal.buttonCorrect, { bg: 'green' });
				animate(Goal.buttonCorrect, 'komisch', 1000);
				if (!Goal.correct) {
					animateColorScale(Goal.correctionFeedbackUI, Goal.item.color, 1.5, 1500);
					this.dComment.innerHTML = 'rule broken! duplicate in ' + Goal.err.type;
				} else {
					this.dComment.innerHTML = 'this coloku is correct!';
				}
			} else {
				this.dWordArea.remove();
				this.bDone.remove();
				if (Goal.err) {
					this.dComment.innerHTML = 'rule broken! duplicate in ' + Goal.err.type;
					animateColorScale(Goal.correctionFeedbackUI, Goal.item.color, 1.5, 1500);
				} else {
					this.dComment.innerHTML = 'Coloku is incomplete!!!!';
				}
			}
			return 20000;
		};
		this.failFunc = () => {
			if (this.qName == 'isThisSudokuCorrect') {
				if (Goal.choice == Goal.correctChoice) { mStyle(Goal.buttonClicked, { bg: 'green' }); mCheckit(Goal.feedbackUI, 100); }
				else { mXit(Goal.buttonClicked, 100); }
			} else {
				mXit(this.dGrid, 200);
			}
		}
		this.successFunc = () => {
			if (this.qName == 'isThisSudokuCorrect') {
				if (Goal.choice == Goal.correctChoice) { mStyle(Goal.buttonClicked, { bg: 'green' }); mCheckit(Goal.feedbackUI, 100); }
				else { mXit(Goal.buttonClicked, 100); }
			} else {
				mCheckit(this.dGrid, 200);
			}
		}
	}
	prompt() {
		this.trials = 1;
		let [rows, cols] = [this.rows, this.cols];
		this.dGrid = mGrid(rows, cols, dTable, { position: 'relative', w: 400, h: 400, gap: 8, bg: 'white' });
		let o = getSudokuPatternFromDB(rows, cols);
		let [pattern, minPuzzle] = [this.pattern, this.minPuzzle] = [o.pattern, o.puzzle];
		mLinebreak(dTable, 20);
		this.dChoices = mDiv(dTable);
		mLinebreak(dTable);
		this.dComment = mDiv(dTable);
		mLinebreak(dTable);
		let qName = this.qName = this.level == 0 && coin() && PROJECTNAME == 'belinda' ? 'isThisSudokuCorrect' : 'solve';
		this[qName]();
		this.controller.activateUi.bind(this.controller)();
	}
	fillGrid(pattern) {
		let items = this.items = [];
		let [rows, cols, dGrid] = [this.rows, this.cols, this.dGrid];
		let colors = this.colors = rows == 4 ? [RED, YELLOW, BLUE, GREEN]
			: rows == 6 ? [RED, YELLOW, BLUE, GREEN, PURPLE, ORANGE]
				: [BLUEGREEN, PURPLE, ORANGE, RED, YELLOW, BLUE, GREEN, LIGHTBLUE, OLIVE];
		shuffle(colors);
		for (let r = 0; r < rows; r++) {
			let arr = [];
			for (let c = 0; c < cols; c++) {
				let nch = pattern[r][c];
				let color = isNumber(nch) ? colors[pattern[r][c]] : null;
				let d = mDiv(dGrid, { bg: color }, getUID());
				let item = { row: r, col: c, id: d.id, color: color, val: nch };
				iAdd(item, { div: d });
				arr.push(item);
			}
			items.push(arr);
		}
		return items;
	}
	makeLines() {
		let [wline, dGrid, sz] = [2, this.dGrid, this.rows];
		let gSize = getSize(dGrid);
		let rh = sz != 9 ? makeRect((gSize.w - wline) / 2, 0, wline, gSize.h) : makeRect((gSize.w - wline) / 3, 0, wline, gSize.h);
		let rv = sz == 4 ? makeRect(0, (gSize.h - wline) / 2, gSize.w, wline) : makeRect(0, (gSize.h - wline) / 3, gSize.w, wline);
		let vLine = mDiv(dGrid, { bg: this.color, position: 'absolute', left: rh.l, top: rh.t, w: rh.w, h: rh.h });
		if (sz == 9) vLine = mDiv(dGrid, { bg: this.color, position: 'absolute', left: rh.l * 2, top: rh.t, w: rh.w, h: rh.h });
		let hLine = mDiv(dGrid, { bg: this.color, position: 'absolute', left: rv.l, top: rv.t, w: rv.w, h: rv.h });
		if (sz != 4) vLine = mDiv(dGrid, { bg: this.color, position: 'absolute', left: rv.l, top: 2 * rv.t, w: rv.w, h: rv.h });
	}
	setGoal(pattern) {
		let err = checkSudokuRule(pattern);
		let incomplete = false;
		for (const el of arrFlatten(pattern)) {
			if (!isNumber(el)) { incomplete = true; break; }
		}
		let answer = (err == null) && !incomplete;
		Goal = { correct: answer, err: err, incomplete: incomplete };
	}
	isThisSudokuCorrect() {
		this.trials = 1;
		let [pattern, rows, cols, dGrid] = [this.pattern, this.rows, this.cols, this.dGrid];
		destroySudokuRule(pattern, rows, cols);
		this.setGoal(pattern);
		let items = this.fillGrid(pattern);
		this.makeLines();
		let wsp = {
			D: 'ist dieses coloku korrekt?',
			E: 'is this coloku correct?',
			S: 'es este coloku correcto?',
			F: 'est ce que ce coloku est exacte?',
		};
		let sp = wsp[this.language];
		show_instruction(sp, dTitle, sp);
		showFleetingMessage('rule: each color must be unique in every row, column and quadrant!', 15000);
		let correct, incorrect;
		if (Goal.correct) { correct = { num: 1, text: 'yes' }; incorrect = [{ num: 0, text: 'no' }]; }
		else { correct = { num: 0, text: 'no' }; incorrect = [{ num: 1, text: 'yes' }]; }
		let feedbackUI = Goal.correctionFeedbackUI = Goal.correct ? this.dGrid : iDiv(this.items[Goal.err.row][Goal.err.col]);
		createMultipleChoiceElements(correct, incorrect, this.dChoices, feedbackUI, {});
		Goal.item = Goal.correct ? this.items[0] : this.items[Goal.err.row][Goal.err.col];
	}
	solve() {
		let [rrand, crand] = [randomNumber(0, this.rows - 1), randomNumber(0, this.cols - 1)];
		let puzzle = this.puzzle = jsCopy(this.pattern);
		let [min, rows, cols] = [this.minPuzzle, this.rows, this.cols];
		let combis = [];
		for (let r = 0; r < rows; r++) {
			for (let c = 0; c < cols; c++) {
				if (min[r][c] === ' ') combis.push({ row: r, col: c });
			}
		}
		let combisToRemove = choose(combis, this.numMissing);
		for (const o of combisToRemove) {
			puzzle[o.row][o.col] = ' ';
		}
		this.fillGrid(puzzle);
		this.makeLines();
		let sp = 'solve this coloku!'
		show_instruction(sp, dTitle, sp);
		let itemlist = this.itemlist = arrFlatten(this.items);
		let containers = this.containers = itemlist.filter(x => x.val === ' ');
		let dWordArea = this.dWordArea = mDiv(dTable, { h: 70, display: 'flex', 'flex-wrap': 'wrap', layout: 'fhcc' });
		let colorItems = this.colorItems = [];
		for (const color of this.colors) {
			let colorItem = { id: getUID(), color: color };
			let d = mDiv(dWordArea, { w: 40, h: 40, bg: color, margin: 10, cursor: 'pointer' }, colorItem.id);
			iAdd(colorItem, { div: d });
			colorItems.push(colorItem);
		}
		enableDD(colorItems, containers, this.dropHandler.bind(this), true);
		mLinebreak(dTable, 50);
		this.bDone = mButton('Done!', this.controller.evaluate.bind(this.controller), dTable, { fz: 28, matop: 10, rounding: 10, padding: 16, border: 8 }, ['buttonClass']);
	}
	dropHandler(source, target, isCopy = true) {
		let dSource = iDiv(source);
		let dTarget = iDiv(target);
		mStyle(dTarget, { bg: source.color });
		target.color = source.color;
		target.val = this.colors.indexOf(source.color);
	}
	evalIsCorrect() {
		Selected = { feedbackUI: Goal.buttonClicked };
		return Goal.buttonClicked == Goal.buttonCorrect;
	}
	evalSolve() {
		let [items, pattern, rows, cols] = [this.items, this.pattern, this.rows, this.cols];
		let pat = items.map(x => x.map(y => y.val));
		this.setGoal(pat);
		if (Goal.err) {
			Goal.correctionFeedbackUI = iDiv(this.items[Goal.err.row][Goal.err.col]);
			Goal.item = this.items[Goal.err.row][Goal.err.col];
		}
		Selected = { feedbackUI: this.dGrid };
		return Goal.correct;
	}
	eval() {
		clearFleetingMessage();
		return this.qName == 'solve' ? this.evalSolve() : this.evalIsCorrect();
	}
	onTimeup() { this.controller.evaluate(); }
}
class GElim extends Game {
	constructor(name, o) { super(name, o); }
	startGame() {
		this.correctionFunc = () => { writeSound(); playSound('incorrect1'); return this.spokenFeedback ? 1800 : 300; };
		this.successFunc = () => { Goal.pics.map(x => iDiv(x).style.opacity = .3); successPictureGoal(); }
	}
	start_Level() {
		super.start_Level();
		this.keys = this.keys.filter(x => containsColorWord(x));
	}
	prompt() {
		this.piclist = [];
		let colorKeys = this.numColors > 1 ? choose(this.colors, this.numColors) : null;
		let showRepeat = this.numRepeat > 1;
		let rows = this.numColors > 1 ? this.numColors : undefined;
		myShowPics(this.interact.bind(this), { bg: 'white' },
			{
				showRepeat: showRepeat, colorKeys: colorKeys, numRepeat: this.numRepeat,
				contrast: this.contrast, rows: rows
			});
		let [sSpoken, sWritten, piclist] = logicMulti(Pictures);
		this.piclist = piclist;
		Goal = { pics: this.piclist, sammler: [] };
		show_instruction(sWritten, dTitle, sSpoken, { fz: 22, voice: 'zira' });
		this.controller.activateUi.bind(this.controller)();
	}
	trialPrompt() {
		sayTryAgain();
		let msg = this.language == 'D' ? 'noch einmal!' : 'try again!'
		showFleetingMessage(msg, 0, { margin: -8, fz: 22 }, true);
		return 1000;
	}
	activate() {
		for (const p of this.piclist) { if (p.isSelected) toggleSelectionOfPicture(p); }
		this.piclist = [];
	}
	interact(ev) {
		ev.cancelBubble = true;
		if (!canAct()) return;
		let pic = findItemFromEvent(Pictures, ev);
		writeSound(); playSound('hit');
		if (Goal.pics.includes(pic)) {
			removePicture(pic);
			Goal.sammler.push(pic);
		}
		if (Goal.pics.length == Goal.sammler.length) this.controller.evaluate.bind(this.controller)(true);
		else if (!Goal.pics.includes(pic)) { this.lastPic = pic; this.controller.evaluate.bind(this.controller)(false); }
	}
	eval(isCorrect) {
		Selected = { piclist: this.piclist, feedbackUI: isCorrect ? Goal.pics.map(x => iDiv(x)) : iDiv(this.lastPic) };
		return isCorrect;
	}
}
class GGuess extends IClass {
	setup() {
	}
	updatePlayer(pl) {
	}
	updateOptions(pl) {
		this.options = Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ');
		console.log(this.options);
	}
}
class GHouse extends Game {
	constructor(name, o) { super(name, o); }
	startGame() {
		this.correctionFunc = () => {
			mStyle(Goal.buttonCorrect, { bg: 'green' });
			animate(Goal.buttonCorrect, 'komisch', 1000);
			mStyle(this.dGraph, { opacity: 1 });
			return 20000;
		};
		this.failFunc = () => {
			if (Goal.choice == Goal.correctChoice) { mStyle(Goal.buttonClicked, { bg: 'green' }); mCheckit(Goal.feedbackUI, 100); }
			else { mXit(Goal.buttonClicked, 100); }
			mStyle(this.dGraph, { opacity: 1 });
		}
		this.successFunc = () => {
			if (Goal.choice == Goal.correctChoice) { mStyle(Goal.buttonClicked, { bg: 'green' }); mCheckit(Goal.feedbackUI, 100); }
			else { mXit(Goal.buttonClicked, 100); }
			mStyle(this.dGraph, { opacity: 1 });
		}
	}
	prompt() {
		if (isdef(this.graph)) this.graph.clear();
		this.trials = 1;
		let n = randomNumber(this.minRooms, this.maxRooms);
		//#region selectQuestion
		let qFuncs = [this.areRoomsConnected.bind(this)];
		if (n > 5) qFuncs.push(this.isThereAPath.bind(this));
		let q = this.q = this.level > 1 ? arrLast(qFuncs) : chooseRandom(qFuncs);
		//#endregion
		//#region make house
		let s = n;
		let wTotal = n < 4 || n > 12 ? 700 : n > 10 ? 600 : 500;
		let dGridOuter = mDiv(dTable, { wmin: wTotal, hmin: 400 });
		let house = this.house = iHouse(dGridOuter, s, { w: wTotal, h: 400 });
		let rooms = this.rooms = house.rooms.map(x => Items[x]);
		this.addLabelsToRooms();
		//#endregion
		//#region add doors
		let dirs = coin() ? ['n', 'w'] : ['s', 'e'];
		let doors = this.doors = [];
		for (const r of rooms) {
			let dir = coin() ? dirs[0] : dirs[1];
			let door = iDoor(r.id, dir);
			doors.push(door);
		}
		if (q.name.includes('Path')) hideOuterDoors(house);
		//#endregion
		//#region prep container for multiple choices
		mLinebreak(dTable, 20);
		this.dChoices = mDiv(dTable);
		mLinebreak(dTable);
		//#endregion
		//#region make graph container
		let r = getRect(dGridOuter);
		mStyle(dGridOuter, { position: 'relative' });
		let dGraph = this.dGraph = mDiv(dGridOuter, { box: true, align: 'left', position: 'absolute', bg: '#ffffff80', top: 0, left: 0, w: r.w, h: r.h });
		//#endregion
		let innerStyles = { box: true, align: 'left', position: 'absolute', bg: '#ffffff80', top: 0, left: 0, w: r.w, h: r.h };
		let g1 = this.graph = new UIGraph(dGraph, { edge: { bg: 'blue' }, outer: { align: 'left', w: wTotal, h: 400 }, inner: innerStyles });
		convertToGraphElements(g1, house);
		g1.presetLayout();
		g1.reset();
		mStyle(dGraph, { opacity: 0 });
		q();
		this.controller.activateUi.bind(this.controller)();
	}
	//#region qFuncs
	isThereAPath() {
		let house = this.house;
		let corners = getCornerRoomsDict(house);
		let clist = Object.values(corners);
		let g = this.graph;
		let id = g.getNodeWithMaxDegree(clist);
		let cornerRoomIds = g.sortNodesByDegree(clist).map(x => x.id());
		let [r1, r2] = [Items[cornerRoomIds[0]], Items[cornerRoomIds[1]]];
		if (r1 == r2 || areNeighbors(r1, r2) && cornerRoomIds.length > 2) r2 = Items[cornerRoomIds[2]];
		if (!r1.isW && (r2.isW || !r1.N)) [r1, r2] = [r2, r1];
		let roomFrom = r1.id;
		let funcs = this.dijkstra = g.getShortestPathsFrom(roomFrom);
		let roomTo = r2.id;
		for (const k in corners) {
			if (k != 'NW') {
				let dist = funcs.distanceTo('#' + corners[k]);
				if (dist != Infinity && dist >= 3) {
					roomTo = corners[k];
					break;
				}
			}
		}
		if (!roomTo) { roomTo = corners.SE; }
		//#region spoken and written instruction
		this.roomFrom = roomFrom;
		this.roomTo = roomTo;
		let sp1 = {
			D: ['gibt es einen weeg von', 'gibt es einen weg von'],
			E: ['is there a path from', 'is there a path from'],
			S: ['hay un camino de', 'hay un camino de'],
			F: ["y a 'til un chemin de", "y a 'til un chemin de"],
		};
		let sp2 = {
			D: ['zu', 'zu'],
			E: ['to', 'to'],
			S: ['a', 'a'],
			F: ['!. a! ', 'à'],
		};
		let fill1 = [`. "${Items[roomFrom].id.toUpperCase()}"! `, ` ${Items[roomFrom].id} `];
		let fill2 = [`. "${Items[roomTo].id.toUpperCase()}"`, ` ${Items[roomTo].id}`];
		let l = 'E';
		let sp = sp1[l][0] + fill1[0] + sp2[l][0] + fill2[0] + '?';
		let wr = sp1[l][1] + fill1[1] + sp2[l][1] + fill2[1] + '?';
		let voice = this.language == 'E' ? coin() ? 'ukMale' : 'zira' : this.language;
		//#endregion
		show_instruction(wr, dTitle, sp, { voice: voice });
		let answer = funcs.distanceTo('#' + roomTo) != Infinity;
		let correct, incorrect;
		if (answer) { correct = { num: 1, text: 'yes' }; incorrect = [{ num: 0, text: 'no' }]; }
		else { correct = { num: 0, text: 'no' }; incorrect = [{ num: 1, text: 'yes' }]; }
		createMultipleChoiceElements(correct, incorrect, this.dChoices, iDiv(this.house), {});
	}
	howMany() {
		let wr = this.language == 'E' ? 'how many units are there in this house?' : "wieviele wohneinheiten hat dieses haus?";
		show_instruction(wr, dTitle, wr);
		let numUnits = this.graph.getNumComponents();
		let otherChoices = [
			numUnits * 2,
			Math.round(numUnits / 2),
			numUnits + randomNumber(1, 10)
		];
		let di = {};
		for (let i = 0; i < otherChoices.length; i++) {
			let n = otherChoices[i];
			while (n == numUnits || isdef(di[n])) { n += 1; }
			di[n] = true;
			otherChoices[i] = n;
		}
		createMultipleChoiceElements({ num: numUnits, text: numUnits },
			otherChoices.map(x => ({ num: x, text: x })), this.dChoices, iDiv(this.house), {});
	}
	areRoomsConnected() {
		let wr = this.language == 'E' ? 'are all rooms connected?' : "sind alle zimmer verbunden?";
		showInstruction(wr, dTitle, wr);
		let numUnits = this.graph.getNumComponents();
		let correct, incorrect;
		if (numUnits == 1) { correct = { num: 1, text: 'yes' }; incorrect = [{ num: 0, text: 'no' }]; }
		else { correct = { num: 0, text: 'no' }; incorrect = [{ num: 1, text: 'yes' }]; }
		createMultipleChoiceElements(correct, incorrect, this.dChoices, iDiv(this.house), {});
	}
	//#region helpers
	showPath() {
		mStyle(this.dGraph, { opacity: 1 });
	}
	//#region add stuff to house
	addLabelsToRooms() {
		let roomlist = ['bedroom', 'livingroom', 'bathroom', 'kitchen'];
		sortByFunc(this.rooms, x => x.rect.w * x.rect.h);
		this.rooms.map(x => addLabel(x, x.ch, {}));
	}
	addOneDoorPerRoom(directions) {
		for (const r of this.rooms) {
			let door = makeRandomDoor(r, this.house, directions); this.doors.push(door);
		}
	}
	addWallFinderByMouseClick() {
		dTable.onclick = ev => {
			console.log(ev.clientX, ev.clientY);
			let w = findWall(ev.clientX, ev.clientY, this.walls);
			console.log('found wall', w)
		}
	}
	addFurnitureItems() {
		let keys = ['bed', 'bathtub', 'chair', 'couch and lamp', 'toilet', 'door', 'table'];
		let items = Pictures = genItemsFromKeys(keys);
		console.assert(arrLast(items).key == 'table', 'NOOOOOOO');
		let itable = arrLast(items);
		shuffle(items);
		let dWordArea = this.dWordArea = mDiv(dTable, { h: 70, display: 'flex', 'flex-wrap': 'wrap', layout: 'fhcc' });
		for (const item of items) { let d = miPic(item, dWordArea); iAdd(item, { div: d }); }
		mStyle(iDiv(itable), { fg: BROWN });
		enableDD(items, rooms, this.dropHandler.bind(this), false);
	}
	//#endregion
	eval() {
		clearFleetingMessage();
		Selected = { reqAnswer: G.correctAnswer, answer: Goal.choice.text, feedbackUI: Goal.buttonClicked };
		return (Goal.buttonClicked == Goal.buttonCorrect);
	}
}
class GKrieg extends G2Player {
	write() { write('game', ...arguments); }
	startGame() {
		this.write('start game')
		super.startGame();
		let back = this.back = new GKriegBack();
		this.setStartPosition();
		this.front = new GKriegFront(130, dTable);
		this.front.presentState(this.back.get_state());
		mLinebreak(dTable, 50);
		this.moveButton = mButton('Move!', this.interact.bind(this), dTable, { fz: 28, matop: 10, rounding: 10, padding: 16, border: 8 }, ['buttonClass']);
	}
	setStartPosition() {
		this.back.load(null);
	}
	prompt() {
		this.write('prompt')
		let msg = this.plTurn == this.ai ? 'Ai thinking...' : 'Deterministic: click Move!';
		showInstruction('', msg, dTitle, false);
		this.controller.activateUi();
	}
	activate() {
		let pl = this.plTurn;
		let autoplay = false;
		let manual = true;
		if (!manual && (autoplay || pl == this.ai)) {
			if (this.ai == pl) uiActivated = false;
			setTimeout(this.interact.bind(this), 500);
		} else {
			this.moveButton.style.opacity = 1;
		}
	}
	interact() {
		if (!canAct()) { console.log('NOPE!!!!', 'ai', aiActivated, 'ui', uiActivated); return; }
		this.controller.deactivateUi();
		this.write('interact');
		let back = this.back;
		back.make_random_move();
		this.front.animatePlayerMove(back.turn(), this.onPlayerMoveCompleted.bind(this));
	}
	onPlayerMoveCompleted() {
		let back = this.back;
		this.front.presentState(this.back.get_state());
		let x = this.back.resolve();
		if (isdef(x)) {
			this.moveButton.style.opacity = .3;
			this.TO = setTimeout(() => { this.front.animateResolve(x, () => { GC.evaluate(x) }) },
				1000
			);
		} else this.controller.evaluate(x);
	}
	changePlayer() {
		this.write('change player')
		this.back.swap_turn();
		this.plTurn = this.players[this.back.player().index];
		this.opp = this.players[this.back.opponent().index];
	}
	eval(x) {
		let back = this.back;
		this.write('eval', x)
		if (isdef(x)) this.front.presentState(this.back.get_state());
		if (back.is_out_of_cards()) {
			this.moveButton.remove();
			this.gameOver = true;
			let w = back.winner();
			if (isdef(w)) this.winner = this.players[w.index];
			this.bannerPos = -480;
		}
	}
}
class GKriegBack {
	load(state) {
		this.history = [];
		let deck = this.deck = new Deck('52');
		let n = 4;
		this.pl1 = { hand: deck.deal(n), trick: [], index: 0 }; if (isdef(state) && isdef(state.pl1)) addKeys(state.pl1, this.pl1);
		this.pl2 = { hand: deck.deal(n), trick: [], index: 1 }; if (isdef(state) && isdef(state.pl2)) addKeys(state.pl2, this.pl2);
		this.players = [this.pl1, this.pl2];
		this.iturn = 0;
		if (nundef(state)) return;
		/* example of a state:
		{
			pl1: { hand: ['TH', 'QH'], trick: [['QH']] },
			pl2: { hand: ['TC', 'QC'], trick: [['KC']] },
		},
		*/
		if (isdef(state.pl1.hand)) this.pl1.hand = parseHand(state.pl1.hand, deck);
		if (isdef(state.pl2.hand)) this.pl2.hand = parseHand(state.pl2.hand, deck);
		if (isdef(state.pl1.trick)) state.pl1.trick.map(x => this.pl1.trick.push(parseHand(x, deck)));
		if (isdef(state.pl2.trick)) state.pl2.trick.map(x => this.pl2.trick.push(parseHand(x, deck)));
		if (isdef(state.deck)) this.deck.setData(parseHand(state.deck));
		if (!isEmpty(this.pl1.trick)) {
			let len1 = this.pl1.trick.length;
			let len2 = this.pl2.trick.length;
			if (len1 > len2) this.iturn = 1;
			else {
				this.resolve();
				this.iturn = 0;
			}
		}
	}
	get_state() { return { pl1: this.pl1, pl2: this.pl2, deck: this.deck } };
	turn() { return this.iturn; }
	top(pl) {
		return Card52.getRankValue(arrFirstOfLast(pl.trick));
	}
	get_moves() {
		let pl = this.player();
		let x = pl.trick.length > 0 ? arrTakeFromEnd(pl.hand, 3) : [arrLast(pl.hand)];
		x.reverse();
		return [x];
	}
	make_random_move() {
		let moves = this.get_moves();
		let move = chooseRandom(moves);
		this.make_move(move);
	}
	make_move(move) {
		let pl = this.player();
		pl.trick.push(move);
		move.map(x => removeInPlace(pl.hand, x));
		this.lastMove = move;
	}
	resolve() {
		let result = this._resolve();
		this.push_history(this.iturn, this.lastMove, result);
		return result ? result.iWinner : null;
	}
	swap_turn() { this.iturn = this.iturn == 0 ? 1 : 0; }
	make_random_moveX() {
		let moves = this.get_moves();
		let move = chooseRandom(moves);
		this.make_moveX(move);
	}
	make_moveX(move) {
		this.make_move(move);
		let result = this._resolve();
		this.push_history(this.iturn, move, result);
		this.swap_turn();
	}
	_resolve() {
		let pl = this.player(), opp = this.opponent();
		console.log('...resolve', pl.trick, opp.trick)
		if (opp.trick.length != pl.trick.length) return null;
		let t1 = this.top(pl); let t2 = this.top(opp);
		console.log('resolve: compare t1', t1, 't2', t2);
		if (isdef(t1) && isdef(t2)) {
			if (t1 > t2) { return this.add_trick_from_to(opp, pl); }
			else if (t2 > t1) { return this.add_trick_from_to(pl, opp); }
			else if (isEmpty(pl.hand)) { return this.add_trick_from_to(pl, opp); }
			else if (isEmpty(opp.hand)) { return this.add_trick_from_to(opp, pl); }
			else return null;
		}
		return null;
	}
	add_trick_from_to(plFrom, plTo) {
		let t1 = plFrom.trick;
		let t2 = plTo.trick;
		let iLoser = plFrom.index;
		let iWinner = plTo.index;
		let cards1 = arrFlatten(plFrom.trick);
		let cards2 = arrFlatten(plTo.trick);
		let cards = cards1.concat(cards2);
		plTo.hand = cards.concat(plTo.hand);
		plFrom.trick = [];
		plTo.trick = [];
		return { iWinner: iWinner, winnerTrick: t2, iLoser: iLoser, loserTrick: t1, cards: cards };
	}
	undo() {
		let hist = this.pop_history();
		if (hist == null) { return null; }
		let move = hist.move;
		this.iturn = hist.iturn;
		let pl = this.player();
		pl.hand.push(move);
		move.map(x => removeInPlace(pl.trick, x));
		if (isdef(hist.result)) {
			let plWin = this.players[hist.iWinner];
			let plLose = this.players[hist.iLoser];
			plWin.trick = hist.winnerTrick;
			plLose.trick = hist.loserTrick;
			plWin.hand = arrTake(plWin.hand, plWin.hand.length - hist.cards.length);
		}
	}
	print_state(comment = '') {
		if (nundef(this.history)) this.history = [];
		let state = jsCopy(this.get_state());
		console.log('____' + comment + ' #' + this.history.length, 'turn=' + this.iturn);
		console.log('pl1: hand:' + arrString(this.pl1.hand, iToValue), 'trick', arrString(this.pl1.trick, iToValue), 'top', this.top(this.pl1));
		console.log('pl2: hand:' + arrString(this.pl2.hand, iToValue), 'trick', arrString(this.pl2.trick, iToValue), 'top', this.top(this.pl2));
	}
	player() { return this.players[this.iturn]; }
	opponent() { return this.players[(this.iturn + 1) % this.players.length]; }
	push_history(iturn, move, result) { if (nundef(this.history)) this.history = []; this.history.push({ iturn: iturn, move: move, result: result }); return this.history; }
	pop_history() { if (nundef(this.history)) this.history = []; return this.history.pop(); }
	is_war() { let pl = this.player(), opp = this.opponent(); return pl.trick.length > 0 && pl.trick.length == opp.trick.length && this.top(pl) == this.top(opp); }
	in_war() { let pl = this.player(), opp = this.opponent(); return pl.trick.length != opp.trick.length && pl.trick.length > 1; }
	in_trick() { let pl = this.player(), opp = this.opponent(); return pl.trick.length == 0 && opp.trick.length == 1; }
	is_out_of_cards() { return this._is_out_of_cards(this.player()) || this._is_out_of_cards(this.opponent()); }
	player_is_out_of_cards() { return this._is_out_of_cards(this.player()); }
	_is_out_of_cards(pl) { return (isEmpty(pl.trick) && isEmpty(pl.hand)); }
	winner() { return firstCond(this.players, x => !isEmpty(x.hand) || !isEmpty(x.trick)); }
}
class GKriegFront {
	constructor(hPlayer, dParent) { this.hPlayer = hPlayer; this.dParent = dParent; this.setup(); }
	write() { write('front', ...arguments); }
	setup() { this.areas = makeAreasKrieg(this.dParent); }
	clear() { this.areas.map(x => clearElement(diContent(x))); }
	clearZones() { for (const k of ['t0', 't1', 'h0', 'h1']) this.clearZones(k); }
	clearZone(k) { clearElement(this.getZoneDiv(k)); }
	getZoneDiv(k) { return this.hands[k].zone; }
	getTrickZoneDiv(iPlayer) { return this.getZoneDiv('t' + iPlayer); }
	getHandZoneDiv(iPlayer) { return this.getZoneDiv('h' + iPlayer); }
	getPlayerCards(iPlayer) { return this.hands['h' + iPlayer].iHand.items; }
	getTrickCards() {
		let res = [];
		let t0 = this.hands.t0;
		if (isdef(t0.iHand.items)) {
			res = res.concat(t0.iHand.items);
		}
		let t1 = this.hands.t1;
		if (isdef(t1.iHand.items)) {
			res = res.concat(t1.iHand.items);
		}
		return res;
	}
	animatePlayerMove(iPlayer, callback) {
		let cards = this.getPlayerCards(iPlayer);
		let c = arrLast(cards);
		let dSource = this.hands['h' + iPlayer].zone;
		let key = 't' + iPlayer;
		let trick = this.hands[key];
		let pos1 = lookup(this, ['pos1', key]);
		let dTarget, offset;
		if (isdef(pos1)) {
			dTarget = trick.zone;
			offset = { x: pos1.x - 10, y: pos1.y - 10 };
		} else {
			dTarget = trick.zone;
			let empty = nundef(trick.iHand.items);
			offset = { x: empty ? 0 : 0, y: 0 };
		}
		aMove(iDiv(c), dSource, dTarget, callback, offset, 500, 'EASE', 1);
	}
	animateResolve(iWinner, callback) {
		let cards = this.getTrickCards();
		let dSource = this.hands.t0.zone;
		let dTarget = this.hands['h' + iWinner].zone;
		let offset = { x: 0, y: 0 };
		let trickCards = this.getTrickCards();
		let iLast = trickCards.length, i = 0;
		for (const c of trickCards) {
			dSource = iDiv(c);
			i++; let f;
			if (i == iLast) {
				f = callback;
			} else {
				f = null;
			}
			iMoveFromToPure(c, dSource, dTarget, f, offset);
		}
	}
	presentState(state) {
		this.write('present', jsCopy(state))
		this.clear();
		let trick1 = arrFlatten(state.pl1.trick)
		let trick2 = arrFlatten(state.pl2.trick);
		let pl1Hand = state.pl1.hand;
		let pl2Hand = state.pl2.hand;
		let arrs = [[trick1, trick2], [pl1Hand], [pl2Hand]];
		let hands = [];
		for (let i = 0; i < 3; i++) {
			let area = this.areas[i];
			let d = diContent(area);
			iMessage(area, '');
			for (let j = 0; j < arrs[i].length; j++) {
				let arr = arrs[i][j];
				let id = 'a' + i + '_h' + j;
				let what = iH01(arr, d, {}, id, i == 0 ? 20 : 0);
				hands.push(what);
			}
		}
		for (let i = 0; i < 2; i++) {
			let cards = hands[i].iHand.items;
			if (isEmpty(hands[i].arr)) continue;
			for (let j = 0; j < cards.length - 1; j++) {
				Card52.turnFaceDown(cards[j]);
			}
		}
		this.hands = {};
		let handNames = ['t0', 't1', 'h0', 'h1'];
		if (nundef(this.pos1)) { this.pos1 = {}; }
		for (let i = 0; i < 4; i++) {
			let hi = hands[i];
			this.hands[handNames[i]] = hi;
			hi.key = handNames[i];
			if (!isEmpty(hi.arr)) {
				let hih = hi.iHand;
				this.pos1[handNames[i]] = getRect(iDiv(hih), hi.zone);
			}
		}
	}
}
class GMaze extends Game {
	constructor(name, o) { super(name, o); }
	clear() { super.clear(); if (isdef(this.cy)) { this.cy.destroy(); } }
	startGame() {
		this.correctionFunc = () => {
			mStyle(Goal.buttonCorrect, { bg: 'green' });
			animate(Goal.buttonCorrect, 'komisch', 1000);
			if (Goal.correctChoice.text == 'yes') this.maze.breadCrumbs(this.path); else this.maze.colorComponents();
			return 20000;
		};
		this.failFunc = () => {
			if (Goal.choice == Goal.correctChoice) { mStyle(Goal.buttonClicked, { bg: 'green' }); mCheckit(Goal.feedbackUI, 100); }
			else { mXit(Goal.buttonClicked, 100); }
		}
		this.successFunc = () => {
			if (Goal.choice == Goal.correctChoice) { mStyle(Goal.buttonClicked, { bg: 'green' }); mCheckit(Goal.feedbackUI, 100); }
			else { mXit(Goal.buttonClicked, 100); }
		}
	}
	startRound() { if (isdef(this.cy)) this.cy.destroy(); clearElement(dTable); }
	prompt() {
		this.trials = 1;
		let maze = this.maze = new MazeGraph(dTable, this.rows, this.cols, this.sz, this.gap);
		this.cy = maze.cy;
		mLinebreak(dTable, 20);
		this.dChoices = mDiv(dTable);
		mLinebreak(dTable);
		this.isThereAPath(maze);
		this.controller.activateUi.bind(this.controller)();
	}
	isThereAPath(maze) {
		let cellStart = maze.getTopLeftCell();
		mCellContent(iDiv(cellStart), { w: '50%', h: '50%', fz: '60%', bg: 'green', fg: 'white', rounding: '50%' }, 'A');
		let cellGoal = maze.getBottomRightCell();
		mCellContent(iDiv(cellGoal), { w: '50%', h: '50%', fz: '60%', bg: 'red', fg: 'white', rounding: '50%' }, 'B');
		[this.roomFrom, this.roomTo] = [cellStart.nodeId, cellGoal.nodeId];
		//#region spoken and written instruction
		let sp1 = {
			D: ['gibt es einen weeg von', 'gibt es einen weg von'],
			E: ['is there a path from', 'is there a path from'],
			S: ['hay un camino de', 'hay un camino de'],
			F: ["y a 'til un chemin de", "y a 'til un chemin de"],
		};
		let sp2 = {
			D: ['zu', 'zu'],
			E: ['to', 'to'],
			S: ['a', 'a'],
			F: ['!. a! ', 'à'],
		};
		let fill1 = [`. "A"! `, ` A `];
		let fill2 = [`. "B"`, ` B`];
		let l = this.language;
		let sp = sp1[l][0] + fill1[0] + sp2[l][0] + fill2[0] + '?';
		let wr = sp1[l][1] + fill1[1] + sp2[l][1] + fill2[1] + '?';
		let voice = this.language == 'E' ? coin() ? 'ukMale' : 'zira' : this.language;
		show_instruction(wr, dTitle, sp, { voice: voice });
		//#endregion
		let path = this.path = maze.getShortestPathFromTo(this.roomFrom, this.roomTo);
		console.assert(path.length < Infinity, 'WAAAAAAAAAAAAAAS?');
		if (coin(this.level > 2 ? 50 : 40)) maze.cutPath(this.path, .5, .75);
		let len = maze.getLengthOfShortestPath(this.roomFrom, this.roomTo);
		let answer = len != Infinity;
		let correct, incorrect;
		if (answer) { correct = { num: 1, text: 'yes' }; incorrect = [{ num: 0, text: 'no' }]; }
		else { correct = { num: 0, text: 'no' }; incorrect = [{ num: 1, text: 'yes' }]; }
		createMultipleChoiceElements(correct, incorrect, this.dChoices, maze.dMaze, {});
	}
	eval() {
		clearFleetingMessage();
		Selected = { reqAnswer: G.correctAnswer, answer: Goal.choice.text, feedbackUI: Goal.buttonClicked };
		return (Goal.buttonClicked == Goal.buttonCorrect);
	}
}
class GMem extends Game {
	constructor(name, o) { super(name, o); }
	clear() { clearTimeout(this.TO); showMouse(); }
	prompt() {
		this.trials = 1;
		myShowPics(this.interact.bind(this),
			{ border: '3px solid #ffffff80' },
			{});
		setGoal();
		let wr = (this.language == 'E' ? 'remember ' : 'merke dir ') + (this.level > 2 ? (this.language == 'E' ? 'all' : 'alle') : Goal.label);
		show_instruction(wr, dTitle, wr);
		let secs = calcMemorizingTime(this.numPics, this.level > 2);
		hideMouse();
		TOMain = setTimeout(() => turnCardsAfter(secs), 300, this.level >= 5);
	}
	interact(ev) {
		ev.cancelBubble = true;
		if (!canAct()) return;
		let pic = findItemFromEvent(Pictures, ev);
		turnFaceUpSimple(pic);
		if (this.trialNumber == this.trials - 1) turnFaceUpSimple(Goal);
		TOMain = setTimeout(() => this.controller.evaluate.bind(this.controller)(ev), 300);
	}
}
class GMinimalGame {
	constructor(name, o) {
		this.name = name;
		copyKeys(o, this);
		this.id = name;
		this.color = getColorDictColor(this.color);
	}
	clear() { clearTimeout(this.TO); clearFleetingMessage(); }
	startGame() { clearElement(dTable); }
	clear() { }
	prompt() { }
	activate() { }
}
class GMissingLetter extends Game {
	constructor(name, o) { super(name, o); }
	start_Level() {
		super.start_Level();
		this.maxPosMissing = this.posMissing == 'start' ? this.numMissing - 1 : 100;
	}
	prompt() {
		myShowPics(() => fleetingMessage('just enter the missing letter!'));
		setGoal();
		if (this.instruction == 'all') {
			let wr = (this.language == 'E' ? 'complete ' : "ergänze ") + `<b>${Goal.label.toUpperCase()}</b>`;
			let sp = (this.language == 'E' ? 'complete ' : "ergänze ") + `${Goal.label}`;
			show_instruction(wr, dTitle, sp);
		} else if (this.instruction == 'spokenGoal') {
			let wr = this.language == 'E' ? 'complete the word' : "ergänze das wort";
			let sp = (this.language == 'E' ? 'complete' : "ergänze") + ' ' + Goal.label;
			show_instruction(wr, dTitle, sp);
		} else {
			let wr = this.language == 'E' ? 'complete the word' : "ergänze das wort";
			show_instruction(wr, dTitle, wr);
		}
		mLinebreak(dTable, 20);
		let style = { margin: 6, fg: 'white', display: 'inline', bg: 'transparent', align: 'center', border: 'transparent', outline: 'none', family: 'Consolas', fz: 80 };
		let d = createLetterInputs(Goal.label.toUpperCase(), dTable, style);
		let indices = getIndicesCondi(Goal.label, (x, i) => isAlphaNum(x) && i <= this.maxPosMissing);
		this.nMissing = Math.min(indices.length, this.numMissing);
		let ilist = choose(indices, this.nMissing); sortNumbers(ilist);
		this.inputs = [];
		for (const idx of ilist) {
			let inp = d.children[idx];
			inp.innerHTML = '_';
			mClass(inp, 'blink');
			this.inputs.push({ letter: Goal.label[idx].toUpperCase(), div: inp, index: idx });
		}
		mLinebreak(dTable);
		let msg = this.composeFleetingMessage();
		let ms = this.instruction == 'all' ? 3000 : this.instruction == 'spokenGoal' ? 9000 : 15000;
		showFleetingMessage(msg, ms);
		this.controller.activateUi.bind(this.controller)();
	}
	trialPrompt() {
		let selinp = Selected.inp;
		sayTryAgain();
		TOMain = setTimeout(() => {
			let d = selinp.div;
			d.innerHTML = '_';
			mClass(d, 'blink');
		}, 1200);
		showFleetingMessage(this.composeFleetingMessage(), 3000);
		return 1500;
	}
	activate() {
		addKeyup('G', ev => {
			if (!isLetter(ev.key)) return;
			clearFleetingMessage();
			if (!canAct()) return;
			let charEntered = ev.key.toString();
			if (!isAlphaNum(charEntered)) return;
			Selected = { lastLetterEntered: charEntered.toUpperCase() };
			if (this.nMissing == 1) {
				let d = Selected.feedbackUI = this.inputs[0].div;
				Selected.positiveFeedbackUI = iDiv(Goal);
				Selected.lastIndexEntered = this.inputs[0].index;
				Selected.inp = this.inputs[0];
				d.innerHTML = Selected.lastLetterEntered;
				mRemoveClass(d, 'blink');
				let result = buildWordFromLetters(mParent(d));
				this.controller.evaluate.bind(this.controller)(result);
			} else {
				let ch = charEntered.toUpperCase();
				for (const inp of this.inputs) {
					if (inp.letter == ch) {
						Selected.lastIndexEntered = inp.index;
						Selected.inp = inp;
						let d = Selected.feedbackUI = inp.div;
						d.innerHTML = ch;
						mRemoveClass(d, 'blink');
						removeInPlace(this.inputs, inp);
						this.nMissing -= 1;
						break;
					}
				}
				if (nundef(Selected.lastIndexEntered)) {
					showFleetingMessage('you entered ' + Selected.lastLetterEntered);
					sayRandomVoice('try a different letter!', 'anderer Buchstabe!')
				}
				showFleetingMessage(this.composeFleetingMessage(), 3000);
			}
		})
	}
	eval(word) {
		let answer = normalize(word, this.language);
		let reqAnswer = normalize(Goal.label, this.language);
		Selected.reqAnswer = reqAnswer;
		Selected.answer = answer;
		if (answer == reqAnswer) return true;
		else if (this.language == 'D' && fromUmlaut(answer) == fromUmlaut(reqAnswer)) {
			return true;
		} else {
			return false;
		}
	}
	composeFleetingMessage() {
		let lst = this.inputs;
		let msg = lst.map(x => x.letter).join(',');
		let edecl = lst.length > 1 ? 's ' : ' ';
		let ddecl = lst.length > 1 ? 'die' : 'den';
		let s = (this.language == 'E' ? 'Type the letter' + edecl : 'Tippe ' + ddecl + ' Buchstaben ');
		return s + msg;
	}
}
class GMissingNumber extends Game {
	constructor(name, o) { super(name, o); }
	startGame() {
		this.successFunc = successThumbsUp;
		this.failFunc = failThumbsDown;
		this.correctionFunc = this.showCorrectSequence.bind(this);
	}
	showCorrectSequence() { return numberSequenceCorrectionAnimation(getNumSeqHint); }
	start_Level() {
		if (!isList(this.steps)) this.steps = [this.steps];
		this.numPics = 2;
		this.labels = false;
	}
	prompt() {
		mLinebreak(dTable, 12);
		showHiddenThumbsUpDown(110);
		mLinebreak(dTable);
		this.step = chooseRandom(this.steps);
		this.op = chooseRandom(this.ops);
		this.oop = OPS[this.op];
		this.seq = createNumberSequence(this.seqLen, this.minNum, this.maxNum, this.step, this.op);
		[this.words, this.letters] = showNumberSequence(this.seq, dTable);
		setNumberSequenceGoal();
		mLinebreak(dTable);
		let instr1 = (this.language == 'E' ? 'complete the sequence' : "ergänze die reihe");
		show_instruction(instr1, dTitle, instr1);
		if (this.showHint) {
			hintEngineStart(getNumSeqHintString, [0, 1, 2, 3, 4], 5000 + this.level * 1000);
		}
		this.controller.activateUi.bind(this.controller)();
	}
	trialPrompt() {
		let hintlist = this.trialNumber >= 4 ? [this.trialNumber] : range(this.trialNumber, 4);
		if (this.showHint) hintEngineStart(getNumSeqHintString, hintlist, 3000 + this.level * 1000);
		TOMain = setTimeout(() => getWrongChars().map(x => unfillChar(x)), 500);
		return 600;
	}
	activate() { addKeyup('G', this.interact.bind(this)); }
	interact(ev) {
		if (!isNumber(ev.key) && ev.key != '-') return;
		clearFleetingMessage();
		if (!canAct()) return;
		let sel = Selected = onKeyWordInput(ev);
		if (nundef(sel)) return;
		let lastInputCharFilled = sel.target;
		console.assert(sel.isMatch == (lastInputCharFilled.letter == sel.ch), lastInputCharFilled, sel.ch);
		if (sel.isMatch && sel.isVeryLast) {
			deactivateFocusGroup();
			this.controller.evaluate.bind(this.controller)(true);
		} else if (sel.isMatch && sel.isLastOfGroup) {
			sel.target.isBlank = false;
			sel.target.group.hasBlanks = false;
			removeInPlace(Goal.blankWords, sel.target.group);
			removeInPlace(Goal.blankChars, sel.target);
			deactivateFocusGroup();
			console.log('haaaaaaaaaaaalo', Goal.isFocus)
		} else if (sel.isMatch) {
			removeInPlace(Goal.blankChars, sel.target);
			sel.target.isBlank = false;
		} else if (sel.isVeryLast) {
			Selected.words = getInputWords();
			Selected.answer = getInputWordString();
			Selected.req = getCorrectWordString();
			deactivateFocusGroup();
			this.controller.evaluate.bind(this.controller)(false);
		} else if (sel.isLastOfGroup) {
			Selected.words = getInputWords();
			Selected.answer = getInputWordString();
			Selected.req = getCorrectWordString();
			deactivateFocusGroup();
			this.controller.evaluate.bind(this.controller)(false);
		} else {
			if (!this.silent) { writeSound(); playSound('incorrect1'); }
			deactivateFocusGroup();
			showFleetingMessage('does NOT fit: ' + Selected.ch, 0, { fz: 24 });
			setTimeout(() => unfillCharInput(Selected.target), 500);
		}
	}
	eval(isCorrect) { return isCorrect; }
}
class GNamit extends Game {
	constructor(name, o) { super(name, o); }
	startGame() { this.correctionFunc = showCorrectPictureLabels; this.failFunc = failSomePictures; }
	prompt() {
		this.showLabels = false;
		myShowPics(null, {}, { rows: 1 });
		Pictures.map(x => x.correctLabel = x.label);
		Goal = { pics: Pictures };
		let wr = this.language == 'E' ? 'drag labels to pictures' : "ordne die texte den bildern zu";
		show_instruction(wr, dTitle, wr);
		mLinebreak(dTable);
		mLinebreak(dTable, 50);
		let keys = Pictures.map(x => x.key);
		shuffle(keys);
		G.showLabels = true;
		let titems = this.letters = myShowLabels(null, undefined, { rows: 1, showLabels: true }, keys);
		titems.map(x => iDiv(x).style.cursor = 'pointer');
		mLinebreak(dTable, 50);
		enableDD(this.letters, Pictures, this.dropHandler.bind(this), true, false, null);
		mButton('Done!', this.controller.evaluate.bind(this.controller), dTable, { fz: 32, matop: 10, rounding: 10, padding: 16, border: 8 }, ['buttonClass']);
		this.controller.activateUi.bind(this.controller)();
	}
	dropHandler(source, target, isCopy = true) {
		let dSource = iDiv(source);
		let dTarget = iDiv(target);
		console.log('dropped', source, 'onto', target);
		let label = iLabel(target);
		console.log('label', label);
		let div = iDiv(target);
		console.log('div', div);
		addLabel(target, source.label, {});
	}
	trialPrompt() {
		this.failFunc();
		sayTryAgain();
		TOMain = setTimeout(() => { removeMarkers(); Pictures.map(x => removeLabel(x)) }, 1200);
		return 1500;
	}
	eval() {
		console.log('eval in Namit!!!!!')
		this.piclist = Pictures;
		Selected = { piclist: this.piclist, feedbackUI: this.piclist.map(x => iDiv(x)), sz: getRect(iDiv(this.piclist[0])).h };
		let isCorrect = true;
		for (const p of Pictures) {
			let correctLabel = p.correctLabel;
			console.log('correctLabel', correctLabel, p.label);
			let dLabel = iLabel(p);
			console.log('dLabel', dLabel);
			if (nundef(dLabel) || p.label != correctLabel) p.isCorrect = isCorrect = false;
			else p.isCorrect = true;
		}
		return isCorrect;
	}
}
class GPasscode extends Game {
	constructor(name, o) { super(name, o); this.needNewPasscode = true; }
	clear() { clearTimeout(this.TO); clearTimeCD(); }
	startGame() {
		this.incrementLevelOnPositiveStreak = this.samplesPerGame;
		this.decrementLevelOnNegativeStreak = this.samplesPerGame;
	}
	start_Level() { this.needNewPasscode = true; }
	prompt() {
		this.trials = 1;
		if (this.needNewPasscode) {
			this.timeout = 1000;
			this.needNewPasscode = false;
			let keys = getRandomKeysFromGKeys(this.passcodeLength);
			myShowPics(null,
				{ border: '3px solid #ffffff80' },
				{ numRepeat: this.numRepeat, sameBackground: true }, keys);
			Goal = Pictures[0];
			this.wort = (this.language == 'E' ? 'the passcode' : 'das Codewort');
			showInstruction(Goal.label, this.wort + (this.language == 'E' ? ' is' : ' ist'), dTitle, true);
			TOMain = setTimeout(anim1, 300, Goal, 500, showGotItButton);
		} else {
			this.timeout *= 2;
			doOtherStuff();
		}
	}
	eval(x) {
		CountdownTimer.cancel();
		let isCorrect = super.eval(x);
		if (!isCorrect) this.needNewPasscode = true;
		return isCorrect;
	}
}
class GPremem extends Game {
	constructor(name, o) { super(name, o); this.piclist = []; }
	prompt() {
		this.piclist = [];
		this.showLabels = false;
		myShowPics(this.interact.bind(this), { border: '3px solid #ffffff80' }, {});
		let wr = this.language == 'E' ? 'click any picture' : 'click irgendein Bild';
		show_instruction(wr, dTitle, wr);
		this.controller.activateUi.bind(this.controller)();
	}
	trialPrompt() {
		for (const p of this.piclist) { toggleSelectionOfPicture(p); }
		this.piclist = [];
		show_instruction('try again: click any picture', dTitle, 'try again: click any picture');
		return 10;
	}
	interact(ev) {
		ev.cancelBubble = true;
		if (!canAct()) return;
		let pic = findItemFromEvent(Pictures, ev);
		if (!isEmpty(this.piclist) && this.piclist.length < this.numRepeat - 1 && this.piclist[0].label != pic.label) return;
		toggleSelectionOfPicture(pic, this.piclist);
		if (isEmpty(this.piclist)) {
			let wr = this.language == 'E' ? 'click any picture' : 'click irgendein Bild';
			show_instruction(wr, dTitle, wr);
		} else if (this.piclist.length < this.numRepeat - 1) {
			let wr = (this.language == 'E' ? 'click another ' : 'click ein andres Bild mit ');
			show_instruction(wr + `<b>${pic.label.toUpperCase()}</b>`, dTitle, wr + pic.label);
		} else if (this.piclist.length == this.numRepeat - 1) {
			let picGoal = firstCond(Pictures, x => x.label == pic.label && !x.isSelected);
			setGoal(picGoal.index);
			let wr = (this.language == 'E' ? 'click the ' + (this.numRepeat == 2 ? 'other ' : 'last ')
				: 'click das ' + (this.numRepeat == 2 ? 'andere ' : 'letzte ') + ' Bild mit')
			show_instruction(wr + `<b>${picGoal.label.toUpperCase()}</b>`, dTitle, wr + picGoal.label);
		} else {
			this.controller.evaluate.bind(this.controller)(this.piclist);
		}
	}
	eval(piclist) {
		Selected = { piclist: piclist, feedbackUI: piclist.map(x => iDiv(x)), sz: getRect(iDiv(piclist[0])).h };
		let req = Selected.reqAnswer = piclist[0].label;
		Selected.answer = piclist[piclist.length - 1].label;
		if (Selected.answer == req) { return true; } else { return false; }
	}
}
class GProg extends Game {
	constructor(name, o) { super(name, o); }
	prompt() {
		let c = this.card = cRound(dTable);
		let d = c.visual = iDiv(c);
		visualPropertySetter(this.card);
		visualAttributeSetter(this.card);
		d.innerHTML = 'HALLO';
		mStyle(d, { fg: 'blue' });
		mLinebreak(dTable, 25);
		this.ta = this.createTextArea();
		this.ta.value = `mCenterCenterFlex(card.visual);`;
		mLinebreak(dTable, 25);
		mButton('run', this.runCode.bind(this), dTable, { bg: 'skyblue', fg: 'black', fz: 32 }, 'mybutton');
	}
	runCode() {
		let code = this.ta.value;
		let prelim = '';
		prelim = 'let card = this.card;';
		code = prelim + code;
		eval(code);
	}
	createTextArea() {
		let dCode = mDiv(dTable, {});
		let ta = this.ta = mCreate('textarea');
		mAppend(dCode, ta);
		ta.setAttribute('rows', 10);
		ta.setAttribute('cols', 60);
		mStyle(ta, { family: 'courier', padding: 10 });
		return ta;
	}
}
class GProg0 extends Game {
	constructor(name, o) { super(name, o); }
	startGame(fen) {
	}
	prompt() {
		let c = this.card0 = cLandscape(dTable);
		this.card1 = iDiv(c).style;
		this.card2 = iDiv(c);
		this.card3 = iDiv(c);
		show_instruction('write code what rank and suit this card should have', dTitle);
		mLinebreak(dTable, 25);
		let dCode = mDiv(dTable, {});
		let ta = this.ta = mCreate('textarea');
		mAppend(dCode, ta);
		ta.setAttribute('rows', 10);
		ta.setAttribute('cols', 60);
		mStyle(ta, { family: 'courier', padding: 10 });
		ta.value = `mStyle(iDiv(G.card0),{bg:'pink'})`;
		ta.value = `this.card1.background = 'yellow'`;
		ta.value = `this.card2.style.background = 'yellow'`;
		ta.value = `this.set('background','red');`;
		ta.value = `this.set(this.card1,'background','red');`;
		ta.value = `set(card1,'background','red');`;
		ta.value = `card.background = 'red';`;
		ta.value = `card.color = 'red';`;
		ta.value = `card.color = 'red';`;
		mLinebreak(dTable, 25);
		mButton('run', this.runCode.bind(this), dTable, { bg: 'skyblue', fg: 'black', fz: 32 }, 'mybutton');
		console.log('type of style', typeof this.card1);
	}
	set(o, prop, val) {
		o[prop] = val;
	}
	runCode() {
		let code = this.ta.value;
		let prelim = '';
		prelim = 'let card = this.card1; ';
		prelim = `
    var card = new ProgObject(this.card0);
    console.log('card',card);
    `;
		prelim = `
    var obj = {};
    Object.defineProperty(obj, prop, {
        get: function() {return this.card1; },
        set: function(val) { this.card1.val = val; }
    });
    `
		code = prelim + code;
		console.log('code', code);
		eval(code);
	}
}
class GProg1 extends Game {
	constructor(name, o) { super(name, o); }
	prompt() {
		let c = this.card = cLandscape(dTable);
		let d = this.visual = iDiv(c);
		this.style = d.style;
		let propertyGiver1 = (o, prop, setter) => {
			Object.defineProperty(o, prop, {
				get: function () { return this.val; },
				set: function (val) { this.val = val; setter(val); }
			});
		};
		let visualPropertySetter1 = (o) => {
			propertyGiver1(o, 'bg', x => { mStyle(G.visual, { 'bg': x }); });
		}
		visualPropertySetter1(this.card);
		d.innerHTML = 'HALLO';
		mStyle(d, { fg: 'blue' });
		mLinebreak(dTable, 25);
		let dCode = mDiv(dTable, {});
		let ta = this.ta = mCreate('textarea');
		mAppend(dCode, ta);
		ta.setAttribute('rows', 10);
		ta.setAttribute('cols', 60);
		mStyle(ta, { family: 'courier', padding: 10 });
		ta.value = `card.bg = 'red'; console.log(card.bg);`;
		mLinebreak(dTable, 25);
		mButton('run', this.runCode.bind(this), dTable, { bg: 'skyblue', fg: 'black', fz: 32 }, 'mybutton');
		console.log('type of style', typeof this.card1);
	}
	runCode() {
		let code = this.ta.value;
		let prelim = '';
		prelim = 'let [card,visual,style] = [this.card,this.visual,this.style]; ';
		code = prelim + code;
		console.log('code', code);
		eval(code);
	}
}
class GReversi extends GTTT {
	createBoard() {
		this.board = new Board(this.rows, this.cols, this.controller.uiInteract.bind(this.controller), { margin: 6, w: 60, h: 60, bg: 'white', fg: 'black', rounding: '50%' });
	}
	setStartPosition() {
		let positions = [
			[[0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0],
			[0, 0, 'O', 'X', 0, 0],
			[0, 0, 'X', 'O', 0, 0],
			[0, 0, 0, 0, 0, 0],
			[0, 0, 0, 0, 0, 0]],
		];
		if (isdef(this.iPosition)) {
			let idx = this.iPosition + 1; idx = idx % positions.length; this.iPosition = idx;
		} else this.iPosition = 0;
		if (this.startPosition == 'empty' || this.rows != 6 || this.cols != 6) {
			let pos = bCreateEmpty(this.rows, this.cols);
			let r1 = this.rows / 2 - 1, r2 = this.rows / 2, c1 = this.cols / 2 - 1, c2 = this.cols / 2;
			pos[r1 * this.cols + c1] = pos[r2 * this.cols + c2] = 'O';
			pos[r1 * this.cols + c2] = pos[r2 * this.cols + c1] = 'X';
			positions[0] = pos;
		}
		let state = nundef(this.startPosition) || this.startPosition == 'empty' ? positions[0]
			: this.startPosition == 'random' ? chooseRandom(positions)
				: positions[this.iPosition];
		this.board.setState(state, { X: this.ai.color, O: this.human.color });
	}
	startGame() {
		super.startGame();
		this.setStartPosition();
	}
	checkLegal(tile) {
		let state = this.getState();
		if (!EmptyFunc(tile.label)) return false;
		let nei = bNei(state, tile.index, this.rows, this.cols, true);
		for (const n of nei) {
			if (!n) continue;
			let t = state[n];
			if (!EmptyFunc(t)) return true;
		}
		console.log('ILLEGAL MOVE! tile', tile.index, 'does not have neighbor!')
		return false;
	}
	interact(ev) {
		let tile = evToItemC(ev);
		if (!this.checkLegal(tile)) return;
		let pl = this.plTurn;
		addLabel(tile, pl.sym, { fz: 60, fg: pl.color });
		let state = this.getState();
		let iCapt = bCapturedPieces(pl.sym, state, tile.index, this.rows, this.cols);
		for (const i of iCapt) {
			let item = this.board.get(i);
			modLabel(item, this.plTurn.sym, { fg: this.plTurn.color });
		}
		this.controller.evaluate(tile);
	}
	activate() {
		let pl = this.plTurn;
		let autoplay = false;
		if (autoplay || pl == this.ai) {
			if (this.ai == pl) uiActivated = false;
			setTimeout(() => AIMinimax(this, this.afterComputerMove.bind(this)), 200);
		}
	}
	checkFinal(state, pl1, pl2) {
		if (nundef(state)) state = this.getState();
		if (nundef(pl1)) pl1 = this.plTurn;
		if (nundef(pl2)) pl2 = this.plOpp;
		return GReversi.checkEnd(state, pl1, pl2);
	}
	static checkEnd(state, pl1, pl2) {
		let hasPl1 = false, hasPl2 = false, s1 = pl1.sym, s2 = pl2.sym, hasEmpty = false;
		for (const s of state) {
			if (!hasPl1 && s == s1) hasPl1 = true;
			else if (!hasPl2 && s == s2) hasPl2 = true;
			else if (!hasEmpty && EmptyFunc(s)) hasEmpty = true;
			if (hasPl1 && hasPl2 && hasEmpty) return false;
		}
		let winner = !hasPl2 ? pl1 : !hasPl1 ? pl2 : 0;
		let full = !hasEmpty;
		if (full) {
			let n1 = arrCount(state, x => x == s1);
			let n2 = arrCount(state, x => x == s2);
			if (!winner && n1 != n2) {
				if (n1 > n2) winner = pl1; else winner = pl2;
			}
		}
		return winner ? { reached: true, winner: winner } : full ? { reached: true, winner: null } : { reached: false };
	}
	heuristic(state, plMax, plMin) {
		let vmax = 0, vmin = 0;
		vmax = vmax + arrCount(state, x => x == plMax.sym);
		vmin = vmin + arrCount(state, x => x == plMin.sym);
		return vmax - vmin;
	}
	heureval(state) {
		let heurinfo = GReversi.heuristic(state, MAXIMIZER, MINIMIZER);
		let val = heurinfo.val;
		return val;
	}
	eval() {
		this.moveCounter += 1;
		let info = this.checkFinal();
		this.gameOver = info.reached;
		if (this.gameOver) {
			this.winner = info.winner;
			this.tie = !info.winner;
			if (this.winner) {
				this.loser = this.winner == this.ai ? this.human : this.ai;
				let state = this.getState();
				let nWinner = arrCount(state, x => x == this.winner.sym);
				let nLoser = arrCount(state, x => x == this.loser.sym);
				this.info = '(' + nWinner + ':' + nLoser + ')';
			}
		}
	}
	getAvailableMoves(state) {
		let moves = [];
		for (let i = 0; i < state.length; i++) {
			if (EmptyFunc(state[i])) {
				let nei = bNei(state, i, G.rows, G.cols, true);
				let iFull = firstCond(nei, x => !EmptyFunc(state[x]));
				if (iFull != null) moves.push(i);
			}
		}
		return moves;
	}
	evalState(state, depth) {
		let info = GReversi.checkEnd(state, MAXIMIZER, MINIMIZER);
		let val = info.reached && info.winner ? (100 - depth) * (info.winner == MAXIMIZER ? 1 : -1) : 0;
		return { reached: info.reached, val: val };
	}
	applyMove(state, move, player) {
		arrReplaceAtInPlace(state, move, player.sym);
		let iCapt = bCapturedPieces(player.sym, state, move, G.rows, G.cols);
		for (const i of iCapt) { state[i] = player.sym; }
	}
}
class GRiddle extends Game {
	constructor(name, o) { super(name, o); }
	startGame() {
		this.successFunc = successThumbsUp; this.failFunc = failThumbsDown;
		this.correctionFunc = () => {
			mStyle(Goal.buttonCorrect, { bg: 'green' });
			animate(Goal.buttonCorrect, 'komisch', 1000);
			return 20000;
		};
	}
	prompt() {
		this.trials = 1;
		show_instruction('Solve the Riddle:', dTitle, 'Solve the Riddle:');
		let wp = this.wp = getRandomWP(this.minIndex, this.maxIndex);
		let haveResult = wp.isTextResult = instantiateNames(wp);
		if (!haveResult) instantiateNumbers(wp);
		mLinebreak(dTable, 2);
		showHiddenThumbsUpDown(90);
		mLinebreak(dTable);
		let dArea = this.textArea = mDiv(dTable, { w: '70%' });
		let d = mText(wp.text, dArea, { fz: 28 });
		mLinebreak(dTable, 20);
		let dResult = this.dResult = mDiv(dTable);
		Goal = { label: wp.result.text };
		this.createMultipleChoiceElements();
		mLinebreak(dTable);
		this.controller.activateUi.bind(this.controller)();
	}
	createMultipleChoiceElements() {
		let wp = this.wp;
		let choices = [], nums = [], texts = [];
		if (wp.isTextResult == true) {
			texts = Object.values(wp.diNames);
			for (let i = 0; i < texts.length; i++) { choices.push({ number: 0, text: texts[i] }); }
			Goal.correctChoice = firstCond(choices, x => x.text == Goal.label);
		} else if (wp.isFractionResult == true) {
			let res = wp.result.number;
			if (res.n / res.d > 2) {
				wp.result.isMixed = true;
				wp.result.mixed = getMixedNumber(res.n, res.d);
			}
			nums = get3FractionVariants(res);
			texts = nums.map(x => getTextForFractionX(x.n, x.d));
			wp.result.text = texts[0];
			for (let i = 0; i < texts.length; i++) { choices.push({ number: nums[i], text: texts[i] }); }
			Goal.correctChoice = firstCond(choices, x => x.text == wp.result.text);
		} else {
			let res = wp.result.number;
			nums = [res, res + randomNumber(1, 25), res / randomNumber(2, 5), res * randomNumber(2, 5)];
			texts = nums.map(x => (Math.round(x * 100) / 100));
			for (let i = 0; i < texts.length; i++) { choices.push({ number: nums[i], text: texts[i] }); }
			Goal.correctChoice = choices[0];
		}
		shuffle(choices);
		if (coin()) shuffle(choices);
		Goal.choices = choices;
		let dParent = this.dResult;
		let idx = 0;
		for (const ch of choices) {
			////'&frac57;', //'&frac12;', 
			let dButton = mButton(ch.text, this.onClickChoice.bind(this), dParent, { wmin: 100, fz: 36, margin: 20, rounding: 4, vpadding: 4, hpadding: 10 }, ['toggleButtonClass']);
			dButton.id = 'bChoice_' + idx; idx += 1;
			if (ch.text == wp.result.text) {
				Goal.choice = ch.toString();
				Goal.buttonCorrect = dButton;
			}
		}
	}
	onClickChoice(ev) {
		let id = evToClosestId(ev);
		let b = mBy(id);
		let index = Number(stringAfter(id, '_'));
		Goal.choice = Goal.choices[index];
		Goal.buttonClicked = b;
		if (Goal.choice == Goal.correctChoice) { mStyle(b, { bg: 'green' }); mCheckit(this.textArea, 100); }
		else { mXit(b, 100); }
		this.controller.evaluate.bind(this.controller)();
	}
	eval() {
		clearFleetingMessage();
		Selected = { delay: 5000, reqAnswer: this.wp.result.number, answer: Goal.choice.number, feedbackUI: Goal.buttonClicked };
		if (this.wp.isTextResult) { Selected.reqAnswer = this.wp.result.text; Selected.answer = Goal.choice.text; }
		return (Goal.buttonClicked == Goal.buttonCorrect);
	}
	createInputElements() {
		this.inputBox = addNthInputElement(this.dResult, 0);
		this.defaultFocusElement = this.inputBox.id;
		onclick = () => mBy(this.defaultFocusElement).focus();
		mBy(this.defaultFocusElement).focus();
	}
	activate() { }
	eval_dep(ev) {
		console.log('#', this.trialNumber, 'of', this.trials);
		clearFleetingMessage();
		Selected = {};
		let answer = normalize(this.inputBox.value, 'E');
		let reqAnswer = normalize(this.wp.result.text, 'E');
		console.log('answer', answer, 'req', reqAnswer);
		let isCorrect = answer == reqAnswer;
		Selected = { reqAnswer: reqAnswer, answer: answer, feedbackUI: isCorrect ? Goal.buttonClicked : Goal.buttonCorrect };
		return (answer == reqAnswer);
	}
	trialPrompt_dep() {
		sayTryAgain();
		let n = this.trialNumber;
		showFleetingMessage('try again!', 0, {}, true);
		this.inputBox = addNthInputElement(this.dResult, this.trialNumber);
		this.defaultFocusElement = this.inputBox.id;
		mLinebreak(dTable);
		return 10;
	}
	activate_input() {
		this.inputBox.onkeyup = ev => {
			if (!canAct()) return;
			if (ev.key === "Enter") {
				ev.cancelBubble = true;
				this.controller.evaluate.bind(this.controller)(ev);
			}
		};
		this.inputBox.focus();
	}
}
class gridY {
	constructor({
		bid = 'gridY',
		rows = 4,
		cols = 4,
		w = 100,
		h = 100,
		gName = 'g',
		x = 0,
		y = 0,
		margin = 10,
		gap = 10,
		board = { level: 1, ipal: 2, bg: undefined, fg: undefined, shape: undefined, border: undefined, thickness: undefined },
		fields = { level: 6, ipal: 3, bg: undefined, fg: undefined, shape: undefined, border: undefined, thickness: undefined },
		cities = { level: 6, ipal: 2, bg: undefined, fg: undefined, shape: 'circle', border: undefined, thickness: undefined },
		streets = { level: 6, ipal: 4, bg: undefined, fg: 'yellow', shape: 'line', border: 'blue', thickness: 10 }
	}) {
		this.prelim(bid, rows, cols, w, h, x, y, margin);
		this.createBoard(gName, x, y, board);
		this.createFields(bid, gName, rows, cols, gap, fields);
		addNodes(this, bid, gName, cities);
		addEdges(this, bid, gName, streets);
		drawElems(this.fields);
		drawElems(this.edges);
		drawElems(this.nodes);
	}
	prelim(id, rows, cols, w, h, x, y, margin) {
		this.id = id;
		this.rows = rows;
		this.cols = cols;
		this.w = w;
		this.h = h;
		this.x = x;
		this.y = y;
		let wFieldMax = (w - 2 * margin) / cols;
		let hFieldMax = (h - 2 * margin) / rows;
		let szField = Math.min(wFieldMax, hFieldMax);
		this.wBoard = roundEven(szField * cols);
		this.hBoard = roundEven(szField * rows);
		this.wField = this.hField = roundEven(szField);
	}
	createBoard(gName, x, y, board) {
		this.board = makeElemY('board', null, gName, board.level, {
			w: this.wBoard,
			h: this.hBoard,
			x: x,
			y: y,
			ipal: board.ipal,
			bg: board.bg,
			fg: board.fg,
			shape: board.shape,
			border: board.border,
			thickness: board.thickness
		});
	}
	createFields(bid, gName, rows, cols, gap, fields) {
		this.fields = [];
		this.fieldsByRowCol = [];
		for (let i = 1; i <= rows; i++) {
			this.fieldsByRowCol[i] = [];
			for (let j = 1; j <= cols; j++) {
				let field = makeElemY('field', bid, gName, fields.level, {
					row: i,
					col: j,
					w: this.wField,
					h: this.hField,
					gap: gap,
					x: (j - 1) * this.wField - this.wBoard / 2 + this.wField / 2 + this.x,
					y: (i - 1) * this.hField - this.hBoard / 2 + this.hField / 2 + this.y,
					ipal: fields.ipal,
					bg: fields.bg,
					fg: fields.fg,
					shape: fields.shape,
					border: fields.border,
					thickness: fields.thickness
				});
				this.fields.push(field.id);
				this.fieldsByRowCol[i][j] = field.id;
				field.edges = [];
				field.fields = [];
				field.nodes = [];
				let q = [[-0.5, -0.5], [0.5, -0.5], [0.5, 0.5], [-0.5, 0.5]];
				field.poly = getPoly(q, field.x, field.y, field.w, field.h);
			}
		}
	}
	isValid(r, c) {
		return r in this.fields && c in this.fields[r];
	}
}
class GSayPic extends Game {
	constructor(name, o) { super(name, o); }
	clear() { Speech.stopRecording(); }
	prompt() {
		myShowPics();
		setGoal();
		let wr = (this.language == 'E' ? 'say: ' : "sage: ");
		show_instruction(wr + `<b>${Goal.label.toUpperCase()}</b>`, dTitle);
		animate(dInstruction, 'pulse800' + bestContrastingColor(this.color, ['yellow', 'red']), 900);
		mLinebreak(dTable, 25);
		MicrophoneUi = mMicrophone(dTable, this.color);
		MicrophoneHide();
		TOMain = setTimeout(this.controller.activateUi.bind(this.controller), 200);
	}
	trialPrompt(nTrial) {
		sayRandomVoice(nTrial < 2 ? 'speak UP!!!' : 'Louder!!!', 'LAUTER!!!');
		animate(dInstruction, 'pulse800' + bestContrastingColor(this.color, ['yellow', 'red']), 500);
		return 600;
	}
	activate() {
		if (Speech.isSpeakerRunning()) {
			TOMain = setTimeout(this.activate.bind(this), 200);
		} else {
			TOMain = setTimeout(() => Speech.startRecording(this.language, this.controller.evaluate.bind(this.controller)), 100);
		}
	}
	eval(isfinal, speechResult, confidence, sessionId) {
		if (sessionId != SessionId) {
			alert('NOT THIS BROWSER!!!!!!'); return undefined;
		}
		let answer = Goal.answer = normalize(speechResult, this.language);
		let reqAnswer = Goal.reqAnswer = normalize(Goal.label, this.language);
		Selected = { reqAnswer: reqAnswer, answer: answer, feedbackUI: iDiv(Goal) };
		if (isEmpty(answer)) return false;
		else return isSimilar(answer, reqAnswer) || isList(Goal.info.valid) && firstCond(Goal.info.valid, x => x.toUpperCase() == answer.toUpperCase());
	}
}
class GSentence extends Game {
	constructor(name, o) {
		super(name, o);
		this.prevLanguage = this.language;
		this.language = 'E';
	}
	startGame() {
		this.correctionFunc = () => {
			let sent = this.sentenceList[0].join(' ');
			this.dWordArea.innerHTML = `<h1>${sent}</h1>`;
			if (this.spokenFeedback) sayRandomVoice(sent);
			return 3000;
		}
		this.successFunc = () => { mCheckit(this.dWordArea, 120); };
	}
	clear() { super.clear(); this.language = this.prevLanguage; }
	start_Level() {
		this.sentences = [];
		for (const s of EnglishSentences) {
			let slist = isList(s) ? s : [s];
			slist = slist.map(x => x.split(' '));
			if (slist[0].length <= this.maxWords && slist[0].length >= this.minWords) this.sentences.push(slist);
		}
	}
	dropHandler(source, target, isCopy = false, clearTarget = false) {
		let prevTarget = source.target;
		source.target = target;
		let dSource = iDiv(source);
		let dTarget = iDiv(target);
		if (clearTarget) {
			let ch = dTarget.children[0];
			let chSource = firstCond(Pictures, x => iDiv(x) == ch);
			if (chSource) {
				if (isdef(prevTarget)) {
					mAppend(iDiv(prevTarget), ch);
					chSource.target = prevTarget;
				} else {
					mAppend(this.dWordArea, ch);
					delete chSource.target;
				}
			}
			clearElement(dTarget);
		}
		if (isCopy) {
			let dNew = mText(dSource.innerHTML, dTarget, { wmin: 100, fz: 20, padding: 4, margin: 4, display: 'inline-block' });
			addDDSource(dNew, isCopy, clearTarget);
		} else {
			mAppend(dTarget, dSource);
		}
	}
	prompt() {
		show_instruction('form a correct sentence', dTitle, 'form a correct sentence');
		mLinebreak(dTable);
		let sl = this.sentenceList = chooseRandom(this.sentences);
		let words = this.sentenceList[0];
		let fz = 32;
		let h = fz * 1.25, wmin = fz * 1.25;
		let items = Pictures = [];
		let containers = this.containers = [];
		let options = _simpleOptions({ fz: fz, bg: 'transparent', fg: 'white', showPic: false, showLabels: true }, { wmin: wmin });
		let dArea = mDiv(dTable, { h: 150, display: 'flex', 'flex-wrap': 'wrap', layout: 'fhcc' });
		mLinebreak(dTable);
		let dWordArea = this.dWordArea = mDiv(dTable, { h: 70, wmin: 20, display: 'flex', 'flex-wrap': 'wrap', layout: 'fhcc' });
		let i = 0;
		for (const word of words) {
			let item = { label: word, index: i };
			let container = { label: word, index: i };
			i += 1;
			let d = makeItemDiv(item, options);
			let dCont = mDiv(dArea, { wmin: wmin + 12, hmin: h + 10, bg: colorTrans('beige', .25), fg: 'black', margin: 12 });
			container.div = dCont;
			items.push(item);
			containers.push(container);
		}
		shuffle(items);
		items.map(x => { mAppend(dWordArea, iDiv(x)); mStyle(iDiv(x), { h: h, w: 'auto' }); });
		enableDD(items, containers, this.dropHandler.bind(this), false, true);
		mLinebreak(dTable, 50);
		mButton('Done!', this.controller.evaluate.bind(this.controller), dTable, { fz: 28, matop: 10, rounding: 10, padding: 16, border: 8 }, ['buttonClass']);
		this.controller.activateUi.bind(this.controller)();
	}
	trialPrompt() {
		sayTryAgain();
		showFleetingMessage('Try again!', 0, { fg: 'white' });
		TOMain = setTimeout(() => { Pictures.map(x => mAppend(this.dWordArea, iDiv(x))); }, 1200);
		return 1500;
	}
	eval() {
		let words = [];
		for (const cont of this.containers) {
			let d = iDiv(cont);
			let ch = d.firstChild;
			if (ch && isdef(ch.firstChild)) {
				words.push(ch.firstChild.innerHTML);
			} else break;
		}
		let answer = words.join(' ');
		let isCorrect = false;
		for (const sent of this.sentenceList) {
			let variant = sent.join(' ');
			if (answer == variant) isCorrect = true;
		}
		Selected = { piclist: Pictures, feedbackUI: Pictures.map(x => iDiv(x)), sz: getRect(iDiv(Pictures[0])).h + 10 };
		return isCorrect;
	}
}
class GSentence1 extends Game {
	constructor(name, o) {
		super(name, o);
		this.prevLanguage = this.language;
		this.language = 'E';
	}
	startGame() {
		this.correctionFunc = showCorrectPictureLabels;
		this.failFunc = failSomePictures;
		this.successFunc = () => { mCheckit(this.dWordArea, 120); };
	}
	clear() { super.clear(); this.language = this.prevLanguage; }
	start_Level() {
		this.sentences = EnglishSentences.map(x => x.split(' ')).filter(x => x.length <= this.maxWords);
	}
	dropHandler(source, target, isCopy = false, clearTarget = false) {
		let prevTarget = source.target;
		source.target = target;
		let dSource = iDiv(source);
		let dTarget = iDiv(target);
		if (clearTarget) {
			let ch = dTarget.children[0];
			let chSource = firstCond(Pictures, x => iDiv(x) == ch);
			if (chSource) {
				if (isdef(prevTarget)) {
					mAppend(iDiv(prevTarget), ch);
					chSource.target = prevTarget;
				} else {
					mAppend(this.dWordArea, ch);
					delete chSource.target;
				}
			}
			clearElement(dTarget);
		}
		if (isCopy) {
			let dNew = mText(dSource.innerHTML, dTarget, { wmin: 100, fz: 20, padding: 4, margin: 4, display: 'inline-block' });
			addDDSource(dNew, isCopy, clearTarget);
		} else {
			mAppend(dTarget, dSource);
		}
	}
	prompt() {
		let words = this.sentence = chooseRandom(this.sentences);
		showInstruction('', 'drag words into blanks', dTitle, true);
		mLinebreak(dTable);
		let fz = 32;
		let h = fz * 1.25, wmin = fz * 1.25;
		let items = Pictures = [];
		let containers = [];
		let options = _simpleOptions({ fz: fz, bg: 'transparent', fg: 'white', showPic: false, showLabels: true }, { wmin: wmin });
		let dArea = mDiv(dTable, { h: 150, display: 'flex', 'flex-wrap': 'wrap', layout: 'fhcc' });
		mLinebreak(dTable);
		let dWordArea = this.dWordArea = mDiv(dTable, { h: 70, wmin: 20, display: 'flex', 'flex-wrap': 'wrap', layout: 'fhcc' });
		let i = 0;
		for (const word of words) {
			let item = { label: word, index: i };
			let container = { label: word, index: i };
			i += 1;
			let d = makeItemDiv(item, options);
			let dCont = mDiv(dArea, { wmin: wmin + 12, hmin: h + 10, bg: colorTrans('beige', .25), fg: 'black', margin: 12 });
			container.div = dCont;
			items.push(item);
			containers.push(container);
		}
		shuffle(items);
		items.map(x => { mAppend(dWordArea, iDiv(x)); mStyleX(iDiv(x), { h: h, w: 'auto' }); });
		enableDD(items, containers, this.dropHandler.bind(this), false, true);
		mLinebreak(dTable, 50);
		mButton('Done!', this.controller.evaluate.bind(this.controller), dTable, { fz: 28, matop: 10, rounding: 10, padding: 16, border: 8 }, ['buttonClass']);
		this.controller.activateUi.bind(this.controller)();
	}
	trialPrompt() {
		sayTryAgain();
		showFleetingMessage('Try again!', 0, { fg: 'white' });
		TOMain = setTimeout(() => { Pictures.map(x => mAppend(this.dWordArea, iDiv(x))); }, 1200);
		return 1500;
	}
	eval() {
		let i = 0;
		let isCorrect = true;
		for (const p of Pictures) {
			let cont = p.target;
			if (nundef(cont)) p.isCorrect = isCorrect = false;
			else if (p.index != cont.index) p.isCorrect = isCorrect = false;
			else p.isCorrect = true;
		}
		Selected = { piclist: Pictures, feedbackUI: Pictures.map(x => iDiv(x)), sz: getRect(iDiv(Pictures[0])).h + 10 };
		return isCorrect;
	}
}
class GSpotit extends GameTimed {
	constructor(name, o) { super(name, o); }
	startGame() { this.correctionFunc = showCorrectUis; }
	start_Level() {
		super.start_Level();
		this.colarr = _calc_hex_col_array(this.rows, this.cols);
		let perCard = arrSum(this.colarr);
		this.nShared = (this.numCards * (this.numCards - 1)) / 2;
		this.nUnique = perCard - this.numCards + 1;
		this.numKeysNeeded = this.nShared + this.numCards * this.nUnique;
		this.keys = setKeysG(this, (_, x) => !x.includes(' '), this.numKeysNeeded + 1);
	}
	deal() {
		let keys = choose(this.keys, this.numKeysNeeded);
		let dupls = keys.slice(0, this.nShared);
		let uniqs = keys.slice(this.nShared);
		let infos = [];
		for (let i = 0; i < this.numCards; i++) {
			let keylist = uniqs.slice(i * this.nUnique, (i + 1) * this.nUnique);
			let info = { id: getUID(), shares: {}, keys: keylist, rows: this.rows, cols: this.cols, colarr: this.colarr };
			infos.push(info);
		}
		let iShared = 0;
		for (let i = 0; i < this.numCards; i++) {
			for (let j = i + 1; j < this.numCards; j++) {
				let c1 = infos[i];
				let c2 = infos[j];
				let dupl = dupls[iShared++];
				c1.keys.push(dupl);
				c1.shares[c2.id] = dupl;
				c2.shares[c1.id] = dupl;
				c2.keys.push(dupl);
			}
		}
		for (const info of infos) { shuffle(info.keys); }
		return infos;
	}
	interact(ev) {
		ev.cancelBubble = true;
		if (!canAct()) { console.log('no act'); return; }
		let keyClicked = evToProp(ev, 'key');
		let id = evToId(ev);
		if (isdef(keyClicked) && isdef(Items[id])) {
			this.pause();
			let item = Items[id];
			if (Object.values(item.shares).includes(keyClicked)) {
				let otherCard = spotitFindCardSharingSymbol(item, keyClicked);
				let cardSymbol = ev.target;
				let otherSymbol = spotitFindSymbol(otherCard, keyClicked);
				Selected = { isCorrect: true, feedbackUI: [cardSymbol, otherSymbol] };
			} else {
				let cardSymbol = ev.target;
				Selected = { isCorrect: false, feedbackUI: [cardSymbol], correctUis: this.getSharedSymbols(), correctionDelay: this.items.length * 1500 };
			}
			this.controller.evaluate.bind(this.controller)();
		}
	}
	getSharedSymbols() {
		let result = [];
		for (const item of this.items) {
			for (const id in item.shares) {
				let k = item.shares[id];
				let ui = iGetl(item, k);
				result.push(ui);
			}
		}
		return result;
	}
	eval() { return Selected.isCorrect; }
	prompt() {
		this.trials = 1;
		show_instruction('find common symbol', dTitle);
		mLinebreak(dTable, 25);
		let infos = this.deal();
		let items = this.items = [];
		for (const info of infos) {
			let item = spotitCard(info, dTable, { margin: 10 }, this.interact.bind(this));
			items.push(item);
		}
		this.controller.activateUi.bind(this.controller)();
	}
	activate() { }
	onTimeup() {
		Selected = { isCorrect: false, correctUis: this.getSharedSymbols(), correctionDelay: this.items.length * 2000 };
		this.controller.evaluate.bind(this.controller)();
	}
}
class GSpotit1 extends GameTimed1 {
	constructor(name, o) { super(name, o); }
	startGame() { this.correctionFunc = showCorrectUis; }
	start_Level() {
		this.colarr = _calc_hex_col_array(this.rows, this.cols);
		let perCard = arrSum(this.colarr);
		this.nShared = (this.numCards * (this.numCards - 1)) / 2;
		this.nUnique = perCard - this.numCards + 1;
		this.numKeysNeeded = this.nShared + this.numCards * this.nUnique;
		this.keys = setKeysG(this, (_, x) => !x.includes(' '), this.numKeysNeeded + 1);
	}
	deal() {
		let keys = choose(this.keys, this.numKeysNeeded);
		let dupls = keys.slice(0, this.nShared);
		let uniqs = keys.slice(this.nShared);
		let infos = [];
		for (let i = 0; i < this.numCards; i++) {
			let keylist = uniqs.slice(i * this.nUnique, (i + 1) * this.nUnique);
			let info = { id: getUID(), shares: {}, keys: keylist, rows: this.rows, cols: this.cols, colarr: this.colarr };
			infos.push(info);
		}
		let iShared = 0;
		for (let i = 0; i < this.numCards; i++) {
			for (let j = i + 1; j < this.numCards; j++) {
				let c1 = infos[i];
				let c2 = infos[j];
				let dupl = dupls[iShared++];
				c1.keys.push(dupl);
				c1.shares[c2.id] = dupl;
				c2.shares[c1.id] = dupl;
				c2.keys.push(dupl);
			}
		}
		for (const info of infos) { shuffle(info.keys); }
		return infos;
	}
	interact(ev) {
		ev.cancelBubble = true;
		if (!canAct()) { console.log('no act'); return; }
		let keyClicked = evToProp(ev, 'key');
		let id = evToId(ev);
		if (isdef(keyClicked) && isdef(Items[id])) {
			this.pause();
			let item = Items[id];
			if (Object.values(item.shares).includes(keyClicked)) {
				let otherCard = spotitFindCardSharingSymbol(item, keyClicked);
				let cardSymbol = ev.target;
				let otherSymbol = spotitFindSymbol(otherCard, keyClicked);
				Selected = { isCorrect: true, feedbackUI: [cardSymbol, otherSymbol] };
			} else {
				let cardSymbol = ev.target;
				Selected = { isCorrect: false, feedbackUI: [cardSymbol], correctUis: this.getSharedSymbols(), correctionDelay: this.items.length * 1500 };
			}
			this.controller.evaluate.bind(this.controller)();
		}
	}
	getSharedSymbols() {
		let result = [];
		for (const item of this.items) {
			for (const id in item.shares) {
				let k = item.shares[id];
				let ui = iGetl(item, k);
				result.push(ui);
			}
		}
		return result;
	}
	eval() { return Selected.isCorrect; }
	prompt() {
		this.trials = 1;
		show_instruction('find common symbol', dTitle);
		this.makeTimer();
		mLinebreak(dTable, 25);
		let infos = this.deal();
		let items = this.items = [];
		for (const info of infos) {
			let item = spotitCard(info, dTable, { margin: 10 }, this.interact.bind(this));
			items.push(item);
		}
		this.controller.activateUi.bind(this.controller)();
	}
	onTimeup() {
		Selected = { isCorrect: false, correctUis: this.getSharedSymbols(), correctionDelay: this.items.length * 2000 };
		this.controller.evaluate.bind(this.controller)();
	}
}
class GSteps extends Game {
	constructor(name, o) { super(name, o); }
	startGame() { this.correctionFunc = showCorrectWords; }
	start_Level() {
		super.start_Level();
		this.keys = this.keys.filter(x => containsColorWord(x));
	}
	prompt() {
		this.piclist = [];
		let colorKeys = this.numColors > 1 ? choose(this.colors, this.numColors) : null;
		let bg = this.numColors > 1 || this.numRepeat > 1 ? 'white' : 'random';
		let rows = this.numColors > 1 ? this.numColors : undefined;
		let showRepeat = this.numRepeat > 1;
		myShowPics(this.interact.bind(this), { bg: bg },
			{ rows: rows, showRepeat: showRepeat, colorKeys: colorKeys, numRepeat: this.numRepeat, contrast: this.contrast });
		setMultiGoal(this.numSteps);
		let cmd = 'click';
		let spoken = [], written = [], corr = [];
		for (let i = 0; i < this.numSteps; i++) {
			let goal = Goal.pics[i];
			let sOrdinal = getOrdinal(goal.iRepeat);
			[written[i], spoken[i], corr[i]] = getOrdinalColorLabelInstruction(cmd, sOrdinal, goal.color, goal.label);
			goal.correctionPhrase = corr[i];
			cmd = 'then';
		}
		let sWritten = this.showVisualInstruction ? written.join('; ') : 'listen to instruction!';
		show_instruction(sWritten, dTitle, spoken.join('. '), { fz: 20 });
		this.controller.activateUi.bind(this.controller)();
	}
	trialPrompt() {
		sayTryAgain();
		showFleetingMessage(this.message, 0);
		return 1000;
	}
	activate() {
		for (const p of this.piclist) { toggleSelectionOfPicture(p); }
		this.piclist = [];
	}
	interact(ev) {
		ev.cancelBubble = true;
		if (!canAct()) { console.log('no act'); return; }
		let pic = findItemFromEvent(Pictures, ev);
		toggleSelectionOfPicture(pic, this.piclist);
		if (this.piclist.length == Goal.pics.length) {
			clearFleetingMessage();
			Selected = { piclist: this.piclist }; this.controller.evaluate.bind(this.controller)();
		}
	}
	eval() {
		Selected = { piclist: this.piclist, feedbackUI: this.piclist.map(x => iDiv(x)), sz: getRect(iDiv(this.piclist[0])).h };
		let isCorrect = true;
		this.message = this.language == 'D' ? 'beachte die REIHENFOLGE!' : 'mind the ORDER!';
		for (let i = 0; i < this.piclist.length; i++) {
			let p = this.piclist[i];
			if (!Goal.pics.includes(p)) this.message = this.language == 'D' ? 'noch einmal!' : 'try again!';
			if (this.piclist[i] != Goal.pics[i]) isCorrect = false;
		}
		return isCorrect;
	}
}
class GStory extends Game {
	constructor(name) { super(name); }
	prompt() {
		let showLabels = G.showLabels == true && Settings.labels == true;
		myShowPics(evaluate, {}, { showLabels: showLabels });
		setGoal();
		showInstruction(Goal.label, 'click', dTitle, true);
		activateUi();
	}
}
class GSwap extends Game {
	constructor(name, o) {
		super(name, o);
		if (this.language == 'C') { this.prevLanguage = this.language; this.language = chooseRandom('E', 'D'); }
		ensureDictionary();
	}
	startGame() { this.correctionFunc = showCorrectLabelSwapping; }
	clear() { super.clear(); if (isdef(this.prevLanguage)) this.language = this.prevLanguage; }
	start_Level() {
		this.keys = setKeysG(this, filterWordByLengthG, 25);
		if (this.keys.length < 25) { this.keys = setKeysG(this, filterWordByLengthG, 25, 'all'); }
		this.trials = 2;
	}
	dropHandler(source, target, isCopy = false, clearTarget = false) {
		let prevTarget = source.target;
		source.target = target;
		let dSource = iDiv(source);
		let dTarget = iDiv(target);
		if (clearTarget) {
			let ch = dTarget.children[0];
			let chSource = firstCond(Pictures, x => iDiv(x) == ch);
			if (chSource) {
				if (isdef(prevTarget)) {
					mAppend(iDiv(prevTarget), ch);
					chSource.target = prevTarget;
				} else {
					mAppend(this.dWordArea, ch);
					delete chSource.target;
				}
			}
			clearElement(dTarget);
		}
		if (isCopy) {
			let dNew = mText(dSource.innerHTML, dTarget, { wmin: 100, fz: 20, padding: 4, margin: 4, display: 'inline-block' });
			addDDSource(dNew, isCopy, clearTarget);
		} else {
			mAppend(dTarget, dSource);
		}
	}
	prompt() {
		show_instruction('swap letter to form words', dTitle, 'swap letter to form words');
		mLinebreak(dTable);
		let fz = 32;
		let options = _simpleOptions({ language: this.language, w: 200, h: 200, keySet: this.keys, luc: 'u', fz: fz, bg: 'random', fg: 'white', showLabels: true });
		let n = 2;
		let items = gatherItems(n, options);
		let style = { margin: 3, cursor: 'pointer', fg: 'white', display: 'inline', bg: '#00000020', align: 'center', border: 'transparent', outline: 'none', family: 'Consolas', fz: 80 };
		for (const item of items) {
			let d1 = item.container = mDiv(dTable, { hmin: 250 });
			let d = iLetters(item.label, d1, style);
			iAdd(item, { div: d });
			let letters = item.letters = [];
			for (let i = 0; i < arrChildren(d).length; i++) {
				let ch = d.children[i];
				let l = {
					itemId: item.id, div: ch, i: i, letter: ch.innerHTML,
					swapInfo: item.swaps[i],
					state: 'swapped',
					isBlinking: false, fg: 'white', bg: 'transparent'
				};
				letters.push(l);
				ch.onclick = () => { startBlinking(l, item.letters, true) };
			}
			mStyle(d, { margin: 35 });
			delete item.swaps;
		}
		showPictureHints(Pictures, 'container');
		mLinebreak(dTable, 50);
		this.buttonDone = mButton('Done!', () => {
			if (!canAct()) return;
			for (let i = 0; i < Pictures.length; i++) {
				let p = Pictures[i];
				let blinking = getBlinkingLetter(p);
				if (!blinking) {
					let msg = 'You need to pick 1 letter to swap in EACH word!!!';
					Speech.say(msg);
					sayRandomVoice(msg);
					showFleetingMessage('You need to pick 1 letter to swap in EACH word!!!', 0, { fz: 30 });
					return;
				}
			}
			this.controller.evaluate.bind(this.controller)();
		}, dTable, { fz: 28, matop: 10, rounding: 10, padding: 16, border: 8 }, ['buttonClass']);
		this.controller.activateUi.bind(this.controller)();
	}
	trialPrompt() {
		if (this.trialNumber % 2 == 0) showPictureHints(Pictures, 'container'); else showTextHints(Pictures, 'container', 'origLabel');
		TOMain = setTimeout(() => {
			for (const p of Pictures) {
				for (const l of p.letters) {
					l.state = 'swapped';
					if (isdef(l.swapInfo)) {
						iDiv(l).innerHTML = p.label[l.i];
					}
				}
			}
		}, 1500);
		return 1800;
	}
	activate() {
		if (this.trialNumber >= 1) { sayTryAgain(); showFleetingMessage('Try again!'); }
		else { showFleetingMessage('click one letter in each word!'); }
	}
	eval() {
		let n = Pictures.length;
		let blinkInfo = this.blinkInfo = [];
		clearFleetingMessage();
		for (let i = 0; i < n; i++) {
			let p = Pictures[i];
			let blinking = getBlinkingLetter(p);
			blinkInfo.push({ i: i, blinking: blinking });
		}
		for (let i = 0; i < n; i++) { let l = blinkInfo[i].blinking; if (!l) continue; stopBlinking(l); }
		for (const blinki of blinkInfo) { if (!blinki.blinking) { return false; } }
		let isCorrect = true;
		for (let i = 0; i < n; i++) {
			let b1 = blinkInfo[i].blinking;
			let b2 = blinkInfo[(i + 1) % blinkInfo.length].blinking;
			let item = Items[b1.itemId];
			let item2 = Items[b2.itemId];
			let l = item.letters[b1.i];
			let sw = l.swapInfo;
			if (nundef(sw)) { sw = l.swapInfo = { correct: { itemId: item.id, index: b1.i, l: b1.letter } }; }
			sw.temp = { itemId: item2.id, index: b2.i, l: b2.letter };
			item.testLabel = replaceAtString(item.label, b1.i, b2.letter);
			iDiv(l).innerHTML = b2.letter;
			l.state = 'temp';
		}
		for (const p of Pictures) { if (p.testLabel != p.origLabel) { isCorrect = false; } }
		let feedbackList = [];
		for (let i = 0; i < n; i++) {
			let item = Pictures[i];
			let d;
			if (isCorrect) d = iDiv(item.letters[item.iLetter]);
			else {
				let iLetter = blinkInfo[i].blinking.i;
				if (item.iLetter != iLetter) d = iDiv(item.letters[iLetter]);
			}
			if (isdef(d)) feedbackList.push(d);
		}
		Selected = { piclist: Pictures, feedbackUI: feedbackList, sz: getRect(iDiv(Pictures[0])).h, delay: 800 };
		return isCorrect;
	}
}
class gText {
	constructor(g) {
		this.elem = g;
		this.texts = [];
		this.textBackground = null;
	}
	//#region text
	computeTextColors(fill, alpha = 1, textBg = null) {
		fill = fill ? fill : this.fg ? this.fg : textBg ? colorIdealText(textBg) : this.bg ? colorIdealText(this.bg) : null;
		if (!fill) {
			fill = 'white';
			textBg = 'gray';
		}
		fill = anyColorToStandardString(fill, alpha);
		return { fill: fill, bg: textBg ? textBg : this.bg };
	}
	setTextFill(r, fill, alpha = 1, textBg = null) {
		let textColors = this.computeTextColors(fill, alpha, textBg);
		r.setAttribute('fill', textColors.fill);
		r.setAttribute('stroke', 'none');
		r.setAttribute('stroke-width', 0);
		return textColors.bg;
	}
	setTextBorder(color, thickness = 0) {
		let c = anyColorToStandardString(color);
		let children = arrChildren(this.elem);
		unitTestMS('setTextBorder', children);
		for (const ch of children) {
			let t = getTypeOf(ch);
			if (t == 'text' || t == 'line') {
				ch.setAttribute('stroke-width', thickness);
				ch.setAttribute('stroke', c);
			}
		}
	}
	calcTextWidth(txt, fz, family, weight) {
		let sFont = weight + ' ' + fz + 'px ' + family;
		sFont = sFont.trim();
		let wText = getTextWidth(txt, sFont);
		return wText;
	}
	addFrame(color) {
		if (this.cat == 'd') {
			this.body.style.boxSizing = 'border-box';
			this.body.style.border = '5px solid ' + color;
		}
	}
	addFlexTitleBody() {
		let content = this.elem.innerHTML;
		clearElement(this.elem);
		let d = this.elem;
		d.style.display = 'flex';
		d.style.flexDirection = 'column';
		let dTitle = document.createElement('div');
		this.title = dTitle;
		this.title.style.padding = '6px';
		this.title.style.textAlign = 'center';
		let dBody = document.createElement('div');
		dBody.style.flexGrow = 1;
		dBody.style = "flex-grow:1;overflow:auto;padding:0px 6px"
		this.body = dBody;
		this.body.innerHTML = content;
		this.elem.appendChild(this.title);
		this.elem.appendChild(this.body);
	}
	setTitle({
		txt,
		className = null,
		isOverlay = false,
		isMultiText = false,
		replaceFirst = true,
		fill = null,
		textBg = null,
		alpha = 1,
		x = 0,
		y = 0,
		fz = 20,
		family = 'Arial, Helvetica, sans-serif',
		weight = ''
	} = {}) {
		if (this.cat == 'd') {
			if (nundef(this.body) || nundef(this.title)) {
				this.addFlexTitleBody();
			}
			clearElement(this.title);
			if (isdef(textBg)) this.title.style.backgroundColor = textBg;
			if (isdef(fill)) this.title.style.color = fill;
			this.title.innerHTML = txt;
			return this;
		}
		let isFirstChild = this.elem.childNodes.length == 0;
		let r = document.createElementNS('http://www.w3.org/2000/svg', 'text');
		if (isFirstChild) {
			this.ground = r;
		}
		r.setAttribute('font-family', family);
		r.setAttribute('font-weight', weight);
		if (isOverlay) {
			r.classList.add('overlay');
			this.overlay = r;
		}
		r.classList.add('msText');
		if (className) {
			r.classList.add(className);
		}
		textBg = this.setTextFill(r, fill, alpha, textBg);
		if (isFirstChild) {
			this.bgs.ground = textBg;
			this.fgs.ground = fill;
		}
		let wText = this.calcTextWidth(txt, fz, family, weight);
		if (this.isLine && !isMultiText) {
			x += this.x;
			y += this.y;
			if (this.textBackground) {
				this.elem.removeChild(this.textBackground);
			}
			this.textBackground = this.getRect({ w: wText + 10, h: fz * 1.5, fill: textBg });
			this.textBackground.setAttribute('rx', 6);
			this.textBackground.setAttribute('ry', 6);
		}
		r.setAttribute('font-size', '' + fz + 'px');
		r.setAttribute('x', x);
		r.setAttribute('y', y + fz / 2.8);
		r.setAttribute('text-anchor', 'middle');
		r.textContent = txt;
		r.setAttribute('pointer-events', 'none');
		if (replaceFirst && this.texts.length > 0) {
			let ch = this.texts[0].el;
			this.elem.insertBefore(r, ch);
			if (this.isLine) {
				this.elem.insertBefore(this.textBackground, r);
			}
			this.removeTexts();
		} else {
			if (this.isLine && !isMultiText) {
				this.elem.appendChild(this.textBackground);
			}
			this.elem.appendChild(r);
		}
		let res = { el: r, w: wText };
		this.texts.push(res);
		return res;
	}
	text({
		txt,
		className = null,
		isOverlay = false,
		isMultiText = false,
		replaceFirst = true,
		fill = null,
		bgText = null,
		alpha = 1,
		x = 0,
		y = 0,
		fz = 20,
		family = 'Arial, Helvetica, sans-serif',
		weight = '',
		font
	} = {}) {
		if (isdef(txt) && !isString(txt)) txt = txt.toString();
		if (isEmpty(txt)) {
			this.removeTexts(); return this;
		}
		let isFirstChild = this.elem.childNodes.length == 0;
		let r = document.createElementNS('http://www.w3.org/2000/svg', 'text');
		if (isFirstChild) { this.ground = r; }
		if (isdef(font)) { r.style.font = font; }
		else {
			r.setAttribute('font-family', family);
			r.setAttribute('font-weight', weight);
			r.setAttribute('font-size', '' + fz + 'px');
		}
		if (isOverlay) { r.classList.add('overlay'); this.overlay = r; }
		r.classList.add('msText');
		if (className) { r.classList.add(className); }
		bgText = this.setTextFill(r, fill, alpha, bgText);
		let wText = isdef(font) ? getTextWidth(txt, font) : this.calcTextWidth(txt, fz, family, weight);
		if (this.elem.children[0]) {
			let bParent = getBounds(this.elem.children[0]);
			if (!this.textBackground && (wText > bParent.width || isdef(bgText))) {
				if (nundef(bgText)) {
					bgText = this.elem.children[0].getAttribute('background-color');
				}
				this.textBackground = agRect(this.elem, wText + 18, fz)
				gBg(this.textBackground, bgText);
				gRounding(this.textBackground, 4);
			}
		}
		if (this.isLine && !isMultiText) {
			x += this.x;
			y += this.y;
			if (this.textBackground) {
				this.elem.removeChild(this.textBackground);
			}
			this.textBackground = this.getRect({ w: wText + 10, h: fz * 1.5, fill: bgText });
			this.textBackground.setAttribute('rx', 6);
			this.textBackground.setAttribute('ry', 6);
		}
		r.setAttribute('x', x);
		if (isdef(font)) fz = firstNumber(font);
		r.setAttribute('y', y + fz / 2.8);
		r.setAttribute('text-anchor', 'middle');
		r.textContent = txt;
		r.setAttribute('pointer-events', 'none');
		if (replaceFirst && this.texts.length > 0) {
			let ch = this.texts[0].el;
			this.elem.insertBefore(r, ch);
			if (this.isLine) {
				this.elem.insertBefore(this.textBackground, r);
			}
			this.removeTexts();
		} else {
			if (this.isLine && !isMultiText) {
				this.elem.appendChild(this.textBackground);
			}
			this.elem.appendChild(r);
		}
		let res = { txt: txt, ui: r, w: wText };
		this.texts.push(res);
		return res;
	}
	reduceFontSize(el, n) {
		let fz = el.getAttribute('font-size');
		fz = firstNumber(fz);
		if (fz > n) fz -= n;
		el.setAttribute('font-size', '' + fz + 'px');
	}
	clearText() { this.removeTexts(); }
	removeTexts() {
		for (const t of this.texts) {
			this.elem.removeChild(t.el);
			if (this.textBackground) this.elem.removeChild(this.textBackground);
		}
		this.texts = [];
	}
	multitext({
		replacePrevious = true,
		className = '',
		maxWidth = 1000,
		txt = ['one', 'two', 'three'],
		fz = 20,
		fill = null,
		textBg = null,
		padding = 1,
		alpha = 1,
		x = 0,
		y = 0,
		family = 'Arial, Helvetica, sans-serif',
		weight = 'lighter'
	}) {
		let nChar = 0;
		for (const s of txt) { nChar = Math.max(nChar, s.length); }
		let maxFH = Math.round(this.h / txt.length);
		let maxFW = Math.round((this.w / nChar) * 2);
		let fzFit = Math.min(maxFH, maxFW) - 2 * padding;
		if (fzFit < fz) fz = fzFit;
		if (fzFit > 5 * fz) fz *= 5;
		if (replacePrevious) this.removeTexts();
		let h = txt.length * (fz + padding);
		let textColors = this.computeTextColors(fill, alpha, textBg);
		if (this.isLine) {
			x += this.x;
			y += this.y;
			let tbg = this.textBackground ? this.textBackground : this.getRect();
			tbg.setAttribute('height', h);
			tbg.setAttribute('fill', textColors.bg);
			if (!this.textBackground) {
				this.textBackground = tbg;
				this.elem.appendChild(this.textBackground);
			}
			this.textBackground.setAttribute('rx', 6);
			this.textBackground.setAttribute('ry', 6);
		}
		let yStart = y - h / 2 + fz / 2;
		let maxW = 0;
		let akku = [];
		for (const t of txt) {
			let tel = this.text({
				isMultiText: true,
				replaceFirst: false,
				className: className,
				maxWidth: maxWidth,
				txt: t,
				fz: fz,
				fill: fill,
				padding: padding,
				alpha: alpha,
				x: x,
				y: yStart,
				family: family,
				weight: weight
			});
			maxW = Math.max(maxW, tel.w);
			akku.push(tel);
			yStart += fz + padding;
		}
		let isFirstChild = this.elem.childNodes.length == 0;
		if (isFirstChild || this.isLine) {
			this.ground = this.textBackground;
			this.w = maxW + 2 * padding;
			this.h = h;
		}
		if (this.isLine) {
			this.textBackground.setAttribute('width', this.w);
			this.textBackground.setAttribute('x', x - this.w / 2);
			this.textBackground.setAttribute('y', y - this.h / 2);
		}
		if (isFirstChild) { this.bgs.ground = textColors.bg; this.fg.ground = fill; }
		return this;
	}
}
class GTouchColors extends Game {
	constructor(name, o) { super(name, o); }
	start_Level() {
		super.start_Level();
		this.keys = this.keys.filter(x => containsColorWord(x));
	}
	prompt() {
		let colorKeys = choose(this.colors, this.numColors);
		let rows = this.numColors;
		let showLabels = this.lang == 'C' || this.showLabels;
		console.log('showLabels', showLabels);
		myShowPics(this.controller.evaluate.bind(this.controller), { bg: 'white' }, { showLabels: showLabels, colorKeys: colorKeys, rows: rows });
		if (this.shuffle == true) {
			let dParent = iDiv(Pictures[0]).parentNode;
			shuffleChildren(dParent);
		}
		setGoal(randomNumber(0, Pictures.length - 1));
		let [written, spoken] = getOrdinalColorLabelInstruction('click');
		show_instruction(written, dTitle, spoken);
		this.controller.activateUi.bind(this.controller)();
	}
	eval(ev) {
		ev.cancelBubble = true;
		let item = findItemFromEvent(Pictures, ev);
		Selected = { answer: item.label, reqAnswer: Goal.label, pic: item, feedbackUI: iDiv(item) };
		if (item == Goal) { return true; } else { return false; }
	}
}
class GTouchPic extends Game {
	constructor(name, o) { super(name, o); }
	prompt() {
		myShowPics(this.controller.evaluate.bind(this.controller), {}, { showLabels: (this.lang == 'C' || this.showLabels) });
		setGoal();
		let wr = 'click ';
		show_instruction(wr + `<b>${Goal.label.toUpperCase()}</b>`, dTitle, Goal.label);
		this.controller.activateUi.bind(this.controller)();
	}
}
class GTTT extends G2Player {
	startGame() {
		super.startGame();
		this.createBoard();
		this.human.sym = 'O';
		this.ai.sym = 'X';
		this.setStartPosition();
	}
	createBoard() {
		this.rows = this.cols = this.boardSize;
		this.board = new Board(this.rows, this.cols, this.controller.uiInteract.bind(this.controller));
	}
	setStartPosition() {
		return;
		let positions = [
			new Array(9).fill(null),
			['X', 'X', null, 'O', null, null, 'O', null, null],
			[null, 'X', null, 'X', null, 'O', null, 'O', null],
			[null, null, null, null, 'X', 'O', null, 'O', null],
		];
		if (isdef(this.iPosition)) {
			let idx = this.iPosition + 1; idx = idx % positions.length; this.iPosition = idx;
		} else this.iPosition = 0;
		let state = nundef(this.startPosition) || this.startPosition == 'empty' ? positions[0]
			: this.startPosition == 'random' ? chooseRandom(positions)
				: positions[this.iPosition];
		this.board.setState(state, { X: this.ai.color, O: this.human.color });
	}
	prompt() {
		let msg = this.plTurn == this.ai ? 'Ai thinking...' : 'click an empty field!';
		showInstruction('', msg, dTitle, false);
		this.controller.activateUi();
	}
	activate() {
		let pl = this.plTurn;
		let autoplay = false;
		if (autoplay || pl == this.ai) {
			if (this.ai == pl) uiActivated = false;
			setTimeout(() => AIMinimax(this, this.afterComputerMove.bind(this)), 200);
		}
	}
	interact(ev) {
		let tile = evToItemC(ev);
		if (isdef(tile.label)) return;
		let pl = this.plTurn;
		addLabel(tile, pl.sym, { fz: 60, fg: pl.color });
		this.controller.evaluate(tile);
	}
	afterComputerMove(iMove) {
		let tile = this.board.items[iMove];
		this.interact({ target: iDiv(tile) });
	}
	eval() {
		let done = this.checkFinal();
		this.gameOver = done > 0;
		if (this.gameOver) { this.winner = done > 1 ? this.plTurn : null; this.tie = done == 1; }
	}
	checkFinal(state) {
		if (nundef(state)) state = this.getState();
		let isTie = false;
		let isWin = checkWinnerTTT(state);
		if (!isWin) { isTie = checkBoardFull(state) || !checkPotentialTTT(state); }
		return isWin ? 2 : isTie ? 1 : 0;
	}
	getState() { return this.board.getState(); }
	applyMove(state, move, player) { arrReplaceAtInPlace(state, move, player.sym); }
	undoMove(state, move, player) { arrReplaceAtInPlace(state, move, ' '); }
	getAvailableMoves(state) {
		let moves = [];
		for (let i = 0; i < state.length; i++) {
			if (EmptyFunc(state[i])) moves.push(i);
		}
		shuffle(moves);
		return moves;
	}
	heuristic1(node, depth) { }
	evalState(node, depth) {
		let x = checkWinnerTTT(node);
		if (checkBoardFull(node) || x) {
			return { reached: true, val: (!x ? 0 : (10 - depth) * (x == MAXIMIZER.sym ? 1 : -1)) };
		}
		return { reached: false };
	}
	evalStateL(node, depth) {
		let key = node.join('');
		let val = DMM[key];
		let x = isdef(val) ? val : checkWinnerTTT(node);
		DMM[key] = x;
		if (checkBoardFull(node) || x) {
			return { reached: true, val: (!x ? 0 : (10 - depth) * (x == MAXIMIZER.sym ? 1 : -1)) };
		}
		return { reached: false };
	}
	evalStateL2(node, depth) {
		let full = checkBoardFull(node);
		if (full) {
			let key = JSON.stringify(node);
			let x = DMM[key];
			if (nundef(x)) DMM[key] = x = checkWinnerTTT(node);
			return { reached: true, val: (!x ? 0 : (10 - depth) * (x == MAXIMIZER.sym ? 1 : -1)) };
		} else {
			let x = checkWinnerTTT(node);
			if (x) return { reached: true, val: (!x ? 0 : (10 - depth) * (x == MAXIMIZER.sym ? 1 : -1)) };
			return { reached: false };
		}
	}
}
class GWritePic extends Game {
	constructor(name, o) { super(name, o); }
	startGame() {
		this.correctionFunc = showCorrectWordInTitle;
		onkeydown = ev => {
			if (!canAct()) return;
			if (isdef(this.inputBox)) { this.inputBox.focus(); }
		}
	}
	start_Level() {
		this.keys = setKeysG(this, filterWordByLengthG, 25);
		if (this.keys.length < 25) { this.keys = setKeysG(this, filterWordByLengthG, 25, 'all'); }
	}
	prompt() {
		let showLabels = this.showLabels == true && this.labels == true;
		myShowPics(() => mBy(this.defaultFocusElement).focus(), {}, { showLabels: showLabels });
		setGoal();
		if (this.instruction == 'all') {
			let wr = (this.language == 'E' ? 'type ' : "schreib' ");
			show_instruction(wr + `<b>${Goal.label.toUpperCase()}</b>`, dTitle, wr + Goal.label);
		} else if (this.instruction == 'spokenGoal') {
			let wr = this.language == 'E' ? 'type the correct word' : "schreib' das passende wort";
			let sp = (this.language == 'E' ? 'type' : "schreib'") + ' ' + Goal.label;
			show_instruction(wr, dTitle, sp);
		} else {
			let wr = this.language == 'E' ? 'type the correct word' : "schreib' das passende wort";
			show_instruction(wr, dTitle, wr);
		}
		mLinebreak(dTable, 20);
		this.inputBox = addNthInputElement(dTable, this.trialNumber);
		this.defaultFocusElement = this.inputBox.id;
		this.controller.activateUi.bind(this.controller)();
	}
	trialPrompt() {
		sayTryAgain();
		let n = this.trialNumber == 1 ? 1 : (this.trialNumber + Math.floor((Goal.label.length - this.trialNumber) / 2));
		showFleetingMessage(Goal.label.substring(0, n));
		mLinebreak(dTable);
		this.inputBox = addNthInputElement(dTable, this.trialNumber);
		this.defaultFocusElement = this.inputBox.id;
		return 10;
	}
	activate() {
		this.inputBox.onkeyup = ev => {
			if (!canAct()) return;
			if (ev.key === "Enter") {
				ev.cancelBubble = true;
				this.controller.evaluate.bind(this.controller)(ev);
			}
		};
		this.inputBox.focus();
	}
	eval(ev) {
		let answer = normalize(this.inputBox.value, this.language);
		let reqAnswer = normalize(Goal.label, this.language);
		let correctPrefix = this.correctPrefix = getCorrectPrefix(Goal.label, this.inputBox.value);
		Selected = { reqAnswer: reqAnswer, answer: answer, feedbackUI: iDiv(Goal) };
		if (answer == reqAnswer) { showFleetingMessage(Goal.label); return true; }
		else { return false; }
	}
}
class hexgridY {
	constructor({
		bid = 'gridY',
		rows = 4,
		cols = 4,
		w = 100,
		h = 100,
		gName = 'g',
		x = 0,
		y = 0,
		margin = 10,
		gap = 10,
		board = { level: 1, ipal: 2, bg: undefined, fg: undefined, shape: undefined, border: undefined, thickness: undefined },
		fields = { level: 6, ipal: 3, bg: undefined, fg: undefined, shape: 'hex', border: undefined, thickness: undefined },
		cities = { level: 6, ipal: 2, bg: undefined, fg: undefined, shape: 'circle', border: undefined, thickness: undefined },
		streets = { level: 6, ipal: 4, bg: undefined, fg: undefined, shape: 'line', border: 'blue', thickness: 10 }
	}) {
		this.prelim(bid, rows, cols, w, h, x, y, margin);
		this.createBoard(gName, x, y, board);
		this.createFields(bid, gName, rows, cols, gap, fields);
		addNodes(this, bid, gName, cities);
		addEdges(this, bid, gName, streets);
		drawElems(this.fields);
		drawElems(this.edges);
		drawElems(this.nodes);
	}
	prelim(bid, rows, cols, w, h, x, y, margin) {
		this.id = bid;
		rows = rows % 2 != 0 ? rows : rows + 1;
		this.topcols = cols;
		this.colarr = calc_hex_col_array(rows, this.topcols);
		this.maxcols = Math.max(...this.colarr);
		this.rows = rows;
		this.cols = cols;
		this.w = w;
		this.h = h;
		this.x = x;
		this.y = y;
		let wFieldMax = (w - 2 * margin) / this.maxcols;
		let hFieldMax = (h - 2 * margin) / rows;
		hFieldMax /= 0.75;
		let hField = (2 * this.wFieldMax) / 1.73;
		let hBoard = hField * 0.75 * rows;
		if (hBoard > h - 2 * margin) {
			this.hField = roundEven(hFieldMax);
			this.wField = roundEven((1.73 * hField) / 2);
		} else {
			this.wField = roundEven(wFieldMax);
			this.hField = roundEven((2 * this.wField) / 1.73);
		}
		this.wBoard = roundEven(this.wField * this.maxcols);
		this.hBoard = roundEven(this.hField * 0.75 * rows + this.hField / 4);
	}
	createBoard(gName, x, y, board) {
		this.board = makeElemY('board', null, gName, board.level, {
			w: this.wBoard,
			h: this.hBoard,
			x: x,
			y: y,
			ipal: board.ipal,
			bg: board.bg,
			fg: board.fg,
			shape: board.shape,
			border: board.border,
			thickness: board.thickness
		});
	}
	createFields(bid, gName, rows, cols, gap, fields) {
		this.fields = [];
		this.fieldsByRowCol = [];
		let imiddleRow = (rows - 1) / 2;
		for (let irow = 0; irow < this.colarr.length; irow++) {
			this.fieldsByRowCol[irow + 1] = [];
			let colstart = this.maxcols - this.colarr[irow];
			let y = this.hField * 0.75 * (irow - imiddleRow);
			for (let j = 0; j < this.colarr[irow]; j++) {
				var icol = colstart + 2 * j;
				let x = (icol * this.wField) / 2 + this.wField / 2 - this.wBoard / 2;
				let approx = 12;
				let field = makeElemY('field', bid, gName, fields.level, {
					row: irow + 1,
					col: icol + 1,
					w: this.wField,
					h: this.hField,
					gap: gap,
					x: x,
					y: y,
					ipal: fields.ipal,
					bg: fields.bg,
					fg: fields.fg,
					shape: fields.shape,
					border: fields.border,
					thickness: fields.thickness
				});
				this.fields.push(field.id);
				this.fieldsByRowCol[irow + 1][icol + 1] = field.id;
				field.edges = [];
				field.fields = [];
				field.nodes = [];
				let hex = [[0, -0.5], [0.5, -0.25], [0.5, 0.25], [0, 0.5], [-0.5, 0.25], [-0.5, -0.25]];
				field.poly = getPoly(hex, field.x, field.y, field.w, field.h);
				x += this.wField;
			}
		}
	}
	isValid(r, c) {
		return r in this.fields && c in this.fields[r];
	}
}
class IClass extends LiveObject {
	constructor(k, U, G, T) {
		super(k);
		this.player = {};
		copyKeys(U, this.player);
		copyKeys(G, this);
		copyKeys(T, this);
		this.running = false;
		this.uiState = this.immediateStart ? LiveObject.States.ready : LiveObject.States.none;
		this.startTime = Date.now();
		this.div = null;
	}
	loop() {
		this.update();
		this.present();
		this.activate();
	}
	getState() {
		return { players: this.players, table: this.table, options: this.options, turn: this.turn };
	}
	setState(s) {
		this.players = s.players;
		this.table = s.table;
		this.options = s.options;
		this.turn = s.turn;
	}
	present() {
		console.log('state', this.getState());
	}
	update() {
		for (const pl of this.players) this.updatePlayer(pl);
		this.updateTable();
		this.updateTurn();
		this.updateOptions(this.player);
	}
	updateOptions() { this.options = {}; }
	updatePlayer() { }
	updateTable() { this.table = {}; }
	updateTurn() { this.turn = chooseRandom(this.players).id; }
}
class ItemViewerClass {
	constructor(dParent, dButtons, keys) {
		this.options = {
			n: 100, dParent: dParent,
			wper: 100, hper: 100,
			szPic: { w: 80, h: 80 }, padding: 0, fzPic: 40,
			showLabels: true, showPic: true, fixTextFont: true,
			isUniform: true, fillArea: true, isRegular: false, hugeFont: true,
			handler: _standardHandler(this.handSelectSpecialKeys.bind(this)),
		};
		_extendOptions(this.options);
		this.options.wLongest = 'alabama';
		let items = this.allItems = genItemsFromKeys(isdef(keys) ? keys : SymKeys, this.options);
		console.log(this.allItems.length);
		this.iStart = 0;
		dButtons = mDiv(dButtons, { display: 'flex', 'flex-direction': 'column', matop: -12 });
		mButton('download', this.saveSpecialKeys.bind(this), dButtons, { outline: 'none' });
		if (this.allItems.length > 100) mButton('next', this.itemViewerNext.bind(this), dButtons, { outline: 'none', mabottom: 6, matop: 10 });
		this.itemViewerNext();
	}
	itemViewerNext() {
		let i = this.iStart;
		let options = this.options;
		let items = arrFromTo(this.allItems, i, i + options.n);
		options.n = options.N = items.length;
		this.iStart += options.n;
		clearElement(options.dArea);
		options.fzText = 20;
		items.map(x => x.label = x.key);
		items.map(x => makeItemDiv(x, options));
		items.map(x => mAppend(options.dArea, iDiv(x)));
	}
	handSelectSpecialKeys(item) {
		if (nundef(this.specialKeys)) this.specialKeys = [];
		toggleItemSelection(item, this.specialKeys);
		return this.specialKeys.map(x => x.key);
	}
	saveSpecialKeys() {
		let items = this.specialKeys;
		let dict = {};
		for (const item of items) {
			dict[item.key] = item.info;
		}
		downloadAsYaml(dict, 'specialKeys');
	}
}
class Karte {
	static random(sym = 'bee', h = 220) {
		return Karte.get(sym, h);
		return Card52.random();
	}
	static c1(info, n, fg, h, w) {
		let d = mDiv();
		let svg = mgTag('svg', d, { class: 'card', face: '2C', height: '100%', width: '100%', preserveAspectRatio: 'none', viewBox: "-120 -168 240 336" });
		let g = mgTag('g', svg);
		let rect = mgTag('rect', g, { width: 239, height: 335, x: -120, y: 168, rx: 12, ry: 12, fill: "white", stroke: "black" });
		let t = mgTag('text', g, { 'text-anchor': "middle", 'dominant-baseline': "middle", x: 0, y: 0, fill: fg }, { fz: 1000 }, 'HALLO');
		if (nundef(w)) w = h * .7;
		if (isdef(h) || isdef(w)) { mSize(d, w, h); }
		console.log('d', d)
		return { key: getUID(), div: d, w: w, h: h, faceUp: true };
	}
	static card(info, n, fg, h, w) {
		let x = `
    <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="card" 
      face="2C" height="100%" preserveAspectRatio="none" viewBox="-120 -168 240 336" width="100%">
      <symbol id="${fg}${n}" viewBox="-500 -500 1000 1000" preserveAspectRatio="xMinYMid">
        <text text-anchor="middle" dominant-baseline="middle" x="0" y="0" fill="${fg}" style="font-size:1000px;font-weight:bold;">${n}</text>        
      </symbol>
      <symbol id="${info.E}" viewBox="-500 -500 1000 1000" preserveAspectRatio="xMinYMid">
        <text text-anchor="middle" dominant-baseline="middle" x="0" y="-150" fill="red" style="font-size:750px;font-family:${info.family};">${info.text}</text>        
      </symbol>
      <rect width="239" height="335" x="-119.5" y="-167.5" rx="12" ry="12" fill="white" stroke="black"></rect>`;
		let h1 = { xs: 24, s: 27, m: 42, l: 60, xl: 70, xxl: 100 };
		let left = [0, 50, 100, 120];
		let upperLeftNumber = `<use xlink:href="#${fg}${n}" height="42" x="-120" y="-156"></use>`
			`<use xlink:href="#${info.E}" height="26.769" x="-111.784" y="-119"></use>
      <use xlink:href="#${info.E}" height="70" x="-35" y="-135.588"></use>
      <g transform="rotate(180)">
        <use xlink:href="#${fg}${n}" height="42" x="-120" y="-156"></use>
        <use xlink:href="#${info.E}" height="26.769" x="-111.784" y="-119"></use>
        <use xlink:href="#${info.E}" height="70" x="-35" y="-135.588"></use>
      </g>
    </svg>`;
		let svgCode = x;
		svgCode = '<div>' + svgCode + '</div>';
		let el = createElementFromHTML(svgCode);
		if (nundef(w)) w = h * .7;
		if (isdef(h) || isdef(w)) { mSize(el, w, h); }
		return { key: getUID(), div: el, w: w, h: h, faceUp: true };
	}
	static get52(suit, rank, fg, bg, h, w, faceUp) {
		let key = suit.toLowerCase();
		let di = {
			h: 'hearts', s: 'spades', p: 'spades', c: 'clubs', t: 'clubs', d: 'diamonds', k: 'diamonds',
			j: 'joker', '*': 'joker'
		};
		if (isdef(di[key])) key = di[key];
		let di2 = { spades: 'spade suit', hearts: 'heart suit', diamonds: 'diamond suit', clubs: 'club suit' };
		if (isdef(di2[key])) key = di2[key];
		let info = Syms[key];
		return Karte.get(key, 300, rank, fg);
		let fz = info.family == 'emoNoto' ? 750 : 1000;
	}
	static get(sym = 'bee', h = 110, n = 2, fg = 'indigo', w) {
		let info = Syms[sym];
		n = 2;
		ensureColorNames();
		if (nundef(fg)) fg = sym == 'spades' || sym == 'clubs' ? 'black' : sym == 'hearts' || sym == 'diamonds' ? 'red' : chooseRandom(Object.keys(ColorNames));
		let cardKey = info.family == 'emoNoto' ? 'card0' : 'card52';
		let basic = {
			card0: `
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="card" 
        face="2C" height="100%" preserveAspectRatio="none" viewBox="-120 -168 240 336" width="100%">
          <symbol id="${fg}${n}" viewBox="-500 -500 1000 1000" preserveAspectRatio="xMinYMid">
            <text text-anchor="middle" dominant-baseline="middle" x="0" y="0" fill="${fg}" style="font-size:1000px;font-weight:bold;">${n}</text>        
          </symbol>
          <symbol id="${info.E}" viewBox="-500 -500 1000 1000" preserveAspectRatio="xMinYMid">
            <text text-anchor="middle" dominant-baseline="middle" x="0" y="-150" fill="red" style="font-size:750px;font-family:${info.family};">${info.text}</text>        
          </symbol>
          <rect width="239" height="335" x="-119.5" y="-167.5" rx="12" ry="12" fill="white" stroke="black"></rect>
          <use xlink:href="#${fg}${n}" height="42" x="-118" y="-156"></use>
          <use xlink:href="#${info.E}" height="26.769" x="-111.784" y="-119"></use>
          <use xlink:href="#${info.E}" height="70" x="-35" y="-135.588"></use>
          <g transform="rotate(180)">
            <use xlink:href="#${fg}${n}" height="42" x="-118" y="-156"></use>
            <use xlink:href="#${info.E}" height="26.769" x="-111.784" y="-119"></use>
            <use xlink:href="#${info.E}" height="70" x="-35" y="-135.588"></use>
          </g>
        </svg>`,
			card52: `
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="card" 
        face="2C" height="100%" preserveAspectRatio="none" viewBox="-120 -168 240 336" width="100%">
          <symbol id="${fg}${n}" viewBox="-500 -500 1000 1000" preserveAspectRatio="xMinYMid">
            <text text-anchor="middle" dominant-baseline="middle" x="0" y="0" fill="${fg}" style="font-size:1000px;font-family:opensans;">${n}</text>        
          </symbol>
          <symbol id="${info.E}" viewBox="-500 -500 1000 1000" preserveAspectRatio="xMinYMid">
            <text text-anchor="middle" dominant-baseline="middle" x="0" y="50" fill="${fg}" style="font-size:800px;font-family:${info.family};">${info.text}</text>        
          </symbol>
          <rect width="239" height="335" x="-119.5" y="-167.5" rx="12" ry="12" fill="white" stroke="black"></rect>
          <use xlink:href="#${fg}${n}" height="40" x="-116.4" y="-156"></use>
          <use xlink:href="#${info.E}" height="26.769" x="-111.784" y="-119"></use>
          <use xlink:href="#${info.E}" height="70" x="-35" y="-135.588"></use>
          <g transform="rotate(180)">
            <use xlink:href="#${fg}${n}" height="40" x="-116.4" y="-156"></use>
            <use xlink:href="#${info.E}" height="26.769" x="-111.784" y="-119"></use>
            <use xlink:href="#${info.E}" height="70" x="-35" y="-135.588"></use>
          </g>
        </svg>`,
			card7: `
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="card" 
        face="2C" height="100%" preserveAspectRatio="none" viewBox="-120 -168 240 336" width="100%">
          <symbol id="VC2" viewBox="-500 -500 1000 1000" preserveAspectRatio="xMinYMid">
            <text text-anchor="middle" dominant-baseline="middle" x="0" y="0" fill="red" style="font-size:750px;font-family:opensans;">A</text>        
          </symbol>
          <rect width="239" height="335" x="-119.5" y="-167.5" rx="12" ry="12" fill="white" stroke="black"></rect>
          <use xlink:href="#VC2" height="32" x="-114.4" y="-156"></use>
          <use xlink:href="#VC2" height="26.769" x="-111.784" y="-119"></use>
          <use xlink:href="#VC2" height="70" x="-35" y="-135.588"></use>
          <g transform="rotate(180)">
            <use xlink:href="#VC2" height="32" x="-114.4" y="-156"></use>
            <use xlink:href="#VC2" height="26.769" x="-111.784" y="-119"></use>
            <use xlink:href="#VC2" height="70" x="-35" y="-135.588"></use>
          </g>
        </svg>`,
			card6: `
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="card" 
        face="2C" height="100%" preserveAspectRatio="none" viewBox="-120 -168 240 336" width="100%">
          <symbol id="VC2" viewBox="-500 -500 1000 1000" preserveAspectRatio="xMinYMid">
            <text text-anchor="middle" dominant-baseline="middle" x="0" y="0" fill="red" style="font-size:750px;font-family:opensans;">A</text>        
          </symbol>
          <rect width="239" height="335" x="-119.5" y="-167.5" rx="12" ry="12" fill="white" stroke="black"></rect>
          <use xlink:href="#VC2" height="32" x="-114.4" y="-156"></use>
        </svg>`,
			card5: `
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="card" 
        face="2C" height="100%" preserveAspectRatio="none" viewBox="-120 -168 240 336" width="100%">
          <symbol id="SC2" viewBox="-600 -600 1200 1200" preserveAspectRatio="xMinYMid">
            <path d="M30 150C35 385 85 400 130 500L-130 500C-85 400 -35 385 -30 150A10 10 0 0 0 -50 150A210 210 0 1 1 -124 -51A10 10 0 0 0 -110 -65A230 230 0 1 1 110 -65A10 10 0 0 0 124 -51A210 210 0 1 1 50 150A10 10 0 0 0 30 150Z" 
              fill="black">
            </path>
          </symbol>
          <symbol id="VC2" viewBox="-500 -500 1000 1000" preserveAspectRatio="xMinYMid">
            <path d="M-225 -225C-245 -265 -200 -460 0 -460C 200 -460 225 -325 225 -225C225 -25 -225 160 -225 460L225 460L225 300" 
              stroke="black" stroke-width="80" stroke-linecap="square" stroke-miterlimit="1.5" fill="none">
            </path>
          </symbol>
          <rect width="239" height="335" x="-119.5" y="-167.5" rx="12" ry="12" fill="white" stroke="black"></rect>
          <use xlink:href="#VC2" height="32" x="-114.4" y="-156"></use>
          <use xlink:href="#SC2" height="26.769" x="-111.784" y="-119"></use>
          <use xlink:href="#SC2" height="70" x="-35" y="-135.588"></use>
          <g transform="rotate(180)">
            <use xlink:href="#VC2" height="32" x="-114.4" y="-156"></use>
            <use xlink:href="#SC2" height="26.769" x="-111.784" y="-119"></use>
            <use xlink:href="#SC2" height="70" x="-35" y="-135.588"></use>
          </g>
          <text text-anchor="middle" dominant-baseline="middle" x="0" y="0" fill="red" style="font-size:16px;font-family:opensans;">I love SVG!</text>        
          <text text-anchor="middle" dominant-baseline="hanging" x="0" y="-156" fill="blue" style="font-size:16px;font-family:opensans;">YES</text>        
          <text text-anchor="middle" dominant-baseline="hanging" x="0" y="-156" fill="green" transform="rotate(180)" style="font-size:16px;font-family:opensans;">YES</text>        
        </svg>`,
			card4: `
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="card" 
        face="2C" height="100%" preserveAspectRatio="none" viewBox="-120 -168 240 336" width="100%">
          <symbol id="VC2" viewBox="-500 -500 1000 1000" preserveAspectRatio="xMinYMid">
            <text dominant-baseline="hanging" text-anchor="middle" x="0" y="0" fill="red" style="font-size:600px;font-family:${info.family};">${info.text}</text>        
          </symbol>
          <rect width="239" height="335" x="-119.5" y="-167.5" rx="12" ry="12" fill="white" stroke="black"></rect>
          <use xlink:href="#VC2" height="32" x="-114.4" y="-156" dominant-baseline="hanging" text-anchor="middle" ></use>
          <g transform="rotate(180)">
            <use xlink:href="#VC2" height="32" x="-114.4" y="-156" dominant-baseline="hanging" text-anchor="middle" ></use>
          </g>
          <text dominant-baseline="hanging" text-anchor="middle" x="0" y="0" fill="red" style="font-size:600px;font-family:${info.family};">${info.text}</text>        
          <text text-anchor="middle" dominant-baseline="middle" x="0" y="0" fill="red" style="font-size:16px;font-family:opensans;">I love SVG!</text>        
          <text text-anchor="middle" dominant-baseline="hanging" x="0" y="-156" fill="blue" style="font-size:16px;font-family:opensans;">YES</text>        
          <text text-anchor="middle" dominant-baseline="hanging" x="0" y="-156" fill="green" transform="rotate(180)" style="font-size:16px;font-family:opensans;">YES</text>        
        </svg>`,
			card3: `
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="card" 
        face="2C" height="100%" preserveAspectRatio="none" viewBox="-120 -168 240 336" width="100%">
          <rect width="239" height="335" x="-119.5" y="-167.5" rx="12" ry="12" fill="white" stroke="black"></rect>
          <text dominant-baseline="hanging" x="-114" y="-156" fill="red" style="font-size:30px;font-family:${info.family};">${info.text}</text>        
          <text  text-anchor="end" dominant-baseline="hanging" x="114" y="-156" fill="red" style="font-size:30px;font-family:${info.family};">${info.text}</text>        
          <text text-anchor="middle" dominant-baseline="hanging" x="0" y="-156" fill="blue" style="font-size:16px;font-family:opensans;">YES</text>        
          <text text-anchor="middle" dominant-baseline="middle" x="0" y="0" fill="red" style="font-size:16px;font-family:opensans;">I love SVG!</text>        
          <g transform="rotate(180)">
            <text dominant-baseline="hanging" x="-114" y="-156" fill="red" style="font-size:30px;font-family:${info.family};">${info.text}</text>        
            <text  text-anchor="end" dominant-baseline="hanging" x="114" y="-156" fill="red" style="font-size:30px;font-family:${info.family};">${info.text}</text>        
            <text text-anchor="middle" dominant-baseline="hanging" x="0" y="-156" fill="blue" style="font-size:16px;font-family:opensans;">YES</text>        
          </g>
        </svg>`,
			card2: `
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="card" 
        face="2C" height="100%" preserveAspectRatio="none" viewBox="-120 -168 240 336" width="100%">
          <symbol id="VC2" viewBox="-500 -500 1000 1000" preserveAspectRatio="xMinYMid">
            <text text-anchor="middle" dominant-baseline="middle" x="0" y="0" fill="red" style="font-size:500px;font-family:${info.family};">${info.text}</text>        
          </symbol>
          <rect width="239" height="335" x="-119.5" y="-167.5" rx="12" ry="12" fill="white" stroke="black"></rect>
          <text dominant-baseline="hanging" x="-114" y="-156" fill="red" style="font-size:30px;font-family:${info.family};">${info.text}</text>        
          <text  text-anchor="end" dominant-baseline="hanging" x="114" y="-156" fill="red" style="font-size:30px;font-family:${info.family};">${info.text}</text>        
          <text text-anchor="middle" dominant-baseline="hanging" x="0" y="-156" fill="blue" style="font-size:16px;font-family:opensans;">YES</text>        
          <text text-anchor="middle" dominant-baseline="middle" x="0" y="0" fill="red" style="font-size:16px;font-family:opensans;">I love SVG!</text>        
          <g transform="rotate(180)">
            <text dominant-baseline="hanging" x="-114" y="-156" fill="red" style="font-size:30px;font-family:${info.family};">${info.text}</text>        
            <text  text-anchor="end" dominant-baseline="hanging" x="114" y="-156" fill="red" style="font-size:30px;font-family:${info.family};">${info.text}</text>        
            <text text-anchor="middle" dominant-baseline="hanging" x="0" y="-156" fill="blue" style="font-size:16px;font-family:opensans;">YES</text>        
          </g>
        </svg>`,
			card1: `
        <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" class="card" 
        face="2C" height="100%" preserveAspectRatio="none" viewBox="-120 -168 240 336" width="100%">
          <symbol id="VC2">
          </symbol>
          <rect width="239" height="335" x="-119.5" y="-167.5" rx="12" ry="12" fill="white" stroke="black"></rect>
          <use xlink:href="#VC2" height="32" x="-114.4" y="-156"></use>
          <use xlink:href="#VC2" height="32" x="0" y="0"></use>
          <text text-anchor="middle" dominant-baseline="middle" x="0" y="0" fill="red" style="font-size:16px;font-family:opensans;">I love SVG!</text>        
          <g transform="rotate(180)">
            <text dominant-baseline="hanging" x="-114" y="-156" fill="red" style="font-size:30px;font-family:${info.family};">${info.text}</text>        
            <text text-anchor="end" dominant-baseline="hanging" x="114" y="-156" fill="red" style="font-size:30px;font-family:${info.family};">${info.text}</text>        
            <text text-anchor="middle" dominant-baseline="hanging" x="0" y="-156" fill="blue" style="font-size:16px;font-family:opensans;">YES</text>        
          </g>
        </svg>`
		};
		let svgCode = basic[cardKey];
		svgCode = '<div>' + svgCode + '</div>';
		let el = createElementFromHTML(svgCode);
		if (nundef(w)) w = h * .7;
		if (isdef(h) || isdef(w)) { mSize(el, w, h); }
		return { key: getUID(), div: el, w: w, h: h, faceUp: true };
	}
}
class KeySelection {
}
class Layout1 extends Array {
	constructor(id, shape = 'grid', rows = 3, cols = 3, options = {}) {
		console.log(';;;;;;;;;', id, shape, rows, cols, options)
		var fields = Array(rows)
			.fill()
			.map(() => Array(cols).fill(0));
		super(...fields);
		this.options = options;
		this.msBase = null;
		this.id = id;
		this.rows = rows;
		this.cols = cols;
		this.shape = shape;
	}
	addRow(...values) {
		this.push(values);
	}
	addCol() {
		let i = 0; let val = arguments;
		for (const row of this) {
			row.push(val[i]);
		}
		for (let index = this.length; index < val.length; index++) {
			this.push([val[index]]);
		}
	}
	getPos(r, c) { return this.msBase.getPos; }
	setCols(c) { }
	setRows(r) { }
	setShape(shape) { }
	isValidIndex(r, c) { return this[r][c]; }
	render() { this.renderBase }
	renderField(r, c) { }
	setOption(key, value) { }
}
class LazyCache {
	constructor(resetStorage = false) {
		this.caches = {};
		if (resetStorage) localStorage.clear();
	}
	get(key) { return this.caches[key]; }
	asDict(key) { return this.caches[key].live; }
	getRandom(key) { let d = this.asDict(key); return chooseRandom(Object.values(d)); }
	getRandomKey(key) { return getRandomKey(this.asDict(key)); }
	getFirstKey(key, cond) { return firstCondDictKeys(this.asDict(key), cond); }
	invalidate(...keys) { for (const k of keys) if (this.caches[k]) this.caches[k].invalidate(); }
	async load(primKey, loaderFunc, reload = false, useLocal = true) {
		let cd = new CacheDict(primKey, { func: loaderFunc }, useLocal);
		this.caches[primKey] = cd;
		if (reload) await cd.reload(); else await cd.load();
		let handler = {
			get: function (target, name) { return target.live[name]; },
			set: function (target, name, val) { target.live[name] = val; return true; },
			has: function (target, name) { return name in target.live; },
			delete: function (target, name) { return delete target.live[name]; },
		};
		let proxy = new Proxy(cd, handler);
		return proxy;
	}
}
class LiveObject {
	static States = { none: 0, gettingReady: 1, ready: 2, running: 3, on: 3, off: 4 }
	constructor(k) {
		this.key = k;
		let id = this.id = getUID();
		Live[id] = this;
		this.TOList = [];
		this.UIS = [];
		this.uiActivated = false;
		this.uiState = LiveObject.States.none;
	}
	//#region hidden API
	_clearTO() { this.TOList.map(x => clearTimeout(x)); this.TOList = []; }
	_clearUI() { }
	//#endregion
	activate() { this.uiActivated = true; }
	clear() { this._clearTO(); }
	deactivate() { this.uiActivated = false; }
	die() { this._clearTO(); console.assert(isdef(this.div)); this.div.remove(); Live[this.id] = null; }
	run() { console.log('object', this.id, 'is running...') }
	setGettingReady() { this.running = false; this.uiState = LiveObject.States.gettingReady; console.log('...getting ready!'); }
	setRunning() { this.running = true; this.uiState = LiveObject.States.running; }
	setReady() { this.running = false; this.uiState = LiveObject.States.ready; console.log('ready!'); }
	getReady(ms) {
		if (isdef(ms)) { this.setGettingReady(); setTimeout(this.setReady.bind(this), ms); }
		else this.setReady();
	}
}
class MaxWidthPreserver {
	constructor() {
		this.entries = {};
		this.resizeObserver = new ResizeObserver(this.handler.bind(this));
	}
	handler(entries) {
		for (let entry of entries) {
			let domel = entry.target;
			let cs = window.getComputedStyle(entry.target);
			let w = firstNumber(cs.width);
			let id = domel.id;
			let x = this.entries[id];
			if (isdef(x)) {
				if (w < x.minWidth && Math.abs(w - x.minWidth) > 1) {
					w = x.minWidth;
					domel.style.minWidth = w + 'px';
				}
				x.minWidth = w;
			}
		}
	}
	add(id) {
		let entry = this.entries[id] = { elem: mBy(id) };
		let cs = window.getComputedStyle(entry.elem);
		this.resizeObserver.observe(mBy(id));
		entry.minWidth = firstNumber(cs.width);
	}
	reset(id) { this.entries[id].elem.styles.minWidth = this.entries[id].minWidth = 0; }
}
class MazeGraph extends AGraph {
	constructor(dParent, rows, cols, sz, gap = 4) {
		super();
		[this.cols, this.rows, this.sz, this.gap] = [cols, rows, sz, gap];
		let m = this.m = this.createMaze(cols, rows, sz, gap);
		let dMaze = this.dMaze = this.createDiv(dParent, cols, rows, sz, gap);
		let szMaze = getSize(dMaze);
		let dGraph = this.dGraph = mDiv(dParent, { align: 'left', w: szMaze.w, h: szMaze.h, bg: 'pink', maleft: 20 });
		let sb = this.sb = mDiv(dParent, { w: 40 }); mCenterCenterFlex(this.sb);
		hide(dGraph); hide(sb);
		this.items = this.createCellItems();
	}
	getTopLeftCell() { return this.getCell(0, 0); }
	getTopRightCell() { return this.getCell(0, this.cols - 1); }
	getBottomLeftCell() { return this.getCell(this.rows - 1, 0); }
	getBottomRightCell() { return this.getCell(this.rows - 1, this.cols - 1); }
	getCell(row, col) { return this.matrix[row][col]; }
	getCommonId(row, col) { return '' + row + "-" + col; }
	getCommonIdTable(row, col) { return 'td_' + this.getCommonId(row, col); }
	getRCI(edgeId) {
		let [r1, c1, r2, c2] = allNumbers(edgeId).map(x => Math.abs(x));
		let i1, i2;
		i1 = r1 < r2 ? 2 : r1 > r2 ? 0 : c1 < c2 ? 1 : 3;
		i2 = i1 == 0 ? 2 : i1 == 1 ? 3 : i1 == 2 ? 0 : 1;
		return [r1, c1, i1, r2, c2, i2];
	}
	getRelativeDirections(item1, item2) {
		let [r1, c1, r2, c2] = [item1.row, item1.col, item2.row, item2.col];
		let i1, i2;
		i1 = r1 < r2 ? 2 : r1 > r2 ? 0 : c1 < c2 ? 1 : 3;
		i2 = i1 == 0 ? 2 : i1 == 1 ? 3 : i1 == 2 ? 0 : 1;
		return [i1, i2];
	}
	createCellItems() {
		let items = [];
		this.matrix = [];
		for (let r = 0; r < this.rows; r++) {
			this.matrix[r] = [];
			for (let c = 0; c < this.cols; c++) {
				let id = this.getCommonId(r, c);
				let item = { id: id, nid: id, nodeId: id, cellId: this.getCommonIdTable(r, c), row: r, col: c, sz: this.sz, marr: this.m[r, c] };
				delete Items[id];
				iAdd(item, { div: mBy(this.getCommonIdTable(r, c)) });
				items.push(item);
				this.matrix[r][c] = item;
			}
		}
		return items;
	}
	createDiv(dParent, cols, rows, sz, gap) {
		let [wCell, hCell] = [sz, sz];
		let [wTotal, hTotal] = [cols * (wCell + gap), rows * (hCell + gap)];
		let dGridOuter = this.dMaze = mDiv(dParent, { bg: 'BLUE', wmin: wTotal, hmin: hTotal });
		let m = this.m;
		let id = 'tMaze';
		setCSSVariable('--wCell', `${wCell}px`);
		setCSSVariable('--hCell', `${hCell}px`);
		let tMaze = createElementFromHtml(`
      <table id="${id}">
      <tbody></tbody>
      </table>
    `);
		mAppend(dGridOuter, tMaze);
		let sBorder = `${gap}px solid black`;
		for (var i = 0; i < m.length; i++) {
			$('#tMaze > tbody').append("<tr>");
			for (var j = 0; j < m[i].length; j++) {
				var selector = this.getCommonIdTable(i, j);
				$('#tMaze > tbody').append("<td id='" + selector + "'>&nbsp;</td>");
				if (m[i][j][0] == 0) { $('#' + selector).css('border-top', sBorder); }
				if (m[i][j][1] == 0) { $('#' + selector).css('border-right', sBorder); }
				if (m[i][j][2] == 0) { $('#' + selector).css('border-bottom', sBorder); }
				if (m[i][j][3] == 0) { $('#' + selector).css('border-left', sBorder); }
			}
			$('tMmaze > tbody').append("</tr>");
		}
		return dGridOuter;
	}
	createMaze(cols, rows, sz, gap) {
		var dxy = sz + 2 * gap;
		var offs = dxy / 2 + gap;
		var totalCells = cols * rows;
		var cells = new Array();
		var unvis = new Array();
		for (var i = 0; i < rows; i++) {
			cells[i] = new Array();
			unvis[i] = new Array();
			for (var j = 0; j < cols; j++) {
				cells[i][j] = [0, 0, 0, 0];
				let pos = { x: offs + dxy * j, y: offs + dxy * i };
				this.addNode({ id: this.getCommonId(i, j), row: i, col: j, center: pos }, pos);
				unvis[i][j] = true;
			}
		}
		var currentCell = [Math.floor(Math.random() * rows), Math.floor(Math.random() * cols)];
		var path = [currentCell];
		unvis[currentCell[0]][currentCell[1]] = false;
		var visited = 1;
		while (visited < totalCells) {
			var pot = [[currentCell[0] - 1, currentCell[1], 0, 2],
			[currentCell[0], currentCell[1] + 1, 1, 3],
			[currentCell[0] + 1, currentCell[1], 2, 0],
			[currentCell[0], currentCell[1] - 1, 3, 1]];
			var neighbors = new Array();
			for (var l = 0; l < 4; l++) {
				if (pot[l][0] > -1 && pot[l][0] < rows && pot[l][1] > -1 && pot[l][1] < cols && unvis[pot[l][0]][pot[l][1]]) { neighbors.push(pot[l]); }
			}
			if (neighbors.length) {
				let next = neighbors[Math.floor(Math.random() * neighbors.length)];
				cells[currentCell[0]][currentCell[1]][next[2]] = 1;
				cells[next[0]][next[1]][next[3]] = 1;
				let row = currentCell[0];
				let col = currentCell[1];
				let row2 = next[0];
				let col2 = next[1];
				this.addEdge(this.getCommonId(row, col), this.getCommonId(row2, col2), {});
				unvis[next[0]][next[1]] = false;
				visited++;
				currentCell = [next[0], next[1]];
				path.push(currentCell);
			}
			else {
				currentCell = path.pop();
			}
		}
		return cells;
	}
	setItemBorder(item, dir) {
		let prop = getBorderPropertyForDirection(dir);
		iDiv(item).style[prop] = `${this.gap}px solid black`;
	}
	setItemColor(item, color) { mStyleX(iDiv(item), { bg: color }); }
	setItemContent(item, text) { iDiv(item).innerHTML = text; }
	removeItemContent(item) { iDiv(item).innerHTML = ''; }
	disconnectCells(nid1, nid2) {
		this.removeEdge(this.getCommonEdgeId(nid1, nid2));
		let [item1, item2] = [Items[nid1], Items[nid2]];
		let [dir1, dir2] = this.getRelativeDirections(item1, item2);
		this.setItemBorder(item1, dir1);
		this.setItemBorder(item2, dir2);
	}
	cutPath(path, min, max) {
		let edges = path.edges();
		let len = edges.length;
		let [imin, imax] = [Math.floor(len * min), Math.floor(len * max)];
		let i = randomNumber(imin, imax);
		let edge = edges[i];
		let [nid1, nid2] = edge.connectedNodes().map(x => x.id());
		this.disconnectCells(nid1, nid2);
	}
	breadCrumbs(path, color = 'sienna', sz = 10) {
		for (const cell of path.nodes().map(x => Items[x.id()])) {
			mCellContent(iDiv(cell), { w: sz, h: sz, bg: color, fg: 'white', rounding: '50%' });
		}
	}
	colorComponents() {
		let comps = this.getComponents();
		let wheel = getColorWheel('red', comps.length);
		let i = 0;
		for (const comp of comps) {
			this.breadCrumbs(comp, wheel[i], 20); i += 1;
		}
	}
	showGraph() {
		this.dGraph.style.opacity = 1;
		if (this.hasVisual) { show(this.dGraph); return; }
		this.addVisual(this.dGraph);
		this.storeCurrentPositions();
		this.addLayoutControls(this.sb, ['show', 'hide', 'prest', 'grid', 'klay', 'rand', 'euler', 'reset', 'store']);
	}
	hideGraph() {
		if (isdef(this.dGraph) && this.hasVisual) {
			this.dGraph.style.display = 'none';
		}
	}
}
class MK { }
class MKManager {
	clear() { this.clearUIS(); this.clearDONE(); }
	clearUIS() {
		UIS = {};
		IdOwner = {};
		id2oids = {};
		oid2ids = {};
		id2uids = {};
		UIDCounter = 0;
	}
	getDone(oid) { return DONE[oid]; }
	setDone(oid) { DONE[oid] = true; }
	clearDONE() { DONE = {}; }
}
class MOBJ {
	constructor() {
		this.children = [];
		this.parts = {};
		this.handlers = { click: {}, mouseenter: {}, mouseleave: {} };
		this.isAttached = false;
		this.texts = [];
		this.refs = {};
		this.isa = {};
		this.orig = {};
		this.bgs = {};
		this.fgs = {};
	}
	//#region picto
	pictoImage(key, fg, sz) {
		this._picto(key, 0, 0, sz, sz, fg);
		this.isPicto = true;
		this.picto = this.elem.children[1];
		this.texts = [];
	}
	_picto(key, x, y, w, h, fg, bg) {
		let ch = getTypeOf(iconChars) == 'Object' ? iconChars[key] : iconChars.get(key);
		if (!ch) ch = iconChars.get('crow');
		return this._pictoFromChar(ch, x, y, w, h, fg, bg);
	}
	_pictoFromChar(ch, x, y, w, h, fg, bg) {
		let family = (ch[0] == 'f' || ch[0] == 'F') ? 'pictoFa' : 'pictoGame';
		let text = String.fromCharCode('0x' + ch);
		return this._pictoFromHexString(text, family, x, y, w, h, fg, bg);
	}
	_pictoFromHexString(text, family, x, y, w, h, fg, bg) {
		if (this.cat == 'g') {
			if (isdef(bg)) this.rect({ w: w, h: h, fill: bg, x: x, y: y });
			this.text({ txt: text, family: family, weight: 900, x: x, y: y, fz: h, fill: fg });
			this.orig.fg = fg;
			return this;
		} else {
		}
	}
	//#endregion
	//#region text
	computeTextColors(fill, alpha = 1, textBg = null) {
		fill = fill ? fill : this.fg ? this.fg : textBg ? colorIdealText(textBg) : this.bg ? colorIdealText(this.bg) : null;
		if (!fill) {
			fill = 'white';
			textBg = 'gray';
		}
		fill = anyColorToStandardString(fill, alpha);
		return { fill: fill, bg: textBg ? textBg : this.bg };
	}
	setTextFill(r, fill, alpha = 1, textBg = null) {
		let textColors = this.computeTextColors(fill, alpha, textBg);
		r.setAttribute('fill', textColors.fill);
		r.setAttribute('stroke', 'none');
		r.setAttribute('stroke-width', 0);
		return textColors.bg;
	}
	setTextBorder(color, thickness = 0) {
		let c = anyColorToStandardString(color);
		let children = arrChildren(this.elem);
		unitTestMS('setTextBorder', children);
		for (const ch of children) {
			let t = getTypeOf(ch);
			if (t == 'text' || t == 'line') {
				ch.setAttribute('stroke-width', thickness);
				ch.setAttribute('stroke', c);
			}
		}
	}
	calcTextWidth(txt, fz, family, weight) {
		let sFont = weight + ' ' + fz + 'px ' + family;
		sFont = sFont.trim();
		let wText = getTextWidth(txt, sFont);
		return wText;
	}
	addFrame(color) {
		if (this.cat == 'd') {
			this.body.style.boxSizing = 'border-box';
			this.body.style.border = '5px solid ' + color;
		}
	}
	addFlexTitleBody() {
		let content = this.elem.innerHTML;
		clearElement(this.elem);
		let d = this.elem;
		d.style.display = 'flex';
		d.style.flexDirection = 'column';
		let dTitle = document.createElement('div');
		this.title = dTitle;
		this.title.style.padding = '6px';
		this.title.style.textAlign = 'center';
		let dBody = document.createElement('div');
		dBody.style.flexGrow = 1;
		dBody.style = "flex-grow:1;overflow:auto;padding:0px 6px"
		this.body = dBody;
		this.body.innerHTML = content;
		this.elem.appendChild(this.title);
		this.elem.appendChild(this.body);
	}
	setTitle({
		txt,
		className = null,
		isOverlay = false,
		isMultiText = false,
		replaceFirst = true,
		fill = null,
		textBg = null,
		alpha = 1,
		x = 0,
		y = 0,
		fz = 20,
		family = 'Arial, Helvetica, sans-serif',
		weight = ''
	} = {}) {
		if (this.cat == 'd') {
			if (nundef(this.body) || nundef(this.title)) {
				this.addFlexTitleBody();
			}
			clearElement(this.title);
			if (isdef(textBg)) this.title.style.backgroundColor = textBg;
			if (isdef(fill)) this.title.style.color = fill;
			this.title.innerHTML = txt;
			return this;
		}
		let isFirstChild = this.elem.childNodes.length == 0;
		let r = document.createElementNS('http://www.w3.org/2000/svg', 'text');
		if (isFirstChild) {
			this.ground = r;
		}
		r.setAttribute('font-family', family);
		r.setAttribute('font-weight', weight);
		if (isOverlay) {
			r.classList.add('overlay');
			this.overlay = r;
		}
		r.classList.add('msText');
		if (className) {
			r.classList.add(className);
		}
		textBg = this.setTextFill(r, fill, alpha, textBg);
		if (isFirstChild) {
			this.bgs.ground = textBg;
			this.fgs.ground = fill;
		}
		let wText = this.calcTextWidth(txt, fz, family, weight);
		if (this.isLine && !isMultiText) {
			x += this.x;
			y += this.y;
			if (this.textBackground) {
				this.elem.removeChild(this.textBackground);
			}
			this.textBackground = this.getRect({ w: wText + 10, h: fz * 1.5, fill: textBg });
			this.textBackground.setAttribute('rx', 6);
			this.textBackground.setAttribute('ry', 6);
		}
		r.setAttribute('font-size', '' + fz + 'px');
		r.setAttribute('x', x);
		r.setAttribute('y', y + fz / 2.8);
		r.setAttribute('text-anchor', 'middle');
		r.textContent = txt;
		r.setAttribute('pointer-events', 'none');
		if (replaceFirst && this.texts.length > 0) {
			let ch = this.texts[0].el;
			this.elem.insertBefore(r, ch);
			if (this.isLine) {
				this.elem.insertBefore(this.textBackground, r);
			}
			this.removeTexts();
		} else {
			if (this.isLine && !isMultiText) {
				this.elem.appendChild(this.textBackground);
			}
			this.elem.appendChild(r);
		}
		let res = { el: r, w: wText };
		this.texts.push(res);
		return res;
	}
	text({
		txt,
		className = null,
		isOverlay = false,
		isMultiText = false,
		replaceFirst = true,
		fill = null,
		textBg = null,
		alpha = 1,
		x = 0,
		y = 0,
		fz = 20,
		family = 'Arial, Helvetica, sans-serif',
		weight = ''
	} = {}) {
		if (this.cat == 'd') {
			if (isEmpty(txt)) {
				this.elem.innerHTML = ''; return this;
			}
			this.elem.style.textAlign = 'center';
			this.elem.style.color = fill ? fill : this.fg ? this.fg : 'white';
			let margin = this.h / 2 - fz / 2;
			this.elem.innerHTML = `<div style='margin-top:${margin}px;font-size:${fz}px;'>${txt}</div>`;
			this.elem.boxSizing = 'border-box';
			return this;
		}
		if (isdef(txt) && !isString(txt)) txt = txt.toString();
		if (isEmpty(txt)) {
			this.removeTexts(); return this;
		}
		let isFirstChild = this.elem.childNodes.length == 0;
		let r = document.createElementNS('http://www.w3.org/2000/svg', 'text');
		if (isFirstChild) {
			this.ground = r;
		}
		r.setAttribute('font-family', family);
		r.setAttribute('font-weight', weight);
		if (isOverlay) {
			r.classList.add('overlay');
			this.overlay = r;
		}
		r.classList.add('msText');
		if (className) {
			r.classList.add(className);
		}
		textBg = this.setTextFill(r, fill, alpha, textBg);
		if (isFirstChild) {
			this.bgs.ground = textBg;
			this.fgs.ground = fill;
		}
		let wText = this.calcTextWidth(txt, fz, family, weight);
		if (this.isLine && !isMultiText) {
			x += this.x;
			y += this.y;
			if (this.textBackground) {
				this.elem.removeChild(this.textBackground);
			}
			this.textBackground = this.getRect({ w: wText + 10, h: fz * 1.5, fill: textBg });
			this.textBackground.setAttribute('rx', 6);
			this.textBackground.setAttribute('ry', 6);
		}
		r.setAttribute('font-size', '' + fz + 'px');
		r.setAttribute('x', x);
		r.setAttribute('y', y + fz / 2.8);
		r.setAttribute('text-anchor', 'middle');
		r.textContent = txt;
		r.setAttribute('pointer-events', 'none');
		if (replaceFirst && this.texts.length > 0) {
			let ch = this.texts[0].el;
			this.elem.insertBefore(r, ch);
			if (this.isLine) {
				this.elem.insertBefore(this.textBackground, r);
			}
			this.removeTexts();
		} else {
			if (this.isLine && !isMultiText) {
				this.elem.appendChild(this.textBackground);
			}
			this.elem.appendChild(r);
		}
		let res = { el: r, w: wText };
		this.texts.push(res);
		return res;
	}
	reduceFontSize(el, n) {
		let fz = el.getAttribute('font-size');
		fz = firstNumber(fz);
		if (fz > n) fz -= n;
		el.setAttribute('font-size', '' + fz + 'px');
	}
	clearText() { this.removeTexts(); }
	removeTexts() {
		for (const t of this.texts) {
			this.elem.removeChild(t.el);
		}
		this.texts = [];
	}
	multitext({
		replacePrevious = true,
		className = '',
		maxWidth = 1000,
		txt = ['one', 'two', 'three'],
		fz = 20,
		fill = null,
		textBg = null,
		padding = 1,
		alpha = 1,
		x = 0,
		y = 0,
		family = 'Arial, Helvetica, sans-serif',
		weight = 'lighter'
	}) {
		let nChar = 0;
		for (const s of txt) { nChar = Math.max(nChar, s.length); }
		let maxFH = Math.round(this.h / txt.length);
		let maxFW = Math.round((this.w / nChar) * 2);
		let fzFit = Math.min(maxFH, maxFW) - 2 * padding;
		if (fzFit < fz) fz = fzFit;
		if (fzFit > 5 * fz) fz *= 5;
		if (replacePrevious) this.removeTexts();
		let h = txt.length * (fz + padding);
		let textColors = this.computeTextColors(fill, alpha, textBg);
		if (this.isLine) {
			x += this.x;
			y += this.y;
			let tbg = this.textBackground ? this.textBackground : this.getRect();
			tbg.setAttribute('height', h);
			tbg.setAttribute('fill', textColors.bg);
			if (!this.textBackground) {
				this.textBackground = tbg;
				this.elem.appendChild(this.textBackground);
			}
			this.textBackground.setAttribute('rx', 6);
			this.textBackground.setAttribute('ry', 6);
		}
		let yStart = y - h / 2 + fz / 2;
		let maxW = 0;
		let akku = [];
		for (const t of txt) {
			let tel = this.text({
				isMultiText: true,
				replaceFirst: false,
				className: className,
				maxWidth: maxWidth,
				txt: t,
				fz: fz,
				fill: fill,
				padding: padding,
				alpha: alpha,
				x: x,
				y: yStart,
				family: family,
				weight: weight
			});
			maxW = Math.max(maxW, tel.w);
			akku.push(tel);
			yStart += fz + padding;
		}
		let isFirstChild = this.elem.childNodes.length == 0;
		if (isFirstChild || this.isLine) {
			this.ground = this.textBackground;
			this.w = maxW + 2 * padding;
			this.h = h;
		}
		if (this.isLine) {
			this.textBackground.setAttribute('width', this.w);
			this.textBackground.setAttribute('x', x - this.w / 2);
			this.textBackground.setAttribute('y', y - this.h / 2);
		}
		if (isFirstChild) { this.bgs.ground = textColors.bg; this.fg.ground = fill; }
		return this;
	}
	//#endregion
	//#region internal
	_setFill(el, fill, alpha) {
		if (fill != null && fill !== undefined) {
			fill = anyColorToStandardString(fill, alpha);
			el.setAttribute('fill', fill);
			return fill;
		}
		return null;
	}
	//#endregion
	//#region primitive shapes
	_ellipse() { return document.createElementNS('http://www.w3.org/2000/svg', 'ellipse'); }
	_circle() { return document.createElementNS('http://www.w3.org/2000/svg', 'ellipse'); }
	_rect() { return document.createElementNS('http://www.w3.org/2000/svg', 'rect'); }
	_square() { return document.createElementNS('http://www.w3.org/2000/svg', 'rect'); }
	_quad() { return document.createElementNS('http://www.w3.org/2000/svg', 'rect'); }
	_roundedRect() { return document.createElementNS('http://www.w3.org/2000/svg', 'rect'); }
	_hex() { return document.createElementNS('http://www.w3.org/2000/svg', 'polygon'); }
	_triangle() { return document.createElementNS('http://www.w3.org/2000/svg', 'polygon'); }
	_triangleDown() { return document.createElementNS('http://www.w3.org/2000/svg', 'polygon'); }
	_star() { return document.createElementNS('http://www.w3.org/2000/svg', 'polygon'); }
	_line() { return document.createElementNS('http://www.w3.org/2000/svg', 'line'); }
	_image() { return document.createElementNS('http://www.w3.org/2000/svg', 'image'); }
	_text() { return document.createElementNS('http://www.w3.org/2000/svg', 'text'); }
	//#endregion
	//#region geo: TODO: update!
	ellipse({ idx, border, thickness = 0, className = '', w = 50, h = 25, fill, alpha = 1, x = 0, y = 0 } = {}) {
		let r = document.createElementNS('http://www.w3.org/2000/svg', 'ellipse');
		if (this.isLine) {
			x += this.x;
			y += this.y;
		}
		let bg = this._setFill(r, fill, alpha);
		r.setAttribute('stroke-width', thickness);
		if (thickness > 0) {
			border = anyColorToStandardString(border, alpha);
			r.setAttribute('stroke', border);
		}
		if (this.elem.childNodes.length == 0 || className.includes('ground')) {
			this.ground = r;
			this.bgs.ground = bg;
			this.fgs.ground = r.getAttribute('stroke');
			this.w = w;
			this.h = h;
		}
		r.setAttribute('rx', w / 2);
		r.setAttribute('ry', h / 2);
		r.setAttribute('cx', x);
		r.setAttribute('cy', y);
		if (className !== '') {
			r.setAttribute('class', className);
			if (className.includes('overlay')) {
				this.overlay = r;
			}
		}
		if (isdef(idx) && this.elem.childNodes.length > idx) {
			this.elem.insertBefore(r, this.elem.childNodes[idx]);
		} else {
			this.elem.appendChild(r);
		}
		return this;
	}
	getRect({ border, thickness = 0, className = '', w = 50, h = 25, fill, alpha = 1, x = 0, y = 0, rounding } = {}) {
		let r = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
		if (this.isLine) {
			x += this.x;
			y += this.y;
		}
		r.setAttribute('width', w);
		r.setAttribute('height', h);
		r.setAttribute('x', -w / 2 + x);
		r.setAttribute('y', -h / 2 + y);
		let bg = this._setFill(r, fill, alpha);
		if (this.elem.childNodes.length == 0 || className.includes('ground')) {
			this.ground = r;
			this.bgs.ground = bg; this.fgs.ground = r.getAttribute('stroke');
			this.w = w;
			this.h = h;
		}
		r.setAttribute('stroke-width', thickness);
		if (thickness > 0) {
			border = anyColorToStandardString(border, alpha);
			r.setAttribute('stroke', border);
		}
		if (className !== '') {
			r.setAttribute('class', className);
			if (className.includes('overlay')) {
				this.overlay = r;
			}
		}
		return r;
	}
	circle({ idx, border, thickness = 0, className = '', sz = 25, fill, alpha = 1, x = 0, y = 0 } = {}) {
		return this.ellipse({
			idx: idx,
			className: className,
			w: sz,
			h: sz,
			fill: fill,
			border: border,
			thickness: thickness,
			alpha: alpha,
			x: x,
			y: y
		});
	}
	hex({ idx, className = '', x = 0, y = 0, w, h = 0, fill, alpha = 1, border = 'white', thickness = 0, flat = false }) {
		let r = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
		if (h <= 0) { h = (2 * w) / 1.73; }
		let pts = size2hex(w, h, x, y);
		r.setAttribute('points', pts);
		let bg = this._setFill(r, fill, alpha);
		if (this.elem.childNodes.length == 0 || className.includes('ground')) {
			this.ground = r;
			this.bgs.ground = bg; this.fgs.ground = r.getAttribute('stroke');
			this.w = w;
			this.h = h;
		}
		if (thickness > 0) {
			border = convertToRgba(border, alpha);
			r.setAttribute('stroke', border);
			r.setAttribute('stroke-width', thickness);
		}
		if (className !== '') {
			r.setAttribute('class', className);
			if (className.includes('overlay')) {
				this.overlay = r;
			}
		}
		this.elem.appendChild(r);
		if (className.includes('ground')) { this.w = w; this.h = h; this.x = x; this.y = y; }
		return this;
	}
	triangle({ idx, className = '', x = 0, y = 0, w, h = 0, fill, alpha = 1, border = 'white', thickness = 0 }) {
		let pts = size2triup(w, h, x, y);
		if (this.elem.childNodes.length == 0 || className.includes('ground')) { this.w = w; this.h = h; this.x = x; this.y = y; }
		this.poly({ idx: idx, className: className, pts: pts, fill: fill, alpha: alpha, border: border, thickness: thickness });
		return this;
	}
	triangleDown({ idx, className = '', x = 0, y = 0, w, h = 0, fill, alpha = 1, border = 'white', thickness = 0 }) {
		let pts = size2tridown(w, h, x, y);
		this.poly({ idx: idx, className: className, pts: pts, fill: fill, alpha: alpha, border: border, thickness: thickness });
		if (this.elem.childNodes.length == 1 || className.includes('ground')) { this.w = w; this.h = h; this.x = x; this.y = y; }
		return this;
	}
	star({ idx, className = '', n = 6, w, h = 0, x = 0, y = 0, fill, alpha = 1, border = 'white', thickness = 0 }) {
		h = h == 0 ? w : h;
		let rad = w / 2;
		let pOuter = getCirclePoints(rad, n);
		let pInner = getCirclePoints(rad / 2, n, 180 / n);
		let pts = [];
		for (let i = 0; i < n; i++) {
			pts.push(pOuter[i]);
			pts.push(pInner[i]);
		}
		for (let i = 0; i < pts.length; i++) {
			pts[i].X = (pts[i].X + w / 2) / w;
			pts[i].Y = (pts[i].Y + h / 2) / h;
		}
		let sPoints = polyPointsFrom(w, h, x, y, pts);
		this.poly({ idx: idx, className: className, pts: sPoints, fill: fill, alpha: alpha, border: border, thickness: thickness });
		if (this.elem.childNodes.length == 1 || className.includes('ground')) { this.w = w; this.h = h; this.x = x; this.y = y; }
		return this;
	}
	image({ idx, className = '', path = '', w = 50, h = 50, x = 0, y = 0 } = {}) {
		let r = document.createElementNS('http://www.w3.org/2000/svg', 'image');
		r.setAttribute('href', path);
		r.setAttribute('width', w);
		r.setAttribute('height', h);
		r.setAttribute('x', -w / 2 + x);
		r.setAttribute('y', -h / 2 + y);
		if (className !== '') {
			r.setAttribute('class', className);
			if (className.includes('overlay')) {
				this.overlay = r;
			}
		}
		if (this.elem.childNodes.length == 0) {
			this.w = w;
			this.h = h;
		}
		this.elem.appendChild(r);
		return this;
	}
	getEndPointsOfLineSegmentOfLength(d) {
		if (!this.isLine) return null;
		let x1 = this.x1;
		let y1 = this.y1;
		let x2 = this.x2;
		let y2 = this.y2;
		let dx = x2 - x1;
		let dy = y2 - y1;
		let mx = dx / 2;
		let my = dy / 2;
		let sx = x1;
		let sy = y1;
		let factor = d / this.distance;
		let ex = x1 + factor * dx;
		let ey = y1 + factor * dy;
		let addx = (1 - factor) * dx / 2;
		let addy = (1 - factor) * dy / 2;
		return [sx + addx, sy + addy, ex + addx, ey + addy];
	}
	line({ idx, cap, className = '', x1 = 0, y1 = 0, x2 = 100, y2 = 100, fill, alpha = 1, length, thickness = 2 } = {}) {
		let r = document.createElementNS('http://www.w3.org/2000/svg', 'line');
		r.setAttribute('x1', x1);
		r.setAttribute('y1', y1);
		r.setAttribute('x2', x2);
		r.setAttribute('y2', y2);
		if (isdef(cap)) r.setAttribute('stroke-linecap', cap);
		let isFirstChild = this.elem.childNodes.length == 0;
		let stroke = anyColorToStandardString(fill, alpha);
		if (thickness > 0) {
			r.setAttribute('stroke', stroke);
			r.setAttribute('stroke-width', thickness);
		}
		if (className !== '') {
			r.setAttribute('class', className);
		}
		if (className.includes('overlay')) {
			r.setAttribute('class', 'overlay_line');
			this.overlay = r;
		}
		if (isFirstChild || className.includes('ground')) {
			this.ground = r;
			this.bgs.ground = stroke; this.fgs.ground = stroke;
			this.isLine = true;
			this.x = Math.round((x1 + x2) / 2);
			this.y = Math.round((y1 + y2) / 2);
			this.x1 = x1;
			this.y1 = y1;
			this.x2 = x2;
			this.y2 = y2;
			this.center = { x: (x1 + x2) / 2, y: (y1 + y2) / 2 };
			this.distance = distance(x1, y1, x2, y2);
			if (length) {
				this.length = this.h = length;
			} else {
				this.length = this.h = this.distance;
			}
			this.thickness = thickness;
			this.w = thickness;
		}
		this.elem.appendChild(r);
		return this;
	}
	poly({ idx, className = '', pts = '0,0 100,0 50,80', fill, alpha = 1, border = 'white', thickness = 0 }) {
		let r = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
		r.setAttribute('points', pts);
		let isFirstChild = this.elem.childNodes.length == 0;
		let bg = this._setFill(r, fill, alpha);
		if (isFirstChild || className.includes('ground')) {
			this.ground = r;
			this.bgs.ground = bg; this.fgs.ground = r.getAttribute('stroke');
		}
		if (thickness > 0) {
			border = anyColorToStandardString(border, alpha);
			r.setAttribute('stroke', border);
			r.setAttribute('stroke-width', thickness);
		}
		if (className !== '') {
			r.setAttribute('class', className);
			if (className.includes('overlay')) {
				this.overlay = r;
			}
		}
		this.elem.appendChild(r);
		return this;
	}
	rect({ idx, border, thickness = 0, className = '', w = 50, h = 25, fill, alpha = 1, x = 0, y = 0, rounding } = {}) {
		let r = this.getRect({ border: border, thickness: thickness, className: className, w: w, h: h, fill: fill, alpha: alpha, x: x, y: y, rounding: rounding });
		if (isdef(idx) && this.elem.childNodes.length > idx) {
			this.elem.insertBefore(r, this.elem.childNodes[idx]);
		} else {
			this.elem.appendChild(r);
		}
		return this;
	}
	roundedRect({ idx, border, thickness = 0, className = '', w = 150, h = 125, fill = 'darkviolet', rounding = 10, alpha = 1, x = 0, y = 0 } = {}) {
		return this.rect({ idx: idx, border: border, thickness: thickness, className: className, w: w, h: h, fill: fill, alpha: alpha, x: x, y: y, rounding: rounding })
	}
	square({ idx, className = '', sz = 50, fill = 'yellow', alpha = 1, x = 0, y = 0, border, thickness = 0, rounding } = {}) {
		return this.rect({
			idx: idx,
			className: className,
			w: sz,
			h: sz,
			fill: fill,
			alpha: alpha,
			x: x,
			y: y,
			border: border,
			thickness: thickness,
			rounding: rounding
		});
	}
	//#endregion
	//#region css classes
	addClass(el, clName) {
		if (nundef(el)) el = this.overlay ? this.overlay : this.ground;
		if (!el) return;
		el.classList.add(clName);
	}
	getClass() {
		if (this.overlay) {
			return getClass(this.overlay);
		} else if (this.ground) {
			return this.getClass(this.ground);
		}
		return null;
	}
	removeClass(el, clName) {
		if (nundef(el)) el = this.overlay ? this.overlay : this.ground;
		if (!el) return;
		el.classList.remove(clName);
	}
	//#endregion
	//#region tooltips
	calcCenterPos(ev) {
		let x, y;
		if (isdef(this.w)) {
			let rect = ev.target.getBoundingClientRect();
			let dx = ev.clientX - rect.left;
			let dy = ev.clientY - rect.top;
			x = ev.clientX - dx + this.w / 2;
			y = ev.clientY - dy + this.h / 2;
		} else {
			x = ev.pageX;
			y = ev.pageY;
		}
		return { x: x, y: y };
	}
	showTT(ev) {
		let d = document.getElementById('tooltip');
		clearElement(d);
		let oid = getOidForMainId(this.id);
		let oUpdated = oid in G.table ? G.table[oid] : G.playersAugmented[oid];
		let titleDomel = document.createElement('div');
		titleDomel.style.width = '100%';
		titleDomel.style.textAlign = 'center';
		titleDomel.innerHTML = ('obj_type' in oUpdated ? oUpdated.obj_type : 'player') + ('name' in oUpdated ? ':' + oUpdated.name : 'id' in oUpdated ? ':' + oUpdated.id : ' ' + oid);
		d.appendChild(titleDomel);
		let t = tableElemX(oUpdated);
		d.appendChild(t.table);
		let pos = this.calcCenterPos(ev);
		$('div#tooltip').css({
			display: 'inline-block',
			left: pos.x,
			top: pos.y,
		});
	}
	ttHandling(ev, eventName) {
		if (!this.o) return;
		let oid = getOidForMainId(this.id);
		if (!oid) return;
		if (eventName == 'mouseenter') {
			this.TTTT = setTimeout(() => this.showTT(ev), 500);
		}
		else if (eventName == 'mouseleave') {
			clearTimeout(this.TTTT); hideTooltip();
		}
	}
	//#endregion
	//#region events
	_handler(ev) {
		ev.stopPropagation();
		let eventName = ev.handleObj.origType;
		if (S.settings.tooltips) this.ttHandling(ev, eventName);
		if (!this.isEnabled) return;
		let part = $(ev.currentTarget);
		let partName;
		if (this.isa.deck && this.parts.topmost) partName = 'topmost';
		else if (part.id == this.elem.id) partName = 'elem';
		else { let props = $(part).attrs(); let name = props.name; if (nundef(name)) name = 'elem'; partName = name; }
		let handler = this.handlers[eventName][partName];
		if (isdef(handler)) { handler(ev, this, partName); }
	}
	addHandler(evName, partName = 'elem', handler = null, autoEnable = true) {
		let part = this._getPart(partName);
		if (nundef(part) || part == this.elem) { part = this.elem; partName = 'elem'; }
		else if (this.isa.deck) partName = 'topmost';
		if (isdef(handler)) {
			this.handlers[evName][partName] = handler;
		}
		$(part).off(evName).on(evName, this._handler.bind(this));
		if (autoEnable) this.enable();
	}
	addClickHandler(partName = 'elem', handler = null, autoEnable = true) { this.addHandler('click', partName, handler, autoEnable); }
	addMouseEnterHandler(partName = 'elem', handler = null, autoEnable = true) { this.addHandler('mouseenter', partName, handler, autoEnable); }
	addMouseLeaveHandler(partName = 'elem', handler = null, autoEnable = true) { this.addHandler('mouseleave', partName, handler, autoEnable); }
	removeClickHandler() { for (const partName in this.parts) { $(this.parts[partName]).off('click'); } this.handlers.click = {} }
	removeHoverHandlers() { for (const partName in this.parts) { $(this.parts[partName]).off('mouseenter mouseleave'); } this.handlers.mouseenter = {}; this.handlers.mouseleave = {} }
	removeHandlers() { this.removeEvents(); }
	removeEvents() {
		for (const partName in this.parts) { $(this.parts[partName]).off(); }
		this.handlers = { click: {}, mouseenter: {}, mouseleave: {} };
	}
	enable() { this.isEnabled = true; }
	disable() { this.isEnabled = false; }
	//#endregion
	//#region high
	getTopCardElemOfDeck() {
		return this.topmost;
	}
	_getPart(partName, elemIfMissing = true) {
		let part = this.parts[partName];
		if (this.isa.deck) {
			let tm = this.getTopCardElemOfDeck();
			return this.getTopCardElemOfDeck();
		} else {
			return isdef(part) ? part : elemIfMissing ? this.elem : null;
		}
	}
	highC(c, pname = 'elem', elIfMiss = true) {
		let part = this._getPart(pname, elIfMiss);
		if (!part) return;
		if (this.cat == 'g') {
			if (this.isPicto) {
				this.setTextFill(this.picto, '#ccff00', 1);
			} else {
				this.ground.setAttribute('fill', c);
				this.ground.setAttribute('stroke', c);
			}
		} else { part.style.backgroundColor = c; part.style.color = colorIdealText(c); }
	}
	unhighC(pname = 'elem', elIfMiss = true) {
		let part = this._getPart(pname, elIfMiss);
		if (!part) return;
		if (this.cat == 'g') {
			if (nundef(this.ground)) return;
			this.ground.setAttribute('fill', this.bgs.ground);
			if (this.fgs.ground) this.ground.setAttribute('stroke', this.fgs.ground);
		}
		else { let bg = part.bg; if (nundef(bg)) bg = null; part.style.backgroundColor = bg; if (isdef(bg)) part.style.color = colorIdealText(bg); }
	}
	high(pname = 'elem', elIfMiss = true) {
		let part = this._getPart(pname, elIfMiss);
		if (!part) return;
		if (this.cat == 'g') {
			if (this.isPicto) {
				this.setTextFill(this.picto, '#ccff00', 1);
			} else addClass(this.overlay, 'high');
		} else part.style.backgroundColor = '#ccff00';
	}
	unhigh(pname = 'elem', elIfMiss = true) {
		let part = this._getPart(pname, elIfMiss);
		if (!part) return;
		if (this.cat == 'g') {
			if (this.isPicto) {
				this.setTextFill(this.picto, this.orig.fg, 1);
			} else {
				removeClass(this.overlay, 'high');
			}
		} else { let bg = part.bg; if (nundef(bg)) bg = null; part.style.backgroundColor = bg; }
	}
	highFrame(pname = 'elem', elIfMiss = true) {
		let part = this._getPart(pname, elIfMiss);
		if (!part) return;
		if (this.isLine) this.addClass(this.overlay, 'lineHighFrame');
		else if (this.isPicto) {
			this.addClass(this.ground, 'high');
		} else if (this.isa.field) {
			this.addClass(this.overlay, 'fieldHighFrame');
		}
		else addClass(this.cat == 'g' ? this.overlay : this.parts['title'], 'highFrame')
	}
	unhighFrame(pname = 'elem', elIfMiss = true) {
		let part = this._getPart(pname, elIfMiss);
		if (!part) return;
		if (this.isLine) this.removeClass(this.overlay, 'lineHighFrame');
		else if (this.isPicto) {
			this.removeClass(this.ground, 'high');
		} else if (this.isa.field) {
			this.removeClass(this.overlay, 'fieldHighFrame');
		} else removeClass(this.cat == 'g' ? this.overlay : this.parts['title'], 'highFrame')
	}
	unhighAll() { for (const k in this.parts) { this.unhigh(k); this.unhighFrame(k); this.unhighC(k); } }
	sel() { }
	unsel() { }
	frame() { }
	unframe() { }
	hide(pname = 'elem', elIfMiss = false) { let part = this._getPart(pname, elIfMiss); if (part) hide(part); }
	show(pname = 'elem', elIfMiss = false) { let part = this._getPart(pname, elIfMiss); if (part) show(part); }
	minimize() {
		if ('title' in this.parts) {
			for (const k in this.parts) {
				if (k == 'elem' || k == 'title') continue;
				this.hide(k)
			}
			this.isMinimized = true;
		}
	}
	maximize() {
		if (this.isMinimized) {
			for (const k in this.parts) {
				if (k == 'elem' || k == 'title') continue;
				this.show(k)
			}
		}
	}
	//#endregion
	//#region basic properties x,y,w,h,bg,fg
	resetBg() {
		if (this.orig.bg) {
			this.setBg(this.orig.bg);
		}
	}
	resetShape() {
		this.setShape(this.orig.shape);
	}
	resetSize() {
		this.setSize(this.originalSize.w, this.originalSize.h);
	}
	setBg(c, { updateFg = false, partName = 'elem' } = {}) {
		if (this.isLine) {
			this.bg = c;
			let el = this.elem;
			el.setAttribute('fill', c)
			el.setAttribute('stroke', c)
			el.style.stroke = c;
			for (const e of el.children) {
				e.setAttribute('stroke', c)
				e.setAttribute('fill', c);
				e.style.stroke = c;
				return this;
			}
		}
		let part = this.parts[partName];
		if (partName == 'elem') { this.bg = c; }
		part.bg = c;
		if (this.cat == 'g') {
			if (this.type == 'text') {
				if (!this.textBackground) {
				}
			} else {
				this.elem.setAttribute('fill', c);
			}
		} else {
			part.style.backgroundColor = c;
		}
		if (updateFg) {
			this.setFg(colorIdealText(c), { partName: partName });
		}
		return this;
	}
	setFg(c, { updateBg = false, partName = 'elem' } = {}) {
		let part = this.parts[partName];
		if (partName == 'elem') { this.fg = c; }
		part.fg = c;
		if (this.cat == 'g') {
			if (this.type == 'text') {
				this.elem.setAttribute('fill', c);
			} else {
				this.elem.setAttribute('stroke', c);
			}
		} else {
			part.style.color = c;
		}
		return this;
	}
	setFullSize() {
		let parent = UIS[this.idParent]; if (nundef(parent)) return;
		this.setSize(parent.w, parent.h);
		this.setPos(0, 0);
	}
	setBounds(x, y, w, h, unit = '%') {
		let el = this.elem;
		this.setSize(w, h);
		this.setPos(x, y);
	}
	setColor(c) {
		this.setBg(c);
	}
	setHeight(h) {
		this.elem.style.height = h + 'px'; this.h = h;
	}
	setSize(w, h) {
		this.w = w; this.h = h;
		if (this.cat == 'g') {
			if (this.ground) {
				this.ground.setAttribute('width', w);
				this.ground.setAttribute('height', h);
			} else {
				this.elem.setAttribute('width', w);
				this.elem.setAttribute('height', h);
			}
			if (this.overlay) {
				this.overlay.setAttribute('width', w);
				this.overlay.setAttribute('height', h);
			}
		} else {
			this.elem.style.width = w + 'px';
			this.elem.style.height = h + 'px';
		}
		return this;
	}
	centerInDiv() {
		this.parent = UIS[this.idParent];
		if (isdef(this.parent)) {
			let d = this.elem;
			let divParent = this.parent.elem;
			let wParent = divParent.offsetWidth;
			let cards = this.deck.cards;
			let wElem = cards.length > 0 ? cards[0].elem.offsetWidth : 78;
			let hParent = divParent.offsetHeight;
			let hElem = cards.length > 0 ? cards[0].elem.offsetHeight : 110;
			d.style.position = 'relative';
			this.centerX = (wParent - wElem) / 2;
			this.centerY = (hParent - hElem) / 2;
			this.w = wElem;
			this.h = hElem;
			d.style.left = '' + this.centerX + 'px';
			d.style.top = '' + this.centerY + 'px';
		}
	}
	setPos(x, y) {
		this.x = x;
		this.y = y;
		if (this.cat == 'g') {
			this.elem.setAttribute('transform', `translate(${x},${y})`);
		} else {
			if (isdef(this.centerX)) {
				this.elem.style.left = '' + (this.centerX + x) + 'px';
				this.elem.style.top = '' + (this.centerY + y) + 'px';
			} else {
				this.elem.style.position = 'absolute';
				this.elem.style.left = x + 'px';
				this.elem.style.top = y + 'px';
			}
		}
		return this;
	}
	_modTransformBy(el, { x, y, scaleX, scaleY, rotDeg } = {}) {
		let info = getTransformInfo(el);
		console.log(info)
		let xNew, yNew, scaleXNew, scaleYNew, rotNew;
		if (isdef(x)) xNew = info.translateX + x; else xNew = info.translateX;
		if (isdef(y)) yNew = info.translateY + y; else yNew = info.translateY;
		if (isdef(scaleX)) scaleXNew = info.scaleX + scaleX; else scaleXNew = info.scaleX;
		if (isdef(scaleY)) scaleYNew = info.scaleY + scaleY; else scaleYNew = info.scaleY;
		if (isdef(rotDeg)) rotNew = info.rotation + rotDeg; else rotNew = info.rotation;
		let sTrans = ''; let sScale = ''; let sRot = '';
		if (xNew != 0 || yNew != 0) sTrans = `translate(${xNew},${yNew})`;
		if (scaleXNew != 1 || scaleYNew != 1) sScale = `scale(${scaleXNew},${scaleYNew})`;
		if (rotNew != 0) sRot = `rotation(${rotNew}deg)`;
		let s = (sTrans + ' ' + sScale + ' ' + sRot).trim();
		el.setAttribute("transform", s);
	}
	_setTransform(el, { x, y, scaleX, scaleY, rotDeg } = {}) {
		let info = getTransformInfo(el);
		let xNew, yNew, scaleXNew, scaleYNew, rotNew;
		if (isdef(x)) xNew = x; else xNew = info.translateX;
		if (isdef(y)) yNew = y; else yNew = info.translateY;
		if (isdef(scaleX)) scaleXNew = scaleX; else scaleXNew = info.scaleX;
		if (isdef(scaleY)) scaleYNew = scaleY; else scaleYNew = info.scaleY;
		if (isdef(rotDeg)) rotNew = rotDeg; else rotNew = info.rotation;
		let sTrans = ''; let sScale = ''; let sRot = '';
		if (xNew != 0 || yNew != 0) sTrans = `translate(${xNew} ${yNew})`;
		if (scaleXNew != 1 || scaleYNew != 1) sScale = `scale(${scaleXNew} ${scaleYNew})`;
		if (rotNew != 0) sRot = `rotate(${rotNew})`;
		let s = (sTrans + ' ' + sScale + ' ' + sRot).trim();
		el.setAttribute("transform", s);
	}
	setScale(scale, partName = 'elem') {
		let el = this.parts[partName];
		if (!el) return;
		if (this.cat == 'd') el.style.transform = `scale(${scale})`;
		else this._setTransform(el, { x: this.x, y: this.y, scaleX: scale, scaleY: scale });
	}
	setShape(shape) {
		if (nundef(this.ground)) {
			console.log('cannot replace shape because no this.ground');
			return;
		}
		let curShape = getTypeOf(this.ground);
		if (shape == 'circle') shape = 'ellipse';
		if (shape == 'square') shape = 'rect';
		if (curShape != shape) {
			let childNodes = [...this.elem.children];
			let iGround = childNodes.indexOf(this.ground);
			let iOverlay = childNodes.indexOf(this.overlay);
			let fill = this.ground.getAttribute('fill');
			this.overlay = null;
			this.ground = null;
			this[shape]({ className: 'ground', w: this.w, h: this.h, fill: fill });
			let newGround = this.elem.children[this.len() - 1];
			this[shape]({ className: 'overlay', w: this.w, h: this.h });
			let newOverlay = this.elem.children[this.len() - 1];
			this.replaceChild(this.elem.childNodes[iGround], newGround);
			this.ground = newGround;
			this.replaceChild(this.elem.childNodes[iOverlay], newOverlay);
		}
	}
	//#endregion
	//#region parts
	body(key = 'body', color) {
		if (this.parts[key]) return;
		let t = document.createElement('div');
		t.style.padding = '4px 8px';
		let bg = color;
		this.elem.appendChild(t);
		this.parts[key] = t;
		$(t).attrs({ name: key });
		if (isdef(bg)) this.setBg(bg, { updateFg: (color != 'dimgray'), partName: key });
		return this;
	}
	title(s, key = 'title', color = 'dimgray') {
		if (this.parts[key]) {
			this.parts[key].style.backgroundColor = randomColor();
			return;
		}
		let t = document.createElement('div');
		t.style.borderRadius = '6px';
		t.style.padding = '4px 8px';
		let bg = color;
		t.classList.add('tttitle');
		t.innerHTML = s;
		this.elem.appendChild(t);
		this.parts[key] = t;
		$(t).attrs({ name: key });
		this.setBg(bg, { updateFg: (color != 'dimgray'), partName: key });
		return this;
	}
	table(o, keys, key = 'table') {
		if (this.parts[key]) {
			let oldTable = this.parts[key];
			let t = tableElem(o, keys);
			let t2 = t.innerHTML;
			oldTable.innerHTML = t2;
		} else {
			let t = tableElem(o, keys);
			this.elem.appendChild(t);
			this.attach();
			this.parts[key] = t;
			t.name = key;
		}
		return this;
	}
	tableX(o, keys, key = 'table') {
		let replace = isdef(this.parts[key]);
		let res = tableElemX(o, keys);
		let tNew = res.table;
		let rNew = res.refs.map(x => x.id);
		tNew.name = key;
		if (replace) {
			let oldTable = this.parts[key];
			let oldRefs = this.refs[key];
			if (isdef(oldRefs)) {
				oldRefs.map(x => {
					deleteRSG(x);
				});
				delete this.refs[key];
			}
			oldTable.innerHTML = tNew.innerHTML;
		} else {
			this.elem.appendChild(tNew);
			this.attach();
			this.parts[key] = tNew;
		}
		if (!isEmpty(res)) {
			makeRefs(this.id, res.refs);
			this.refs[key] = rNew;
		}
		return this;
	}
	tableY(o, keys, key = 'table') {
		let replace = isdef(this.parts[key]);
		let res = tableElemY(o, keys);
		let tNew = res.table;
		let rNew = res.refs.map(x => x.id);
		tNew.name = key;
		if (replace) {
			let oldTable = this.parts[key];
			let oldRefs = this.refs[key];
			if (isdef(oldRefs)) { oldRefs.map(x => deleteRSG(x)); delete this.refs[key]; }
			oldTable.innerHTML = tNew.innerHTML;
		} else {
			this.elem.appendChild(tNew);
			this.attach();
			this.parts[key] = tNew;
		}
		if (!isEmpty(res)) {
			makeRefs(this.id, res.refs);
			this.refs[key] = rNew;
		}
		return this;
	}
	//#endregion
	//#region admin/general
	attach(partName) {
		if (!this.isAttached) {
			this.isAttached = true;
			let parentMS = UIS[this.idParent];
			let parentElem = isdef(partName) && isdef(parentMS.parts[partName]) ? parentMS.parts[partName] : parentMS.elem;
			parentElem.appendChild(this.elem);
		}
		return this;
	}
	detach(partName) {
		if (this.isAttached) {
			this.isAttached = false;
			let parentMS = UIS[this.idParent];
			let parentElem = isdef(partName) && isdef(parentMS.parts[partName]) ? parentMS.parts[partName] : parentMS.elem;
			parentElem.removeChild(this.elem);
		}
		return this;
	}
	clear(startProps = {}) {
		let ids = this.children.map(x => x);
		for (const id of ids) {
			deleteRSG(id);
		}
		clearElement(this.elem);
		for (const k in startProps) {
			this.elem[k] = startProps[k];
		}
		this.children = [];
	}
	destroy() {
		this.clear();
		$(this.elem).remove();
		this.elem = null;
		this.isAttached = false;
		let parent = UIS[this.idParent];
		removeInPlace(parent.children, this.id);
	}
	len() { return this.elem.children.length; }
	replaceChild(oldChild, newChild) {
		this.elem.insertBefore(newChild, oldChild);
		this.elem.removeChild(oldChild);
	}
	toString() { return 'id: ' + this.id + ', ' + this.domType + ', ' + this.x + ', ' + this.y + ', ' + this.w + ', ' + this.h + ', ' + this.bg + ', ' + this.fg + ', ' + this.children; }
	//#endregion
}
class MS {
	constructor({ parent, id, type = 'g', domel = null, isa = {} } = {}) {
		if (domel) {
			if (domel.id == 'R_d_root') {
				this.handlers = { click: {}, mouseenter: {}, mouseleave: {} }; this.parent = null; this.id = 'R_d_root'; this.type = 'div'; this.cat = 'd'; this.elem = domel; this.parts = { _: this.elem }; this.children = []; return;
			}
			this.id = domel.id;
			this.type = getTypeOf(domel);
			this.parent = UIS[domel.parentNode.id];
		} else {
			this.id = nundef(id) ? getUID() : id;
			this.type = type;
			this.parent = parent;
		}
		UIS[this.id] = this;
		this.cat = MSCATS[this.type]; //'d' for dom els and 'g' for svg els
		this.elem = domel ? domel
			: this.cat == 'g' || this.type == 'svg' ? document.createElementNS('http://www.w3.org/2000/svg', this.type)
				: document.createElement(this.type);
		this.elem.ms = this;
		this.elem.id = this.id;
		if (nundef(this.parent)) this.parent = ROOT;
		this.children = [];
		this.posRef = this.parent;
		if (this.cat == 'd' && this.parent.cat == 'g') {
			let ancestor = closestParent(parent.elem, 'div');
			console.log('FOUND domParent:', ancestor);
			this.posRef = this.parent;
			this.parent = ancestor.ms;
		} else if (this.parent.cat == 'd' && this.parent.type != 'svg' && this.cat == 'g') {
			let msSvg = new MMS({ parent: this.parent, type: 'svg' }).setDefaults().attach();
			this.parent = msSvg;
			this.posRef = msSvg;
		}
		if (domel) { addIf(this.parent.children, this); }
		this.x = 0; this.y = 0; this.w = 0; this.h = 0;
		for (const d in isa) {
			if (d == 'id') { continue; }
			this[d] = isa[d];
		}
		this.isa = Object.keys(isa);
		this.parts = { _: this.elem };
		this.uis = [];
		this.handlers = { click: {}, mouseenter: {}, mouseleave: {} };
	}
	//#region events
	_handler(ev) {
		ev.stopPropagation();
		if (!this.isEnabled) return;
		let part = ev.currentTarget;
		let partName = isdef(part.name) ? part.name : '_';
		let eventName = ev.handleObj.origType;
		let handler = this.handlers[eventName][partName];
		if (isdef(handler)) { counters[eventName] += 1; counters.events += 1; handler(this, part); }
	}
	addHandler(evName, partName = '_', handler = null, autoEnable = true) {
		let part = this.parts[partName];
		if (nundef(part)) { part = this.elem; partName = '_'; }
		if (isdef(handler)) { this.handlers[evName][partName] = handler; }
		$(part).off(evName).on(evName, this._handler.bind(this));
		if (autoEnable) this.enable();
	}
	addClickHandler(partName = '_', handler = null, autoEnable = true) { this.addHandler('click', partName, handler, autoEnable); }
	addMouseEnterHandler(partName = '_', handler = null, autoEnable = true) { this.addHandler('mouseenter', partName, handler, autoEnable); }
	addMouseLeaveHandler(partName = '_', handler = null, autoEnable = true) { this.addHandler('mouseleave', partName, handler, autoEnable); }
	removeEvents() {
		$(this.elem).off();
		if (S_showEvents) this.showEvents(this.elem);
		for (const partName in this.parts) {
			$(this.parts[partName]).off();
			if (S_showEvents) this.showEvents(this.parts[partName]);
		}
	}
	//#endregion
	//#region done
	clear(startProps = {}) {
		let ids = this.children.map(x => x.id);
		for (const id of ids) UIS[id].destroy();
		for (const k in startProps) {
			this.elem[k] = startProps[k];
		}
		console.log('children after clear', this.children);
	}
	destroy() {
		$(this.elem).remove();
		this.elem = null;
		removeInPlace(this.parent.children, this);
		delete UIS[this.id];
	}
	//#endregion
	//#region work
	title(s, key = 'title') {
		if (this.parts[key]) {
			this.parts[key].style.backgroundColor = randomColor();
			return;
		}
		let t = document.createElement('div');
		t.style.backgroundColor = 'dimgray';
		this.titleColor = t.style.backgroundColor;
		t.classList.add('tttitle');
		t.innerHTML = s;
		this.elem.appendChild(t);
		this.parts[key] = t;
		t.name = key;
		this.attach();
		return this;
	}
	table(o, keys, key = 'table') {
		if (this.parts[key]) {
			let oldTable = this.parts[key];
			let t = tableElem(o, keys);
			let t2 = t.innerHTML;
			oldTable.innerHTML = t2;
		} else {
			let t = tableElem(o, keys);
			this.elem.appendChild(t);
			this.attach();
			this.parts[key] = t;
			t.name = key;
		}
		return this;
	}
	//#endregion
	//#region TODO
	attach() { if (!this.isAttached) { addIf(this.parent.children, this); this.parent.elem.appendChild(this.elem); } return this; }
	detach() { if (this.isAttached) { removeIf(this.parent.children, this); this.parent.elem.removeChild(this.elem); } return this; }
	_onMouseEnter(ev) {
		if (!this.isEnabled) return;
		let partName = evToId(ev);
		if (S_showEvents) {
			counters.events += 1;
		}
		if (typeof this.mouseEnterHandler == 'function') {
			if (S_showEvents)
				this.mouseEnterHandler(ev);
		}
	}
	_onMouseLeave(ev) {
		if (!this.isEnabled) return;
		let partName = evToId(ev);
		if (S_showEvents) {
			counters.events += 1;
		}
		if (typeof this.mouseLeaveHandler == 'function') {
			if (S_showEvents)
				this.mouseLeaveHandler(ev);
		}
	}
	_getRect(x = 0, y = 0, w = 50, h = 25, bg, fg) {
		let r = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
		r.setAttribute('width', w);
		r.setAttribute('height', h);
		r.setAttribute('x', x);
		r.setAttribute('y', y);
		if (isdef(bg)) r.setAttribute('fill', bg);
		if (isdef(fg)) r.setAttribute('stroke', bg);
		return r;
	}
	_getDiv(x, y, w, h, bg, fg) {
		let r = document.createElement('div');
		if (this.w < w || this.h < h) { this.setSize(w, h); }
		if (isdef(x)) {
			r.style.position = 'absolute';
			r.style.left = x + 'px';
			r.style.top = y + 'px';
		}
		if (isdef(w)) {
			r.style.width = w + 'px';
			r.style.height = h + 'px';
		}
		if (isdef(bg)) r.style.backgroundColor = bg;
		if (isdef(fg)) r.style.color = fg;
		return r;
	}
	addInteractivity(partName, hover = true, click = true) {
		let part = this.parts[partName];
		if (nundef(part)) { part = this.elem; }
		if (this.part.isInteractive) return;
		this.part.isInteractive = true;
		if (click) this.part.clickHandler = null;
		if (hover) { this.part.mouseEnterHandler = null; this.part.mouseLeaveHandler = null; }
		this.isEnabled = false;
		this.enable = () => this.isEnabled = true;
		this.disable = () => this.isEnabled = false;
		this.elem.addEventListener('click', this._onClick.bind(this));
		this.elem.addEventListener('mouseenter', this._onMouseEnter.bind(this));
		this.elem.addEventListener('mouseleave', this._onMouseLeave.bind(this));
		return this;
	}
	enable() {
		this.isEnabled = true;
	}
	disable() {
		this.isEnabled = false;
	}
	high() {
		if (isdef(this.parts) && isdef(this.parts.title)) this.parts['title'].style.backgroundColor = '#ccff00';
		else {
			this.elem.classList.add('selected');
			this.elem.backgroundColor = '#ccff00';
		}
	}
	unhigh() {
		if (isdef(this.parts) && isdef(this.parts.title)) this.parts['title'].style.backgroundColor = this.titleColor;
		else {
			this.elem.classList.remove('selected');
			this.elem.backgroundColor = this.titleColor;
		}
	}
	sel() { }
	unsel() { }
	frame() { }
	unframe() { }
	setDefaults({ x, y, w, h, bg, fg } = {}) {
		if (this.parent.type == 'svg' && isdef(bg) && nundef(w) && nundef(h) && this.domType == 'g') {
			this.parent.setBg(bg);
		} else {
			if (isdef(bg) || this.cat == 'd') {
				bg = nundef(bg) ? 'transparent' : bg;
				this.setBg(bg);
				fg = nundef(fg) ? bg == 'transparent' ? this.parent.fg : colorIdealText(bg) : fg;
				this.setFg(fg);
			}
		}
		if (this.cat == 'd' && (nundef(this.x) || nundef(this.w))) return this;
		w = nundef(w) ? this.posRef.w : w;
		h = nundef(h) ? this.posRef.h : h;
		this.setSize(w, h);
		x = nundef(x) ? 0 : this.posRef.x + x;
		y = nundef(y) ? 0 : this.posRef.y + y;
		if (this.parent.cat == 'd') { this.parent.elem.style.position = 'absolute'; }
		this.setPos(x, y);
		return this;
	}
	setBg(c, updateFg = false) {
		this.bg = c;
		if (this.cat == 'g') {
			if (this.domType == 'text') {
				if (!this.textBackground) {
				}
			} else {
				this.elem.setAttribute('fill', c);
			}
		} else {
			this.elem.style.backgroundColor = c;
		}
		if (updateFg) {
			this.setFg(colorIdealText(c), true);
		}
		return this;
	}
	setFg(c) {
		this.fg = c;
		if (this.cat == 'g') {
			if (this.domType == 'text') {
				this.elem.setAttribute('fill', c);
			} else {
				this.elem.setAttribute('stroke', c);
			}
		} else {
			this.elem.style.color = c;
		}
		return this;
	}
	setFullSize() {
		this.setSize(this.posRef.w, this.posRef.h);
		this.setPos(0, 0);
	}
	setSize(w, h) {
		this.w = w; this.h = h;
		if (this.cat == 'g') {
			if (this.ground) {
				this.ground.setAttribute('width', w);
				this.ground.setAttribute('height', h);
			} else {
				this.elem.setAttribute('width', w);
				this.elem.setAttribute('height', h);
			}
			if (this.overlay) {
				this.overlay.setAttribute('width', w);
				this.overlay.setAttribute('height', h);
			}
		} else {
			this.elem.style.position = 'absolute';
			this.elem.style.width = w + 'px';
			this.elem.style.height = h + 'px';
		}
		return this;
	}
	setPos(x, y) {
		this.x = x;
		this.y = y;
		if (this.cat == 'g') {
			this.elem.setAttribute('transform', `translate(${x},${y})`);
		} else {
			this.elem.style.position = 'absolute'
			this.elem.style.left = x + 'px';
			this.elem.style.top = y + 'px';
		}
		return this;
	}
	center() {
		this.setPos(-this.w / 2, -this.h / 2)
	}
	centerOrigin() {
		this.setPos(this.w / 2, this.h / 2);
	}
	rect({ x = 0, y = 0, w = 50, h = 25, bg, fg } = {}) {
		let pa = this.domType == 'g' ? this._getRect(x, y, w, h, bg, fg) : this._getDiv(x, y, w, h, bg, fg);
		this.elem.appendChild(pa);
		this.attach();
		return this;
	}
	addBorder(c) {
		if (this.cat == 'd') {
			this.elem.style.border = '1px solid ' + c;
		}
	}
	removeBorder() {
		if (this.cat == 'd') {
			this.elem.style.border = null;
		}
	}
	selBlack() {
		if (this.isSelBlack) return;
		this.elem.classList.add('selBlack');
		this.isSelBlack = true;
	}
	unselBlack() {
		if (!this.isSelBlack) return;
		this.elem.classList.remove('selBlack');
		this.isSelBlack = false;
	}
	selRed() { }
	unselAll() { this.removeBorder(); }
	//#endregion
}
class MS_dep {
	constructor({ rsgType, parent, id, oid, o, domType = 'g', domel = null } = {}) {
		this.rsgType = rsgType;
		if (rsgType == 'b') {
			this.oid = oid;
			_setIsa(this, o);
			this.id = 'b@' + o.iTuple;
			if (isdef(domel)) { this.parent = UIS[domel.id]; this.domType = getTypeOf(domel); this.cat = MSCAT(this.domType); this.elem = domel; this.elem.id = this.id; }
			else { this.parent = parent; this.domType = domType; this.cat = MSCAT(this.domType); this.elem = _createDom(this.cat, domType); this.elem.id = this.id; }
		}
		if (domel) {
			if (domel.id == 'R_d_root') {
				this.handlers = { click: {}, mouseenter: {}, mouseleave: {} }; this.parent = null; this.id = 'R_d_root'; this.domType = 'div'; this.cat = 'd'; this.elem = domel; this.parts = { _: this.elem }; this.children = []; return;
			}
			this.id = domel.id;
			this.domType = getTypeOf(domel);
			this.parent = UIS[domel.parentNode.id];
		} else {
			this.id = nundef(id) ? getUID() : id;
			this.domType = domType;
			this.parent = parent;
		}
		UIS[this.id] = this;
		this.cat = MSCATS[this.domType]; //'d' for dom els and 'g' for svg els
		this.elem = domel ? domel
			: this.cat == 'g' || this.domType == 'svg' ? document.createElementNS('http://www.w3.org/2000/svg', this.domType)
				: document.createElement(this.domType);
		this.elem.ms = this;
		this.elem.id = this.id;
		if (nundef(this.parent)) this.parent = ROOT;
		this.children = [];
		this.posRef = this.parent;
		if (this.cat == 'd' && this.parent.cat == 'g') {
			let ancestor = closestParent(parent.elem, 'div');
			this.posRef = this.parent;
			this.parent = ancestor.ms;
		} else if (this.parent.cat == 'd' && this.parent.type != 'svg' && this.cat == 'g') {
			let msSvg = new MMS({ parent: this.parent, type: 'svg' }).setDefaults().attach();
			this.parent = msSvg;
			this.posRef = msSvg;
		}
		if (domel) { addIf(this.parent.children, this); this.isAttached = true; }
		this.x = 0; this.y = 0; this.w = 0; this.h = 0;
		this.parts = { _: this.elem };
		this.uis = [];
		this.handlers = { click: {}, mouseenter: {}, mouseleave: {} };
	}
	//#region events
	_handler(ev) {
		ev.stopPropagation();
		if (!this.isEnabled) return;
		let part = ev.currentTarget;
		let partName = isdef(part.name) ? part.name : '_';
		let eventName = ev.handleObj.origType;
		let handler = this.handlers[eventName][partName];
		if (isdef(handler)) { counters[eventName] += 1; counters.events += 1; handler(this, part); }
	}
	addHandler(evName, partName = '_', handler = null, autoEnable = true) {
		let part = this.parts[partName];
		if (nundef(part)) { part = this.elem; partName = '_'; }
		if (isdef(handler)) { this.handlers[evName][partName] = handler; }
		$(part).off(evName).on(evName, this._handler.bind(this));
		if (autoEnable) this.enable();
	}
	addClickHandler(partName = '_', handler = null, autoEnable = true) { this.addHandler('click', partName, handler, autoEnable); }
	addMouseEnterHandler(partName = '_', handler = null, autoEnable = true) { this.addHandler('mouseenter', partName, handler, autoEnable); }
	addMouseLeaveHandler(partName = '_', handler = null, autoEnable = true) { this.addHandler('mouseleave', partName, handler, autoEnable); }
	removeEvents() {
		$(this.elem).off();
		if (S_showEvents) this.showEvents(this.elem);
		for (const partName in this.parts) {
			$(this.parts[partName]).off();
			if (S_showEvents) this.showEvents(this.parts[partName]);
		}
	}
	//#endregion
	//#region done
	clear(startProps = {}) {
		let ids = this.children.map(x => x.id);
		for (const id of ids) UIS[id].destroy();
		for (const k in startProps) {
			this.elem[k] = startProps[k];
		}
		console.log('children after clear', this.children);
	}
	destroy() {
		$(this.elem).remove();
		this.elem = null;
		removeInPlace(this.parent.children, this);
		delete UIS[this.id];
	}
	//#endregion
	//#region work
	title(s, key = 'title') {
		if (this.parts[key]) {
			this.parts[key].style.backgroundColor = randomColor();
			return;
		}
		let t = document.createElement('div');
		t.style.backgroundColor = 'dimgray';
		this.titleColor = t.style.backgroundColor;
		t.classList.add('tttitle');
		t.innerHTML = s;
		this.elem.appendChild(t);
		this.parts[key] = t;
		t.name = key;
		this.attach();
		return this;
	}
	table(o, keys, key = 'table') {
		if (this.parts[key]) {
			let oldTable = this.parts[key];
			let t = tableElem(o, keys);
			let t2 = t.innerHTML;
			oldTable.innerHTML = t2;
		} else {
			let t = tableElem(o, keys);
			this.elem.appendChild(t);
			this.attach();
			this.parts[key] = t;
			t.name = key;
		}
		return this;
	}
	//#endregion
	//#region TODO
	attach() { if (!this.isAttached) { addIf(this.parent.children, this); this.parent.elem.appendChild(this.elem); } return this; }
	detach() { if (this.isAttached) { removeIf(this.parent.children, this); this.parent.elem.removeChild(this.elem); } return this; }
	_onMouseEnter(ev) {
		if (!this.isEnabled) return;
		let partName = evToId(ev);
		if (S_showEvents) {
			counters.events += 1;
		}
		if (typeof this.mouseEnterHandler == 'function') {
			if (S_showEvents)
				this.mouseEnterHandler(ev);
		}
	}
	_onMouseLeave(ev) {
		if (!this.isEnabled) return;
		let partName = evToId(ev);
		if (S_showEvents) {
			counters.events += 1;
		}
		if (typeof this.mouseLeaveHandler == 'function') {
			if (S_showEvents)
				this.mouseLeaveHandler(ev);
		}
	}
	_getRect(x = 0, y = 0, w = 50, h = 25, bg, fg) {
		let r = document.createElementNS('http://www.w3.org/2000/svg', 'rect');
		r.setAttribute('width', w);
		r.setAttribute('height', h);
		r.setAttribute('x', x);
		r.setAttribute('y', y);
		if (isdef(bg)) r.setAttribute('fill', bg);
		if (isdef(fg)) r.setAttribute('stroke', bg);
		return r;
	}
	_getDiv(x, y, w, h, bg, fg) {
		let r = document.createElement('div');
		if (this.w < w || this.h < h) { this.setSize(w, h); }
		if (isdef(x)) {
			r.style.position = 'absolute';
			r.style.left = x + 'px';
			r.style.top = y + 'px';
		}
		if (isdef(w)) {
			r.style.width = w + 'px';
			r.style.height = h + 'px';
		}
		if (isdef(bg)) r.style.backgroundColor = bg;
		if (isdef(fg)) r.style.color = fg;
		return r;
	}
	addInteractivity(partName, hover = true, click = true) {
		let part = this.parts[partName];
		if (nundef(part)) { part = this.elem; }
		if (this.part.isInteractive) return;
		this.part.isInteractive = true;
		if (click) this.part.clickHandler = null;
		if (hover) { this.part.mouseEnterHandler = null; this.part.mouseLeaveHandler = null; }
		this.isEnabled = false;
		this.enable = () => this.isEnabled = true;
		this.disable = () => this.isEnabled = false;
		this.elem.addEventListener('click', this._onClick.bind(this));
		this.elem.addEventListener('mouseenter', this._onMouseEnter.bind(this));
		this.elem.addEventListener('mouseleave', this._onMouseLeave.bind(this));
		return this;
	}
	enable() {
		this.isEnabled = true;
	}
	disable() {
		this.isEnabled = false;
	}
	high() {
		if (isdef(this.parts) && isdef(this.parts.title)) this.parts['title'].style.backgroundColor = '#ccff00';
		else {
			this.elem.classList.add('selected');
			this.elem.backgroundColor = '#ccff00';
		}
	}
	unhigh() {
		if (isdef(this.parts) && isdef(this.parts.title)) this.parts['title'].style.backgroundColor = this.titleColor;
		else {
			this.elem.classList.remove('selected');
			this.elem.backgroundColor = this.titleColor;
		}
	}
	sel() { }
	unsel() { }
	frame() { }
	unframe() { }
	setDefaults({ x, y, w, h, bg, fg } = {}) {
		if (this.parent.type == 'svg' && isdef(bg) && nundef(w) && nundef(h) && this.domType == 'g') {
			this.parent.setBg(bg);
		} else {
			if (isdef(bg) || this.cat == 'd') {
				bg = nundef(bg) ? 'transparent' : bg;
				this.setBg(bg);
				fg = nundef(fg) ? bg == 'transparent' ? this.parent.fg : colorIdealText(bg) : fg;
				this.setFg(fg);
			}
		}
		if (this.cat == 'd' && (nundef(this.x) || nundef(this.w))) return this;
		w = nundef(w) ? this.posRef.w : w;
		h = nundef(h) ? this.posRef.h : h;
		this.setSize(w, h);
		x = nundef(x) ? 0 : this.posRef.x + x;
		y = nundef(y) ? 0 : this.posRef.y + y;
		if (this.parent.cat == 'd') { this.parent.elem.style.position = 'absolute'; }
		this.setPos(x, y);
		return this;
	}
	setBg(c, updateFg = false) {
		this.bg = c;
		if (this.cat == 'g') {
			if (this.domType == 'text') {
				if (!this.textBackground) {
				}
			} else {
				this.elem.setAttribute('fill', c);
			}
		} else {
			this.elem.style.backgroundColor = c;
		}
		if (updateFg) {
			this.setFg(colorIdealText(c), true);
		}
		return this;
	}
	setFg(c) {
		this.fg = c;
		if (this.cat == 'g') {
			if (this.domType == 'text') {
				this.elem.setAttribute('fill', c);
			} else {
				this.elem.setAttribute('stroke', c);
			}
		} else {
			this.elem.style.color = c;
		}
		return this;
	}
	setFullSize() {
		this.setSize(this.posRef.w, this.posRef.h);
		this.setPos(0, 0);
	}
	setSize(w, h) {
		this.w = w; this.h = h;
		if (this.cat == 'g') {
			if (this.ground) {
				this.ground.setAttribute('width', w);
				this.ground.setAttribute('height', h);
			} else {
				this.elem.setAttribute('width', w);
				this.elem.setAttribute('height', h);
			}
			if (this.overlay) {
				this.overlay.setAttribute('width', w);
				this.overlay.setAttribute('height', h);
			}
		} else {
			this.elem.style.position = 'absolute';
			this.elem.style.width = w + 'px';
			this.elem.style.height = h + 'px';
		}
		return this;
	}
	setPos(x, y) {
		this.x = x;
		this.y = y;
		if (this.cat == 'g') {
			this.elem.setAttribute('transform', `translate(${x},${y})`);
		} else {
			this.elem.style.position = 'absolute'
			this.elem.style.left = x + 'px';
			this.elem.style.top = y + 'px';
		}
		return this;
	}
	center() {
		this.setPos(-this.w / 2, -this.h / 2)
	}
	centerOrigin() {
		this.setPos(this.w / 2, this.h / 2);
	}
	rect({ x = 0, y = 0, w = 50, h = 25, bg, fg } = {}) {
		let pa = this.domType == 'g' ? this._getRect(x, y, w, h, bg, fg) : this._getDiv(x, y, w, h, bg, fg);
		this.elem.appendChild(pa);
		this.attach();
		return this;
	}
	addBorder(c) {
		if (this.cat == 'd') {
			this.elem.style.border = '1px solid ' + c;
		}
	}
	removeBorder() {
		if (this.cat == 'd') {
			this.elem.style.border = null;
		}
	}
	selBlack() {
		if (this.isSelBlack) return;
		this.elem.classList.add('selBlack');
		this.isSelBlack = true;
	}
	unselBlack() {
		if (!this.isSelBlack) return;
		this.elem.classList.remove('selBlack');
		this.isSelBlack = false;
	}
	selRed() { }
	unselAll() { this.removeBorder(); }
	//#endregion
}
class NAssets {
	constructor() {
		this.tilePositions = {};
		this.tileNames;
		this.trackPositions = {};
		this.nationPositions = {};
		this.nationNames;
		this.unitCountInfo;
		this.nationalityNames;
		this.unitTypeNames;
		this.factionSetup;
		this.factionNames;
		this.uniqueIdCounter = 0;
		let neutralColor = [230, 230, 120];
		this.troopColors = {
			Germany: [174, 174, 176],
			Britain: [86, 182, 222],
			France: [121, 200, 205],
			USSR: [233, 138, 134],
			USA: [145, 186, 130],
			Italy: [174, 172, 131],
			Neutral: neutralColor,
			Minor: neutralColor,
			Major: neutralColor,
			Axis: [174, 174, 176],
			West: [86, 182, 222]
		};
		this.SZ = {
			tile: 180,
			pAxis: { x: 0, y: 50 },
			pWest: { x: -50, y: -30 },
			pUSSR: { x: +50, y: -30 },
			cadrePrototype: 60,
			sumCadre: 60,
			cadreDetail: 44,
			cardWidth: 100,
			cardHeight: 150,
			gap: 10,
			chip: 40,
			nation: 130,
			influence: 40
		};
		this.uid2id = {};
		this.id2uid = {};
		this.phaseNames = [
			"Setup",
			"New_Year",
			"Production",
			"Government",
			"Spring",
			"Summer",
			"Blockade",
			"Fall",
			"Winter",
			"Satellite",
			"Movement",
			"Combat",
			"Supply",
			"Retreat",
			"Land_Battle",
			"Sea_Battle",
			"Scoring"
		];
	}
	distanceBetweenTiles(tilename1, tilename2) {
		let pos1 = this.tilePositions[tilename1];
		let pos2 = this.tilePositions[tilename2];
		return dSquare(pos1, pos2);
	}
	initAssets(map, callback) {
		this.calculateTrackPositions();
		loadYML("/a/assets/config/map_pos.yml", data => {
			this.tilePositions = {};
			for (const idTile in data) {
				let id = replaceAll(idTile, " ", "_");
				this.tilePositions[id] = data[idTile];
			}
			this.tileNames = Object.keys(this.tilePositions);
			loadYML("/a/assets/config/nations.yml", data => {
				this.nationPositions = {};
				for (const idNation in data) {
					let id = replaceAll(idNation, " ", "_");
					this.nationPositions[id] = data[idNation];
				}
				this.nationNames = Object.keys(this.nationPositions);
				loadYML("/a/assets/config/unit_count.yml", data => {
					this.unitCountInfo = data;
					this.nationalityNames = Object.keys(data);
					this.unitTypeNames = Object.keys(data["Germany"]);
					loadYML("/a/assets/config/faction_setup.yml", data => {
						this.factionSetup = data;
						this.factionNames = Object.keys(data);
						callback();
					});
				});
			});
		});
	}
	calculateTrackPositions() {
		let arr = [];
		let x = 580;
		let y = 2120;
		for (let i = 0; i < 25; i++) {
			arr.push({ x: x, y: y });
			x += 66;
		}
		this.trackPositions.Axis = arr;
		arr = [];
		x = 1310;
		y = 76;
		for (let i = 0; i < 20; i++) {
			arr.push({ x: x, y: y });
			x -= 66;
		}
		for (let i = 20; i < 25; i++) {
			arr.push({ x: x, y: y });
			y += 66;
		}
		this.trackPositions.West = arr;
		arr = [];
		x = 2210;
		y = 76;
		for (let i = 0; i < 18; i++) {
			arr.push({ x: x, y: y });
			x += 66;
		}
		for (let i = 18; i < 25; i++) {
			arr.push({ x: x, y: y });
			y += 66;
		}
		this.trackPositions.USSR = arr;
	}
	clear() {
		this.uid2id = {};
		this.id2uid = {};
		this.uniqueIdCounter = 0;
	}
	drawNationPositions() {
		unitTestFilterNation('drawNationPositions starting');
		let nationDict = {};
		for (const id in this.nationPositions) {
			let pos = this.nationPositions[id];
			let sz = this.SZ.nation;
			let ms = new MS(id, "mapG", this.getUniqueId(id))
				.circle({ className: "overlay nation", sz: sz })
				.setPos(pos.x, pos.y)
				.draw();
			nationDict[id] = ms;
		}
		unitTestFilterNation(nationDict);
		return nationDict;
	}
	getUniqueId(id) {
		let uid = this.uniqueIdCounter + "_" + id;
		this.uniqueIdCounter += 1;
		this.uid2id[uid] = id;
		this.id2uid[id] = uid;
		return uid;
	}
}
class NDataProcessor {
	constructor(backendUrl) {
		this.callback = null;
		this.serverData = null;
		this.player = "";
		this.tuplesInAction = [];
		this.gameObjects = {};
		this.backendUrl = backendUrl;
		this.msgCounter = 0;
		this.sender = new NBackendCommunicator("http://localhost:5000/");
	}
	action(player, tuple, callback) {
		this.player = player;
		this.callback = callback;
		this.sender.send("action/" + this.player + "/" + tuple.join("+"), this.actionStep1.bind(this));
	}
	actionStep1(data) {
		this.serverData = data;
		this.sender.send("info/" + this.player, this.actionStep2.bind(this));
	}
	actionStep2(data) {
		this.augmentServerData(data, 2);
		if ("waiting_for" in this.serverData) {
			let plNext = this.serverData.waiting_for.set[0];
			this.serverData.game.playerChangedTo = plNext;
			this.sender.send("status/" + plNext, this.actionStep3.bind(this));
		} else {
			this.processServerData();
		}
	}
	actionStep3(data) {
		this.augmentServerData(data, 3);
		this.processServerData();
	}
	augmentServerData(data, step) {
		jQuery.extend(true, this.serverData, data);
	}
	initGame(player, callback) {
		this.callback = callback;
		this.player = player;
		this.sender.send("init/hotseat/" + player, this.actionStep1.bind(this));
	}
	loadGame(player, filename, callback) {
		this.callback = callback;
		this.filename = filename;
		this.player = player;
		this.sender.send("myload/" + this.filename + '.json', this.loadStep3.bind(this), this.player);
	}
	loadStep1(data) {
		this.serverData = data;
		this.sender.send("myload/" + this.filename + '.json', this.loadStep2.bind(this), this.player);
	}
	loadStep2(data) {
		if (!this.serverData) this.serverData = {}
		this.serverData.created = data;
		this.sender.send("info/" + this.player, this.actionStep2.bind(this));
	}
	loadStep3(data) {
		if (!this.serverData) this.serverData = {}
		this.serverData.created = data;
		this.sender.send("info/" + this.player, this.loadStep4.bind(this));
	}
	loadStep4(data) {
		this.augmentServerData(data, 3);
		this.sender.send("status/" + this.player, this.loadStep5.bind(this));
	}
	loadStep5(data) {
		this.augmentServerData(data, 3);
	}
	processActions() {
		let data = this.serverData;
		if (!"actions" in data) {
			this.tuplesInAction = [];
		} else {
			let tuples = expand(data.actions);
			if (!empty(tuples) && tuples.length == 1 && !Array.isArray(tuples[0])) {
				tuples = [tuples];
			}
			this.tuplesInAction = tuples;
		}
	}
	processLog() {
		if ("log" in this.serverData) {
			this.serverData.log = toHTMLString(this.serverData.log);
		}
	}
	processGameObjects() {
		let data = this.serverData;
		let g = {};
		if ("created" in data) {
			for (const id in data.created) {
				let sid = id.toString();
				g[sid] = data.created[id];
			}
		}
		if ("updated" in data) {
			for (const id in data.updated) {
				let sid = id.toString();
				g[sid] = data.updated[id];
			}
		}
		this.gameObjects = g;
		return;
	}
	processMessage(jsonData, callback = null) {
		this.serverData = jsonData;
		processLog();
		if (callback) callback(this.serverData);
	}
	processServerData() {
		this.processLog();
		this.processGameObjects();
		this.serverData.game.player = this.player;
		this.processActions();
		this.callback(this.tuplesInAction, this.gameObjects, this.serverData.game, this.serverData);
	}
}
class nn1 {
	constructor() {
		this.l1Size = 2;
		this.l2Size = 3;
		this.l3Size = 1;
	}
}
class NPage {
	constructor() {
		this.view = null;
	}
	clearAllObjects() {
		clearElementFromChildIndex(document.getElementById("mapG"), 1);
		clearElementFromChildIndex(document.getElementById("handG_West"), 1);
		clearElementFromChildIndex(document.getElementById("handG_Axis"), 1);
		clearElementFromChildIndex(document.getElementById("handG_USSR"), 1);
		clearElementFromChildIndex(document.getElementById("openCardG"), 1);
		clearElement(document.getElementById("divSelect"));
		clearElement(this.battle_area);
	}
	selectView() {
		if (this.view == 'select') return;
		this.view = 'select';
		hide(this.battle_area);
		show(this.status_area);
		show(this.edit_area);
		show(this.command_area);
		show(this.command2_area);
		show(this.map_area);
		show(this.log_area);
		show(this.hand_area);
		show(this.cards2_area);
		hideSvg(this.actionDeckG);
		showSvg(this.openCardG);
		hide(this.cards3_area);
		hideSvg(this.investmentDeckG);
		showSvg(this.discardedG);
		this.mainDiv.className = "grid_game_may";
		return this;
	}
	battleView() {
		if (this.view == 'battle') return;
		this.view = 'battle';
		show(this.battle_area);
		show(this.status_area);
		show(this.edit_area);
		show(this.command_area);
		show(this.command2_area);
		show(this.map_area);
		show(this.log_area);
		show(this.hand_area);
		hide(this.cards2_area);
		hideSvg(this.actionDeckG);
		hideSvg(this.openCardG);
		hide(this.cards3_area);
		hideSvg(this.investmentDeckG);
		hideSvg(this.discardedG);
		this.mainDiv.className = "grid_game_battle";
		return this;
	}
	initView() {
		this.mainDiv = document.getElementById("mainDiv");
		this.status_area = document.getElementById("status_area");
		this.edit_area = document.getElementById("edit_area");
		this.map_area = document.getElementById("map_area");
		this.log_area = document.getElementById("log_area");
		this.command_area = document.getElementById("command_area");
		this.command2_area = document.getElementById("command2_area");
		this.hand_area = document.getElementById("hand_area");
		this.battle_area = document.getElementById("battle_area");
		this.cards2_area = document.getElementById("cards2_area");
		this.cards3_area = document.getElementById("cards3_area");
		this.openCardG = document.getElementById("openCardG");
		this.actionDeckG = document.getElementById("actionDeckG");
		this.discardedG = document.getElementById("discardedG");
		this.investmentDeckG = document.getElementById("investmentDeckG");
		return this;
	}
}
class NSettings {
	constructor() {
	}
}
class Peep {
	constructor({
		image,
		rect,
	}) {
		this.image = image
		this.setRect(rect)
		this.x = 0
		this.y = 0
		this.anchorY = 0
		this.scaleX = 1
		this.walk = null
	}
	setRect(rect) {
		this.rect = rect
		this.width = rect[2]
		this.height = rect[3]
		this.drawArgs = [
			this.image,
			...rect,
			0, 0, this.width, this.height
		]
	}
	render(ctx) {
		ctx.save()
		ctx.translate(this.x, this.y)
		ctx.scale(this.scaleX, 1)
		ctx.drawImage(...this.drawArgs)
		ctx.restore()
	}
}
class PerlenSettingsClass extends SettingsClass {
	setOtherSettings(elem) {
		console.log('____________elem', elem);
		let val = elem.value;
		let key = elem.keyList[0];
		console.log('val', val, 'key', key, 'elem.value', elem.value)
		switch (key) {
			case 'boardStandard':
				let data = DB.standardSettings[val];
				if (nundef(data)) { console.log('NO! key', key); return; }
				for (const k in data) {
					console.log('k', k)
					this.o[k] = data[k];
				}
				this.o.boardStandard = val;
				console.log('settings sollen so geaendert werden:', data);
				this.createSettingsUi();
				break;
		}
	}
	setzeEinActiveOptions(dParent, label, optionList, friendlyList, init, skeys) {
		let d = mDiv(dParent);
		let val = init;
		let inp = createElementFromHTML(`<select class="options" onchange="Settings.setOtherSettings(this)"></select>`);
		for (let i = 0; i < optionList.length; i++) {
			let opt = optionList[i];
			let friendly = friendlyList[i];
			let optElem = createElementFromHTML(`<option value="${opt}">${friendly}</option>`);
			mAppend(inp, optElem);
			if (opt == val) optElem.selected = true;
		}
		inp.value = val;
		let labelui = createElementFromHTML(`<label>${label}</label>`);
		mAppend(d, labelui);
		mAppend(labelui, inp);
		mStyleX(inp, { maleft: 12, mabottom: 4 });
		inp.keyList = skeys;
	}
	setzeEinBrowseFile(dParent, label, init, skeys) {
		let d = mDiv(dParent);
		let val = lookup(this.o, skeys);
		if (nundef(val)) val = init;
		let inp = createElementFromHTML(
			`<input type="text" class="input" value="${val}"  />`);
		let labelui = createElementFromHTML(`<label>${label}</label>`);
		mAppend(d, labelui);
		mAppend(labelui, inp);
		var fakeInput = document.createElement("input");
		fakeInput.type = "file";
		fakeInput.accept = "image/*";
		fakeInput.multiple = false;
		inp.onclick = () => { fakeInput.click(); };
		fakeInput.onchange = () => {
			let imgFile = fakeInput.files[0];
			previewBrowsedFile(dTable, imgFile);
			let val = inp.value = getFilename(imgFile.name);
			this.hasChanged = true;
			this.haveChanged.push(skeys);
			this.o[skeys[0]] = val;
			this.imgFile = imgFile;
		};
		mStyleX(inp, { maleft: 12, mabottom: 4, cursor: 'pointer' });
		mClass(inp, 'input');
		inp.keyList = skeys;
		this.addSetting(skeys[0]);
	}
	createSettingsUi() {
		let dParent = mBy('dSettingsContent');
		mCenterFlex(dParent);
		clearElement(dParent);
		this.list = [];
		let fertigSets = DB.standardSettings;
		let fsNames = Object.keys(fertigSets); fsNames.unshift('none');
		let nGroupBoardSettings = this.mInputGroup(dParent);
		this.setzeEinOptions(nGroupBoardSettings, 'base on standard', fsNames, fsNames, 'shapeShifters', ['boardStandard']);
		this.setzeEinOptions(nGroupBoardSettings, 'board layout', ['hex1', 'hex', 'quad', 'circle'], ['hex1', 'hex', 'quad', 'circle'], 'hex1', ['boardLayout']);
		this.setzeEinBrowseFile(nGroupBoardSettings, 'board filename', 'shapeShifters', ['boardFilename']);
		this.setzeEineZahl(nGroupBoardSettings, 'board rotation', 0, ['boardRotation']);
		this.setzeEineZahl(nGroupBoardSettings, 'top margin', 10, ['boardMarginTop']);
		this.setzeEineZahl(nGroupBoardSettings, 'left margin', 20, ['boardMarginLeft']);
		this.setzeEinenString(nGroupBoardSettings, 'field color', 'transparent', ['fieldColor']);
		this.setzeEineZahl(nGroupBoardSettings, 'field width', 100, ['dxCenter']);
		this.setzeEineZahl(nGroupBoardSettings, 'field height', 120, ['dyCenter']);
		this.setzeEineZahl(nGroupBoardSettings, 'horizontal gap', 10, ['wGap']);
		this.setzeEineZahl(nGroupBoardSettings, 'vertical gap', 20, ['hGap']);
		this.setzeEineZahl(nGroupBoardSettings, 'rows', 7, ['rows']);
		this.setzeEineZahl(nGroupBoardSettings, 'columns', 6, ['cols']);
		this.setzeEineZahl(nGroupBoardSettings, 'max width', 800, ['wFieldArea']);
		this.setzeEineZahl(nGroupBoardSettings, 'max height', 800, ['hFieldArea']);
		let nGroupPerlenSettings = this.mInputGroup(dParent);
		this.setzeEinOptions(nGroupPerlenSettings, 'pool selection', ['random', 'mixed', 'player'], ['random', 'mixed', 'never'], 'random', ['poolSelection']);
		this.setzeEineZahl(nGroupPerlenSettings, 'random pool size', 25, ['numPool']);
	}
}
class Player {
	constructor(id, color) {
		this.id = id;
		this.color = getColorDictColor(color);
	}
}
class Recorder {
	constructor(lang) {
		let rec = this.rec = new webkitSpeechRecognition();
		rec.continuous = true;
		rec.interimResults = true;
		rec.maxAlternatives = 5;
		this.setLanguage(lang);
		this.isRunning = false;
		this.isCancelled = false;
		this.result = null;
		this.isFinal = null;
		this.confidence = null;
		this.callback = null;
		let genHandler = (ev, name) => {
			console.log('genHandler', name)
			if (RecogOutput) console.log('recorder', name, 'isCancelled', this.isCancelled, 'isRunning', this.isRunning);
		}
		rec.onerror = ev => {
			genHandler(ev, 'error');
			if (ev.error == 'network') {
				alert('no internet connection: speech recognition is not available! (error:' + ev.error + ')');
				RecognitionAvailable = false;
			}
			if (RecogOutputError) console.error(ev);
			this.stop();
		};
		rec.onstart = ev => {
			genHandler(ev, 'started');
			if (!this.isCancelled) this.isRunning = true;
		};
		rec.onresult = ev => {
			genHandler(ev, 'result!');
			if (!this.isCancelled) this.processResult(ev);
		};
		rec.onend = ev => {
			genHandler(ev, 'ended');
			if (!this.isCancelled && this.callback) {
				this.callback(this.isFinal, this.result, this.confidence, SessionId);
			}
			this.isCancelled = this.isRunning = false;
			this.callback = null;
		};
	}
	processResult(ev) {
		let res = ev.results[0];
		this.isFinal = res.isFinal;
		this.result = res[0].transcript;
		this.confidence = res[0].confidence;
		if (this.isFinal) console.log('....result', this.result, 'FINAL?', this.isFinal)
		if (this.isFinal) {
			this.stop();
		}
	}
	setLanguage(lang) { this.rec.lang = (lang == 'E' ? 'en-US' : 'de-DE'); }
	start() {
		MicrophoneShow();
		setTimeout(() => this.rec.start(), 10);
	}
	stop() {
		MicrophoneHide();
		setTimeout(() => this.rec.stop(), 10);
	}
	getLastResult() {
		return { isFinal: this.isFinal, result: this.result, confidence: this.confidence };
	}
}
class RSG {
	constructor() {
		this.nodes = {};
		this.uiNodes = {};
		this.isUiActive = false;
		this.uid2oids = {};
		this.oid2uids = {};
		this.path2oid = {};
	}
	add_node(n, oid) {
		this.nodes[oid] = n;
		if (isEmpty(n.path)) this.root = n;
		if (isList(n.content) && n.content.length == 0) {
			n.type = 'empty_list';
		}
		this.path2oid[n.path] = n.oid;
		console.assert(nundef(Items[n.path]), 'duplicate path in Items!!! ' + n.path);
		console.assert(nundef(Items[oid]), 'duplicate oid in Items!!! ' + oid);
		Items[n.oid] = Items[n.path] = n;
	}
	add_ui_node(ui, uid, oid) {
		this.uiNodes[uid] = ui;
		lookupAddIfToList(this.uid2oids, [uid], oid);
		lookupAddIfToList(this.oid2uids, [oid], uid);
		if (Items[oid].type != 'card') console.assert(nundef(Items[uid]), 'duplicate uid in Items!!! ' + uid);
		Items[uid] = ui;
		let o = Items[oid];
		ui.setAttribute('oid', oid);
		iAdd(o, { div: ui });
	}
	getUI(uid) { return this.uiNodes[uid]; }
	get_item_from_path(path) { return Items[path]; }
	get_item(id) {
		if (id[0] == '_') {
			let oid = Items[id].getAttribute('oid');
			return Items[oid];
		} else return Items[id];
	}
}
class ScriptLoader {
	constructor(options) {
		this.protocol = document.location.protocol;
		this.global = 'Segment';
		this.isLoaded = false;
	}
	loadScript() {
		return new Promise((resolve, reject) => {
			const script = document.createElement('script');
			script.type = 'text/javascript';
			script.async = true;
			script.src = `${this.protocol}/` + `/${this.src}`;
			const el = document.getElementsByTagName('script')[0];
			el.parentNode.insertBefore(script, el);
			script.addEventListener('load', () => {
				this.isLoaded = true;
				resolve(script);
			})
			script.addEventListener('error', () => {
				reject(new Error(`${this.src} failed to load.`));
			})
		})
	}
	load(src) {
		if (startsWith(src, 'http')) src = stringAfter(src, '://');
		this.src = src;
		return new Promise(async (resolve, reject) => {
			if (!this.isLoaded) {
				try {
					await this.loadScript();
					resolve(window[this.global]);
				} catch (e) {
					reject(e);
				}
			} else {
				resolve(window[this.global]);
			}
		})
	}
}
class SettingsClass {
	constructor(settingsObject, userObject, dParent) {
		this.o = settingsObject;
		this.u = userObject;
		this.dParent = dParent;
	}
	//#region settings ui
	createSettingsUi(dParent) {
		dParent = valf(dParent, this.dParent);
		clearElement(dParent);
		this.list = [];
		let ttag = 'h2';
		mAppend(dParent, createElementFromHTML(`<${ttag}>Settings for ${this.u.id}:</${ttag}>`));
		let nGroupNumCommonAllGames = this.mInputGroup(dParent);
		this.setzeEineZahl(nGroupNumCommonAllGames, 'samples', 25, ['samplesPerGame']);
		this.setzeEineZahl(nGroupNumCommonAllGames, 'minutes', 1, ['minutesPerUnit']);
		this.setzeEineZahl(nGroupNumCommonAllGames, 'correct streak', 5, ['incrementLevelOnPositiveStreak']);
		this.setzeEineZahl(nGroupNumCommonAllGames, 'fail streak', 2, ['decrementLevelOnNegativeStreak']);
		this.setzeEinOptions(nGroupNumCommonAllGames, 'show labels', ['toggle', 'always', 'never'], ['toggle', 'always', 'never'], 'toggle', ['pictureLabels']);
		this.setzeEinOptions(nGroupNumCommonAllGames, 'language', ['E', 'D', 'S', 'F', 'C'], ['English', 'German', 'Spanish', 'French', 'Chinese'], 'E', ['language']);
		this.setzeEinOptions(nGroupNumCommonAllGames, 'vocabulary', Object.keys(KeySets), Object.keys(KeySets), 'best25', ['vocab']);
		this.setzeEineCheckbox(nGroupNumCommonAllGames, 'show time', false, ['showTime']);
		this.setzeEineCheckbox(nGroupNumCommonAllGames, 'spoken feedback', true, ['spokenFeedback']);
		this.setzeEineCheckbox(nGroupNumCommonAllGames, 'silent', false, ['silentMode']);
		this.setzeEineCheckbox(nGroupNumCommonAllGames, 'switch game after level', false, ['switchGame']);
		this.setzeEineZahl(nGroupNumCommonAllGames, 'trials', 3, ['trials']);
		this.setzeEineCheckbox(nGroupNumCommonAllGames, 'show hint', true, ['showHint']);
	}
	setSettingsKeys(elem) {
		let val = elem.type == 'number' ? Number(elem.value) : elem.type == 'checkbox' ? elem.checked : elem.value;
		lookupSetOverride(this.o, elem.keyList, val);
		this.hasChanged = true;
	}
	setSettingsKeysSelect(elem) {
		let val;
		for (const opt of elem.children) {
			if (opt.selected) val = opt.value;
		}
		this.hasChanged = true;
		lookupSetOverride(this.o, elem.keyList, val);
	}
	setzeEineZahl(dParent, label, init, skeys) {
		let d = mDiv(dParent);
		let val = lookup(this.o, skeys);
		if (nundef(val)) val = init;
		let inp = createElementFromHTML(
			`<input type="number" class="input" value="${val}" onfocusout="Settings.setSettingsKeys(this)" />`);
		let labelui = createElementFromHTML(`<label>${label}</label>`);
		mAppend(d, labelui);
		mAppend(labelui, inp);
		mStyleX(inp, { maleft: 12, mabottom: 4 });
		mClass(inp, 'input');
		inp.keyList = skeys;
		this.addSetting(skeys[0]);
	}
	setzeEineCheckbox(dParent, label, init, skeys) {
		let d = mDiv(dParent);
		let val = lookup(this.o, skeys);
		if (nundef(val)) val = init;
		let inp = createElementFromHTML(
			`<input type="checkbox" class="checkbox" ` + (val === true ? 'checked=true' : '') + ` onfocusout="Settings.setSettingsKeys(this)" >`
		);
		let labelui = createElementFromHTML(`<label>${label}</label>`);
		mAppend(d, labelui);
		mAppend(labelui, inp);
		mStyleX(inp, { maleft: 12, mabottom: 4 });
		mClass(inp, 'input');
		inp.keyList = skeys;
		this.addSetting(skeys[0]);
	}
	setzeEinOptions(dParent, label, optionList, friendlyList, init, skeys) {
		let d = mDiv(dParent);
		let val = lookup(this.o, skeys);
		if (nundef(val)) val = init;
		let inp = createElementFromHTML(`<select class="options" onfocusout="Settings.setSettingsKeysSelect(this)"></select>`);
		for (let i = 0; i < optionList.length; i++) {
			let opt = optionList[i];
			let friendly = friendlyList[i];
			let optElem = createElementFromHTML(`<option value="${opt}">${friendly}</option>`);
			mAppend(inp, optElem);
			if (opt == val) optElem.selected = true;
		}
		let labelui = createElementFromHTML(`<label>${label}</label>`);
		mAppend(d, labelui);
		mAppend(labelui, inp);
		mStyleX(inp, { maleft: 12, mabottom: 4 });
		inp.keyList = skeys;
		this.addSetting(skeys[0]);
	}
	//#endregion
	//#region helpers 
	mInputGroup(dParent, styles) {
		let baseStyles = { display: 'inline-block', align: 'right', bg: '#00000080', rounding: 10, padding: 20, margin: 12 };
		if (isdef(styles)) styles = mergeOverride(baseStyles, styles); else styles = baseStyles;
		return mDiv(dParent, styles);
	}
	addSetting(keylist) { if (nundef(this.list)) this.list = []; this.list.push(keylist); }
	updateSettings() {
		this.updateLabelSettings();
		this.updateTimeSettings();
		this.updateSpeakmodeSettings();
		let scope = 'user';//'game' 'level','temp','all'
		if (scope == 'temp' || nundef(this.list)) return;
		for (const k of this.list) {
			if (scope == 'user') lookupSetOverride(U, ['settings', k], this.o[k]);
			else if (scope == 'game') lookupSetOverride(U, ['games', this.o.id, k], this.o[k]);
			else if (scope == 'level') lookupSetOverride(U, ['games', this.o.id, 'levels', this.o.level, k], this.o[k]);
			else if (scope == 'all') lookupSetOverride(DB, ['settings', k], this.o[k]);
		}
	}
	updateSpeakmodeSettings() { if (this.o.silentMode && this.o.spokenFeedback) this.o.spokenFeedback = false; }
	updateTimeSettings() { checkTimer(this.o); }
	updateLabelSettings() {
		if (this.o.pictureLabels == 'toggle') this.o.showLabels = true;
		else this.o.showLabels = (this.o.pictureLabels == 'always');
	}
	updateGameValues(U) {
		let game = this.o.id;
		let level = this.o.level;
		let settings = { numColors: 1, numRepeat: 1, numPics: 1, numSteps: 1, colors: ColorList };
		settings = mergeOverride(settings, DB.settings);
		if (isdef(U.settings)) settings = mergeOverride(settings, U.settings);
		if (isdef(DB.games[game])) settings = mergeOverride(settings, DB.games[game]);
		let next = lookup(DB.games, [game, 'levels', level]); if (next) settings = mergeOverride(settings, next);
		next = lookup(U, ['games', game]); if (next) settings = mergeOverride(settings, next);
		next = lookup(U, ['games', game, 'levels', level]); if (next) settings = mergeOverride(settings, next);
		delete settings.levels;
		delete settings.colors;
		Speech.setLanguage(settings.language);
		copyKeys(settings, this.o);
		this.updateSettings();
	}
}
class SimpleClass7 {
	constructor() {
		this.dParent = dTable;
		this.initialPoolSelected = false;
		this.settings = {};
		this.randomIndices = [];
		openToolbar();
	}
	presentGameState(data) {
		console.log('_________________________gs', StepCounter); StepCounter += 1;
		mStyleX(dTable, { h: window.innerHeight });
		let [settings, state] = this.processData(data);
		console.assert(state.poolArr.map(x => !isList(x)), 'BUGBUGBUGBUGBUGBUGBUG!!!')
		let needToLoadBoard = nundef(this.clientBoard) || this.clientBoard.boardFilename != settings.boardFilename;
		if (needToLoadBoard) {
			clearElement(this.dParent);
			this.dPool = null;
			this.clientBoard = applyStandard(this.dParent, this.settings);
			if (!this.inSyncWithServer()) return;
		}
		else if (isdef(data.settings)) { this.clientBoard = applySettings(this.clientBoard, this.settings); }
		if (nundef(this.dPool)) {
			mLinebreak(this.dParent, 30);
			let dPool = this.dPool = mDiv(this.dParent);
		} else {
			this.clearBoardUI();
			this.clearPoolUI();
		}
		this.presentPerlen();
		this.activateDD();
	}
	clearBoardUI() {
		let b = this.clientBoard;
		let [perlen, fields] = [[], []];
		for (const f of b.fields) {
			let p = f.item;
			if (isList(p)) {
				continue;
			}
			if (isdef(p)) {
				if (isdef(p.dxy)) { this.resetCenter(f); }
				iDiv(p).remove();
				f.item = null;
				perlen.push(p);
				fields.push(f);
			}
		}
		return [perlen, fields];
	}
	clearPoolUI() { clearElement(this.dPool); }
	presentPerlen() {
		let [b, s, perlenByIndex, boardArr, poolArr] = [this.clientBoard, this.settings, this.poolEnriched, this.state.boardArr, this.state.poolArr];
		let dParent = this.dPool;
		for (let i = 0; i < poolArr.length; i++) {
			let iPerle = poolArr[i];
			console.assert(!isList(iPerle), 'BUGBUGBUGBUGBUG!!!!!!')
			let perle = perlenByIndex[iPerle];
			if (nundef(perle)) {
				console.log('BUG!', perlenByIndex, perlenByIndex, 'perlenDict', this.perlenDict, '\nboardArr', boardArr, '\npoolArr', poolArr)
			}
			perle.field = null;
			let ui = createPerle(perle, dParent, 64, 1.3, .4);
		}
		for (let i = 0; i < boardArr.length; i++) {
			let pin = boardArr[i];
			let iPerle = isList(pin) ? pin[0] : pin;
			if (iPerle == null) continue;
			let perle = perlenByIndex[iPerle];
			let field = b.fields[i];
			perle.field = field;
			field.item = perle;
			let ui = createPerle(perle, iDiv(field), 64, 1.3, .4);
			if (isList(pin)) {
				this.moveCenter(field, perle, pin[1], pin[2]);
			}
			if (isFarbPerle(perle)) {
				let bg = GermanToEnglish[perle.key];
				if (nundef(bg)) bg = perle.key;
				let d = perle.live.dImg;
				d.style.boxShadow = `0px 0px 200px 200px ${bg}`;
				ui.style.zIndex = 10;
			} else {
				ui.style.zIndex = 11;
			}
		}
	}
	activateDD() {
		let fields = this.clientBoard.fields;
		enableDD(this.perlenListeImSpiel, fields.map(x => x), this.onDropPerleSimplest.bind(this), false, false, dragStartPreventionOnSidebarOpen);
		addDDTarget({ item: this.state.poolArr, div: this.dParent }, false, false);
	}
	onDropOrig(source, target) {
		if (target.item == this.state.poolArr) {
			let f = source.field;
			if (isdef(f)) sendRemovePerle(source, f);
		} else {
			let displaced = null;
			if (isdef(target.item)) {
				let p = target.item;
				if (p == source) return;
				displaced = p;
			}
			if (isdef(source.field)) {
				let f = source.field;
				sendMovePerle(source, f, target, displaced);
			} else {
				sendPlacePerle(source, target, displaced);
			}
		}
	}
	onDropPerleSimplest(source, target, isCopy, clearTarget, dx, dy, ev, clone) {
		if (!this.settings.freeForm) {
			this.onDropOrig(source, target);
		} else if (target.item == this.state.poolArr) {
			let f = source.field;
			if (isdef(f)) sendRemovePerle(source, f);
		} else {
			this.onDropFreeForm(source, target, ev, clone);
		}
	}
	onDropFreeForm(source, target, ev, clone) {
		let perle = source;
		let dField = iDiv(target);
		let dPerle = iDiv(source);
		let rField = getRect(dField);
		let rPerle = getRect(dPerle);
		let d = iDiv(perle);
		let drop = { x: ev.clientX, y: ev.clientY };
		let [dx, dy] = [DDInfo.dragOffset.offsetX, DDInfo.dragOffset.offsetY];
		let [x, y, w, h] = [drop.x, drop.y, rField.w, rField.h];
		let dw = Math.abs(rPerle.w - rField.w);
		let dh = Math.abs(rPerle.h - rField.h);
		dw /= 2, dh /= 2;
		let [xFinal, yFinal] = [x - dx - dw, y - dy - dh];
		let dFieldParent = dField.parentNode;
		let rParent = getRect(dFieldParent);
		let xField = xFinal - rParent.x;
		let yField = yFinal - rParent.y;
		let [cxFinal, cyFinal] = [xField + w / 2, yField + h / 2];
		let dxy = { x: cxFinal - target.center.x, y: cyFinal - target.center.y };
		mStyleX(dField, { left: xField, top: yField });
		target.dxy = source.dxy = dxy;
		let displaced = null;
		if (target.item == source) sendMoveField(target);
		else if (isdef(target.item)) displaced = target.item;
		if (isdef(source.field)) {
			let f = source.field;
			sendMovePerle(source, f, target, displaced);
		} else {
			sendPlacePerle(source, target, displaced);
		}
		return;
	}
	moveCenter(target, source, dx, dy) {
		let dTarget = iDiv(target);
		let center = target.center;
		let newCenter = { x: center.x + dx, y: center.y + dy };
		target.dxy = { x: dx, y: dy };
		let rect = getRect(dTarget);
		mStyleX(dTarget, { left: newCenter.x - rect.w / 2, top: newCenter.y - rect.h / 2 });
		source.dxy = { x: dx, y: dy };
	}
	resetCenter(target) {
		let dTarget = iDiv(target);
		let center = target.center;
		let rect = getRect(dTarget);
		mStyleX(dTarget, { left: center.x - rect.w / 2, top: center.y - rect.h / 2 });
		delete target.dxy;
		if (isdef(target.item)) delete target.item.dxy;
	}
	processData(data) {
		console.assert(isdef(data), 'NO DATA IN PROCESSDATA!!!!!');
		if (nundef(this.state)) this.state = {};
		copyKeys(data.state, this.state);
		if (isdef(data.settings)) {
			console.assert(isdef(this.settings), 'processData G.settings is NOT defined after constructor!!!!!')
			copyKeys(data.settings, this.settings);
		}
		if (isdef(data.perlenDict)) { PerlenDict = this.perlenDict = data.perlenDict; }
		if (isdef(data.state.pool)) {
			this.perlenListeImSpiel = Object.values(this.state.pool);
			this.randomIndices = data.randomIndices;
			this.poolEnriched = this.state.pool;
			for (const idx in this.state.pool) {
				let p = this.state.pool[idx];
				let key = p.key;
				copyKeys(this.perlenDict[key], p);
				p.path = mPath(p);
			}
		}
		return [this.settings, this.state];
	}
	setInitialPoolSelected() { this.initialPoolSelected = true; setTitle('Glasperlenspiel'); }
	inSyncWithServer() {
		let [b, s, st] = [this.clientBoard, this.settings, this.state];
		let corr = {};
		if (st.boardArr.length != b.nFields) { corr.nFields = s.nFields = b.nFields; }
		if (s.rows != b.rows || s.cols != b.cols) { corr.rows = s.rows = b.rows; corr.cols = s.cols = b.cols; }
		if (!isEmpty(Object.keys(corr))) {
			console.log('sending syncBoardLayout!!! corr', corr)
			Socket.emit('settings', { settings: this.settings });
			return false;
		}
		else { return true; }
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
class SoloPlayer {
	constructor(user) {
		this.color = getColorDictColor(user.settings.userColor);
		this.id = user.id;
		this.score = 0;
	}
}
class Speaker {
	static get VOICES() {
		return {
			david: 'Microsoft David - English (United States)', //'Microsoft David Desktop - English',
			mark: 'Microsoft Mark - English (United States)',
			austria: 'Microsoft Michael - German (Austria)',
			zira: 'Microsoft Zira Desktop - English',
			us: 'Google US English',
			ukFemale: 'Google UK English Female',
			ukMale: 'Google UK English Male',
			deutsch: 'Google Deutsch',
			spanish: 'Google español',
			D: 'Google Deutsch',
			S: 'Google español',
			F: 'Google français',
			french: 'Google français',
			C: 'Google 日本語',
			E: 'Google US English',
			apple: 'Susan',
		};
	}
	constructor(lang) {
		this.lang = lang;
		this.q = [];
		this.isRunning = false;
		let awaitVoices = new Promise(resolve =>
			speechSynthesis.onvoiceschanged = resolve)
			.then(this.initVoices.bind(this));
	}
	initVoices() {
		this.voices = speechSynthesis.getVoices().sort(function (a, b) {
			const aname = a.name.toUpperCase(), bname = b.name.toUpperCase();
			if (aname < bname) return -1;
			else if (aname == bname) return 0;
			else return +1;
		});
		if (isdef(mBy('output'))) mBy('output').innerHTML = this.voices.map(x => x.name);
	}
	setLanguage(lang) { this.lang = lang; }
	enq(args) { this.q.push(args); }
	deq() {
		if (nundef(this.voices)) {
			setTimeout(this.deq.bind(this), 500);
		}
		else if (!isEmpty(this.q)) {
			let args = this.q.pop();
			this.utter(...args);
		} else {
			this.isRunning = false;
		}
	}
	clearq() {
		this.q = [];
	}
	output(text) { let d = mBy('output'); if (isdef(d)) d.innerHTML += `<br>${text}`; else console.log('DONE', text); }
	say(text, r = .5, p = .8, v = MASTERVOLUME, voicekey, callback, lang) {
		if (isdef(lang)) this.speaker.setLanguage(lang);
		this.enq([text, r, p, v, valf(voicekey, 'apple'), valf(callback, () => this.output(text))]);
		this.deq();
	}
	say_simple(text, vkey) {
		this.utter(text, .5, .8, 1, valf(vkey, 'apple'), () => this.output(text));
	}
	sayQ(text, vkey) {
		if (isdef(lang)) this.setLanguage(lang);
		this.enq([text, .5, .8, 1, valf(vkey, 'apple'), () => mBy('output').innerHTML = text]);
		this.deq();
	}
	utter(text, r = .5, p = .8, v = MASTERVOLUME, voicekey, callback = null) {
		speechSynthesis.cancel();
		var u = new SpeechSynthesisUtterance();
		let [vkey, voice] = this.findSuitableVoice(text, voicekey);
		u.text = text;
		u.rate = r;
		u.pitch = p;
		u.volume = v;
		u.voice = voice;
		u.onend = ev => {
			if (isdef(callback)) callback();
			this.deq();
		};
		this.isRunning = true;
		speechSynthesis.speak(u);
	}
	findSuitableVoice(text, k) {
		let voicenames = Speaker.VOICES;
		this.output('voices: ' + this.voices.map(x => x.name).join(','));
		k = this.lang;
		let voiceName = voicenames[k];
		let voice = firstCond(this.voices, x => startsWith(x.name, voiceName));
		this.output(`voice ${k} named ${voiceName} exists?${isdef(voice)}`);
		return [k, voice];
	}
	findSuitableVoice_orig(text, voicekey) {
		let voicenames = Speaker.VOICES;
		let vkey = 'zira';
		if (this.lang == 'D') {
			vkey = 'deutsch';
		} else if (text.includes('bad')) {
			vkey = 'zira';
		} else if (voicekey == 'random') {
			vkey = chooseRandom(['david', 'zira', 'us', 'ukFemale', 'ukMale']);
		} else if (isdef(voicenames[voicekey])) {
			vkey = voicekey;
		} else if (isdef(voicekey)) {
			let tryVoiceKey = firstCondDict(voicenames, x => startsWith(x, voicekey));
			if (tryVoiceKey) vkey = tryVoiceKey;
		}
		//vkey=this.lang;//'david';//'mark'
		let voiceName = voicenames[vkey];
		let voice = firstCond(this.voices, x => startsWith(x.name, voiceName));
		return [vkey, voice];
	}
}
class SpeechAPI {
	constructor(lang) {
		this.recorder = new Recorder(lang);
		this.speaker = new Speaker(lang);
		SessionId = Date.now();
	}
	testRecorder() {
		this.recorder.start();
	}
	train() {
	}
	setLanguage(lang) {
		this.speaker.setLanguage(lang);
		this.recorder.setLanguage(lang);
	}
	isSpeakerRunning() { return this.speaker.isRunning; }
	startRecording(lang, callback) {
		this.recorder.isCancelled = false;
		this.recorder.callback = callback;
		this.recorder.setLanguage(lang);
		this.recorder.start();
	}
	stopRecording() {
		this.recorder.isCancelled = true;
		this.recorder.stop();
	}
	say(text, r = .5, p = .8, v = MASTERVOLUME, voicekey, callback, lang) {
		if (isdef(lang)) this.speaker.setLanguage(lang);
		this.speaker.enq(arguments);
		this.speaker.deq();
	}
	stopSpeaking() {
		this.speaker.clearq();
	}
}
class TestEngine {
	constructor() {
		this.Dict = {};
		this.specs = null;
		this.solutions = null;
		this.series = null;
		this.index = 0;
		this.autosave = false;
		this.defs = null;
		this.spec = null;
		this.sdata = null;
	}
	async init(defs, sdata, series, index, ifrom, ito) {
		this.defs = defs;
		this.sdata = sdata;
		series = isdef(series) ? series : localStorage.getItem('testSeries');
		if (nundef(series)) series = TEST_SERIES;
		index = isdef(index) ? index : localStorage.getItem('testIndex');
		if (nundef(index)) index = '0';
		ifrom = isdef(ifrom) ? ifrom : localStorage.getItem('iTestCaseFrom');
		if (nundef(ifrom)) ifrom = '0'; mBy('iTestCaseFrom').value = ifrom;
		ito = isdef(ito) ? ito : localStorage.getItem('iTestCaseTo');
		if (nundef(ito)) ito = '2'; mBy('iTestCaseTo').value = ito;
		index = Number(index);
		await this.loadTestCase(series, index);
		updateTestInput(index);
	}
	async loadSeries(series) {
		let path = '/assetsTEST/' + series + '/';
		this.series = series;
		this.Dict[series] = {
			specs: await loadYamlDict(path + '_spec.yaml'),
			sdata: await loadServerDataForTestSeries(series),
			solutions: await loadSolutions(series),
		};
		if (nundef(this.Dict[series].solutions)) this.Dict[series].solutions = {};
		this.sdata = this.Dict[series].sdata;
		this.specs = this.Dict[series].specs;
		this.solutions = this.Dict[series].solutions;
		let numCases = Object.keys(this.specs).length;
		return numCases;
	}
	async loadNextTestCase() { await this.loadTestCase(this.series, this.index + 1); }
	async loadPrevTestCase() { await this.loadTestCase(this.series, this.index - 1); }
	async repeatTestCase() { await this.loadTestCase(this.series, this.index); }
	async loadTestCase(series, index) {
		if (CLEAR_BETWEEN_TESTS) await onClickClearTable();
		let di = this.Dict[series];
		if (nundef(di)) { await this.loadSeries(series); di = this.Dict[series]; }
		let numCases = Object.keys(di.specs).length;
		if (index < 0) index = numCases - 1;
		else if (index >= numCases) index = 0;
		let spec = di.specs[index];
		if (nundef(spec)) { index = 0; spec = di.specs[0]; }
		this.series = series;
		this.index = index;
		localStorage.setItem('testSeries', this.series);
		localStorage.setItem('testIndex', this.index);
		mBy('message').innerHTML = '(main) ' + series + ' case: ' + index;
		this.spec = spec;
		this.sdata = di.sdata;
		return numCases;
	}
	saveSolutions() { saveSolutions(this.series, this.solutions); }
	loadSolution() {
		let rTree = this.solutions[this.index];
		this.solution = { rTree: rTree };
		return this.solution;
	}
	saveSolution(R, download = false) {
		let r1 = normalizeRTree(R);
		this.solutions[this.index] = r1;
		if (download) this.saveSolutions();
	}
	invalidate() { delete this.solutions[this.index]; }
	verify(R) {
		let rTreeNow = normalizeRTree(R);
		let solution = this.loadSolution();
		if (!solution.rTree) {
			if (this.autosave) this.saveSolution(R);
			return;
		}
		let rTreeSolution = this.solution.rTree;
		let changes = propDiffSimple(rTreeNow, rTreeSolution);
		if (changes.hasChanged) {
			console.log('verifying test case', this.series, this.index, 'FAIL!!!!!!!');
			console.log('changes:', changes)
		} else {
			console.log('verifying test case', this.series, this.index, 'correct!');
		}
	}
}
class TimeIt {
	constructor(msg, showOutput = true) {
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
	showTime(msg) {
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
class TimeoutManager {
	constructor() {
		this.TO = {};
	}
	clear(key) {
		if (nundef(key)) key = Object.keys(this.TO);
		else if (isString(key)) key = [key];
		for (const k of key) {
			clearTimeout(this.TO[k]);
			delete this.TO[k];
		}
	}
	set(ms, callback, key) {
		if (nundef(key)) key = getUID();
		this.TO[key] = setTimeout(ms, callback);
	}
}
class TimerClass {
	constructor(g, elem) {
		this.started, this.elapsed, this.onTimeOver = null, this.elem, this.timeLeft, this.settings = g;
		if (isdef(elem)) this.setElem(elem);
	}
	setElem(elem) {
		if (nundef(elem) && isdef(this.elem)) { elem = this.elem; }
		else if (nundef(elem)) { let d = mBy('time'); if (isdef(d)) this.elem = d; }
		else if (isString(elem)) { elem = mBy(elem); this.elem = elem; }
	}
	check(g) { this.settings = g; if (g.showTime) { show(this.elem); this.start(); } else { hide(this.elem); } return g.showTime; }
	clear() { clearTimeout(this.TO); }
	restart(g, elem, onTimeOver = null) {
		this.clear();
		this.setElem(elem);
		let active = this.check(g);
		this.started = msNow();
		this.elapsed = 0;
		if (isdef(onTimeOver)) this.onTimeOver = onTimeOver;
		if (active) this.start();
	}
	start() {
		if (nundef(this.settings.showTime) || !this.settings.showTime) return;
		if (nundef(this.settings.minutesPerUnit)) this.settings.minutesPerUnit = 10;
		if (nundef(this.started)) { this.started = msNow(); this.elapsed = 0; }
		var timeLeft = this.timeLeft = this.settings.minutesPerUnit * 60000 - this.getTimeElapsed();
		if (timeLeft > 0) {
			let t = msToTime(timeLeft);
			let s = format2Digits(t.h) + ":" + format2Digits(t.m) + ":" + format2Digits(t.s);
			this.elem.innerHTML = s;
			this.TO = setTimeout(() => this.start(), 500);
		} else {
			this.elem.innerHTML = '00:00:00';
			if (this.onTimeOver) this.onTimeOver();
		}
	}
	unitTimeUp() {
		return (this.settings.minutesPerUnit * 60000 - this.getTimeElapsed()) <= 0;
	}
	startClock(elem) {
		if (nundef(this.settings.showTime) || !this.settings.showTime) return;
		var today = new Date(),
			h = format2Digits(today.getHours()),
			m = format2Digits(today.getMinutes()),
			s = format2Digits(today.getSeconds());
		if (isString(elem)) elem = mBy(elem); elem.innerHTML = h + ":" + m + ":" + s;
		this.TO = setTimeout(() => this.startClock(elem), 500);
	}
	getTimeElapsed() { return this.elapsed + msElapsedSince(this.started); }
}
class ToolbarClass {
	constructor(dParent) {
		this.dParent = dParent;
		clearElement(dParent);
		this.buttons = {};
		this.populate();
	}
	addButton(key, handler, caption) {
		if (nundef(caption)) caption = key;
		let styles = { w: 100 };
		let b = this.buttons[key] = mButton(caption, handler, this.dParent, styles, null, 'b_' + key);
	}
	removeButton() { }
	showButton() { }
	hideButton() { }
	populate() {
		this.addButton('uploadBoard', onClickUploadBoard, 'upload board');
		this.addButton('uploadPerlen', onClickUploadPerlen, 'upload perlen');
		mLinebreak(this.dParent)
		this.addButton('chooseBoard', onClickChooseBoard, 'choose board');
		this.addButton('prefabGallery', onClickPrefabGallery, 'prefab gallery');
		this.addButton('modifyLayout', onClickModifyLayout, 'modify layout');
		this.addButton('saveAsPrefab', onClickSaveAsPrefab, 'save as prefab');
		mLinebreak(this.dParent);
		let oldCode = false;
		if (oldCode) {
			this.addButton('clearBoard', onClickClearBoard, 'clear board');
			this.addButton('clearPerlenpool', onClickClearPerlenpool, 'clear perlenpool');
			this.addButton('remove5Random', onClickRemove5Random, 'remove 5 random');
			mLinebreak(this.dParent);
			this.addButton('addToPool', onClickAddToPool, 'add to pool');
			this.addButton('add5Random', onClickAdd5Random, 'add 5 random');
		} else {
			this.addButton('perlenPool', onClickPerlenPool, 'perlen pool');
		}
		mLinebreak(this.dParent);
		this.addButton('recovery', onClickRecovery, 'recovery!!!');
		this.addButton('recpoint', onClickRecpoint, 'recpoint!');
		mLinebreak(this.dParent);
		mLinebreak(this.dParent)
		this.addButton('saveSettings', onClickSaveSettings, 'save settings');
		this.addButton('retrieveSettings', onClickRetrieveSettings, 'retrieve settings');
		mLinebreak(this.dParent);
		this.addButton('saveState', onClickSaveState, 'save gamestate');
		this.addButton('retrieveState', onClickRetrieveState, 'retrieve gamestate');
	}
}
class UniqueIdEngine {
	constructor() {
		this.next = -1;
	}
	get() {
		this.next += 1;
		return 'a###' + this.next;
		this.next += 1;
	}
}
class UserManager { }
class VidCache_dep {
	constructor(resetStorage = false) {
		this.live = {};
		if (resetStorage) this.resetAll();
	}
	load(key) {
		let keys = null; let sKey = key;
		if (isList(key)) { skey = key.shift(); keys = key; }
		let res = this.live[sKey];
		if (res && keys) res = lookup(res, keys);
		if (res) return res;
		let sData = localStorage.getItem(sKey);
		if (sData) {
			let data = sData[0] == '{' || sData[0] == '[' ? JSON.parse(sData) : isNumber(sData) ? Number(sData) : sData;
			if (keys) { this.live[sKey] = data; return lookup(data, keys); }
			return data;
		} else {
			return null;
		}
	}
	reset() { this.live = {}; }
	resetAll() { localStorage.clear(); this.reset(); }
	saveComplexObject(keys, o) {
	}
	save(key, data) {
		this.live[key] = data;
		localStorage.setItem(key, JSON.stringify(data));
	}
}
class WeightedSampler {
	constructor(elements, weights) {
		this.total = 0;
		this.elements = Array.from(elements);
		this.cweights = weights.map(weight => this.total += weight);
	}
	get() {
		let random = Math.random() * this.total;
		return this.elements.find((element, index) => random < this.cweights[index]);
	}
}
var resizeObserver = new ResizeObserver(entries => {
	for (let entry of entries) {
		let cs = window.getComputedStyle(entry.target);
		console.log('watching element:', entry.target);
		console.log(entry.contentRect.top, ' is ', cs.paddingTop);
		console.log(entry.contentRect.left, ' is ', cs.paddingLeft);
		console.log(entry.borderBoxSize[0].inlineSize, ' is ', cs.width);
		console.log(entry.borderBoxSize[0].blockSize, ' is ', cs.height);
		if (entry.target.handleResize)
			entry.target.handleResize(entry);
	}
});
var maxWidthPreserver = new MaxWidthPreserver();
var xxxxxxxxxx = new ResizeObserver(entries => {
	for (let entry of entries) {
		let cs = window.getComputedStyle(entry.target);
		console.log('watching element:', entry.target);
		console.log(entry.contentRect.top, ' is ', cs.paddingTop);
		console.log(entry.contentRect.left, ' is ', cs.paddingLeft);
		console.log(entry.borderBoxSize[0].inlineSize, ' is ', cs.width);
		console.log(entry.borderBoxSize[0].blockSize, ' is ', cs.height);
		if (entry.target.handleResize)
			entry.target.handleResize(entry);
	}
});
