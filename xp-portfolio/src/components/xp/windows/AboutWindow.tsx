import React from 'react';
import passportImage from '@/assets/Passport image.jpg';

const AboutWindow: React.FC = () => {
  return (
    <div className="space-y-4">
      <div className="flex items-start gap-4">
        <img 
          src={passportImage} 
          alt="Nehal Chauhan" 
          className="w-20 h-20 rounded object-cover flex-shrink-0"
        />
        <div>
          <h2 className="text-xl font-bold text-gray-800 mb-2">Nehal Chauhan</h2>
          <p className="text-sm text-gray-600">Computer Science & Engineering Student</p>
          <p className="text-sm text-gray-600">Full-Stack Developer</p>
        </div>
      </div>

      <div className="border-t border-gray-300 pt-4">
        <p className="text-sm text-gray-700 leading-relaxed">
          Computer Science & Engineering student skilled in full-stack development using{' '}
          <strong>React, Next.js, Node.js, MongoDB,</strong> and <strong>Redis</strong>.
        </p>
        <p className="text-sm text-gray-700 leading-relaxed mt-2">
          Growing experience in Android development (Java) and manual QA testing.
          Background in UI/UX validation, test case execution, and bug reporting.
        </p>
        <p className="text-sm text-gray-700 leading-relaxed mt-2">
          Detail-oriented, continuously learning, passionate about building high-quality,
          real-world applications.
        </p>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded p-3 mt-4">
        <p className="text-xs text-blue-800">
          💡 Double-click other icons on the desktop to explore my Experience, Skills, Projects, and more!
        </p>
      </div>
    </div>
  );
};

export default AboutWindow;
