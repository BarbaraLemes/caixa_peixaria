import { mockProducts, mockSales, mockSettings } from './mockData';

// Simula delay de API
const delay = (ms = 500) => new Promise(resolve => setTimeout(resolve, ms));

// API de Produtos
export const productsAPI = {
  // Buscar todos os produtos
  async getAll() {
    await delay();
    return {
      success: true,
      data: mockProducts
    };
  },

  // Buscar produtos por categoria
  async getByCategory(category) {
    await delay();
    return {
      success: true,
      data: mockProducts[category] || []
    };
  },

  // Buscar produto por ID
  async getById(id) {
    await delay();
    
    for (const category of Object.keys(mockProducts)) {
      const product = mockProducts[category].find(p => p.id === id);
      if (product) {
        return {
          success: true,
          data: { ...product, category }
        };
      }
    }
    
    return {
      success: false,
      error: 'Produto não encontrado'
    };
  },

  // Criar novo produto
  async create(product) {
    await delay();
    
    try {
      const newProduct = {
        ...product,
        id: Date.now(), // Em uma API real, seria gerado pelo backend
        createdAt: new Date().toISOString()
      };

      return {
        success: true,
        data: newProduct,
        message: 'Produto criado com sucesso'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao criar produto'
      };
    }
  },

  // Atualizar produto
  async update(id, product) {
    await delay();
    
    try {
      const updatedProduct = {
        ...product,
        id,
        updatedAt: new Date().toISOString()
      };

      return {
        success: true,
        data: updatedProduct,
        message: 'Produto atualizado com sucesso'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao atualizar produto'
      };
    }
  },

  // Deletar produto
  async delete(id) {
    await delay();
    
    try {
      return {
        success: true,
        message: 'Produto removido com sucesso'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao remover produto'
      };
    }
  }
};

// API de Vendas
export const salesAPI = {
  // Buscar todas as vendas
  async getAll(filters = {}) {
    await delay();
    
    let filteredSales = [...mockSales];
    
    // Aplicar filtros se fornecidos
    if (filters.data) {
      filteredSales = filteredSales.filter(sale => sale.data === filters.data);
    }
    
    if (filters.status) {
      filteredSales = filteredSales.filter(sale => sale.status === filters.status);
    }

    return {
      success: true,
      data: filteredSales
    };
  },

  // Buscar vendas por período
  async getByPeriod(startDate, endDate) {
    await delay();
    
    const filteredSales = mockSales.filter(sale => {
      const saleDate = new Date(sale.data);
      return saleDate >= new Date(startDate) && saleDate <= new Date(endDate);
    });

    return {
      success: true,
      data: filteredSales
    };
  },

  // Criar nova venda
  async create(sale) {
    await delay();
    
    try {
      const newSale = {
        ...sale,
        id: Date.now(),
        data: new Date().toISOString().split('T')[0],
        hora: new Date().toLocaleTimeString('pt-BR', { 
          hour: '2-digit', 
          minute: '2-digit' 
        }),
        status: 'concluida',
        createdAt: new Date().toISOString()
      };

      return {
        success: true,
        data: newSale,
        message: 'Venda registrada com sucesso'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao registrar venda'
      };
    }
  },

  // Estatísticas de vendas
  async getStats(date = null) {
    await delay();
    
    const targetDate = date || new Date().toISOString().split('T')[0];
    const dailySales = mockSales.filter(sale => sale.data === targetDate);
    
    const stats = {
      totalVendas: dailySales.reduce((sum, sale) => sum + sale.total, 0),
      numeroPedidos: dailySales.length,
      ticketMedio: dailySales.length > 0 
        ? dailySales.reduce((sum, sale) => sum + sale.total, 0) / dailySales.length 
        : 0,
      formasPagamento: {
        dinheiro: dailySales.filter(sale => sale.formaPagamento === 'dinheiro').length,
        cartao: dailySales.filter(sale => sale.formaPagamento === 'cartao').length
      }
    };

    return {
      success: true,
      data: stats
    };
  }
};

// API de Configurações
export const settingsAPI = {
  // Buscar configurações
  async get() {
    await delay();
    return {
      success: true,
      data: mockSettings
    };
  },

  // Atualizar configurações
  async update(settings) {
    await delay();
    
    try {
      return {
        success: true,
        data: { ...mockSettings, ...settings },
        message: 'Configurações salvas com sucesso'
      };
    } catch (error) {
      return {
        success: false,
        error: 'Erro ao salvar configurações'
      };
    }
  }
};

// API unificada
export const api = {
  products: productsAPI,
  sales: salesAPI,
  settings: settingsAPI
};