import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Pedidos = ({ userId }) => {
    const [pedidos, setPedidos] = useState([]);
    const [loading, setLoading] = useState(true);
    const api = process.env.REACT_APP_API_URL;

    useEffect(() => {
        const fetchPedidos = async () => {
            try {
                const response = await axios.get(`${api}user/${userId}/orders`);
                setPedidos(response.data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchPedidos();
    }, [userId, api]);

    if (loading) return <div>Carregando...</div>;

    return (
        <div>
            <h1>Meus Pedidos</h1>
            {pedidos.length === 0 ? (
                <p>Nenhum pedido encontrado.</p>
            ) : (
                <ul className='flex flex-col gap-4'>
                    {pedidos.map((pedido) => (
                        <li className='border border-black' key={pedido._id}>
                            <h2>Pedido ID: {pedido._id}</h2>
                            <p>Data: {new Date(pedido.data).toLocaleDateString()}</p>
                            <p>Valor Total: R$ {pedido.valorTotal}</p>
                            <p>Forma de Pagamento: {pedido.formaPagamento}</p>
                            <p>Frete: R$ {pedido.frete.valor}</p>
                            <h3>Produtos:</h3>
                            <ul>
                                {pedido.produtos.map((produto) => (
                                    <li key={produto.dadosProduto._id}>
                                        Nome: {produto.dadosProduto.nome}
                                        <br />
                                        Quantidade: {produto.quantidade}
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default Pedidos;
