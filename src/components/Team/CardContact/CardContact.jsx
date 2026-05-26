import styles from "./CardContact.module.css";

export const CardContact = ({ nombre, email, puesto, foto }) => {
  return (
    <div className={styles.cardContact}>
      <div className={styles.imgContainer}>
        <img src={foto} alt={puesto} />
      </div>
      <div className={styles.cardBody}>
        <h3>{nombre}</h3>
        <h4>{puesto}</h4>
        <p>{email}</p>
      </div>
    </div>
  );
};
