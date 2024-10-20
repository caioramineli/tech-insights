import React, { createContext, useContext, useState, useMemo, useEffect, useCallback } from 'react';

const CarrinhoContext = createContext();

export function useCarrinho() {
    return useContext(CarrinhoContext);
}

export function CarrinhoProvider({ children }) {
    const [carrinho, setCarrinho] = useState([]);
    const [cupom, setCupom] = useState([]);
    const [desconto, setDesconto] = useState(0);
    const [frete, setFrete] = useState({ tipo: "", valor: 0 });
    const [endereco, setEndereco] = useState({ dadosEndereco: {} });
    const [cartao, setCartao] = useState(null);
    const [formaPagamento, setFormaPagamento] = useState('');
    const [pedido, setPedido] = useState(null);

    const calcularValorTotal = useMemo(() => {
        return carrinho.reduce((total, produto) => {
            return total + produto.precoPrazo * produto.quantidade;
        }, 0);
    }, [carrinho]);

    const adicionarAoCarrinho = (novoProduto) => {
        setCarrinho((prevCarrinho) => {
            const produtoExistente = prevCarrinho.find((produto) => produto._id === novoProduto._id);

            if (produtoExistente) {
                if (produtoExistente.quantidade < 10) {
                    return prevCarrinho.map((produto) =>
                        produto._id === novoProduto._id
                            ? { ...produto, quantidade: produto.quantidade + 1 }
                            : produto
                    );
                } else {
                    return prevCarrinho;
                }
            }

            return [...prevCarrinho, novoProduto];
        });
    };

    const atualizarQuantidade = (id, novaQuantidade) => {
        setCarrinho((prevCarrinho) => {
            const novoCarrinho = prevCarrinho.map((produto) =>
                produto._id === id
                    ? { ...produto, quantidade: novaQuantidade }
                    : produto
            );
            return novoCarrinho;
        });
    };

    const removerProduto = (id) => {
        setCarrinho((prevCarrinho) => prevCarrinho.filter(produto => produto._id !== id));
    };

    const zerarCarrinho = () => {
        setCarrinho([]);
        setCupom([]);
        setDesconto(0);
        setFrete({ tipo: "", valor: 0 });
        setEndereco({ dadosEndereco: {} });
        setFormaPagamento('');
        setCartao(null)
    };

    const escolhaFrete = (tipo) => {
        let valorFrete = 0;

        switch (tipo) {
            case 'normal':
                valorFrete = 15.00;
                break;
            case 'agendado':
                valorFrete = 20.00;
                break;
            case 'expresso':
                valorFrete = 30.00;
                break;
            default:
                valorFrete = 0;
        }

        setFrete({ tipo: tipo, valor: valorFrete });
    };

    const aplicarDesconto = useCallback(() => {
        if (!cupom || calcularValorTotal < cupom.minimo) {
            setDesconto(0);
            return;
        }

        if (cupom.tipo === "fixo") {
            setDesconto(cupom.desconto);
        } else if (cupom.tipo === "percentual") {
            const valorDesconto = calcularValorTotal * (cupom.desconto / 100);
            setDesconto(valorDesconto);
        }
    }, [cupom, calcularValorTotal]);

    useEffect(() => {
        aplicarDesconto();
    }, [cupom, calcularValorTotal, aplicarDesconto]);

    const calcularValorFinal = useMemo(() => {
        const valorFrete = frete.valor;
        return valorFrete + calcularValorTotal - desconto;
    }, [calcularValorTotal, frete.valor, desconto]);


    return (
        <CarrinhoContext.Provider value={{
            carrinho,
            adicionarAoCarrinho,
            atualizarQuantidade,
            removerProduto,
            zerarCarrinho,
            calcularValorTotal,
            aplicarDesconto,
            calcularValorFinal,
            frete,
            escolhaFrete,
            endereco,
            setEndereco,
            cupom,
            setCupom,
            desconto,
            setDesconto,
            formaPagamento,
            setFormaPagamento,
            pedido,
            setPedido,
            cartao,
            setCartao
        }}>
            {children}
        </CarrinhoContext.Provider>
    );
}
