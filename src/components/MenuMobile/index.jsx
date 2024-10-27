import React, { useState, useContext, useEffect } from 'react';
import './style.css';
import { FaRegHeart, FaUser } from 'react-icons/fa';
import { IoMdExit } from "react-icons/io";
import { Link, useLocation } from 'react-router-dom';
import { AuthContext } from '../../contexts/AuthContext';

const MenuMobile = () => {
    const [isActive, setIsActive] = useState(false);
    const { user, favoritos, logout } = useContext(AuthContext);
    const location = useLocation();

    const toggleMenu = (event) => {
        if (event.type === 'touchstart' && event.cancelable) {
            event.preventDefault();
        }
        setIsActive(!isActive);
    };

    useEffect(() => {
        setIsActive(false);
    }, [location]);

    const getFirstName = (fullName) => {
        return fullName ? fullName.split(' ')[0] : '';
    };

    return (
        <nav id="navMobile" className={isActive ? 'active' : ''}>
            <button id="btn-mobile" onClick={toggleMenu}>
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
                        <Link to="/">
                            Hardware
                        </Link>
                    </li>
                    <li id='liPerife'>
                        <Link to="/">
                            Periféricos
                        </Link>
                    </li>
                    <li id='liRedes'>
                        <Link to="/">
                            Redes
                        </Link>
                    </li>
                    <li id='liComputadores'>
                        <Link to="/">
                            Computadores
                        </Link>
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
                        <Link to="/categoria/Kit-upgrade">Kit Upgrade</Link>
                    </li>
                    <li>
                        <Link to="/categoria/Notebook">Notebooks</Link>
                    </li>
                    <li>
                        <Link to="/categoria/Monitor">Monitores</Link>
                    </li>
                </div>
            </ul>
        </nav>
    );
};

export default MenuMobile;
