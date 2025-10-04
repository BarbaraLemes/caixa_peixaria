import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Box,
  Typography,
  MenuItem,
  Grid
} from "@mui/material";
import { useState, useEffect } from "react";

const cores = [
  { valor: '#ff6b35', nome: 'Laranja' },
  { valor: '#f39c12', nome: 'Amarelo' },
  { valor: '#27ae60', nome: 'Verde' },
  { valor: '#3498db', nome: 'Azul' },
  { valor: '#e74c3c', nome: 'Vermelho' },
  { valor: '#9b59b6', nome: 'Roxo' },
  { valor: '#34495e', nome: 'Cinza' },
  { valor: '#e67e22', nome: 'Laranja Escuro' },
  { valor: '#f1c40f', nome: 'Amarelo Claro' },
  { valor: '#1abc9c', nome: 'Verde Água' },
  { valor: '#e91e63', nome: 'Rosa' },
  { valor: '#673ab7', nome: 'Roxo Escuro' }
];

export default function ModalProduto({ 
  open, 
  onClose, 
  produto = null, 
  categoria,
  onSave 
}) {
  const [formData, setFormData] = useState({
    nome: '',
    preco: '',
    cor: '#ff6b35',
    categoria: categoria || 'bebidas'
  });

  // Atualizar formulário quando produto muda (edição)
  useEffect(() => {
    if (produto) {
      setFormData({
        nome: produto.nome,
        preco: produto.preco.replace('R$ ', ''),
        cor: produto.cor,
        categoria: categoria || 'bebidas'
      });
    } else {
      setFormData({
        nome: '',
        preco: '',
        cor: '#ff6b35',
        categoria: categoria || 'bebidas'
      });
    }
  }, [produto, categoria]);

  const handleChange = (field) => (event) => {
    setFormData({
      ...formData,
      [field]: event.target.value
    });
  };

  const handleSubmit = () => {
    if (!formData.nome || !formData.preco) return;

    const produtoFormatado = {
      ...formData,
      id: produto?.id || Date.now(), // ID simples para mock
      preco: `R$ ${parseFloat(formData.preco).toFixed(2).replace('.', ',')}`
    };

    onSave(produtoFormatado);
    onClose();
  };

  const isEdicao = !!produto;

  return (
    <Dialog 
      open={open} 
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: { borderRadius: 2 }
      }}
    >
      <DialogTitle sx={{ fontWeight: 'bold', fontSize: '1.5rem' }}>
        {isEdicao ? 'Editar Produto' : 'Novo Produto'}
      </DialogTitle>
      
      <DialogContent>
        <Box sx={{ pt: 1 }}>
          <Grid container spacing={3}>
            {/* Nome do Produto */}
            <Grid item xs={12}>
              <TextField
                label="Nome do Produto"
                value={formData.nome}
                onChange={handleChange('nome')}
                fullWidth
                variant="outlined"
                required
              />
            </Grid>

            {/* Preço e Categoria */}
            <Grid item xs={6}>
              <TextField
                label="Preço"
                value={formData.preco}
                onChange={handleChange('preco')}
                fullWidth
                variant="outlined"
                type="number"
                step="0.01"
                required
                InputProps={{
                  startAdornment: <span style={{ marginRight: 8 }}>R$</span>
                }}
              />
            </Grid>
            
            <Grid item xs={6}>
              <TextField
                select
                label="Categoria"
                value={formData.categoria}
                onChange={handleChange('categoria')}
                fullWidth
                variant="outlined"
              >
                <MenuItem value="bebidas">Bebidas</MenuItem>
                <MenuItem value="pratos">Pratos</MenuItem>
                <MenuItem value="sobremesas">Sobremesas</MenuItem>
              </TextField>
            </Grid>

            {/* Seletor de Cor */}
            <Grid item xs={12}>
              <Typography variant="subtitle1" sx={{ marginBottom: 2, fontWeight: 500 }}>
                Cor do Produto
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {cores.map((cor) => (
                  <Box
                    key={cor.valor}
                    onClick={() => setFormData({ ...formData, cor: cor.valor })}
                    sx={{
                      width: 40,
                      height: 40,
                      backgroundColor: cor.valor,
                      borderRadius: 1,
                      cursor: 'pointer',
                      border: formData.cor === cor.valor ? '3px solid #333' : '2px solid #ddd',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        transform: 'scale(1.1)',
                        boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                      }
                    }}
                    title={cor.nome}
                  />
                ))}
              </Box>
            </Grid>

            {/* Preview da Cor Selecionada */}
            <Grid item xs={12}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Typography variant="body2">Cor selecionada:</Typography>
                <Box
                  sx={{
                    width: 30,
                    height: 30,
                    backgroundColor: formData.cor,
                    borderRadius: 1,
                    border: '1px solid #ddd'
                  }}
                />
                <Typography variant="body2" sx={{ color: '#666' }}>
                  {cores.find(c => c.valor === formData.cor)?.nome}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </DialogContent>

      <DialogActions sx={{ padding: 3 }}>
        <Button 
          onClick={onClose}
          variant="outlined"
          sx={{ marginRight: 2 }}
        >
          Cancelar
        </Button>
        <Button 
          onClick={handleSubmit}
          variant="contained"
          disabled={!formData.nome || !formData.preco}
          sx={{
            backgroundColor: '#2c2c2c',
            '&:hover': { backgroundColor: '#404040' }
          }}
        >
          {isEdicao ? 'Atualizar' : 'Adicionar'}
        </Button>
      </DialogActions>
    </Dialog>
  );
}