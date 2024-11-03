import axios from "axios";
import InputModerno from "../InputModerno";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useState } from "react";
import Loading from "../Loading";

const FormEsqueciSenha = ({ email, setEmail, setModal }) => {
    function closeModal() {
        setModal(false);
        document.body.style.overflow = 'auto';
    }
    const api = process.env.REACT_APP_API_URL;
    const [isSubmitting, setIsSubmitting] = useState(false);

    const notifySuccess = (message) => toast.success(message);
    const notifyError = (message) => toast.error(message);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await axios.post(`${api}recuperar-senha`, { email });
            notifySuccess("E-mail enviado com sucesso!");
        } catch (error) {
            notifyError(error.response.data.msg || 'Erro ao enviar o e-mail.');
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form onSubmit={handleSubmit} className="flex flex-col gap-8 mt-2">
            <div className="bg-gray-200 p-4 flex items-center justify-center">
                <p>As instruções para redefinir sua senha serão enviadas para o seu email.</p>
            </div>

            <InputModerno
                name="email"
                type="email"
                placeholder="exemplo@gmail.com"
                value={email}
                onChange={setEmail}
                label="E-mail"
                required
            />

            {isSubmitting ? (
                <div className='flex justify-center h-[2.3rem] sm:h-[2.7rem] items-center'>
                    <Loading color="#047857" size="38" stroke="5" />
                </div>
            ) : (
                <div className="flex justify-between items-center">
                    <button onClick={() => closeModal()} type="button" className="w-36 !bg-gray-300 btnPadrao !text-zinc-900">
                        Cancelar
                    </button>
                    <button type="submit" className="btnPadrao w-36">
                        Enviar
                    </button>
                </div>
            )}
        </form>
    );
}

export { FormEsqueciSenha };