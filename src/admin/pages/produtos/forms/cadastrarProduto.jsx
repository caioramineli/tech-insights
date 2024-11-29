import "../style.css";
import React, { useState, useRef, useContext } from "react";
import axios from "axios";
import { AuthContext } from '../../../../contexts/AuthContext';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import InputModerno from "../../../../components/InputModerno";
import SelectModerno from "../../../../components/SelectModerno";
import categorias from "../categorias";
import TextAreaModerno from "../../../../components/TextAreaModerno";
import DataList from "../dataListMarcas";
import Loading from "../../../../components/Loading";

const ProductUpload = ({ atualizarProdutos, setEstadoModal }) => {
    const { token } = useContext(AuthContext);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const [formData, setFormData] = useState({
        nome: "",
        precoPrazo: "",
        preco: "",
        descricao: "",
        especificacoes: "",
        marca: "",
        categoria: "",
        images: []
    });

    const [previews, setPreviews] = useState([]);
    const fileInputRef = useRef(null);
    const api = process.env.REACT_APP_API_URL;

    const notifySuccess = () => toast.success("Cadastro realizado com sucesso!");
    const notifyError = (message) => toast.error(message);

    function closeModal() {
        setEstadoModal(false);
        document.body.style.overflow = 'auto';
    }

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    const handleFileChange = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 5) {
            notifyError("Selecione até 5 imagens");
            fileInputRef.current.value = null;
            return;
        }

        setFormData({
            ...formData,
            images: files,
        });

        let tmp = [];
        for (let i = 0; i < files.length; i++) {
            tmp.push(URL.createObjectURL(files[i]));
        }
        setPreviews(tmp);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);
        const form = new FormData();

        for (const key in formData) {
            if (key === "images") {
                for (let i = 0; i < formData.images.length; i++) {
                    form.append("images", formData.images[i]);
                }
            } else {
                form.append(key, formData[key]);
            }
        }

        try {
            await axios.post(api + "criar-produto", form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                    'Authorization': `Bearer ${token}`,
                },
            });
            setFormData({
                nome: "",
                precoPrazo: "",
                preco: "",
                descricao: "",
                especificacoes: "",
                marca: "",
                categoria: "",
                estoque: "",
                images: []
            });
            setPreviews([]);
            if (fileInputRef.current) {
                fileInputRef.current.value = null;
            }
            notifySuccess();
            closeModal();
            atualizarProdutos();
        } catch (error) {
            const erro = error.response?.data?.msg || "Erro ao cadastrar o produto.";
            notifyError(erro);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <form className="p-1 grid sm:grid-cols-2 gap-3" onSubmit={handleSubmit}>

            <InputModerno
                name="nome"
                type="text"
                placeholder="RTX 4080"
                value={formData.nome}
                onChange={handleChange}
                label="Nome do produto"
                required
            />
            <InputModerno
                name="precoPrazo"
                type="number"
                placeholder="R$ 150,00"
                value={formData.precoPrazo}
                onChange={handleChange}
                label="Preço à prazo"
                min='1'
            />

            <TextAreaModerno
                name="descricao"
                value={formData.descricao}
                onChange={handleChange}
                placeholder="Placa de Vídeo NVIDIA GeForce RTX"
                label="Descrição"
                required
                className="custom-class"
                height="h-28"
            />

            <TextAreaModerno
                name="especificacoes"
                value={formData.especificacoes}
                onChange={handleChange}
                placeholder="PCI Express Gen 4"
                label="Especificações"
                required
                className="custom-class"
                height="h-28"
            />

            <div>
                <InputModerno
                    name="marca"
                    type="text"
                    placeholder="Asus"
                    value={formData.marca}
                    onChange={handleChange}
                    label="Marca"
                    required
                    list="my-list"
                />

                <DataList id="marca-list" />
            </div>

            <SelectModerno
                name="categoria"
                value={formData.categoria}
                onChange={handleChange}
                label="Categoria"
                bgLabel="white"
                options={categorias.map((categoria) => ({
                    key: categoria.value,
                    value: categoria.value,
                    label: categoria.label,
                }))}
            />

            <div className="boxInputImgs mt-2">
                <input
                    type="file"
                    name="images"
                    multiple
                    accept="image/*"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                    required
                />
            </div>

            <div className="flex items-center -mt-3">
                {isSubmitting ? (
                    <div className='flex justify-center h-[2.5rem] items-center'>
                        <Loading />
                    </div>
                ) : (
                    <button className="btnPadrao !py-[10px] w-full">
                        Cadastrar
                    </button>
                )}
            </div>

            {previews.length > 0 && (
                <div className="flex flex-col gap-2">
                    <h3>Pré-visualização das Imagens</h3>
                    <div className="flex gap-4">
                        {previews.map((pic, index) => (
                            <img key={index} src={pic} className="w-32" alt={`preview-${index}`} />
                        ))}
                    </div>
                </div>
            )}
        </form>
    );
};

export default ProductUpload;
