import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Main from './components/Main';
import RegisterTour from './components/RegisterTour';
import Login from './components/Login';
import ReserveTour from './pages/ReserveTour';
import MyReservations from './pages/MyReservations';



function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register-tour" element={<RegisterTour />} />
        <Route path="/reserve/:tourId" element={<ReserveTour />} />
        <Route path="/my-reservations" element={<MyReservations />} />
      </Routes>
    </Router>
  );
}

export default App;
