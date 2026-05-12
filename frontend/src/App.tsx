import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import LandingPage from './pages/LandingPage';
import DonorForm from './pages/DonorForm';
import PaymentPage from './pages/PaymentPage';
import SuccessPage from './pages/SuccessPage';

function App() {
  return (
    <Router>
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#363636',
            color: '#fff',
          },
          success: {
            duration: 3000,
            iconTheme: {
              primary: '#10b981',
              secondary: '#fff',
            },
          },
          error: {
            duration: 4000,
            iconTheme: {
              primary: '#ef4444',
              secondary: '#fff',
            },
          },
        }}
      />
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/donate" element={<DonorForm />} />
        <Route path="/payment/:donationId" element={<PaymentPage />} />
        <Route path="/success/:donationId" element={<SuccessPage />} />
      </Routes>
    </Router>
  );
}

export default App;
