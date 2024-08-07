import { BrowserRouter as BR, Route, Routes } from "react-router-dom";
import Home from "./pages/home/";
import Login from "./pages/login/"
import Cadastrar from "./pages/cadastrar";
import Conta from "./pages/conta";
import Carrinho from "./pages/carrinho";
import PaginaProduto from "./pages/productpage";

import GuiasInformativos from "./pages/guiasInformativos";
import MontePC from "./pages/montePC";
import PaginaCupons from "./pages/cupons";
import KitUpgrade from "./pages/kitUpgrade";
import Notebooks from "./pages/notebooks";
import Monitores from "./pages/monitores";

import Header from './components/Header';
import Footer from './components/Footer';

import ProductUpload from "./admin/pages/product";


export default function MinhasRotas() {
    return (
        <>
            <BR>
                <Header />

                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/cadastrar" element={<Cadastrar />} />
                    <Route path="/minha-conta" element={<Conta />} />
                    <Route path="/Carrinho" element={<Carrinho />} />
                    <Route path="/product/:productId" element={<PaginaProduto />} />
                    <Route path="/guias" element={<GuiasInformativos />} />
                    <Route path="/monte-seu-pc" element={<MontePC />} />
                    <Route path="/cupons" element={<PaginaCupons />} />
                    <Route path="/kit-upgrade" element={<KitUpgrade />} />
                    <Route path="/notebooks" element={<Notebooks />} />
                    <Route path="/monitores" element={<Monitores />} />

                    <Route path="/admin/produtos" element={<ProductUpload />} />
                </Routes>
                
                <Footer />
            </BR>
        </>
    )
}