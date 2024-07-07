import { FaTrash } from "react-icons/fa";
import rtx3060 from "../../assets/3060MSI.jpg"

import "./style.css"


export default function Carrinho() {
    return (
        <main>
            <section className="containerPrincipal">
                <table className="produtosCarrinho">
                    <tr>
                        <th>Produto</th>
                        <th>Quantidade</th>
                        <th>Preço</th>
                    </tr>
                    <tr>
                        <td><img src={rtx3060} alt="3060" /> <p>Placa de Vídeo RTX 3060 Ventus 2X MSI NVIDIA GeForce, 12GB GDDR6, DLSS, Ray Tracing - RTX 3060 Ventus 2X 12G OC.</p></td>
                        <td>1</td>
                        <td>1.500,00</td>
                    </tr>
                    <tr>
                        <td><img src={rtx3060} alt="3060" /> <p>Placa de Vídeo RTX 3060 Ventus 2X MSI NVIDIA GeForce, 12GB GDDR6, DLSS, Ray Tracing - RTX 3060 Ventus 2X 12G OC.</p></td>
                        <td>2</td>
                        <td>3.000,00</td>
                    </tr>
                </table>
                <div className="limparCarrinho">
                    <FaTrash />
                    <h3>Limpar carrinho</h3>
                </div>
                <div className="cupomDesconto">
                    <h3>Cupom de desconto</h3>
                    <input type="text" />
                    <button>Aplicar</button>
                </div>
                <div className="calculoFrete">
                    <h3>Calcular Frete</h3>
                    <input type="text" />
                    <button>Calcular</button>
                </div>
            </section>

            <section className="resumoCarrinho">
                <h2>Resumo</h2>
                <div>
                    <p>Valor do carrinho</p>
                    <p>Descontos</p>
                    <p>Frete</p>
                    <p>Valor Total:</p>
                </div>

                <div>
                    <p>R$ 0,00</p>
                    <p>R$ 0,00</p>
                    <p>R$ 0,00</p>
                    <p>R$ 0,00</p>
                </div>

                <button>Finalizar Pedido</button>
            </section>
        </main>
    )
}
