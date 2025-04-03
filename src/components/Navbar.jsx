import { Link, useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { Droplet, Menu, X, LogOut, User } from 'lucide-react';
import { useSlideIn } from '../utils/animations';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentUser, userType, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-black text-white shadow-md">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center py-4">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Droplet className="h-8 w-8 text-blood-red animate-heartbeat" />
            <span className="text-2xl font-bold text-blood-red">BloodLink</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-blood-red transition-colors">Home</Link>
            <Link to="/recipient" className="hover:text-blood-red transition-colors">Recipient</Link>
            
            {!currentUser ? (
              <>
                <Link to="/donor/login" className="hover:text-blood-red transition-colors">Donor</Link>
                <Link to="/bloodbank/login" className="hover:text-blood-red transition-colors">BloodBank</Link>
              </>
            ) : userType === 'donor' ? (
              <div className="relative group">
                <button className="flex items-center space-x-1 hover:text-blood-red transition-colors">
                  <span>Donor</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg py-1 z-10 hidden group-hover:block transition-all duration-300 origin-top transform group-hover:animate-scaleIn">
                  <Link to="/donor/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
                  <Link to="/donor/donate" className="block px-4 py-2 hover:bg-gray-100">Donate</Link>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                    Logout
                  </button>
                </div>
              </div>
            ) : (
              <div className="relative group">
                <button className="flex items-center space-x-1 hover:text-blood-red transition-colors">
                  <span>BloodBank</span>
                </button>
                <div className="absolute right-0 mt-2 w-48 bg-white text-black rounded-md shadow-lg py-1 z-10 hidden group-hover:block transition-all duration-300 origin-top transform group-hover:animate-scaleIn">
                  <Link to="/bloodbank/profile" className="block px-4 py-2 hover:bg-gray-100">Profile</Link>
                  <Link to="/bloodbank/donors" className="block px-4 py-2 hover:bg-gray-100">Donor List</Link>
                  <Link to="/bloodbank/inventory" className="block px-4 py-2 hover:bg-gray-100">Inventory</Link>
                  <button onClick={handleLogout} className="block w-full text-left px-4 py-2 hover:bg-gray-100">
                    Logout
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={toggleMenu}>
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-gray-900 pb-4 px-4 animate-slideInDown origin-top">
          <Link to="/" className="block py-2 hover:text-blood-red transition-colors" onClick={() => setIsMenuOpen(false)}>Home</Link>
          <Link to="/recipient" className="block py-2 hover:text-blood-red transition-colors" onClick={() => setIsMenuOpen(false)}>Recipient</Link>
          
          {!currentUser ? (
            <>
              <Link to="/donor/login" className="block py-2 hover:text-blood-red transition-colors" onClick={() => setIsMenuOpen(false)}>Donor</Link>
              <Link to="/bloodbank/login" className="block py-2 hover:text-blood-red transition-colors" onClick={() => setIsMenuOpen(false)}>BloodBank</Link>
            </>
          ) : userType === 'donor' ? (
            <>
              <Link to="/donor/profile" className="block py-2 hover:text-blood-red transition-colors" onClick={() => setIsMenuOpen(false)}>Profile</Link>
              <Link to="/donor/donate" className="block py-2 hover:text-blood-red transition-colors" onClick={() => setIsMenuOpen(false)}>Donate</Link>
              <button onClick={handleLogout} className="block w-full text-left py-2 hover:text-blood-red transition-colors">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/bloodbank/profile" className="block py-2 hover:text-blood-red transition-colors" onClick={() => setIsMenuOpen(false)}>Profile</Link>
              <Link to="/bloodbank/donors" className="block py-2 hover:text-blood-red transition-colors" onClick={() => setIsMenuOpen(false)}>Donor List</Link>
              <Link to="/bloodbank/inventory" className="block py-2 hover:text-blood-red transition-colors" onClick={() => setIsMenuOpen(false)}>Inventory</Link>
              <button onClick={handleLogout} className="block w-full text-left py-2 hover:text-blood-red transition-colors">
                Logout
              </button>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;