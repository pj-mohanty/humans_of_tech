import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './components/Pages/Home';
import Personpage from './components/Pages/Personpage';
import {SearchName} from "./components/Pages/SearchName";
import SignIn from './components/SignIn';
import About from './components/Pages/About';
import Footer from "./components/Pages/Footer";

const App = () => {
    const KEY = "demo";

    return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/personpage" element={<Personpage apiKey={KEY} />} />
            <Route path="/SearchName" element={<SearchName apiKey={KEY} />} />
            <Route path="/SignIn" element={<SignIn />} />
            <Route path="/SearchName" element={<SearchName apiKey={KEY} />} />
            <Route path="/Footer" element={<Footer />} />
            <Route path="/About" element={<About />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;