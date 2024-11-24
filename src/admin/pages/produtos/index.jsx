import React, { useEffect, useState, useContext, useCallback } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../contexts/AuthContext';
import Loading from '../../../components/Loading';
import { IoSearch } from 'react-icons/io5';
import { ToastContainer } from 'react-toastify';
import { AiOutlineEdit, AiOutlineDelete } from 'react-icons/ai';
import { MdAdd } from 'react-icons/md';
import { Modal } from '../../../components/Modal';
import AdicionarEstoque from './formAdicionarEstoque';

const AdminProdutos = () => {
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { token } = useContext(AuthContext);
    const [sortOption, setSortOption] = useState('nome');
    const [input, setInput] = useState('');
    const [searchQuery, setSearchQuery] = useState('');
    const [modalEstoque, setModalEstoque] = useState(false)
    const api = process.env.REACT_APP_API_URL;

    const fetchProdutos = useCallback(async () => {
        try {
            const response = await axios.get(`${api}admin-buscar-produtos`, {
                headers: { 'Authorization': `Bearer ${token}` },
                params: {
                    query: searchQuery,
                    sort: sortOption,
                }
            });

            if (response.status === 404) {
                setError('Nenhum produto encontrado.');
                setProdutos([]);
            } else {
                setProdutos(response.data);
                setError('');
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                setError('Nenhum produto encontrado.');
            } else {
                setError('Erro ao buscar produtos.');
            }
            setProdutos([]);
        } finally {
            setLoading(false);
        }
    }, [token, api, searchQuery, sortOption]);

    useEffect(() => {
        if (token) {
            fetchProdutos();
        }
    }, [token, fetchProdutos]);

    function envioForm(e) {
        e.preventDefault();
        setSearchQuery(input);
    }

    function formatarPreco(preco) {
        return preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    function openEstoqueModal() {
        setModalEstoque(true)
    }

    const handleDelete = async (id) => {
        if (window.confirm('Deseja realmente excluir este produto?')) {
            try {
                await axios.delete(`${api}admin-deletar-produto/${id}`, {
                    headers: { 'Authorization': `Bearer ${token}` }
                });
                fetchProdutos();
            } catch (error) {
                alert('Erro ao excluir o produto.');
            }
        }
    };

    return (
        <div className="containerPadrao mx-auto gap-2">
            <div className='flex flex-col sm:flex-row sm:justify-between sm:items-center'>
                <h1 className="text-lg sm:text-2xl font-bold text-zinc-900">Gerenciar Produtos</h1>
                <form onSubmit={envioForm} className='flex items-center gap-2'>
                    <div className='flex items-center bg-white border-2 border-emerald-600 rounded-md'>
                        <input
                            type="text"
                            className='p-1 outline-none rounded-md'
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                        />
                        <button className="p-1 " type="submit">
                            <IoSearch className="text-emerald-700 text-2xl cursor-pointer" />
                        </button>
                    </div>
                </form>
            </div>

            <div className='flex flex-col bg-white rounded'>
                <div className='flex flex-col bg-emerald-700 sm:flex-row sm:justify-between sm:items-center gap-2 sm:gap-6 p-3 rounded-t-md'>
                    <div className='flex gap-2 items-center'>
                        <label htmlFor="ordenacao" className='text-emerald-50'>Ordenar por:</label>
                        <select
                            className='p-1 rounded-md !bg-emerald-900 text-emerald-50 outline-none'
                            value={sortOption}
                            onChange={(e) => setSortOption(e.target.value)}
                        >
                            <option value="nome">Nome A-Z</option>
                            <option value="-nome">Nome Z-A</option>
                            <option value="preco">Menor Preço</option>
                            <option value="-preco">Maior Preço</option>
                        </select>
                    </div>
                    <p className='text-base text-emerald-50'>
                        <span className='font-bold'>{produtos.length}</span> produtos encontrados
                    </p>
                </div>

                {loading ? (
                    <div className='flex justify-center items-center min-h-[38vh]'>
                        <Loading />
                    </div>
                ) : error ? (
                    <div className='flex justify-center items-center min-h-[38vh]'>
                        <p className="text-lg text-zinc-900">{error}</p>
                    </div>
                ) : (
                    <div className='flex flex-col bg-white mt-1'>
                        {produtos.map((produto) => (
                            <div className='grid sm:grid-cols-2 lg:grid-cols-4 text-zinc-900 text-sm border-b p-3 gap-3' key={produto._id}>
                                <div className='flex flex-col justify-center'>
                                    <p><strong>Nome: </strong>{produto.nome}</p>
                                </div>
                                <div className='flex flex-col justify-center items-center'>
                                    {produto.images[0] && (
                                        <img
                                            src={api + produto.images[0]}
                                            alt={produto.nome}
                                            className="w-20 h-20 object-cover"
                                        />
                                    )}
                                    <p><strong>Preço: </strong>{formatarPreco(produto.preco)}</p>
                                </div>
                                <div className='flex flex-col justify-center'>
                                    <p><strong>Estoque: </strong>{produto.estoque}</p>
                                    <p><strong>Categoria: </strong>{produto.categoria}</p>
                                    <p><strong>Marca: </strong>{produto.marca}</p>
                                </div>

                                <div className='flex items-center justify-center gap-4'>
                                    <button className='flex gap-1 btnPadrao !text-sm' onClick={() => openEstoqueModal()}>
                                        <MdAdd className='text-2xl text-emerald-50' />
                                        Estoque
                                    </button>


                                    <button className='p-2 bg-cyan-600 text-white rounded' title="Editar">
                                        <AiOutlineEdit size={20} />
                                    </button>
                                    <button
                                        onClick={() => handleDelete(produto._id)}
                                        className='p-2 bg-red-600 text-white rounded'
                                        title="Excluir"
                                    >
                                        <AiOutlineDelete size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            {modalEstoque && (
                <Modal setEstado={setModalEstoque} titulo='Adicionar no estoque' largura='max-w-xl' >
                    <AdicionarEstoque />
                </Modal>
            )}

            <ToastContainer />
        </div>
    );
};

export default AdminProdutos;
