# EcoTrend

E-commerce fictício especializado em produtos sustentáveis e ecológicos, desenvolvido como Checkpoint 04 da disciplina de Engenharia de Software (Web Development with JS) — FIAP.

O projeto reúne quatro categorias de produtos — **roupas e acessórios sustentáveis**, **beleza natural**, **casa sustentável** e **tecnologia verde** — e implementa funcionalidades interativas de front-end usando React e JavaScript puro: manipulação de estado/DOM, persistência local de dados, consumo de JSON e requisições assíncronas.

## Integrantes

- Gustavo Ferreira Silva RM571675
- Arthur Caram Fiorese Herrada RM569578
- Matheus Medeiros da Cunha RM572780
- Felipe Ricardo Moreira Aguiar RM573410
- Matheus Sequeira Franco RM571127

## Funcionalidades

- **Catálogo dinâmico**: os produtos são carregados de um arquivo JSON via `fetch` e renderizados na tela, com spinner de carregamento enquanto a requisição está em andamento.
- **Filtro por categoria**: a lista de produtos é filtrada em tempo real, sem recarregar a página.
- **Carrinho de compras**: adicionar, remover e alterar quantidade de itens, com contador visível no cabeçalho.
- **Carrinho persistente**: os itens do carrinho continuam salvos mesmo depois de fechar e reabrir o navegador, usando `localStorage`.
- **Checkout simulado**: ao finalizar a compra, o pedido passa por uma etapa assíncrona (validação + confirmação) usando `Promises` e `async/await`, com mensagens de sucesso ou erro.

## Tecnologias utilizadas

| Tecnologia | Uso no projeto |
|---|---|
| React | Componentização da interface e gerenciamento de estado |
| Vite | Servidor de desenvolvimento e build do projeto |
| JavaScript (ES6+) | Lógica de carrinho, filtros, fetch e promises |
| CSS | Estilização e identidade visual |
| Font Awesome / Google Fonts | Ícones e tipografia |

## Estrutura de pastas

```
cp4web/
├── public/
│   └── products.json      → base de dados dos produtos (consumida via fetch)
├── src/
│   ├── assets/
│   │   └── logo.svg
│   ├── App.jsx             → componente raiz: estado global, fetch e regras de negócio
│   ├── App.css
│   ├── Header.jsx          → cabeçalho: logo, navegação e ícone do carrinho
│   ├── Footer.jsx          → rodapé: institucional e newsletter
│   ├── ProductList.jsx     → grade de produtos e filtro de categorias
│   ├── ProductCard.jsx     → card individual de cada produto
│   ├── Cart.jsx            → painel lateral do carrinho e checkout
│   ├── index.css           → estilos globais e tipografia
│   └── main.jsx            → ponto de entrada da aplicação
└── index.html
```

## Como o projeto funciona (explicação técnica)

### 1. Carregamento dos produtos (JSON + Fetch)

Os dados dos produtos ficam em `public/products.json`, e não dentro de `src/`. Isso é proposital: arquivos em `public/` são servidos como estão, sem passar pelo processo de build do React — ou seja, o `fetch('/products.json')` funciona como uma requisição HTTP real, simulando a busca de dados em um servidor/API. Se o JSON estivesse em `src/`, ele precisaria ser importado como módulo JavaScript, e deixaria de demonstrar uma requisição assíncrona de verdade.

No `App.jsx`, essa busca acontece dentro de um `useEffect`, usando `async/await`:

```js
const response = await fetch(`${import.meta.env.BASE_URL}products.json`)
const data = await response.json()
```

Enquanto a resposta não chega, o estado `loading` fica `true` e a interface mostra um spinner — isso é o que o checkpoint pede em "Carregamento de Dados com Loading Spinner".

### 2. Carrinho e manipulação do DOM

No React, a "manipulação do DOM" não é feita manualmente (como em JS puro, com `document.getElementById`) — ela acontece de forma declarativa: o componente guarda os dados em **estado** (`useState`), e toda vez que esse estado muda, o React atualiza a tela sozinho. Por isso, ao clicar em "Adicionar" no `ProductCard`, a função `handleAddToCart` no `App.jsx` atualiza o array `cart`, e o contador no `Header`, a lista no `Cart` e o total são recalculados automaticamente, sem recarregar a página.

### 3. Persistência com localStorage

O carrinho é salvo no navegador do usuário através da API `localStorage`, que guarda dados como texto (por isso o uso de `JSON.stringify` ao salvar e `JSON.parse` ao ler). Um `useEffect` observa mudanças no estado `cart` e regrava o `localStorage` a cada alteração — assim, o carrinho sobrevive a um recarregamento de página ou ao fechar o navegador.

### 4. Checkout com Promises

A função `handleCheckout` no `App.jsx` retorna uma `Promise`, simulando o tempo de resposta de um servidor real ao confirmar um pedido:

```js
function handleCheckout() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      cart.length > 0 ? resolve() : reject()
    }, 1200)
  })
}
```

O componente `Cart.jsx` consome essa Promise com `async/await`, tratando os três estados possíveis da operação: processando, sucesso e erro — e exibindo a mensagem correspondente ao usuário.

### 5. Filtro de produtos

O filtro por categoria não faz nenhuma nova requisição: ele apenas filtra, no próprio navegador, o array de produtos já carregado (`products.filter(...)`), de acordo com a categoria selecionada. Isso mantém a navegação instantânea.

## Como rodar o projeto localmente

```bash
npm install
npm run dev
```

Depois, acesse o endereço exibido no terminal (geralmente `http://localhost:5173`).

## Deploy

O projeto está publicado via **Vercel**, acessível em:
`https://cp4-webdevelopment.vercel.app/`

## Créditos

Projeto desenvolvido para a disciplina de Engenharia de Software — Web Development, ministrada pelo Prof. Lucas Sousa, FIAP (fevereiro de 2026).
