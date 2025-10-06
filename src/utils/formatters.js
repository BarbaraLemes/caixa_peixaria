// import { FORMAT_CONFIG } from './constants';

// /**
//  * Formata valores monetários
//  * @param {string|number} value - Valor a ser formatado
//  * @returns {string} - Valor formatado (ex: "R$ 25,00")
//  */
// export function formatCurrency(value) {
//   if (typeof value === 'string') {
//     // Se já está formatado como "R$ X,XX", retorna como está
//     if (value.includes('R$')) {
//       return value;
//     }
    
//     // Converte string para número
//     const numericValue = parseFloat(value.replace(',', '.'));
//     if (isNaN(numericValue)) {
//       return 'R$ 0,00';
//     }
//     value = numericValue;
//   }

//   if (typeof value !== 'number') {
//     return 'R$ 0,00';
//   }

//   return new Intl.NumberFormat(FORMAT_CONFIG.CURRENCY.locale, {
//     style: 'currency',
//     currency: FORMAT_CONFIG.CURRENCY.currency,
//     minimumFractionDigits: 2,
//     maximumFractionDigits: 2
//   }).format(value);
// }

// /**
//  * Converte string formatada para número
//  * @param {string} formattedValue - Valor formatado (ex: "R$ 25,00")
//  * @returns {number} - Valor numérico
//  */
// export function parseCurrency(formattedValue) {
//   if (typeof formattedValue !== 'string') {
//     return 0;
//   }

//   // Remove "R$", espaços e converte vírgula para ponto
//   const numericString = formattedValue
//     .replace(/R\$\s?/, '')
//     .replace(/\./g, '')  // Remove pontos (milhares)
//     .replace(',', '.');  // Converte vírgula decimal para ponto

//   const value = parseFloat(numericString);
//   return isNaN(value) ? 0 : value;
// }

// /**
//  * Formata datas
//  * @param {Date|string} date - Data a ser formatada
//  * @param {Object} options - Opções de formatação
//  * @returns {string} - Data formatada
//  */
// export function formatDate(date, options = FORMAT_CONFIG.DATE.options) {
//   const dateObj = date instanceof Date ? date : new Date(date);
  
//   if (isNaN(dateObj.getTime())) {
//     return 'Data inválida';
//   }

//   return dateObj.toLocaleDateString(FORMAT_CONFIG.DATE.locale, options);
// }

// /**
//  * Formata horários
//  * @param {Date|string} time - Horário a ser formatado
//  * @param {Object} options - Opções de formatação
//  * @returns {string} - Horário formatado
//  */
// export function formatTime(time, options = FORMAT_CONFIG.TIME.options) {
//   const timeObj = time instanceof Date ? time : new Date(`1970-01-01T${time}`);
  
//   if (isNaN(timeObj.getTime())) {
//     return 'Horário inválido';
//   }

//   return timeObj.toLocaleTimeString(FORMAT_CONFIG.TIME.locale, options);
// }

// /**
//  * Formata números com separadores de milhares
//  * @param {number} value - Número a ser formatado
//  * @returns {string} - Número formatado
//  */
// export function formatNumber(value) {
//   if (typeof value !== 'number') {
//     return '0';
//   }

//   return new Intl.NumberFormat(FORMAT_CONFIG.CURRENCY.locale).format(value);
// }

// /**
//  * Formata porcentagens
//  * @param {number} value - Valor decimal (ex: 0.15 para 15%)
//  * @param {number} decimals - Número de casas decimais
//  * @returns {string} - Porcentagem formatada
//  */
// export function formatPercentage(value, decimals = 1) {
//   if (typeof value !== 'number') {
//     return '0%';
//   }

//   return new Intl.NumberFormat(FORMAT_CONFIG.CURRENCY.locale, {
//     style: 'percent',
//     minimumFractionDigits: decimals,
//     maximumFractionDigits: decimals
//   }).format(value);
// }

// /**
//  * Trunca texto com reticências
//  * @param {string} text - Texto a ser truncado
//  * @param {number} maxLength - Comprimento máximo
//  * @returns {string} - Texto truncado
//  */
// export function truncateText(text, maxLength = 50) {
//   if (typeof text !== 'string') {
//     return '';
//   }

//   if (text.length <= maxLength) {
//     return text;
//   }

//   return text.substring(0, maxLength - 3) + '...';
// }

// /**
//  * Capitaliza primeira letra
//  * @param {string} text - Texto a ser capitalizado
//  * @returns {string} - Texto capitalizado
//  */
// export function capitalize(text) {
//   if (typeof text !== 'string' || text.length === 0) {
//     return '';
//   }

//   return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
// }

// /**
//  * Formata texto para título (primeira letra de cada palavra maiúscula)
//  * @param {string} text - Texto a ser formatado
//  * @returns {string} - Texto em formato título
//  */
// export function toTitleCase(text) {
//   if (typeof text !== 'string') {
//     return '';
//   }

//   return text
//     .toLowerCase()
//     .split(' ')
//     .map(word => capitalize(word))
//     .join(' ');
// }