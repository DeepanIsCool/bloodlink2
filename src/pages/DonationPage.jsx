import { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { MapPin, Calendar, Clock, Droplet, Search, Filter } from 'lucide-react';

// Mock data for donation opportunities
const mockDonationOpportunities = [
  {
    id: 1,
    bloodBank: 'City Blood Center',
    address: '123 Main St, Cityville',
    date: '2023-05-15',
    time: '9:00 AM - 5:00 PM',
    distance: '2.3 miles',
    urgentNeed: ['O+', 'B-'],
    requirements: ['Age 18-65', 'Weight over 110 lbs', 'Good health', 'No recent tattoos']
  },
  {
    id: 2,
    bloodBank: 'Metro Blood Bank',
    address: '456 Park Ave, Metrotown',
    date: '2023-05-18',
    time: '10:00 AM - 6:00 PM',
    distance: '4.1 miles',
    urgentNeed: ['A+', 'AB-'],
    requirements: ['Age 18-65', 'Weight over 110 lbs', 'Good health', 'No recent tattoos']
  },
  {
    id: 3,
    bloodBank: 'Community Blood Services',
    address: '789 Broadway, Downtown',
    date: '2023-05-20',
    time: '8:00 AM - 3:00 PM',
    distance: '1.7 miles',
    urgentNeed: ['O-', 'AB+'],
    requirements: ['Age 18-65', 'Weight over 110 lbs', 'Good health', 'No recent tattoos']
  },
  {
    id: 4,
    bloodBank: 'Regional Medical Center',
    address: '101 Hospital Dr, Westside',
    date: '2023-05-22',
    time: '11:00 AM - 7:00 PM',
    distance: '5.5 miles',
    urgentNeed: ['B+', 'A-'],
    requirements: ['Age 18-65', 'Weight over 110 lbs', 'Good health', 'No recent tattoos']
  },
  {
    id: 5,
    bloodBank: 'University Hospital',
    address: '202 College Rd, Collegetown',
    date: '2023-05-25',
    time: '9:30 AM - 4:30 PM',
    distance: '3.8 miles',
    urgentNeed: ['O+', 'AB+'],
    requirements: ['Age 18-65', 'Weight over 110 lbs', 'Good health', 'No recent tattoos']
  }
];

const DonationPage = () => {
  const { currentUser } = useAuth();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedOpportunity, setSelectedOpportunity] = useState(null);
  const [showModal, setShowModal] = useState(false);

  // Filter donation opportunities based on search term
  const filteredOpportunities = mockDonationOpportunities.filter(opportunity =>
    opportunity.bloodBank.toLowerCase().includes(searchTerm.toLowerCase()) ||
    opportunity.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSchedule = (opportunity) => {
    setSelectedOpportunity(opportunity);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const confirmAppointment = () => {
    // In a real app, this would make an API call to schedule the appointment
    alert(`Appointment scheduled at ${selectedOpportunity.bloodBank} on ${selectedOpportunity.date} at ${selectedOpportunity.time.split(' - ')[0]}`);
    setShowModal(false);
  };

  return (
    <div className="min-h-[calc(100vh-200px)]">
      <div className="bg-blood-red text-white py-8 px-4 rounded-lg mb-8">
        <h1 className="text-3xl font-bold mb-2">Donation Opportunities</h1>
        <p className="text-lg">Find places to donate blood and save lives</p>
      </div>

      <div className="mb-8">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-grow">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by blood bank or location"
              className="input-field pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <button className="btn-secondary flex items-center">
            <Filter className="h-5 w-5 mr-2" />
            Filter
          </button>
        </div>

        <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
          <h2 className="text-lg font-bold flex items-center">
            <Droplet className="h-5 w-5 text-blood-red mr-2" />
            Your Blood Type: {currentUser?.bloodGroup || 'Not specified'}
          </h2>
          <p className="mt-2 text-gray-700">
            Blood banks are always in need of donors. Your blood type is particularly valuable for certain patients.
          </p>
        </div>
      </div>

      <div className="space-y-6">
        {filteredOpportunities.length > 0 ? (
          filteredOpportunities.map(opportunity => (
            <div key={opportunity.id} className="card hover:shadow-md transition-shadow">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div>
                  <h3 className="text-xl font-bold mb-2">{opportunity.bloodBank}</h3>
                  <div className="flex items-start space-x-2 text-gray-600 mb-2">
                    <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                    <span>{opportunity.address} ({opportunity.distance})</span>
                  </div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Calendar className="h-5 w-5 flex-shrink-0" />
                      <span>{opportunity.date}</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600">
                      <Clock className="h-5 w-5 flex-shrink-0" />
                      <span>{opportunity.time}</span>
                    </div>
                  </div>
                  <div className="mb-3">
                    <span className="text-sm font-semibold">Urgent need for:</span>
                    <div className="flex flex-wrap gap-2 mt-1">
                      {opportunity.urgentNeed.map(type => (
                        <span 
                          key={type} 
                          className="inline-block bg-red-100 text-blood-red px-2 py-1 rounded-md text-xs font-semibold"
                        >
                          {type}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
                <div className="mt-4 md:mt-0">
                  <button 
                    onClick={() => handleSchedule(opportunity)} 
                    className="btn-primary w-full md:w-auto"
                  >
                    Schedule Donation
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="text-center py-12 bg-gray-50 rounded-lg">
            <p className="text-gray-500 text-lg">No donation opportunities found matching your search.</p>
            <p className="mt-2">Try adjusting your search terms or check back later.</p>
          </div>
        )}
      </div>

      {/* Appointment Modal */}
      {showModal && selectedOpportunity && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-2xl font-bold mb-4">Schedule Donation</h2>
            <div className="mb-4">
              <h3 className="font-bold">{selectedOpportunity.bloodBank}</h3>
              <p className="text-gray-600">{selectedOpportunity.address}</p>
            </div>
            <div className="grid grid-cols-2 gap-4 mb-6">
              <div>
                <p className="text-sm text-gray-500">Date</p>
                <p className="font-semibold">{selectedOpportunity.date}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Time</p>
                <p className="font-semibold">{selectedOpportunity.time}</p>
              </div>
            </div>
            <div className="mb-6">
              <h4 className="font-bold mb-2">Requirements</h4>
              <ul className="list-disc pl-5 text-sm text-gray-600">
                {selectedOpportunity.requirements.map((req, index) => (
                  <li key={index}>{req}</li>
                ))}
              </ul>
            </div>
            <div className="flex space-x-4">
              <button onClick={confirmAppointment} className="btn-primary flex-1">
                Confirm
              </button>
              <button onClick={closeModal} className="btn-secondary flex-1">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DonationPage;