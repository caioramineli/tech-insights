import { FaChevronDown } from "react-icons/fa";
import DropDownDepartamentos from "../DropDownDepartamentos";

import "./style.css"
import { useState } from "react";

export default function NavBar() {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleMouseEnter = () => {
        setIsDropdownOpen(true);
    };

    const handleMouseLeave = () => {
        setIsDropdownOpen(false);
    };


    return (
        <>
            <div className={`overlay ${isDropdownOpen ? 'active' : ''}`}></div>
            <nav className="navBar">

                <ul className="lista">
                    <li id='liDPT' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                        DEPARTAMENTOS
                        <FaChevronDown id='setaParaBaixo' />
                        <DropDownDepartamentos className={`dropdownMenu ${isDropdownOpen ? 'show' : ''}`} />
                        {/* <div class="overlay" id="overlay"></div> */}
                    </li>
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
        </>

    )
}
