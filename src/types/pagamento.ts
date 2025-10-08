export type MetodoPagamento = 'dinheiro' | 'cartao';

export interface PagamentoData {
  metodo: MetodoPagamento;
  valor: number;
  valorRecebido?: number;
  troco?: number;
}

export interface SecaoPagamentoProps {
  total: number;
  onPagamento?: (pagamento: PagamentoData) => void;
}