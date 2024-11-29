import React from 'react';
import LineTableCart from './line-table';
import "./table-cart-style.css";
import { useCarrinho } from '../../contexts/contex-Cart';

export default function TableCart({ esconderBtns = "flex"}) {
    const { carrinho, removerProduto } = useCarrinho();

    return (
        <table className="hidden sm:block border-spacing-0 bg-white rounded-md bsPadrao tablecart">
            <thead>
                <tr >
                    <th className='p-3 border-b border-b-gray-300 w-full'>Produto</th>
                    <th className='p-3 border-b border-b-gray-300'>Quantidade</th>
                    <th className='p-3 border-b border-b-gray-300'>Preço</th>
                </tr>
            </thead>
            <tbody>
                {carrinho.map((produto) => (
                    <LineTableCart
                        key={produto._id}
                        produto={produto}
                        removerProduto={removerProduto}
                        esconder={esconderBtns}
                    />
                ))}
            </tbody>
        </table>
    );
}
