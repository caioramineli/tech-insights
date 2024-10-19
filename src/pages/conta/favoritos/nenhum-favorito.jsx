import { Link } from "react-router-dom";

const NenhumFavorito = () => {
    return (
        <div className="flex flex-col items-center gap-4 m-auto justify-center min-h-[55vh] w-[90%] xl:w-[80%] max-w-[1300px] my-6 sm:my-8">
            <h1 className="font-bold text-xl sm:text-2xl text-zinc-900">Sua lista de favoritos está vazia.</h1>
            <p className="text-base sm:text-lg">Basta clicar no icone de coração e o produto será adicionado a sua lista de favoritos.</p>
            <Link to="/">
                <button
                    className="
                        text-lg
                        sm:text-xl
                        md:text-2xl
                        rounded-md
                        bg-emerald-700
                        text-emerald-50
                        w-full
                        p-2
                        px-12
                        font-bold"
                >
                    Escolher produtos
                </button>
            </Link>
        </div>
    );
}

export default NenhumFavorito;