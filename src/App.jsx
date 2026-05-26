import { Layout } from "./components/Layout/Layout";
import { ProductListContainer } from "./components/Product/ProductListContainer";
import { FormContainer } from "./components/Product/ProductForm/FormContainer";
import { Routes, Route } from "react-router-dom";
import { Inicio } from "./components/Inicio/Inicio";
import { ProductDetails } from "./components/Product/ProductDetail/ProductDetails";

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Inicio />} />
        <Route
          path="/productos"
          element={<ProductListContainer mensaje="Nuestros productos" />}
        />
        <Route path="/alta-producto" element={<FormContainer />} />
        <Route path="/producto/:id" element={<ProductDetails />} />
        {/*<Route path="/contacto" element={</Contact>}/>*/}
        {/*<Route path="/cart" element={</Cart>}/>*/}
      </Route>
    </Routes>
  );
};

export default App;
