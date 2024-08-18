import React, { useContext } from 'react';
import './style.css';
import NavBar from '../NavBar';
import { AuthContext } from '../../contexts/AuthContext';

import { PiUserCircleLight } from "react-icons/pi";
import { MdShoppingCart } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { IoSearch } from 'react-icons/io5';
import { Link } from 'react-router-dom';
import { useCarrinho } from '../../contexts/contex-Cart'; // Ajuste o caminho do import conforme necessário


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
                    <h1>Tech Insights</h1>
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
                        <span>
                            Olá, <a href="/login">Entre</a> ou <a href="/cadastrar">Cadastre-se</a>
                        </span>
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
