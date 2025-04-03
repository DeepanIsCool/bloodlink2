import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Building, Phone, Mail, Edit, Users, Droplet } from 'lucide-react';

const BloodBankProfile = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: currentUser?.name || '',
    email: currentUser?.email || '',
    address: currentUser?.address || '',
    contactNumber: currentUser?.contactNumber || '',
    licenseNumber: currentUser?.licenseNumber || ''
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
    // In a real app, this would update the blood bank profile in the database
    // For now, we'll just toggle the editing state
    setIsEditing(false);
  };

  const navigateToDonorList = () => {
    navigate('/bloodbank/donors');
  };

  const navigateToInventory = () => {
    navigate('/bloodbank/inventory');
  };

  return (
    <div className="min-h-[calc(100vh-200px)]">
      <div className="bg-blood-red text-white py-8 px-4 rounded-lg mb-8">
        <h1 className="text-3xl font-bold mb-2">Blood Bank Profile</h1>
        <p className="text-lg">Manage your blood bank information, donors, and inventory</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* Profile Card */}
        <div className="md:col-span-1">
          <div className="card">
            <div className="flex flex-col items-center">
              <div className="w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center mb-4">
                <Building className="h-16 w-16 text-gray-500" />
              </div>
              <h2 className="text-2xl font-bold">{currentUser?.name}</h2>
              <div className="mt-2 flex items-center">
                <span className="text-sm bg-green-100 text-green-800 px-2 py-1 rounded-full">Verified</span>
              </div>
              <div className="mt-6 w-full">
                <div className="flex items-center mb-3">
                  <Mail className="h-5 w-5 text-gray-500 mr-3" />
                  <span>{currentUser?.email}</span>
                </div>
                <div className="flex items-center mb-3">
                  <Phone className="h-5 w-5 text-gray-500 mr-3" />
                  <span>{currentUser?.contactNumber || 'Not specified'}</span>
                </div>
                <div className="flex items-start mb-3">
                  <Building className="h-5 w-5 text-gray-500 mr-3 mt-1" />
                  <span>{currentUser?.address || 'Address not specified'}</span>
                </div>
                <div className="flex items-center">
                  <div className="h-5 w-5 text-gray-500 mr-3 flex items-center justify-center">
                    <span className="text-xs font-bold">ID</span>
                  </div>
                  <span className="text-sm">{currentUser?.licenseNumber || 'License not specified'}</span>
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
              <h2 className="text-xl font-bold mb-4">Edit Blood Bank Profile</h2>
              <form onSubmit={handleSubmit}>
                <div className="mb-4">
                  <label htmlFor="name" className="block text-gray-700 font-medium mb-2">Blood Bank Name</label>
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
                  <label htmlFor="contactNumber" className="block text-gray-700 font-medium mb-2">Contact Number</label>
                  <input
                    type="tel"
                    id="contactNumber"
                    name="contactNumber"
                    className="input-field"
                    value={formData.contactNumber}
                    onChange={handleChange}
                    required
                  />
                </div>

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
                  />
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
                <h2 className="text-xl font-bold mb-4">Blood Bank Dashboard</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="bg-red-50 p-4 rounded-md">
                    <h3 className="font-semibold text-gray-700">Total Donors</h3>
                    <p className="text-3xl font-bold text-blood-red">24</p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-md">
                    <h3 className="font-semibold text-gray-700">Donations This Month</h3>
                    <p className="text-3xl font-bold text-blood-red">12</p>
                  </div>
                  <div className="bg-red-50 p-4 rounded-md">
                    <h3 className="font-semibold text-gray-700">Blood Units Available</h3>
                    <p className="text-3xl font-bold text-blood-red">86</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="card bg-gradient-to-br from-red-50 to-white">
                  <h3 className="text-lg font-bold mb-3">Stay on Profile</h3>
                  <p className="text-gray-600 mb-4">
                    Continue managing your blood bank profile information.
                  </p>
                  <button className="btn-secondary w-full">
                    Stay Here
                  </button>
                </div>

                <div className="card bg-gradient-to-br from-red-50 to-white">
                  <h3 className="text-lg font-bold mb-3">Donor List</h3>
                  <p className="text-gray-600 mb-4">
                    View and manage all registered donors and their information.
                  </p>
                  <button 
                    onClick={navigateToDonorList} 
                    className="btn-primary w-full flex items-center justify-center"
                  >
                    <Users className="h-5 w-5 mr-2" />
                    View Donors
                  </button>
                </div>

                <div className="card bg-gradient-to-br from-red-50 to-white">
                  <h3 className="text-lg font-bold mb-3">Inventory</h3>
                  <p className="text-gray-600 mb-4">
                    Check and manage your blood bank's current inventory levels.
                  </p>
                  <button 
                    onClick={navigateToInventory} 
                    className="btn-primary w-full flex items-center justify-center"
                  >
                    <Droplet className="h-5 w-5 mr-2" />
                    View Inventory
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

export default BloodBankProfile;