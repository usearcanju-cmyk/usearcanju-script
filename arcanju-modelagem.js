/*!
 * Use Arcanju — Troca de modelagem (Baby Look <-> Tradicional)
 * Insere uma faixa perto do seletor de tamanho na página do produto,
 * levando a cliente para a mesma estampa na outra modelagem.
 *
 * Para adicionar uma estampa nova: inclua uma linha em PARES
 * com o final da URL (slug) da versão baby look e da tradicional.
 */
(function () {
  'use strict';
  if (window.__arcanjuModelagem) return;
  window.__arcanjuModelagem = true;

  var BASE = '/produtos/';

  // [slug baby look, slug tradicional, nome da estampa]
  var PARES = [
    ['camiseta-baby-look-feminina-off-white-premium-santa-teresinha-1go7f', 'camiseta-off-white-premium-santa-teresinha', 'Santa Teresinha'],
    ['camiseta-baby-look-feminina-off-white-premium-sao-francisco-de-assis-1q7uv', 'camiseta-off-white-premium-sao-francisco-de-assis-1fvei', 'São Francisco de Assis'],
    ['camiseta-baby-look-feminina-off-white-premium-nossa-senhora-aparecida-pqe8f', 'camiseta-azul-marinho-premium-nossa-senhora-aparecida', 'Nossa Senhora Aparecida'],
    ['camiseta-baby-look-feminina-off-white-premium-acolita-adveniat-regnum-tuum-1eixj', 'camiseta-off-white-e-preta-premium-acolito-adveniat-regnum-tuum-kn6dd', 'Acólito(a)'],
    ['camiseta-baby-look-feminina-preta-premium-diario-de-santa-faustina-13tzh', 'camiseta-preta-premium-diario-de-santa-faustina-znsoh', 'Diário de Santa Faustina'],
    ['camiseta-baby-look-feminina-off-white-premium-amigos-concedei-me-o-convivio-dos-eleitos-1am87', 'camiseta-off-white-premium-amigos-concedei-me-o-convivio-dos-eleitos-ojrwf', 'Amigos'],
    ['camiseta-baby-look-feminina-preta-premium-sanctissimum-sacramentum-40o7p', 'camiseta-preta-premium-sanctissimum-sacramentum', 'Tão Sublime Sacramento'],
    ['camiseta-baby-look-feminina-off-white-premium-sao-tarcisio-15b5e', 'camiseta-off-white-premium-sao-tarcisio', 'São Tarcísio'],
    ['camiseta-baby-look-feminina-off-white-premium-nossa-senhora-de-fatima-1o4a8', 'camiseta-off-white-premium-nossa-senhora-de-fatima', 'Nossa Senhora de Fátima'],
    ['camiseta-baby-look-feminina-preta-premium-doce-mae-de-guadalupe-zhg0w', 'camiseta-preta-premium-doce-mae-de-guadalupe', 'Doce Mãe de Guadalupe'],
    ['camiseta-baby-look-feminina-off-white-premium-ave-maria-gratia-plena-ave-maria-cheia-de-graca-vr1db', 'camiseta-off-white-e-branca-premium-ave-maria-gratia-plena-ave-maria-cheia-de-graca-76wuy', 'Ave Maria Gratia Plena'],
    ['camiseta-baby-look-feminina-preta-premium-sao-miguel-arcanjo-sede-nossa-defesa-w0c04', 'camiseta-preta-premium-sao-miguel-arcanjo-sede-nossa-defesa', 'São Miguel Arcanjo'],
    ['camiseta-baby-look-feminina-off-white-premium-tu-es-o-centro-yzgem', 'camiseta-off-white-premium-tu-es-o-centro', 'Tu És o Centro'],
    ['camiseta-baby-look-feminina-off-white-e-preta-premium-eu-sou-a-ressurreicao-e-a-vida-ft-annahelenazanella-1rfd5', 'camiseta-off-white-e-preta-premium-eu-sou-a-ressurreicao-e-a-vida-ft-annahelenazanella-1qubr', 'Eu Sou a Ressurreição e a Vida'],
    ['camiseta-baby-look-feminina-off-white-premium-sao-carlo-acutis-rbter', 'camiseta-off-white-premium-sao-carlo-acutis', 'São Carlo Acutis'],
    ['camiseta-baby-look-feminina-off-white-premium-cruz-sagrada-de-sao-bento-1bs2c', 'camiseta-off-white-premium-cruz-sagrada-de-sao-bento', 'Cruz Sagrada de São Bento'],
    ['camiseta-baby-look-feminina-off-white-premium-e-lindo-ser-catolico-qkhy1', 'camiseta-off-white-premium-e-lindo-ser-catolico', 'É Lindo Ser Católico'],
    ['camiseta-baby-look-feminina-off-white-premium-jesus-eu-confio-em-vos-jesus-misericordioso-1qkbe', 'camiseta-off-white-premium-jesus-eu-confio-em-vos-jesus-misericordioso-qp0vp', 'Jesus, Eu Confio em Vós'],
    ['camiseta-baby-look-feminina-off-white-premium-feed-do-acutis-1t1n0', 'camiseta-off-white-e-preta-premium-feed-do-acutis-1n0pp', 'Feed do Acutis'],
    // Atenção: a URL da baby look de Santo Antônio está com o "slug" do Papa Leão XIV. Conferir no admin.
    ['camiseta-baby-look-feminina-off-white-e-preta-premium-pope-leo-xiv-papa-leao-xiv-1lase', 'camiseta-off-white-premium-santo-antonio-cessem-as-palavras-falem-as-obras-uhpuj', 'Santo Antônio']
  ];

  // ---- descobrir em qual produto estamos ----
  var path = decodeURIComponent(location.pathname).toLowerCase().replace(/\/+$/, '');
  if (path.indexOf(BASE) === -1) return;
  var atual = path.split(BASE)[1].split('/')[0];

  var destino = null, paraBabyLook = false, nome = '';
  for (var i = 0; i < PARES.length; i++) {
    if (atual === PARES[i][0]) { destino = PARES[i][1]; paraBabyLook = false; nome = PARES[i][2]; break; }
    if (atual === PARES[i][1]) { destino = PARES[i][0]; paraBabyLook = true;  nome = PARES[i][2]; break; }
  }
  if (!destino) return;

  // ---- estilo (herda a fonte do tema para não destoar) ----
  var css = '' +
    '.arc-mod{display:flex;align-items:center;gap:14px;margin:16px 0 18px;padding:14px 16px;' +
      'border:1px solid #E4DCCF;border-left:3px solid #6B1E2E;border-radius:10px;background:#FAF7F2;' +
      'color:#2B2B2B;text-decoration:none!important;font-family:inherit;transition:background .2s,border-color .2s,transform .2s;' +
      '-webkit-tap-highlight-color:transparent}' +
    '.arc-mod:hover{background:#F3EDE3;border-color:#D6CBB8;border-left-color:#6B1E2E;transform:translateY(-1px)}' +
    '.arc-mod__ico{flex:0 0 38px;height:38px;border-radius:50%;background:#fff;border:1px solid #E4DCCF;' +
      'display:flex;align-items:center;justify-content:center;color:#6B1E2E}' +
    '.arc-mod__ico svg{width:20px;height:20px}' +
    '.arc-mod__txt{flex:1;line-height:1.35;min-width:0}' +
    '.arc-mod__q{display:block;font-size:13px;color:#6E6A63;margin-bottom:2px}' +
    '.arc-mod__cta{display:block;font-size:14.5px;font-weight:600;color:#2B2B2B}' +
    '.arc-mod__arrow{flex:0 0 auto;font-size:18px;color:#6B1E2E;transition:transform .2s}' +
    '.arc-mod:hover .arc-mod__arrow{transform:translateX(3px)}' +
    '@media (max-width:480px){.arc-mod{padding:12px 14px;gap:12px}.arc-mod__cta{font-size:14px}}';
  var st = document.createElement('style');
  st.id = 'arc-mod-css';
  st.appendChild(document.createTextNode(css));
  document.head.appendChild(st);

  // ícone de camiseta (traço fino, combina com o line art da marca)
  var ICO = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linejoin="round">' +
    '<path d="M8 3l-5 3 2 4 2-1v12h10V9l2 1 2-4-5-3c-.5 1.5-2 2.5-4 2.5S8.5 4.5 8 3z"/></svg>';

  var pergunta = paraBabyLook ? 'Prefere a modelagem feminina?' : 'Prefere a modelagem tradicional?';
  var cta = paraBabyLook ? 'Ver esta estampa na versão Baby Look' : 'Ver esta estampa na versão tradicional';

  function criarFaixa() {
    var a = document.createElement('a');
    a.className = 'arc-mod';
    a.href = BASE + destino + '/';
    a.setAttribute('aria-label', pergunta + ' ' + cta);
    a.innerHTML =
      '<span class="arc-mod__ico">' + ICO + '</span>' +
      '<span class="arc-mod__txt"><span class="arc-mod__q">' + pergunta + '</span>' +
      '<span class="arc-mod__cta">' + cta + '</span></span>' +
      '<span class="arc-mod__arrow" aria-hidden="true">&rarr;</span>';
    a.addEventListener('click', function () {
      try {
        (window.dataLayer = window.dataLayer || []).push({
          event: 'arcanju_troca_modelagem',
          estampa: nome,
          de: paraBabyLook ? 'tradicional' : 'baby_look',
          para: paraBabyLook ? 'baby_look' : 'tradicional'
        });
      } catch (e) {}
    });
    return a;
  }

  // ---- onde inserir: logo abaixo do seletor de tamanho ----
  function inserir() {
    if (document.querySelector('.arc-mod')) return true;
    var alvo =
      document.querySelector('.js-product-variants') ||
      document.querySelector('[data-variant-group]') ||
      document.querySelector('.js-product-variants-group');
    var faixa = criarFaixa();
    if (alvo) { alvo.parentNode.insertBefore(faixa, alvo.nextSibling); return true; }

    var botao = document.querySelector('.js-addtocart, input[type="submit"].js-prod-submit-form, .js-product-form [type="submit"]');
    if (botao) {
      var bloco = botao.closest('.form-row, .row, div') || botao;
      bloco.parentNode.insertBefore(faixa, bloco);
      return true;
    }
    return false;
  }

  function iniciar() {
    if (inserir()) return;
    var tentativas = 0;
    var obs = new MutationObserver(function () {
      if (inserir() || ++tentativas > 60) obs.disconnect();
    });
    obs.observe(document.body, { childList: true, subtree: true });
    setTimeout(function () { obs.disconnect(); }, 8000);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', iniciar);
  else iniciar();
})();
