import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Repo from './pages/Repo';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/repo/:id" element={<Repo />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
