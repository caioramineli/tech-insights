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
            atualizarQuantidade(produto._id, novaQtd);
        }
    }

    function diminuirQtd() {
        if (qtd > 1) {
            const novaQtd = qtd - 1;
            setQtd(novaQtd);
            setSubTotal(novaQtd * precoUnitario);
            atualizarQuantidade(produto._id, novaQtd);
        }
    }

    const formatarValor = (valor) => {
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    const api = "https://backend-tech-insights.vercel.app/";

    return (
        <tr>
            <td className='p-3 border-b border-b-gray-300'>
                <Link to={`/product/${produto._id}`}>
                    <div className="flex items-center gap-2">
                        <img className="w-28" src={api + produto.images[0]} alt={produto.nome} />
                        <p>{produto.nome}</p>
                    </div>
                </Link>
            </td>
            <td className="p-3 border-b border-b-gray-300 w-[145px]">
                <div className="flex flex-col gap-4 min-w-[120px]">
                    <div className="flex items-center justify-center">
                        <FaChevronLeft className="cursor-pointer" onClick={diminuirQtd} />
                        <span className="w-6 flex justify-center">{qtd}</span>
                        <FaChevronRight className="cursor-pointer" onClick={aumentarQtd} />
                    </div>

                    <div className="flex items-center justify-center gap-2 text-red-700" onClick={() => removerProduto(produto._id)}>
                        <FaTrash />
                        <span>Remover</span>
                    </div>
                </div>
            </td>
            <td className="p-3 border-b border-b-gray-300 w-[125px] min-w-[120px] text-center">{formatarValor(subtotal)}</td>
        </tr>
    );
}
