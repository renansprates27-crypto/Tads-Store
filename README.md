# Tads-Store
Projeto Tads-Store - Loja com React em componentes reutilizáveis"
🧩 Componentes Criados
✅ Componentes de layout:

Layout.jsx- Estrutura geral com flex
Cabecalho.jsx- Cabeçalho fixo com navegação
Rodape.jsx- Footer com links e redes sociais
✅ Componentes do produto:

Vitrine.jsx- Grid responsivo de produtos
ProdutoCard.jsx- Cartão individual do produto
✅ Componentes comuns:

Botao.jsx- Botão reutilizável (4 variantes)
Selo.jsx- Distintivo para o
🎨 Sistema de Design
Núcleos : Laranja (#FF6B35) + Azul (#004E89) + Verde (#1DB858)
Fonte : Poppins via Google Fonts
Espaçamento : Sistema de tokens CSS
Responsividade : Mobile-first com breakpoints em 480px, 768px, 1024px
📊 Estrutura de Pastas
Código
src/
├── components/
│   ├── layout/     → Layout, Cabecalho, Rodape
│   ├── produto/    → Vitrine, ProdutoCard
│   └── common/     → Botao, Selo
├── data/
│   └── produtos.js → 8 produtos mockados
├── styles/
│   └── global.css  → Design tokens
└── App.jsx
❓ Pontos Técnicos para Revisão
Verificação de Adereços e Crianças
jsx
// ✅ Bem feito - composição com children
<ProdutoCard {...props}>
  <Selo tipo="promocao">{desconto}% OFF</Selo>
</ProdutoCard>

// ✅ Props dinâmicas passadas corretamente
<Botao variant="primary" fullWidth onClick={handleComprar}>
  Comprar
</Botao>
Possíveis Melhorias Sugeridas
Inconsistência de caminho : Você tem src/estilos/global.csse src/styles/global.css- verifique se está sendo importado corretamente
Path das pastas : A documentação mostra src/componentes/mas os arquivos usam src/components/- mantêm consistente (em inglês é melhor)
Módulos CSS : Considere usar Módulos CSS no futuro para evitar conflitos de classes globais
🎯 Próximos Passos
 Adicionar estampas da loja rodando
 Testar responsividade em mobile
 Validar importações dos Caminhos CSS
