import React, { createContext, useContext, useState, useMemo } from 'react';

const CarrinhoContext = createContext();

export function useCarrinho() {
    return useContext(CarrinhoContext);
}

export function CarrinhoProvider({ children }) {
    const [carrinho, setCarrinho] = useState([]);
    const [desconto, setDesconto] = useState(0);
    const [frete, setFrete] = useState(0);

    const adicionarAoCarrinho = (novoProduto) => {
        setCarrinho((prevCarrinho) => {
            const produtoExistente = prevCarrinho.find(produto => produto._id === novoProduto._id);

            if (produtoExistente) {
                return prevCarrinho.map(produto =>
                    produto._id === novoProduto._id
                        ? { ...produto, quantidade: produto.quantidade + novoProduto.quantidade }
                        : produto
                );
            } else {
                return [...prevCarrinho, { ...novoProduto, quantidade: novoProduto.quantidade }];
            }
        });
    };

    const atualizarQuantidade = (id, novaQuantidade) => {
        setCarrinho(prevCarrinho =>
            prevCarrinho.map(produto =>
                produto._id === id ? { ...produto, quantidade: novaQuantidade } : produto
            )
        );
    };

    const removerProduto = (id) => {
        setCarrinho(prevCarrinho => prevCarrinho.filter(produto => produto._id !== id));
    };

    const zerarCarrinho = () => {
        setCarrinho([]);
        setDesconto(0);
        setFrete(0);
    };
    
    const calcularValorTotal = useMemo(() => {
        return carrinho.reduce((total, produto) => {
            return total + produto.precoPrazo * produto.quantidade;
        }, 0);
    }, [carrinho]);

    const calcularFrete = (cep) => {
        const valorFrete = 20;
        setFrete(valorFrete);
        return valorFrete;
    };

    const aplicarDesconto = (valorDesconto) => {
        setDesconto(valorDesconto);
        return valorDesconto;
    };

    const calcularValorFinal = useMemo(() => {
        return calcularValorTotal + frete - desconto;
    }, [calcularValorTotal, frete, desconto]);

    return (
        <CarrinhoContext.Provider value={{
            carrinho,
            adicionarAoCarrinho,
            atualizarQuantidade,
            removerProduto,
            zerarCarrinho,
            calcularValorTotal,
            calcularFrete,
            aplicarDesconto,
            calcularValorFinal,
            frete,
            desconto
        }}>
            {children}
        </CarrinhoContext.Provider>
    );
}