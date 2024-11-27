// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './components/Pages/Home';
import Personpage from './components/Pages/Personpage';
import {SearchName} from "./components/Pages/SearchName";


const App = () => {
    const KEY = "demo";

    return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/personpage" element={<Personpage apiKey={KEY} />} />
            <Route path="/SearchName" element={<SearchName apiKey={KEY} />} /> {/* New route for SearchName */}
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;