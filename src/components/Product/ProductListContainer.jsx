import { getFirestore, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useState, useEffect } from "react";
import { ProductList } from "./ProductList";

export const ProductListContainer = ({ mensaje, destacados }) => {
  const [productos, setProductos] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const productsDB = collection(db, "productos");

    getDocs(productsDB)
      .then((res) => {
        setProductos(res.docs.map((doc) => ({ ...doc.data() })));
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);

  /*
  useEffect(() => {
    fetch("/data/productos.json")
      .then((respuesta) => {
        if (!respuesta.ok) {
          throw new Error("No se pudo cargar la información de los productos");
        }
        return respuesta.json();
      })
      .then((datos) => {
        setProductos(datos);
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
*/
  if (isLoading) {
    return <p>Cargando productos, por favor espere...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <h2 className="container-subtitle">{mensaje}</h2>
      <div className="container-products">
        <ProductList
          productos={
            destacados ? productos.filter((prod) => prod.destacado) : productos
          }
        />
      </div>
    </>
  );
};
