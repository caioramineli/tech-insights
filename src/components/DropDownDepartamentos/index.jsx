import { FaAngleRight } from 'react-icons/fa'
import './style.css'

export default function DropDownDepartamentos() {
    return (
        <ul className="dropdownMenu">
            <li id='liHardware'>
                <a href="/">
                    Hardware
                    <FaAngleRight />
                </a>
                <ul className='listaHardware'>
                    <li><a href="/">Processadores</a></li>
                    <li><a href="/">Placas mãe</a></li>
                    <li><a href="/">Placas de vídeo</a></li>
                    <li><a href="/">Fontes</a></li>
                    <li><a href="/">Gabinetes</a></li>
                    <li><a href="/">Armazenatmento</a></li>
                    <li><a href="/">Coolers</a></li>
                </ul>
            </li>

            <li id='liPerife'>
                <a href="/">
                    Periféricos
                    <FaAngleRight />
                </a>
                <ul className='listaPerife'>
                    <li><a href="/">Headset</a></li>
                    <li><a href="/">Mouse</a></li>
                    <li><a href="/">Teclado</a></li>
                </ul>
            </li>

            <li id='liRedes'>
                <a href="/">
                    Redes
                    <FaAngleRight />
                </a>
                <ul className='listaRedes'>
                    <li><a href="/">Roteadores</a></li>
                    <li><a href="/">Cabo de Rede</a></li>
                </ul>
            </li>

            <li id='liComputadores'>
                <a href="/">
                    Computadores
                    <FaAngleRight />
                </a>
                <ul className='listaComputadores'>
                    <li><a href="/">Escritório</a></li>
                    <li><a href="/">Profissional</a></li>
                    <li><a href="/">Gamer</a></li>
                </ul>
            </li>

            <li>
                <a href="/guias">Guias Informativos</a>
            </li>

            <li>
                <a href="/monte-seu-pc">Monte seu PC</a>
            </li>

            <li>
                <a href="/cupons">Cupons</a>
            </li>

            <li>
                <a href="/kit-upgrade">Kit Upgrade</a>
            </li>

            <li>
                <a href="/notebooks">Notebooks</a>
            </li>

            <li>
                <a href="/monitores">Monitores</a>
            </li>
        </ul>
    )
}
