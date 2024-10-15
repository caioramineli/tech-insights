import { useLocation } from 'react-router-dom';
import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../../../contexts/AuthContext';
import axios from 'axios';
import { HiShoppingBag } from 'react-icons/hi2';

export default function Pedido() {
    const location = useLocation();
    const pedido = location.state?.pedido;

    const api = process.env.REACT_APP_API_URL;
    const [userData, setUserData] = useState(null);
    const { user, token } = useContext(AuthContext);

    function formatarPreco(preco) {
        return preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    useEffect(() => {
        const fetchUserData = async () => {
            if (user && token) {
                try {
                    const response = await axios.get(`${api}user/${user.id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });
                    setUserData(response.data.user);
                } catch (error) {
                    console.error('Erro ao carregar dados do usuário:', error);
                }
            }
        };

        fetchUserData();
    }, [user, token, api]);

    return (
        <div className="flex flex-col item-center gap-4 w-full w-[90%] xl:w-[80%] max-w-[1300px] ">      
            <div className='flex items-center gap-2'>
                <HiShoppingBag className='text-emerald-600 text-3xl' />
                <h1 className='text-2xl font-bold text-zinc-900 uppercase'>Meus Pedidos</h1>
            </div>
            <hr />
            <div>
                
                <p><span className="font-bold uppercase">Pedido:</span> {pedido.numeroPedido} - {new Date(pedido.data).toLocaleDateString()}</p>
                <h1 className='font-bold uppercase text-emerald-600 py-2 '>Aguardando o status do pedido</h1>
            </div>
            <hr />
            <div className="flex gap-3">
                <div className="bg-white rounded-lg min-w-[550px]">
                    <ul>
                        {pedido.produtos.map((produto) => (
                            <div key={produto.dadosProduto._id}>
                                <hr />
                                <div className='flex gap-4 items-center py-2 px-3'>
                                    <img className='w-20' src={api + produto.dadosProduto.images[0]} alt="img-principal" />
                                    <div className='grid grid-cols-1 gap-3'>
                                        <h1 className='font-bold uppercase'> {produto.dadosProduto.nome}</h1>
                                        <div className="flex flex-row justify-between">
                                            <p>Quantidade: {produto.quantidade}</p>
                                            <p>{formatarPreco(pedido.valorTotal + pedido.desconto - pedido.frete.valor)}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </ul>
                    <hr />
                </div>
                <div className="flex flex-col min-w-[250px] p-3 bg-white rounded-lg">
                    <div>
                        <span className="font-bold">{user.nome}</span>
                        <p>Endereço</p>
                        <hr />
                    </div>
                    
                    <div>
                        <h1>Pagamento via TIPO</h1>
                        <p>10x sem juros</p>
                    </div>
                    <hr />
                    <div className="flex flex-row justify-between">
                        <p>Total produto(s): </p>
                        <p>{formatarPreco(pedido.valorTotal + pedido.desconto - pedido.frete.valor)}</p>
                    </div>
                    <div className="flex flex-row justify-between">
                        <p>Frete valor: </p>
                        <p>{formatarPreco(pedido.frete.valor)}</p>
                    </div>
                    <div className="flex flex-row justify-between">
                        <p>Desconto: </p>
                        <p>- {formatarPreco(pedido.desconto)}</p>
                    </div>
                    <hr />
                    <div className="flex flex-row justify-between">
                        <p className="font-bold">Valor total: </p>
                        <p>{formatarPreco(pedido.valorTotal)}</p>
                    </div>
                
                </div>
            </div>
        </div>

        

    )
}