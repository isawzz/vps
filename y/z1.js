
//#region addVisuals
//#endregion addVisuals

//#region createGrid
//#endregion createGrid

//#region areaRows
//#endregion areaRows

//#region hexGrid
//#endregion hexGrid

//#region quadGrid
//#endregion quadGrid

//#region helpers
function findMatch(odict, condList) {
	if (isListOfLiterals(condList)) condList = [condList];
	let Board = lastCondDictPlusKey(odict, x => {
		for (const tuple of condList) {
			if (x[tuple[0]] != tuple[1]) return false;
		}
		return true;
	});
	return Board;
}
function getBoardMemberColors(board, fieldColor, nodeColor, edgeColor, iPalette, ipals = [3, 4, 5]) {
	let isPalField = nundef(fieldColor) || isNumber(fieldColor) && fieldColor >= 0 && fieldColor <= 8;
	let isPalCorner = isdef(board.strInfo.corners) && (nundef(nodeColor) || isNumber(nodeColor) && nodeColor >= 0 && nodeColor <= 8);
	let isPalEdge = isdef(board.strInfo.edges) && (nundef(edgeColor) || isNumber(edgeColor) && edgeColor >= 0 && edgeColor <= 8);
	if (!iPalette && (isPalField || isPalCorner || isPalEdge)) iPalette = board.getIPalette();
	if (iPalette) {
		board.iPalette = iPalette;
		board.ipal = 2;
		board.strInfo.ipals = ipals;
		let pal = S.pals[iPalette];
		if (isPalField) fieldColor = pal[ipals[0]];
		if (isPalCorner) nodeColor = pal[ipals[1]];
		if (isPalEdge) edgeColor = pal[ipals[2]];
		_register(board, 'paletteUpdates', updateColors);
	}
	return [iPalette, fieldColor, isPalField, nodeColor, isPalCorner, edgeColor, isPalEdge];
}
function getBoardScaleFactors(board, { factors, opt, f2nRatio, w, h, margin } = {}) {
	let [fw, fh, nw, nh, ew] = isdef(factors) ? factors : [43, 50, 12, 12, 10];
	if (startsWith(opt, 'fit')) {
		if (w == 0) {
			let g = document.getElementById(board.id);
			let transinfo = getTransformInfo(g);
			w = transinfo.translateX * 2;
			h = transinfo.translateY * 2;
		}
		let divBy = 2 * (f2nRatio - 2);
		fw = Math.floor((w - margin) / (board.strInfo.w + board.strInfo.wdef / divBy));
		fh = Math.floor((h - margin) / (board.strInfo.h + board.strInfo.hdef / divBy));
		let maintainRatio = (opt[3] == 'R');
		if (maintainRatio) {
			let ff = Math.min(fw, fh);
			fw = ff;
			fh = ff;
		}
		nw = Math.floor(fw / f2nRatio);
		nh = Math.floor(fh / f2nRatio);
	}
	return [fw, fh, nw, nh, ew];
}
function getHexFieldInfo(boardInfo, row, col) {
	let info = {
		shape: 'hex',
		memType: 'field',
		row: row,
		col: col,
		x: -boardInfo.w / 2 + (col - boardInfo.minCol) * boardInfo.dx + boardInfo.wdef / 2,
		y: -boardInfo.h / 2 + boardInfo.hdef / 2 + (row - boardInfo.minRow) * boardInfo.dy,
		w: boardInfo.wdef,
		h: boardInfo.hdef,
	};
	info.poly = getHexPoly(info.x, info.y, info.w, info.h);
	return info;
}
function getHexGridInfo(rows, cols) {
	[wdef, hdef] = [4, 4];
	[dx, dy] = [wdef / 2, (hdef * 3) / 4];
	let info = {
		structType: 'hexGrid',
		rows: rows,
		cols: cols,
		wdef: 4,
		hdef: 4,
		dx: dx,
		dy: dy,
		w: wdef + (cols - 1) * dx,
		h: hdef + (rows - 1) * dy,
		minRow: 0,
		minCol: 0,
	};
	return info;
}
function getQuadFieldInfo(boardInfo, row, col) {
	let info = {
		shape: 'rect',
		memType: 'field',
		row: row,
		col: col,
		x: -boardInfo.w / 2 + (col - boardInfo.minCol) * boardInfo.dx + boardInfo.wdef / 2,
		y: -boardInfo.h / 2 + (row - boardInfo.minRow) * boardInfo.dy + boardInfo.hdef / 2,
		w: boardInfo.wdef,
		h: boardInfo.hdef,
	};
	info.poly = getQuadPoly(info.x, info.y, info.w, info.h);
	return info;
}
function getQuadGridInfo(rows, cols) {
	[wdef, hdef] = [4, 4];
	let info = {
		structType: 'grid',
		rows: rows,
		cols: cols,
		wdef: 4,
		hdef: 4,
		dx: wdef,
		dy: hdef,
		w: wdef * cols,
		h: hdef * rows,
		minRow: 1,
		minCol: 1,
	};
	return info;
}
function makeCorners(pool, board, serverBoard) {
	let serverFieldIds = _setToList(serverBoard.fields).map(x => x._obj);
	board.strInfo.corners = _setToList(serverBoard.corners).map(x => x._obj);
	let dhelp = {};
	for (const fid of serverFieldIds) {
		let sfield = pool[fid];
		let ffield = getVisual(fid);
		if (nundef(sfield.corners)) continue;
		let iPoly = 0;
		let cornerIds = sfield.corners.map(x => x._obj);
		for (const cid of cornerIds) {
			if (!cid) {
				iPoly += 1;
				continue;
			} else if (isdef(dhelp[cid])) {
				iPoly += 1;
				continue;
			} else {
				let corner = createMainG(cid, board.id);
				let poly = ffield.memInfo.poly[iPoly];
				corner.memInfo = { shape: 'circle', memType: 'corner', x: poly.x, y: poly.y, w: 1, h: 1 };
				dhelp[cid] = corner;
				iPoly += 1;
			}
		}
	}
}
function makeEdges(pool, board, serverBoard) {
	let serverFieldIds = _setToList(serverBoard.fields).map(x => x._obj);
	board.strInfo.edges = _setToList(serverBoard.edges).map(x => x._obj);
	dhelp = {};
	for (const fid of serverFieldIds) {
		let sfield = pool[fid];
		if (nundef(sfield.edges)) continue;
		let edgeIds = sfield.edges.map(x => x._obj);
		for (const eid of edgeIds) {
			if (!eid) {
				continue;
			} else if (isdef(dhelp[eid])) {
				continue;
			} else {
				let edge = createMainG(eid, board.id);
				let el = G.table[eid];
				let n1 = getVisual(el.corners[0]._obj);
				let n2 = getVisual(el.corners[1]._obj);
				edge.memInfo = {
					shape: 'line',
					memType: 'edge',
					x1: n1.memInfo.x,
					y1: n1.memInfo.y,
					x2: n2.memInfo.x,
					y2: n2.memInfo.y,
					x: (n1.x + n2.x) / 2,
					y: (n1.y + n2.y) / 2,
					thickness: 1,
					w: 1,
					h: 1,
				};
				dhelp[eid] = edge;
			}
		}
	}
}
function makeFields(pool, board, serverBoard, shape) {
	let serverFieldIds = _setToList(serverBoard.fields).map(x => x._obj);
	board.strInfo.fields = serverFieldIds;
	for (const fid of serverFieldIds) {
		let sField = pool[fid];
		let r = sField.row;
		let c = sField.col;
		let field = createMainG(fid, board.id);
		field.memInfo = shape == 'hex' ? getHexFieldInfo(board.strInfo, r, c) : getQuadFieldInfo(board.strInfo, r, c);
	}
	board.strInfo.vertices = correctPolys(board.strInfo.fields.map(x => getVisual(x).memInfo.poly), 1);
}
function makeVisual(o, x, y, w, h, color, shape, { x1, y1, x2, y2 } = {}) {
	if (shape == 'circle') {
		o.ellipse({ w: w, h: h }).ellipse({ className: 'overlay', w: w, h: h });
		o.setPos(x, y);
	} else if (shape == 'hex') {
		o.hex({ w: w, h: h }).hex({ className: 'overlay', w: w, h: h });
		o.setPos(x, y);
	} else if (shape == 'quad' || shape == 'rect') {
		o.rect({ w: w, h: h }).rect({ className: 'overlay', w: w, h: h });
		o.setPos(x, y);
	} else if (shape == 'triangle') {
		o.rect({ w: w, h: h }).hex({ className: 'overlay', w: w, h: h });
		o.setPos(x, y);
	} else if (shape == 'line') {
		let thickness = w;
		let fill = color;
		o.line({ className: 'ground', x1: x1, y1: y1, x2: x2, y2: y2, fill: fill, thickness: thickness }).line({
			className: 'overlay',
			x1: x1,
			y1: y1,
			x2: x2,
			y2: y2,
			thickness: thickness,
		});
	}
	o.setBg(color, shape != 'line');
	return o;
}
//#endregion helpers
