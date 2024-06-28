import rtx3060 from "../../assets/3060MSI.jpg"

export default function Produto({ descricao, precoV, precoP }) {
    return (
        <a href="/produto">
            <div className="boxProduto">
                <img src={rtx3060} alt="RTX 3060 MSI" />
                <p>{descricao}</p>
                <p>R$ {precoV} à vista</p>
                <p>10x de R$ {precoP}</p>
            </div>
        </a>
    )
}