import rtx3060 from "../../assets/3060MSI.jpg"
import rtx30602 from "../../assets/3060MSI2.jpg"
import rtx30603 from "../../assets/3060MSI3.jpg"
import rtx30604 from "../../assets/3060MSI4.jpg"
import rtx30605 from "../../assets/3060MSI5.jpg"
import msiLogo from "../../assets/logo-msi.jpg"

import './style.css'


export default function Produto() {
    return (
        <main className="containerMainProduto">
            <h2>Placa de Vídeo RTX 3060 Ventus 2X MSI NVIDIA GeForce, 12GB GDDR6, DLSS, Ray Tracing - RTX 3060 Ventus 2X 12G OC.</h2>
            <section className="containerProdutoInfo">
                <div className="containerImgsProduto">
                    <img src={rtx30602} alt="30602" />
                    <img src={rtx30603} alt="30603" />
                    <img src={rtx30604} alt="30604" />
                    <img src={rtx30605} alt="30605" />
                </div>

                <img src={rtx3060} alt="3060msi" />

                <section className="containerDireitaProduto">
                    <div className="marcaProduto">
                        <h2>Marca:</h2>
                        <img src={msiLogo} alt="" />
                    </div>

                    <div>
                        <p>Estrelas</p>
                        <p>codigo</p>
                    </div>

                    <p>Produto Disponivel</p>

                    <div>
                        <img src="" alt="" />
                        <h3>1000</h3>
                        <p>a vista com 10% de desconto no boleto ou pix</p>
                    </div>

                    <div>
                        <img src="" alt="" />
                        <h3>1200</h3>
                        <p>a vista com 10% de desconto no boleto ou pix</p>
                    </div>

                    <button>Ver mais opções de pagamento</button>

                    <button>Comprar</button>

                    <h4>Consultar frete e prazo de entrega</h4>
                    <div>
                        <input type="text" />
                        <button type="button">pesquisar</button>
                    </div>
                </section>
            </section>
        </main>
    )
}