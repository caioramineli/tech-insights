import ReactDOM from 'react-dom/client';
import React from 'react';
import MinhasRotas from './minhasRotas';
import "./globalStyle.css";
import "./responsivo.css";

import { AuthProvider } from './contexts/AuthContext';
import { CarrinhoProvider } from './contexts/contex-Cart';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <>
        <AuthProvider>
            <CarrinhoProvider>
                <MinhasRotas />
            </CarrinhoProvider>
        </AuthProvider>
    </>
);
