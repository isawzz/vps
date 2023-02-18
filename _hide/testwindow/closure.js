const names = ['felix', 'amanda', 'sabine', 'tom', 'taka', 'microbe', 'dwight', 'jim', 'michael', 'pam', 'kevin', 'darryl', 'lauren', 'anuj', 'david', 'holly'];
const BLUE = '#4363d8';
const BROWN = '#96613d';
const GREEN = '#3cb44b';
const BLUEGREEN = '#004054';
const FIREBRICK = '#800000';
const LIGHTGREEN = '#afff45'; //'#bfef45';
const LIGHTBLUE = '#42d4f4';
const OLIVE = '#808000';
const ORANGE = '#f58231';
const PURPLE = '#911eb4';
const RED = '#e6194B';
const TEAL = '#469990';
const YELLOW = '#ffe119';
const STYLE_PARAMS = {
  align: 'text-align',
  acontent: 'align-content',
  aitems: 'align-items',
  aspectRatio: 'aspect-ratio',
  bg: 'background-color',
  dir: 'flex-direction',
  fg: 'color',
  hgap: 'column-gap',
  vgap: 'row-gap',
  jcontent: 'justify-content',
  jitems: 'justify-items',
  justify: 'justify-content',
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
  hline: 'line-height',
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
const NEONORANGE = '#ff6700';
const NEONYELLOW = '#efff04';
const GT = {};
const CORNERS = ['◢', '◣', '◤', '◥'];
const config = {
  src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/175711/open-peeps-sheet.png',
  rows: 15,
  cols: 7
}
const img = document.createElement('img')
const stage = {
  width: 0,
  height: 0,
}
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
var visualStructures = {};
var UID = 0;
const MSCATS = { rect: 'g', g: 'g', circle: 'g', text: 'g', polygon: 'g', line: 'g', body: 'd', svg: 'd', div: 'd', p: 'd', table: 'd', button: 'd', a: 'd', span: 'd', image: 'd', paragraph: 'd', anchor: 'd' };
var UIS;
var GAME = 'ttt';
var S = {};
var G = null;
var ROOT = null;
var S_showEvents = false;
var c52;
var UIDCounter = 0;
var T;
var DA = {};
var Items = {};
var Session = {};
var Cinno;
var Syms;
var SymKeys;
var KeySets;
var Categories;
var ByGroupSubgroup;
var C52;
var U = null;
var Username;
var Serverdata = {};
var DB;
var Score;
var TO = {};
var uiActivated = false;
var Settings;
var dTable;
var TESTING = false;
var TOMan;
var Speech;
var R;
var A;
var dRechts;
var dOben;
var dStatus;
var SERVER = 'localhost';
var ColorDi;
var Counter = { server: 0 };
var Info;
var UI = {};
var dUsers;
var dGames;
var dTables;
var C52Cards;
var Config;
var PL;
var Z;
var FORCE_REDRAW = false;
var Clientdata = {};
var WhichCorner = 0;
var P;
var Zones = {};
var dParent;
var PI = Math.pi, interval_id, angle, factor = .67, tree = [], leaves = [], jittering = false;
var C = null;
var Sayings;
var Q;
var activatedTests = [];
var percentageCorrect;
var trialNumber;
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
function _poll() {
  if (nundef(U) || nundef(Z) || nundef(Z.friendly)) { console.log('poll without U or Z!!!', U, Z); return; }
  show_polling_signal();
  if (nundef(DA.pollCounter)) DA.pollCounter = 0; DA.pollCounter++; console.log('polling');
  if (Z.game == 'feedback' && i_am_host()) {
    send_or_sim({ friendly: Z.friendly, uname: Z.uplayer, fen: Z.fen, write_fen: true, auto: true }, 'table');
  } else send_or_sim({ friendly: Z.friendly, uname: Z.uplayer, auto: true }, 'table');
}
function a_game() {
  function state_info(dParent) { dParent.innerHTML = `turn: ${Z.turn}, stage:${Z.stage}`; }
  function setup(players, options) {
    let fen = { players: {}, plorder: jsCopy(players), history: [] };
    shuffle(fen.plorder);
    let starter = fen.starter = fen.plorder[0];
    let cards_needed = players.length * options.handsize * 1.4;
    fen.num_decks = Math.ceil(cards_needed / 52);
    fen.deck = create_fen_deck('n', fen.num_decks, 0);
    shuffle(fen.deck);
    let [i, n, diff] = [0, players.length, get_slot_diff(fen)];
    for (const plname of players) {
      let pl = fen.players[plname] = {
        hand: deck_deal(fen.deck, options.handsize),
        score: 0,
        name: plname,
        color: get_user_color(plname),
        slot: diff * i,
      };
      i++;
    }
    [fen.phase, fen.stage, fen.step, fen.turn] = ['', 'click', 0, [starter]];
    return fen;
  }
  function present() { present_a_game(); }
  function check_gameover() { return false; }
  function activate_ui() {
    activate_a_game();
  }
  function post_collect() { agmove_resolve(); }
  return { post_collect, state_info, setup, present, check_gameover, activate_ui };
}
function activate_a_game() {
  if (Z.stage == 'click') {
    show_MMM('back to normal!!!!');
    mButton('single turn move', agmove_single, dTable, { margin: 20 });
    mButton('clear players', agmove_clear_all, dTable, { margin: 20 });
    mButton('clear first', agmove_clear_first, dTable, { margin: 20 });
  } else if (Z.stage == 'clear') {
    agmove_startmulti();
  } else {
    mButton('indiv move', agmove_indiv, dTable, { margin: 20 });
  }
}
function activate_ui() {
  if (uiActivated) { DA.ai_is_moving = false; return; }
  uiActivated = true; DA.ai_is_moving = false;
}
function addBorder(elem, color, thickness) {
  elem.style.border = color + ' ' + thickness + 'px solid';
  elem.style.boxSizing = 'border-box';
}
function addIf(arr, el) { if (!arr.includes(el)) arr.push(el); }
function addKeys(ofrom, oto) { for (const k in ofrom) if (nundef(oto[k])) oto[k] = ofrom[k]; return oto; }
function agmove_clear_all() { Z.stage = 'clear'; Z.fen.endcond = 'all'; Z.fen.acting_host = Z.uplayer; Z.turn = [Z.uplayer]; take_turn_clear(); }
function agmove_clear_first() { Z.stage = 'clear'; Z.fen.endcond = 'first'; Z.fen.acting_host = Z.uplayer; Z.turn = [Z.uplayer]; take_turn_clear(); }
function agmove_indiv(plname, slot) {
  if (isDict(plname) && Z.uplayer != 'mimi') return;
  if (isString(plname)) Z.uplayer = plname;
  console.log('sender:', Z.uplayer);
  let pl = Z.fen.players[Z.uplayer];
  Z.state = { val: pl.hand[0] };
  if (nundef(slot)) slot = busy_wait_until_slot(pl.slot);
  console.log('time sending:', slot, Date.now());
  take_turn_collect_open();
  if (plname != 'felix') agmove_indiv('felix', pl.slot);
}
function agmove_resolve() {
  console.log('---------------------- RESOLVE ----------------------');
  assertion(isdef(Z.playerdata), 'no playerdata');
  assertion(Z.uplayer == Z.fen.acting_host, 'wrong player resolves!!!!', Z.uplayer);
  let [fen, uplayer, pl, pldata] = [Z.fen, Z.uplayer, Z.pl, Z.playerdata];
  fen.collection = [];
  for (const data of pldata) {
    fen.collection.push({ name: data.name, state: data.state });
  }
  console.log('players selected the following cards:', fen.collection);
  [Z.stage, Z.turn] = [Z.fen.stage_after_multi, Z.fen.turn_after_multi];
  take_turn_resolve('single');
}
function agmove_single() {
  if (Z.pl.hand.length > 2) removeInPlace(Z.pl.hand, Z.pl.hand[0]);
  Z.turn = [get_next_player(Z, Z.uplayer)];
  take_turn_fen();
}
function agmove_startmulti() { Z.stage = 'multi'; Z.turn = Z.plorder;[Z.fen.stage_after_multi, Z.fen.turn_after_multi] = ['click', [rChoose(Z.plorder)]]; take_turn_fen(); }
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
function animate(elem, aniclass, timeoutms) {
  mClass(elem, aniclass);
  TOMan.TO.anim = setTimeout(() => mRemoveClass(elem, aniclass), timeoutms);
}
function animatedTitle(msg = 'DU BIST DRAN!!!!!') {
  TO.titleInterval = setInterval(() => {
    let corner = CORNERS[WhichCorner++ % CORNERS.length];
    document.title = `${corner} ${msg}`; //'⌞&amp;21543;    U+231E \0xE2Fo\u0027o Bar';
  }, 1000);
}
function apiphp(o, saveFromZ = false) {
  let [data, cmd] = [o.data, o.cmd];
  let result = {}, friendly, uname, state, player_status, fen;
  if (saveFromZ && isdef(data.friendly) && !db_table_exists(data.friendly)) {
    let res = db_new_table(data.friendly, Z.game, Z.host, jsCopy(Z.playerlist), jsCopy(Z.fen), jsCopy(Z.options));
    if (isdef(Z.playerdata)) res.playerdata = jsCopy(Z.playerdata);
  }
  if (cmd == 'table') {
    if (isdef(data.auto)) result.auto = data.auto;
    friendly = data.friendly;
    uname = data.uname;
    result.status = "table";
    if (isdef(data.clear_players)) {
      result.playerdata = db_clear_players(friendly);
      result.status = "clear_players";
    } else if (isdef(data.write_player) && isdef(data.state)) {
      player_status = isdef(data.player_status) ? data.player_status : '';
      result.playerdata = db_write_player(friendly, uname, data.state, player_status);
      result.status = "write_player";
    } else {
      result.playerdata = db_read_playerdata(friendly);
    }
    if (isdef(data.write_fen)) {
      result.table = db_write_fen(friendly, data.fen);
      result.status += " write_fen";
    } else {
      result.table = db_read_table(friendly);
    }
  } else if (cmd == 'startgame') {
    let res = db_new_table(data.friendly, data.game, data.host, data.players, data.fen, data.options);
    result.table = res.table;
    result.playerdata = res.playerdata;
    result.status = `startgame ${data.friendly}`;
  } else if (cmd == 'tables') {
    result.tables = dict2list(GT, 'friendly').map(x => x.table);
    result.status = "tables";
  } else if (cmd == 'gameover') {
    result.table = db_write_fen(data.friendly, data.fen, data.scoring);
    result.status = `scored table ${data.friendly}`;
  }
  return result;
}
function ari_activate_ui() { ari_pre_action(); }
function ari_calc_fictive_vps(fen, plname) {
  let pl = fen.players[plname];
  let bs = pl.buildings;
  let vps = calc_building_vps(bs);
  return vps;
}
function ari_calc_real_vps(fen, plname) {
  let pl = fen.players[plname];
  let bs = ari_get_correct_buildings(pl.buildings);
  let vps = calc_building_vps(bs);
  for (const btype in bs) {
    let blist = bs[btype];
    for (const b of blist) {
      let lead = b.list[0];
      if (firstCond(pl.commissions, x => x[0] == lead[0])) {
        vps += 1;
      }
    }
  }
  return vps;
}
function ari_ensure_deck(fen, n) {
  if (fen.deck.length < n) { ari_refill_deck(fen); }
}
function ari_get_card(ckey, h, w, ov = .3) {
  let type = ckey[2];
  let sz = { largecard: 100, smallcard: 50 };
  let info = type == 'n' ? to_aristocard(ckey, sz.largecard) : type == 'l' ? to_luxurycard(ckey, sz.largecard) : type == 'r' ? to_rumorcard(ckey, sz.smallcard) : to_commissioncard(ckey, sz.smallcard);
  let card = cardFromInfo(info, h, w, ov);
  if (type == 'l') luxury_card_deco(card);
  return card;
}
function ari_history_list(lines, title = '', fen) {
  if (nundef(fen)) fen = Z.fen;
  if (nundef(fen.history)) fen.history = [];
  fen.history.push({ title: title, lines: lines });
}
function ari_pre_action() {
  let [stage, A, fen, phase, uplayer, deck, market] = [Z.stage, Z.A, Z.fen, Z.phase, Z.uplayer, Z.deck, Z.market];
  if (Z.num_actions > 0) fen.progress = `(action ${Z.action_number} of ${Z.total_pl_actions})`; else delete fen.progress;
  show_stage();
  switch (ARI.stage[stage]) {
    case 'action: command': Z.stage = 6; select_add_items(ui_get_commands(uplayer), process_command, 'must select an action', 1, 1); break;
    case 'action step 2':
      switch (A.command) {
        case 'trade': select_add_items(ui_get_trade_items(uplayer), post_trade, 'must select 2 cards to trade', 2, 2); break;
        case 'build': select_add_items(ui_get_payment_items('K'), payment_complete, 'must select payment for building', 1, 1); break;
        case 'upgrade': select_add_items(ui_get_payment_items('K'), payment_complete, 'must select payment for upgrade', 1, 1); break;
        case 'downgrade': select_add_items(ui_get_building_items(uplayer, A.payment), process_downgrade, 'must select a building to downgrade', 1, 1); break;
        case 'pickup': select_add_items(ui_get_stall_items(uplayer), post_pickup, 'must select a stall card to take into your hand', 1, 1); break;
        case 'harvest': select_add_items(ui_get_harvest_items(uplayer), post_harvest, 'must select a farm to harvest from', 1, 1); break;
        case 'sell': select_add_items(ui_get_stall_items(uplayer), post_sell, 'must select 2 stall cards to sell', 2, 2); break;
        case 'buy': select_add_items(ui_get_payment_items('J'), payment_complete, 'must select payment option', 1, 1); break;
        case 'buy rumor': ari_open_rumors(); break;
        case 'exchange': select_add_items(ui_get_exchange_items(uplayer), post_exchange, 'must select cards to exchange', 2, 2); break;
        case 'visit': select_add_items(ui_get_payment_items('Q'), payment_complete, 'must select payment for visiting', 1, 1); break;
        case 'rumor': select_add_items(ui_get_other_buildings_and_rumors(uplayer), process_rumor, 'must select a building and a rumor card to place', 2, 2); break;
        case 'inspect': select_add_items(ui_get_other_buildings(uplayer), process_inspect, 'must select building to visit', 1, 1); break;
        case 'blackmail': select_add_items(ui_get_payment_items('Q'), payment_complete, 'must select payment for blackmailing', 1, 1); break;
        case 'commission': select_add_items(ui_get_commission_items(uplayer), process_commission, 'must select a card to commission', 1, 1); break;
        case 'pass': post_pass(); break;
      }
      break;
    case 'pick_schwein': select_add_items(ui_get_schweine_candidates(A.uibuilding), post_inspect, 'must select the new schwein', 1, 1); break;
    case 'comm_weitergeben': if (!is_playerdata_set(uplayer)) select_add_items(ui_get_all_commission_items(uplayer), process_comm_setup, `must select ${fen.comm_setup_num} card${fen.comm_setup_num > 1 ? 's' : ''} to discard`, fen.comm_setup_num, fen.comm_setup_num); break;
    case 'rumors_weitergeben':
      let rumitems = ui_get_rumors_and_players_items(uplayer);
      if (isEmpty(rumitems)) {
        show_waiting_message('waiting for other players...');
        Z.state = null;
        let done = rumor_playerdata_complete();
        if (done) {
          Z.turn = [Z.host];
          Z.stage = 105; //'next_rumors_setup_stage';
          clear_transaction();
          take_turn_fen();
        } else autopoll();
      } else select_add_items(rumitems, process_rumors_setup, `must select a player and a rumor to pass on`, 2, 2);
      break;
    case 'next_rumor_setup_stage': post_rumor_setup(); break;
    case 'buy rumor': select_add_items(ui_get_top_rumors(), post_buy_rumor, 'must select one of the new rumor cards', 1, 1); break;
    case 'rumor discard': select_add_items(ui_get_rumors_items(uplayer), process_rumor_discard, 'must select a rumor card to discard', 1, 1); break;
    case 'rumor_both': select_add_items(ui_get_top_rumors(), post_rumor_both, 'must select one of the new rumor cards', 1, 1); break;
    case 'blackmail': select_add_items(ui_get_other_buildings_with_rumors(uplayer), process_blackmail, 'must select a building to blackmail', 1, 1); break;
    case 'blackmail_owner': select_add_items(ui_get_blackmailed_items(), being_blackmailed, 'must react to BLACKMAIL!!!', 1, 1); break;
    case 'accept_blackmail': select_add_items(ui_get_stall_items(uplayer), post_accept_blackmail, 'must select a card to pay off blackmailer', 1, 1); break;
    case 'blackmail_complete': post_blackmail(); break;
    case 'journey': select_add_items(ui_get_hand_and_journey_items(uplayer), process_journey, 'may form new journey or add cards to existing one'); break;
    case 'add new journey': post_new_journey(); break;
    case 'auto market': ari_open_market(fen, phase, deck, market); break;
    case 'TEST_starts_in_stall_selection_complete':
      if (is_stall_selection_complete()) {
        delete fen.stallSelected;
        fen.actionsCompleted = [];
        if (check_if_church()) ari_start_church_stage(); else ari_start_action_stage();
      } else select_add_items(ui_get_hand_items(uplayer), post_stall_selected, 'must select your stall'); break;
    case 'stall selection': select_add_items(ui_get_hand_items(uplayer), post_stall_selected, 'must select cards for stall'); break;
    case 'church': select_add_items(ui_get_hand_and_stall_items(uplayer), post_tithe, `must select cards to tithe ${isdef(fen.tithemin) ? `(current minimum is ${fen.tithemin})` : ''}`, 1, 100); break;
    case 'church_minplayer_tithe_add': select_add_items(ui_get_hand_and_stall_items(uplayer), post_tithe_minimum, `must select cards to reach at least ${fen.tithe_minimum}`, 1, 100); break;
    case 'church_minplayer_tithe_downgrade': select_add_items(ui_get_building_items(uplayer, A.payment), process_downgrade, 'must select a building to downgrade', 1, 1); break;
    case 'church_minplayer_tithe': console.log('NOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO');
      let pl = fen.players[uplayer];
      let hst = pl.hand.concat(pl.stall);
      let vals = hst.map(x => ari_get_card(x).val);
      let sum = arrSum(vals);
      let min = fen.tithe_minimum;
      if (sum < min) {
        ari_history_list([`${uplayer} must downgrade a building to tithe ${min}!`], 'downgrade');
        select_add_items(ui_get_building_items(uplayer, A.payment), process_downgrade, 'must select a building to downgrade', 1, 1);
      } else {
        ari_history_list([`${uplayer} must tithe more cards to reach ${min}!`], 'tithe');
        select_add_items(ui_get_hand_and_stall_items(uplayer), post_tithe_minimum, `must select cards to reach at least ${fen.tithe_minimum}`, 1, 100);
      }
      break;
    case 'church_newcards':
      reveal_church_cards();
      let items = ui_get_church_items(uplayer);
      let num_select = items.length == fen.church.length ? 1 : 2;
      let instr = num_select == 1 ? `must select a card for ${fen.candidates[0]}` : 'must select card and player';
      select_add_items(items, post_church, instr, num_select, num_select);
      break;
    case 'complementing_market_after_church':
      select_add_items(ui_get_hand_items(uplayer), post_complementing_market_after_church, 'may complement stall'); break;
    case 'tax': let n = fen.pl_tax[uplayer]; select_add_items(ui_get_hand_items(uplayer), post_tax, `must pay ${n} card${if_plural(n)} tax`, n, n); break;
    case 'build': select_add_items(ui_get_build_items(uplayer, A.payment), post_build, 'must select cards to build (first card determines rank)', 4, 6, true); break;
    case 'commission_stall': select_add_items(ui_get_commission_stall_items(), process_commission_stall, 'must select matching stall card to discard', 1, 1); break;
    case 'commission new': select_add_items(ui_get_commission_new_items(uplayer), post_commission, 'must select a new commission', 1, 1); break;
    case 'upgrade': select_add_items(ui_get_build_items(uplayer, A.payment), process_upgrade, 'must select card(s) to upgrade a building', 1); break;
    case 'select building to upgrade': select_add_items(ui_get_farms_estates_items(uplayer), post_upgrade, 'must select a building', 1, 1); break;
    case 'select downgrade cards': select_add_items(A.possible_downgrade_cards, post_downgrade, 'must select card(s) to downgrade a building', 1, is_in_middle_of_church() ? 1 : 100); break;
    case 'buy': select_add_items(ui_get_open_discard_items(uplayer, A.payment), post_buy, 'must select a card to buy', 1, 1); break;
    case 'visit': select_add_items(ui_get_other_buildings(uplayer, A.payment), process_visit, 'must select a building to visit', 1, 1); break;
    case 'visit destroy': select_add_items(ui_get_string_items(['destroy', 'get cash']), post_visit, 'must destroy the building or select the cash', 1, 1); break;
    case 'ball': select_add_items(ui_get_hand_items(uplayer), post_ball, 'may add cards to the ball'); break;
    case 'auction: bid': select_add_items(ui_get_coin_amounts(uplayer), process_auction, 'must bid for the auction', 1, 1); break;
    case 'auction: buy': select_add_items(ui_get_market_items(), post_auction, 'must buy a card', 1, 1); break;
    case 'end game?': select_add_items(ui_get_endgame(uplayer), post_endgame, 'may end the game here and now or go on!', 1, 1); break;
    case 'pick luxury or journey cards': select_add_items(ui_get_string_items(['luxury cards', 'journey cards']), post_luxury_or_journey_cards, 'must select luxury cards or getting cards from the other end of the journey', 1, 1); break;
    case 'next_comm_setup_stage': select_confirm_weiter(post_comm_setup_stage); break;
    default: console.log('stage is', stage); break;
  }
}
function ari_present(dParent) {
  let [fen, ui, uplayer, stage, pl] = [Z.fen, UI, Z.uplayer, Z.stage, Z.pl];
  let [dOben, dOpenTable, dMiddle, dRechts] = tableLayoutMR(dParent);
  if (fen.num_actions > 0 && (Z.role == 'active' || Z.mode == 'hotseat')) {
    mStyle(dOben, { hmin: 110 })
  }
  ari_stats(dRechts);
  show_history(fen, dRechts);
  let deck = ui.deck = ui_type_deck(fen.deck, dOpenTable, { maleft: 12 }, 'deck', 'deck', ari_get_card);
  let market = ui.market = ui_type_market(fen.market, dOpenTable, { maleft: 12 }, 'market', 'market', ari_get_card, true);
  let open_discard = ui.open_discard = ui_type_market(fen.open_discard, dOpenTable, { maleft: 12 }, 'open_discard', 'discard', ari_get_card);
  let deck_discard = ui.deck_discard = ui_type_deck(fen.deck_discard, dOpenTable, { maleft: 12 }, 'deck_discard', '', ari_get_card);
  if (exp_commissions(Z.options)) {
    let open_commissions = ui.open_commissions = ui_type_market(fen.open_commissions, dOpenTable, { maleft: 12 }, 'open_commissions', 'bank', ari_get_card);
    mMagnifyOnHoverControlPopup(ui.open_commissions.cardcontainer);
    let deck_commission = ui.deck_commission = ui_type_deck(fen.deck_commission, dOpenTable, { maleft: 4 }, 'deck_commission', '', ari_get_card);
    let comm = ui.commissioned = ui_type_rank_count(fen.commissioned, dOpenTable, {}, 'commissioned', 'sentiment', ari_get_card);
    if (comm.items.length > 0) { let isent = arrLast(comm.items); let dsent = iDiv(isent); set_card_border(dsent, 15, 'green'); }
  }
  if (exp_church(Z.options)) {
    let church = ui.church = ui_type_church(fen.church, dOpenTable, { maleft: 28 }, 'church', 'church', ari_get_card);
  }
  if (exp_rumors(Z.options)) {
    let deck_rumors = ui.deck_rumors = ui_type_deck(fen.deck_rumors, dOpenTable, { maleft: 25 }, 'deck_rumors', 'rumors', ari_get_card);
  }
  let uname_plays = fen.plorder.includes(Z.uname);
  let show_first = uname_plays && Z.mode == 'multi' ? Z.uname : uplayer;
  let order = get_present_order();
  for (const plname of order) {
    let pl = fen.players[plname];
    let playerstyles = { w: '100%', bg: '#ffffff80', fg: 'black', padding: 4, margin: 4, rounding: 9, border: `2px ${get_user_color(plname)} solid` };
    let d = mDiv(dMiddle, playerstyles, null, get_user_pic_html(plname, 25));
    mFlexWrap(d);
    mLinebreak(d, 9);
    let hidden = compute_hidden(plname);
    ari_present_player(plname, d, hidden);
  }
  ari_show_handsorting_buttons_for(Z.mode == 'hotseat' ? Z.uplayer : Z.uname); delete Clientdata.handsorting;
  show_view_buildings_button(uplayer);
  let desc = ARI.stage[Z.stage];
  Z.isWaiting = false;
  if (isdef(fen.winners)) ari_reveal_all_buildings(fen);
  else if (desc == 'comm_weitergeben' && is_playerdata_set(uplayer)) {
    if ((Z.mode == 'hotseat' || Z.host == uplayer) && check_resolve()) {
      Z.turn = [Z.host];
      Z.stage = 104; //'next_comm_setup_stage';
    }
    show_waiting_message(`waiting for other players...`);
    Z.isWaiting = true;
  }
}
function ari_present_player(plname, d, ishidden = false) {
  let fen = Z.fen;
  let pl = fen.players[plname];
  let ui = UI.players[plname] = { div: d };
  let hand = ui.hand = ui_type_hand(pl.hand, d, {}, `players.${plname}.hand`, 'hand', ari_get_card);
  if (ishidden) { hand.items.map(x => face_down(x)); }
  let stall = ui.stall = ui_type_market(pl.stall, d, { maleft: 12 }, `players.${plname}.stall`, 'stall', ari_get_card);
  if (fen.stage < 5 && ishidden) { stall.items.map(x => face_down(x)); }
  if (exp_commissions(Z.options)) {
    if (!ishidden) pl.commissions = correct_handsorting(pl.commissions, plname);
    ui.commissions = ui_type_market(pl.commissions, d, { maleft: 12 }, `players.${plname}.commissions`, 'commissions', Z.stage == 23 ? ari_get_card_large : ari_get_card);
    if (ishidden) { ui.commissions.items.map(x => face_down(x)); }
    else mMagnifyOnHoverControlPopup(ui.commissions.cardcontainer);
  }
  if (exp_rumors(Z.options)) {
    if (!ishidden) pl.rumors = correct_handsorting(pl.rumors, plname);
    ui.rumors = ui_type_market(pl.rumors, d, { maleft: 12 }, `players.${plname}.rumors`, 'rumors', Z.stage == 24 ? ari_get_card_large : ari_get_card);
    if (ishidden) { ui.rumors.items.map(x => face_down(x)); }
    else mMagnifyOnHoverControlPopup(ui.rumors.cardcontainer);
  }
  ui.journeys = [];
  let i = 0;
  for (const j of pl.journeys) {
    let jui = ui_type_hand(j, d, { maleft: 12 }, `players.${plname}.journeys.${i}`, '', ari_get_card);
    i += 1;
    ui.journeys.push(jui);
  }
  mLinebreak(d, 8);
  ui.buildinglist = [];
  ui.indexOfFirstBuilding = arrChildren(d).length;
  for (const k in pl.buildings) {
    let i = 0;
    for (const b of pl.buildings[k]) {
      let type = k;
      let b_ui = ui_type_building(b, d, { maleft: 8 }, `players.${plname}.buildings.${k}.${i}`, type, ari_get_card, true, ishidden);
      b_ui.type = k;
      ui.buildinglist.push(b_ui);
      if (b.isblackmailed) { mStamp(b_ui.cardcontainer, 'blackmail'); }
      lookupAddToList(ui, ['buildings', k], b_ui);
      i += 1;
    }
  }
}
function ari_reveal_all_buildings(fen) {
  for (const plname of fen.plorder) {
    let gbs = UI.players[plname].buildinglist;
    for (const gb of gbs) {
      gb.items.map(x => face_up(x));
    }
  }
}
function ari_show_handsorting_buttons_for(plname) {
  if (Z.role == 'spectator' || isdef(mBy('dHandButtons'))) return;
  let fen = Z.fen;
  let pl = fen.players[plname];
  if (pl.hand.length <= 1) return;
  let d = UI.players[plname].hand.container; mStyle(d, { position: 'relative' });
  let dHandButtons = mDiv(d, { position: 'absolute', bottom: -2, left: 52, height: 25 }, 'dHandButtons');
  show_player_button('sort', dHandButtons, onclick_by_rank);
}
function ari_state(dParent) {
  function get_phase_html() {
    if (isEmpty(Z.phase) || Z.phase == 'over') return null;
    let rank = Z.phase[0].toUpperCase();
    let card = ari_get_card(rank + 'Hn', 40);
    let d = iDiv(card);
    mClassRemove(d.firstChild, 'card');
    return iDiv(card).outerHTML;
  }
  if (DA.TEST0 == true) {
    let html = `${Z.stage}`;
    if (isdef(Z.playerdata)) {
      let trigger = get_multi_trigger();
      if (trigger) html += ` trigger:${trigger}`;
      for (const data of Z.playerdata) {
        if (data.name == trigger) continue;
        let name = data.name;
        let state = data.state;
        let s_state = object2string(state);
        html += ` ${name}:'${s_state}'`;
      }
      dParent.innerHTML += ` ${Z.playerdata.map(x => x.name)}`;
    }
    dParent.innerHTML = html;
    return;
  }
  let user_html = get_user_pic_html(Z.uplayer, 30);
  let phase_html = get_phase_html();
  let html = '';
  if (phase_html) html += `${Z.phase}:&nbsp;${phase_html}`;
  if (Z.stage == 17) { html += `&nbsp;&nbsp;CHURCH EVENT!!!`; }
  else if (TESTING) { html += `&nbsp;&nbsp;&nbsp;stage: ${ARI.stage[Z.stage]}`; }
  else html += `&nbsp;player: ${user_html} `;
  dParent.innerHTML = html;
}
function ari_stats(dParent) {
  let player_stat_items = UI.player_stat_items = ui_player_info(dParent);
  let fen = Z.fen;
  let herald = fen.heraldorder[0];
  for (const plname in fen.players) {
    let pl = fen.players[plname];
    let item = player_stat_items[plname];
    let d = iDiv(item); mCenterFlex(d); mLinebreak(d);
    if (plname == herald) {
      mSym('tied-scroll', d, { fg: 'gold', fz: 24, padding: 4 }, 'TR');
    }
    if (exp_church(Z.options)) {
      if (isdef(pl.tithes)) {
        player_stat_count('cross', pl.tithes.val, d);
      }
    }
    let dCoin = player_stat_count('coin', pl.coins, d);
    item.dCoin = dCoin.firstChild;
    item.dAmount = dCoin.children[1];
    let list = pl.hand.concat(pl.stall);
    let list_luxury = list.filter(x => x[2] == 'l');
    player_stat_count('pinching hand', list.length, d);
    let d1 = player_stat_count('hand-holding-usd', list_luxury.length, d);
    mStyle(d1.firstChild, { fg: 'gold', fz: 20 })
    if (!isEmpty(fen.players[plname].stall) && fen.stage >= 5 && fen.stage <= 6) {
      player_stat_count('shinto shrine', !fen.actionsCompleted.includes(plname) || fen.stage < 6 ? calc_stall_value(fen, plname) : '_', d);
    }
    player_stat_count('star', plname == U.name || isdef(fen.winners) ? ari_calc_real_vps(fen, plname) : ari_calc_fictive_vps(fen, plname), d);
    if (fen.turn.includes(plname)) {
      show_hourglass(plname, d, 30, { left: -3, top: 0 }); //'calc( 50% - 36px )' });
    }
  }
}
function aristo() {
  const rankstr = 'A23456789TJQK*';
  function setup(players, options) {
    let fen = { players: {}, plorder: jsCopy(players), history: [] };
    let n = players.length;
    let num_decks = fen.num_decks = 2 + (n >= 8 ? 2 : n >= 6 ? 1 : 0);
    let deck = fen.deck = create_fen_deck('n', num_decks);
    shuffle(deck);
    let deck_commission = fen.deck_commission = create_fen_deck('c'); shuffle(deck_commission);
    let deck_luxury = fen.deck_luxury = create_fen_deck('l'); shuffle(deck_luxury);
    let deck_rumors = fen.deck_rumors = exp_rumors(options) ? create_fen_deck('r') : []; shuffle(deck_rumors);
    shuffle(fen.plorder);
    fen.market = [];
    fen.deck_discard = [];
    fen.open_discard = [];
    fen.commissioned = [];
    fen.open_commissions = exp_commissions(options) ? deck_deal(deck_commission, 3) : [];
    fen.church = exp_church(options) ? deck_deal(deck, players.length) : [];
    for (const plname of players) {
      let pl = fen.players[plname] = {
        hand: deck_deal(deck, 7),
        commissions: exp_commissions(options) ? deck_deal(deck_commission, 4) : [],
        rumors: exp_rumors(options) ? deck_deal(deck_rumors, players.length - 1) : [],
        journeys: [],
        buildings: { farm: [], estate: [], chateau: [] },
        stall: [],
        stall_value: 0,
        coins: 3,
        vps: 0,
        score: 0,
        name: plname,
        color: get_user_color(plname),
      };
    }
    fen.phase = 'king';
    fen.num_actions = 0;
    fen.herald = fen.plorder[0];
    fen.heraldorder = jsCopy(fen.plorder);
    if (exp_commissions(options)) {
      ari_history_list([`commission trading starts`], 'commissions', fen);
      [fen.stage, fen.turn] = [23, options.mode == 'hotseat' ? [fen.plorder[0]] : fen.plorder]; fen.comm_setup_num = 3; fen.keeppolling = true;
    } else if (exp_rumors(options) && fen.plorder.length > 2) {
      ari_history_list([`gossiping starts`], 'rumors', fen);
      [fen.stage, fen.turn] = [24, options.mode == 'hotseat' ? [fen.plorder[0]] : fen.plorder];
    } else[fen.stage, fen.turn] = set_journey_or_stall_stage(fen, options, fen.phase);
    return fen;
  }
  function activate_ui() { ari_activate_ui(); }
  function check_gameover(z) { return isdef(z.fen.winners) ? z.fen.winners : false; }
  function present(dParent) { ari_present(dParent); }
  function stats(dParent) { ari_stats(dParent); }
  function state_info(dParent) { ari_state(dParent); }
  function get_selection_color(item) {
    if (Z.stage == 41 && Z.A.selected.length == 1) return 'blue'; return 'red';
  }
  return { get_selection_color, rankstr, setup, activate_ui, check_gameover, present, state_info, stats };
}
function arrChildren(elem) { return [...toElem(elem).children]; }
function arrLast(arr) { return arr.length > 0 ? arr[arr.length - 1] : null; }
function arrNext(list, el) {
  let iturn = list.indexOf(el);
  let nextplayer = list[(iturn + 1) % list.length];
  return nextplayer;
}
function arrRange(from = 1, to = 10, step = 1) { let res = []; for (let i = from; i <= to; i += step)res.push(i); return res; }
function arrRemovip(arr, el) {
  let i = arr.indexOf(el);
  if (i > -1) arr.splice(i, 1);
  return i;
}
function arrReverse(arr) { return jsCopy(arr).reverse(); }
function arrShufflip(arr) { if (isEmpty(arr)) return []; else return fisherYates(arr); }
function arrWithout(arr, b) { return arrMinus(arr, b); }
function assertion(cond) {
  if (!cond) {
    let args = [...arguments];
    for (const a of args) {
      console.log('\n', a);
    }
    throw new Error('TERMINATING!!!')
  }
}
function atleastOneElementOfXIsDictWithKey_obj(lst) {
  for (const x of lst) { if (!x) continue; if (isDict(x) && '_obj' in x) return true; }
  return false;
}
function autopoll(ms) { TO.poll = setTimeout(_poll, valf(ms, valf(Z.options.poll, 2000))); }
function bluff() {
  const rankstr = '3456789TJQKA2';
  function setup(players, options) {
    let fen = { players: {}, plorder: jsCopy(players), history: {}, stage: 'move', phase: '' };
    let num_cards_needed = players.length * options.max_handsize;
    let num_decks_needed = fen.num_decks = Math.ceil(num_cards_needed / 52);
    let deck = fen.deck = create_fen_deck('n', num_decks_needed);
    shuffle(deck);
    shuffle(fen.plorder);
    fen.turn = [fen.plorder[0]];
    for (const plname of fen.plorder) {
      let handsize = options.min_handsize;
      fen.players[plname] = {
        hand: deck_deal(deck, handsize),
        handsize: handsize,
        name: plname,
        color: get_user_color(plname),
      };
    }
    fen.stage = 0;
    return fen;
  }
  function clear_ack() { if (Z.stage == 1) { bluff_change_to_turn_round(); take_turn_fen(); } }
  function check_gameover(Z) { let pls = get_keys(Z.fen.players); if (pls.length < 2) Z.fen.winners = pls; return valf(Z.fen.winners, false); }
  function activate_ui() { bluff_activate_new(); }
  function present(dParent) { bluff_present(dParent); }
  function stats(dParent) { bluff_stats(dParent); }
  function state_info(dParent) { bluff_state(dParent); }
  return { rankstr, setup, activate_ui, check_gameover, clear_ack, present, state_info, stats };
}
function bluff_activate_new() {
  let [z, A, fen, stage, uplayer, ui, dt] = [Z, Z.A, Z.fen, Z.stage, Z.uplayer, UI, UI.dOpenTable];
  if (stage == 1) bluff_activate_stage1(); else { bluff_activate_stage0(); if (is_ai_player()) ai_move(1000); }
}
function bluff_change_to_turn_round() {
  let [fen, stage] = [Z.fen, Z.stage];
  assertion(stage == 1, "ALREADY IN TURN ROUND!!!!!!!!!!!!!!!!!!!!!!");
  Z.stage = 0;
  Z.turn = fen.nextturn;
  Z.round += 1;
  for (const k of ['bidder', 'loser', 'aufheber', 'lastbid', 'lastbidder']) delete fen[k];
  for (const k of ['nextturn', 'keeppolling']) delete fen[k];
  for (const plname of fen.plorder) { delete fen.players[plname].lastbid; }
}
function bluff_present(fen, dParent, plname) {
  console.log('fen', fen);
}
function bluff_state(dParent) {
  let user_html = get_user_pic_html(Z.uplayer, 30);
  dParent.innerHTML = `Round ${Z.round}:&nbsp;player: ${user_html} `;
}
function bluff_stats(dParent) {
  let player_stat_items = UI.player_stat_items = ui_player_info(dParent, {}, { 'border-width': 1, margin: 10, wmax: 180 });
  let fen = Z.fen;
  for (const plname of fen.plorder) {
    let pl = fen.players[plname];
    let item = player_stat_items[plname];
    let d = iDiv(item); mCenterFlex(d); mLinebreak(d);
    if (fen.turn.includes(plname)) {
      let dh = show_hourglass(plname, d, 20, { left: -4, top: 0 });
    }
    let dhz = mDiv(d, { fg: pl.handsize == Z.options.max_handsize ? 'yellow' : 'white' }, null, `hand: ${pl.handsize}`); mLinebreak(d);
    if (plname == fen.loser) UI.dHandsize = dhz;
    let elem = mDiv(d, { fg: plname == fen.lastbidder ? 'red' : 'white' }, null, `${valf(pl.lastbid, ['_']).join(' ')}`);
    let szhand = getSizeNeeded(dhz);
    let sz = getSizeNeeded(elem);
    let w = Math.max(szhand.w + 20, sz.w + 20, 80);
    mStyle(d, { w: w });
    mLinebreak(d);
  }
  return player_stat_items[Z.uplayer];
}
function busy_wait_until_slot(slot) {
  let diff = get_slot_diff(Z.fen);
  let dd;
  do {
    dd = last_n_digits(Date.now(), 2);
    if (dd >= slot && dd <= slot + diff) { break; }
  } while (true);
  return dd;
}
function calc_stall_value(fen, plname) { let st = fen.players[plname].stall; if (isEmpty(st)) return 0; else return arrSum(st.map(x => ari_get_card(x).val)); }
function capitalize(s) {
  if (typeof s !== 'string') return '';
  return s.charAt(0).toUpperCase() + s.slice(1);
}
function check_resolve() {
  let can_resolve = true;
  for (const plname of Z.plorder) {
    let data1 = firstCond(Z.playerdata, x => x.name == plname && !isEmpty(x.state));
    if (nundef(data1)) { can_resolve = false; break; }
  }
  return can_resolve;
}
function clear_screen() { mShieldsOff(); clear_status(); clear_title(); for (const ch of arrChildren('dScreen')) mClear(ch); mClassRemove('dTexture', 'wood'); mStyle(document.body, { bg: 'white', fg: 'black' }); }
function clear_status() { if (nundef(mBy('dStatus'))) return; clearTimeout(TO.fleeting); mRemove("dStatus"); }
function clear_timeouts() {
  for (const k in TO) clearTimeout(TO[k]);
  stop_simple_timer();
}
function clear_title() { mClear('dTitleMiddle'); mClear('dTitleLeft'); mClear('dTitleRight'); }
function clear_transaction() { DA.simulate = false; DA.transactionlist = []; }
function clearElement(elem) {
  if (isString(elem)) elem = document.getElementById(elem);
  if (window.jQuery == undefined) { elem.innerHTML = ''; return elem; }
  while (elem.firstChild) {
    $(elem.firstChild).remove();
  }
  return elem;
}
function clearZones() {
  for (const k in Zones) {
    clearElement(Zones[k].dData);
  }
}
function closestParent(elem, selector) {
  for (; elem && elem !== document; elem = elem.parentNode) {
    if (elem.matches(selector)) return elem;
  }
  return null;
}
function coin(percent = 50) { return Math.random() * 100 < percent; }
function colorChannelMixer(colorChannelA, colorChannelB, amountToMix) {
  var channelA = colorChannelA * amountToMix;
  var channelB = colorChannelB * (1 - amountToMix);
  return parseInt(channelA + channelB);
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
function colorHex(cAny) {
  let c = colorFrom(cAny);
  if (c[0] == '#') {
    return c;
  } else {
    let res = pSBC(0, c, 'c');
    return res;
  }
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
function colorTrans(cAny, alpha = 0.5) {
  return colorFrom(cAny, alpha);
}
function compute_hidden(plname) {
  let [fen, uplayer] = [Z.fen, Z.uplayer];
  let pl = fen.players[plname];
  let hidden;
  if (isdef(fen.winners)) hidden = false;
  else if (Z.role == 'spectator') hidden = plname != uplayer;
  else if (Z.mode == 'hotseat') hidden = (pl.playmode == 'bot' || plname != uplayer);
  else hidden = plname != Z.uname;
  return hidden;
}
function copyKeys(ofrom, oto, except = {}, only = null) {
  let keys = isdef(only) ? only : Object.keys(ofrom);
  for (const k of keys) {
    if (isdef(except[k])) continue;
    oto[k] = ofrom[k];
  }
  return oto;
}
function create_card_assets_c52() {
  let ranknames = { A: 'Ace', K: 'King', T: '10', J: 'Jack', Q: 'Queen' };
  let suitnames = { S: 'Spades', H: 'Hearts', C: 'Clubs', D: 'Diamonds' };
  let rankstr = '23456789TJQKA';
  let suitstr = 'SHDC';
  sz = 100;
  let di = {};
  for (const r of toLetters(rankstr)) {
    for (const s of toLetters(suitstr)) {
      let k = r + s;
      let info = di[k] = { key: k, val: 1, irank: rankstr.indexOf(r), isuit: suitstr.indexOf(s), rank: r, suit: s, color: RED, c52key: 'card_' + r + s, w: sz * .7, h: sz, sz: sz, ov: .25, friendly: `${isNumber(r) ? r : ranknames[r]} of ${suitnames[s]}`, short: `${r}${s}` };
      info.isort = info.isuit * 13 + info.irank;
    }
  }
  C52Cards = di;
  return di;
}
function create_fen_deck(cardtype, num_decks = 1, num_jokers = 0) {
  let arr = get_keys(C52Cards).map(x => x + cardtype);
  let newarr = [];
  while (num_decks > 0) { newarr = newarr.concat(arr); num_decks--; }
  while (num_jokers > 0) { newarr.push('*H' + cardtype); num_jokers--; }
  return newarr;
}
function createcircle(posx, posy, radius, stroke, fill, filter) {
  var circle = document.createElementNS(svgns, "circle");
  circle.setAttributeNS(null, "id", "c" + circles);
  circle.setAttributeNS(null, "cx", posx);
  circle.setAttributeNS(null, "cy", posy);
  circle.setAttributeNS(null, "r", radius);
  circle.setAttributeNS(null, "stroke-width", stroke);
  circle.setAttributeNS(null, "fill", fill);
  circle.setAttributeNS(null, "filter", filter);
  circle.setAttributeNS(null, "data-posx", posx);
  svg.appendChild(circle);
}
function createPeeps() {
  const {
    rows,
    cols
  } = config
  const {
    naturalWidth: width,
    naturalHeight: height
  } = img
  const total = rows * cols
  const rectWidth = width / rows
  const rectHeight = height / cols
  for (let i = 0; i < total; i++) {
    allPeeps.push(new Peep({
      image: img,
      rect: [
        (i % rows) * rectWidth,
        (i / rows | 0) * rectHeight,
        rectWidth,
        rectHeight,
      ]
    }))
  }
}
function data_from_client(raw) {
  assertion(is_stringified(raw), 'data should be stringified json!!!!!!!!!!!!!!!', raw);
  let js = JSON.parse(raw);
  return js;
}
function db_clear_players(friendly) {
  assertion(isdef(GT[friendly]), `table ${friendly} does NOT exist!!!!`);
  let t = GT[friendly];
  for (const pldata of t.playerdata) { pldata.state = null; pldata.player_status = null; }
  return t.playerdata;
}
function db_new_table(friendly, game, host, players, fen, options) {
  let table = { friendly, game, host, players, fen, options };
  table.modified = Date.now();
  let playerdata = [];
  for (const plname of players) {
    playerdata.push({ name: `${plname}`, state: null, player_status: null });
  }
  let res = { table, playerdata };
  GT[friendly] = res;
  return res;
}
function db_read_playerdata(friendly) {
  assertion(isdef(GT[friendly]), `table ${friendly} does NOT exist!!!!`);
  return GT[friendly].playerdata;
}
function db_read_table(friendly) {
  assertion(isdef(GT[friendly]), `table ${friendly} does NOT exist!!!!`);
  return GT[friendly].table;
}
function db_table_exists(friendly) { return isdef(GT[friendly]); }
function db_write_fen(friendly, fen, scoring = null) {
  assertion(isdef(GT[friendly]), `table ${friendly} does NOT exist!!!!`);
  let t = GT[friendly];
  let table = t.table;
  table.fen = fen; table.scoring = scoring; table.phase = isdef(scoring) ? 'over' : '';
  table.modified = Date.now();
  return table;
}
function db_write_player(friendly, uname, state, player_status) {
  assertion(isdef(GT[friendly]), `table ${friendly} does NOT exist!!!!`);
  let t = GT[friendly];
  let pldata = firstCond(t.playerdata, x => x.name == uname);
  pldata.state = state;
  pldata.player_status = player_status;
  pldata.checked = Date.now();
  return t.playerdata;
}
function deck_deal(deck, n) { return deck.splice(0, n); }
function delete_table(friendly) { stop_game(); phpPost({ friendly: friendly }, 'delete_table'); }
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
function dom(o, { loc, pool, params }) {
  console.log(o, loc, pool, params);
  let res = mCreate(params.tag ? params.tag : 'div');
  let sep = params.separator ? params.separator : ',';
  if (params.optin) res.innerHTML = params.optin.map(x => o.o[x]).join(sep);
  console.log('content:', res.innerHTML);
  return res;
}
function download(jsonObject, fname) {
  json_str = JSON.stringify(jsonObject);
  saveFile(fname + '.json', 'data:application/json', new Blob([json_str], { type: '' }));
}
function downloadFile(jsonObject, filenameNoExt) {
  json_str = JSON.stringify(jsonObject);
  saveFileAtClient(
    filenameNoExt + ".json",
    "data:application/json",
    new Blob([json_str], { type: "" }));
}
function empty(arr) {
  let result = arr === undefined || !arr || (isString(arr) && (arr == 'undefined' || arr == '')) || (Array.isArray(arr) && arr.length == 0) || emptyDict(arr);
  testHelpers(typeof arr, result ? 'EMPTY' : arr);
  return result;
}
function emptyDict(obj) {
  let test = Object.entries(obj).length === 0 && obj.constructor === Object;
  return test;
}
function endsWith(s, sSub) { let i = s.indexOf(sSub); return i >= 0 && i == s.length - sSub.length; }
function ensure_polling() { }
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
function ev_to_gname(ev) { evNoBubble(ev); return evToTargetAttribute(ev, 'gamename'); }
function evToId(ev) {
  let elem = findParentWithId(ev.target);
  return elem.id;
}
function exp_church(options) { return options.church == 'yes'; }
function exp_commissions(options) { return options.commission == 'yes'; }
function exp_journeys(options) { return options.journey == 'yes'; }
function exp_rumors(options) { return options.rumors == 'yes'; }
function feedback() { }
function ferro() {
  const rankstr = '23456789TJQKA*';
  function setup(players, options) {
    let fen = { players: {}, plorder: jsCopy(players), history: [] };
    options.jokers_per_group = 1;
    fen.allGoals = ['7R', '55', '5', '44', '4', '33', '3'];
    fen.availableGoals = options.maxrounds == 1 ? [rChoose(fen.allGoals)] : options.maxrounds < 7 ? rChoose(fen.allGoals, options.maxrounds) : fen.allGoals;
    fen.availableGoals.sort((a, b) => fen.allGoals.indexOf(a) - fen.allGoals.indexOf(b));
    fen.roundGoals = arrReverse(fen.availableGoals);
    let n = players.length;
    let num_decks = fen.num_decks = 2 + (n >= 9 ? 2 : n >= 7 ? 1 : 0);
    let deck = fen.deck = create_fen_deck('n', num_decks, 4 * num_decks);
    let deck_discard = fen.deck_discard = [];
    shuffle(deck);
    if (DA.TESTING != true) { shuffle(fen.plorder); shuffle(fen.plorder); }
    let starter = fen.plorder[0];
    let handsize = valf(Number(options.handsize), 11);
    for (const plname of players) {
      let pl = fen.players[plname] = {
        hand: deck_deal(deck, plname == starter ? handsize + 1 : handsize),
        journeys: [],
        roundgoal: false,
        coins: options.coins,
        vps: 0,
        score: 0,
        name: plname,
        color: get_user_color(plname),
      };
      pl.goals = {};
      for (const g of fen.availableGoals) { pl.goals[g] = 0; }
    }
    fen.phase = '';
    [fen.stage, fen.turn] = ['card_selection', [starter]];
    return fen;
  }
  function activate_ui() { ferro_activate_ui(); }
  function check_gameover() { return isdef(Z.fen.winners) ? Z.fen.winners : false; }
  function clear_ack() {
    if (Z.stage == 'round_end') { start_new_round_ferro(); take_turn_fen(); }
    else if (Z.stage != 'card_selection') {
      for (const plname of Z.fen.canbuy) {
        let pldata = firstCond(Z.playerdata, x => x.name == plname);
        if (isdef(pldata) && lookup(pldata, ['state', 'buy']) == true) {
          Z.fen.buyer = plname;
          break;
        }
      }
      Z.stage = 'can_resolve';
      ferro_change_to_card_selection();
    }
  }
  function present(dParent) { ferro_present(dParent); }
  function stats(dParent) { ferro_stats(dParent); }
  function state_info(dParent) { ferro_state(dParent); }
  return { rankstr, setup, activate_ui, check_gameover, clear_ack, present, state_info, stats };
}
function ferro_activate_ui() { ferro_pre_action(); }
function ferro_change_to_card_selection() {
  let [fen, stage] = [Z.fen, Z.stage];
  assertion(stage != 'card_selection', "ALREADY IN TURN ROUND!!!!!!!!!!!!!!!!!!!!!!");
  assertion(stage == 'can_resolve', "change to card_selection: NOT IN can_resolve stage!!!!!!!!!!!!!!!!!!!!!!");
  assertion(Z.uplayer == 'mimi' || Z.uplayer == fen.trigger, "mixup uplayer in change_to_card_selection!!!!!!!!!!!!!!!!!!!!!!");
  if (isdef(fen.buyer)) {
    let plname = fen.buyer;
    let pl = fen.players[plname];
    let card = fen.deck_discard.shift();
    pl.hand.push(card);
    lookupAddToList(pl, ['newcards'], card);
    deck_deal_safe_ferro(fen, plname, 1);
    pl.coins -= 1;
    ari_history_list([`${plname} bought ${card}`], 'buy');
  }
  let nextplayer = fen.nextturn[0];
  deck_deal_safe_ferro(fen, nextplayer, 1);
  Z.turn = fen.nextturn;
  Z.stage = 'card_selection';
  for (const k of ['buyer', 'canbuy', 'nextturn', 'trigger', 'lastplayer']) delete fen[k];
  delete fen.keeppolling;
  clear_transaction();
  take_turn_fen();
}
function ferro_present(dParent) {
  if (DA.simulate == true) show('bRestartMove'); else hide('bRestartMove');
  let [fen, ui, uplayer, stage, pl] = [Z.fen, UI, Z.uplayer, Z.stage, Z.pl];
  let [dOben, dOpenTable, dMiddle, dRechts] = tableLayoutMR(dParent);
  ferro_stats(dRechts);
  show_history(fen, dRechts);
  let deck = ui.deck = ui_type_deck(fen.deck, dOpenTable, { maleft: 12 }, 'deck', 'deck', ferro_get_card);
  let deck_discard = ui.deck_discard = ui_type_deck(fen.deck_discard, dOpenTable, { maleft: 12 }, 'deck_discard', '', ferro_get_card);
  if (!isEmpty(deck_discard.items)) face_up(deck_discard.get_topcard());
  order = get_present_order();
  for (const plname of order) {
    let pl = fen.players[plname];
    let playerstyles = { w: '100%', bg: '#ffffff80', fg: 'black', padding: 4, margin: 4, rounding: 10, border: `2px ${get_user_color(plname)} solid` };
    let d = mDiv(dMiddle, playerstyles, null, get_user_pic_html(plname, 25));
    mFlexWrap(d);
    mLinebreak(d, 10);
    let hidden = compute_hidden(plname);
    ferro_present_player(plname, d, hidden);
  }
  Z.isWaiting = false;
  if (Z.stage == 'round_end') {
    show_waiting_for_ack_message();
    if (Z.role == 'active' || i_am_host()) {
      show('bClearAck');
    }
  } else if (Z.stage == 'buy_or_pass' && uplayer == fen.trigger && ferro_check_resolve()) {
    assertion(Z.stage == 'buy_or_pass', 'stage is not buy_or_pass when checking can_resolve!');
    Z.stage = 'can_resolve';
    [Z.turn, Z.stage] = [[get_multi_trigger()], 'can_resolve'];
    take_turn_fen(); return;
  } else if (Z.stage == 'buy_or_pass' && (Z.role != 'active' || is_playerdata_set(uplayer))) {
    assertion(isdef(Z.playerdata), 'playerdata is not defined in buy_or_pass (present ferro)');
    let pl_not_done = Z.playerdata.filter(x => Z.turn.includes(x.name) && isEmpty(x.state)).map(x => x.name);
    show_waiting_message(`waiting for possible buy decision...`);
    Z.isWaiting = true;
  }
  show_handsorting_buttons_for(Z.mode == 'hotseat' ? Z.uplayer : Z.uname, { bottom: -2 });
  new_cards_animation();
}
function ferro_state(dParent) {
  if (DA.TEST0 == true) {
    let html = `${Z.stage}`;
    if (isdef(Z.playerdata)) {
      let trigger = get_multi_trigger();
      if (trigger) html += ` trigger:${trigger}`;
      for (const data of Z.playerdata) {
        if (data.name == trigger) continue;
        let name = data.name;
        let state = data.state;
        let s_state = object2string(state);
        html += ` ${name}:'${s_state}'`;
      }
      dParent.innerHTML += ` ${Z.playerdata.map(x => x.name)}`;
    }
    dParent.innerHTML = html;
    return;
  }
  if (Z.stage == 'round_end') {
    dParent.innerHTML = `Round ${Z.round} ended by &nbsp;${get_user_pic_html(Z.fen.round_winner, 30)}`;
  } else if (is_fixed_goal()) {
    let goal = get_round_goal();
    console.log('goal', goal);
    let goal_html = `<div style="font-weight:bold;border-radius:50%;background:white;color:red;line-height:100%;padding:4px 8px">${goal}</div>`;
    dParent.innerHTML = `Round ${Z.round}:&nbsp;&nbsp;minimum:&nbsp;${goal_html}`;
  } else {
    let user_html = get_user_pic_html(Z.stage == 'buy_or_pass' ? Z.fen.nextturn[0] : Z.turn[0], 30);
    dParent.innerHTML = `Round ${Z.round}:&nbsp;${Z.stage == 'buy_or_pass' ? 'next ' : ''}turn: ${user_html} `;
  }
}
function ferro_stats(dParent) {
  let player_stat_items = UI.player_stat_items = ui_player_info(dParent);
  let fen = Z.fen;
  for (const plname in fen.players) {
    let pl = fen.players[plname];
    let item = player_stat_items[plname];
    let d = iDiv(item); mCenterFlex(d); mStyle(d, { wmin: 150 }); mLinebreak(d);
    player_stat_count('coin', pl.coins, d);
    player_stat_count('pinching hand', pl.hand.length, d);
    if (!compute_hidden(plname)) player_stat_count('hand with fingers splayed', calc_hand_value(pl.hand), d);
    player_stat_count('star', pl.score, d);
    mLinebreak(d, 4);
    if (!is_fixed_goal()) {
      let d2 = mDiv(d, { padding: 4, display: 'flex' }, `d_${plname}_goals`);
      if (fen.availableGoals.length < 4) { mStyle(d2, { wmin: 120 }); mCenterFlex(d2); }
      let sz = 16;
      let styles_done = { h: sz, fz: sz, maleft: 6, fg: 'grey', 'text-decoration': 'line-through green', weight: 'bold' };
      let styles_todo = { h: sz, fz: sz, maleft: 6, border: 'red', weight: 'bold', padding: 4, 'line-height': sz };
      for (const k of fen.roundGoals) {
        mText(k, d2, pl.goals[k] ? styles_done : styles_todo);
      }
    }
    if (fen.turn.includes(plname)) { show_hourglass(plname, d, 30, { left: -3, top: 0 }); }
  }
}
function find_players_with_potential_journey(fen) {
  let res = [];
  for (const uplayer of fen.plorder) {
    if (isdef(fen.passed) && fen.passed.includes(uplayer)) continue;
    let j = find_journeys(fen, uplayer);
    if (!isEmpty(j)) res.push(uplayer);
  }
  return res;
}
function findParentWithId(elem) { while (elem && !(elem.id)) { elem = elem.parentNode; } return elem; }
function first(arr) {
  return arr.length > 0 ? arr[0] : null;
}
function firstCond(arr, func) {
  if (nundef(arr)) return null;
  for (const a of arr) {
    if (func(a)) return a;
  }
  return null;
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
function fritz() {
  const rankstr = 'A23456789TJQK*';
  function setup(players, options) {
    let fen = { players: {}, plorder: jsCopy(players), history: [], maxrounds: options.cycles * players.length };
    let n = players.length;
    fen.num_decks = 2 + (n >= 9 ? 2 : n >= 7 ? 1 : 0);
    fritz_new_table(fen, options);
    let deck = fen.deck;
    shuffle(fen.plorder);
    let starter = fen.starter = fen.plorder[0];
    fen.roundorder = jsCopy(fen.plorder);
    let handsize = valf(Number(options.handsize), 11);
    for (const plname of players) {
      let pl = fen.players[plname] = {
        hand: deck_deal(deck, plname == starter ? handsize + 1 : handsize),
        loosecards: [],
        time_left: options.seconds_per_game * 1000,
        score: 0,
        name: plname,
        color: get_user_color(plname),
      };
    }
    [fen.phase, fen.stage, fen.turn] = ['', 'card_selection', [starter]];
    return fen;
  }
  function activate_ui() { fritz_activate_ui(); }
  function check_gameover() { return isdef(Z.fen.winners) ? Z.fen.winners : false; }
  function present(dParent) { fritz_present(dParent); }
  function stats(dParent) { fritz_stats(dParent); }
  function state_info(dParent) { fritz_state_info(dParent); }
  return { rankstr, setup, activate_ui, check_gameover, present, state_info, stats };
}
function fritz_activate_ui() {
  let [plorder, stage, A, fen, uplayer, pl] = [Z.plorder, Z.stage, Z.A, Z.fen, Z.uplayer, Z.fen.players[Z.uplayer]];
  A.autosubmit = false;
  new_cards_animation(1);
  round_change_animation(1);
  select_add_items(ui_get_hand_items(uplayer), end_of_turn_fritz, 'must drag drop cards to assemble groups, then discard 1 hand card', 0, 1);
  A.items.map(x => iDiv(x).onclick = ev => {
    let card = Items[x.id];
    let item = x;
    clear_quick_buttons();
    select_last(item, select_toggle, ev);
    if (item.index == A.selected[0]) {
      let pos = get_mouse_pos(ev);
      let b = DA.bQuick = mButton('discard', ev => {
        b.remove();
        end_of_turn_fritz();
      }, document.body, { position: 'absolute', left: pos.x - 40, top: pos.y - 10 }, 'selectbutton');
    }
  });
  UI.timer = select_timer(fen.players[uplayer].time_left + Z.options.seconds_per_move * 1000, end_of_turn_fritz);
}
function fritz_new_table(fen, options) {
  fen.deck = create_fen_deck('n', fen.num_decks, 0);
  fen.deck_discard = [];
  fen.journeys = [];
  fen.loosecards = arrRepeat(options.jokers, '*Hn');
  shuffle(fen.deck);
}
function fritz_present(dParent) {
  DA.hovergroup = null;
  let [fen, ui, uplayer, stage, pl] = [Z.fen, UI, Z.uplayer, Z.stage, Z.pl];
  let [dOben, dOpenTable, dMiddle, dRechts] = tableLayoutMR(dParent); mFlexWrap(dOpenTable)
  Config.ui.card.h = 130;
  Config.ui.container.h = Config.ui.card.h + 30;
  if (isEmpty(fen.deck_discard)) {
    mText('discard pile is empty!', dOpenTable);
    ui.deck_discard = { items: [] }
  } else {
    mText('discard pile:', dOpenTable); mLinebreak(dOpenTable);
    let deck_discard = ui.deck_discard = ui_type_hand(fen.deck_discard, dOpenTable, { maright: 25 }, 'deck_discard', null, fritz_get_card, true);
    let i = 0; deck_discard.items.map(x => { x.source = 'discard'; x.index = i++ });
  }
  mLinebreak(dOpenTable);
  mDiv(dOpenTable, { box: true, w: '100%' }, null, '<hr>');
  let ddarea = UI.ddarea = mDiv(dOpenTable, { border: 'dashed 1px black', bg: '#eeeeee80', box: true, hmin: 162, wmin: 245, padding: '5px 50px 5px 5px', margin: 5 });
  mDroppable(ddarea, drop_card_fritz, dragover_fritz); ddarea.id = 'dOpenTable'; Items[ddarea.id] = ddarea;
  mFlexWrap(ddarea)
  fritz_stats(dRechts);
  show_history(fen, dRechts);
  DA.TJ = [];
  for (const j of fen.journeys) {
    let cards = j.map(x => fritz_get_card(x));
    frnew(cards[0], { target: 'hallo' });
    for (let i = 1; i < cards.length; i++) { fradd(cards[i], Items[cards[0].groupid]); }
  }
  let loosecards = ui.loosecards = jsCopy(fen.loosecards).map(c => fritz_get_card(c));
  for (const plname of fen.plorder) {
    let cards = fen.players[plname].loosecards.map(c => fritz_get_card(c));
    cards.map(x => x.owner = plname);
    loosecards = loosecards.concat(cards);
  }
  for (const looseui of loosecards) {
    let card = looseui;
    frnew(card, { target: 'hallo' });
  }
  for (const group of DA.TJ) {
    assertion(isdef(group.id), 'no group id', group);
    let d = iDiv(group);
    let ch = arrChildren(iDiv(group));
    let cards = ch.map(x => Items[x.id]);
    cards.map(x => mDroppable(x, drop_card_fritz, dragover_fritz));
  }
  if (arrChildren(ddarea).length == 0) {
    let d = mDiv(ddarea, { 'pointer-events': 'none', maleft: 45, align: 'center', hmin: 40, w: '100%', fz: 12, fg: 'dimgray' }, 'ddhint', 'drag and drop cards here');
  }
  ui.players = {};
  let uname_plays = fen.plorder.includes(Z.uname);
  let plmain = uname_plays && Z.mode == 'multi' ? Z.uname : uplayer;
  fritz_present_player(plmain, dMiddle);
  if (TESTING) {
    for (const plname of arrMinus(fen.plorder, plmain)) {
      fritz_present_player(plname, dMiddle);
    }
  }
  show_handsorting_buttons_for(Z.mode == 'hotseat' ? Z.uplayer : Z.uname, { left: 58, bottom: -1 });
}
function fritz_state_info(dParent) {
  let user_html = get_user_pic_html(Z.uplayer, 30);
  dParent.innerHTML = `Round ${Z.round}:&nbsp;player: ${user_html} `;
}
function fritz_stats(dParent) {
  let player_stat_items = UI.player_stat_items = ui_player_info(dParent);
  let fen = Z.fen;
  console.log('players', get_keys(fen.players));
  for (const plname in fen.players) {
    let pl = fen.players[plname];
    console.log('uname', plname);
    let item = player_stat_items[plname];
    let d = iDiv(item); mCenterFlex(d); mLinebreak(d);
    player_stat_count('hand with fingers splayed', calc_hand_value(pl.hand.concat(pl.loosecards), fritz_get_card), d);
    player_stat_count('star', pl.score, d);
    if (fen.turn.includes(plname)) { show_hourglass(plname, d, 30, { left: -3, top: 0 }); }
    else if (!fen.plorder.includes(plname)) mStyle(d, { opacity: 0.5 });
  }
}
function from_server(result, type) {
  if (type == "modify_table") { console.log('______from server:', type, '\nresult:', result); }
  if (result.trim() == "") return;
  var obj = JSON.parse(result);
  convert_from_server(obj);
  switch (type) {
    case "intro": got_intro(obj); break;
    case 'non_admin_reload': got_non_admin_reload(obj); break;
    case "games": got_games(obj); break;
    case "play_start": got_play_start(obj); break;
    case "play": got_play(obj); break;
    case 'modify_table': got_modify_table(obj); break;
    case 'create_table_and_start': got_create_table(obj); break;
    case 'send_move': got_send_move(obj); break;
    case 'seen': poll_for_table_seen_or_deleted(); break;
    case 'standard_assets':
    case 'assets': assets_parse(obj.response); break;
    case 'dictionary': got_dictionary(obj); break;
    case "get_tables": got_tables(obj); break;
    case "get_user_game_tables": got_user_game_tables(obj); break;
    case "poll_table_started": check_poll_table_started(obj); break;
    case "poll_table_show": check_poll_table_show(obj); break;
    case "poll_table_seen": check_poll_table_seen(obj); break;
    case "get_past_tables": test_user_endscreen(obj); break;
    case "contacts": present_contacts(obj); break;
    case "login": present_login(obj); break;
    case "dbsave": console.log('db has been saved to server:'); break;
    case 'delete_table': get_games(obj); break;
    case 'save_and_delete': alert(`${obj.message}, ranking:${obj.fen}`);
      console.assert(is_admin(), 'SAVE_AND_DELETE NOT SENT BEI ADMIN!!!!');
      get_games();
      break;
    //#region sequence if dont join players automatically
    case 'create_table':
      Session.cur_tid = obj.table.id;
      Session.cur_table = obj.table;
      break;
    case "join_table":
      status_message('You have joined the game! Wait for the host to start it!');
      update_cur_table(obj, 'red');
      break;
    case "toggle_join":
      let t = obj.table;
      let st = obj.player_status;
      update_cur_table(obj, st == 'joined' ? 'red' : 'orange');
      status_message(`You have ${st == 'joined' ? 'joined' : 'left'} the game! Wait for the host to start it!`);
      break;
    case "start_table":
      update_cur_table(obj, 'green');
      status_message('You have started the game! ', obj.table.status);
      break;
    //#endregion
    default: break;
  }
  danext();
}
function gamestep() {
  show_admin_ui();
  DA.running = true; clear_screen(); dTable = mBy('dTable'); mClass('dTexture', 'wood');
  if (Z.game == 'aristo') { if (Z.role != Clientdata.role || Z.mode == 'multi' && Z.role != 'active') mFall(dTable); Clientdata.role = Z.role; }
  else mFall(dTable);
  shield_off();
  show_title();
  show_role();
  Z.func.present(dTable);
  if (isdef(Z.scoring.winners)) { show_winners(); animatedTitle('GAMEOVER!'); }
  else if (Z.func.check_gameover(Z)) {
    let winners = show_winners();
    Z.scoring = { winners: winners }
    sendgameover(winners[0], Z.friendly, Z.fen, Z.scoring);
  } else if (is_shield_mode()) {
    staticTitle();
    if (!DA.no_shield == true) { hide('bRestartMove'); shield_on(); }
    autopoll();
  } else {
    Z.A = { level: 0, di: {}, ll: [], items: [], selected: [], tree: null, breadcrumbs: [], sib: [], command: null, autosubmit: Config.autosubmit };
    copyKeys(jsCopy(Z.fen), Z);
    copyKeys(UI, Z);
    activate_ui(Z);
    Z.func.activate_ui();
    if (Z.isWaiting == true || Z.mode != 'multi') staticTitle(); else animatedTitle();
    if (Z.options.zen_mode != 'yes' && Z.mode != 'hotseat' && Z.fen.keeppolling && Z.uplayer_data.player_status != 'stop') {
      autopoll();
      console.log('gamestep autopoll');
    }
  }
  if (TESTING == true) landing();
}
function generate() {
  numgen++; if (numgen > system.max) {
    clearInterval(interval_id);
    console.log('done!');
    return;
  }
  len *= factor;
  let nextSentence = '';
  for (let i = 0; i < sentence.length; i++) {
    let current = sentence.charAt(i);
    let done = false;
    for (const rule of rules) {
      if (current == rule.aus) {
        nextSentence += rule.mach;
        done = true;
        break;
      }
    }
    if (!done) nextSentence += current;
  }
  sentence = nextSentence;
  createP(sentence);
  turtle();
}
function generate_table_name(n) {
  let existing = Serverdata.tables.map(x => x.friendly);
  while (true) {
    let cap = rChoose(Info.capital);
    let parts = cap.split(' ');
    if (parts.length == 2) cap = stringBefore(cap, ' '); else cap = stringBefore(cap, '-');
    cap = cap.trim();
    let s = (n == 2 ? 'duel of ' : rChoose(['battle of ', 'war of '])) + cap;
    if (!existing.includes(s)) return s;
  }
}
function get_container_styles(styles = {}) { let defaults = valf(Config.ui.container, {}); defaults.position = 'relative'; addKeys(defaults, styles); return styles; }
function get_keys(o) { return Object.keys(o); }
function get_logout_button() {
  let html = `<a id="aLogout" href="javascript:onclick_logout()">logout</a>`;
  return mCreateFrom(html);
}
function get_multi_trigger() { return lookup(Z, ['fen', 'trigger']); }
function get_next_human_player(plname) {
  if (nundef(plname)) return null;
  let [prevturn, mode, turn, uname, plorder, fen, host] = [Z.prev.turn, Z.mode, Z.turn, Z.uname, Z.plorder, Z.fen, Z.host];
  let same = isString(plname) && isList(prevturn) && sameList(prevturn, turn);
  if (!same) return null;
  let plnew = get_next_player(Z, plname);
  while (fen.players[plnew].playmode == 'bot') {
    plnew = get_next_player(Z, plnew);
    if (plnew == plname) break;
  }
  return plnew;
}
function get_next_player(g, uname) {
  let plorder = g.fen.plorder;
  let iturn = plorder.indexOf(uname);
  let nextplayer = plorder[(iturn + 1) % plorder.length];
  return nextplayer;
}
function get_player_score(plname) { ensure_score(plname); return Z.fen.players[plname].score; }
function get_present_order() {
  let [fen, uplayer, uname] = [Z.fen, Z.uplayer, Z.uname];
  let uname_plays = fen.plorder.includes(Z.uname);
  let show_first = uname_plays && Z.mode == 'multi' ? Z.uname : uplayer;
  return arrCycle(Z.fen.plorder, Z.fen.plorder.indexOf(show_first));
}
function get_screen_distance(child, newParent) {
  child = toElem(child);
  newParent = toElem(newParent);
  const parentOriginal = child.parentNode;
  let children = arrChildren(parentOriginal);
  let iChild = children.indexOf(child);
  let sibling = iChild == children.length - 1 ? null : children[iChild + 1];
  const x0 = child.getBoundingClientRect().left;
  const y0 = child.getBoundingClientRect().top;
  newParent.appendChild(child);
  const x1 = child.getBoundingClientRect().left;
  const y1 = child.getBoundingClientRect().top;
  if (sibling) parentOriginal.insertBefore(child, sibling); else parentOriginal.appendChild(child);
  return [x1 - x0, y1 - y0];
}
function get_slot_diff(fen) { return Math.floor(100 / fen.plorder.length); }
function get_user_color(uname) { let u = firstCond(Serverdata.users, x => x.name == uname); return colorFrom(u.color); }
function get_user_names() { return Object.keys(DB.users); }
function get_user_pic(uname, sz = 50, border = 'solid medium white') {
  let html = get_user_pic_html(uname, sz, border);
  return mCreateFrom(html);
}
function get_user_pic_and_name(uname, dParent, sz = 50, border = 'solid medium white') {
  let html = `
      <div username='${uname}' style='text-align:center;font-size:${sz / 2.8}px'>
        <img src='../base/assets/users/${uname}.jpg' width='${sz}' height='${sz}' class='img_person' style='margin:0;border:${border}'>
        <div style='margin-top:${-sz / 6}px'>${uname}</div>
      </div>`;
  let elem = mCreateFrom(html);
  mAppend(dParent, elem);
  return elem;
}
function get_user_pic_html(uname, sz = 50, border = 'solid medium white') {
  return `<img src='../base/assets/users/${uname}.jpg' width='${sz}' height='${sz}' class='img_person' style='margin:0px 4px;border:${border}'>`
}
function getAnimals() {
  let gr = 'Animals & Nature';
  let result = [];
  for (const sg in ByGroupSubgroup[gr]) {
    if (startsWith(sg, 'anim')) result = result.concat(ByGroupSubgroup[gr][sg]);
  }
  return result;
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
function getFunctionsNameThatCalledThisFunction() {
  let c1 = getFunctionsNameThatCalledThisFunction.caller;
  if (nundef(c1)) return 'no caller!';
  let c2 = c1.caller;
  if (nundef(c2)) return 'no caller!';
  return c2.name;
}
function getGameValues() {
  let user = U.id;
  let game = G.id;
  let level = G.level;
  let settings = { numColors: 1, numRepeat: 1, numPics: 1, numSteps: 1, colors: ColorList };
  settings = mergeOverride(settings, DB.settings);
  if (isdef(U.settings)) settings = mergeOverride(settings, U.settings);
  if (isdef(DB.games[game])) settings = mergeOverride(settings, DB.games[game]);
  let next = lookup(DB.games, [game, 'levels', level]); if (next) settings = mergeOverride(settings, next);
  next = lookup(U, ['games', game]); if (next) settings = mergeOverride(settings, next);
  next = lookup(U, ['games', game, 'levels', level]); if (next) settings = mergeOverride(settings, next);
  delete settings.levels;
  Speech.setLanguage(settings.language);
  return settings;
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
function getInstrGeoJson(instr, coord) {
  console.log('instr', instr, 'coord', coord);
  var formatter = new L.Routing.Formatter();
  var instrPts = {
    type: "FeatureCollection",
    features: []
  };
  for (var i = 0; i < instr.length; ++i) {
    var g = {
      "type": "Point",
      "coordinates": [coord[instr[i].index].lng, coord[instr[i].index].lat]
    };
    var p = {
      "instruction": formatter.formatInstruction(instr[i])
    };
    instrPts.features.push({
      "geometry": g,
      "type": "Feature",
      "properties": p
    });
  }
  return instrPts;
}
function getItem(k) { return infoToItem(Syms[k]); }
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
function getNature() {
  let gr = 'Animals & Nature';
  let result = [];
  for (const sg in ByGroupSubgroup[gr]) {
    result = result.concat(ByGroupSubgroup[gr][sg]);
  }
  return result;
}
function getpal(ipal_dep = -1, ihue = 0, bOrf = 'b', pal) {
  let p = empty(pal) || !pal || pal == undefined ? palette : pal;
  if (!p) return randomColor();
  nHues = p[0].length;
  nShades = p.length;
  if (ipal_dep < -1) ipal_dep = randomNumber(0, nShades);
  else if (ipal_dep >= nShades) ipal_dep %= nShades;
  if (ihue < -1) ihue = randomNumber(0, nHues);
  else if (ihue >= nHues) ihue %= nHues;
  return p[ipal_dep][ihue][bOrf];
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
function grid(id, rows, cols, size, bg = 'blue') {
  visualStructures[id] = [];
  let w = size * cols;
  let h = size * rows;
  let ms = new MS(id, 'g')
    .setbg(getpal(3))
    .rect({ w: w, h: h });
  ms.tag('layout', 'grid');
  visualStructures[id].push(ms);
  return (r, c) => {
    return {
      x: c * size - w / 2 + size / 2,
      y: r * size - h / 2 + size / 2,
      id: id,
      ms: ms
    };
  };
}
function hallo(control, map) {
  control.on('routeselected', function (e) {
    var coord = e.route.coordinates;
    var instr = e.route.instructions;
    L.geoJson(getInstrGeoJson(instr, coord)).addTo(map);
  });
}
function handle_result(result, cmd) {
  if (verbose) console.log('cmd', cmd, '\nresult', result);
  if (result.trim() == "") return;
  let obj;
  try { obj = JSON.parse(result); } catch { console.log('ERROR:', result); }
  if (Clientdata.AUTORESET) { Clientdata.AUTORESET = false; if (result.auto == true) { console.log('message bounced'); return; } }
  DA.result = jsCopy(obj);
  processServerdata(obj, cmd);
  switch (cmd) {
    case "assets": load_assets(obj); start_with_assets(); break;
    case "users": show_users(); break;
    case "tables": show_tables(); break;
    case "delete_table":
    case "delete_tables": show_tables(); break;
    case "table1":
      update_table();
      console.log('cmd', cmd)
      console.log('obj', obj)
      for (const k in obj) { if (isLiteral(obj[k])) { console.log(k, obj[k]); } }
      clear_timeouts();
      gamestep();
      break;
    case "gameover":
    case "table":
    case "startgame":
      update_table();
      if (Z.skip_presentation) { Z.func.state_info(mBy('dTitleLeft')); autopoll(); return; }
      clear_timeouts();
      gamestep();
      break;
  }
}
function hFunc(content, funcname, arg1, arg2, arg3) {
  let html = `<a style='color:blue' href="javascript:${funcname}('${arg1}','${arg2}','${arg3}');">${content}</a>`;
  return html;
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
function hue(h) {
  var r = Math.abs(h * 6 - 3) - 1;
  var g = 2 - Math.abs(h * 6 - 2);
  var b = 2 - Math.abs(h * 6 - 4);
  return [Math.floor(r * 255), Math.floor(g * 255), Math.floor(b * 255)];
}
function i_am_acting_host() { return U.name == Z.fen.acting_host; }
function i_am_host() { return U.name == Z.host; }
function i_am_trigger() { return is_multi_trigger(U.name); }
function iDiv(i) { return isdef(i.live) ? i.live.div : isdef(i.div) ? i.div : i; }
function if_hotseat_autoswitch(result) {
  if (isdef(result.table) && isdef(Z) && Z.mode == 'hotseat') {
    let turn = lookup(result, ['table', 'fen', 'turn']);
    assertion(isdef(turn), 'turn is NOT defined (_sendSIMSIM) !!!!');
    let uname = turn.length == 1 ? turn[0] : arrNext(turn, U.name);
    if (uname != U.name) switch_uname(uname);
  }
}
function if_stringified(obj) { return is_stringified(obj) ? JSON.parse(obj) : obj; }
function infoToItem(x) { let item = { info: x, key: x.key }; item.id = iRegister(item); return item; }
function init() {
  createPeeps()
  resize()
  gsap.ticker.add(render)
  window.addEventListener('resize', resize)
}
function iRegister(item, id) { let uid = isdef(id) ? id : getUID(); Items[uid] = item; return uid; }
function is_advanced_user() {
  let advancedUsers = ['mimi', 'bob', 'buddy', 'minnow', 'nimble', 'leo'];
  return isdef(U) && ((advancedUsers.includes(DA.secretuser) || advancedUsers.includes(U.name)));
}
function is_human_player(plname) {
  let [fen, name] = [Z.fen, valf(plname, Z.uplayer)];
  return lookup(fen, ['players', name, 'playmode']) == 'human';
}
function is_multi_trigger(plname) { return lookup(Z, ['fen', 'trigger']) == plname; }
function is_online() { return lookup(DA, ['internet']); }
function is_playerdata_set(plname) {
  return isdef(Z.playerdata) && !isEmpty(Z.playerdata) && !isEmpty(Z.playerdata.find(x => x.name == plname).state);
}
function is_playing(pl, fen) {
  return isList(fen.plorder) && fen.plorder.includes(pl) || isList(fen.roundorder) && fen.roundorder.includes(pl) || Z.game == 'feedback' && isdef(Z.fen.players[pl]);
}
function is_shield_mode() {
  return Z.role == 'spectator'
    || Z.mode == 'multi' && Z.role == 'inactive' && Z.host != Z.uname
    || Z.mode == 'multi' && Z.role == 'inactive' && Z.pl.playmode != 'bot'
}
function is_stringified(obj) {
  if (isString(obj)) {
    return '"\'{[('.includes(obj[0]);
  }
  return false;
}
function isdef(x) { return x !== null && x !== undefined; }
function isDict(d) { let res = (d !== null) && (typeof (d) == 'object') && !isList(d); return res; }
function isEmpty(arr) {
  return arr === undefined || !arr
    || (isString(arr) && (arr == 'undefined' || arr == ''))
    || (Array.isArray(arr) && arr.length == 0)
    || Object.entries(arr).length === 0;
}
function isList(arr) { return Array.isArray(arr); }
function isListOf_Obj(x) {
  return isList(x) && !empty(x) && atleastOneElementOfXIsDictWithKey_obj(x);
}
function isLiteral(x) { return isString(x) || isNumber(x); }
function isNumber(x) { return x !== ' ' && x !== true && x !== false && isdef(x) && (x == 0 || !isNaN(+x)); }
function isNumeric(x) { return !isNaN(+x); }
function isSet(x) { return (isDict(x) && (x.set || x._set)); }
function isSimple(x) { return isString(x) || isNumeric(x); }
function isString(param) { return typeof param == 'string'; }
function isSvg(elem) { return startsWith(elem.constructor.name, 'SVG'); }
function isVisible(elem) {
  if (isString(elem)) elem = document.getElementById(elem);
  let x = elem.style.flex;
  return (elem.style.display != 'none' || elem.offsetParent !== null) && (nundef(elem.style.flex) || !endsWith(elem.style.flex, '0%'));
}
function jsCopy(o) { return JSON.parse(JSON.stringify(o)); }
function landing() { if (isdef(DA.landing)) DA.landing(); }
function last(arr) {
  return arr.length > 0 ? arr[arr.length - 1] : null;
}
function list2dict(arr, keyprop = 'id', uniqueKeys = true) {
  let di = {};
  for (const a of arr) {
    if (uniqueKeys) lookupSet(di, [a[keyprop]], a);
    else lookupAddToList(di, [a[keyprop]], a);
  }
  return di;
}
function load_assets(obj) {
  Config = jsyaml.load(obj.config);
  Syms = jsyaml.load(obj.syms);
  SymKeys = Object.keys(Syms);
  ByGroupSubgroup = jsyaml.load(obj.symGSG);
  C52 = jsyaml.load(obj.c52);
  Cinno = jsyaml.load(obj.cinno);
  Info = jsyaml.load(obj.info);
  Sayings = jsyaml.load(obj.sayings);
  create_card_assets_c52();
  KeySets = getKeySets();
  assertion(isdef(Config), 'NO Config!!!!!!!!!!!!!!!!!!!!!!!!');
}
function loader_off() { let d = mBy('loader_holder'); if (isdef(d)) d.className = 'loader_off'; }
function loader_on() { let d = mBy('loader_holder'); if (isdef(d)) d.className = 'loader_on'; }
function logout() {
  closeSocket();
  sendRoute('/logout/' + clientData.name, d => {
    clientData.name = null;
    loggedIn = false;
    loginView();
  });
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
function mAnimateTo(elem, prop, val, callback, msDuration = 1000, easing = 'cubic-bezier(1,-0.03,.86,.68)', delay = 0) {
  let o = {};
  o[prop] = isString(val) || prop == 'opacity' ? val : '' + val + 'px';
  let kflist = [o];
  let opts = { duration: msDuration, fill: 'forwards', easing: easing, delay: delay };
  let a = toElem(elem).animate(kflist, opts);
  if (isdef(callback)) { a.onfinish = callback; }
  return a;
}
function mAppend(d, child) { toElem(d).appendChild(child); return child; }
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
function mBy(id) { return document.getElementById(id); }
function mCenterCenterFlex(d, gap) { mCenterFlex(d, true, true, true, gap); }
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
function mClassRemove(d) { d = toElem(d); for (let i = 1; i < arguments.length; i++) d.classList.remove(arguments[i]); }
function mClassReplace(d, weg, her) { mClassRemove(d, weg); mClass(d, her); }
function mClear(d) { clearElement(toElem(d)); }
function mContainerSplay(d, splay, w, h, num, ov) {
  if (nundef(splay)) splay = 2;
  if (!isNumber(splay)) splay = get_splay_number(splay);
  if (isString(ov) && ov[ov.length - 1] == '%') ov = splay == 0 ? 1 : splay == 3 ? Number(ov) * h / 100 : Number(ov) * w / 100;
  if (splay == 3) {
    d.style.display = 'grid';
    d.style.gridTemplateRows = `repeat(${num},${ov}px)`;
    console.log('HAAAAAAAAAAAALLLLLLLLLLLLLLLLLLLLLLLLLLOOOOOOOOOOOOOOOOOOOOOOOOO')
    d.style.minHeight = `${h + (num - 1) * (ov * 1.1)}px`;
  } else if (splay == 2 || splay == 1) {
    d.style.display = 'grid';
    d.style.gridTemplateColumns = `repeat(${num},${ov}px)`;
    let wnew = w + (num - 1) * (ov * 1.1);
    d.style.minWidth = `${w + (num - 1) * (ov * 1.1)}px`;
  } else if (splay == 0) {
    d.style.display = 'grid'; ov = .5
    d.style.gridTemplateColumns = `repeat(${num},${ov}px)`;
    d.style.minWidth = `${w + (num - 1) * (ov * 1.1)}px`;
  } else if (splay == 5) {
    d.style.display = 'grid';
    d.style.gridTemplateColumns = `${ov}px repeat(${num - 1},${ov / 2}px)`;
    d.style.minWidth = `${w + (num) * (ov / 2 * 1.1)}px`;
  } else if (splay == 4) {
    d.style.position = 'relative';
    if (nundef(ov)) ov = .5;
    d.style.minWidth = `${w + (num - 1) * (ov * 1.1)}px`;
    d.style.minHeight = `${h + (num - 1) * (ov * 1.1)}px`;
  }
}
function mCreate(tag, styles, id) { let d = document.createElement(tag); if (isdef(id)) d.id = id; if (isdef(styles)) mStyle(d, styles); return d; }
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
function mFadeClear(d, ms = 800, callback = null) { return mAnimateTo(d, 'opacity', 0, () => { mClear(d); if (callback) callback(); }, ms); }
function mFadeRemove(d, ms = 800, callback = null) { return mAnimateTo(d, 'opacity', 0, () => { mRemove(d); if (callback) callback(); }, ms); }
function mFall(d, ms = 800, dist = 50) { toElem(d).animate([{ opacity: 0, transform: `translateY(-${dist}px)` }, { opacity: 1, transform: 'translateY(0px)' },], { fill: 'both', duration: ms, easing: 'ease' }); }
function mFlexWrap(d) { mFlex(d, 'w'); }
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
function mRemoveClass(d) { for (let i = 1; i < arguments.length; i++) d.classList.remove(arguments[i]); }
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
function mShieldsOff() { if (nundef(DA.shields)) return; for (const d of DA.shields) d.remove(); }
function mShrinkTranslate(child, scale, newParent, ms = 800, callback) {
  let [dx, dy] = get_screen_distance(child, newParent);
  mAnimate(child, 'transform', [`translateX(${dx}px) translateY(${dy}px) scale(${scale})`], callback, ms, 'ease');
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
function mText(text, dParent, styles, classes) {
  if (!isString(text)) text = text.toString();
  let d = mDiv(dParent);
  if (!isEmpty(text)) { d.innerHTML = text; }
  if (isdef(styles)) mStyle(d, styles);
  if (isdef(classes)) mClass(d, classes);
  return d;
}
function normalizeNode(o, num) {
  if (isdef(o.uid)) normalizeSimpleUidProp(o, 'uid', num);
  if (isdef(o.children)) { o.children = o.children.map(x => normalizeVal(x, num)); }
  if (isdef(o.uidParent)) normalizeSimpleUidProp(o, 'uidParent', num);
  if (isdef(o._NODE)) normalizeSpecKeyProp(o, '_NODE', num);
  if (isdef(o.here)) normalizeSpecKeyProp(o, 'here', num);
}
function normalizeRTree(R) { return normalizeTree(R.rNodes, R); }
function normalizeTree(t, r) {
  let tNew = jsCopy(t);
  let first = r.tree.uid;
  let num = firstNumber(first);
  safeRecurse(tNew, normalizeNode, num, false);
  let newRTree = {};
  for (const k in tNew) {
    let kNew = normalizeVal(k, num);
    newRTree[kNew] = tNew[k];
  }
  tNew = newRTree;
  return sortKeys(tNew);
}
function normalizeVal(val, num) {
  let nval = firstNumber(val);
  nval -= num;
  return '_' + nval;
}
function Number(div, board, n) {
  var self = this;
  this.div = div;
  this.board = board;
  this.n = n;
}
function nundef(x) { return x === null || x === undefined; }
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
function onclick_game_menu_item(ev) {
  let gamename = ev_to_gname(ev);
  stop_game();
  show_game_options_menu(gamename);
}
function onclick_logout() {
  mFadeClearShow('dAdminRight', 300);
  mClear('dAdminMiddle');
  stop_game();
  clear_screen();
  U = null;
  show_users();
}
function onclick_table(tablename) {
  send_or_sim({ friendly: tablename, uname: U.name }, 'table');
}
function onclick_user(uname) {
  U = firstCond(Serverdata.users, x => x.name == uname);
  localStorage.setItem('uname', U.name);
  DA.secretuser = U.name;
  let elem = firstCond(arrChildren('dUsers'), x => x.getAttribute('username') == uname);
  let img = elem.children[0];
  mShrinkTranslate(img, .75, 'dAdminRight', 400, show_username);
  mFadeClear('dUsers', 300);
}
function phpPost(data, cmd) {
  if (DA.TEST1 === true && cmd == 'table') { cmd = 'table1'; }
  pollStop();
  var o = {};
  o.data = valf(data, {});
  o.cmd = cmd;
  o = JSON.stringify(o);
  if (DA.SIMSIM && (DA.exclusive || ['table', 'startgame', 'gameover', 'tables'].includes(cmd))) {
    sendSIMSIM(o, DA.exclusive);
    FORCE_REDRAW = true;
    if (DA.exclusive) return;
  } else if (DA.simulate) {
    sendSIMSIM(o, true, true);
    FORCE_REDRAW = true;
    return;
  }
  clear_transaction();
  var xml = new XMLHttpRequest();
  loader_on();
  xml.onload = function () {
    if (xml.readyState == 4 || xml.status == 200) {
      loader_off();
      handle_result(xml.responseText, cmd);
    } else { console.log('WTF?????') }
  }
  xml.open("POST", "api.php", true);
  xml.send(o);
}
function player_stat_count(key, n, dParent, styles = {}) {
  let sz = valf(styles.sz, 16);
  addKeys({ display: 'flex', margin: 4, dir: 'column', hmax: 2 * sz, 'align-content': 'start', fz: sz, align: 'center' }, styles);
  let d = mDiv(dParent, styles);
  if (isdef(Syms[key])) mSym(key, d, { h: sz, 'line-height': sz, w: '100%' });
  else mText(key, d, { h: sz, fz: sz, w: '100%' });
  d.innerHTML += `<span style="font-weight:bold">${n}</span>`;
  return d;
}
function poll() {
  if (IS_POLLING_ALLOWED) {
    if (isdef(DA.poll.func)) DA.poll.data = DA.poll.func(DA.poll.data);
    console.log('...poll')
    to_server(DA.poll.data, DA.poll.type);
  } else console.log('polling OFF!');
}
function pollStop() { clearTimeout(TO.poll); Clientdata.AUTORESET = true; }
function prep_move() {
  let [fen, uplayer, pl] = [Z.fen, Z.uplayer, Z.pl];
  for (const k of ['round', 'phase', 'stage', 'step', 'turn']) { fen[k] = Z[k]; }
  deactivate_ui();
  clear_timeouts();
}
function present() {
  if (Settings.perspective == 'me') presentFor(me);
  else presentAll();
}
function present_a_game() {
  let [fen, uplayer, pl] = [Z.fen, Z.uplayer, Z.pl];
  UI.hand = ui_type_hand(pl.hand, dTable, { margin: 20 });
}
function presentAll() {
  clearZones();
  for (const pl of T.players) {
    let zone = Zones[pl.id];
    pl.hand.showDeck(zone.dData, 'right', 0, false);
  }
  showTrick();
}
function presentFor(me) {
  clearElement(dTable);
  let others = arrWithout(T.players, [me]);
  for (const pl of others) {
    pl.hand.showDeck(dTable, 'right', 0, false);
  }
  mLinebreak(dTable);
  T.trick.showDeck(dTable, 'right', 20, true);
  mLinebreak(dTable);
  me.hand.showDeck(dTable, 'right', 0, false);
  showFleetingMessage('click to play a card!');
}
function processServerdata(obj, cmd) {
  if (isdef(Serverdata.table)) Serverdata.prevtable = jsCopy(Serverdata.table);
  if (isdef(obj.playerdata)) {
    let old_playerdata = valf(Serverdata.playerdata, []);
    let di = list2dict(old_playerdata, 'name');
    Serverdata.playerdata = if_stringified(obj.playerdata);
    Serverdata.playerdata_changed_for = [];
    for (const o of Serverdata.playerdata) {
      let old = di[o.name];
      o.state = isEmpty(o.state) ? '' : if_stringified(o.state);
      let changed = nundef(old) ? true : !simpleCompare(old, o);
      if (changed) {
        Serverdata.playerdata_changed_for.push(o.name);
      }
    }
  } else if (isdef(Serverdata.playerdata)) {
    Serverdata.playerdata_changed_for = Serverdata.playerdata.map(x => x.name);
    Serverdata.playerdata = [];
  } else Serverdata.playerdata_changed_for = [];
  for (const k in obj) {
    if (k == 'tables') Serverdata.tables = obj.tables.map(x => unpack_table(x));
    else if (k == 'table') { Serverdata.table = unpack_table(obj.table); }
    else if (k == 'users') Serverdata[k] = obj[k];
    else if (k == 'playerdata') continue;
    else if (cmd != 'assets') Serverdata[k] = obj[k];
  }
  if (isdef(obj.table)) {
    assertion(isdef(Serverdata.table) && obj.table.id == Serverdata.table.id, 'table NOT in Serverdata or table id mismatch');
    let i = Serverdata.tables.findIndex(x => x.id == obj.table.id);
    if (i != -1) { Serverdata.tables[i] = Serverdata.table; } else Serverdata.tables.push(Serverdata.table);
  }
  else if (isdef(Serverdata.table)) {
    let t = Serverdata.tables.find(x => x.id == Serverdata.table.id);
    if (nundef(t)) delete Serverdata.table;
  }
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
function randomColor() { return rColor(); }
function randomNumber(min = 0, max = 100) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
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
function removeBorder(elem) {
  elem.style.border = null;
}
function removeEvents(elem) {
  for (const evname of arguments) {
    elem['on' + evname] = null;
  }
}
function removeIf(arr, el) { removeInPlace(arr, el); }
function removeInPlace(arr, el) {
  arrRemovip(arr, el);
}
function render() {
  canvas.width = canvas.width
  cx.save()
  cx.scale(devicePixelRatio, devicePixelRatio)
  crowd.forEach((peep) => {
    peep.render(cx)
  })
  cx.restore()
}
function resize() {
  stage.width = canvas.clientWidth
  stage.height = canvas.clientHeight
  canvas.width = stage.width * devicePixelRatio
  canvas.height = stage.height * devicePixelRatio
  crowd.forEach((peep) => {
    peep.walk.kill()
  })
  crowd.length = 0
  availablePeeps.length = 0
  availablePeeps.push(...allPeeps)
  initCrowd()
}
function rHue() { return (rNumber(0, 36) * 10) % 360; }
function rNumber(min = 0, max = 100) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function safeRecurse(o, func, params, tailrec) {
  ___enteredRecursion = 0;
  let arr = Array.from(arguments);
  arr = arr.slice(1);
  recAllNodes(o, func, params, tailrec, true);
  return ___enteredRecursion;
}
function sameList(l1, l2) {
  if (l1.length != l2.length) return false;
  for (const s of l1) {
    if (!l2.includes(s)) return false;
  }
  return true;
}
function sat() {
  let R = T;
  let rtree = normalizeRTree(R);
  let sol = {};
  sol[testEngine.index] = rtree;
  downloadFile(sol, 'sol' + testEngine.index);
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
function saveUser() {
  U.lastGame = G.id;
  if (!startsWith(Username, 'test')) localStorage.setItem('user', Username);
  DB.users[Username] = U;
  dbSaveX();
}
function scoring(isCorrect) {
  Score.nTotal += 1;
  if (isCorrect) { Score.nCorrect += 1; if (G.trialNumber == 1) Score.nCorrect1 += 1; }
  percentageCorrect = Math.round(100 * Score.nCorrect / Score.nTotal);
  if (isCorrect) { Score.nPos += 1; Score.nNeg = 0; } else { Score.nPos = 0; Score.nNeg += 1; }
  let levelChange = 0;
  let gameChange = false;
  let nextLevel = G.level;
  let toggle = G.pictureLabels == 'toggle';
  let hasLabels = G.showLabels == true;
  let boundary = G.samplesPerGame;
  let pos = G.incrementLevelOnPositiveStreak;
  let posSeq = pos > 0 && Score.nPos >= pos;
  let halfposSeq = pos > 0 && Score.nPos >= pos / 2;
  let neg = G.decrementLevelOnNegativeStreak;
  let negSeq = neg > 0 && Score.nNeg >= neg;
  let halfnegSeq = neg > 0 && Score.nNeg >= neg / 2;
  let labelsNextRound = G.showLabels;
  if (halfposSeq && hasLabels && toggle) { labelsNextRound = false; }
  else if (posSeq) { levelChange = 1; nextLevel += 1; Score.nPos = 0; }
  if (halfnegSeq && !hasLabels && toggle) { labelsNextRound = true; }
  else if (negSeq) { levelChange = -1; if (nextLevel > 0) nextLevel -= 1; Score.nNeg = 0; }
  if (nextLevel != G.Level && nextLevel > 0 && nextLevel <= G.maxLevel) {
    userUpdate(['games', G.id, 'startLevel'], nextLevel);
  }
  if (Score.nTotal >= boundary) {
    gameChange = true; levelChange = false;
  }
  if (levelChange || gameChange) {
    if (toggle) labelsNextRound = true;
  } else if (!halfnegSeq && toggle && hasLabels && Score.nTotal >= G.samplesPerGame / 2) {
    labelsNextRound = false;
  }
  G.showLabels = labelsNextRound;
  Score.gameChange = gameChange;
  Score.levelChange = levelChange;
  return nextLevel;
}
function send_or_sim(o, cmd) {
  Counter.server += 1;
  phpPost(o, cmd);
}
function sendgameover(plname, friendly, fen, scoring) {
  let o = { winners: plname, friendly: friendly, fen: fen, scoring: scoring };
  phpPost(o, 'gameover');
}
function sendSIMSIM(o, exclusive = false, saveFromZ = false) {
  o = data_from_client(o);
  let result = apiphp(o, saveFromZ);
  if (TESTING && o.cmd == 'startgame') { for (const func of DA.test.mods) func(result.table); }
  let res = JSON.stringify(result);
  if (exclusive) { if_hotseat_autoswitch(result); handle_result(res, o.cmd); } else { console.log('sendSIMSIM testresult', result); }
}
function server_offline(req, type) {
  if (type == 'user_info') console.log('_______to server offline!', 'req', req, 'type', type, 'Session.cur_user', Session.cur_user);
  let response = {};
  switch (type) {
    case 'user_info':
    case 'account':
      if (nundef(req.user)) req.user = Session.cur_user;
      let u = response.message = DB.users[req.user];
      console.log('udata', u);
      response.name = u.name;
      break;
    case 'contacts':
      let usernames = get_user_names().filter(x => x != Session.cur_user);
      response.users = usernames.map(x => DB.users[x]);
      break;
  }
  response.type = type;
  from_server(JSON.stringify(response), type);
}
function server_online(req, type) {
  var xml = new XMLHttpRequest();
  var loader_holder = mBy("loader_holder");
  loader_holder.className = "loader_on";
  xml.onload = function () {
    if (xml.readyState == 4 || xml.status == 200) {
      loader_holder.className = "loader_off";
      from_server(xml.responseText, type);
    }
  }
  var data = { req: req, type: type };
  data = JSON.stringify(data);
  xml.open("POST", "./server/apisi.php", true);
  xml.send(data);
}
function set_card_border(item, thickness = 1, color = 'black', dasharray) {
  let d = iDiv(item);
  let rect = lastDescendantOfType('rect', d);
  assertion(rect, 'NO RECT FOUND IN ELEM', d);
  if (rect) {
    rect.setAttribute('stroke-width', thickness);
    rect.setAttribute('stroke', color);
    if (isdef(dasharray)) rect.setAttribute('stroke-dasharray', dasharray);
  }
}
function set_journey_or_stall_stage(fen, options, phase) {
  let pljourney = exp_journeys(options) ? find_players_with_potential_journey(fen) : [];
  let stage, turn;
  if (isEmpty(pljourney)) { delete fen.passed; turn = [fen.plorder[0]]; ari_ensure_deck(fen, phase == 'jack' ? 3 : 2); stage = 3; }
  else { turn = [pljourney[0]]; stage = 1; }
  return [stage, turn];
}
function set_player(name, fen) {
  if (isdef(PL) && PL.name != name) { Z.prev.pl = PL; Z.prev.uplayer = PL.name; }
  PL = Z.pl = firstCond(Serverdata.users, x => x.name == name);
  copyKeys(fen.players[name], PL);
  Z.uplayer = name;
}
function set_user(name) {
  if (isdef(Z) && isdef(U) && U.name != name) {
    Z.prev.u = U;
    Z.prev.uname = U.name;
  }
  U = firstCond(Serverdata.users, x => x.name == name);
  if (isdef(Z)) {
    Z.u = U;
    Z.uname = Z.uplayer = name;
  }
}
function setLanguage(x) { currentLanguage = x; startLevel(); }
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
function setup() {
  axiom = system.axiom;
  rules = system.rules;
  factor = valf(system.factor, 1);
  angle = radians(valf(system.angle, 60));
  sentence = axiom;
  let button = createButton("generate"); button.mousePressed(generate);
  button = createButton("animate"); button.mousePressed(() => interval_id = setInterval(generate, 500));
  createCanvas(400, 400);
  background(51);
  createP(axiom);
  turtle();
}
function shield_off() {
  mStyle('dAdmin', { bg: 'white' });
}
function shield_on() {
  mShield(dTable.firstChild.childNodes[1]);
  mStyle('dAdmin', { bg: 'silver' });
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
function show_admin_ui() {
  for (const id of ['bSpotitStart', 'bClearAck', 'bRandomMove', 'bSkipPlayer', 'bRestartMove']) hide(id);
  if (Z.game == 'spotit' && Z.uname == Z.host && Z.stage == 'init') show('bSpotitStart');
  else if (Z.game == 'bluff' && Z.uname == Z.host && Z.stage == 1) show('bClearAck');
  else if (Z.uname == Z.host && Z.stage == 'round_end') show('bClearAck');
  else if (Z.game == 'ferro' && Z.uname == 'mimi' && Z.stage != 'card_selection') show('bClearAck');
  if (['ferro', 'bluff', 'aristo', 'a_game'].includes(Z.game) && (Z.role == 'active' || Z.mode == 'hotseat')) {
    show('bRandomMove');
  }
  if (Z.uname == Z.host || Z.uname == 'mimi') show('dHostButtons'); else hide('dHostButtons');
  if (DA.TEST0 == true) show('dTestButtons'); else hide('dTestButtons');
}
function show_fleeting_message(s, dParent, styles, id, ms = 2000) {
  let d = mDiv(dParent, styles, id, s);
  mFadeRemove(d, ms);
}
function show_game_options_menu(gamename) {
  let dMenu = mBy('dMenu'); iClear(dMenu);
  show_standard_title(dMenu, 'Game Options');
  let d = mDiv(dMenu, { align: 'center' }, 'fMenuInput');
  let dOptions = mDiv(d, {}, 'dMenuInput'); mCenterFlex(dOptions);
  let dButtons = mDiv(d, { display: 'flex', justify: 'center', w: '100%' }, 'dMenuButtons');
  DA.playerlist = null;
  show_game_options(dOptions, gamename);
  let astart = maButton('Start', start_game, dButtons);
  let acancel = maButton('Cancel', cancel_game, dButtons);
}
function show_games(ms = 500) {
  let dParent = mBy('dGames');
  mClear(dParent);
  mText(`<h2>start new game</h2>`, dParent, { maleft: 12 });
  let d = mDiv(dParent, { fg: 'white', animation: 'appear 1s ease both' }, 'game_menu');
  mCenterFlex(d);
  let gamelist = 'aristo bluff spotit ferro fritz'; if (DA.TEST0) gamelist += ' a_game';
  for (const g of dict2list(Config.games)) {
    if (gamelist.includes(g.id)) {
      let [sym, bg, color, id] = [Syms[g.logo], g.color, null, getUID()];
      let d1 = mDiv(d, { cursor: 'pointer', rounding: 10, margin: 10, vpadding: 15, wmin: 140, bg: bg, position: 'relative' }, g.id);
      d1.setAttribute('gamename', g.id);
      d1.onclick = onclick_game_menu_item;
      mCenterFlex(d1);
      mDiv(d1, { fz: 50, family: sym.family, 'line-height': 55 }, null, sym.text);
      mLinebreak(d1);
      mDiv(d1, { fz: 18, align: 'center' }, null, g.friendly);
    }
  }
}
function show_history(fen, dParent) {
  if (!isEmpty(fen.history)) {
    let html = '';
    for (const o of jsCopy(fen.history).reverse()) {
      html += beautify_history(o.lines, o.title, fen);
    }
    let dHistory = mDiv(dParent, { paleft: 12, bg: colorLight('#EDC690', .5), box: true, matop: 4, rounding: 10, patop: 10, pabottom: 10, w: '100%', hmax: `calc( 100vh - 250px )`, 'overflow-y': 'auto', w: 260 }, null, html);
    UI.dHistoryParent = dParent;
    UI.dHistory = dHistory;
    if (isdef(Clientdata.historyLayout)) {
      show_history_layout(Clientdata.historyLayout);
    }
  }
}
function show_home_logo() {
  let bg = colorLight();
  let dParent = mBy('dAdminLeft');
  clearElement(dParent);
  let d = miPic('castle', dParent, { cursor: 'pointer', fz: 24, padding: 6, h: 36, box: true, margin: 2 });
  d.onclick = db_load;
  let version = 'v0.0.1';
  let html = `version ${version}`
  mText(html, dParent, { fz: 12 });
}
function show_hourglass(uname, d, sz, stylesPos = {}) {
  let html = get_waiting_html(sz);
  mStyle(d, { position: 'relative' });
  addKeys({ position: 'absolute' }, stylesPos);
  let dw = mDiv(d, stylesPos, `dh_${uname}`, html);
}
function show_message(msg = '', stay = false) {
  mStyle(dTable, { transition: 'all 1s ease' });
  let d = mBy('dMessage'); d.innerHTML = msg;
  if (stay) return;
  let ms = 1000, delay = 3000;
  let anim = d.animate([{ transform: `scale(1,1)`, opacity: 1 }, { transform: `scale(1,0)`, opacity: 0 },], { duration: 1000, easing: 'ease', delay: delay });
  dTable.animate([{ transform: 'translateY(0px)' }, { transform: 'translateY(-56px)' },], { fill: 'none', duration: ms, easing: 'ease', delay: delay });
  anim.onfinish = () => {
    mClear(d);
  }
}
function show_MMM(msg) { show_fleeting_message(msg, mBy('dMMM')); }
function show_polling_signal() {
  if (DA.TEST0 != true) return;
  let d1 = mDiv(mBy('dAdmin'), { position: 'fixed', top: 10, left: 73 });
  let bg = Z.skip_presentation == true ? 'grey' : 'green';
  let d2 = mDiv(d1, { width: 20, height: 20, bg: bg, rounding: 10, display: 'inline-block' });
  mFadeRemove(d1, 1000);
}
function show_role() {
  let d = mBy('dAdminMiddle');
  clearElement(d);
  let hotseatplayer = Z.uname != Z.uplayer && Z.mode == 'hotseat' && Z.host == Z.uname;
  let styles, text;
  let boldstyle = { fg: 'red', weight: 'bold', fz: 20 };
  let normalstyle = { fg: 'black', weight: null, fz: null };
  let location = '';
  if (hotseatplayer) {
    styles = boldstyle;
    text = `your turn for ${Z.uplayer}`;
  } else if (Z.role == 'spectator') {
    styles = normalstyle;
    text = `(spectating)`;
  } else if (Z.role == 'active') {
    styles = boldstyle;
    text = `It's your turn!!!`;
  } else if (Z.role == 'waiting') {
    text = `waiting for players to complete their moves...`;
  } else {
    assertion(Z.role == 'inactive', 'role is not active or inactive or spectating ' + Z.role);
    styles = normalstyle;
    text = `(${Z.turn[0]}'s turn)`;
  }
  d.innerHTML = location + text;
  mStyle(d, styles);
}
function show_settings(dParent) {
  let [options, fen, uplayer] = [Z.options, Z.fen, Z.uplayer];
  clearElement(dParent);
  mFlex(dParent);
  mStyle(dParent, { 'justify-content': 'end', gap: 12, paright: 10 })
  let playmode = get_playmode(uplayer);
  let game_mode = Z.mode;
  let st = { fz: 20, padding: 0, h: 40, box: true, matop: 2, rounding: '50%', cursor: 'pointer' };
  let dHistoryButton = miPic('scroll', dParent, st);
  dHistoryButton.onclick = show_history_popup;
  if (isdef(Config.games[Z.game].options.strategy)) {
    let dStrategy = miPic('chess pawn', dParent, st);
    dStrategy.onclick = show_strategy_popup;
  }
  let d = miPic('gear', dParent, st);
  options.playmode = playmode;
  d.onmouseenter = () => show_options_popup(options);
  d.onmouseleave = hide_options_popup;
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
  
	// dParent.innerHTML = msg; return;


  dParent.innerHTML = msg;
  if (delay > 0) TO.special = setTimeout(() => { mFadeRemove(dParent, ms, callback); }, delay);
  else mFadeRemove(dParent, ms, callback);
}
function show_tables(ms = 500) {
  clear_screen();
  let dParent = mBy('dTables');
  mClear(dParent);
  show_games();
  let tables = Serverdata.tables;
  if (isEmpty(tables)) { mText('no active game tables', dParent); return []; }
  tables.map(x => x.game_friendly = Config.games[x.game].friendly);
  mText(`<h2>game tables</h2>`, dParent, { maleft: 12 })
  let t = mDataTable(tables, dParent, null, ['friendly', 'game_friendly', 'players'], 'tables', false);
  mTableCommandify(t.rowitems, {
    0: (item, val) => hFunc(val, 'onclick_table', val, item.id),
  });
  let d = iDiv(t);
  for (const ri of t.rowitems) {
    let r = iDiv(ri);
    let h = hFunc('delete', 'delete_table', ri.o.friendly);
    c = mAppend(r, mCreate('td'));
    c.innerHTML = h;
  }
}
function show_title() {
  Z.func.state_info(mBy('dTitleLeft'));
  show_settings(mBy('dTitleRight'));
  mBy('dTablename').innerHTML = Z.friendly;
}
function show_username() {
  let uname = U.name;
  let dpic = get_user_pic(uname, 30);
  let d = mBy('dAdminRight');
  mClear(d);
  mAppend(d, get_logout_button());
  mAppend(d, dpic);
  if (is_advanced_user()) { show('dAdvanced1'); } else { hide('dAdvanced'); hide('dAdvanced1'); }
  //console.log('DA.running',DA.running); //'Z',Z,'dTable',dTable,mBy('dTable'),isVisible('dTable'));
  if (!TESTING && !DA.running) phpPost({ app: 'easy' }, 'tables');
}
function show_users(ms = 300) {
  let dParent = mBy('dUsers');
  mClear(dParent);
  for (const u of Serverdata.users) {
    if (['ally', 'bob', 'leo'].includes(u.name)) continue;
    let d = get_user_pic_and_name(u.name, dParent);
    d.onclick = () => onclick_user(u.name);
    mStyle(d, { cursor: 'pointer' });
  }
  mFall(dParent, ms);
}
function show_view_buildings_button(plname) {
  if (Z.role == 'spectator' || isdef(mBy('dPlayerButtons'))) return;
  if (isEmpty(UI.players[plname].buildinglist)) return;
  let d1 = iDiv(UI.players[plname]); mStyle(d1, { position: 'relative' });
  let d2 = mDiv(d1, { position: 'absolute', top: 8, left: 50, height: 25 }, 'dPlayerButtons');
  show_player_button('view buildings', d2, onclick_view_buildings);
}
function show_waiting_message(msg) {
  let dInstruction = mBy('dSelections0');
  mClass(dInstruction, 'instruction');
  mCenterCenterFlex(dInstruction);
  mBy('dSelections0').innerHTML = msg;
}
function show_winners() {
  let winners = Z.fen.winners;
  let multiple_winners = winners.length > 1;
  let winners_html = winners.map(x => get_user_pic_html(x, 35)).join(' ');
  let msg = `
    <div style="display:flex;gap:10px;align-items:center">
      <div style="color:red;font-size:22px;font-weight:bold;">GAME OVER! the winner${multiple_winners ? 's are: ' : ' is '}</div>
      <div style="padding-top:5px;">${winners_html}</div>
    </div>
  `;
  show_message(msg, true);
  mShield(dTable);
  hide('bRestartMove');
  return Z.fen.winners;
}
function showDeck(keys, dParent, splay, w, h) {
  let d = mDiv(dParent);
  mStyleX(d, { display: 'block', position: 'relative', bg: 'green', padding: 25 });
  let gap = 10;
  let ovPercent = 20;
  let overlap = w * ovPercent / 100;
  let x = y = gap;
  for (let i = 0; i < keys.length; i++) {
    let k = keys[i];
    let c = zInno(k, d);
    mAppend(d, c.div);
    mStyleX(c.div, { position: 'absolute', left: x, top: y });
    c.row = 0;
    c.col = i;
    x += overlap;
    Pictures.push(c);
  }
  d.style.width = (x - overlap + w) + 'px';
  console.log(Pictures[0])
  console.log(Pictures[0].div)
  d.style.height = firstNumber(Pictures[0].div.style.height) + 'px';
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
function showTrick() {
  let dZone = Zones.table.dData;
  let d = mDiv(dZone);
  mStyleX(d, { display: 'flex', position: 'relative' });
  let zIndex = 1;
  for (let i = 0; i < T.trick.length; i++) {
    let c = T.trick[i];
    let direction = i == 0 ? { x: 0, y: -1 } : { x: 0, y: 1 };
    let displ = 10;
    let offset = { x: -35 + direction.x * displ, y: direction.y * displ };
    let d1 = c.div;
    mAppend(d, d1);
    mStyleX(d1, { position: 'absolute', left: offset.x, top: offset.y, z: zIndex });
    zIndex += 1;
  }
}
function shuffle(arr) { if (isEmpty(arr)) return []; else return fisherYates(arr); }
function simpleCompare(o1, o2) {
  let s1 = object2string(o1);
  let s2 = object2string(o2);
  return s1 == s2;
}
function simpleRep(val) {
  if (nundef(val) || val === '') {
    return '_';
  } else if (isSimple(val)) return val;
  else if (isList(val)) {
    return '[' + val.map(x => simpleRep(x)).join(', ') + ']';
  } else if (typeof val == 'object') {
    let s = [];
    for (const k in val) {
      if (isEmpty(val[k])) continue;
      let s1 = simpleRep(val[k]);
      if (k == '_set') s1 = '{' + s1.substring(1, s1.length - 1) + '}';
      s.push(s1);
    }
    return s.join(', ');
  }
}
function simulateClick(elem) {
  var evt = new MouseEvent('click', { bubbles: true, cancelable: true, view: window });
  var canceled = !elem.dispatchEvent(evt);
}
function sortKeys(o) {
  if (Array.isArray(o)) {
    return o.map(sortKeys);
  } else if (isObject(o)) {
    return Object
      .keys(o)
      .sort()
      .reduce(function (a, k) {
        a[k] = sortKeys(o[k]);
        return a;
      }, {});
  }
  return o;
}
function sortKeys(o) {
  if (Array.isArray(o)) {
    return o.map(sortKeys);
  } else if (isObject(o)) {
    return Object
      .keys(o)
      .sort()
      .reduce(function (a, k) {
        a[k] = sortKeys(o[k]);
        return a;
      }, {});
  }
  return o;
}
function spotit() {
  function setup(players, options) {
    let fen = { players: {}, plorder: jsCopy(players), turn: [players[0]], stage: 'init', phase: '' };
    for (const plname of players) {
      fen.players[plname] = {
        score: 0, name: plname, color: get_user_color(plname),
      };
    }
    fen.items = spotit_item_fen(options);
    if (nundef(options.mode)) options.mode = 'multi';
    return fen;
  }
  function check_gameover() {
    for (const uname of Z.plorder) {
      let cond = get_player_score(uname) >= Z.options.winning_score;
      if (cond) { Z.fen.winners = [uname]; return Z.fen.winners; }
    }
    return false;
  }
  function state_info(dParent) { spotit_state(dParent); }
  function present(dParent) { spotit_present(dParent); }
  function stats(dParent) { spotit_stats(dParent); }
  function activate_ui() { spotit_activate(); }
  return { setup, activate_ui, check_gameover, present, state_info, stats };
}
function spotit_activate() {
  let [stage, uplayer, host, plorder, fen] = [Z.stage, Z.uplayer, Z.host, Z.plorder, Z.fen];
  if (stage == 'move' && uplayer == host && get_player_score(host) >= 1) {
    let bots = plorder.filter(x => fen.players[x].playmode == 'bot');
    if (isEmpty(bots)) return;
    let bot = rChoose(bots);
    TO.main = setTimeout(() => spotit_move(bot, true), rNumber(2000, 9000));
  }
}
function spotit_item_fen(options) {
  let o = {
    num_cards: valf(options.num_cards, 2),
    num_symbols: options.adaptive == 'yes' ? 14 : valf(options.num_symbols, 7),
    vocab: valf(options.vocab, 'lifePlus'),
    lang: 'E',
    min_scale: valf(options.min_scale, 0.75),
    max_scale: valf(options.max_scale, 1.25),
  };
  let items = spotit_create_sample(o.num_cards, o.num_symbols, o.vocab, o.lang, o.min_scale, o.max_scale);
  let item_fens = [];
  for (const item of items) {
    let arr = arrFlatten(item.pattern);
    let ifen = arr.map(x => `${x.key}:${x.scale}`).join(' ');
    item_fens.push(ifen);
  }
  let res = item_fens.join(',');
  return res;
}
function spotit_present(dParent) {
  let [fen, ui, stage, uplayer] = [Z.fen, UI, Z.stage, Z.uplayer];
  let [dOben, dOpenTable, dMiddle, dRechts] = tableLayoutMR(dParent, 1, 0);
  spotit_read_all_scores();
  let dt = dOpenTable; clearElement(dt); mCenterFlex(dt);
  spotit_stats(dt);
  mLinebreak(dt, 10);
  let ks_for_cards = fen.items.split(',');
  let numCards = ks_for_cards.length;
  let items = Z.items = [];
  Items = [];
  let i = 0;
  for (const s of ks_for_cards) {
    let ks_list = s.split(' ');
    let item = {};
    item.keys = ks_list.map(x => stringBefore(x, ':'));
    item.scales = ks_list.map(x => stringAfter(x, ':')).map(x => Number(x));
    item.index = i; i++;
    let n = item.numSyms = item.keys.length;
    let [rows, cols, colarr] = calc_syms(item.numSyms);
    item.colarr = colarr;
    item.rows = rows;
    items.push(item);
  }
  Z.cards = [];
  let is_adaptive = Z.options.adaptive == 'yes';
  let nsyms = is_adaptive ? cal_num_syms_adaptive() : Z.options.num_symbols;
  for (const item of items) {
    if (is_adaptive) { modify_item_for_adaptive(item, items, nsyms); }
    let card = spotit_card(item, dt, { margin: 20, padding: 10 }, spotit_interact);
    Z.cards.push(card);
    if (Z.stage == 'init') {
      face_down(card, GREEN, 'food');
    }
  }
  mLinebreak(dt, 10);
}
function spotit_state(dParent) {
  let user_html = get_user_pic_html(Z.uplayer, 30);
  let msg = Z.stage == 'init' ? `getting ready...` : `player: ${user_html}`;
  dParent.innerHTML = `Round ${Z.round}:&nbsp;${msg} `;
}
function spotit_stats(d) {
  let players = Z.fen.players;
  let d1 = mDiv(d, { display: 'flex', 'justify-content': 'center', 'align-items': 'space-evenly' });
  for (const plname of get_present_order()) {
    let pl = players[plname];
    let onturn = Z.turn.includes(plname);
    let sz = 50;
    let bcolor = plname == Z.uplayer ? 'lime' : 'silver';
    let border = pl.playmode == 'bot' ? `double 5px ${bcolor}` : `solid 5px ${bcolor}`;
    let rounding = pl.playmode == 'bot' ? '0px' : '50%';
    let d2 = mDiv(d1, { margin: 4, align: 'center' }, null, `<img src='../base/assets/images/${plname}.jpg' style="border-radius:${rounding};display:block;border:${border};box-sizing:border-box" class='img_person' width=${sz} height=${sz}>${get_player_score(plname)}`);
  }
}
function start() { let uname = DA.secretuser = localStorage.getItem('uname'); if (isdef(uname)) U = { name: uname }; phpPost({ app: 'simple' }, 'assets'); }
function start_new_round_ferro() {
  let [plorder, stage, A, fen, uplayer] = [Z.plorder, Z.stage, Z.A, Z.fen, Z.uplayer];
  let pl = fen.players[uplayer];
  Z.stage = 'card_selection';
  fen.plorder = arrCycle(plorder, 1);
  let starter = fen.plorder[0];
  Z.turn = fen.turn = [starter];
  let deck = fen.deck = create_fen_deck('n', fen.num_decks, fen.num_decks * 4);
  let deck_discard = fen.deck_discard = [];
  shuffle(deck);
  let handsize = valf(Number(Z.options.handsize), 11);
  for (const plname of fen.plorder) {
    let pl = fen.players[plname];
    pl.hand = deck_deal(deck, plname == starter ? handsize + 1 : handsize);
    pl.journeys = [];
    pl.roundgoal = false;
    pl.roundchange = true;
    delete pl.handsorting;
  }
  Z.round += 1;
  if (Z.round > Z.options.maxrounds) {
    ari_history_list([`game over`], 'game');
    Z.stage = 'game_over';
    fen.winners = find_players_with_min_score();
  }
}
function start_with_assets() {
  DA.isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1; if (DA.isFirefox) console.log('using Firefox!')
  show_home_logo();
  if (nundef(U)) { show_users(); return; }
  show_username();
  if (DA.TEST0) show('dTestButtons');
  //#region TESTING
  //#endregion
}
function startgame(game, players, options = {}) {
  if (nundef(game)) game = 'a_game';
  let default_options = {}; for (const k in Config.games[game].options) default_options[k] = arrLast(Config.games[game].options[k].split(','));
  addKeys(default_options, options);
  if (nundef(players)) players = rChoose(Serverdata.users, 2).map(x => ({ name: x.name }));
  let playernames = players.map(x => x.name);
  let fen = window[game]().setup(playernames, options);
  if (nundef(fen.round)) fen.round = 1;
  if (nundef(fen.phase)) fen.phase = '';
  if (nundef(fen.stage)) fen.stage = 0;
  if (nundef(fen.step)) fen.step = 0;
  if (nundef(fen.turn)) fen.turn = [fen.plorder[0]]; else if (DA.TESTSTART1 && fen.turn.length == 1) fen.turn = [playernames[0]];
  players.map(x => { let pl = fen.players[x.name]; pl.playmode = valf(x.playmode, 'human'); pl.strategy = valf(x.strategy, valf(options.strategy, 'random')); });
  if (options.mode == 'solo') {
    let me = isdef(U) && isdef(fen.players[U.name]) ? U.name : rChoose(playernames);
    for (const plname of playernames) {
      if (plname == me) continue;
      fen.players[plname].playmode = 'bot';
    }
    options.mode = 'hotseat';
  }
  for (const k in options) { if (isNumber(options[k])) options[k] = parseInt(options[k]); }
  let o = {
    friendly: generate_table_name(players.length), game: game, host: playernames[0], players: playernames,
    fen: fen, options: options
  };
  ensure_polling();
  phpPost(o, 'startgame');
}
function startLevel() {
  Speech.setLanguage(Settings.language);
  getGameValues(Username, G.id, G.level);
  G.instance.startLevel();
  if (G.keys.length < G.numPics) { updateKeySettings(G.numPics + 5); }
  startRound();
}
function startRound() {
  if (G.addonActive != true && isTimeForAddon()) {
    G.addonActive = true;
    exitToAddon(startRound); return;
  } else G.addonActive = false;
  resetRound();
  uiActivated = false;
  G.instance.startRound();
  TOMain = setTimeout(() => prompt(), 300);
}
function startsWith(s, sSub) {
  return s.substring(0, sSub.length) == sSub;
}
function staticTitle() {
  clearInterval(TO.titleInterval);
  let url = window.location.href;
  let loc = url.includes('telecave') ? 'telecave' : 'local';
  let game = isdef(Z) ? stringAfter(Z.friendly, 'of ') : '♠ GAMES ♠';
  document.title = `(${loc}) ${game}`;
}
function step() {
}
function stop_game() { console.log('stopgame'); }
function stop_simple_timer() { if (isdef(DA.timer)) { DA.timer.clear(); DA.timer = null; } }
function stopgame() {
  if (!DA.running) return;
  DA.running = false;
  DA.noshow = 0;
  clear_timeouts();
  hide('bRestartMove');
  hide('dHostButtons');
  mStyle('dAdmin', { bg: 'white' });
  mClear('dAdminMiddle')
  for (const id of ['bSpotitStart', 'bClearAck', 'bRandomMove', 'bSkipPlayer']) hide(id);
  pollStop();
  Z = null; delete Serverdata.table; delete Serverdata.playerdata; Clientdata = {};
  staticTitle();
}
function stringAfter(sFull, sSub) {
  let idx = sFull.indexOf(sSub);
  if (idx < 0) return '';
  return sFull.substring(idx + sSub.length);
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
function switch_uname(plname) {
  set_user(plname);
  show_username();
}
function t2(act) {
  let res = [];
  for (const key in act) {
    let data = act[key].actions;
    let e = exp(data);
    res.push(e)
  }
  return res;
}
function tableElem(o, keys) {
  let t = document.createElement('table');
  t.classList.add('tttable');
  let s = '';
  for (const k in o) {
    if (isdef(keys) && !keys.includes(k)) continue;
    s += '<tr><th>' + k + '</th><td>';
    let val = o[k];
    let sval = null;
    if (isListOf_Obj(val)) {
      sval = `<div class='up10 hallo'>${val.map(x => !x ? '_' : x._obj).toString()}</div>`;
    } else if (val && isDict(val) && '_obj' in val) {
      sval = `<div class='up10 hallo'>${val._obj.toString()}</div>`;
    }
    if (!sval) sval = isSet(val) ? empty(val._set) ? '{ }' : simpleRep(val) : isDict(val) ? tableHTML(val, 4) : simpleRep(val);
    s += sval + '</td>';
  }
  t.innerHTML = s;
  return t;
}
function tableHTML(o) {
  let s = '<table class="tttable up10">';
  for (const k in o) {
    s += '<tr><th>' + k + '</th><td>';
    let val = o[k];
    let sval = null;
    if (isListOf_Obj(val)) sval = `<div class='up10 hallo'>${val.map(x => !x ? '_' : x._obj).toString()}</div>`;
    else if (val && isDict(val) && '_obj' in val) sval = `<div class='up10 hallo'>${val._obj.toString()}</div>`;
    if (!sval) sval = isSet(val) ? empty(val._set) ? '{ }' : simpleRep(val) : isDict(val) ? tableHTML(val) : simpleRep(val);
    s += sval + '</td>';
  }
  s += '</table>';
  return s;
}
function tableLayoutMR(dParent, m = 7, r = 1) {
  let ui = UI; ui.players = {};
  clearElement(dParent);
  let bg = 'transparent';
  let [dMiddle, dRechts] = [ui.dMiddle, ui.dRechts] = mColFlex(dParent, [m, r], [bg, bg]);
  mCenterFlex(dMiddle, false);
  let dOben = ui.dOben = mDiv(dMiddle, { w: '100%', display: 'block' }, 'dOben');
  let dSelections = ui.dSelections = mDiv(dOben, {}, 'dSelections');
  for (let i = 0; i <= 5; i++) { ui[`dSelections${i}`] = mDiv(dSelections, {}, `dSelections${i}`); }
  let dActions = ui.dActions = mDiv(dOben, { w: '100%' });
  for (let i = 0; i <= 5; i++) { ui[`dActions${i}`] = mDiv(dActions, { w: '100%' }, `dActions${i}`); }
  ui.dError = mDiv(dOben, { w: '100%', bg: 'red', fg: 'yellow', hpadding: 12, box: true }, 'dError');
  let dSubmitOrRestart = ui.dSubmitOrRestart = mDiv(dOben, { w: '100%' });
  let dOpenTable = ui.dOpenTable = mDiv(dMiddle, { w: '100%', padding: 10 }); mFlexWrap(dOpenTable);
  return [dOben, dOpenTable, dMiddle, dRechts];
}
function take_turn_clear() {
  prep_move();
  let o = { uname: Z.uplayer, friendly: Z.friendly, fen: Z.fen, players: Z.playerlist };
  let cmd = 'clear';
  send_or_sim(o, cmd);
}
function take_turn_collect_open() {
  prep_move();
  let o = { uname: Z.uplayer, friendly: Z.friendly, fen: Z.fen, state: Z.state, write_player: true };
  let cmd = 'table';
  send_or_sim(o, cmd);
}
function take_turn_fen() { take_turn(); }
function take_turn_resolve(notes) {
  prep_move();
  let o = { uname: Z.uplayer, friendly: Z.friendly, fen: Z.fen, write_fen: true, write_notes: notes };
  let cmd = 'table';
  send_or_sim(o, cmd);
}
function test() {
  for (i = 0; i < 10; i++) {
    circles += 1;
    createcircle((i * w / 10), "50%", "100", "0", "hsla(" + (i * 36) + ",100%,50%,0.5)", "url(#f" + circles + ")"); createfilter("-50%", "-50%", "200%", "200%", ["feGaussianBlur"], ["stdDeviation", "5"]);
  }
}
function testHelpers() {
  if (activatedTests.includes('helpers')) {
    console.log(...arguments);
  }
}
function to_server(req, type, to_php = true) {
  where(type);
  if (!to_php) {
    server_offline(req, type);
  } else if (is_online()) {
    server_online(req, type);
  } else {
    if (type == 'chat') { alert('no internet!'); mClassReplace(mBy("label_chat"), 'enabled', 'disabled'); }
    server_offline(req, type);
  }
}
function toElem(d) { return isString(d) ? mBy(d) : d; }
function toLetters(s) { return [...s]; }
function toWords(s, allow_ = false) {
  let arr = allow_ ? s.split(/[\W]+/) : s.split(/[\W|_]+/);
  return arr.filter(x => !isEmpty(x));
}
function trim(str) {
  return str.replace(/^\s+|\s+$/gm, '');
}
function turtle() {
  background(51);
  stroke(255);
  translate(width / 2, height);
  for (let i = 0; i < sentence.length; i++) {
    let x = sentence.charAt(i);
    if ('ABF'.includes(x)) { line(0, 0, 0, -len); translate(0, -len); }
    else if (x == '+') rotate(angle);
    else if (x == '-') rotate(-angle);
    else if (x == '[') push();
    else if (x == ']') pop();
  }
}
function ui_add_cards_to_hand_container(cont, items, list) {
  if (nundef(list)) list = items.map(x => x.key);
  for (const item of items) {
    mAppend(cont, iDiv(item));
    mItemSplay(item, list, 2, Card.ovw);
  }
}
function ui_add_container_title(title, cont, items, show_if_empty) {
  if (isdef(title) && (!isEmpty(items) || show_if_empty)) {
    let st = get_containertitle_styles();
    let stmeasure = jsCopy(st); delete stmeasure.position;
    let elem = mText(title, cont, stmeasure);
    let sz = getSizeNeeded(elem);
    let offsetx = valf(st.left, 0);
    let cont_wmin = mGetStyle(cont, 'wmin');
    let my_min = sz.w + offsetx * 1.5;
    let wmin = !isNumber(cont_wmin) ? my_min : Math.max(valf(cont_wmin, 0), my_min);
    mStyle(cont, { wmin: wmin });
    mStyle(elem, st);
  }
}
function ui_make_container(dParent, styles = { bg: 'random', padding: 10 }) {
  let id = getUID('u');
  let d = mDiv(dParent, styles, id);
  return d;
}
function ui_player_info(dParent, outerStyles = { dir: 'column' }, innerStyles = {}) {
  let fen = Z.fen;
  if (nundef(outerStyles.display)) outerStyles.display = 'flex';
  mStyle(dParent, outerStyles);
  let items = {};
  let styles = jsCopy(innerStyles); addKeys({ rounding: 10, bg: '#00000050', margin: 4, padding: 4, patop: 12, box: true, 'border-style': 'solid', 'border-width': 6 }, styles);
  let order = get_present_order();
  for (const plname of order) {
    let pl = fen.players[plname];
    let uname = pl.name;
    let imgPath = `../base/assets/users/${uname}.jpg`;
    styles['border-color'] = get_user_color(uname);
    let item = mDivItem(dParent, styles, name2id(uname));
    let d = iDiv(item);
    let picstyle = { w: 50, h: 50, box: true };
    let ucolor = get_user_color(uname);
    if (pl.playmode == 'bot') {
      copyKeys({ rounding: 0, border: `double 6px ${ucolor}` }, picstyle);
    } else {
      copyKeys({ rounding: '50%', border: `solid 2px white` }, picstyle);
    }
    let img = mImage(imgPath, d, picstyle, 'img_person');
    items[uname] = item;
  }
  if (DA.SIMSIM || is_advanced_user()) activate_playerstats(items)
  return items;
}
function ui_type_church(list, dParent, styles = {}, path = 'trick', title = '', get_card_func = ari_get_card, show_if_empty = false) {
  let cont = ui_make_container(dParent, get_container_styles(styles));
  let cardcont = mDiv(cont, { display: 'flex' });
  let items = [];
  let n = Z.plorder.length;
  let inc = 90;
  let rotation = n % 2 ? 0 : 90;
  for (const ckey of list) {
    let d = mDiv(cardcont, { origin: 'center', transform: `rotate( ${rotation}deg )`, position: 'absolute', left: 8 });
    let c = get_card_func(ckey);
    if (ckey != arrLast(list)) face_down(c);
    mAppend(d, iDiv(c));
    remove_card_shadow(c);
    let item = { card: c, div: d };
    items.push(item);
    rotation += inc;
  }
  ui_add_container_title(title, cont, items, show_if_empty);
  return {
    list: list,
    path: path,
    container: cont,
    cardcontainer: cardcont,
    items: items,
  }
}
function ui_type_deck(list, dParent, styles = {}, path = 'deck', title = 'deck', get_card_func = ari_get_card, show_if_empty = false) {
  let cont = ui_make_container(dParent, get_container_styles(styles));
  let cardcont = mDiv(cont);
  let items = [];
  ensure_ui(list, cardcont, items, get_card_func);
  ui_add_container_title(title, cont, items, show_if_empty);
  function get_topcard() { return isEmpty(list) ? null : items[0]; }
  function get_bottomcard() { return isEmpty(list) ? null : arrLast(items); }
  function ensure_ui(list, cardcont, items, get_card_func) {
    clearElement(cardcont); arrClear(items); if (isEmpty(list)) return;
    let n = Math.min(2, list.length); let ct = get_card_func(list[0]); items.push(ct); if (n > 1) { let cb = get_card_func(arrLast(list)); items.push(cb); }
    mStyle(cardcont, { position: 'relative', wmin: ct.w + 8, hmin: ct.h });
    for (let i = items.length - 1; i >= 0; i--) { let x = items[i]; face_down(x); mAppend(cardcont, iDiv(x)); mStyle(iDiv(x), { position: 'absolute', top: 0, left: 0 }) }
    mText(list.length, iDiv(ct), { position: 'absolute', left: list.length >= 100 ? '10%' : '25%', top: 10, fz: ct.h / 3 });
  }
  return {
    ctype: 'deck',
    container: cont,
    cardcontainer: cardcont,
    items: items,
    list: list,
    title: title,
    path: path,
    func: get_card_func,
    get_topcard: get_topcard,
    get_bottomcard: get_bottomcard,
    get_card_func: get_card_func,
    renew: ensure_ui,
  };
}
function ui_type_hand(list, dParent, styles = {}, path = 'hand', title = 'hand', get_card_func = ari_get_card, show_if_empty = false) {
  let cont = ui_make_container(dParent, get_container_styles(styles));
  let items = list.map(x => get_card_func(x));
  let cardcont = mDiv(cont);
  let card = isEmpty(items) ? { w: 1, h: Config.ui.card.h, ov: 0 } : items[0];
  let splay = 2;
  mContainerSplay(cardcont, splay, card.w, card.h, items.length, card.ov * card.w);
  ui_add_cards_to_hand_container(cardcont, items, list);
  ui_add_container_title(title, cont, items, show_if_empty);
  return {
    ctype: 'hand',
    list: list,
    path: path,
    container: cont,
    cardcontainer: cardcont,
    splay: splay,
    items: items,
  };
}
function ui_type_market(list, dParent, styles = {}, path = 'market', title = 'market', get_card_func = ari_get_card, show_if_empty = false) {
  let cont = ui_make_container(dParent, get_container_styles(styles));
  let cardcont = mDiv(cont, { display: 'flex', gap: 2 });
  let items = list.map(x => get_card_func(x));
  items.map(x => mAppend(cardcont, iDiv(x)));
  ui_add_container_title(title, cont, items, show_if_empty);
  return {
    ctype: 'market',
    list: list,
    path: path,
    container: cont,
    cardcontainer: cardcont,
    items: items,
  };
}
function ui_type_rank_count(list, dParent, styles, path, title, get_card_func, show_if_empty = false) {
  let cont = ui_make_container(dParent, get_container_styles(styles));
  let cardcont = mDiv(cont, { display: 'flex' });
  let items = [];
  for (const o of list) {
    let d = mDiv(cardcont, { display: 'flex', dir: 'c', padding: 1, fz: 12, align: 'center', position: 'relative' });
    let c = get_card_func(o.key);
    mAppend(d, iDiv(c));
    remove_card_shadow(c);
    d.innerHTML += `<span style="font-weight:bold">${o.count}</span>`;
    let item = { card: c, count: o.count, div: d };
    items.push(item);
  }
  ui_add_container_title(title, cont, items, show_if_empty);
  return {
    list: list,
    path: path,
    container: cont,
    cardcontainer: cardcont,
    items: items,
  }
}
function uid() {
  UID += 1;
  return 'a' + UID;
}
function unpack_table(table) {
  for (const k of ['players', 'fen', 'options', 'scoring']) {
    let val = table[k];
    if (isdef(table[k])) table[k] = if_stringified(val); if (nundef(table[k])) table[k] = {};
  }
  if (isdef(table.modified)) { table.modified = Number(table.modified); table.timestamp = new Date(table.modified); table.stime = stringBeforeLast(table.timestamp.toString(), 'G').trim(); }
  assertion(isdef(window[table.game]), 'game function for ' + table.game + ' not defined in window');
  if (isdef(table.game)) { table.func = window[table.game](); }
  if (isdef(table.options.mode)) { table.mode = table.options.mode; }
  delete table.action; delete table.expected;
  return table;
}
function update_table() {
  assertion(isdef(U), 'NO USER LOGGED IN WHEN GETTING TABLE FROM SERVER!!!!!!!!!!!!!!!!!!!!', U);
  if (nundef(Z) || nundef(Z.prev)) Z = { prev: {} };
  for (const wichtig of ['playerdata', 'notes', 'uplayer', 'uname', 'friendly', 'step', 'round', 'phase', 'stage', 'timestamp', 'modified', 'stime', 'mode', 'scoring']) {
    if (isdef(Z[wichtig])) Z.prev[wichtig] = jsCopy(Z[wichtig]);
  }
  Z.prev.turn = Clientdata.last_turn = Clientdata.this_turn;
  copyKeys(Serverdata, Z);
  if (isdef(Serverdata.table)) { copyKeys(Serverdata.table, Z); Z.playerlist = Z.players; copyKeys(Serverdata.table.fen, Z); }
  assertion(isdef(Z.fen), 'no fen in Z bei cmd=table or startgame!!!', Serverdata);
  Clientdata.this_turn = Z.turn;
  set_user(U.name);
  assertion(!isEmpty(Z.turn), 'turn empty!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!', Z.turn);
  let fen = Z.fen;
  Z.role = !is_playing(Z.uname, fen) ? 'spectator' : fen.turn.includes(Z.uname) ? 'active' : 'inactive';
  let [uname, turn, mode, host] = [Z.uname, fen.turn, Z.mode, Z.host];
  let upl = Z.role == 'active' ? uname : turn[0];
  if (mode == 'hotseat' && turn.length > 1) { let next = get_next_human_player(Z.prev.uplayer); if (next) upl = next; }
  if (mode == 'multi' && Z.role == 'inactive' && (uname != host || is_human_player(upl))) { upl = uname; }
  set_player(upl, fen);
  let pl = Z.pl;
  Z.playmode = pl.playmode;
  Z.strategy = uname == pl.name ? valf(Clientdata.strategy, pl.strategy) : pl.strategy;
  let [uplayer, friendly, modified] = [Z.uplayer, Z.friendly, Z.modified];
  Z.uplayer_data = firstCond(Z.playerdata, x => x.name == Z.uplayer);
  let sametable = !FORCE_REDRAW && friendly == Z.prev.friendly && modified <= Z.prev.modified && uplayer == Z.prev.uplayer;
  let sameplayerdata = isEmpty(Z.playerdata_changed_for);
  let myplayerdatachanged = Z.playerdata_changed_for.includes(Z.uplayer);
  let specialcase = !i_am_host() && !i_am_acting_host() && !i_am_trigger() && !myplayerdatachanged;
  Z.skip_presentation = sametable && (sameplayerdata || specialcase);
  if (DA.TEST0 && (!sametable || !sameplayerdata)) {
    console.log('======>Z.skip_presentation', Z.skip_presentation, '\nplayerdata_changed_for', Z.playerdata_changed_for);
    console.log('_______ *** THE END *** ___________')
  }
  FORCE_REDRAW = false;
}
function updateKeySettings(nMin) {
  if (nundef(G)) return;
  G.keys = setKeys({ nMin, lang: Settings.language, keysets: KeySets, key: Settings.vocab });
}
function userUpdate(proplist, val) {
  lookupSetOverride(U, proplist, val);
  saveUser();
}
function valf() {
  for (const arg of arguments) if (isdef(arg)) return arg;
  return null;
}
function where(o) {
  let fname = getFunctionsNameThatCalledThisFunction();
}
function without(arr, elementToRemove) {
  return arr.filter(function (el) {
    return el !== elementToRemove;
  });
}