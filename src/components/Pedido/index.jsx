import { IoIosArrowForward } from "react-icons/io";
import { Link } from "react-router-dom";

const PedidoContainer = ({ pedido }) => {
    const api = process.env.REACT_APP_API_URL;

    return (
        <div className='flex flex-col bsPadrao bg-white rounded-md' key={pedido.id}>
            <div className='flex gap-2 items-center justify-between py-2 px-3'>
                <p className="text-sm sm:text-base"><span className='font-bold'>Numero do pedido: </span>{pedido.numeroPedido} - {new Date(pedido.data).toLocaleDateString()}</p>
                <Link to={`/minha-conta/pedidos/${pedido.id}`}>
                    <button className='!text-sm sm:!text-base btnPadrao !w-32 sm:!w-auto'>
                        Ver Detalhes
                        <IoIosArrowForward className='text-emerald-50 text-lg' />
                    </button>
                </Link>
            </div>

            <hr />

            <div className='flex gap-2 items-center py-2 px-3'>
                <p className="text-sm sm:text-base"><span className='font-bold'>Forma de Pagamento:</span> {pedido.formaPagamento}</p>
            </div>
            <hr />

            <p className='font-bold uppercase text-emerald-600 py-2 px-3 text-sm sm:text-base'>{pedido.status}</p>

            <ul>
                {pedido.produtos.map((produto) => (
                    <div key={produto.id}>
                        <hr />
                        <div className='flex gap-4 items-center py-2 px-3'>
                            <Link className="min-w-20 w-20" to={`/produto/${produto.id}`}><img className='w-full' src={api + produto.imagem} alt="img-principal" /></Link>
                            <div className='grid grid-cols-1 gap-1'>
                                <h3 className='font-bold uppercase text-sm sm:text-base'> {produto.nome}</h3>
                                <p>Quantidade: {produto.quantidade}</p>
                            </div>
                        </div>
                    </div>
                ))}
            </ul>
        </div>
    );
}

export { PedidoContainer };