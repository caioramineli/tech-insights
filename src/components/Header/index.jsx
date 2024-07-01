import React from 'react';
import './style.css';

import pesquisar from "../../assets/lupa.png"
// import user from "../../assets/user.png"
import { PiUserCircleLight } from "react-icons/pi";
// import carrinho from "../../assets/carrinho.png"
import { MdShoppingCart } from "react-icons/md";
// import coracao from "../../assets/coracao.png"
import { FaRegHeart } from "react-icons/fa";
import setaPraBaixo from "../../assets/setaPraBaixo.png"


const Header = () => {
    return (
        <header className="header">
            <section className="containerHeaderItens">
                <a href="/">
                    <h1>Tech Insights</h1>
                </a>

                <div class="containerPesquisa">
                    <input type="text" placeholder="Pesquisar produtos" />
                    <button>
                        <img src={pesquisar} alt="pesquisar" />
                    </button>
                </div>

                <div className="containerLoginReg">
                    {/* <img src={user} alt="user icon" className="user-icon" /> */}
                    <PiUserCircleLight />
                    <span>Olá, <a href="/login">Entre</a> ou <a href="/cadastrar">Cadastre-se</a></span>
                </div>

                <div className="containerFavCart">
                    <div className="favoritos">
                        {/* <img src={coracao} alt="coracao" /> */}
                        <FaRegHeart />
                        <span>0</span>
                    </div>
                    <div className="carrinho">
                        {/* <img src={carrinho} alt="carrinho" /> */}
                        <MdShoppingCart />
                        <span>0</span>
                    </div>
                </div>
            </section>

            <nav className="navBar">
                <ul>
                    <li>DEPARTAMENTOS<img id='setaParaBaixo' src={setaPraBaixo} alt="seta para baixo" /></li>
                    <li className='liPadrao'>GUIAS INFORMATIVOS</li>
                    <li className='liPadrao'>MONTE SEU PC</li>
                    <li className='liPadrao'>CUPONS</li>
                    <li className='liPadrao'>KIT UPGRADE</li>
                    <li className='liPadrao'>NOTEBOOKS</li>
                    <li className='liPadrao'>MONITORES</li>
                </ul>
            </nav>
        </header>
    );
}

export default Header;
