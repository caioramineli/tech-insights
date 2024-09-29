import { FaCalendarCheck } from "react-icons/fa6";
import { FaCalendarAlt, FaFileInvoiceDollar } from "react-icons/fa";

export default function Boleto({ numeroPedido }) {

    return (
        <div className="flex flex-col gap-8 m-auto">
            <div className="flex flex-col sm:flex-row gap-6 mx-auto w-[300px] sm:w-auto">

                <div className="flex flex-col px-8 py-6  gap-1 items-center bg-white bsPadrao rounded-md">
                    <span className="text-zinc-700">O número do seu pedido é:</span>
                    <span className="font-bold text-lg sm:text-xl md:text-3xl text-zinc-800">{numeroPedido}</span>
                </div>

                <div className="flex flex-col px-8 py-6 gap-1 items-center bg-white bsPadrao rounded-md">
                    <span className="text-zinc-700">Forma de pagamento escolhida:</span>
                    <span className="font-bold text-lg sm:text-xl md:text-3xl text-zinc-800">Boleto Bancário</span>
                </div>

            </div>
            <button>
                <a
                    className="p-3 bg-cyan-600 hover:bg-cyan-700 duration-200 text-lg sm:text-xl font-bold rounded-md text-cyan-50"
                    href="https://www.mercadopago.com.br/payments/89109888138/ticket?caller_id=1702481446&payment_method_id=bolbradesco&payment_id=89109888138&payment_method_reference_id=10400026401&hash=c1441158-373a-42c7-a890-31da591178b8"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Visualizar e imprimir boleto
                </a>
            </button>

            <div className="flex flex-col gap-4 bg-white rounded-md bsPadrao p-4 w-[600px]">
                <div className="flex items-center gap-4">
                    <FaCalendarCheck className="text-3xl text-cyan-600 min-w-10" />
                    <span>O banco enviará a confirmação do pagamento em até 4 dias úteis. Após essa confirmação o pedido é liberado para entrega.</span>
                </div>

                <div className="flex items-center gap-4">
                    <FaFileInvoiceDollar className="text-3xl text-cyan-600 min-w-10" />
                    <span>Para pagar o Boleto pelo Internet Banking de seu banco, digite ou copie o código de barras.</span>
                </div>

                <div className="flex items-center gap-4">
                    <FaCalendarAlt className="text-3xl text-cyan-600 min-w-10" />
                    <span>Se atente ao prazo de vencimento do boleto, o mesmo pode variar de acordo com o horário da compra.</span>
                </div>
            </div>
        </div>
    );
} 