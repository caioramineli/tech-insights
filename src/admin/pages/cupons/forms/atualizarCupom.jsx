import { useContext, useState } from "react";
import InputModerno from "../../../../components/InputModerno";
import Loading from "../../../../components/Loading";
import SelectModerno from "../../../../components/SelectModerno";
import { AuthContext } from "../../../../contexts/AuthContext";
import { toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import axios from "axios";
import CloseModal from "../../../../components/CloseModal.jsx";
import BtnCancelar from "../../../../components/BtnCancel/index.jsx";

const FormAtualizarCupom = ({ setEstadoModal, atualizarCupons, formData, setFormData }) => {
    const { token } = useContext(AuthContext);
    const api = process.env.REACT_APP_API_URL;
    const [isSubmitting, setIsSubmitting] = useState(false);

    const notifySuccess = () => toast.success("Cupom atualizado com sucesso!");
    const notifyError = (message) => toast.error(message);
    const closeModal = CloseModal({ setEstadoModal });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            const response = await axios.put(`${api}atualizar-cupom`, formData, {
                headers: { 'Authorization': `Bearer ${token}` },
            });

            notifySuccess(response.data.msg);
            closeModal();
            atualizarCupons();
        } catch (error) {
            const erro = error.response?.data?.msg || "Erro ao atualizar cupom.";
            notifyError(erro);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form method="POST" onSubmit={handleSubmit} className='flex flex-col gap-4'>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                <InputModerno
                    name="codigo"
                    type="text"
                    placeholder="TECH50"
                    value={formData.codigo}
                    onChange={handleChange}
                    label="Código do Cupom"
                    required
                />

                <InputModerno
                    name="descricao"
                    type="text"
                    placeholder="Válido em compras acima de R$ 800,00"
                    value={formData.descricao}
                    onChange={handleChange}
                    label="Descrição"
                    required
                />

                <SelectModerno
                    name="tipo"
                    value={formData.tipo}
                    onChange={handleChange}
                    label="Tipo"
                    options={[
                        { key: "fixo", value: "fixo", label: "Fixo $" },
                        { key: "percentual", value: "percentual", label: "Percentual %" },
                    ]}
                />

                <InputModerno
                    name="valor"
                    type="number"
                    placeholder="R$ 20,00"
                    value={formData.valor}
                    onChange={handleChange}
                    label="Valor"
                    required
                />

                <InputModerno
                    name="valorMinimoDoCarrinho"
                    type="number"
                    placeholder="R$ 1.000,00"
                    value={formData.valorMinimoDoCarrinho}
                    onChange={handleChange}
                    label="Valor mínimo do carrinho"
                    required
                />

                <InputModerno
                    name="quantidade"
                    type="number"
                    placeholder="100"
                    value={formData.quantidade}
                    onChange={handleChange}
                    label="Quantidade de cupons"
                    required
                />

                <InputModerno
                    name="validade"
                    type="date"
                    value={formData.validade?.split('T')[0]}
                    onChange={handleChange}
                    label="Prazo de validade"
                    required
                />
            </div>

            <div>
                {isSubmitting ? (
                    <div className='flex justify-center h-[3.42rem] items-center'>
                        <Loading color="#047857" />
                    </div>
                ) : (
                    <div className='flex justify-end gap-4'>
                        <BtnCancelar onClick={closeModal} />
                        <button className='btnPadrao !px-6' type='submit'>Atualizar</button>
                    </div>
                )}
            </div>
        </form>
    );
};

export default FormAtualizarCupom;
