import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';

const NavegacaoCarrinho = ({ onClick, linkVoltar, textoVoltar, textoContinuar, responsivo }) => {
    return (
        <div className={`${responsivo} justify-between`}>
            <Link to={linkVoltar}>
                <button className="flex items-center gap-2 p-2 hover:bg-zinc-300 duration-200 rounded-md">
                    <FaArrowLeft />
                    <span className="uppercase text-sm">{textoVoltar}</span>
                </button>
            </Link>

            <button onClick={onClick} className="btnPadrao !p-2 !font-bold !text-sm sm:!text-base" type="button">
                {textoContinuar}
            </button>
        </div>
    );
};

export default NavegacaoCarrinho;
