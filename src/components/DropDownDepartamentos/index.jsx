import { FaAngleRight } from 'react-icons/fa'
import './style.css'
import { Link } from 'react-router-dom'

export default function DropDownDepartamentos() {
    return (
        <ul className='dropdownMenu'>
            <li id='liHardware'>
                <Link to="/categoria/hardware">
                    Hardware
                    <FaAngleRight />
                </Link>
                <ul className='listaHardware'>
                    <li><Link to="/categoria/Processador">Processadores</Link></li>
                    <li><Link to="/categoria/Placa-Mãe">Placas mãe</Link></li>
                    <li><Link to="/categoria/Placa de Vídeo">Placas de vídeo</Link></li>
                    <li><Link to="/categoria/Fonte">Fontes</Link></li>
                    <li><Link to="/categoria/Gabinete">Gabinetes</Link></li>
                    <li><Link to="/categoria/Memória RAM">Memórias RAM</Link></li>
                    <li><Link to="/categoria/Armazenamento">Armazenamento</Link></li>
                    <li><Link to="/categoria/Cooler">Coolers</Link></li>
                </ul>
            </li>

            <li id='liPerife'>
                <Link to="/categoria/perifericos">
                    Periféricos
                    <FaAngleRight />
                </Link>
                <ul className='listaPerife'>
                    <li><Link to="/categoria/Fone">Headset</Link></li>
                    <li><Link to="/categoria/Mouse">Mouse</Link></li>
                    <li><Link to="/categoria/Teclado">Teclado</Link></li>
                </ul>
            </li>

            <li id='liRedes'>
                <Link to="/categoria/redes">
                    Redes
                    <FaAngleRight />
                </Link>
                <ul className='listaRedes'>
                    <li><Link to="/categoria/Roteador">Roteadores</Link></li>
                    <li><Link to="/categoria/Cabo de Rede">Cabo de Rede</Link></li>
                </ul>
            </li>

            <li id='liComputadores'>
                <Link to="/categoria/computadores">
                    Computadores
                    <FaAngleRight />
                </Link>
                <ul className='listaComputadores'>
                    <li><Link to="/categoria/Escritorio">Escritório</Link></li>
                    <li><Link to="/categoria/Profissional">Profissional</Link></li>
                    <li><Link to="/categoria/Gamer">Gamer</Link></li>
                </ul>
            </li>

            <li>
                <Link to="/categoria/Guias-Informativos">Guias Informativos</Link>
            </li>

            <li>
                <Link to="/monte-seu-pc">Monte seu PC</Link>
            </li>

            <li>
                <Link to="/cupons">Cupons</Link>
            </li>

            <li>
                <Link to="/categoria/Kit-Upgrade">Kit Upgrade</Link>
            </li>

            <li>
                <Link to="/categoria/Notebook">Notebooks</Link>
            </li>

            <li>
                <Link to="/categoria/Monitor">Monitores</Link>
            </li>
        </ul>
    )
}
