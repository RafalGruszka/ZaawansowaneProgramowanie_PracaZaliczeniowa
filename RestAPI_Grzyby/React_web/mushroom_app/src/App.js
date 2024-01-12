import React, {useState, useEffect} from "react"
import api from "./api"

const App = () => {
  const [formData, setFormData] = useState({
        ksztalt_kapelusza: '',
        powierzchnia_kapelusza: '',
        kolor_kapelusza: '',
        zasinienia: '',
        zapach: '',
        sposob_przyrastania_blaszek: '',
        odstep_miedzy_blaszkami: '',
        rozmiar_blaszek: '',
        kolor_blaszek: '',
        ksztalt_trzonu: '',
        korzen_trzonu: '',
        powierzchnia_trzonu_nad_pierscieniem: '',
        powierzchnia_lodygi_ponizej_pierscienia: '',
        kolor_trzonu_nad_pierscieniem: '',
        kolor_trzonu_pod_pierscieniem: '',
        rodzaj_oslony: '',
        kolor_oslony: '',
        liczba_pierscieni: '',
        rodzaj_pierscienia: '',
        kolor_wysypu_zarodnikow: '',
        populacja: '',
        srodowisko: ''
    });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:8000/get-data");
        const data = await response.json();
        setFormData(data);
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

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await api.post("/grzyby/klasyfikuj/", formData);
      // Handle the response from the server (show result to the user)
      console.log(response.data);
    } catch (error) {
      // Handle errors (show an error message to the user)
      console.error("Error submitting form:", error.message);
    }

    // Clear the form after submission
    setFormData({
        ...formData,
        ksztalt_kapelusza: formData.ksztalt_kapelusza,
        powierzchnia_kapelusza: "",
        kolor_kapelusza: '',
        zasinienia: '',
        zapach: '',
        sposob_przyrastania_blaszek: '',
        odstep_miedzy_blaszkami: '',
        rozmiar_blaszek: '',
        kolor_blaszek: '',
        ksztalt_trzonu: '',
        korzen_trzonu: '',
        powierzchnia_trzonu_nad_pierscieniem: '',
        powierzchnia_lodygi_ponizej_pierscienia: '',
        kolor_trzonu_nad_pierscieniem: '',
        kolor_trzonu_pod_pierscieniem: '',
        rodzaj_oslony: '',
        kolor_oslony: '',
        liczba_pierscieni: '',
        rodzaj_pierscienia: '',
        kolor_wysypu_zarodnikow: '',
        populacja: '',
        srodowisko: ''
    });
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
                {Array.isArray(value)
                  ? value.map((option) => (
                      <option key={option} value={option}>
                        {option}
                      </option>
                    ))
                  : (
                      <option key={value} value={value}>
                        {value}
                      </option>
                  )
                }
              </select>
            </div>
          ))}
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
