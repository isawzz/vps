const MAX_RECURSIONS = 200;
var UID = 0;
var M = {};
var ___enteredRecursion = 0;
var T;
var TO = {};
var TOMan;
var R;
var User;
var dParent;
const Geo = {
  layerInfo: {
    empty: {
      url: '',
      options: { maxZoom: 22 }
    },
    ru: {
      url: 'https:/' + '/core-sat.maps.yandex.net/tiles?l=sat&v=3.1025.0&x={x}&y={y}&z={z}&scale=1&lang=ru_RU',
      options: { minZoom: 0, maxZoom: 19, }
    },
    satellite: {
      url: 'http:/' + '/server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}',
      options: { maxZoom: 19, attribution: '&copy; <a href="http:/"+"www.esri.com/">Esri</a>, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community' }
    },
    gsatellite: {
      url: 'http:/' + '/{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}',
      options: { maxZoom: 22, subdomains: ['mt0', 'mt1', 'mt2', 'mt3'] }
    },
    gstreets: {
      url: 'http:/' + '/{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}',
      options: { maxZoom: 22, subdomains: ['mt0', 'mt1', 'mt2', 'mt3'] }
    },
    ghybrid: {
      url: 'http:/' + '/{s}.google.com/vt/lyrs=s,h&x={x}&y={y}&z={z}',
      options: { maxZoom: 22, subdomains: ['mt0', 'mt1', 'mt2', 'mt3'] }
    },
    gterrain: {
      url: 'http:/' + '/{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}',
      options: { maxZoom: 22, subdomains: ['mt0', 'mt1', 'mt2', 'mt3'] }
    },
    mbsat: {
      url: 'https:/' + '/api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
      options: { attribution: 'Map data &copy; <a href="https:/"+"/www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https:/"+"/www.mapbox.com/">Mapbox</a>', id: 'mapbox/satellite-v9', tileSize: 512, zoomOffset: -1 }
    },
    mbstreets: {
      url: 'https:/' + '/api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw',
      options: { attribution: 'Map data &copy; <a href="https:/"+"/www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https:/"+"/www.mapbox.com/">Mapbox</a>', id: 'mapbox/streets-v11', tileSize: 512, zoomOffset: -1 }
    },
    mb1: {
      url: 'https:/' + '/api.mapbox.com/styles/v1/mapbox-map-design/cl4whev1w002w16s9mgoliotw/static/-90,35,2.5,0/840x464?access_token=pk.eyJ1IjoibWFwYm94LW1hcC1kZXNpZ24iLCJhIjoiY2syeHpiaHlrMDJvODNidDR5azU5NWcwdiJ9.x0uSqSWGXdoFKuHZC5Eo_Q',
      options: { attribution: 'Map data &copy; <a href="https:/"+"/www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, Imagery © <a href="https:/"+"/www.mapbox.com/">Mapbox</a>', tileSize: 512, zoomOffset: -1 }
    },
    cartolabels: {
      url: 'https:/' + '/{s}.basemaps.cartocdn.com/light_only_labels/{z}/{x}/{y}{r}.png',
      options: {
        attribution: '&copy; <a href="https:/"+"/www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https:/"+"/carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
      }
    },
    cartonolabels: {
      url: 'https:/' + '/{s}.basemaps.cartocdn.com/light_nolabels/{z}/{x}/{y}{r}.png',
      options: {
        attribution: '&copy; <a href="https:/"+"/www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https:/"+"/carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
      }
    },
    cartodark: {
      url: 'https:/' + '/{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png',
      options: {
        attribution: '&copy; <a href="https:/"+"/www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https:/"+"/carto.com/attributions">CARTO</a>',
        subdomains: 'abcd',
        maxZoom: 20
      }
    },
    osm: {
      url: 'https:/' + '/tile.openstreetmap.org/{z}/{x}/{y}.png',
      options: { attribution: '&copy; <a href="https:/"+"/www.openstreetmap.org/copyright">OpenStreetMap</a>', subdomains: ['a', 'b', 'c'] }
    },
    osmg: {
      url: 'https:/' + '/{s}.tile.openstreetmap.de/tiles/osmde/{z}/{x}/{y}.png',
      options: { attribution: '&copy; <a href="https:/"+"/www.openstreetmap.org/copyright">OpenStreetMap</a>', subdomains: ['a', 'b', 'c'] }
    },
    watercolor: {
      url: 'http:/' + '/{s}.tile.stamen.com/watercolor/{z}/{x}/{y}.jpg',
      options: { attribution: 'Map tiles by <a href="http:/"+"stamen.com">Stamen Design</a>, under <a href="http:/"+"creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http:/"+"openstreetmap.org">OpenStreetMap</a>, under <a href="http:/"+"creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.', maxZoom: 18, subdomains: 'abcd', }
    },
    labels: {
      url: "http:/" + "tile.stamen.com/toner-labels/{z}/{x}/{y}.png",
      options: { attribution: 'Map tiles by <a href="http:/"+"stamen.com">Stamen Design</a>, under <a href="http:/"+"creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http:/"+"openstreetmap.org">OpenStreetMap</a>, under <a href="http:/"+"www.openstreetmap.org/copyright">ODbL</a>.', maxZoom: 18 }
    },
    terrain: {
      url: 'http:/' + '/{s}.tile.stamen.com/terrain/{z}/{x}/{y}.jpg',
      options: { attribution: 'Map tiles by <a href="http:/"+"stamen.com">Stamen Design</a>, under <a href="http:/"+"creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http:/"+"openstreetmap.org">OpenStreetMap</a>, under <a href="http:/"+"creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.', maxZoom: 18, }
    },
    terrainbg: {
      url: 'http:/' + '/{s}.tile.stamen.com/terrain-background/{z}/{x}/{y}.jpg',
      options: { attribution: 'Map tiles by <a href="http:/"+"stamen.com">Stamen Design</a>, under <a href="http:/"+"creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http:/"+"openstreetmap.org">OpenStreetMap</a>, under <a href="http:/"+"creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.', maxZoom: 18, }
    },
    topo: {
      url: 'https:/' + '/{s}.tile.opentopomap.org/{z}/{x}/{y}.png',
      options: {
        maxZoom: 17,
        attribution: 'Map data: &copy; <a href="https:/"+"/www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http:/"+"viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https:/"+"/opentopomap.org">OpenTopoMap</a> (<a href="https:/"+"/creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
      }
    }
  },
  places: {
    tuerkenschanzpark: [48.23562171298636, 16.337871551513675],
    sievering: [48.245368124489204, 16.342549324035648],
    zehenthofgasse: [48.24522522864384, 16.34572505950928],
    vegagasse: [48.23413529351023, 16.346755027771],
  },
  continents: {
    Africa: ['Algeria', 'Angola', 'Benin', 'Botswana', 'Burkina Faso', 'Burundi', 'Cameroon', 'Cape Verde', 'Central African Republic', 'Chad', 'Comoros', 'Congo', 'Democratic Republic of the Congo', 'Djibouti', 'Egypt', 'Equatorial Guinea', 'Eritrea', 'Ethiopia', 'Gabon', 'Gambia', 'Ghana', 'Guinea', 'Guinea-Bissau', 'Ivory Coast', 'Kenya', 'Lesotho', 'Liberia', 'Libya', 'Madagascar', 'Malawi', 'Mali', 'Mauritania', 'Mauritius', 'Mayotte', 'Morocco', 'Mozambique', 'Namibia', 'Niger', 'Nigeria', 'Reunion', 'Rwanda', 'Sao Tome And Principe', 'Senegal', 'Seychelles', 'Sierra Leone', 'Somalia', 'South Africa', 'South Sudan', 'Saint Helena', 'Sudan', 'Swaziland', 'Tanzania', 'Togo', 'Tunisia', 'Uganda', 'Zambia', 'Zimbabwe'],
    Asia: ['Afghanistan', 'Bahrain', 'Bangladesh', 'Bhutan', 'Brunei', 'Myanmar', 'Cambodia', 'China', 'East Timor', 'Hong Kong', 'India', 'Indonesia', 'Iran', 'Iraq', 'Israel', 'Japan', 'Jordan', 'Kazakhstan', 'Macau', 'North Korea', 'South Korea', 'Kuwait', 'Kyrgyzstan', 'Laos', 'Lebanon', 'Malaysia', 'Maldives', 'Mongolia', 'Nepal', 'Oman', 'Pakistan', 'Philippines', 'Qatar', 'Russia', 'Saudi Arabia', 'Singapore', 'Sri Lanka', 'Syria', 'Taiwan', 'Tajikistan', 'Thailand', 'Turkey', 'Turkmenistan', 'United Arab Emirates', 'Uzbekistan', 'Vietnam', 'Yemen'],
    Europe: ['Albania', 'Andorra', 'Armenia', 'Austria', 'Azerbaijan', 'Belarus', 'Belgium', 'Bosnia And Herzegovina', 'Bulgaria', 'Croatia', 'Cyprus', 'Czechia', 'Denmark', 'Estonia', 'Finland', 'France', 'Georgia', 'Germany', 'Gibraltar', 'Greece', 'Hungary', 'Iceland', 'Ireland', 'Isle Of Man', 'Italy', 'Jersey', 'Kosovo', 'Latvia', 'Liechtenstein', 'Lithuania', 'Luxembourg', 'Macedonia', 'Malta', 'Moldova', 'Monaco', 'Montenegro', 'Netherlands', 'Norway', 'Poland', 'Portugal', 'Romania', 'San Marino', 'Serbia', 'Slovakia', 'Slovenia', 'Spain', 'Sweden', 'Switzerland', 'Ukraine', 'United Kingdom', 'Vatican City'],
    'North America': ['Antigua and Barbuda', 'Bahamas', 'Barbados', 'Belize', 'Bermuda', 'Cayman Islands', 'Canada', 'Costa Rica', 'Cuba', 'Dominica', 'Dominican Republic', 'El Salvador', 'Grenada', 'Guadeloupe', 'Guatemala', 'Haiti', 'Honduras', 'Jamaica', 'Martinique', 'Mexico', 'Nicaragua', 'Panama', 'Puerto Rico', 'Saint Kitts and Nevis', 'Saint Lucia', 'Saint Vincent And The Grenadines', 'Trinidad And Tobago', 'United States'],
    Oceania: ['Australia', 'Fiji', 'French Polynesia', 'Kiribati', 'Marshall Islands', 'Micronesia', 'Nauru', 'New Caledonia', 'New Zealand', 'Palau', 'Papua New Guinea', 'Samoa', 'Solomon Islands', 'Tonga', 'Tuvalu', 'Vanuatu'],
    'South America': ['Argentina', 'Aruba', 'Bolivia', 'Brazil', 'Chile', 'Colombia', 'Curacao', 'Ecuador', 'French Guiana', 'Guam', 'Guyana', 'Paraguay', 'Peru', 'Suriname', 'Uruguay', 'Venezuela']
  }
};
var activatedTests = [];
function animate(elem, aniclass, timeoutms) {
  mClass(elem, aniclass);
  TOMan.TO.anim = setTimeout(() => mRemoveClass(elem, aniclass), timeoutms);
}
function autocomplete(inp, arr) {
  var currentFocus;
  inp = toElem(inp);
  inp.addEventListener('input', e => {
    var a, b, i, val = this.value;
    autocomplete_closeAllLists();
    if (!val) { return false; }
    currentFocus = -1;
    a = document.createElement('DIV');
    a.setAttribute('id', this.id + 'autocomplete-list');
    a.setAttribute('class', 'autocomplete-items');
    this.parentNode.appendChild(a);
    for (i = 0; i < arr.length; i++) {
      if (arr[i].substr(0, val.length).toUpperCase() == val.toUpperCase()) {
        b = document.createElement('DIV');
        b.innerHTML = '<strong>' + arr[i].substr(0, val.length) + '</strong>';
        b.innerHTML += arr[i].substr(val.length);
        b.innerHTML += "<input type='hidden' value='" + arr[i] + "'>";
        b.addEventListener('click', e => {
          inp.value = this.getElementsByTagName('input')[0].value;
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
function correctNumbersInString(s, dec) {
  let parts = s.split('_');
  for (let i = 0; i < parts.length; i++) {
    let p = parts[i];
    if (isNumber(p)) {
      let n = Number(p);
      n -= dec;
      parts[i] = '' + n;
    }
  }
  let res = parts.join('_');
  return res;
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
function error(msg) {
  let fname = getFunctionsNameThatCalledThisFunction();
  console.log(fname, 'ERROR!!!!! ', msg);
}
function evNoBubble(ev) { ev.preventDefault(); ev.cancelBubble = true; }
function first(arr) {
  return arr.length > 0 ? arr[0] : null;
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
function get_values(o) { return Object.values(o); }
function getFunctionsNameThatCalledThisFunction() {
  let c1 = getFunctionsNameThatCalledThisFunction.caller;
  if (nundef(c1)) return 'no caller!';
  let c2 = c1.caller;
  if (nundef(c2)) return 'no caller!';
  return c2.name;
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
function isNumber(x) { return x !== ' ' && x !== true && x !== false && isdef(x) && (x == 0 || !isNaN(+x)); }
function isObject(v) {
  return '[object Object]' === Object.prototype.toString.call(v);
};
function isString(param) { return typeof param == 'string'; }
function jsCopy(o) { return JSON.parse(JSON.stringify(o)); }
function mAppend(d, child) { toElem(d).appendChild(child); return child; }
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
function mBy(id) { return document.getElementById(id); }
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
function mCreateFrom(htmlString) {
  var div = document.createElement('div');
  div.innerHTML = htmlString.trim();
  return div.firstChild;
}
function mRemoveClass(d) { for (let i = 1; i < arguments.length; i++) d.classList.remove(arguments[i]); }
function normalizeNode(o, num) {
  if (isdef(o.uid)) normalizeSimpleUidProp(o, 'uid', num);
  if (isdef(o.children)) { o.children = o.children.map(x => normalizeVal(x, num)); }
  if (isdef(o.uidParent)) normalizeSimpleUidProp(o, 'uidParent', num);
  if (isdef(o._NODE)) normalizeSpecKeyProp(o, '_NODE', num);
  if (isdef(o.here)) normalizeSpecKeyProp(o, 'here', num);
}
function normalizeRTree(R) { return normalizeTree(R.rNodes, R); }
function normalizeSimpleUidProp(o, prop, num) {
  o[prop] = normalizeVal(o[prop], num);
}
function normalizeSpecKeyProp(o, prop, num) {
  let node1 = o[prop];
  if (isString(node1) && node1.includes('_')) {
    o[prop] = correctNumbersInString(node1, num);
  } else if (isList(node1)) {
    let newlist = [];
    for (const el of node1) {
      if (el.includes('_')) {
        newlist.push(correctNumbersInString(el, num));
      }
    }
    console.log('SOLLTE NIEEEEEEEEEEEEEEEEEEE VORKOMMEN!!!!!!');
    o[prop] = newlist;
  }
}
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
function recAllNodes(n, f, p, tailrec, safe = false) {
  if (safe) { ___enteredRecursion += 1; if (___enteredRecursion > MAX_RECURSIONS) { error('MAX_RECURSIONS reached!!!' + f.name); return; } }
  if (isList(n)) {
    if (tailrec) f(n, p);
    n.map(x => recAllNodes(x, f, p, tailrec));
    if (!tailrec) f(n, p);
  } else if (isDict(n)) {
    if (tailrec) f(n, p);
    for (const k in n) { recAllNodes(n[k], f, p, tailrec); }
    if (!tailrec) f(n, p);
  }
}
function replaceAll(str, sSub, sBy) {
  let regex = new RegExp(sSub, 'g');
  return str.replace(regex, sBy);
}
function rest() {
}
function safeRecurse(o, func, params, tailrec) {
  ___enteredRecursion = 0;
  let arr = Array.from(arguments);
  arr = arr.slice(1);
  recAllNodes(o, func, params, tailrec, true);
  return ___enteredRecursion;
}
function sat() {
  let R = T;
  let rtree = normalizeRTree(R);
  let sol = {};
  sol[testEngine.index] = rtree;
  downloadFile(sol, 'sol' + testEngine.index);
}
function saveFile(name, type, data) {
  if (data != null && navigator.msSaveBlob) return navigator.msSaveBlob(new Blob([data], { type: type }), name);
  var a = $("<a style='display: none;'/>");
  var url = window.URL.createObjectURL(new Blob([data], { type: type }));
  a.attr('href', url);
  a.attr('download', name);
  $('body').append(a);
  a[0].click();
  setTimeout(function () {
    window.URL.revokeObjectURL(url);
    a.remove();
  }, 500);
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
function toElem(d) { return isString(d) ? mBy(d) : d; }
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
function toWords(s, allow_ = false) {
  let arr = allow_ ? s.split(/[\W]+/) : s.split(/[\W|_]+/);
  return arr.filter(x => !isEmpty(x));
}
function trim(str) {
  return str.replace(/^\s+|\s+$/gm, '');
}
function uid() {
  UID += 1;
  return 'a' + UID;
}