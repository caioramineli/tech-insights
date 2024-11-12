import { FaChevronLeft, FaChevronRight, FaTrash } from "react-icons/fa";
import { useCarrinho } from '../../contexts/contex-Cart';
import { Link } from "react-router-dom";

const ContainerCarrinhoMobile = ({ produto, removerProduto, esconder = 'flex', index }) => {
    const api = process.env.REACT_APP_API_URL;
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

    return (
        <div className={`flex flex-col md:hidden gap-2 py-2 px-3 ${index > 0 ? 'border-t border-gray-300' : ''}`} key={produto._id}>
            <Link to={`/produto/${produto._id}`}>
                <div className="flex gap-2 items-center">
                    <div className="flex items-center w-20 min-w-20">
                        <img
                            className='w-full'
                            src={api + produto.images[0]}
                            alt="img-principal"
                        />
                    </div>
                    <p className='text-xs uppercase'>{produto.nome}</p>
                </div>
            </Link>
            <div className="flex flex-row justify-between px-1">
                <div className="flex gap-6 text-sm">
                    <div className="flex items-center justify-center gap-3">
                        <FaChevronLeft className={`${esconder} cursor-pointer`} onClick={diminuirQtd} />
                        <div className="flex">
                            {esconder === 'hidden' && <span>Quantidade:</span>}
                            <span className="w-6 flex justify-center font-semibold">{qtd}</span>
                        </div>
                        <FaChevronRight className={`${esconder} cursor-pointer`} onClick={aumentarQtd} />
                    </div>

                    <div className={`${esconder} items-center justify-center gap-2 text-red-700 cursor-pointer`} onClick={() => removerProduto(produto._id)}>
                        <FaTrash />
                    </div>
                </div>
                <p className="font-semibold text-emerald-600 text-sm">{formatarValor(subtotal)}</p>
            </div>
        </div>
    );
}

export default ContainerCarrinhoMobile;