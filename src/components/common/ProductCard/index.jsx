import { 
  Card, 
  CardContent, 
  Typography, 
  Box, 
  IconButton,
  Chip
} from '@mui/material';
import { Add, Remove } from '@mui/icons-material';
import PropTypes from 'prop-types';
import { formatCurrency } from '../../../utils/formatters';

/**
 * Card de produto reutilizável
 * @param {Object} props
 * @param {Object} props.product - Dados do produto
 * @param {Function} props.onAddToCart - Callback para adicionar ao carrinho
 * @param {Function} props.onRemoveFromCart - Callback para remover do carrinho  
 * @param {number} props.quantity - Quantidade no carrinho
 * @param {boolean} props.showActions - Se deve mostrar botões de ação
 * @param {Function} props.onClick - Callback para clique no card
 */
export default function ProductCard({ 
  product, 
  onAddToCart, 
  onRemoveFromCart,
  quantity = 0,
  showActions = true,
  onClick 
}) {
  const handleCardClick = (e) => {
    // Evita trigger onClick quando clica nos botões
    if (e.target.closest('button')) {
      return;
    }
    onClick?.(product);
  };

  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        cursor: onClick ? 'pointer' : 'default',
        transition: 'transform 0.2s, box-shadow 0.2s',
        '&:hover': {
          transform: onClick ? 'translateY(-2px)' : 'none',
          boxShadow: onClick ? '0 4px 12px rgba(0,0,0,0.15)' : 'none'
        }
      }}
      onClick={handleCardClick}
    >
      {/* Indicador de cor do produto */}
      <Box
        sx={{
          height: 8,
          backgroundColor: product.cor,
          borderRadius: '4px 4px 0 0'
        }}
      />
      
      <CardContent sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
        {/* Nome do produto */}
        <Typography 
          variant="h6" 
          component="h3"
          sx={{ 
            fontWeight: 'bold',
            fontSize: '1.1rem',
            marginBottom: 1,
            flex: 1
          }}
        >
          {product.nome}
        </Typography>

        {/* Descrição (se existir) */}
        {product.descricao && (
          <Typography 
            variant="body2" 
            color="text.secondary"
            sx={{ marginBottom: 2 }}
          >
            {product.descricao}
          </Typography>
        )}

        {/* Preço e ações */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 'bold',
              color: '#27ae60',
              fontSize: '1.2rem'
            }}
          >
            {formatCurrency(product.preco)}
          </Typography>

          {showActions && (
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              {quantity > 0 && (
                <>
                  <IconButton 
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      onRemoveFromCart?.(product);
                    }}
                    sx={{ 
                      backgroundColor: '#ffebee',
                      color: '#d32f2f',
                      '&:hover': { backgroundColor: '#ffcdd2' }
                    }}
                  >
                    <Remove fontSize="small" />
                  </IconButton>
                  
                  <Chip 
                    label={quantity}
                    size="small"
                    sx={{ 
                      backgroundColor: '#e3f2fd',
                      color: '#1976d2',
                      fontWeight: 'bold'
                    }}
                  />
                </>
              )}
              
              <IconButton 
                size="small"
                onClick={(e) => {
                  e.stopPropagation();
                  onAddToCart?.(product);
                }}
                sx={{ 
                  backgroundColor: '#e8f5e8',
                  color: '#27ae60',
                  '&:hover': { backgroundColor: '#c8e6c9' }
                }}
              >
                <Add fontSize="small" />
              </IconButton>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
}

ProductCard.propTypes = {
  product: PropTypes.shape({
    id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
    nome: PropTypes.string.isRequired,
    preco: PropTypes.string.isRequired,
    cor: PropTypes.string.isRequired,
    descricao: PropTypes.string
  }).isRequired,
  onAddToCart: PropTypes.func,
  onRemoveFromCart: PropTypes.func,
  quantity: PropTypes.number,
  showActions: PropTypes.bool,
  onClick: PropTypes.func
};