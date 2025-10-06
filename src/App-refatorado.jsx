import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';
import Home from "./pages/Home";
import { ProductsProvider } from "./contexts/ProductsContext";
import { CartProvider } from "./contexts/CartContext";
import { THEME_CONFIG } from "./utils/constants";

// Configuração do tema Material-UI
const theme = createTheme({
  palette: {
    primary: {
      main: THEME_CONFIG.COLORS.PRIMARY,
    },
    secondary: {
      main: THEME_CONFIG.COLORS.SECONDARY,
    },
    success: {
      main: THEME_CONFIG.COLORS.SUCCESS,
    },
    error: {
      main: THEME_CONFIG.COLORS.ERROR,
    },
    warning: {
      main: THEME_CONFIG.COLORS.WARNING,
    },
    info: {
      main: THEME_CONFIG.COLORS.INFO,
    },
  },
  spacing: THEME_CONFIG.SPACING.SM,
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 'bold',
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          borderRadius: 8,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

function App() {
  return (
    //isso aqui ir para a main, app ficar no meio. E dentro do app o arquirvo de rotas
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ProductsProvider>
        <CartProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />} />
              {/* Futuras rotas aqui */}
            </Routes>
          </BrowserRouter>
        </CartProvider>
      </ProductsProvider>
    </ThemeProvider>
  );
}

export default App;