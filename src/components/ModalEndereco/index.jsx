import { IoClose } from "react-icons/io5";
// import { useState } from "react";
// import { toast } from 'react-toastify';


const ModalEndereco = ({ setEstado, titulo }) => {
    function closeModalEndereco() {
        setEstado(false)
        document.body.style.overflow = 'auto';
    }

    return (
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center z-10'>
            <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-2xl p-5 relative flex flex-col gap-2">

                <IoClose onClick={closeModalEndereco} className="absolute top-2 right-2 text-slate-600 hover:text-slate-500 duration-200 w-8 h-8 cursor-pointer z-10" />

                <h2 className="text-lg sm:text-xl font-bold text-zinc-900">{titulo}</h2>

            </div>
        </div>
    );
}

export default ModalEndereco;