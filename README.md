# Casa Verde – Protótipo

Protótipo de demonstração do app **Casa Verde**, que conecta o agricultor familiar a novas oportunidades.
É um app web instalável (PWA): abre no navegador, se adapta a celular, tablet e computador, pode ser instalado na tela inicial do celular como um app e **funciona sem internet** depois do primeiro acesso.

## Telas

| Endereço | Tela |
|---|---|
| `#/inicio` | Tela inicial com os 6 cartões (abre direto, sem login) |
| `#/produtos` | Cadastrar produtos |
| `#/compradores` | Encontrar compradores |
| `#/precos` | Preços na região |
| `#/producao` | Minha produção |
| `#/divulgar` | Divulgar produtos (compartilhar no WhatsApp) |
| `#/vender` | Pedidos recebidos |
| `#/dicas` · `#/clima` · `#/noticias` | Fique por dentro |
| `#/mensagens` · `#/notificacoes` · `#/favoritos` · `#/perfil` | Menu inferior |

> O app abre direto na tela inicial, sem login. O nome pode ser trocado em **Perfil → Editar meus dados**.
> Os dados ficam salvos só no aparelho. Os preços, clima e compradores são de exemplo.

## Testar no computador

Precisa abrir por um servidor (o modo offline não funciona abrindo o arquivo direto). Na pasta do projeto:

```bash
npx serve .
# ou
python -m http.server 8000
```

Depois acesse `http://localhost:8000`.

## Publicar no GitHub

1. Crie um repositório novo em <https://github.com/new> (ex.: `casa-verde`).
2. Clique em **"uploading an existing file"** e arraste **todo o conteúdo desta pasta** (o `index.html` precisa ficar na raiz do repositório, não dentro de outra pasta).
3. Clique em **Commit changes**.

Ou pelo terminal:

```bash
git init
git add .
git commit -m "Protótipo Casa Verde"
git branch -M main
git remote add origin https://github.com/SEU-USUARIO/casa-verde.git
git push -u origin main
```

## Colocar no ar com a Vercel

1. Entre em <https://vercel.com> com sua conta do GitHub.
2. **Add New → Project** e escolha o repositório `casa-verde`.
3. Em *Framework Preset* deixe **Other**. Não precisa de comando de build.
4. Clique em **Deploy**. Em instantes você recebe um link `https://casa-verde-xxxx.vercel.app`.

Cada vez que você enviar mudanças para o GitHub, a Vercel atualiza o site sozinha.

## Instalar no celular (como app)

- **Android (Chrome):** abra o link → menu **⋮** → **Instalar app** (ou "Adicionar à tela inicial").
- **iPhone (Safari):** abra o link → botão **Compartilhar** → **Adicionar à Tela de Início**.

O ícone aparece na tela inicial e o app abre em tela cheia, sem a barra do navegador. Também há a opção **Perfil → Instalar app no aparelho**.

## Funcionar sem internet

O arquivo `sw.js` (service worker) guarda uma cópia do app no aparelho no primeiro acesso. Depois disso ele abre e funciona normalmente sem internet, e mostra um aviso amarelo no topo quando está offline.

**Ao alterar algum arquivo**, mude a versão no topo do `sw.js` (ex.: `casa-verde-v2` → `casa-verde-v3`) para os celulares receberem a atualização.

## Estrutura

```
index.html        página principal
css/style.css     visual e pontos de quebra (celular, tablet, computador)
js/app.js         telas e navegação
js/icons.js       ícones e logo em SVG
sw.js             modo offline
manifest.json     dados para instalar como app
vercel.json       configuração da Vercel
img/  icons/      imagens e ícones do app
```
