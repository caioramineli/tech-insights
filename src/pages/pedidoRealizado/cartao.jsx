import { Link } from "react-router-dom";

export default function Cartão({ numeroPedido }) {

    return (
        <div className="flex flex-col gap-8 m-auto">
            <div className="flex flex-col sm:flex-row gap-6 mx-auto w-[300px] sm:w-auto">

                <div className="flex flex-col px-4 py-6 gap-1 items-center bg-white bsPadrao rounded-md">
                    <span className="text-zinc-700">O número do seu pedido é:</span>
                    <span className="font-bold text-lg sm:text-xl lg:text-3xl text-zinc-800">{numeroPedido}</span>
                </div>

                <div className="flex flex-col px-4 py-6 gap-1 items-center bg-white bsPadrao rounded-md">
                    <span className="text-zinc-700">Forma de pagamento escolhida:</span>
                    <span className="font-bold text-lg sm:text-xl lg:text-3xl text-zinc-800">Cartão de crédito</span>
                </div>

            </div>

            <Link className="w-full sm:w-auto" to={`/minha-conta/pedidos`}>
                <button className="btnPadrao !text-lg w-full sm:w-auto m-auto">Clique para ver seus pedidos</button>
            </Link>
        </div>
    );
} 