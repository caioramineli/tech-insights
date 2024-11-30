import CardLink from '../../../components/CardAdmin';

const HomeAdmin = () => {
    return (
        <div className="containerPadrao flex flex-col items-center justify-center gap-6">
            <h1 className="text-center text-xl md:text-4xl font-bold text-gray-800">
                Bem-vindo(a) ao Painel Administrativo
            </h1>
            <div className="grid grid-cols-1 md:grid-cols-2 justify-center gap-8">
                <CardLink
                    to="/admin/produtos"
                    title="Gerenciar Produtos"
                    description="Gerencie os produtos dos sistema."
                />
                <CardLink
                    to="/admin/cupons"
                    title="Gerenciar Cupons"
                    description="Gerencie cupons de desconto."
                />
                <CardLink
                    to="/admin/pedidos"
                    title="Gerenciar Pedidos"
                    description="Gerencie pedidos do sistema."
                />

                <CardLink
                    to="/admin/relatorios"
                    title="Relatórios"
                    description="Visualize os relatórios do sistema."
                />
            </div>
        </div>
    );
};

export default HomeAdmin;
