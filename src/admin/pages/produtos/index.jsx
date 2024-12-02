import React, { useEffect, useState, useContext, useCallback } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../contexts/AuthContext';
import Loading from '../../../components/Loading';
import { IoSearch } from 'react-icons/io5';
import { ToastContainer } from 'react-toastify';
import { AiOutlineEdit } from 'react-icons/ai';
import { MdAdd } from 'react-icons/md';
import { Modal } from '../../../components/Modal';
import AdicionarEstoque from './forms/formAdicionarEstoque';
import ProductUpload from './forms/cadastrarProduto';
import { Link } from 'react-router-dom';
import AtualizarProduto from './forms/atualizarProduto';
import TrocarStatusProduto from './forms/trocarStatusProduto';
import { FaExchangeAlt } from 'react-icons/fa';
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";

const AdminProdutos = () => {
    const { token } = useContext(AuthContext);
    const api = process.env.REACT_APP_API_URL;

    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const [productsPerPage] = useState(10);
    const [totalPages, setTotalPages] = useState(0)


    const [sortOption, setSortOption] = useState('nome');
    const [searchQuery, setSearchQuery] = useState('');
    const [input, setInput] = useState('');

    const [modalEstoque, setModalEstoque] = useState(false)
    const [modalAddProduto, setModalAddProduto] = useState(false)
    const [modalEditarProduto, setModalEditarProduto] = useState(false)
    const [modalDesativarProduto, setModalDesativarProduto] = useState(false)

    const [produtoSelecionado, setProdutoSelecionado] = useState(null);

    const fetchProdutos = useCallback(async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${api}admin-buscar-produtos`, {
                headers: { 'Authorization': `Bearer ${token}` },
                params: {
                    query: searchQuery,
                    sort: sortOption,
                    page: currentPage, // Página atual
                    limit: productsPerPage, // Limite de produtos por página
                }
            });

            if (response.status === 404) {
                setError('Nenhum produto encontrado.');
                setProdutos([]);
            } else {
                setProdutos(response.data.produtos); // Certifique-se de que a API retorna uma lista de produtos
                setTotalPages(response.data.totalPages); // Certifique-se de que a API retorna o total de páginas
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
    }, [token, api, searchQuery, sortOption, currentPage, productsPerPage]);


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

    function openAddProdutoModal() {
        setModalAddProduto(true)
        document.body.style.overflow = 'hidden';
    }

    function openEstoqueModal(produto) {
        setProdutoSelecionado(produto);
        setModalEstoque(true)
        document.body.style.overflow = 'hidden';
    }

    function openEditarProdutoModal(produto) {
        setProdutoSelecionado(produto);
        setModalEditarProduto(true)
        document.body.style.overflow = 'hidden';
    }

    function openDesativarProdutoModal(produto) {
        setProdutoSelecionado(produto);
        setModalDesativarProduto(true)
        document.body.style.overflow = 'hidden';
    }

    return (
        <div className="containerPadrao mx-auto gap-2">
            <div className='flex flex-col md:flex-row md:justify-between md:items-center gap-2'>
                <h1 className="text-lg sm:text-2xl font-bold text-zinc-900">Gerenciar Produtos</h1>

                <div className='flex flex-col md:flex-row md:items-center gap-3'>
                    <button onClick={() => openAddProdutoModal()} className='btnPadrao !text-sm gap-1'>
                        <MdAdd className='text-2xl text-emerald-50' />
                        Novo Produto
                    </button>
                    <form onSubmit={envioForm} className='flex items-center gap-2'>
                        <div className='flex items-center bg-white border-2 border-emerald-600 rounded-md  w-full'>
                            <input
                                type="text"
                                className='p-[6px] outline-none rounded-md  w-full'
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                            />
                            <button className="p-1" type="submit">
                                <IoSearch className="text-emerald-700 text-2xl cursor-pointer" />
                            </button>
                        </div>
                    </form>
                </div>
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

                                <Link to={`/produto/${produto._id}`}>

                                    <div className='flex flex-col justify-center items-center'>
                                        {produto.images[0] && (
                                            <img
                                                src={api + produto.images[0]}
                                                alt={produto.nome}
                                                className="w-20 h-20 object-cover"
                                            />
                                        )}
                                        <p><strong>Preço: </strong>{formatarPreco(produto.precoPrazo)}</p>
                                    </div>
                                </Link>

                                <div className='flex flex-col gap-1 justify-center'>
                                    <p><strong>Categoria: </strong>{produto.categoria}</p>
                                    <p><strong>Marca: </strong>{produto.marca}</p>
                                    <p>
                                        <strong>Estoque: </strong>
                                        <span className={`${produto.estoque >= 11 ? 'text-emerald-600' : 'text-red-600'}`}>
                                            {produto.estoque}
                                        </span>
                                    </p>
                                    <p>
                                        <strong>Status: </strong>
                                        <span className={`${produto.status === 'ativo' ? 'text-emerald-600' : 'text-yellow-600'}`}>
                                            {produto.status}
                                        </span>
                                    </p>
                                </div>

                                <div className='flex items-center justify-center gap-4'>
                                    <button className='flex gap-1 btnPadrao !text-sm' onClick={() => openEstoqueModal(produto)}>
                                        <MdAdd className='text-2xl text-emerald-50' />
                                        Estoque
                                    </button>

                                    <button onClick={() => openEditarProdutoModal(produto)} className='p-2 bg-cyan-600 hover:bg-cyan-700 duration-200 text-white rounded'>
                                        <AiOutlineEdit size={20} />
                                    </button>
                                    <button
                                        onClick={() => openDesativarProdutoModal(produto)}
                                        className='p-2 bg-yellow-500 hover:bg-yellow-600 duration-200 text-white rounded'

                                    >
                                        <FaExchangeAlt size={20} />
                                    </button>
                                </div>
                            </div>
                        ))}

                        <div className="flex p-3 items-center border-b gap-2 w-full justify-center">
                            <button
                                className='cursor-pointer'
                                onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
                                disabled={currentPage === 1}
                            >
                                <FaChevronLeft size={18} />
                            </button>
                            <span>Página {currentPage} de {totalPages}</span>
                            <button
                                className='cursor-pointer'
                                onClick={() => setCurrentPage((prev) => prev + 1)}
                                disabled={currentPage === totalPages}
                            >
                                <FaChevronRight size={18} />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            {modalAddProduto && (
                <Modal setEstado={setModalAddProduto} titulo='Cadastrar novo produto' largura='max-w-5xl' >
                    <ProductUpload atualizarProdutos={fetchProdutos} setEstadoModal={setModalAddProduto} />
                </Modal>
            )}

            {modalEstoque && (
                <Modal setEstado={setModalEstoque} titulo='Adicionar no estoque' largura='max-w-lg' >
                    <AdicionarEstoque
                        produto={produtoSelecionado}
                        atualizarProdutos={fetchProdutos}
                        setEstadoModal={setModalEstoque} />
                </Modal>
            )}

            {modalEditarProduto && (
                <Modal setEstado={setModalEditarProduto} titulo='Editar dados do produto' largura='max-w-5xl' >
                    <AtualizarProduto
                        formData={produtoSelecionado}
                        setFormData={setProdutoSelecionado}
                        atualizarProdutos={fetchProdutos}
                        setEstadoModal={setModalEditarProduto} />
                </Modal>
            )}

            {modalDesativarProduto && (
                <Modal setEstado={setModalDesativarProduto} titulo='Trocar Status do produto?' largura='max-w-xl' >
                    <TrocarStatusProduto
                        produto={produtoSelecionado}
                        atualizarProdutos={fetchProdutos}
                        setEstadoModal={setModalDesativarProduto} />
                </Modal>
            )}

            <ToastContainer autoClose={3000} />
        </div>
    );
};

export default AdminProdutos;
