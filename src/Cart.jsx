import { useState } from 'react'

const currency = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
})

function Cart({ items, isOpen, onClose, onUpdateQty, onRemove, onCheckout }) {
    const [status, setStatus] = useState('idle') // idle | processing | success | error

    const subtotal = items.reduce((total, item) => total + item.price * item.qty, 0)

    async function handleCheckout() {
        setStatus('processing')
        try {
            await onCheckout()
            setStatus('success')
        } catch (err) {
            setStatus('error')
        }
    }

    function handleClose() {
        setStatus('idle')
        onClose()
    }

    return (
        <>
            <div
                className={`cart-overlay${isOpen ? ' is-open' : ''}`}
                onClick={handleClose}
                aria-hidden="true"
            />
            <aside className={`cart${isOpen ? ' is-open' : ''}`} aria-label="Carrinho de compras">
                <div className="cart__header">
                    <h2>Seu carrinho</h2>
                    <button type="button" className="cart__close" onClick={handleClose} aria-label="Fechar carrinho">
                        ×
                    </button>
                </div>

                {items.length === 0 && status !== 'success' && (
                    <p className="cart__empty">Seu carrinho está vazio. Que tal escolher algo sustentável?</p>
                )}

                {status === 'success' ? (
                    <div className="cart__success">
                        <p>Pedido confirmado.</p>
                        <span>Você receberá um e-mail com os detalhes da entrega.</span>
                        <button type="button" onClick={handleClose}>
                            Continuar navegando
                        </button>
                    </div>
                ) : (
                    <>
                        <ul className="cart__list">
                            {items.map((item) => (
                                <li key={item.id} className="cart__item">
                                    <div
                                        className="cart__item-swatch"
                                        style={{
                                            background: `linear-gradient(135deg, ${item.swatch[0]}, ${item.swatch[1]})`,
                                        }}
                                    />
                                    <div className="cart__item-info">
                                        <span className="cart__item-name">{item.name}</span>
                                        <span className="cart__item-price">{currency.format(item.price)}</span>

                                        <div className="cart__item-qty">
                                            <button type="button" onClick={() => onUpdateQty(item.id, item.qty - 1)}>
                                                −
                                            </button>
                                            <span>{item.qty}</span>
                                            <button type="button" onClick={() => onUpdateQty(item.id, item.qty + 1)}>
                                                +
                                            </button>
                                        </div>
                                    </div>
                                    <button
                                        type="button"
                                        className="cart__item-remove"
                                        onClick={() => onRemove(item.id)}
                                        aria-label={`Remover ${item.name}`}
                                    >
                                        Remover
                                    </button>
                                </li>
                            ))}
                        </ul>

                        {items.length > 0 && (
                            <div className="cart__footer">
                                <div className="cart__subtotal">
                                    <span>Subtotal</span>
                                    <strong>{currency.format(subtotal)}</strong>
                                </div>

                                {status === 'error' && (
                                    <p className="cart__error">
                                        Não foi possível confirmar o pedido. Tente novamente.
                                    </p>
                                )}

                                <button
                                    type="button"
                                    className="cart__checkout"
                                    onClick={handleCheckout}
                                    disabled={status === 'processing'}
                                >
                                    {status === 'processing' ? 'Confirmando pedido...' : 'Finalizar compra'}
                                </button>
                            </div>
                        )}
                    </>
                )}
            </aside>
        </>
    )
}

export default Cart