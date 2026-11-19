/* অভিভাবক পোর্টালের বাড়তি অংশ: ক্লাস ডায়েরি + ফি জানানো।
 * parent.html-এ </body>-এর ঠিক আগে এই এক লাইন বসান:  <script src="parent-extra.js"></script>
 * (parent.html-এর নিজের লগইন কোড বদলাতে হয় না; লগইনের পর এটি নিজে থেকে নিচে বসে) */
(function () {
  // ↓↓↓ রসিদের মাথার তথ্য — fees.html-এর ADM-এর সঙ্গে একই রাখুন ↓↓↓
  var RCPT = {
    logoText: 'ফ', logoUrl: 'logo.png',            // লোগোর ফাইল থাকলে যেমন 'logo.png' (fees.html-এ যা দিয়েছেন সেটাই)
    address: 'ঠিকানা: মোহাম্মদপুর, ইঁছাখালী, রাজুনিয়া, চট্টগ্রাম',
    phone: 'মোবাইল: ০১৮৬৫৭৬৩০৫০৮'
  };
  var BN = '০১২৩৪৫৬৭৮৯';
  function bn(n) { return String(n).replace(/\d/g, function (d) { return BN[d]; }); }
  function esc(s) { return String(s == null ? '' : s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); }
  var MON = ['জানুয়ারি', 'ফেব্রুয়ারি', 'মার্চ', 'এপ্রিল', 'মে', 'জুন', 'জুলাই', 'আগস্ট', 'সেপ্টেম্বর', 'অক্টোবর', 'নভেম্বর', 'ডিসেম্বর'];
  function api() { try { return API_URL; } catch (e) { return ''; } }
  function cred() { try { return JSON.parse(localStorage.getItem('par') || 'null'); } catch (e) { return null; } }
  function call(action, extra) {
    var c = cred(); if (!c) return Promise.resolve({ ok: false, msg: 'পেজটি রিফ্রেশ করে আবার ঢুকুন' });
    var q = new URLSearchParams(Object.assign({ action: action, phone: c.p, ppin: c.k }, extra || {}));
    return fetch(api() + '?' + q.toString()).then(function (r) { return r.json(); });
  }
  var st = document.createElement('style');
  st.textContent = '#px{margin:0 0 12px}#px .pxb{display:flex;gap:8px;margin-bottom:10px}#px .pxb button{flex:1;padding:12px 8px;font-size:15px;border:0;border-radius:12px;background:#fff;color:#0b6b4f;box-shadow:0 1px 2px rgba(0,0,0,.08);font-family:inherit;cursor:pointer}' +
    '#px .pxb button.on{background:#0b6b4f;color:#fff}#px .pc{background:#fff;border-radius:14px;padding:14px;box-shadow:0 1px 2px rgba(0,0,0,.08);margin-bottom:10px;font-size:14px;line-height:1.6}' +
    '#px select,#px input{width:100%;padding:11px;font-size:16px;border:1px solid #d1d5db;border-radius:10px;font-family:inherit;margin-top:4px;background:#fff}#px label{display:block;font-size:13px;color:#4b5563;margin-top:10px}' +
    '#px .go{width:100%;margin-top:12px;padding:12px;font-size:16px;border:0;border-radius:10px;background:#0b6b4f;color:#fff;font-family:inherit;cursor:pointer}#px .go:disabled{opacity:.5}' +
    '#px .mm{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin-top:6px}#px .mm label{margin:0;padding:8px 4px;border:1px solid #d1d5db;border-radius:10px;text-align:center;font-size:13px;color:#111827;cursor:pointer}' +
    '#px .mm label.dis{background:#f3f4f6;color:#9ca3af;cursor:default}#px .mm input{display:none}#px .mm input:checked+span{font-weight:700;color:#0b6b4f}#px .mm label:has(input:checked){background:#d1fae5;border-color:#10b981}' +
    '#px .bd{display:inline-block;font-size:11px;padding:2px 8px;border-radius:99px;background:#e5e7eb}#px .bd.g{background:#d1fae5;color:#065f46}#px .bd.y{background:#fef3c7;color:#92400e}#px .bd.r{background:#fee2e2;color:#991b1b}' +
    '#px .ms{margin-top:10px;padding:10px;border-radius:10px;font-size:14px}#px .ms.ok{background:#d1fae5;color:#065f46}#px .ms.er{background:#fee2e2;color:#991b1b}#px .dt{font-size:12px;color:#6b7280;margin:10px 0 2px}' +
    '#px .acc{display:flex;justify-content:space-between;align-items:center;background:#f0fdf4;border-radius:10px;padding:8px 10px;margin-top:6px}#px .acc button{padding:6px 12px;border:0;border-radius:8px;background:#0b6b4f;color:#fff;font-family:inherit}' +
    '#px .rc{margin-top:6px;padding:6px 12px;border:1px solid #0b6b4f;border-radius:8px;background:#fff;color:#0b6b4f;font-family:inherit;font-size:13px;cursor:pointer}' +
    '#pxRcpt{position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.6);overflow:auto;padding:12px;font-family:"Hind Siliguri","Noto Sans Bengali",system-ui,sans-serif}#pxRcpt .box{background:#fff;margin:0 auto;border-radius:6px;overflow:hidden}#pxRcpt .scl{width:190mm;transform-origin:top left;color:#111827;-webkit-print-color-adjust:exact;print-color-adjust:exact}' +
    '#pxRcpt .rc{height:133mm;border:.5mm solid #0b6b4f;border-radius:2mm;padding:4mm 6mm;position:relative;overflow:hidden;display:flex;flex-direction:column;background:#fff}' +
    '#pxRcpt .h{display:flex;align-items:center;gap:4mm;height:20mm}#pxRcpt .lg{width:17mm;height:17mm;border-radius:50%;border:.7mm solid #f59e0b;color:#0b6b4f;display:flex;align-items:center;justify-content:center;font-size:19pt;font-weight:700;position:relative;overflow:hidden;flex:none}#pxRcpt .lg img{position:absolute;inset:0;width:100%;height:100%;object-fit:contain;background:#fff}' +
    '#pxRcpt .sn{flex:1;text-align:center}#pxRcpt .sn b{display:block;font-size:18pt;line-height:1.5;color:#0b6b4f;white-space:nowrap}#pxRcpt .sn span{display:block;font-size:9pt;color:#374151;line-height:1.4}#pxRcpt .cp{border:.3mm solid #0b6b4f;color:#0b6b4f;border-radius:1.5mm;padding:0 2.5mm;font-size:9pt;font-weight:600;white-space:nowrap;line-height:6mm}' +
    '#pxRcpt .tt{display:flex;align-items:center;gap:3mm;margin:1mm 0 2.5mm}#pxRcpt .tt .t{flex:1;text-align:center;background:linear-gradient(100deg,#064e3b,#0b6b4f);color:#fff;border:.5mm solid #f59e0b;border-radius:1.5mm;font-size:13pt;font-weight:700;line-height:1.7}#pxRcpt .tt .b{font-size:9.6pt;font-weight:600;white-space:nowrap}#pxRcpt .tt .b i{font-style:normal;border:.3mm solid #0b6b4f;border-radius:1mm;padding:0 2mm;margin-left:1mm;font-weight:700}' +
    '#pxRcpt .r{display:flex;gap:4mm;margin-bottom:1.8mm}#pxRcpt .f{display:flex;align-items:flex-end;gap:1.5mm;min-width:0}#pxRcpt .k{font-size:9.6pt;white-space:nowrap}#pxRcpt .v{flex:1;min-width:0;border-bottom:.25mm solid #6b7280;font-weight:700;font-size:10pt;line-height:5.8mm;min-height:5.8mm;padding:0 1mm;white-space:nowrap;overflow:hidden}' +
    '#pxRcpt table{width:100%;border-collapse:collapse;font-size:9.6pt;margin-top:1mm}#pxRcpt th{background:#0b6b4f;color:#fff;font-weight:600;padding:.8mm 1.5mm;border:.25mm solid #0b6b4f}#pxRcpt td{padding:.9mm 1.5mm;border:.25mm solid #9ca3af;line-height:1.35}#pxRcpt td.c{text-align:center}#pxRcpt td.n{text-align:right;white-space:nowrap}' +
    '#pxRcpt .bt{display:flex;gap:5mm;margin-top:2.5mm;flex:1;min-height:0}#pxRcpt .bt .l{flex:1;font-size:9.4pt;line-height:1.5}#pxRcpt .bt .l b{color:#0b6b4f}#pxRcpt .sm{width:62mm;font-size:10pt}#pxRcpt .sm div{display:flex;justify-content:space-between;border-bottom:.25mm dashed #9ca3af;padding:.6mm 0}#pxRcpt .sm .p{font-weight:700;font-size:12pt;color:#0b6b4f;border-bottom:.4mm solid #0b6b4f}' +
    '#pxRcpt .sg{display:flex;justify-content:space-between;gap:14mm;margin-top:auto;padding-top:6mm}#pxRcpt .sg div{flex:1;text-align:center;font-size:8.8pt;color:#b91c1c;border-top:.25mm solid #6b7280;padding-top:.6mm;font-weight:600}#pxRcpt .void{position:absolute;left:0;right:0;top:42%;text-align:center;font-size:46pt;font-weight:700;color:rgba(185,28,28,.28);transform:rotate(-12deg);pointer-events:none}' +
    '#pxRcpt .act{max-width:420px;margin:10px auto 0;display:flex;gap:8px}#pxRcpt .act button{flex:1;padding:12px;border:0;border-radius:10px;font-size:15px;font-family:inherit;cursor:pointer;background:#0b6b4f;color:#fff}#pxRcpt .act button.l{background:#e5e7eb;color:#111}' +
    '@media print{@page{size:A4;margin:10mm}body>*:not(#pxRcpt){display:none!important}#pxRcpt{position:static!important;background:#fff!important;padding:0!important;overflow:visible!important}#pxRcpt .box{width:auto!important;height:auto!important;border-radius:0!important}#pxRcpt .scl{transform:none!important}#pxRcpt .act{display:none!important}}';
  document.head.appendChild(st);

  var box = null, tab = '', sIdx = 0, PAY = null;
  function mount() {
    var app = document.getElementById('app');
    if (!app) return;
    var visible = app.style.display !== 'none' && getComputedStyle(app).display !== 'none';
    if (!visible) { if (box) { box.remove(); box = null; tab = ''; } return; }
    if (box && box.parentNode) return;
    box = document.createElement('div'); box.id = 'px';
    box.innerHTML = '<div class="pxb"><button id="pxD">📒 ক্লাস ডায়েরি</button><button id="pxF">💳 ফি জানান</button></div><div id="pxBody"></div>';
    var note = app.querySelector('.note');
    if (note) app.insertBefore(box, note); else app.appendChild(box);
    box.querySelector('#pxD').onclick = function () { open_('D'); };
    box.querySelector('#pxF').onclick = function () { open_('F'); };
  }
  function open_(t) {
    if (tab === t) { tab = ''; box.querySelector('#pxBody').innerHTML = ''; mark(); return; }
    tab = t; mark();
    var body = box.querySelector('#pxBody'); body.innerHTML = '<div class="pc">লোড হচ্ছে...</div>';
    if (t === 'D') diary(body); else pay(body);
  }
  function mark() { box.querySelector('#pxD').className = tab === 'D' ? 'on' : ''; box.querySelector('#pxF').className = tab === 'F' ? 'on' : ''; }

  // ---------------- ডায়েরি
  function diary(body) {
    call('parentdiary').then(function (j) {
      if (!j.ok) { body.innerHTML = '<div class="pc">' + esc(j.msg || 'লোড হয়নি') + '</div>'; return; }
      var seen = {}, html = '';
      j.students.forEach(function (s) {
        if (seen[s.cls] && j.students.length > 1) { }
        seen[s.cls] = 1;
        html += '<div class="pc"><b>' + esc(s.name) + '</b> <span style="color:#6b7280">· ' + esc(s.cls) + '</span>';
        if (!s.entries.length) html += '<div class="dt">গত ' + bn(j.days) + ' দিনে কিছু লেখা হয়নি</div>';
        var last = '';
        s.entries.forEach(function (e) {
          if (e.date !== last) { last = e.date; var d = e.date.split('-'); html += '<div class="dt">' + bn(+d[2]) + ' ' + MON[+d[1] - 1] + (e.date === j.today ? ' (আজ)' : '') + '</div>'; }
          html += '<div style="padding:6px 0;border-bottom:1px solid #f1f5f9"><span class="bd ' + (e.type === 'হোমওয়ার্ক' ? 'y' : e.type === 'নোটিশ' ? 'r' : 'g') + '">' + esc(e.type) + '</span> ' +
            (e.subject ? '<b>' + esc(e.subject) + '</b>' : '') + '<div style="white-space:pre-wrap">' + esc(e.text) + '</div><div style="font-size:11px;color:#9ca3af">' + esc(e.by) + '</div></div>';
        });
        html += '</div>';
      });
      body.innerHTML = html;
    }).catch(function () { body.innerHTML = '<div class="pc">সংযোগ হয়নি। আবার চেষ্টা করুন।</div>'; });
  }

  // ---------------- ফি জানানো
  function pay(body) {
    call('parentpay').then(function (j) {
      if (!j.ok) { body.innerHTML = '<div class="pc">' + esc(j.msg || 'লোড হয়নি') + '</div>'; return; }
      PAY = j; sIdx = Math.min(sIdx, j.students.length - 1); drawPay(body);
    }).catch(function () { body.innerHTML = '<div class="pc">সংযোগ হয়নি। আবার চেষ্টা করুন।</div>'; });
  }
  function drawPay(body) {
    var s = PAY.students[sIdx], c = cred();
    var html = '<div class="pc"><b>বেতন পাঠানোর নিয়ম</b><br>১) নিচের নম্বরে টাকা পাঠান (Send Money)<br>২) যে TrxID পেয়েছেন তা নিচের ফর্মে লিখে জানান<br>৩) অফিস মিলিয়ে নিলে রসিদ হবে ও এখানে "গৃহীত" দেখাবে' +
      PAY.accounts.map(function (a) { return '<div class="acc"><span><b>' + esc(a.method) + '</b> ' + esc(bn(a.number)) + '<br><small>' + esc(a.kind || '') + '</small></span><button data-n="' + esc(a.number) + '">কপি</button></div>'; }).join('') + '</div>';
    html += '<div class="pc">';
    if (PAY.students.length > 1) html += '<label style="margin-top:0">ছাত্র/ছাত্রী</label><select id="pxS">' + PAY.students.map(function (x, i) { return '<option value="' + i + '"' + (i === sIdx ? ' selected' : '') + '>' + esc(x.name) + ' (' + esc(x.cls) + ')</option>'; }).join('') + '</select>';
    else html += '<b>' + esc(s.name) + '</b> <span style="color:#6b7280">· ' + esc(s.cls) + '</span>';
    html += '<label>কোন মাসের বেতন?' + (s.monthly ? ' <span style="color:#6b7280">(মাসিক ' + bn(s.monthly) + ' টাকা)</span>' : '') + '</label><div class="mm">' +
      s.months.map(function (m) {
        var lab = m.state === 'paid' ? ' (জমা)' : m.state === 'pending' ? ' (অপেক্ষমাণ)' : '';
        return '<label class="' + (m.state === 'due' ? '' : 'dis') + '"><input type="checkbox" value="' + m.key + '" ' + (m.state === 'due' ? '' : 'disabled') + '><span>' + esc(m.name) + '</span><br><small>' + lab + '</small></label>';
      }).join('') + '</div>' +
      '<label>মোট টাকা (যত পাঠিয়েছেন)</label><input id="pxA" type="number" inputmode="numeric" placeholder="যেমন ' + (s.monthly ? s.monthly : 500) + '">' +
      '<label>কোন মাধ্যমে পাঠিয়েছেন</label><select id="pxM">' + PAY.accounts.map(function (a) { return '<option>' + esc(a.method) + '</option>'; }).join('') + '</select>' +
      '<label>TrxID (লেনদেন নম্বর)</label><input id="pxT" autocapitalize="characters" autocomplete="off" placeholder="যেমন 8N7A6D5EF4">' +
      '<label>যে নম্বর থেকে পাঠিয়েছেন</label><input id="pxP" type="tel" inputmode="numeric" value="' + esc(c ? c.p : '') + '">' +
      '<button class="go" id="pxGo">জানান</button><div id="pxMsg"></div></div>';
    if (s.reports.length) html += '<div class="pc"><b>সাম্প্রতিক আবেদন</b>' + s.reports.map(function (r) {
      var b = r.status === 'Approved' ? '<span class="bd g">গৃহীত · রসিদ ' + esc(r.rcpt) + '</span>' : r.status === 'Rejected' ? '<span class="bd r">বাতিল</span>' : '<span class="bd y">অপেক্ষমাণ</span>';
      var ms = r.months.split(',').filter(Boolean).map(function (m) { var p = m.split('-'); return MON[+p[1] - 1]; }).join(', ');
      return '<div style="padding:7px 0;border-bottom:1px solid #f1f5f9">' + b + '<div>' + esc(ms) + ' — ' + bn(r.amount) + ' টাকা (' + esc(r.method) + ')</div>' +
        (r.status === 'Rejected' && r.note ? '<div style="color:#991b1b;font-size:13px">কারণ: ' + esc(r.note) + '</div>' : '') +
        (r.status === 'Approved' ? '<button class="rc" data-rid="' + esc(r.id) + '">🧾 রসিদ দেখুন / প্রিন্ট</button>' : '') + '<div style="font-size:11px;color:#9ca3af">TrxID ' + esc(r.trx) + ' · ' + esc(bn(r.date)) + '</div></div>';
    }).join('') + '</div>';
    body.innerHTML = html;
    Array.prototype.forEach.call(body.querySelectorAll('.rc'), function (b) {
      b.onclick = function () { b.disabled = true; b.textContent = 'লোড হচ্ছে...'; showRcpt(b.getAttribute('data-rid'), function () { b.disabled = false; b.textContent = '🧾 রসিদ দেখুন / প্রিন্ট'; }); };
    });
    var sel = body.querySelector('#pxS'); if (sel) sel.onchange = function () { sIdx = +sel.value; drawPay(body); };
    Array.prototype.forEach.call(body.querySelectorAll('.acc button'), function (b) {
      b.onclick = function () { try { navigator.clipboard.writeText(b.getAttribute('data-n')); b.textContent = '✓ কপি হলো'; } catch (e) { b.textContent = b.getAttribute('data-n'); } };
    });
    var amt = body.querySelector('#pxA');
    Array.prototype.forEach.call(body.querySelectorAll('.mm input'), function (i) {
      i.onchange = function () { var n = body.querySelectorAll('.mm input:checked').length; if (s.monthly && n) amt.value = s.monthly * n; };
    });
    body.querySelector('#pxGo').onclick = function () {
      var months = Array.prototype.map.call(body.querySelectorAll('.mm input:checked'), function (i) { return i.value; });
      var msg = body.querySelector('#pxMsg'), go = body.querySelector('#pxGo');
      function m(cls, t) { msg.className = 'ms ' + cls; msg.textContent = t; }
      if (!months.length) return m('er', 'মাস বাছুন');
      if (!amt.value) return m('er', 'টাকার অঙ্ক লিখুন');
      if (!body.querySelector('#pxT').value.trim()) return m('er', 'TrxID লিখুন');
      go.disabled = true; m('ok', 'পাঠানো হচ্ছে...');
      call('payreport', { id: s.id, months: months.join(','), amount: amt.value, method: body.querySelector('#pxM').value, trx: body.querySelector('#pxT').value.trim(), sender: body.querySelector('#pxP').value }).then(function (j) {
        go.disabled = false;
        if (j.ok) { PAY = null; pay(body); setTimeout(function () { var mm = body.querySelector('#pxMsg'); if (mm) { mm.className = 'ms ok'; mm.textContent = '✓ জানানো হয়েছে। অফিস মিলিয়ে নিলে এখানে "গৃহীত" দেখাবে।'; } }, 600); }
        else m('er', j.msg || 'হয়নি');
      }).catch(function () { go.disabled = false; m('er', 'সংযোগ হয়নি। আবার চেষ্টা করুন।'); });
    };
  }

  // ---------------- রসিদ দেখা / প্রিন্ট / PDF (অফিসের "অভিভাবক কপি"-র মতো)
  var W = ['শূন্য','এক','দুই','তিন','চার','পাঁচ','ছয়','সাত','আট','নয়','দশ','এগারো','বারো','তেরো','চৌদ্দ','পনেরো','ষোল','সতেরো','আঠারো','উনিশ','বিশ','একুশ','বাইশ','তেইশ','চব্বিশ','পঁচিশ','ছাব্বিশ','সাতাশ','আটাশ','ঊনত্রিশ','ত্রিশ','একত্রিশ','বত্রিশ','তেত্রিশ','চৌত্রিশ','পঁয়ত্রিশ','ছত্রিশ','সাঁইত্রিশ','আটত্রিশ','ঊনচল্লিশ','চল্লিশ','একচল্লিশ','বিয়াল্লিশ','তেতাল্লিশ','চুয়াল্লিশ','পঁয়তাল্লিশ','ছেচল্লিশ','সাতচল্লিশ','আটচল্লিশ','ঊনপঞ্চাশ','পঞ্চাশ','একান্ন','বায়ান্ন','তিপ্পান্ন','চুয়ান্ন','পঞ্চান্ন','ছাপ্পান্ন','সাতান্ন','আটান্ন','ঊনষাট','ষাট','একষট্টি','বাষট্টি','তেষট্টি','চৌষট্টি','পঁয়ষট্টি','ছেষট্টি','সাতষট্টি','আটষট্টি','ঊনসত্তর','সত্তর','একাত্তর','বাহাত্তর','তিয়াত্তর','চুয়াত্তর','পঁচাত্তর','ছিয়াত্তর','সাতাত্তর','আটাত্তর','ঊনআশি','আশি','একাশি','বিরাশি','তিরাশি','চুরাশি','পঁচাশি','ছিয়াশি','সাতাশি','অষ্টাশি','ঊননব্বই','নব্বই','একানব্বই','বিরানব্বই','তিরানব্বই','চুরানব্বই','পঁচানব্বই','ছিয়ানব্বই','সাতানব্বই','আটানব্বই','নিরানব্বই'];
  function words(n) {
    n = Math.floor(n); if (n <= 0) return 'শূন্য';
    var out = [], cr = Math.floor(n / 10000000); n %= 10000000;
    var lk = Math.floor(n / 100000); n %= 100000;
    var th = Math.floor(n / 1000); n %= 1000;
    var hu = Math.floor(n / 100); n %= 100;
    if (cr) out.push((cr < 100 ? W[cr] : words(cr)) + ' কোটি');
    if (lk) out.push(W[lk] + ' লাখ'); if (th) out.push(W[th] + ' হাজার'); if (hu) out.push(W[hu] + ' শত'); if (n) out.push(W[n]);
    return out.join(' ');
  }
  function taka(n) { return bn(Math.round(n).toLocaleString('en-US')); }
  function monthsLabel(keys) {
    if (!keys || !keys.length) return '';
    var by = {};
    keys.slice().sort().forEach(function (k) { var p = k.split('-'); (by[p[0]] = by[p[0]] || []).push(Number(p[1]) - 1); });
    return Object.keys(by).sort().map(function (y) {
      var a = by[y], parts = [], s = a[0], prev = a[0];
      for (var i = 1; i <= a.length; i++) {
        if (a[i] === prev + 1) { prev = a[i]; continue; }
        parts.push(s === prev ? MON[s] : MON[s] + '–' + MON[prev]);
        s = a[i]; prev = a[i];
      }
      return parts.join(', ') + ' ' + bn(y);
    }).join('; ');
  }
  function fitAll(root) {
    Array.prototype.forEach.call(root.querySelectorAll('[data-fit]'), function (el) {
      var s = el.tagName === 'B' ? 18 : 10, g = 40; el.style.fontSize = s + 'pt';
      while (g-- && s > 6 && el.scrollWidth > el.clientWidth + 1) { s -= 0.3; el.style.fontSize = s.toFixed(1) + 'pt'; }
    });
  }
  function rcptHtml(r, school) {
    var row = function (k, v, f) { return '<div class="f" style="flex:' + (f || 1) + '"><span class="k">' + k + '</span><span class="v" data-fit>' + esc(v || '') + '</span></div>'; };
    var rows = (r.items || []).map(function (it, i) {
      var det = it.months && it.months.length ? monthsLabel(it.months) + ' (' + bn(it.months.length) + ' মাস × ' + taka(it.unit) + ')' : (it.qty > 1 ? bn(it.qty) + ' × ' + taka(it.unit) : '');
      return '<tr><td class="c" style="width:9mm">' + bn(i + 1) + '</td><td style="width:38mm">' + esc(it.name) + '</td><td>' + esc(det) + '</td><td class="n" style="width:26mm">' + taka(it.amount) + '</td></tr>';
    }).join('');
    return '<div class="rc"><div class="h"><div class="lg">' + esc(RCPT.logoText) + (RCPT.logoUrl ? '<img alt="" src="' + esc(RCPT.logoUrl) + '" onerror="this.remove()">' : '') + '</div>' +
      '<div class="sn"><b data-fit>' + esc(school) + '</b><span>' + esc(RCPT.address) + '</span><span>' + esc(RCPT.phone) + '</span></div><div class="cp">অভিভাবক কপি</div></div>' +
      '<div class="tt"><span class="b">রসিদ নং <i>' + esc(r.rcpt) + '</i></span><div class="t">ফি জমার রসিদ</div><span class="b">তারিখ <i>' + esc(bn(r.date)) + '</i></span></div>' +
      '<div class="r">' + row('নাম:', r.name, 3) + row('আইডি:', r.sid, 1.2) + '</div>' +
      '<div class="r">' + row('শ্রেণি:', r.cls, 1.4) + row('রোল:', bn(r.roll), 1) + row('সময়:', bn(r.time), 1) + '</div>' +
      '<table><tr><th>নং</th><th>খাত</th><th>বিবরণ</th><th>টাকা</th></tr>' + rows + '</table>' +
      '<div class="bt"><div class="l"><b>কথায়:</b> ' + esc(words(r.paid)) + ' টাকা মাত্র<br><b>পদ্ধতি:</b> ' + esc(r.method) + (r.note ? '<br><b>নোট:</b> ' + esc(r.note) : '') + '</div>' +
      '<div class="sm"><div><span>মোট</span><span>' + taka(r.total) + '</span></div>' + (r.discount ? '<div><span>ছাড়</span><span>− ' + taka(r.discount) + '</span></div>' : '') + '<div class="p"><span>পরিশোধিত</span><span>' + taka(r.paid) + ' টাকা</span></div></div></div>' +
      '<div class="sg"><div>জমাদানকারীর স্বাক্ষর</div><div>গ্রহণকারী: ' + esc(r.by) + '</div></div>' +
      (r.status === 'Void' ? '<div class="void">বাতিল</div>' : '') + '</div>';
  }
  function showRcpt(id, done) {
    call('parentrcpt', { id: id }).then(function (j) {
      done();
      if (!j.ok) { alert(j.msg || 'রসিদ পাওয়া যায়নি'); return; }
      var o = document.getElementById('pxRcpt'); if (o) o.remove();
      o = document.createElement('div'); o.id = 'pxRcpt';
      o.innerHTML = '<div class="box"><div class="scl">' + rcptHtml(j.receipt, j.school) + '</div></div>' +
        '<div class="act"><button onclick="window.print()">🖨 প্রিন্ট / PDF</button><button class="l" id="pxRcClose">বন্ধ করুন</button></div>';
      document.body.appendChild(o);
      var scl = o.querySelector('.scl'), box = o.querySelector('.box');
      fitAll(scl);
      var w = scl.offsetWidth, h = scl.offsetHeight, s = Math.min(1, (window.innerWidth - 24) / w);
      scl.style.transform = 'scale(' + s + ')'; box.style.width = (w * s) + 'px'; box.style.height = (h * s) + 'px';
      o.querySelector('#pxRcClose').onclick = function () { o.remove(); };
    }).catch(function () { done(); alert('সংযোগ হয়নি। আবার চেষ্টা করুন।'); });
  }

  setInterval(mount, 1000); mount();
})();
