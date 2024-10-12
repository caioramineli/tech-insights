import { MdAccessible } from "react-icons/md";
import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { AuthContext } from '../../../contexts/AuthContext';

export default function Pedido({ pedido }) {
    const [pedidos, setPedidos] = useState([]);
    const { user } = useContext(AuthContext)
    const [loading, setLoading] = useState(true);
    const api = process.env.REACT_APP_API_URL;


    useEffect(() => {
        const fetchPedidos = async () => {
            try {
                const response = await axios.get(`${api}user/${user.id}/orders`);
                setPedidos(response.data);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            fetchPedidos();
        }
    }, [user, api]);

    return (
        <h1>tela pedido</h1>
        
    )
}