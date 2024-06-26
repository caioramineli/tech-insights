import ReactDOM from 'react-dom/client';
import React from 'react';
import MinhasRotas from './minhasRotas';
import "./globalStyle.css";
import Header from './components/Header';
import Footer from './components/Footer';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <Header/>
        <MinhasRotas />
        <Footer/>
    </>
);
