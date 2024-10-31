import { FaRegAddressCard } from "react-icons/fa";
import axios from 'axios';
import { useState, useEffect, useContext } from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Loading from '../../../components/Loading';
import { AuthContext } from '../../../contexts/AuthContext';
import FormDados from "./formDados";
import RedefinirSenha from "./formRedefinirSenha";
import VoltarMinhaConta from "../../../components/VoltarMinhaConta";

const Dados = () => {
    const api = process.env.REACT_APP_API_URL;
    const [userData, setUserData] = useState(null);
    const { user, token } = useContext(AuthContext);

    useEffect(() => {
        const fetchUserData = async () => {
            if (user && token) {
                try {
                    const response = await axios.get(`${api}user/${user.id}`, {
                        headers: {
                            Authorization: `Bearer ${token}`,
                            'Content-Type': 'application/json',
                        },
                    });
                    setUserData(response.data.user);
                } catch (error) {
                    console.error('Erro ao carregar dados do usuário:', error);
                }
            }
        };

        fetchUserData();
    }, [user, token, api]);

    if (!userData) {
        return (
            <div className='flex justify-center'>
                <Loading />
            </div>
        );
    }

    return (
        <div className='flex flex-col w-[90%] xl:w-[80%] max-w-[1300px] min-h-[50vh] !my-6 sm:!my-8 gap-3'>
            <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                    <FaRegAddressCard className='text-emerald-600 text-3xl sm:text-4xl' />
                    <h1 className="font-bold text-zinc-900 text-lg md:text-2xl">Meus Dados</h1>
                </div>
                <VoltarMinhaConta />
            </div>

            {userData && (
                <FormDados reqUserData={userData} user={user} />
            )}
            <ToastContainer />
            <RedefinirSenha user={user} />
        </div>
    );
}

export default Dados;