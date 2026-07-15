import { useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Login.module.css";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const auth = getAuth();

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        //console.log("Usuario logueado:", user);
        alert("¡Inicio de sesión exitoso!");
        navigate("/");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error("Error en el login:", errorCode, errorMessage);
        alert("Error: " + errorMessage);
      });
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Iniciar Sesión 🐾</h2>
      <form className={styles.form} onSubmit={handleLogin}>
        <input
          className={styles.input}
          type="email"
          placeholder="Correo electrónico"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className={styles.input}
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className={styles.button} type="submit">
          Ingresar
        </button>
      </form>
      <p className={styles.registerText}>
        ¿No tenés una cuenta?{" "}
        <Link className={styles.registerLink} to="/registro">
          Registrate aquí
        </Link>
      </p>
    </div>
  );
};
