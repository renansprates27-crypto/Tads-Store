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
