// Para lidar com o carrinho de finalização de vendas
import { createContext, useContext, useReducer } from 'react';
import PropTypes from 'prop-types';

const CartContext = createContext();

// Action types
const CART_ACTIONS = {
  ADD_ITEM: 'ADD_ITEM',
  REMOVE_ITEM: 'REMOVE_ITEM',
  UPDATE_QUANTITY: 'UPDATE_QUANTITY',
  CLEAR_CART: 'CLEAR_CART',
  SET_PAYMENT_METHOD: 'SET_PAYMENT_METHOD',
  SET_RECEIVED_VALUE: 'SET_RECEIVED_VALUE',
};

// Reducer
function cartReducer(state, action) {
  switch (action.type) {
    case CART_ACTIONS.ADD_ITEM:
      const existingItem = state.items.find(item => item.id === action.payload.id);
      
      if (existingItem) {
        return {
          ...state,
          items: state.items.map(item =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        };
      }
      
      return {
        ...state,
        items: [...state.items, { ...action.payload, quantity: 1 }]
      };

    case CART_ACTIONS.REMOVE_ITEM:
      return {
        ...state,
        items: state.items.filter(item => item.id !== action.payload)
      };

    case CART_ACTIONS.UPDATE_QUANTITY:
      return {
        ...state,
        items: state.items.map(item =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        )
      };

    case CART_ACTIONS.CLEAR_CART:
      return {
        ...state,
        items: [],
        paymentMethod: '',
        receivedValue: ''
      };

    case CART_ACTIONS.SET_PAYMENT_METHOD:
      return {
        ...state,
        paymentMethod: action.payload
      };

    case CART_ACTIONS.SET_RECEIVED_VALUE:
      return {
        ...state,
        receivedValue: action.payload
      };

    default:
      return state;
  }
}

// Initial state
const initialState = {
  items: [],
  paymentMethod: '',
  receivedValue: '',
};

// Provider component
export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const actions = {
    addItem: (product) => dispatch({ type: CART_ACTIONS.ADD_ITEM, payload: product }),
    removeItem: (productId) => dispatch({ type: CART_ACTIONS.REMOVE_ITEM, payload: productId }),
    updateQuantity: (productId, quantity) => dispatch({ 
      type: CART_ACTIONS.UPDATE_QUANTITY, 
      payload: { id: productId, quantity } 
    }),
    clearCart: () => dispatch({ type: CART_ACTIONS.CLEAR_CART }),
    setPaymentMethod: (method) => dispatch({ type: CART_ACTIONS.SET_PAYMENT_METHOD, payload: method }),
    setReceivedValue: (value) => dispatch({ type: CART_ACTIONS.SET_RECEIVED_VALUE, payload: value }),
  };

  // Computed values
  const total = state.items.reduce((sum, item) => {
    const price = parseFloat(item.preco.replace('R$', '').replace(',', '.'));
    return sum + (price * item.quantity);
  }, 0);

  const change = state.receivedValue && state.paymentMethod === 'dinheiro'
    ? Math.max(0, parseFloat(state.receivedValue) - total)
    : 0;

  const itemCount = state.items.reduce((sum, item) => sum + item.quantity, 0);

  const value = {
    ...state,
    ...actions,
    total,
    change,
    itemCount,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

CartProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

// Custom hook
export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart deve ser usado dentro de CartProvider');
  }
  return context;
}

export { CART_ACTIONS };