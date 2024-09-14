import { FaChevronLeft, FaChevronRight, FaTrash } from "react-icons/fa";
import { useState } from "react";
import { useCarrinho } from '../../contexts/contex-Cart';
import { Link } from "react-router-dom";

export default function LineTableCart({ produto, removerProduto }) {
    const { atualizarQuantidade } = useCarrinho();
    const [qtd, setQtd] = useState(produto.quantidade || 1);
    const precoUnitario = produto.precoPrazo;
    const [subtotal, setSubTotal] = useState(precoUnitario * qtd);

    function aumentarQtd() {
        if (qtd < 10) {
            const novaQtd = qtd + 1;
            setQtd(novaQtd);
            setSubTotal(novaQtd * precoUnitario);
            atualizarQuantidade(produto._id, novaQtd);  // Atualiza o estado global
        }
    }

    function diminuirQtd() {
        if (qtd > 1) {
            const novaQtd = qtd - 1;
            setQtd(novaQtd);
            setSubTotal(novaQtd * precoUnitario);
            atualizarQuantidade(produto._id, novaQtd);  // Atualiza o estado global
        }
    }

    const formatarValor = (valor) => {
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    const api = "https://backend-tech-insights.vercel.app/";

    return (
        <tr>
            <td>
                <Link to={`/product/${produto._id}`}>
                    <div className="boxImgDescricao">
                        <img src={api + produto.images[0]} alt={produto.nome} />
                        <p>{produto.nome}</p>
                    </div>
                </Link>
            </td>
            <td className="w-[145px]">
                <div className="boxQuantidade">
                    <div className="qtd">
                        <FaChevronLeft onClick={diminuirQtd} />
                        <span>{qtd}</span>
                        <FaChevronRight onClick={aumentarQtd} />
                    </div>

                    <div className="remove" onClick={() => removerProduto(produto._id)}>
                        <FaTrash />
                        <span>Remover</span>
                    </div>
                </div>
            </td>
            <td className="boxPreco w-[125px]">{formatarValor(subtotal)}</td>
        </tr>
    );
}
