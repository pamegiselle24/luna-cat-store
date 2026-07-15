import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import styles from "./Cart.module.css";

export const Cart = () => {
  const { cart, clearCart, getCartTotal, removeItem } = useCart();

  if (cart.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        <h1 className={styles.emptyTitle}>El carrito está vacío</h1>
        <p className={styles.emptyText}>
          Agrega productos para continuar la compra.
        </p>
        <Link to="/productos" className={styles.linkButton}>
          Ver Productos
        </Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Carrito de Compras</h1>
      {cart.map((item) => (
        <div key={item.id} className={styles.cartItem}>
          <h4 className={styles.itemName}>{item.nombre}</h4>
          <p className={styles.itemDetail}>Cantidad: {item.quantity}</p>
          <p className={styles.itemDetail}>Precio unitario: ${item.precio}</p>
          <p className={styles.itemSubtotal}>
            Subtotal: ${item.precio * item.quantity}
          </p>
          <button
            type="button"
            onClick={() => removeItem(item.id)}
            className={styles.removeButton}
          >
            Eliminar producto
          </button>
        </div>
      ))}
      <hr className={styles.divider} />
      <h3 className={styles.total}>Total a pagar: ${getCartTotal()}</h3>
      <div className={styles.actions}>
        <button onClick={clearCart} className={styles.clearButton}>
          Vaciar Carrito
        </button>
        <Link to="/" className={styles.linkButton} onClick={clearCart}>
          Finalizar Compra
        </Link>
      </div>
    </div>
  );
};
