import { FaCalendarCheck } from "react-icons/fa6";
import { FaCalendarAlt, FaFileInvoiceDollar } from "react-icons/fa";
import { Link } from "react-router-dom";

export default function Boleto({ numeroPedido }) {

    return (
        <div className="w-[100%] md:w-[80%] lg:w-[70%] flex flex-col gap-8 m-auto max-w-[600px]">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 w-full">

                <div className="flex flex-col px-4 py-6 gap-1 items-center bg-white bsPadrao rounded-md">
                    <span className="text-zinc-700 text-sm md:text-base">O número do seu pedido é:</span>
                    <span className="font-bold text-lg sm:text-xl md:text-3xl text-zinc-800">{numeroPedido}</span>
                </div>

                <div className="flex flex-col px-4 py-6 gap-1 items-center bg-white bsPadrao rounded-md">
                    <span className="text-zinc-700 text-sm md:text-base">Forma de pagamento escolhida:</span>
                    <span className="font-bold text-lg sm:text-xl md:text-3xl text-zinc-800">Boleto Bancário</span>
                </div>

            </div>

            <a
                className="sm:m-auto"
                href="https://www.sicadi.com.br/mhouse/boleto/boleto3.php?numero_banco=341-7&local_pagamento=PAG%C1VEL+EM+QUALQUER+BANCO+AT%C9+O+VENCIMENTO&cedente=Tech+Insights+LTDA&data_documento=28%2F10%2F2024&numero_documento=DF+00113&especie=&aceite=N&data_processamento=28%2F10%2F2024&uso_banco=&carteira=179&especie_moeda=Real&quantidade=&valor=&vencimento=28%2F10%2F2024&agencia=0049&codigo_cedente=10201-5&meunumero=00010435&valor_documento=100%2C00&instrucoes=Taxa+de+visita+de+suporte%0D%0AAp%F3s+o+vencimento+R%24+0%2C80+ao+dia&mensagem1=&mensagem2=&mensagem3=ATEN%C7%C3O%3A+N%C3O+RECEBER+AP%D3S+15+DIAS+DO+VENCIMENTO&sacado=&Submit=Enviar"
                target="_blank"
                rel="noopener noreferrer"
            >
                <button className="p-2 bg-cyan-600 hover:bg-cyan-700 duration-200 w-full sm:w-auto text-lg sm:text-xl font-semibold rounded-md text-cyan-50">
                    Visualizar e imprimir boleto
                </button>
            </a>


            <div className="flex flex-col gap-4 bg-white rounded-md bsPadrao p-4">
                <div className="flex items-center gap-4">
                    <FaCalendarCheck className="text-3xl text-cyan-600 min-w-10" />
                    <span className="text-sm sm:text-base">O banco enviará a confirmação do pagamento em até 4 dias úteis. Após essa confirmação o pedido é liberado para entrega.</span>
                </div>

                <div className="flex items-center gap-4">
                    <FaFileInvoiceDollar className="text-3xl text-cyan-600 min-w-10" />
                    <span className="text-sm sm:text-base">Para pagar o Boleto pelo Internet Banking de seu banco, digite ou copie o código de barras.</span>
                </div>

                <div className="flex items-center gap-4">
                    <FaCalendarAlt className="text-3xl text-cyan-600 min-w-10" />
                    <span className="text-sm sm:text-base">Se atente ao prazo de vencimento do boleto, o mesmo pode variar de acordo com o horário da compra.</span>
                </div>
            </div>

            <Link className="w-full sm:w-auto" to={`/minha-conta/pedidos`}>
                <button className="btnPadrao !text-lg w-full sm:w-auto m-auto">Clique para ver seus pedidos</button>
            </Link>
        </div>
    );
} 