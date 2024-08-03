import "./style.css"

export default function InputAdmin({ label, tipo = "text", nome, value, func, min = "", list = "" }) {
    return (
        <div className="boxInputAdmin">
            <label>{label}</label>
            <input type={tipo} name={nome} value={value} onChange={func} required min={min} list={list}/>
        </div>
    )
}