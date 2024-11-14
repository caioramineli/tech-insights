import { IoSearch } from "react-icons/io5";
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function PesquisarHeader({ display = "hidden", responsivo = "md:flex", mb = "" }) {
    const [query, setQuery] = useState('');

    const navigate = useNavigate();

    const handleSearch = async (e) => {
        e.preventDefault();
        navigate(`/busca?query=${query}`);
        setQuery('')
    };

    return (
        <>
            <form onSubmit={handleSearch} className={`${display} items-center w-[90%] m-auto bg-cyan-800 p-1 rounded-md ${mb} ${responsivo}`}>
                <input
                    className="p-1 border-none w-full bg-transparent outline-0 text-base text-cyan-50"
                    type="text"
                    placeholder="Pesquisar produtos"
                    onChange={(e) => setQuery(e.target.value)}
                    value={query}
                />
                <button className="p-1" type="submit">
                    <IoSearch className="text-cyan-100 text-2xl cursor-pointer" />
                </button>
            </form>
        </>
    );
}
