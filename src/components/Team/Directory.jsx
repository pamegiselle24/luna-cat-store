import { getFirestore, collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase/config";
import { useState, useEffect } from "react";
import { CardContact } from "./CardContact/CardContact";

export const Directory = () => {
  const [team, setTeam] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const teamDB = collection(db, "equipo");

    getDocs(teamDB)
      .then((res) => {
        setTeam(res.docs.map((doc) => ({ ...doc.data() })));
      })
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
  /*
  useEffect(() => {
    fetch("/data/nosotros.json")
      .then((res) => {
        if (!res.ok)
          throw new Error("No se pudo cargar la información de los contactos");
        return res.json();
      })
      .then((data) => setContacts(data))
      .catch((error) => {
        setError(error.message);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, []);
*/
  if (isLoading) {
    return <p>Cargando equipo, por favor espere...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="contacts-container">
      {team.map((item) => (
        <CardContact key={item.id} {...item} />
      ))}
    </div>
  );
};
