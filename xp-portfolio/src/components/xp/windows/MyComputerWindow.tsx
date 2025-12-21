import React from 'react';
import { Monitor } from 'lucide-react';

const MyComputerWindow: React.FC = () => {
  const systemInformation = {
    'System': 'Microsoft Windows XP Professional',
    'Computer': 'NEHAL-PC',
    'Processor': 'Intel(R) Core(TM) i5-8250U CPU @ 1.60GHz',
    'Memory': '8.00 GB RAM',
    'System Type': '32-bit Operating System'
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Monitor className="w-6 h-6 text-blue-600" />
        <h2 className="text-lg font-bold text-gray-800">My Computer</h2>
      </div>

      {/* System Information */}
      <div className="bg-gray-100 border border-gray-300 rounded p-3">
        <h3 className="text-sm font-bold text-gray-700 mb-2 border-b pb-1">System Information</h3>
        <div className="space-y-1">
          {Object.entries(systemInformation).map(([key, value]) => (
            <div key={key} className="flex justify-between text-xs">
              <span className="text-gray-600 font-medium">{key}:</span>
              <span className="text-gray-800">{value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyComputerWindow;
