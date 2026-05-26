import styles from "./Header.module.css";
import { Link } from "react-router-dom";

export const Header = () => {
  return (
    <header className={styles.header}>
      <Link to="/" className={styles.brandLink}>
        <img src="/images/brand.png" alt="brand" />
      </Link>
      <nav>
        <ul className={styles.headerList}>
          <li>
            <Link to="/">Inicio</Link>
          </li>
          <li>
            <Link to="/productos">Productos</Link>
          </li>
          <li>
            <Link to="/alta-producto">Nuevo Producto</Link>
          </li>
          <li>
            <Link to="#">Contacto</Link>
          </li>
          <li>
            <Link to="#" className={styles.cart}>
              🛒
            </Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};
