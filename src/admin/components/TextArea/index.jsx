import "./style.css"

export default function TextAreaAdmin({ label, nome, value, func }) {
    return (
        <div className="boxTextAreaAdmin">
            <label>{label}</label>
            <textarea name={nome} value={value} onChange={func} required></textarea>
        </div>
    )
}