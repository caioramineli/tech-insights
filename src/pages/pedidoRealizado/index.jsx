import { FaCheckCircle, FaClock } from "react-icons/fa";
import qrCodePix from "../../assets/qrcode-pix.png"
import { useState } from "react";

export default function PedidoRealizado() {
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
        <div className="flex flex-col gap-6 mt-8 mb-8">
            <div className='flex items-center gap-4 m-auto'>
                <FaCheckCircle className="text-4xl text-emerald-600" />
                <div className="flex flex-col gap-1">
                    <h1 className="text-emerald-600 font-bold text-base sm:text-xl md:text-3xl uppercase">Pedido Realizado com sucesso!</h1>
                    <h2 className="text-zinc-600 font-bold text-sm sm:text-lg md:text-2xl uppercase">Agora é só realizar o pagamento</h2>
                </div>
            </div>
            <div className="flex gap-8">
                <div className="flex flex-col gap-4">
                    <img src={qrCodePix} alt="qr-code" className="w-64 bsPadrao rounded-md" />
                    <button onClick={handleCopy} className="p-2">
                        <span className="text-cyan-600 hover:text-cyan-700 duration-200 font-bold text-2xl">{copied ? 'Copiado!' : 'Copiar Código PIX'}</span>
                    </button>
                </div>
                <div className="flex flex-col gap-6 max-w-[420px]">
                    <div className="flex items-center gap-4 p-4 bg-cyan-100 bsPadrao rounded-md">
                        <FaClock className="text-2xl text-cyan-600" />
                        <span className="text-lg text-cyan-600 font-semibold">Esse código tem validade de 12 horas!</span>
                    </div>
                    <div className="flex flex-col p-6 gap-1 items-center bg-white bsPadrao rounded-md">
                        <span>O número do seu pedido é:</span>
                        <span className="font-bold text-3xl">457989786</span>
                    </div>
                    <p className="text-zinc-700 text-sm p-1">Escaneie o QR Code ou copie o código PIX. Abra o APP da instituição que você possui o PIX cadastrado e realize o pagamento.</p>
                </div>
            </div>
        </div>
    );
} 