import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from './Pages/Homepage/HomePage';
import Proklatie from './Pages/Proklatie/Proklatie';
import Circ from './Pages/Circ/Circ';
import Povorot from './Pages/Povorot/Povorot';
import LastGame from 'Pages/LastGame/LastGame';
import ClinicDeath from 'Pages/clinicDeath/ClinicDeath';
import s from './App.module.css';
import Modal from 'react-modal';

Modal.setAppElement('#root');

function App() {
  return (
    <Router basename="/">
      <div className={s.content}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/proklyattya" element={<Proklatie />} />
          <Route path="/circus" element={<Circ />} />
          <Route path="/povorot" element={<Povorot />} />
          <Route path="/lastGame" element={<LastGame />} />
          <Route path="/clinic" element={<ClinicDeath />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
