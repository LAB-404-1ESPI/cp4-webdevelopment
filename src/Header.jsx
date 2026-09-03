import logo from './assets/logo.svg'

function Header({ cartCount, onCartClick }) {
    return (
        <header className="header">
            <div className="header__inner">
                <a className="header__brand" href="#topo">
                    <img src={logo} alt="" width="30" height="30" />
                    <span>EcoTrend</span>
                </a>

                <nav className="header__nav">
                    <a href="#produtos">Produtos</a>
                    <a href="#sobre">Sobre</a>
                    <a href="#rodape">Contato</a>
                </nav>

                <button
                    type="button"
                    className="header__cart"
                    onClick={onCartClick}
                    aria-label={`Abrir carrinho, ${cartCount} ${cartCount === 1 ? 'item' : 'itens'}`}
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
                        <path
                            d="M3 4h2l2.4 12.4a2 2 0 0 0 2 1.6h7.2a2 2 0 0 0 2-1.6L20 8H6.2"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                        <circle cx="10" cy="21" r="1.4" fill="currentColor" />
                        <circle cx="17" cy="21" r="1.4" fill="currentColor" />
                    </svg>
                    <span>Carrinho</span>
                    {cartCount > 0 && <span className="header__cart-badge">{cartCount}</span>}
                </button>
            </div>
        </header>
    )
}

export default Header