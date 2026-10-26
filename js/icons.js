/* Ícones em SVG (linha), embutidos para funcionar sem internet */
const ICON_PATHS = {
  inicio: '<path d="M3 10.5 12 3l9 7.5"/><path d="M5 9.5V21h14V9.5"/><path d="M10 21v-6h4v6"/>',
  mensagens: '<path d="M21 12a8 8 0 0 1-11.6 7.1L4 20l1-4.6A8 8 0 1 1 21 12z"/><path d="M8 11h.01M12 11h.01M16 11h.01"/>',
  notificacoes: '<path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"/><path d="M10.3 21a1.9 1.9 0 0 0 3.4 0"/>',
  favoritos: '<path d="M19 14c1.5-1.5 3-3.2 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.8 0-3 .5-4.5 2-1.5-1.5-2.7-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4 3 5.5l7 7z"/>',
  perfil: '<circle cx="12" cy="8" r="4"/><path d="M4 21a8 8 0 0 1 16 0"/>',
  cesta: '<path d="M4 11h16l-1.6 9H5.6z"/><path d="M8 11l4-7 4 7"/><path d="M9 15v2M12 15v2M15 15v2"/>',
  aperto: '<path d="m11 17 2 2a1 1 0 0 0 3-3"/><path d="m14 14 2.5 2.5a1 1 0 0 0 3-3l-3.9-3.9a3 3 0 0 0-4.2 0l-.9.9a1 1 0 0 1-3-3l2.8-2.8a5.8 5.8 0 0 1 7.1-.9l.5.3a4 4 0 0 0 2.6.6H21"/><path d="m21 3 1 11h-2"/><path d="M3 3 2 14l6.5 6.5a1 1 0 0 0 3-3"/><path d="M3 4h8"/>',
  preco: '<path d="M12.6 2.6A2 2 0 0 0 11.2 2H4a2 2 0 0 0-2 2v7.2a2 2 0 0 0 .6 1.4l8.7 8.7a2.4 2.4 0 0 0 3.4 0l6.6-6.6a2.4 2.4 0 0 0 0-3.4z"/><circle cx="7.5" cy="7.5" r="1.5"/>',
  producao: '<rect x="5" y="4" width="14" height="18" rx="2"/><path d="M9 2h6v4H9z"/><path d="M9 11h6M9 15h6M9 19h3"/>',
  megafone: '<path d="M3 11v3a1 1 0 0 0 1 1h3l5 4V6L7 10H4a1 1 0 0 0-1 1z"/><path d="M16 9a4 4 0 0 1 0 6"/><path d="M19 6a8 8 0 0 1 0 12"/>',
  carrinho: '<circle cx="9" cy="20" r="1.5"/><circle cx="18" cy="20" r="1.5"/><path d="M2 3h3l2.7 12.4a2 2 0 0 0 2 1.6h8.6a2 2 0 0 0 2-1.6L22 8H6"/>',
  broto: '<path d="M12 21v-9"/><path d="M12 12C12 7 9 4 4 4c0 5 3 8 8 8z"/><path d="M12 14c0-4 3-6 7-6 0 4-3 6-7 6z"/><path d="M6 21h12"/>',
  clima: '<circle cx="8" cy="8" r="3"/><path d="M8 2v1M2 8h1M3.8 3.8l.7.7M12.2 3.8l-.7.7"/><path d="M17 20H8a4 4 0 1 1 .9-7.9A5 5 0 1 1 17 20z"/>',
  noticias: '<path d="M2 4h6a4 4 0 0 1 4 4v13a3 3 0 0 0-3-3H2z"/><path d="M22 4h-6a4 4 0 0 0-4 4v13a3 3 0 0 1 3-3h7z"/>',
  comunidade: '<circle cx="9" cy="8" r="3.5"/><path d="M2 21a7 7 0 0 1 14 0"/><circle cx="17" cy="9" r="2.5"/><path d="M17 14a5 5 0 0 1 5 5"/>',
  folha: '<path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.5 19 2c1 2 2 4.2 2 8 0 5.5-4.8 10-10 10z"/><path d="M2 21c0-3 1.9-5.4 5.2-6"/>',
  seta: '<path d="m9 6 6 6-6 6"/>',
  voltar: '<path d="m15 6-6 6 6 6"/>',
  mais: '<path d="M12 5v14M5 12h14"/>',
  lixo: '<path d="M3 6h18M8 6V4h8v2M6 6l1 15h10l1-15"/>',
  local: '<path d="M12 22s7-6.5 7-12a7 7 0 0 0-14 0c0 5.5 7 12 7 12z"/><circle cx="12" cy="10" r="2.5"/>',
  telefone: '<path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1.9.4 1.8.7 2.7a2 2 0 0 1-.5 2.1L8 9.8a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.7.7a2 2 0 0 1 1.7 2z"/>',
  sair: '<path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="m16 17 5-5-5-5M21 12H9"/>',
  subir: '<path d="m3 17 6-6 4 4 8-8"/><path d="M14 7h7v7"/>',
  descer: '<path d="m3 7 6 6 4-4 8 8"/><path d="M14 17h7v-7"/>',
  estavel: '<path d="M4 12h16"/><path d="m15 7 5 5-5 5"/>',
  baixar: '<path d="M12 3v12"/><path d="m7 10 5 5 5-5"/><path d="M4 21h16"/>',
  check: '<path d="m5 12 5 5L20 7"/>',
  fechar: '<path d="M6 6l12 12M18 6 6 18"/>',
  enviar: '<path d="M22 2 11 13"/><path d="M22 2 15 22l-4-9-9-4z"/>',
  compartilhar: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><path d="m8.6 13.5 6.8 4M15.4 6.5l-6.8 4"/>',
  info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4M12 8h.01"/>',
  gota: '<path d="M12 2.7s6 6.3 6 11.3a6 6 0 0 1-12 0c0-5 6-11.3 6-11.3z"/>'
};

function icon(nome, cls = '') {
  return `<svg class="ic ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${ICON_PATHS[nome] || ''}</svg>`;
}

/* Logo Casa Verde: telhado de casa com folhas e plantação */
function logo(size = 64) {
  return `<svg class="logo-svg" width="${size}" height="${size}" viewBox="0 0 64 64" aria-hidden="true">
    <path d="M7 30 32 9l25 21" fill="none" stroke="#1f5a2b" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="44" y="11" width="6" height="11" rx="1" fill="#1f5a2b"/>
    <path d="M13 27v25h38V27" fill="none" stroke="#1f5a2b" stroke-width="4" stroke-linejoin="round"/>
    <path d="M32 44C23 44 17 38 17 30c8 0 15 6 15 14z" fill="#7cb342"/>
    <path d="M32 44c9 0 15-6 15-14-8 0-15 6-15 14z" fill="#4e8f2a"/>
    <path d="M32 40c-5-5-5-13 0-19 5 6 5 14 0 19z" fill="#2f6b1f"/>
    <path d="M18 48c8-3 20-3 28 0" fill="none" stroke="#4e8f2a" stroke-width="3" stroke-linecap="round"/>
  </svg>`;
}
