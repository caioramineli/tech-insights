import "./style.css";

export default function Loading({ color = "#000" }) {
    return (
        <div className="loading">
            <span className="carregando" style={{ borderColor: color }}></span>
        </div>
    );
}