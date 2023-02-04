class SimpleGrid {
	constructor(id, { mapData, shape = 'hex', rows = 3, cols = 2, idPrefix, hasNodes = false, hasEdges = false, randomizeIds = false } = {}) {
		this.randomizeIds = randomizeIds;
		this.mapData = mapData;
		this.dhelp = {};
		this.idCounters = { field: 0, corner: 0, edge: 0, other: 0 };
		this.shape = shape;
		this.sides = shape == 'hex' ? 6 : shape == 'quad' ? 4 : 3;
		this.degree = shape == 'hex' ? 3 : shape == 'quad' ? 4 : 6;
		this.idPrefix = idPrefix;
		this.objects = {};
		this.obj_type = shape + 'grid';
		this.id = id;
		if (rows == undefined) return;
		if (shape == 'hex') {
			rows = rows % 2 != 0 ? rows : rows + 1;
			this.topcols = cols;
			this.colarr = this._calc_hex_col_array(rows, this.topcols);
		} else if (shape == 'quad') {
			this.topcols = cols;
			this.colarr = new Array(rows).fill(cols);
		}
		this.maxcols = arrMax(this.colarr);
		this.rows = rows;
		this.cols = cols;
		this.fields = [];
		this.corners = [];
		this.edges = [];
		if (this.shape == 'hex') {
			this._hexFromScratch();
		} else if (this.shape == 'quad') {
			this._quadFromScratch();
		}
		this._calcMetrics();
		this._verifyMetrics();
		this.hasNodes = hasNodes;
		this.hasEdges = hasEdges;
		this._addPositions();
		if (!this.hasNodes) {
			for (const id of this.fields) {
				delete this.objects[id].corners;
			}
			for (const id of this.edges) {
				delete this.objects[id].corners;
			}
			for (const id of this.corners) {
				delete this.objects[id];
			}
			delete this.corners;
		}
		if (!this.hasEdges) {
			for (const id of this.fields) {
				delete this.objects[id].edges;
			}
			if (isdef(this.corners)) {
				for (const id of this.corners) {
					delete this.objects[id].edges;
				}
			}
			for (const id of this.edges) {
				delete this.objects[id];
			}
			delete this.edges;
		}
	}
	scaleToFit(w, h) {
		let f2nRatio = this.hasNodes ? 4 : 10000;
		let maintainRatio = false;
		let ew1 = 10;
		let gName = null;
		let margin = 10;
		let [fw, fh, nw, nh, ew] = this._bestFitScaleFactors(this.wBoard, this.wdef, this.hBoard, this.hdef, f2nRatio, ew1, {
			gName: gName,
			w: w,
			h: h,
			margin: margin,
			maintainRatio: maintainRatio
		});
		let gap = 4;
		for (const id of this.fields) {
			let o = this.objects[id];
			o.bounds = [o.x * fw, o.y * fh, o.w * fw - gap, o.h * fh - gap];
		}
		return Object.values(this.objects).map(x => x.bounds);
	}
	_addPositions({ wdef = null, hdef = null } = {}) {
		this.wdef = 4;
		this.hdef = 4;
		let fields = Object.values(this.objects).filter(x => x.obj_type == 'field');
		this._recurseFields(this.fields[0]);
		let left = indexOfMin(fields, 'x').val;
		let right = indexOfMax(fields, 'x').val;
		let top = indexOfMin(fields, 'y').val;
		let bottom = indexOfMax(fields, 'y').val;
		this.wBoard = right - left + this.wdef;
		this.hBoard = bottom - top + this.hdef;
		let dx = (left + right) / 2;
		let dy = (top + bottom) / 2;
		for (const f of fields) {
			f.x -= dx;
			f.y -= dy;
		}
		let q = [[0.5, -0.5], [0.5, 0.5], [-0.5, 0.5], [-0.5, -0.5]];
		let hex = [[0, -0.5], [0.5, -0.25], [0.5, 0.25], [0, 0.5], [-0.5, 0.25], [-0.5, -0.25]];
		let triup = [[0, -0.5], [0.5, 0.5], [-0.5, 0.5]];
		let tridown = [[-0.5, 0.5], [0.5, 0.5], [-0.5, 0.5]];
		let pts = this.shape == 'hex' ? hex : this.shape == 'quad' ? q : this.shape == 'triup' ? triup : tridown;
		for (const f of fields) {
			f.poly = getPoly(pts, f.x, f.y, this.wdef, this.hdef);
		}
		this.vertices = correctPolys(this.fields.map(fid => this.objects[fid].poly), 1, 1);
		if (!this.hasNodes) return;
		for (const f of fields) {
			for (let i = 0; i < f.poly.length; i++) {
				let nid = f.corners[i];
				if (!nid) continue;
				let el = this.objects[nid];
				let pt = f.poly[i];
				el.h = 1;
				el.w = 1;
				el.x = pt.x;
				el.y = pt.y;
			}
		}
		if (!this.hasEdges) return;
		for (const f of fields) {
			for (let i = 0; i < f.edges.length; i++) {
				let eid = f.edges[i];
				if (!eid) continue;
				let el = this.objects[eid];
				let n1 = this.objects[el.corners[0]];
				let n2 = this.objects[el.corners[1]];
				el.x1 = n1.x;
				el.y1 = n1.y;
				el.x2 = n2.x;
				el.y2 = n2.y;
				el.x = (n1.x + n2.x) / 2;
				el.y = (n1.y + n2.y) / 2;
				el.thickness = 1;
			}
		}
	}
	_bestFitScaleFactors(wBoard, wField, hBoard, hField, f2nRatio = 4, edgeWidth = 10, { gName, w, h, margin = 4, maintainRatio = false } = {}) {
		if (w == undefined) {
			let g = document.getElementById(gName);
			let transinfo = getTransformInfo(g);
			w = transinfo.translateX * 2;
			h = transinfo.translateY * 2;
		}
		let fw = Math.floor((w - margin) / (wBoard + wField / 2));
		let fh = Math.floor((h - margin) / (hBoard + hField / 2));
		if (maintainRatio) {
			let ff = Math.min(fw, fh);
			fw = ff;
			fh = ff;
		}
		return [fw, fh, Math.floor(fw / f2nRatio), Math.floor(fh / f2nRatio), edgeWidth];
	}
	_hexFromScratch() {
		this.dhelp = {};
		this.idCounters = { field: 0, corner: 0, edge: 0, other: 0 };
		this.imiddleRow = (this.rows - 1) / 2;
		let offsetsHex = [[0, -0.5], [0.5, -0.25], [0.5, 0.25], [0, 0.5], [-0.5, 0.25], [-0.5, -0.25]];
		let offsetsQuad = [[-0.5, -0.5], [0.5, -0.5], [0.5, 0.5], [-0.5, 0.5]];
		this.offsets = this.shape == 'quad' ? offsetsQuad : offsetsHex;
		let idxQuadRow = [-1, 0, 0, -1];
		let idxQuadCol = [0, 0, -1, -1];
		let idxHexRow = [-1, -1, 0, 0, 0, -1];
		let idxHexCol = [0, 1, 1, 0, -1, -1];
		this.indexRow = this.shape == 'quad' ? idxQuadRow : idxHexRow;
		this.indexCol = this.shape == 'quad' ? idxQuadCol : idxHexCol;
		this.fieldsByRowCol = {};
		for (let irow = 0; irow < this.colarr.length; irow++) {
			this.fieldsByRowCol[irow] = {};
			let colstart = this.maxcols - this.colarr[irow];
			for (let j = 0; j < this.colarr[irow]; j++) {
				var icol = colstart + 2 * j;
				let field = {};
				field.obj_type = 'field';
				field.id = this._getId(field);
				field.row = irow;
				field.col = icol;
				field.edges = arrCreate(6, () => null);
				field.neighbors = arrCreate(6, () => null);
				field.corners = arrCreate(6, () => null);
				this.objects[field.id] = field;
				this.fields.push(field.id);
				this.fieldsByRowCol[irow][icol] = field.id;
			}
		}
		for (const fid of this.fields) {
			let field = this.objects[fid];
			for (let inode = 0; inode < this.sides; inode++) {
				let nrow = field.row + this.indexRow[inode];
				let ncol = field.col + this.indexCol[inode];
				let irc = 'n' + '-' + nrow + '_' + ncol;
				let node = null;
				if (irc in this.dhelp) {
					node = this.dhelp[irc];
				} else {
					node = {};
					node.obj_type = 'corner';
					node.id = this._getId(node);
					node.row = nrow;
					node.col = ncol;
					node.edges = arrCreate(3, () => null);
					node.fields = arrCreate(3, () => null);
					this.corners.push(node.id);
					this.dhelp[irc] = node;
					this.objects[node.id] = node;
				}
				if (inode == 0) {
					node.fields[1] = field.id;
				} else if (inode == 1) {
					node.fields[2] = field.id;
				} else if (inode == 2) {
					node.fields[2] = field.id;
				} else if (inode == 3) {
					node.fields[0] = field.id;
				} else if (inode == 4) {
					node.fields[0] = field.id;
				} else if (inode == 5) {
					node.fields[1] = field.id;
				}
				field.corners[inode] = node.id;
			}
		}
		for (const fid of this.fields) {
			let field = this.objects[fid];
			for (let inode = 0; inode < this.sides; inode++) {
				let in1 = inode;
				let in2 = (inode + 1) % 6;
				let n1 = this.objects[field.corners[in1]];
				let n2 = this.objects[field.corners[in2]];
				let startNode = n1;
				if (n1.row > n2.row) {
					startNode = n2;
				}
				if (n1.row == n2.row && n1.col > n2.col) {
					startNode = n2;
				}
				let endNode = startNode == n1 ? n2 : n1;
				let irc = 'e' + startNode.id + '_' + endNode.id;
				let edge = null;
				if (irc in this.dhelp) {
					edge = this.dhelp[irc];
				} else {
					edge = {};
					edge.obj_type = 'edge';
					edge.id = this._getId(edge);
					edge.row = startNode.row;
					edge.col = startNode.col;
					edge.fields = [null, null];
					edge.leftField = null;
					edge.rightField = null;
					edge.corners = [startNode.id, endNode.id];
					edge.startNode = startNode.id;
					edge.endNode = endNode.id;
					if (inode == 0) {
						n1.edges[1] = edge.id;
						n2.edges[2] = edge.id;
					} else if (inode == 1) {
						n1.edges[1] = edge.id;
						n2.edges[0] = edge.id;
					} else if (inode == 2) {
						n1.edges[2] = edge.id;
						n2.edges[0] = edge.id;
					} else if (inode == 3) {
						n1.edges[2] = edge.id;
						n2.edges[1] = edge.id;
					} else if (inode == 4) {
						n1.edges[0] = edge.id;
						n2.edges[1] = edge.id;
					} else if (inode == 5) {
						n1.edges[0] = edge.id;
						n2.edges[2] = edge.id;
					}
					this.edges.push(edge.id);
					this.dhelp[irc] = edge;
					this.objects[edge.id] = edge;
				}
				if (inode < 3) {
					edge.fields[1] = field.id;
					edge.leftField = field.id;
				} else {
					edge.fields[0] = field.id;
					edge.rightField = field.id;
				}
				field.edges[inode] = edge.id;
			}
		}
		for (const fid of this.fields) {
			let f = this.objects[fid];
			for (let i = 0; i < 6; i++) {
				let e = this.objects[f.edges[i]];
				for (const f1 of e.fields) {
					if (f1 && f1 != fid) {
						f.neighbors[i] = f1;
					}
				}
			}
		}
	}
	_quadFromScratch() {
		this.dhelp = {};
		this.idCounters = { field: 0, corner: 0, edge: 0, other: 0 };
		let offsetsHex = [[0, -0.5], [0.5, -0.25], [0.5, 0.25], [0, 0.5], [-0.5, 0.25], [-0.5, -0.25]];
		let offsetsQuad = [[0.5, -0.5], [0.5, 0.5], [-0.5, 0.5], [-0.5, -0.5]];
		this.offsets = this.shape == 'quad' ? offsetsQuad : offsetsHex;
		let idxQuadRow = [-1, 0, 0, -1];
		let idxQuadCol = [0, 0, -1, -1];
		let idxHexRow = [-1, -1, 0, 0, 0, -1];
		let idxHexCol = [0, 1, 1, 0, -1, -1];
		this.indexRow = this.shape == 'quad' ? idxQuadRow : idxHexRow;
		this.indexCol = this.shape == 'quad' ? idxQuadCol : idxHexCol;
		this.fieldsByRowCol = {};
		for (let irow = 0; irow < this.colarr.length; irow++) {
			this.fieldsByRowCol[irow] = {};
			for (let icol = 0; icol < this.colarr[irow]; icol++) {
				let field = {};
				field.obj_type = 'field';
				field.id = this._getId(field);
				field.row = irow;
				field.col = icol;
				field.edges = arrCreate(4, () => null);
				field.neighbors = arrCreate(4, () => null);
				field.corners = arrCreate(4, () => null);
				this.objects[field.id] = field;
				this.fields.push(field.id);
				this.fieldsByRowCol[irow][icol] = field.id;
			}
		}
		for (const fid of this.fields) {
			let field = this.objects[fid];
			for (let inode = 0; inode < this.sides; inode++) {
				let nrow = field.row + this.indexRow[inode];
				let ncol = field.col + this.indexCol[inode];
				let irc = 'n' + '-' + nrow + '_' + ncol;
				let node = null;
				if (irc in this.dhelp) {
					node = this.dhelp[irc];
				} else {
					node = {};
					node.obj_type = 'corner';
					node.id = this._getId(node);
					node.row = nrow;
					node.col = ncol;
					node.edges = arrCreate(4, () => null);
					node.fields = arrCreate(4, () => null);
					this.corners.push(node.id);
					this.dhelp[irc] = node;
					this.objects[node.id] = node;
				}
				if (inode == 0) {
					node.fields[2] = field.id;
				} else if (inode == 1) {
					node.fields[3] = field.id;
				} else if (inode == 2) {
					node.fields[0] = field.id;
				} else if (inode == 3) {
					node.fields[1] = field.id;
				}
				field.corners[inode] = node.id;
			}
		}
		for (const fid of this.fields) {
			let field = this.objects[fid];
			for (let i = 3; i < 7; i++) {
				let inode = i % 4;
				let in1 = inode;
				let in2 = (inode + 1) % this.sides;
				let n1 = this.objects[field.corners[in1]];
				let n2 = this.objects[field.corners[in2]];
				let startNode = n1;
				if (n1.row > n2.row) {
					startNode = n2;
				}
				if (n1.row == n2.row && n1.col > n2.col) {
					startNode = n2;
				}
				let endNode = startNode == n1 ? n2 : n1;
				let irc = 'e' + startNode.id + '_' + endNode.id;
				let edge = null;
				if (irc in this.dhelp) {
					edge = this.dhelp[irc];
				} else {
					edge = {};
					edge.obj_type = 'edge';
					edge.id = this._getId(edge);
					edge.row = startNode.row;
					edge.col = startNode.col;
					edge.fields = [null, null];
					edge.leftField = null;
					edge.rightField = null;
					edge.topField = null;
					edge.bottomField = null;
					edge.crossField = null;
					edge.corners = [startNode.id, endNode.id];
					edge.startNode = startNode.id;
					edge.endNode = endNode.id;
					if (inode == 0) {
						n1.edges[2] = edge.id;
						n2.edges[0] = edge.id;
					} else if (inode == 1) {
						n1.edges[3] = edge.id;
						n2.edges[1] = edge.id;
					} else if (inode == 2) {
						n1.edges[0] = edge.id;
						n2.edges[2] = edge.id;
					} else if (inode == 3) {
						n1.edges[1] = edge.id;
						n2.edges[3] = edge.id;
					}
					this.edges.push(edge.id);
					this.dhelp[irc] = edge;
					this.objects[edge.id] = edge;
				}
				if (inode == 0) {
					edge.fields[1] = field.id;
					edge.leftField = field.id;
				} else if (inode == 1) {
					edge.fields[0] = field.id;
					edge.topField = field.id;
				} else if (inode == 2) {
					edge.fields[0] = field.id;
					edge.rightField = field.id;
				} else if (inode == 3) {
					edge.fields[1] = field.id;
					edge.bottomField = field.id;
				}
				field.edges[(inode + 1) % 4] = edge.id;
			}
		}
		for (const fid of this.fields) {
			let f = this.objects[fid];
			for (let i = 0; i < 4; i++) {
				if (!f.edges[i]) continue;
				let e = this.objects[f.edges[i]];
				for (const f1 of e.fields) {
					if (f1 && f1 != fid) {
						f.neighbors[i] = f1;
					}
				}
			}
		}
		this._verifyMetrics();
	}
	_getId(o) {
		if (this.randomizeIds) return getUID();
		if ('obj_type' in o && o.obj_type in this.idCounters) {
			this.idCounters[o.obj_type] += 1;
			let prefix = o.obj_type[0];
			if (!isEmpty(this.idPrefix)) {
				prefix = this.idPrefix + prefix;
			}
			return prefix + this.idCounters[o.obj_type];
		} else {
			let prefix = 'o';
			if (!empty(this.idPrefix)) {
				prefix = this.idPrefix + prefix;
			}
			this.idCounters['other'] += 1;
			return prefix + this.idCounters['other'];
		}
	}
	_recurseFields(fid, { x = 0, y = 0 } = {}) {
		if (!fid) return;
		let f = this.objects[fid];
		if ('done' in f) return;
		f.done = true;
		f.h = this.hdef;
		f.w = this.wdef;
		f.x = x;
		f.y = y;
		for (let i = 0; i < this.sides; i++) {
			let sid_nei = f.neighbors[i];
			if (sid_nei != null) {
				let dx = 0;
				let dy = 0;
				if (this.shape == 'hex') {
					if (i == 0) {
						dx += this.wdef / 2;
						dy -= (3 * this.hdef) / 4;
					} else if (i == 1) {
						dx += this.wdef;
					} else if (i == 2) {
						dx += this.wdef / 2;
						dy += (3 * this.hdef) / 4;
					} else if (i == 3) {
						dx -= this.wdef / 2;
						dy += (3 * this.hdef) / 4;
					} else if (i == 4) {
						dx -= this.wdef;
					} else if (i == 5) {
						dx -= this.wdef / 2;
						dy -= (3 * this.hdef) / 4;
					}
				} else if (this.shape == 'quad') {
					if (i == 0) {
						dy -= this.hdef;
					} else if (i == 1) {
						dx += this.wdef;
					} else if (i == 2) {
						dy += this.hdef;
					} else if (i == 3) {
						dx -= this.wdef;
					}
				}
				this._recurseFields(sid_nei, { x: x + dx, y: y + dy });
			}
		}
	}
	_calc_hex_col_array(rows, cols) {
		let colarr = [];
		for (let i = 0; i < rows; i++) {
			colarr[i] = cols;
			if (i < (rows - 1) / 2) cols += 1;
			else cols -= 1;
		}
		return colarr;
	}
	_calcMetrics() {
		this.nNodes = 0;
		this.nEdges = 0;
		this.nFields = 0;
		if (this.shape == 'hex') {
			for (let i = 0; i < (this.rows - 1) / 2 + 1; i++) {
				let n = this.colarr[i];
				this.nFields += n == this.maxcols ? n : 2 * n;
				this.nNodes += 2 * (2 * n + 1);
				this.nEdges += n * 2 * 2 + (n == this.maxcols ? n + 1 : 2 * (n + 1));
			}
		} else if (this.shape == 'quad') {
			this.nNodes = (this.cols + 1) * (this.rows + 1);
			this.nFields = this.cols * this.rows;
			this.nEdges = this.cols * (this.rows + 1) + this.rows * (this.cols + 1);
		}
	}
	_verifyMetrics(verbose = false) {
		if (verbose) {
		}
		if (this.corners.length != this.nNodes || this.edges.length != this.nEdges || this.fields.length != this.nFields) {
		} else if (verbose) {
		}
	}
}









