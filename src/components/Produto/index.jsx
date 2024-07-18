import msiLogo from "../../assets/logo-msi.jpg"
import rtx3060 from "../../assets/3060MSI.jpg"
import rtx30602 from "../../assets/3060MSI2.jpg"
import rtx30603 from "../../assets/3060MSI3.jpg"
import rtx30604 from "../../assets/3060MSI4.jpg"
import rtx30605 from "../../assets/3060MSI5.jpg"

import { MdShoppingCart } from "react-icons/md";
import { FaBarcode } from "react-icons/fa";
import { FaRegCreditCard } from "react-icons/fa6";

import StarsCod from "../EstrelasCodigo"

import './style.css'

import React, { useState } from 'react';


export default function Produto() {
    const images = [rtx3060, rtx30602, rtx30603, rtx30604, rtx30605]
    const [mainImage, setMainImage] = useState(images[0]);

    return (
        <>
            <h2>Placa de Vídeo RTX 3060 Ventus 2X MSI NVIDIA GeForce, 12GB GDDR6, DLSS, Ray Tracing - RTX 3060 Ventus 2X 12G OC.</h2>
            <section className="containerProdutoInfo">
                <div className="containerImgsProduto">
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={image}
                            alt={`Miniatura ${index + 1}`}
                            onClick={() => setMainImage(image)}
                            // className={`thumbnail ${mainImage === image ? 'active' : ''}`}
                        />
                    ))}
                </div>

                <img className="imgPrincipal" src={mainImage} alt="Produto principal" />

                <section className="containerDireitaProduto">
                    <div className="marcaProduto">
                        <h2>Marca:</h2>
                        <img src={msiLogo} alt="" />
                    </div>

                    <StarsCod />

                    <p id="disponi">Produto Disponivel</p>

                    <div className="containerPagVista">
                        <FaBarcode />
                        <div className="valorVista">
                            <h3>900,00</h3>
                            <p>a vista com 10% de desconto no boleto ou pix</p>
                        </div>
                    </div>

                    <div className="containerPagPrazo">
                        <FaRegCreditCard />
                        <div className="valorPrazo">
                            <h3>1.000,00</h3>
                            <p>10x de R$ 100,00 sem juros do cartão</p>
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
    )
}
