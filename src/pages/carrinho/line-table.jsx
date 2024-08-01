import { FaChevronLeft, FaChevronRight, FaTrash } from "react-icons/fa";
import { useState } from "react";
import rtx3060 from "../../assets/3060MSI.jpg"

export default function LineTableCart() {
    const [qtd, setQtd] = useState(1)
    const precoUnitario = 1500
    const [subtotal, setSubTotal] = useState(precoUnitario)


    function aumentarQtd() {
        if (qtd < 10) {
            const novaQtd = qtd + 1;
            setQtd(novaQtd);
            setSubTotal(novaQtd * precoUnitario);
        }
    }

    function diminuirQtd() {
        if (qtd > 1) {
            const novaQtd = qtd - 1;
            setQtd(novaQtd);
            setSubTotal(novaQtd * precoUnitario);
        }
    }

    const formatarValor = (valor) => {
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    return (
        <tr>
            <td>
                <div className="boxImgDescricao">
                    <img src={rtx3060} alt="3060" />
                    <p>Placa de Vídeo RTX 3060 Ventus 2X MSI NVIDIA GeForce, 12GB GDDR6, DLSS, Ray Tracing - RTX 3060 Ventus 2X 12G OC.</p>
                </div>
            </td>
            <td>
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
            <td className="boxPreco">{formatarValor(subtotal)}</td>
        </tr>
    )
}