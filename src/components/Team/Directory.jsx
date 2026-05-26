import { useState, useEffect } from "react";
import { CardContact } from "./CardContact/CardContact";

export const Directory = () => {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

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

  if (isLoading) {
    return <p>Cargando equipo, por favor espere...</p>;
  }
  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="contacts-container">
      {contacts.map((contact) => (
        <CardContact key={contact.id} {...contact} />
      ))}
    </div>
  );
};
