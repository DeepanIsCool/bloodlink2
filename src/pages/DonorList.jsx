import { useState } from 'react';
import { Search, Filter, Download, User, Phone, Mail, Droplet, Calendar } from 'lucide-react';

// Mock data for donors
const mockDonors = [
  {
    id: 1,
    name: 'John Smith',
    email: 'john.smith@example.com',
    mobileNumber: '(555) 123-4567',
    age: 28,
    bloodGroup: 'O+',
    lastDonation: '2023-04-10',
    totalDonations: 5
  },
  {
    id: 2,
    name: 'Emily Johnson',
    email: 'emily.johnson@example.com',
    mobileNumber: '(555) 987-6543',
    age: 35,
    bloodGroup: 'A-',
    lastDonation: '2023-03-22',
    totalDonations: 8
  },
  {
    id: 3,
    name: 'Michael Williams',
    email: 'michael.williams@example.com',
    mobileNumber: '(555) 456-7890',
    age: 42,
    bloodGroup: 'B+',
    lastDonation: '2023-04-05',
    totalDonations: 12
  },
  {
    id: 4,
    name: 'Sarah Brown',
    email: 'sarah.brown@example.com',
    mobileNumber: '(555) 234-5678',
    age: 31,
    bloodGroup: 'AB+',
    lastDonation: '2023-02-18',
    totalDonations: 3
  },
  {
    id: 5,
    name: 'David Miller',
    email: 'david.miller@example.com',
    mobileNumber: '(555) 876-5432',
    age: 45,
    bloodGroup: 'O-',
    lastDonation: '2023-03-30',
    totalDonations: 15
  },
  {
    id: 6,
    name: 'Jennifer Davis',
    email: 'jennifer.davis@example.com',
    mobileNumber: '(555) 345-6789',
    age: 29,
    bloodGroup: 'A+',
    lastDonation: '2023-04-15',
    totalDonations: 6
  }
];

const DonorList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBloodGroup, setSelectedBloodGroup] = useState('');
  const [selectedDonor, setSelectedDonor] = useState(null);

  // Filter donors based on search term and blood group
  const filteredDonors = mockDonors.filter(donor => {
    const matchesSearch = donor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         donor.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesBloodGroup = selectedBloodGroup === '' || donor.bloodGroup === selectedBloodGroup;
    return matchesSearch && matchesBloodGroup;
  });

  const handleDonorClick = (donor) => {
    setSelectedDonor(donor);
  };

  const bloodGroups = ['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'];

  return (
    <div className="min-h-[calc(100vh-200px)]">
      <div className="bg-blood-red text-white py-8 px-4 rounded-lg mb-8">
        <h1 className="text-3xl font-bold mb-2">Donor List</h1>
        <p className="text-lg">View and manage all registered donors</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search donors by name or email"
            className="input-field pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="w-full md:w-64">
          <select
            className="input-field"
            value={selectedBloodGroup}
            onChange={(e) => setSelectedBloodGroup(e.target.value)}
          >
            <option value="">All Blood Groups</option>
            {bloodGroups.map(group => (
              <option key={group} value={group}>{group}</option>
            ))}
          </select>
        </div>
        
        <button className="btn-secondary flex items-center whitespace-nowrap">
          <Download className="h-5 w-5 mr-2" />
          Export List
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Donor List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md overflow-hidden">
            <div className="p-4 bg-gray-50 border-b border-gray-200 flex justify-between items-center">
              <h2 className="font-bold">Donors ({filteredDonors.length})</h2>
              <div className="flex items-center">
                <Filter className="h-5 w-5 text-gray-500" />
              </div>
            </div>
            
            <div className="divide-y divide-gray-200 max-h-[600px] overflow-y-auto">
              {filteredDonors.length > 0 ? (
                filteredDonors.map(donor => (
                  <div 
                    key={donor.id} 
                    className={`p-4 hover:bg-gray-50 cursor-pointer transition-colors ${selectedDonor?.id === donor.id ? 'bg-red-50 border-l-4 border-blood-red' : ''}`}
                    onClick={() => handleDonorClick(donor)}
                  >
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center mr-3">
                        <User className="h-6 w-6 text-gray-500" />
                      </div>
                      <div className="flex-grow">
                        <h3 className="font-semibold">{donor.name}</h3>
                        <p className="text-sm text-gray-600">{donor.email}</p>
                      </div>
                      <div className="text-right">
                        <span className="inline-block bg-red-100 text-blood-red px-2 py-1 rounded-md text-xs font-semibold">
                          {donor.bloodGroup}
                        </span>
                        <p className="text-xs text-gray-500 mt-1">{donor.totalDonations} donations</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="p-8 text-center">
                  <p className="text-gray-500">No donors found matching your search criteria.</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Donor Details */}
        <div className="lg:col-span-1">
          {selectedDonor ? (
            <div className="card">
              <div className="flex flex-col items-center mb-6">
                <div className="w-20 h-20 bg-gray-200 rounded-full flex items-center justify-center mb-3">
                  <User className="h-10 w-10 text-gray-500" />
                </div>
                <h2 className="text-xl font-bold">{selectedDonor.name}</h2>
                <div className="mt-1 flex items-center">
                  <Droplet className="h-4 w-4 text-blood-red mr-1" />
                  <span className="font-semibold">{selectedDonor.bloodGroup}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h3 className="text-sm text-gray-500 mb-1">Contact Information</h3>
                  <div className="flex items-center space-x-2 mb-2">
                    <Mail className="h-5 w-5 text-gray-500" />
                    <span>{selectedDonor.email}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-5 w-5 text-gray-500" />
                    <span>{selectedDonor.mobileNumber}</span>
                  </div>
                </div>

                <div>
                  <h3 className="text-sm text-gray-500 mb-1">Personal Information</h3>
                  <p><span className="font-semibold">Age:</span> {selectedDonor.age} years</p>
                </div>

                <div>
                  <h3 className="text-sm text-gray-500 mb-1">Donation History</h3>
                  <p><span className="font-semibold">Total Donations:</span> {selectedDonor.totalDonations}</p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Calendar className="h-5 w-5 text-gray-500" />
                    <span><span className="font-semibold">Last Donation:</span> {selectedDonor.lastDonation}</span>
                  </div>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <button className="btn-primary w-full">Schedule Donation</button>
                <button className="btn-secondary w-full">Send Message</button>
              </div>
            </div>
          ) : (
            <div className="card bg-gray-50 border border-dashed border-gray-300 flex flex-col items-center justify-center p-8">
              <User className="h-16 w-16 text-gray-300 mb-4" />
              <p className="text-gray-500 text-center">Select a donor to view their details</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DonorList;