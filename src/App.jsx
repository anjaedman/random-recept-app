import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
...
function Nav(){
  const { pathname } = useLocation();
  const link = (to, label) => (
    <Link className={`nav-link ${pathname===to ? "active": ""}`} to={to}>{label}</Link>
  );
  return (
    <nav className="navbar">
      <div className="navbar-inner">
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

function App(){
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


// function App() {
//   return (
//     <Router>
//       <nav className="navbar">
//         <Link className="nav-link" to="/">
//           Hem
//         </Link>
//         <Link className="nav-link" to="/beef">
//           Kött
//         </Link>
//         <Link className="nav-link" to="/chicken">
//           Kyckling
//         </Link>
//         <Link className="nav-link" to="/dessert">
//           Dessert
//         </Link>
//         <Link className="nav-link" to="/vegan">
//           Vegansk
//         </Link>
//         <Link className="nav-link" to="/vegeterian">
//           Vegetarisk
//         </Link>
//         <Link className="nav-link" to="/pasta">
//           Pasta
//         </Link>
//         <Link className="nav-link" to="/pork">
//           Fläskkött
//         </Link>
//         <Link className="nav-link" to="/lamb">
//           Lamm
//         </Link>
//       </nav>

//       <Routes>
//         <Route path="/" element={<FrontFood />} />
//         <Route path="/beef" element={<Beef />} />
//         <Route path="/chicken" element={<Chicken />} />
//         <Route path="/dessert" element={<Dessert />} />
//         <Route path="/vegan" element={<Vegan />} />
//         <Route path="/vegeterian" element={<Vegeterian />} />
//         <Route path="/pasta" element={<Pasta />} />
//         <Route path="/pork" element={<Pork />} />
//         <Route path="/lamb" element={<Lamb />} />
//       </Routes>
//     </Router>
//   );
// }


