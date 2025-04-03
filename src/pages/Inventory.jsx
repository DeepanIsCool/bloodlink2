import { useState } from 'react';
import { Droplet, PlusCircle, MinusCircle, AlertTriangle, Search } from 'lucide-react';

// Mock data for blood inventory
const initialBloodInventory = [
  { type: 'A+', units: 15, status: 'Adequate' },
  { type: 'A-', units: 8, status: 'Low' },
  { type: 'B+', units: 12, status: 'Adequate' },
  { type: 'B-', units: 5, status: 'Low' },
  { type: 'AB+', units: 3, status: 'Critical' },
  { type: 'AB-', units: 2, status: 'Critical' },
  { type: 'O+', units: 20, status: 'Adequate' },
  { type: 'O-', units: 10, status: 'Adequate' }
];

const Inventory = () => {
  const [bloodInventory, setBloodInventory] = useState(initialBloodInventory);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [selectedBloodType, setSelectedBloodType] = useState('');
  const [unitsToAdd, setUnitsToAdd] = useState(1);

  // Filter inventory based on search term
  const filteredInventory = bloodInventory.filter(item =>
    item.type.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusColor = (status) => {
    switch (status) {
      case 'Adequate': return 'bg-green-100 text-green-800';
      case 'Low': return 'bg-yellow-100 text-yellow-800';
      case 'Critical': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleAddUnits = () => {
    if (!selectedBloodType || unitsToAdd <= 0) return;
    
    setBloodInventory(prev => prev.map(item => {
      if (item.type === selectedBloodType) {
        const newUnits = item.units + unitsToAdd;
        let newStatus = 'Critical';
        if (newUnits > 10) newStatus = 'Adequate';
        else if (newUnits > 5) newStatus = 'Low';
        
        return { ...item, units: newUnits, status: newStatus };
      }
      return item;
    }));
    
    setShowAddModal(false);
    setSelectedBloodType('');
    setUnitsToAdd(1);
  };

  const handleRemoveUnit = (type) => {
    setBloodInventory(prev => prev.map(item => {
      if (item.type === type && item.units > 0) {
        const newUnits = item.units - 1;
        let newStatus = 'Critical';
        if (newUnits > 10) newStatus = 'Adequate';
        else if (newUnits > 5) newStatus = 'Low';
        
        return { ...item, units: newUnits, status: newStatus };
      }
      return item;
    }));
  };

  return (
    <div className="min-h-[calc(100vh-200px)]">
      <div className="bg-blood-red text-white py-8 px-4 rounded-lg mb-8">
        <h1 className="text-3xl font-bold mb-2">Blood Inventory</h1>
        <p className="text-lg">Manage your blood bank's current inventory levels</p>
      </div>

      <div className="flex flex-col md:flex-row gap-4 mb-6 items-center justify-between">
        <div className="relative w-full md:w-64">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <Search className="h-5 w-5 text-gray-400" />
          </div>
          <input
            type="text"
            placeholder="Search blood type"
            className="input-field pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <button 
          onClick={() => setShowAddModal(true)} 
          className="btn-primary flex items-center whitespace-nowrap"
        >
          <PlusCircle className="h-5 w-5 mr-2" />
          Add Blood Units
        </button>
      </div>

      {/* Inventory Summary */}
      <div className="card mb-8">
        <h2 className="text-xl font-bold mb-4">Inventory Summary</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-green-50 p-4 rounded-md">
            <h3 className="font-semibold text-gray-700">Adequate</h3>
            <p className="text-3xl font-bold text-green-600">
              {bloodInventory.filter(item => item.status === 'Adequate').length}
            </p>
          </div>
          <div className="bg-yellow-50 p-4 rounded-md">
            <h3 className="font-semibold text-gray-700">Low</h3>
            <p className="text-3xl font-bold text-yellow-600">
              {bloodInventory.filter(item => item.status === 'Low').length}
            </p>
          </div>
          <div className="bg-red-50 p-4 rounded-md">
            <h3 className="font-semibold text-gray-700">Critical</h3>
            <p className="text-3xl font-bold text-red-600">
              {bloodInventory.filter(item => item.status === 'Critical').length}
            </p>
          </div>
          <div className="bg-gray-50 p-4 rounded-md">
            <h3 className="font-semibold text-gray-700">Total Units</h3>
            <p className="text-3xl font-bold text-gray-600">
              {bloodInventory.reduce((sum, item) => sum + item.units, 0)}
            </p>
          </div>
        </div>
      </div>

      {/* Critical Alert */}
      {bloodInventory.some(item => item.status === 'Critical') && (
        <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 flex items-start">
          <AlertTriangle className="h-6 w-6 text-red-500 mr-3 flex-shrink-0" />
          <div>
            <h3 className="font-bold text-red-700">Critical Blood Levels Alert</h3>
            <p className="text-red-600">
              Some blood types are at critical levels. Consider organizing a blood drive or contacting potential donors.
            </p>
          </div>
        </div>
      )}

      {/* Blood Inventory Table */}
      <div className="bg-white rounded-lg shadow-md overflow-hidden">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Blood Type
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Available Units
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredInventory.map((item) => (
              <tr key={item.type}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <Droplet className={`h-5 w-5 mr-2 ${item.status === 'Critical' ? 'text-red-500' : item.status === 'Low' ? 'text-yellow-500' : 'text-green-500'}`} />
                    <div className="text-sm font-medium text-gray-900">{item.type}</div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{item.units} units</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${getStatusColor(item.status)}`}>
                    {item.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => {
                        setSelectedBloodType(item.type);
                        setShowAddModal(true);
                      }} 
                      className="text-blood-red hover:text-dark-red"
                    >
                      <PlusCircle className="h-5 w-5" />
                    </button>
                    <button 
                      onClick={() => handleRemoveUnit(item.type)} 
                      className="text-gray-500 hover:text-gray-700"
                      disabled={item.units <= 0}
                    >
                      <MinusCircle className={`h-5 w-5 ${item.units <= 0 ? 'opacity-50 cursor-not-allowed' : ''}`} />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add Units Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg max-w-md w-full p-6">
            <h2 className="text-2xl font-bold mb-4">Add Blood Units</h2>
            
            <div className="mb-4">
              <label htmlFor="bloodType" className="block text-gray-700 font-medium mb-2">Blood Type</label>
              <select
                id="bloodType"
                className="input-field"
                value={selectedBloodType}
                onChange={(e) => setSelectedBloodType(e.target.value)}
                required
              >
                <option value="">Select Blood Type</option>
                {bloodInventory.map(item => (
                  <option key={item.type} value={item.type}>{item.type}</option>
                ))}
              </select>
            </div>
            
            <div className="mb-6">
              <label htmlFor="units" className="block text-gray-700 font-medium mb-2">Number of Units</label>
              <input
                type="number"
                id="units"
                className="input-field"
                value={unitsToAdd}
                onChange={(e) => {
                  const value = e.target.value === '' ? 0 : parseInt(e.target.value);
                  setUnitsToAdd(isNaN(value) ? 0 : value);
                }}
                min="1"
                required
              />
            </div>
            
            <div className="flex space-x-4">
              <button onClick={handleAddUnits} className="btn-primary flex-1">
                Add Units
              </button>
              <button onClick={() => setShowAddModal(false)} className="btn-secondary flex-1">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Inventory;