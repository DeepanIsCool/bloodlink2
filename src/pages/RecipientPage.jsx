import { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents } from 'react-leaflet';
import { Search, MapPin, Phone, Clock } from 'lucide-react';
import 'leaflet/dist/leaflet.css';

// Map click handler component
const MapClickHandler = ({ setSelectedBloodBank }) => {
  useMapEvents({
    click: () => {
      setSelectedBloodBank(null);
    },
  });
  return null;
};

// Mock data for blood banks
const mockBloodBanks = [
  {
    id: 1,
    name: 'City Blood Center',
    address: '123 Main St, Cityville',
    phone: '(555) 123-4567',
    hours: '8:00 AM - 6:00 PM',
    position: [40.7128, -74.0060], // New York coordinates
    bloodTypes: {
      'A+': 15,
      'A-': 8,
      'B+': 12,
      'B-': 5,
      'AB+': 3,
      'AB-': 2,
      'O+': 20,
      'O-': 10
    }
  },
  {
    id: 2,
    name: 'Metro Blood Bank',
    address: '456 Park Ave, Metrotown',
    phone: '(555) 987-6543',
    hours: '9:00 AM - 7:00 PM',
    position: [40.7282, -73.9942], // Nearby coordinates
    bloodTypes: {
      'A+': 8,
      'A-': 4,
      'B+': 9,
      'B-': 3,
      'AB+': 2,
      'AB-': 1,
      'O+': 15,
      'O-': 7
    }
  },
  {
    id: 3,
    name: 'Community Blood Services',
    address: '789 Broadway, Downtown',
    phone: '(555) 456-7890',
    hours: '8:30 AM - 5:30 PM',
    position: [40.7112, -74.0134], // Nearby coordinates
    bloodTypes: {
      'A+': 12,
      'A-': 6,
      'B+': 10,
      'B-': 4,
      'AB+': 5,
      'AB-': 2,
      'O+': 18,
      'O-': 9
    }
  }
];

const RecipientPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedBloodBank, setSelectedBloodBank] = useState(null);
  const [mapCenter, setMapCenter] = useState([40.7128, -74.0060]); // Default to New York
  const [zoom, setZoom] = useState(13);

  // Filter blood banks based on search term
  const filteredBloodBanks = mockBloodBanks.filter(bloodBank =>
    bloodBank.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    bloodBank.address.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleBloodBankClick = (bloodBank) => {
    setSelectedBloodBank(bloodBank);
    setMapCenter(bloodBank.position);
    setZoom(15);
  };

  return (
    <div className="min-h-[calc(100vh-200px)]">
      <div className="bg-blood-red text-white py-8 px-4 rounded-lg mb-8">
        <h1 className="text-3xl font-bold mb-2">Find Blood Banks Near You</h1>
        <p className="text-lg">Locate blood banks, check blood availability, and find the help you need.</p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left side - Search and List */}
        <div className="lg:w-1/3">
          <div className="mb-6 relative">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              placeholder="Search by name or location"
              className="input-field pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="space-y-4 overflow-y-auto max-h-[600px] pr-2">
            {filteredBloodBanks.length > 0 ? (
              filteredBloodBanks.map(bloodBank => (
                <div 
                  key={bloodBank.id} 
                  className={`card cursor-pointer hover:border-blood-red transition-colors ${selectedBloodBank?.id === bloodBank.id ? 'border-blood-red' : ''}`}
                  onClick={() => handleBloodBankClick(bloodBank)}
                >
                  <h3 className="text-xl font-bold mb-2">{bloodBank.name}</h3>
                  <div className="flex items-start space-x-2 text-gray-600 mb-2">
                    <MapPin className="h-5 w-5 mt-0.5 flex-shrink-0" />
                    <span>{bloodBank.address}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600 mb-2">
                    <Phone className="h-5 w-5 flex-shrink-0" />
                    <span>{bloodBank.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-gray-600">
                    <Clock className="h-5 w-5 flex-shrink-0" />
                    <span>{bloodBank.hours}</span>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8">
                <p className="text-gray-500">No blood banks found matching your search.</p>
              </div>
            )}
          </div>
        </div>

        {/* Right side - Map */}
        <div className="lg:w-2/3">
          <div className="h-[600px] rounded-lg overflow-hidden shadow-md">
            <MapContainer 
              center={mapCenter} 
              zoom={zoom} 
              style={{ height: '100%', width: '100%' }}
            >
              <MapClickHandler setSelectedBloodBank={setSelectedBloodBank} />
              <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              />
              {filteredBloodBanks.map(bloodBank => (
                <Marker 
                  key={bloodBank.id} 
                  position={bloodBank.position}
                  eventHandlers={{
                    click: () => {
                      setSelectedBloodBank(bloodBank);
                    },
                  }}
                >
                  <Popup>
                    <div className="p-2">
                      <h3 className="font-bold text-lg">{bloodBank.name}</h3>
                      <p className="text-sm">{bloodBank.address}</p>
                      <p className="text-sm">{bloodBank.phone}</p>
                      <p className="text-sm">{bloodBank.hours}</p>
                      <div className="mt-2">
                        <h4 className="font-semibold text-sm">Available Blood Types:</h4>
                        <div className="grid grid-cols-4 gap-1 mt-1">
                          {Object.entries(bloodBank.bloodTypes).map(([type, count]) => (
                            <div key={type} className="text-center">
                              <span className="inline-block bg-red-100 text-blood-red px-2 py-1 rounded-md text-xs font-semibold">
                                {type}: {count}
                              </span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </Popup>
                </Marker>
              ))}
            </MapContainer>
          </div>

          {/* Blood Bank Details */}
          {selectedBloodBank && (
            <div className="mt-6 card">
              <h2 className="text-2xl font-bold mb-4">{selectedBloodBank.name}</h2>
              <div className="grid grid-cols-2 gap-4 mb-4">
                <div>
                  <h3 className="font-semibold mb-2">Contact Information</h3>
                  <p className="flex items-center space-x-2 mb-2">
                    <MapPin className="h-5 w-5 text-blood-red" />
                    <span>{selectedBloodBank.address}</span>
                  </p>
                  <p className="flex items-center space-x-2 mb-2">
                    <Phone className="h-5 w-5 text-blood-red" />
                    <span>{selectedBloodBank.phone}</span>
                  </p>
                  <p className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-blood-red" />
                    <span>{selectedBloodBank.hours}</span>
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold mb-2">Available Blood Types</h3>
                  <div className="grid grid-cols-4 gap-2">
                    {Object.entries(selectedBloodBank.bloodTypes).map(([type, count]) => (
                      <div key={type} className="text-center bg-gray-100 p-2 rounded-md">
                        <div className="text-xl font-bold text-blood-red">{type}</div>
                        <div className="text-sm">{count} units</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <button className="btn-primary w-full mt-4">Request Blood</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RecipientPage;