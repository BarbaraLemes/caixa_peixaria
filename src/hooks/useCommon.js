import { useState, useEffect } from 'react';
// Hook customizados para funcionalidades comuns
/**
 * Hook para gerenciar estado no localStorage
 * @param {string} key - Chave do localStorage
 * @param {*} initialValue - Valor inicial se não existir no localStorage
 * @returns {[value, setValue]} - Array com valor e função setter
 */
export function useLocalStorage(key, initialValue) {
  // Função para obter valor inicial
  const getStoredValue = () => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.warn(`Erro ao ler localStorage key "${key}":`, error);
      return initialValue;
    }
  };

  const [storedValue, setStoredValue] = useState(getStoredValue);

  // Função para atualizar o valor
  const setValue = (value) => {
    try {
      // Permite que value seja uma função (como useState)
      const valueToStore = value instanceof Function ? value(storedValue) : value;
      
      setStoredValue(valueToStore);
      
      if (valueToStore === undefined) {
        window.localStorage.removeItem(key);
      } else {
        window.localStorage.setItem(key, JSON.stringify(valueToStore));
      }
    } catch (error) {
      console.warn(`Erro ao salvar no localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

/** Utilizar em filtros de busca, para evitar muitas chamadas seguidas
 * Hook para debounce de valores
 * @param {*} value - Valor a ser debounced
 * @param {number} delay - Delay em millisegundos
 * @returns {*} - Valor debounced
 */
// export function useDebounce(value, delay) {
//   const [debouncedValue, setDebouncedValue] = useState(value);

//   useEffect(() => {
//     const handler = setTimeout(() => {
//       setDebouncedValue(value);
//     }, delay);

//     return () => {
//       clearTimeout(handler);
//     };
//   }, [value, delay]);

//   return debouncedValue;
// }

/**
 * Hook para toggle de modals/dialogs
 * @param {boolean} initialValue - Estado inicial
 * @returns {[isOpen, open, close, toggle]} - Estado e funções de controle
 */
export function useModal(initialValue = false) {
  const [isOpen, setIsOpen] = useState(initialValue);

  const open = () => setIsOpen(true);
  const close = () => setIsOpen(false);
  const toggle = () => setIsOpen(prev => !prev);

  return [isOpen, open, close, toggle];
}

/**
 * Hook para validação de formulários
 * @param {Object} initialValues - Valores iniciais do formulário
 * @param {Function} validationRules - Função de validação
 * @returns {Object} - Estado e funções do formulário
 */
export function useForm(initialValues, validationRules) {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [touched, setTouched] = useState({});

  const handleChange = (name, value) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }));

    // Limpa o erro quando o usuário começa a digitar
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const handleBlur = (name) => {
    setTouched(prev => ({
      ...prev,
      [name]: true
    }));

    // Valida o campo específico
    if (validationRules) {
      const fieldErrors = validationRules({ [name]: values[name] });
      setErrors(prev => ({
        ...prev,
        ...fieldErrors
      }));
    }
  };

  const validate = () => {
    if (!validationRules) return true;

    const newErrors = validationRules(values);
    setErrors(newErrors);
    setTouched(
      Object.keys(values).reduce((acc, key) => {
        acc[key] = true;
        return acc;
      }, {})
    );

    return Object.keys(newErrors).length === 0;
  };

  const reset = () => {
    setValues(initialValues);
    setErrors({});
    setTouched({});
  };

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validate,
    reset,
    isValid: Object.keys(errors).length === 0
  };
}