import { BrowserRouter as BR, Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";

import Header from './components/Header';
import Footer from './components/Footer';
import ScrollToTop from "./components/ScrollTop";
import PageTransition from "./pages/pageTransition"

import Login from "./pages/login/";
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
import AdminCupomPage from "./admin/pages/cupons";
import AdminOrderPage from "./admin/pages/orders";
import Relatorios from "./admin/pages/relatorios";
import { NotFound } from "./pages/notfound";

import ProtectedRouteUser from './protectRoutes/user';
import ProtectedRouteAdmin from './protectRoutes/admin';

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<PageTransition><Home /></PageTransition>} />
                <Route path="/login" element={<PageTransition><Login /></PageTransition>} />
                <Route path="/cadastrar" element={<PageTransition><Cadastrar /></PageTransition>} />

                <Route path="/minha-conta" element={<ProtectedRouteUser element={<PageTransition><Conta /></PageTransition>} />} />
                <Route path="/minha-conta/meus-dados" element={<ProtectedRouteUser element={<PageTransition><Dados /></PageTransition>} />} />
                <Route path="/minha-conta/pedidos" element={<ProtectedRouteUser element={<PageTransition><Pedidos /></PageTransition>} />} />
                <Route path="/minha-conta/pedidos/:idPedido" element={<ProtectedRouteUser element={<PageTransition><Pedido /></PageTransition>} />} />
                <Route path="/minha-conta/favoritos" element={<ProtectedRouteUser element={<PageTransition><PaginaFavoritos /></PageTransition>} />} />
                <Route path="/minha-conta/enderecos" element={<ProtectedRouteUser element={<PageTransition><EnderecosUser /></PageTransition>} />} />

                <Route path="/carrinho" element={<PageTransition><Carrinho /></PageTransition>} />
                <Route path="/entrega" element={<ProtectedRouteUser element={<PageTransition><Entrega /></PageTransition>} />} />
                <Route path="/pagamento" element={<ProtectedRouteUser element={<PageTransition><Pagamento /></PageTransition>} />} />
                <Route path="/confirmacao" element={<ProtectedRouteUser element={<PageTransition><Confirmacao /></PageTransition>} />} />
                <Route path="/pedido-realizado" element={<ProtectedRouteUser element={<PageTransition><PedidoRealizado /></PageTransition>} />} />

                <Route path="/marcas/:marca" element={<PageTransition><PaginaMarca /></PageTransition>} />
                <Route path="/produto/:productId" element={<PageTransition><PaginaProduto /></PageTransition>} />
                <Route path="/busca" element={<PageTransition><Busca /></PageTransition>} />
                <Route path="/guias" element={<PageTransition><GuiasInformativos /></PageTransition>} />
                <Route path="/monte-seu-pc" element={<PageTransition><MontePC /></PageTransition>} />
                <Route path="/cupons" element={<PageTransition><PaginaCupons /></PageTransition>} />

                <Route path="/categoria/:categoria" element={<PageTransition><BuscaPorCategoria /></PageTransition>} />
                <Route path="/categoria/hardware" element={<PageTransition><HardwarePage /></PageTransition>} />
                <Route path="/categoria/perifericos" element={<PageTransition><PerifericosPage /></PageTransition>} />
                <Route path="/categoria/redes" element={<PageTransition><RedesPage /></PageTransition>} />
                <Route path="/categoria/computadores" element={<PageTransition><ComputadoresPage /></PageTransition>} />

                <Route path="/admin" element={<ProtectedRouteAdmin element={<PageTransition><HomeAdmin /></PageTransition>} />} />
                <Route path="/admin/produtos" element={<ProtectedRouteAdmin element={<PageTransition><ProductUpload /></PageTransition>} />} />
                <Route path="/admin/cupons" element={<ProtectedRouteAdmin element={<PageTransition><AdminCupomPage /></PageTransition>} />} />
                <Route path="/admin/pedidos" element={<ProtectedRouteAdmin element={<PageTransition><AdminOrderPage /></PageTransition>} />} />
                <Route path="/admin/relatorios" element={<ProtectedRouteAdmin element={<PageTransition><Relatorios /></PageTransition>} />} />

                <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
            </Routes>
        </AnimatePresence>
    );
};

export default function MinhasRotas() {
    return (
        <BR>
            <Header />
            <ScrollToTop />
            <AnimatedRoutes />
            <Footer />
        </BR>
    );
}
