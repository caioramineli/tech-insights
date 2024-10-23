import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom"

export function BoxMarca({ marca }) {
    const api = process.env.REACT_APP_API_URL;
    return (
        <Link to={`/marcas/${marca}`}>
            <div className='w-56 sm:w-auto flex flex-col gap-4 items-center bsPadrao rounded-md p-6 cursor-pointer duration-200 hover:scale-[1.02] bg-white'>
                <img src={`${api}imgs/${marca}.jpg`} alt={marca} className="w-20" />
                <div className="flex flex-row items-center justify-center">
                    <p className='font-bold uppercase text-emerald-600 text-sm '>ver produtos</p>
                    <MdOutlineKeyboardArrowRight className="text-emerald-600 text-lg" />
                </div>
            </div>
        </Link >
    )
}

export function ContainerMarcas() {
    return (
        <div className="grid gap-3 mt-5" >
            <h1 className="text-sm sm:text-base font-bold uppercase">Pesquisar pela marca:</h1>
            <div className="flex overflow-x-scroll [&::-webkit-scrollbar]:hidden sm:grid sm:grid-cols-[repeat(auto-fit,minmax(200px,1fr))] xl:grid-cols-5 gap-3 mt-3 mb-3">
                <BoxMarca marca="msi" />
                <BoxMarca marca={"gigabyte"} />
                <BoxMarca marca={"asus"} />
                <BoxMarca marca={"coolermaster"} />
                <BoxMarca marca={"kingston"} />
                <BoxMarca marca={"xpg"} />
                <BoxMarca marca={"acer"} />
                <BoxMarca marca={"lg"} />
                <BoxMarca marca={"redragon"} />
                <BoxMarca marca={"hyperX"} />
                <BoxMarca marca={"ASRock"} />
                <BoxMarca marca={"galax"} />
                <BoxMarca marca={"pny"} />
                <BoxMarca marca={"amd"} />
                <BoxMarca marca={"intel"} />
            </div>
        </div>
    )
}