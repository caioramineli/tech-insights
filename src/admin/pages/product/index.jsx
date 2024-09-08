import "./style.css";
import React, { useState, useRef } from "react";
import axios from "axios";
import InputAdmin from "../../components/Input";
import TextAreaAdmin from "../../components/TextArea";
import BtnCadastrar from "../../../components/BtnCadastrar";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const ProductUpload = () => {
    const [formData, setFormData] = useState({
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

    const [previews, setPreviews] = useState([]);
    const fileInputRef = useRef(null);

    const notifySuccess = () => toast.success("Cadastro realizado com sucesso!");
    const notifyError = (message) => toast.error(message);

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
            await axios.post("https://backend-tech-insights.onrender.com/product/create", form, {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            });
            notifySuccess();
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
        } catch (error) {
            const erro = error.response?.data?.msg || "Erro ao cadastrar o produto.";
            notifyError(erro);
        }
    };

    return (
        <section className="cadastroProdutos">
            <ToastContainer />
            <h1>Cadastro de Produto</h1>
            <form className="formCadastroProdutos" onSubmit={handleSubmit}>
                <div className="boxInputs">
                    <InputAdmin label="Nome:" nome="nome" value={formData.nome} func={handleChange} />
                    <InputAdmin label="Preço Prazo:" tipo="number" nome="precoPrazo" value={formData.precoPrazo} func={handleChange} min="1" />
                </div>

                <div className="boxTextArea">
                    <TextAreaAdmin label="Descrição:" nome="descricao" value={formData.descricao} func={handleChange} />
                    <TextAreaAdmin label="Especificações:" nome="especificacoes" value={formData.especificacoes} func={handleChange} />
                </div>

                <div className="boxInputs">
                    <InputAdmin label="Marca:" nome="marca" value={formData.marca} func={handleChange} list="my-list" />
                    <datalist id="my-list">
                        <option value="msi"></option>
                        <option value="gigabyte"></option>
                        <option value="asus"></option>
                        <option value="cooler-master"></option>
                        <option value="kingston"></option>
                        <option value="xpg"></option>
                        <option value="acer"></option>
                        <option value="lg"></option>
                        <option value="redragon"></option>
                    </datalist>

                    <div className="custom-select-container">
                        <label htmlFor="categoria">Selecione uma categoria</label>
                        <select name="categoria" value={formData.categoria} onChange={handleChange}>
                            <option value="">Selecione uma categoria</option>
                            <option value="gpu">Placa de Vídeo</option>
                            <option value="placa-mae">Placa mãe</option>
                            <option value="processador">Processador</option>
                            <option value="memoria-ram">Memoria RAM</option>
                            <option value="fonte">Fonte</option>
                            <option value="gabinete">Gabinete</option>
                            <option value="armazenamento">Armazenamento</option>
                            <option value="cooler">Cooler</option>
                            <option value="mouse">Mouse</option>
                            <option value="teclado">Teclado</option>
                            <option value="fone">HeadSet</option>
                            <option value="redes">Redes</option>
                            <option value="escritorio">Escritório</option>
                            <option value="profissional">Profissional</option>
                            <option value="gamer">Gamer</option>
                            <option value="kit-upgrade">Kit Upgrade</option>
                            <option value="notebook">Notebook</option>
                            <option value="monitor">Monitor</option>
                        </select>
                    </div>
                </div>

                <div className="containerInputImgBtn">
                    <div className="boxInputImgs">
                        <label>Imagens:</label>
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
                    <BtnCadastrar />
                </div>

                {previews.length > 0 && (
                    <>
                        <h3>Pré-visualização das Imagens</h3>
                        <div className="containerImgs">
                            {previews.map((pic, index) => (
                                <img key={index} src={pic} alt={`preview-${index}`} />
                            ))}
                        </div>
                    </>
                )}
            </form>
        </section>
    );
};

export default ProductUpload;
