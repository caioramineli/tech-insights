import React from 'react';
import { Link } from 'react-router-dom';

const HomeAdmin = () => {
    return (
        <div className="containerPadrao flex flex-col items-center justify-center">
            <h1 className="text-4xl font-bold text-gray-800 mb-12">
                Bem-vindo(a) ao Painel Administrativo
            </h1>
            <div className="flex flex-wrap justify-center gap-8">
                <Link
                    to="/admin/produtos"
                    className="bg-white shadow-lg rounded-lg p-8 w-80 text-center transform hover:-translate-y-2 hover:shadow-xl transition duration-300"
                >
                    <h2 className="text-2xl font-semibold text-cyan-600 mb-4">Gerenciar Produtos</h2>
                    <p className="text-zinc-800">Adicione, edite ou remova produtos.</p>
                </Link>
                <Link
                    to="/admin/cupons"
                    className="bg-white shadow-lg rounded-lg p-8 w-80 text-center transform hover:-translate-y-2 hover:shadow-xl transition duration-300"
                >
                    <h2 className="text-2xl font-semibold text-cyan-600 mb-4">Gerenciar Cupons</h2>
                    <p className="text-zinc-800">Adicione e gerencie cupons de desconto.</p>
                </Link>

                <Link
                    to="/admin/pedidos"
                    className="bg-white shadow-lg rounded-lg p-8 w-80 text-center transform hover:-translate-y-2 hover:shadow-xl transition duration-300"
                >
                    <h2 className="text-2xl font-semibold text-cyan-600 mb-4">Visualizar pedidos</h2>
                    <p className="text-zinc-800">Visualize os pedidos do sistema.</p>
                </Link>
            </div>
        </div>
    );
};

export default HomeAdmin;
