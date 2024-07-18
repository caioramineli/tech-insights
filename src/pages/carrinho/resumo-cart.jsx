import "./resumo-cart-style.css"

export default function ResumoCart() {
    return (
        <section className="containerResumo">
            <h2>Resumo</h2>
            <div className="resumoCarrinho">
                <div>
                    <p>Valor do carrinho:</p>
                    <p>R$ 9.999,00</p>
                </div>

                <hr />

                <div>
                    <p>Descontos:</p>
                    <p>R$ 0,00</p>
                </div>

                <hr />

                <div>
                    <p>Frete:</p>
                    <p>R$ 0,00</p>
                </div>

                <hr />

                <div>
                    <p>Valor Total a prazo:</p>
                    <p>R$ 0,00</p>
                </div>

                <hr />

                <div>
                    <p>Valor Total a vista:</p>
                    <p>R$ 0,00</p>
                </div>
            </div>
        </section>
    )
}