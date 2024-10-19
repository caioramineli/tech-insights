import { IoClose } from "react-icons/io5";

const Modal = ({ setEstado, titulo, children, largura = '2xl' }) => {
    function closeModalEndereco() {
        setEstado(false);
        document.body.style.overflow = 'auto';
    }

    return (
        <div className='fixed inset-0 bg-black/70 flex items-center justify-center z-10'>
            <div className={`bg-white rounded-lg shadow-lg w-11/12 max-w-${largura} p-5 relative flex flex-col gap-2`}>

                <IoClose onClick={closeModalEndereco} className="absolute top-2 right-2 text-slate-600 hover:text-slate-500 duration-200 w-8 h-8 cursor-pointer z-10" />

                <h2 className="text-lg sm:text-xl font-bold text-zinc-900 mb-2">{titulo}</h2>

                {children}

            </div>
        </div >
    );
}

export { Modal };
