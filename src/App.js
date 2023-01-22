import { Link, Route, Routes } from "react-router-dom";
import AddNewCard from "./components/AddNewCard";
import Cards from "./components/Cards";
import Home from "./components/Home";
import './App.scss';

function App() {
  return (
    <>
      <nav className="navbar">
        <h1>Fiszki</h1>
        <ul>
          <li><Link to="/">Fiszki</Link></li>
          <li><Link to="/addNewCard">Dodaj Fiszkę</Link></li>
        </ul>
      </nav>
      <div className="appContainer">
        <Routes>

            <Route path="/" element={<Cards/>}/>
            <Route path="/addNewCard" element={<AddNewCard/>}/>
        </Routes>
      </div>
    </>
  )
}

export default App;
