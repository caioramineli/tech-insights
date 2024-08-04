import { FaAngleRight } from 'react-icons/fa'
import './style.css'
import { Link } from 'react-router-dom'

export default function DropDownDepartamentos() {
    return (
        <ul className="dropdownMenu">
            <li id='liHardware'>
                <Link to="/">
                    Hardware
                    <FaAngleRight />
                </Link>
                <ul className='listaHardware'>
                    <li><Link to="/">Processadores</Link></li>
                    <li><Link to="/">Placas mãe</Link></li>
                    <li><Link to="/">Placas de vídeo</Link></li>
                    <li><Link to="/">Fontes</Link></li>
                    <li><Link to="/">Gabinetes</Link></li>
                    <li><Link to="/">Armazenatmento</Link></li>
                    <li><Link to="/">Coolers</Link></li>
                </ul>
            </li>

            <li id='liPerife'>
                <Link to="/">
                    Periféricos
                    <FaAngleRight />
                </Link>
                <ul className='listaPerife'>
                    <li><Link to="/">Headset</Link></li>
                    <li><Link to="/">Mouse</Link></li>
                    <li><Link to="/">Teclado</Link></li>
                </ul>
            </li>

            <li id='liRedes'>
                <Link to="/">
                    Redes
                    <FaAngleRight />
                </Link>
                <ul className='listaRedes'>
                    <li><Link to="/">Roteadores</Link></li>
                    <li><Link to="/">Cabo de Rede</Link></li>
                </ul>
            </li>

            <li id='liComputadores'>
                <Link to="/">
                    Computadores
                    <FaAngleRight />
                </Link>
                <ul className='listaComputadores'>
                    <li><Link to="/">Escritório</Link></li>
                    <li><Link to="/">Profissional</Link></li>
                    <li><Link to="/">Gamer</Link></li>
                </ul>
            </li>

            <li>
                <Link to="/guias">Guias Informativos</Link>
            </li>

            <li>
                <Link to="/monte-seu-pc">Monte seu PC</Link>
            </li>

            <li>
                <Link to="/cupons">Cupons</Link>
            </li>

            <li>
                <Link to="/kit-upgrade">Kit Upgrade</Link>
            </li>

            <li>
                <Link to="/notebooks">Notebooks</Link>
            </li>

            <li>
                <Link to="/monitores">Monitores</Link>
            </li>
        </ul>
    )
}
