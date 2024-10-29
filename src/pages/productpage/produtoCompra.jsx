import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { MdShoppingCart } from "react-icons/md";
import { BsCartPlusFill, BsFillCartCheckFill } from "react-icons/bs";
import { FaBarcode, FaRegCreditCard, FaTruck } from "react-icons/fa";
import StarRating from "../../components/StarRating";
import { useCarrinho } from '../../contexts/contex-Cart';
import './produtoCompra.css';
import InputMask from 'react-input-mask';
import { FaLocationDot } from 'react-icons/fa6';
import { IoClose } from 'react-icons/io5';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import FormaPagamento from '../../components/FormaPagamento';
import Favoritar from '../../components/Favoritar';
import InputModerno from '../../components/InputModerno';

export default function Produto({ product, rating, setOpenAccordion }) {
    const api = process.env.REACT_APP_API_URL;
    const images = Object.values(product.images || {});
    const [mainImage, setMainImage] = useState(images[0] || "");

    const { adicionarAoCarrinho, carrinho } = useCarrinho();
    const [iconAdd, setIconAdd] = useState(false);
    const [cep, setCep] = useState("");
    const navigate = useNavigate();

    const notifyError = (text) => toast.error(text);
    const notifyWarning = (text) => toast.warning(text);
    const [isFreteModalOpen, setIsFreteModalOpen] = useState(false);
    const [isFormaPagamentoModalOpen, setIsFormaPagamentoModalOpen] = useState(false);

    function openFreteModal() {
        const cepPuro = cep.replace(/\D/g, '');
        if (cepPuro.length === 8) {
            setIsFreteModalOpen(true);
            document.body.style.overflow = 'hidden';
        } else {
            notifyError("Informe um CEP válido");
        }
    }

    function closeFreteModal() {
        setIsFreteModalOpen(false);
        document.body.style.overflow = 'auto';
    }

    function openFormaPagamentoModal() {
        setIsFormaPagamentoModalOpen(true);
        document.body.style.overflow = 'hidden';
    }

    function closeFormaPagamentoModal() {
        setIsFormaPagamentoModalOpen(false);
        document.body.style.overflow = 'auto';
    }

    function openAccordion() {
        setOpenAccordion(true)
    }

    const handleAddCart = () => {
        if (!iconAdd) {
            const produtoExistente = carrinho.find((item) => item._id === product._id);
            const quantidadeAtual = produtoExistente ? produtoExistente.quantidade : 0;

            if (quantidadeAtual >= 10) {
                notifyWarning("Quantidade máxima atingida para este produto.");
                return;
            }

            adicionarAoCarrinho({ ...product, quantidade: 1 });

            setIconAdd(true);
            setTimeout(() => {
                setIconAdd(false);
            }, 1500);
        }
    };

    const handleComprar = () => {
        adicionarAoCarrinho({ ...product, quantidade: 1 });
        navigate('/carrinho');
    };

    function formatarValor(valor) {
        return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    return (
        <>
            <ToastContainer />
            <Favoritar produto={product._id} tamanho='text-2xl' />
            <h2 className='text-zinc-900 text-base md:text-lg lg:text-xl 2xl:text-2xl font-bold'>{product.nome}</h2>
            <section className="containerProdutoInfo">
                <div className="hidden lg:flex flex-col gap-4">
                    {images.map((image, index) => (
                        <img
                            className='w-[66px] border border-black/20 rounded p-[2px]'
                            key={index}
                            src={api + image}
                            alt={`Miniatura ${index + 1}`}
                            onClick={() => setMainImage(image)}
                        />
                    ))}
                </div>

                <div className="block lg:hidden m-auto w-64 sm:w-[350px] z-0">
                    <Swiper modules={[Pagination]} pagination>
                        {images.map((image, index) => (
                            <SwiperSlide key={index}>
                                <img src={api + image} alt={image.alt} />
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                <img className="lg:w-[350px] xl:w-[380px] 2xl:[420px] m-auto hidden lg:block" src={api + mainImage} alt="Produto principal" />

                <section className="containerDireitaProduto">
                    <div className='flex items-center w-full justify-between'>
                        <div className="marcaProduto">
                            <h2 className='text-lg sm:text-xl font-bold'>Marca:</h2>
                            <img src={`${api}imgs/${product.marca}.jpg`} alt="marca" />
                        </div>
                        <a href="#avalicao">
                            <div onClick={openAccordion}>
                                <StarRating rating={rating} />
                            </div>
                        </a>
                    </div>

                    <p id="disponi">Produto Disponível</p>

                    <div className="containerPagVista">
                        <FaBarcode />
                        <div className="valorVista">
                            <h3 className='sm:text-base md:text-lg lg:text-xl xl:text-[1.4rem] text-emerald-700 font-bold'>{formatarValor(product.preco)}</h3>
                            <p className='text-sm sm:text-base'>à vista com 10% de desconto no boleto ou pix</p>
                        </div>
                    </div>

                    <div className="containerPagPrazo">
                        <FaRegCreditCard />
                        <div className="valorPrazo">
                            <h3 className='md:text-base lg:text-lg xl:text-xl font-bold'>{formatarValor(product.precoPrazo)}</h3>
                            <p className='text-sm sm:text-base'>10x de R$ {formatarValor(product.precoPrazo / 10)} sem juros no cartão</p>
                        </div>
                    </div>

                    <button id="btnModalPagamento" onClick={openFormaPagamentoModal}>
                        Ver mais opções de pagamento
                    </button>

                    {isFormaPagamentoModalOpen && (

                        <div className='fixed inset-0 bg-black/60 flex items-center justify-center z-10'>
                            <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-xl p-2 sm:p-4 relative h-[440px] sm:h-[500px] overflow-y-auto">

                                <IoClose onClick={closeFormaPagamentoModal} className="absolute top-2 right-2 text-slate-600 w-8 h-8 cursor-pointer" />

                                <FormaPagamento valorPrazo={product.precoPrazo} valor={product.preco} />
                            </div>
                        </div>
                    )}

                    <div className='btnsComprarAddCart'>
                        <button id="btnComprar" onClick={handleComprar}>
                            <MdShoppingCart />
                            Comprar
                        </button>
                        <button id='btnAddCart' onClick={handleAddCart}>
                            {iconAdd ? <BsFillCartCheckFill /> : <BsCartPlusFill />}
                        </button>
                    </div>

                    <div>
                        <h3 className='text-base sm:text-lg font-bold'>Consultar frete e prazo de entrega</h3>
                        <div className="flex gap-2 mt-3">
                            <InputModerno
                                name="cep"
                                type="text"
                                placeholder="CEP"
                                value={cep}
                                onChange={(e) => setCep(e.target.value)}
                                label="CEP"
                                mask="99999-999"
                            />
                            <button className="flex items-center gap-2 bg-emerald-600 rounded-md p-2 text-cyan-50 hover:bg-emerald-700" onClick={openFreteModal}>
                                Calcular
                                <FaTruck />
                            </button>
                        </div>
                    </div>

                    {isFreteModalOpen && (
                        <div className='fixed inset-0 bg-black/60 flex items-center justify-center z-10'>
                            <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-xl p-5 relative">

                                <IoClose onClick={closeFreteModal} className="absolute top-2 right-2 text-slate-600 w-8 h-8 cursor-pointer z-10" />

                                <div className='flex flex-col gap-4'>
                                    <div className='flex gap-1 items-center text-xl'>
                                        <FaTruck className='text-emerald-600' />
                                        <h3 className='font-bold'>Frete e Prazo</h3>

                                    </div>

                                    <div className='flex gap-1 items-center text-lg'>
                                        <FaLocationDot className='text-emerald-600' />
                                        <h3 className='font-bold'>CEP {cep}</h3>
                                    </div>

                                    <div className='flex justify-between text-sm sm:text-base'>
                                        <h3 className='font-bold'>Entrega Normal</h3>
                                        <p>R$ 15,00 - até 8 dias úteis</p>
                                    </div>

                                    <div className='flex justify-between text-sm sm:text-base'>
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
