import { IoClose } from "react-icons/io5";
import { useContext, useState } from "react";
import { GoStar, GoStarFill } from "react-icons/go";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import Loading from "../Loading";

const ModalAvaliarProduto = ({ produto, setEstado, listarAvalicoes }) => {
    const api = process.env.REACT_APP_API_URL;
    const [rating, setRating] = useState(0)
    const [hover, setHover] = useState(null)
    const { user } = useContext(AuthContext)
    const [formData, setFormData] = useState({
        nota: 0,
        titulo: '',
        descricao: '',
        userId: user.id,
        userName: user.nome,
        userEmail: user.email,
        idProduto: produto._id
    });
    const [isSubmitting, setIsSubmitting] = useState(false);

    function closeModalAvaliarProduto() {
        setEstado(false)
        document.body.style.overflow = 'auto';
    }

    const notifySuccess = () => toast.success("Avaliação realizada com sucesso!");
    const notifyError = (message) => toast.error(message);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        formData.nota = rating
        e.preventDefault();
        setIsSubmitting(true);
        if (rating === 0) {
            notifyError('Selecione uma nota!');
            setIsSubmitting(false);
            return
        }

        try {
            await axios.post(`${api}avaliacao/create`, formData);

            setFormData({
                nota: 0,
                titulo: '',
                descricao: '',
            });
            closeModalAvaliarProduto();
            listarAvalicoes();
            notifySuccess();
        } catch (error) {
            const erro = error.response?.data?.msg || "Erro ao realizar a avaliação.";
            notifyError(erro);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className='fixed inset-0 bg-black/60 flex items-center justify-center z-10'>
            <div className="bg-white rounded-lg shadow-lg w-11/12 max-w-2xl p-5 relative flex flex-col gap-2">

                <IoClose onClick={closeModalAvaliarProduto} className="absolute top-2 right-2 text-slate-600 hover:text-slate-500 duration-200 w-8 h-8 cursor-pointer z-10" />

                <h2 className="text-lg sm:text-xl font-bold text-zinc-900">O que você achou do produto?</h2>

                <div className="flex items-center gap-2">
                    <img className="w-20" src={api + produto.images[0]} alt="img-produto" />
                    <h3 className="text-base sm:text-lg font-semibold text-zinc-900">{produto.nome}</h3>
                </div>

                <hr />

                <form method="POST" onSubmit={handleSubmit} className="flex flex-col gap-4 sm:gap-5">
                    <div className="flex flex-col justify-center gap-1">
                        <h4>Qual nota você dá para o produto?</h4>

                        <div className="flex items-center">
                            {[...Array(5)].map((star, index) => {
                                const currentRating = index + 1;
                                return (
                                    <label key={currentRating}>
                                        <input
                                            type="radio"
                                            name="rating"
                                            value={currentRating}
                                            onClick={() => setRating(currentRating)}
                                            onChange={handleChange}
                                            className="hidden"
                                        />
                                        {currentRating <= (hover || rating) ? (
                                            <GoStarFill
                                                className='mr-1 cursor-pointer'
                                                size={25}
                                                color="#ffa500"
                                                onMouseEnter={() => setHover(currentRating)}
                                                onMouseLeave={() => setHover(null)}
                                            />
                                        ) : (
                                            <GoStar
                                                className='mr-1 cursor-pointer'
                                                size={25}
                                                color="#ffa500"
                                                onMouseEnter={() => setHover(currentRating)}
                                                onMouseLeave={() => setHover(null)}
                                            />
                                        )}
                                    </label>
                                );
                            })}
                            <p>({rating})</p>
                        </div>
                    </div>

                    <div className="divInputModerno">
                        <input
                            name="titulo"
                            type="text"
                            placeholder="Gostei muito"
                            value={formData.titulo}
                            onChange={handleChange}
                            required
                        />
                        <label>
                            Título da avaliação
                        </label>
                    </div>

                    <div className="divInputModerno mt-1">
                        <textarea
                            name="descricao"
                            type="text"
                            placeholder="Entrega foi rapida, o produto é bom, atendeu minhas expectativas."
                            value={formData.descricao}
                            onChange={handleChange}
                            required
                            className="h-24 resize-none"
                        />
                        <label className="textarea-label-moderno" >
                            Escreva sua avaliação
                        </label>
                    </div>

                    {isSubmitting ? (
                        <div className='flex justify-center h-[2.7rem] items-center'>
                            <Loading color="#047857" />
                        </div>
                    ) : (
                        <button type="submit" className="btnPadrao">Avaliar Produto</button>
                    )}
                </form>
            </div>
        </div>
    );
}

export default ModalAvaliarProduto;