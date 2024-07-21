import React from 'react';
import './style.css';
import NavBar from '../NavBar';


import { PiUserCircleLight } from "react-icons/pi";
import { MdShoppingCart } from "react-icons/md";
import { FaRegHeart } from "react-icons/fa";
import { IoSearch } from 'react-icons/io5';

const Header = () => {
    return (
        <header className="header">
            <section className="containerHeaderItens">
                <a href="/">
                    <h1>Tech Insights</h1>
                </a>

                <div className="containerPesquisa">
                    <input type="text" placeholder="Pesquisar produtos" />
                    <IoSearch/>
                </div>

                <div className="containerLoginReg">
                    <PiUserCircleLight />
                    <span>
                        Olá, <a href="/login">Entre</a> ou <a href="/cadastrar">Cadastre-se</a>
                    </span>
                </div>

                <div className="containerFavCart">
                    <div className="favoritos">
                        <FaRegHeart />
                        <span>0</span>
                    </div>
                    <div className="carrinho">
                        <a href="/carrinho"><MdShoppingCart /></a>
                        <span>0</span>
                    </div>
                </div>
            </section>
            <NavBar/>
        </header>
    );
}

export default Header;
