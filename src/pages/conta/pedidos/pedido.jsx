import { useLocation } from 'react-router-dom';

export default function Pedido() {
    const location = useLocation();
    const pedido = location.state?.pedido;

    function formatarPreco(preco) {
        return preco.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
    }

    return (
        <div>
            <h1>tela pedido</h1>
            <p>{pedido.numeroPedido} teste</p>
            <hr />
            <p>Valor do produto a prazo: {pedido.valorTotal + pedido.desconto - pedido.frete.valor}</p>
            <hr />

            <hr />
            <p>Desconto: - {formatarPreco(pedido.desconto)}</p>
            <hr />
            <p>frete valor: {formatarPreco(pedido.frete.valor)}</p>
            <hr />
            <p>Valor total do pedido: {pedido.valorTotal}</p>

            {/* <p>Valor do produto 1: {pedido.produtos[0].dadosProduto.preco}</p> */}

        </div>

    )
}