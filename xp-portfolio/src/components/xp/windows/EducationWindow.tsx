import React from 'react';
import { GraduationCap, Award } from 'lucide-react';

const EducationWindow: React.FC = () => {
  const education = [
    {
      institution: 'Parul University',
      degree: 'B.Tech CSE',
      period: '2022 – 2025',
      grade: 'CGPA 7.40',
      icon: '🎓',
    },
    {
      institution: 'Shree K.J. Polytechnic',
      degree: 'Diploma CE',
      period: '2019 – 2022',
      grade: 'CGPA 7.84',
      icon: '📚',
    },
    {
      institution: 'S.V.E.M. School',
      degree: '10th Grade',
      period: '2019',
      grade: '61.83%',
      icon: '🏫',
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <GraduationCap className="w-6 h-6 text-purple-600" />
        <h2 className="text-lg font-bold text-gray-800">Education</h2>
      </div>

      {education.map((edu, index) => (
        <div
          key={index}
          className="border border-gray-300 rounded p-3 bg-white hover:bg-gray-50 transition-colors"
        >
          <div className="flex items-start gap-3">
            <div className="text-2xl">{edu.icon}</div>
            <div className="flex-1">
              <h3 className="font-bold text-gray-800">{edu.institution}</h3>
              <p className="text-sm text-blue-600">{edu.degree}</p>
              <div className="flex items-center justify-between mt-1">
                <span className="text-xs text-gray-500">{edu.period}</span>
                <div className="flex items-center gap-1 bg-yellow-100 px-2 py-0.5 rounded">
                  <Award className="w-3 h-3 text-yellow-600" />
                  <span className="text-xs font-semibold text-yellow-700">{edu.grade}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default EducationWindow;
