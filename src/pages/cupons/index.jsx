import { MdDiscount } from "react-icons/md";
import { FaRegCopy } from "react-icons/fa6";


export default function PaginaCupons() {
    return (
        <div className="flex flex-col gap-4 w-[90%] xl:w-4/5 m-auto max-w-[1300px] my-8">
            <div className="flex items-center">
                <MdDiscount className="text-2xl text-emerald-600" />
                <h1 className="text-2xl font-bold text-zinc-900">Cupons Ativos</h1>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2 p-4 bg-emerald-700 rounded-lg">
                    <h1 className="text-xl text-emerald-50 font-bold">5% OFF</h1>
                    <p className="text-lg text-emerald-50">Válido na sua 1º compra</p>
                    <button className="text-xl p-2 font-bold bg-white rounded-md relative">
                        PRIMEIRA5
                        <FaRegCopy className="absolute top-1 right-1" />
                    </button>
                </div>

                <div className="flex flex-col gap-2 p-4 bg-emerald-700 rounded-lg">
                    <h1 className="text-xl font-bold text-emerald-50">R$ 50,00 OFF</h1>
                    <p className="text-lg text-emerald-50">Válido em copras acima de R$500</p>
                    <button className="text-xl p-2 font-bold bg-white rounded-md relative">
                        TECH50
                        <FaRegCopy className="absolute top-1 right-1" />
                    </button>
                </div>

                <div className="flex flex-col gap-2 p-4 bg-emerald-700 rounded-lg">
                    <h1 className="text-xl text-emerald-50 font-bold">5% OFF</h1>
                    <p className="text-lg text-emerald-50">Válido na sua 1º compra</p>
                    <button className="text-xl p-2 font-bold bg-white rounded-md relative">
                        PRIMEIRA5
                        <FaRegCopy className="absolute top-1 right-1" />
                    </button>
                </div>

                <div className="flex flex-col gap-2 p-4 bg-emerald-700 rounded-lg">
                    <h1 className="text-xl font-bold text-emerald-50">R$ 50,00 OFF</h1>
                    <p className="text-lg text-emerald-50">Válido em copras acima de R$500</p>
                    <button className="text-xl p-2 font-bold bg-white rounded-md relative">
                        TECH50
                        <FaRegCopy className="absolute top-1 right-1" />
                    </button>
                </div>
            </div>
        </div>
    )
}
