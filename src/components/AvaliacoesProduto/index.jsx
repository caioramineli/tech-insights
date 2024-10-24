import React, { useRef, useState, useEffect, useCallback, useContext } from "react";
import axios from "axios";
import { format } from 'date-fns';
import StarRating from "../StarRating";
import { PiUserCircleThin } from "react-icons/pi";
import ModalAvaliarProduto from "../ModalAvaliarProduto";
import Loading from "../Loading";
import { MdKeyboardArrowDown } from "react-icons/md";
import { AuthContext } from "../../contexts/AuthContext";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function AvaliacoesProduto({ produto, setNotaMedia, accordion, setOpenAccordion }) {
    const [isModalAvaliarProduto, setIsModalAvaliarProduto] = useState(false);
    const [avaliacoes, setAvaliacoes] = useState([]);
    const [media, setMedia] = useState(0);
    const [loading, setLoading] = useState(true);
    const contentRef = useRef(null);
    const { user } = useContext(AuthContext);
    const api = process.env.REACT_APP_API_URL;

    const notifyError = (message) => toast.error(message);

    const toggleAccordion = () => {
        setOpenAccordion(!accordion);
    };

    function openModalAvaliarProduto() {
        if (user) {
            setIsModalAvaliarProduto(true);
            document.body.style.overflow = 'hidden';
        } else {
            notifyError('Você precisa estar logado para escrever uma avaliação');
        }
    }

    const getAvaliacoes = useCallback(async (callback) => {
        try {
            const response = await axios.get(`${api}avaliacao/${produto._id}`);
            setAvaliacoes(response.data.avaliacoes);

            if (callback) {
                callback();
            }
        } catch (error) {
            if (error.response && error.response.data.msg === 'Nenhuma avaliação encontrada para esse produto!') {
                console.warn(error.response.data.msg);
            } else {
                console.error("Erro ao buscar avaliações:", error);
            }
        } finally {
            setLoading(false);
        }
    }, [api, produto._id]);

    useEffect(() => {
        getAvaliacoes();
    }, [getAvaliacoes]);

    useEffect(() => {
        if (accordion && contentRef.current) {
            contentRef.current.style.height = `${contentRef.current.scrollHeight}px`;
        }
    }, [accordion]);

    useEffect(() => {
        if (avaliacoes.length > 0) {
            const totalNotas = avaliacoes.reduce((total, avaliacao) => total + avaliacao.nota, 0);
            const valorMedia = parseFloat((totalNotas / avaliacoes.length).toFixed(2));
            setMedia(valorMedia);
            setNotaMedia(valorMedia);
        } else {
            setNotaMedia(media);
        }
    }, [avaliacoes, media, setNotaMedia]);

    return (
        <div className='containerEspecificacaoEDescricao' id="avalicao">
            <h2
                className='text-xl text-zinc-900 font-bold cursor-pointer flex justify-between items-center'
                onClick={toggleAccordion}
            >
                Avaliações
                <span className={`transform transition-transform duration-300 ${accordion ? 'rotate-180' : ''}`}>
                    <MdKeyboardArrowDown className='text-4xl text-emerald-600' />
                </span>
            </h2>

            <div
                ref={contentRef}
                className='transition-height duration-300 ease-in-out overflow-hidden'
                style={{ height: accordion ? `${contentRef.current?.scrollHeight}px` : '0px' }}
            >
                {loading ? (
                    <div className='m-auto'>
                        <Loading color='#047857' />
                    </div>
                ) : (
                    <>
                        <div className="flex justify-between items-center my-2">
                            <div>
                                <div className="flex flex-col sm:flex-row sm:items-center gap-1">
                                    <span className="text-[#ffa500] font-bold text-xl"><span className="text-2xl ">{media}</span>/5</span>
                                    <span className="text-[#ffa500] font-bold hidden sm:block sm:text-xl">-</span>
                                    <StarRating rating={media} />
                                </div>
                                <span className="text-base">({avaliacoes.length} Avaliações)</span>
                            </div>
                            <button onClick={openModalAvaliarProduto} className="btnPadrao">Faça uma avaliação</button>
                            {isModalAvaliarProduto && (
                                <ModalAvaliarProduto produto={produto} setEstado={setIsModalAvaliarProduto} listarAvalicoes={getAvaliacoes} />
                            )}
                        </div>

                        {avaliacoes.map((avaliacao, index) => (
                            <div key={index} className="flex flex-col gap-1 my-2">
                                <hr className="my-2" />
                                <div className="flex items-center gap-1 sm:gap-2 mt-1">
                                    <span>
                                        <PiUserCircleThin className="text-4xl sm:text-5xl" />
                                    </span>
                                    <div>
                                        <StarRating rating={avaliacao.nota} />
                                        <span className="text-xs sm:text-sm">
                                            <span className="font-semibold text-base">{avaliacao.user.nome} </span>
                                            ({format(new Date(avaliacao.data), "dd/MM/yyyy HH:mm")})
                                        </span>
                                    </div>
                                </div>
                                <h2 className="text-lg sm:text-xl font-bold text-zinc-900 mt-1">{avaliacao.titulo}</h2>
                                <p>{avaliacao.descricao}</p>
                            </div>
                        ))}
                    </>
                )}
            </div>
        </div>
    );
}
