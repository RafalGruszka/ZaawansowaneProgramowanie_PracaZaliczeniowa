import React, {useState, useEffect} from "react"
import api from "./api"

const App = () => {
        const [mushroom, setMushroom] = useState([]);
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

//    const fetchMushroom = async () => {
//        const response = await api.get('/grzyby/klasyfikuj/');
//        setMushroom(response.data)
//    };

//    useEffect(() => {
//        fetchMushroom();
//    }, []);


    const handleInputChange = (event) => {
        const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        await api.post('/grzyby/klasyfikuj/', formData);
//        fetchMushroom();
        setFormData({
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
    };


return(
    <div>
        <nav className= "navbar mavbar-dark bg-primary">
            <div className="container-fluid">
            <a className="navbar-brand" href="#">
                Mushroom app
            </a>
            </div>
        </nav>




    </div>
)

}

export default App;
