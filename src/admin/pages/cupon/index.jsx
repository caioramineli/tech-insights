import axios from 'axios';
import { useState } from 'react';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../../components/Loading';
import { ToastContainer, toast } from 'react-toastify';

const AdminCuponPage = () => {
    const [formData, setFormData] = useState({
        codigo: "",
        descricao: "",
        tipo: "",
        valor: "",
        valorMinimoDoCarrinho: "",
        quantidade: "",
        validade: ""
    });

    const api = process.env.REACT_APP_API_URL;
    const [isSubmitting, setIsSubmitting] = useState(false);

    const notifySuccess = () => toast.success("Cupom cadastrado com sucesso!");
    const notifyError = (message) => toast.error(message);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            await axios.post(`${api}cupon/create`, formData);

            setFormData({
                codigo: "",
                descricao: "",
                tipo: "",
                valor: "",
                valorMinimoDoCarrinho: "",
                quantidade: "",
                validade: ""
            });

            notifySuccess();
        } catch (error) {
            const erro = error.response?.data?.msg || "Erro ao realizar o cadastro.";
            notifyError(erro);
        } finally {
            setIsSubmitting(false);
        }
    };
    return (
        <>
            <ToastContainer />
            <h1 className='text-xl mb-2'>Cadastar um novo Cupom de desconto</h1>
            <form method="POST" onSubmit={handleSubmit} className='flex flex-col gap-4'>
                <div className='grid grid-cols-3 gap-4'>
                    <div className='divInputModerno'>
                        <input
                            name="codigo"
                            type="text"
                            placeholder="TECH50"
                            value={formData.codigo}
                            onChange={handleChange}
                            required
                        />
                        <label className='!bg-slate-100'>
                            Codigo do Cupom
                        </label>
                    </div>

                    <div className='divInputModerno'>
                        <input
                            name="descricao"
                            type="text"
                            placeholder="Válido em compras acima de R$ 800,00"
                            value={formData.descricao}
                            onChange={handleChange}
                            required
                        />
                        <label className='!bg-slate-100'>
                            Descrição
                        </label>
                    </div>
                </div>

                <div className="grid grid-cols-3 gap-4">
                    <div className='flex flex-col'>
                        <select name="tipo" value={formData.tipo} onChange={handleChange} className='!bg-slate-100'>
                            <option value="">Selecione uma categoria</option>
                            <option value="percentual">Percentual %</option>
                            <option value="fixo">Fixo $</option>
                        </select>
                    </div>

                    <div className="divInputModerno">
                        <input
                            name="valor"
                            type="number"
                            placeholder="R$ 20,00"
                            value={formData.valor}
                            onChange={handleChange}
                            required
                        />
                        <label className='!bg-slate-100'>
                            Valor
                        </label>
                    </div>
                    <div className="divInputModerno">
                        <input
                            name="valorMinimoDoCarrinho"
                            type="number"
                            placeholder="R$ 1.000,00"
                            value={formData.valorMinimoDoCarrinho}
                            onChange={handleChange}
                            required
                        />
                        <label className='!bg-slate-100'>
                            Valor mínimo do carrinho
                        </label>
                    </div>
                    <div className="divInputModerno">
                        <input
                            name="quantidade"
                            type="number"
                            placeholder="100"
                            value={formData.quantidade}
                            onChange={handleChange}
                            required
                        />
                        <label className='!bg-slate-100'>
                            Quantidade de cupons
                        </label>
                    </div>
                    <div className="divInputModerno">
                        <input
                            name="estado"
                            type="date"
                            placeholder="SP"
                            value={formData.data}
                            onChange={handleChange}
                            required
                        />
                        <label className='!bg-slate-100'>
                            Prazo de validade
                        </label>
                    </div>
                </div>

                <div>
                    {isSubmitting ? (
                        <div className='flex justify-center h-[3.42rem] items-center'>
                            <Loading color="#047857" />
                        </div>
                    ) : (
                        <div className='flex justify-end gap-4'>
                            <button type="reset" className='bg-gray-300 rounded-md py-2 px-6'>Cancelar</button>
                            <button className='bg-emerald-600 rounded-md py-2 px-6 font-bold text-emerald-50' type='subimit'>Salvar</button>
                        </div>
                    )}
                </div>
            </form>
            <hr />
        </>
    );
}

export default AdminCuponPage;