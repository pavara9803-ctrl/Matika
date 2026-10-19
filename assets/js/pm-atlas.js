// ============================================================
// pm-atlas.js — පරමාර්ථ සිතියම් (සිත්, රූප) සඳහා පොදු පුස්තකාලය
//   PMAtlas.create(cfg) →
//     cfg.items    : { id: { name, short, pali, search } }
//     cfg.bands    : [{ key, name, count, cls, more:{title, html}, subs:[{ name, cls, ids }] }]
//     cfg.pickers  : [{ key, name, options:[{ label, title, ids, opt, desc, note }] , onPick(opt) }]
//     cfg.detail   : function(id, api) → html
//     cfg.unit     : 'සිත්' / 'රූප'
//     cfg.hash     : 'c'
//   HTML: #ca-map, #ca-q, #ca-groups, #ca-options, #ca-result, #ca-legend, #ca-clear,
//         #ca-detail (dialog), #ca-secnav + .ca-sec
// ============================================================
(function () {
  'use strict';

  function $(s, r) { return (r || document).querySelector(s); }
  function $all(s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); }
  function el(tag, cls, html) { var e = document.createElement(tag); if (cls) e.className = cls; if (html != null) e.innerHTML = html; return e; }
  function store(k, v) { try { if (v === undefined) return localStorage.getItem(k); localStorage.setItem(k, v); } catch (e) { return null; } }
  function norm(s) { return String(s || '').toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/‍/g, ''); }

  function create(cfg) {
    var state = { group: null, opt: null, q: '' };
    var order = [];          // දැනට පෙනෙන අයිතම පිළිවෙළ (පෙර / ඊළඟ සඳහා)
    var cur = null, dlg, body;
    var api = {};

    // ---------- සිතියම ----------
    function buildMap() {
      var map = $('#ca-map'); map.innerHTML = ''; order = [];
      cfg.bands.forEach(function (b) {
        var band = el('section', 'ca-band ca-band--' + (b.cls || 'plain'));
        band.setAttribute('aria-label', b.name + (b.count != null ? ' ' + b.count : ''));
        var head = el('div', 'ca-band__head');
        head.innerHTML = '<h3 class="ca-band__name">' + b.name + (b.count != null ? ' <span class="ca-band__n">' + b.count + '</span>' : '') + '</h3>';
        if (b.more) {
          var more = el('button', 'ca-band__more', b.moreLabel || 'විස්තරය');
          more.type = 'button';
          more.addEventListener('click', function () { openHtml(b.more.title, b.more.html, b.more.path); });
          head.appendChild(more);
        }
        band.appendChild(head);
        var subs = el('div', 'ca-subs');
        b.subs.forEach(function (s) {
          var sub = el('div', 'ca-sub' + (s.cls ? ' ca-sub--' + s.cls : '') + (s.wide || s.ids.length >= 7 ? ' ca-sub--wide' : ''));
          if (s.name) sub.appendChild(el('div', 'ca-sub__name', s.name + (s.hideCount ? '' : ' <span>' + s.ids.length + '</span>')));
          var tiles = el('div', 'ca-tiles');
          s.ids.forEach(function (id) {
            var it = cfg.items[id]; order.push(id);
            var t = el('button', 'ca-tile'); t.type = 'button'; t.dataset.id = id;
            t.setAttribute('aria-label', (it.no || '') + ' ' + it.name);
            t.title = it.name;
            t.innerHTML = '<span class="ca-hole' + (String(it.no || '').length > 2 ? ' is-txt' : '') + '">' + (it.no != null ? it.no : '') + '</span><span class="ca-nm">' + (it.short || it.name) + '</span>' +
              (it.badge != null ? '<span class="ca-ct" aria-hidden="true">' + it.badge + '</span>' : '');
            t.addEventListener('click', function () { openItem(id); });
            tiles.appendChild(t);
          });
          sub.appendChild(tiles); subs.appendChild(sub);
        });
        band.appendChild(subs); map.appendChild(band);
      });
    }

    // ---------- තේරීම් ----------
    function buildPickers() {
      var gRow = $('#ca-groups'), oRow = $('#ca-options');
      if (!gRow) return;
      gRow.innerHTML = '';
      (cfg.pickers || []).forEach(function (g) {
        var b = el('button', 'ca-chip', g.name); b.type = 'button'; b.dataset.g = g.key;
        b.setAttribute('aria-pressed', 'false');
        b.addEventListener('click', function () {
          state.group = state.group === g.key ? null : g.key;
          renderOptions();
          setOpt(state.group ? g.key + ':0' : null);
        });
        gRow.appendChild(b);
      });
      function renderOptions() {
        $all('.ca-chip', gRow).forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.g === state.group)); });
        oRow.innerHTML = ''; oRow.hidden = !state.group;
        if (!state.group) return;
        var g = pickerOf(state.group);
        g.options.forEach(function (o, i) {
          var b = el('button', 'ca-opt', o.label); b.type = 'button'; b.dataset.k = g.key + ':' + i;
          if (o.title) b.title = o.title;
          b.addEventListener('click', function () { setOpt(b.dataset.k); });
          oRow.appendChild(b);
        });
      }
      api.renderOptions = renderOptions;
      $('#ca-clear').onclick = function () { state.group = null; renderOptions(); setOpt(null); };
      var q = $('#ca-q');
      if (q) q.oninput = function (e) { state.q = norm(e.target.value.trim()); paint(); };
    }
    function pickerOf(key) { return (cfg.pickers || []).filter(function (p) { return p.key === key; })[0]; }
    function optOf(k) {
      if (!k) return null;
      var p = k.split(':'), g = pickerOf(p[0]);
      return g ? g.options[+p[1]] : null;
    }
    function setOpt(k) {
      state.opt = k;
      $all('.ca-opt', $('#ca-options')).forEach(function (b) { b.setAttribute('aria-pressed', String(b.dataset.k === k)); });
      var o = optOf(k), g = k && pickerOf(k.split(':')[0]);
      if (o && g && g.onPick) g.onPick(o, api);
      paint();
    }

    function paint() {
      var map = $('#ca-map'); if (!map) return;
      var o = optOf(state.opt), q = state.q;
      map.classList.toggle('is-filtering', !!(o || q));
      var shown = 0;
      $all('.ca-tile', map).forEach(function (t) {
        var id = t.dataset.id, it = cfg.items[id];
        var all = o ? (o.ids || []).concat(o.opt || []) : null;
        var inO = !o || all.indexOf(id) >= 0 || all.indexOf(+id) >= 0;
        var hay = it.search || (it.name + ' ' + (it.short || '') + ' ' + (it.pali || ''));
        var inQ = !q || norm(hay).indexOf(q) >= 0 || String(it.no) === q;
        var isOpt = !!o && (o.opt || []).some(function (x) { return String(x) === String(id); });
        t.classList.toggle('is-on', !!o && inO && inQ);
        t.classList.toggle('is-opt', isOpt);
        t.classList.toggle('is-dim', !(inO && inQ));
        if (inO && inQ) shown++;
      });
      var bar = $('#ca-result');
      if (o) {
        var n = (o.ids || []).length + (o.opt || []).length;
        bar.hidden = false;
        bar.innerHTML = '<div class="ca-result__top"><span class="ca-result__n">' + (o.count != null ? o.count : n) + '</span>' +
          '<div><div class="ca-result__t">' + (o.title || o.label) + '</div>' +
          '<div class="ca-result__s">' + (o.sub || cfg.unit) + '</div></div></div>' +
          (o.note ? '<p class="ca-result__f">' + o.note + '</p>' : '') +
          (o.desc ? '<div class="ca-result__desc">' + o.desc + '</div>' : '');
      } else if (q) {
        bar.hidden = false;
        bar.innerHTML = shown ? '<p class="ca-result__f">සෙවුමට ගැළපෙන ' + cfg.unit + ' ' + shown + 'ක් ඇත.</p>'
          : '<p class="ca-result__f">ගැළපෙන ' + cfg.unit + ' නැත. වෙනත් වචනයක් ලියා බලන්න.</p>';
      } else bar.hidden = true;
      var lg = $('#ca-legend'); if (lg) lg.hidden = !(o && o.opt && o.opt.length);
      $('#ca-clear').hidden = !(o || state.group);
    }

    // ---------- විස්තර පත්‍රය ----------
    function openItem(id) {
      cur = String(id);
      body.innerHTML = cfg.detail(cur, api);
      var i = order.indexOf(isNaN(+cur) ? cur : +cur); if (i < 0) i = order.indexOf(cur);
      $('#ca-prev').hidden = false; $('#ca-next').hidden = false;
      $('#ca-prev').disabled = i <= 0; $('#ca-next').disabled = i >= order.length - 1;
      $('#ca-pos').textContent = (i + 1) + ' / ' + order.length;
      show();
      try { history.replaceState(null, '', '#' + (cfg.hash || 'i') + cur); } catch (e) {}
    }
    function step(d) {
      var i = order.indexOf(isNaN(+cur) ? cur : +cur); if (i < 0) i = order.indexOf(cur);
      var n = order[i + d]; if (n != null) openItem(n);
    }
    function openHtml(title, html, path) {
      cur = null;
      body.innerHTML = (path ? '<p class="ca-d__path">' + path + '</p>' : '') + '<h2 class="ca-d__name" id="ca-d-title">' + title + '</h2><div class="ca-d__group">' + html + '</div>';
      $('#ca-prev').hidden = true; $('#ca-next').hidden = true; $('#ca-pos').textContent = '';
      show();
    }
    function show() {
      body.scrollTop = 0;
      if (!dlg.open) { if (dlg.showModal) dlg.showModal(); else dlg.setAttribute('open', ''); }
      $('.ca-d__x', dlg).focus();
    }
    function hide() { if (dlg.close) dlg.close(); else dlg.removeAttribute('open'); }
    function buildDialog() {
      dlg = $('#ca-detail'); body = $('.ca-d__body', dlg);
      $('.ca-d__x', dlg).addEventListener('click', hide);
      dlg.addEventListener('click', function (e) { if (e.target === dlg) hide(); });
      dlg.addEventListener('close', function () {
        try { history.replaceState(null, '', location.pathname + location.search); } catch (e) {}
        var t = cur && $('.ca-tile[data-id="' + cur + '"]'); if (t) t.focus();
      });
      $('#ca-prev').addEventListener('click', function () { step(-1); });
      $('#ca-next').addEventListener('click', function () { step(1); });
      dlg.addEventListener('keydown', function (e) {
        if (!cur) return;
        if (e.key === 'ArrowRight') step(1);
        if (e.key === 'ArrowLeft') step(-1);
      });
      body.addEventListener('click', function (e) {
        var a = e.target.closest('[data-open]');
        if (a) { e.preventDefault(); openItem(a.getAttribute('data-open')); }
      });
    }

    function buildSections() { var go = sections(cfg.onSection); if (go) api.showSection = go; }

    api.open = openItem;
    api.openHtml = openHtml;
    api.setBands = function (bands) { cfg.bands = bands; buildMap(); paint(); };
    api.setPickers = function (p) { cfg.pickers = p; state.group = null; state.opt = null; buildPickers(); api.renderOptions && api.renderOptions(); paint(); };
    api.select = function (k) { state.group = k ? k.split(':')[0] : null; api.renderOptions(); setOpt(k); };
    api.state = state;

    function init() {
      if (!$('#ca-map')) return;
      buildMap(); buildPickers(); buildDialog(); buildSections(); paint();
      var m = new RegExp('^#' + (cfg.hash || 'i') + '([\\w-]+)$').exec(location.hash);
      if (m && cfg.items[m[1]]) openItem(m[1]);
      if (cfg.onReady) cfg.onReady(api);
    }
    if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', init); else init();
    return api;
  }

  // ---------- කොටස් (පිටු සියල්ලට) ----------
  function sections(onSection) {
    var nav = $('#ca-secnav'); if (!nav) return null;
    var btns = $all('button', nav), key = 'pm-sec:' + location.pathname;
    function go(k, scroll) {
      btns.forEach(function (b) { b.setAttribute('aria-selected', String(b.dataset.sec === k)); });
      btns.forEach(function (b) { if (b.dataset.sec === k) nav.scrollLeft = Math.max(0, b.offsetLeft - 24); });
      $all('.ca-sec').forEach(function (s) { s.hidden = s.id !== 'sec-' + k; });
      store(key, k);
      if (onSection) onSection(k);
      if (scroll) {
        var bar = nav.closest('.ca-secbar') || nav; var y = bar.getBoundingClientRect().top + window.scrollY - (parseInt(getComputedStyle(document.documentElement).getPropertyValue('--m-header-h')) || 64);
        if (window.scrollY > y) window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }
    btns.forEach(function (b) { b.addEventListener('click', function () { go(b.dataset.sec, true); }); });
    var saved = store(key);
    go(saved && $('#sec-' + saved) ? saved : btns[0].dataset.sec, false);
    return go;
  }

  window.PMAtlas = { create: create, sections: sections };
})();
