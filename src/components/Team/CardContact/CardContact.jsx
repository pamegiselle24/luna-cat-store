import styles from "./CardContact.module.css";
import { FaLinkedin } from "react-icons/fa";

export const CardContact = ({ nombre, rol, fotoURL }) => {
  return (
    <div className={styles.cardContact}>
      <div className={styles.imgContainer}>
        <img src={fotoURL} alt={rol} />
      </div>
      <div className={styles.cardBody}>
        <h3>{nombre}</h3>
        <h4>{rol}</h4>
        <a
          href="#"
          onClick={(e) => e.preventDefault()}
          className={styles.linkedin}
        >
          {" "}
          <FaLinkedin />
          LinkedIn
        </a>
      </div>
    </div>
  );
};
