# Tads-Store
Projeto Tads-Store - Loja com React em componentes reutilizáveis"

Bash
mkdir tads-store
cd tads-store
npm create react-app .

Estrutura de pastas a criar:
Código
src/
├── components/
│   ├── layout/
│   ├── produto/
│   └── common/
├── data/
├── styles/
├── App.jsx
└── index.js
Arquivo: src/App.jsx
JSX
import React from 'react';
import Layout from './components/layout/Layout';
import Cabecalho from './components/layout/Cabecalho';
import Vitrine from './components/produto/Vitrine';
import Rodape from './components/layout/Rodape';
import { produtosData } from './data/produtos';
import './App.css';

function App() {
  return (
    <Layout>
      <Cabecalho />
      <Vitrine produtos={produtosData} />
      <Rodape />
    </Layout>
  );
}

export default App;
Arquivo: src/styles/global.css
CSS
:root {
  --color-primary: #FF6B35;
  --color-secondary: #004E89;
  --color-success: #1DB858;
  --color-warning: #F77F00;
  --color-background: #FAFAFA;
  --color-surface: #FFFFFF;
  --color-text: #333333;
  --color-text-light: #666666;
  --color-border: #EEEEEE;
  
  --spacing-xs: 4px;
  --spacing-sm: 8px;
  --spacing-md: 16px;
  --spacing-lg: 24px;
  --spacing-xl: 32px;
  
  --font-family: 'Poppins', sans-serif;
  --font-size-md: 16px;
  --font-size-lg: 18px;
  --font-size-xl: 24px;
}

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: var(--font-family);
  background-color: var(--color-background);
  color: var(--color-text);
}

#root {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}
Arquivo: src/components/layout/Layout.jsx
JSX
import React from 'react';
import './layout.css';

function Layout({ children }) {
  return <div className="layout">{children}</div>;
}

export default Layout;
Arquivo: src/components/layout/layout.css
CSS
.layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.layout > main {
  flex: 1;
  padding: var(--spacing-lg) 0;
}
Arquivo: src/components/layout/Cabecalho.jsx
JSX
import React from 'react';
import './cabecalho.css';

function Cabecalho() {
  return (
    <header className="cabecalho">
      <div className="container">
        <h1>🛍️ TADS Store</h1>
      </div>
    </header>
  );
}

export default Cabecalho;
Arquivo: src/components/layout/cabecalho.css
CSS
.cabecalho {
  background: linear-gradient(135deg, var(--color-primary) 0%, var(--color-secondary) 100%);
  color: white;
  padding: var(--spacing-lg) 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.cabecalho h1 {
  font-size: var(--font-size-xl);
  color: white;
}
Arquivo: src/components/layout/Rodape.jsx
JSX
import React from 'react';
import './rodape.css';

function Rodape() {
  return (
    <footer className="rodape">
      <p>&copy; 2026 TADS Store. Todos os direitos reservados.</p>
    </footer>
  );
}

export default Rodape;
Arquivo: src/components/layout/rodape.css
CSS
.rodape {
  background-color: var(--color-secondary);
  color: white;
  text-align: center;
  padding: var(--spacing-lg) 0;
  margin-top: auto;
}
Arquivo: src/components/produto/Vitrine.jsx
JSX
import React from 'react';
import ProdutoCard from './ProdutoCard';
import './vitrine.css';

function Vitrine({ produtos = [] }) {
  const handleComprar = (produtoId) => {
    alert(`✅ Produto ${produtoId} adicionado ao carrinho!`);
  };

  if (!produtos || produtos.length === 0) {
    return <section className="vitrine"><p>Nenhum produto disponível</p></section>;
  }

  return (
    <section className="vitrine">
      <div className="container">
        <h2>Nossos Produtos</h2>
        <div className="grid-produtos">
          {produtos.map((produto) => (
            <ProdutoCard
              key={produto.id}
              {...produto}
              onComprar={handleComprar}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default Vitrine;
Arquivo: src/components/produto/vitrine.css
CSS
.vitrine {
  padding: var(--spacing-lg) 0;
}

.vitrine h2 {
  text-align: center;
  color: var(--color-secondary);
  margin-bottom: var(--spacing-lg);
}

.grid-produtos {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: var(--spacing-lg);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
}
Arquivo: src/components/produto/ProdutoCard.jsx
JSX
import React from 'react';
import Botao from '../common/Botao';
import './produtoCard.css';

function ProdutoCard({
  id,
  nome,
  preco,
  imagem,
  descricao = '',
  promocao = false,
  desconto = 0,
  onComprar,
  children
}) {
  return (
    <div className="produto-card">
      <div className="produto-imagem">
        <img src={imagem} alt={nome} loading="lazy" />
        {promocao && <div className="selo-promocao">{desconto}% OFF</div>}
      </div>
      <div className="produto-info">
        <h3>{nome}</h3>
        {descricao && <p>{descricao}</p>}
        <p className="preco">R$ {preco.toFixed(2)}</p>
        <Botao onClick={() => onComprar(id)} fullWidth>
          Comprar
        </Botao>
      </div>
    </div>
  );
}

export default ProdutoCard;
Arquivo: src/components/produto/produtoCard.css
CSS
.produto-card {
  background: white;
  border: 1px solid var(--color-border);
  border-radius: 8px;
  overflow: hidden;
  transition: all 0.3s ease;
  display: flex;
  flex-direction: column;
  height: 100%;
}

.produto-card:hover {
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
  transform: translateY(-4px);
}

.produto-imagem {
  position: relative;
  width: 100%;
  height: 180px;
  overflow: hidden;
}

.produto-imagem img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.selo-promocao {
  position: absolute;
  top: var(--spacing-md);
  right: var(--spacing-md);
  background: var(--color-warning);
  color: white;
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: bold;
}

.produto-info {
  padding: var(--spacing-md);
  flex: 1;
  display: flex;
  flex-direction: column;
}

.produto-info h3 {
  margin-bottom: var(--spacing-sm);
}

.produto-info p {
  margin-bottom: var(--spacing-sm);
}

.preco {
  font-size: var(--font-size-lg);
  color: var(--color-primary);
  font-weight: bold;
  margin: var(--spacing-md) 0;
}
Arquivo: src/components/common/Botao.jsx
JSX
import React from 'react';
import './botao.css';

function Botao({
  variant = 'primary',
  fullWidth = false,
  onClick,
  children,
  ...props
}) {
  return (
    <button
      className={`btn btn-${variant} ${fullWidth ? 'btn-full' : ''}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}

export default Botao;
Arquivo: src/components/common/botao.css
CSS
.btn {
  padding: var(--spacing-sm) var(--spacing-md);
  border: none;
  border-radius: 6px;
  font-weight: bold;
  cursor: pointer;
  transition: all 0.3s ease;
  min-height: 40px;
}

.btn-primary {
  background-color: var(--color-primary);
  color: white;
}

.btn-primary:hover {
  background-color: #E55A24;
  transform: translateY(-2px);
}

.btn-full {
  width: 100%;
}
Arquivo: src/data/produtos.js
js
export const produtosData = [
  {
    id: 1,
    nome: 'Camiseta Premium',
    preco: 89.90,
    imagem: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&q=80',
    descricao: 'Camiseta de algodão 100%',
    promocao: true,
    desconto: 20
  },
  {
    id: 2,
    nome: 'Calça Jeans',
    preco: 149.90,
    imagem: 'https://images.unsplash.com/photo-1542272604-787c62d465d1?w=400&q=80',
    descricao: 'Jeans clássico',
    promocao: false,
    desconto: 0
  },
  {
    id: 3,
    nome: 'Tênis Esportivo',
    preco: 279.90,
    imagem: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80',
    descricao: 'Tênis confortável',
    promocao: true,
    desconto: 15
  },
  {
    id: 4,
    nome: 'Jaqueta Impermeável',
    preco: 329.90,
    imagem: 'https://images.unsplash.com/photo-1551028719-00167b16ebc5?w=400&q=80',
    descricao: 'Jaqueta resistente à água',
    promocao: false,
    desconto: 0
  }
];
Passo 3: Subir para GitHub
Bash
git init
git add .
git commit -m "Initial commit: TADS Store structure"
git branch -M main
git remote add origin https://github.com/renansprates27-crypto/tads-store.git
git push -u origin main

TADS Store - Renan Sprates 🛍️

### 📦 Repositório
GitHub: https://github.com/renansprates27-crypto/Tads-Store

### 🏪 Estrutura da Loja
A loja está montada com os seguintes componentes:

**Componentes criados:**
- ✅ **Layout** - Container principal com flex column
- ✅ **Cabecalho** - Header com gradiente (laranja → azul) e título
- ✅ **Rodape** - Footer com copyright
- ✅ **Vitrine** - Grid responsivo de produtos (repeat auto-fill, minmax 250px)
- ✅ **ProdutoCard** - Card com imagem, nome, preço, descrição e botão
- ✅ **Botao** - Componente reutilizável com variantes (primary) e fullWidth
- ✅ **Selo de Promoção** - Badge com desconto (% OFF)

### 🎨 Funcionalidades Implementadas
- Grid responsivo com `grid-template-columns: repeat(auto-fill, minmax(250px, 1fr))`
- Props bem definidas (nome, preco, imagem, descricao, promocao, desconto)
- Children para flexibilidade futura
- Dados fixos em `src/data/produtos.js` com 4 produtos de exemplo
- Sistema de cores com CSS Variables
- Hover effects nos cards (shadow e translateY)
- Botão de "Comprar" com alert (já implementado)

### 🎯 Pontos Fortes
1. **Organização clara de pastas** - layout, produto, common bem separadas
2. **Componentes reutilizáveis** - Botao pode ser usado em qualquer lugar
3. **Responsividade** - Grid auto-fill funciona em mobile/desktop
4. **Design limpo** - Paleta de cores consistente com CSS Variables

### ❓ Dúvidas / Pontos para Feedback
[Adicione aqui se tiver alguma dúvida ou área que quer melhorar]

Exemplos:
- Devo separar o `container` em um componente também?
- A estrutura de pastas está boa ou mudo algo?
- Posso melhorar algo no uso de props/children?

### 📸 Screenshots
[Adicione aqui prints da loja rodando - header, vitrine com cards, footer]
✨ Dicas para completar seu tópico:
Para as capturas de tela , você pode:

Rodar npm startlocalmente
Tirar prints do navegador (F12 para DevTools, depois Print Screen)
Ou use uma ferramenta como Lightshot/Snagit
Para dúvidas específicas (se houver):

Cole o trecho de código que está gerando dúvida
Descreva o erro ou o comportamento esperado
Feedback que você quer :

Organização das massas
capa de nomenclatura
Responsividade
Desempenho
Design visual

js
// Service para fazer requisições à JSONPlaceholder API
export const fetchProdutos = async () => {
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts');
    if (!response.ok) {
      throw new Error('Erro ao buscar produtos');
    }
    const dados = await response.json();
    
    // Transformar dados do JSONPlaceholder para nosso formato
    return dados.slice(0, 12).map((post) => ({
      id: post.id,
      nome: `Produto ${post.id}`,
      preco: (Math.random() * 300 + 50).toFixed(2),
      imagem: `https://picsum.photos/400/300?random=${post.id}`,
      descricao: post.body.substring(0, 100) + '...',
      categoria: post.userId === 1 ? 'Eletrônicos' : post.userId === 2 ? 'Roupas' : 'Acessórios',
      promocao: post.id % 3 === 0,
      desconto: post.id % 3 === 0 ? Math.floor(Math.random() * 30 + 10) : 0,
    }));
  } catch (erro) {
    console.error('Erro ao buscar produtos:', erro);
    throw erro;
  }
};

Fazer essas alterações no código?
src/components/produto/Buscador.jsx

jsx
import React from 'react';
import './buscador.css';

function Buscador({ valor, onChange, placeholder = "Buscar produtos..." }) {
  return (
    <div className="buscador">
      <input
        type="text"
        className="buscador-input"
        placeholder={placeholder}
        value={valor}
        onChange={(e) => onChange(e.target.value)}
      />
      <span className="buscador-icon">🔍</span>
    </div>
  );
}

export default Buscador;

src/components/produto/buscador.css

CSS
.buscador {
  position: relative;
  max-width: 500px;
  margin: 0 auto var(--spacing-lg);
}

.buscador-input {
  width: 100%;
  padding: var(--spacing-md) var(--spacing-lg);
  font-size: var(--font-size-md);
  border: 2px solid var(--color-border);
  border-radius: 8px;
  transition: all 0.3s ease;
  font-family: var(--font-family);
  padding-right: var(--spacing-xl);
}

.buscador-input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 3px rgba(255, 107, 53, 0.1);
}

.buscador-input::placeholder {
  color: var(--color-text-light);
}

.buscador-icon {
  position: absolute;
  right: var(--spacing-md);
  top: 50%;
  transform: translateY(-50%);
  font-size: var(--font-size-lg);
  pointer-events: none;
}


Fazer essas alterações no código?
src/components/produto/Filtro.jsx

jsx
import React from 'react';
import './filtro.css';

function Filtro({ categorias, categoriaSelecionada, onChange }) {
  return (
    <div className="filtro">
      <label className="filtro-label">Categorias:</label>
      <div className="filtro-opcoes">
        <button
          className={`filtro-btn ${categoriaSelecionada === '' ? 'ativo' : ''}`}
          onClick={() => onChange('')}
        >
          Todas
        </button>
        {categorias.map((cat) => (
          <button
            key={cat}
            className={`filtro-btn ${categoriaSelecionada === cat ? 'ativo' : ''}`}
            onClick={() => onChange(cat)}
          >
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}

export default Filtro;


Fazer essas alterações no código?
src/components/produto/filtro.css

CSS
.filtro {
  margin: var(--spacing-lg) 0;
}

.filtro-label {
  display: block;
  margin-bottom: var(--spacing-md);
  font-weight: bold;
  color: var(--color-secondary);
  font-size: var(--font-size-md);
}

.filtro-opcoes {
  display: flex;
  gap: var(--spacing-md);
  flex-wrap: wrap;
}

.filtro-btn {
  padding: var(--spacing-sm) var(--spacing-md);
  border: 2px solid var(--color-border);
  background-color: white;
  color: var(--color-text);
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: 600;
  font-family: var(--font-family);
}

.filtro-btn:hover {
  border-color: var(--color-primary);
  color: var(--color-primary);
}

.filtro-btn.ativo {
  background-color: var(--color-primary);
  color: white;
  border-color: var(--color-primary);
}


Fazer essas alterações no código?
src/components/produto/Vitrine.jsx

jsx
import React, { useState, useEffect } from 'react';
import ProdutoCard from './ProdutoCard';
import Buscador from './Buscador';
import Filtro from './Filtro';
import { fetchProdutos } from '../../services/api';
import './vitrine.css';

function Vitrine() {
  const [produtos, setProdutos] = useState([]);
  const [produtosFiltrados, setProdutosFiltrados] = useState([]);
  const [buscando, setBuscando] = useState(true);
  const [erro, setErro] = useState(null);
  
  // Estados para busca e filtro
  const [termoBusca, setTermoBusca] = useState('');
  const [categoriaSelecionada, setCategoriaSelecionada] = useState('');

  // Fetch dos produtos da API
  useEffect(() => {
    const carregarProdutos = async () => {
      try {
        setBuscando(true);
        const dados = await fetchProdutos();
        setProdutos(dados);
        setProdutosFiltrados(dados);
        setErro(null);
      } catch (err) {
        setErro('Falha ao carregar produtos. Tente novamente.');
        console.error(err);
      } finally {
        setBuscando(false);
      }
    };

    carregarProdutos();
  }, []);

  // Filtrar produtos quando termo de busca ou categoria mudam
  useEffect(() => {
    let resultado = produtos;

    // Filtro por categoria
    if (categoriaSelecionada) {
      resultado = resultado.filter(
        (prod) => prod.categoria.toLowerCase() === categoriaSelecionada.toLowerCase()
      );
    }

    // Filtro por termo de busca
    if (termoBusca) {
      resultado = resultado.filter((prod) =>
        prod.nome.toLowerCase().includes(termoBusca.toLowerCase()) ||
        prod.descricao.toLowerCase().includes(termoBusca.toLowerCase())
      );
    }

    setProdutosFiltrados(resultado);
  }, [termoBusca, categoriaSelecionada, produtos]);

  // Extrair categorias únicas
  const categorias = [...new Set(produtos.map((p) => p.categoria))];

  const handleComprar = (produtoId) => {
    alert(`✅ Produto ${produtoId} adicionado ao carrinho!`);
  };

  if (buscando) {
    return (
      <section className="vitrine">
        <div className="container">
          <p className="carregando">⏳ Carregando produtos...</p>
        </div>
      </section>
    );
  }

  if (erro) {
    return (
      <section className="vitrine">
        <div className="container">
          <p className="erro">{erro}</p>
        </div>
      </section>
    );
  }

  return (
    <section className="vitrine">
      <div className="container">
        <h2>Nossos Produtos</h2>
        
        {/* Buscador */}
        <Buscador valor={termoBusca} onChange={setTermoBusca} />

        {/* Filtro por categoria */}
        {categorias.length > 0 && (
          <Filtro
            categorias={categorias}
            categoriaSelecionada={categoriaSelecionada}
            onChange={setCategoriaSelecionada}
          />
        )}

        {/* Resultado da busca */}
        {produtosFiltrados.length === 0 ? (
          <div className="sem-resultados">
            <p>😕 Nenhum produto encontrado</p>
            <small>Tente ajustar sua busca ou filtro</small>
          </div>
        ) : (
          <>
            <p className="resultado-info">
              Mostrando {produtosFiltrados.length} de {produtos.length} produtos
            </p>
            <div className="grid-produtos">
              {produtosFiltrados.map((produto) => (
                <ProdutoCard
                  key={produto.id}
                  {...produto}
                  onComprar={handleComprar}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </section>
  );
}

export default Vitrine;

Confirme se deseja que o Copilot faça essa alteração no repositório renansprates27-crypto/Tads-Store na branch padrão.

Fazer essas alterações no código?
src/components/produto/vitrine.css

CSS
.vitrine {
  padding: var(--spacing-lg) 0;
  min-height: 60vh;
}

.vitrine h2 {
  text-align: center;
  color: var(--color-secondary);
  margin-bottom: var(--spacing-lg);
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--spacing-md);
}

.grid-produtos {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: var(--spacing-lg);
}

.carregando,
.erro {
  text-align: center;
  font-size: var(--font-size-lg);
  color: var(--color-text-light);
  padding: var(--spacing-xl) 0;
}

.erro {
  color: #e74c3c;
  font-weight: bold;
}

.sem-resultados {
  text-align: center;
  padding: var(--spacing-xl) 0;
}

.sem-resultados p {
  font-size: var(--font-size-lg);
  color: var(--color-text);
  margin-bottom: var(--spacing-md);
}

.sem-resultados small {
  color: var(--color-text-light);
  display: block;
}

.resultado-info {
  text-align: center;
  color: var(--color-text-light);
  margin-bottom: var(--spacing-md);
  font-size: 0.9rem;
}


ETAPA-2-GUIA.md

md
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

src/ ├── componentes/ │ ├── layout/ │ │ ├── Cabecalho.jsx │ │ ├── Layout.jsx │ │ ├── Rodape.jsx │ │ ├── cabecalho.css │ │ └── rodape.css │ ├── produto/ │ │ ├── Buscador.jsx │ │ ├── Filtro.jsx │ │ ├── ProdutoCard.jsx │ │ ├── Vitrine.jsx │ │ ├── buscador.css │ │ ├── filtro.css │ │ ├── produtoCard.css │ │ └── vitrine.css │ └── comum/ │ ├── Botao.jsx │ └── botao.css ├── serviços/ │ └── api.js ← NOVO! ├── data/ │ └── produtos.js ├── styles/ │ └── global.css ├── App.jsx └── index.js

Código

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
🐛 Solução de problemas
"Erro ao buscar produtos"
Verifique se a API do JSONPlaceholder é acessível
Abra DevTools → Console para ver mensagem de erro
A busca não funciona
Verifique se o termoBuscapassado foi enviado corretamente
A busca não diferencia maiúsculas de minúsculas (maiúscula/minúscula não importa)
O filtro não funciona
-se que a categoria existe verifique nos dados
Verifique se a categoriaSelecionadamudança está correta

📝 Próximas etapas (Etapa 3)

 Carrinho de compras com Contexto ou Redux
 Persistência de dados (localStorage)
 Página de detalhes do produto
 Integração com API real (e-commerce)
 Paginação ou rolagem infinita
💡 Melhoresias futuras
Debounce na busca (evitar muitos filtros)
Filtro por preço (mín./máx.)
Ordenação (mais vendido, maior preço, etc)
e
Lista de desejos/Favoritos
Código
