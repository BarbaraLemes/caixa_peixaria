// import { VALIDATION_RULES, MESSAGES } from './constants';

// /**
//  * Valida nome de produto
//  * @param {string} name - Nome do produto
//  * @returns {string|null} - Mensagem de erro ou null se válido
//  */
// export function validateProductName(name) {
//   if (!name || typeof name !== 'string') {
//     return 'Nome é obrigatório';
//   }

//   const trimmedName = name.trim();
  
//   if (trimmedName.length < VALIDATION_RULES.PRODUCT_NAME.minLength) {
//     return `Nome deve ter pelo menos ${VALIDATION_RULES.PRODUCT_NAME.minLength} caracteres`;
//   }

//   if (trimmedName.length > VALIDATION_RULES.PRODUCT_NAME.maxLength) {
//     return `Nome deve ter no máximo ${VALIDATION_RULES.PRODUCT_NAME.maxLength} caracteres`;
//   }

//   return null;
// }

// /**
//  * Valida preço de produto
//  * @param {string|number} price - Preço do produto
//  * @returns {string|null} - Mensagem de erro ou null se válido
//  */
// export function validateProductPrice(price) {
//   if (!price && price !== 0) {
//     return 'Preço é obrigatório';
//   }

//   let numericPrice;
  
//   if (typeof price === 'string') {
//     // Remove formatação se necessário
//     const cleanPrice = price.replace(/R\$\s?/, '').replace(',', '.');
//     numericPrice = parseFloat(cleanPrice);
//   } else {
//     numericPrice = price;
//   }

//   if (isNaN(numericPrice)) {
//     return 'Preço deve ser um número válido';
//   }

//   if (numericPrice < VALIDATION_RULES.PRODUCT_PRICE.min) {
//     return `Preço deve ser maior que R$ ${VALIDATION_RULES.PRODUCT_PRICE.min.toFixed(2)}`;
//   }

//   if (numericPrice > VALIDATION_RULES.PRODUCT_PRICE.max) {
//     return `Preço deve ser menor que R$ ${VALIDATION_RULES.PRODUCT_PRICE.max.toFixed(2)}`;
//   }

//   return null;
// }

// /**
//  * Valida cor de produto
//  * @param {string} color - Cor em formato hex
//  * @returns {string|null} - Mensagem de erro ou null se válido
//  */
// export function validateProductColor(color) {
//   if (!color || typeof color !== 'string') {
//     return 'Cor é obrigatória';
//   }

//   // Regex para validar cor hex (#RRGGBB ou #RGB)
//   const hexColorRegex = /^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/;
  
//   if (!hexColorRegex.test(color)) {
//     return 'Cor deve estar em formato hexadecimal válido (ex: #FF0000)';
//   }

//   return null;
// }

// /**
//  * Valida categoria de produto
//  * @param {string} category - Categoria do produto
//  * @param {Array} validCategories - Categorias válidas
//  * @returns {string|null} - Mensagem de erro ou null se válido
//  */
// export function validateProductCategory(category, validCategories = []) {
//   if (!category || typeof category !== 'string') {
//     return 'Categoria é obrigatória';
//   }

//   if (validCategories.length > 0 && !validCategories.includes(category)) {
//     return 'Categoria inválida';
//   }

//   return null;
// }

// /**
//  * Valida produto completo
//  * @param {Object} product - Dados do produto
//  * @param {Array} validCategories - Categorias válidas
//  * @returns {Object} - {isValid: boolean, errors: Object}
//  */
// export function validateProduct(product, validCategories = []) {
//   const errors = {};

//   // Validar nome
//   const nameError = validateProductName(product.nome);
//   if (nameError) {
//     errors.nome = nameError;
//   }

//   // Validar preço
//   const priceError = validateProductPrice(product.preco);
//   if (priceError) {
//     errors.preco = priceError;
//   }

//   // Validar cor
//   const colorError = validateProductColor(product.cor);
//   if (colorError) {
//     errors.cor = colorError;
//   }

//   // Validar categoria
//   const categoryError = validateProductCategory(product.categoria, validCategories);
//   if (categoryError) {
//     errors.categoria = categoryError;
//   }

//   return {
//     isValid: Object.keys(errors).length === 0,
//     errors
//   };
// }

// /**
//  * Valida valor de pagamento
//  * @param {string|number} value - Valor recebido
//  * @param {number} total - Total da venda
//  * @returns {string|null} - Mensagem de erro ou null se válido
//  */
// export function validatePaymentValue(value, total) {
//   if (!value && value !== 0) {
//     return 'Valor recebido é obrigatório';
//   }

//   let numericValue;
  
//   if (typeof value === 'string') {
//     numericValue = parseFloat(value.replace(',', '.'));
//   } else {
//     numericValue = value;
//   }

//   if (isNaN(numericValue)) {
//     return 'Valor deve ser um número válido';
//   }

//   if (numericValue < VALIDATION_RULES.PAYMENT_VALUE.min) {
//     return 'Valor deve ser maior que zero';
//   }

//   if (numericValue < total) {
//     return 'Valor recebido não pode ser menor que o total';
//   }

//   return null;
// }

// /**
//  * Valida email
//  * @param {string} email - Email a ser validado
//  * @returns {string|null} - Mensagem de erro ou null se válido
//  */
// export function validateEmail(email) {
//   if (!email || typeof email !== 'string') {
//     return 'Email é obrigatório';
//   }

//   const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
//   if (!emailRegex.test(email)) {
//     return 'Email deve ter um formato válido';
//   }

//   return null;
// }

// /**
//  * Valida telefone brasileiro
//  * @param {string} phone - Telefone a ser validado
//  * @returns {string|null} - Mensagem de erro ou null se válido
//  */
// export function validatePhone(phone) {
//   if (!phone || typeof phone !== 'string') {
//     return 'Telefone é obrigatório';
//   }

//   // Remove formatação
//   const cleanPhone = phone.replace(/\D/g, '');
  
//   // Valida telefone brasileiro (10 ou 11 dígitos)
//   if (cleanPhone.length < 10 || cleanPhone.length > 11) {
//     return 'Telefone deve ter 10 ou 11 dígitos';
//   }

//   return null;
// }

// /**
//  * Valida CNPJ
//  * @param {string} cnpj - CNPJ a ser validado
//  * @returns {string|null} - Mensagem de erro ou null se válido
//  */
// export function validateCNPJ(cnpj) {
//   if (!cnpj || typeof cnpj !== 'string') {
//     return 'CNPJ é obrigatório';
//   }

//   // Remove formatação
//   const cleanCNPJ = cnpj.replace(/\D/g, '');
  
//   if (cleanCNPJ.length !== 14) {
//     return 'CNPJ deve ter 14 dígitos';
//   }

//   // Validação básica - implementar algoritmo completo se necessário
//   if (/^(\d)\1+$/.test(cleanCNPJ)) {
//     return 'CNPJ inválido';
//   }

//   return null;
// }

// /**
//  * Função utilitária para limpar erros de validação
//  * @param {Object} errors - Objeto de erros
//  * @param {string} field - Campo a ser limpo
//  * @returns {Object} - Novo objeto de erros sem o campo especificado
//  */
// export function clearFieldError(errors, field) {
//   const newErrors = { ...errors };
//   delete newErrors[field];
//   return newErrors;
// }

// /**
//  * Verifica se existem erros de validação
//  * @param {Object} errors - Objeto de erros
//  * @returns {boolean} - True se existem erros
//  */
// export function hasValidationErrors(errors) {
//   return Object.keys(errors).length > 0;
// }