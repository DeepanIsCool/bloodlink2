import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Droplet, LogIn, AlertCircle } from 'lucide-react';

const Login = ({ userType }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      // In a real app, this would make an API call to authenticate
      // For demo purposes, we'll simulate a successful login
      setTimeout(() => {
        const user = {
          email,
          name: email.split('@')[0], // Just for demo purposes
          id: Math.random().toString(36).substr(2, 9),
        };

        const success = login(user, userType);
        
        if (success) {
          navigate(userType === 'donor' ? '/donor/profile' : '/bloodbank/profile');
        } else {
          setError('Failed to log in. Please try again.');
        }
        setIsLoading(false);
      }, 1000);
    } catch (err) {
      setError('Failed to log in. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Droplet className="h-10 w-10 text-blood-red" />
            <h1 className="text-3xl font-bold ml-2">Blood<span className="text-blood-red">Link</span></h1>
          </div>
          <h2 className="text-2xl font-bold">
            {userType === 'donor' ? 'Donor Login' : 'Blood Bank Login'}
          </h2>
          <p className="text-gray-600 mt-2">
            {userType === 'donor' 
              ? 'Sign in to your donor account to manage your profile and donations.' 
              : 'Sign in to your blood bank account to manage inventory and donors.'}
          </p>
        </div>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 flex items-center">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="card">
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
            <input
              type="email"
              id="email"
              className="input-field"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Enter your email"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              id="password"
              className="input-field"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="Enter your password"
            />
            <div className="mt-1 text-right">
              <a href="#" className="text-sm text-blood-red hover:underline">Forgot password?</a>
            </div>
          </div>

          <button
            type="submit"
            className="btn-primary w-full flex justify-center items-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-t-white border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mr-2"></div>
            ) : (
              <LogIn className="h-5 w-5 mr-2" />
            )}
            {isLoading ? 'Signing in...' : 'Sign In'}
          </button>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Don't have an account?{' '}
              <Link to={`/${userType}/register`} className="text-blood-red hover:underline">
                Register here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;