// Mock data para produtos
export const mockProducts = {
  bebidas: [
    { 
      id: 1, 
      nome: 'Refrigerante', 
      preco: 'R$ 5,00', 
      cor: '#ff6b35',
      categoria: 'bebidas',
      descricao: 'Refrigerante gelado 350ml'
    },
    { 
      id: 2, 
      nome: 'Suco Natural', 
      preco: 'R$ 6,00', 
      cor: '#f39c12',
      categoria: 'bebidas',
      descricao: 'Suco natural da fruta 300ml'
    },
    { 
      id: 3, 
      nome: 'Cerveja', 
      preco: 'R$ 10,00', 
      cor: '#27ae60',
      categoria: 'bebidas',
      descricao: 'Cerveja gelada long neck 355ml'
    },
    { 
      id: 4, 
      nome: 'Água Mineral', 
      preco: 'R$ 3,00', 
      cor: '#3498db',
      categoria: 'bebidas',
      descricao: 'Água mineral sem gás 500ml'
    }
  ],
  
  pratos: [
    { 
      id: 5, 
      nome: 'Peixe Grelhado', 
      preco: 'R$ 25,00', 
      cor: '#e74c3c',
      categoria: 'pratos',
      descricao: 'Peixe grelhado com legumes'
    },
    { 
      id: 6, 
      nome: 'Camarão ao Alho', 
      preco: 'R$ 35,00', 
      cor: '#9b59b6',
      categoria: 'pratos',
      descricao: 'Camarão refogado no alho e óleo'
    },
    { 
      id: 7, 
      nome: 'Lula à Dorê', 
      preco: 'R$ 20,00', 
      cor: '#34495e',
      categoria: 'pratos',
      descricao: 'Lula empanada e frita'
    },
    { 
      id: 8, 
      nome: 'Moqueca de Peixe', 
      preco: 'R$ 30,00', 
      cor: '#e67e22',
      categoria: 'pratos',
      descricao: 'Moqueca tradicional capixaba'
    }
  ],
  
  sobremesas: [
    { 
      id: 9, 
      nome: 'Pudim de Leite', 
      preco: 'R$ 8,00', 
      cor: '#f1c40f',
      categoria: 'sobremesas',
      descricao: 'Pudim cremoso caseiro'
    },
    { 
      id: 10, 
      nome: 'Sorvete', 
      preco: 'R$ 6,00', 
      cor: '#1abc9c',
      categoria: 'sobremesas',
      descricao: 'Sorvete artesanal 2 bolas'
    },
    { 
      id: 11, 
      nome: 'Torta de Limão', 
      preco: 'R$ 12,00', 
      cor: '#e91e63',
      categoria: 'sobremesas',
      descricao: 'Torta de limão com merengue'
    },
    { 
      id: 12, 
      nome: 'Mousse de Chocolate', 
      preco: 'R$ 10,00', 
      cor: '#673ab7',
      categoria: 'sobremesas',
      descricao: 'Mousse cremoso de chocolate'
    }
  ]
};

// Mock data para vendas
export const mockSales = [
  {
    id: 1,
    data: '2025-10-06',
    hora: '14:30',
    items: [
      { id: 1, nome: 'Refrigerante', preco: 5.00, quantidade: 2 },
      { id: 5, nome: 'Peixe Grelhado', preco: 25.00, quantidade: 1 }
    ],
    total: 35.00,
    formaPagamento: 'cartao',
    status: 'concluida'
  },
  {
    id: 2,
    data: '2025-10-06',
    hora: '15:45',
    items: [
      { id: 3, nome: 'Cerveja', preco: 10.00, quantidade: 3 },
      { id: 8, nome: 'Moqueca de Peixe', preco: 30.00, quantidade: 1 }
    ],
    total: 60.00,
    formaPagamento: 'dinheiro',
    valorRecebido: 70.00,
    troco: 10.00,
    status: 'concluida'
  }
];

// Mock data para configurações
// export const mockSettings = {
//   nomeEstabelecimento: 'Peixaria do João',
//   endereco: 'Rua das Flores, 123 - Centro',
//   telefone: '(11) 99999-9999',
//   cnpj: '12.345.678/0001-90',
//   configuracoes: {
//     moeda: 'BRL',
//     idioma: 'pt-BR',
//     tema: 'light',
//     notificacoes: true
//   }
// };