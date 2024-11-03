import axios from "axios";
import { useContext, useState, useEffect } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { AuthContext } from "../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";

const Favoritar = ({ produto, tamanho = 'text-xl' }) => {
    const [fav, setFav] = useState(false);
    const api = process.env.REACT_APP_API_URL;
    const { user, token, favoritos, updateFavoritos } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        if (favoritos.includes(produto)) {
            setFav(true);
        }
    }, [favoritos, produto]);

    const toggleFavorite = async () => {
        if (user) {
            setFav((prev) => !prev);
            try {
                await axios.post(
                    `${api}user/${user.id}/favorito/${produto}`,
                    {},
                    {
                        headers: {
                            'Authorization': `Bearer ${token}`
                        }
                    }
                );
                updateFavoritos(user.id);
            } catch (error) {
                console.log(error);
            }
        } else {
            navigate('/login');
        }
    };

    return (
        <button
            className="absolute top-0 right-0 p-2"
            onClick={(e) => {
                toggleFavorite();
                e.stopPropagation();
                e.preventDefault();
            }}
        >
            <FaRegHeart className={!fav ? `text-zinc-600 text-lg sm:${tamanho} hover:text-red-700 duration-200` : 'hidden'} />
            <FaHeart className={fav ? `text-red-700 text-lg sm:${tamanho}` : 'hidden'} />
        </button>
    );
};

export default Favoritar;
