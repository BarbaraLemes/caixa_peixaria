export interface UsuarioInfo {
  nome: string;
  avatar: string;
  vendas: number;
  pedidos: number;
}

export interface HeaderProps {
  usuario?: UsuarioInfo;
  onLogout?: () => void;
}