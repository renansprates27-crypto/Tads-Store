# TADS Store - Etapa 2: API, Busca e Filtro

## 🎯 O que foi implementado

### 1. **Integração com JSONPlaceholder API**
- Arquivo: `src/services/api.js`
- Função: `fetchProdutos()` que faz requisição GET para `https://jsonplaceholder.typicode.com/posts`
- Transforma dados do JSONPlaceholder em produtos com:
  - `id`, `nome`, `preco`, `imagem`, `descricao`
  - `categoria`, `promocao`, `desconto`

### 2. **Componente de Busca (Buscador)**
- Arquivo: `src/components/produto/Buscador.jsx`
- Input de texto com ícone de lupa 🔍
- Filtra produtos por nome ou descrição em tempo real
- Styling moderno com foco visual

### 3. **Componente de Filtro**
- Arquivo: `src/components/produto/Filtro.jsx`
- Botões para filtrar por categoria
- Botão "Todas" para limpar filtro
- Categoria ativa em destaque

### 4. **Vitrine Atualizada**
- Arquivo: `src/components/produto/Vitrine.jsx`
- Estados com `useState`:
  - `produtos` - dados brutos da API
  - `produtosFiltrados` - resultado de busca + filtro
  - `buscando` - loading state
  - `erro` - error handling
  - `termoBusca` - valor do input de busca
  - `categoriaSelecionada` - categoria ativa

- Hooks com `useEffect`:
  - Busca produtos da API ao montar componente
  - Re-filtra produtos quando termo de busca ou categoria mudam

- Estados visuais:
  - ⏳ Carregando
  - 😕 Nenhum resultado
  - ✅ Produtos encontrados com contagem

## 📦 Estrutura de pastas

```
src/
├── components/
│   ├── layout/
│   │   ├── Cabecalho.jsx
│   │   ├── Layout.jsx
│   │   ├── Rodape.jsx
│   │   ├── cabecalho.css
│   │   └── rodape.css
│   ├── produto/
│   │   ├── Buscador.jsx
│   │   ├── Filtro.jsx
│   │   ├── ProdutoCard.jsx
│   │   ├── Vitrine.jsx
│   │   ├── buscador.css
│   │   ├── filtro.css
│   │   ├── produtoCard.css
│   │   └── vitrine.css
│   └── common/
│       ├── Botao.jsx
│       └── botao.css
├── services/
│   └── api.js          ← NOVO!
├── data/
│   └── produtos.js
├── styles/
│   └── global.css
├── App.jsx
└── index.js
```

## ✅ Funcionalidades Implementadas

- [x] Fetch de produtos da API JSONPlaceholder
- [x] Busca por nome e descrição
- [x] Filtro por categoria
- [x] Loading state enquanto carrega
- [x] Error handling
- [x] Mensagem "Nenhum resultado encontrado"
- [x] Contagem de produtos filtrados
- [x] Responsivo em mobile/desktop

## 🔧 Como funciona a lógica de filtro

```javascript
// Usuário digita na busca
setTermoBusca("Produto")

// useEffect detecta mudança
useEffect(() => {
  let resultado = produtos; // começar com todos
  
  // Aplicar filtro de categoria
  if (categoriaSelecionada) {
    resultado = resultado.filter(p => p.categoria === categoriaSelecionada)
  }
  
  // Aplicar filtro de busca
  if (termoBusca) {
    resultado = resultado.filter(p => 
      p.nome.includes(termoBusca) || p.descricao.includes(termoBusca)
    )
  }
  
  setProdutosFiltrados(resultado)
}, [termoBusca, categoriaSelecionada, produtos])
```

## 🐛 Troubleshooting

### "Erro ao buscar produtos"
- Verifique se a API do JSONPlaceholder está acessível
- Abra DevTools → Console para ver mensagem de erro

### Busca não funciona
- Verifique se `termoBusca` está sendo passado corretamente
- A busca é **case-insensitive** (maiúscula/minúscula não importa)

### Filtro não funciona
- Certifique-se que a categoria existe nos dados
- Verifique se `categoriaSelecionada` está mudando corretamente

## 📝 Próximas etapas (Etapa 3)

- [ ] Carrinho de compras com Context ou Redux
- [ ] Persistência de dados (localStorage)
- [ ] Página de detalhes do produto
- [ ] Integração com API real (e-commerce)
- [ ] Paginação ou infinite scroll

## 💡 Melhorias futuras

- Debounce na busca (evitar muitos filtros)
- Filtro por preço (min/max)
- Ordenação (mais vendidos, maior preço, etc)
- Avaliações e comentários
- Wishlist/Favoritos
