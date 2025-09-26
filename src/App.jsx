import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import FrontFood from "./screens/FrontFoodScreen";
import Beef from "./screens/BeefScreen";
import Chicken from "./screens/ChickenScreen";
import Dessert from "./screens/DessertScreen";
import Vegan from "./screens/VeganScreen";
import Vegeterian from "./screens/VegeterianScreen";
import Pasta from "./screens/PastaScreen";
import Pork from "./screens/PorkScreen";
import Lamb from "./screens/LambScreen";

function App() {
  return (
    <Router>
      <nav className="navbar">
        <Link className="nav-link" to="/">
          Hem
        </Link>
        <Link className="nav-link" to="/beef">
          Kött
        </Link>
        <Link className="nav-link" to="/chicken">
          Kyckling
        </Link>
        <Link className="nav-link" to="/dessert">
          Dessert
        </Link>
        <Link className="nav-link" to="/vegan">
          Vegansk
        </Link>
        <Link className="nav-link" to="/vegeterian">
          Vegetarisk
        </Link>
        <Link className="nav-link" to="/pasta">
          Pasta
        </Link>
        <Link className="nav-link" to="/pork">
          Fläskkött
        </Link>
        <Link className="nav-link" to="/lamb">
          Lamm
        </Link>
      </nav>

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
    </Router>
  );
}

export default App;
