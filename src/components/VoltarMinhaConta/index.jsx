import { FaArrowLeft } from "react-icons/fa";
import { Link } from "react-router-dom";

const VoltarMinhaConta = ({ caminho = "/minha-conta" }) => {
    return (
        <Link to={caminho}>
            <button className="flex items-center gap-2 p-2 hover:bg-zinc-300 duration-200 rounded-md">
                <FaArrowLeft />
                <span className="uppercase text-sm sm:text-base font-semibold">Voltar</span>
            </button>
        </Link>
    );
}

export default VoltarMinhaConta;