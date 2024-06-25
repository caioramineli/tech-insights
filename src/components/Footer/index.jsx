import "./style.css"
import { FaFacebook, FaInstagram, FaYoutube, FaLinkedin  } from 'react-icons/fa'
import { FaXTwitter } from "react-icons/fa6"
import visa from "../../assets/visa.png"
import mastercard from "../../assets/master.png"
import boleto from "../../assets/boleto.png"
import pix from "../../assets/pix.png"
import mp from "../../assets/mercadoPago.png"

export default function Footer() {
    return (
        <footer className="footer">
            <ansid>
                <section className="caixas-informacoes">
                    <div className="box">
                        <h5>ATENDIMENTO AO CLIENTE</h5>
                        <ul>
                            <li>Cental de Ajuda</li>
                            <li>Como Comprar</li>
                            <li>Médotos de Pagamento</li>
                            <li>Garantia</li>
                            <li>Devolução e Reembolso</li>
                        </ul>
                    </div>

                    <div className="box">
                        <h5>INSTITUCIONAL</h5>
                        <ul>
                            <li>Sobre nós</li>
                            <li>Localização</li>
                            <li>Programa de Parceiros</li>
                            <li>Políticas do Site</li>
                            <li>Políticas de Privaciadade</li>
                        </ul>
                    </div>
                    <div className="box">
                        <h5>PAGAMENTO</h5>
                        <div className="pagamentos">
                            <img className="imagem-pagamento" src={visa} alt="visa" />
                            <img className="imagem-pagamento" src={mastercard} alt="master" />
                            <img className="imagem-pagamento" src={boleto} alt="boleto" />
                            <img className="imagem-pagamento" src={pix} alt="pix" />
                            <img className="imagem-pagamento" src={mp} alt="mp" />
                        </div>
                    </div>
                    <div className="box">
                        <h5>SIGA-NOS</h5>
                        <div className="redes-sociais">
                            <FaInstagram />
                            <p>Instagram</p>
                        </div>
                        <div className="redes-sociais">
                            <FaXTwitter />
                            <p>Twitter (X)</p>
                        </div>
                        <div className="redes-sociais">
                            <FaFacebook />
                            <p>Facebook</p>
                        </div>
                        <div className="redes-sociais">
                            <FaYoutube />
                            <p>YouTube</p>
                        </div>
                        <div className="redes-sociais">
                            <FaLinkedin />
                            <p>Linkedin</p>
                        </div>
                    </div>
                </section>
            </ansid>
            <section className="rodape">
                <hr />
                <p>ⓒ 2024 Tech Insights. Todos os direitos acadêmicos reservados.</p>
            </section>
        </footer>
    )
}