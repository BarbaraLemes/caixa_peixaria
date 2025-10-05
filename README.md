# 🐟 Sistema de Caixa - Peixaria

> Sistema moderno de ponto de venda desenvolvido especificamente para restaurante, com interface intuitiva e funcionalidades completas de gestão.

## 🛠️ Instalação e Configuração

### 1. Clone o repositório
```bash
git clone https://github.com/BarbaraLemes/caixa_peixaria.git
cd caixa_peixaria
```

### 2. Instale as dependências
```bash
npm install
# ou
yarn install
```

### 3. Execute o projeto
```bash
npm run dev
# ou
yarn dev
```

### 4. Acesse a aplicação
Abra seu navegador e acesse: `http://localhost:5173`


## 🎯 Scripts Disponíveis

```bash
# Execução em modo desenvolvimento
npm run dev

# Build para produção
npm run build

# Preview da build de produção
npm run preview

# Linting do código
npm run lint
```

## 📖 Sobre o Projeto

O **Sistema de Caixa - Peixaria** é uma aplicação web moderna desenvolvida com React e Material-UI, projetada para facilitar as operações de venda em um restaurante. O sistema oferece uma interface limpa e intuitiva para gerenciar produtos, processar vendas e acompanhar o desempenho diário.

### ✨ Funcionalidades Principais

- 🛒 **Gestão de Produtos**: CRUD completo com categorização (Bebidas, Pratos, Sobremesas)
- 💰 **Sistema de Caixa**: Interface para processamento de vendas
- 💳 **Múltiplas Formas de Pagamento**: Dinheiro e cartão com cálculo automático de troco
- 🎨 **Personalização Visual**: Seletor de cores dinâmico para produtos
- 📊 **Dashboard**: Acompanhamento de vendas diárias e estatísticas
- 📱 **Responsivo**: Interface adaptável para desktop e mobile

## 🚀 Tecnologias Utilizadas

- **Frontend Framework**: React 19.x
- **Build Tool**: Vite
- **UI Library**: Material-UI (MUI)
- **Roteamento**: React Router DOM
- **Linguagem**: JavaScript (ES6+)
- **Estilização**: CSS Modules + MUI System
- **Ícones**: Material Icons

## 📱 Uso da Aplicação

### 1. Gestão de Produtos
- Acesse a seção de produtos
- Adicione novos itens com nome, preço, categoria e cor
- Edite ou remova produtos existentes
- Alterne entre categorias usando as abas

### 2. Processamento de Vendas
- Selecione produtos na interface principal
- Escolha a forma de pagamento (dinheiro/cartão)
- Para pagamento em dinheiro, insira o valor recebido
- O sistema calcula automaticamente o troco
- Finalize a venda

### 3. Acompanhamento
- Visualize o total de vendas do dia
- Acompanhe o número de pedidos processados
- Monitore as estatísticas no header

