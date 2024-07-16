import { FaChevronLeft, FaChevronRight, FaTrash } from "react-icons/fa";
import rtx3060 from "../../assets/3060MSI.jpg"

import "./style.css"
import { BiSolidCoupon } from "react-icons/bi";
import { FaTruck } from "react-icons/fa6";


export default function Carrinho() {
    return (
        <main className="mainCarrinho">
            <section className="containerPrincipal">
                <table className="produtosCarrinho">
                    <tr>
                        <th>Produto</th>
                        <th>Quantidade</th>
                        <th>Preço</th>
                    </tr>
                    <tr>
                        <td>
                            <div className="boxImgDescricao">
                                <img src={rtx3060} alt="3060" />
                                <p>Placa de Vídeo RTX 3060 Ventus 2X MSI NVIDIA GeForce, 12GB GDDR6, DLSS, Ray Tracing - RTX 3060 Ventus 2X 12G OC.</p>
                            </div>
                        </td>
                        <td >
                            <div className="boxQuantidade">
                                <div className="qtd">
                                    <FaChevronLeft />
                                    1
                                    <FaChevronRight />
                                </div>

                                <div className="remove">
                                    <FaTrash />
                                    <span>Remover</span>
                                </div>
                            </div>
                        </td>
                        <td className="boxPreco">1.500,00</td>
                    </tr>
                    <tr>
                        <td>
                            <div className="boxImgDescricao">
                                <img src={rtx3060} alt="3060" />
                                <p>Placa de Vídeo RTX 3060 Ventus 2X MSI NVIDIA GeForce, 12GB GDDR6, DLSS, Ray Tracing - RTX 3060 Ventus 2X 12G OC.</p>
                            </div>
                        </td>
                        <td >
                            <div className="boxQuantidade">
                                <div className="qtd">
                                    <FaChevronLeft />
                                    2
                                    <FaChevronRight />
                                </div>

                                <div className="remove">
                                    <FaTrash />
                                    <span>Remover</span>
                                </div>
                            </div>
                        </td>
                        <td className="boxPreco">3.000,00</td>
                    </tr>
                </table>
                <div className="limparCarrinho">
                    <FaTrash />
                    <h3>Limpar carrinho</h3>
                </div>
                <div className="containerCupomFrete">
                    <div className="cupomDesconto">
                        <input type="text" placeholder="Cupom de desconto" />
                        <button>
                            Aplicar
                            <BiSolidCoupon />
                        </button>
                    </div>
                    <div className="calculoFrete">
                        <input type="text" placeholder="12345-678" />
                        <button>
                            Calcular
                            <FaTruck />
                        </button>
                    </div>
                </div>
            </section>

            <section className="containerResumo">
                <h2>Resumo</h2>
                <div className="resumoCarrinho">
                    <div>
                        <p>Valor do carrinho:</p>
                        <p>R$ 9.999,00</p>
                    </div>

                    <hr />

                    <div>
                        <p>Descontos:</p>
                        <p>R$ 0,00</p>
                    </div>

                    <hr />

                    <div>
                        <p>Frete:</p>
                        <p>R$ 0,00</p>
                    </div>

                    <hr />

                    <div>
                        <p>Valor Total:</p>
                        <p>R$ 0,00</p>
                    </div>
                </div>

                <button type="button">Finalizar Pedido</button>
            </section>
        </main>
    )
}
