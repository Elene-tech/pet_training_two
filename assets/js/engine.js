/* Target English · PET Training — test engine (no external libraries) */
(function () {
  'use strict';
  const T = window.PET_TEST;
  if (!T) return;
  const KEY = 'target-english-pet-' + T.id + '-v1';
  const S = { a: {}, checked: {}, score: {}, w: {}, chk: {}, sp: { self: {} }, name: '', tab: 'r1' };
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) { const o = JSON.parse(raw); for (const k in o) S[k] = o[k]; }
  } catch (e) {}
  let saveT = null, wiped = false;
  function save() {
    if (wiped) return;
    clearTimeout(saveT);
    saveT = setTimeout(() => { try { localStorage.setItem(KEY, JSON.stringify(S)); } catch (e) {} }, 150);
  }

  /* ---------- helpers ---------- */
  const $ = (s, el) => (el || document).querySelector(s);
  const $$ = (s, el) => Array.from((el || document).querySelectorAll(s));
  function h(tag, props, ...kids) {
    const el = document.createElement(tag);
    if (props) for (const k of Object.keys(props)) {
      const v = props[k];
      if (v == null || v === false) continue;
      if (k === 'class') el.className = v;
      else if (k === 'html') el.innerHTML = v;
      else if (k.slice(0, 2) === 'on') el.addEventListener(k.slice(2).toLowerCase(), v);
      else if (k === 'dataset') Object.assign(el.dataset, v);
      else el.setAttribute(k, v === true ? '' : v);
    }
    for (const kid of kids.flat(Infinity)) {
      if (kid == null || kid === false) continue;
      el.append(kid.nodeType ? kid : document.createTextNode(String(kid)));
    }
    return el;
  }
  const fmt = (s) => String(Math.floor(s / 60)).padStart(2, '0') + ':' + String(s % 60).padStart(2, '0');
  const wc = (t) => (t.trim() ? t.trim().split(/\s+/).length : 0);
  const R = T.reading;
  const NAMES = T.names || ['Татьяна', 'Тимофей'];

  const TABS = [
    ['r1', 'Reading 1', 'Q 1–5'], ['r2', 'Reading 2', 'Q 6–10'], ['r3', 'Reading 3', 'Q 11–15'],
    ['r4', 'Reading 4', 'Q 16–20'], ['r5', 'Reading 5', 'Q 21–26'], ['r6', 'Reading 6', 'Q 27–32'],
    ['w', 'Writing', 'Part 1–2'], ['s', 'Speaking', 'Part 1 · 3 · 4'], ['res', 'Итог', 'результаты']
  ];
  const MAX = { r1: 5, r2: 5, r3: 5, r4: 5, r5: 6, r6: 6 };
  const QRANGE = { r1: [1, 5], r2: [6, 10], r3: [11, 15], r4: [16, 20], r5: [21, 26], r6: [27, 32] };

  /* ---------- sound ---------- */
  function chime() {
    try {
      const ac = new (window.AudioContext || window.webkitAudioContext)();
      [0, 0.28, 0.56].forEach((t, i) => {
        const o = ac.createOscillator(), g = ac.createGain();
        o.frequency.value = 600 + i * 180; o.connect(g); g.connect(ac.destination);
        g.gain.setValueAtTime(0.2, ac.currentTime + t);
        g.gain.exponentialRampToValueAtTime(0.001, ac.currentTime + t + 0.3);
        o.start(ac.currentTime + t); o.stop(ac.currentTime + t + 0.32);
      });
    } catch (e) {}
  }

  /* ---------- shared pieces ---------- */
  function partHead(kick, title, rubric, tip) {
    return h('header', { class: 'phead' },
      h('div', { class: 'kick' }, kick), h('h2', null, title),
      rubric ? h('p', { class: 'rubric' }, rubric) : null,
      tip ? h('p', { class: 'tip' }, h('b', null, 'Совет: '), tip) : null);
  }

  function markSel(wrap, L) { $$('label', wrap).forEach((l) => l.classList.toggle('sel', l.dataset.l === L)); }
  function optionList(qid, opts, cls) {
    const wrap = h('div', { class: 'opts ' + (cls || ''), role: 'radiogroup', 'aria-label': 'Question ' + qid.slice(1) });
    opts.forEach(([L, txt]) => {
      const inp = h('input', { type: 'radio', name: qid, value: L });
      if (S.a[qid] === L) inp.checked = true;
      inp.addEventListener('change', () => { S.a[qid] = L; markSel(wrap, L); save(); onAnswer(qid); });
      wrap.append(h('label', { class: 'opt' + (S.a[qid] === L ? ' sel' : ''), dataset: { l: L } }, inp, h('span', { class: 'ltr' }, L), h('span', null, txt)));
    });
    return wrap;
  }
  function chipRow(qid, letters) {
    const wrap = h('div', { class: 'chips', role: 'radiogroup', 'aria-label': 'Question ' + qid.slice(1) });
    letters.forEach((L) => {
      const inp = h('input', { type: 'radio', name: qid, value: L });
      if (S.a[qid] === L) inp.checked = true;
      inp.addEventListener('change', () => { S.a[qid] = L; markSel(wrap, L); save(); onAnswer(qid); });
      wrap.append(h('label', { class: 'chip' + (S.a[qid] === L ? ' sel' : ''), dataset: { l: L } }, inp, L));
    });
    return wrap;
  }
  /* two-click confirmation instead of confirm() (dialogs are blocked in some in-app browsers) */
  function twoClick(label, confirmLabel, action, cls) {
    let armed = false, tm = null;
    const b = h('button', { class: cls || 'btn ghost', type: 'button' }, label);
    b.addEventListener('click', () => {
      if (!armed) { armed = true; b.textContent = confirmLabel; b.classList.add('armed'); tm = setTimeout(() => { armed = false; b.textContent = label; b.classList.remove('armed'); }, 3500); return; }
      clearTimeout(tm); armed = false; action();
    });
    return b;
  }

  const refreshers = {};
  function onAnswer(qid) {
    if (refreshers[qid]) refreshers[qid]();
    updateProgress();
  }

  function gradeChoice(part, items) {
    let got = 0;
    S.checked[part] = true;
    items.forEach((it) => {
      const id = 'q' + it.n, card = $('#card-' + id);
      if (!card) return;
      const chosen = S.a[id], ok = chosen === it.ans;
      if (ok) got++;
      card.classList.remove('ok', 'bad', 'blank');
      card.classList.add(ok ? 'ok' : chosen ? 'bad' : 'blank');
      $$('label[data-l]', card).forEach((l) => {
        const L = l.dataset.l;
        l.classList.toggle('is-correct', L === it.ans);
        l.classList.toggle('is-wrong', L === chosen && !ok);
        l.querySelector('input').disabled = true;
      });
      const w = $('.why', card);
      if (w) { w.hidden = false; w.innerHTML = (ok ? '✓ Верно. ' : chosen ? '✗ Правильный ответ: <b>' + it.ans + '</b>. ' : '○ Нет ответа. Правильный: <b>' + it.ans + '</b>. ') + (it.why || ''); }
      if (refreshers[id]) refreshers[id]();
    });
    S.score[part] = [got, items.length];
    S.checked[part] = true;
  }

  function resetPart(part) {
    const [a, b] = QRANGE[part];
    for (let n = a; n <= b; n++) delete S.a['q' + n];
    delete S.score[part]; delete S.checked[part];
    save(); mount(part); updateProgress();
  }

  function bottomBar(part, grade) {
    const out = h('div', { class: 'score', role: 'status', 'aria-live': 'polite' });
    const show = () => {
      const s = S.score[part];
      out.textContent = s ? 'Результат: ' + s[0] + ' из ' + s[1] : '';
      out.className = 'score' + (s ? (s[0] / s[1] >= 0.7 ? ' good' : ' mid') : '');
    };
    const check = h('button', { class: 'btn primary', type: 'button', onclick: () => { grade(); show(); save(); updateProgress(); const f = $('.score', $('#p-' + part)); if (f) f.scrollIntoView({ block: 'center', behavior: 'smooth' }); } }, 'Проверить ответы');
    const rst = twoClick('Сбросить часть', 'Нажми ещё раз — ответы сотрутся', () => resetPart(part));
    show();
    return h('div', { class: 'bar' }, check, rst, out);
  }

  function qCard(it, visual, opts) {
    const id = 'q' + it.n;
    const card = h('article', { class: 'q', id: 'card-' + id });
    card.append(h('div', { class: 'qn' }, it.n), h('div', { class: 'qlab' }, 'Question ' + it.n));
    const right = h('div', { class: 'qright' });
    if (it.q) right.append(h('p', { class: 'qtext' }, it.q));
    right.append(optionList(id, it.opts, it.boxes ? 'boxes' : ''));
    const body = h('div', { class: 'qbody' + (visual ? '' : ' solo') });
    if (visual) body.append(h('div', { class: 'stim-wrap' }, visual));
    body.append(right);
    card.append(body, h('p', { class: 'why', hidden: true }));
    return card;
  }

  /* ---------- Reading 1 ---------- */
  function stim(it) {
    if (it.kind === 'notice') return h('div', { class: 'notice' }, h('div', { class: 'tape' }), h('h4', null, it.title), it.lines.map((l) => h('p', null, l)));
    if (it.kind === 'sms') return h('div', { class: 'phone' }, h('div', { class: 'bubble' }, it.lines.map((l) => h('p', null, l)), h('p', { class: 'sig' }, it.from)));
    return h('div', { class: 'mail' },
      h('div', { class: 'mh' }, h('div', null, h('b', null, 'From: '), it.from), h('div', null, h('b', null, 'To: '), it.to), h('div', null, h('b', null, 'Subject: '), it.subject)),
      h('div', { class: 'mb' }, it.lines.map((l) => h('p', null, l))));
  }
  function renderR1() {
    const d = R.p1, root = h('div');
    root.append(partHead('Reading · Part 1', 'Notices, messages and emails', d.rubric, 'Спрашивай себя: «Зачем это написано?» Слова из текста в неправильных вариантах — частая ловушка.'));
    const list = h('div', { class: 'qlist' });
    d.items.forEach((it) => list.append(qCard(it, stim(it))));
    root.append(list);
    if (S.checked.r1) defer(() => gradeChoice('r1', d.items));
    root.append(bottomBar('r1', () => gradeChoice('r1', d.items)));
    return root;
  }

  /* ---------- Reading 2 ---------- */
  function renderR2() {
    const d = R.p2, root = h('div');
    root.append(partHead('Reading · Part 2', d.title, d.rubric, 'Подчеркни в описании человека 2–3 ключевых требования. Потом ищи текст, где подходят ВСЕ требования, а не одно.'));
    root.append(h('p', { class: 'qtext' }, d.intro));
    const people = h('div', { class: 'qlist' });
    const colors = ['#1A5C52', '#C9672F', '#6B7F1B', '#2A5240', '#A8531D'];
    d.people.forEach((p, i) => {
      const card = h('article', { class: 'q people', id: 'card-q' + p.n });
      card.append(
        h('div', { class: 'person-top' }, h('div', { class: 'qn' }, p.n), h('div', { class: 'av', style: 'background:' + colors[i % 5] }, p.name[0]),
          h('div', null, h('div', { class: 'qlab' }, 'Question ' + p.n + ' · ' + p.name), h('p', { style: 'margin:.2em 0 0;font-size:1.05rem' }, p.text))),
        chipRow('q' + p.n, 'ABCDEFGH'.split('')), h('p', { class: 'why', hidden: true }));
      people.append(card);
    });
    const texts = h('div', { class: 'txts' });
    d.texts.forEach((t) => texts.append(h('div', { class: 'txt-card' }, h('span', { class: 'ltr' }, t.L), h('div', null, h('h4', null, t.title), h('p', null, t.text)))));
    root.append(h('div', { class: 'two' },
      h('div', null, people),
      h('div', { class: 'sticky reverse-m' }, h('div', { class: 'card' }, h('h3', null, d.listTitle), texts))));
    if (S.checked.r2) defer(() => gradeChoice('r2', d.people));
    root.append(bottomBar('r2', () => gradeChoice('r2', d.people)));
    return root;
  }

  /* ---------- Reading 3 ---------- */
  function renderR3() {
    const d = R.p3, root = h('div');
    root.append(partHead('Reading · Part 3', 'A longer text', d.rubric, 'Вопросы идут по порядку текста. Ищи ПЕРЕФРАЗ, а не те же слова.'));
    const art = h('div', { class: 'card article' }, h('h3', null, d.title), h('p', { class: 'by' }, d.intro), d.paras.map((p) => h('p', null, p)));
    const qs = h('div', { class: 'qlist' });
    d.qs.forEach((q) => qs.append(qCard(q, null)));
    root.append(h('div', { class: 'two' }, h('div', { class: 'sticky' }, art), qs));
    if (S.checked.r3) defer(() => gradeChoice('r3', d.qs));
    root.append(bottomBar('r3', () => gradeChoice('r3', d.qs)));
    return root;
  }

  /* ---------- Reading 4 ---------- */
  function renderR4() {
    const d = R.p4, root = h('div');
    root.append(partHead('Reading · Part 4', 'Missing sentences', d.rubric, 'Смотри на слова-связки: it, they, that, this, then, However, As a result — и на то, о ком/чём речь до и после пропуска. Выбранное предложение сразу появляется в тексте.'));
    const art = h('div', { class: 'card article' }, h('h3', null, d.title));
    d.paras.forEach((p) => {
      const para = h('p');
      p.forEach((seg) => para.append(typeof seg === 'number' ? h('span', { class: 'gap', id: 'gap-' + seg }) : seg));
      art.append(para);
    });
    const sent = h('div', { class: 'card' }, h('h3', null, 'Sentences'), h('div', { class: 'sentences' },
      d.sentences.map(([L, t]) => h('div', { class: 'sent', id: 'sent-' + L }, h('span', { class: 'ltr' }, L), h('span', null, t)))));
    const rows = h('div', { class: 'gaprows' });
    const items = Object.keys(d.keys).map(Number).sort((a, b) => a - b).map((n) => ({ n, ans: d.keys[n], why: d.why[n] }));
    items.forEach((it) => {
      const card = h('article', { class: 'q mini', id: 'card-q' + it.n }, h('div', { class: 'qn' }, it.n), h('div', { class: 'qlab' }, 'Question ' + it.n + ' — choose the sentence for gap ' + it.n), chipRow('q' + it.n, 'ABCDEFGH'.split('')), h('p', { class: 'why', hidden: true }));
      rows.append(card);
      refreshers['q' + it.n] = () => refreshGap4(d, it);
    });
    root.append(h('div', { class: 'two' }, h('div', null, art, rows), h('div', { class: 'sticky reverse-m' }, sent)));
    defer(() => { items.forEach((it) => refreshGap4(d, it)); if (S.checked.r4) gradeChoice('r4', items); });
    root.append(bottomBar('r4', () => gradeChoice('r4', items)));
    return root;
  }
  function refreshGap4(d, it) {
    const el = $('#gap-' + it.n); if (!el) return;
    const L = S.a['q' + it.n];
    const txt = L ? (d.sentences.find((s) => s[0] === L) || [0, ''])[1] : '';
    const done = S.checked.r4;
    el.className = 'gap' + (L ? ' filled' : '') + (done ? (L === it.ans ? ' ok' : ' bad') : '');
    el.textContent = '';
    el.append(h('span', { class: 'gn' }, it.n), ' ' + (L ? txt : '…………………'));
    if (done && L !== it.ans) el.append(h('span', { class: 'fix' }, '→ ' + it.ans));
    d.sentences.forEach(([X]) => { const used = Object.keys(d.keys).some((k) => S.a['q' + k] === X); const s = $('#sent-' + X); if (s) s.classList.toggle('used', used); });
  }

  /* ---------- Reading 5 ---------- */
  function renderR5() {
    const d = R.p5, root = h('div');
    root.append(partHead('Reading · Part 5', 'Choose the right word', d.rubric, 'Читай предложение ЦЕЛИКОМ. Проверяй: предлоги, устойчивые сочетания (collocations), что стоит после пропуска.'));
    const art = h('div', { class: 'card article' }, h('h3', null, d.title));
    d.paras.forEach((p) => {
      const para = h('p');
      p.forEach((seg) => para.append(typeof seg === 'number' ? h('span', { class: 'gap', id: 'gap-' + seg }) : seg));
      art.append(para);
    });
    const qs = h('div', { class: 'qlist' });
    d.qs.forEach((q) => {
      qs.append(qCard({ n: q.n, opts: q.opts, ans: q.ans, why: q.why }, null));
      refreshers['q' + q.n] = () => refreshGap5(d, q);
    });
    root.append(h('div', { class: 'two' }, h('div', { class: 'sticky' }, art), qs));
    defer(() => { d.qs.forEach((q) => refreshGap5(d, q)); if (S.checked.r5) gradeChoice('r5', d.qs); });
    root.append(bottomBar('r5', () => gradeChoice('r5', d.qs)));
    return root;
  }
  function refreshGap5(d, q) {
    const el = $('#gap-' + q.n); if (!el) return;
    const L = S.a['q' + q.n], done = S.checked.r5;
    const word = L ? q.opts.find((o) => o[0] === L)[1] : '';
    el.className = 'gap' + (L ? ' filled' : '') + (done ? (L === q.ans ? ' ok' : ' bad') : '');
    el.textContent = ''; el.append(h('span', { class: 'gn' }, q.n), ' ' + (L ? word : '_______'));
    if (done && L !== q.ans) el.append(h('span', { class: 'fix' }, '→ ' + q.opts.find((o) => o[0] === q.ans)[1]));
  }

  /* ---------- Reading 6 ---------- */
  function renderR6() {
    const d = R.p6, root = h('div');
    root.append(partHead('Reading · Part 6', 'Write one word', d.rubric, 'Это грамматическое слово: предлог, артикль, местоимение, вспомогательный глагол, связка. Пиши ТОЛЬКО одно слово.'));
    const art = h('div', { class: 'card article' }, h('h3', null, d.title));
    d.paras.forEach((p) => {
      const para = h('p');
      p.forEach((seg) => {
        if (typeof seg === 'number') {
          const inp = h('input', { class: 'gapin', type: 'text', 'aria-label': 'Question ' + seg, autocomplete: 'off', autocapitalize: 'off', spellcheck: 'false', id: 'in-' + seg });
          inp.value = S.a['q' + seg] || '';
          inp.addEventListener('input', () => { S.a['q' + seg] = inp.value; save(); updateProgress(); });
          para.append(h('span', { class: 'gwrap' }, h('span', { class: 'gbadge' }, seg), inp));
        } else para.append(seg);
      });
      art.append(para);
    });
    const items = d.qs;
    const why = h('div', { class: 'whylist' });
    root.append(art, why);
    const grade = () => {
      let got = 0; why.textContent = '';
      items.forEach((q) => {
        const inp = $('#in-' + q.n), val = (S.a['q' + q.n] || '').trim().toLowerCase();
        const ok = q.accept.includes(val); if (ok) got++;
        inp.classList.remove('ok', 'bad'); inp.classList.add(ok ? 'ok' : 'bad'); inp.disabled = true;
        const prev = inp.nextElementSibling; if (prev && prev.classList.contains('fixword')) prev.remove();
        if (!ok) inp.after(h('span', { class: 'fixword' }, '→ ' + q.accept[0]));
        why.append(h('p', { class: 'why', html: (ok ? '✓ <b>' + q.n + '</b>. ' : '✗ <b>' + q.n + '</b> (правильно: <b>' + q.accept.join(' / ') + '</b>). ') + q.why }));
      });
      S.score.r6 = [got, items.length]; S.checked.r6 = true;
    };
    if (S.checked.r6) defer(grade);
    root.append(bottomBar('r6', grade));
    return root;
  }

  /* ---------- Writing ---------- */
  function writeBlock(id, checklist, model, minW) {
    const ta = h('textarea', { class: 'wt', placeholder: 'Напиши ответ здесь…', spellcheck: 'false', 'aria-label': 'Your answer' });
    ta.value = S.w[id] || '';
    const num = h('span', { class: 'wnum' }, '0'), tag = h('span', { class: 'wtag' }, '');
    const upd = () => {
      const n = wc(ta.value); num.textContent = n + ' слов';
      tag.className = 'wtag' + (n >= 90 && n <= 120 ? ' ok' : n > 0 ? ' warn' : '');
      tag.textContent = n === 0 ? 'цель: ≈100' : n < 90 ? 'ещё ' + (90 - n) + ' до минимума' : n <= 120 ? 'отлично ✓' : 'многовато, сократи';
    };
    ta.addEventListener('input', () => { S.w[id] = ta.value; upd(); save(); });
    upd();
    const list = h('div', { class: 'chk' });
    checklist.forEach((t, i) => {
      const cb = h('input', { type: 'checkbox' }); cb.checked = !!S.chk[id + i];
      cb.addEventListener('change', () => { S.chk[id + i] = cb.checked; save(); });
      list.append(h('label', null, cb, h('span', null, t)));
    });
    const modelEl = h('div', { class: 'model', hidden: true }, h('h4', null, 'Образец ≈ ' + wc(model) + ' слов'), model.split('\n').map((p) => h('p', null, p)));
    const tgl = h('button', { class: 'btn ghost small', type: 'button', onclick: () => { modelEl.hidden = !modelEl.hidden; tgl.textContent = modelEl.hidden ? 'Показать образец' : 'Скрыть образец'; } }, 'Показать образец');
    const cp = h('button', { class: 'btn lime small', type: 'button', onclick: () => { copyText(ta.value); cp.textContent = 'Скопировано ✓'; setTimeout(() => (cp.textContent = 'Скопировать мой текст'), 1800); } }, 'Скопировать мой текст');
    return h('div', null, ta, h('div', { class: 'wcount' }, num, tag), h('h4', null, 'Самопроверка'), list, h('div', { class: 'row' }, tgl, cp), modelEl);
  }
  function renderW() {
    const d = T.writing, root = h('div');
    root.append(partHead('Writing · 45 minutes', 'Writing', 'Part 1 is compulsory. In Part 2 you choose one question.', 'Сначала план (2 мин), потом текст (≈15 мин), в конце проверка (3 мин). Для таймера выбери «Writing task — 20 min» вверху.'));
    const sub = h('div', { class: 'subnav', role: 'tablist' });
    const b1 = h('button', { class: 'pill', role: 'tab', 'aria-selected': 'true', type: 'button' }, 'Part 1 · Email');
    const b2 = h('button', { class: 'pill', role: 'tab', 'aria-selected': 'false', type: 'button' }, 'Part 2 · Article or Story');
    sub.append(b1, b2);
    const box = h('div');
    const w1 = d.w1;
    const emailEl = h('div', { class: 'card' },
      h('p', { class: 'rubric', style: 'color:var(--ink);border-color:var(--or)' }, w1.rubric),
      h('h3', null, 'Question 1'), h('p', { class: 'qtext' }, w1.intro),
      h('div', { class: 'emailbox' }, h('div', { class: 'eh' }, h('div', null, h('b', null, 'From: '), w1.email.from), h('div', null, h('b', null, 'Subject: '), w1.email.subject)),
        h('div', { class: 'eb' }, w1.email.paras.map((p) => h('div', { class: 'erow' }, h('p', null, p.t), p.note ? h('div', { class: 'note' }, p.note) : h('span'))))),
      h('p', { class: 'qtext', style: 'margin-top:16px' }, w1.task, ' Use ', h('b', null, 'all the notes'), '.'));
    const p1 = h('div', { class: 'two' }, h('div', { class: 'sticky' }, emailEl), h('div', null, h('h3', null, 'Your email'), writeBlock('w1', w1.checklist, w1.model)));
    // part 2
    const w2 = d.w2; let which = S.w.pick || 'q2';
    const p2 = h('div'); const q2b = h('button', { class: 'pill', type: 'button' }, 'Question 2 · Article'), q3b = h('button', { class: 'pill', type: 'button' }, 'Question 3 · Story');
    const q2c = h('div'), q3c = h('div');
    const q2card = h('div', { class: 'card' }, h('p', { class: 'rubric', style: 'color:var(--ink);border-color:var(--or)' }, w2.rubric), h('h3', null, 'Question 2'), h('p', { class: 'qtext' }, 'You see this announcement in an English-language magazine.'),
      h('div', { class: 'adbox' }, h('div', { class: 'ah' }, w2.q2.head), h('div', { class: 'ab' }, h('h4', null, w2.q2.title), w2.q2.lines.map((l) => h('p', null, l)), h('p', { style: 'font-weight:700' }, w2.q2.foot))), h('p', { class: 'qtext' }, 'Write your ', h('b', null, 'article'), '.'));
    const q3card = h('div', { class: 'card' }, h('p', { class: 'rubric', style: 'color:var(--ink);border-color:var(--or)' }, w2.rubric), h('h3', null, 'Question 3'), h('p', { class: 'qtext' }, w2.q3.text), h('div', { class: 'firstline' }, w2.q3.first), h('p', { class: 'qtext' }, 'Write your ', h('b', null, 'story'), '.'));
    q2c.append(h('div', { class: 'two' }, h('div', { class: 'sticky' }, q2card), h('div', null, h('h3', null, 'Your article'), writeBlock('w2a', w2.q2.checklist, w2.q2.model))));
    q3c.append(h('div', { class: 'two' }, h('div', { class: 'sticky' }, q3card), h('div', null, h('h3', null, 'Your story'), writeBlock('w2b', w2.q3.checklist, w2.q3.model))));
    const setWhich = (w) => { which = w; S.w.pick = w; save(); q2b.setAttribute('aria-selected', w === 'q2'); q3b.setAttribute('aria-selected', w === 'q3'); q2c.hidden = w !== 'q2'; q3c.hidden = w !== 'q3'; };
    q2b.onclick = () => setWhich('q2'); q3b.onclick = () => setWhich('q3');
    p2.append(h('div', { class: 'subnav' }, q2b, q3b), q2c, q3c); setWhich(which);
    const show = (n) => { b1.setAttribute('aria-selected', n === 1); b2.setAttribute('aria-selected', n === 2); box.textContent = ''; box.append(n === 1 ? p1 : p2); };
    b1.onclick = () => show(1); b2.onclick = () => show(2);
    root.append(sub, box); show(1);
    return root;
  }

  /* ---------- Speaking ---------- */
  const LANG = [
    ['📷 Describing a photo', ['<em>In the foreground</em> / <em>in the background</em> I can see…', '<em>On the left / on the right / in the middle</em> there is / there are…', 'The man <em>is wearing…</em> and <em>is holding…</em>', 'It looks like a… / It seems to be a…', 'It is probably summer, because…']],
    ['🤔 Speculating', ['They <em>might / may / could</em> be… (possible)', 'She <em>must be</em> tired. / He <em>can’t be</em> a student. (sure)', 'I’d say… / I guess… / Perhaps… / Probably…', 'It looks as if they are… / They look as if they’re…', 'I can’t see clearly, but I think…']],
    ['💬 Giving opinions (Part 4)', ['In my opinion… / Personally, I think…', 'I agree with you because… / I see what you mean, but…', 'On the one hand… on the other hand…', 'For example… / For instance… / Let me give you an example.', 'What about you? / Do you agree?']],
    ['🧠 Buying time & keeping going', ['That’s an interesting question… Let me think.', 'Well, … / Actually, … / To be honest, …', 'What I mean is… / In other words…', 'I’m not sure how to say it, but it’s something like…', 'Sorry, could you repeat that, please?']],
    ['🎯 Part 1: expand your answer', ['Answer + <em>because</em> + example (3 sentences minimum)', 'I usually… but last week I…', 'When I was younger, I… but now I…', 'I’d really like to… in the future, because…', 'The best thing about… is… / What I like most is…']]
  ];

  function deck(items, opts) {
    // items: [{q, more, ideas}]
    let i = 0, order = items.map((_, k) => k);
    const wrap = h('div');
    const who = h('span', { class: 'who' }), cnt = h('span', { class: 'cnt' }), bq = h('div', { class: 'bigq' });
    const ideas = h('div', { class: 'ideas' }), more = h('div', { class: 'more', hidden: true });
    const moreBtn = h('button', { class: 'btn small', type: 'button', onclick: () => { more.hidden = !more.hidden; } }, 'Follow-up question');
    const prev = h('button', { class: 'btn small', type: 'button', onclick: () => go(-1) }, '← Назад');
    const next = h('button', { class: 'btn lime small', type: 'button', onclick: () => go(1) }, 'Дальше →');
    const shuf = h('button', { class: 'btn small', type: 'button', onclick: () => { order = order.map((o) => [Math.random(), o]).sort((a, b) => a[0] - b[0]).map((x) => x[1]); i = 0; draw(); } }, '🔀 Перемешать');
    const dk = h('div', { class: 'deck' }, who, cnt, bq, ideas, more, h('div', { class: 'row' }, prev, next, moreBtn, shuf));
    function go(d) { i = (i + d + items.length) % items.length; draw(); }
    function draw() {
      const it = items[order[i]];
      who.textContent = opts.addressee ? 'Question for: ' + NAMES[i % 2] : opts.label;
      cnt.textContent = (i + 1) + ' / ' + items.length;
      bq.textContent = '';
      bq.append(h('span', { class: 'bqn' }, 'Question ' + (i + 1)), h('span', null, it.q));
      ideas.textContent = ''; if (it.ideas) { ideas.append(h('span', { class: 'note-sm', style: 'color:#CFE0D6;align-self:center' }, 'Think about:'), ...it.ideas.map((x) => h('span', { class: 'idea' }, x))); }
      more.hidden = true; more.textContent = ''; if (it.more) { more.append(h('b', null, 'Follow-up: '), it.more); moreBtn.hidden = false; } else moreBtn.hidden = true;
    }
    draw();
    const all = h('details', { class: 'qall' }, h('summary', null, 'Показать все вопросы списком'), h('ol', null, items.map((it) => h('li', null, it.q, it.more ? h('div', { class: 'note-sm' }, '↳ ' + it.more) : null))));
    wrap.append(dk, all);
    return wrap;
  }

  function miniTimer(sec) {
    let left = sec, run = false, iv = null;
    const disp = h('span', { class: 'tdisp' }, fmt(left));
    const box = h('div', { class: 'mt' });
    const go = h('button', { class: 'tbtn', type: 'button' }, 'Старт');
    const rs = h('button', { class: 'tbtn sec', type: 'button' }, 'Сброс');
    function stop() { run = false; clearInterval(iv); go.textContent = left === 0 ? 'Старт' : 'Продолжить'; }
    go.onclick = () => {
      if (run) { stop(); return; }
      if (left === 0) left = sec;
      run = true; go.textContent = 'Пауза';
      iv = setInterval(() => {
        left--; disp.textContent = fmt(left);
        box.classList.toggle('low', left <= 10 && left > 0);
        if (left <= 0) { stop(); box.classList.add('end'); chime(); }
      }, 1000);
    };
    rs.onclick = () => { stop(); left = sec; disp.textContent = fmt(left); box.className = 'mt'; go.textContent = 'Старт'; };
    box.append(h('span', null, '⏱'), disp, go, rs);
    return box;
  }

  function photoCard(who, ph, num) {
    const modelEl = h('div', { class: 'model', hidden: true }, h('h4', null, 'Образец ответа (прочитай ПОСЛЕ того, как поговорил)'), h('p', null, ph.model));
    const tgl = h('button', { class: 'btn ghost small', type: 'button', onclick: () => { modelEl.hidden = !modelEl.hidden; tgl.textContent = modelEl.hidden ? 'Показать образец' : 'Скрыть образец'; } }, 'Показать образец');
    const key = String(ph.img || '').split('/').pop().replace(/\.\w+$/, '');
    const src = (window.PET_IMG && window.PET_IMG[key]) || ph.img;
    const img = h('img', { src, alt: ph.alt });
    const pimg = h('div', { class: 'pimg', onclick: () => openPhoto(src, ph.alt), role: 'button', tabindex: '0', 'aria-label': 'Увеличить фото', onkeydown: (e) => { if (e.key === 'Enter') openPhoto(src, ph.alt); } }, img, h('span', { class: 'zoom' }, '🔍 увеличить'));
    img.addEventListener('error', () => { pimg.className = 'pimg nophoto'; pimg.onclick = null; pimg.removeAttribute('role'); pimg.textContent = ''; pimg.append(h('div', { class: 'noph' }, '📷 Photo: ' + ph.alt)); });
    return h('div', { class: 'pcard' },
      h('div', { class: 'phead2' }, h('b', null, who), h('span', null, 'Photo ' + num)),
      pimg,
      h('div', { class: 'pbody' },
        h('p', { class: 'tl' }, 'Talk about your photo for about one minute. Say:'),
        h('ul', null, ph.prompts.map((p) => h('li', null, p))),
        miniTimer(60),
        h('div', { class: 'ask' }, h('b', null, 'Then the partner is asked: '), ph.ask),
        tgl, modelEl));
  }
  function openPhoto(src, alt) {
    let lb = $('#lb');
    if (!lb) { lb = h('div', { class: 'lb', id: 'lb', hidden: true, onclick: () => (lb.hidden = true) }, h('img', { alt: '' })); document.body.append(lb); document.addEventListener('keydown', (e) => { if (e.key === 'Escape') lb.hidden = true; }); }
    $('img', lb).src = src; $('img', lb).alt = alt || ''; lb.hidden = false;
  }

  const PH_COLLAB = ['How about…?', 'What do you think about…?', 'I think … would be better because…', 'That’s a good idea, but…', 'I’m not sure that…', 'Shall we choose…?', 'Let’s decide on…', 'I agree / I see what you mean, but…', 'It depends on… / It would be more…than…'];
  function collab(c, k) {
    const root = h('div', { class: 'collab' });
    const opts = h('div', { class: 'cgrid' }, c.options.map((o, i) => h('div', { class: 'copt' }, h('span', { class: 'cnum' }, i + 1), h('span', { class: 'cico', 'aria-hidden': 'true' }, o.icon), h('span', { class: 'clabel' }, o.label))));
    const modelAsk = h('div', { class: 'examiner' },
      h('h4', null, 'Examiner’s instructions · Step 1 (about 2 minutes)'),
      h('p', null, '“I’m going to describe a situation to you.”'),
      h('p', { class: 'cbig' }, c.scenario),
      h('p', null, '“' + c.task + '”'),
      miniTimer(120));
    const step2 = h('div', { class: 'examiner s2' },
      h('h4', null, 'Step 2 (about 1 minute)'),
      h('p', null, '“Now decide together which one would be the best.”'),
      miniTimer(60));
    const asks = h('div', { class: 'examiner s3' }, h('h4', null, 'Follow-up questions (Part 3 → Part 4 link)'),
      h('ol', null, c.ask.map((q) => h('li', null, q))));
    const phr = h('div', { class: 'card' }, h('h4', null, '💬 Useful phrases'), h('div', { class: 'ideas dark' }, PH_COLLAB.map((x) => h('span', { class: 'idea2' }, x))));
    root.append(h('div', { class: 'cscen' }, h('div', { class: 'ckick' }, 'Part 3 · Task ' + (k + 1) + ' · ' + c.title), h('p', { class: 'cbig' }, c.scenario)), opts, h('div', { class: 'cols2' }, h('div', null, modelAsk, step2), h('div', null, asks, phr)));
    return root;
  }

  function renderS() {
    const sp = T.speaking, root = h('div');
    root.append(partHead('Speaking · about 12 minutes', 'Speaking', 'Parts 1, 3 and 4 — работаете в паре: ' + NAMES.join(' и ') + '.', 'Part 3 — вы обсуждаете варианты ВМЕСТЕ и вдвоём принимаете решение (не два монолога). Отвечай развёрнуто: ответ + причина + пример.'));
    const sub = h('div', { class: 'subnav', role: 'tablist' }), box = h('div');
    const secs = [
      ['Part 1 · Interview', () => h('div', null, h('p', { class: 'qtext' }, 'Part 1 — personal questions (2–3 min). Вопросы по очереди: сначала ' + NAMES[0] + ', потом ' + NAMES[1] + '. Нажми «Follow-up», чтобы получить дополнительный вопрос.'), deck(sp.p1, { addressee: true }))],
      ['Part 3 · Discuss & decide', () => {
        const wrap = h('div'); const cs = sp.collab;
        const rsub = h('div', { class: 'subnav' }), rbox = h('div');
        const showC = (k) => { $$('button', rsub).forEach((b, j) => b.setAttribute('aria-selected', j === k)); rbox.textContent = ''; rbox.append(collab(cs[k], k)); };
        cs.forEach((c, k) => rsub.append(h('button', { class: 'pill', type: 'button', 'aria-selected': 'false', onclick: () => showC(k) }, 'Task ' + (k + 1) + ' · ' + c.theme)));
        wrap.append(h('p', { class: 'qtext' }, 'Part 3 — collaborative task (2–3 min). Обсудите варианты вместе, потом решите, какой лучший. Варианты ниже заменяют картинки.'), rsub, rbox); showC(0); return wrap;
      }],
      ['Photos (bonus)', () => {
        const wrap = h('div'); const rs = sp.rounds;
        const rsub = h('div', { class: 'subnav' }), rbox = h('div');
        const showR = (k) => { $$('button', rsub).forEach((b, j) => b.setAttribute('aria-selected', j === k)); rbox.textContent = ''; const r = rs[k]; rbox.append(h('p', { class: 'qtext' }, 'Round ' + (k + 1) + ' · Topic: ' + r.theme + '. Look at your photo and describe it. The other student listens.'), h('div', { class: 'photos' }, photoCard(NAMES[0], r.A, 'A'), photoCard(NAMES[1], r.B, 'B'))); };
        rs.forEach((r, k) => rsub.append(h('button', { class: 'pill', type: 'button', 'aria-selected': 'false', onclick: () => showR(k) }, 'Round ' + (k + 1) + ' · ' + r.theme)));
        wrap.append(rsub, rbox); showR(0); return wrap;
      }],
      ['Part 4 · Discussion', () => {
        const wrap = h('div'); const rs = sp.rounds;
        const rsub = h('div', { class: 'subnav' }), rbox = h('div');
        const showR = (k) => { $$('button', rsub).forEach((b, j) => b.setAttribute('aria-selected', j === k)); rbox.textContent = ''; rbox.append(h('p', { class: 'qtext' }, 'Part 4 — discuss together (about 3 min). Topic: ' + rs[k].theme + '. Отвечайте по очереди и задавайте друг другу встречные вопросы: “What about you?”'), miniTimer(180), deck(rs[k].p4, { label: 'Discuss together' })); };
        rs.forEach((r, k) => rsub.append(h('button', { class: 'pill', type: 'button', 'aria-selected': 'false', onclick: () => showR(k) }, 'Round ' + (k + 1) + ' · ' + r.theme)));
        wrap.append(rsub, rbox); showR(0); return wrap;
      }],
      ['Language bank', () => h('div', { class: 'lang' }, LANG.map(([t, items]) => h('div', { class: 'card' }, h('h4', null, t), h('ul', null, items.map((x) => h('li', { html: x }))))))],
      ['Самооценка', () => selfCheck()]
    ];
    const show = (k) => { $$('button', sub).forEach((b, j) => b.setAttribute('aria-selected', j === k)); box.textContent = ''; box.append(secs[k][1]()); };
    secs.forEach((s, k) => sub.append(h('button', { class: 'pill', type: 'button', role: 'tab', 'aria-selected': 'false', onclick: () => show(k) }, s[0])));
    root.append(sub, box); show(0);
    return root;
  }
  function selfCheck() {
    const crit = ['Grammar & vocabulary — грамматика и лексика', 'Discourse — связность, развёрнутость, связки', 'Pronunciation — произношение и интонация', 'Interaction — диалог с партнёром'];
    const t = h('table', { class: 'selft' }, h('thead', null, h('tr', null, h('th', null, 'Критерий (1 — слабо, 5 — отлично)'), NAMES.map((n) => h('th', null, n)))));
    const tb = h('tbody');
    crit.forEach((c, ci) => {
      const tr = h('tr', null, h('td', null, c));
      NAMES.forEach((n, ni) => {
        const key = ni + '-' + ci, r = h('div', { class: 'rate', role: 'radiogroup' });
        for (let v = 1; v <= 5; v++) {
          const inp = h('input', { type: 'radio', name: 'sc' + key, value: v }); if (S.sp.self[key] === v) inp.checked = true;
          inp.addEventListener('change', () => { S.sp.self[key] = v; save(); });
          r.append(h('label', null, inp, String(v)));
        }
        tr.append(h('td', { dataset: { label: n } }, r));
      });
      tb.append(tr);
    });
    t.append(tb);
    return h('div', null, h('p', { class: 'qtext' }, 'После Speaking оцените себя и друг друга честно — это помогает увидеть, что тренировать.'), t, h('p', { class: 'note-sm', style: 'margin-top:12px' }, 'Оценки сохраняются в браузере и попадают в «Итог».'));
  }

  /* ---------- Results ---------- */
  function copyText(txt) {
    const fallback = () => {
      const ta = h('textarea', { style: 'position:fixed;opacity:0;left:0;top:0' }); ta.value = txt; document.body.append(ta); ta.focus(); ta.select();
      try { document.execCommand('copy'); } catch (e2) {} ta.remove();
    };
    try {
      if (navigator.clipboard && navigator.clipboard.writeText) navigator.clipboard.writeText(txt).catch(fallback); else fallback();
    } catch (e) { fallback(); }
  }
  function totals() {
    let got = 0, max = 0; const rows = [];
    Object.keys(MAX).forEach((p) => { const s = S.score[p]; rows.push([p, s ? s[0] : null, MAX[p]]); if (s) { got += s[0]; } max += MAX[p]; });
    return { got, max, rows };
  }
  function summaryText() {
    const t = totals(), n = (S.name || '').trim() || '(без имени)';
    const lines = ['Target English · ' + T.title, 'Имя: ' + n, ''];
    t.rows.forEach(([p, g, m]) => lines.push('Reading ' + p.slice(1) + ': ' + (g == null ? '—' : g + '/' + m)));
    lines.push('Reading итого: ' + t.got + '/' + t.max, '');
    lines.push('Writing Part 1: ' + wc(S.w.w1 || '') + ' слов');
    lines.push('Writing Part 2 (' + (S.w.pick === 'q3' ? 'story' : 'article') + '): ' + wc(S.w[S.w.pick === 'q3' ? 'w2b' : 'w2a'] || '') + ' слов');
    const vals = Object.values(S.sp.self); if (vals.length) lines.push('Speaking, самооценка (среднее): ' + (vals.reduce((a, b) => a + b, 0) / vals.length).toFixed(1) + ' / 5');
    return lines.join('\n');
  }
  function renderRes() {
    const t = totals(), root = h('div');
    root.append(partHead('Results', 'Итог теста', 'Reading проверяется автоматически. Writing и Speaking оцениваются по самопроверке и вместе с преподавателем.', null));
    const pct = t.max ? Math.round((t.got / t.max) * 100) : 0;
    const nameIn = h('input', { class: 'namein', type: 'text', placeholder: 'Твоё имя', value: S.name || '', 'aria-label': 'Имя' });
    nameIn.addEventListener('input', () => { S.name = nameIn.value; save(); });
    const tbl = h('table', { class: 'rtable' }, h('thead', null, h('tr', null, h('th', null, 'Часть'), h('th', null, 'Баллы'), h('th', null, ''))));
    const tb = h('tbody');
    t.rows.forEach(([p, g, m]) => tb.append(h('tr', null, h('td', null, 'Reading Part ' + p.slice(1)), h('td', { class: 'n' }, g == null ? '— / ' + m : g + ' / ' + m), h('td', null, h('div', { class: 'meter' }, h('i', { style: 'width:' + (g == null ? 0 : Math.round(g / m * 100)) + '%' }))))));
    tb.append(h('tr', null, h('td', null, h('b', null, 'Reading — всего')), h('td', { class: 'n' }, t.got + ' / ' + t.max + ' (' + pct + '%)'), h('td', null, h('div', { class: 'meter' }, h('i', { style: 'width:' + pct + '%' })))));
    tbl.append(tb);
    const w1 = wc(S.w.w1 || ''), w2 = wc(S.w[S.w.pick === 'q3' ? 'w2b' : 'w2a'] || '');
    const verdict = pct >= 75 ? 'Сильный результат! Это уровень уверенного PET (B1). Усиль Writing и Speaking.' : pct >= 55 ? 'Хороший ход. Разбери ошибки по частям — особенно Part 4–6 — и пройди второй тест.' : t.rows.some((r) => r[1] != null) ? 'Есть над чем поработать. Перечитай объяснения к ошибкам и повтори тест через несколько дней.' : 'Сначала пройди части Reading и нажми «Проверить ответы» в каждой.';
    root.append(h('div', { class: 'card' },
      h('div', { class: 'row' }, nameIn), tbl,
      h('div', { class: 'verdict' }, verdict),
      h('p', null, 'Writing: Part 1 — ', h('b', null, w1 + ' слов'), ' · Part 2 — ', h('b', null, w2 + ' слов'), '. Speaking: самооценка заполняется в разделе Speaking.'),
      h('div', { class: 'row' },
        h('button', { class: 'btn primary', type: 'button', onclick: (e) => { copyText(summaryText()); e.target.textContent = 'Скопировано ✓ — отправь преподавателю'; } }, 'Скопировать результат'),
        twoClick('Начать тест заново', 'Нажми ещё раз — сотрутся ВСЕ ответы', () => { wiped = true; clearTimeout(saveT); try { localStorage.removeItem(KEY); } catch (e) {} try { history.replaceState(null, '', location.pathname); } catch (e) {} location.reload(); }))));
    return root;
  }

  /* ---------- shell ---------- */
  const RENDER = { r1: renderR1, r2: renderR2, r3: renderR3, r4: renderR4, r5: renderR5, r6: renderR6, w: renderW, s: renderS, res: renderRes };
  /* Restoring saved/checked state needs the nodes to be in the document, so it is deferred until after append. */
  let later = [];
  function defer(fn) { later.push(fn); }
  function mount(id) {
    const p = $('#p-' + id); if (!p) return;
    p.textContent = ''; later = [];
    p.append(RENDER[id]());
    const q = later; later = []; q.forEach((f) => { try { f(); } catch (e) { if (window.console) console.error(e); } });
  }

  function updateProgress() {
    let answered = 0;
    for (let n = 1; n <= 32; n++) if ((S.a['q' + n] || '').toString().trim()) answered++;
    const fg = $('.bar-fg'), tx = $('#progtxt');
    if (fg) fg.style.width = Math.round((answered / 32) * 100) + '%';
    if (tx) tx.textContent = 'Reading: ' + answered + ' / 32 отвечено';
    $$('.tab').forEach((b) => b.classList.toggle('done', !!S.checked[b.dataset.id]));
  }

  function headerTimer() {
    const presets = [['Reading — 45 min', 45 * 60], ['Writing — 45 min', 45 * 60], ['Writing task — 20 min', 20 * 60], ['Plan — 3 min', 180], ['Speaking Part 3 — 1 min', 60]];
    let left = presets[0][1], run = false, iv = null;
    const disp = h('span', { class: 'tdisp' }, fmt(left)), box = h('div', { class: 'timer' });
    const sel = h('select', { 'aria-label': 'Таймер' }, presets.map((p, i) => h('option', { value: i }, p[0])));
    const go = h('button', { class: 'tbtn', type: 'button' }, 'Старт'), rs = h('button', { class: 'tbtn sec', type: 'button', 'aria-label': 'Сброс' }, '↺');
    function stop() { run = false; clearInterval(iv); go.textContent = 'Старт'; }
    sel.onchange = () => { stop(); left = presets[+sel.value][1]; disp.textContent = fmt(left); box.classList.remove('ring'); };
    go.onclick = () => { if (run) { stop(); return; } if (left <= 0) left = presets[+sel.value][1]; run = true; go.textContent = 'Пауза'; box.classList.remove('ring'); iv = setInterval(() => { left--; disp.textContent = fmt(Math.max(left, 0)); if (left <= 0) { stop(); box.classList.add('ring'); chime(); } }, 1000); };
    rs.onclick = () => { stop(); left = presets[+sel.value][1]; disp.textContent = fmt(left); box.classList.remove('ring'); };
    box.append(sel, disp, go, rs);
    return box;
  }

  function showPanel(id, noScroll) {
    if (!RENDER[id]) id = 'r1';
    S.tab = id; save();
    $$('.panel').forEach((p) => (p.hidden = p.id !== 'p-' + id));
    $$('.tab').forEach((b) => b.setAttribute('aria-selected', b.dataset.id === id));
    if (id === 'res' || id === 'w' || id === 's') mount(id); // always fresh
    if (!noScroll) window.scrollTo({ top: 0, behavior: 'instant' in window ? 'instant' : 'auto' });
    const t = $('.tab[data-id="' + id + '"]'); if (t && t.scrollIntoView) t.scrollIntoView({ inline: 'center', block: 'nearest' });
    try { history.replaceState(null, '', '#' + id); } catch (e) {}
  }

  function build() {
    const app = $('#app');
    app.append(
      h('div', { class: 'top' }, h('div', { class: 'top-in' },
        h('a', { class: 'brand', href: 'index.html', 'aria-label': 'К списку тестов' }, h('span', { class: 'mark' }, 'TE'), h('span', null, h('b', null, T.title), h('small', null, 'Target English · B1 Preliminary'))),
        h('div', { class: 'prog' }, h('span', { id: 'progtxt' }, ''), h('div', { class: 'bar-bg' }, h('div', { class: 'bar-fg' }))),
        headerTimer())),
      h('nav', { class: 'nav', 'aria-label': 'Части теста' }, h('div', { class: 'nav-in', role: 'tablist' },
        TABS.map(([id, l, s]) => h('button', { class: 'tab', role: 'tab', type: 'button', dataset: { id }, 'aria-selected': 'false', onclick: () => showPanel(id) }, l, h('small', null, s))))),
      h('main', null, TABS.map(([id]) => h('section', { class: 'panel', id: 'p-' + id, hidden: true }))),
      h('footer', null, 'Target English · тренировочный тест в формате Cambridge B1 Preliminary. Тексты и задания авторские. Ответы сохраняются только в этом браузере.'));
    ['r1', 'r2', 'r3', 'r4', 'r5', 'r6'].forEach(mount);
    const start = (location.hash || '').replace('#', '') || S.tab || 'r1';
    showPanel(RENDER[start] ? start : 'r1', true);
    updateProgress();
    window.addEventListener('hashchange', () => { const x = location.hash.replace('#', ''); if (RENDER[x]) showPanel(x); });
  }
  build();
})();
