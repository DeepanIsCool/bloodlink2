import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { User, Phone, Mail, Droplet, Edit, Heart } from 'lucide-react';

const DonorProfile = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    mobileNumber: currentUser?.mobileNumber || '',
    age: currentUser?.age || '',
    bloodGroup: currentUser?.bloodGroup || ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // In a real app, this would update the user profile in the database
    // For now, we'll just toggle the editing state
    setIsEditing(false);
  };

  const handleDonate = () => {
    navigate('/donor/donate');
  };

  return (
    <div className="min-h-[calc(100vh-200px)]">
      <div className="bg-blood-red text-white py-8 px-4 rounded-lg mb-8">
        <h1 className="text-3xl font-bold mb-2">Donor Profile</h1>
        <p className="text-lg">Manage your profile and find donation opportunities</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="md:col-span-1">
          <div className="card">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                <User className="h-16 w-16 text-gray-500" />
              </div>
              <h2 className="text-2xl font-bold">{currentUser?.name}</h2>
              <div className="mt-2 flex items-center">
                <Droplet className="h-5 w-5 text-blood-red mr-2" />
                <span className="font-semibold">{currentUser?.bloodGroup || 'Not specified'}</span>
              </div>
              <div className="mt-6 w-full">
                <div className="flex items-center mb-3">
                  <Mail className="h-5 w-5 text-gray-500 mr-3" />
                  <span>{currentUser?.email}</span>
                </div>
                <div className="flex items-center mb-3">
                  <Phone className="h-5 w-5 text-gray-500 mr-3" />
                  <span>{currentUser?.mobileNumber || 'Not specified'}</span>
                </div>
                <div className="flex items-center">
                  <User className="h-5 w-5 text-gray-500 mr-3" />
                  <span>{currentUser?.age ? `${currentUser.age} years old` : 'Age not specified'}</span>
                </div>
              </div>
              <button 
                onClick={() => setIsEditing(true)} 
                className="mt-6 flex items-center text-blood-red hover:underline"
              >
                <Edit className="h-4 w-4 mr-1" />
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2">
          {isEditing ? (
            <div className="card">
              <h2 className="text-xl font-bold mb-4">Edit Profile</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Full Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    className="input-field"
                    value={formData.name}
                    onChange={handleChange}
                    required
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
                  />
                </div>

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

                <div className="flex space-x-4">
                  <button type="submit" className="btn-primary">
                    Save Changes
                  </button>
                  <button 
                    type="button" 
                    className="btn-secondary" 
                    onClick={() => setIsEditing(false)}
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <>
              <div className="card mb-6">
                <h2 className="text-xl font-bold mb-4">Donation History</h2>
                <div className="bg-gray-100 p-6 rounded-md text-center">
                  <p className="text-gray-600">You haven't made any donations yet.</p>
                  <p className="mt-2">Ready to save lives? Click the button below to find donation opportunities.</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="card bg-gradient-to-br from-red-50 to-white">
                  <h3 className="text-lg font-bold mb-3">Stay on Profile</h3>
                  <p className="text-gray-600 mb-4">
                    Continue managing your profile information and view your donation history.
                  </p>
                  <button className="btn-secondary w-full">
                    Stay Here
                  </button>
                </div>

                <div className="card bg-gradient-to-br from-red-50 to-white">
                  <h3 className="text-lg font-bold mb-3">I Want to Donate</h3>
                  <p className="text-gray-600 mb-4">
                    Find donation opportunities near you and schedule your next blood donation.
                  </p>
                  <button 
                    onClick={handleDonate} 
                    className="btn-primary w-full flex items-center justify-center"
                  >
                    <Heart className="h-5 w-5 mr-2" />
                    Donate Now
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonorProfile;