import { MdConstruction } from "react-icons/md";

export default function MontePC() {
    return (
        <div className="containerPadrao">
            <div className="flex flex-wrap items-center gap-2 m-auto">
                <h1 className="text-lg sm:text-2xl font-bold">Monte seu PC</h1>
                <p className="text-lg sm:text-2xl font-bold">(em construção)</p>
                <MdConstruction className="text-2xl sm:text-4xl text-emerald-600" />
            </div>
        </div>
    )
}