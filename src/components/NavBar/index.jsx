import { FaChevronDown } from "react-icons/fa";
import DropDownDepartamentos from "../DropDownDepartamentos";
import "./style.css"
import { useState, useEffect } from "react";
import { Link, useLocation } from 'react-router-dom';

export default function NavBar() {
    const location = useLocation();
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    const handleMouseEnter = () => {
        setIsDropdownOpen(true);
    };

    const handleMouseLeave = () => {
        setIsDropdownOpen(false);
    };

    useEffect(() => {
        setIsDropdownOpen(false);
    }, [location]);

    return (
        <>
            <div className={`overlay ${isDropdownOpen ? 'active' : ''}`}></div>
            <nav className="navBar">

                <ul className="lista">
                    <li id='liDPT' onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
                        DEPARTAMENTOS
                        <FaChevronDown id='setaParaBaixo' />
                        {isDropdownOpen && <DropDownDepartamentos />}
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
                    <Link to="/categoria/Kit-Upgrade" className='bordaPadrao'>
                        <li>KIT UPGRADE</li>
                    </Link>
                    <Link to="/categoria/Notebook" className='bordaPadrao'>
                        <li>NOTEBOOKS</li>
                    </Link>
                    <Link to="/categoria/Monitor" className='bordaPadrao'>
                        <li >MONITORES</li>
                    </Link>
                </ul>
            </nav>
        </>

    )
}
