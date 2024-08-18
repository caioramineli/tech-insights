import React, { createContext, useContext, useState } from 'react';

const CarrinhoContext = createContext();

export function useCarrinho() {
    return useContext(CarrinhoContext);
}

export function CarrinhoProvider({ children }) {
    const [carrinho, setCarrinho] = useState([]);

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
    };

    return (
        <CarrinhoContext.Provider value={{ carrinho, adicionarAoCarrinho, atualizarQuantidade, removerProduto, zerarCarrinho }}>
            {children}
        </CarrinhoContext.Provider>
    );
}
