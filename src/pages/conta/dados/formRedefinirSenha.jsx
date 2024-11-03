import axios from "axios";
import InputPassword from "../../../components/InputPassword";
import Loading from "../../../components/Loading";
import { toast } from 'react-toastify';
import { useState, useContext } from "react";
import { validatePassword } from '../../../components/Validations';
import { AuthContext } from '../../../contexts/AuthContext';


const RedefinirSenha = ({ user }) => {
    const { token } = useContext(AuthContext);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [passwordData, setPasswordData] = useState({
        senha: "",
        novaSenha: "",
        confirmacaoNovaSenha: ""
    });
    const api = process.env.REACT_APP_API_URL;

    const notifySuccess = (message) => toast.success(message);
    const notifyError = (message) => toast.error(message);

    const resertForm = () => {
        setPasswordData({
            senha: "",
            novaSenha: "",
            confirmacaoNovaSenha: ""
        })
    }

    const handleChangePassword = (e) => {
        const { name, value } = e.target;
        setPasswordData({ ...passwordData, [name]: value });
    };

    const handleSubmitPassword = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        if (!validatePassword(passwordData.novaSenha)) {
            notifyError("A senha deve ter pelo menos 6 caracteres.");
            setIsSubmitting(false);
            return;
        }

        if (passwordData.novaSenha !== passwordData.confirmacaoNovaSenha) {
            notifyError("As senhas devem ser iguais!");
            setIsSubmitting(false);
            return;
        }

        try {
            await axios.put(`${api}user/${user.id}/password`, passwordData, { headers: { 'Authorization': `Bearer ${token}` } });
            resertForm()
            notifySuccess("Senha redefinida com sucesso!");
        } catch (error) {
            const erro = error.response?.data?.msg || "Erro ao redefinir a senha.";
            notifyError(erro);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form action="POST" onSubmit={handleSubmitPassword} className="flex flex-col gap-4 bsPadrao p-4 bg-white rounded-md">
            <h1 className="font-semibold text-emerald-600 text-lg">Redefinir Senha</h1>
            <div className="grid md:grid-cols-[1fr_2fr] gap-4">
                <InputPassword
                    name="senha"
                    placeholder={"Insira sua senha"}
                    value={passwordData.senha}
                    event={handleChangePassword}
                    label="Senha Atual"
                    bgLabel="[white]"
                    required
                />
                <div className="grid sm:grid-cols-2 gap-4">
                    <InputPassword
                        name="novaSenha"
                        placeholder={"Insira sua senha"}
                        value={passwordData.novaSenha}
                        event={handleChangePassword}
                        label="Nova senha"
                        bgLabel="[white]"
                        required
                    />
                    <InputPassword
                        name="confirmacaoNovaSenha"
                        placeholder={"Insira sua senha"}
                        value={passwordData.confirmacaoNovaSenha}
                        event={handleChangePassword}
                        label="Confirmar nova senha"
                        bgLabel="[white]"
                        required
                    />
                </div>
            </div>

            {isSubmitting ? (
                <div className='flex justify-center w-full sm:w-64 h-[2.65rem] sm:!ml-auto items-center'>
                    <Loading color="#047857" />
                </div>
            ) : (
                <div className="flex justify-end items-center gap-4 mt-1">
                    <button type="reset" onClick={resertForm} className="w-40 !bg-gray-300 btnPadrao !text-zinc-900">
                        Cancelar
                    </button>
                    <button type="submit" className="w-40 btnPadrao">
                        Redefinir Senha
                    </button>
                </div>
            )}
        </form>
    );
}

export default RedefinirSenha;