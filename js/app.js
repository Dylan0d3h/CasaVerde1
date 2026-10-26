
const Dados = {
  ler(chave, padrao) {
    try { const v = localStorage.getItem('cv_' + chave); return v ? JSON.parse(v) : padrao; }
    catch (e) { return padrao; }
  },
  salvar(chave, valor) {
    try { localStorage.setItem('cv_' + chave, JSON.stringify(valor)); } catch (e) { /* sem armazenamento */ }
  },
  apagarTudo() {
    try { Object.keys(localStorage).filter(k => k.startsWith('cv_')).forEach(k => localStorage.removeItem(k)); } catch (e) {}
  }
};

/* Dados de exemplo para a demonstração */
const EXEMPLO = {
  produtos: [
    { id: 1, nome: 'Alface crespa', categoria: 'Hortaliças', qtd: 40, unidade: 'pé', preco: 3.0 },
    { id: 2, nome: 'Tomate', categoria: 'Legumes', qtd: 25, unidade: 'kg', preco: 7.5 },
    { id: 3, nome: 'Mandioca', categoria: 'Raízes', qtd: 60, unidade: 'kg', preco: 4.0 }
  ],
  producao: [
    { id: 1, cultura: 'Alface', area: '2 canteiros', plantio: '2026-09-20', dias: 45 },
    { id: 2, cultura: 'Tomate', area: '0,5 ha', plantio: '2026-08-10', dias: 110 },
    { id: 3, cultura: 'Cebolinha', area: '1 canteiro', plantio: '2026-10-05', dias: 60 }
  ],
  pedidos: [
    { id: 1, cliente: 'Restaurante Sabor do Campo', itens: '10 kg de tomate', valor: 75, status: 'novo' },
    { id: 2, cliente: 'Maria Souza', itens: '6 pés de alface', valor: 18, status: 'novo' },
    { id: 3, cliente: 'Mercado Bom Preço', itens: '20 kg de mandioca', valor: 80, status: 'aceito' }
  ],
  conversas: {
    1: [{ de: 'deles', txt: 'Bom dia! Vocês têm tomate para entrega na sexta?' }],
    2: [{ de: 'deles', txt: 'Olá! Gostaria de saber o preço da alface.' }],
    3: [{ de: 'deles', txt: 'A feira de sábado começa às 6h, você vai participar?' }]
  }
};

const COMPRADORES = [
  { id: 1, nome: 'Restaurante Sabor do Campo', tipo: 'Restaurante', busca: 'Tomate, cebolinha, alface', dist: '3 km', emoji: '🍽️' },
  { id: 2, nome: 'Mercado Bom Preço', tipo: 'Mercado', busca: 'Mandioca, banana, verduras', dist: '5 km', emoji: '🛒' },
  { id: 3, nome: 'Feira do Produtor', tipo: 'Feira livre', busca: 'Hortaliças em geral', dist: '2 km', emoji: '🧺' },
  { id: 4, nome: 'Escola Municipal (merenda)', tipo: 'Compra pública', busca: 'Frutas e hortaliças', dist: '4 km', emoji: '🏫' },
  { id: 5, nome: 'Padaria Pão Caseiro', tipo: 'Padaria', busca: 'Ovos, leite, queijo', dist: '6 km', emoji: '🥖' }
];

const PRECOS = [
  { item: 'Alface', un: 'pé', preco: 3.00, tend: 'sobe' },
  { item: 'Tomate', un: 'kg', preco: 7.50, tend: 'sobe' },
  { item: 'Cebola', un: 'kg', preco: 5.20, tend: 'desce' },
  { item: 'Mandioca', un: 'kg', preco: 4.00, tend: 'igual' },
  { item: 'Cenoura', un: 'kg', preco: 4.80, tend: 'desce' },
  { item: 'Couve', un: 'maço', preco: 3.50, tend: 'igual' },
  { item: 'Banana', un: 'kg', preco: 5.90, tend: 'sobe' },
  { item: 'Ovos', un: 'dúzia', preco: 9.00, tend: 'igual' }
];

const DICAS = [
  { t: 'Irrigação na seca', d: 'Regue de manhã cedo ou no fim da tarde para perder menos água com o calor.', e: '💧' },
  { t: 'Cobertura do solo', d: 'Palha seca sobre os canteiros mantém a umidade e reduz o mato.', e: '🌾' },
  { t: 'Rotação de culturas', d: 'Alternar o que é plantado em cada canteiro ajuda a evitar pragas e doenças.', e: '🔄' },
  { t: 'Pós-colheita', d: 'Colha nas horas frescas e guarde à sombra para as hortaliças durarem mais.', e: '🥬' }
];

const NOTICIAS = [
  { t: 'Feira do Produtor ganha novo horário', d: 'A feira passa a abrir às 6h aos sábados.', data: 'Hoje' },
  { t: 'Inscrições para venda à merenda escolar', d: 'Agricultores familiares podem se cadastrar para vender às escolas.', data: 'Ontem' },
  { t: 'Curso gratuito de manejo do solo', d: 'Oficina prática na próxima semana, vagas limitadas.', data: '3 dias' }
];

const CLIMA = {
  hoje: { temp: 33, desc: 'Ensolarado com poucas nuvens', chuva: '10%', umid: '48%' },
  dias: [
    { d: 'Ter', e: '☀️', max: 34, min: 22 }, { d: 'Qua', e: '⛅', max: 32, min: 21 },
    { d: 'Qui', e: '🌧️', max: 28, min: 20 }, { d: 'Sex', e: '🌦️', max: 29, min: 20 },
    { d: 'Sáb', e: '☀️', max: 33, min: 21 }
  ]
};

const NOTIFICACOES = [
  { t: 'Novo pedido recebido', d: 'Maria Souza pediu 6 pés de alface.', e: '🛒' },
  { t: 'Previsão de chuva', d: 'Chuva prevista para quinta-feira.', e: '🌧️' },
  { t: 'Preço do tomate subiu', d: 'O tomate está R$ 0,50 mais caro na região.', e: '📈' }
];

/* ---------- Utilidades ---------- */
const $ = (sel, el = document) => el.querySelector(sel);
const app = $('#app');
const real = v => v.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const usuario = () => Dados.ler('usuario', { nome: 'Agricultor', cidade: '' });
const primeiroNome = () => (usuario()?.nome || 'Agricultor').split(' ')[0];

function toast(msg) {
  const t = $('#toast'); t.textContent = msg; t.classList.add('show');
  clearTimeout(toast._t); toast._t = setTimeout(() => t.classList.remove('show'), 2200);
}

function mascaraCPF(v) {
  v = v.replace(/\D/g, '').slice(0, 11);
  return v.replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d)/, '$1.$2').replace(/(\d{3})(\d{1,2})$/, '$1-$2');
}
function cpfValido(cpf) {
  cpf = cpf.replace(/\D/g, '');
  if (cpf.length !== 11 || /^(\d)\1+$/.test(cpf)) return false;
  for (let t = 9; t < 11; t++) {
    let s = 0;
    for (let i = 0; i < t; i++) s += cpf[i] * (t + 1 - i);
    if (((10 * s) % 11) % 10 != cpf[t]) return false;
  }
  return true;
}

function ir(rota) { location.hash = rota; }

/* ---------- Partes reutilizadas ---------- */
const NAV = [
  { r: 'inicio', t: 'Início', i: 'inicio' },
  { r: 'mensagens', t: 'Mensagens', i: 'mensagens' },
  { r: 'notificacoes', t: 'Notificações', i: 'notificacoes', badge: true },
  { r: 'favoritos', t: 'Favoritos', i: 'favoritos' },
  { r: 'perfil', t: 'Perfil', i: 'perfil' }
];

function naoLidas() { return Dados.ler('notifLidas', false) ? 0 : NOTIFICACOES.length; }

function casca(rotaAtiva, html) {
  const n = naoLidas();
  return `
    <div class="casca">
      <main class="conteudo">${html}</main>
      <nav class="nav" aria-label="Menu principal">
        <div class="marca-lateral">${logo(40)}Casa Verde</div>
        ${NAV.map(i => `
          <a href="#/${i.r}" class="${rotaAtiva === i.r ? 'ativo' : ''}">
            ${icon(i.i)}<span>${i.t}</span>
            ${i.badge && n ? `<span class="badge">${n}</span>` : ''}
          </a>`).join('')}
      </nav>
    </div>`;
}

function topo(titulo, sub = '', voltar = '#/inicio') {
  return `
    <header class="tela-topo">
      <a class="btn-voltar-claro" href="${voltar}" aria-label="Voltar">${icon('voltar')}</a>
      <div><h1>${titulo}</h1>${sub ? `<p>${sub}</p>` : ''}</div>
    </header>`;
}

function modal(titulo, corpo, aoAbrir) {
  const fundo = document.createElement('div');
  fundo.className = 'modal-fundo';
  fundo.innerHTML = `<div class="modal" role="dialog" aria-modal="true">
      <div class="modal-topo"><h2>${titulo}</h2><button class="icone-btn" data-fechar aria-label="Fechar">${icon('fechar')}</button></div>
      ${corpo}</div>`;
  const fechar = () => fundo.remove();
  fundo.addEventListener('click', e => { if (e.target === fundo || e.target.closest('[data-fechar]')) fechar(); });
  document.body.appendChild(fundo);
  aoAbrir && aoAbrir(fundo, fechar);
}

/* =========================================================
   TELAS
   ========================================================= */
const Telas = {};



/* ----- Início ----- */
const CARTOES = [
  { r: 'produtos', t: 'Cadastrar Produtos', d: 'Cadastre suas hortaliças e outros produtos.', i: 'cesta' },
  { r: 'compradores', t: 'Encontrar Compradores', d: 'Conecte-se com compradores da sua região.', i: 'aperto' },
  { r: 'precos', t: 'Preços', d: 'Acompanhe os preços das hortaliças na sua região.', i: 'preco' },
  { r: 'producao', t: 'Minha Produção', d: 'Organize e acompanhe sua produção.', i: 'producao' },
  { r: 'divulgar', t: 'Divulgar Produtos', d: 'Divulgue seus produtos e alcance mais clientes.', i: 'megafone' },
  { r: 'vender', t: 'Vender', d: 'Receba pedidos e aumente suas vendas.', i: 'carrinho' }
];

Telas.inicio = () => {
  const n = naoLidas();
  app.innerHTML = casca('inicio', `
    <header class="home-topo">
      <div class="home-linha">
        <div>
          <div class="marca-h">${logo(52)}<div class="txt">Casa<br>Verde</div></div>
          <p class="home-sub">Conectando o agricultor familiar a novas oportunidades.</p>
        </div>
        <div style="display:flex;align-items:flex-start">
          <div class="ola"><strong>Olá, ${esc(primeiroNome())}!</strong><span>Que bom te ver por aqui!</span></div>
          <a class="sino" href="#/notificacoes" aria-label="Notificações">${icon('notificacoes')}${n ? `<span class="badge">${n}</span>` : ''}</a>
        </div>
      </div>
    </header>

    <div class="banner">
      <div class="ic-grande">${icon('broto', 'lg')}</div>
      <div>
        <h2>Fortaleça sua produção, valorize seu trabalho e colha bons resultados!</h2>
        <p>O campo cresce quando a gente se conecta.</p>
      </div>
    </div>

    <div class="grade">
      ${CARTOES.map(c => `
        <a class="cartao" href="#/${c.r}">
          <div class="bola">${icon(c.i, 'lg')}</div>
          <h3>${c.t}</h3>
          <p>${c.d}</p>
          <span class="ir">${icon('seta')}</span>
        </a>`).join('')}
    </div>

    <section class="fique">
      <h3>Fique por dentro</h3>
      <div class="fique-itens">
        <a href="#/dicas"><span class="bola">${icon('broto', 'sm')}</span><strong>Dicas técnicas</strong>Aprenda e melhore sua produção.</a>
        <a href="#/clima"><span class="bola">${icon('clima', 'sm')}</span><strong>Clima</strong>Veja a previsão do tempo.</a>
        <a href="#/noticias"><span class="bola">${icon('noticias', 'sm')}</span><strong>Notícias</strong>Fique informado sobre o campo.</a>
      </div>
    </section>
  `);
};

/* ----- Cadastrar Produtos ----- */
Telas.produtos = () => {
  const lista = Dados.ler('produtos', EXEMPLO.produtos);
  app.innerHTML = casca('inicio', `
    ${topo('Meus Produtos', 'Cadastre o que você tem para vender')}
    <div class="secao">
      <button class="btn btn-primario btn-bloco" id="novo">${icon('mais')} Cadastrar produto</button>
      <h2 class="secao-titulo" style="margin-top:18px">Produtos cadastrados <span class="etiqueta">${lista.length}</span></h2>
      <div class="lista duas">
        ${lista.length ? lista.map(p => `
          <div class="item">
            <div class="bola">${icon('cesta')}</div>
            <div class="meio"><h3>${esc(p.nome)}</h3>
              <div class="sub">${esc(p.categoria)} · ${p.qtd} ${esc(p.unidade)} · <strong>${real(+p.preco)}</strong>/${esc(p.unidade)}</div></div>
            <button class="icone-btn" data-apagar="${p.id}" aria-label="Remover">${icon('lixo', 'sm')}</button>
          </div>`).join('') : `<p class="vazio">Nenhum produto ainda. Cadastre o primeiro!</p>`}
      </div>
    </div>`);

  app.querySelectorAll('[data-apagar]').forEach(b => b.onclick = () => {
    Dados.salvar('produtos', lista.filter(p => p.id != b.dataset.apagar));
    toast('Produto removido'); Telas.produtos();
  });

  $('#novo').onclick = () => modal('Novo produto', `
    <form id="fp">
      <div class="campo"><label>Nome do produto</label><input name="nome" placeholder="Ex.: Alface americana" required></div>
      <div class="campo"><label>Categoria</label>
        <select name="categoria"><option>Hortaliças</option><option>Legumes</option><option>Frutas</option><option>Raízes</option><option>Ovos e laticínios</option><option>Outros</option></select></div>
      <div class="linha">
        <div class="campo"><label>Quantidade</label><input name="qtd" type="number" min="1" inputmode="numeric" value="10" required></div>
        <div class="campo"><label>Unidade</label><select name="unidade"><option>kg</option><option>pé</option><option>maço</option><option>dúzia</option><option>caixa</option><option>litro</option></select></div>
      </div>
      <div class="campo"><label>Preço por unidade (R$)</label><input name="preco" type="number" min="0" step="0.01" inputmode="decimal" placeholder="0,00" required></div>
      <button class="btn btn-primario btn-bloco">Salvar produto</button>
    </form>`, (m, fechar) => {
    $('#fp', m).onsubmit = e => {
      e.preventDefault();
      const f = Object.fromEntries(new FormData(e.target));
      if (!f.nome.trim()) return;
      lista.push({ id: Date.now(), ...f, qtd: +f.qtd, preco: +f.preco });
      Dados.salvar('produtos', lista);
      fechar(); toast('Produto cadastrado! ✅'); Telas.produtos();
    };
  });
};

/* ----- Encontrar Compradores ----- */
function cartaoComprador(c, favs) {
  const fav = favs.includes(c.id);
  return `
    <div class="item">
      <div class="bola">${c.emoji}</div>
      <div class="meio"><h3>${c.nome}</h3>
        <div class="sub">${c.tipo} · ${icon('local', 'sm').replace('class="ic', 'style="width:13px;height:13px;vertical-align:-2px" class="ic')} ${c.dist}</div>
        <div class="sub">Procura: ${c.busca}</div></div>
      <div class="acoes">
        <button class="icone-btn ${fav ? 'ativo' : ''}" data-fav="${c.id}" aria-label="Favoritar">${icon('favoritos', 'sm')}</button>
        <a class="icone-btn" href="#/conversa/${c.id}" aria-label="Conversar">${icon('mensagens', 'sm')}</a>
      </div>
    </div>`;
}
function ligarFavoritos(recarregar) {
  app.querySelectorAll('[data-fav]').forEach(b => b.onclick = () => {
    let favs = Dados.ler('favoritos', []);
    const id = +b.dataset.fav;
    favs = favs.includes(id) ? favs.filter(f => f !== id) : [...favs, id];
    Dados.salvar('favoritos', favs);
    toast(favs.includes(id) ? 'Adicionado aos favoritos ❤️' : 'Removido dos favoritos');
    recarregar();
  });
}
Telas.compradores = () => {
  const favs = Dados.ler('favoritos', []);
  app.innerHTML = casca('inicio', `
    ${topo('Encontrar Compradores', 'Compradores perto de você')}
    <div class="secao">
      <div class="lista duas">${COMPRADORES.map(c => cartaoComprador(c, favs)).join('')}</div>
    </div>`);
  ligarFavoritos(Telas.compradores);
};

/* ----- Preços ----- */
Telas.precos = () => {
  const rot = { sobe: ['subir', 'Subiu'], desce: ['descer', 'Caiu'], igual: ['estavel', 'Estável'] };
  app.innerHTML = casca('inicio', `
    ${topo('Preços na Região', 'Valores médios desta semana')}
    <div class="secao">
      <div class="painel">
        <table class="tabela">
          <thead><tr><th>Produto</th><th>Preço</th><th>Tendência</th></tr></thead>
          <tbody>${PRECOS.map(p => `
            <tr><td><strong>${p.item}</strong></td><td>${real(p.preco)} <small style="color:var(--texto-suave)">/${p.un}</small></td>
            <td><span class="tend ${p.tend}">${icon(rot[p.tend][0], 'sm')}${rot[p.tend][1]}</span></td></tr>`).join('')}
          </tbody>
        </table>
      </div>
      <p class="sub" style="font-size:13px;color:var(--texto-suave)">${icon('info', 'sm').replace('class="ic', 'style="vertical-align:-4px" class="ic')} Valores ilustrativos para demonstração. Na versão final, os preços virão de bases públicas de cotação.</p>
    </div>`);
};

/* ----- Minha Produção ----- */
Telas.producao = () => {
  const lista = Dados.ler('producao', EXEMPLO.producao);
  const hoje = new Date();
  app.innerHTML = casca('inicio', `
    ${topo('Minha Produção', 'Acompanhe seus plantios até a colheita')}
    <div class="secao">
      <button class="btn btn-primario btn-bloco" id="novo">${icon('mais')} Registrar plantio</button>
      <div class="lista duas" style="margin-top:16px">
        ${lista.map(p => {
          const passou = Math.max(0, Math.round((hoje - new Date(p.plantio)) / 864e5));
          const pct = Math.min(100, Math.round(passou / p.dias * 100));
          const falta = Math.max(0, p.dias - passou);
          return `<div class="item" style="align-items:flex-start">
            <div class="bola">${icon('broto')}</div>
            <div class="meio">
              <h3>${esc(p.cultura)} <span class="etiqueta ${pct >= 100 ? '' : 'amarela'}">${pct >= 100 ? 'Pronto p/ colher' : 'Crescendo'}</span></h3>
              <div class="sub">${esc(p.area)} · plantado em ${new Date(p.plantio + 'T12:00').toLocaleDateString('pt-BR')}</div>
              <div class="progresso"><span style="width:${pct}%"></span></div>
              <div class="sub">${pct >= 100 ? 'Colheita liberada 🎉' : `Faltam cerca de ${falta} dias para a colheita`}</div>
            </div>
            <button class="icone-btn" data-apagar="${p.id}" aria-label="Remover">${icon('lixo', 'sm')}</button>
          </div>`;
        }).join('')}
      </div>
    </div>`);

  app.querySelectorAll('[data-apagar]').forEach(b => b.onclick = () => {
    Dados.salvar('producao', lista.filter(p => p.id != b.dataset.apagar)); Telas.producao();
  });
  $('#novo').onclick = () => modal('Registrar plantio', `
    <form id="fp">
      <div class="campo"><label>Cultura</label><input name="cultura" placeholder="Ex.: Couve" required></div>
      <div class="campo"><label>Área</label><input name="area" placeholder="Ex.: 3 canteiros"></div>
      <div class="linha">
        <div class="campo"><label>Data do plantio</label><input name="plantio" type="date" value="${hoje.toISOString().slice(0, 10)}" required></div>
        <div class="campo"><label>Dias até colher</label><input name="dias" type="number" min="1" value="60" required></div>
      </div>
      <button class="btn btn-primario btn-bloco">Salvar</button>
    </form>`, (m, fechar) => {
    $('#fp', m).onsubmit = e => {
      e.preventDefault();
      const f = Object.fromEntries(new FormData(e.target));
      lista.push({ id: Date.now(), ...f, dias: +f.dias });
      Dados.salvar('producao', lista); fechar(); toast('Plantio registrado 🌱'); Telas.producao();
    };
  });
};

/* ----- Divulgar Produtos ----- */
Telas.divulgar = () => {
  const prods = Dados.ler('produtos', EXEMPLO.produtos);
  const u = usuario();
  const texto = p => `🌱 Direto da roça para sua mesa!\n\n${p ? `${p.nome} fresquinho: ${real(+p.preco)} o ${p.unidade}.` : 'Produtos frescos da agricultura familiar.'}\nProduzido por ${u?.nome || 'agricultor familiar'}${u?.cidade ? ` – ${u.cidade}` : ''}.\n\nFaça seu pedido pelo app Casa Verde! 💚`;
  app.innerHTML = casca('inicio', `
    ${topo('Divulgar Produtos', 'Monte um anúncio e compartilhe')}
    <div class="secao">
      <div class="campo"><label for="sel">Escolha o produto</label>
        <select id="sel">${prods.map((p, i) => `<option value="${i}">${esc(p.nome)}</option>`).join('')}</select></div>
      <div class="post">
        <div class="post-img"><span id="pnome">${esc(prods[0]?.nome || 'Casa Verde')}</span></div>
        <div class="post-txt" id="ptxt">${esc(texto(prods[0]))}</div>
      </div>
      <div style="display:grid;gap:10px;margin-top:14px">
        <button class="btn btn-primario" id="comp">${icon('compartilhar')} Compartilhar</button>
        <button class="btn btn-claro" id="copiar">Copiar texto</button>
      </div>
    </div>`);
  const atual = () => prods[$('#sel').value];
  $('#sel').onchange = () => { $('#pnome').textContent = atual().nome; $('#ptxt').textContent = texto(atual()); };
  $('#comp').onclick = async () => {
    const t = texto(atual());
    if (navigator.share) { try { await navigator.share({ title: 'Casa Verde', text: t }); } catch (e) {} }
    else { window.open('https://wa.me/?text=' + encodeURIComponent(t), '_blank'); }
  };
  $('#copiar').onclick = async () => {
    try { await navigator.clipboard.writeText(texto(atual())); toast('Texto copiado!'); } catch (e) { toast('Não foi possível copiar'); }
  };
};

/* ----- Vender (pedidos) ----- */
Telas.vender = () => {
  const pedidos = Dados.ler('pedidos', EXEMPLO.pedidos);
  const total = pedidos.filter(p => p.status === 'aceito').reduce((s, p) => s + p.valor, 0);
  const tag = { novo: ['amarela', 'Novo'], aceito: ['', 'Aceito'], recusado: ['cinza', 'Recusado'] };
  app.innerHTML = casca('inicio', `
    ${topo('Vender', 'Seus pedidos e vendas')}
    <div class="secao">
      <div class="painel" style="display:flex;justify-content:space-between;align-items:center">
        <div><div class="sub" style="font-size:13px;color:var(--texto-suave)">Vendas aceitas</div><strong style="font-size:26px;color:var(--verde-escuro)">${real(total)}</strong></div>
        <div class="bola" style="width:52px;height:52px;border-radius:50%;background:var(--verde-pastel);display:grid;place-items:center;color:var(--verde-escuro)">${icon('carrinho')}</div>
      </div>
      <h2 class="secao-titulo">Pedidos recebidos</h2>
      <div class="lista duas">
        ${pedidos.map(p => `
          <div class="item" style="flex-wrap:wrap">
            <div class="meio"><h3>${esc(p.cliente)}</h3><div class="sub">${esc(p.itens)} · <strong>${real(p.valor)}</strong></div></div>
            <span class="etiqueta ${tag[p.status][0]}">${tag[p.status][1]}</span>
            ${p.status === 'novo' ? `<div style="display:flex;gap:8px;width:100%">
              <button class="btn btn-primario btn-pequeno" style="flex:1" data-acao="aceito" data-id="${p.id}">${icon('check', 'sm')} Aceitar</button>
              <button class="btn btn-claro btn-pequeno" style="flex:1" data-acao="recusado" data-id="${p.id}">Recusar</button></div>` : ''}
          </div>`).join('')}
      </div>
    </div>`);
  app.querySelectorAll('[data-acao]').forEach(b => b.onclick = () => {
    const p = pedidos.find(x => x.id == b.dataset.id); p.status = b.dataset.acao;
    Dados.salvar('pedidos', pedidos);
    toast(p.status === 'aceito' ? 'Pedido aceito! 🎉' : 'Pedido recusado'); Telas.vender();
  });
};

/* ----- Dicas, Clima, Notícias ----- */
Telas.dicas = () => {
  app.innerHTML = casca('inicio', `${topo('Dicas Técnicas', 'Aprenda e melhore sua produção')}
    <div class="secao"><div class="lista duas">${DICAS.map(d => `
      <div class="item" style="align-items:flex-start"><div class="bola">${d.e}</div><div class="meio"><h3>${d.t}</h3><div class="sub">${d.d}</div></div></div>`).join('')}
    </div></div>`);
};
Telas.clima = () => {
  const u = usuario();
  app.innerHTML = casca('inicio', `${topo('Clima', u?.cidade || 'Sua região')}
    <div class="secao">
      <div class="painel clima-hoje">
        <span style="font-size:56px">☀️</span>
        <div><div class="temp">${CLIMA.hoje.temp}°</div><div>${CLIMA.hoje.desc}</div>
        <div style="font-size:13px;opacity:.9;margin-top:4px">Chuva ${CLIMA.hoje.chuva} · Umidade ${CLIMA.hoje.umid}</div></div>
      </div>
      <h2 class="secao-titulo">Próximos dias</h2>
      <div class="dias">${CLIMA.dias.map(d => `<div class="dia"><strong>${d.d}</strong><span class="em">${d.e}</span>${d.max}° <span style="color:var(--texto-suave)">${d.min}°</span></div>`).join('')}</div>
      <div class="painel" style="margin-top:14px;display:flex;gap:10px;align-items:center">${icon('gota')}<span>Dica: chuva prevista na quinta. Aproveite para adiar a irrigação.</span></div>
      <p style="font-size:13px;color:var(--texto-suave)">Previsão ilustrativa para demonstração.</p>
    </div>`);
};
Telas.noticias = () => {
  app.innerHTML = casca('inicio', `${topo('Notícias', 'Fique informado sobre o campo')}
    <div class="secao"><div class="lista">${NOTICIAS.map(n => `
      <div class="item"><div class="bola">${icon('noticias')}</div><div class="meio"><h3>${n.t}</h3><div class="sub">${n.d}</div></div><span class="etiqueta cinza">${n.data}</span></div>`).join('')}
    </div></div>`);
};

/* ----- Mensagens ----- */
Telas.mensagens = () => {
  const conv = Dados.ler('conversas', EXEMPLO.conversas);
  const ids = Object.keys(conv);
  app.innerHTML = casca('mensagens', `${topo('Mensagens', 'Converse com compradores')}
    <div class="secao"><div class="lista">${ids.length ? ids.map(id => {
      const c = COMPRADORES.find(x => x.id == id); const ult = conv[id][conv[id].length - 1];
      return `<a class="item" href="#/conversa/${id}" style="text-decoration:none;color:inherit">
        <div class="bola">${c.emoji}</div><div class="meio"><h3>${c.nome}</h3><div class="sub" style="white-space:nowrap;overflow:hidden;text-overflow:ellipsis">${ult.de === 'minha' ? 'Você: ' : ''}${esc(ult.txt)}</div></div>${icon('seta', 'sm')}</a>`;
    }).join('') : '<p class="vazio">Nenhuma conversa ainda.</p>'}
    </div></div>`);
};
Telas.conversa = id => {
  const c = COMPRADORES.find(x => x.id == id);
  if (!c) return ir('#/mensagens');
  const conv = Dados.ler('conversas', EXEMPLO.conversas);
  conv[id] = conv[id] || [];
  app.innerHTML = casca('mensagens', `${topo(c.nome, c.tipo, '#/mensagens')}
    <div class="chat" id="chat">${conv[id].map(m => `<div class="bolha ${m.de}">${esc(m.txt)}</div>`).join('') || '<p class="vazio">Envie a primeira mensagem 👋</p>'}</div>
    <form class="chat-envio" id="fe"><input id="msg" placeholder="Escreva uma mensagem..." autocomplete="off"><button class="icone-btn" style="background:var(--verde-medio);color:#fff;width:46px;height:46px" aria-label="Enviar">${icon('enviar', 'sm')}</button></form>`);
  window.scrollTo(0, document.body.scrollHeight);
  $('#fe').onsubmit = e => {
    e.preventDefault();
    const txt = $('#msg').value.trim(); if (!txt) return;
    conv[id].push({ de: 'minha', txt });
    Dados.salvar('conversas', conv);
    Telas.conversa(id); $('#msg').focus();
    // resposta automática só para a demonstração
    setTimeout(() => {
      const c2 = Dados.ler('conversas', conv);
      c2[id].push({ de: 'deles', txt: 'Combinado! Obrigado pelo retorno 🙂' });
      Dados.salvar('conversas', c2);
      if (location.hash === '#/conversa/' + id) Telas.conversa(id);
    }, 1200);
  };
};

/* ----- Notificações ----- */
Telas.notificacoes = () => {
  Dados.salvar('notifLidas', true);
  app.innerHTML = casca('notificacoes', `${topo('Notificações')}
    <div class="secao"><div class="lista">${NOTIFICACOES.map(n => `
      <div class="item"><div class="bola">${n.e}</div><div class="meio"><h3>${n.t}</h3><div class="sub">${n.d}</div></div></div>`).join('')}
    </div></div>`);
};

/* ----- Favoritos ----- */
Telas.favoritos = () => {
  const favs = Dados.ler('favoritos', []);
  const lista = COMPRADORES.filter(c => favs.includes(c.id));
  app.innerHTML = casca('favoritos', `${topo('Favoritos', 'Compradores que você salvou')}
    <div class="secao">${lista.length ? `<div class="lista duas">${lista.map(c => cartaoComprador(c, favs)).join('')}</div>`
      : `<div class="vazio">${icon('favoritos', 'lg')}<p style="margin:10px 0 14px">Você ainda não salvou nenhum comprador.</p><a class="btn btn-primario" href="#/compradores">Encontrar compradores</a></div>`}
    </div>`);
  ligarFavoritos(Telas.favoritos);
};

/* ----- Perfil ----- */
Telas.perfil = () => {
  const u = usuario() || {};
  const iniciais = (u.nome || 'A').split(' ').map(p => p[0]).slice(0, 2).join('').toUpperCase();
  app.innerHTML = casca('perfil', `${topo('Meu Perfil')}
    <div class="secao">
      <div class="painel perfil-card">
        <div class="avatar">${iniciais}</div>
        <h2 style="color:var(--verde-escuro)">${esc(u.nome)}</h2>
        <p style="color:var(--texto-suave);font-size:14px">${u.cidade ? esc(u.cidade) : 'Agricultor familiar'}</p>
      </div>
      <div class="painel menu-lista">
        <button id="editar">${icon('perfil')} Editar meus dados</button>
        ${instalarDisponivel() ? `<button id="instalar">${icon('baixar')} Instalar app no aparelho</button>` : ''}
        <button id="sobre">${icon('folha')} Sobre o Casa Verde</button>
        <button id="limpar">${icon('lixo')} Restaurar dados de exemplo</button>
      </div>
      <p style="text-align:center;font-size:12px;color:var(--texto-suave)">Casa Verde v1.0.0 · protótipo de demonstração</p>
    </div>`);

  $('#editar').onclick = () => modal('Editar dados', `
    <form id="fp">
      <div class="campo"><label>Nome</label><input name="nome" value="${esc(u.nome)}" required></div>
      <div class="campo"><label>Cidade</label><input name="cidade" value="${esc(u.cidade)}"></div>
      <button class="btn btn-primario btn-bloco">Salvar</button>
    </form>`, (m, fechar) => {
    $('#fp', m).onsubmit = e => {
      e.preventDefault();
      const f = Object.fromEntries(new FormData(e.target));
      Dados.salvar('usuario', { ...u, ...f }); fechar(); toast('Dados atualizados'); Telas.perfil();
    };
  });
  $('#instalar')?.addEventListener('click', instalarApp);
  $('#sobre').onclick = () => modal('Sobre o Casa Verde', `
    <div class="mvv">
      <div class="painel"><h3>🎯 Missão</h3><p>Promover a conexão entre agricultores familiares e consumidores por meio da tecnologia, facilitando a divulgação e a comercialização de produtos locais.</p></div>
      <div class="painel"><h3>👁️ Visão</h3><p>Ser uma plataforma de referência na agricultura familiar, ampliando oportunidades para pequenos produtores e fortalecendo a economia local.</p></div>
      <div class="painel"><h3>💎 Valores</h3><p>Valorização da agricultura familiar · Sustentabilidade · Transparência e confiança · Inovação e inclusão digital · Compromisso com o desenvolvimento local · Respeito ao produtor rural.</p></div>
    </div>`);
  $('#limpar').onclick = () => {
    ['usuario', 'produtos', 'producao', 'pedidos', 'conversas', 'favoritos', 'notifLidas'].forEach(k => { try { localStorage.removeItem('cv_' + k); } catch (e) {} });
    toast('Dados de exemplo restaurados');
  };
};

/* =========================================================
   ROTAS (endereços das telas)
   ========================================================= */
function rotear() {
  const [rota, param] = (location.hash.replace(/^#\/?/, '') || '').split('/');
  if (!rota || !Telas[rota]) { if (location.hash !== '#/inicio') history.replaceState(null, '', '#/inicio'); }
  (Telas[rota] || Telas.inicio)(param);
  window.scrollTo(0, 0);
  document.title = Telas[rota] && rota !== 'inicio' ? `Casa Verde · ${rota[0].toUpperCase() + rota.slice(1)}` : 'Casa Verde';
}
window.addEventListener('hashchange', rotear);

/* =========================================================
   FUNCIONAR SEM INTERNET + INSTALAR NO CELULAR
   ========================================================= */
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => navigator.serviceWorker.register('sw.js').catch(() => {}));
}

function avisoOffline() { $('#offline-bar').hidden = navigator.onLine; }
window.addEventListener('online', avisoOffline);
window.addEventListener('offline', avisoOffline);
avisoOffline();

let pedidoInstalacao = null;
window.addEventListener('beforeinstallprompt', e => { e.preventDefault(); pedidoInstalacao = e; });
window.addEventListener('appinstalled', () => { pedidoInstalacao = null; toast('App instalado! 🎉'); });

const ehIOS = /iphone|ipad|ipod/i.test(navigator.userAgent);
const jaInstalado = () => window.matchMedia('(display-mode: standalone)').matches || navigator.standalone;
function instalarDisponivel() { return !jaInstalado() && (pedidoInstalacao || ehIOS || true); }

async function instalarApp() {
  if (pedidoInstalacao) {
    pedidoInstalacao.prompt();
    await pedidoInstalacao.userChoice; pedidoInstalacao = null;
    return;
  }
  modal('Instalar no aparelho', ehIOS
    ? `<p style="margin-bottom:10px">No iPhone, pelo <strong>Safari</strong>:</p>
       <ol style="padding-left:20px;line-height:1.8"><li>Toque no botão <strong>Compartilhar</strong> (quadrado com seta).</li><li>Escolha <strong>Adicionar à Tela de Início</strong>.</li><li>Toque em <strong>Adicionar</strong>.</li></ol>`
    : `<p style="margin-bottom:10px">No Android, pelo <strong>Chrome</strong>:</p>
       <ol style="padding-left:20px;line-height:1.8"><li>Toque nos <strong>três pontinhos</strong> (⋮) no canto superior.</li><li>Escolha <strong>Instalar app</strong> ou <strong>Adicionar à tela inicial</strong>.</li></ol>
       <p style="margin-top:10px;font-size:14px;color:var(--texto-suave)">No computador, use o ícone de instalar na barra de endereço do Chrome ou Edge.</p>`);
}

/* Abre a tela atual (por padrão, a tela inicial) */
rotear();
