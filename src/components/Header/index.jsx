import React, { useContext } from 'react';
import './style.css';
import NavBar from '../NavBar';
import PesquisarHeader from '../PesquisarHeader';
import MenuMobile from '../MenuMobile';
import { AuthContext } from '../../contexts/AuthContext';

import { PiUserCircleLight } from "react-icons/pi";
import { MdShoppingCart } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { Link } from 'react-router-dom';
import { useCarrinho } from '../../contexts/contex-Cart';
import Logo from "../../assets/logo.png"

const Header = () => {
    const { carrinho } = useCarrinho();
    const { user, logout } = useContext(AuthContext);

    const getFirstName = (fullName) => {
        return fullName.split(' ')[0];
    };

    return (
        <header className="header">
            <section className="containerHeaderItens h-16 sm:h-20 md:h-24">
                <MenuMobile />
                <div className='flex items-center md:min-w-[110px] sm:min-w-[100px] min-w-[80px]'>
                    <Link to="/">
                        <img className='md:w-[110px] sm:w-[100px] w-[80px]' src={Logo} alt="Logo" />
                    </Link>
                </div>

                <PesquisarHeader />

                <div className="hidden sm:flex text-cyan-50 items-center gap-2">
                    <PiUserCircleLight className='w-9 h-9' />
                    {user ? (
                        <div>
                            <span className='font-bold text-nowrap'>Olá, {getFirstName(user.nome)}</span>
                            <div className='flex gap-1'>
                                <a href="/minha-conta" className='text-nowrap'><button>Minha conta</button></a>
                                <span>|</span>
                                <button onClick={logout}>Sair</button>
                            </div>
                        </div>
                    ) : (
                        <div className='flex-col w-[100px]'>
                            <span>Olá, <Link className='text-cyan-500 font-bold' to="/login">Entre</Link> ou </span>
                            <span className='text-teal-500 font-bold'><Link to="/cadastrar">Cadastre-se</Link></span>
                        </div>
                    )}
                </div>

                <div className="containerFavCart">
                    <div className="hidden sm:flex">
                        <FaRegHeart />
                        <span>0</span>
                    </div>
                    <div className="carrinho">
                        <Link to="/carrinho"><MdShoppingCart /></Link>
                        <span>{carrinho.length}</span>
                    </div>
                </div>
            </section>
            <NavBar />
            <PesquisarHeader display='flex' responsivo="md:hidden" mb="mb-4" />
        </header>
    );
}

export default Header;
