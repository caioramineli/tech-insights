import "./style.css"
import { FaTrash } from "react-icons/fa";
import { BiSolidCoupon } from "react-icons/bi";
import { FaTruck } from "react-icons/fa6";

import TableCart from "./table-cart"
import ResumoCart from "./resumo-cart";


export default function Carrinho() {
    return (
        <main className="mainCarrinho">
            <section className="containerPrincipal">
                <TableCart />
                <div className="limparCarrinho">
                    <FaTrash />
                    <h3>Limpar carrinho</h3>
                </div>
                <div className="containerCupomFrete">

                    <div className="cupomDesconto">
                        <input type="text" placeholder="Cupom de desconto" />
                        <button>
                            Aplicar
                            <BiSolidCoupon />
                        </button>
                    </div>

                    <div className="calculoFrete">
                        <input type="text" placeholder="12345-678" />
                        <button>
                            Calcular
                            <FaTruck />
                        </button>
                    </div>
                </div>
            </section>

            <section className="containerResumoFinalizar">
                <ResumoCart />
                <button type="button">Finalizar Pedido</button>
            </section>
        </main>
    )
}
