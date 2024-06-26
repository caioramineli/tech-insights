import './style.css';
export default function Cadastrar() {
    return (
        <>
            <div id="container-criar">
                <form method="POST">
                    <h1>Cadastrar-se</h1>
                    <div id='container-information'>
                        <div className='container-LInput'>
                            <label htmlFor='nome'>Nome:</label>
                            <input name="nome" type="text" placeholder="Nome completo" />
                        </div>
                        <div className='container-LInput'>
                            <label htmlFor='cpf'>CPF:</label>
                            <input name="cpf" type="text" placeholder="___.___.___-__" />
                        </div>
                        <div className='container-LInput'>
                            <label htmlFor='data_nasc'>Data de nascimento:</label>
                            <input name="data_nasc" type="text" placeholder="00/00/0000" />
                        </div>
                        <div className='container-LInput'>
                            <label htmlFor='tefone'>Tefone:</label>
                            <input name="tefone" type="text" placeholder="(00) 0000-000" />
                        </div>
                        <div className='container-LInput'>
                            <label htmlFor='email'>Email:</label>
                            <input name="email" type="text" placeholder="Insira seu email" />
                        </div>
                        <div className='container-LInput'>
                            <label htmlFor='senha'>Senha:</label>
                            <input name='senha' type="text" placeholder="Insira sua senha" />
                        </div>
                    </div>
                    <button type='submit'>Criar</button>
                    <div id="voltar-login">
                        <p>Já possui cadastro?</p><span>
                        <a href="/login">FazerLogin</a></span>
                    </div>
                </form>
            </div>
        </>
    )
}