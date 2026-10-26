/* Service Worker – faz o app abrir e funcionar sem internet.
   Ao mudar qualquer arquivo do app, aumente a VERSAO abaixo
   para que os celulares baixem a versão nova. */
const VERSAO = 'casa-verde-v2';

const ARQUIVOS = [
  './',
  './index.html',
  './css/style.css',
  './js/icons.js',
  './js/app.js',
  './img/campo.jpg',
  './img/familia.jpg',
  './manifest.json',
  './icons/icon-192.png',
  './icons/icon-512.png',
  './icons/icon-maskable-512.png',
  './icons/apple-touch-icon.png'
];

// Instala: guarda todos os arquivos no aparelho
self.addEventListener('install', event => {
  event.waitUntil(caches.open(VERSAO).then(cache => cache.addAll(ARQUIVOS)));
  self.skipWaiting();
});

// Ativa: apaga versões antigas
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(chaves => Promise.all(chaves.filter(c => c !== VERSAO).map(c => caches.delete(c))))
  );
  self.clients.claim();
});

// Busca: usa a internet quando tem; sem internet, usa a cópia guardada
self.addEventListener('fetch', event => {
  const req = event.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== location.origin) return;

  event.respondWith(
    fetch(req)
      .then(resp => {
        const copia = resp.clone();
        caches.open(VERSAO).then(cache => cache.put(req, copia));
        return resp;
      })
      .catch(() =>
        caches.match(req, { ignoreSearch: true }).then(r => r || caches.match('./index.html'))
      )
  );
});
