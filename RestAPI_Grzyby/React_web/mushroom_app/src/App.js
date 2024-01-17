import Navbar from "./Navbar"
import "./styles.css"
import How_it_works from "./Pages/How_it_works"
import Main_page from "./Pages/Main_page"

const App = () => {

let Component

switch (window.location.pathname) {
    case "/":
        Component = Main_page
        break
    case "/how_it_works":
        Component = How_it_works
        break
}

return (
    <>
    <Navbar/>
    <Component/>
    </>
)
};

export default App;