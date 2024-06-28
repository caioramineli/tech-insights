import { BrowserRouter as BR, Route, Routes } from "react-router-dom";
import Home from "./pages/home/";
import Login from "./pages/login/"
import Cadastrar from "./pages/cadastrar";
import Produto from "./pages/product";


export default function MinhasRotas() {
    return (
        <>
            <BR>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/cadastrar" element={<Cadastrar />} />
                    <Route path="/produto" element={<Produto />} />
                </Routes>
            </BR>
        </>
    )
}