import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale } from "chart.js";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { AuthContext } from "../../../contexts/AuthContext";

ChartJS.register(BarElement, CategoryScale, LinearScale, ChartDataLabels);

const SalesChart = () => {
    const [chartData, setChartData] = useState(null);
    const { token } = useContext(AuthContext);
    const [mes, setMes] = useState(new Date().getMonth() + 1);
    const [loading, setLoading] = useState(false);
    const api = process.env.REACT_APP_API_URL;

    useEffect(() => {
        if (!mes) return;

        setLoading(true);

        axios
            .get(`${api}relatorio-vendas?mes=${mes}`, {
                headers: {
                    'Authorization': `Bearer ${token}`
                },
            })
            .then((response) => {
                const data = response.data;
                const dias = data.map((venda) => venda.dia);
                const valores = data.map((venda) => venda.total);

                setChartData({
                    labels: dias,
                    datasets: [
                        {
                            label: "Vendas Diárias",
                            data: valores,
                            backgroundColor: "#10b981",
                            borderColor: "#047857",
                            borderWidth: 1,
                            barPercentage: 5,
                            categoryPercentage: 0.1,
                        },
                    ],
                });

                setLoading(false);
            })
            .catch((error) => {
                console.error("Erro ao buscar dados:", error);
                setLoading(false);
            });
    }, [mes, api, token]);

    if (loading) return <div>Carregando gráfico...</div>;

    if (!chartData) return <div>Nenhum dado disponível para o gráfico.</div>;

    return (
        <div className="max-w-7xl w-full mx-auto">
            <div className="mb-4">
                <label htmlFor="mes" className="mr-2 font-bold">
                    Selecione o Mês:
                </label>
                <select
                    id="mes"
                    value={mes}
                    onChange={(e) => setMes(Number(e.target.value))}
                    className="p-1 border rounded"
                >
                    <option value={1}>Janeiro</option>
                    <option value={2}>Fevereiro</option>
                    <option value={3}>Março</option>
                    <option value={4}>Abril</option>
                    <option value={5}>Maio</option>
                    <option value={6}>Junho</option>
                    <option value={7}>Julho</option>
                    <option value={8}>Agosto</option>
                    <option value={9}>Setembro</option>
                    <option value={10}>Outubro</option>
                    <option value={11}>Novembro</option>
                    <option value={12}>Dezembro</option>
                </select>
            </div>

            <div style={{ height: "400px" }}>
                <Bar
                    data={chartData}
                    options={{
                        responsive: true,
                        maintainAspectRatio: false,
                        plugins: {
                            datalabels: {
                                color: "black",
                                font: {
                                    weight: "semi-bold",
                                },
                                anchor: "end",
                                align: "top",
                                formatter: (value) => `R$ ${value.toFixed(2)}`,
                            },
                        },
                        scales: {
                            x: {
                                grid: {
                                    display: false,
                                },
                            },
                            y: {
                                beginAtZero: true,
                                grid: {
                                    display: false,
                                },
                                ticks: {
                                    stepSize: 500,
                                },
                                suggestedMax: Math.max(...(chartData?.datasets[0]?.data || [])) * 1.2,
                            },
                        },
                    }}
                />
            </div>
        </div>
    );
};

export default SalesChart;



