import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Droplet, UserPlus, AlertCircle } from 'lucide-react';

const Register = ({ userType }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    ...(userType === 'donor' ? {
      age: '',
      bloodGroup: '',
      mobileNumber: ''
    } : {
      address: '',
      contactNumber: '',
      licenseNumber: ''
    })
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { register } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    // Validate form
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (userType === 'donor' && (parseInt(formData.age) < 18 || parseInt(formData.age) > 65)) {
      setError('Age must be between 18 and 65 to register as a donor');
      return;
    }

    setIsLoading(true);

    try {
      // In a real app, this would make an API call to register
      // For demo purposes, we'll simulate a successful registration
      setTimeout(() => {
        const user = {
          id: Math.random().toString(36).substr(2, 9),
          name: formData.name,
          email: formData.email,
          ...(userType === 'donor' ? {
            age: formData.age,
            bloodGroup: formData.bloodGroup,
            mobileNumber: formData.mobileNumber
          } : {
            address: formData.address,
            contactNumber: formData.contactNumber,
            licenseNumber: formData.licenseNumber
          })
        };

        const success = register(user, userType);
        
        if (success) {
          navigate(userType === 'donor' ? '/donor/profile' : '/bloodbank/profile');
        } else {
          setError('Failed to register. Please try again.');
        }
        setIsLoading(false);
      }, 1000);
    } catch (err) {
      setError('Failed to register. Please try again.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-200px)] flex items-center justify-center py-8">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <Droplet className="h-10 w-10 text-blood-red" />
            <h1 className="text-3xl font-bold ml-2">Blood<span className="text-blood-red">Link</span></h1>
          </div>
          <h2 className="text-2xl font-bold">
            {userType === 'donor' ? 'Donor Registration' : 'Blood Bank Registration'}
          </h2>
          <p className="text-gray-600 mt-2">
            {userType === 'donor' 
              ? 'Create your donor account to start saving lives.' 
              : 'Register your blood bank to connect with donors and manage inventory.'}
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
            <label htmlFor="name" className="block text-gray-700 font-medium mb-2">
              {userType === 'donor' ? 'Full Name' : 'Blood Bank Name'}
            </label>
            <input
              type="text"
              id="name"
              name="name"
              className="input-field"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder={userType === 'donor' ? 'Enter your full name' : 'Enter blood bank name'}
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-medium mb-2">Email Address</label>
            <input
              type="email"
              id="email"
              name="email"
              className="input-field"
              value={formData.email}
              onChange={handleChange}
              required
              placeholder="Enter your email"
            />
          </div>

          {userType === 'donor' ? (
            <>
              <div className="mb-4">
                <label htmlFor="mobileNumber" className="block text-gray-700 font-medium mb-2">Mobile Number</label>
                <input
                  type="tel"
                  id="mobileNumber"
                  name="mobileNumber"
                  className="input-field"
                  value={formData.mobileNumber}
                  onChange={handleChange}
                  required
                  placeholder="Enter your mobile number"
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <label htmlFor="age" className="block text-gray-700 font-medium mb-2">Age</label>
                  <input
                    type="number"
                    id="age"
                    name="age"
                    className="input-field"
                    value={formData.age}
                    onChange={handleChange}
                    required
                    min="18"
                    max="65"
                    placeholder="Age"
                  />
                </div>

                <div>
                  <label htmlFor="bloodGroup" className="block text-gray-700 font-medium mb-2">Blood Group</label>
                  <select
                    id="bloodGroup"
                    name="bloodGroup"
                    className="input-field"
                    value={formData.bloodGroup}
                    onChange={handleChange}
                    required
                  >
                    <option value="">Select</option>
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                  </select>
                </div>
              </div>
            </>
          ) : (
            <>
              <div className="mb-4">
                <label htmlFor="address" className="block text-gray-700 font-medium mb-2">Address</label>
                <input
                  type="text"
                  id="address"
                  name="address"
                  className="input-field"
                  value={formData.address}
                  onChange={handleChange}
                  required
                  placeholder="Enter blood bank address"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="contactNumber" className="block text-gray-700 font-medium mb-2">Contact Number</label>
                <input
                  type="tel"
                  id="contactNumber"
                  name="contactNumber"
                  className="input-field"
                  value={formData.contactNumber}
                  onChange={handleChange}
                  required
                  placeholder="Enter contact number"
                />
              </div>

              <div className="mb-4">
                <label htmlFor="licenseNumber" className="block text-gray-700 font-medium mb-2">License Number</label>
                <input
                  type="text"
                  id="licenseNumber"
                  name="licenseNumber"
                  className="input-field"
                  value={formData.licenseNumber}
                  onChange={handleChange}
                  required
                  placeholder="Enter blood bank license number"
                />
              </div>
            </>
          )}

          <div className="mb-4">
            <label htmlFor="password" className="block text-gray-700 font-medium mb-2">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              className="input-field"
              value={formData.password}
              onChange={handleChange}
              required
              placeholder="Create a password"
              minLength="6"
            />
          </div>

          <div className="mb-6">
            <label htmlFor="confirmPassword" className="block text-gray-700 font-medium mb-2">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              className="input-field"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
              placeholder="Confirm your password"
              minLength="6"
            />
          </div>

          <button
            type="submit"
            className="btn-primary w-full flex justify-center items-center"
            disabled={isLoading}
          >
            {isLoading ? (
              <div className="w-6 h-6 border-2 border-t-white border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin mr-2"></div>
            ) : (
              <UserPlus className="h-5 w-5 mr-2" />
            )}
            {isLoading ? 'Registering...' : 'Register'}
          </button>

          <div className="mt-6 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link to={`/${userType}/login`} className="text-blood-red hover:underline">
                Sign in
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Register;