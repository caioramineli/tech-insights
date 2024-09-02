import React, { useState, useEffect, useRef } from 'react';
import './style.css';
import { FaRegHeart, FaUser } from 'react-icons/fa';

const MenuMobile = () => {
    const [isActive, setIsActive] = useState(false);
    const btnRef = useRef(null);

    const toggleMenu = (event) => {
        if (event.type === 'touchstart') event.preventDefault();

        setIsActive((prevState) => !prevState);
    };

    useEffect(() => {
        const button = btnRef.current;

        button.addEventListener('hrefuchstart', toggleMenu, { passive: false });

        return () => {
            button.removeEventListener('hrefuchstart', toggleMenu);
        };
    }, [isActive]);

    return (
        <nav id="navMobile" className={isActive ? 'active' : ''}>
            <button
                ref={btnRef}
                id="btn-mobile"
                onClick={toggleMenu}
            >
                <span id="hamburger"></span>
            </button>
            <ul id="menu">
                <div className='flex items-center borda'>
                    <a href="/minha-conta">
                        <span className='flex flex-col items-center text-cyan-50'>
                            <FaUser className='text-lg' />
                            Conta
                        </span>
                    </a>
                    <span className='flex flex-col items-center text-cyan-50'>
                        <FaRegHeart className='text-lg' />
                        Favoritos
                    </span>
                </div>
                <li id='liHardware'>
                    <a href="/">
                        Hardware
                    </a>
                </li>

                <li id='liPerife'>
                    <a href="/">
                        Periféricos
                    </a>
                </li>

                <li id='liRedes'>
                    <a href="/">
                        Redes
                    </a>
                </li>

                <li id='liComputadores'>
                    <a href="/">
                        Computadores
                    </a>
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
        </nav>
    );
};

export default MenuMobile;
