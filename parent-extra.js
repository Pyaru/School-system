/* অভিভাবক পোর্টালের বাড়তি অংশ: ক্লাস ডায়েরি + ফি জানানো।
 * parent.html-এ </body>-এর ঠিক আগে এই এক লাইন বসান:  <script src="parent-extra.js"></script>
 * (parent.html-এর নিজের লগইন কোড বদলাতে হয় না; লগইনের পর এটি নিজে থেকে নিচে বসে) */
(function () {
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
    '#pxRcpt{position:fixed;inset:0;z-index:10000;background:rgba(0,0,0,.55);overflow:auto;padding:14px;font-family:inherit}#pxRcpt .sheet{background:#fff;max-width:420px;margin:0 auto;border-radius:10px;padding:18px;position:relative;font-size:13px;line-height:1.6;color:#111}' +
    '#pxRcpt h3{margin:0;text-align:center;font-size:17px}#pxRcpt .t{text-align:center;font-size:12px;color:#555;margin:2px 0 8px}#pxRcpt table{width:100%;border-collapse:collapse;margin:6px 0}#pxRcpt td,#pxRcpt th{padding:4px 3px;border-bottom:1px solid #e5e7eb;text-align:left;font-size:12.5px}#pxRcpt .r{text-align:right;white-space:nowrap}' +
    '#pxRcpt .kv{display:flex;justify-content:space-between;padding:2px 0}#pxRcpt .big{font-size:16px;font-weight:700;border-top:2px solid #111;margin-top:4px;padding-top:4px}#pxRcpt .ft{margin-top:10px;font-size:11px;color:#555;text-align:center}' +
    '#pxRcpt .vd{position:absolute;inset:0;display:flex;align-items:center;justify-content:center;font-size:56px;font-weight:700;color:rgba(185,28,28,.35);transform:rotate(-20deg);pointer-events:none}' +
    '#pxRcpt .act{max-width:420px;margin:10px auto 0;display:flex;gap:8px}#pxRcpt .act button{flex:1;padding:12px;border:0;border-radius:10px;font-size:15px;font-family:inherit;cursor:pointer;background:#0b6b4f;color:#fff}#pxRcpt .act button.l{background:#e5e7eb;color:#111}' +
    '@media print{@page{size:A5 portrait;margin:8mm}body>*:not(#pxRcpt){display:none!important}#pxRcpt{position:static!important;background:#fff!important;padding:0!important;overflow:visible!important}#pxRcpt .sheet{max-width:none!important;border-radius:0!important;padding:0!important}#pxRcpt .act{display:none!important}}';
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

  // ---------------- রসিদ দেখা / প্রিন্ট / PDF
  function showRcpt(id, done) {
    call('parentrcpt', { id: id }).then(function (j) {
      done();
      if (!j.ok) { alert(j.msg || 'রসিদ পাওয়া যায়নি'); return; }
      var r = j.receipt, d = String(r.date || '').split('/');
      var dateTxt = d.length === 3 ? bn(d[0]) + ' ' + MON[+d[1] - 1] + ' ' + bn(d[2]) : esc(r.date);
      var rows = (r.items || []).map(function (it) {
        var what = esc(it.name) + (it.months && it.months.length ? '<br><small>' + it.months.map(function (m) { var p = m.split('-'); return MON[+p[1] - 1] + ' ' + bn(p[0]); }).join(', ') + '</small>' : '');
        return '<tr><td>' + what + '</td><td class="r">' + bn(it.qty) + ' × ' + bn(it.unit) + '</td><td class="r">' + bn(it.amount) + '</td></tr>';
      }).join('');
      var o = document.getElementById('pxRcpt'); if (o) o.remove();
      o = document.createElement('div'); o.id = 'pxRcpt';
      o.innerHTML = '<div class="sheet">' + (r.status === 'Void' ? '<div class="vd">বাতিল</div>' : '') +
        '<h3>' + esc(j.school) + '</h3><div class="t">বেতন / ফি রসিদ</div>' +
        '<div class="kv"><span>রসিদ নং</span><b>' + esc(r.rcpt) + '</b></div><div class="kv"><span>তারিখ</span><b>' + dateTxt + (r.time ? ', ' + bn(r.time) : '') + '</b></div>' +
        '<div class="kv"><span>শিক্ষার্থী</span><b>' + esc(r.name) + '</b></div><div class="kv"><span>শ্রেণি / রোল</span><b>' + esc(r.cls) + ' / ' + esc(bn(r.roll)) + '</b></div><div class="kv"><span>আইডি</span><b>' + esc(r.sid) + '</b></div>' +
        '<table><tr><th>বিবরণ</th><th class="r">পরিমাণ</th><th class="r">টাকা</th></tr>' + rows + '</table>' +
        '<div class="kv"><span>মোট</span><span>' + bn(r.total) + ' ৳</span></div>' + (r.discount ? '<div class="kv"><span>ছাড়</span><span>− ' + bn(r.discount) + ' ৳</span></div>' : '') +
        '<div class="kv big"><span>পরিশোধিত</span><span>' + bn(r.paid) + ' ৳</span></div>' +
        '<div class="kv" style="margin-top:6px"><span>পরিশোধের মাধ্যম</span><span>' + esc(j.online.method) + ' (অনলাইন)</span></div><div class="kv"><span>TrxID</span><span style="font-family:monospace">' + esc(j.online.trx) + '</span></div>' +
        '<div class="ft">অফিস কর্তৃক যাচাইকৃত · কম্পিউটারে তৈরি রসিদ, সিল-স্বাক্ষর ছাড়াই বৈধ</div></div>' +
        '<div class="act"><button onclick="window.print()">🖨 প্রিন্ট / PDF</button><button class="l" id="pxRcClose">বন্ধ করুন</button></div>';
      document.body.appendChild(o);
      o.querySelector('#pxRcClose').onclick = function () { o.remove(); };
    }).catch(function () { done(); alert('সংযোগ হয়নি। আবার চেষ্টা করুন।'); });
  }

  setInterval(mount, 1000); mount();
})();
