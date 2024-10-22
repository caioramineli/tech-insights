import React, { useContext } from 'react';
import './style.css';
import NavBar from '../NavBar';
import PesquisarHeader from './PesquisarHeader';
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
    const { user, logout, favoritos } = useContext(AuthContext);

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
                                <Link to="/minha-conta" className='text-nowrap hover:text-cyan-500 duration-200'><button>Minha conta</button></Link>
                                <span>|</span>
                                <button className='hover:text-cyan-500 duration-200'
                                    onClick={() => {
                                        window.location.href = '/';
                                        logout();
                                    }}>
                                    Sair
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className='flex-col w-[105px]'>
                            <span>Olá, <Link className='text-cyan-500 font-bold' to="/login">Entre</Link> ou </span>
                            <span className='text-emerald-500 font-bold'><Link to="/cadastrar">Cadastre-se</Link></span>
                        </div>
                    )}
                </div>

                <div className="containerFavCart">
                    <Link to='/minha-conta/favoritos'>
                        <div className="hidden sm:flex">
                            <FaRegHeart />
                            <span>{favoritos.length}</span>
                        </div>
                    </Link>
                    <Link to="/carrinho">
                        <div className="carrinho">
                            <MdShoppingCart />
                            <span>{carrinho.length}</span>

                        </div>
                    </Link>
                </div>
            </section>
            <NavBar />
            <PesquisarHeader display='flex' responsivo="md:hidden" mb="mb-4" />
        </header >
    );
}

export default Header;
