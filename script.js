(function () {
  const S = STORE, P = PRODUCTS;
  const $ = s => document.querySelector(s);
  const money = n => '₹' + Number(n).toLocaleString('en-IN');
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const PH = 'data:image/svg+xml,' + encodeURIComponent('<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400"><rect width="400" height="400" fill="#fff0f5"/><text x="200" y="210" font-family="sans-serif" font-size="22" fill="#ff2d75" text-anchor="middle">Image coming soon</text></svg>');
  document.addEventListener('error', e => { const t = e.target; if (t.tagName === 'IMG' && !t.dataset.f) { t.dataset.f = 1; t.src = PH; } }, true);

  const state = { cat: 'All', q: '', sort: 'default' };
  let cart = [], pending = null;
  try { cart = JSON.parse(localStorage.getItem('ttc_cart') || '[]'); } catch (e) {}
  const save = () => { try { localStorage.setItem('ttc_cart', JSON.stringify(cart)); } catch (e) {} };

  const find = id => P.find(p => p.id === id);
  const imgSrc = (p, i) => S.imageFolder + ((p.images && p.images[i || 0]) || 'missing.jpg');
  const vPrice = (p, v) => { const o = (p.variants || []).find(x => x.label === v); return o && o.price != null ? o.price : p.price; };
  const discount = p => p.originalPrice > p.price ? Math.round(100 - p.price / p.originalPrice * 100) : 0;
  const cats = [...new Set(P.map(p => p.category))];

  function card(p) {
    const off = discount(p), vs = p.variants || [];
    const sel = vs.length ? `<select class="var" aria-label="Choose option">${vs.map(v => `<option value="${esc(v.label)}">${esc(v.label)}${v.price != null ? ' - ' + money(v.price) : ''}</option>`).join('')}</select>` : '';
    const acts = p.inStock ? '<button class="btn ghost" data-act="add">Add to cart</button><button class="btn" data-act="buy">Buy now</button>' : '<button class="btn" disabled>Out of stock</button>';
    return `<article class="card" data-id="${esc(p.id)}"><button class="thumb" data-act="view" aria-label="View ${esc(p.name)}"><img loading="lazy" src="${esc(imgSrc(p))}" alt="${esc(p.name)}">${p.tags && p.tags[0] ? `<span class="tag">${esc(p.tags[0])}</span>` : ''}${off ? `<span class="off">${off}% off</span>` : ''}</button>
<div class="info"><p class="cat">${esc(p.category)}</p><h3>${esc(p.name)}</h3><p class="sd">${esc(p.shortDesc)}</p><p class="price"><b>${money(p.price)}</b>${off ? `<s>${money(p.originalPrice)}</s>` : ''}</p>${sel}<div class="acts">${acts}</div></div></article>`;
  }

  function renderShop() {
    const q = state.q.toLowerCase();
    let list = P.filter(p => (state.cat === 'All' || p.category === state.cat) &&
      (!q || [p.name, p.category, p.shortDesc, p.fullDesc, (p.tags || []).join(' ')].join(' ').toLowerCase().includes(q)));
    if (state.sort === 'low') list.sort((a, b) => a.price - b.price);
    if (state.sort === 'high') list.sort((a, b) => b.price - a.price);
    if (state.sort === 'az') list.sort((a, b) => a.name.localeCompare(b.name));
    $('#grid').innerHTML = list.map(card).join('');
    $('#empty').hidden = list.length > 0;
    $('#chips').innerHTML = ['All', ...cats].map(c => `<button class="chip" aria-pressed="${c === state.cat}" data-cat="${esc(c)}">${esc(c)}</button>`).join('');
  }

  function init() {
    $('#catGrid').innerHTML = cats.map(c => `<button class="cattile" data-cat="${esc(c)}" data-go>${esc(c)}<small>${P.filter(p => p.category === c).length} products</small></button>`).join('');
    const best = P.filter(p => (p.tags || []).includes('Best Seller'));
    $('#featured').hidden = !best.length; $('#featGrid').innerHTML = best.map(card).join('');
    $('#reviews').innerHTML = S.testimonials.map(t => `<blockquote><p>${esc(t.text)}</p><cite>${esc(t.name)}</cite></blockquote>`).join('');
    $('#fMail').href = 'mailto:' + S.email; $('#fMail').textContent = S.email;
    $('#fPhone').href = 'tel:' + S.phone.replace(/\s/g, ''); $('#fPhone').textContent = S.phone;
    $('#fWa').href = 'https://wa.me/' + S.whatsapp;
    $('#sIg').href = S.social.instagram; $('#sFb').href = S.social.facebook; $('#sYt').href = S.social.youtube;
    $('#yr').textContent = new Date().getFullYear();
    cart = cart.filter(i => find(i.id)); save();
    renderShop(); updateCount();
    const m = location.hash.match(/^#p-(.+)$/); if (m && find(decodeURIComponent(m[1]))) openDetail(decodeURIComponent(m[1]));
  }

  function toast(msg) { const t = $('#toast'); t.textContent = msg; t.classList.add('show'); clearTimeout(toast.t); toast.t = setTimeout(() => t.classList.remove('show'), 1800); }
  function updateCount() { $('#cartCount').textContent = cart.reduce((n, i) => n + i.qty, 0); }

  function add(id, variant) {
    const it = cart.find(i => i.id === id && i.variant === variant);
    if (it) it.qty++; else cart.push({ id, variant, qty: 1 });
    save(); updateCount(); toast('Added to cart');
  }

  function renderCart() {
    const body = $('#cartBody');
    if (!cart.length) { body.innerHTML = '<p class="empty">Your cart is empty. Add a product to get started.</p>'; return; }
    const total = cart.reduce((s, i) => s + vPrice(find(i.id), i.variant) * i.qty, 0);
    body.innerHTML = cart.map((i, n) => { const p = find(i.id); return `<div class="line"><img src="${esc(imgSrc(p))}" alt=""><div><b>${esc(p.name)}</b>${i.variant ? `<small>${esc(i.variant)}</small>` : ''}<span class="qty"><button data-q="-1" data-n="${n}" aria-label="Decrease">-</button>${i.qty}<button data-q="1" data-n="${n}" aria-label="Increase">+</button></span></div><div><b>${money(vPrice(p, i.variant) * i.qty)}</b><br><button class="link" data-rm="${n}">Remove</button></div></div>`; }).join('') +
      `<div class="total"><span>Total</span><span>${money(total)}</span></div><button class="btn wa" data-act="checkout">Checkout</button>`;
  }

  function openDetail(id) {
    const p = find(id), vs = p.variants || [];
    $('#detailBody').innerHTML = `<div class="det" data-id="${esc(p.id)}"><div><img class="main" src="${esc(imgSrc(p))}" alt="${esc(p.name)}"><div class="thumbs">${(p.images || []).length < 2 ? '' : (p.images || []).map((f, i) => `<img src="${esc(imgSrc(p, i))}" alt="Photo ${i + 1}" class="${i ? '' : 'on'}" data-i="${i}">`).join('')}</div></div>
<div><p class="cat">${esc(p.category)}</p><h3>${esc(p.name)}</h3><p class="price"><b>${money(p.price)}</b>${discount(p) ? `<s>${money(p.originalPrice)}</s>` : ''}</p><p class="fd">${esc(p.fullDesc)}</p>
${vs.length ? `<select class="var" aria-label="Choose option">${vs.map(v => `<option value="${esc(v.label)}">${esc(v.label)}${v.price != null ? ' - ' + money(v.price) : ''}</option>`).join('')}</select>` : ''}
<div class="acts">${p.inStock ? '<button class="btn ghost" data-act="add">Add to cart</button><button class="btn" data-act="buy">Buy now</button>' : '<button class="btn" disabled>Out of stock</button>'}</div></div></div>`;
    $('#detailDlg').showModal();
  }

  function checkout(items) {
    pending = items;
    const total = items.reduce((s, i) => s + vPrice(find(i.id), i.variant) * i.qty, 0);
    $('#coSummary').innerHTML = items.map(i => `<p><span>${esc(find(i.id).name)}${i.variant ? ' (' + esc(i.variant) + ')' : ''} x${i.qty}</span><span>${money(vPrice(find(i.id), i.variant) * i.qty)}</span></p>`).join('') + `<p><b>Total</b><b>${money(total)}</b></p>`;
    ['#cartDlg', '#detailDlg'].forEach(d => $(d).close());
    $('#coDlg').showModal();
  }

  $('#coForm').addEventListener('submit', e => {
    e.preventDefault();
    const f = new FormData(e.target), base = location.origin + location.pathname;
    let total = 0;
    const lines = pending.map((i, n) => { const p = find(i.id), pr = vPrice(p, i.variant) * i.qty; total += pr; return `${n + 1}. ${p.name}${i.variant ? ' (' + i.variant + ')' : ''}\n   ID: ${p.id} | Qty: ${i.qty} | ${money(pr)}\n   Link: ${base}#p-${encodeURIComponent(p.id)}`; });
    const msg = `Hi ${S.name}, I would like to place an order.\n\n*Order details*\n${lines.join('\n')}\n\n*Total: ${money(total)}* (prepaid order)\n\n*Customer details*\nName: ${f.get('name')}\nPhone: ${f.get('phone')}\nAddress: ${f.get('address')}`;
    window.open('https://wa.me/' + S.whatsapp + '?text=' + encodeURIComponent(msg), '_blank');
    if (pending === cart) { cart = []; save(); updateCount(); }
    $('#coDlg').close(); e.target.reset();
  });

  document.addEventListener('click', e => {
    const t = e.target;
    const dlg = t.closest('dialog'); if (t.tagName === 'DIALOG') { const r = t.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) t.close(); }
    if (t.closest('[data-close]')) { dlg.close(); return; }
    const catBtn = t.closest('[data-cat]');
    if (catBtn) { state.cat = catBtn.dataset.cat; renderShop(); if (catBtn.hasAttribute('data-go')) $('#shop').scrollIntoView(); return; }
    if (t.closest('#cartBtn')) { renderCart(); $('#cartDlg').showModal(); return; }
    const th = t.closest('.thumbs img'); if (th) { document.querySelector('.det .main').src = th.src; document.querySelectorAll('.thumbs img').forEach(i => i.classList.toggle('on', i === th)); return; }
    const q = t.closest('[data-q]'); if (q) { const i = cart[+q.dataset.n]; i.qty += +q.dataset.q; if (i.qty < 1) cart.splice(+q.dataset.n, 1); save(); updateCount(); renderCart(); return; }
    const rm = t.closest('[data-rm]'); if (rm) { cart.splice(+rm.dataset.rm, 1); save(); updateCount(); renderCart(); return; }
    const a = t.closest('[data-act]'); if (!a) return;
    if (a.dataset.act === 'checkout') { checkout(cart); return; }
    const box = a.closest('[data-id]'), id = box.dataset.id, v = box.querySelector('.var');
    const variant = v ? v.value : '';
    if (a.dataset.act === 'view') openDetail(id);
    if (a.dataset.act === 'add') add(id, variant);
    if (a.dataset.act === 'buy') checkout([{ id, variant, qty: 1 }]);
  });

  document.addEventListener('change', e => {
    if (e.target.matches('.var')) { const box = e.target.closest('[data-id]'); box.querySelector('.price b').textContent = money(vPrice(find(box.dataset.id), e.target.value)); }
  });
  $('#search').addEventListener('input', e => { state.q = e.target.value; renderShop(); });
  $('#sort').addEventListener('change', e => { state.sort = e.target.value; renderShop(); });
  init();
})();
