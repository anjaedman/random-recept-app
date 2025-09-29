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
  const ref = useRef(null);
  const [hasOverflow, setHasOverflow] = useState(false);

  const link = (to, label) => (
    <Link className={`nav-link ${pathname === to ? "active" : ""}`} to={to}>
      {label}
    </Link>
  );

  // Kolla om raden är bredare än skärmen → visa pilar + gradient
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const check = () => setHasOverflow(el.scrollWidth > el.clientWidth);
    check();
    const ro = new ResizeObserver(check);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // När route ändras: scrolla den aktiva länken i fokus
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const active = el.querySelector(".nav-link.active");
    if (active) {
      active.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    } else {
      el.scrollLeft = 0; // fallback
    }
  }, [pathname]);

  const scrollBy = (dx) => {
    const el = ref.current;
    if (el) el.scrollBy({ left: dx, behavior: "smooth" });
  };

  return (
    <nav className={`navbar ${hasOverflow ? "has-scroll" : ""}`}>
      {hasOverflow && (
        <>
          <button
            className="nav-scroll left"
            aria-label="Scrolla vänster"
            onClick={() => scrollBy(-180)}
          >
            ‹
          </button>
          <button
            className="nav-scroll right"
            aria-label="Scrolla höger"
            onClick={() => scrollBy(180)}
          >
            ›
          </button>
        </>
      )}
      <div className="navbar-inner" ref={ref}>
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
