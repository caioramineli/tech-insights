import React from 'react';
import LineTableCart from './line-table';
import "./table-cart-style.css";
import { useCarrinho } from '../../contexts/contex-Cart';


export default function TableCart() {
    const { carrinho, removerProduto } = useCarrinho();  
    

    return (
        <table className="produtosCarrinho">
            <thead>
                <tr>
                    <th>Produto</th>
                    <th>Quantidade</th>
                    <th>Preço</th>
                </tr>
            </thead>
            <tbody>
                {carrinho.map((produto) => (
                    <LineTableCart
                        key={produto._id}
                        produto={produto}
                        removerProduto={removerProduto}
                    />
                ))}
            </tbody>
        </table>
    );
}
