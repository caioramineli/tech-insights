import "./table-cart-style.css"
import LineTableCart from "./line-table"

export default function TableCart() {

    return (
        <table className="produtosCarrinho">
            <tr>
                <th>Produto</th>
                <th>Quantidade</th>
                <th>Preço</th>
            </tr>
            <LineTableCart/>
            <LineTableCart/>
        </table>
    )
}
