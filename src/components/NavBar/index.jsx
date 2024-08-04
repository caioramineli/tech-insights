import { FaChevronDown } from "react-icons/fa";
import DropDownDepartamentos from "../DropDownDepartamentos";

import "./style.css"
import { useState } from "react";
import { Link } from 'react-router-dom';

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
                    </li>
                    <Link to="/guias" className='bordaPadrao'>
                        <li>GUIAS INFORMATIVOS</li>
                    </Link>
                    <Link to="/monte-seu-pc" className='bordaPadrao'>
                        <li>MONTE SEU PC</li>
                    </Link>
                    <Link to="/cupons" className='bordaPadrao'>
                        <li>CUPONS</li>
                    </Link>
                    <Link to="/kit-upgrade" className='bordaPadrao'>
                        <li>KIT UPGRADE</li>
                    </Link>
                    <Link to="notebooks" className='bordaPadrao'>
                        <li>NOTEBOOKS</li>
                    </Link>
                    <Link to="/monitores" className='bordaPadrao'>
                        <li >MONITORES</li>
                    </Link>
                </ul>
            </nav>
        </>

    )
}
