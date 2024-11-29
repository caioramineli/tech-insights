import { IoClose } from "react-icons/io5";

const Modal = ({ setEstado, titulo, children, largura = "max-w-2xl" }) => {
    function closeModal() {
        setEstado(false);
        document.body.style.overflow = 'auto';
    }

    return (
        <div className='fixed inset-0 bg-black/70 flex items-center justify-center !z-10'>
            <div className={`bg-white rounded-lg shadow-lg w-11/12 ${largura} p-5 relative flex flex-col gap-2`}>

                <IoClose onClick={closeModal} className="!absolute !left-auto !top-2 !right-2 text-zinc-700 hover:text-zinc-500 duration-150 w-8 h-8 cursor-pointer z-10" />

                <h2 className="text-lg sm:text-xl font-bold text-zinc-900 mb-2">{titulo}</h2>

                {children}

            </div>
        </div >
    );
}

export { Modal };
