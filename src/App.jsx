import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useLocation,
} from "react-router-dom";

import FrontFood from "./screens/FrontFoodScreen";
import Beef from "./screens/BeefScreen";
import Chicken from "./screens/ChickenScreen";
import Dessert from "./screens/DessertScreen";
import Vegan from "./screens/VeganScreen";
import Vegeterian from "./screens/VegeterianScreen";
import Pasta from "./screens/PastaScreen";
import Pork from "./screens/PorkScreen";
import Lamb from "./screens/LambScreen";

function Nav() {
  const { pathname } = useLocation();
  const link = (to, label) => (
    <Link className={`nav-link ${pathname === to ? "active" : ""}`} to={to}>
      {label}
    </Link>
  );

  return (
    <nav className="navbar">
      <div className="navbar-inner two-rows">
        {link("/", "Hem")}
        {link("/beef", "Kött")}
        {link("/chicken", "Kyckling")}
        {link("/dessert", "Dessert")}
        {link("/vegan", "Vegansk")}
        {link("/vegeterian", "Vegetarisk")}
        {link("/pasta", "Pasta")}
        {link("/pork", "Fläskkött")}
        {link("/lamb", "Lamm")}
      </div>
    </nav>
  );
}

function App() {
  return (
    <Router>
      <Nav />
      <div className="page">
        <Routes>
          <Route path="/" element={<FrontFood />} />
          <Route path="/beef" element={<Beef />} />
          <Route path="/chicken" element={<Chicken />} />
          <Route path="/dessert" element={<Dessert />} />
          <Route path="/vegan" element={<Vegan />} />
          <Route path="/vegeterian" element={<Vegeterian />} />
          <Route path="/pasta" element={<Pasta />} />
          <Route path="/pork" element={<Pork />} />
          <Route path="/lamb" element={<Lamb />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
