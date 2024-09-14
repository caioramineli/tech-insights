import { MdShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";

const CarrinhoVazio = () => {
    return (
        <>
            <div className="carrinhoVazio">
                <h1 className="text-2xl font-bold">O seu carrinho está vazio</h1>
                <Link to="/">
                    <button>
                        <MdShoppingCart />
                        Escolher produtos
                    </button>
                </Link>
            </div>
        </>
    );
}

export default CarrinhoVazio;