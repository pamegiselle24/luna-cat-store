import styles from "./ProductForm.module.css";

export const ProductForm = ({
  dataForm,
  handleChange,
  handleSubmit,
  handleChangeImage,
  isLoading,
  modoEdicion,
  handleCancelEdit,
}) => {
  return (
    <form onSubmit={handleSubmit} className={styles.productForm}>
      <h3 className={styles.title}>
        {modoEdicion ? "Editar Producto" : "Agregar nuevo producto"}
      </h3>
      <div className={styles.field}>
        <label className={styles.label}>ID:</label>
        <input
          className={styles.input}
          type="number"
          name="id"
          value={dataForm.id}
          onChange={handleChange}
          placeholder="Ej: 11"
        />
      </div>
      <div className={styles.field}>
        <label className={styles.label}>Nombre del Producto:</label>
        <input
          className={styles.input}
          type="text"
          placeholder="Ej: Teclado Mecánico"
          name="nombre"
          value={dataForm.nombre}
          onChange={handleChange}
        />
      </div>
      <div className={styles.field}>
        <label className={styles.label}>Categoría:</label>

        <select
          className={styles.select}
          name="categoria"
          value={dataForm.categoria}
          onChange={handleChange}
        >
          <option value="">Seleccionar</option>
          <option value="Rascadores">Rascadores</option>
          <option value="Descanso">Descanso</option>
          <option value="Juguetes">Juguetes</option>
          <option value="Estetica">Estética e Higiene</option>
        </select>
      </div>
      <div className={styles.field}>
        <label className={styles.label}>Precio: $</label>
        <input
          className={styles.input}
          type="number"
          placeholder="Ej: 95"
          name="precio"
          value={dataForm.precio}
          onChange={handleChange}
        />
      </div>
      <div className={styles.field}>
        <label className={styles.label}>Stock:</label>
        <input
          className={styles.input}
          type="number"
          placeholder="Ej: 5"
          name="stock"
          value={dataForm.stock}
          onChange={handleChange}
        />
      </div>
      <div className={styles.field}>
        <label className={styles.label}>Detalles:</label>

        <textarea
          className={styles.textarea}
          name="detalles"
          value={dataForm.detalles}
          onChange={handleChange}
          rows={4}
          placeholder="Descripción del producto..."
        />
      </div>
      <div className={styles.field}>
        <label className={styles.label}>Imagen:</label>
        <input
          className={styles.fileInput}
          type="file"
          name="imagen"
          onChange={handleChangeImage}
          placeholder="https://..."
        />
        {modoEdicion && dataForm.imagen && (
          <div className={styles.preview}>
            <p className={styles.previewText}>Imagen actual</p>
            <img
              className={styles.previewImage}
              src={dataForm.imagen}
              alt="Vista previa"
            />
          </div>
        )}
      </div>
      <div className={styles.field}>
        <label className={styles.checkbox}>
          <input
            type="checkbox"
            name="destacado"
            checked={dataForm.destacado}
            onChange={handleChange}
          />
          Producto destacado
        </label>
      </div>
      <div className={styles.actions}>
        <button
          type="submit"
          className={styles.submitButton}
          disabled={isLoading}
        >
          {isLoading
            ? "Procesando..."
            : modoEdicion
              ? "Actualizar Producto"
              : "Guardar Producto"}
        </button>
        {modoEdicion && (
          <button type="button" onClick={handleCancelEdit}>
            Cancelar Edición
          </button>
        )}
      </div>
    </form>
  );
};
