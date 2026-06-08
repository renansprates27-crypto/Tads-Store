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
