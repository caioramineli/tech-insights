import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import { Link } from "react-router-dom"


export default function Marca({ marca }){
    const api = process.env.REACT_APP_API_URL;
    return(
        <div id="containerMarca" className="flex flex-col sm:flex-row items-center justify-center bsPadrao bg-white rounded-lg gap-2 sm:gap- w-34 h-28 transition duration-300 transform hover:scale-105 hover:no-underline">
            <Link to={`/marcas/${marca}`}></Link>
                <div className='flex flex-col '>
                    <img src={`${api}imgs/${marca}.jpg`} />
                    <div className="flex flex-row items-center justify-center">
                        <p className='font-bold uppercase text-emerald-600 text-sm '>ver produtos</p>
                        <MdOutlineKeyboardArrowRight className="text-emerald-600"/>
                    </div>
                </div>

            <Link/>
        </div>
    )
}