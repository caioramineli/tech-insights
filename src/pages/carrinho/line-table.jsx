import { FaChevronLeft, FaChevronRight, FaTrash } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useCarrinho } from '../../contexts/contex-Cart';
import { Link } from "react-router-dom";

export default function LineTableCart({ produto, removerProduto, esconder = 'flex' }) {
    const { atualizarQuantidade } = useCarrinho();
    const [qtd, setQtd] = useState(produto.quantidade || 1);
    const precoUnitario = produto.precoPrazo;
    const [subtotal, setSubTotal] = useState(precoUnitario * qtd);

    useEffect(() => {
        setSubTotal(precoUnitario * qtd);
    }, [qtd, precoUnitario]);

    function aumentarQtd() {
        if (qtd < 10) {
            const novaQtd = qtd + 1;
            setQtd(novaQtd);
            atualizarQuantidade(produto._id, novaQtd);
        }
    }

    function diminuirQtd() {
        if (qtd > 1) {
            const novaQtd = qtd - 1;
            setQtd(novaQtd);
            atualizarQuantidade(produto._id, novaQtd);
        }
    }

    const formatarValor = (valor) => {
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    };

    const api = process.env.REACT_APP_API_URL;

    return (
        <tr>
            <td className='p-3 border-b border-b-gray-300'>
                <Link to={`/produto/${produto._id}`}>
                    <div className="flex items-center gap-2">
                        <img className="w-28" src={api + produto.images[0]} alt={produto.nome} />
                        <p>{produto.nome}</p>
                    </div>
                </Link>
            </td>
            <td className="p-3 border-b border-b-gray-300 w-[145px]">
                <div className="flex flex-col gap-4 min-w-[120px]">
                    <div className="flex items-center justify-center">
                        <FaChevronLeft className={`${esconder} cursor-pointer`} onClick={diminuirQtd} />
                        <span className="w-6 flex justify-center font-semibold">{qtd}</span>
                        <FaChevronRight className={`${esconder} cursor-pointer`} onClick={aumentarQtd} />
                    </div>

                    <div className={`${esconder} items-center justify-center gap-2 text-red-700 cursor-pointer`} onClick={() => removerProduto(produto._id)}>
                        <FaTrash />
                        <span>Remover</span>
                    </div>
                </div>
            </td>
            <td className="p-3 border-b border-b-gray-300 min-w-[132px] text-center font-semibold text-emerald-600">{formatarValor(subtotal)}</td>
        </tr >
    );
}
