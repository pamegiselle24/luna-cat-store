import { useEffect, useState } from "react";
import { db } from "../../firebase/config";
import {
  addDoc,
  doc,
  collection,
  getDocs,
  deleteDoc,
  updateDoc,
} from "firebase/firestore";
import styles from "./GestionCupones.module.css";

export const GestionCupones = () => {
  const [cupones, setCupones] = useState([]);

  const initialStateForm = {
    codigo: "",
    descuento: "",
  };

  const [dataForm, setDataForm] = useState(initialStateForm);
  const [cuponAEditar, setCuponAEditar] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm((prev) => ({ ...prev, [name]: value }));
  };

  const obtenerCupones = async () => {
    try {
      const cuponesRef = collection(db, "cupones");
      const res = await getDocs(cuponesRef);

      setCupones(res.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    } catch (error) {
      console.error("Error al obtener cupones:", error);
      alert("Ocurrió un error al cargar los cupones.");
    }
  };

  useEffect(() => {
    obtenerCupones();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!dataForm.codigo || !dataForm.descuento) {
      alert("Complete todos los campos");
      return;
    }

    const porcentaje = Number(dataForm.descuento);

    if (porcentaje < 1 || porcentaje > 100) {
      alert("El descuento debe estar entre 1 y 100");
      return;
    }

    const cuponComplete = { ...dataForm, descuento: porcentaje };

    try {
      if (cuponAEditar) {
        await updateDoc(doc(db, "cupones", cuponAEditar.id), cuponComplete);
        alert("Cupón editado correctamente");
      } else {
        const cuponesRef = collection(db, "cupones");
        await addDoc(cuponesRef, cuponComplete);
        alert("Cupón creado correctamente");
      }

      setDataForm(initialStateForm);
      setCuponAEditar(null);
      await obtenerCupones();
    } catch (error) {
      console.error(error);
      alert("Error al crear el cupón");
    }
  };

  const handleEditCupon = (cupon) => {
    setCuponAEditar(cupon);
    setDataForm({ codigo: cupon.codigo, descuento: cupon.descuento });
  };

  const handleDelete = async (id) => {
    const confirmation = window.confirm(
      "¿Está seguro de que desea eliminar este cupón?",
    );
    if (confirmation) {
      const docRef = doc(db, "cupones", id);
      await deleteDoc(docRef);

      alert("Cupón eliminado");

      if (cuponAEditar?.id === id) {
        setCuponAEditar(null);
        setDataForm(initialStateForm);
      }

      await obtenerCupones();
    }
  };

  const handleCancelEdit = () => {
    setCuponAEditar(null);
    setDataForm(initialStateForm);
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Administración de cupones</h2>

      <form onSubmit={handleSubmit} className={styles.form}>
        <input
          className={styles.input}
          type="text"
          placeholder="Código"
          name="codigo"
          value={dataForm.codigo}
          onChange={handleChange}
          required
        />

        <input
          className={styles.input}
          type="number"
          placeholder="Descuento"
          name="descuento"
          min="1"
          max="100"
          value={dataForm.descuento}
          onChange={handleChange}
        />
        <div className={styles.actions}>
          <button type="submit" className={styles.submitButton}>
            {cuponAEditar ? "Actualizar Cupón" : "Crear Cupón"}
          </button>
          {cuponAEditar && (
            <button
              type="button"
              onClick={handleCancelEdit}
              className={styles.cancelButton}
            >
              Cancelar
            </button>
          )}
        </div>
      </form>

      <hr className={styles.divider} />

      <h3 className={styles.listTitle}>Listado de Cupones</h3>

      <div className={styles.grid}>
        {cupones.map((cupon) => (
          <div key={cupon.id} className={styles.card}>
            <p>
              <span className={styles.label}>Código: </span>
              <span className={styles.value}>{cupon.codigo}</span>
            </p>
            <p>
              <span className={styles.label}>Descuento: </span>
              <span className={styles.value}>{cupon.descuento}%</span>
            </p>
            <div className={styles.cardActions}>
              <button
                className={styles.editButton}
                onClick={() => handleEditCupon(cupon)}
              >
                Editar
              </button>
              <button
                className={styles.deleteButton}
                onClick={() => handleDelete(cupon.id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
