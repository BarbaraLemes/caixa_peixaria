import { 
  Box, 
  Typography, 
  Button, 
  Container,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton
} from "@mui/material";
import { Add, Edit, Delete } from "@mui/icons-material";
import { useState } from "react";
import ModalProduto from "./ModalProduto";

export default function GestaoProdutos() {
  const [activeTab, setActiveTab] = useState('bebidas');
  const [modalOpen, setModalOpen] = useState(false);
  const [produtoEditando, setProdutoEditando] = useState(null);

  // Estado para produtos (depois virá de uma API/Context)
  const [produtos, setProdutos] = useState({
    bebidas: [
      { id: 1, nome: 'Refrigerante', preco: 'R$ 5,00', cor: '#ff6b35' },
      { id: 2, nome: 'Suco', preco: 'R$ 6,00', cor: '#f39c12' },
      { id: 3, nome: 'Cerveja', preco: 'R$ 10,00', cor: '#27ae60' },
      { id: 4, nome: 'Água', preco: 'R$ 3,00', cor: '#3498db' }
    ],
    pratos: [
      { id: 5, nome: 'Peixe Grelhado', preco: 'R$ 25,00', cor: '#e74c3c' },
      { id: 6, nome: 'Camarão', preco: 'R$ 35,00', cor: '#9b59b6' },
      { id: 7, nome: 'Lula', preco: 'R$ 20,00', cor: '#34495e' },
      { id: 8, nome: 'Moqueca', preco: 'R$ 30,00', cor: '#e67e22' }
    ],
    sobremesas: [
      { id: 9, nome: 'Pudim', preco: 'R$ 8,00', cor: '#f1c40f' },
      { id: 10, nome: 'Sorvete', preco: 'R$ 6,00', cor: '#1abc9c' },
      { id: 11, nome: 'Torta', preco: 'R$ 12,00', cor: '#e91e63' },
      { id: 12, nome: 'Mousse', preco: 'R$ 10,00', cor: '#673ab7' }
    ]
  });

  const counters = {
    bebidas: produtos.bebidas.length,
    pratos: produtos.pratos.length,
    sobremesas: produtos.sobremesas.length
  };

  const produtosAtivos = produtos[activeTab] || [];

  // Funções CRUD
  const handleNovoProduto = () => {
    setProdutoEditando(null);
    setModalOpen(true);
  };

  const handleEditarProduto = (produto) => {
    setProdutoEditando(produto);
    setModalOpen(true);
  };

  const handleExcluirProduto = (id) => {
    if (window.confirm('Tem certeza que deseja excluir este produto?')) {
      setProdutos(prev => ({
        ...prev,
        [activeTab]: prev[activeTab].filter(p => p.id !== id)
      }));
    }
  };

  const handleSalvarProduto = (produto) => {
    if (produtoEditando) {
      // Editando produto existente
      setProdutos(prev => ({
        ...prev,
        [produto.categoria]: prev[produto.categoria].map(p => 
          p.id === produto.id ? produto : p
        )
      }));
    } else {
      // Adicionando novo produto
      setProdutos(prev => ({
        ...prev,
        [produto.categoria]: [...prev[produto.categoria], produto]
      }));
    }
  };

  return (
    <Container maxWidth="xl" sx={{ padding: 3 }}>
      {/* Cabeçalho */}
      <Box 
        sx={{ 
          display: 'flex', 
          justifyContent: 'space-between', 
          alignItems: 'center',
          marginBottom: 4 
        }}
      >
        <Typography variant="h4" component="h1" sx={{ fontWeight: 'bold' }}>
          Gestão de Produtos
        </Typography>
        
        <Button
          variant="contained"
          startIcon={<Add />}
          onClick={handleNovoProduto}
          sx={{
            backgroundColor: '#2c2c2c',
            color: 'white',
            borderRadius: '8px',
            padding: '10px 20px',
            textTransform: 'none',
            fontWeight: 'bold',
            '&:hover': {
              backgroundColor: '#404040'
            }
          }}
        >
          Novo Produto
        </Button>
      </Box>

      {/* Sistema de Abas */}
      <Box 
        sx={{ 
          display: 'flex',
          backgroundColor: '#f0f0f0',
          borderRadius: '25px',
          padding: '4px',
          marginBottom: 3,
          width: 'fit-content'
        }}
      >
        <Button 
          onClick={() => setActiveTab('bebidas')}
          sx={{
            backgroundColor: activeTab === 'bebidas' ? 'white' : 'transparent',
            color: 'black',
            borderRadius: '20px',
            padding: '8px 24px',
            textTransform: 'none',
            fontWeight: 500,
            border: 'none',
            boxShadow: activeTab === 'bebidas' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
            '&:hover': {
              backgroundColor: activeTab === 'bebidas' ? 'white' : 'rgba(255,255,255,0.5)'
            }
          }}
        >
          Bebidas ({counters.bebidas})
        </Button>
        <Button 
          onClick={() => setActiveTab('pratos')}
          sx={{
            backgroundColor: activeTab === 'pratos' ? 'white' : 'transparent',
            color: 'black',
            borderRadius: '20px',
            padding: '8px 24px',
            textTransform: 'none',
            fontWeight: 500,
            border: 'none',
            boxShadow: activeTab === 'pratos' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
            '&:hover': {
              backgroundColor: activeTab === 'pratos' ? 'white' : 'rgba(255,255,255,0.5)'
            }
          }}
        >
          Pratos ({counters.pratos})
        </Button>
        <Button 
          onClick={() => setActiveTab('sobremesas')}
          sx={{
            backgroundColor: activeTab === 'sobremesas' ? 'white' : 'transparent',
            color: 'black',
            borderRadius: '20px',
            padding: '8px 24px',
            textTransform: 'none',
            fontWeight: 500,
            border: 'none',
            boxShadow: activeTab === 'sobremesas' ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
            '&:hover': {
              backgroundColor: activeTab === 'sobremesas' ? 'white' : 'rgba(255,255,255,0.5)'
            }
          }}
        >
          Sobremesas ({counters.sobremesas})
        </Button>
      </Box>

      {/* Tabela de Produtos */}
      <TableContainer component={Paper} sx={{ borderRadius: 2, boxShadow: 1 }}>
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f8f9fa' }}>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Nome</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Preço</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Cor</TableCell>
              <TableCell sx={{ fontWeight: 'bold', fontSize: '1.1rem' }}>Ações</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {produtosAtivos.map((produto) => (
              <TableRow 
                key={produto.id}
                sx={{ 
                  '&:hover': { backgroundColor: '#f5f5f5' },
                  '&:last-child td, &:last-child th': { border: 0 }
                }}
              >
                <TableCell sx={{ fontSize: '1rem' }}>{produto.nome}</TableCell>
                <TableCell sx={{ fontSize: '1rem' }}>{produto.preco}</TableCell>
                <TableCell>
                  <Box
                    sx={{
                      width: 30,
                      height: 30,
                      backgroundColor: produto.cor,
                      borderRadius: 1,
                      border: '1px solid #ddd'
                    }}
                  />
                </TableCell>
                <TableCell>
                  <Box sx={{ display: 'flex', gap: 1 }}>
                    <IconButton 
                      size="small" 
                      onClick={() => handleEditarProduto(produto)}
                      sx={{ 
                        color: '#666',
                        '&:hover': { backgroundColor: '#f0f0f0' }
                      }}
                    >
                      <Edit fontSize="small" />
                    </IconButton>
                    <IconButton 
                      size="small" 
                      onClick={() => handleExcluirProduto(produto.id)}
                      sx={{ 
                        color: '#d32f2f',
                        '&:hover': { backgroundColor: '#ffebee' }
                      }}
                    >
                      <Delete fontSize="small" />
                    </IconButton>
                  </Box>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Modal de Produto */}
      <ModalProduto
        open={modalOpen}
        onClose={() => setModalOpen(false)}
        produto={produtoEditando}
        categoria={activeTab}
        onSave={handleSalvarProduto}
      />
    </Container>
  );
}