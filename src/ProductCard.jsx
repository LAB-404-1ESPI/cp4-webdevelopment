import { useState } from 'react'

const currency = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
})

function ProductCard({ product, onAdd }) {
    const [justAdded, setJustAdded] = useState(false)

    function handleAdd() {
        onAdd(product)
        setJustAdded(true)
        setTimeout(() => setJustAdded(false), 1400)
    }

    const [colorA, colorB] = product.swatch

    return (
        <article className="product-card">
            <div
                className="product-card__swatch"
                style={!product.image ? { background: `linear-gradient(135deg, ${colorA}, ${colorB})` } : undefined}
            >
                {product.image && (
                    <img
                        className="product-card__image"
                        src={`${import.meta.env.BASE_URL}${product.image}`}
                        alt={product.name}
                    />
                )}
                <span className="product-card__tag">{product.category}</span>
            </div>

            <div className="product-card__body">
                <h3>{product.name}</h3>
                <p className="product-card__desc">{product.description}</p>

                <div className="product-card__footer">
                    <span className="product-card__price">{currency.format(product.price)}</span>
                    <button
                        type="button"
                        className={`product-card__add${justAdded ? ' is-added' : ''}`}
                        onClick={handleAdd}
                    >
                        {justAdded ? 'Adicionado' : 'Adicionar'}
                    </button>
                </div>
            </div>
        </article>
    )
}

export default ProductCard