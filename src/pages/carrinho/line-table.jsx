import { FaChevronLeft, FaChevronRight, FaTrash } from "react-icons/fa";
import { useCarrinho } from '../../contexts/contex-Cart';
import { Link } from "react-router-dom";

export default function LineTableCart({ produto, removerProduto, esconder = 'flex' }) {
    const { atualizarQuantidade, carrinho } = useCarrinho();
    const precoUnitario = produto.precoPrazo;
    const qtd = carrinho.find(item => item._id === produto._id)?.quantidade || 1;
    const subtotal = precoUnitario * qtd;

    function aumentarQtd() {
        if (qtd < 10) {
            atualizarQuantidade(produto._id, qtd + 1);
        }
    }

    function diminuirQtd() {
        if (qtd > 1) {
            atualizarQuantidade(produto._id, qtd - 1);
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
                    <div className="flex items-center gap-2 min-w-[680px]">
                        <img className="w-20 lg:w-24 xl:w-28" src={api + produto.images[0]} alt={produto.nome} />
                        <p className="text-sm xl:text-base">{produto.nome}</p>
                    </div>
                </Link>
            </td>
            <td className="p-3 border-b border-b-gray-300 w-[145px]">
                <div className="flex flex-col gap-4 min-w-[112px] md:min-w-[120px] text-sm md:text-base">
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
            <td className="p-3 border-b border-b-gray-300 min-w-[132px] text-center font-semibold text-emerald-600">
                {formatarValor(subtotal)}
            </td>
        </tr >
    );
}
