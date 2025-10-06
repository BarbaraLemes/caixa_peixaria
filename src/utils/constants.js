// Categorias de produtos
export const PRODUCT_CATEGORIES = {
  BEBIDAS: 'bebidas',
  PRATOS: 'pratos',
  SOBREMESAS: 'sobremesas'
};

// Labels das categorias
export const CATEGORY_LABELS = {
  [PRODUCT_CATEGORIES.BEBIDAS]: 'Bebidas',
  [PRODUCT_CATEGORIES.PRATOS]: 'Pratos',
  [PRODUCT_CATEGORIES.SOBREMESAS]: 'Sobremesas'
};

// Formas de pagamento
export const PAYMENT_METHODS = {
  DINHEIRO: 'dinheiro',
  CARTAO: 'cartao',
  PIX: 'pix'
};

// Labels das formas de pagamento
export const PAYMENT_LABELS = {
  [PAYMENT_METHODS.DINHEIRO]: 'Dinheiro',
  [PAYMENT_METHODS.CARTAO]: 'Cartão',
  [PAYMENT_METHODS.PIX]: 'PIX'
};

// Status de vendas
export const SALE_STATUS = {
  PENDENTE: 'pendente',
  PROCESSANDO: 'processando',
  CONCLUIDA: 'concluida',
  CANCELADA: 'cancelada'
};

// Status labels
export const SALE_STATUS_LABELS = {
  [SALE_STATUS.PENDENTE]: 'Pendente',
  [SALE_STATUS.PROCESSANDO]: 'Processando',
  [SALE_STATUS.CONCLUIDA]: 'Concluída',
  [SALE_STATUS.CANCELADA]: 'Cancelada'
};

// Cores padrão para produtos
export const PRODUCT_COLORS = [
  '#ff6b35', // Laranja
  '#f39c12', // Amarelo
  '#27ae60', // Verde
  '#3498db', // Azul
  '#e74c3c', // Vermelho
  '#9b59b6', // Roxo
  '#34495e', // Azul escuro
  '#e67e22', // Laranja escuro
  '#f1c40f', // Amarelo claro
  '#1abc9c', // Verde água
  '#e91e63', // Rosa
  '#673ab7'  // Roxo escuro
];

// Configurações de formatação
export const FORMAT_CONFIG = {
  CURRENCY: {
    locale: 'pt-BR',
    currency: 'BRL'
  },
  DATE: {
    locale: 'pt-BR',
    options: {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }
  },
  TIME: {
    locale: 'pt-BR',
    options: {
      hour: '2-digit',
      minute: '2-digit'
    }
  }
};

// Mensagens do sistema
export const MESSAGES = {
  SUCCESS: {
    PRODUCT_CREATED: 'Produto criado com sucesso!',
    PRODUCT_UPDATED: 'Produto atualizado com sucesso!',
    PRODUCT_DELETED: 'Produto removido com sucesso!',
    SALE_COMPLETED: 'Venda concluída com sucesso!',
    SETTINGS_SAVED: 'Configurações salvas com sucesso!'
  },
  ERROR: {
    PRODUCT_NOT_FOUND: 'Produto não encontrado',
    PRODUCT_CREATION_FAILED: 'Erro ao criar produto',
    PRODUCT_UPDATE_FAILED: 'Erro ao atualizar produto',
    PRODUCT_DELETE_FAILED: 'Erro ao remover produto',
    SALE_FAILED: 'Erro ao processar venda',
    INVALID_FORM: 'Por favor, verifique os dados informados',
    NETWORK_ERROR: 'Erro de conexão. Tente novamente.',
    UNKNOWN_ERROR: 'Ocorreu um erro inesperado'
  },
  CONFIRMATION: {
    DELETE_PRODUCT: 'Tem certeza que deseja excluir este produto?',
    CANCEL_SALE: 'Tem certeza que deseja cancelar esta venda?',
    CLEAR_CART: 'Tem certeza que deseja limpar o carrinho?'
  }
};

// Validações
export const VALIDATION_RULES = {
  PRODUCT_NAME: {
    required: true,
    minLength: 2,
    maxLength: 50
  },
  PRODUCT_PRICE: {
    required: true,
    min: 0.01,
    max: 9999.99
  },
  PAYMENT_VALUE: {
    required: true,
    min: 0.01
  }
};

// Configurações de paginação
export const PAGINATION = {
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [5, 10, 25, 50]
};

// Breakpoints responsivos
export const BREAKPOINTS = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536
};

// Configurações de tema
export const THEME_CONFIG = {
  COLORS: {
    PRIMARY: '#2c3e50',
    SECONDARY: '#7c9ff5',
    SUCCESS: '#27ae60',
    ERROR: '#e74c3c',
    WARNING: '#f39c12',
    INFO: '#3498db'
  },
  SPACING: {
    XS: 4,
    SM: 8,
    MD: 16,
    LG: 24,
    XL: 32
  }
};