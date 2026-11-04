/* Marmoraria Pedrarte | eventos padrão QH4 no dataLayer
   whatsapp_click  clique em qualquer link wa.me (origem = data-origem)
   form_start      primeiro campo do formulário preenchido
   generate_lead   envio do formulário (disparado por main.js via qh4Track)
   thank_you_view  carregamento do obrigado.html (inline no obrigado.html) */
(function () {
  'use strict';
  window.dataLayer = window.dataLayer || [];
  function track(evento, dados) { window.dataLayer.push(Object.assign({ event: evento }, dados || {})); }
  window.qh4Track = track;

  // whatsapp_click: delegado, pega todos os links wa.me / api.whatsapp
  document.addEventListener('click', function (e) {
    var a = e.target.closest && e.target.closest('a[href*="wa.me"], a[href*="api.whatsapp.com"]');
    if (a) track('whatsapp_click', { origem: a.dataset.origem || 'link' });
  }, true);

  // form_start: primeira interação com qualquer formulário
  var iniciou = false;
  function inicio(e) {
    if (iniciou || !e.target.form) return;
    iniciou = true;
    track('form_start', { form: e.target.form.id || 'form' });
  }
  document.addEventListener('input', inicio, true);
  document.addEventListener('change', inicio, true);
})();
