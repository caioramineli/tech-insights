import { FaCheckCircle } from "react-icons/fa";
import Pix from "./pix";
import Boleto from "./boleto";
import Cartao from "./cartao";
import Mp from "./mp";
import { useLocation, useNavigate } from 'react-router-dom';
import { useCarrinho } from "../../contexts/contex-Cart";
import { useEffect } from "react";

export default function PedidoRealizado() {
    const location = useLocation();
    const navigate = useNavigate();
    const { pedido } = useCarrinho();

    useEffect(() => {
        if (!pedido) {
            navigate('/carrinho');
        }
    }, [pedido, navigate]);

    const numeroPedido = location.state?.numeroPedido;

    const renderizarComponente = () => {
        switch (location.state?.formaPagamento) {
            case 'PIX':
                return <Pix numeroPedido={numeroPedido} />
            case 'Boleto':
                return <Boleto numeroPedido={numeroPedido} />
            case 'Cartão':
                return <Cartao numeroPedido={numeroPedido} />
            case 'Mercado Pago':
                return <Mp numeroPedido={numeroPedido} />
            default:
                return null;
        }
    }

    return (
        <div className="flex flex-col gap-6 mt-10 mb-10 w-[90%] m-auto">
            <div className='flex items-center gap-2 sm:gap-4 m-auto'>
                <FaCheckCircle className="text-3xl sm:text-4xl text-emerald-600" />
                <div className="flex flex-col gap-1">
                    <h1 className="text-emerald-600 font-bold text-base sm:text-xl md:text-3xl uppercase">Pedido Realizado com sucesso!</h1>
                    <h2 className="text-zinc-600 font-bold text-sm sm:text-lg md:text-2xl uppercase">
                        {location.state?.formaPagamento !== 'Cartão' ? "Agora é só realizar o pagamento" : "Estamos processando seu pagamento"}
                    </h2>
                </div>
            </div>
            {renderizarComponente()}
        </div>
    );
}
