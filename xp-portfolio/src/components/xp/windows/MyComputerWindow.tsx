import React from 'react';
import { Monitor, HardDrive, Disc, Usb, Folder } from 'lucide-react';

const MyComputerWindow: React.FC = () => {
  const drives = [
    { name: 'Local Disk (C:)', icon: <HardDrive className="w-10 h-10 text-gray-600" />, space: '60 GB free of 120 GB' },
    { name: 'DVD Drive (D:)', icon: <Disc className="w-10 h-10 text-gray-500" />, space: 'No disc' },
    { name: 'Removable Disk (E:)', icon: <Usb className="w-10 h-10 text-green-600" />, space: '8 GB free of 16 GB' },
  ];

  const folders = [
    { name: 'Documents', icon: <Folder className="w-8 h-8 text-yellow-500" /> },
    { name: 'Pictures', icon: <Folder className="w-8 h-8 text-blue-500" /> },
    { name: 'Music', icon: <Folder className="w-8 h-8 text-purple-500" /> },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Monitor className="w-6 h-6 text-blue-600" />
        <h2 className="text-lg font-bold text-gray-800">My Computer</h2>
      </div>

      <div className="border border-gray-300 rounded p-3 bg-white">
        <h3 className="text-sm font-bold text-gray-700 mb-3 border-b pb-1">Hard Disk Drives</h3>
        <div className="grid grid-cols-1 gap-2">
          {drives.map((drive, index) => (
            <div
              key={index}
              className="flex items-center gap-3 p-2 rounded hover:bg-blue-100 cursor-pointer"
            >
              {drive.icon}
              <div>
                <p className="font-semibold text-sm text-gray-800">{drive.name}</p>
                <p className="text-xs text-gray-500">{drive.space}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="border border-gray-300 rounded p-3 bg-white">
        <h3 className="text-sm font-bold text-gray-700 mb-3 border-b pb-1">User Folders</h3>
        <div className="flex flex-wrap gap-4">
          {folders.map((folder, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-1 p-2 rounded hover:bg-blue-100 cursor-pointer"
            >
              {folder.icon}
              <span className="text-xs text-gray-700">{folder.name}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-100 border border-gray-300 rounded p-2 text-xs text-gray-600">
        System: Windows XP Professional (Simulated Portfolio)
      </div>
    </div>
  );
};

export default MyComputerWindow;
