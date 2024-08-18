import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdAddShoppingCart, MdShoppingCart } from "react-icons/md";
import { FaBarcode, FaRegCreditCard } from "react-icons/fa";
import StarsCod from "../../components/EstrelasCodigo";
import { useCarrinho } from '../../contexts/contex-Cart';
import './produtoCompra.css';

export default function Produto({ product }) {
    const api = "https://backend-tech-insights.onrender.com/";
    const images = Object.values(product.images || {});
    const [mainImage, setMainImage] = useState(images[0] || "");
    const { adicionarAoCarrinho } = useCarrinho();
    const navigate = useNavigate();

    const handleComprar = () => {
        adicionarAoCarrinho({ ...product, quantidade: 1 });
        navigate('/carrinho');
    };

    const handleAddCart = () => {
        adicionarAoCarrinho({ ...product, quantidade: 1 });
    };

    function formatarValor(valor) {
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

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
                            <h3>{formatarValor(product.preco)}</h3>
                            <p>à vista com 10% de desconto no boleto ou pix</p>
                        </div>
                    </div>

                    <div className="containerPagPrazo">
                        <FaRegCreditCard />
                        <div className="valorPrazo">
                            <h3>{formatarValor(product.precoPrazo)}</h3>
                            <p>10x de R$ {formatarValor(product.precoPrazo / 10)} sem juros no cartão</p>
                        </div>
                    </div>

                    <button id="btnModalPagamento">Ver mais opções de pagamento</button>
                    <div className='btnsComprarAddCart'>
                        <button id="btnComprar" onClick={handleComprar}>
                            <MdShoppingCart />Comprar
                        </button>
                        <button id='btnAddCart' onClick={handleAddCart}>
                            <MdAddShoppingCart />
                        </button>
                    </div>

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
