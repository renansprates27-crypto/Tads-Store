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
