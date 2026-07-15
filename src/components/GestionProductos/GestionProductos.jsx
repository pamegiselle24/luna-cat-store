import { useState, useEffect } from "react";
import { db } from "../../firebase/config";
import {
  addDoc,
  collection,
  getDocs,
  deleteDoc,
  doc,
  updateDoc,
} from "firebase/firestore";
import { ProductForm } from "../Product/ProductForm/ProductForm";
import styles from "./GestionProductos.module.css";

export const GestionProductos = () => {
  const [products, setProducts] = useState([]);

  const initialStateForm = {
    categoria: "",
    destacado: false,
    detalles: "",
    id: "",
    imagen: "",
    nombre: "",
    precio: "",
    stock: "",
  };
  const [dataForm, setDataForm] = useState(initialStateForm);
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [productToEdit, setProductToEdit] = useState(null);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setDataForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleChangeImage = (e) => {
    setImageFile(e.target.files[0]);
  };

  const cargarProductos = async () => {
    const productsRef = collection(db, "productos");
    const res = await getDocs(productsRef);
    setProducts(
      res.docs.map((doc) => ({ ...doc.data(), firestoreId: doc.id })),
    );
  };

  useEffect(() => {
    cargarProductos();
  }, []);

  const handleEditClick = (product) => {
    setProductToEdit(product);
  };

  const modoEdicion = productToEdit !== null;

  useEffect(() => {
    if (productToEdit) {
      setDataForm(productToEdit);
    } else {
      setDataForm(initialStateForm);
    }
  }, [productToEdit]);

  const handleCancelEdit = () => {
    setProductToEdit(null);
  };

  const handleDelete = async (id) => {
    const confirmation = window.confirm(
      "¿Está seguro de que desea eliminar este producto?",
    );
    if (confirmation) {
      const docRef = doc(db, "productos", id);
      await deleteDoc(docRef);
      setProducts(products.filter((prod) => prod.firestoreId !== id));
      alert("Producto eliminado");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    if (dataForm.nombre.trim() === "" || dataForm.precio <= 0) {
      alert(
        "Por favor, complete todos los campos y asegúrese de que el precio sea mayor a cero.",
      );
      setIsLoading(false);
      return;
    }

    if (!imageFile && !productToEdit) {
      setIsLoading(false);
      return;
    }

    let urlImage = dataForm.imagen;

    if (imageFile) {
      const formData = new FormData();
      formData.append("image", imageFile);
      const API_KEY = "569df46a61e3c48e5f412a9a03e0ae0b";

      try {
        const res = await fetch(
          `https://api.imgbb.com/1/upload?key=${API_KEY}`,
          {
            method: "POST",
            body: formData,
          },
        );
        const dataImgbb = await res.json();

        if (dataImgbb.success) {
          urlImage = dataImgbb.data.url;
        } else {
          throw new Error("La subida de la imagen a Imgbb falló.");
        }
      } catch (error) {
        console.error("Error al subir la imagen:", error);
        alert("Hubo un error al subir la imagen. Por favor, intentá de nuevo.");
        setIsLoading(false);
        return;
      }
    }
    const productComplete = {
      ...dataForm,
      imagen: urlImage,
      id: Number(dataForm.id),
      precio: Number(dataForm.precio),
      stock: Number(dataForm.stock),
    };
    console.log("Enviando producto a Firebase:", productComplete);

    try {
      const productsCollection = collection(db, "productos");
      if (productToEdit) {
        const docRef = doc(db, "productos", productToEdit.firestoreId);
        await updateDoc(docRef, productComplete);
        alert("Producto actualizado con éxito.");
      } else {
        await addDoc(productsCollection, productComplete);
        alert("Producto guardado con éxito.");
      }
      await cargarProductos();

      setDataForm(initialStateForm);
      setImageFile(null);
      setProductToEdit(null);
    } catch (error) {
      console.error("Error en el proceso de envío:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Gestión de Productos</h2>
      <hr className={styles.divider} />
      <ProductForm
        dataForm={dataForm}
        isLoading={isLoading}
        handleChange={handleChange}
        handleChangeImage={handleChangeImage}
        handleSubmit={handleSubmit}
        modoEdicion={modoEdicion}
        handleCancelEdit={handleCancelEdit}
      />

      <hr className={styles.divider} />
      <h3 className={styles.listTitle}>Lista de Productos</h3>
      <ul className={styles.grid}>
        {products.map((prod) => (
          <li key={prod.id} className={styles.card}>
            <div className={styles.cardInfo}>{prod.nombre}</div>

            <div className={styles.cardPrice}>${prod.precio}</div>
            <div className={styles.cardActions}>
              <button
                className={styles.editButton}
                onClick={() => handleEditClick(prod)}
              >
                Editar
              </button>
              <button
                className={styles.deleteButton}
                onClick={() => handleDelete(prod.firestoreId)}
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};
