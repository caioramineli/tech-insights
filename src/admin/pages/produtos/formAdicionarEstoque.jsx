const AdicionarEstoque = () => {
    return (
        <>
            <div className="flex items-center gap-4">
                <img className="w-16" src={'https://backend-tech-insights-production.up.railway.app/imgs/2a21fce6-4d6b-451b-812f-a672372ca2c4.jpg'} alt="img-produto" />
                <h3 className="text-sm sm:text-base font-semibold text-zinc-900">Notebook Gamer Acer Nitro V15 Intel Core i5-13420H, 8GB RAM, GeForce RTX 3050, SSD 512GB, 15.6" FHD IPS 144Hz, Windows 11, Preto</h3>
            </div>

            <hr />

            <form method="POST" className="flex flex-col gap-4 sm:gap-5 mt-2">
                <p><strong>Estoque atual: </strong>10</p>

                <div className="divInputModerno">
                    <input
                        name="titulo"
                        type="number"
                        placeholder="10"
                        required
                    />
                    <label>
                        Quantidade para adicionar
                    </label>
                </div>

                <button type="submit" className="btnPadrao">Adicionar no estoque</button>
            </form>
        </>
    );
}

export default AdicionarEstoque;