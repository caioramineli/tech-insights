import React, { useContext } from 'react';
import './style.css';
import NavBar from '../NavBar';
import { AuthContext } from '../../contexts/AuthContext';

import { PiUserCircleLight } from "react-icons/pi";
import { MdShoppingCart } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { IoSearch } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { useCarrinho } from '../../contexts/contex-Cart';


const Header = () => {
    const { carrinho } = useCarrinho();
    const { user, logout } = useContext(AuthContext);

    const getFirstName = (fullName) => {
        return fullName.split(' ')[0];
    };   

    return (
        <header className="header">
            <section className="containerHeaderItens">
                <Link to="/">
                    <h1 className='text-cyan-50 text-nowrap text-2xl font-bold'>Tech Insights</h1>
                </Link>

                <div className="containerPesquisa">
                    <input type="text" placeholder="Pesquisar produtos" />
                    <IoSearch />
                </div>

                <div className="containerLoginReg">
                    <PiUserCircleLight />
                    {user ? (
                        <div>
                            <span id='olaNome'>Olá, {getFirstName(user.nome)}</span>
                            <div className='contaSair'>
                                <a href="/minha-conta"><button>Minha conta</button></a>
                                <span>|</span>
                                <button onClick={logout}>Sair</button>
                            </div>
                        </div>
                    ) : (
                        <div className='flex-col'>
                            <span className='mg-auto'>Olá, <Link to="/login">Entre</Link> ou </span>
                            <span><Link to="/cadastrar">Cadastre-se</Link></span>
                        </div>
                    )}
                </div>

                <div className="containerFavCart">
                    <div className="favoritos">
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
        </header>
    );
}

export default Header;
