//para gerenciar o estado global dos produtos. Na parte de gestão de produtos, como adicionar, atualizar, excluir e listar produtos.
import { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';
import { mockProducts } from '../services/mockData';

const ProductsContext = createContext();

// Action types
const PRODUCTS_ACTIONS = {
  SET_PRODUCTS: 'SET_PRODUCTS',
  ADD_PRODUCT: 'ADD_PRODUCT',
  UPDATE_PRODUCT: 'UPDATE_PRODUCT',
  DELETE_PRODUCT: 'DELETE_PRODUCT',
  SET_ACTIVE_CATEGORY: 'SET_ACTIVE_CATEGORY',
};

// Reducer
function productsReducer(state, action) {
  switch (action.type) {
    case PRODUCTS_ACTIONS.SET_PRODUCTS:
      return {
        ...state,
        products: action.payload,
      };

    case PRODUCTS_ACTIONS.ADD_PRODUCT:
      return {
        ...state,
        products: {
          ...state.products,
          [action.payload.categoria]: [
            ...state.products[action.payload.categoria],
            { ...action.payload, id: Date.now() }
          ]
        }
      };

    case PRODUCTS_ACTIONS.UPDATE_PRODUCT:
      return {
        ...state,
        products: {
          ...state.products,
          [action.payload.categoria]: state.products[action.payload.categoria].map(
            product => product.id === action.payload.id ? action.payload : product
          )
        }
      };

    case PRODUCTS_ACTIONS.DELETE_PRODUCT:
      return {
        ...state,
        products: {
          ...state.products,
          [action.category]: state.products[action.category].filter(
            product => product.id !== action.productId
          )
        }
      };

    case PRODUCTS_ACTIONS.SET_ACTIVE_CATEGORY:
      return {
        ...state,
        activeCategory: action.payload,
      };

    default:
      return state;
  }
}

// Initial state
const initialState = {
  products: mockProducts,
  activeCategory: 'bebidas',
};

// Provider component
export function ProductsProvider({ children }) {
  const [state, dispatch] = useReducer(productsReducer, initialState);

  const actions = {
    setProducts: (products) => dispatch({ type: PRODUCTS_ACTIONS.SET_PRODUCTS, payload: products }),
    addProduct: (product) => dispatch({ type: PRODUCTS_ACTIONS.ADD_PRODUCT, payload: product }),
    updateProduct: (product) => dispatch({ type: PRODUCTS_ACTIONS.UPDATE_PRODUCT, payload: product }),
    deleteProduct: (productId, category) => dispatch({ 
      type: PRODUCTS_ACTIONS.DELETE_PRODUCT, 
      productId, 
      category 
    }),
    setActiveCategory: (category) => dispatch({ 
      type: PRODUCTS_ACTIONS.SET_ACTIVE_CATEGORY, 
      payload: category 
    }),
  };

  const value = {
    ...state,
    ...actions,
  };

  return (
    <ProductsContext.Provider value={value}>
      {children}
    </ProductsContext.Provider>
  );
}

ProductsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hook
export function useProducts() {
  const context = useContext(ProductsContext);
  if (!context) {
    throw new Error('useProducts deve ser usado dentro de ProductsProvider');
  }
  return context;
}

export { PRODUCTS_ACTIONS };