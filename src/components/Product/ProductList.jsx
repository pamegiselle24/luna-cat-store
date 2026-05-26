import { Product } from "../Product/Product";

export const ProductList = ({ productos }) => {
  return (
    <div className="product-list">
      {productos.map((producto) => (
        <Product key={producto.id} producto={producto} />
      ))}
    </div>
  );
};
