import ProductCard from './ProductCard.jsx'

function ProductList({
    products,
    loading,
    error,
    categories,
    activeCategory,
    onCategoryChange,
    onAddToCart,
}) {
    return (
        <section className="products" id="produtos">
            <div className="products__header">
                <h2>Nossos produtos</h2>
                <div className="products__filters">
                    <button
                        type="button"
                        className={activeCategory === 'Todos' ? 'is-active' : ''}
                        onClick={() => onCategoryChange('Todos')}
                    >
                        Todos
                    </button>
                    {categories.map((category) => (
                        <button
                            key={category}
                            type="button"
                            className={activeCategory === category ? 'is-active' : ''}
                            onClick={() => onCategoryChange(category)}
                        >
                            {category}
                        </button>
                    ))}
                </div>
            </div>

            {loading && (
                <div className="products__status">
                    <span className="spinner" aria-hidden="true" />
                    <p>Carregando produtos...</p>
                </div>
            )}

            {!loading && error && (
                <div className="products__status">
                    <p>Não foi possível carregar os produtos agora. Tente novamente em instantes.</p>
                </div>
            )}

            {!loading && !error && products.length === 0 && (
                <div className="products__status">
                    <p>Nenhum produto encontrado nessa categoria.</p>
                </div>
            )}

            {!loading && !error && products.length > 0 && (
                <div className="products__grid">
                    {products.map((product) => (
                        <ProductCard key={product.id} product={product} onAdd={onAddToCart} />
                    ))}
                </div>
            )}
        </section>
    )
}

export default ProductList