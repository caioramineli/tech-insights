import { BrowserRouter as BR, Route, Routes } from "react-router-dom";
import Home from "./pages/home/";
import Login from "./pages/login/"


export default function MinhasRotas() {
    return (
        <>
            <BR>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/login" element={<Login />} />
                </Routes>
            </BR>
        </>
    )
}