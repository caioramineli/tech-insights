import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdAddShoppingCart, MdShoppingCart } from "react-icons/md";
import { FaBarcode, FaRegCreditCard, FaTruck } from "react-icons/fa";
import StarsCod from "../../components/EstrelasCodigo";
import { useCarrinho } from '../../contexts/contex-Cart';
import './produtoCompra.css';
import InputMask from 'react-input-mask';
import { FaLocationDot } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Produto({ product }) {
    const api = "https://backend-tech-insights.onrender.com/";
    const images = Object.values(product.images || {});
    const [mainImage, setMainImage] = useState(images[0] || "");
    const { adicionarAoCarrinho } = useCarrinho();
    const [cep, setCep] = useState("");
    const navigate = useNavigate();

    const notifyError = (text) => toast.error(text);

    const [isFreteModalOpen, setIsFreteModalOpen] = useState(false);

    function openFreteModal() {
        const cepPuro = cep.replace(/\D/g, '');
        if (cepPuro.length === 8) {
            setIsFreteModalOpen(true);
        } else {
            notifyError("Informe um CEP válido")
        }
    }

    function closeFreteModal() {
        setIsFreteModalOpen(false);
    }

    const handleComprar = () => {
        adicionarAoCarrinho({ ...product, quantidade: 1 });
        navigate('/carrinho');
    };

    const handleAddCart = () => {
        adicionarAoCarrinho({ ...product, quantidade: 1 });
    };

    function formatarValor(valor) {
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    return (
        <>
            <ToastContainer />
            <h2 className='text-2xl font-bold'>{product.nome}</h2>
            <section className="containerProdutoInfo">
                <div className="containerImgsProduto">
                    {images.map((image, index) => (
                        <img
                            key={index}
                            src={api + image}
                            alt={`Miniatura ${index + 1}`}
                            onClick={() => setMainImage(image)}
                        />
                    ))}
                </div>

                <img className="imgPrincipal" src={api + mainImage} alt="Produto principal" />

                <section className="containerDireitaProduto">
                    <div className="marcaProduto">
                        <h2 className='text-xl font-bold'>Marca:</h2>
                        <p>{product.marca}</p>
                    </div>

                    <StarsCod />

                    <p id="disponi">Produto Disponível</p>

                    <div className="containerPagVista">
                        <FaBarcode />
                        <div className="valorVista">
                            <h3 className='text-xl font-bold'>{formatarValor(product.preco)}</h3>
                            <p>à vista com 10% de desconto no boleto ou pix</p>
                        </div>
                    </div>

                    <div className="containerPagPrazo">
                        <FaRegCreditCard />
                        <div className="valorPrazo">
                            <h3 className='text-lg font-bold'>{formatarValor(product.precoPrazo)}</h3>
                            <p>10x de R$ {formatarValor(product.precoPrazo / 10)} sem juros no cartão</p>
                        </div>
                    </div>

                    <button id="btnModalPagamento">Ver mais opções de pagamento</button>
                    <div className='btnsComprarAddCart'>
                        <button id="btnComprar" onClick={handleComprar}>
                            <MdShoppingCart />Comprar
                        </button>
                        <button id='btnAddCart' onClick={handleAddCart}>
                            <MdAddShoppingCart />
                        </button>
                    </div>

                    <h3 className='text-lg font-bold'>Consultar frete e prazo de entrega</h3>
                    <div className="flex gap-2">
                        <InputMask
                            mask="99999-999"
                            value={cep}
                            onChange={(e) => setCep(e.target.value)}
                        >
                            {() => (
                                <input
                                    className="border border-zinc-400 rounded-md px-2 w-full outline-none focus:border-cyan-700"
                                    name="cep"
                                    type="text"
                                    placeholder="12345-678"
                                />
                            )}
                        </InputMask>
                        <button className="flex items-center gap-2 bg-teal-600 rounded-md p-2 text-cyan-50 hover:bg-teal-700" onClick={openFreteModal}>
                            Calcular
                            <FaTruck />
                        </button>
                    </div>

                    {isFreteModalOpen && (
                        <div className='fixed inset-0 bg-black/60 flex items-center justify-center'>
                            <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-xl p-5 relative">

                                <IoClose onClick={closeFreteModal} className="absolute top-2 right-2 text-slate-600 w-8 h-8 cursor-pointer" />

                                <div className='flex flex-col gap-4'>
                                    <div className='flex gap-1 items-center text-xl'>
                                        <FaTruck className='text-teal-600' />
                                        <h3 className='font-bold'>Frete e Prazo</h3>

                                    </div>

                                    <div className='flex gap-1 items-center text-lg'>
                                        <FaLocationDot className='text-teal-600' />
                                        <h3 className='font-bold'>CEP {cep}</h3>
                                    </div>

                                    <div className='flex justify-between'>
                                        <h3 className='font-bold'>Entrega Normal</h3>
                                        <p>R$ 15,00 - até 8 dias úteis</p>
                                    </div>

                                    <div className='flex justify-between'>
                                        <h3 className='font-bold'>Entrega Expressa</h3>
                                        <p>R$ 30,00 - até 5 dias úteis</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                </section>
            </section>
        </>
    );
}
