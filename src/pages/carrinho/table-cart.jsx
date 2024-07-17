import "./table-cart-style.css"
import rtx3060 from "../../assets/3060MSI.jpg"
import { FaChevronLeft, FaChevronRight, FaTrash } from "react-icons/fa";
import { useState } from "react";

export default function TableCart() {
    const [qtd, setQtd] = useState(1)


    function aumentarQtd() {
        if (qtd < 10) {
            setQtd(qtd + 1)
        }
    }

    function diminuirQtd() {
        if (qtd > 1) {
            setQtd(qtd - 1)
        }
    }

    return (
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
                            <FaChevronLeft onClick={diminuirQtd} />
                            <span>{qtd}</span>
                            <FaChevronRight onClick={aumentarQtd} />
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
                            <FaChevronLeft onClick={diminuirQtd} />
                            <span>{qtd}</span>
                            <FaChevronRight onClick={aumentarQtd} />
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
    )
}
