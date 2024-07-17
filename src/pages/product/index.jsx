import './style.css'
import Produto from '../../components/Produto'
import DescricaoProduto from '../../components/DescricaoProduto'
import EspecificacaoProduto from '../../components/EspecificacaoProduto'
import AvaliacoesProduto from '../../components/AvaliacoesProduto'


export default function PaginaProduto() {
    return (
        <main className='containerPaginaProduto'>
            <section className="containerMainProduto">
                <Produto />
            </section>

            <DescricaoProduto />
            <EspecificacaoProduto />
            <AvaliacoesProduto />
        </main>
    )
}