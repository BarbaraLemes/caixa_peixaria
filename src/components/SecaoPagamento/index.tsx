import React from 'react';
import { Box, Typography, Button, TextField, Divider } from "@mui/material";
import { useState } from "react";
import { MetodoPagamento, SecaoPagamentoProps } from '@/types';

const SecaoPagamento: React.FC<SecaoPagamentoProps> = ({ total = 0, onPagamento }) => {
    const [paymentMethod, setPaymentMethod] = useState<MetodoPagamento | ''>('');//verificar se vai deixar vazio ou colocar um valor padrão
    const [receivedValue, setReceivedValue] = useState<string>('');
    const change = receivedValue ? (parseFloat(receivedValue.replace(',', '.')) - total).toFixed(2) : '0,00';

    const handleConcluirVenda = (): void => {
        if (paymentMethod !== '') {
            const pagamentoData = {
                metodo: paymentMethod as MetodoPagamento,
                valor: total,
                valorRecebido: paymentMethod === 'dinheiro' ? parseFloat(receivedValue.replace(',', '.')) : undefined,
                troco: paymentMethod === 'dinheiro' ? parseFloat(change) : undefined
            };
            
            if (onPagamento) {
                onPagamento(pagamentoData);
            }
        }
    };

    return (
        <Box 
            sx={{ 
                padding: 4,
                border: '1px solid #e0e0e0',
                borderRadius: 2,
                backgroundColor: 'white',
                minHeight: '500px',
                display: 'flex',
                flexDirection: 'column',
                margin: 2
            }}
        >
            <Typography variant="h6" sx={{ marginBottom: 3 }}>
                Pedido Atual
            </Typography>

            {/* Área vazia dos itens */}
            <Box 
                sx={{ 
                    flex: 1,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    color: '#999',
                    marginBottom: 3
                }}
            >
                <Typography>Nenhum item adicionado</Typography>
            </Box>

            <Divider sx={{ marginBottom: 2 }} />

            {/* Total */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>Total</Typography>
                <Typography variant="h6" sx={{ fontWeight: 'bold' }}>R$ {total.toFixed(2).replace('.', ',')}</Typography>
            </Box>

            {/* Botões de Pagamento */}
            <Box sx={{ display: 'flex', gap: 1, marginBottom: 2 }}>
                <Button 
                    variant={paymentMethod === 'cartao' ? 'contained' : 'outlined'}
                    onClick={() => setPaymentMethod('cartao')}
                    sx={{ 
                        flex: 1,
                        backgroundColor: paymentMethod === 'cartao' ? '#2c3e50' : 'transparent',
                        color: paymentMethod === 'cartao' ? 'white' : '#2c3e50',
                        borderColor: '#2c3e50',
                        '&:hover': {
                            backgroundColor: paymentMethod === 'cartao' ? '#34495e' : 'rgba(44, 62, 80, 0.04)'
                        }
                    }}
                >
                    Cartão
                </Button>
                <Button 
                    variant={paymentMethod === 'dinheiro' ? 'contained' : 'outlined'}
                    onClick={() => setPaymentMethod('dinheiro')}
                    sx={{ 
                        flex: 1,
                        backgroundColor: paymentMethod === 'dinheiro' ? '#2c3e50' : 'transparent',
                        color: paymentMethod === 'dinheiro' ? 'white' : '#2c3e50',
                        borderColor: '#2c3e50',
                        '&:hover': {
                            backgroundColor: paymentMethod === 'dinheiro' ? '#34495e' : 'rgba(44, 62, 80, 0.04)'
                        }
                    }}
                >
                    Dinheiro
                </Button>
            </Box>

            {/* Valor Recebido (apenas para dinheiro) */}
            {paymentMethod === 'dinheiro' && (
                <>
                    <Typography sx={{ marginBottom: 1, fontWeight: 500 }}>
                        Valor Recebido
                    </Typography>
                    <TextField
                        value={receivedValue}
                        onChange={(e) => setReceivedValue(e.target.value)}
                        placeholder="R$ 0,00"
                        variant="outlined"
                        size="small"
                        sx={{ 
                            marginBottom: 2,
                            backgroundColor: '#f8f9fa',
                            '& .MuiOutlinedInput-root': {
                                borderRadius: 1
                            }
                        }}
                    />

                    {/* Troco */}
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginBottom: 3 }}>
                        <Typography sx={{ fontWeight: 500 }}>Troco</Typography>
                        <Typography sx={{ fontWeight: 500 }}>R$ {change}</Typography>
                    </Box>
                </>
            )}

            {/* Botão Concluir Venda */}
            <Button 
                variant="contained"
                onClick={handleConcluirVenda}
                sx={{ 
                    backgroundColor: '#7c9ff5',
                    padding: '12px',
                    borderRadius: 2,
                    fontSize: '16px',
                    fontWeight: 'bold',
                    '&:hover': {
                        backgroundColor: '#5380fcff'
                    }
                }}
            >
                Concluir Venda
            </Button>
        </Box>
    );
};

export default SecaoPagamento;