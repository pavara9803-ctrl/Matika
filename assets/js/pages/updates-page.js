// updates.html — නිවැරදි කළ කරුණු පිටුව
(function () {
  'use strict';
  var UI = {
    kicker: { si: 'යාවත්කාලීන සටහන්', en: 'Update notes', my: 'အပ်ဒိတ်မှတ်စုများ', zh: '更新说明', 'zh-Hant': '更新說明' },
    title: { si: 'නිවැරදි කළ කරුණු', en: 'Corrected points', my: 'ပြင်ဆင်ထားသော အချက်များ', zh: '已更正的内容', 'zh-Hant': '已更正的內容' },
    lead: {
      si: 'ඇප් එකේ තොරතුරු නිවැරදි කළ සෑම අවස්ථාවකම, කුමක් වෙනස් කළාදැයි මෙහි සටහන් වේ. අදාළ පදයට කෙලින්ම යාමට “පිටුවේ බලන්න” ඔබන්න.',
      en: 'Whenever information in the app is corrected, what changed is recorded here. Tap “View in page” to jump straight to the term.',
      my: 'အက်ပ်ထဲရှိ အချက်အလက်များကို ပြင်ဆင်တိုင်း ဘာပြောင်းလဲသည်ကို ဤနေရာတွင် မှတ်တမ်းတင်ထားသည်။ သက်ဆိုင်ရာ ပုဒ်သို့ တိုက်ရိုက်သွားရန် “စာမျက်နှာတွင်ကြည့်ရန်” ကို နှိပ်ပါ။',
      zh: '应用内的信息每次更正，都会在此记录改动内容。点击“在页面中查看”可直接跳到相应条目。',
      'zh-Hant': '應用內的資訊每次更正，都會在此記錄改動內容。點擊「在頁面中查看」可直接跳到相應條目。'
    },
    all: { si: 'සියල්ල', en: 'All', my: 'အားလုံး', zh: '全部', 'zh-Hant': '全部' },
    tika: { si: 'තික මාතිකා', en: 'Tika Matika', my: 'တိကမာတိကာ', zh: '三法母论', 'zh-Hant': '三法母論' },
    duka: { si: 'දුක මාතිකා', en: 'Duka Matika', my: 'ဒုကမာတိကာ', zh: '二法母论', 'zh-Hant': '二法母論' },
    suttanta: { si: 'සුත්තන්ත මාතිකා', en: 'Suttanta Matika', my: 'သုတ္တန်မာတိကာ', zh: '经藏母论', 'zh-Hant': '經藏母論' },
    sabbattika: { si: 'සබ්බත්තික', en: 'Sabbattika', my: 'သဗ္ဗတ္တိက', zh: 'Sabbattika', 'zh-Hant': 'Sabbattika' },
    paramattha: { si: 'පරමාර්ථ', en: 'Paramattha', my: 'ပရမတ္ထ', zh: '胜义法', 'zh-Hant': '勝義法' },
    before: { si: 'පෙර', en: 'Before', my: 'ယခင်', zh: '更正前', 'zh-Hant': '更正前' },
    after: { si: 'දැන්', en: 'Now', my: 'ယခု', zh: '更正后', 'zh-Hant': '更正後' },
    go: { si: 'පිටුවේ බලන්න', en: 'View in page', my: 'စာမျက်နှာတွင်ကြည့်ရန်', zh: '在页面中查看', 'zh-Hant': '在頁面中查看' },
    isNew: { si: 'අලුත්', en: 'New', my: 'အသစ်', zh: '新', 'zh-Hant': '新' },
    items: { si: 'නිවැරදි කිරීම්', en: 'corrections', my: 'ပြင်ဆင်ချက်', zh: '项更正', 'zh-Hant': '項更正' },
    reportH: { si: 'දෝෂයක් දුටුවාද?', en: 'Found an error?', my: 'အမှားတစ်ခု တွေ့ပါသလား။', zh: '发现错误了吗？', 'zh-Hant': '發現錯誤了嗎？' },
    reportT: {
      si: 'ධර්ම කරුණක හෝ පරිවර්තනයක වැරදීමක් ඔබට පෙනේ නම් අපට දන්වන්න. එය පරීක්ෂා කර බලා, නිවැරදි කළ යුතු නම් සකස් කර මෙම පිටුවේ සටහන් කරන්නෙමු.',
      en: 'If you notice a mistake in a point of Dhamma or in a translation, please let us know. We will check it and, if it needs correcting, fix it and record it on this page.',
      my: 'ဓမ္မအချက်တစ်ခု သို့မဟုတ် ဘာသာပြန်ချက်တစ်ခုတွင် အမှားတွေ့ပါက ကျွန်ုပ်တို့ကို အကြောင်းကြားပါ။ စစ်ဆေးပြီး ပြင်ရန်လိုပါက ပြင်ဆင်၍ ဤစာမျက်နှာတွင် မှတ်တမ်းတင်ပါမည်။',
      zh: '如果您发现法义内容或译文有误，请告知我们。我们会核实，如需更正，将予以修改并记录在此页面。',
      'zh-Hant': '如果您發現法義內容或譯文有誤，請告知我們。我們會核實，如需更正，將予以修改並記錄在此頁面。'
    },
    reportB: { si: 'දෝෂයක් දන්වන්න', en: 'Report an error', my: 'အမှားကို အကြောင်းကြားရန်', zh: '报告错误', 'zh-Hant': '回報錯誤' },
    empty: { si: 'තවම නිවැරදි කළ කරුණු සටහන් කර නැත.', en: 'No corrections recorded yet.', my: 'ပြင်ဆင်ချက် မှတ်တမ်း မရှိသေးပါ။', zh: '尚无更正记录。', 'zh-Hant': '尚無更正記錄。' }
  };
  var filter = 'all';
  var newIds = {};

  function lang() { return (window.MX_I18N && window.MX_I18N.lang && window.MX_I18N.lang()) || 'si'; }
  function L(o) { if (!o) return ''; if (typeof o === 'string') return o; var l = lang(); return o[l] || o.en || o.si || ''; }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }
  function fmtDate(d) {
    try {
      var l = lang(), loc = { si: 'si-LK', en: 'en-GB', my: 'my-MM', zh: 'zh-CN', 'zh-Hant': 'zh-TW' }[l] || 'en-GB';
      var p = d.split('-'); return new Date(Date.UTC(+p[0], +p[1] - 1, +p[2])).toLocaleDateString(loc, { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' });
    } catch (e) { return d; }
  }
  function fixLink(u) { return /^https?:/.test(u) ? u : window.MX_UPDATES.root() + u; }

  function render() {
    var data = window.MX_UPDATES.list();
    var set = function (id, k) { var e = document.getElementById(id); if (e) e.textContent = L(UI[k]); };
    set('up-kicker', 'kicker'); set('up-title', 'title'); set('up-lead', 'lead');
    document.title = L(UI.title) + ' - මාතිකා';

    var areas = [];
    data.forEach(function (r) { (r.items || []).forEach(function (it) { (it.areas || []).forEach(function (a) { if (areas.indexOf(a) < 0) areas.push(a); }); }); });
    var fh = '';
    if (areas.length > 1) {
      fh = '<button type="button" class="ca-chip" data-f="all" aria-pressed="' + (filter === 'all') + '">' + esc(L(UI.all)) + '</button>';
      areas.forEach(function (a) { fh += '<button type="button" class="ca-chip" data-f="' + esc(a) + '" aria-pressed="' + (filter === a) + '">' + esc(L(UI[a]) || a) + '</button>'; });
    }
    var fe = document.getElementById('up-filters');
    fe.innerHTML = fh;
    if (filter !== 'all' && areas.indexOf(filter) < 0) filter = 'all';

    var out = '<aside class="up-report" data-no-i18n><h2>' + esc(L(UI.reportH)) + '</h2><p>' + esc(L(UI.reportT)) +
      '</p><a class="up-report__b" href="' + esc(window.MX_UPDATES.root()) + 'index.html?feedback=1"><i class="fa-solid fa-comment-dots" aria-hidden="true"></i> ' + esc(L(UI.reportB)) + '</a></aside>';
    data.forEach(function (r) {
      var its = (r.items || []).filter(function (it) { return filter === 'all' || (it.areas || []).indexOf(filter) >= 0; });
      if (!its.length) return;
      out += '<section class="up-rel"><div class="up-rel__h"><h2>' + esc(L(r.title)) + '</h2>' +
        (newIds[r.id] ? '<span class="up-new">' + esc(L(UI.isNew)) + '</span>' : '') +
        '<span class="up-rel__d">' + esc(fmtDate(r.date)) + ' · ' + its.length + ' ' + esc(L(UI.items)) + '</span></div>';
      its.forEach(function (it) {
        var wh = (it.where || []).map(function (w) { return '<span>' + esc(w) + '</span>'; }).join('<i class="fa-solid fa-chevron-right" aria-hidden="true"></i>');
        out += '<article class="up-item">' + (wh ? '<p class="up-where">' + wh + '</p>' : '') +
          '<p class="up-what" data-no-i18n>' + esc(L(it.what)) + '</p>';
        if (it.before || it.after) {
          out += '<div class="up-cmp" data-no-i18n>' +
            (it.before ? '<p class="up-q up-q--b"><b>' + esc(L(UI.before)) + '</b>' + esc(it.before) + '</p>' : '') +
            (it.after ? '<p class="up-q up-q--a"><b>' + esc(L(UI.after)) + '</b>' + esc(it.after) + '</p>' : '') + '</div>';
        }
        if (it.link) out += '<a class="up-go" href="' + esc(fixLink(it.link)) + '" data-no-i18n><i class="fa-solid fa-arrow-up-right-from-square" aria-hidden="true"></i>' + esc(L(UI.go)) + '</a>';
        out += '</article>';
      });
      out += '</section>';
    });
    document.getElementById('up-list').innerHTML = out || '<p class="up-empty" data-no-i18n>' + esc(L(UI.empty)) + '</p>';
  }

  function init() {
    window.MX_UPDATES.ready(function () {
      window.MX_UPDATES.unseenReleases().forEach(function (r) { newIds[r.id] = true; });   // "අලුත්" ලකුණ සඳහා (බැලූ බව සටහන් කිරීමට පෙර)
      window.MX_UPDATES.markSeen();
      render();
    });
    document.getElementById('up-filters').addEventListener('click', function (e) {
      var b = e.target.closest('button[data-f]'); if (!b) return;
      filter = b.getAttribute('data-f'); render();
    });
    if (window.MX_I18N && window.MX_I18N.onChange) window.MX_I18N.onChange(render);
    document.addEventListener('mx-lang-change', render);
  }
  function boot() { if (window.MX_UPDATES) init(); else setTimeout(boot, 30); }
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
})();
