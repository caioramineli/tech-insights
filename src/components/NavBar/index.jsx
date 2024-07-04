import { FaChevronDown } from "react-icons/fa";

import "./style.css"

export default function NavBar() {
    return (
        <nav className="navBar">
            <ul>
                <li id='liDPT'>DEPARTAMENTOS<FaChevronDown id='setaParaBaixo' /> </li>
                <a href="/guias" className='bordaPadrao'>
                    <li>GUIAS INFORMATIVOS</li>
                </a>
                <a href="/monte-seu-pc" className='bordaPadrao'>
                    <li>MONTE SEU PC</li>
                </a>
                <a href="/cupons" className='bordaPadrao'>
                    <li>CUPONS</li>
                </a>
                <a href="/kit-upgrade" className='bordaPadrao'>
                    <li>KIT UPGRADE</li>
                </a>
                <a href="notebooks" className='bordaPadrao'>
                    <li>NOTEBOOKS</li>
                </a>
                <a href="/monitores" className='bordaPadrao'>
                    <li >MONITORES</li>
                </a>
            </ul>
        </nav>
    )
}
