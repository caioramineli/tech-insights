import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { IoMdRadioButtonOff, IoMdRadioButtonOn } from 'react-icons/io';
import { FaPencilAlt, FaTrash } from 'react-icons/fa';

const Enderecos = ({ userId }) => {
    const [enderecos, setEnderecos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [toggle, setToggle] = useState(0);

    function updateToglle(id) {
        setToggle(id);
    }

    useEffect(() => {
        const fetchEnderecos = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/user/${userId}/endereco`);
                setEnderecos(response.data.enderecos);
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };

        fetchEnderecos();
    }, [userId]);

    if (loading) {
        return <p>Carregando...</p>;
    }

    return (
        <>
            {enderecos.length > 0 ? (
                <>
                    {enderecos.map((endereco, index) => (
                        <div key={index} onClick={() => updateToglle(index)} className={`border-emerald-600 flex justify-between items-center border px-4 py-2 rounded-md cursor-pointer ${toggle === index ? 'border-emerald-600' : 'border-zinc-300'}`}>
                            <div className="flex items-center gap-4">
                                <IoMdRadioButtonOn className={toggle === index ? 'text-3xl text-emerald-600' : 'hidden'} />
                                <IoMdRadioButtonOff className={toggle !== index ? 'text-3xl' : 'hidden'} />

                                <div className="flex flex-col">
                                    <h3 className="font-bold text-base">{endereco.nome} {index}</h3>
                                    <p className="text-base">{endereco.rua} {endereco.numero}</p>
                                    <p className="text-sm">{endereco.bairro} - {endereco.cidade} - {endereco.estado}, {endereco.cep}</p>
                                </div>
                            </div>
                            <div className="flex gap-4">
                                <button className="flex items-center border border-zinc-300 px-3 py-2 rounded-md gap-2 text-sm">
                                    <FaPencilAlt />
                                    Editar
                                </button>
                                <button className="flex items-center border border-zinc-300 px-3 py-2 rounded-md gap-2 text-sm">
                                    <FaTrash />
                                    Excluir
                                </button>
                            </div>
                        </div>

                    ))}
                </>
            ) : (
                <p>Nenhum endereço encontrado.</p>
            )}
        </>
    );
};

export default Enderecos;
