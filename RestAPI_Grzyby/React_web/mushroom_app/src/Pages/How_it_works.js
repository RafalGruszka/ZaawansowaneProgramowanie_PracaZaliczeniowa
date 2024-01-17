import React, { useState, useEffect } from "react";
import api from "./../api";

export default function How_it_works() {
  const [image, setImage] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/get-explanation");
        const blob = await response.blob();
        const imageURL = URL.createObjectURL(blob);
        setImage(imageURL);
      } catch (error) {
        console.error("Błąd pobierania danych:", error);
      }
    };

    fetchData();
  }, []);


  return (
    <div>
      <h1>Decision tree</h1>
      {image && <img src={image} alt="Explanation" className="full-screen-image" />}
    </div>
  );
}