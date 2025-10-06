import { Box, Button } from '@mui/material';
import PropTypes from 'prop-types';

/**
 * Componente de abas reutilizável
 * @param {Object} props
 * @param {Array} props.tabs - Array de abas com {key, label, count?}
 * @param {string} props.activeTab - Aba ativa atual
 * @param {Function} props.onTabChange - Callback quando a aba muda
 * @param {Object} props.sx - Estilos customizados
 */
export default function TabGroup({ tabs, activeTab, onTabChange, sx = {} }) {
  return (
    <Box 
      sx={{ 
        display: 'flex',
        backgroundColor: '#f0f0f0',
        borderRadius: '25px',
        padding: '4px',
        marginBottom: 3,
        width: '100%',
        ...sx
      }}
    >
      {tabs.map((tab) => (
        <Button 
          key={tab.key}
          onClick={() => onTabChange(tab.key)}
          sx={{
            backgroundColor: activeTab === tab.key ? 'white' : 'transparent',
            color: 'black',
            flex: 1,
            borderRadius: '20px',
            padding: '8px 24px',
            textTransform: 'none',
            fontWeight: 500,
            border: 'none',
            boxShadow: activeTab === tab.key ? '0 1px 3px rgba(0,0,0,0.1)' : 'none',
            '&:hover': {
              backgroundColor: activeTab === tab.key ? 'white' : 'rgba(255,255,255,0.5)'
            }
          }}
        >
          {tab.label} {tab.count !== undefined && `(${tab.count})`}
        </Button>
      ))}
    </Box>
  );
}

TabGroup.propTypes = {
  tabs: PropTypes.arrayOf(
    PropTypes.shape({
      key: PropTypes.string.isRequired,
      label: PropTypes.string.isRequired,
      count: PropTypes.number
    })
  ).isRequired,
  activeTab: PropTypes.string.isRequired,
  onTabChange: PropTypes.func.isRequired,
  sx: PropTypes.object
};