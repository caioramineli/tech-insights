import { FaBarcode, FaRegCreditCard } from "react-icons/fa";
import { FaPix } from "react-icons/fa6";
import { SiMercadopago } from "react-icons/si";

const IconePagamento = ({ pagamento }) => {

    switch (pagamento) {
        case 'PIX':
            return <FaPix className="text-xl text-teal-600" />;
        case 'Boleto':
            return <FaBarcode className="text-xl text-zinc-900" />;
        case 'Cartão':
            return <FaRegCreditCard className="text-xl text-cyan-700" />;
        case 'Mercado Pago':
            return <SiMercadopago className="text-xl text-sky-700" />;
        default:
            return null;
    }
}

export { IconePagamento };