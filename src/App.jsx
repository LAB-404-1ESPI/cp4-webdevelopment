import { useEffect, useMemo, useState } from 'react'
import Header from './Header.jsx'
import Footer from './Footer.jsx'
import ProductList from './ProductList.jsx'
import Cart from './Cart.jsx'
import './App.css'

const CART_KEY = 'ecotrend-cart'

function loadCartFromStorage() {
  try {
    const saved = localStorage.getItem(CART_KEY)
    return saved ? JSON.parse(saved) : []
  } catch (err) {
    return []
  }
}

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [activeCategory, setActiveCategory] = useState('Todos')
  const [cart, setCart] = useState(loadCartFromStorage)
  const [cartOpen, setCartOpen] = useState(false)

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true)
      setError(false)
      try {
        const response = await fetch(`${import.meta.env.BASE_URL}products.json`)
        if (!response.ok) throw new Error('Falha na requisição')
        const data = await response.json()
        // pequeno atraso proposital para demonstrar o spinner de carregamento
        await new Promise((resolve) => setTimeout(resolve, 500))
        setProducts(data)
      } catch (err) {
        setError(true)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])

  useEffect(() => {
    localStorage.setItem(CART_KEY, JSON.stringify(cart))
  }, [cart])

  const categories = useMemo(
    () => [...new Set(products.map((product) => product.category))],
    [products]
  )

  const visibleProducts = useMemo(() => {
    if (activeCategory === 'Todos') return products
    return products.filter((product) => product.category === activeCategory)
  }, [products, activeCategory])

  const cartCount = cart.reduce((total, item) => total + item.qty, 0)

  function handleAddToCart(product) {
    setCart((current) => {
      const existing = current.find((item) => item.id === product.id)
      if (existing) {
        return current.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        )
      }
      return [...current, { ...product, qty: 1 }]
    })
  }

  function handleUpdateQty(id, qty) {
    if (qty < 1) {
      handleRemoveFromCart(id)
      return
    }
    setCart((current) => current.map((item) => (item.id === id ? { ...item, qty } : item)))
  }

  function handleRemoveFromCart(id) {
    setCart((current) => current.filter((item) => item.id !== id))
  }

  function handleCheckout() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        const validOrder = cart.length > 0
        if (validOrder) {
          setCart([])
          resolve({ status: 'ok' })
        } else {
          reject(new Error('Carrinho vazio'))
        }
      }, 1200)
    })
  }

  return (
    <div id="topo">
      <Header cartCount={cartCount} onCartClick={() => setCartOpen(true)} />

      <main>
        <section className="hero">
          <div className="hero__text">
            <span className="hero__kicker">Consumo consciente</span>
            <h1>
              Trocas pequenas, <em>impacto real</em> no dia a dia.
            </h1>
            <p>
              A EcoTrend reúne roupas, beleza natural, itens de casa e tecnologia
              verde de marcas que se comprometem com origem responsável e menos
              plástico na sua rotina.
            </p>
            <a className="hero__cta" href="#produtos">
              Ver produtos
            </a>
          </div>
          <div className="hero__art" aria-hidden="true">
            <svg viewBox="0 0 320 320" width="100%" height="100%">
              <circle cx="160" cy="160" r="140" fill="#E4E3D2" />
              <path
                d="M160 60c55 0 100 45 100 100s-45 100-100 100c0-55 20-100 20-100s-20-45-20-100Z"
                fill="#5B7553"
              />
              <path
                d="M160 60c-55 0-100 45-100 100s45 100 100 100c0-55-20-100-20-100s20-45 20-100Z"
                fill="#3F4A3A"
              />
              <circle cx="160" cy="160" r="14" fill="#C1693C" />
            </svg>
          </div>
        </section>

        <ProductList
          products={visibleProducts}
          loading={loading}
          error={error}
          categories={categories}
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
          onAddToCart={handleAddToCart}
        />

        <section className="about" id="sobre">
          <h2>Por que EcoTrend</h2>
          <div className="about__grid">
            <div>
              <h3>Origem verificada</h3>
              <p>Cada fornecedor passa por avaliação de impacto antes de entrar no catálogo.</p>
            </div>
            <div>
              <h3>Menos embalagem</h3>
              <p>Priorizamos materiais retornáveis, biodegradáveis ou compostáveis.</p>
            </div>
            <div>
              <h3>Durabilidade em primeiro lugar</h3>
              <p>Preferimos produtos feitos para durar a alternativas de troca rápida.</p>
            </div>
          </div>
        </section>
      </main>

      <Cart
        items={cart}
        isOpen={cartOpen}
        onClose={() => setCartOpen(false)}
        onUpdateQty={handleUpdateQty}
        onRemove={handleRemoveFromCart}
        onCheckout={handleCheckout}
      />

      <Footer />
    </div>
  )
}

export default App