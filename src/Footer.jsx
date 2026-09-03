import { useState } from 'react'
import logo from './assets/logo.svg'

function Footer() {
    const [email, setEmail] = useState('')
    const [sent, setSent] = useState(false)

    function handleSubmit(event) {
        event.preventDefault()
        if (!email) return
        setSent(true)
        setEmail('')
    }

    const year = new Date().getFullYear()

    return (
        <footer className="footer" id="rodape">
            <div className="footer__inner">
                <div className="footer__brand">
                    <a className="header__brand" href="#topo">
                        <img src={logo} alt="" width="26" height="26" />
                        <span>EcoTrend</span>
                    </a>
                    <p>
                        Produtos sustentáveis para quem quer trocar o descartável pelo
                        duradouro, um item de cada vez.
                    </p>
                </div>

                <div className="footer__col">
                    <h3>Categorias</h3>
                    <ul>
                        <li>Roupas e acessórios</li>
                        <li>Beleza natural</li>
                        <li>Casa sustentável</li>
                        <li>Tecnologia verde</li>
                    </ul>
                </div>

                <div className="footer__col">
                    <h3>Institucional</h3>
                    <ul>
                        <li>Sobre a EcoTrend</li>
                        <li>Política de trocas</li>
                        <li>Frete e entregas</li>
                        <li>Fale conosco</li>
                    </ul>
                </div>

                <form className="footer__newsletter" onSubmit={handleSubmit}>
                    <h3>Fique por dentro</h3>
                    <p>Novidades sobre produtos e reposição de estoque, sem spam.</p>
                    <div className="footer__newsletter-row">
                        <input
                            type="email"
                            placeholder="seu@email.com"
                            value={email}
                            onChange={(event) => setEmail(event.target.value)}
                            aria-label="E-mail para newsletter"
                            required
                        />
                        <button type="submit">Assinar</button>
                    </div>
                    {sent && <p className="footer__newsletter-ok">Inscrição confirmada.</p>}
                </form>
            </div>

            <div className="footer__bottom">
                <span>© {year} EcoTrend. Todos os direitos reservados.</span>
                <span>Checkpoint 04 · Engenharia de Software · FIAP</span>
            </div>
        </footer>
    )
}

export default Footer