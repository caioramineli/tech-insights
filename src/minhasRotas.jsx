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

import HomeAdmin from "./admin/pages/home";
import ProductUpload from "./admin/pages/produtos";
import AdminCuponPage from "./admin/pages/cupons";
import AdminOrderPage from "./admin/pages/orders";

import { NotFound } from "./pages/notfound";

import ProtectedRouteUser from './protectRoutes/user';
import ProtectedRouteAdmin from './protectRoutes/admin';

import ScrollToTop from "./components/ScrollTop";


export default function MinhasRotas() {
    return (
        <>
            <BR>
                <Header />
                <ScrollToTop />

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/cadastrar" element={<Cadastrar />} />

                    <Route path="/minha-conta" element={<ProtectedRouteUser element={<Conta />} />} />
                    <Route path="/minha-conta/meus-dados" element={<ProtectedRouteUser element={<Dados />} />} />
                    <Route path="/minha-conta/pedidos" element={<ProtectedRouteUser element={<Pedidos />} />} />
                    <Route path="/minha-conta/pedidos/:idPedido" element={<ProtectedRouteUser element={<Pedido />} />} />
                    <Route path="/minha-conta/favoritos" element={<ProtectedRouteUser element={<PaginaFavoritos />} />} />
                    <Route path="/minha-conta/enderecos" element={<ProtectedRouteUser element={<EnderecosUser />} />} />

                    <Route path="/carrinho" element={<Carrinho />} />
                    <Route path="/entrega" element={<ProtectedRouteUser element={<Entrega />} />} />
                    <Route path="/pagamento" element={<ProtectedRouteUser element={<Pagamento />} />} />
                    <Route path="/confirmacao" element={<ProtectedRouteUser element={<Confirmacao />} />} />
                    <Route path="/pedido-realizado" element={<ProtectedRouteUser element={<PedidoRealizado />} />} />

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

                    <Route path="/admin" element={<ProtectedRouteAdmin element={<HomeAdmin />} />} />
                    <Route path="/admin/produtos" element={<ProtectedRouteAdmin element={<ProductUpload />} />} />
                    <Route path="/admin/cupons" element={<ProtectedRouteAdmin element={<AdminCuponPage />} />} />
                    <Route path="/admin/pedidos" element={<ProtectedRouteAdmin element={<AdminOrderPage />} />} />

                    <Route path="*" element={<NotFound />} />
                </Routes>

                <Footer />
            </BR>
        </>
    )
}