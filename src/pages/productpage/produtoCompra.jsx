import React, { useState } from 'react';
import { MdShoppingCart } from "react-icons/md";
import { FaBarcode, FaRegCreditCard } from "react-icons/fa";
import StarsCod from "../../components/EstrelasCodigo";
import './produtoCompra.css'

export default function Produto({ product }) {
    const api = "https://backend-tech-insights.onrender.com/"
    const images = Object.values(product.images || {});
    const [mainImage, setMainImage] = useState(images[0] || "");

    return (
        <>
            <h2>{product.nome}</h2>
            <section className="containerProdutoInfo">
                <div className="containerImgsProduto">
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={api + image}
                            alt={`Miniatura ${index + 1}`}
                            onClick={() => setMainImage(image)}
                        />
                    ))}
                </div>

                <img className="imgPrincipal" src={api + mainImage} alt="Produto principal" />

                <section className="containerDireitaProduto">
                    <div className="marcaProduto">
                        <h2>Marca:</h2>
                        <p>{product.marca}</p>
                    </div>

                    <StarsCod />

                    <p id="disponi">Produto Disponível</p>

                    <div className="containerPagVista">
                        <FaBarcode />
                        <div className="valorVista">
                            <h3>{product.preco}</h3>
                            <p>à vista com 10% de desconto no boleto ou pix</p>
                        </div>
                    </div>

                    <div className="containerPagPrazo">
                        <FaRegCreditCard />
                        <div className="valorPrazo">
                            <h3>{product.precoPrazo}</h3>
                            <p>10x de R$ {product.precoPrazo / 10} sem juros no cartão</p>
                        </div>
                    </div>

                    <button id="btnModalPagamento">Ver mais opções de pagamento</button>
                    <button id="btnComprar"><MdShoppingCart />Comprar</button>

                    <h4>Consultar frete e prazo de entrega</h4>
                    <div className="containerFrete">
                        <input type="text" placeholder="12345-678" />
                        <button type="button" id="btnFrete">Calcular</button>
                    </div>
                </section>
            </section>
        </>
    );
}