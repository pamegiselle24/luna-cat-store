import { Layout } from "./components/Layout/Layout";
import { ProductListContainer } from "./components/Product/ProductListContainer";
import { Routes, Route } from "react-router-dom";
import { Inicio } from "./components/Inicio/Inicio";
import { ProductDetails } from "./components/Product/ProductDetail/ProductDetails";
import { Cart } from "./components/Cart/Cart";
import { GestionProductos } from "./components/GestionProductos/GestionProductos";
import { GestionCupones } from "./components/GestionCupones/GestionCupones";
import { Login } from "./components/Login/Login";
import { Registro } from "./components/Registro/Registro";
import { ProtectedRoute } from "./components/ProtectedRoute/ProtectedRoute";

const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Inicio />} />
        <Route
          path="/productos"
          element={<ProductListContainer mensaje="Nuestros productos" />}
        />
        <Route path="/producto/:id" element={<ProductDetails />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registro" element={<Registro />} />

        <Route element={<ProtectedRoute rolesPermitidos={["admin"]} />}>
          <Route path="/gestion" element={<GestionProductos />} />
          <Route path="/gestionCupones" element={<GestionCupones />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;
