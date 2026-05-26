import { ProductForm } from "./ProductForm";
import { useState } from "react";

export const FormContainer = () => {
  const [dataForm, setDataForm] = useState({
    name: "",
    price: "",
    stock: "",
  });
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setDataForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleChangeImage = (e) => {
    setImageFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    if (!imageFile) {
      alert("Por favor, selecciona una imagen para el producto.");
      return;
    }
    const API_KEY = "569df46a61e3c48e5f412a9a03e0ae0b";
    const formData = new FormData();
    formData.append("image", imageFile);

    try {
      const res = await fetch(`https://api.imgbb.com/1/upload?key=${API_KEY}`, {
        method: "POST",
        body: formData,
      });
      const dataImgbb = await res.json();
      const urlImage = dataImgbb.data.url;

      if (dataImgbb.success) {
        console.log("Imagen subida con éxito. URL:", urlImage);

        const productComplete = { ...dataForm, urlImage: urlImage };
        console.log("Producto listo para enviar:", productComplete);
      } else {
        throw new Error("La subida de la imagen a Imgbb falló.");
      }
    } catch (error) {
      console.error("Error en el proceso de envío:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ProductForm
      dataForm={dataForm}
      handleSubmit={handleSubmit}
      handleChange={handleChange}
      handleChangeImage={handleChangeImage}
      isLoading={isLoading}
    />
  );
};
