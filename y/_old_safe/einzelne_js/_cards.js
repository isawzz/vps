function aggregate_player_hands_by_rank(fen){
  let di_ranks = {};
  let akku = [];
  for (const uname in fen.players) {
    let pl = fen.players[uname];
    let hand = pl.hand;
    for (const c of hand) {
      akku.push(c);
      let r = c[0];
      if (isdef(di_ranks[r])) di_ranks[r] += 1; else di_ranks[r] = 1;
    }
  }
  fen.akku = akku;
  return di_ranks;
}

function anim_face_down(item, ms = 300, callback = null){
 face_up(item); anim_toggle_face(item, callback); }

function anim_face_up(item, ms = 300, callback = null){
 face_down(item); anim_toggle_face(item, callback); }

function anim_toggle_face(item, ms = 300, callback = null){
  let d = iDiv(item);
  mClass(d, 'aniflip');
  TO.anim = setTimeout(() => {
    if (item.faceUp) face_down(item); else face_up(item); mClassRemove(d, 'aniflip');
    if (isdef(callback)) callback();
  }, ms);
}

function ari_get_card(ckey, h, w, ov = .3){
  let type = ckey[2];
  let sz = { largecard: 100, smallcard: 50 };
  let info = type == 'n' ? to_aristocard(ckey, sz.largecard) : type == 'l' ? to_luxurycard(ckey, sz.largecard) : type == 'r' ? to_rumorcard(ckey, sz.smallcard) : to_commissioncard(ckey, sz.smallcard);
  let card = cardFromInfo(info, h, w, ov);
  if (type == 'l') luxury_card_deco(card);
  return card;
}

function ari_get_card_large(ckey, h, w, ov = .2){
  let type = ckey[2];
  let sz = { largecard: 120, smallcard: 80 };
  let info = type == 'n' ? to_aristocard(ckey, sz.largecard) : type == 'l' ? to_luxurycard(ckey, sz.largecard) : type == 'r' ? to_rumorcard(ckey, sz.smallcard) : to_commissioncard(ckey, sz.smallcard);
  let card = cardFromInfo(info, h, w, ov);
  if (type == 'l') luxury_card_deco(card);
  return card;
}

function calc_hand_value(hand, card_func = ferro_get_card){
  let vals = hand.map(x => card_func(x).val);
  let sum = vals.reduce((a, b) => a + b, 0);
  return sum;
}

function cardFromInfo(info, h, w, ov){
  let svgCode = C52[info.c52key];
  svgCode = '<div>' + svgCode + '</div>';
  let el = mCreateFrom(svgCode);
  h = valf(h, valf(info.h, 100));
  w = valf(w, h * .7);
  mSize(el, w, h);
  let res = {};
  copyKeys(info, res);
  copyKeys({ w: w, h: h, faceUp: true, div: el }, res);
  if (isdef(ov)) res.ov = ov;
  return res;
}

function correct_handsorting(hand, plname){
  let pl = Z.fen.players[plname];
  let [cs, pls, locs] = [Clientdata.handsorting, pl.handsorting, localStorage.getItem('handsorting')];
  let s = cs ?? pls ?? locs ?? Config.games[Z.game].defaulthandsorting;
  hand = sort_cards(hand, s == 'suit', 'CDSH', true, Z.func.rankstr);
  return hand;
}

function create_card_assets_c52(){
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

function create_fen_deck(cardtype, num_decks = 1, num_jokers = 0){
  let arr = get_keys(C52Cards).map(x => x + cardtype);
  let newarr = [];
  while (num_decks > 0) { newarr = newarr.concat(arr); num_decks--; }
  while (num_jokers > 0) { newarr.push('*H' + cardtype); num_jokers--; }
  return newarr;
}

function face_down(item, color, texture){
  if (!item.faceUp) return;
  if (isdef(texture) || lookup(item, ['live', 'dCover'])) {
    face_down_alt(item, color, texture);
  } else {
    let svgCode = C52.card_2B; 
    item.div.innerHTML = svgCode;
    if (nundef(color)) color = item.color;
    if (isdef(item.color)) item.div.children[0].children[1].setAttribute('fill', item.color);
  }
  item.faceUp = false;
}

function face_down_alt(item, bg, texture_name){
  let dCover = item.live.dCover;
  if (nundef(dCover)) {
    let d = iDiv(item);
    dCover = item.live.dCover = mDiv(d, { background: bg, rounding: mGetStyle(d, 'rounding'), position: 'absolute', width: '100%', height: '100%', left: 0, top: 0 });
    let t = get_texture(texture_name);
    dCover.style.backgroundImage = t;
    dCover.style.backgroundRepeat = 'repeat';
  } else mStyle(dCover, { display: 'block' });
}

function face_up(item){
  if (item.faceUp) return;
  if (lookup(item, ['live', 'dCover'])) mStyle(item.live.dCover, { display: 'none' });
  else item.div.innerHTML = isdef(item.c52key) ? C52[item.c52key] : item.html;
  item.faceUp = true;
}

function ferro_get_card(ckey, h, w, ov = .25){
  let type = ckey[2];
  let info = ckey[0] == '*' ? get_joker_info() : jsCopy(C52Cards[ckey.substring(0, 2)]);
  info.key = ckey;
  info.cardtype = ckey[2]; 
  let [r, s] = [info.rank, info.suit];
  info.val = r == '*' ? 50 : r == 'A' ? 20 : 'TJQK'.includes(r) ? 10 : Number(r);
  info.color = RED;
  info.sz = info.h = valf(h, Config.ui.card.h);
  info.w = valf(w, info.sz * .7);
  info.irank = '23456789TJQKA*'.indexOf(r);
  info.isuit = 'SHCDJ'.indexOf(s);
  info.isort = info.isuit * 14 + info.irank;
  let card = cardFromInfo(info, h, w, ov);
  return card;
}

function find_index_of_jolly(j){
 return j.findIndex(x => is_jolly(x)); }

function find_jolly_rank(j, rankstr = 'A23456789TJQKA'){
  let jolly_idx = find_index_of_jolly(j);
  if (jolly_idx == -1) return false;
  if (jolly_idx > 0) {
    let rank_before_index = j[jolly_idx - 1][0];
    let rank_needed = rankstr[rankstr.indexOf(rank_before_index) + 1];
    return rank_needed;
  } else {
    let rank_after_index = j[jolly_idx + 1][0];
    let rank_needed = rank_after_index == 'A' ? 'K' : rankstr[rankstr.indexOf(rank_after_index) - 1];
    return rank_needed;
  }
}

function get_container_styles(styles = {}){
 let defaults = valf(Config.ui.container, {}); defaults.position = 'relative'; addKeys(defaults, styles); return styles; }

function get_containertitle_styles(styles = {}){
 let defaults = valf(Config.ui.containertitle, {}); defaults.position = 'absolute'; addKeys(defaults, styles); return styles; }

function get_group_rank(j){
 let non_jolly_key = firstCond(j, x => !is_jolly(x)); return non_jolly_key[0]; }

function get_joker_info(){
  return {
    c52key: `card_0J`, 
    color: "#e6194B",
    friendly: "Joker",
    key: '*Hn',
    h: 100,
    irank: 14,
    isort: 100,
    isuit: 3,
    ov: 0.25,
    rank: "*",
    short: "J",
    suit: "H",
    sz: 100,
    val: 1,
    w: 70,
  };
}

function get_sequence_suit(j){
 let non_jolly_key = firstCond(j, x => !is_jolly(x)); return non_jolly_key[1]; }

function has_at_most_n_jolly(j, n = 1){
 return j.filter(x => is_jolly(x)).length <= n; }

function has_jolly(j){
 return firstCond(j, x => is_jolly(x)); }

function is_card_key(ckey, rankstr = '*A23456789TJQK', suitstr = 'SHCD'){
 return rankstr.includes(ckey[0]) && suitstr.includes(ckey[1]); }

function is_joker(card){
 return is_jolly(card.key); }

function is_jolly(ckey){
 return ckey[0] == '*'; }

function is_overlapping_set(cards, max_jollies_allowed = 1, seqlen = 7, group_same_suit_allowed = true){
  let istart = 0;
  let inextstart = 0;
  let lmin = 3;
  let legal = true;
  if (cards.length < lmin) return false;
  while (legal && istart <= cards.length - lmin) {
    let cl = cards.slice(istart, istart + lmin);
    let set = ferro_is_set(cl, max_jollies_allowed, seqlen, group_same_suit_allowed);
    if (set) { istart++; inextstart = Math.min(istart + lmin, cards.length - 3); }
    else if (!set && inextstart == istart) return false;
    else istart++;
  }
  return cards.map(x => x.key);
}

function jolly_matches(key, j, rankstr = 'A23456789TJQKA'){
  let jolly_idx = find_index_of_jolly(j);
  if (jolly_idx == -1) return false;
  if (is_group(j)) {
    let r = get_group_rank(j);
    if (key[0] == r) return true;
  } else if (jolly_idx > 0) {
    let rank_before_index = j[jolly_idx - 1][0];
    let suit_needed = j[jolly_idx - 1][1];
    let rank_needed = rankstr[rankstr.indexOf(rank_before_index) + 1];
    if (key[0] == rank_needed && key[1] == suit_needed) return true;
  } else {
    let rank_after_index = j[jolly_idx + 1][0];
    let suit_needed = j[jolly_idx + 1][1];
    let rank_needed = rank_after_index == 'A' ? 'K' : rankstr[rankstr.indexOf(rank_after_index) - 1];
    if (key[0] == rank_needed && key[1] == suit_needed) return true;
  }
  return false;
}

function luxury_card_deco(card){
  let d = iDiv(card); mStyle(d, { position: 'relative' });
  let d1 = mDiv(d, { fg: 'dimgray', fz: 11, family: 'tangerine', position: 'absolute', left: 0, top: 0, 'writing-mode': 'vertical-rl', transform: 'scale(-1)', top: '35%' }, null, 'Luxury');
  let html = `<img height=${18} src="../base/assets/images/icons/deco0.svg" style="transform:scaleX(-1);">`;
  d1 = mDiv(d, { position: 'absolute', bottom: -2, left: 3, opacity: .25 }, null, html);
}

function pop_top(o){
  if (isEmpty(o.list)) return null;
  let t = o.get_topcard();  
  o.list.shift();
  o.renew(o.list, o.cardcontainer, o.items, o.get_card_func);
  return t;
}

function remove_card_shadow(c){
 iDiv(c).firstChild.setAttribute('class', null); }

function replace_jolly(key, j){
  let jolly_idx = find_index_of_jolly(j);
  j[jolly_idx] = key;
}

function set_card_border(item, thickness = 1, color = 'black', dasharray){
  let d = iDiv(item);
  let rect = lastDescendantOfType('rect', d);
  assertion(rect, 'NO RECT FOUND IN ELEM', d);
  if (rect) {
    rect.setAttribute('stroke-width', thickness);
    rect.setAttribute('stroke', color);
    if (isdef(dasharray)) rect.setAttribute('stroke-dasharray', dasharray);
  }
}

function set_card_style(item, styles = {}, className){
  console.log('set_card_style', item, styles);
  let d = iDiv(item);
  let svg = findDescendantOfType('svg', d);
  let rect = findDescendantOfType('rect', svg);
  if (isdef(styles.shadow)) {
    let shadow = styles.shadow;
    delete styles.shadow;
    let hexcolor = colorFrom(styles.shadow);
    svg.style.filter = `drop-shadow(4px 5px 2px ${hexcolor})`;
  }
  if (isdef(styles.bg)) {
    let hexcolor = colorFrom(styles.bg);
    rect.setAttribute('stroke-width', 14); rect.setAttribute('stroke', hexcolor);
  }
  assertion(rect, 'NO RECT FOUND IN ELEM', d);
  mStyle(d, styles);
  if (isdef(className)) mClass(svg, className);
}

function set_card_style_works(c, styles, className){
  let d = iDiv(c);
  mStyle(d, styles);
  d.firstChild.setAttribute('class', className);
}

function sheriff_card(name, color){
  let di = SHERIFF.cards;
  let info = valf(di[name], { ksym: 'crossbow', kcenter: 'green apple', label: 'crossbow', type: 'contraband', value: 9, penalty: 4 });
  let bcolor = SHERIFF.color[info.type]; 
  let c = cPortrait(null, { margin: 12, border: `solid 4px ${bcolor}`, bg: valf(color, colorLight('gold', 60)) });
  let d = iDiv(c);
  let ds = mSym(info.ksym, d, { sz: 30 }, 'tl');
  ds = mSymText(info.value, d, { sz: 25, rounding: '50%', bg: 'gold', margin: 3 }, 'tr');
  ds = mText(info.label.toUpperCase(), d, { family: 'Algerian', w: '100%', fz: 12, align: 'center', position: 'absolute', bottom: 0 });
  ds = mText(info.label.toUpperCase(), d, { family: 'Algerian', w: '100%', fz: 12, align: 'center', position: 'absolute', top: 0 });
  ds = mSymText(info.penalty, d, { sz: 25, rounding: '50%', bg: 'crimson', margin: 3 }, 'br');
  ds = mSym(info.kcenter, d, { sz: 70 }, 'cc'); mPos(ds, 'calc( 50% - 35px )', 'calc( 50% - 35px )');
  return c;
}

function sortByRank(ckeys, rankstr = '23456789TJQKA'){
  let ranks = toLetters(rankstr);
  ckeys.sort((a, b) => ranks.indexOf(a[0]) - ranks.indexOf(b[0]));
  return ckeys;
}

function sortCardItemsByRank(items, rankstr = '23456789TJQKA'){
  let ranks = toLetters(rankstr);
  items.sort((a, b) => ranks.indexOf(a.key[0]) - ranks.indexOf(b.key[0]));
  return items;
}

function sortCardItemsBySuit(items, suitstr = 'CDSH'){
  let ranks = toLetters(suitstr);
  items.sort((a, b) => ranks.indexOf(a.key[1]) - ranks.indexOf(b.key[1]));
  return items;
}

function sortCardItemsToSequence(items, rankstr = '23456789TJQKA', jolly_allowed = 1){
  let ranks = toLetters(rankstr);
  let n = items.length;
  let jollies = items.filter(x => is_joker(x));
  if (jollies.length > jolly_allowed) { return null; } 
  let no_jolly = items.filter(x => !is_joker(x));
  let sorted = sortCardItemsByRank(no_jolly, rankstr);
  let partial_sequences = [], seq = [sorted[0]], first, second;
  for (let i = 0; i < sorted.length - 1; i++) {
    first = sorted[i];
    second = sorted[i + 1];
    diff = second.irank - first.irank;
    if (diff == 1) { seq.push(second); }
    else {
      partial_sequences.push({ seq: seq, len: seq.length, diff_to_next: diff });
      seq = [second];
    }
  }
  diff = sorted[0].irank - (sorted[sorted.length - 1].irank - rankstr.length)
  if (!isEmpty(seq)) {
    partial_sequences.push({ seq: seq, len: seq.length, diff_to_next: diff });
  } else {
    arrLast(partial_sequences).diff_to_next = diff;
  }
  let i_max_diff = partial_sequences.findIndex(x => x.diff_to_next == Math.max(...partial_sequences.map(x => x.diff_to_next)));
  let max_diff = partial_sequences[i_max_diff].diff_to_next;
  let istart = (i_max_diff + 1) % partial_sequences.length;
  let final_sequence = [];
  let jollies_needed = 0;
  let len = partial_sequences.length;
  let ij = 0;
  for (let i = 0; i < len; i++) {
    let index = (i + istart) % len;
    let list = partial_sequences[index].seq;
    final_sequence = final_sequence.concat(list);
    let nj = partial_sequences[index].diff_to_next - 1;
    if (i < len - 1) {
      for (let j = 0; j < nj; j++) { final_sequence.push(jollies[ij++]); }
      jollies_needed += nj;
    }
  }
  for (let i = 0; i < final_sequence.length; i++) { items[i] = final_sequence[i]; }
  return jollies_needed;
}

function sort_cards(hand, bySuit = true, suits = 'CDHS', byRank = true, rankstr = '23456789TJQKA'){
  if (bySuit && byRank) {
    let buckets = arrBuckets(hand, x => x[1], suits);
    for (const b of buckets) { sort_cards(b.list, false, null, true, rankstr); } 
    hand.length = 0; buckets.map(x => x.list.map(y => hand.push(y))); 
  } else if (bySuit) hand.sort((a, b) => suits.indexOf(a[1]) - suits.indexOf(b[1])); 
  else if (byRank) hand.sort((a, b) => rankstr.indexOf(a[0]) - rankstr.indexOf(b[0]));
  return hand;
}

function spread_hand(path, ov){
  let hand = lookup(UI, path.split('.'));
  assertion(hand, 'hand does NOT exist', path);
  if (hand.ctype != 'hand') return;
  if (isEmpty(hand.items)) return;
  let card = hand.items[0];
  if (nundef(ov)) ov = card.ov;
  if (hand.ov == ov) return;
  hand.ov = ov;
  let cont = hand.cardcontainer;
  let items = hand.items;
  mContainerSplay(cont, hand.splay, card.w, card.h, items.length, ov * card.w);
}

function symbolcolor(card, color){
  let d = iDiv(card);
  let els = d.getElementsByTagName('symbol'); 
  console.log('list', els)
  for (const el of els) {
    let html = el.innerHTML;
    let html1 = replaceAll(html, 'red', color);
    let html2 = replaceAll(html1, 'black', color);
    el.innerHTML = html2;
  }
}

function to_aristocard(ckey, sz = 100, color = RED, w){
  let info = jsCopy(C52Cards[ckey.substring(0, 2)]);
  info.key = ckey;
  info.cardtype = ckey[2];
  let [r, s] = [info.rank, info.suit];
  info.val = r == 'A' ? 1 : 'TJQK'.includes(r) ? 10 : Number(r);
  info.color = color;
  info.sz = info.h = sz;
  info.w = valf(w, sz * .7);
  info.irank = 'A23456789TJQK'.indexOf(r);
  info.isuit = 'SHCD'.indexOf(s);
  info.isort = info.isuit * 13 + info.irank;
  return info;
}

function to_commissioncard(ckey, sz = 40, color = GREEN, w){
 return to_aristocard(ckey, sz, color); }

function to_luxurycard(ckey, sz = 100, color = 'gold', w){
 return to_aristocard(ckey, sz, color); }

function to_rumorcard(ckey, sz = 40, color = GREEN, w){
 return to_aristocard(ckey, sz, color); }

function toggle_face(item){
 if (item.faceUp) face_down(item); else face_up(item); }

function ui_add_cards_to_deck_container(cont, items, list){
  if (nundef(list)) list = items.map(x => x.key);
  for (const item of items) {
    mAppend(cont, iDiv(item));
    mItemSplay(item, list, 4, Card.ovdeck);
    face_down(item);
  }
  return items[0];
}

function ui_add_cards_to_hand_container(cont, items, list){
  if (nundef(list)) list = items.map(x => x.key);
  for (const item of items) {
    mAppend(cont, iDiv(item));
    mItemSplay(item, list, 2, Card.ovw);
  }
}

function ui_add_container_title(title, cont, items, show_if_empty){
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

function ui_make_container(dParent, styles = { bg: 'random', padding: 10 }){
  let id = getUID('u');
  let d = mDiv(dParent, styles, id);
  return d;
}

function ui_make_deck_container(list, dParent, styles = { bg: 'random', padding: 10 }, get_card_func){
  let id = getUID('u'); 
  let d = mDiv(dParent, styles, id);
  if (isEmpty(list)) return d;
  let c = get_card_func(list[0]);
  mContainerSplay(d, 4, c.w, c.h, n, 0);
  return d;
}

function ui_make_hand_container(items, dParent, styles = { bg: 'random', padding: 10 }){
  let id = getUID('u');
  let d = mDiv(dParent, styles, id);
  if (!isEmpty(items)) {
    let card = items[0];
    mContainerSplay(d, 2, card.w, card.h, items.length, card.ov * card.w);
  }
  return d;
}

function ui_type_building(b, dParent, styles = {}, path = 'farm', title = '', get_card_func = ari_get_card, separate_lead = false, ishidden = false){
  let cont = ui_make_container(dParent, get_container_styles(styles));
  let cardcont = mDiv(cont);
  let list = b.list;
  let d = mDiv(dParent);
  let items = list.map(x => get_card_func(x));
  reindex_items(items);
  let d_harvest = null;
  if (isdef(b.h)) {
    let keycard = items[0];
    let d = iDiv(keycard);
    mStyle(d, { position: 'relative' });
    d_harvest = mDiv(d, { position: 'absolute', w: 20, h: 20, bg: 'orange', opacity: .5, fg: 'black', top: '45%', left: -10, rounding: '50%', align: 'center' }, null, 'H');
  }
  let d_rumors = null, rumorItems = [];
  if (!isEmpty(b.rumors)) {
    let d = cont;
    mStyle(d, { position: 'relative' });
    d_rumors = mDiv(d, { display: 'flex', gap: 2, position: 'absolute', h: 30, bottom: 0, right: 0 }); 
    for (const rumor of b.rumors) {
      let dr = mDiv(d_rumors, { h: 24, w: 16, vmargin: 3, align: 'center', bg: 'dimgray', rounding: 2 }, null, 'R');
      rumorItems.push({ div: dr, key: rumor });
    }
  }
  let card = isEmpty(items) ? { w: 1, h: 100, ov: 0 } : items[0];
  let [ov, splay] = separate_lead ? [card.ov * 1.5, 5] : [card.ov, 2];
  mContainerSplay(cardcont, 5, card.w, card.h, items.length, card.ov * 1.5 * card.w);
  ui_add_cards_to_hand_container(cardcont, items, list);
  ui_add_container_title(title, cont, items);
  let uischweine = [];
  for (let i = 1; i < items.length; i++) {
    let item = items[i];
    if (!b.schweine.includes(i)) face_down(item); else add_ui_schwein(item, uischweine);
  }
  return {
    ctype: 'hand',
    list: list,
    path: path,
    container: cont,
    cardcontainer: cardcont,
    items: items,
    schweine: uischweine,
    harvest: d_harvest,
    rumors: rumorItems,
    keycard: items[0],
  };
}

function ui_type_church(list, dParent, styles = {}, path = 'trick', title = '', get_card_func = ari_get_card, show_if_empty = false){
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

function ui_type_deck(list, dParent, styles = {}, path = 'deck', title = 'deck', get_card_func = ari_get_card, show_if_empty = false){
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

function ui_type_hand(list, dParent, styles = {}, path = 'hand', title = 'hand', get_card_func = ari_get_card, show_if_empty = false){
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

function ui_type_lead_hand(list, dParent, styles = {}, path = 'hand', title = 'hand', get_card_func = ari_get_card, show_if_empty = false){
  let hcard = isdef(styles.h) ? styles.h - 30 : Config.ui.card.h;
  addKeys(get_container_styles(styles), styles);
  let cont = ui_make_container(dParent, styles);
  let items = list.map(x => get_card_func(x, hcard));
  let cardcont = mDiv(cont);
  let card = isEmpty(items) ? { w: 1, h: hcard, ov: 0 } : items[0];
  let splay = 5;
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

function ui_type_market(list, dParent, styles = {}, path = 'market', title = 'market', get_card_func = ari_get_card, show_if_empty = false){
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

function ui_type_rank_count(list, dParent, styles, path, title, get_card_func, show_if_empty = false){
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

