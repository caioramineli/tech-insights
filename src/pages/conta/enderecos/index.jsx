import { FaArrowLeft } from "react-icons/fa";
import { FaMapLocationDot } from "react-icons/fa6";
import { Link } from "react-router-dom";

const EnderecosUser = () => {
    return (
        <div className='flex flex-col w-[90%] xl:w-[80%] max-w-[1300px] min-h-[50vh] my-6 sm:my-8 gap-3'>
            <div className="flex justify-between items-center" >
                <div className="flex items-center gap-2">
                    <FaMapLocationDot className='text-emerald-600 text-3xl sm:text-4xl' />
                    <h1 className="font-bold text-zinc-900 text-xl md:text-2xl">Meus Endereços</h1>
                </div>
                <Link to="/minha-conta">
                    <button className="flex items-center gap-2 p-2 hover:bg-zinc-300 duration-200 rounded-md">
                        <FaArrowLeft />
                        <span className="uppercase text-base font-semibold">Voltar</span>
                    </button>
                </Link>
            </div>
        </div>
    );
}

export default EnderecosUser;