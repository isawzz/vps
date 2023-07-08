//#region const
const CODE = {
	paths: [],
	funcs: {},
	consts: {},
	index: [],
};
var COLOURS = { WHITE: 0, BLACK: 1, BOTH: 2 };
var SQUARES = {
	A1: 21, B1: 22, C1: 23, D1: 24, E1: 25, F1: 26, G1: 27, H1: 28,
	A8: 91, B8: 92, C8: 93, D8: 94, E8: 95, F8: 96, G8: 97, H8: 98, NO_SQ: 99, OFFBOARD: 100
};
var PIECES = { EMPTY: 0, wP: 1, wN: 2, wB: 3, wR: 4, wQ: 5, wK: 6, bP: 7, bN: 8, bB: 9, bR: 10, bQ: 11, bK: 12 };
var BRD_SQ_NUM = 120;
var MAXGAMEMOVES = 2048;
var MAXPOSITIONMOVES = 256;
var MAXDEPTH = 64;
var INFINITE = 30000;
var MATE = 29000;
var START_FEN = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1";
var COLUMNS = { COL_A: 0, COL_B: 1, COL_C: 2, COL_D: 3, COL_E: 4, COL_F: 5, COL_G: 6, COL_H: 7, COL_NONE: 8 };
var ROWS = { ROW_1: 0, ROW_2: 1, ROW_3: 2, ROW_4: 3, ROW_5: 4, ROW_6: 5, ROW_7: 6, ROW_8: 7, ROW_NONE: 8 };
var BOOL = { FALSE: 0, TRUE: 1 };
var CASTLEBIT = { WKCA: 1, WQCA: 2, BKCA: 4, BQCA: 8 };
const GT = {};
const crowd = []
const MOUSED = 15;
const CARD_SZ = 80;
const FLASK = true;
const allPeeps = []
const LABEL_SZ = 40;
const FIELD_SZ = 40;
const MAXNODES = 5;
const messages = [];
const HEROKU = false;
const UITEST = false;
const VERBOSE = true;
const DEF_SPLIT = 0.5;
const RED = '#e6194B';
const clientData = {};
const RUNTEST = false;
const CODE_VERSION = 1;
const BLUE = '#4363d8';
const TEAL = '#469990';
const wred = '#f44336';
const DSPEC_VERSION = 3;
const IS_MIRROR = false;
const BROWN = '#96613d';
const GREEN = '#3cb44b';
const OLIVE = '#808000';
const waqua = '#00ffff';
const wblue = '#2196f3';
const wcyan = '#00bcd4';
const wgrey = '#9e9e9e';
const wlime = '#cddc39';
const wpink = '#e91e63';
const wsand = '#fdf5e6';
const wteal = '#009688';
const BRAUN = '#331606';
const SHOW_CODE = false;
const SHOW_DEFS = false;
const MASTERVOLUME = 0.1;
const ORANGE = '#f58231';
const PURPLE = '#911eb4';
const YELLOW = '#ffe119';
const wamber = '#ffc107';
const wblack = '#000000';
const wbrown = '#795548';
const wgreen = '#4caf50';
const wkhaki = '#f0e68c';
const wlight = '#f1f1f1';
const wwhite = '#ffffff';
const IS_TESTING = true;
const availablePeeps = []
const TIMIT_SHOW = false;
const SHOW_TRACE = false;
const YELLOW3 = '#ffed01';
const windigo = '#3f51b5';
const worange = '#ff9800';
const wpurple = '#9c27b0';
const wyellow = '#ffeb3b';
const MARGIN_S = '3px 6px';
const MIN_CARD_HEIGHT = 60;
const USPEC_VERSION = '2a';
const USE_SOCKETIO = false;
const TEST_VERSION = '17';
const MAX_RECURSIONS = 200;
const YELLOW2 = '#fff620';
const wpalered = '#ffdddd';
const MARGIN_M = '4px 10px';
const MARGIN_XS = '2px 4px';
const MAX_CARD_HEIGHT = 100;
const CACHE_INITDATA = true;
const TEST_PATH = '/zdata/';
const USE_BACKEND_AI = true;
const DEF_ORIENTATION = 'v';
const VerboseSocket = false;
const BLUEGREEN = '#004054';
const FIREBRICK = '#800000';
const LIGHTBLUE = '#42d4f4';
const wbluegrey = '#607d8b';
const wbluegray = '#607d8b';
const wdarkgrey = '#616161';
const wpaleblue = '#ddffff';
const CORNERS2 = ['⬔', '⬕'];
const SHOW_FREEZER = false;
const SERVERDATA_VERSION = 1;
const wlightblue = '#87ceeb';
const wpalegreen = '#ddffdd';
const NEONORANGE = '#ff6700';
const NEONYELLOW = '#efff04';
const CORNERS0 = ['♠', '♡'];
const CORNERS4 = ['⭐', '⭑'];
const CORNERS5 = ['⬛', '⬜'];
const uiHaltedMask = 1 << 0;
const SHOW_CODE_DATA = false;
const wdeeporange = '#ff5722';
const wdeeppurple = '#673ab7';
const wlightgreen = '#8bc34a';
const wpaleyellow = '#ffffcc';
const DEFAULTPICTYPE = 'all';
const immediateStart = true;
const hasClickedMask = 1 << 2;
const JUST_PERLEN_GAME = true;
const SHOW_SERVERDATA = false;
const MarkerText = ['✔️', '❌'];
const MAX_PLAYERS_AVAILABLE = 8;
const ALLOW_CALIBRATION = false;
const SHOW_SERVER_ROUTE = false;
const INCREMENTAL_UPDATE = true;
const USE_NON_TESTING_DATA = true;
const USE_MAX_PLAYER_NUM = false;
const SHOW_SERVER_RETURN = false;
const SEND_MOUSE_MOVE_EVERY = 200;
const USE_ALL_GAMES_ROUTE = false;
const USER_SERVERDATA_STUB = false;
const beforeActivationMask = 1 << 1;
const USE_OLD_GRID_FUNCTIONS = false;
const GENERATE_EMPTY_MESSAGES = true;
const CORNERS = ['◢', '◣', '◤', '◥'];
const USERNAME_SELECTION = 'random';
const INIT_CLEAR_LOCALSTORAGE = true;
const STARTING_TAB_OPEN = 'bPlayers';
const CORNERS3 = ['⮜', '⮝', '⮞', '⮟'];
const defaultDeckAreaName = 'deckArea';
var SERVERURL = 'http://localhost:4041';
const MarkerId = { SUCCESS: 0, FAIL: 1 };
const PERLENPATH_FRONT = './PERLENDATA/';
const img = document.createElement('img')
const LIGHTGREEN = '#afff45'; //'#bfef45';
const UnicodeSymbols = {
	menu: '☰',
};
const CRIMSON = colorDarker('crimson', .25);
const stage = {
	width: 0,
	height: 0,
}
const PERLEN_DATA_PATH = './public/PERLENDATA/';
const RUPDATE = {
	info: mNodeChangeContent,
};
const defaultGameplayerAreaName = 'gameplayerArea';
const sleep = m => new Promise(r => setTimeout(r, m))
const SIMPLE_COLORS = ['red', 'green', 'yellow', 'blue'];
const selectElement = document.getElementById('type');
const defaultTabletopCardsAreaName = 'tabletopCardsArea';
const removeFromArray = (array, i) => array.splice(i, 1)[0]
const soloTypes = ['me', 'AI regular', 'AI random', 'AI pass'];
const PLAYER_CONFIG_FOR_MULTIPLAYER = ['me', 'human', 'human'];
const randomIndex = (array) => randomRange(0, array.length) | 0
const randomRange = (min, max) => min + Math.random() * (max - min)
const getRandomFromArray = (array) => (array[randomIndex(array) | 0])
const messageTypes = { LEFT: 'left', RIGHT: 'right', LOGIN: 'login' };
const RSGTYPES = { board: 1, hand: 2, field: 101, edge: 102, corner: 103 };
const RCONTAINERPROP = {
	list: 'elm',
	hand: 'elm',
	panel: 'sub',
}
const INTERACTION = { none: 0, selected: 1, stop: 2, saveLoad: 3, route: 4 };
const allPlayerTypes = ['me', 'human', 'AI regular', 'AI random', 'AI pass'];
const NGROK = false; //'http://849aec381695.ngrok.io/'; // MUSS / am ende!!! 
const overwriteMerge = (destinationArray, sourceArray, options) => sourceArray
const _overwriteMerge = (destinationArray, sourceArray, options) => sourceArray
const removeRandomFromArray = (array) => removeFromArray(array, randomIndex(array))
const EMOFONTLIST = ['emoOpen', 'openmoBlack', 'segoe ui emoji', 'segoe ui symbol'];
const removeItemFromArray = (array, item) => removeFromArray(array, array.indexOf(item))
const EXTENDED_COLORS = ['red', 'green', 'yellow', 'blue', 'pink', 'indigo', 'gray', 'sienna', 'olive'];
const THEMES = ['#c9af98', '#2F4F4F', '#6B7A8F', '#00303F', 'rgb(3, 74, 166)', '#458766', '#7A9D96'];
const Simple = {
	axiom: 'A',
	rules: [
		{ aus: 'A', mach: 'AB' },
		{ aus: 'B', mach: 'A' }
	],
};
const PARAMCSS = {
	bg: 'background-color',
	fg: 'color',
	align: 'text-align',
	rounding: 'border-radius',
};
const config = {
	src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/175711/open-peeps-sheet.png',
	rows: 15,
	cols: 7
}
const Complex = {
	axiom: 'F',
	rules: [
		{ aus: 'F', mach: 'FF+[+F-F-F]-[-F+F+F]' }
	],
	angle: 25,
	factor: .5,
	max: 6,
};
const SERVER_URL = IS_MIRROR ? 'http://localhost:5555/' : FLASK ? (NGROK ? NGROK : 'http://localhost:' + PORT + '/') : 'http://localhost:5005/';
const names = ['felix', 'amanda', 'sabine', 'tom', 'taka', 'microbe', 'dwight', 'jim', 'michael', 'pam', 'kevin', 'darryl', 'lauren', 'anuj', 'david', 'holly'];
const Algae = {
	axiom: 'A',
	rules: [
		{ aus: 'A', mach: 'A+[B]-[A]' },
		{ aus: 'B', mach: 'AA' }
	],
	angle: 25,
	factor: .9,
	max: 5,
};
const complementaryColor = color => {
	const hexColor = color.replace('#', '0x');
	return `#${('000000' + ('0xffffff' ^ hexColor).toString(16)).slice(-6)}`;
};
const COLORPARAMNAMES = {
	bg: true,
	fg: true,
	color: true,
	'font-color': true,
	border: true,
	highlight: true,
	highlight1: true,
	highlight1: true,
}
const displayMessages = () => {
	const messagesHTML = messages
		.map(message => createMessageHTML(message))
		.join('');
	messagesList.innerHTML = messagesHTML;
};
const RCREATE = {
	card52: mCard52,
	card: mCard,
	hand: mHand,
	grid: mGrid,
	info: mInfo,
	invisible: mInvisible,
	panel: mPanel,
	picto: mPicto,
	manual00: mManual00,
}
const KSKeys = ['action', 'actionPlus', 'all', 'best25', 'best50', 'best75', 'best100', 'emo', 'huge',
	'life', 'life50', 'lifePlus', 'nemo', 'nemo100', 'object', 'object50', 'objectPlus'];
const PARAMRSG_T = {
	defaultType: false,
	show: false,
	overlap: true,
	orientation: true,
	split: true,
	shape: true,
	field_spacing: true,
	size: true,
	rounding: true,
};
const DOMCATS = { rect: 'g', g: 'g', circle: 'g', text: 'g', polygon: 'g', line: 'g', body: 'd', svg: 'h', div: 'd', p: 'd', table: 'd', button: 'd', a: 'd', span: 'd', image: 'd', paragraph: 'd', anchor: 'd' };
const ColorList = ['lightgreen', 'lightblue', 'yellow', 'red', 'green', 'blue', 'purple', 'violet', 'lightyellow',
	'teal', 'orange', 'brown', 'olive', 'deepskyblue', 'deeppink', 'gold', 'black', 'white', 'grey'];
const GirlNames = ['Adrianna', 'Amanda', 'Ashley', 'Cassandra', 'Charlene', 'Erica', 'Gudrun',
	'Jenny', 'Lana', 'Lillian', 'Martha', 'Maurita', 'Melissa', 'Micha', 'Milda', 'Natalie', 'Natasha',
	'Rebecca', 'Stacy'];
const GermanToEnglish = {
	rot: 'red', blau: 'blue', grün: 'green', gelb: 'yellow', violett: 'violet', lila: 'purple',
	braun: 'brown', schwarz: 'black', weiss: 'white', grau: 'grey', rosa: 'pink', orange: 'orange'
};
const BoyNames = ['Aaron', 'Ariel', 'Billy', 'Cayley', 'Erik',
	'Felix', 'Gunter', 'Gilbert', 'Henry', 'Jacob', 'Jaime', 'John', 'Leo',
	'Marshall', 'Matthew', 'Nathan',
	'Robert', 'Shad', 'Thomas', 'Tim', 'William'];
const voiceNames = {
	david: 'Microsoft David Desktop - English',
	zira: 'Microsoft Zira Desktop - English',
	us: 'Google US English',
	ukFemale: 'Google UK English Female',
	ukMale: 'Google UK English Male',
	deutsch: 'Google Deutsch',
};
const orderByLuminance = (rgbValues) => {
	const calculateLuminance = (p) => {
		return 0.2126 * p.r + 0.7152 * p.g + 0.0722 * p.b;
	};
	return rgbValues.sort((p1, p2) => {
		return calculateLuminance(p2) - calculateLuminance(p1);
	});
};
const playerColors = {
	red: '#D01013',
	blue: '#003399',
	green: '#58A813',
	orange: '#FF6600',
	yellow: '#FAD302',
	violet: '#55038C',
	pink: '#ED527A',
	beige: '#D99559',
	sky: '#049DD9',
	brown: '#A65F46',
	white: '#FFFFFF',
};
const buildRgb = (imageData) => {
	const rgbValues = [];
	for (let i = 0; i < imageData.length; i += 4) {
		const rgb = {
			r: imageData[i],
			g: imageData[i + 1],
			b: imageData[i + 2],
		};
		rgbValues.push(rgb);
	}
	return rgbValues;
};
const fieldSorter = fields => (a, b) =>
	fields
		.map(o => {
			let dir = 1;
			if (o[0] === '-') {
				dir = -1;
				o = o.substring(1);
			}
			return a[o] > b[o] ? dir : a[o] < b[o] ? -dir : 0;
		})
		.reduce((p, n) => (p ? p : n), 0);
const calculateColorDifference = (color1, color2) => {
	const rDifference = Math.pow(color2.r - color1.r, 2);
	const gDifference = Math.pow(color2.g - color1.g, 2);
	const bDifference = Math.pow(color2.b - color1.b, 2);
	return rDifference + gDifference + bDifference;
};
const rgbToHexCOOL = (pixel) => {
	const componentToHex = (c) => {
		const hex = c.toString(16);
		return hex.length == 1 ? "0" + hex : hex;
	};
	return (
		"#" +
		componentToHex(pixel.r) +
		componentToHex(pixel.g) +
		componentToHex(pixel.b)
	).toUpperCase();
};
const levelColors = [LIGHTGREEN, LIGHTBLUE, YELLOW, 'orange', RED,
	GREEN, BLUE, PURPLE, YELLOW2, 'deepskyblue', 'deeppink',
	TEAL, ORANGE, 'seagreen', FIREBRICK, OLIVE, '#ffd8b1', '#000075', '#a9a9a9', '#ffffff', '#000000', 'gold', 'orangered', 'skyblue', 'pink', 'palegreen', '#e6194B'];
const PlayerColors = {
	red: '#D01013',
	blue: '#003399',
	green: '#58A813',
	orange: '#FF6600',
	yellow: '#FAD302',
	violet: '#55038C',
	pink: '#ED527A',
	beige: '#D99559',
	sky: '#049DD9',
	brown: '#A65F46',
	white: '#FFFFFF',
	lightblue: '#42d4f4',
	lightgreen: '#afff45',
};
const BLUFF = {
	torank: { _: '_', three: '3', four: '4', five: '5', six: '6', seven: '7', eight: '8', nine: '9', ten: 'T', jack: 'J', queen: 'Q', king: 'K', ace: 'A' },
	toword: { _: '_', '3': 'three', '4': 'four', '5': 'five', '6': 'six', '7': 'seven', '8': 'eight', '9': 'nine', T: 'ten', J: 'jack', Q: 'queen', K: 'king', A: 'ace' },
	rankstr: '3456789TJQKA',
};
const germanNumbers = {
	ein: 1, eins: 1, zwei: 2, 1: 'eins', 2: 'zwei', 3: 'drei', drei: 3, vier: 4, 4: 'vier', 5: 'fuenf', fuenf: 5, sechs: 6, 6: 'sechs', sex: 6,
	sieben: 7, 7: 'sieben', 8: 'acht', acht: 8, 9: 'neun', neun: 9, zehn: 10, elf: 11, zwoelf: 12, zwanzig: 20, dreissig: 30,
	10: 'zehn', 11: 'elf', 12: 'zwoelf', 20: 'zwanzig', 30: 'dreissig', vierzig: 40, fuenfzig: 50, 40: 'vierzig', 50: 'fuenfzig'
};
const normalWalk = ({ peep, props }) => {
	const {
		startX,
		startY,
		endX
	} = props
	const xDuration = 10
	const yDuration = 0.25
	const tl = gsap.timeline()
	tl.timeScale(randomRange(0.5, 1.5))
	tl.to(peep, {
		duration: xDuration,
		x: endX,
		ease: 'none'
	}, 0)
	tl.to(peep, {
		duration: yDuration,
		repeat: xDuration / yDuration,
		yoyo: true,
		y: startY - 10
	}, 0)
	return tl
}
const hslToHexCOOL = (hslColor) => {
	const hslColorCopy = { ...hslColor };
	hslColorCopy.l /= 100;
	const a =
		(hslColorCopy.s * Math.min(hslColorCopy.l, 1 - hslColorCopy.l)) / 100;
	const f = (n) => {
		const k = (n + hslColorCopy.h / 30) % 12;
		const color = hslColorCopy.l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
		return Math.round(255 * color)
			.toString(16)
			.padStart(2, "0");
	};
	return `#${f(0)}${f(8)}${f(4)}`.toUpperCase();
};
const getText = function (feature, resolution, dom) {
	const type = dom.text.value;
	const maxResolution = dom.maxreso.value;
	let text = feature.get('name');
	if (resolution > maxResolution) {
		text = '';
	} else if (type == 'hide') {
		text = '';
	} else if (type == 'shorten') {
		text = text.trunc(12);
	} else if (
		type == 'wrap' &&
		(!dom.placement || dom.placement.value != 'line')
	) {
		text = stringDivider(text, 16, '\n');
	}
	return text;
};
const resetPeep = ({ stage, peep }) => {
	const direction = Math.random() > 0.5 ? 1 : -1
	const offsetY = 100 - 250 * gsap.parseEase('power2.in')(Math.random())
	const startY = stage.height - peep.height + offsetY
	let startX
	let endX
	if (direction === 1) {
		startX = -peep.width
		endX = stage.width
		peep.scaleX = 1
	} else {
		startX = stage.width + peep.width
		endX = 0
		peep.scaleX = -1
	}
	peep.x = startX
	peep.y = startY
	peep.anchorY = startY
	return {
		startX,
		startY,
		endX
	}
}
const colorShadeX = (c, amt) => {
	let col = colorHex(c);
	col = col.replace(/^#/, '')
	if (col.length === 3) col = col[0] + col[0] + col[1] + col[1] + col[2] + col[2]
	let [r, g, b] = col.match(/.{2}/g);
	([r, g, b] = [parseInt(r, 16) + amt, parseInt(g, 16) + amt, parseInt(b, 16) + amt])
	r = Math.max(Math.min(255, r), 0).toString(16)
	g = Math.max(Math.min(255, g), 0).toString(16)
	b = Math.max(Math.min(255, b), 0).toString(16)
	const rr = (r.length < 2 ? '0' : '') + r
	const gg = (g.length < 2 ? '0' : '') + g
	const bb = (b.length < 2 ? '0' : '') + b
	return `#${rr}${gg}${bb}`
}
const createMessageHTML = message => {
	if (isString(message)) {
		return `
      <p class="secondary-text text-center mb-2">${message}</p>
    `;
	} else if (isString(message)) {
		return `
    <div>
      <p style="color:red" class="message-content">${message}</p>
    </div>
    `;
	}
	return `
  <div class="message ${message.type === messageTypes.LEFT ? 'message-left' : 'message-right'
		}">
    <div class="message-details flex">
      <p class="flex-grow-1 message-author">${message.author}</p>
      <p class="message-date">${message.date}</p>
    </div>
    <p class="message-content">${message.content}</p>
  </div>
  `;
};
const STYLE_PARAMS = {
	align: 'text-align',
	bg: 'background-color',
	dir: 'flex-direction',
	fg: 'color',
	hgap: 'column-gap',
	vgap: 'row-gap',
	matop: 'margin-top',
	maleft: 'margin-left',
	mabottom: 'margin-bottom',
	maright: 'margin-right',
	origin: 'transform-origin',
	patop: 'padding-top',
	paleft: 'padding-left',
	pabottom: 'padding-bottom',
	paright: 'padding-right',
	rounding: 'border-radius',
	w: 'width',
	h: 'height',
	wmin: 'min-width',
	hmin: 'min-height',
	wmax: 'max-width',
	hmax: 'max-height',
	hline: 'line-height',
	fontSize: 'font-size',
	fz: 'font-size',
	family: 'font-family',
	weight: 'font-weight',
	z: 'z-index'
};
const changeInteraction = function () {
	if (select !== null) {
		map.removeInteraction(select);
	}
	const value = selectElement.value;
	if (value == 'singleclick') {
		select = selectSingleClick;
	} else if (value == 'click') {
		select = selectClick;
	} else if (value == 'pointermove') {
		select = selectPointerMove;
	} else if (value == 'altclick') {
		select = selectAltClick;
	} else {
		select = null;
	}
	if (select !== null) {
		map.addInteraction(select);
		select.on('select', function (e) {
			document.getElementById('status').innerHTML =
				'&nbsp;' +
				e.target.getFeatures().getLength() +
				' selected features (last operation selected ' +
				e.selected.length +
				' and deselected ' +
				e.deselected.length +
				' features)';
		});
	}
};
const LevelsWP = {
	0: { NumPics: 1, NumLabels: 1, MinWordLength: 2, MaxWordLength: 3, MaxNumTrials: 3 },
	1: { NumPics: 1, NumLabels: 1, MinWordLength: 3, MaxWordLength: 4, MaxNumTrials: 3 },
	2: { NumPics: 1, NumLabels: 1, MinWordLength: 3, MaxWordLength: 5, MaxNumTrials: 3 },
	3: { NumPics: 1, NumLabels: 0, MinWordLength: 3, MaxWordLength: 6, MaxNumTrials: 3 },
	4: { NumPics: 1, NumLabels: 0, MinWordLength: 4, MaxWordLength: 7, MaxNumTrials: 3 },
	5: { NumPics: 1, NumLabels: 0, MinWordLength: 5, MaxWordLength: 8, MaxNumTrials: 3 },
	6: { NumPics: 1, NumLabels: 0, MinWordLength: 6, MaxWordLength: 9, MaxNumTrials: 3 },
	7: { NumPics: 1, NumLabels: 0, MinWordLength: 7, MaxWordLength: 11, MaxNumTrials: 3 },
	8: { NumPics: 1, NumLabels: 0, MinWordLength: 8, MaxWordLength: 12, MaxNumTrials: 3 },
	9: { NumPics: 1, NumLabels: 0, MinWordLength: 7, MaxWordLength: 13, MaxNumTrials: 3 },
	10: { NumPics: 1, NumLabels: 0, MinWordLength: 6, MaxWordLength: 14, MaxNumTrials: 3 },
}
const LevelsTP = {
	0: { NumPics: 2, NumLabels: 2, MinWordLength: 2, MaxWordLength: 4, MaxNumTrials: 1 },
	1: { NumPics: 3, NumLabels: 3, MinWordLength: 3, MaxWordLength: 5, MaxNumTrials: 1 },
	2: { NumPics: 2, NumLabels: 1, MinWordLength: 3, MaxWordLength: 6, MaxNumTrials: 1 },
	3: { NumPics: 3, NumLabels: 2, MinWordLength: 4, MaxWordLength: 7, MaxNumTrials: 1 },
	4: { NumPics: 2, NumLabels: 0, MinWordLength: 4, MaxWordLength: 8, MaxNumTrials: 1 },
	5: { NumPics: 4, NumLabels: 4, MinWordLength: 4, MaxWordLength: 9, MaxNumTrials: 1 },
	6: { NumPics: 3, NumLabels: 1, MinWordLength: 5, MaxWordLength: 10, MaxNumTrials: 2 },
	7: { NumPics: 4, NumLabels: 2, MinWordLength: 5, MaxWordLength: 11, MaxNumTrials: 1 },
	8: { NumPics: 5, NumLabels: 5, MinWordLength: 6, MaxWordLength: 12, MaxNumTrials: 1 },
	9: { NumPics: 3, NumLabels: 0, MinWordLength: 6, MaxWordLength: 13, MaxNumTrials: 2 },
	10: { NumPics: 4, NumLabels: 0, MinWordLength: 4, MaxWordLength: 14, MaxNumTrials: 2 },
}
const LevelsSPA = {
	0: { NumPics: 1, NumLabels: 1, MinWordLength: 2, MaxWordLength: 4, MaxNumTrials: 1 },
	1: { NumPics: 1, NumLabels: 1, MinWordLength: 3, MaxWordLength: 5, MaxNumTrials: 3 },
	2: { NumPics: 1, NumLabels: 1, MinWordLength: 3, MaxWordLength: 6, MaxNumTrials: 3 },
	3: { NumPics: 1, NumLabels: 0, MinWordLength: 4, MaxWordLength: 7, MaxNumTrials: 3 },
	4: { NumPics: 1, NumLabels: 0, MinWordLength: 4, MaxWordLength: 8, MaxNumTrials: 3 },
	5: { NumPics: 1, NumLabels: 0, MinWordLength: 5, MaxWordLength: 9, MaxNumTrials: 3 },
	6: { NumPics: 1, NumLabels: 0, MinWordLength: 6, MaxWordLength: 10, MaxNumTrials: 3 },
	7: { NumPics: 1, NumLabels: 0, MinWordLength: 7, MaxWordLength: 11, MaxNumTrials: 3 },
	8: { NumPics: 1, NumLabels: 0, MinWordLength: 8, MaxWordLength: 12, MaxNumTrials: 3 },
	9: { NumPics: 1, NumLabels: 0, MinWordLength: 7, MaxWordLength: 13, MaxNumTrials: 3 },
	10: { NumPics: 1, NumLabels: 0, MinWordLength: 6, MaxWordLength: 14, MaxNumTrials: 1 },
}
const LevelsSP = {
	0: { NumPics: 1, NumLabels: 1, MinWordLength: 2, MaxWordLength: 21, MaxNumTrials: 3 },
	1: { NumPics: 1, NumLabels: 1, MinWordLength: 3, MaxWordLength: 21, MaxNumTrials: 3 },
	2: { NumPics: 1, NumLabels: 1, MinWordLength: 3, MaxWordLength: 21, MaxNumTrials: 3 },
	3: { NumPics: 1, NumLabels: 0, MinWordLength: 4, MaxWordLength: 21, MaxNumTrials: 3 },
	4: { NumPics: 1, NumLabels: 0, MinWordLength: 4, MaxWordLength: 21, MaxNumTrials: 3 },
	5: { NumPics: 1, NumLabels: 0, MinWordLength: 5, MaxWordLength: 21, MaxNumTrials: 3 },
	6: { NumPics: 1, NumLabels: 0, MinWordLength: 6, MaxWordLength: 21, MaxNumTrials: 3 },
	7: { NumPics: 1, NumLabels: 0, MinWordLength: 7, MaxWordLength: 21, MaxNumTrials: 3 },
	8: { NumPics: 1, NumLabels: 0, MinWordLength: 8, MaxWordLength: 21, MaxNumTrials: 3 },
	9: { NumPics: 1, NumLabels: 0, MinWordLength: 7, MaxWordLength: 21, MaxNumTrials: 3 },
	10: { NumPics: 1, NumLabels: 0, MinWordLength: 6, MaxWordLength: 21, MaxNumTrials: 3 },
}
const findBiggestColorRange = (rgbValues) => {
	/**
	 * Min is initialized to the maximum value posible
	 * from there we procced to find the minimum value for that color channel
	 *
	 * Max is initialized to the minimum value posible
	 * from there we procced to fin the maximum value for that color channel
	 */
	let rMin = Number.MAX_VALUE;
	let gMin = Number.MAX_VALUE;
	let bMin = Number.MAX_VALUE;
	let rMax = Number.MIN_VALUE;
	let gMax = Number.MIN_VALUE;
	let bMax = Number.MIN_VALUE;
	rgbValues.forEach((pixel) => {
		rMin = Math.min(rMin, pixel.r);
		gMin = Math.min(gMin, pixel.g);
		bMin = Math.min(bMin, pixel.b);
		rMax = Math.max(rMax, pixel.r);
		gMax = Math.max(gMax, pixel.g);
		bMax = Math.max(bMax, pixel.b);
	});
	const rRange = rMax - rMin;
	const gRange = gMax - gMin;
	const bRange = bMax - bMin;
	const biggestRange = Math.max(rRange, gRange, bRange);
	if (biggestRange === rRange) {
		return "r";
	} else if (biggestRange === gRange) {
		return "g";
	} else {
		return "b";
	}
};
const GFUNC = {
	gTouchPic: {
		startGame: startGameTP, startLevel: startLevelTP, startRound: startRoundTP, trialPrompt: trialPromptTP, prompt: promptTP, activate: activateTP, eval: evalTP
	},
	gTouchColors: {
		startGame: startGameTC, startLevel: startLevelTC, startRound: startRoundTC, trialPrompt: trialPromptTC, prompt: promptTC, activate: activateTC, eval: evalTC
	},
	gWritePic: {
		startGame: startGameWP, startLevel: startLevelWP, startRound: startRoundWP, trialPrompt: trialPromptWP, prompt: promptWP, activate: activateWP, eval: evalWP
	},
	gMissingLetter: {
		startGame: startGameML, startLevel: startLevelML, startRound: startRoundML, trialPrompt: trialPromptML, prompt: promptML, activate: activateML, eval: evalML
	},
	gSayPic: {
		startGame: startGameSP, startLevel: startLevelSP, startRound: startRoundSP, trialPrompt: trialPromptSP, prompt: promptSP, activate: activateSP, eval: evalSP
	},
	gSayPicAuto: {
		startGame: startGameSPA, startLevel: startLevelSPA, startRound: startRoundSPA, trialPrompt: trialPromptSPA, prompt: promptSPA, activate: activateSPA, eval: evalSPA
	},
}
const LevelsTC = {
	0: { NumColors: 2, NumPics: 2, NumLabels: 4, MinWordLength: 2, MaxWordLength: 5, MaxNumTrials: 1 },
	1: { NumColors: 2, NumPics: 3, NumLabels: 6, MinWordLength: 3, MaxWordLength: 6, MaxNumTrials: 1 },
	2: { NumColors: 3, NumPics: 2, NumLabels: 6, MinWordLength: 3, MaxWordLength: 7, MaxNumTrials: 1 },
	3: { NumColors: 3, NumPics: 3, NumLabels: 9, MinWordLength: 4, MaxWordLength: 7, MaxNumTrials: 1 },
	4: { NumColors: 3, NumPics: 3, NumLabels: 0, MinWordLength: 4, MaxWordLength: 14, MaxNumTrials: 2 },
	5: { NumColors: 2, NumPics: 2, NumLabels: 2, MinWordLength: 4, MaxWordLength: 8, MaxNumTrials: 1 },
	6: { NumColors: 2, NumPics: 2, NumLabels: 2, MinWordLength: 4, MaxWordLength: 9, MaxNumTrials: 1 },
	7: { NumColors: 2, NumPics: 2, NumLabels: 2, MinWordLength: 5, MaxWordLength: 10, MaxNumTrials: 2 },
	8: { NumColors: 3, NumPics: 3, NumLabels: 9, MinWordLength: 5, MaxWordLength: 11, MaxNumTrials: 2 },
	9: { NumColors: 3, NumPics: 3, NumLabels: 3, MinWordLength: 6, MaxWordLength: 12, MaxNumTrials: 2 },
	10: { NumColors: 3, NumPics: 3, NumLabels: 0, MinWordLength: 6, MaxWordLength: 13, MaxNumTrials: 3 },
}
const quantization = (rgbValues, depth) => {
	const MAX_DEPTH = 4;
	if (depth === MAX_DEPTH || rgbValues.length === 0) {
		const color = rgbValues.reduce(
			(prev, curr) => {
				prev.r += curr.r;
				prev.g += curr.g;
				prev.b += curr.b;
				return prev;
			},
			{
				r: 0,
				g: 0,
				b: 0,
			}
		);
		color.r = Math.round(color.r / rgbValues.length);
		color.g = Math.round(color.g / rgbValues.length);
		color.b = Math.round(color.b / rgbValues.length);
		return [color];
	}
	/**
	 *  Recursively do the following:
	 *  1. Find the pixel channel (red,green or blue) with biggest difference/range
	 *  2. Order by this channel
	 *  3. Divide in half the rgb colors list
	 *  4. Repeat process again, until desired depth or base case
	 */
	const componentToSortBy = findBiggestColorRange(rgbValues);
	rgbValues.sort((p1, p2) => {
		return p1[componentToSortBy] - p2[componentToSortBy];
	});
	const mid = rgbValues.length / 2;
	return [
		...quantization(rgbValues.slice(0, mid), depth + 1),
		...quantization(rgbValues.slice(mid + 1), depth + 1),
	];
};
const mainCOOL = () => {
	const imgFile = document.getElementById("imgfile");
	const image = new Image();
	const file = imgFile.files[0];
	const fileReader = new FileReader();
	fileReader.onload = () => {
		image.onload = () => {
			const canvas = document.getElementById("canvas");
			canvas.width = image.width;
			canvas.height = image.height;
			const ctx = canvas.getContext("2d");
			ctx.drawImage(image, 0, 0);
			/**
			 * getImageData returns an array full of RGBA values
			 * each pixel consists of four values: the red value of the colour, the green, the blue and the alpha
			 * (transparency). For array value consistency reasons,
			 * the alpha is not from 0 to 1 like it is in the RGBA of CSS, but from 0 to 255.
			 */
			const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
			const rgbArray = buildRgb(imageData.data);
			/**
			 * Color quantization
			 * A process that reduces the number of colors used in an image
			 * while trying to visually maintin the original image as much as possible
			 */
			const quantColors = quantization(rgbArray, 0);
			buildPalette(quantColors);
		};
		image.src = fileReader.result;
	};
	fileReader.readAsDataURL(file);
};
const DD = {
	yellow: 'gelb', green: 'grün', blue: 'blau', red: 'rot', pink: 'rosa', orange: 'orange', black: 'schwarz',
	white: 'weiss', violet: 'violett', '1st': 'erste', '2nd': 'zweite', '3rd': 'dritte', '4th': 'vierte', '5th': 'fünfte',
	add: 'addiere', subtract: 'subtrahiere', multiply: 'mutipliziere', plus: 'plus', minus: 'minus', times: 'mal',
	'divided by': 'dividiert durch', excellent: 'sehr gut', very: 'sehr', good: 'gut',
	'to the previous number': 'zur vorhergehenden zahl',
	'from the previous number': 'von der vorhergehenden zahl',
	'multiply the previous number by': 'multipliziere die vorhergehende zahl mit',
	'divide the previous number by': 'dividiere die vorhergehende zahl durch',
	'the previous number': 'die vorhergehende zahl', is: 'ist', what: 'was', equals: 'ist gleich', enter: "tippe",
	'to the power of': 'hoch', or: 'oder', less: 'kleiner', greater: 'grösser', than: 'als', equal: 'gleich', and: 'und',
	not: 'nicht', click: 'click', press: 'tippe', quite: 'ziemlich', 'not quite': 'nicht ganz',
	say: 'sage', write: 'schreibe', complete: 'ergänze', 'unequal': 'ungleich', except: 'ausser', EXCEPT: 'AUSSER',
	number: 'Zahl', color: 'farbe', eliminate: 'eliminiere', all: 'alle', with: 'mit', true: 'wahr', false: 'falsch',
	build: 'bilde', count: 'zähle', 'the red dots': 'die roten Punkte',
};
const buildPalette = (colorsList) => {
	const paletteContainer = document.getElementById("palette");
	const complementaryContainer = document.getElementById("complementary");
	paletteContainer.innerHTML = "";
	complementaryContainer.innerHTML = "";
	const orderedByColor = orderByLuminance(colorsList);
	const hslColors = convertRGBtoHSL(orderedByColor);
	for (let i = 0; i < orderedByColor.length; i++) {
		const hexColor = rgbToHexCOOL(orderedByColor[i]);
		const hexColorComplementary = hslToHexCOOL(hslColors[i]);
		if (i > 0) {
			const difference = calculateColorDifference(
				orderedByColor[i],
				orderedByColor[i - 1]
			);
			if (difference < 120) {
				continue;
			}
		}
		const colorElement = document.createElement("div");
		colorElement.style.backgroundColor = hexColor;
		colorElement.appendChild(document.createTextNode(hexColor));
		paletteContainer.appendChild(colorElement);
		if (hslColors[i].h) {
			const complementaryElement = document.createElement("div");
			complementaryElement.style.backgroundColor = `hsl(${hslColors[i].h},${hslColors[i].s}%,${hslColors[i].l}%)`;
			complementaryElement.appendChild(
				document.createTextNode(hexColorComplementary)
			);
			complementaryContainer.appendChild(complementaryElement);
		}
	}
};
const LevelsML = {
	0: { NumPics: 1, NumLabels: 1, MinWordLength: 3, MaxWordLength: 3, NumMissingLetters: 1, MaxPosMissing: 0, MaxNumTrials: 3 },
	1: { NumPics: 1, NumLabels: 1, MinWordLength: 3, MaxWordLength: 4, NumMissingLetters: 1, MaxPosMissing: 0, MaxNumTrials: 3 },
	2: { NumPics: 1, NumLabels: 1, MinWordLength: 4, MaxWordLength: 5, NumMissingLetters: 2, MaxPosMissing: 1, MaxNumTrials: 3 },
	3: { NumPics: 1, NumLabels: 0, MinWordLength: 4, MaxWordLength: 6, NumMissingLetters: 1, MaxPosMissing: 0, MaxNumTrials: 3 },
	4: { NumPics: 1, NumLabels: 0, MinWordLength: 4, MaxWordLength: 7, NumMissingLetters: 2, MaxPosMissing: 1, MaxNumTrials: 3 },
	5: { NumPics: 1, NumLabels: 0, MinWordLength: 5, MaxWordLength: 8, NumMissingLetters: 1, MaxPosMissing: 1, MaxNumTrials: 3 },
	6: { NumPics: 1, NumLabels: 0, MinWordLength: 5, MaxWordLength: 9, NumMissingLetters: 2, MaxPosMissing: 2, MaxNumTrials: 3 },
	7: { NumPics: 1, NumLabels: 0, MinWordLength: 5, MaxWordLength: 10, NumMissingLetters: 3, MaxPosMissing: 4, MaxNumTrials: 3 },
	8: { NumPics: 1, NumLabels: 0, MinWordLength: 6, MaxWordLength: 11, NumMissingLetters: 4, MaxPosMissing: 12, MaxNumTrials: 3 },
	9: { NumPics: 1, NumLabels: 0, MinWordLength: 6, MaxWordLength: 12, NumMissingLetters: 5, MaxPosMissing: 12, MaxNumTrials: 3 },
	10: { NumPics: 1, NumLabels: 0, MinWordLength: 6, MaxWordLength: 12, NumMissingLetters: 6, MaxPosMissing: 12, MaxNumTrials: 3 },
}
const convertRGBtoHSL = (rgbValues) => {
	return rgbValues.map((pixel) => {
		let hue,
			saturation,
			luminance = 0;
		let redOpposite = pixel.r / 255;
		let greenOpposite = pixel.g / 255;
		let blueOpposite = pixel.b / 255;
		const Cmax = Math.max(redOpposite, greenOpposite, blueOpposite);
		const Cmin = Math.min(redOpposite, greenOpposite, blueOpposite);
		const difference = Cmax - Cmin;
		luminance = (Cmax + Cmin) / 2.0;
		if (luminance <= 0.5) {
			saturation = difference / (Cmax + Cmin);
		} else if (luminance >= 0.5) {
			saturation = difference / (2.0 - Cmax - Cmin);
		}
		/**
		 * If Red is max, then Hue = (G-B)/(max-min)
		 * If Green is max, then Hue = 2.0 + (B-R)/(max-min)
		 * If Blue is max, then Hue = 4.0 + (R-G)/(max-min)
		 */
		const maxColorValue = Math.max(pixel.r, pixel.g, pixel.b);
		if (maxColorValue === pixel.r) {
			hue = (greenOpposite - blueOpposite) / difference;
		} else if (maxColorValue === pixel.g) {
			hue = 2.0 + (blueOpposite - redOpposite) / difference;
		} else {
			hue = 4.0 + (greenOpposite - blueOpposite) / difference;
		}
		hue = hue * 60;
		if (hue < 0) {
			hue = hue + 360;
		}
		if (difference === 0) {
			return false;
		}
		return {
			h: Math.round(hue) + 180,
			s: parseFloat(saturation * 100).toFixed(2),
			l: parseFloat(luminance * 100).toFixed(2),
		};
	});
};
const createTextStyle = function (feature, resolution, dom) {
	const align = dom.align.value;
	const baseline = dom.baseline.value;
	const size = dom.size.value;
	const height = dom.height.value;
	const offsetX = parseInt(dom.offsetX.value, 10);
	const offsetY = parseInt(dom.offsetY.value, 10);
	const weight = dom.weight.value;
	const placement = dom.placement ? dom.placement.value : undefined;
	const maxAngle = dom.maxangle ? parseFloat(dom.maxangle.value) : undefined;
	const overflow = dom.overflow ? dom.overflow.value == 'true' : undefined;
	const rotation = parseFloat(dom.rotation.value);
	if (dom.font.value == "'Open Sans'" && !openSansAdded) {
		const openSans = document.createElement('link');
		openSans.href = 'https://fonts.googleapis.com/css?family=Open+Sans';
		openSans.rel = 'stylesheet';
		document.head.appendChild(openSans);
		openSansAdded = true;
	}
	const font = weight + ' ' + size + '/' + height + ' ' + dom.font.value;
	const fillColor = dom.color.value;
	const outlineColor = dom.outline.value;
	const outlineWidth = parseInt(dom.outlineWidth.value, 10);
	return new Text({
		textAlign: align == '' ? undefined : align,
		textBaseline: baseline,
		font: font,
		text: getText(feature, resolution, dom),
		fill: new Fill({ color: fillColor }),
		stroke: new Stroke({ color: outlineColor, width: outlineWidth }),
		offsetX: offsetX,
		offsetY: offsetY,
		placement: placement,
		maxAngle: maxAngle,
		overflow: overflow,
		rotation: rotation,
	});
};
const ARI = {
	sz_hand: 7,
	stage: {
		1: 'journey',
		2: 'tax',
		3: 'auto market',
		4: 'stall selection',
		1004: 'TEST_starts_in_stall_selection_complete',
		5: 'action: command',
		6: 'action step 2',
		7: 'action 3',
		8: 'action 4',
		9: 'action 5',
		10: 'end game?',
		11: 'ball',
		12: 'auction: bid',
		13: 'auction: buy',
		14: 'complementing_market_after_church',
		15: 'commission',
		16: 'commission new',
		17: 'church',
		18: 'church_minplayer_tithe',
		19: 'church_newcards',
		20: 'payment action',
		21: 'church_minplayer_tithe_add',
		22: 'church_minplayer_tithe_downgrade',
		23: 'comm_weitergeben',
		24: 'rumors_weitergeben',
		25: 'rumor',
		26: 'blackmail',
		blackmail: 26,
		27: 'inspect',
		rumor: 25,
		28: 'buy rumor',
		'buy rumor': 28,
		29: 'rumor discard',
		30: 'pick luxury or journey cards',
		31: 'add new journey',
		32: 'rumor_both',
		33: 'blackmail_owner',
		34: 'accept_blackmail',
		35: 'blackmail_complete',
		36: 'reject_blackmail',
		37: 'commission_stall',
		38: 'pick_schwein',
		40: 'trade',
		41: 'build',
		42: 'visit',
		43: 'buy',
		44: 'upgrade',
		45: 'downgrade',
		46: 'visit destroy',
		build: 41,
		upgrade: 44,
		downgrade: 45,
		visit: 42,
		buy: 43,
		100: 'pickup end',
		101: 'build end',
		102: 'select building to upgrade',
		103: 'select downgrade cards',
		104: 'next_comm_setup_stage',
		105: 'next_rumor_setup_stage',
	}
};
const OPS = {
	'first': { cmd: 'add', link: 'to', wr: '+', sp: 'plus', f: (a, b) => (a + b), min: 20, max: 100 },
	'plus': { cmd: 'add', link: 'to', wr: '+', sp: 'plus', f: (a, b) => (a + b), min: 3, max: 30 },
	'minus': { cmd: 'subtract', link: 'from', wr: '-', sp: 'minus', f: (a, b) => (a - b), min: 1, max: 10 },
	'div': { cmd: 'divide', link: 'by', wr: ':', sp: 'divided by', f: (a, b) => (a / b), min: 2, max: 10 },
	'intdiv': { cmd: 'divide', link: 'by', wr: 'div', sp: 'divided by', f: (a, b) => (Math.floor(a / b)), min: 1, max: 10 },
	'mult': { cmd: 'multiply', link: 'by', wr: 'x', sp: 'times', f: (a, b) => (a * b), min: 2, max: 10 },
	'pow': { cmd: 'build', link: 'to the power of', wr: '^', sp: 'to the power of', f: (a, b) => (Math.pow(a, b)), min: 0, max: 20 },
	'mod': { cmd: 'build', link: 'modulo', wr: '%', sp: 'modulo', f: (a, b) => (a % b), min: 0, max: 20 },
	'l': { cmd: 'true or false?', link: 'less than', wr: '<', sp: 'less than', f: (a, b) => (a < b) },
	'g': { cmd: 'true or false?', link: 'greater than', wr: '>', sp: 'greater than', f: (a, b) => (a > b) },
	'leq': { cmd: 'true or false?', link: 'less or equal', wr: '<=', sp: 'less or equal', f: (a, b) => (a <= b) },
	'geq': { cmd: 'true or false?', link: 'greater or equal', wr: '>=', sp: 'greater or equal', f: (a, b) => (a >= b) },
	'eq': { cmd: 'true or false?', link: 'equal', wr: '=', sp: 'equal', f: (a, b) => (a == b) },
	'neq': { cmd: 'true or false?', link: 'unequal', wr: '#', sp: 'unequal', f: (a, b) => (a != b) },
	'and': { cmd: 'true or false?', link: 'and', wr: '&&', sp: 'and', f: (a, b) => (a && b) },
	'or': { cmd: 'true or false?', link: 'or', wr: '||', sp: 'or', f: (a, b) => (a || b) },
	'nand': { cmd: 'true or false?', link: 'nand', wr: 'nand', sp: 'nand', f: (a, b) => (!(a && b)) },
	'nor': { cmd: 'true or false?', link: 'nor', wr: 'nor', sp: 'nor', f: (a, b) => (!(a || b)) },
	'xor': { cmd: 'true or false?', link: 'xor', wr: 'xor', sp: 'xor', f: (a, b) => (a && !b || !a && b) },
}
const ColorDict = {
	black: { c: 'black', E: 'black', D: 'schwarz' },
	blue: { c: 'blue', E: 'blue', D: 'blau' },
	BLUE: { c: '#4363d8', E: 'blue', D: 'blau' },
	BLUEGREEN: { c: BLUEGREEN, E: 'bluegreen', D: 'blaugrün' },
	blue1: { c: BLUE, E: 'blue', D: 'blau' },
	BRAUN: { c: BRAUN, E: 'brown', D: 'braun' },
	BROWN: { c: BROWN, E: 'brown', D: 'braun' },
	brown: { c: BRAUN, E: 'brown', D: 'braun' },
	deepyellow: { c: YELLOW3, E: 'yellow', D: 'gelb' },
	FIREBRICK: { c: '#800000', E: 'darkred', D: 'rotbraun' },
	gold: { c: 'gold', E: 'gold', D: 'golden' },
	green: { c: 'green', E: 'green', D: 'grün' },
	GREEN: { c: '#3cb44b', E: 'green', D: 'grün' },
	green1: { c: GREEN, E: 'green', D: 'grün' },
	grey: { c: 'grey', E: 'grey', D: 'grau' },
	lightblue: { c: LIGHTBLUE, E: 'lightblue', D: 'hellblau' },
	LIGHTBLUE: { c: '#42d4f4', E: 'lightblue', D: 'hellblau' },
	lightgreen: { c: LIGHTGREEN, E: 'lightgreen', D: 'hellgrün' },
	LIGHTGREEN: { c: '#afff45', E: 'lightgreen', D: 'hellgrün' },
	lightyellow: { c: YELLOW2, E: 'lightyellow', D: 'gelb' },
	olive: { c: OLIVE, E: 'olive', D: 'oliv' },
	OLIVE: { c: '#808000', E: 'olive', D: 'oliv' },
	orange: { c: ORANGE, E: 'orange', D: 'orange' },
	ORANGE: { c: '#f58231', E: 'orange', D: 'orange' },
	pink: { c: 'deeppink', E: 'pink', D: 'rosa' },
	purple: { c: PURPLE, E: 'purple', D: 'lila' },
	PURPLE: { c: '#911eb4', E: 'purple', D: 'lila' },
	red: { c: 'red', E: 'red', D: 'rot' },
	RED: { c: '#e6194B', E: 'red', D: 'rot' },
	red1: { c: RED, E: 'red', D: 'rot' },
	skyblue: { c: 'deepskyblue', E: 'skyblue', D: 'himmelblau' },
	teal: { c: TEAL, E: 'teal', D: 'blaugrün' },
	TEAL: { c: '#469990', E: 'teal', D: 'blaugrün' },
	violet: { c: 'indigo', E: 'violet', D: 'violett' },
	white: { c: 'white', E: 'white', D: 'weiss' },
	yellow: { c: 'yellow', E: 'yellow', D: 'gelb' },
	YELLOW: { c: '#ffe119', E: 'yellow', D: 'gelb' },
	YELLOW2: { c: YELLOW2, E: 'yellow', D: 'gelb' },
	YELLOW3: { c: YELLOW3, E: 'yellow', D: 'gelb' },
};
const SHERIFF = {
	color: {
		legal: GREEN, //'lime',
		contraband: 'crimson',
		royal: 'orangered'
	},
	cards: {
		apples: { ksym: 'green apple', kcenter: 'red apple', label: 'apple', type: 'legal', value: 2, penalty: 2 },
		cheese: { ksym: 'cheese wedge', kcenter: 'cheese wedge', label: 'cheese', type: 'legal', value: 3, penalty: 2 },
		pineapple: { ksym: 'pineapple', kcenter: 'pineapple', label: 'pineapple', type: 'legal', value: 4, penalty: 2 },
		chicken: { ksym: 'poultry leg', kcenter: 'poultry leg', label: 'chicken', type: 'legal', value: 4, penalty: 2 },
		bread: { ksym: 'bread', kcenter: 'bread', label: 'bread', type: 'legal', value: 3, penalty: 2 },
		pepper: { ksym: 'hot pepper', kcenter: 'hot pepper', label: 'pepper', type: 'contraband', value: 6, penalty: 4 },
		mead: { ksym: 'beer mug', kcenter: 'beer mug', label: 'mead', type: 'contraband', value: 7, penalty: 4 },
		silk: { ksym: 'sari', kcenter: 'kimono', label: 'silk', type: 'contraband', value: 8, penalty: 4 },
		crossbow: { ksym: 'crossbow', kcenter: 'crossbow', label: 'crossbow', type: 'contraband', value: 9, penalty: 4 },
		chestnut: { ksym: 'chestnut', kcenter: 'chestnut', label: 'chestnut', type: 'royal', value: 4, penalty: 3 },
		pear: { ksym: 'pear', kcenter: 'pear', label: 'pear', type: 'royal', value: 6, penalty: 4 },
		pie: { ksym: 'pie', kcenter: 'pie', label: 'pie', type: 'royal', value: 6, penalty: 4 },
		squid: { ksym: 'squid', kcenter: 'squid', label: 'squid', type: 'royal', value: 9, penalty: 5 },
		shortcake: { ksym: 'shortcake', kcenter: 'shortcake', label: 'shortcake', type: 'royal', value: 9, penalty: 5 },
		grapes: { ksym: 'grapes', kcenter: 'grapes', label: 'grapes', type: 'royal', value: 9, penalty: 5 },
		pretzel: { ksym: 'pretzel', kcenter: 'pretzel', label: 'pretzel', type: 'royal', value: 9, penalty: 5 },
		baguette: { ksym: 'baguette bread', kcenter: 'baguette bread', label: 'bread', type: 'royal', value: 6, penalty: 4 },
		cherries: { ksym: 'cherries', kcenter: 'cherries', label: 'cherries', type: 'royal', value: 8, penalty: 4 },
	},
	cardtypes: {
		legal: ['apples', 'cheese', 'pineapple', 'bread'],
		contraband: ['pepper', 'mead', 'silk', 'crossbow'],
		royal: ['chestnut', 'pear', 'pie', 'shortcake', 'pretzel', 'grapes', 'baguette', 'cherries']
	},
	stage: {
		1: 'exchange',
	}
}
const myDom = {
	points: {
		text: document.getElementById('points-text'),
		align: document.getElementById('points-align'),
		baseline: document.getElementById('points-baseline'),
		rotation: document.getElementById('points-rotation'),
		font: document.getElementById('points-font'),
		weight: document.getElementById('points-weight'),
		size: document.getElementById('points-size'),
		height: document.getElementById('points-height'),
		offsetX: document.getElementById('points-offset-x'),
		offsetY: document.getElementById('points-offset-y'),
		color: document.getElementById('points-color'),
		outline: document.getElementById('points-outline'),
		outlineWidth: document.getElementById('points-outline-width'),
		maxreso: document.getElementById('points-maxreso'),
	},
	lines: {
		text: document.getElementById('lines-text'),
		align: document.getElementById('lines-align'),
		baseline: document.getElementById('lines-baseline'),
		rotation: document.getElementById('lines-rotation'),
		font: document.getElementById('lines-font'),
		weight: document.getElementById('lines-weight'),
		placement: document.getElementById('lines-placement'),
		maxangle: document.getElementById('lines-maxangle'),
		overflow: document.getElementById('lines-overflow'),
		size: document.getElementById('lines-size'),
		height: document.getElementById('lines-height'),
		offsetX: document.getElementById('lines-offset-x'),
		offsetY: document.getElementById('lines-offset-y'),
		color: document.getElementById('lines-color'),
		outline: document.getElementById('lines-outline'),
		outlineWidth: document.getElementById('lines-outline-width'),
		maxreso: document.getElementById('lines-maxreso'),
	},
	polygons: {
		text: document.getElementById('polygons-text'),
		align: document.getElementById('polygons-align'),
		baseline: document.getElementById('polygons-baseline'),
		rotation: document.getElementById('polygons-rotation'),
		font: document.getElementById('polygons-font'),
		weight: document.getElementById('polygons-weight'),
		placement: document.getElementById('polygons-placement'),
		maxangle: document.getElementById('polygons-maxangle'),
		overflow: document.getElementById('polygons-overflow'),
		size: document.getElementById('polygons-size'),
		height: document.getElementById('polygons-height'),
		offsetX: document.getElementById('polygons-offset-x'),
		offsetY: document.getElementById('polygons-offset-y'),
		color: document.getElementById('polygons-color'),
		outline: document.getElementById('polygons-outline'),
		outlineWidth: document.getElementById('polygons-outline-width'),
		maxreso: document.getElementById('polygons-maxreso'),
	},
};
const INNO = {
	color: { blue: '#89aad7', red: '#da7887', green: '#72b964', yellow: '#e2e57a', purple: '#9b58ba' },
	sym: {
		tower: { key: 'white-tower', fg: 'silver', bg: 'dimgray' },
		leaf: { key: 'leaf', fg: '#96D6BE', bg: '#275D45' },
		tree: { key: 'leaf', fg: '#96D6BE', bg: '#275D45' },
		bulb: { key: 'lightbulb', fg: 'white', bg: '#69224C' },
		crown: { key: 'queen-crown', fg: '#FEE593', bg: '#A27E44' },
		factory: { key: 'i_factory', fg: '#CD5147', bg: '#6D1A12' },
		clock: { key: 'clock', fg: '#3E84B5', bg: '#0B5884' },
		none: { key: 'flamer', fg: 'silver', bg: 'dimgrey' },
		plus: { key: 'plus', fg: 'silver', bg: '#00000020' },
		fountain: { key: 'fountain', fg: 'silver', bg: '#00000020' },
		flag: { key: 'flying-flag', fg: 'silver', bg: '#00000020' },
		up: { key: 'arrow-up', fg: 'silver', bg: '#00000020' },
		left: { key: 'arrow-left', fg: 'silver', bg: '#00000020' },
		right: { key: 'arrow-right', fg: 'silver', bg: '#00000020' },
	},
	symNames: ['tower', 'tree', 'bulb', 'crown', 'factory', 'clock'],
	phases: [
		{ key: 'init', message: 'select initial card to meld!' },
		{ key: 'just_one_turn', message: 'take your first turn!' },
		{ key: 'two_turns', message: 'take your turn!' },
	],
	special_achievements: {
		MONUMENT: "Claim immediately if you tuck six cards or score six cards during a single turn (May also be claimed via Masonry from Age 1)",
		EMPIRE: "Claim immediately if you have three  or more icons of all six types (May also be claimed via Construction from Age 2)",
		WORLD: "Claim immediately if you have twelve or more clocks on your board (May also be claimed via Translation from Age 3)",
		WONDER: "Claim immediately if you have all five colors on your board, and each is splayed either up or right (May also be claimed via Invention from Age 4)",
		UNIVERSE: "Claim immediately if you have five top cards, and each is of value 8 or higher (May also be claimed via Astronomy from Age 5)",
		LEGEND: "Claim if you meld a city with a left arrow on a color already splayed left",
		REPUTE: "Claim if you meld a city with a right arrow on a color already splayed right",
		FAME: "Claim if you meld a city with a up arrow on a color already splayed up",
		GLORY: "Claim immediately tuck a city with a flag",
		VICTORY: "Claim immediately tuck a city with a fountain",
		SUPREMACY: "Claim immediately if you have 3 or more of one icon in 4 different colors (May also be claimed via Novel from Age 3)",
		DESTINY: "Claim immediately if you have 7 or more cards in your forecast (May also be claimed via Barometer from Age 4)",
		WEALTH: "Claim immediately if you have 8 or more bonuses (May also be claimed via Palampore from Age 5)",
		HERITAGE: "Claim immediately if you have 8 or more numbers in one color (May also be claimed via Loom from Age 6)",
		HISTORY: "Claim immediately if you have 4 or more echoes in one color (May also be claimed via Photography from Age 7)",
	},
};
const DIBOA = {
	home: { link: "../rechnung/index.html", img: 'home.png', align: 'left', pop: false },
	bill: { link: "../rechnung/index.html", img: 'bill.png', align: 'left', pop: false },
	boa: { link: "", img: 'boa.png', align: 'left', pop: false },
	bw: { link: "../rechnung/bwindex.html", img: 'bwicon.png', align: 'right', pop: true },
	authenticator: { link: "../rechnung/boaa.html", img: 'authenticator.png', align: 'right', pop: true },
	authy: { link: "../rechnung/boaa.html", img: 'authy.png', align: 'right', pop: true },
	onedrive: { link: "../rechnung/boaa.html", img: 'onedrive.png', align: 'right', pop: true },
	skype: {
		link: "../rechnung/boaa.html", img: 'skype.png', align: 'right', pop: false,
		contacts: {
			'Julia Oasis': { date: 'Wed', msg: 'Wow', color: BLUEGREEN },
			'+14778991960': { date: 'Thu', msg: 'Missed Call', color: ORANGE },
		}
	},
	bw_info: {
		boa: { userid: 'gleem@gmail.com', pwd: rPassword(20) },
		authy: { userid: 'gleem@gmail.com', pwd: rPassword(20) },
	},
	boa_data: {
		'AAA-MBNA 5464 3332 3333 5555': { sub: '*5555', logo: 'boa.png' },
		'AMERICAN EXPRESS': { sub: '*4554', logo: 'amex.png' },
		'AT&T Mobility': { sub: '*1331', logo: 'att.png' },
		'AT&T Mobility{AT&T WA}': { sub: '*7575', logo: 'att.png' },
		'AT&T Mobility': { sub: '*8585', logo: 'att.png' },
		'Bank Of Amerika Credit Card': { sub: '*1212', logo: 'boa.png', 'Last Payment': '5-25 $1150.41', brand: 'BofA_rgb' },
		'Bank Of Amerika': { sub: '*0898', logo: 'boa.png' },
		'Bank Of Amerika Mail-in1': { sub: '*6565', logo: 'boa.png' },
		'Bel-Red Oral': { sub: '*2432' },
		'Bellevue Kendo Club': { sub: '*hallo' },
		'CapitalOne': { sub: '*1324', logo: 'capitalOne.png' },
		'CapitalOneVenture': { sub: '*6456', logo: 'capitalOne.png' },
		'CapitalOneVentureF': { sub: '*9789', logo: 'capitalOne.png' },
		'Chase': { sub: '*3131', logo: 'chase.png' },
		'Chase Amazon': { sub: '*0898', 'Last Payment': '5-25 $1150.41', logo: 'chase.png', brand: 'prime' },
		'Chase Card': { sub: '*1432', logo: 'chase.png' },
		'CHASE MANHATTAN BANK-MC': { sub: '*0797', 'Last Payment': '5-25 $110.99', logo: 'chase.png', brand: 'chase_bank' },
		'Chase Sapphire': { sub: '*5132', logo: 'chase.png' },
		'Chase Sapphire': { sub: '*8679', logo: 'chase.png' },
		'City Cards': { sub: '*3124', logo: 'citi.png' },
		'City Cards Divident': { sub: '*9678', logo: 'citi.png' },
		'CITY CARDS Points': { sub: '*7678', logo: 'citi.png' },
		'Citi Costco': { sub: '*8768', 'Last Payment': '6-17 $506.14', logo: 'citi.png', brand: 'citibank' },
		'Citi Costco gu': { sub: '*0890', 'Last Payment': '6-6 $228.92', logo: 'citi.png', brand: 'citibank' },
		'CITI DIVIDENT Platinum': { sub: '*3454', logo: 'citi.png' },
		'CITIBANK VISA NV': { sub: '*7566', logo: 'citi.png' },
		'City of Redmond': { sub: '*4998' },
		'City of Redmond WA': { sub: '*2887', 'Last Payment': '5-17 $214.94', brand: 'redmond' },
		'Comcast': { sub: '*7676', logo: 'comcast.png' },
		'Comcast Perrigo': { sub: '*1324', 'Last Payment': '6-21 $89.44', logo: 'comcast.png', brand: 'comcast' },
		'ComCast WA': { sub: '*6456', logo: 'comcast.png' },
		'DISCOVER CARD SERVICES': { sub: '*8678' },
		'Dr. Ellie Tabaraie': { sub: '*hallo' },
		'Fastenerz.com': { sub: '*000' },
		'Fibonacci': { sub: '*6666' },
		'Fleet Credit Card Service': { sub: '*8798' },
		'FLEET CREDIT CARD0MC/VS (32)': { sub: '*8799' },
		'Frontier': { sub: '*05-5' },
		'Frontier2': { sub: '*5366' },
		'GoodToGo': { sub: '*7767' },
		'Hardford Mutual Funds Inc.': { sub: '*8878' },
		'King County Treasury': { sub: '*0-02' },
		'King County Treasury': { sub: '*0-03' },
		'LabCorp': { sub: '*8899' },
		'Landover Mortgage': { sub: '*hallo' },
		'Lauren Magada': { sub: 'Lauren boa' },
		'Lederman&Pulman': { sub: '*9988' },
		'Liberty Mutual Group': { sub: '*-660' },
		'Liberty Mutual Group': { sub: '*-768' },
		'Liberty Mutual Group': { sub: '*-760' },
		"Macy's Star Rewards": { sub: '*23-0', logo: 'macys.png' },
		'MBNA': { sub: '*3444' },
		'MBNA 6455 6677 7924 5555': { sub: '*5555' },
		'Oachita': { sub: '*6556' },
		'Oasis Condominium CA': { sub: '*889' },
		'Oasis Condominium CA': { sub: '*1889', 'Last Payment': '5-31 $581.54', brand: 'oasis' },
		'Orthodontics Roos': { sub: '*1111' },
		'Overcast Law Office, PS': { sub: '*4423' },
		'Overlake Medical Center': { sub: '*hallo' },
		'Pediatric Associates Inc': { sub: '*8383' },
		'Perrigo Heights HOA': { sub: '*t#98' },
		'Premier Periodontics': { sub: '*9494' },
		'PreventionMD': { sub: '*9566' },
		'Prime Trust LLC': { sub: '*8788' },
		'ProSport': { sub: '*1233' },
		'PSE - Puget Sound Energy': { sub: '*3444', 'Last Payment': '5-25 $70.59', brand: 'PSE' },
		'Puget Sound Energy': { sub: '*66-9' },
		'Real Property Management Eclipse': { sub: '*asss' },
		'Remadina Ridge Family Dentistry': { sub: '*6656' },
		'Sewage Capacity Charge': { sub: '*7575' },
		'Silkroad': { sub: '*788-1' },
		'Suhrco': { sub: '*899' },
		'Target': { sub: '*9789' },
		'Target National Bank': { sub: '*1432' },
		'Univerity Of WA Medical Center': { sub: '*1543' },
		'US Bank Credit Card FlexPerks': { sub: '*0789', 'Last Payment': '5-20 $11.13', brand: 'usbank' },
		'USBank': { sub: '*7567' },
		'USBank-CashPlus': { sub: '*3123' },
		'USBank-FlexPerks': { sub: '*1321' },
		'Verizon': { sub: '*7567' },
		'Waste Management': { sub: '*87-1' },
		'Waste Management': { sub: '*23-9' },
		'Wells Fargo Home Mortgage': { sub: '*1333', 'Last Payment': '6-10 $1625.06', logo: 'wellsfargo.png', brand: 'wellsfargo' },
		'Wells Fargo Mortgage': { sub: '*2444', logo: 'wellsfargo.png' },
		'Williams-Sonoma': { sub: '*9888' },
		'WINDERMERE PROPERTY MGMT/EASTSID': { sub: '*8766' },
		'Windermere Real Estate/East': { sub: '*ntal' },
	}
};
const ALLTESTSOLUTIONS = {
	0: {},
	1: { "0": { "_1": { "w": 23, "h": 120 }, "_2": { "w": 19, "h": 19 } }, "1": { "_1": { "w": 104, "h": 120 }, "_2": { "w": 19, "h": 19 } }, "2": { "_1": { "w": 104, "h": 120 }, "_2": { "w": 19, "h": 19 }, "_3": { "w": 19, "h": 19 } }, "3": { "_1": { "w": 104, "h": 120 }, "_2": { "w": 19, "h": 19 }, "_3": { "w": 19, "h": 19 } }, "4": { "_1": { "w": 27, "h": 145 }, "_2": { "w": 23, "h": 19 }, "_3": { "w": 23, "h": 19 }, "_4": { "w": 23, "h": 82 }, "_5": { "w": 19, "h": 19 }, "_6": { "w": 19, "h": 19 }, "_7": { "w": 19, "h": 19 } }, "5": { "_1": { "w": 130, "h": 124 }, "_2": { "w": 126, "h": 19 }, "_3": { "w": 126, "h": 19 }, "_4": { "w": 126, "h": 61 }, "_5": { "w": 44, "h": 40 }, "_8": { "w": 19, "h": 19 }, "_9": { "w": 19, "h": 19 }, "_6": { "w": 19, "h": 40 }, "_7": { "w": 54, "h": 40 }, "_10": { "w": 24, "h": 19 }, "_11": { "w": 23, "h": 19 } }, "6": { "_1": { "w": 104, "h": 145 }, "_2": { "w": 19, "h": 124 }, "_3": { "w": 19, "h": 124 }, "_4": { "w": 58, "h": 124 }, "_5": { "w": 54, "h": 40 }, "_8": { "w": 19, "h": 19 }, "_9": { "w": 19, "h": 19 }, "_6": { "w": 54, "h": 19 }, "_7": { "w": 54, "h": 40 }, "_10": { "w": 24, "h": 19 }, "_11": { "w": 23, "h": 19 } } },
	2: { "0": { "_1": { "w": 69, "h": 103 }, "_2": { "w": 19, "h": 82 }, "_3": { "w": 19, "h": 82 }, "_4": { "w": 23, "h": 82 }, "_5": { "w": 19, "h": 19 }, "_6": { "w": 19, "h": 19 }, "_7": { "w": 19, "h": 19 } }, "1": { "_1": { "w": 69, "h": 103 }, "_2": { "w": 19, "h": 82 }, "_3": { "w": 19, "h": 82 }, "_4": { "w": 23, "h": 82 }, "_5": { "w": 19, "h": 19 }, "_6": { "w": 19, "h": 19 }, "_7": { "w": 19, "h": 19 } }, "2": { "_1": { "w": 69, "h": 103 }, "_2": { "w": 65, "h": 19 }, "_3": { "w": 65, "h": 19 }, "_4": { "w": 65, "h": 40 }, "_5": { "w": 19, "h": 19 }, "_6": { "w": 19, "h": 19 }, "_7": { "w": 19, "h": 19 } }, "3": { "_1": { "w": 69, "h": 103 }, "_2": { "w": 65, "h": 19 }, "_3": { "w": 65, "h": 19 }, "_4": { "w": 65, "h": 40 }, "_5": { "w": 19, "h": 19 }, "_6": { "w": 19, "h": 19 }, "_7": { "w": 19, "h": 19 } }, "4": { "_1": { "w": 27, "h": 145 }, "_2": { "w": 23, "h": 19 }, "_3": { "w": 23, "h": 19 }, "_4": { "w": 23, "h": 82 }, "_5": { "w": 19, "h": 19 }, "_6": { "w": 19, "h": 19 }, "_7": { "w": 19, "h": 19 } }, "5": { "_1": { "w": 130, "h": 124 }, "_2": { "w": 126, "h": 19 }, "_3": { "w": 126, "h": 19 }, "_4": { "w": 126, "h": 61 }, "_5": { "w": 44, "h": 40 }, "_8": { "w": 19, "h": 19 }, "_9": { "w": 19, "h": 19 }, "_6": { "w": 19, "h": 40 }, "_7": { "w": 54, "h": 40 }, "_10": { "w": 24, "h": 19 }, "_11": { "w": 23, "h": 19 } }, "6": { "_1": { "w": 104, "h": 145 }, "_2": { "w": 19, "h": 124 }, "_3": { "w": 19, "h": 124 }, "_4": { "w": 58, "h": 124 }, "_5": { "w": 54, "h": 40 }, "_8": { "w": 19, "h": 19 }, "_9": { "w": 19, "h": 19 }, "_6": { "w": 54, "h": 19 }, "_7": { "w": 54, "h": 40 }, "_10": { "w": 24, "h": 19 }, "_11": { "w": 23, "h": 19 } }, "7": { "_1": { "w": 146, "h": 103 }, "_2": { "w": 19, "h": 82 }, "_3": { "w": 19, "h": 82 }, "_4": { "w": 100, "h": 82 }, "_5": { "w": 44, "h": 61 }, "_8": { "w": 19, "h": 19 }, "_9": { "w": 19, "h": 19 }, "_6": { "w": 19, "h": 61 }, "_7": { "w": 28, "h": 61 }, "_10": { "w": 24, "h": 19 }, "_11": { "w": 24, "h": 19 } } },
	3: { "0": { "_1": { "w": 69, "h": 103 }, "_2": { "w": 19, "h": 82 }, "_3": { "w": 19, "h": 82 }, "_4": { "w": 23, "h": 82 }, "_5": { "w": 19, "h": 19 }, "_6": { "w": 19, "h": 19 }, "_7": { "w": 19, "h": 19 } }, "1": { "_1": { "w": 69, "h": 103 }, "_2": { "w": 19, "h": 82 }, "_3": { "w": 19, "h": 82 }, "_4": { "w": 23, "h": 82 }, "_5": { "w": 19, "h": 19 }, "_6": { "w": 19, "h": 19 }, "_7": { "w": 19, "h": 19 } }, "2": { "_1": { "w": 69, "h": 103 }, "_2": { "w": 65, "h": 19 }, "_3": { "w": 65, "h": 19 }, "_4": { "w": 65, "h": 40 }, "_5": { "w": 19, "h": 19 }, "_6": { "w": 19, "h": 19 }, "_7": { "w": 19, "h": 19 } }, "3": { "_1": { "w": 69, "h": 103 }, "_2": { "w": 65, "h": 19 }, "_3": { "w": 65, "h": 19 }, "_4": { "w": 65, "h": 40 }, "_5": { "w": 19, "h": 19 }, "_6": { "w": 19, "h": 19 }, "_7": { "w": 19, "h": 19 } }, "4": { "_1": { "w": 27, "h": 145 }, "_2": { "w": 23, "h": 19 }, "_3": { "w": 23, "h": 19 }, "_4": { "w": 23, "h": 82 }, "_5": { "w": 19, "h": 19 }, "_6": { "w": 19, "h": 19 }, "_7": { "w": 19, "h": 19 } }, "5": { "_1": { "w": 130, "h": 124 }, "_2": { "w": 126, "h": 19 }, "_3": { "w": 126, "h": 19 }, "_4": { "w": 126, "h": 61 }, "_5": { "w": 44, "h": 40 }, "_8": { "w": 19, "h": 19 }, "_9": { "w": 19, "h": 19 }, "_6": { "w": 19, "h": 40 }, "_7": { "w": 54, "h": 40 }, "_10": { "w": 24, "h": 19 }, "_11": { "w": 23, "h": 19 } }, "6": { "_1": { "w": 104, "h": 145 }, "_2": { "w": 19, "h": 124 }, "_3": { "w": 19, "h": 124 }, "_4": { "w": 58, "h": 124 }, "_5": { "w": 54, "h": 40 }, "_8": { "w": 19, "h": 19 }, "_9": { "w": 19, "h": 19 }, "_6": { "w": 54, "h": 19 }, "_7": { "w": 54, "h": 40 }, "_10": { "w": 24, "h": 19 }, "_11": { "w": 23, "h": 19 } }, "7": { "_1": { "w": 146, "h": 103 }, "_2": { "w": 19, "h": 82 }, "_3": { "w": 19, "h": 82 }, "_4": { "w": 100, "h": 82 }, "_5": { "w": 44, "h": 61 }, "_8": { "w": 19, "h": 19 }, "_9": { "w": 19, "h": 19 }, "_6": { "w": 19, "h": 61 }, "_7": { "w": 28, "h": 61 }, "_10": { "w": 24, "h": 19 }, "_11": { "w": 24, "h": 19 } }, "8": { "_1": { "w": 94, "h": 166 }, "_2": { "w": 19, "h": 145 }, "_3": { "w": 19, "h": 145 }, "_4": { "w": 48, "h": 145 }, "_5": { "w": 44, "h": 40 }, "_8": { "w": 19, "h": 19 }, "_9": { "w": 19, "h": 19 }, "_6": { "w": 44, "h": 19 }, "_7": { "w": 44, "h": 61 }, "_10": { "w": 24, "h": 19 }, "_11": { "w": 24, "h": 19 } }, "9": { "_1": { "w": 23, "h": 40 }, "_2": { "w": 19, "h": 19 } }, "10": { "_1": { "w": 23, "h": 23 }, "_2": { "w": 19, "h": 19 } }, "11": { "_1": { "w": 44, "h": 40 }, "_2": { "w": 19, "h": 19 }, "_3": { "w": 19, "h": 19 } }, "12": { "_1": { "w": 23, "h": 61 }, "_2": { "w": 19, "h": 19 }, "_3": { "w": 19, "h": 19 } }, "13": { "_1": { "w": 44, "h": 23 }, "_2": { "w": 19, "h": 19 }, "_3": { "w": 19, "h": 19 } }, "14": { "_1": { "w": 111, "h": 44 }, "_2": { "w": 19, "h": 40 }, "_3": { "w": 19, "h": 40 }, "_4": { "w": 65, "h": 40 }, "_5": { "w": 19, "h": 19 }, "_6": { "w": 19, "h": 19 }, "_7": { "w": 19, "h": 19 } }, "15": { "_1": { "w": 172, "h": 82 }, "_2": { "w": 19, "h": 61 }, "_3": { "w": 19, "h": 61 }, "_4": { "w": 126, "h": 61 }, "_5": { "w": 44, "h": 40 }, "_8": { "w": 19, "h": 19 }, "_9": { "w": 19, "h": 19 }, "_6": { "w": 19, "h": 40 }, "_7": { "w": 54, "h": 40 }, "_10": { "w": 24, "h": 19 }, "_11": { "w": 23, "h": 19 } }, "16": { "_1": { "w": 172, "h": 65 }, "_2": { "w": 19, "h": 61 }, "_3": { "w": 19, "h": 61 }, "_4": { "w": 126, "h": 61 }, "_5": { "w": 44, "h": 40 }, "_8": { "w": 19, "h": 19 }, "_9": { "w": 19, "h": 19 }, "_6": { "w": 19, "h": 40 }, "_7": { "w": 54, "h": 40 }, "_10": { "w": 24, "h": 19 }, "_11": { "w": 23, "h": 19 } }, "17": { "_1": { "w": 490, "h": 23 }, "_2": { "w": 19, "h": 19 }, "_3": { "w": 19, "h": 19 }, "_4": { "w": 19, "h": 19 }, "_5": { "w": 19, "h": 19 }, "_6": { "w": 19, "h": 19 }, "_7": { "w": 19, "h": 19 }, "_8": { "w": 19, "h": 19 }, "_9": { "w": 19, "h": 19 }, "_10": { "w": 24, "h": 19 }, "_11": { "w": 23, "h": 19 }, "_12": { "w": 24, "h": 19 }, "_13": { "w": 24, "h": 19 }, "_14": { "w": 24, "h": 19 }, "_15": { "w": 24, "h": 19 }, "_16": { "w": 24, "h": 19 }, "_17": { "w": 24, "h": 19 }, "_18": { "w": 24, "h": 19 }, "_19": { "w": 24, "h": 19 }, "_20": { "w": 24, "h": 19 }, "_21": { "w": 24, "h": 19 } }, "18": { "_1": { "w": 196, "h": 40 }, "_2": { "w": 19, "h": 19 } }, "19": { "_1": { "w": 196, "h": 61 }, "_2": { "w": 19, "h": 40 }, "_3": { "w": 19, "h": 40 }, "_4": { "w": 65, "h": 40 }, "_5": { "w": 19, "h": 19 }, "_6": { "w": 19, "h": 19 }, "_7": { "w": 19, "h": 19 } }, "20": { "_1": { "w": 196, "h": 40 }, "_2": { "w": 19, "h": 19 }, "_3": { "w": 19, "h": 19 }, "_4": { "w": 19, "h": 19 } }, "21": { "_1": { "w": 27, "h": 145 }, "_2": { "w": 23, "h": 19 }, "_3": { "w": 23, "h": 19 }, "_4": { "w": 23, "h": 82 }, "_5": { "w": 19, "h": 19 }, "_6": { "w": 19, "h": 19 }, "_7": { "w": 19, "h": 19 } }, "22": { "_1": { "w": 196, "h": 103 }, "_2": { "w": 65, "h": 19 }, "_3": { "w": 65, "h": 19 }, "_4": { "w": 65, "h": 40 }, "_5": { "w": 19, "h": 19 }, "_6": { "w": 19, "h": 19 }, "_7": { "w": 19, "h": 19 } }, "23": { "_1": { "w": 196, "h": 103 }, "_2": { "w": 19, "h": 82 }, "_3": { "w": 19, "h": 82 }, "_4": { "w": 23, "h": 82 }, "_5": { "w": 19, "h": 19 }, "_6": { "w": 19, "h": 19 }, "_7": { "w": 19, "h": 19 } } },
	4: {},
	5: { "0": { "_1": { "w": 33, "h": 120 }, "_2": { "w": 19, "h": 19 } }, "1": { "_1": { "w": 104, "h": 120 }, "_2": { "w": 19, "h": 19 } } },
	6: {},
	7: { "0": { "_1": { "w": 22, "h": 46 }, "_2": { "w": 22, "h": 23 }, "_3": { "w": 22, "h": 23 } } },
};
const ALLTESTS = {
	0: {
		0: {
			fStruct: makeRoot, options: {
				presentationStrategy: 'rec', autoType: 'cssEmpty',
				params: { _1: { width: 40, height: 40, color: 'red', 'background-color': 'blue' } }
			}
		},
	},
	1: {
		0: { fStruct: makeSimplestTree, options: { params: { '_1': { height: 120 } } } },
		1: { fStruct: makeSimplestTree, options: { params: { '_1': { width: 100, height: 120 } } } },
		2: { fStruct: makeSimpleTree, options: { params: { '_1': { width: 100, height: 120 } } } },
		3: { fStruct: makeSimpleTree, options: { params: { '_1': { orientation: 'v', width: 100, height: 120 } } } },
		4: { fStruct: makeTree33, options: { params: { '_1': { orientation: 'v' }, '_4': { orientation: 'v' } } } },
		5: { fStruct: makeTree332x2, options: { params: { '_1': { orientation: 'v' } } } },
		6: { fStruct: makeTree332x2, options: { params: { '_4': { orientation: 'v' } } } },
	},
	2: {
		0: { fStruct: makeTree33, options: { params: { '_4': { fg: 'red', orientation: 'v' } } } },
		1: { fStruct: makeTree33, options: { params: { '_4': { orientation: 'v' } } } },
		2: { fStruct: makeTree33, options: { params: { '_1': { orientation: 'v' } } } },
		3: { fStruct: makeTree33, options: { params: { '_1': { orientation: 'v' } } } },
		4: { fStruct: makeTree33, options: { params: { '_1': { orientation: 'v' }, '_4': { orientation: 'v' } } } },
		5: { fStruct: makeTree332x2, options: { params: { '_1': { orientation: 'v' } } } },
		6: { fStruct: makeTree332x2, options: { params: { '_4': { orientation: 'v' } } } },
		7: { fStruct: makeTree332x2, options: { params: { '_7': { orientation: 'v' } } } },
	},
	3: {
		0: { fStruct: makeTree33, options: { params: { '_4': { fg: 'red', orientation: 'v' } } } },
		1: { fStruct: makeTree33, options: { params: { '_4': { orientation: 'v' } } } },
		2: { fStruct: makeTree33, options: { params: { '_1': { orientation: 'v' } } } },
		3: { fStruct: makeTree33, options: { params: { '_1': { orientation: 'v' } } } },
		4: { fStruct: makeTree33, options: { params: { '_1': { orientation: 'v' }, '_4': { orientation: 'v' } } } },
		5: { fStruct: makeTree332x2, options: { params: { '_1': { orientation: 'v' } } } },
		6: { fStruct: makeTree332x2, options: { params: { '_4': { orientation: 'v' } } } },
		7: { fStruct: makeTree332x2, options: { params: { '_7': { orientation: 'v' } } } },
		8: { fStruct: makeTree332x2, options: { params: { '_4': { orientation: 'v' }, '_7': { orientation: 'v' } } } },
		9: { fStruct: makeSimplestTree, options: undefined },
		10: { fStruct: makeSimplestTree, options: { fContent: contentNoRootContent } },
		11: { fStruct: makeSimpleTree, options: undefined },
		12: { fStruct: makeSimpleTree, options: { params: { '_1': { orientation: 'v' } } } },
		13: { fStruct: makeSimpleTree, options: { fContent: contentNoRootContent } },
		14: { fStruct: makeTree33, options: { fContent: contentNoRootContent } },
		15: { fStruct: makeTree332x2, options: undefined },
		16: { fStruct: makeTree332x2, options: { fContent: contentNoRootContent } },
		17: { fStruct: () => makeSimpleTree(20), options: { fContent: contentNoRootContent } },
		18: { fStruct: makeSimplestTree, options: { fContent: contentRootExtralong } },
		19: { fStruct: makeTree33, options: { fContent: contentRootExtralong } },
		20: { fStruct: () => makeSimpleTree(3), options: { fContent: contentRootExtralong } },
		21: {
			fStruct: makeTree33, options: {
				params: {
					'_1': { bg: 'black', orientation: 'v' },
					'_4': { bg: 'inherit', orientation: 'v' }
				}
			}
		},
		22: { fStruct: makeTree33, options: { fContent: contentRootExtralong, params: { '_1': { orientation: 'v' } } } },
		23: { fStruct: makeTree33, options: { fContent: contentRootExtralong, params: { '_4': { orientation: 'v' } } } },
	},
	4: {
		0: { fStruct: makeSimplestTree, options: { fContent: n => n.uid == '_1' ? 'random' : n.uid, positioning: 'random' } },
		1: { fStruct: makeSimpleTree, options: { fContent: n => n.uid == '_1' ? 'random' : n.uid, positioning: 'random' } },
		2: { fStruct: () => makeSimpleTree(10), options: { fContent: n => n.uid == '_1' ? 'random' : n.uid, positioning: 'random' } },
		3: { fStruct: makeTree33, options: { fContent: n => n.uid == '_1' ? 'random' : n.uid, positioning: 'random' } },
	},
	5: {
		0: { fStruct: makeSimplestTree, options: { fContent: n => n.uid == '_1' ? 'hallo' : n.uid, params: { '_1': { height: 120 } } } },
		1: {
			fStruct: makeSimplestTree, options: {
				fContent: n => n.uid == '_1' ? { first: '1', uid: n.uid } : n.uid,
				params: { '_1': { bg: 'blue', 'text-align': 'center', width: 100, height: 120 } }
			}
		},
	},
	6: {
		41: {
			fStruct: () => makeTreeNNEach(2, 4), options: {
				params: {
					'_1': { orientation: 'h' },
					'_2': { orientation: 'w', rows: 2, cols: 2 },
					'_7': { orientation: 'w', rows: 2, cols: 2 }
				}
			}
		},
		40: {
			fStruct: () => makeTreeNNEach(1, 4),
			options: {
				params:
				{
					'_2': { orientation: 'w', rows: 2, cols: 2 }
				}
			}
		},
		39: {
			fStruct: () => makeTreeNNEach(2, 2), options: {
				params: {
					'_2': { orientation: 'w', rows: 1, cols: 2 },
					'_5': { orientation: 'w', rows: 1, cols: 2 }
				}
			}
		},
		38: {
			fStruct: () => makeTreeNNEach(2, 4), options: {
				params: {
					'_2': { orientation: 'w', rows: 2, cols: 2 },
					'_7': { orientation: 'w', rows: 2, cols: 2 }
				}
			}
		},
		37: { fStruct: makeSimpleTree, options: { fType: typePanelInfo, fContent: contentHallo } },
		36: { fStruct: makeSimpleTree, options: { fType: typePanelInfo, fContent: contentHallo, presentationStrategy: 'new' } },
		35: { fStruct: () => makeTreeNN(2, 2), options: { fType: typeEmpty, presentationStrategy: 'new' } },
		34: { fStruct: makeTree33, options: { fType: typeEmpty, presentationStrategy: 'new' } },
		33: { fStruct: makeTree33, options: { fType: typeEmpty, presentationStrategy: 'new', params: { '_1': { orientation: 'v' } } } },
		32: { fStruct: makeTree33, options: { presentationStrategy: 'orig', params: { '_1': { orientation: 'v' } } } },
		31: {
			fStruct: makeTree33, options: {
				fType: typePanelInfo,
				presentationStrategy: 'new',
				params: { '_1': { orientation: 'v' } }
			}
		},
		30: {
			fStruct: makeTree33, options: {
				fType: typeEmpty,
				presentationStrategy: 'rec',
				params: { '_1': { orientation: 'h' } }
			}
		},
		29: { fStruct: makeTree33, options: { params: { '_1': { orientation: 'v' } } } },
		28: { fStruct: () => makeSimpleTree(8), options: { presentationStrategy: 'new', fType: type00flex } },
		27: { fStruct: makeSimplestTree, options: { presentationStrategy: 'new', fType: type00flex } },
		26: { fStruct: makeSimplestTree, options: { presentationStrategy: 'new', fType: typeEmpty } },
		25: { fStruct: makeSimplestTree, options: { presentationStrategy: 'new' } },
		24: { fStruct: makeSimplestTree, options: undefined },
		23: { fStruct: makeSimplestTree, options: { presentationStrategy: 'orig' } },
		22: { fStruct: makeSimplestTree, options: { fType: typeEmpty } },
		21: { fStruct: () => makeHugeBoardInBoardOld(25, 5), options: { fContent: contentNoParentContent } },
		20: { fStruct: () => makeHugeBoardInBoard(25, 5), options: { fContent: contentNoParentContent } },
		19: { fStruct: () => makeHugeBoardInBoard(40, 5), options: { fContent: contentNoParentContent } },
		18: { fStruct: () => makeHugeBoardInBoard(4, 2), options: { fContent: contentNoParentContent } },
		17: { fStruct: () => makeTreeNNEach(2, 4), options: { fContent: contentNoParentContent, params: { '_1': { orientation: 'w', rows: 1, cols: 2 }, '_2': { contentwalign: 'center', contenthalign: 'center' }, '_7': { contentwalign: 'center', orientation: 'w', rows: 2, cols: 2 } } } },
		16: {
			fStruct: () => makeTreeNNEach(2, 4), options: {
				fContent: contentRootExtralong,
				params: {
					'_1': { orientation: 'w', rows: 1, cols: 2 },
					'_2': { contenthalign: 'center' },
					'_7': { contentwalign: 'center', orientation: 'w', rows: 2, cols: 2 }
				}
			}
		},
		15: {
			fStruct: () => makeTreeNNEach(2, 4), options: {
				params: {
					'_1': { orientation: 'w', rows: 1, cols: 2 },
					'_7': { orientation: 'w', rows: 2, cols: 2 }
				}
			}
		},
		14: { fStruct: () => makeTreeNN(2, 4), options: { fContent: contentNoParentContentRootExtralong, params: { '_1': { orientation: 'w', rows: 1, cols: 2 }, '_2': { orientation: 'w', rows: 2, cols: 2 } } } },
		13: { fStruct: () => makeTreeNN(2, 4), options: { params: { '_1': { orientation: 'w', rows: 1, cols: 2 }, '_2': { orientation: 'w', rows: 2, cols: 2 } } } },
		12: { fStruct: () => makeTreeNN(2, 4), options: { fContent: contentNoParentContent, params: { '_1': { orientation: 'w', rows: 1, cols: 2 }, '_2': { orientation: 'w', rows: 2, cols: 2 } } } },
		11: { fStruct: () => makeSimpleTree(3), options: { fContent: contentRootExtralong, params: { '_1': { orientation: 'w', rows: 3, cols: 1 } } } },
		10: { fStruct: () => makeSimpleTree(3), options: { params: { '_1': { orientation: 'w', rows: 3, cols: 1 } } } },
		9: { fStruct: () => makeSimpleTree(3), options: { fContent: contentNoParentContent, params: { '_1': { orientation: 'w', rows: 3, cols: 1 } } } },
		8: { fStruct: () => makeSimpleTree(2), options: { fContent: contentRootExtralong, params: { '_1': { orientation: 'w', rows: 2, cols: 1 } } } },
		7: { fStruct: () => makeSimpleTree(2), options: { params: { '_1': { orientation: 'w', rows: 2, cols: 1 } } } },
		6: { fStruct: () => makeSimpleTree(2), options: { fContent: contentNoParentContent, params: { '_1': { orientation: 'w', rows: 2, cols: 1 } } } },
		5: { fStruct: () => makeSimpleTree(4), options: { fContent: contentRootExtralong, params: { '_1': { orientation: 'w', rows: 2, cols: 2 } } } },
		4: { fStruct: () => makeSimpleTree(4), options: { params: { '_1': { orientation: 'w', rows: 2, cols: 2 } } } },
		3: { fStruct: () => makeSimpleTree(2), options: { fContent: contentRootExtralong } },
		2: { fStruct: () => makeSimpleTree(2), options: { positioning: 'regular', fContent: contentRootExtralong } },
		1: { fStruct: () => makeSimpleTree(20), options: { positioning: 'regular' } },
		0: { fStruct: () => makeSimpleTree(4), options: { fContent: n => n.uid == '_1' ? 'board' : n.uid, positioning: 'regular' } },
	},
	7: {
		0: { fStruct: makeSimpleTree, options: { autoType: 'cssEmpty', fContent: contentNoParentContent } },
	},
};
//#endregion

//#region var
var jewel = (function () {
	var settings = {
		rows: 8,
		cols: 8,
		baseScore: 100,
		baseLevelScore: 1500,
		baseLevelExp: 1.05,
		baseLevelTimer: 60000,
		numJewelTypes: 7,
		controls: {
			KEY_UP: "moveUp",
			KEY_LEFT: "moveLeft",
			KEY_DOWN: "moveDown",
			KEY_RIGHT: "moveRight",
			KEY_ENTER: "selectJewel",
			KEY_SPACE: "selectJewel",
			CLICK: "selectJewel",
			TOUCH: "selectJewel",
			BUTTON_A: "selectJewel",
			LEFT_STICK_UP: "moveUp",
			LEFT_STICK_DOWN: "moveDown",
			LEFT_STICK_LEFT: "moveLeft",
			LEFT_STICK_RIGHT: "moveRight"
		}
	};
	var scriptQueue = [],
		numResourcesLoaded = 0,
		numResources = 0,
		executeRunning = false;
	function executeScriptQueue() {
		var next = scriptQueue[0],
			first, script;
		if (next && next.loaded) {
			executeRunning = true;
			scriptQueue.shift();
			first = document.getElementsByTagName("script")[0];
			script = document.createElement("script");
			script.onload = function () {
				if (next.callback) {
					next.callback();
				}
				executeScriptQueue();
			};
			script.src = next.src;
			first.parentNode.insertBefore(script, first);
		} else {
			executeRunning = false;
		}
	}
	function getLoadProgress() {
		return numResourcesLoaded / numResources;
	}
	function load(src, callback) {
		var image, queueEntry;
		numResources++;
		queueEntry = {
			src: src,
			callback: callback,
			loaded: false
		};
		scriptQueue.push(queueEntry);
		image = new Image();
		image.onload = image.onerror = function () {
			numResourcesLoaded++;
			queueEntry.loaded = true;
			if (!executeRunning) {
				executeScriptQueue();
			}
		};
		image.src = src;
	}
	function preload(src) {
		var image = new Image();
		image.src = src;
	}
	function showScreen(screenId) {
		var dom = jewel.dom,
			$ = dom.$,
			activeScreen = $("#game .screen.active")[0],
			screen = $("#" + screenId)[0];
		if (!jewel.screens[screenId]) {
			alert("This module is not implemented yet!");
			return;
		}
		if (activeScreen) {
			dom.removeClass(activeScreen, "active");
		}
		dom.addClass(screen, "active");
		jewel.screens[screenId].run();
	}
	function isStandalone() {
		return (window.navigator.standalone !== false);
	}
	function hasWebWorkers() {
		return ("Worker" in window);
	}
	function hasWebWorkers() {
		return ("Worker" in window);
	}
	function hasWebGL() {
		var canvas = document.createElement("canvas"),
			gl = canvas.getContext("webgl") ||
				canvas.getContext("experimental-webgl");
		return !!gl;
	}
	function setup() {
		if (/Android/.test(navigator.userAgent)) {
			jewel.dom.$("html")[0].style.height = "200%";
			setTimeout(function () {
				window.scrollTo(0, 1);
			}, 0);
		}
		jewel.dom.bind(document, "touchmove", function (event) {
			event.preventDefault();
		});
		if (isStandalone()) {
			showScreen("splash-screen");
		} else {
			showScreen("install-screen");
		}
	}
	return {
		getLoadProgress: getLoadProgress,
		hasWebWorkers: hasWebWorkers,
		hasWebGL: hasWebGL,
		isStandalone: isStandalone,
		preload: preload,
		load: load,
		setup: setup,
		showScreen: showScreen,
		settings: settings,
		screens: {}
	};
})();
var lastUpdate = 0;
var player, ball, opponent, ai;
var score;
var Ball = function () {
	var velocity = [0, 0];
	var position = [0, 0];
	var element = $('#ball');
	var owner;
	var halfTile = 32;
	var paused = false;
	function move(t) {
		if (owner !== undefined) {
			var ownerPosition = owner.getPosition();
			position[1] = ownerPosition[1] + owner.getSize() / 2;
			if (owner.getSide() === 'left') {
				position[0] = ownerPosition[0] + owner.getSize();
			} else {
				position[0] = ownerPosition[0];
			}
		} else {
			if (position[1] - halfTile <= 0 ||
				position[1] + halfTile >= innerHeight) {
				velocity[1] = -velocity[1];
			}
			position[0] += velocity[0] * t;
			position[1] += velocity[1] * t;
		}
		element.css('left', (position[0] - halfTile) + 'px');
		element.css('top', (position[1] - halfTile) + 'px');
	};
	function checkScored() {
		if (position[0] <= 0) {
			pause();
			$(document).trigger('ping:opponentScored');
		}
		if (position[0] >= innerWidth) {
			pause();
			$(document).trigger('ping:playerScored');
		}
	}
	function update(t) {
		if (!paused) {
			move(t);
		}
		if (owner !== undefined) {
			return;
		}
		var playerPosition = player.getPosition();
		if (position[0] <= player.getSize() &&
			position[1] >= playerPosition[1] &&
			position[1] <= playerPosition[1] + player.getSize()) {
			console.log("Grabbed by player!");
			owner = player;
		}
		var opponentPosition = opponent.getPosition();
		if (position[0] >= innerWidth - opponent.getSize() &&
			position[1] >= opponentPosition[1] &&
			position[1] <= opponentPosition[1] + opponent.getSize()) {
			console.log("Grabbed by opponent!");
			owner = opponent;
		}
		checkScored();
	}
	function pause() {
		paused = true;
	}
	function start() {
		paused = false;
	}
	return {
		update: update,
		pause: pause,
		start: start,
		getOwner: function () { return owner; },
		setOwner: function (o) { owner = o; },
		getVelocity: function () { return velocity },
		setVelocity: function (v) { velocity = v; },
		getPosition: function (p) { return position; },
	}
};
var ObjetoSolitario = function () {
	this.CartaDrag = new Array();
	this.ImagenDrag = new Array();
	this.Movimiento = 0;
	this.Movimientos = new Array();
	this.MovimientosAuyda = new Array();
	this.MovimientosAuydaActual = 0;
	this.Iniciar = function () {
		$("body").on("keydown", function (e) {
			if (e.ctrlKey && (String.fromCharCode(e.which) === 'z' || String.fromCharCode(e.which) === 'Z')) {
				Solitario.Deshacer(e);
			} else if (e.ctrlKey && (String.fromCharCode(e.which) === 'y' || String.fromCharCode(e.which) === 'Y')) {
				Solitario.Rehacer(e);
			} else if (String.fromCharCode(e.which) === 'n' || String.fromCharCode(e.which) === 'N') {
				Solitario.NuevoJuego();
			} else if (String.fromCharCode(e.which) === ' ') {
				Solitario.MostrarAyuda();
			}
		});
		$("ventanamenu > button:nth-child(1)").on("click", this.NuevoJuego.bind(this));
		$("ventanamenu > button:nth-child(2)").on("click", this.Deshacer.bind(this));
		$("ventanamenu > button:nth-child(3)").on("click", this.Rehacer.bind(this));
		$("ventanamenu > button:nth-child(4)").on("click", this.MostrarAyuda.bind(this));
		this.NuevoJuego();
	};
	this.MostrarAyuda = function () {
		$("Carta, Solucion, Baraja, Columna").removeAttr("ayuda1").removeAttr("ayuda2");
		var Mov = this.MovimientosAuyda[this.MovimientosAuydaActual];
		if (this.MovimientosAuydaActual === this.MovimientosAuyda.length - 1) {
			this.MovimientosAuydaActual = 0;
		} else {
			this.MovimientosAuydaActual++;
		}
		Mov.origen.attr({
			"ayuda1": "true"
		});
		Mov.destino.attr({
			"ayuda2": "true"
		});
	}
	this.NuevoJuego = function () {
		var Orden = new Array(4 * 13);
		var Baraja = Array();
		for (i = 0; i < 4; i++) {
			Baraja[i] = $("Baraja[num='" + (i + 1) + "']");
			Baraja[i].html("");
		}
		var Solucion = Array();
		for (i = 0; i < 4; i++) {
			Solucion[i] = $("Solucion[num='" + (i + 1) + "']");
			Solucion[i].html("");
		}
		var Columna = Array();
		for (i = 0; i < 7; i++) {
			Columna[i] = $("Columna[num='" + (i + 1) + "']");
			Columna[i].html("");
		}
		this.Movimiento = 0;
		this.Movimientos = [];
		var Cartas = Array();
		Contador = 0;
		for (p = 1; p < 5; p++) {
			for (v = 0; v < 13; v++) {
				Orden[Contador] = Contador;
				Cartas[Contador] = $("<Carta></Carta>")
				Cartas[Contador++].attr({
					"Palo": p,
					"Valor": v,
					"Tapada": "true"
				});
			}
		}
		for (var Rand, Tmp, i = Orden.length; i; Rand = Math.floor(Math.random() * i), Tmp = Orden[--i], Orden[i] = Orden[Rand], Orden[Rand] = Tmp);
		Contador = 0;
		for (Cols = 0; Cols < 7; Cols++) {
			Carta = Columna[Cols];
			for (i = 0; i < Cols + 1; i++) {
				Carta = Cartas[Orden[Contador++]].appendTo(Carta);
				if (i == Cols) {
					Carta.attr({
						"Tapada": "false",
						"draggable": "true"
					});
				}
				Carta.css({
					"z-index": i
				});
			}
		}
		Carta = Baraja[0];
		for (var i = Contador; i < 52; i++) {
			Carta = Cartas[Orden[i]].appendTo(Carta);
			Carta.css({
				"z-index": i - Contador
			});
		}
		Baraja[0].off("click").on("click", this.Baraja1_EventoClick.bind(this));
		$("Carta").off("mouseover").on('mouseover', this.Carta_EventoMouseOver.bind(this));
		$("Carta").off("mouseout").on('mouseout', this.Carta_EventoMouseOut.bind(this));
		$("Carta").off("dragstart").on('dragstart', this.Carta_EventoDragStart.bind(this));
		$("Carta").off("dragend").on('dragend', this.Carta_EventoDragEnd.bind(this));
		$("Carta").off("dblclick").on('dblclick', this.Carta_EventoDblClick.bind(this));
		$("Columna").off("drop").on('drop', this.Columna_EventoDrop.bind(this));
		$("Columna").off("dragover").on('dragover', this.Columna_EventoDragOver.bind(this));
		$("Solucion").off("drop").on('drop', this.Solucion_EventoDrop.bind(this));
		$("Solucion").off("dragover").on('dragover', this.Solucion_EventoDragOver.bind(this));
		this.UltimoHijo($("Columna[num=7]"));
		$("Victoria").css({
			"display": "none"
		});
		$("Derrota").css({
			"display": "none"
		});
		this.GuardarMovimiento();
	};
	this.Carta_EventoMouseOver = function (e) {
		Carta = $(e.originalEvent.currentTarget);
		if (Carta.attr("tapada") !== "true" && Carta.attr("draggable") === "true") {
			$(e.originalEvent.currentTarget).attr({
				"hover": "true"
			});
		}
		e.stopPropagation();
	};
	this.Carta_EventoMouseOut = function (e) {
		$(e.originalEvent.currentTarget).removeAttr("hover");
		e.stopPropagation();
	};
	this.Carta_EventoDblClick = function (e) {
		Carta = this.UltimoHijo($(e.originalEvent.currentTarget));
		Palo = 0;
		Valor = 0;
		for (i = 1; i < 5; i++) {
			if (this.UltimoHijo($("Solucion[num='" + i + "']")).attr("palo") == Carta.attr("palo")) {
				Valor = parseInt(this.UltimoHijo($("Solucion[num='" + i + "']")).attr("valor")) + 1;
				Palo = this.UltimoHijo($("Solucion[num='" + i + "']"));
			}
		}
		if (Palo == 0) {
			for (i = 1; i < 5; i++) {
				if (this.UltimoHijo($("Solucion[num='" + i + "']")).attr("num") == i) {
					Palo = this.UltimoHijo($("Solucion[num='" + i + "']"));
					break;
				}
			}
		}
		if (parseInt(Carta.attr("valor")) == Valor) {
			if (typeof (Carta.parent().attr("num")) === "undefined") {
				Carta.parent().attr({
					"tapada": "false",
					"draggable": "true"
				});
			}
			Carta.appendTo(this.UltimoHijo(Palo));
			Carta.removeAttr("draggable");
			this.GuardarMovimiento();
		}
		e.stopPropagation();
	};
	this.Carta_EventoDragStart = function (e) {
		this.CartaDrag = $(e.originalEvent.currentTarget);
		this.ImagenDrag = $("#ImgDrag");
		this.ImagenDrag.attr({
			"palo": this.CartaDrag.attr("palo"),
			"valor": this.CartaDrag.attr("valor")
		}).html(this.CartaDrag.html());
		this.CartaDrag.css({
			opacity: 0
		});
		OffSet = this.CartaDrag.offset();
		e.originalEvent.dataTransfer.setDragImage(this.ImagenDrag[0], e.originalEvent.clientX - OffSet.left, (e.originalEvent.clientY - OffSet.top) + $(window).scrollTop());
		e.originalEvent.dataTransfer.effectAllowed = 'move';
		e.originalEvent.dataTransfer.setData('text/html', e.originalEvent.currentTarget);
		e.stopPropagation();
	}
	this.Carta_EventoDragEnd = function (e) {
		this.CartaDrag.css({
			opacity: 1
		});
	};
	this.Baraja1_EventoClick = function (e) {
		Baraja1 = $("Baraja[num='1']");
		Baraja2 = $("Baraja[num='2']");
		if (this.UltimoHijo(Baraja1) !== Baraja1) {
			$("Baraja[num='2'] Carta[draggable]").removeAttr("draggable");
			Carta = this.UltimoHijo(Baraja1).appendTo(this.UltimoHijo(Baraja2));
			Carta.css({
				"z-index": (Cartas.length + 1)
			}).attr({
				"Tapada": "false",
				"draggable": "true"
			});
			this.GuardarMovimiento();
		} else {
			if (this.UltimoHijo(Baraja2) === Baraja2) return;
			Carta = this.UltimoHijo(Baraja2);
			while (Carta !== Baraja2) {
				Carta.appendTo(this.UltimoHijo(Baraja1)).attr({
					"Tapada": "true",
					"draggable": "false"
				});
				Carta = this.UltimoHijo(Baraja2);
			}
			this.Baraja1_EventoClick();
		}
	};
	this.Solucion_EventoDragOver = function (e) {
		e.preventDefault();
		e.stopPropagation();
		e.originalEvent.dataTransfer.dropEffect = 'move';
		return false;
	};
	this.Solucion_EventoDrop = function (e) {
		if (this.UltimoHijo(this.CartaDrag) === this.CartaDrag) {
			Solucion = this.UltimoHijo($(e.originalEvent.target));
			Valor = 0;
			if (typeof (Solucion.attr("num")) === "undefined") {
				if (Solucion.attr("palo") === this.CartaDrag.attr("palo")) {
					Valor = (parseInt(Solucion.attr("valor")) + 1);
				} else {
					Valor = -1;
				}
			}
			if (parseInt(this.CartaDrag.attr("valor")) === Valor) {
				if (typeof (this.CartaDrag.parent().attr("num")) === "undefined") {
					this.CartaDrag.parent().attr({
						"tapada": "false",
						"draggable": "true"
					});
				}
				this.CartaDrag.appendTo(Solucion);
				this.CartaDrag.removeAttr("draggable");
				this.GuardarMovimiento();
			}
		}
	};
	this.Columna_EventoDragOver = function (e) {
		e.preventDefault();
		e.stopPropagation();
		e.originalEvent.dataTransfer.dropEffect = 'move';
		return false;
	};
	this.Columna_EventoDrop = function (e) {
		var GM = false;
		if (this.CartaValida(this.CartaDrag, $(e.originalEvent.target)) == true) {
			if (this.UltimoHijo(this.CartaDrag) != this.UltimoHijo($(e.originalEvent.target))) {
				if (typeof (this.CartaDrag.parent().attr("num")) === "undefined") {
					this.CartaDrag.parent().attr({
						"tapada": "false",
						"draggable": "true"
					});
				}
				this.CartaDrag.appendTo(this.UltimoHijo($(e.originalEvent.target)));
				GM = true;
			}
			UH = this.UltimoHijo($("Baraja[num='2']"));
			$("Baraja[num='2'] Carta[draggable]").removeAttr("draggable");
			if (typeof (UH.attr("num")) === "undefined") {
				this.UltimoHijo($("Baraja[num='2']")).attr({
					"draggable": "true"
				});
			}
			if (GM === true) {
				this.GuardarMovimiento();
			}
		}
		e.preventDefault();
		e.stopPropagation();
		return false;
	};
	this.CartaValida = function (Carta, Destino) {
		if (typeof (Destino.attr("num")) !== "undefined" && parseInt(Carta.attr("valor")) === 12) {
			return true;
		}
		if (Destino.attr("tapada") === true) {
			return false;
		}
		if (parseInt(Carta.attr("valor")) === parseInt(Destino.attr("valor")) - 1) {
			if (parseInt(Carta.attr("palo")) > 2) {
				if (parseInt(Destino.attr("palo")) < 3) {
					return true;
				}
			}
			else {
				if (parseInt(Destino.attr("palo")) > 2) {
					return true;
				}
			}
		}
		return false;
	};
	this.UltimoHijo = function (nPadre) {
		Cartas = nPadre.find(":last-child");
		if (Cartas.length == 0) return nPadre;
		return $(Cartas[Cartas.length - 1]);
	};
	this.Victoria = function () {
		return ($("Columna Carta[tapada='true']").length > 0) ? false : true;
	}
	this.GuardarMovimiento = function () {
		$("Carta, Solucion, Baraja, Columna").removeAttr("ayuda1").removeAttr("ayuda2");
		var DH = [];
		DH["Baraja1"] = $("Baraja[num='1']").html();
		DH["Baraja2"] = $("Baraja[num='2']").html();
		DH["Solucion1"] = $("Solucion[num='1']").html();
		DH["Solucion2"] = $("Solucion[num='2']").html();
		DH["Solucion3"] = $("Solucion[num='3']").html();
		DH["Solucion4"] = $("Solucion[num='4']").html();
		DH["Columna1"] = $("Columna[num='1']").html();
		DH["Columna2"] = $("Columna[num='2']").html();
		DH["Columna3"] = $("Columna[num='3']").html();
		DH["Columna4"] = $("Columna[num='4']").html();
		DH["Columna5"] = $("Columna[num='5']").html();
		DH["Columna6"] = $("Columna[num='6']").html();
		DH["Columna7"] = $("Columna[num='7']").html();
		this.Movimientos[this.Movimiento++] = DH;
		$("movimientos").html(this.Movimiento - 1);
		/* Miramos si se ha ganado o perdido la partida */
		var V = this.Victoria();
		$("Derrota").css({
			"display": (this.Ayuda() === false && V !== true) ? "block" : "none"
		});
		$("Victoria").css({
			"display": (V === true) ? "block" : "none"
		});
	};
	this.Rehacer = function (e) {
		if (this.Movimiento < this.Movimientos.length) {
			var DH = this.Movimientos[this.Movimiento++];
			$("Baraja[num='1']").html(DH["Baraja1"]);
			$("Baraja[num='2']").html(DH["Baraja2"]);
			$("Solucion[num='1']").html(DH["Solucion1"]);
			$("Solucion[num='2']").html(DH["Solucion2"]);
			$("Solucion[num='3']").html(DH["Solucion3"]);
			$("Solucion[num='4']").html(DH["Solucion4"]);
			$("Columna[num='1']").html(DH["Columna1"]);
			$("Columna[num='2']").html(DH["Columna2"]);
			$("Columna[num='3']").html(DH["Columna3"]);
			$("Columna[num='4']").html(DH["Columna4"]);
			$("Columna[num='5']").html(DH["Columna5"]);
			$("Columna[num='6']").html(DH["Columna6"]);
			$("Columna[num='7']").html(DH["Columna7"]);
			$("Carta").css({
				opacity: 1
			}).removeAttr("hover");
			/* Re-asignamos los eventos */
			$("Carta").off("mouseover").on('mouseover', this.Carta_EventoMouseOver.bind(this));
			$("Carta").off("mouseout").on('mouseout', this.Carta_EventoMouseOut.bind(this));
			$("Carta").off("dragstart").on('dragstart', this.Carta_EventoDragStart.bind(this));
			$("Carta").off("dragend").on('dragend', this.Carta_EventoDragEnd.bind(this));
			$("Carta").off("dblclick").on('dblclick', this.Carta_EventoDblClick.bind(this));
		}
		$("movimientos").html(this.Movimiento - 1);
		$("Derrota").css({
			"display": (this.Ayuda() === false) ? "block" : "none"
		});
		$("Victoria").css({
			"display": (this.Victoria() === true) ? "block" : "none"
		});
	};
	this.Deshacer = function (e) {
		if (this.Movimiento !== 1) {
			var DH = this.Movimientos[--this.Movimiento - 1];
			$("Baraja[num='1']").html(DH["Baraja1"]);
			$("Baraja[num='2']").html(DH["Baraja2"]);
			$("Solucion[num='1']").html(DH["Solucion1"]);
			$("Solucion[num='2']").html(DH["Solucion2"]);
			$("Solucion[num='3']").html(DH["Solucion3"]);
			$("Solucion[num='4']").html(DH["Solucion4"]);
			$("Columna[num='1']").html(DH["Columna1"]);
			$("Columna[num='2']").html(DH["Columna2"]);
			$("Columna[num='3']").html(DH["Columna3"]);
			$("Columna[num='4']").html(DH["Columna4"]);
			$("Columna[num='5']").html(DH["Columna5"]);
			$("Columna[num='6']").html(DH["Columna6"]);
			$("Columna[num='7']").html(DH["Columna7"]);
			$("Carta").css({
				opacity: 1
			}).removeAttr("hover");
			/* Re-asignamos los eventos */
			$("Carta").off("mouseover").on('mouseover', this.Carta_EventoMouseOver.bind(this));
			$("Carta").off("mouseout").on('mouseout', this.Carta_EventoMouseOut.bind(this));
			$("Carta").off("dragstart").on('dragstart', this.Carta_EventoDragStart.bind(this));
			$("Carta").off("dragend").on('dragend', this.Carta_EventoDragEnd.bind(this));
			$("Carta").off("dblclick").on('dblclick', this.Carta_EventoDblClick.bind(this));
			$("movimientos").html(this.Movimiento - 1);
		}
		$("Derrota").css({
			"display": (this.Ayuda() === false) ? "block" : "none"
		});
		$("Victoria").css({
			"display": (this.Victoria() === true) ? "block" : "none"
		});
	};
	this.Ayuda = function (e) {
		var Solucion = [];
		var Baraja = [];
		var Columna = [];
		Solucion[1] = this.UltimoHijo($("Solucion[num='1']"));
		Solucion[2] = this.UltimoHijo($("Solucion[num='2']"));
		Solucion[3] = this.UltimoHijo($("Solucion[num='3']"));
		Solucion[4] = this.UltimoHijo($("Solucion[num='4']"));
		Baraja[1] = this.UltimoHijo($("Baraja[num='1']"));
		Baraja[2] = this.UltimoHijo($("Baraja[num='2']"));
		/* OJO porque también existe la columna 0 que se usa exclusivamente para las imagenes del drag & drop, no hay que tenerla en cuenta */
		Columna[1] = this.UltimoHijo($("Columna[num='1']"));
		Columna[2] = this.UltimoHijo($("Columna[num='2']"));
		Columna[3] = this.UltimoHijo($("Columna[num='3']"));
		Columna[4] = this.UltimoHijo($("Columna[num='4']"));
		Columna[5] = this.UltimoHijo($("Columna[num='5']"));
		Columna[6] = this.UltimoHijo($("Columna[num='6']"));
		Columna[7] = this.UltimoHijo($("Columna[num='7']"));
		/* Array con los posibles movimientos Origen -> Destino, y con una valoración en puntos. */
		this.MovimientosAuyda = new Array();
		this.MovimientosAuydaActual = 0;
		this.MovimientosAuyda.push({
			origen: $("Baraja[num='1']"),
			destino: $("Baraja[num='2']"),
			valor: 0
		});
		if (Baraja[2].prop("tagName") === "CARTA") {
			for (i = 1; i < 5; i++) {
				Valor = (Solucion[i].prop("tagName") === "CARTA") ? parseInt(Solucion[i].attr("valor")) : -1;
				Palo = (Solucion[i].prop("tagName") === "CARTA") ? Solucion[i].attr("palo") : Baraja[2].attr("palo");
				if (Valor + 1 === parseInt(Baraja[2].attr("valor")) && Palo === Baraja[2].attr("palo")) {
					this.MovimientosAuyda.push({
						origen: Baraja[2],
						destino: Solucion[i],
						valor: 150 - ((Valor + 1) * 10)
					});
				}
			}
		}
		for (c = 7; c > 0; c--) {
			for (i = 1; i < 5; i++) {
				Valor = (Solucion[i].prop("tagName") === "CARTA") ? parseInt(Solucion[i].attr("valor")) : -1;
				Palo = (Solucion[i].prop("tagName") === "CARTA") ? Solucion[i].attr("palo") : Columna[c].attr("palo");
				if (Valor + 1 === parseInt(Columna[c].attr("valor")) && Palo === Columna[c].attr("palo")) {
					this.MovimientosAuyda.push({
						origen: Columna[c],
						destino: Solucion[i],
						valor: 150 - ((Valor + 1) * 10)
					});
				}
			}
		}
		for (c = 7; c > 0; c--) {
			Carta = this.UltimoHijo(Columna[c]);
			if (Carta.prop("tagName") === "CARTA") {
				Padres = 1;
				do {
					for (c2 = 7; c2 > 0; c2--) {
						CC = this.UltimoHijo(Columna[c2]);
						Valor = (CC.prop("tagName") === "CARTA") ? parseInt(CC.attr("valor")) : -1;
						Palo = (CC.prop("tagName") === "CARTA") ? CC.attr("palo") : Carta.attr("palo");
						if (this.CartaValida(Carta, CC)) {
							if (Carta.parent().attr("tapada") === "true" || Carta.parent().prop("tagName") !== "CARTA") {
								if (parseInt(Carta.attr("valor")) === 12 && CC.prop("tagName") === "COLUMNA" && Carta.parent().prop("tagName") === "COLUMNA") { } else {
									this.MovimientosAuyda.push({
										origen: Carta,
										destino: CC,
										valor: 10 * Padres
									});
								}
							}
						}
					}
					Carta = Carta.parent();
					Padres++;
				} while (Carta.attr("tapada") !== "true" && Carta.prop("tagName") === "CARTA");
			}
		}
		if (Baraja[2].prop("tagName") === "CARTA") {
			for (c = 7; c > 0; c--) {
				CC = this.UltimoHijo(Columna[c]);
				Valor = (CC.prop("tagName") === "CARTA") ? CC.attr("valor") : -1;
				Palo = (CC.prop("tagName") === "CARTA") ? CC.attr("palo") : Baraja[2].attr("palo");
				if (this.CartaValida(Baraja[2], CC)) {
					this.MovimientosAuyda.push({
						origen: Baraja[2],
						destino: CC,
						valor: 10
					});
				}
			}
		}
		/* Ordeno el array de movimientos posibles por su valor */
		this.MovimientosAuyda.sort(function (a, b) {
			var a1 = a.valor,
				b1 = b.valor;
			if (a1 === b1) return 0;
			return (a1 < b1) ? 1 : -1;
		});
		/* Para depurar la IA he decidido que lo mejor es mostrar los movimientos de cada turno de forma eficiente 
		 * además de contar con un experto anónimo local para mejorar la IA del juego hasta donde mis habilidades lo permitan */
		var DebugIA = $("DebugIA");
		var DebugHTML = "<ul>";
		var ValoresCartas = Array("A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K")
		for (d = 0; d < this.MovimientosAuyda.length; d++) {
			var OrigenPalo = this.MovimientosAuyda[d].origen.attr("palo");
			var OrigenValor = this.MovimientosAuyda[d].origen.attr("valor");
			var DestinoPalo = this.MovimientosAuyda[d].destino.attr("palo");
			var DestinoValor = this.MovimientosAuyda[d].destino.attr("valor");
			DebugHTML += "<li>" + "<palo num= '" + OrigenPalo + "'> " + ValoresCartas[OrigenValor] + " -&gt; " + DestinoPalo + "'> " + ValoresCartas[DestinoValor] + "</li>"
		}
		DebugHTML += "</ul>"
		DebugIA.html(DebugHTML);
		/* Si solo hay un movimiento posible miramos los movimientos posibles que quedan en la baraja 
		 * para comprobar si se ha perdido la partida. */
		if (this.MovimientosAuyda.length === 1) {
			/* Movimientos posibles de la baraja a las columnas */
			for (b = 1; b < 3; b++) {
				Carta = Baraja[b];
				do {
					for (c = 7; c > 0; c--) {
						if (this.CartaValida(Carta, Columna[c])) {
							return true; /* Aun se pueden poner cartas en los mazos de las columnas */
						}
					}
					Carta = Carta.parent();
				} while (Carta.prop("tagName") === "CARTA");
			}
			/* Movimientos posibles de la baraja a las soluciones */
			for (b = 1; b < 3; b++) {
				Carta = Baraja[b];
				do {
					for (s = 1; s < 5; s++) {
						Valor = (Solucion[s].prop("tagName") === "CARTA") ? parseInt(Solucion[s].attr("valor")) : -1;
						Palo = (Solucion[s].prop("tagName") === "CARTA") ? Solucion[s].attr("palo") : Carta.attr("palo");
						if (Valor + 1 === parseInt(Carta.attr("valor")) && Palo === Carta.attr("palo")) {
							return true; /* Aun se pueden poner cartas en los mazos de las soluciones */
						}
					}
					Carta = Carta.parent();
				} while (Carta.prop("tagName") === "CARTA");
			}
			return false; /* No quedan movimientos posibles */
		}
		return true;
	};
};
var panzoom = (function () {
	const MIN_SCALE = 0.35;
	var txStart;
	var tyStart;
	var xStart;
	var yStart;
	var panning = false;
	var couldBePanning = false;
	var totalMaxDelta;
	function initPanZoom(id) {
		let map = document.getElementById(id);
		map.setAttribute("transform", `translate(0,0) scale(${MIN_SCALE})`);
		map.addEventListener("wheel", ev => {
			onwheel(ev, map);
		});
		map.addEventListener("pointerdown", ev => {
			onmousedown(ev);
		});
		addEventListener("mouseup", ev => {
			onmouseup(ev, map);
		});
		addEventListener("mousemove", ev => {
			onmousemove(ev, map);
		});
		addEventListener("dblclick", ev => reset(ev, map));
	}
	function onwheel(ev, board) {
		let delta = ev.wheelDelta;
		let z = delta < 0 ? 0.5 : 2;
		let dir = Math.sign(delta);
		let currentMouseX = ev.offsetX;
		let currentMouseY = ev.offsetY;
		let transOld = getTransformInfo(board);
		let getLeft = transOld.translateX;
		let getTop = transOld.translateY;
		let scale = transOld.scale;
		if (scale <= MIN_SCALE + 0.1 && dir < 0) return;
		let dx = (currentMouseX - getLeft) * (z - 1);
		let dy = (currentMouseY - getTop) * (z - 1);
		let scaleNew = scale * z;
		let txNew = getLeft - dx;
		let tyNew = getTop - dy;
		const MIN_TX = -(3400 * scaleNew - 3400 * MIN_SCALE);
		const MIN_TY = -(2200 * scaleNew - 2200 * MIN_SCALE);
		txNew = Math.min(txNew, 0);
		txNew = Math.max(txNew, MIN_TX);
		tyNew = Math.min(tyNew, 0);
		tyNew = Math.max(tyNew, MIN_TY);
		let transNew = `translate(${txNew},${tyNew}) scale(${scaleNew})`;
		board.setAttribute("transform", transNew);
		transNew = getTransformInfo(board);
		ev.preventDefault();
	}
	function reset(ev, board) {
		let map = ev.target;
		let transNew = `translate(0,0) scale(${MIN_SCALE})`;
		board.setAttribute("transform", transNew);
	}
	function onmousedown(ev) {
		let map = ev.target;
		let board = ev.path[1];
		let x = ev.screenX;
		let y = ev.screenY;
		let transOld = getTransformInfo(board);
		let scale = transOld.scale;
		if (scale <= MIN_SCALE + 0.1) return;
		xStart = x;
		yStart = y;
		txStart = transOld.translateX;
		tyStart = transOld.translateY;
		totalMaxDelta = 0;
		couldBePanning = true;
	}
	function onmousemove(ev, board) {
		let id = ev.target.id;
		if (id != "imgMap" && id != "mapG") {
			couldBePanning = false;
			panning = false;
			return;
		}
		if (couldBePanning) {
			let x = Math.abs(ev.screenX - xStart);
			let y = Math.abs(ev.screenY - yStart);
			totalMaxDelta += Math.max(x, y);
			if (totalMaxDelta > 10) {
				panning = true;
				couldBePanning = false;
				board.setPointerCapture(true);
				ev.preventDefault();
			}
		} else if (panning) {
			let x = ev.screenX;
			let y = ev.screenY;
			let transOld = getTransformInfo(board);
			let tx = transOld.translateX;
			let ty = transOld.translateY;
			let scale = transOld.scale;
			let txNew = txStart + x - xStart;
			let tyNew = tyStart + y - yStart;
			const MIN_TX = -(3400 * scale - 3400 * MIN_SCALE);
			const MIN_TY = -(2200 * scale - 2200 * MIN_SCALE);
			txNew = Math.min(txNew, 0);
			txNew = Math.max(txNew, MIN_TX);
			tyNew = Math.min(tyNew, 0);
			tyNew = Math.max(tyNew, MIN_TY);
			let transNew = `translate(${txNew},${tyNew}) scale(${scale})`;
			board.setAttribute("transform", transNew);
		}
	}
	function onmouseup(ev, board) {
		if (panning) {
			let map = ev.target;
			let x = ev.screenX;
			let y = ev.screenY;
			let transOld = getTransformInfo(board);
			let tx = transOld.translateX;
			let ty = transOld.translateY;
			let scale = transOld.scale;
			let txNew = txStart + x - xStart;
			let tyNew = tyStart + y - yStart;
			const MIN_TX = -(3400 * scale - 3400 * MIN_SCALE);
			const MIN_TY = -(2200 * scale - 2200 * MIN_SCALE);
			txNew = Math.min(txNew, 0);
			txNew = Math.max(txNew, MIN_TX);
			tyNew = Math.min(tyNew, 0);
			tyNew = Math.max(tyNew, MIN_TY);
			let transNew = `translate(${txNew},${tyNew}) scale(${scale})`;
			board.setAttribute("transform", transNew);
			board.releasePointerCapture(true);
			panning = false;
		} else couldBePanning = false;
	}
	return function (id) { initPanZoom(id); }
})();
var unitTestId = 0;
var UIDHelpers = 0;
var UIDCounter = 0;
var Epsilon = 1e-10;
var sheet = (function () {
	var style = document.createElement('style');
	style.appendChild(document.createTextNode(''));
	document.head.appendChild(style);
	return style.sheet;
})();
var countries = [
	'Afghanistan',
	'Albania',
	'Algeria',
	'Andorra',
	'Angola',
	'Anguilla',
	'Antigua & Barbuda',
	'Argentina',
	'Armenia',
	'Aruba',
	'Australia',
	'Austria',
	'Azerbaijan',
	'Bahamas',
	'Bahrain',
	'Bangladesh',
	'Barbados',
	'Belarus',
	'Belgium',
	'Belize',
	'Benin',
	'Bermuda',
	'Bhutan',
	'Bolivia',
	'Bosnia & Herzegovina',
	'Botswana',
	'Brazil',
	'British Virgin Islands',
	'Brunei',
	'Bulgaria',
	'Burkina Faso',
	'Burundi',
	'Cambodia',
	'Cameroon',
	'Canada',
	'Cape Verde',
	'Cayman Islands',
	'Central Arfrican Republic',
	'Chad',
	'Chile',
	'China',
	'Colombia',
	'Congo',
	'Cook Islands',
	'Costa Rica',
	'Cote D Ivoire',
	'Croatia',
	'Cuba',
	'Curacao',
	'Cyprus',
	'Czech Republic',
	'Denmark',
	'Djibouti',
	'Dominica',
	'Dominican Republic',
	'Ecuador',
	'Egypt',
	'El Salvador',
	'Equatorial Guinea',
	'Eritrea',
	'Estonia',
	'Ethiopia',
	'Falkland Islands',
	'Faroe Islands',
	'Fiji',
	'Finland',
	'France',
	'French Polynesia',
	'French West Indies',
	'Gabon',
	'Gambia',
	'Georgia',
	'Germany',
	'Ghana',
	'Gibraltar',
	'Greece',
	'Greenland',
	'Grenada',
	'Guam',
	'Guatemala',
	'Guernsey',
	'Guinea',
	'Guinea Bissau',
	'Guyana',
	'Haiti',
	'Honduras',
	'Hong Kong',
	'Hungary',
	'Iceland',
	'India',
	'Indonesia',
	'Iran',
	'Iraq',
	'Ireland',
	'Isle of Man',
	'Israel',
	'Italy',
	'Jamaica',
	'Japan',
	'Jersey',
	'Jordan',
	'Kazakhstan',
	'Kenya',
	'Kiribati',
	'Kosovo',
	'Kuwait',
	'Kyrgyzstan',
	'Laos',
	'Latvia',
	'Lebanon',
	'Lesotho',
	'Liberia',
	'Libya',
	'Liechtenstein',
	'Lithuania',
	'Luxembourg',
	'Macau',
	'Macedonia',
	'Madagascar',
	'Malawi',
	'Malaysia',
	'Maldives',
	'Mali',
	'Malta',
	'Marshall Islands',
	'Mauritania',
	'Mauritius',
	'Mexico',
	'Micronesia',
	'Moldova',
	'Monaco',
	'Mongolia',
	'Montenegro',
	'Montserrat',
	'Morocco',
	'Mozambique',
	'Myanmar',
	'Namibia',
	'Nauro',
	'Nepal',
	'Netherlands',
	'Netherlands Antilles',
	'New Caledonia',
	'New Zealand',
	'Nicaragua',
	'Niger',
	'Nigeria',
	'North Korea',
	'Norway',
	'Oman',
	'Pakistan',
	'Palau',
	'Palestine',
	'Panama',
	'Papua New Guinea',
	'Paraguay',
	'Peru',
	'Philippines',
	'Poland',
	'Portugal',
	'Puerto Rico',
	'Qatar',
	'Reunion',
	'Romania',
	'Russia',
	'Rwanda',
	'Saint Pierre & Miquelon',
	'Samoa',
	'San Marino',
	'Sao Tome and Principe',
	'Saudi Arabia',
	'Senegal',
	'Serbia',
	'Seychelles',
	'Sierra Leone',
	'Singapore',
	'Slovakia',
	'Slovenia',
	'Solomon Islands',
	'Somalia',
	'South Africa',
	'South Korea',
	'South Sudan',
	'Spain',
	'Sri Lanka',
	'St Kitts & Nevis',
	'St Lucia',
	'St Vincent',
	'Sudan',
	'Suriname',
	'Swaziland',
	'Sweden',
	'Switzerland',
	'Syria',
	'Taiwan',
	'Tajikistan',
	'Tanzania',
	'Thailand',
	"Timor L'Este",
	'Togo',
	'Tonga',
	'Trinidad & Tobago',
	'Tunisia',
	'Turkey',
	'Turkmenistan',
	'Turks & Caicos',
	'Tuvalu',
	'Uganda',
	'Ukraine',
	'United Arab Emirates',
	'United Kingdom',
	'United States of America',
	'Uruguay',
	'Uzbekistan',
	'Vanuatu',
	'Vatican City',
	'Venezuela',
	'Vietnam',
	'Virgin Islands (US)',
	'Yemen',
	'Zambia',
	'Zimbabwe'
];
var extend = function () {
	var extended = {};
	var deep = false;
	var i = 0;
	if (typeof arguments[0] === 'boolean') {
		deep = arguments[0];
		i++;
	}
	var merge = function (obj) {
		for (var prop in obj) {
			if (obj.hasOwnProperty(prop)) {
				if (deep && Object.prototype.toString.call(obj[prop]) === '[object Object]') {
					extended[prop] = extend(true, extended[prop], obj[prop]);
				} else {
					extended[prop] = obj[prop];
				}
			}
		}
	};
	for (; i < arguments.length; i++) {
		merge(arguments[i]);
	}
	return extended;
};
var palette = null;
var activatedTests = [];
var visualStructures = {};
var UID = 0;
var PLAYER_UPDATE_BEHAVIOR = [];
var PLAYER_UPDATE_VISUALIZATION = [];
var TABLE_UPDATE_BEHAVIOR = [];
var TABLE_UPDATE_VISUALIZATION = [];
var TABLE_UPDATE = {};
var PLAYER_UPDATE = {};
var modern_palettes = {
	CD_green_blue: { GreenMountain: '#3d7c47', BlueMountain: '#09868b', LightBlueBackdrop: '#76c1d4', BarelyGrayEdge: '#f7f7f7' },
	CD_gelb_orange_grau: { Blueberry: '#6B7A8F', Apricot: '#F7882F', Citrus: '#F7C331', AppleCore: ' #DCC7AA' },
	CD_blue_brown: { FrenchLaundryBlue: '#3a4660', ComfortablyTan: '#c9af98', PeachyKreme: '#ed8a63', BrownBonnet: '#845007' },
	CD_yellow_grey: { Areyayellow: '#feda6a', SilverFox: '#d4d4dc', DeepMatteGrey: '#393f4d' },
	CD_fresh_green_grey_yellow: { MorningSky: '#CAE4DB', Honey: '#DCAE1D', Cerulean: '#00303F', Mist: '#7A9D96' },
	CD_green_beige: { green: '#BFEB55', green2: '#458766', beige: '#F9F68A', beige2: '#FBF1B4' },
	CD_dark_beach: { c1: 'rgb(3, 74, 166)', c2: 'rgb(0, 6, 13)', c3: 'rgb(83, 119, 166)', c4: 'rgb(64, 95, 115)', c5: 'rgb(62, 89, 86)' },
	CD_color_beach: { c1: 'rgb(83, 111, 166)', c2: 'rgb(3, 74, 166)', c3: 'rgb(126, 174, 217)', c4: 'rgb(242, 181, 107)', c5: 'rgb(4, 173, 191)' }
};
var blues = [
	'#f7fbff',
	'#ecf4fc',
	'#e2eef8',
	'#d8e7f5',
	'#cde0f1',
	'#c0d9ed',
	'#b0d2e8',
	'#9fc9e2',
	'#8bbfdd',
	'#77b4d8',
	'#63a8d2',
	'#529ccc',
	'#4190c5',
	'#3382be',
	'#2575b6',
	'#1a67ad',
	'#1059a1',
	'#0a4c92',
	'#083e7f',
	'#08306b'
];
var green = [
	'#f7fcf5',
	'#eff9ec',
	'#e7f6e2',
	'#dcf1d7',
	'#d0edca',
	'#c2e7bc',
	'#b3e0ac',
	'#a2d99d',
	'#90d18d',
	'#7dc87f',
	'#69be72',
	'#55b466',
	'#42a85c',
	'#339c52',
	'#268f47',
	'#18823d',
	'#0c7433',
	'#03652a',
	'#005522',
	'#00441b'
];
var greys = [
	'#ffffff',
	'#f9f9f9',
	'#f2f2f2',
	'#e9e9e9',
	'#e0e0e0',
	'#d5d5d5',
	'#cacaca',
	'#bdbdbd',
	'#aeaeae',
	'#9f9f9f',
	'#8f8f8f',
	'#808080',
	'#727272',
	'#636363',
	'#545454',
	'#434343',
	'#313131',
	'#202020',
	'#101010',
	'#000000'
];
var oranges = [
	'#fff5eb',
	'#ffefdf',
	'#fee8d1',
	'#fee0c1',
	'#fdd6af',
	'#fdcb9b',
	'#fdbe85',
	'#fdb06f',
	'#fda25a',
	'#fc9446',
	'#f98534',
	'#f57623',
	'#ee6815',
	'#e55a0b',
	'#d84d05',
	'#c84303',
	'#b43b02',
	'#a13403',
	'#902d04',
	'#7f2704'
];
var purples = [
	'#fcfbfd',
	'#f6f5fa',
	'#f0eff6',
	'#e9e8f2',
	'#e0dfee',
	'#d6d6e9',
	'#cacae3',
	'#bebedc',
	'#b1b0d4',
	'#a4a2cd',
	'#9894c6',
	'#8b87bf',
	'#8079b8',
	'#7668af',
	'#6c56a6',
	'#63449d',
	'#5a3294',
	'#51218c',
	'#481085',
	'#3f007d'
];
var bluegreen = [
	'#f7fcfd',
	'#eff9fb',
	'#e7f6f8',
	'#def2f3',
	'#d2eeeb',
	'#c4e9e2',
	'#b1e1d6',
	'#9cd9c9',
	'#86d0bb',
	'#72c7ab',
	'#5fbe9a',
	'#4fb587',
	'#40aa73',
	'#339d5f',
	'#268f4d',
	'#18823e',
	'#0c7433',
	'#03652a',
	'#005522',
	'#00441b'
];
var bluepurple = [
	'#f7fcfd',
	'#edf5f9',
	'#e3eef5',
	'#d7e5f0',
	'#c9dbeb',
	'#bcd1e5',
	'#aec7e0',
	'#a2bbd9',
	'#98add2',
	'#919eca',
	'#8d8dc1',
	'#8c7bb9',
	'#8b69b0',
	'#8a57a7',
	'#88449e',
	'#853192',
	'#801e84',
	'#741073',
	'#62075f',
	'#4d004b'
];
var cubehelix = [
	'#000000',
	'#130918',
	'#1a1732',
	'#192a47',
	'#15414e',
	'#17584a',
	'#246b3d',
	'#3f7632',
	'#647a30',
	'#8d7a3c',
	'#b17959',
	'#ca7b81',
	'#d485ac',
	'#d296d1',
	'#c9ade9',
	'#c2c5f3',
	'#c3dbf2',
	'#d0ecef',
	'#e6f7f1',
	'#ffffff'
];
var inferno = [
	'#000004',
	'#08051d',
	'#180c3c',
	'#2f0a5b',
	'#450a69',
	'#5c126e',
	'#71196e',
	'#87216b',
	'#9b2964',
	'#b1325a',
	'#c43c4e',
	'#d74b3f',
	'#e55c30',
	'#f1711f',
	'#f8870e',
	'#fca108',
	'#fbba1f',
	'#f6d543',
	'#f1ed71',
	'#fcffa4'
];
var magma = [
	'#000004',
	'#07061c',
	'#150e38',
	'#29115a',
	'#3f0f72',
	'#56147d',
	'#6a1c81',
	'#802582',
	'#942c80',
	'#ab337c',
	'#c03a76',
	'#d6456c',
	'#e85362',
	'#f4695c',
	'#fa815f',
	'#fd9b6b',
	'#feb47b',
	'#fecd90',
	'#fde5a7',
	'#fcfdbf'
];
var purplegreen = [
	'#40004b',
	'#5c1768',
	'#753283',
	'#8a529a',
	'#9e74ae',
	'#b391c1',
	'#c7acd2',
	'#dac4e0',
	'#e9daea',
	'#f0ebf0',
	'#ecf2ea',
	'#def0d9',
	'#c8e8c2',
	'#acdca7',
	'#89c988',
	'#64b26a',
	'#409750',
	'#237b3b',
	'#0f5f2a',
	'#00441b'
];
var NAMED_UIDS = {};
var colorDict = null;
var palDict = {};
const AREAS = {};
const MSCATS = { rect: 'g', g: 'g', circle: 'g', text: 'g', polygon: 'g', line: 'g', body: 'd', svg: 'd', div: 'd', p: 'd', table: 'd', button: 'd', a: 'd', span: 'd', image: 'd', paragraph: 'd', anchor: 'd' };
var DEFAULT_OBJECT_AREA = 'area_objects';
var DEFAULT_PLAYER_AREA = 'area_players';
var dHelp, counters, timit;
var TT_JUST_UPDATED = -1;
var x = {
	"loc":
	{
		"actions":
		{
			"_set":
				[{
					"_tuple":
						[{
							"_set":
								[{ "ID": "91", "val": "Corner[91]", "type": "obj" },
								{ "ID": "92", "val": "Corner[92]", "type": "obj" },
								{ "ID": "93", "val": "Corner[93]", "type": "obj" },
								{ "ID": "94", "val": "Corner[94]", "type": "obj" },
								{ "ID": "95", "val": "Corner[95]", "type": "obj" },
								]
						}]
				}]
		}
	}
}
var maxZIndex = 110;
var USERNAME = 'felix';
var GAME = 'ttt';
var S = {}, Z, U = null, PL, G, UI = {}, Users, Tables, Basepath, Serverdata = {}, Clientdata = {};
var DELETED_IDS = [];
var DELETED_THIS_ROUND = [];
var ROOT = null;
var cnt = 0;
var choiceCompleted = false;
var frozen = false;
var boatFilters = [];
var boatHighlighted = null;
var exp = expand1_99;
var socket = null;
var loggedIn = false;
var scenarioQ = [];
var scenarioRunning = false;
var collections = {};
var elements = {};
var symbols = {
	knight: 'user-secret',
	victory_point: 'trophy',
	road_building: 'road',
	monopoly: 'umbrella',
	year_of_plenty: 'tree',
};
var symbolColors = {
	knight: 'red',
	victory_point: 'gold',
	road_building: 'dimgray',
	monopoly: 'violet',
	year_of_plenty: 'green',
};
var ibox4oid = {};
var COND = {};
var FUNCS = {};
var allAreas = {};
var areaSubTypes = {};
var vidCache, allGames, playerConfig, c52, C52, cinno, testCards;
var mkMan = null
var allGamesC = null;
var playerConfigC = null;
var iconCharsC = null;
var c52C = null;
var testCardsC = null
var allGames = null;
var playerConfig = null;
var iconChars = null;
var defaultSpecC = null;
var userSpecC = null;
var userCodeC = null;
var initialDataC = {};
var serverDataC = null;
var defaultSpec = null
var userSpec = null;
var userCode = null;
var serverData = null;
var mappings;
var mappingsInitialized;
var mappingTypes;
var LOG = {};
var LOGDIVS = [];
var prevGamePlid = null;
var prevWaitingFor = null;
var t_total = 0;
var PREFERRED_CARD_HEIGHT = 0;
var magCounter = 0;
var evAddCounter = 0;
var TABLE_CREATE = {};
var PLAYER_CREATE = {};
var V = {};
var BINDINGS = {}
var logCounter = 0;
var testCounter = 100;
var bodyZoom = 1.0;
var browserZoom = Math.round(window.devicePixelRatio * 100);
var iTHEME = 0;
var WAITINGFORPLAYER = null;
var flags = {};
var UPD = {};
var PRES = {};
var DONE = {};
var cards1 = {
	'c1':
	{
		desc: "Move the Robber. Steal 1 resource card from the owner of an adjacent settlement or city.",
		name: "Knight",
		obj_type: "devcard",
		visible: { _set: ["White", "Red", "Blue", "Orange"] },
	},
	'c2':
	{
		desc: "1 Victory Point!",
		name: "Victory Point",
		obj_type: "devcard",
		visible: { _set: ["White", "Red", "Blue", "Orange"] },
	},
	'c3':
	{
		desc: "Take any 2 resources from the bank. Add them to your hand. They can be 2 of the same or 2 different resources.",
		name: "Year of Plenty",
		obj_type: "devcard",
		visible: { _set: ["White", "Red", "Blue", "Orange"] },
	},
	'c4':
	{
		desc: "Place 2 new roads as if you had just built them.",
		name: "Road Building",
		obj_type: "devcard",
		visible: { _set: ["White", "Red", "Blue", "Orange"] },
	},
	'c5':
	{
		desc: "When you play this card, announce 1 type of resource. All other players must give you all their resource cards of that type.",
		name: "Monopoly",
		obj_type: "devcard",
		visible: { _set: ["White", "Red", "Blue", "Orange"] },
	},
};
var card1 = cards1['c1'];
var justExpand = false;
var dragStartOffset;
var draggedElement;
var dropPosition = 'none';
var startBoats = ['93', '99', '109', '121', '124', '116', '106', '111', '116', '129'];
var allGames1 = {
	ttt: {
		name: 'TicTacToe',
		long_name: 'Tic-Tac-Toe',
		short_name: 'ttt',
		num_players: [2],
		player_names: ['Player1', 'Player2'],
	},
	s1: {
		name: 's1',
		long_name: 's1',
		short_name: 's1',
		num_players: [2, 3, 4, 5],
		player_names: ['Player1', 'Player2', 'Player3', 'Player4', 'Player5'],
	},
	starter: {
		name: 'Starter',
		long_name: 'Starter',
		short_name: 'starter',
		num_players: [2],
		player_names: ['Player1', 'Player2'],
	},
	catan: {
		name: 'Catan',
		long_name: 'The Settlers of Catan',
		short_name: 'catan',
		num_players: [3, 4],
		player_names: ['White', 'Red', 'Blue', 'Orange'],
	},
	aristocracy: {
		name: 'Aristocracy',
		long_name: 'Aristocracy',
		short_name: 'aristocracy',
		num_players: [2, 3, 4, 5],
		player_names: ['Player1', 'Player2', 'Player3', 'Player4', 'Player5'],
	}
};
var numPlayersMin = 0;
var numPlayersMax = 8;
var currentSeed;
var currentGamename;
var currentPlaymode;
var currentNumPlayers;
var joinCandidate = null;
var commandChain = [];
var firstDomLoad = null;
var faChars, gaChars, faKeys;
var DEF_LIST_TYPE = 'dom';
var DEF_ITEM_TYPE = 'dom';
var DEF_DOM_TAG = 'div';
var PLAYMODE = 'hotseat';
var SEED = 1;
var S_tooltips = 'OFF';
var S_openTab = 'CodeTab';
var S_useSimpleCode = false;
var S_userSettings = true;
var S_userStructures = true;
var S_userBehaviors = true;
var S_autoplay = false;
var S_showEvents = false;
var S_AIThinkingTime = 30;
var S_autoplayFunction = (_g) => false;
var S_boardDetection = true;
var S_deckDetection = true;
var S_useColorHintForProperties = true;
var S_useColorHintForObjects = true;
var S_defaultObjectArea = 'a_d_objects';
var S_defaultPlayerArea = 'a_d_players';
var view = null;
var isReallyMultiplayer = false;
var gcs = {
	ttt: {
		numPlayers: 2,
		players: [
			{ id: 'Player1', playerType: 'me', agentType: null, username: USERNAME },
			{ id: 'Player2', playerType: 'me', agentType: null, username: USERNAME + '1' },
		]
	},
	s1: {
		numPlayers: 4,
		players: [
			{ id: 'Player1', playerType: 'me', agentType: null, username: USERNAME },
			{ id: 'Player2', playerType: 'me', agentType: null, username: USERNAME + '1' },
			{ id: 'Player3', playerType: 'me', agentType: null, username: USERNAME + '2' },
			{ id: 'Player4', playerType: 'me', agentType: null, username: USERNAME + '3' },
		]
	},
	starter: {
		numPlayers: 2,
		players: [
			{ id: 'Player1', playerType: 'me', agentType: null, username: USERNAME },
			{ id: 'Player2', playerType: 'me', agentType: null, username: USERNAME + '1' },
		]
	},
	aristocracy: {
		numPlayers: 2,
		players: [
			{ id: 'Player1', playerType: 'me', agentType: null, username: USERNAME },
			{ id: 'Player2', playerType: 'me', agentType: null, username: USERNAME + '1' },
		]
	},
	catan: {
		numPlayers: 3,
		players: [
			{ id: 'White', playerType: 'me', agentType: null, username: USERNAME },
			{ id: 'Red', playerType: 'me', agentType: null, username: USERNAME + '1' },
			{ id: 'Blue', playerType: 'me', agentType: null, username: USERNAME + '2' },
		]
	}
}
var route_counter = 0;
const VERSION = '_ui';
const CACHE_DEFAULTSPEC = false;
const CACHE_USERSPEC = false;
const CACHE_CODE = false;
var SPEC = null;
var GAMEPLID = null;
var PGAMEPLID = null;
var t_avg = 0;
var autoplayFunction = () => false;
var AIThinkingTime = 30;
var CLICK_TO_SELECT = true;
var USE_SETTINGS = true;
var USE_STRUCTURES = true;
var USE_BEHAVIORS = true;
var divMain, divPlayer, divOpps, colors, iColor, timit;
var FUNCTIONS = {
	instanceof: 'instanceOf',
	prop: (o, v) => isdef(o[v]),
	no_prop: (o, v) => nundef(o[v]),
	no_spec: (o, v) => false,
}
var UIROOT;
var PROTO;
var POOLS = {};
var dynSpec;
var INFO = {};
var B = {};
var serverDataUpdated;
var isTraceOn = true;
var ___enteredRecursion = 0;
var DEFS = null;
var DSPEC_PATH = '/DATA/defaultSpec';
var TEST_DIR = '01mini';
var SPEC_PATH = '/DATA/' + TEST_DIR + '/_spec';
var SERVERDATA_PATH = '/DATA/' + TEST_DIR + '/server';
const SHOW_SPEC = true;
var SHOW_RTREE = false;
var SHOW_UITREE = false;
var SHOW_OIDNODES = true;
var SHOW_DICTIONARIES = false;
var SHOW_IDS_REFS = false;
var MAX_CYCLES = 500;
var CYCLES = 0;
var WR = {};
var phase = 0;
var TV = {};
var _audioSources = {
	incorrect1: '../assets/sounds/incorrect1.wav',
	incorrect3: '../assets/sounds/incorrect3.mp3',
	goodBye: "../assets/sounds/level1.wav",
	down: "../assets/sounds/down.mp3",
	levelComplete: "../assets/sounds/sound1.wav",
	rubberBand: "../assets/sounds/sound2.wav",
	hit: "../assets/sounds/hit.wav",
};
var TOSound, _sndPlayer, _loaded = false, _qSound, _idleSound = true, _sndCounter = 0;
var _AUDIOCONTEXT;
var badges = [];
var Markers = [];
var BlockServerSend = false;
var DragElem = null;
var DropZones = [];
var DropZoneItem = null;
var DropZoneItems = [];
var DragSource = null;
var DragSourceItem = null;
var DragSourceItems = [];
var TOFleetingMessage, dFleetingMessage, Animation1;
var StateDict = {};
var EmptyFunc = x => nundef(x) || x == ' ';
var Avatars = [];
var AvatarTimeout;
var LastPositionX = 0, LastPositionY = 0;
var MouseMoveCounter = 0;
var IsCanvasActive = false;
var StepCounter = 0, Autoreload = false, KeepSessionUser = false;
var Toolbar;
var RecogOutput = false;
var RecogOutputError = true;
var RecogHighPriorityOutput = true;
var SpeakerOutput = false;
var MicrophoneUi;
var SessionId;
var ZMax = 0;
var MyEasing = 'cubic-bezier(1,-0.03,.86,.68)';
var DDInfo = null;
var FRUIDCounter = -1;
var ActiveButton = null;
var HistoryOfStates = {};
var brd_side = COLOURS.WHITE;
var brd_pieces = new Array(BRD_SQ_NUM);
var brd_enPas = SQUARES.NO_SQ;
var brd_fiftyMove;
var brd_hisPly;
var brd_ply;
var brd_castlePerm;
var brd_posKey;
var brd_pceNum = new Array(13);
var brd_material = new Array(2);
var brd_pList = new Array(14 * 10);
var brd_history = [];
var brd_bookLines = [];
var brd_moveList = new Array(MAXDEPTH * MAXPOSITIONMOVES);
var brd_moveScores = new Array(MAXDEPTH * MAXPOSITIONMOVES);
var brd_moveListStart = new Array(MAXDEPTH);
var brd_PvTable = [];
var brd_PvArray = new Array(MAXDEPTH);
var brd_searchHistory = new Array(14 * BRD_SQ_NUM);
var brd_searchKillers = new Array(3 * MAXDEPTH);
var fen = "345623";
var fenCnt = 3;
var count = fen[fenCnt].charCodeAt() - '0'.charCodeAt();
var ColBrd = new Array(BRD_SQ_NUM);
var RowBrd = new Array(BRD_SQ_NUM);
var Sq120ToSq64 = new Array(BRD_SQ_NUM);
var Sq64ToSq120 = new Array(64);
var PceChar = ".PNBRQKpnbrqk";
var SideChar = "wb-";
var RowChar = "12345678";
var ColChar = "abcdefgh";
var PieceBig = [BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, BOOL.TRUE, BOOL.TRUE, BOOL.TRUE, BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, BOOL.TRUE, BOOL.TRUE, BOOL.TRUE];
var PieceMaj = [BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, BOOL.TRUE];
var PieceMin = [BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE];
var PieceVal = [0, 100, 325, 325, 550, 1000, 50000, 100, 325, 325, 550, 1000, 50000];
var PieceCol = [COLOURS.BOTH, COLOURS.WHITE, COLOURS.WHITE, COLOURS.WHITE, COLOURS.WHITE, COLOURS.WHITE, COLOURS.WHITE, COLOURS.BLACK, COLOURS.BLACK, COLOURS.BLACK, COLOURS.BLACK, COLOURS.BLACK, COLOURS.BLACK];
var PiecePawn = [BOOL.FALSE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE];
var PieceKnight = [BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE];
var PieceKing = [BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE];
var PieceRookQueen = [BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, BOOL.FALSE];
var PieceBishopQueen = [BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.FALSE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.FALSE, BOOL.TRUE, BOOL.FALSE];
var PieceSlides = [BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, BOOL.TRUE, BOOL.FALSE, BOOL.FALSE, BOOL.FALSE, BOOL.TRUE, BOOL.TRUE, BOOL.TRUE, BOOL.FALSE];
var KnDir = [-8, -19, -21, -12, 8, 19, 21, 12];
var RkDir = [-1, -10, 1, 10];
var BiDir = [-9, -11, 11, 9];
var KiDir = [-1, -10, 1, 10, -9, -11, 11, 9];
var DirNum = [0, 0, 8, 4, 4, 8, 8, 0, 8, 4, 4, 8, 8];
var PceDir = [0, 0, KnDir, BiDir, RkDir, KiDir, KiDir, 0, KnDir, BiDir, RkDir, KiDir, KiDir];
var LoopSlidePce = [PIECES.wB, PIECES.wR, PIECES.wQ, 0, PIECES.bB, PIECES.bR, PIECES.bQ, 0];
var LoopNonSlidePce = [PIECES.wN, PIECES.wK, 0, PIECES.bN, PIECES.bK, 0];
var LoopSlideIndex = [0, 4];
var LoopNonSlideIndex = [0, 3];
var Kings = [PIECES.wK, PIECES.bK];
var PieceKeys = new Array(14 * 120);
var SideKey;
var CastleKeys = new Array(16);
var Mirror64 = [
	56, 57, 58, 59, 60, 61, 62, 63,
	48, 49, 50, 51, 52, 53, 54, 55,
	40, 41, 42, 43, 44, 45, 46, 47,
	32, 33, 34, 35, 36, 37, 38, 39,
	24, 25, 26, 27, 28, 29, 30, 31,
	16, 17, 18, 19, 20, 21, 22, 23,
	8, 9, 10, 11, 12, 13, 14, 15,
	0, 1, 2, 3, 4, 5, 6, 7
];
var CastlePerm = [
	15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
	15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
	15, 13, 15, 15, 15, 12, 15, 15, 14, 15,
	15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
	15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
	15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
	15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
	15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
	15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
	15, 7, 15, 15, 15, 3, 15, 15, 11, 15,
	15, 15, 15, 15, 15, 15, 15, 15, 15, 15,
	15, 15, 15, 15, 15, 15, 15, 15, 15, 15
];
var GameController = {};
var posKey = 0;
var piece1 = RAND_32();
var piece2 = RAND_32();
var piece3 = RAND_32();
var piece4 = RAND_32();
var MFLAGEP = 0x40000
var MFLAGPS = 0x80000
var MFLAGCA = 0x1000000
var MFLAGCAP = 0x7C000
var MFLAGPROM = 0xF00000
var NOMOVE = 0
var PVENTRIES = 10000;
var RookOpenCol = 10;
var RookSemiOpenCol = 5;
var QueenOpenCol = 5;
var QueenSemiOpenCol = 3;
var BishopPair = 30;
var PawnRowsWhite = new Array(10);
var PawnRowsBlack = new Array(10);
var PawnIsolated = -10;
var PawnPassed = [0, 5, 10, 20, 35, 60, 100, 200];
var PawnTable = [
	0, 0, 0, 0, 0, 0, 0, 0,
	10, 10, 0, -10, -10, 0, 10, 10,
	5, 0, 0, 5, 5, 0, 0, 5,
	0, 0, 10, 20, 20, 10, 0, 0,
	5, 5, 5, 10, 10, 5, 5, 5,
	10, 10, 10, 20, 20, 10, 10, 10,
	20, 20, 20, 30, 30, 20, 20, 20,
	0, 0, 0, 0, 0, 0, 0, 0
];
var KnightTable = [
	0, -10, 0, 0, 0, 0, -10, 0,
	0, 0, 0, 5, 5, 0, 0, 0,
	0, 0, 10, 10, 10, 10, 0, 0,
	0, 0, 10, 20, 20, 10, 5, 0,
	5, 10, 15, 20, 20, 15, 10, 5,
	5, 10, 10, 20, 20, 10, 10, 5,
	0, 0, 5, 10, 10, 5, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0
];
var BishopTable = [
	0, 0, -10, 0, 0, -10, 0, 0,
	0, 0, 0, 10, 10, 0, 0, 0,
	0, 0, 10, 15, 15, 10, 0, 0,
	0, 10, 15, 20, 20, 15, 10, 0,
	0, 10, 15, 20, 20, 15, 10, 0,
	0, 0, 10, 15, 15, 10, 0, 0,
	0, 0, 0, 10, 10, 0, 0, 0,
	0, 0, 0, 0, 0, 0, 0, 0
];
var RookTable = [
	0, 0, 5, 10, 10, 5, 0, 0,
	0, 0, 5, 10, 10, 5, 0, 0,
	0, 0, 5, 10, 10, 5, 0, 0,
	0, 0, 5, 10, 10, 5, 0, 0,
	0, 0, 5, 10, 10, 5, 0, 0,
	0, 0, 5, 10, 10, 5, 0, 0,
	25, 25, 25, 25, 25, 25, 25, 25,
	0, 0, 5, 10, 10, 5, 0, 0
];
var KingE = [
	-50, -10, 0, 0, 0, 0, -10, -50,
	-10, 0, 10, 10, 10, 10, 0, -10,
	0, 10, 20, 20, 20, 20, 10, 0,
	0, 10, 20, 40, 40, 20, 10, 0,
	0, 10, 20, 40, 40, 20, 10, 0,
	0, 10, 20, 20, 20, 20, 10, 0,
	-10, 0, 10, 10, 10, 10, 0, -10,
	-50, -10, 0, 0, 0, 0, -10, -50
];
var KingO = [
	0, 5, 5, -10, -10, 0, 10, 5,
	-30, -30, -30, -30, -30, -30, -30, -30,
	-50, -50, -50, -50, -50, -50, -50, -50,
	-70, -70, -70, -70, -70, -70, -70, -70,
	-70, -70, -70, -70, -70, -70, -70, -70,
	-70, -70, -70, -70, -70, -70, -70, -70,
	-70, -70, -70, -70, -70, -70, -70, -70,
	-70, -70, -70, -70, -70, -70, -70, -70
];
var ENDGAME_MAT = 1 * PieceVal[PIECES.wR] + 2 * PieceVal[PIECES.wN] + 2 * PieceVal[PIECES.wP] + PieceVal[PIECES.wK];
var UserMove = {};
var MirrorCols = [COLUMNS.COL_H, COLUMNS.COL_G, COLUMNS.COL_F, COLUMNS.COL_E, COLUMNS.COL_D, COLUMNS.COL_C, COLUMNS.COL_B, COLUMNS.COL_A];
var MirrorRows = [ROWS.ROW_8, ROWS.ROW_7, ROWS.ROW_6, ROWS.ROW_5, ROWS.ROW_4, ROWS.ROW_3, ROWS.ROW_2, ROWS.ROW_1];
var VictimScore = [0, 100, 200, 300, 400, 500, 600, 100, 200, 300, 400, 500, 600];
var MvvLvaScores = new Array(14 * 14);
var perft_leafNodes;
var srch_nodes;
var srch_fh;
var srch_fhf;
var srch_depth;
var srch_time;
var srch_start;
var srch_stop;
var srch_best;
var srch_thinking;
var domUpdate_depth;
var domUpdate_move;
var domUpdate_score;
var domUpdate_nodes;
var domUpdate_ordering;
var FILES = { FILE_A: 0, FILE_B: 1, FILE_C: 2, FILE_D: 3, FILE_E: 4, FILE_F: 5, FILE_G: 6, FILE_H: 7, FILE_NONE: 8 };
var RANKS = { RANK_1: 0, RANK_2: 1, RANK_3: 2, RANK_4: 3, RANK_5: 4, RANK_6: 5, RANK_7: 6, RANK_8: 7, RANK_NONE: 8 };
var FilesBrd = new Array(BRD_SQ_NUM);
var RanksBrd = new Array(BRD_SQ_NUM);
var RankChar = "12345678";
var FileChar = "abcdefgh";
var BFGameContr = {};
var BFUserMove = {};
var BFBoard = {};
var MvvLvaValue = [0, 100, 200, 300, 400, 500, 600, 100, 200, 300, 400, 500, 600];
var SearchController = {};
var BG_CARD_BACK = randomColor();
var GAME_PLAY_UI = null;
var PROJECTNAME = 'basinno';
var USELIVESERVER = false;
var START_IN_MENU = false;
var DEFAULTUSERNAME = 'gul';
var USE_LOCAL_STORAGE = false;
const CLEAR_LOCAL_STORAGE = false;
var USE_ADDONS = false;
var sent_audio = new Audio("../base/assets/sounds/message_sent.mp3");
var received_audio = new Audio("../base/assets/sounds/message_received.mp3");
var CURRENT_CHAT_USER = "";
var CURRENT_GAME = "";
var CURRENT_FEN = "";
var SEEN_STATUS = false;
var Daat = {}, DA = {}, Items, ItemsByKey;
var FenPositionList;
var C52, Syms, SymKeys, KeySets, Categories, ByGroupSubgroup, Dictionary, WordP;
var DB, U, Live, G, Username, ClientId;
var Userdata, Username, Serverdata, Live;
var Pictures, Goal, Selected, Score, TO, TOMain, TOTrial, TOList, IsAnswerCorrect, QContextCounter = 0;
var uiActivated, aiActivated, auxOpen, GameTimer, STOPAUS = false;
var Settings, SettingsList, SettingsChanged, SelectedMenuKey;
var Players, PlayerOnTurn, GC, GameCounter;
var BestMinusScore = Infinity, BestMinusState, BestPlusScore = -Infinity, BestPlusState;
var F_END, F_MOVES, F_APPLYMOVE, F_UNDOMOVE, F_EVAL, DMAX, MAXIMIZER, MINIMIZER, SelectedMove, CANCEL_AI;
var DMM = {}, timit, STARTED;
var ShapeKeys = ['hex', 'hexF', 'tri', 'triDown', 'triLeft', 'triRight'];
var PolyClips = {
	hex: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
	test1: 'inset(50% 0% 100% 25% 100% 75% 50% 100% 0% 75% 0% 25% round 10px)',
	test0: 'inset(45% 0% 33% 10% round 10px)',
	hexagon: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)',
	hexF: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
	hexFlat: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
	hexflat: 'polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)',
	tri: 'polygon(50% 0%, 100% 100%, 0% 100%)',
	triangle: 'polygon(50% 0%, 100% 100%, 0% 100%)',
	triUp: 'polygon(50% 0%, 100% 100%, 0% 100%)',
	triup: 'polygon(50% 0%, 100% 100%, 0% 100%)',
	triDown: 'polygon(0% 0%, 100% 0%, 50% 100%)',
	tridown: 'polygon(0% 0%, 100% 0%, 50% 100%)',
	triright: 'polygon(0% 0%, 100% 50%, 0% 100%)',
	triRight: 'polygon(0% 0%, 100% 50%, 0% 100%)',
	trileft: 'polygon(0% 50%, 100% 0%, 100% 100%)',
	triLeft: 'polygon(0% 50%, 100% 0%, 100% 100%)',
	splayup: 'polygon(0% 70%, 100% 70%, 100% 100%, 0% 100%)',
}
var ColorNames;
var levelKeys = ['island', 'justice star', 'materials science', 'mayan pyramid', 'medieval gate',
	'great pyramid', 'meeple', 'smart', 'stone tower', 'trophy cup', 'viking helmet',
	'flower star', 'island', 'justice star', 'materials science', 'mayan pyramid',];
var dLeiste, dScore, dGameTitle, dTable, dTableShield, dTitle, dLinks, dRechts, dOben, dUnten, dPlayerStats, dMessage, dStatus;
var dTable, dAux, dAuxContent;
var TOMan, TO, TOMain, TOTrial, TOList, TOTicker, TCount, TOAnim;
var Speech;
var BotTicker, POLL_COUNTER = 0;
var Badges = [];
var Fen, R, Qu, U, G, A;
var Waiting_for = null;
var TestNumber, TestList, TestRunning, TestSuiteRunning;
var CSZ = 300;
var CHEIGHT = CSZ;
var CWIDTH = CSZ * .7
var CGAP = CSZ * .05;
var OVD = .25, OVW = 14, OVH = 20;
var SUITS = 'SHDC';
var DECKS = 'br';
var NUMJOKERS = 0;
var NUMDECKS = 2;
var dActions, dActions0, dActions1, dActions2, dActions3, dActions4, dActions5, dError;
const SHAPEFUNCS = {
	'circle': agCircle,
	'hex': agHex,
	'rect': agRect,
}
var MAXITER = 200, ITER = 0;
var FLAG_HINT_ONLY = false;
var FLAG_AI_CANCELED = false;
var RookOpenFile = 10;
var RookSemiOpenFile = 5;
var QueenOpenFile = 5;
var QueenSemiOpenFile = 3;
var PawnRanksWhite = new Array(10);
var PawnRanksBlack = new Array(10);
var MirrorFiles = [FILES.FILE_H, FILES.FILE_G, FILES.FILE_F, FILES.FILE_E, FILES.FILE_D, FILES.FILE_C, FILES.FILE_B, FILES.FILE_A];
var MirrorRanks = [RANKS.RANK_8, RANKS.RANK_7, RANKS.RANK_6, RANKS.RANK_5, RANKS.RANK_4, RANKS.RANK_3, RANKS.RANK_2, RANKS.RANK_1];
var IconSet, lastIndex;
var CCC = 0;
var dMain = document.getElementById('dMain'), dTable, Step = 0;
var ActiveChats = {};
var dCurrent = null;
var paneOpen = false;
var DELAY_PANE = 100;
var DELAY_DISAPPEAR = 100;
var DELAY_APPEAR = 100;
var SOCKETSERVER = 'http://localhost:5000'; //geht im spital
var SERVER = "http://localhost:8080/aroot/simple"; // oder telecave!
var Pollmode = 'auto', Sayings;
var Info, ColorDi, Items = {}, DA = {}, Card = {}, TO = {}, Counter = { server: 0 }, Socket = null;
var Socket;
var Config, Syms, SymKeys, ByGroupSubgroup, KeySets, C52, Cinno, C52Cards;
var PrevUser = null;
var FORCE_REDRAW = false, TESTING = false;
var ColorThiefObject, SelectedItem, SelectedColor;
var FirstLoad = true;
var AGAME = {
	stage: {
	}
};
var WhichCorner = 0;
var W_init = 10;
var is_host, socket, settings, defaults, greenbar, redbar, in_game_screen, lastgreen = 0, lastred = 0, granularity, num_calls = 0, num_painted = 0;
var DeckA = (function () {
	//#region variables  
	var ____fontSize;
	var ___fontSize;
	var __fontSize;
	var _fontSize;
	var ticking;
	var animations = [];
	var style = document.createElement('p').style;
	var memoized = {};
	var has3d;
	var maxZ = 52;
	var displacement = 4;
	window.requestAnimationFrame || (window.requestAnimationFrame = function (cb) { setTimeout(cb, 0); });
	//#endregion
	//#region modules
	var ease = {
		linear: function linear(t) {
			return t;
		},
		quadIn: function quadIn(t) {
			return t * t;
		},
		quadOut: function quadOut(t) {
			return t * (2 - t);
		},
		quadInOut: function quadInOut(t) {
			return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
		},
		cubicIn: function cubicIn(t) {
			return t * t * t;
		},
		cubicOut: function cubicOut(t) {
			return --t * t * t + 1;
		},
		cubicInOut: function cubicInOut(t) {
			return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
		},
		quartIn: function quartIn(t) {
			return t * t * t * t;
		},
		quartOut: function quartOut(t) {
			return 1 - --t * t * t * t;
		},
		quartInOut: function quartInOut(t) {
			return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
		},
		quintIn: function quintIn(t) {
			return t * t * t * t * t;
		},
		quintOut: function quintOut(t) {
			return 1 + --t * t * t * t * t;
		},
		quintInOut: function quintInOut(t) {
			return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
		}
	};
	var flip = {
		deck: function deck(_deck) {
			_deck.flip = _deck.queued(flip);
			function flip(next, side) {
				var flipped = _deck.cards.filter(function (card) {
					return card.side === 'front';
				}).length / _deck.cards.length;
				_deck.cards.forEach(function (card, i) {
					card.setSide(side ? side : flipped > 0.5 ? 'back' : 'front');
				});
				next();
			}
		}
	};
	var sort = {
		deck: function deck(_deck2) {
			_deck2.sort = _deck2.queued(sort);
			function sort(next, reverse) {
				var cards = _deck2.cards;
				cards.sort(function (a, b) {
					if (reverse) {
						return a.i - b.i;
					} else {
						return b.i - a.i;
					}
				});
				cards.forEach(function (card, i) {
					card.sort(i, cards.length, function (i) {
						if (i === cards.length - 1) {
							next();
						}
					}, reverse);
				});
			}
		},
		card: function card(_card2) {
			var cardElem = _card2.elem;
			_card2.sort = function (i, len, cb, reverse) {
				var z = i / 4;
				var delay = i * 10;
				_card2.animateTo({
					delay: delay,
					duration: 400,
					x: -z,
					y: -150,
					rot: 0,
					onComplete: function onComplete() {
						cardElem.style.zIndex = i;
					}
				});
				_card2.animateTo({
					delay: delay + 500,
					duration: 400,
					x: -z,
					y: -z,
					rot: 0,
					onComplete: function onComplete() {
						cb(i);
					}
				});
			};
		}
	};
	var shuffle = {
		deck: function deck(_deck3) {
			_deck3.shuffle = _deck3.queued(shuffle);
			function shuffle(next) {
				var cards = _deck3.cards;
				____fontSize = fontSize();
				fisherYates(cards);
				cards.forEach(function (card, i) {
					card.pos = i;
					card.shuffle(function (i) {
						if (i === cards.length - 1) {
							next();
						}
					});
				});
				return;
			}
		},
		card: function card(_card3) {
			var cardElem = _card3.elem;
			_card3.shuffle = function (cb) {
				var i = _card3.pos;
				var z = i / 4;
				var delay = i * 2;
				_card3.animateTo({
					delay: delay,
					duration: 200,
					x: plusminus(Math.random() * 40 + 20) * ____fontSize / 16,
					y: -z,
					rot: 0
				});
				_card3.animateTo({
					delay: 200 + delay,
					duration: 200,
					x: -z,
					y: -z,
					rot: 0,
					onStart: function onStart() {
						cardElem.style.zIndex = i;
					},
					onComplete: function onComplete() {
						cb(i);
					}
				});
			};
		}
	};
	var poker = {
		deck: function deck(_deck4) {
			_deck4.poker = _deck4.queued(poker);
			function poker(next) {
				var cards = _deck4.cards;
				var len = cards.length;
				__fontSize = fontSize();
				cards.slice(-5).reverse().forEach(function (card, i) {
					card.poker(i, len, function (i) {
						card.setSide('front');
						if (i === 4) {
							next();
						}
					});
				});
			}
		},
		card: function card(_card4) {
			var cardElem = _card4.elem;
			_card4.poker = function (i, len, cb) {
				var delay = i * 250;
				_card4.animateTo({
					delay: delay,
					duration: 250,
					x: Math.round((i - 2.05) * 70 * __fontSize / 16),
					y: Math.round(-110 * __fontSize / 16),
					rot: 0,
					onStart: function onStart() {
						cardElem.style.zIndex = len - 1 + i;
					},
					onComplete: function onComplete() {
						cb(i);
					}
				});
			};
		}
	};
	var pokerN = {
		deck: function deck(_deck4) {
			_deck4.pokerN = _deck4.queued(pokerN);
			function pokerN(next, num) {
				var cards = _deck4.cards;
				var len = cards.length;
				__fontSize = fontSize();
				console.log()
				cards.slice(-num).reverse().forEach(function (card, i) {
					card.pokerN(num, i, len, function (i) {
						card.setSide('front');
						if (i === num - 1) {
							next();
						}
					});
				});
			}
		},
		card: function card(_card4) {
			var cardElem = _card4.elem;
			_card4.pokerN = function (num, i, len, cb) {
				var delay = i * 250;
				_card4.animateTo({
					delay: delay,
					duration: 250,
					x: Math.round((i - (num - .8) / 2) * 70 * __fontSize / 16),
					y: Math.round(-110 * __fontSize / 16),
					rot: 0,
					onStart: function onStart() {
						cardElem.style.zIndex = len - 1 + i;
					},
					onComplete: function onComplete() {
						cb(i);
					}
				});
			};
		}
	};
	var intro = {
		deck: function deck(_deck5) {
			_deck5.intro = _deck5.queued(intro);
			function intro(next) {
				var cards = _deck5.cards;
				cards.forEach(function (card, i) {
					card.setSide('front');
					card.intro(i, function (i) {
						animationFrames(250, 0).start(function () {
							card.setSide('back');
						});
						if (i === cards.length - 1) {
							next();
						}
					});
				});
			}
		},
		card: function card(_card5) {
			var transform = prefix('transform');
			var cardElem = _card5.elem;
			_card5.intro = function (i, cb) {
				var delay = 500 + i * 10;
				var z = i / 4;
				cardElem.style[transform] = translate(-z + 'px', '-250px');
				cardElem.style.opacity = 0;
				_card5.x = -z;
				_card5.y = -250 - z;
				_card5.rot = 0;
				_card5.animateTo({
					delay: delay,
					duration: 1000,
					x: -z,
					y: -z,
					onStart: function onStart() {
						cardElem.style.zIndex = i;
					},
					onProgress: function onProgress(t) {
						cardElem.style.opacity = t;
					},
					onComplete: function onComplete() {
						cardElem.style.opacity = '';
						cb && cb(i);
					}
				});
			};
		}
	};
	var fan = {
		deck: function deck(_deck6) {
			_deck6.fan = _deck6.queued(fan);
			function fan(next) {
				var cards = _deck6.cards;
				var len = cards.length;
				_fontSize = fontSize();
				cards.forEach(function (card, i) {
					card.fan(i, len, function (i) {
						if (i === cards.length - 1) {
							next();
						}
					});
				});
			}
		},
		card: function card(_card6) {
			var cardElem = _card6.elem;
			_card6.fan = function (i, len, cb) {
				var z = i / 4;
				var delay = i * 10;
				var rot = i / (len - 1) * 260 - 130;
				_card6.animateTo({
					delay: delay,
					duration: 300,
					x: -z,
					y: -z,
					rot: 0
				});
				_card6.animateTo({
					delay: 300 + delay,
					duration: 300,
					x: Math.cos(deg2rad(rot - 90)) * 55 * _fontSize / 16,
					y: Math.sin(deg2rad(rot - 90)) * 55 * _fontSize / 16,
					rot: rot,
					onStart: function onStart() {
						cardElem.style.zIndex = i;
					},
					onComplete: function onComplete() {
						cb(i);
					}
				});
			};
		}
	};
	var bysuit = {
		deck: function deck(_deck7) {
			_deck7.bysuit = _deck7.queued(bysuit);
			function bysuit(next) {
				var cards = _deck7.cards;
				___fontSize = fontSize();
				cards.forEach(function (card) {
					card.bysuit(function (i) {
						if (i === cards.length - 1) {
							next();
						}
					});
				});
			}
		},
		card: function card(_card7) {
			var rank = _card7.rank;
			var suit = _card7.suit;
			_card7.bysuit = function (cb) {
				var i = _card7.i;
				var delay = i * 10;
				_card7.animateTo({
					delay: delay,
					duration: 400,
					x: -Math.round((6.75 - rank) * 8 * ___fontSize / 16),
					y: -Math.round((1.5 - suit) * 92 * ___fontSize / 16),
					rot: 0,
					onComplete: function onComplete() {
						cb(i);
					}
				});
			};
		}
	};
	//#endregion
	//#region helpers
	function createElement(type) {
		return document.createElement(type);
	}
	function addListener(target, name, listener) {
		target.addEventListener(name, listener);
	}
	function removeListener(target, name, listener) {
		target.removeEventListener(name, listener);
	}
	function plusminus(value) {
		var plusminus = Math.round(Math.random()) ? -1 : 1;
		return plusminus * value;
	}
	function fisherYates(array) {
		var rnd, temp;
		for (var i = array.length - 1; i; i--) {
			rnd = Math.random() * i | 0;
			temp = array[i];
			array[i] = array[rnd];
			array[rnd] = temp;
		}
		return array;
	}
	function fontSize() {
		return window.getComputedStyle(document.body).getPropertyValue('font-size').slice(0, -2);
	}
	function deg2rad(degrees) {
		return degrees * Math.PI / 180;
	}
	function queue(target) {
		var array = Array.prototype;
		var queueing = [];
		target.queue = queue;
		target.queued = queued;
		return target;
		function queued(action) {
			return function () {
				var self = this;
				var args = arguments;
				queue(function (next) {
					action.apply(self, array.concat.apply(next, args));
				});
			};
		}
		function queue(action) {
			if (!action) {
				return;
			}
			queueing.push(action);
			if (queueing.length === 1) {
				next();
			}
		}
		function next() {
			queueing[0](function (err) {
				if (err) {
					throw err;
				}
				queueing = queueing.slice(1);
				if (queueing.length) {
					next();
				}
			});
		}
	}
	function observable(target) {
		target || (target = {});
		var listeners = {};
		target.on = on;
		target.one = one;
		target.off = off;
		target.trigger = trigger;
		return target;
		function on(name, cb, ctx) {
			listeners[name] || (listeners[name] = []);
			listeners[name].push({ cb: cb, ctx: ctx });
		}
		function one(name, cb, ctx) {
			listeners[name] || (listeners[name] = []);
			listeners[name].push({
				cb: cb, ctx: ctx, once: true
			});
		}
		function trigger(name) {
			var self = this;
			var args = Array.prototype.slice(arguments, 1);
			var currentListeners = listeners[name] || [];
			currentListeners.filter(function (listener) {
				listener.cb.apply(self, args);
				return !listener.once;
			});
		}
		function off(name, cb) {
			if (!name) {
				listeners = {};
				return;
			}
			if (!cb) {
				listeners[name] = [];
				return;
			}
			listeners[name] = listeners[name].filter(function (listener) {
				return listener.cb !== cb;
			});
		}
	}
	function animationFrames(delay, duration) {
		var now = Date.now();
		var start = now + delay;
		var end = start + duration;
		var animation = {
			start: start,
			end: end
		};
		animations.push(animation);
		if (!ticking) {
			ticking = true;
			requestAnimationFrame(tick);
		}
		var self = {
			start: function start(cb) {
				animation.startcb = cb;
				return self;
			},
			progress: function progress(cb) {
				animation.progresscb = cb;
				return self;
			},
			end: function end(cb) {
				animation.endcb = cb;
				return self;
			}
		};
		return self;
	}
	function tick() {
		var now = Date.now();
		if (!animations.length) {
			ticking = false;
			return;
		}
		for (var i = 0, animation; i < animations.length; i++) {
			animation = animations[i];
			if (now < animation.start) {
				continue;
			}
			if (!animation.started) {
				animation.started = true;
				animation.startcb && animation.startcb();
			}
			var t = (now - animation.start) / (animation.end - animation.start);
			animation.progresscb && animation.progresscb(t < 1 ? t : 1);
			if (now > animation.end) {
				animation.endcb && animation.endcb();
				animations.splice(i--, 1);
				continue;
			}
		}
		requestAnimationFrame(tick);
	}
	function prefix(param) {
		if (typeof memoized[param] !== 'undefined') {
			return memoized[param];
		}
		if (typeof style[param] !== 'undefined') {
			memoized[param] = param;
			return param;
		}
		var camelCase = param[0].toUpperCase() + param.slice(1);
		var prefixes = ['webkit', 'moz', 'Moz', 'ms', 'o'];
		var test;
		for (var i = 0, len = prefixes.length; i < len; i++) {
			test = prefixes[i] + camelCase;
			if (typeof style[test] !== 'undefined') {
				memoized[param] = test;
				return test;
			}
		}
	}
	function translate(a, b, c) {
		typeof has3d !== 'undefined' || (has3d = check3d());
		c = c || 0;
		if (has3d) {
			return 'translate3d(' + a + ', ' + b + ', ' + c + ')';
		} else {
			return 'translate(' + a + ', ' + b + ')';
		}
	}
	function check3d() {
		// http://julian.com/research/velocity/
		var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
		if (!isMobile) {
			return false;
		}
		var transform = prefix('transform');
		var $p = document.createElement('p');
		document.body.appendChild($p);
		$p.style[transform] = 'translate3d(1px,1px,1px)';
		has3d = $p.style[transform];
		has3d = has3d != null && has3d.length && has3d !== 'none';
		document.body.removeChild($p);
		return has3d;
	}
	function iToSuit52(suit) {
		return suit === 0 ? 'spades' : suit === 1 ? 'hearts' : suit === 2 ? 'clubs' : suit === 3 ? 'diamonds' : 'joker';
	}
	//#endregion
	function _card(i, text = '') {
		var transform = prefix('transform');
		var rank = i % 13 + 1;
		var suit = i / 13 | 0;
		var z = (52 - i) / displacement;
		var elem = createElement('div');
		var faceElem = createElement('div');
		var backElem = createElement('div');
		var isDraggable = false;
		var isFlippable = false;
		var self = {
			text: text, i: i, rank: rank, suit: suit, pos: i, elem: elem,
			mount: mount, unmount: unmount, setSide: setSide
		};
		var modules = DeckA.modules;
		var module;
		faceElem.classList.add('face');
		backElem.classList.add('back');
		elem.style[transform] = translate(-z + 'px', -z + 'px');
		self.x = -z;
		self.y = -z;
		self.z = z;
		self.rot = 0;
		self.setSide('back');
		addListener(elem, 'mousedown', onMousedown);
		addListener(elem, 'touchstart', onMousedown);
		for (module in modules) {
			addModule(modules[module]);
		}
		self.animateTo = function (params) {
			var delay = params.delay;
			var duration = params.duration;
			var _params$x = params.x;
			var x = _params$x === undefined ? self.x : _params$x;
			var _params$y = params.y;
			var y = _params$y === undefined ? self.y : _params$y;
			var _params$rot = params.rot;
			var rot = _params$rot === undefined ? self.rot : _params$rot;
			var ease$$ = params.ease;
			var onStart = params.onStart;
			var onProgress = params.onProgress;
			var onComplete = params.onComplete;
			var startX, startY, startRot;
			var diffX, diffY, diffRot;
			animationFrames(delay, duration).start(function () {
				startX = self.x || 0;
				startY = self.y || 0;
				startRot = self.rot || 0;
				onStart && onStart();
			}).progress(function (t) {
				var et = ease[ease$$ || 'cubicInOut'](t);
				diffX = x - startX;
				diffY = y - startY;
				diffRot = rot - startRot;
				onProgress && onProgress(t, et);
				self.x = startX + diffX * et;
				self.y = startY + diffY * et;
				self.rot = startRot + diffRot * et;
				elem.style[transform] = translate(self.x + 'px', self.y + 'px') + (diffRot ? 'rotate(' + self.rot + 'deg)' : '');
			}).end(function () {
				onComplete && onComplete();
			});
		};
		self.setRankSuit = function (rank, suit) {
			elem.setAttribute('class', 'card blank')
			faceElem.style.fontSize = '8px';
			faceElem.innerHTML = 'hallo das ist eine wundeschoene catan karte!';
		};
		self.setText = function (text = 'hallo das ist eine wundeschoene catan karte!') {
			elem.setAttribute('class', 'card blank')
			faceElem.innerHTML = text;
		};
		self.setRankSuit(rank, suit);
		self.enableDragging = function () {
			if (isDraggable) {
				return;
			}
			isDraggable = true;
			elem.style.cursor = 'move';
		};
		self.enableFlipping = function () {
			if (isFlippable) {
				return;
			}
			isFlippable = true;
		};
		self.disableFlipping = function () {
			if (!isFlippable) {
				return;
			}
			isFlippable = false;
		};
		self.disableDragging = function () {
			if (!isDraggable) {
				return;
			}
			isDraggable = false;
			elem.style.cursor = '';
		};
		return self;
		function addModule(module) {
			module.card && module.card(self);
		}
		function onMousedown(e) {
			var startPos = {};
			var pos = {};
			var starttime = Date.now();
			e.preventDefault();
			if (e.type === 'mousedown') {
				startPos.x = pos.x = e.clientX;
				startPos.y = pos.y = e.clientY;
				addListener(window, 'mousemove', onMousemove);
				addListener(window, 'mouseup', onMouseup);
			} else {
				startPos.x = pos.x = e.touches[0].clientX;
				startPos.y = pos.y = e.touches[0].clientY;
				addListener(window, 'touchmove', onMousemove);
				addListener(window, 'touchend', onMouseup);
			}
			if (!isDraggable) {
				return;
			}
			elem.style[transform] = translate(self.x + 'px', self.y + 'px') + (self.rot ? ' rotate(' + self.rot + 'deg)' : '');
			elem.style.zIndex = maxZ++;
			function onMousemove(e) {
				if (!isDraggable) {
					return;
				}
				if (e.type === 'mousemove') {
					pos.x = e.clientX;
					pos.y = e.clientY;
				} else {
					pos.x = e.touches[0].clientX;
					pos.y = e.touches[0].clientY;
				}
				elem.style[transform] = translate(Math.round(self.x + pos.x - startPos.x) + 'px', Math.round(self.y + pos.y - startPos.y) + 'px') + (self.rot ? ' rotate(' + self.rot + 'deg)' : '');
			}
			function onMouseup(e) {
				if (isFlippable && Date.now() - starttime < 200) {
					self.setSide(self.side === 'front' ? 'back' : 'front');
				}
				if (e.type === 'mouseup') {
					removeListener(window, 'mousemove', onMousemove);
					removeListener(window, 'mouseup', onMouseup);
				} else {
					removeListener(window, 'touchmove', onMousemove);
					removeListener(window, 'touchend', onMouseup);
				}
				if (!isDraggable) {
					return;
				}
				self.x = self.x + pos.x - startPos.x;
				self.y = self.y + pos.y - startPos.y;
			}
		}
		function mount(target) {
			target.appendChild(elem);
			self.dCard = target;
		}
		function unmount() {
			self.dCard && self.dCard.removeChild(elem);
			self.dCard = null;
		}
		function setSide(newSide) {
			if (newSide === 'front') {
				if (self.side === 'back') {
					elem.removeChild(backElem);
				}
				self.side = 'front';
				elem.appendChild(faceElem);
				self.setRankSuit(self.rank, self.suit);
			} else {
				if (self.side === 'front') {
					elem.removeChild(faceElem);
				}
				self.side = 'back';
				elem.appendChild(backElem);
				elem.setAttribute('class', 'card');
			}
		}
	}
	function DeckA(jokers) {
		var cards = new Array(jokers ? 55 : 52);
		var deckElem = createElement('div');
		var self = observable({ mount: mount, unmount: unmount, cards: cards, elem: deckElem });
		var dDeck;
		var modules = DeckA.modules;
		var module;
		queue(self);
		for (module in modules) {
			addModule(modules[module]);
		}
		deckElem.classList.add('deck');
		var card;
		for (var i = cards.length; i; i--) {
			card = cards[i - 1] = _card(i - 1);
			card.setSide('back');
			card.mount(deckElem);
		}
		return self;
		function mount(root) {
			dDeck = root;
			dDeck.appendChild(deckElem);
		}
		function unmount() {
			dDeck.removeChild(deckElem);
		}
		function addModule(module) {
			module.deck && module.deck(self);
		}
	}
	DeckA.animationFrames = animationFrames;
	DeckA.ease = ease;
	DeckA.modules = { bysuit: bysuit, fan: fan, intro: intro, poker: poker, pokerN: pokerN, shuffle: shuffle, sort: sort, flip: flip };
	DeckA.Card = _card;
	DeckA.prefix = prefix;
	DeckA.translate = translate;
	console.log('hallo!')
	return DeckA;
})();
var prefix = DeckA.prefix
var transform = prefix('transform')
var translate = DeckA.translate
var container1 = document.getElementById('container')
var topbar1 = document.getElementById('topbar')
var bSort = document.createElement('button')
var bShuffle = document.createElement('button')
var bBySuit = document.createElement('button')
var bFan = document.createElement('button')
var bPoker = document.createElement('button')
var bFlip = document.createElement('button')
var bDeal = document.createElement('button')
var deck = DeckA()
var currentDeck;
var dummyString = "translateX(-50%) scale(1.2)";
var DeckB = (function () {
	//#region variables  
	let ____fontSize;
	let ___fontSize;
	let __fontSize;
	let _fontSize;
	let ticking;
	let animations = [];
	let style = document.createElement('p').style;
	let memoized = {};
	let has3d;
	let maxZ = 52;
	let displacement = 4;
	let _deckParams = {};
	window.requestAnimationFrame || (window.requestAnimationFrame = function (cb) { setTimeout(cb, 0); });
	//#endregion
	//#region modules
	var ease = {
		linear: function linear(t) {
			return t;
		},
		quadIn: function quadIn(t) {
			return t * t;
		},
		quadOut: function quadOut(t) {
			return t * (2 - t);
		},
		quadInOut: function quadInOut(t) {
			return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
		},
		cubicIn: function cubicIn(t) {
			return t * t * t;
		},
		cubicOut: function cubicOut(t) {
			return --t * t * t + 1;
		},
		cubicInOut: function cubicInOut(t) {
			return t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;
		},
		quartIn: function quartIn(t) {
			return t * t * t * t;
		},
		quartOut: function quartOut(t) {
			return 1 - --t * t * t * t;
		},
		quartInOut: function quartInOut(t) {
			return t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;
		},
		quintIn: function quintIn(t) {
			return t * t * t * t * t;
		},
		quintOut: function quintOut(t) {
			return 1 + --t * t * t * t * t;
		},
		quintInOut: function quintInOut(t) {
			return t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;
		}
	};
	var flip = {
		deck: function deck(_deck) {
			_deck.flip = _deck.queued(flip);
			function flip(next, side) {
				var flipped = _deck.cards.filter(function (card) {
					return card.side === 'front';
				}).length / _deck.cards.length;
				_deck.cards.forEach(function (card, i) {
					card.setSide(side ? side : flipped > 0.5 ? 'back' : 'front');
				});
				next();
			}
		}
	};
	var sort = {
		deck: function deck(_deck2) {
			_deck2.sort = _deck2.queued(sort);
			function sort(next, reverse) {
				var cards = _deck2.cards;
				cards.sort(function (a, b) {
					if (reverse) {
						return a.i - b.i;
					} else {
						return b.i - a.i;
					}
				});
				cards.forEach(function (card, i) {
					card.sort(i, cards.length, function (i) {
						if (i === cards.length - 1) {
							next();
						}
					}, reverse);
				});
			}
		},
		card: function card(_card2) {
			var cardElem = _card2.elem;
			_card2.sort = function (i, len, cb, reverse) {
				var z = i / 4;
				var delay = i * 10;
				_card2.animateTo({
					delay: delay,
					duration: 400,
					x: -z,
					y: -150,
					rot: 0,
					onComplete: function onComplete() {
						cardElem.style.zIndex = i;
					}
				});
				_card2.animateTo({
					delay: delay + 500,
					duration: 400,
					x: -z,
					y: -z,
					rot: 0,
					onComplete: function onComplete() {
						cb(i);
					}
				});
			};
		}
	};
	var shuffle = {
		deck: function deck(_deck3) {
			_deck3.shuffle = _deck3.queued(shuffle);
			function shuffle(next) {
				var cards = _deck3.cards;
				____fontSize = fontSize();
				fisherYates(cards);
				cards.forEach(function (card, i) {
					card.pos = i;
					card.shuffle(function (i) {
						if (i === cards.length - 1) {
							next();
						}
					});
				});
				return;
			}
		},
		card: function card(_card3) {
			var cardElem = _card3.elem;
			_card3.shuffle = function (cb) {
				var i = _card3.pos;
				var z = i / 4;
				var delay = i * 2;
				_card3.animateTo({
					delay: delay,
					duration: 200,
					x: plusminus(Math.random() * 40 + 20) * ____fontSize / 16,
					y: -z,
					rot: 0
				});
				_card3.animateTo({
					delay: 200 + delay,
					duration: 200,
					x: -z,
					y: -z,
					rot: 0,
					onStart: function onStart() {
						cardElem.style.zIndex = i;
					},
					onComplete: function onComplete() {
						cb(i);
					}
				});
			};
		}
	};
	var poker = {
		deck: function deck(_deck4) {
			_deck4.poker = _deck4.queued(poker);
			function poker(next) {
				var cards = _deck4.cards;
				var len = cards.length;
				__fontSize = fontSize();
				cards.slice(-5).reverse().forEach(function (card, i) {
					card.poker(i, len, function (i) {
						card.setSide('front');
						if (i === 4) {
							next();
						}
					});
				});
			}
		},
		card: function card(_card4) {
			var cardElem = _card4.elem;
			_card4.poker = function (i, len, cb) {
				var delay = i * 250;
				_card4.animateTo({
					delay: delay,
					duration: 250,
					x: Math.round((i - 2.05) * 70 * __fontSize / 16),
					y: Math.round(-110 * __fontSize / 16),
					rot: 0,
					onStart: function onStart() {
						cardElem.style.zIndex = len - 1 + i;
					},
					onComplete: function onComplete() {
						cb(i);
					}
				});
			};
		}
	};
	var intro = {
		deck: function deck(_deck5) {
			_deck5.intro = _deck5.queued(intro);
			function intro(next) {
				var cards = _deck5.cards;
				cards.forEach(function (card, i) {
					card.setSide('front');
					card.intro(i, function (i) {
						animationFrames(250, 0).start(function () {
							card.setSide('back');
						});
						if (i === cards.length - 1) {
							next();
						}
					});
				});
			}
		},
		card: function card(_card5) {
			var transform = prefix('transform');
			var cardElem = _card5.elem;
			_card5.intro = function (i, cb) {
				var delay = 500 + i * 10;
				var z = i / 4;
				cardElem.style[transform] = translate(-z + 'px', '-250px');
				cardElem.style.opacity = 0;
				_card5.x = -z;
				_card5.y = -250 - z;
				_card5.rot = 0;
				_card5.animateTo({
					delay: delay,
					duration: 1000,
					x: -z,
					y: -z,
					onStart: function onStart() {
						cardElem.style.zIndex = i;
					},
					onProgress: function onProgress(t) {
						cardElem.style.opacity = t;
					},
					onComplete: function onComplete() {
						cardElem.style.opacity = '';
						cb && cb(i);
					}
				});
			};
		}
	};
	var fan = {
		deck: function deck(_deck6) {
			_deck6.fan = _deck6.queued(fan);
			function fan(next) {
				var cards = _deck6.cards;
				var len = cards.length;
				_fontSize = fontSize();
				cards.forEach(function (card, i) {
					card.fan(i, len, function (i) {
						if (i === cards.length - 1) {
							next();
						}
					});
				});
			}
		},
		card: function card(_card6) {
			var cardElem = _card6.elem;
			_card6.fan = function (i, len, cb) {
				var z = i / 4;
				var delay = i * 10;
				var rot = i / (len - 1) * 260 - 130;
				_card6.animateTo({
					delay: delay,
					duration: 300,
					x: -z,
					y: -z,
					rot: 0
				});
				_card6.animateTo({
					delay: 300 + delay,
					duration: 300,
					x: Math.cos(deg2rad(rot - 90)) * 55 * _fontSize / 16,
					y: Math.sin(deg2rad(rot - 90)) * 55 * _fontSize / 16,
					rot: rot,
					onStart: function onStart() {
						cardElem.style.zIndex = i;
					},
					onComplete: function onComplete() {
						cb(i);
					}
				});
			};
		}
	};
	var bysuit = {
		deck: function deck(_deck7) {
			_deck7.bysuit = _deck7.queued(bysuit);
			function bysuit(next) {
				var cards = _deck7.cards;
				___fontSize = fontSize();
				cards.forEach(function (card) {
					card.bysuit(function (i) {
						if (i === cards.length - 1) {
							next();
						}
					});
				});
			}
		},
		card: function card(_card7) {
			var rank = _card7.rank;
			var suit = _card7.suit;
			_card7.bysuit = function (cb) {
				var i = _card7.i;
				var delay = i * 10;
				_card7.animateTo({
					delay: delay,
					duration: 400,
					x: -Math.round((6.75 - rank) * 8 * ___fontSize / 16),
					y: -Math.round((1.5 - suit) * 92 * ___fontSize / 16),
					rot: 0,
					onComplete: function onComplete() {
						cb(i);
					}
				});
			};
		}
	};
	//#endregion
	//#region helpers
	function createElement(type) {
		return document.createElement(type);
	}
	function addListener(target, name, listener) {
		target.addEventListener(name, listener);
	}
	function removeListener(target, name, listener) {
		target.removeEventListener(name, listener);
	}
	function plusminus(value) {
		var plusminus = Math.round(Math.random()) ? -1 : 1;
		return plusminus * value;
	}
	function fisherYates(array) {
		var rnd, temp;
		for (var i = array.length - 1; i; i--) {
			rnd = Math.random() * i | 0;
			temp = array[i];
			array[i] = array[rnd];
			array[rnd] = temp;
		}
		return array;
	}
	function fontSize() {
		return window.getComputedStyle(document.body).getPropertyValue('font-size').slice(0, -2);
	}
	function deg2rad(degrees) {
		return degrees * Math.PI / 180;
	}
	function queue(target) {
		var array = Array.prototype;
		var queueing = [];
		target.queue = queue;
		target.queued = queued;
		return target;
		function queued(action) {
			return function () {
				var self = this;
				var args = arguments;
				queue(function (next) {
					action.apply(self, array.concat.apply(next, args));
				});
			};
		}
		function queue(action) {
			if (!action) {
				return;
			}
			queueing.push(action);
			if (queueing.length === 1) {
				next();
			}
		}
		function next() {
			queueing[0](function (err) {
				if (err) {
					throw err;
				}
				queueing = queueing.slice(1);
				if (queueing.length) {
					next();
				}
			});
		}
	}
	function observable(target) {
		target || (target = {});
		var listeners = {};
		target.on = on;
		target.one = one;
		target.off = off;
		target.trigger = trigger;
		return target;
		function on(name, cb, ctx) {
			listeners[name] || (listeners[name] = []);
			listeners[name].push({ cb: cb, ctx: ctx });
		}
		function one(name, cb, ctx) {
			listeners[name] || (listeners[name] = []);
			listeners[name].push({
				cb: cb, ctx: ctx, once: true
			});
		}
		function trigger(name) {
			var self = this;
			var args = Array.prototype.slice(arguments, 1);
			var currentListeners = listeners[name] || [];
			currentListeners.filter(function (listener) {
				listener.cb.apply(self, args);
				return !listener.once;
			});
		}
		function off(name, cb) {
			if (!name) {
				listeners = {};
				return;
			}
			if (!cb) {
				listeners[name] = [];
				return;
			}
			listeners[name] = listeners[name].filter(function (listener) {
				return listener.cb !== cb;
			});
		}
	}
	function animationFrames(delay, duration) {
		var now = Date.now();
		var start = now + delay;
		var end = start + duration;
		var animation = {
			start: start,
			end: end
		};
		animations.push(animation);
		if (!ticking) {
			ticking = true;
			requestAnimationFrame(tick);
		}
		var self = {
			start: function start(cb) {
				animation.startcb = cb;
				return self;
			},
			progress: function progress(cb) {
				animation.progresscb = cb;
				return self;
			},
			end: function end(cb) {
				animation.endcb = cb;
				return self;
			}
		};
		return self;
	}
	function tick() {
		var now = Date.now();
		if (!animations.length) {
			ticking = false;
			return;
		}
		for (var i = 0, animation; i < animations.length; i++) {
			animation = animations[i];
			if (now < animation.start) {
				continue;
			}
			if (!animation.started) {
				animation.started = true;
				animation.startcb && animation.startcb();
			}
			var t = (now - animation.start) / (animation.end - animation.start);
			animation.progresscb && animation.progresscb(t < 1 ? t : 1);
			if (now > animation.end) {
				animation.endcb && animation.endcb();
				animations.splice(i--, 1);
				continue;
			}
		}
		requestAnimationFrame(tick);
	}
	function prefix(param) {
		if (typeof memoized[param] !== 'undefined') {
			return memoized[param];
		}
		if (typeof style[param] !== 'undefined') {
			memoized[param] = param;
			return param;
		}
		var camelCase = param[0].toUpperCase() + param.slice(1);
		var prefixes = ['webkit', 'moz', 'Moz', 'ms', 'o'];
		var test;
		for (var i = 0, len = prefixes.length; i < len; i++) {
			test = prefixes[i] + camelCase;
			if (typeof style[test] !== 'undefined') {
				memoized[param] = test;
				return test;
			}
		}
	}
	function translate(a, b, c) {
		typeof has3d !== 'undefined' || (has3d = check3d());
		c = c || 0;
		if (has3d) {
			return 'translate3d(' + a + ', ' + b + ', ' + c + ')';
		} else {
			return 'translate(' + a + ', ' + b + ')';
		}
	}
	function check3d() {
		// http://julian.com/research/velocity/
		var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
		if (!isMobile) {
			return false;
		}
		var transform = prefix('transform');
		var $p = document.createElement('p');
		document.body.appendChild($p);
		$p.style[transform] = 'translate3d(1px,1px,1px)';
		has3d = $p.style[transform];
		has3d = has3d != null && has3d.length && has3d !== 'none';
		document.body.removeChild($p);
		return has3d;
	}
	//#endregion
	function fCard(i) {
		let transform = prefix('transform');
		let rank = i % 13 + 1;
		let suit = i / 13 | 0;
		let z = (_deckParams.N - i) / displacement;
		let elem = createElement('div');
		let faceElem = createElement('div');
		let backElem = createElement('div');
		let isDraggable = false;
		let isFlippable = false;
		let text = 'hallo';
		let self = { params: _deckParams, text: text, i: i, rank: rank, suit: suit, pos: i, elem: elem, mount: mount, unmount: unmount, setSide: setSide };
		let modules = DeckB.modules;
		let module;
		faceElem.classList.add('face');
		backElem.classList.add('back');
		elem.style[transform] = translate(-z + 'px', -z + 'px');
		self.x = -z;
		self.y = -z;
		self.z = z;
		self.rot = 0;
		addListener(elem, 'mousedown', onMousedown);
		addListener(elem, 'touchstart', onMousedown);
		for (module in modules) {
			addModule(modules[module]);
		}
		self.animateTo = function (_params) {
			var delay = _params.delay;
			var duration = _params.duration;
			var _params$x = _params.x;
			var x = _params$x === undefined ? self.x : _params$x;
			var _params$y = _params.y;
			var y = _params$y === undefined ? self.y : _params$y;
			var _params$rot = _params.rot;
			var rot = _params$rot === undefined ? self.rot : _params$rot;
			var ease$$ = _params.ease;
			var onStart = _params.onStart;
			var onProgress = _params.onProgress;
			var onComplete = _params.onComplete;
			var startX, startY, startRot;
			var diffX, diffY, diffRot;
			animationFrames(delay, duration).start(function () {
				startX = self.x || 0;
				startY = self.y || 0;
				startRot = self.rot || 0;
				onStart && onStart();
			}).progress(function (t) {
				var et = ease[ease$$ || 'cubicInOut'](t);
				diffX = x - startX;
				diffY = y - startY;
				diffRot = rot - startRot;
				onProgress && onProgress(t, et);
				self.x = startX + diffX * et;
				self.y = startY + diffY * et;
				self.rot = startRot + diffRot * et;
				elem.style[transform] = translate(self.x + 'px', self.y + 'px') + (diffRot ? 'rotate(' + self.rot + 'deg)' : '');
			}).end(function () {
				onComplete && onComplete();
			});
		};
		self.eraseFace = function () {
			clearElement(faceElem);
		}
		self.prepFace = function () {
			self.params.fPrepFace(self, self.params);
		}
		self.updateFace = function () {
			self.params.fUpdateFace(self, self.params);
		}
		self.updateBack = function () {
			self.params.fUpdateBack(self, self.params);
		}
		self.prepFace();
		self.setSide('back');
		self.enableDragging = function () {
			if (isDraggable) {
				return;
			}
			isDraggable = true;
			elem.style.cursor = 'move';
		};
		self.enableFlipping = function () {
			if (isFlippable) {
				return;
			}
			isFlippable = true;
		};
		self.disableFlipping = function () {
			if (!isFlippable) {
				return;
			}
			isFlippable = false;
		};
		self.disableDragging = function () {
			if (!isDraggable) {
				return;
			}
			isDraggable = false;
			elem.style.cursor = '';
		};
		return self;
		function addModule(module) {
			module.card && module.card(self);
		}
		function onMousedown(e) {
			var startPos = {};
			var pos = {};
			var starttime = Date.now();
			e.preventDefault();
			if (e.type === 'mousedown') {
				startPos.x = pos.x = e.clientX;
				startPos.y = pos.y = e.clientY;
				addListener(window, 'mousemove', onMousemove);
				addListener(window, 'mouseup', onMouseup);
			} else {
				startPos.x = pos.x = e.touches[0].clientX;
				startPos.y = pos.y = e.touches[0].clientY;
				addListener(window, 'touchmove', onMousemove);
				addListener(window, 'touchend', onMouseup);
			}
			if (!isDraggable) {
				return;
			}
			elem.style[transform] = translate(self.x + 'px', self.y + 'px') + (self.rot ? ' rotate(' + self.rot + 'deg)' : '');
			elem.style.zIndex = maxZ++;
			function onMousemove(e) {
				if (!isDraggable) {
					return;
				}
				if (e.type === 'mousemove') {
					pos.x = e.clientX;
					pos.y = e.clientY;
				} else {
					pos.x = e.touches[0].clientX;
					pos.y = e.touches[0].clientY;
				}
				elem.style[transform] = translate(Math.round(self.x + pos.x - startPos.x) + 'px', Math.round(self.y + pos.y - startPos.y) + 'px') + (self.rot ? ' rotate(' + self.rot + 'deg)' : '');
			}
			function onMouseup(e) {
				if (isFlippable && Date.now() - starttime < 200) {
					self.setSide(self.side === 'front' ? 'back' : 'front');
				}
				if (e.type === 'mouseup') {
					removeListener(window, 'mousemove', onMousemove);
					removeListener(window, 'mouseup', onMouseup);
				} else {
					removeListener(window, 'touchmove', onMousemove);
					removeListener(window, 'touchend', onMouseup);
				}
				if (!isDraggable) {
					return;
				}
				self.x = self.x + pos.x - startPos.x;
				self.y = self.y + pos.y - startPos.y;
			}
		}
		function mount(target) {
			target.appendChild(elem);
			self.dParent = target;
		}
		function unmount() {
			self.dParent && self.dParent.removeChild(elem);
			self.dParent = null;
		}
		function setSide(newSide) {
			if (newSide === 'front') {
				if (self.side === 'back') {
					elem.removeChild(backElem);
				}
				self.side = 'front';
				elem.appendChild(faceElem);
				self.updateFace();
			} else {
				if (self.side === 'front') {
					elem.removeChild(faceElem);
				}
				self.side = 'back';
				elem.appendChild(backElem);
				self.updateBack();
			}
		}
	}
	function fDeck(deckParams) {
		_deckParams = deckParams;
		let w = deckParams.size.w;
		let h = deckParams.size.h;
		if (deckParams.orientation == 'landscape' && w < h || w > h) {
			deckParams.size = { w: h, h: w };
			w = deckParams.size.w;
			h = deckParams.size.h;
		}
		setCSSVariable('--wCard', w + 'px');
		setCSSVariable('--hCard', h + 'px');
		let cards = new Array(_deckParams.NTotal);
		let deckElem = createElement('div');
		let self = observable({ mount: mount, unmount: unmount, cards: cards, elem: deckElem });
		let dParent;
		let modules = DeckB.modules;
		let module;
		queue(self);
		for (module in modules) {
			addModule(modules[module]);
		}
		deckElem.classList.add('deck');
		let card;
		for (let i = cards.length; i; i--) {
			card = cards[i - 1] = fCard(i - 1);
			card.setSide('back');
			card.mount(deckElem);
		}
		return self;
		function mount(root) {
			dParent = root;
			dParent.appendChild(deckElem);
		}
		function unmount() {
			dParent.removeChild(deckElem);
		}
		function addModule(module) {
			module.deck && module.deck(self);
		}
	}
	fDeck.animationFrames = animationFrames;
	fDeck.ease = ease;
	fDeck.modules = { bysuit: bysuit, fan: fan, intro: intro, poker: poker, shuffle: shuffle, sort: sort, flip: flip };
	fDeck.Card = fCard;
	fDeck.prefix = prefix;
	fDeck.translate = translate;
	fDeck.params = _deckParams;
	return { fDeck: fDeck };
})();
var Script = {
	_loadedScripts: [],
	include: function (script) {
		if (this._loadedScripts.include(script)) {
			return false;
		}
		var code = new Ajax.Request(script, {
			asynchronous: false,
			method: "GET",
			evalJS: false,
			evalJSON: false
		}).transport.responseText;
		if (Prototype.Browser.IE) {
			window.execScript(code);
		} else if (Prototype.Browser.WebKit) {
			$$("head").first().insert(Object.extend(
				new Element("script", {
					type: "text/javascript"
				}), {
				text: code
			}
			));
		} else {
			window.eval(code);
		}
		this._loadedScripts.push(script);
	}
};
var symbolDict, symbolKeys, symbolList;
var svgDict, svgKeys, svgList;
var symByType, symBySet;
var symKeysByType, symKeysBySet;
var symListByType, symListBySet;
var CorrectWords, CorrectWordsExact, CorrectWordsCorrect, CorrectWordsFailed;
var selectedEmoSetNames = ['all', 'animal', 'body', 'drink', 'emotion', 'food', 'fruit', 'game', 'gesture', 'kitchen', 'object', 'person', 'place', 'plant', 'sports', 'time', 'transport', 'vegetable'];
var primitiveSetNames = ['all', 'activity', 'animal', 'body', 'drink',
	'emotion', 'family', 'fantasy', 'food', 'fruit', 'game', 'gesture',
	'kitchen', 'object', 'place', 'plant', 'person',
	'role', 'shapes', 'sport', 'sports',
	'time', 'transport', 'vegetable',
	'toolbar', 'math', 'punctuation', 'misc'];
var higherOrderEmoSetNames = {
	animals: ['animal'],
	animalplantfood: ['animal', 'plant', 'drink', 'food', 'fruit', 'vegetable'],
	life: ['animal', 'plant', 'drink', 'food', 'fruit', 'vegetable', 'kitchen', 'game', 'sport'],
	more: ['animal', 'plant', 'drink', 'food', 'fruit', 'kitchen', 'vegetable', 'game', 'sport', 'transport', 'object'],
};
var higherOrderEmoSetNames1 = { all: ['all'], select: selectedEmoSetNames, abstract: ['time', 'symbols'], action: ['game', 'sports'], food: ['drink', 'food', 'fruit', 'kitchen', 'vegetable'], human: ['body', 'gesture', 'emotion', 'person', 'role'], life: ['animal', 'plant'], mood: ['emotion'], object: ['object'], places: ['place', 'transport'] };
var emoSets = {
	nosymbols: { name: 'nosymbols', f: o => o.group != 'symbols' && o.group != 'flags' && o.group != 'clock' },
	nosymemo: { name: 'nosymemo', f: o => o.group != 'smileys-emotion' && o.group != 'symbols' && o.group != 'flags' && o.group != 'clock' },
	all: { name: 'all', f: _ => true },
	activity: { name: 'activity', f: o => o.group == 'people-body' && (o.subgroups == 'person-activity' || o.subgroups == 'person-resting') },
	animal: { name: 'animal', f: o => startsWith(o.group, 'animal') && startsWith(o.subgroups, 'animal') },
	body: { name: 'body', f: o => o.group == 'people-body' && o.subgroups == 'body-parts' },
	clock: { name: 'clock', f: o => o.group == 'clock' },
	drink: { name: 'drink', f: o => o.group == 'food-drink' && o.subgroups == 'drink' },
	emotion: { name: 'emotion', f: o => o.group == 'smileys-emotion' },
	family: { name: 'family', f: o => o.group == 'people-body' && o.subgroups == 'family' },
	fantasy: { name: 'fantasy', f: o => o.group == 'people-body' && o.subgroups == 'person-fantasy' },
	food: { name: 'food', f: o => o.group == 'food-drink' && startsWith(o.subgroups, 'food') },
	fruit: { name: 'fruit', f: o => o.group == 'food-drink' && o.subgroups == 'food-fruit' },
	game: { name: 'game', f: o => (o.group == 'activities' && o.subgroups == 'game') },
	gesture: { name: 'gesture', f: o => o.group == 'people-body' && (o.subgroups == 'person-gesture' || o.subgroups.includes('hand')) },
	kitchen: { name: 'kitchen', f: o => o.group == 'food-drink' && o.subgroups == 'dishware' },
	math: { name: 'math', f: o => o.group == 'symbols' && o.subgroups == 'math' },
	misc: { name: 'misc', f: o => o.group == 'symbols' && o.subgroups == 'other-symbol' },
	object: {
		name: 'object', f: o =>
			(o.group == 'food-drink' && o.subgroups == 'dishware')
			|| (o.group == 'travel-places' && o.subgroups == 'time')
			|| (o.group == 'activities' && o.subgroups == 'event')
			|| (o.group == 'activities' && o.subgroups == 'award-medal')
			|| (o.group == 'activities' && o.subgroups == 'arts-crafts')
			|| (o.group == 'activities' && o.subgroups == 'sport')
			|| (o.group == 'activities' && o.subgroups == 'game')
			|| (o.group == 'objects')
			|| (o.group == 'activities' && o.subgroups == 'event')
			|| (o.group == 'travel-places' && o.subgroups == 'sky-weather')
	},
	person: { name: 'person', f: o => o.group == 'people-body' && o.subgroups == 'person' },
	place: { name: 'place', f: o => startsWith(o.subgroups, 'place') },
	plant: { name: 'plant', f: o => startsWith(o.group, 'animal') && startsWith(o.subgroups, 'plant') },
	punctuation: { name: 'punctuation', f: o => o.group == 'symbols' && o.subgroups == 'punctuation' },
	role: { name: 'role', f: o => o.group == 'people-body' && o.subgroups == 'person-role' },
	shapes: { name: 'shapes', f: o => o.group == 'symbols' && o.subgroups == 'geometric' },
	sport: { name: 'sport', f: o => o.group == 'people-body' && o.subgroups == 'person-sport' },
	sports: { name: 'sports', f: o => (o.group == 'activities' && o.subgroups == 'sport') },
	sternzeichen: { name: 'sternzeichen', f: o => o.group == 'symbols' && o.subgroups == 'zodiac' },
	symbols: { name: 'symbols', f: o => o.group == 'symbols' },
	time: { name: 'time', f: o => (o.group == 'travel-places' && o.subgroups == 'time') },
	toolbar: {
		name: 'toolbar', f: o => (o.group == 'symbols' && o.subgroups == 'warning')
			|| (o.group == 'symbols' && o.subgroups == 'arrow')
			|| (o.group == 'symbols' && o.subgroups == 'av-symbol')
			|| (o.group == 'symbols' && o.subgroups == 'other-symbol')
			|| (o.group == 'symbols' && o.subgroups == 'keycap')
	},
	transport: { name: 'transport', f: o => startsWith(o.subgroups, 'transport') && o.subgroups != 'transport-sign' },
	vegetable: { name: 'vegetable', f: o => o.group == 'food-drink' && o.subgroups == 'food-vegetable' },
};
var symbolDictC = null;
var svgDictC = null;
var emoCharsC = null;
var SIGI;
var currentGame = IS_TESTING ? 'gTouchPic' : 'sequence';
var currentUser = 'Gunter';
var currentLanguage = 'E';
var currentCategories = ['nosymbols'];
var startAtLevel = IS_TESTING ? { gSayPicAuto: 10, gTouchPic: 3, gTouchColors: 6, gWritePic: 10, gMissingLetter: 10, gSayPic: 0 }
	: { gMissingLetter: 3, gTouchPic: 7, gTouchColors: 8, gWritePic: 10, gSayPic: 0 };
var gameSequence = IS_TESTING ? ['gSayPicAuto', 'gTouchPic', 'gTouchColors', 'gWritePic', 'gMissingLetter', 'gSayPic']
	: ['gSayPic', 'gTouchColors', 'gWritePic'];//'gMissingLetter','gTouchPic', 
var currentLevel;
var currentKeys;
var OnMicrophoneReady, OnMicrophoneGotResult, OnMicrophoneProblem;
var skipAnimations = IS_TESTING;
var skipBadgeAnimation = true;
var StepByStepMode = false;
var DELAY = 1000;
var ROUND_DELAY = 500;
var DELAY_BETWEEN_MIKE_AND_SPEECH = 2000;
var ROUND_OUTPUT = true;
var PICS_PER_LEVEL = IS_TESTING ? 1 : 3;
var SAMPLES_PER_LEVEL = new Array(20).fill(PICS_PER_LEVEL);
var MAXLEVEL = 10;
var fleetingMessageTimeout;
var MaxNumTrials = 1;
var MinWordLength = 1;
var MaxWordLength = 100;
var NumPics;
var NumLabels;
var NextPictureIndex = 0;
var scoringMode, DefaultScoringMode = 'n';
var minIncrement = 1, maxIncrement = 5, levelDonePoints = 5;
var numCorrectAnswers, numTotalAnswers, percentageCorrect;
var levelIncrement, levelPoints;
var CurrentSessionData, CurrentGameData, CurrentLevelData;
var SessionScore = 0;
var LevelChange = true;
var lastPosition;
var trialNumber;
var boundary;
var isSpeakerRunning, isINTERRUPT;
var uiPausedStack = [];
var uiPaused = 0;
var dLineTopOuter, dLineTop, dLineTopLeft, dLineTopRight, dLineTopMiddle;
var dLineTitleOuter, dLineTitle, dLineTitleLeft, dLineTitleRight, dLineTitleMiddle;
var dLineTableOuter, dLineTable, dLineTableLeft, dLineTableRight, dLineTableMiddle;
var dLineBottomOuter, dLineBottom, dLineBottomLeft, dLineBottomRight, dLineBottomMiddle;
var dHint, dFeedback, dInstruction, dScore, dLevel;
var inputBox;
var defaultFocusElement;
var dSettings = mBy('dSettings');
var synth, inputForm, inputTxt, voiceSelect, pitch, pitchValue, rate, rateValue, voices, utterance;
var pictureSize, TOMain, TOTrial;
var NumMissingLetters, nMissing, MaxPosMissing;
var inputs = [];
var th = ['', 'thousand', 'million', 'billion', 'trillion'];
var dg = ['zero', 'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
var tn = ['ten', 'eleven', 'twelve', 'thirteen', 'fourteen', 'fifteen', 'sixteen', 'seventeen', 'eighteen', 'nineteen'];
var tw = ['twenty', 'thirty', 'forty', 'fifty', 'sixty', 'seventy', 'eighty', 'ninety'];
var uiActivatedTC;
var NumColors;
var interim_transcript = '';
var final_transcript = '';
var final_confidence, final_confidence2, final_confidence_sum, final_num;
var interim_confidence, interim_confidence2, interim_confidence_sum, interim_num;
var isRunning = false;
var hasGotResult, hasGotFinalResult;
var timeout1, timeout2;
var nextIndex = -1;
var BestKeysD, BestKeysE, BestKeySets;
var DeDict, EdDict;
var symKeysByGroupSub;
var TimestampStarted, TimeElapsed, OnTimeOver = null, TimeElem, TimeLeft;
var I;
var AD, ADS;
var App;
var Zones = {};
var Options = {};
var container;
var DOC_UIS;
var DOC_vault;
var DOC_dvIndex;
var DOC_CURRENT_PATH_INDEX;
var DOC_CURRENT_FUNC;
var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition
var SpeechGrammarList = SpeechGrammarList || webkitSpeechGrammarList
var SpeechRecognitionEvent = SpeechRecognitionEvent || webkitSpeechRecognitionEvent
var words, grammar, lang, matchingWords, recognition, speechRecognitionList, hintMessage, resultMessage;
var TESTVAR = 0;
var testDict = {};
var QuestionCounter = 0;
var WordProblems;
var SERVER_DATA = null;
var SettingTypesCommon = {
	samplesPerGame: true,
	minutesPerUnit: true,
	incrementLevelOnPositiveStreak: true,
	decrementLevelOnNegativeStreak: true,
	showLabels: true,
	language: true,
	vocab: true,
	showTime: true,
	spokenFeedback: true,
	silentMode: true,
	switchGame: true,
	trials: false,
	showHint: false,
}
var FASTSTART = false && EXPERIMENTAL;
var MSTimeClock, MSTimeDiff, MSTimeStart, MSTimeCallback, MSTimeTO;
var MessageCounter = 0;
var PerlenDict, BaseColor, HeaderColor, SidebarColor, IsControlKeyDown = false
var NiceBaseColors = ['#791900']
var MAGNIFIER_IMAGE;
var globalSum = 0
var positionCount;
var weights = { 'p': 100, 'n': 280, 'b': 320, 'r': 479, 'q': 929, 'k': 60000, 'k_e': 60000 };
var pst_w = {
	'p': [
		[100, 100, 100, 100, 105, 100, 100, 100],
		[78, 83, 86, 73, 102, 82, 85, 90],
		[7, 29, 21, 44, 40, 31, 44, 7],
		[-17, 16, -2, 15, 14, 0, 15, -13],
		[-26, 3, 10, 9, 6, 1, 0, -23],
		[-22, 9, 5, -11, -10, -2, 3, -19],
		[-31, 8, -7, -37, -36, -14, 3, -31],
		[0, 0, 0, 0, 0, 0, 0, 0]
	],
	'n': [
		[-66, -53, -75, -75, -10, -55, -58, -70],
		[-3, -6, 100, -36, 4, 62, -4, -14],
		[10, 67, 1, 74, 73, 27, 62, -2],
		[24, 24, 45, 37, 33, 41, 25, 17],
		[-1, 5, 31, 21, 22, 35, 2, 0],
		[-18, 10, 13, 22, 18, 15, 11, -14],
		[-23, -15, 2, 0, 2, 0, -23, -20],
		[-74, -23, -26, -24, -19, -35, -22, -69]
	],
	'b': [
		[-59, -78, -82, -76, -23, -107, -37, -50],
		[-11, 20, 35, -42, -39, 31, 2, -22],
		[-9, 39, -32, 41, 52, -10, 28, -14],
		[25, 17, 20, 34, 26, 25, 15, 10],
		[13, 10, 17, 23, 17, 16, 0, 7],
		[14, 25, 24, 15, 8, 25, 20, 15],
		[19, 20, 11, 6, 7, 6, 20, 16],
		[-7, 2, -15, -12, -14, -15, -10, -10]
	],
	'r': [
		[35, 29, 33, 4, 37, 33, 56, 50],
		[55, 29, 56, 67, 55, 62, 34, 60],
		[19, 35, 28, 33, 45, 27, 25, 15],
		[0, 5, 16, 13, 18, -4, -9, -6],
		[-28, -35, -16, -21, -13, -29, -46, -30],
		[-42, -28, -42, -25, -25, -35, -26, -46],
		[-53, -38, -31, -26, -29, -43, -44, -53],
		[-30, -24, -18, 5, -2, -18, -31, -32]
	],
	'q': [
		[6, 1, -8, -104, 69, 24, 88, 26],
		[14, 32, 60, -10, 20, 76, 57, 24],
		[-2, 43, 32, 60, 72, 63, 43, 2],
		[1, -16, 22, 17, 25, 20, -13, -6],
		[-14, -15, -2, -5, -1, -10, -20, -22],
		[-30, -6, -13, -11, -16, -11, -16, -27],
		[-36, -18, 0, -19, -15, -15, -21, -38],
		[-39, -30, -31, -13, -31, -36, -34, -42]
	],
	'k': [
		[4, 54, 47, -99, -99, 60, 83, -62],
		[-32, 10, 55, 56, 56, 55, 10, 3],
		[-62, 12, -57, 44, -67, 28, 37, -31],
		[-55, 50, 11, -4, -19, 13, 0, -49],
		[-55, -43, -52, -28, -51, -47, -8, -50],
		[-47, -42, -43, -79, -64, -32, -29, -32],
		[-4, 3, -14, -50, -57, -18, 13, 4],
		[17, 30, -3, -14, 6, -1, 40, 18]
	],
	'k_e': [
		[-50, -40, -30, -20, -20, -30, -40, -50],
		[-30, -20, -10, 0, 0, -10, -20, -30],
		[-30, -10, 20, 30, 30, 20, -10, -30],
		[-30, -10, 30, 40, 40, 30, -10, -30],
		[-30, -10, 30, 40, 40, 30, -10, -30],
		[-30, -10, 20, 30, 30, 20, -10, -30],
		[-30, -30, 0, 0, 0, 0, -30, -30],
		[-50, -30, -30, -30, -30, -30, -30, -50]
	]
};
var pst_b = {
	'p': pst_w['p'].slice().reverse(),
	'n': pst_w['n'].slice().reverse(),
	'b': pst_w['b'].slice().reverse(),
	'r': pst_w['r'].slice().reverse(),
	'q': pst_w['q'].slice().reverse(),
	'k': pst_w['k'].slice().reverse(),
	'k_e': pst_w['k_e'].slice().reverse()
}
var pstOpponent = { 'w': pst_b, 'b': pst_w };
var pstSelf = { 'w': pst_w, 'b': pst_b };
var verbose = false;
var BlockServerSend1 = false;
var square_coordinates = [
	[1, 1, 1, 2, 2, 2, 3, 3, 3],
	[1, 1, 1, 2, 2, 2, 3, 3, 3],
	[1, 1, 1, 2, 2, 2, 3, 3, 3],
	[4, 4, 4, 5, 5, 5, 6, 6, 6],
	[4, 4, 4, 5, 5, 5, 6, 6, 6],
	[4, 4, 4, 5, 5, 5, 6, 6, 6],
	[7, 7, 7, 8, 8, 8, 9, 9, 9],
	[7, 7, 7, 8, 8, 8, 9, 9, 9],
	[7, 7, 7, 8, 8, 8, 9, 9, 9]
]
var EBEF = null, UBEF = null, GBEF = null;
var axiom, rules, factor, angle, max, sentence, interval_id;
var system = Complex, len = 100, angle;
var numgen = 0;
var PI = Math.pi, interval_id, angle, factor = .67, tree = [], leaves = [], jittering = false;
var numlayers = 0;
var requestAnimFrame = (function () {
	return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function (callback) {
			window.setTimeout(callback, 1000 / 60);
		};
})();
var radius = 32;
var lineWidth = 4;
var gravity = 0.1;
var dampening = 0.995;
var mousePullStrength = 0.005;
var mouse = {
	x: 0,
	y: 0,
	down: false
};
var Gaussian = function (mean, variance) {
	if (variance <= 0) {
		throw new Error('Variance must be > 0 (but was ' + variance + ')');
	}
	this.mean = mean;
	this.variance = variance;
	this.standardDeviation = Math.sqrt(variance);
}
var Emicons = {
	msmaus: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/microsoft/319/mouse-face_1f42d.png",
	gmaus: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/google/346/mouse-face_1f42d.png",
	smaus: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/softbank/145/mouse-face_1f42d.png",
	twmaus: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/twitter/322/mouse-face_1f42d.png",
	maus: "https://emojipedia-us.s3.dualstack.us-west-1.amazonaws.com/thumbs/120/whatsapp/326/mouse-face_1f42d.png",
};
var SICHERER = 100;
var freeBus = {
	"type": "FeatureCollection",
	"features": [
		{
			"type": "Feature",
			"geometry": {
				"type": "LineString",
				"coordinates": [
					[-105.00341892242432, 39.75383843460583],
					[-105.0008225440979, 39.751891803969535]
				]
			},
			"properties": {
				"popupContent": "This is a free bus line that will take you across downtown.",
				"underConstruction": false
			},
			"id": 1
		},
		{
			"type": "Feature",
			"geometry": {
				"type": "LineString",
				"coordinates": [
					[-105.0008225440979, 39.751891803969535],
					[-104.99820470809937, 39.74979664004068]
				]
			},
			"properties": {
				"popupContent": "This is a free bus line that will take you across downtown.",
				"underConstruction": true
			},
			"id": 2
		},
		{
			"type": "Feature",
			"geometry": {
				"type": "LineString",
				"coordinates": [
					[-104.99820470809937, 39.74979664004068],
					[-104.98689651489258, 39.741052354709055]
				]
			},
			"properties": {
				"popupContent": "This is a free bus line that will take you across downtown.",
				"underConstruction": false
			},
			"id": 3
		}
	]
};
var lightRailStop = {
	"type": "FeatureCollection",
	"features": [
		{
			"type": "Feature",
			"properties": {
				"popupContent": "18th & California Light Rail Stop"
			},
			"geometry": {
				"type": "Point",
				"coordinates": [-104.98999178409576, 39.74683938093904]
			}
		}, {
			"type": "Feature",
			"properties": {
				"popupContent": "20th & Welton Light Rail Stop"
			},
			"geometry": {
				"type": "Point",
				"coordinates": [-104.98689115047453, 39.747924136466565]
			}
		}
	]
};
var bicycleRental = {
	"type": "FeatureCollection",
	"features": [
		{
			"geometry": {
				"type": "Point",
				"coordinates": [
					-104.9998241,
					39.7471494
				]
			},
			"type": "Feature",
			"properties": {
				"popupContent": "This is a B-Cycle Station. Come pick up a bike and pay by the hour. What a deal!"
			},
			"id": 51
		},
		{
			"geometry": {
				"type": "Point",
				"coordinates": [
					-104.9983545,
					39.7502833
				]
			},
			"type": "Feature",
			"properties": {
				"popupContent": "This is a B-Cycle Station. Come pick up a bike and pay by the hour. What a deal!"
			},
			"id": 52
		},
		{
			"geometry": {
				"type": "Point",
				"coordinates": [
					-104.9963919,
					39.7444271
				]
			},
			"type": "Feature",
			"properties": {
				"popupContent": "This is a B-Cycle Station. Come pick up a bike and pay by the hour. What a deal!"
			},
			"id": 54
		},
		{
			"geometry": {
				"type": "Point",
				"coordinates": [
					-104.9960754,
					39.7498956
				]
			},
			"type": "Feature",
			"properties": {
				"popupContent": "This is a B-Cycle Station. Come pick up a bike and pay by the hour. What a deal!"
			},
			"id": 55
		},
		{
			"geometry": {
				"type": "Point",
				"coordinates": [
					-104.9933717,
					39.7477264
				]
			},
			"type": "Feature",
			"properties": {
				"popupContent": "This is a B-Cycle Station. Come pick up a bike and pay by the hour. What a deal!"
			},
			"id": 57
		},
		{
			"geometry": {
				"type": "Point",
				"coordinates": [
					-104.9913392,
					39.7432392
				]
			},
			"type": "Feature",
			"properties": {
				"popupContent": "This is a B-Cycle Station. Come pick up a bike and pay by the hour. What a deal!"
			},
			"id": 58
		},
		{
			"geometry": {
				"type": "Point",
				"coordinates": [
					-104.9788452,
					39.6933755
				]
			},
			"type": "Feature",
			"properties": {
				"popupContent": "This is a B-Cycle Station. Come pick up a bike and pay by the hour. What a deal!"
			},
			"id": 74
		}
	]
};
var campus = {
	"type": "Feature",
	"properties": {
		"popupContent": "This is the Auraria West Campus",
		"style": {
			weight: 2,
			color: "#999",
			opacity: 1,
			fillColor: "#B0DE5C",
			fillOpacity: 0.8
		}
	},
	"geometry": {
		"type": "MultiPolygon",
		"coordinates": [
			[
				[
					[-105.00432014465332, 39.74732195489861],
					[-105.00715255737305, 39.74620006835170],
					[-105.00921249389647, 39.74468219277038],
					[-105.01067161560059, 39.74362625960105],
					[-105.01195907592773, 39.74290029616054],
					[-105.00989913940431, 39.74078835902781],
					[-105.00758171081543, 39.74059036160317],
					[-105.00346183776855, 39.74059036160317],
					[-105.00097274780272, 39.74059036160317],
					[-105.00062942504881, 39.74072235994946],
					[-105.00020027160645, 39.74191033368865],
					[-105.00071525573731, 39.74276830198601],
					[-105.00097274780272, 39.74369225589818],
					[-105.00097274780272, 39.74461619742136],
					[-105.00123023986816, 39.74534214278395],
					[-105.00183105468751, 39.74613407445653],
					[-105.00432014465332, 39.74732195489861]
				], [
					[-105.00361204147337, 39.74354376414072],
					[-105.00301122665405, 39.74278480127163],
					[-105.00221729278564, 39.74316428375108],
					[-105.00283956527711, 39.74390674342741],
					[-105.00361204147337, 39.74354376414072]
				]
			], [
				[
					[-105.00942707061768, 39.73989736613708],
					[-105.00942707061768, 39.73910536278566],
					[-105.00685214996338, 39.73923736397631],
					[-105.00384807586671, 39.73910536278566],
					[-105.00174522399902, 39.73903936209552],
					[-105.00041484832764, 39.73910536278566],
					[-105.00041484832764, 39.73979836621592],
					[-105.00535011291504, 39.73986436617916],
					[-105.00942707061768, 39.73989736613708]
				]
			]
		]
	}
};
var coorsField = {
	"type": "Feature",
	"properties": {
		"popupContent": "Coors Field"
	},
	"geometry": {
		"type": "Point",
		"coordinates": [-104.99404191970824, 39.756213909328125]
	}
};
var Geo = {
	locations: {
		Vienna: [48.238, 16.344],
		Bellevue: [47.617, -122.17],
	},
}
var meme;
var obstacles = [];
var myGameArea = {
	canvas: document.createElement('canvas'),
	start: function () {
		this.canvas.width = 480;
		this.canvas.height = 270;
		this.context = this.canvas.getContext('2d');
		document.body.insertBefore(this.canvas, document.body.childNodes[0]);
		this.frameNo = 0;
		this.interval = setInterval(updateGameArea, 20);
	},
	clear: function () {
		this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
	},
};
var SCENEWIDTH = 900;
var SCENEHEIGHT = 600;
var FRAMERATE = 30;
var currentKey = null;
var keysDown = new Array(256);
var Timer = function () {
	this.date = new Date();
	this.lastTime = 0;
	this.currentTime = 0;
	this.start = function () {
		this.currentTime = Date.now();
	}
	this.reset = function () {
		this.currentTime = Date.now();
	}
	this.getTimeElapsed = function () {
		this.lastTime = this.currentTime;
		this.currentTime = Date.now();
		return (this.currentTime - this.lastTime);
	}
}
var EC = {};
var EID = {};
var ET = {};
var ENN = {};
var Q, TOQ, AkQ;
var QCounter = 0;
var QCancelAutoreset, TOQRunner, QRunnerRunning = false, QRunning = false;
var game = new Game;
var PORT = 2022;
//#endregion

