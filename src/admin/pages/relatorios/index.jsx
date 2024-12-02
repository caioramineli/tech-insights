import React, { useState } from "react";
import SalesChart from "./vendas";
import RelatorioEstoqueMinimo from "./estoqueMinimo";
import MovimentacaoEstoque from "./movimentacaoEstoque";

const Relatorios = () => {
    const [activeTab, setActiveTab] = useState("tab1");

    const getIndicatorPosition = () => {
        switch (activeTab) {
            case "tab1":
                return "translate-x-0";
            case "tab2":
                return "translate-x-full";
            case "tab3":
                return "translate-x-[200%]";
            case "tab4":
                return "translate-x-[300%]";
            default:
                return "translate-x-0";
        }
    };

    return (
        <div className="containerPadrao bg-white rounded-md shadow-md">
            <div className="relative flex border-b">
                <button
                    className="flex-1 py-2 text-center text-zync-900 text-lg"
                    onClick={() => setActiveTab("tab1")}
                >
                    Vendas
                </button>
                <button
                    className="flex-1 py-2 text-center text-zync-900 text-lg"
                    onClick={() => setActiveTab("tab2")}
                >
                    Estoque mínimo
                </button>
                <button
                    className="flex-1 py-2 text-center text-zync-900 text-lg"
                    onClick={() => setActiveTab("tab3")}
                >
                    Produtos esgotados
                </button>
                <button
                    className="flex-1 py-2 text-center text-zync-900 text-lg"
                    onClick={() => setActiveTab("tab4")}
                >
                    Movimentações do Estoque
                </button>
                <div
                    className={`absolute bottom-0 left-0 h-[2px] w-1/4 bg-cyan-600 transition-transform duration-300 ${getIndicatorPosition()}`}
                ></div>
            </div>

            <div className="p-4">
                {activeTab === "tab1" && <SalesChart />}
                {activeTab === "tab2" && <RelatorioEstoqueMinimo estoqueMinimo={11} titulo={"Relatório de produtos com o estoque mínimo"} />}
                {activeTab === "tab3" && <RelatorioEstoqueMinimo estoqueMinimo={1} titulo={"Relatório de produtos esgotados"} />}
                {activeTab === "tab4" && <MovimentacaoEstoque />}
            </div>
        </div>
    );
};

export default Relatorios;
