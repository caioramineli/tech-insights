import React, { createContext, useContext, useState, useMemo } from 'react';

const CarrinhoContext = createContext();

export function useCarrinho() {
    return useContext(CarrinhoContext);
}

export function CarrinhoProvider({ children }) {
    const [carrinho, setCarrinho] = useState([]);
    const [desconto, setDesconto] = useState(0);
    const [frete, setFrete] = useState({ tipo: "", valor: 0 });
    const [endereco, setEndereco] = useState({ dadosEndereco: {} });
    const [formaPagamento, setFormaPagamento] = useState('')


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
        setFrete({ tipo: "", valor: 0 });
        setEndereco({ dadosEndereco: {} });
        setFormaPagamento('');
    };

    const calcularValorTotal = useMemo(() => {
        return carrinho.reduce((total, produto) => {
            return total + produto.precoPrazo * produto.quantidade;
        }, 0);
    }, [carrinho]);

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

    const aplicarDesconto = (valorDesconto) => {
        setDesconto(valorDesconto);
        return valorDesconto;
    };

    const calcularValorFinal = useMemo(() => {
        const valorFrete = frete.valor;
        return calcularValorTotal + valorFrete - desconto;
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
            desconto,
            formaPagamento,
            setFormaPagamento
        }}>
            {children}
        </CarrinhoContext.Provider>
    );
}
