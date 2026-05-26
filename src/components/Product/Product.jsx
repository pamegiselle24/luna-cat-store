import { useState } from "react";
import styles from "./Product.module.css";
import { TbEyeSearch } from "react-icons/tb";
import { Link } from "react-router-dom";

export const Product = ({ producto }) => {
  const { nombre, precio, stock, imagen, id } = producto;
  const [cantidad, setCantidad] = useState(0);
  const [esFavorito, setEsFavorito] = useState(false);

  const agregarAlCarrito = () => {
    setCantidad(1);
  };

  const incrementar = () => {
    if (cantidad < stock) {
      setCantidad((prev) => prev + 1);
    }
  };

  const decrementar = () => {
    if (cantidad < 1) return;
    setCantidad((prev) => prev - 1);
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
          {cantidad === 0 ? (
            <button className={styles.cartButton} onClick={agregarAlCarrito}>
              Agregar al Carrito
            </button>
          ) : (
            <div className={styles.quantityControls}>
              <button onClick={decrementar}>-</button>
              <span>{cantidad}</span>
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
