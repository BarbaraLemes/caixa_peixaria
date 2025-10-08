import React from 'react';
import { Box, Typography, Button, Avatar } from "@mui/material";
import {
  Person,
  CalendarTodayOutlined,
  ExitToApp,
  ShoppingCartOutlined,
} from "@mui/icons-material";
import { HeaderProps } from '@/types';

const Header: React.FC<HeaderProps> = ({ usuario, onLogout }) => {
  // Mock data - depois virá de contexto/estado global
  const nomeUsuario = usuario?.nome || "João Silva";
  const dataAtual = new Date().toLocaleDateString("pt-BR", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const totalDia = `R$ ${(usuario?.vendas || 1230).toFixed(2).replace('.', ',')}`;
  const numeroPedidos = usuario?.pedidos || 15;

  const formatarData = (data: string): string => {
    return data.charAt(0).toUpperCase() + data.slice(1);
  };

  const handleLogout = (): void => {
    if (onLogout) {
      onLogout();
    }
    // Lógica de logout aqui
  };

  return (
    <Box
      component="header"
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 24px",
        boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
      }}
    >
      {/* Lado Esquerdo - Sistema e Usuário */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 4 }}>
        {/* Avatar e Usuario */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Avatar
            sx={{
              backgroundColor: "#80b1d2ff",
              width: 45,
              height: 45,
            }}
          >
            <Person />
          </Avatar>
          <Box>
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "#333", letterSpacing: "0.5px" }}
            >
              Sistema de Caixa
            </Typography>
            <Typography variant="body2" sx={{ color: "#666" }}>
              {nomeUsuario}
            </Typography>
          </Box>
        </Box>

        {/* Data */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <CalendarTodayOutlined sx={{ color: "#666", fontSize: 20 }} />
          <Typography variant="body2" sx={{ color: "#666" }}>
            {formatarData(dataAtual)}
          </Typography>
        </Box>
      </Box>

      {/* Lado Direito - Estatísticas e Sair */}
      <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
        {/* Total do Dia */}
        <Box sx={{ textAlign: "center" }}>
          <Typography
            variant="h6"
            sx={{ fontWeight: "bold", color: "#27ae60" }}
          >
            {totalDia}
          </Typography>
          <Typography variant="caption" sx={{ color: "#666" }}>
            Total do Dia
          </Typography>
        </Box>

        {/* Número de Pedidos */}
        <Box sx={{ textAlign: "center" }}>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 0.5,
            }}
          >
            <ShoppingCartOutlined sx={{ color: "#3498db", fontSize: 20 }} />
            <Typography
              variant="h6"
              sx={{ fontWeight: "bold", color: "#3498db" }}
            >
              {numeroPedidos}
            </Typography>
          </Box>
          <Typography variant="caption" sx={{ color: "#666" }}>
            Pedidos
          </Typography>
        </Box>

        {/* Botão Sair
            Adicionar rota de logout futuramente, retorna para a página de login
        */}
        <Button
          variant="outlined"
          startIcon={<ExitToApp />}
          onClick={handleLogout}
          sx={{
            borderColor: "#000",
            color: "#000",
            textTransform: "none",
            borderRadius: 2,
            padding: "8px 16px",
            "&:hover": {
              color: "#c62828",
              backgroundColor: "#ffebee",
              borderColor: "#c62828",
            },
          }}
        >
          Sair
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
