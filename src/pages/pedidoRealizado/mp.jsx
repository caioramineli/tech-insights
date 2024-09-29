export default function Mp({ numeroPedido }) {

    return (
        <div className="flex flex-col gap-8 m-auto">
            <div className="flex flex-col sm:flex-row gap-6 mx-auto w-[300px] sm:w-auto">

                <div className="flex flex-col p-6 gap-1 items-center bg-white bsPadrao rounded-md">
                    <span className="text-zinc-700">O número do seu pedido é:</span>
                    <span className="font-bold text-lg sm:text-xl md:text-3xl text-zinc-800">{numeroPedido}</span>
                </div>

                <div className="flex flex-col p-6 gap-1 items-center bg-white bsPadrao rounded-md">
                    <span className="text-zinc-700">Forma de pagamento escolhida:</span>
                    <span className="font-bold text-lg sm:text-xl md:text-3xl text-zinc-800">Mercado Pago</span>
                </div>

            </div>

            <button>
                <a
                    className="p-3 bg-cyan-600 hover:bg-cyan-700 duration-200 text-lg sm:text-xl font-bold rounded-md text-cyan-50"
                    href="/minha-conta"
                >
                    Clique para ver seus pedidos
                </a>
            </button>
        </div>
    );
} 