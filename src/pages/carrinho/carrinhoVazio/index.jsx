import { MdShoppingCart } from "react-icons/md";
import { Link } from "react-router-dom";

const CarrinhoVazio = () => {
    return (
        <>
            <div className="flex flex-col gap-4 m-auto justify-center min-h-[55vh]">
                <h1 className="text-xl sm:text-2xl font-bold">O seu carrinho está vazio</h1>
                <Link to="/">
                    <button
                        className="
                        flex 
                        items-center 
                        justify-center 
                        gap-3
                        text-xl
                        sm:text-2xl 
                        rounded-md
                        bg-cyan-700
                        text-cyan-50
                        w-full
                        p-2
                        font-bold"
                    >
                        <MdShoppingCart />
                        Escolher produtos
                    </button>
                </Link>
            </div>
        </>
    );
}

export default CarrinhoVazio;