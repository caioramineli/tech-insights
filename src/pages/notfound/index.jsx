import { Link } from 'react-router-dom';

const NotFound = () => {
    return (
        <div className="containerPadrao !items-center !justify-center min-h-[50vh]: !text-zinc-950 !gap-6">
            <h1 className="text-xl sm:text-3xl font-bold ">404 - Página Não Encontrada</h1>
            <p className='text-sm sm:text-base'>Desculpe, a página que você está tentando acessar não existe.</p>
            <Link to="/" className="btnPadrao">
                Voltar para a página inicial
            </Link>
        </div>
    );
};

export { NotFound };