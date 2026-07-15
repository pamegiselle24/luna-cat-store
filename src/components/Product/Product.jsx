import { useState } from "react";
import styles from "./Product.module.css";
import { TbEyeSearch } from "react-icons/tb";
import { Link } from "react-router-dom";
import { useCart } from "../../context/CartContext";

export const Product = ({ producto }) => {
  const { nombre, precio, stock, imagen, id } = producto;
  const [esFavorito, setEsFavorito] = useState(false);
  const { addToCart, getCurrentQuantity, decreaseQuantity } = useCart();

  const currentQuantity = getCurrentQuantity(id);

  const incrementar = () => {
    if (currentQuantity < stock) {
      addToCart(producto, 1);
    }
  };

  const decrementar = () => {
    if (currentQuantity < 1) return;
    decreaseQuantity(producto);
  };

  return (
    <div className={styles.cardProduct}>
      <div className={styles.imageContainer}>
        <img src={imagen} alt={nombre} />
        <div className={styles.overlay}>
          <Link to={`/producto/${id}`}>
            <TbEyeSearch />
          </Link>
        </div>
      </div>

      <div className={styles.cardBody}>
        <h3>{nombre}</h3>
        <p>Precio: ${precio}</p>
        <p>Stock disponible: {stock}</p>

        <div className={styles.cartActions}>
          {currentQuantity === 0 ? (
            <button
              className={styles.cartButton}
              onClick={() => addToCart(producto, 1)}
            >
              Agregar al Carrito
            </button>
          ) : (
            <div className={styles.quantityControls}>
              <button onClick={decrementar}>-</button>
              <span>{currentQuantity}</span>
              <button onClick={incrementar}>+</button>
            </div>
          )}

          <button
            className={styles.favButton}
            onClick={() => setEsFavorito(!esFavorito)}
          >
            {esFavorito ? "⭐" : "☆"}
          </button>
        </div>
      </div>
    </div>
  );
};
