//#region classes (basemin)
class AGraph {
	constructor() {
		this.init(...arguments);
		this.posDict = {};
	}
	init() {
		let defOptions = {
			maxZoom: 1,
			minZoom: .001,
			motionBlur: false,
			zoomingEnabled: false,
			userZoomingEnabled: false,
			panningEnabled: false,
			userPanningEnabled: false,
			boxSelectionEnabled: false,
			layout: { name: 'preset' },
			elements: [],
		};
		this.cy = cytoscape(defOptions);
	}
	clear() { this.cy.destroy(); }
	//#region access and algos
	getComponents() { return this.cy.elements().components(); }
	getComponentIds() { return this.cy.elements().components().map(x => x.id()); }
	getCommonEdgeId(nid1, nid2) { return nid1 + '_' + nid2; }
	getNumComponents() { return this.cy.elements().components().length; }
	getNode(id) { return this.cy.getElementById(id); }
	getEdge(id) { return this.cy.getElementById(id); }
	getNodes() { return this.cy.nodes(); }
	getNodeIds() { return this.cy.nodes().map(x => x.id()); }
	getNodeData() { return this.cy.nodes().map(x => x.data()); }
	getNodePositions() { return this.cy.nodes.map(x => x.position()); }
	getEdges() { return this.cy.edges(); }
	getEdgeIds() { return this.cy.edges().map(x => x.id()); }
	getPosition(id) {
		let node = this.getNode(id);
		let pos = node.renderedPosition();
		return pos;
	}
	getSize(id) {
		let node = this.getNode(id);
		let pos = node.bb();
		return pos;
	}
	getProp(id, prop) { return this.cy.getElementById(id).data(prop); }
	getDegree(id) { return this.cy.getElementById(id).degree(); }
	getNodeWithMaxDegree(idlist) {
		if (nundef(idlist)) idlist = this.cy.elements().filter('node').map(x => x.data().id);
		let imax = arrMinMax(idlist, x => this.getDegree(x)).imax;
		let id = idlist[imax];
		return id;
	}
	getShortestPathsFrom(id) { let res = this.cy.elements().dijkstra('#' + id); return res; }
	getShortestPathFromTo(nid1, nid2) {
		let funcs = this.dijkstra = this.getShortestPathsFrom(nid1);
		let path = funcs.pathTo('#' + nid2);
		return path;
	}
	getLengthOfShortestPath(nid1, nid2) {
		let funcs = this.dijkstra = this.getShortestPathsFrom(nid1);
		let len = funcs.distanceTo('#' + nid2);
		return len;
	}
	setPositionData(prop = 'center') {
		let ids = this.getNodeIds();
		for (const id of ids) {
			let pos = this.getProp(id, prop);
			if (isdef(pos)) this.setPosition(id, pos.x, pos.y);
			else return false;
		}
		return true;
	}
	sortNodesByDegree(idlist, descending = true) {
		if (nundef(idlist)) idlist = this.cy.nodes.map(x => x.data().id);
		let nodes = idlist.map(x => this.getNode(x));
		for (const n of nodes) {
			n.degree = this.getDegree(n.id());
		}
		if (descending) sortByDescending(nodes, 'degree'); else sortBy(nodes, 'degree');
		return nodes;
	}
	storeCurrentPositions(prop = 'center') {
		for (const n of this.getNodes()) {
			let id = n.id();
			let pos = this.getPosition(id);
			this.setProp(id, prop, pos);
		}
	}
	//#endregion
	//#region add/remove nodes, edges
	addNode(data, coords) {
		if (nundef(data)) data = {};
		if (nundef(data.id)) data.id = getFruid();
		if (isdef(coords)) {
			coords.x -= this.cy.pan().x;
			coords.y -= this.cy.pan().y;
		} else { coords = { x: 0, y: 0 }; }
		var ele = this.cy.add({
			group: 'nodes',
			data: data,
			position: coords
		});
		return ele.id();
	}
	addNodes(n, datalist, coordlist) {
		let ids = [];
		if (nundef(datalist)) datalist = new Array(n).map(x => ({ id: getFruid() }));
		if (nundef(coordlist)) coordlist = new Array(n).map(x => ({ coords: { x: 0, y: 0 } }));
		for (let i = 0; i < n; i++) {
			let id = this.addNode(datalist[i], coordlist[i]);
			ids.push(id);
		}
		return ids;
	}
	addEdge(nid1, nid2, data) {
		if (nundef(data)) data = {};
		data.id = this.getCommonEdgeId(nid1, nid2);
		data.source = nid1;
		data.target = nid2;
		var ele = this.cy.add({
			group: 'edges',
			data: data,
		});
		return ele.id();
	}
	addEdges(nOrNodePairList) {
		if (isNumber(nOrNodePairList)) {
			let nids = this.getNodeIds();
			let prod = arrPairs(nids);
			nOrNodePairList = choose(prod, nOrNodePairList);
		}
		let res = [];
		for (const pair of nOrNodePairList) {
			res.push(this.addEdge(pair[0], pair[1]));
		}
		return res;
	}
	removeNode(node) { this.removeElement(node); return this.getNodeIds(); }
	removeEdge(edge) { this.removeElement(edge); return this.getEdgeIds(); }
	removeElement(ne) { if (!isString(ne)) ne = ne.id(); this.cy.getElementById(ne).remove(); }
	//#endregion
	//#region modify nodes, edges (data, position...)
	setPosition(id, x, y) { this.cy.getElementById(id).position({ x: x, y: y }); }
	setProp(id, prop, val) { this.cy.getElementById(id).data(prop, val); }
	//#endregion
}
class Board {
	constructor(dParent, rows, cols, handler, cellStyle) {
		let styles = isdef(cellStyle) ? cellStyle : { margin: 4, w: 150, h: 150, bg: 'white', fg: 'black' };
		this.rows = valf(rows, 3);
		this.cols = valf(cols, 3);
		let dgrid = this.div = mGrid(this.rows, this.cols, dParent);
		this.items = [];
		let index = 0;
		for (let i = 0; i < this.rows; i++) {
			for (let j = 0; j < this.cols; j++) {
				let item = { row: i, col: j, index: index };
				let d = mDiv(dgrid, styles);
				mCenterCenterFlex(d);
				d.onclick = valf(handler, ev => console.log('clicked on item', item));
				iAdd(item, { div: d });
				this.items.push(item);
				index += 1;
			}
		}
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
			if (!empty_func(val)) {
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
		this.rows = valf(rows, 3);
		this.cols = valf(cols, 5);
		this.dParent = dParent;
		let dBoard = this.dBoard = mDiv(dParent);
		let items = this.items = this.fill(dBoard, this.rows, this.cols, null, cellStyles);
	}
	fill(d, rows, cols, items, cellStyles) {
		if (nundef(items)) items = [];
		clearElement(d);
		mStyle(d, { display: 'grid', 'grid-template-columns': cols });
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
			mStyle(iDiv(item), cellStyles);
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
			if (!empty_func(val)) {
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
class MazeGraph extends AGraph {
	constructor(dParent, rows, cols, sz, gap = 4) {
		super();
		[this.cols, this.rows, this.sz, this.gap] = [cols, rows, sz, gap];
		let m = this.m = this.createMaze(cols, rows, sz, gap);
		let dMaze = this.dMaze = this.createDiv(dParent, cols, rows, sz, gap);
		let szMaze = getSize(dMaze);
		let dGraph = this.dGraph = mDiv(dParent, { align: 'left', w: szMaze.w, h: szMaze.h, bg: 'pink', maleft: 20 }, 'd_graph');
		this.mazeId = dGraph.id = getUID();
		let sb = this.sb = mDiv(dParent, { w: 40 }); mCenterCenterFlex(this.sb);
		hide(dGraph); hide(sb);
		this.items = this.createCellItems();
	}
	clear() { super.clear(); }
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
	createDiv(dParent, cols, rows, sz, gap = 1) {
		let [wCell, hCell] = [sz, sz];
		let [wTotal, hTotal] = [cols * (wCell + gap) + gap, rows * (hCell + gap) + gap];
		let dGridOuter = this.dMaze = mDiv(dParent, { wmin: wTotal, hmin: hTotal, position: 'relative' });
		let m = this.m;
		let [x, y] = [0, 0];
		let sBorder = `${gap}px solid black`;
		let noBorder = `${gap}px solid transparent`;
		this.dCells = [];
		for (var r = 0; r < m.length; r++) {
			x = 0;
			this.dCells[r] = [];
			for (var c = 0; c < m[r].length; c++) {
				let info = m[r][c];
				let dCell = mDiv(dGridOuter, { w: wCell, h: hCell, position: 'absolute', top: y, left: x, bg: 'gray' });
				dCell.id = this.getCommonIdTable(r, c);
				dCell.style.borderTop = info[0] == 0 ? sBorder : noBorder;
				dCell.style.borderRight = info[1] == 0 ? sBorder : noBorder;
				dCell.style.borderBottom = info[2] == 0 ? sBorder : noBorder;
				dCell.style.borderLeft = info[3] == 0 ? sBorder : noBorder;
				x += wCell + gap;
				this.dCells[r].push(dCell);
			}
			y += hCell + gap;
		}
		return dGridOuter;
	}
	createDiv_orig(dParent, cols, rows, sz, gap) {
		let [wCell, hCell] = [sz, sz];
		let [wTotal, hTotal] = [cols * (wCell + gap), rows * (hCell + gap)];
		let dGridOuter = this.dMaze = mDiv(dParent, { wmin: wTotal, hmin: hTotal });
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
		let sBorder = `${1}px solid black`;
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
	setItemColor(item, color) { mStyle(iDiv(item), { bg: color }); }
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
			this.breadCrumbs(comp, wheel[i]); i += 1;
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
class UIGraph extends AGraph {
	init(dParent, styles = {}) {
		let defOptions = {
			maxZoom: 1,
			minZoom: .001,
			motionBlur: false,
			wheelSensitivity: 0.05,
			zoomingEnabled: true,
			userZoomingEnabled: true,
			panningEnabled: true,
			userPanningEnabled: true,
			boxSelectionEnabled: false,
			elements: [],
		};
		this.id = getUID();
		let dOuter = mDiv(dParent, styles.outer, this.id);
		let gStyles = valf(styles.inner, { w: 640, h: 420 });
		let dContainer = mDiv(dOuter, { position: 'relative', w: gStyles.w, h: gStyles.h, align: 'left' });
		let styleDict = {
			node: { 'label': 'data(label)', width: 25, height: 25, 'background-color': 'red', color: "#fff", "text-valign": "center", "text-halign": "center" },
			edge: { width: 2, 'line-color': 'silver', 'curve-style': 'haystack', },
			'node.high': { 'background-color': 'yellow' },
			'node.trans': { opacity: '0.5' },
		}
		for (const ks of ['node', 'edge', 'node.high', 'node.trans']) {
			if (isdef(styles[ks])) {
				let mStyles = styles[ks];
				let cyStyles = translateStylesToCy(mStyles, ks);
				copyKeys(cyStyles, styleDict[ks]);
			}
		}
		let cyStyle = [];
		for (const k in styleDict) { cyStyle.push({ selector: k, style: styleDict[k] }); }
		let options = { container: dContainer, style: cyStyle };
		copyKeys(options, defOptions);
		this.cy = cytoscape(defOptions);
		iAdd(this, { div: dOuter, dCy: dContainer });
	}
	//#region layouts
	hex(rows, cols, wCell, hCell) {
		let centers = this.hexPositions = getCentersFromRowsCols('hex', rows, cols, wCell, hCell)[0];
		this.storePositions('hex', centers);
		this.storePositions('preset', centers);
		this.retrievePositions('hex');
		this.cy.layout({ name: 'preset' }).run();
		this.center();
	}
	hex1(rows, cols, wCell, hCell) {
		let centers = this.hexPositions = getCentersFromRowsCols('hex1', rows, cols, wCell, hCell)[0];
		this.storePositions('hex1', centers);
		this.storePositions('preset', centers);
		let nodes = this.getNodes();
		for (let i = 0; i < nodes.length; i++) {
			let node = nodes[i];
			let center = centers[i];
			node.data('center', center);
		}
		this.retrievePositions('hex1');
		this.cy.layout({ name: 'preset' }).run();
		this.center();
	}
	breadthfirst() { this.cy.layout({ name: 'breadthfirst', animate: true }).run(); }
	circle() { this.cy.layout({ name: 'circle', animate: 'end' }).run(); }
	concentric() { this.cy.layout({ name: 'concentric', animate: true }).run(); }
	comcola() {
		let defaults = {
			name: 'cola',
			animate: true,
			refresh: 1,
			maxSimulationTime: 4000,
			ungrabifyWhileSimulating: false,
			fit: true,
			padding: 30,
			boundingBox: undefined,
			nodeDimensionsIncludeLabels: false,
			ready: function () { },
			stop: function () { },
			randomize: false,
			avoidOverlap: true,
			handleDisconnected: true,
			convergenceThreshold: 0.01,
			nodeSpacing: function (node) { return 10; },
			flow: undefined,
			alignment: undefined,
			gapInequalities: undefined,
			edgeLength: undefined,
			edgeSymDiffLength: undefined,
			edgeJaccardLength: undefined,
			unconstrIter: undefined,
			userConstIter: undefined,
			allConstIter: undefined,
			infinite: false
		};
		let options = {
			name: 'cola',
			convergenceThreshold: 100,
			boundingBox: { x1: 20, y1: 20, w: 200, h: 200 },
		};
		copyKeys(options, defaults);
		console.log(defaults.boundingBox)
		this.cy.layout(defaults).run();
	}
	cola() { this.cy.layout({ name: 'cola' }).run(); }
	cose() { this.cy.layout({ name: 'cose', animate: 'end' }).run(); }
	euler() { this.cy.layout({ name: 'euler', fit: true, padding: 25, animate: 'end' }).run(); }
	fcose() {
		var defaultOptions = {
			quality: "default",
			randomize: true,
			animate: true,
			animationDuration: 500,
			animationEasing: undefined,
			fit: true,
			padding: 30,
			nodeDimensionsIncludeLabels: false,
			uniformNodeDimensions: false,
			packComponents: true,
			step: "all",
			/* spectral layout options */
			samplingType: true,
			sampleSize: 25,
			nodeSeparation: 75,
			piTol: 0.0000001,
			/* incremental layout options */
			nodeRepulsion: node => 4500,
			idealEdgeLength: edge => 50,
			edgeElasticity: edge => 0.45,
			nestingFactor: 0.1,
			numIter: 2500,
			tile: true,
			tilingPaddingVertical: 10,
			tilingPaddingHorizontal: 10,
			gravity: 0.25,
			gravityRangeCompound: 1.5,
			gravityCompound: 1.0,
			gravityRange: 3.8,
			initialEnergyOnIncremental: 0.3,
			/* constraint options */
			fixedNodeConstraint: undefined,
			alignmentConstraint: undefined,
			relativePlacementConstraint: undefined,
			/* layout event callbacks */
			ready: () => { },
			stop: () => { },
			name: 'fcose',
		};
		this.cy.layout(defaultOptions).run();
	}
	gridLayout() { this.cy.layout({ name: 'grid', animate: true }).run(); }
	presetLayout_dep() {
		let hasCenterProp = this.setPositionData();
		if (!hasCenterProp) {
			console.log('no positions are preset: store first!');
		} else {
			let options = {
				name: 'preset',
				positions: undefined,
				zoom: undefined,
				pan: undefined,
				fit: true,
				padding: 30,
				animate: true,
				animationDuration: 500,
				animationEasing: undefined,
				animateFilter: function (node, i) { return true; },
				ready: undefined,
				stop: undefined,
				transform: function (node, position) { return position; }
			};
			this.cy.layout(options);
			this.reset();
		}
	}
	presetLayout() {
		this.retrievePositions('prest');
		this.cy.layout({ name: 'preset' }).run();
		this.center();
	}
	randomLayout() { this.cy.layout({ name: 'random', animate: 'true' }).run(); }
	klay() {
		let klayDefaults = {
			addUnnecessaryBendpoints: false,
			aspectRatio: 1.6,
			borderSpacing: 20,
			compactComponents: false,
			crossingMinimization: 'LAYER_SWEEP',
			/* LAYER_SWEEP The layer sweep algorithm iterates multiple times over the layers, trying to find node orderings that minimize the number of crossings. The algorithm uses randomization to increase the odds of finding a good result. To improve its results, consider increasing the Thoroughness option, which influences the number of iterations done. The Randomization seed also influences results.
			INTERACTIVE Orders the nodes of each layer by comparing their positions before the layout algorithm was started. The idea is that the relative order of nodes as it was before layout was applied is not changed. This of course requires valid positions for all nodes to have been set on the input graph before calling the layout algorithm. The interactive layer sweep algorithm uses the Interactive Reference Point option to determine which reference point of nodes are used to compare positions. */
			cycleBreaking: 'GREEDY',
			/* GREEDY This algorithm reverses edges greedily. The algorithm tries to avoid edges that have the Priority property set.
			INTERACTIVE The interactive algorithm tries to reverse edges that already pointed leftwards in the input graph. This requires node and port coordinates to have been set to sensible values.*/
			direction: 'UNDEFINED',
			/* UNDEFINED, RIGHT, LEFT, DOWN, UP */
			edgeRouting: 'ORTHOGONAL',
			edgeSpacingFactor: 0.5,
			feedbackEdges: false,
			fixedAlignment: 'NONE',
			/* NONE Chooses the smallest layout from the four possible candidates.
			LEFTUP Chooses the left-up candidate from the four possible candidates.
			RIGHTUP Chooses the right-up candidate from the four possible candidates.
			LEFTDOWN Chooses the left-down candidate from the four possible candidates.
			RIGHTDOWN Chooses the right-down candidate from the four possible candidates.
			BALANCED Creates a balanced layout from the four possible candidates. */
			inLayerSpacingFactor: 1.0,
			layoutHierarchy: false,
			linearSegmentsDeflectionDampening: 0.3,
			mergeEdges: false,
			mergeHierarchyCrossingEdges: true,
			nodeLayering: 'NETWORK_SIMPLEX',
			/* NETWORK_SIMPLEX This algorithm tries to minimize the length of edges. This is the most computationally intensive algorithm. The number of iterations after which it aborts if it hasn't found a result yet can be set with the Maximal Iterations option.
			LONGEST_PATH A very simple algorithm that distributes nodes along their longest path to a sink node.
			INTERACTIVE Distributes the nodes into layers by comparing their positions before the layout algorithm was started. The idea is that the relative horizontal order of nodes as it was before layout was applied is not changed. This of course requires valid positions for all nodes to have been set on the input graph before calling the layout algorithm. The interactive node layering algorithm uses the Interactive Reference Point option to determine which reference point of nodes are used to compare positions. */
			nodePlacement: 'BRANDES_KOEPF',
			/* BRANDES_KOEPF Minimizes the number of edge bends at the expense of diagram size: diagrams drawn with this algorithm are usually higher than diagrams drawn with other algorithms.
			LINEAR_SEGMENTS Computes a balanced placement.
			INTERACTIVE Tries to keep the preset y coordinates of nodes from the original layout. For dummy nodes, a guess is made to infer their coordinates. Requires the other interactive phase implementations to have run as well.
			SIMPLE Minimizes the area at the expense of... well, pretty much everything else. */
			randomizationSeed: 1,
			routeSelfLoopInside: false,
			separateConnectedComponents: true,
			spacing: 20,
			thoroughness: 7
		};
		var options = {
			nodeDimensionsIncludeLabels: false,
			fit: true,
			padding: 20,
			animate: true,
			animateFilter: function (node, i) { return true; },
			animationDuration: 500,
			animationEasing: undefined,
			transform: function (node, pos) { return pos; },
			ready: this.reset.bind(this),
			stop: undefined,
			klay: {
				addUnnecessaryBendpoints: false,
				aspectRatio: 1.6,
				borderSpacing: 20,
				compactComponents: false,
				crossingMinimization: 'LAYER_SWEEP',
				cycleBreaking: 'GREEDY',
				direction: 'UNDEFINED',
				edgeRouting: 'ORTHOGONAL',
				edgeSpacingFactor: 0.5,
				feedbackEdges: false,
				fixedAlignment: 'NONE',
				inLayerSpacingFactor: 1.0,
				layoutHierarchy: false,
				linearSegmentsDeflectionDampening: 0.3,
				mergeEdges: false,
				mergeHierarchyCrossingEdges: true,
				nodeLayering: 'NETWORK_SIMPLEX',
				nodePlacement: 'INTERACTIVE',
				/* BRANDES_KOEPF Minimizes the number of edge bends at the expense of diagram size: diagrams drawn with this algorithm are usually higher than diagrams drawn with other algorithms.
				LINEAR_SEGMENTS Computes a balanced placement.
				INTERACTIVE Tries to keep the preset y coordinates of nodes from the original layout. For dummy nodes, a guess is made to infer their coordinates. Requires the other interactive phase implementations to have run as well.
				SIMPLE Minimizes the area at the expense of... well, pretty much everything else. */
				randomizationSeed: 1,
				routeSelfLoopInside: false,
				separateConnectedComponents: true,
				spacing: 20,
				thoroughness: 3
			},
			name: 'klay',
			priority: function (edge) { return null; },
		};
		this.cy.layout(options).run();
	}
	retrievePositions(key) {
		if (nundef(key)) key = 'prest';
		let di = this.posDict[key];
		for (const n of this.getNodes()) {
			let id = n.id();
			let pos = di[id];
			if (isdef(pos)) this.setPosition(id, pos.x, pos.y);
		}
	}
	storePositions(key, poslist = []) {
		if (nundef(key)) key = 'prest';
		this.posDict[key] = {};
		let i = 0;
		for (const n of this.getNodes()) {
			let id = n.id();
			let pos = valf(poslist[i], this.getPosition(id));
			i += 1;
			this.posDict[key][id] = pos;
		}
	}
	storeSizes(key, poslist = []) {
		if (nundef(key)) key = 'size';
		this.posDict[key] = {};
		let i = 0;
		for (const n of this.getNodes()) {
			let id = n.id();
			let pos = valf(poslist[i], this.getSize(id));
			i += 1;
			this.posDict[key][id] = pos;
		}
	}
	//#endregion
	//#region zoom pan fit center
	fit() { this.cy.fit(); }
	center() { this.cy.center(); }
	reset() { this.pan0(); this.zoom1(); this.center(); this.fit(); }
	pan0() { this.cy.pan({ x: 0, y: 0 }); }
	zoom1() { this.cy.zoom(1); }
	isPan() { return this.cy.panningEnabled(); }
	isZoom() { return this.cy.zoomingEnabled(); }
	enablePanZoom() { this.pan(true); this.zoom(true); }
	pan(isOn, reset = true) {
		this.cy.panningEnabled(isOn);
		this.cy.userPanningEnabled(isOn);
		if (!isOn && reset) { this.pan0(); this.center(); }
	}
	zoom(isOn, minZoom = .25, maxZoom = 1, reset = true) {
		this.cy.zoomingEnabled(isOn);
		this.cy.userZoomingEnabled(isOn);
		if (!isOn && reset) { this.zoom1(); this.center(); }
		else if (isOn) { this.cy.minZoom(minZoom); this.cy.maxZoom(maxZoom); }
	}
	//#endregion
	setSizeToContent() {
		this.cy.zoomingEnabled(false);
		this.updateBounds();
	}
	updateBounds() {
		var bounds = this.cy.elements().boundingBox();
		let dContainer = this.live.dCy;
		dContainer.css('height', bounds.h + 100);
		dContainer.css('width', bounds.w + 100);
		this.cy.center();
		this.cy.resize();
		dContainer.cytoscapeEdgehandles('resize');
	}
	//#region ui funcs
	enableDD() { this.enableDragging(); }
	disableDD() { this.disableDragging(); }
	enableDragging() { this.cy.nodes().grabify(); }
	disableDragging() { this.cy.nodes().ungrabify(); }
	showGraph() { }
	showControls(dWhere, lWhich) {
		if (!this.hasControls) this.addLayoutControls(dWhere, lWhich);
		if (nundef(dWhere)) dWhere = iDiv(this);
	}
	showExtent() { let bb = this.cy.elements().bb(); console.log('graph size:', bb.w, bb.h); }
	showSize() { this.showExtent(); }
	hideGraph() { }
	hideControls() { }
	mount() { }
	unmount() { }
	closeLayoutControls() { if (isdef(this.sb)) hide(this.sb); }
	addLayoutControls(dParent, buttonlist) {
		if (nundef(dParent)) dParent = iDiv(this);
		let buttons = {
			BFS: mButton('BFS', () => this.breadthfirst(), dParent, {}, ['tbb']),
			circle: mButton('circle', () => this.circle(), dParent, {}, ['tbb']),
			CC: mButton('CC', () => this.concentric(), dParent, {}, ['tbb']),
			cola: mButton('cola', () => this.comcola(), dParent, {}, ['tbb']),
			cose: mButton('cose', () => this.cose(), dParent, {}, ['tbb']),
			euler: mButton('euler', () => this.euler(), dParent, {}, ['tbb']),
			fcose: mButton('fcose', () => this.fcose(), dParent, {}, ['tbb']),
			grid: mButton('grid', () => this.gridLayout(), dParent, {}, ['tbb']),
			klay: mButton('klay', () => this.klay(), dParent, {}, ['tbb']),
			prest: mButton('prest', () => this.presetLayout(), dParent, {}, ['tbb']),
			rand: mButton('rand', () => this.randomLayout(), dParent, {}, ['tbb']),
			center: mButton('center', () => this.center(), dParent, {}, ['tbb']),
			fit: mButton('fit', () => this.fit(), dParent, {}, ['tbb']),
			reset: mButton('reset', () => this.reset(), dParent, {}, ['tbb']),
			show: mButton('show', () => this.showGraph(), dParent, {}, ['tbb']),
			hide: mButton('hide', () => this.hideGraph(), dParent, {}, ['tbb']),
			store: mButton('store', () => this.storeCurrentPositions(), dParent, {}, ['tbb']),
		};
		for (const b in buttons) {
			if (isdef(buttonlist) && !buttonlist.includes(b)) hide(buttons[b]);
		}
		return buttons;
	}
	addVisual(dParent, styles = {}) {
		if (this.hasVisual) return;
		this.hasVisual = true;
		this.id = nundef(dParent.id) ? getUID() : dParent.id;
		let styleDict = {
			node: { 'width': 25, 'height': 25, 'background-color': 'red', "color": "#fff", 'label': 'data(id)', "text-valign": "center", "text-halign": "center", },
			edge: { 'width': 2, 'line-color': 'silver', 'curve-style': 'haystack', },
			'node.highlight': { 'background-color': 'yellow' },
			'node.trans': { 'opacity': '0.5' },
		}
		for (const ks of ['node', 'edge', 'node.highlight', 'node.trans']) {
			if (isdef(styles[ks])) {
				for (const k in styles[ks]) {
					let [prop, val] = translateToCssStyle(k, styles[ks][k], false);
					styleDict[ks][prop] = val;
				}
			}
		}
		let cyStyle = [];
		for (const k in styleDict) { cyStyle.push({ selector: k, style: styleDict[k] }); }
		let size = getSize(dParent);
		let d1 = mDiv(dParent, { position: 'relative', bg: 'green', w: size.w, left: 0, top: 0, h: size.h, align: 'left' });
		this.cy.mount(d1);
		this.cy.style(cyStyle);
		this.enablePanZoom();
		iAdd(this, { div: dParent, dCy: d1 });
	}
	//#endregion
	//#region events
	nodeEvent(evname, handler) { this.cy.on(evname, 'node', ev => handler(ev.target)); }
	mStyle(elid, styles, group = 'node') {
		if (isString(elid)) elid = this.cy.getElementById(elid);
		let di = translateStylesToCy(styles, group);
		for (const k in di) {
			elid.style(k, di[k]);
		}
	}
	setLabel(id, label, styles) {
		let ele = this.cy.getElementById(id);
		ele.data('label', label);
		this.mStyle(id, styles, isdef(this.getNode(id)) ? 'node' : 'edge');
	}
	setStyle(elid, prop, val) {
		if (isString(elid)) elid = this.cy.getElementById(elid);
		elid.style(prop, val);
	}
	setClass(elid, className) {
		if (isString(elid)) elid = this.cy.getElementById(elid);
		elid.class(className);
	}
	//#endregion
}
//#endregion classes

