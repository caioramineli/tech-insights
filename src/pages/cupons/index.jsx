import { MdDiscount } from "react-icons/md";
import { FaRegCopy, FaCheck } from "react-icons/fa6";
import { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../components/Loading";
import { TbRuler3 } from "react-icons/tb";

export default function PaginaCupons() {
    const [cupons, setCupons] = useState([]);
    const [loading, setLoading] = useState(TbRuler3);
    const api = process.env.REACT_APP_API_URL;
    const [copiedCode, setCopiedCode] = useState(null);

    const handleCopy = (codigo) => {
        navigator.clipboard.writeText(codigo);
        setCopiedCode(codigo);
        setTimeout(() => setCopiedCode(null), 2000);
    };

    useEffect(() => {
        const buscarCupons = async () => {
            try {
                const response = await axios.get(`${api}cupon/listar`);
                setCupons(response.data.cupons);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };
        buscarCupons();
    }, [api]);

    if (loading) {
        return <Loading />;
    }

    return (
        <div className="flex flex-col gap-4 w-[90%] xl:w-4/5 m-auto max-w-[1300px] my-8">
            <div className="flex items-center gap-2">
                <MdDiscount className="text-2xl text-emerald-600" />
                <h1 className="text-2xl font-bold text-zinc-900">Cupons Ativos</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {cupons.map((cupon) => (
                    <div className="flex flex-col gap-1 p-4 bg-emerald-700 rounded-lg shadow-md duration-200 hover:scale-[1.02]" key={cupon.codigo}>
                        <h1 className="text-xl text-emerald-50 font-bold">
                            {cupon.tipo === "percentual" ? `${cupon.valor}% OFF` : `R$ ${cupon.valor} OFF`}
                        </h1>
                        <p className="text-base sm:text-lg text-emerald-50">{cupon.descricao}</p>
                        <hr className="border-dashed border my-2" />
                        <button onClick={() => handleCopy(cupon.codigo)} className="text-lg sm:text-xl p-2 font-bold bg-white rounded-md relative text-zinc-900">
                            {cupon.codigo}
                            {copiedCode === cupon.codigo ? (
                                <FaCheck className="absolute top-1 right-1 text-zinc-900 text-base" />
                            ) : (
                                <FaRegCopy className="absolute top-1 right-1 text-zinc-900 text-base" />
                            )}
                        </button>
                    </div>
                ))}
            </div>
        </div>
    )
}
