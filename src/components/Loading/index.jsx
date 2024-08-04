import "./style.css";

export default function Loading({ color = "#0e7490" }) {
    return (
        <div className="loading">
            <span className="carregando" style={{ borderColor: color }}></span>
        </div>
    );
}