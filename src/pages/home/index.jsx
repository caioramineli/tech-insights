import "./style.css"
import Produto from "./Produto"
import Slider from "./slider";

export default function Home() {
    const produtos = [
        { descricao: 'Placa de Vídeo RTX 3060 Ventus 2X MSI NVIDIA GeForce, 12GB GDDR6, DLSS, Ray Tracing - RTX 3060 Ventus 2X 12G OC.', precoV: '1.750,00', precoP: '200,00' },
        { descricao: 'SSD 1 TB Kingston NV2, M.2 2280 PCIe, NVMe, Leitura: 3500 MB/s e Gravação: 2100 MB/s - SNV2S/1000G', precoV: '399,00', precoP: '450,00' },
        { descricao: 'Placa de Vídeo RTX 3060 Ventus 2X MSI NVIDIA GeForce, 12GB GDDR6, DLSS, Ray Tracing - RTX 3060 Ventus 2X 12G OC.', precoV: '1.750,00', precoP: '175,00' },
        { descricao: 'Placa de Vídeo RTX 3060 Ventus 2X MSI NVIDIA GeForce, 12GB GDDR6, DLSS, Ray Tracing - RTX 3060 Ventus 2X 12G OC.', precoV: '1.750,00', precoP: '175,00' },
        { descricao: 'Placa de Vídeo RTX 3060 Ventus 2X MSI NVIDIA GeForce, 12GB GDDR6, DLSS, Ray Tracing - RTX 3060 Ventus 2X 12G OC.', precoV: '1.750,00', precoP: '175,00' },
        { descricao: 'Placa de Vídeo RTX 3060 Ventus 2X MSI NVIDIA GeForce, 12GB GDDR6, DLSS, Ray Tracing - RTX 3060 Ventus 2X 12G OC.', precoV: '1.750,00', precoP: '175,00' }
    ];

    return (
        <main className="containerMainPaginaProdutos">
            <Slider />
            <section className="containerProdutos">
                {produtos.map((produto) => (
                    <Produto descricao={produto.descricao} precoV={produto.precoV} precoP={produto.precoP} />
                ))}
            </section>
        </main>
    )
}