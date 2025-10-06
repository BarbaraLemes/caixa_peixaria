import { useProducts } from '../contexts/ProductsContext';
import { useMemo } from 'react';

/**
 * Hook para gerenciar produtos com funcionalidades derivadas
 */
export function useProductsManager() {
  const {
    products,
    activeCategory,
    addProduct,
    updateProduct,
    deleteProduct,
    setActiveCategory
  } = useProducts();

  // Produtos da categoria ativa
  const activeProducts = useMemo(() => {
    return products[activeCategory] || [];
  }, [products, activeCategory]);

  // Estatísticas dos produtos
  const stats = useMemo(() => {
    const categories = Object.keys(products);
    const totalProducts = categories.reduce((total, category) => {
      return total + products[category].length;
    }, 0);

    const categoryCounts = categories.reduce((acc, category) => {
      acc[category] = products[category].length;
      return acc;
    }, {});

    return {
      totalProducts,
      categoryCounts,
      categories
    };
  }, [products]);

  // Buscar produto por ID
  const findProductById = (id) => {
    for (const category of Object.keys(products)) {
      const product = products[category].find(p => p.id === id);
      if (product) {
        return { ...product, category };
      }
    }
    return null;
  };

  // Validação de produto
  const validateProduct = (product) => {
    const errors = {};

    if (!product.nome || product.nome.trim() === '') {
      errors.nome = 'Nome é obrigatório';
    }

    if (!product.preco || product.preco.trim() === '') {
      errors.preco = 'Preço é obrigatório';
    } else {
      // Validar formato do preço (R$ X,XX)
      const precoNumerico = parseFloat(product.preco.replace('R$', '').replace(',', '.'));
      if (isNaN(precoNumerico) || precoNumerico <= 0) {
        errors.preco = 'Preço deve ser um valor válido maior que zero';
      }
    }

    if (!product.cor || product.cor.trim() === '') {
      errors.cor = 'Cor é obrigatória';
    }

    if (!product.categoria || product.categoria.trim() === '') {
      errors.categoria = 'Categoria é obrigatória';
    }

    return {
      isValid: Object.keys(errors).length === 0,
      errors
    };
  };

  // Adicionar produto com validação
  const addProductWithValidation = (product) => {
    const validation = validateProduct(product);
    
    if (!validation.isValid) {
      throw new Error(`Produto inválido: ${Object.values(validation.errors).join(', ')}`);
    }

    addProduct(product);
    return true;
  };

  // Atualizar produto com validação
  const updateProductWithValidation = (product) => {
    const validation = validateProduct(product);
    
    if (!validation.isValid) {
      throw new Error(`Produto inválido: ${Object.values(validation.errors).join(', ')}`);
    }

    updateProduct(product);
    return true;
  };

  // Excluir produto com confirmação
  const deleteProductWithConfirmation = (productId, category) => {
    const product = findProductById(productId);
    
    if (!product) {
      throw new Error('Produto não encontrado');
    }

    const confirmed = window.confirm(`Tem certeza que deseja excluir "${product.nome}"?`);
    
    if (confirmed) {
      deleteProduct(productId, category);
      return true;
    }
    
    return false;
  };

  return {
    // Estado
    products,
    activeCategory,
    activeProducts,
    stats,
    
    // Ações básicas
    addProduct,
    updateProduct,
    deleteProduct,
    setActiveCategory,
    
    // Ações com validação/lógica adicional
    addProductWithValidation,
    updateProductWithValidation,
    deleteProductWithConfirmation,
    
    // Utilitários
    findProductById,
    validateProduct
  };
}