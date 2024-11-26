// import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Navbar from './components/Navbar';
import Home from './components/Pages/Home';
import Personpage from './components/Pages/Personpage';


const App = () => {
  return (
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/personpage" element={<Personpage />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
};

export default App;