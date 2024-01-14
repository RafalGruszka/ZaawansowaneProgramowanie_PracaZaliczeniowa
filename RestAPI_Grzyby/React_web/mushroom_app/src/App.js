import React, { useState, useEffect } from "react";
//import { useNavigate } from "react-router-dom";
import api from "./api";

const App = () => {
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

//  const navigate = useNavigate();
//  const [postResponse, setPostResponse] = useState(null);

  const [dropdownOptions, setDropdownOptions] = useState({});
  const [response, setResponse] = useState(null);

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


//  const handleBackClick = () => {
//    navigate(-1);
//  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post("/grzyby/klasyfikuj/", formData);
      // Handle the response from the server (show result to the user)
      setResponse(response.data);
      console.log(response.data);
    } catch (error) {
      // Handle errors (show an error message to the user)
      console.error("Error submitting form:", error.message);
    }
  };

  return (
    <div>
      <nav className="navbar mavbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand" href="#">
            Mushroom app
          </a>
        </div>
      </nav>
      <div className="container">
        <form onSubmit={handleFormSubmit}>
          {Object.entries(formData).map(([key, value]) => (
            <div key={key} className="mb-3 mt-3">
              <label htmlFor={key}>{key}:</label>
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
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
            {response && (
              <div>
                <p>{response.rodzaj} z prawdopodobieństwem {response.prawdopodobienstwo}</p>
              </div>
            )}
      </div>
    </div>
  );
};

export default App;