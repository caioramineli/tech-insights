import { FaClock } from "react-icons/fa";
import qrCodePix from "../../assets/qrcode-pix.png"
import { useState } from "react";
import { Link } from "react-router-dom";

export default function Pix({ numeroPedido }) {
    const [copied, setCopied] = useState(false);
    const codigoPix = '00020126400014BR.GOV.BCB.PIX0118caiohfr1@gmail.com5204000053039865802BR5913Tech Insights6007anhumas62160512orderPayment630496DE'

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(codigoPix);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (error) {
            console.error('Erro ao copiar código PIX:', error);
        }
    };

    return (
        <div className="flex flex-col sm:flex-row gap-8 m-auto">
            <div className="flex flex-col gap-4 items-center">
                <img src={qrCodePix} alt="qr-code" className="w-[17rem] bsPadrao rounded-md" />
                <button onClick={handleCopy} className="p-2">
                    <span className="text-cyan-600 hover:text-cyan-700 duration-200 font-bold text-xl sm:text-2xl">{copied ? 'Copiado!' : 'Copiar Código PIX'}</span>
                </button>
            </div>

            <div className="flex flex-col gap-4 w-[90%] sm:w-[70%] md:max-w-[420px] mx-auto">
                <div className="flex items-center justify-center gap-4 p-4 bg-cyan-100 bsPadrao rounded-md">
                    <FaClock className="text-2xl text-cyan-600" />
                    <span className="text-base md:text-lg text-cyan-600 font-semibold">Esse código tem validade de 12 horas!</span>
                </div>
                <div className="flex flex-col p-6 gap-1 items-center bg-white bsPadrao rounded-md">
                    <span className="text-zinc-700">O número do seu pedido é:</span>
                    <span className="font-bold text-lg sm:text-xl md:text-3xl text-zinc-800">{numeroPedido}</span>
                </div>
                <p className="text-zinc-700 text-sm p-1">Escaneie o QR Code ou copie o código PIX. Abra o APP da instituição que você possui o PIX cadastrado e realize o pagamento.</p>
                <Link className="w-full" to={`/minha-conta/pedidos`}><button className="btnPadrao !w-full">Clique para ver seus pedidos</button></Link>
            </div>
        </div>
    );
} 