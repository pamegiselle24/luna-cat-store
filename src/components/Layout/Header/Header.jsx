import styles from "./Header.module.css";
import { Link } from "react-router-dom";
import { useCart } from "../../../context/CartContext";
import { useAuth } from "../../../context/AuthContext";

export const Header = () => {
  const { getCartQuantity } = useCart();
  const totalItems = getCartQuantity();
  const { user, logout } = useAuth();

  return (
    <header className={styles.header}>
      <Link to="/" className={styles.brandLink}>
        <span className={styles.brandText}>Luna Cat Store</span>
      </Link>
      <nav className={styles.nav}>
        <ul className={styles.headerList}>
          <li>
            <Link to="/" className={styles.navLink}>
              Inicio
            </Link>
          </li>
          <li>
            <Link to="/productos" className={styles.navLink}>
              Productos
            </Link>
          </li>
          <li>
            <Link to="/cart" className={styles.cart}>
              🛒 {totalItems > 0 && <span>{totalItems}</span>}
            </Link>
          </li>

          {user ? (
            <>
              {user.rol === "admin" && (
                <>
                  <li>
                    <Link to="/gestion" className={styles.adminLink}>
                      Gestión Productos
                    </Link>
                  </li>
                  <li>
                    <Link to="/gestionCupones" className={styles.adminLink}>
                      Gestión Cupones
                    </Link>
                  </li>
                </>
              )}
              <li>
                <span className={styles.greeting}>¡Hola, {user.email}!</span>
              </li>
              <li>
                <button className={styles.logoutButton} onClick={logout}>
                  Cerrar Sesión
                </button>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login" className={styles.navLink}>
                Login
              </Link>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
};
