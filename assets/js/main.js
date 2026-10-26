/* Marmoraria Pedrarte | LP QH4 */
(function () {
  'use strict';
  var WA = '553134614493';
  window.dataLayer = window.dataLayer || [];
  function track(evento, dados) { window.dataLayer.push(Object.assign({ event: evento }, dados || {})); }

  // Ano no rodapé
  var ano = document.getElementById('ano');
  if (ano) ano.textContent = new Date().getFullYear();

  var reduz = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var desktop = window.matchMedia('(min-width: 1001px) and (hover: hover)').matches;

  // Topo: sombra ao rolar, some ao descer e volta ao subir; barra de progresso
  var topo = document.getElementById('topo');
  var barra = document.querySelector('.progresso');
  var passos = document.querySelector('.passos');
  var passosLi = passos ? passos.querySelectorAll('li') : [];
  var waFloat = document.querySelector('.wa-float');
  var ultimoY = window.scrollY, ticking = false;
  function onScroll() {
    var y = window.scrollY;
    topo.classList.toggle('is-scroll', y > 8);
    var menuAberto = document.getElementById('menu').classList.contains('is-open');
    if (!reduz && !menuAberto && y > 400 && y > ultimoY + 4) topo.classList.add('is-oculto');
    else if (y < ultimoY - 4 || y <= 400) topo.classList.remove('is-oculto');
    ultimoY = y;
    var max = document.documentElement.scrollHeight - window.innerHeight;
    if (barra) barra.style.setProperty('--p', max > 0 ? (y / max).toFixed(4) : 0);
    if (waFloat && y > 240) waFloat.classList.add('on');
    // linha do tempo do processo
    if (passos) {
      var r = passos.getBoundingClientRect();
      var alvo = window.innerHeight * 0.62;
      var fill = Math.max(0, Math.min(1, (alvo - r.top) / r.height));
      passos.style.setProperty('--fill', fill.toFixed(3));
      passosLi.forEach(function (li) { li.classList.toggle('ativo', li.getBoundingClientRect().top + 20 < alvo); });
    }
    ticking = false;
  }
  window.addEventListener('scroll', function () { if (!ticking) { ticking = true; requestAnimationFrame(onScroll); } }, { passive: true });
  onScroll();
  setTimeout(function () { if (waFloat) waFloat.classList.add('on'); }, 1800);

  // Veios do hero: comprimento real de cada traço
  document.querySelectorAll('.hero__veios path').forEach(function (p) {
    try { p.style.setProperty('--len', Math.ceil(p.getTotalLength())); } catch (e) {}
  });

  // Contadores (41 anos, 30 a 50%)
  function conta(el) {
    var fim = parseInt(el.dataset.count, 10), ini = null, dur = 1400;
    function passo(t) {
      if (!ini) ini = t;
      var k = Math.min(1, (t - ini) / dur);
      el.textContent = Math.round(fim * (1 - Math.pow(1 - k, 3)));
      if (k < 1) requestAnimationFrame(passo);
    }
    el.textContent = '0';
    requestAnimationFrame(passo);
  }
  var contadores = document.querySelectorAll('[data-count]');
  if (!reduz && 'IntersectionObserver' in window) {
    var ioC = new IntersectionObserver(function (en) {
      en.forEach(function (e) { if (e.isIntersecting) { conta(e.target); ioC.unobserve(e.target); } });
    }, { threshold: 0.6 });
    contadores.forEach(function (c) { ioC.observe(c); });
  }

  // Foto do hero inclina com o mouse; selo vai no sentido oposto
  var heroFoto = document.querySelector('.hero__foto');
  var moldHero = document.querySelector('.moldura--hero');
  var selo = document.querySelector('.selo');
  if (heroFoto && desktop && !reduz) {
    heroFoto.addEventListener('mousemove', function (e) {
      var r = heroFoto.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
      moldHero.style.setProperty('--ry', (x * 7).toFixed(2) + 'deg');
      moldHero.style.setProperty('--rx', (-y * 7).toFixed(2) + 'deg');
      selo.style.setProperty('--sx', (-x * 18).toFixed(1) + 'px');
      selo.style.setProperty('--sy', (-y * 18).toFixed(1) + 'px');
    });
    heroFoto.addEventListener('mouseleave', function () {
      ['--rx', '--ry'].forEach(function (v) { moldHero.style.setProperty(v, '0deg'); });
      ['--sx', '--sy'].forEach(function (v) { selo.style.setProperty(v, '0px'); });
    });
  }

  // Brilho periódico no botão principal do hero
  var ctaHero = document.querySelector('.hero__acoes .btn--vermelho');
  if (ctaHero && !reduz) {
    setInterval(function () {
      ctaHero.classList.remove('brilha'); void ctaHero.offsetWidth; ctaHero.classList.add('brilha');
    }, 4200);
  }

  // Faixa de público entra em sequência
  var publico = document.querySelector('.publico');
  if (publico && 'IntersectionObserver' in window && !reduz) {
    var ioP = new IntersectionObserver(function (en) {
      if (en[0].isIntersecting) { publico.classList.add('is-in'); ioP.disconnect(); }
    }, { threshold: 0.4 });
    ioP.observe(publico);
  } else if (publico) { publico.classList.add('is-in'); }

  // FAQ: abre e fecha com altura animada
  document.querySelectorAll('.faq details').forEach(function (d) {
    var sum = d.querySelector('summary'), p = d.querySelector('p');
    sum.addEventListener('click', function (e) {
      if (reduz || !p.animate) return;
      e.preventDefault();
      if (d.open) {
        var a = p.animate([{ height: p.offsetHeight + 'px', opacity: 1 }, { height: '0px', opacity: 0 }], { duration: 320, easing: 'cubic-bezier(.2,.7,.2,1)' });
        a.onfinish = function () { d.open = false; };
      } else {
        d.open = true;
        var h = p.offsetHeight;
        p.animate([{ height: '0px', opacity: 0 }, { height: h + 'px', opacity: 1 }], { duration: 380, easing: 'cubic-bezier(.2,.7,.2,1)' });
      }
    });
  });

  // Menu mobile
  var burger = document.querySelector('.topo__burger');
  var menu = document.getElementById('menu');
  function fechaMenu() { menu.classList.remove('is-open'); burger.setAttribute('aria-expanded', 'false'); burger.setAttribute('aria-label', 'Abrir menu'); }
  burger.addEventListener('click', function () {
    var aberto = menu.classList.toggle('is-open');
    burger.setAttribute('aria-expanded', String(aberto));
    burger.setAttribute('aria-label', aberto ? 'Fechar menu' : 'Abrir menu');
  });
  menu.querySelectorAll('a').forEach(function (a) { a.addEventListener('click', fechaMenu); });
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { fechaMenu(); fechaLb(); } });

  // Cliques no WhatsApp
  document.querySelectorAll('.js-wa').forEach(function (a) {
    a.addEventListener('click', function () { track('whatsapp_click', { origem: a.dataset.origem || 'link' }); });
  });

  // Revelação no scroll
  var els = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window && !reduz) {
    var io = new IntersectionObserver(function (entradas) {
      entradas.forEach(function (en) {
        if (en.isIntersecting) {
          var irmaos = Array.prototype.indexOf.call(en.target.parentNode.children, en.target);
          en.target.style.transitionDelay = Math.min(irmaos, 5) * 70 + 'ms';
          en.target.classList.add('is-in'); io.unobserve(en.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    // itens da galeria ficam com clip-path fechado (invisíveis ao observer): observa o container
    els.forEach(function (el) { if (!el.closest('.galeria')) io.observe(el); });
    var galeria = document.querySelector('.galeria');
    if (galeria) {
      var ioG = new IntersectionObserver(function (en) {
        if (!en[0].isIntersecting) return;
        galeria.querySelectorAll('.reveal').forEach(function (it, k) {
          it.style.transitionDelay = (k * 90) + 'ms';
          it.classList.add('is-in');
        });
        ioG.disconnect();
      }, { threshold: 0.08 });
      ioG.observe(galeria);
    }
  } else { els.forEach(function (el) { el.classList.add('is-in'); }); }

  // Parallax leve na foto do hero
  var par = document.querySelector('[data-parallax] img');
  if (par && !reduz && window.matchMedia('(min-width: 1001px)').matches) {
    var tick = false;
    window.addEventListener('scroll', function () {
      if (tick) return; tick = true;
      requestAnimationFrame(function () {
        var y = Math.min(window.scrollY, 700);
        par.style.transform = 'scale(1.06) translateY(' + (y * 0.05) + 'px)';
        tick = false;
      });
    }, { passive: true });
  }

  // Abas de pedras
  var abas = Array.prototype.slice.call(document.querySelectorAll('.aba'));
  function ativa(aba, foco) {
    abas.forEach(function (t) {
      var on = t === aba;
      t.setAttribute('aria-selected', String(on));
      t.tabIndex = on ? 0 : -1;
      var p = document.getElementById(t.getAttribute('aria-controls'));
      p.hidden = !on; p.classList.toggle('is-on', on);
    });
    if (foco) aba.focus();
    if (window.matchMedia('(max-width: 1000px)').matches) aba.scrollIntoView({ block: 'nearest', inline: 'center', behavior: reduz ? 'auto' : 'smooth' });
  }
  abas.forEach(function (aba, i) {
    aba.addEventListener('click', function () { ativa(aba); track('pedra_selecionada', { pedra: aba.id.replace('t-', '') }); });
    aba.addEventListener('keydown', function (e) {
      var n = null;
      if (e.key === 'ArrowDown' || e.key === 'ArrowRight') n = abas[(i + 1) % abas.length];
      if (e.key === 'ArrowUp' || e.key === 'ArrowLeft') n = abas[(i - 1 + abas.length) % abas.length];
      if (e.key === 'Home') n = abas[0];
      if (e.key === 'End') n = abas[abas.length - 1];
      if (n) { e.preventDefault(); ativa(n, true); }
    });
  });

  // Lightbox da galeria
  var lb = document.getElementById('lightbox');
  var lbImg = lb.querySelector('img');
  var ultimo = null;
  function fechaLb() { if (lb.hidden) return; lb.hidden = true; document.body.style.overflow = ''; if (ultimo) ultimo.focus(); }
  document.querySelectorAll('.galeria__item').forEach(function (b) {
    b.addEventListener('click', function () {
      ultimo = b;
      var img = b.querySelector('img');
      lbImg.src = b.dataset.full; lbImg.alt = img.alt;
      lb.hidden = false; document.body.style.overflow = 'hidden';
      lb.querySelector('.lightbox__fechar').focus();
    });
  });
  lb.addEventListener('click', function (e) { if (e.target !== lbImg) fechaLb(); });

  // Formulário -> WhatsApp (sem Apps Script)
  var form = document.getElementById('form-orcamento');
  var btn = form.querySelector('button[type="submit"]');
  var aviso = document.getElementById('form-aviso');
  var whats = document.getElementById('f-whats');

  whats.addEventListener('input', function () {
    var d = whats.value.replace(/\D/g, '').slice(0, 11);
    var f = d;
    if (d.length > 2) f = '(' + d.slice(0, 2) + ') ' + d.slice(2);
    if (d.length > 6 && d.length <= 10) f = '(' + d.slice(0, 2) + ') ' + d.slice(2, 6) + '-' + d.slice(6);
    if (d.length === 11) f = '(' + d.slice(0, 2) + ') ' + d.slice(2, 3) + ' ' + d.slice(3, 7) + '-' + d.slice(7);
    whats.value = f;
  });
  whats.addEventListener('blur', function () { whats.classList.toggle('is-erro', whats.value !== '' && !whats.checkValidity()); });

  var iniciou = false;
  function valida() {
    var ok = form.checkValidity();
    if (ok && btn.disabled) { btn.classList.remove('liberou'); void btn.offsetWidth; btn.classList.add('liberou', 'brilha'); }
    btn.disabled = !ok;
    aviso.textContent = ok ? 'Tudo certo. Ao enviar, o WhatsApp abre com a sua mensagem pronta.' : 'Preencha os campos para liberar o envio.';
    if (!iniciou) { iniciou = true; track('form_start'); }
  }
  form.addEventListener('input', valida);
  form.addEventListener('change', valida);

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    if (!form.checkValidity()) { valida(); return; }
    var fd = new FormData(form);
    var amb = fd.getAll('ambiente');
    var msg = 'Olá, acabei de preencher o formulário no site da Pedrarte.\n\n' +
      '*Nome:* ' + fd.get('nome').trim() + '\n' +
      '*WhatsApp:* ' + fd.get('whatsapp') + '\n' +
      '*Perfil:* ' + fd.get('perfil') + '\n' +
      '*Preciso de:* ' + (amb.length ? amb.join(', ') : 'Não informado') + '\n' +
      '*Pedra de interesse:* ' + fd.get('pedra') + '\n' +
      '*Bairro/cidade da obra:* ' + fd.get('bairro').trim() + '\n\n' +
      'Aguardo o orçamento.';
    track('generate_lead', { form: 'orcamento', pedra: fd.get('pedra'), perfil: fd.get('perfil') });
    var url = 'https://wa.me/' + WA + '?text=' + encodeURIComponent(msg);
    var jan = window.open(url, '_blank');
    if (!jan) { window.location.href = url; return; }
    window.location.href = 'obrigado.html';
  });
})();
