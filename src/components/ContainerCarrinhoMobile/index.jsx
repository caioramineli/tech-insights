import { FaChevronLeft, FaChevronRight, FaTrash } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useCarrinho } from '../../contexts/contex-Cart';
import { Link } from "react-router-dom";

const ContainerCarrinhoMobile = ({ produto, removerProduto, esconder = 'flex', index }) => {
    const api = process.env.REACT_APP_API_URL;
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

    return (
        <div className={`flex flex-col md:hidden gap-2 py-2 px-3 ${index > 0 ? 'border-t border-gray-300' : ''}`} key={produto._id}>
            <Link to={`/produto/${produto._id}`}>
                <div className="flex gap-2">
                    <div className="flex items-center w-16 min-w-16">
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
                <div className="flex gap-5 text-sm">
                    <div className="flex items-center justify-center">
                        <FaChevronLeft className={`${esconder} cursor-pointer`} onClick={diminuirQtd} />
                        <span className="w-6 flex justify-center font-semibold mx-1">{qtd}</span>
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