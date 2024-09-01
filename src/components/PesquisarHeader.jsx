import { IoSearch } from "react-icons/io5";

export default function PesquisarHeader({ display = "hidden", responsivo= "md:flex", mb="" }) {
    return (
        <div className={`${display} items-center w-[90%] m-auto bg-cyan-800 p-1 rounded-md ${mb} ${responsivo}`}>
            <input
                className="p-1 border-none w-full bg-transparent outline-0 text-sm md:text-base text-cyan-50"
                type="text"
                placeholder="Pesquisar produtos"
            />
            <IoSearch className="text-cyan-100 text-2xl" />
        </div>
    );
}
