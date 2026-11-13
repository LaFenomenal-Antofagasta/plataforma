// SHELL — cabecera común (atrás · marca · menú), miga de pan y navegación inferior para celular.
// Uso en cada página: <body data-seccion="fichas"> + <script src="../marca.js"> y <script src="../shell.js">
// API: shell.miga([['Fichas', fnOHref], ['Salsa Brava']])  (el último es la página actual)
(function () {
  const M = window.MARCA, SC = document.currentScript;
  const RAIZ = new URL('.', SC.src).href;
  let SEC = document.body.dataset.seccion || '';
  const IC = {
    inicio: '<path d="M3 11l9-8 9 8M5 10v10h5v-6h4v6h5V10"/>',
    lista: '<path d="M9 6h11M9 12h11M9 18h11"/><path d="M4 6l1 1 2-2M4 12l1 1 2-2M4 18l1 1 2-2"/>',
    libro: '<path d="M4 5a2 2 0 012-2h13v16H6a2 2 0 00-2 2V5z"/><path d="M8 7h7M8 11h7"/>',
    grafico: '<path d="M4 20V10M10 20V4M16 20v-8M22 20H2"/>',
    carrito: '<circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.4 11.2a2 2 0 002 1.6h7.7a2 2 0 002-1.5L21 7H6"/>',
    caja: '<path d="M3 8l9-5 9 5v9l-9 5-9-5V8z"/><path d="M3 8l9 5 9-5M12 13v9"/>',
    atras: '<path d="M15 5l-7 7 7 7"/>', menu: '<circle cx="12" cy="5" r="1.6"/><circle cx="12" cy="12" r="1.6"/><circle cx="12" cy="19" r="1.6"/>'
  };
  const svg = n => `<svg viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${IC[n] || IC.lista}</svg>`;
  window.shellIcono = svg;

  const css = `
  :root{--sh-h:56px;--sh-bg:${M.colorProfundo};--sh-fg:#F4F6FA;--sh-acc:${M.acento || M.color};--sh-panel:#FFFFFF;--sh-rule:#D6DCE8;--sh-muted:#686f80;--sh-ink:#1b212e}
  @media(prefers-color-scheme:dark){:root{--sh-bg:#0a1d4d;--sh-fg:#ebeef5;--sh-acc:#9cb6f2;--sh-panel:#1b212e;--sh-rule:#32394a;--sh-muted:#a1a8b8;--sh-ink:#ebeef5}}
  body{padding-bottom:calc(72px + env(safe-area-inset-bottom,0px))}
  #sh-top{position:sticky;top:0;z-index:30;background:var(--sh-bg);color:var(--sh-fg);padding-top:env(safe-area-inset-top,0px);font-family:'Libre Franklin',system-ui,sans-serif}
  #sh-bar{height:var(--sh-h);max-width:72rem;margin:0 auto;display:flex;align-items:center;gap:4px;padding:0 8px}
  #sh-top button,#sh-top a{color:inherit;font:inherit}
  .sh-btn{all:unset;box-sizing:border-box;width:44px;height:44px;display:grid;place-items:center;border-radius:12px;cursor:pointer;color:var(--sh-fg)}
  .sh-btn:hover{background:rgba(255,255,255,.1)} .sh-btn:focus-visible,.sh-brand:focus-visible,#sh-nav a:focus-visible{outline:2px solid #fff;outline-offset:2px}
  .sh-btn[hidden]{display:none} .sh-sp{width:44px}
  .sh-brand{display:flex;align-items:center;gap:10px;text-decoration:none;color:var(--sh-fg);min-width:0;margin-right:auto;font:600 1.3rem 'EB Garamond',Georgia,serif;letter-spacing:.01em}
  .sh-mono{width:32px;height:32px;border-radius:9px;background:var(--sh-fg);color:var(--sh-bg);display:grid;place-items:center;font:700 1rem 'Libre Franklin',sans-serif;flex:none;overflow:hidden}
  .sh-mono img{width:100%;height:100%;object-fit:cover}
  #sh-miga{background:var(--sh-panel);border-bottom:1px solid var(--sh-rule);font-family:'Libre Franklin',system-ui,sans-serif}
  #sh-miga ol{max-width:72rem;margin:0 auto;padding:0 14px;list-style:none;display:flex;align-items:center;gap:2px;overflow-x:auto;white-space:nowrap;scrollbar-width:none;min-height:40px;font-size:.88rem}
  #sh-miga ol::-webkit-scrollbar{display:none}
  #sh-miga li{display:flex;align-items:center;gap:2px;color:var(--sh-muted)}
  #sh-miga li+li::before{content:"›";margin:0 4px;opacity:.6}
  #sh-miga a,#sh-miga button{all:unset;cursor:pointer;color:var(--sh-acc);padding:10px 4px;font-weight:500;text-decoration:underline;text-underline-offset:3px}
  #sh-miga li[aria-current]{color:var(--sh-ink);font-weight:600;overflow:hidden;text-overflow:ellipsis}
  #sh-menu{position:absolute;right:8px;top:calc(var(--sh-h) + env(safe-area-inset-top,0px) - 4px);background:var(--sh-panel);color:var(--sh-ink);border:1px solid var(--sh-rule);border-radius:14px;box-shadow:0 10px 30px rgba(0,0,0,.25);padding:6px;min-width:13rem;z-index:40}
  #sh-menu[hidden]{display:none}
  #sh-menu .who{padding:10px 12px;color:var(--sh-muted);font-size:.82rem;border-bottom:1px solid var(--sh-rule);margin-bottom:4px}
  #sh-menu button{all:unset;box-sizing:border-box;display:block;width:100%;padding:12px;border-radius:10px;cursor:pointer;font-size:.95rem}
  #sh-menu button:hover{background:rgba(127,127,127,.14)}
  #sh-nav{position:fixed;left:0;right:0;bottom:0;z-index:30;background:var(--sh-panel);border-top:1px solid var(--sh-rule);padding-bottom:env(safe-area-inset-bottom,0px);display:flex;justify-content:center;font-family:'Libre Franklin',system-ui,sans-serif}
  #sh-nav a{flex:1 1 0;max-width:6.5rem;display:grid;justify-items:center;gap:2px;padding:8px 2px 9px;text-decoration:none;color:var(--sh-muted);font-size:.7rem;font-weight:500}
  #sh-nav a span.ic{display:grid;place-items:center;width:56px;height:30px;border-radius:99px;transition:background .15s}
  #sh-nav a[aria-current="page"]{color:var(--sh-acc);font-weight:700}
  #sh-nav a[aria-current="page"] span.ic{background:color-mix(in srgb,var(--sh-acc) 18%,transparent)}
  @media(min-width:900px){
    body{padding-bottom:0}
    #sh-nav{position:fixed;top:env(safe-area-inset-top,0px);bottom:auto;left:50%;transform:translateX(-50%);height:var(--sh-h);background:transparent;border:0;padding:0;z-index:31;gap:4px}
    #sh-nav a{flex:none;max-width:none;display:flex;gap:8px;align-items:center;color:var(--sh-fg);opacity:.75;padding:8px 14px;border-radius:99px;font-size:.92rem}
    #sh-nav a span.ic{width:auto;height:auto;background:none!important}
    #sh-nav a[aria-current="page"]{opacity:1;background:rgba(255,255,255,.16)}
  }
  @media print{#sh-top,#sh-nav{display:none}body{padding-bottom:0}}
  #acc-salir{display:none!important}`;
  const st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);
  // fuentes de marca (si la página no las trae)
  if (!document.querySelector('link[href*="fonts.googleapis"]')) { const l = document.createElement('link'); l.rel = 'stylesheet'; l.href = 'https://fonts.googleapis.com/css2?family=EB+Garamond:wght@500;600&family=Libre+Franklin:wght@400;500;600;700&display=swap'; document.head.appendChild(l); }

  const top = document.createElement('div'); top.id = 'sh-top';
  const mono = M.logo ? `<img src="${M.logo}" alt="">` : M.nombre.charAt(0);
  top.innerHTML = `<div id="sh-bar">
    <button class="sh-btn" id="sh-atras" aria-label="Volver" hidden>${svg('atras')}</button>
    <a class="sh-brand" href="${RAIZ}" aria-label="${M.nombre}, ir al inicio"><span class="sh-mono">${mono}</span><span>${M.nombre}</span></a>
    <button class="sh-btn" id="sh-mas" aria-label="Menú" aria-haspopup="true" aria-expanded="false">${svg('menu')}</button>
  </div>
  <nav id="sh-miga" aria-label="Dónde estás" hidden><ol></ol></nav>
  <div id="sh-menu" role="menu" hidden><div class="who" id="sh-who">…</div><button id="sh-inicio" role="menuitem">Ir al inicio</button><button id="sh-salir" role="menuitem">Cerrar sesión</button></div>`;
  document.body.prepend(top);

  const nav = document.createElement('nav'); nav.id = 'sh-nav'; nav.setAttribute('aria-label', 'Secciones');
  document.body.appendChild(nav);
  let ADMIN = false;
  function pintaNav(admin) {
    ADMIN = admin;
    const items = [{ id: 'inicio', corto: 'Inicio', ruta: '', icono: 'inicio' }].concat(M.secciones.filter(s => admin || !s.admin));
    nav.innerHTML = items.map(s => `<a href="${RAIZ}${s.ruta}" ${((s.id === 'inicio' && SEC === 'inicio') || s.id === SEC) ? 'aria-current="page"' : ''}><span class="ic">${svg(s.icono)}</span><span>${s.corto}</span></a>`).join('');
  }
  pintaNav(false);

  // miga + botón atrás
  const sec = M.secciones.find(s => s.id === SEC);
  let crumbs = SEC === 'inicio' ? [] : [[sec ? sec.titulo : document.title]];
  function render() {
    const ol = top.querySelector('#sh-miga ol'); ol.innerHTML = '';
    const todo = SEC === 'inicio' ? [] : [['Inicio', RAIZ]].concat(crumbs.length ? [] : []).concat(crumbs);
    todo.forEach((c, i) => {
      const li = document.createElement('li'); const ult = i === todo.length - 1;
      if (ult) { li.textContent = c[0]; li.setAttribute('aria-current', 'page'); }
      else { const a = document.createElement(typeof c[1] === 'string' ? 'a' : 'button'); a.textContent = c[0];
        if (typeof c[1] === 'string') a.href = c[1]; else a.onclick = c[1]; li.appendChild(a); }
      ol.appendChild(li);
    });
    top.querySelector('#sh-miga').hidden = todo.length < 2;
    const atras = top.querySelector('#sh-atras'); atras.hidden = todo.length < 2;
    atras.onclick = () => { const p = todo[todo.length - 2]; if (typeof p[1] === 'string') location.href = p[1]; else p[1](); };
  }
  render();
  window.shell = { miga(c) { crumbs = c; render(); }, raiz: RAIZ, seccion(id) { SEC = id; pintaNav(ADMIN); } };

  // menú
  const mas = top.querySelector('#sh-mas'), menu = top.querySelector('#sh-menu');
  const cierra = () => { menu.hidden = true; mas.setAttribute('aria-expanded', 'false'); };
  mas.onclick = e => { e.stopPropagation(); menu.hidden = !menu.hidden; mas.setAttribute('aria-expanded', String(!menu.hidden)); };
  document.addEventListener('click', e => { if (!menu.contains(e.target)) cierra(); });
  document.addEventListener('keydown', e => { if (e.key === 'Escape') cierra(); });
  top.querySelector('#sh-inicio').onclick = () => { location.href = RAIZ; };
  top.querySelector('#sh-salir').onclick = async () => { try { const db = await acceso.cliente(); await db.auth.signOut(); } catch (e) {} location.href = RAIZ; };

  // usuario y secciones de admin (cuando acceso.js ya inició sesión)
  (function esperar(n) {
    if (!window.acceso) return n > 0 && setTimeout(() => esperar(n - 1), 100);
    acceso.cliente().then(async db => {
      const { data } = await db.auth.getSession();
      const mail = (data.session && data.session.user.email) || '';
      top.querySelector('#sh-who').textContent = 'Sesión: ' + mail.split('@')[0];
      pintaNav(await acceso.esAdmin());
    }).catch(() => {});
  })(50);
})();
