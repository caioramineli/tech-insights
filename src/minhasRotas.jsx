import { BrowserRouter as BR, Route, Routes } from "react-router-dom";
import Home from "./pages/home/";
import Login from "./pages/login/"
import Cadastrar from "./pages/cadastrar";
import PaginaProduto from "./pages/product";

import GuiasInformativos from "./pages/guiasInformativos";
import MontePC from "./pages/montePC";
import PaginaCupons from "./pages/cupons";
import KitUpgrade from "./pages/kitUpgrade";
import Notebooks from "./pages/notebooks";
import Monitores from "./pages/monitores";

export default function MinhasRotas() {
    return (
        <>
            <BR>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/cadastrar" element={<Cadastrar />} />
                    <Route path="/produto" element={<PaginaProduto />} />
                    <Route path="/guias" element={<GuiasInformativos />} />
                    <Route path="/monte-seu-pc" element={<MontePC />} />
                    <Route path="/cupons" element={<PaginaCupons />} />
                    <Route path="/kit-upgrade" element={<KitUpgrade />} />
                    <Route path="/notebooks" element={<Notebooks />} />
                    <Route path="/monitores" element={<Monitores />} />
                </Routes>
            </BR>
        </>
    )
}