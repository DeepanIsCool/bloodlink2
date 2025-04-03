import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { useState, useEffect } from 'react';

// Pages
import Home from './pages/Home';
import RecipientPage from './pages/RecipientPage';
import DonorProfile from './pages/DonorProfile';
import DonationPage from './pages/DonationPage';
import BloodBankProfile from './pages/BloodBankProfile';
import DonorList from './pages/DonorList';
import Inventory from './pages/Inventory';
import Login from './pages/Login';
import Register from './pages/Register';

// Components
import ProtectedRoute from './components/ProtectedRoute';
import Navbar from './components/Navbar';

// Import our animation utilities
import { PageTransition, PulseAnimation } from './utils/animations';

function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading resources
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-screen bg-black">
        <div className="text-center animate-fadeIn">
          <PulseAnimation duration={2000}>
            <h1 className="text-4xl font-bold text-blood-red mb-4">BloodLink</h1>
          </PulseAnimation>
          <div className="w-16 h-16 border-4 border-t-blood-red border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mx-auto"></div>
        </div>
      </div>
    );
  }

  return (
    <AuthProvider>
      <Router>
        <div className="min-h-screen bg-gray-50">
          <Navbar />
          <main className="container mx-auto px-4 py-8">
            <PageTransition>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/recipient" element={<RecipientPage />} />
              
              {/* Donor Routes */}
              <Route path="/donor/login" element={<Login userType="donor" />} />
              <Route path="/donor/register" element={<Register userType="donor" />} />
              <Route 
                path="/donor/profile" 
                element={
                  <ProtectedRoute userType="donor">
                    <DonorProfile />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/donor/donate" 
                element={
                  <ProtectedRoute userType="donor">
                    <DonationPage />
                  </ProtectedRoute>
                } 
              />
              
              {/* BloodBank Routes */}
              <Route path="/bloodbank/login" element={<Login userType="bloodbank" />} />
              <Route path="/bloodbank/register" element={<Register userType="bloodbank" />} />
              <Route 
                path="/bloodbank/profile" 
                element={
                  <ProtectedRoute userType="bloodbank">
                    <BloodBankProfile />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/bloodbank/donors" 
                element={
                  <ProtectedRoute userType="bloodbank">
                    <DonorList />
                  </ProtectedRoute>
                } 
              />
              <Route 
                path="/bloodbank/inventory" 
                element={
                  <ProtectedRoute userType="bloodbank">
                    <Inventory />
                  </ProtectedRoute>
                } 
              />
              
              {/* Fallback route */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
            </PageTransition>
          </main>
          <footer className="bg-black text-white py-6">
            <div className="container mx-auto px-4">
              <div className="flex flex-col md:flex-row justify-between items-center">
                <div className="mb-4 md:mb-0">
                  <h2 className="text-2xl font-bold text-blood-red">BloodLink</h2>
                  <p className="text-sm">Connecting donors, recipients, and blood banks</p>
                </div>
                <div className="flex space-x-4">
                  <a href="#" className="hover:text-blood-red transition-colors">About</a>
                  <a href="#" className="hover:text-blood-red transition-colors">Privacy</a>
                  <a href="#" className="hover:text-blood-red transition-colors">Terms</a>
                  <a href="#" className="hover:text-blood-red transition-colors">Contact</a>
                </div>
              </div>
              <div className="mt-6 text-center text-sm">
                <p>&copy; {new Date().getFullYear()} BloodLink. All rights reserved.</p>
              </div>
            </div>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
