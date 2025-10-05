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
  IconButton
} from "@mui/material";
import { Close } from "@mui/icons-material";
import DoneIcon from '@mui/icons-material/Done';
import { useState, useEffect } from "react";

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
    cor: '#3498db',
    categoria: categoria || 'bebidas'
  });

  // Atualizar formulário quando produto muda (edição)
  useEffect(() => {
    if (produto) {
      setFormData({
        nome: produto.nome,
        preco: produto.preco.replace('R$ ', '').replace(',', '.'),
        cor: produto.cor,
        categoria: categoria || 'bebidas'
      });
    } else {
      setFormData({
        nome: '',
        preco: '',
        cor: '#3498db',
        categoria: categoria || 'bebidas'
      });
    }
  }, [produto, categoria]);

  const handleChange = (field) => (event) => {
    if (field === 'preco') {
      // Remove tudo que não é número
      const apenasNumeros = event.target.value.replace(/\D/g, '');
      
      // Converte para centavos e depois para formato monetário
      const valorEmCentavos = parseInt(apenasNumeros) || 0;
      const valorFormatado = (valorEmCentavos / 100).toFixed(2);
      
      setFormData({
        ...formData,
        [field]: valorFormatado
      });
    } else {
      setFormData({
        ...formData,
        [field]: event.target.value
      });
    }
  };

  // Função para exibir o valor formatado no campo
  const formatarValorExibicao = (valor) => {
    if (!valor || valor === '0.00') return '';
    const numeroFormatado = parseFloat(valor).toLocaleString('pt-BR', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
    return numeroFormatado;
  };

  const handleSubmit = () => {
    if (!formData.nome || !formData.preco) return;

    const produtoFormatado = {
      ...formData,
      id: produto?.id || Date.now(),
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
        sx: { 
          borderRadius: 3,
          minHeight: '500px'
        }
      }}
    >
      {/* Botão de Fechar */}
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        padding: '20px 24px 0 24px'
      }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', color: '#333' }}>
          {isEdicao ? 'Editar Produto' : 'Adicionar Novo Produto'}
        </Typography>
        <IconButton onClick={onClose} sx={{ color: '#666' }}>
          <Close />
        </IconButton>
      </Box>
      
      <DialogContent sx={{ padding: '24px', paddingTop: '20px' }}>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {/* Nome do Produto */}
          <Box>
            <Typography sx={{ marginBottom: 1, fontWeight: 500, color: '#333' }}>
              Nome do Produto
            </Typography>
            <TextField
              placeholder="Digite o nome do produto"
              value={formData.nome}
              onChange={handleChange('nome')}
              fullWidth
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#f8f9fa',
                  borderRadius: 2
                }
              }}
            />
          </Box>

          {/* Preço */}
          <Box>
            <Typography sx={{ marginBottom: 1, fontWeight: 500, color: '#333' }}>
              Preço
            </Typography>
            <TextField
              placeholder="Ex: 15,90"
              value={formatarValorExibicao(formData.preco)}
              onChange={handleChange('preco')}
              fullWidth
              variant="outlined"
              type="text"
              inputMode="numeric"
              slotProps={{
                input: {
                  startAdornment: (
                    <Typography sx={{ color: '#666', marginRight: 1 }}>
                      R$
                    </Typography>
                  )
                }
              }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#f8f9fa',
                  borderRadius: 2
                }
              }}
            />
          </Box>

          {/* Categoria */}
          <Box>
            <Typography sx={{ marginBottom: 1, fontWeight: 500, color: '#333' }}>
              Categoria
            </Typography>
            <TextField
              select
              value={formData.categoria}
              onChange={handleChange('categoria')}
              fullWidth
              variant="outlined"
              sx={{
                '& .MuiOutlinedInput-root': {
                  backgroundColor: '#f8f9fa',
                  borderRadius: 2
                }
              }}
            >
              <MenuItem value="bebidas">Bebidas</MenuItem>
              <MenuItem value="pratos">Pratos</MenuItem>
              <MenuItem value="sobremesas">Sobremesas</MenuItem>
            </TextField>
          </Box>

          {/* Cor do Botão */}
          <Box>
            <Typography sx={{ marginBottom: 1, fontWeight: 500, color: '#333' }}>
              Cor do Botão
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              {/* Preview da cor atual */}
              <Box
                sx={{
                  width: 50,
                  height: 50,
                  backgroundColor: formData.cor,
                  borderRadius: 2,
                  border: '2px solid #ddd',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    transform: 'scale(1.05)',
                    boxShadow: '0 2px 8px rgba(0,0,0,0.2)'
                  }
                }}
                onClick={() => document.getElementById('color-picker').click()}
              />
              
              {/* Color Picker invisível */}
              <input
                id="color-picker"
                type="color"
                value={formData.cor}
                onChange={(e) => setFormData({ ...formData, cor: e.target.value })}
                style={{ display: 'none' }}
              />
              
              {/* Campo de texto para cor */}
              <TextField
                value={formData.cor.toUpperCase()}
                onChange={(e) => {
                  const valor = e.target.value;
                  // Valida se é uma cor hexadecimal válida
                  if (/^#[0-9A-F]{0,6}$/i.test(valor) || valor === '') {
                    setFormData({ ...formData, cor: valor.toLowerCase() });
                  }
                }}
                placeholder="#3498db"
                variant="outlined"
                size="small"
                sx={{
                  flex: 1,
                  '& .MuiOutlinedInput-root': {
                    backgroundColor: '#f8f9fa',
                    borderRadius: 2
                  }
                }}
              />
              
              {/* Botão para abrir color picker */}
              <Button
                variant="outlined"
                size="small"
                onClick={() => document.getElementById('color-picker').click()}
                sx={{
                  minWidth: 'auto',
                  padding: '8px 12px',
                  borderColor: '#ddd',
                  color: '#666',
                  '&:hover': {
                    borderColor: '#999'
                  }
                }}
              >
                🎨
              </Button>
            </Box>
            
            {/* Cores rápidas predefinidas */}
            <Box sx={{ marginTop: 2 }}>
              <Typography variant="caption" sx={{ color: '#666', marginBottom: 1, display: 'block' }}>
                Cores rápidas:
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {['#3498db', '#e74c3c', '#27ae60', '#f39c12', '#9b59b6', '#ff6b35', '#34495e', '#1abc9c'].map((cor) => (
                  <Box
                    key={cor}
                    onClick={() => setFormData({ ...formData, cor: cor })}
                    sx={{
                      width: 25,
                      height: 25,
                      backgroundColor: cor,
                      borderRadius: 1,
                      cursor: 'pointer',
                      border: formData.cor === cor ? '2px solid #333' : '1px solid #ddd',
                      transition: 'all 0.2s ease',
                      '&:hover': {
                        transform: 'scale(1.1)',
                        boxShadow: '0 1px 4px rgba(0,0,0,0.2)'
                      }
                    }}
                  />
                ))}
              </Box>
            </Box>
          </Box>
        </Box>
      </DialogContent>

      {/* Footer com botões */}
      <DialogActions sx={{ 
        padding: '0 24px 24px 24px',
        gap: 2,
        justifyContent: 'flex-end'
      }}>
        <Button 
          onClick={onClose}
          variant="outlined"
          startIcon={<Close />}
          sx={{ 
            borderColor: '#ddd',
            color: '#666',
            textTransform: 'none',
            borderRadius: 2,
            padding: '10px 20px'
          }}
        >
          Cancelar
        </Button>
        <Button 
          onClick={handleSubmit}
          variant="contained"
          startIcon={<DoneIcon />}
          disabled={!formData.nome || !formData.preco}
          sx={{
            backgroundColor: '#2c2c2c',
            textTransform: 'none',
            borderRadius: 2,
            padding: '10px 20px',
            '&:hover': { backgroundColor: '#404040' }
          }}
        >
          Salvar
        </Button>
      </DialogActions>
    </Dialog>
  );
}