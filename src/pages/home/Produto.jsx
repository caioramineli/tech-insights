import React from "react";
import { Link } from "react-router-dom";
import { MdShoppingCart } from "react-icons/md";

export default function Produto({ product }) {
    return (
        <Link to={`/product/${product._id}`}>
            <div className="boxProduto">
                <img src={"https://backend-tech-insights.onrender.com/" + product.images[0]} alt="produto" />
                <p>{product.nome}</p>
                <p>R$ {product.preco} à vista</p>
                <p>ou 10x de R$ <span>{product.precoPrazo / 10}</span> sem juros</p>
                <button>
                    Comprar
                    <MdShoppingCart />
                </button>
            </div>
        </Link>
    );
}
