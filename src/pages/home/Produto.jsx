import React from "react";
import { Link } from "react-router-dom";
import { MdShoppingCart } from "react-icons/md";

export default function Produto({ product }) {
    return (
        <Link to={`/product/${product._id}`}>
            <div className="boxProduto">
                <img src={"https://backend-tech-insights.onrender.com/" + product.images[0]} alt="produto" />
                <p>{product.nome}</p>
                <p>{product.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                <p>10x de <span>{(product.precoPrazo / 10).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span> sem juros</p>
                <button>
                    Comprar
                    <MdShoppingCart />
                </button>
            </div>
        </Link>
    );
}
