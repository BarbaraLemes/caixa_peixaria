export type Categoria = 'bebidas' | 'pratos' | 'sobremesas';

export interface Produto {
  id: string;
  nome: string;
  preco: number;
  categoria: Categoria;
  cor: string;
}

export interface ProdutoFormData {
  nome: string;
  preco: string;
  categoria: Categoria;
  cor: string;
}

export interface ProdutoModalProps {
  open: boolean;
  produto: Produto | null;
  onClose: () => void;
  onSave: (produto: Produto) => void;
}