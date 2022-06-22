
import './App.css';
import Dropdown from 'react-dropdown';
import DropDown from './Components/DropDown/DropDown';
import 'react-dropdown/style.css';
import Navbar from './Components/Navbar/Navbar';
import Summariser from './pages/Summariser/Summariser';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {
  const options = [
    'one', 'two', 'three'
  ];
  const defaultOption = options[0];
  return (
    <>
    <Navbar />
    <Routes>
  <Route path="/" element={<Summariser />} />
  </Routes>
    </>
  );
}

export default App;
