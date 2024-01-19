import React, { useState, useEffect } from "react";
import api from "./../api";
import "./../styles.css";

export default function Main_page() {
  const [formData, setFormData] = useState({
    ksztalt_kapelusza: "",
    powierzchnia_kapelusza: "",
    kolor_kapelusza: "",
    zasinienia: "",
    zapach: "",
    sposob_przyrastania_blaszek: "",
    odstep_miedzy_blaszkami: "",
    rozmiar_blaszek: "",
    kolor_blaszek: "",
    ksztalt_trzonu: "",
    korzen_trzonu: "",
    powierzchnia_trzonu_nad_pierscieniem: "",
    powierzchnia_lodygi_ponizej_pierscienia: "",
    kolor_trzonu_nad_pierscieniem: "",
    kolor_trzonu_pod_pierscieniem: "",
    rodzaj_oslony: "",
    kolor_oslony: "",
    liczba_pierscieni: "",
    rodzaj_pierscienia: "",
    kolor_wysypu_zarodnikow: "",
    populacja: "",
    srodowisko: "",
  });

  const [dropdownOptions, setDropdownOptions] = useState({});
  const [response, setResponse] = useState(null);
  const [imageEdible, setImageEdible] = useState(null);
  const [imagePoisonous, setImagePoisonous] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/get-data");
        const data = await response.json();
        setDropdownOptions(data);
      } catch (error) {
        console.error("Błąd pobierania danych:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const capitalizeFirstLetter = (string) => {
    const text = string.replace(/_/g, ' ');
    return text.charAt(0).toUpperCase() + text.slice(1);
  };

  const fetchImage = async (url, setImage) => {
    try {
      const response = await fetch(url);
      if (response.ok) {
        const blob = await response.blob();
        const imageURL = URL.createObjectURL(blob);
        setImage(imageURL);
      } else {
        console.error("Error fetching image:", response.status);
      }
    } catch (error) {
      console.error("Error fetching image:", error.message);
    }
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post("/grzyby/klasyfikuj/", formData);
      setResponse(response.data);

      await fetchImage("http://localhost:8000/get/image/edible", setImageEdible);
      await fetchImage("http://localhost:8000/get/image/poisonous", setImagePoisonous);

      console.log(response.data);
    } catch (error) {
      console.error("Error submitting form:", error.message);

      if (error.message === "Failed to fetch") {
        alert("Błąd podczas wysyłania żądania. Sprawdź połączenie internetowe.");
      } else {
        alert("Nie wszystkie informacje zostały podanę, sprawdź je.");
      }
    }
  };

  return (
    <div>
      <div className="container">
        <form onSubmit={handleFormSubmit}>
          {Object.entries(formData).map(([key, value]) => (
            <div key={key} className="mb-3 mt-3">
              <label htmlFor={key}>{capitalizeFirstLetter(key)}:</label>
              <select
                id={key}
                name={key}
                value={formData[key]}
                onChange={handleInputChange}
              >
                <option value="">Wybierz...</option>
                {dropdownOptions[key]?.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          ))}
          <button
            type="submit"
            className="btn btn-primary"
            style={{ backgroundColor: "#555" }}
          >
            Submit
          </button>
        </form>
        {response && (
          <div className="response-container">
                <p className="response-text">
                  Twój grzyb jest {response.rodzaj} z prawdopodobieństwem{" "}
                  {response.prawdopodobienstwo}.
                  {response.rodzaj === "jadalny" && (
                    <> Jeśli wygląda podobnie do tego na obrazku, jest jak najbardziej jadalny!</>
                  )}
                  {response.rodzaj !== "jadalny" && (
                    <> Jeśli wygląda podobnie do tego na obrazku, lepiej się go pozbądź!</>
                  )}
                </p>
            <div style={{ position: "relative", width: "100%" }}>
              {response.rodzaj === "jadalny" && (
                <img className="image"
                  src={imageEdible}
                  alt="Edible"
                />
              )}
              {response.rodzaj !== "jadalny" && (
                <img className="image"
                  src={imagePoisonous}
                  alt="Poisonous"
                />
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}