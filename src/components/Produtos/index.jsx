import { Grid, Box, Typography, Button, ButtonGroup } from "@mui/material";
import { useState } from "react";

export default function Produtos() {
  const [activeTab, setActiveTab] = useState('bebidas');

  return (
    <Box 
      sx={{ 
        padding: 4,
        border: '1px solid #e0e0e0',
        borderRadius: 2,
        margin: 2
      }}
    >
      <Typography variant="h6" component="h2" sx={{ marginBottom: 2 }}>
        Produtos
      </Typography>
      
      <Box 
        sx={{ 
          display: 'flex',
          backgroundColor: '#f0f0f0',
          borderRadius: '25px',
          padding: '4px',
          marginBottom: 3,
          width: '100%'
        }}
      >
        <Button 
          onClick={() => setActiveTab('bebidas')}
          sx={{
            backgroundColor: activeTab === 'bebidas' ? 'white' : 'transparent',
            color: 'black',
            width: '35%',
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
          Bebidas
        </Button>
        <Button 
          onClick={() => setActiveTab('pratos')}
          sx={{
            backgroundColor: activeTab === 'pratos' ? 'white' : 'transparent',
            color: 'black',
            width: '30%',
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
          Pratos
        </Button>
        <Button 
          onClick={() => setActiveTab('sobremesas')}
          sx={{
            backgroundColor: activeTab === 'sobremesas' ? 'white' : 'transparent',
            color: 'black',
            width: '35%',
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
          Sobremesas
        </Button>
      </Box>
      {/* Adicionar aqui o componente de produtos, onde provavelmente será feito o mapeamento dos produtos e pegar de uma API */}
    </Box>
  );
}
