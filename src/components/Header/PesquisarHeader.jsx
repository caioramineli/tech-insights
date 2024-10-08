import { IoSearch } from "react-icons/io5";
import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function PesquisarHeader({ display = "hidden", responsivo = "md:flex", mb = "" }) {
    const [query, setQuery] = useState('');
    const api = process.env.REACT_APP_API_URL;

    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.get(`${api}products/search?q=${query}`);
            navigate(`/busca?query=${query}`, { state: { results: response.data } });
            setQuery('')
        } catch (error) {
            console.error('Erro ao buscar produtos:', error);
        }
    };

    return (
        <form onSubmit={handleSearch} className={`${display} items-center w-[90%] m-auto bg-cyan-800 p-1 rounded-md ${mb} ${responsivo}`}>
            <input
                className="p-1 border-none w-full bg-transparent outline-0 text-sm md:text-base text-cyan-50"
                type="text"
                placeholder="Pesquisar produtos"
                onChange={(e) => setQuery(e.target.value)}
                value={query}
            />
            <button type="submit">
                <IoSearch className="text-cyan-100 text-2xl cursor-pointer" />
            </button>
        </form>
    );
}
