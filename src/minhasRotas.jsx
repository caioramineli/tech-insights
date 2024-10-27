import { BrowserRouter as BR, Route, Routes } from "react-router-dom";
import Header from './components/Header';
import Footer from './components/Footer';

import Login from "./pages/login/"
import Cadastrar from "./pages/cadastrar";

import Home from "./pages/home/";

import Conta from "./pages/conta";
import Dados from "./pages/conta/dados";
import Pedidos from "./pages/conta/pedidos";
import Pedido from "./pages/conta/pedidos/pedido";
import PaginaFavoritos from "./pages/conta/favoritos";
import EnderecosUser from "./pages/conta/enderecos";

import Carrinho from "./pages/carrinho";
import Entrega from "./pages/carrinho/entrega";
import Pagamento from "./pages/carrinho/pagamento";
import Confirmacao from "./pages/carrinho/confirmacao";
import PedidoRealizado from "./pages/pedidoRealizado";

import PaginaProduto from "./pages/productpage";
import { PaginaMarca } from "./pages/marcas";
import Busca from "./pages/busca";
import { BuscaPorCategoria } from "./pages/buscaPorCategoria";

import { HardwarePage } from "./pages/hardware";
import { PerifericosPage } from "./pages/perifericos";
import { RedesPage } from "./pages/redes";
import { ComputadoresPage } from "./pages/computadores";

import GuiasInformativos from "./pages/guiasInformativos";
import MontePC from "./pages/montePC";
import PaginaCupons from "./pages/cupons";

import ProductUpload from "./admin/pages/product";
import AdminCuponPage from "./admin/pages/cupon";

import { NotFound } from "./pages/notfound";

import ProtectedRoute from './protectRoutes';

import ScrollToTop from "./components/ScrollTop";


export default function MinhasRotas() {
    return (
        <>
            <BR>
                <ScrollToTop />
                <Header />

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/cadastrar" element={<Cadastrar />} />

                    <Route path="/minha-conta" element={<ProtectedRoute element={<Conta />} />} />
                    <Route path="/minha-conta/meus-dados" element={<ProtectedRoute element={<Dados />} />} />
                    <Route path="/minha-conta/pedidos" element={<ProtectedRoute element={<Pedidos />} />} />
                    <Route path="/minha-conta/pedidos/:idPedido" element={<ProtectedRoute element={<Pedido />} />} />
                    <Route path="/minha-conta/favoritos" element={<ProtectedRoute element={<PaginaFavoritos />} />} />
                    <Route path="/minha-conta/enderecos" element={<ProtectedRoute element={<EnderecosUser />} />} />

                    <Route path="/carrinho" element={<Carrinho />} />
                    <Route path="/entrega" element={<ProtectedRoute element={<Entrega />} />} />
                    <Route path="/pagamento" element={<ProtectedRoute element={<Pagamento />} />} />
                    <Route path="/confirmacao" element={<ProtectedRoute element={<Confirmacao />} />} />
                    <Route path="/pedido-realizado" element={<ProtectedRoute element={<PedidoRealizado />} />} />

                    <Route path="/marcas/:marca" element={<PaginaMarca />} />
                    <Route path="/produto/:productId" element={<PaginaProduto />} />
                    <Route path="/busca" element={<Busca />} />
                    <Route path="/guias" element={<GuiasInformativos />} />
                    <Route path="/monte-seu-pc" element={<MontePC />} />
                    <Route path="/cupons" element={<PaginaCupons />} />

                    <Route path="/categoria/:categoria" element={<BuscaPorCategoria />} />
                    <Route path="/categoria/hardware" element={<HardwarePage />} />
                    <Route path="/categoria/perifericos" element={<PerifericosPage />} />
                    <Route path="/categoria/redes" element={<RedesPage />} />
                    <Route path="/categoria/computadores" element={<ComputadoresPage />} />

                    <Route path="/admin/produtos" element={<ProductUpload />} />
                    <Route path="/admin/cupons" element={< AdminCuponPage />} />

                    <Route path="*" element={<NotFound />} />
                </Routes>

                <Footer />
            </BR>
        </>
    )
}