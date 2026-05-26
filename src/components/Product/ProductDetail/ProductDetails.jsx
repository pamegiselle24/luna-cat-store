import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./ProductDetail.module.css";

export const ProductDetails = () => {
  const [producto, setProducto] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  useEffect(() => {
    fetch("/data/productos.json")
      .then((res) => {
        if (!res.ok) {
          throw new Error("No se pudo cargar la información del producto");
        }
        return res.json();
      })
      .then((data) => {
        const detailProduct = data.find((prod) => prod.id === Number(id));
        setProducto(detailProduct);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return <p>Cargando detalle del producto...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  if (!producto) {
    return <p>Producto no encontrado</p>;
  }

  const { nombre, precio, imagen, detalles } = producto;

  return (
    <div className={styles.productDetailContainer}>
      <div className={styles.cardProduct}>
        <h2 className={styles.subtitle}>Detalle del producto</h2>
        <div className={styles.imageContainer}>
          <img src={imagen} alt={nombre} />
        </div>

        <div className={styles.cardBody}>
          <h3>{nombre}</h3>
          <p className={styles.details}>{detalles}</p>
          <p className={styles.price}>Precio: ${precio}</p>
        </div>
      </div>
    </div>
  );
};
