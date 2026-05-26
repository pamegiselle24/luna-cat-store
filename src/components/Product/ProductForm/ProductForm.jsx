export const ProductForm = ({
  dataForm,
  handleChange,
  handleSubmit,
  handleChangeImage,
  isLoading,
}) => {
  return (
    <form onSubmit={handleSubmit} className="productForm">
      <h3>Agregar nuevo producto</h3>
      <div>
        <label>Nombre del Producto:</label>
        <input
          type="text"
          placeholder="Ej: Teclado Mecánico"
          name="name"
          value={dataForm.name}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Precio: $</label>
        <input
          type="number"
          placeholder="Ej: 95"
          name="price"
          value={dataForm.price}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Stock:</label>
        <input
          type="number"
          placeholder="Ej: 5"
          name="stock"
          value={dataForm.stock}
          onChange={handleChange}
        />
      </div>
      <div>
        <label>Imagen:</label>
        <input
          type="file"
          onChange={handleChangeImage}
          placeholder="https://..."
        />
      </div>
      <button type="submit" disabled={isLoading}>
        {!isLoading ? "Guardar Producto" : "Guardando..."}
      </button>
    </form>
  );
};
