import { ProductListContainer } from "../Product/ProductListContainer";

export const Inicio = () => {
  return (
    <>
      <h1>❤️ Bienvenidos a Luna Cat Store 😻</h1>
      <ProductListContainer
        mensaje="Productos destacados del mes"
        destacados={true}
      />
    </>
  );
};
