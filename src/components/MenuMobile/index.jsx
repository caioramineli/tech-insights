import React, { useState, useEffect, useRef, useContext } from 'react';
import './style.css';
import { FaRegHeart, FaUser } from 'react-icons/fa';
import { IoMdExit } from "react-icons/io";
import { Link } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const MenuMobile = () => {
    const [isActive, setIsActive] = useState(false);
    const { user, favoritos, logout } = useContext(AuthContext);
    const btnRef = useRef(null);
    const navRef = useRef(null);

    const toggleMenu = (event) => {
        if (event.type === 'touchstart') event.preventDefault();
        setIsActive((prevState) => !prevState);
    };

    useEffect(() => {
        const button = btnRef.current;

        button.addEventListener('touchstart', toggleMenu, { passive: false });

        return () => {
            button.removeEventListener('touchstart', toggleMenu);
        };
    }, [isActive]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (navRef.current && !navRef.current.contains(event.target) && !btnRef.current.contains(event.target)) {
                setIsActive(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const getFirstName = (fullName) => {
        return fullName ? fullName.split(' ')[0] : '';
    };

    return (
        <nav ref={navRef} id="navMobile" className={isActive ? 'active' : ''}>
            <button ref={btnRef} id="btn-mobile" onClick={toggleMenu}>
                <span id="hamburger"></span>
            </button>
            <ul id="menu">
                <div className='w-[90%] m-auto'>
                    <div className='flex sm:hidden items-center gap-6 borda h-[4rem] px-[1px]'>
                        <div className='flex flex-col sm:hidden justify-start'>
                            <span className='text-cyan-50 leading-[1.3rem]'>Olá,</span>
                            <span className='text-cyan-50 font-bold'>
                                {user ? getFirstName(user.nome) : 'Visitante'}
                            </span>
                        </div>
                        <Link to="/minha-conta" onClick={toggleMenu}>
                            <span className='flex flex-col items-center text-cyan-50'>
                                <FaUser className='text-lg' />
                                Conta
                            </span>
                        </Link>

                        <Link to='/minha-conta/favoritos' onClick={toggleMenu}>
                            <div className="flex flex-col items-center text-cyan-50 relative">
                                <FaRegHeart className='text-lg' />
                                <span className='flex items-center justify-center text-sm w-4 h-4 absolute bottom-8 right-[11px] bg-cyan-600 rounded-[50%]'>{favoritos.length}</span>
                                <span>Favoritos</span>
                            </div>
                        </Link>

                        {user && (
                            <span onClick={() => { window.location.reload(); logout(); }} className='flex flex-col items-center text-cyan-50'>
                                <IoMdExit className='text-lg' />
                                Sair
                            </span>
                        )}
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
                </div>
            </ul>
        </nav>
    );
};

export default MenuMobile;
