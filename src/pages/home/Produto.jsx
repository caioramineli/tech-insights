import { Link } from "react-router-dom";
import { MdShoppingCart } from "react-icons/md";
import Favoritar from "../../components/Favoritar";

export default function Produto({ product }) {
    const api = process.env.REACT_APP_API_URL;

    return (
        <Link to={`/product/${product._id}`}>
            <div className="boxProduto gap-1">
                <Favoritar produto={product._id} />
                <img src={api + product.images[0]} alt="produto" />
                <p className="text-sm md:text-base">{product.nome}</p>
                <p className="text-base md:text-lg">{product.preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
                <p className="text-[0.65rem] sm:text-sm">10x de <span>{(product.precoPrazo / 10).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span> sem juros</p>
                <button className="text-base sm:text-lg md:text-xl">
                    Comprar
                    <MdShoppingCart />
                </button>
            </div>
        </Link>
    );
}
