import React from 'react';
import { Briefcase, Calendar } from 'lucide-react';

const ExperienceWindow: React.FC = () => {
  const experiences = [
    {
      company: 'Encoraa ESG',
      role: 'Jr. Android Developer',
      period: 'June 2025 – Present',
      description: ['Developing native Android apps using Java & Android Studio'],
      current: true,
    },
    {
      company: 'Encoraa ESG',
      role: 'Academic Trainee Engineer Intern',
      period: 'Nov 2024 – May 2025',
      description: [
        'Built full-stack applications using React, Node.js, Express, MySQL, Redis, and Next.js',
        'Performed manual QA testing: alpha tests, bug reporting, UI/UX validation',
      ],
      current: false,
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Briefcase className="w-6 h-6 text-amber-600" />
        <h2 className="text-lg font-bold text-gray-800">Work Experience</h2>
      </div>

      {experiences.map((exp, index) => (
        <div
          key={index}
          className={`border rounded p-3 ${
            exp.current ? 'border-green-400 bg-green-50' : 'border-gray-300 bg-white'
          }`}
        >
          <div className="flex items-start justify-between mb-2">
            <div>
              <h3 className="font-bold text-gray-800">{exp.role}</h3>
              <p className="text-sm text-blue-600">{exp.company}</p>
            </div>
            {exp.current && (
              <span className="bg-green-500 text-white text-xs px-2 py-0.5 rounded">
                Current
              </span>
            )}
          </div>
          <div className="flex items-center gap-1 text-xs text-gray-500 mb-2">
            <Calendar className="w-3 h-3" />
            <span>{exp.period}</span>
          </div>
          <ul className="space-y-1">
            {exp.description.map((item, i) => (
              <li key={i} className="text-sm text-gray-700 flex items-start gap-2">
                <span className="text-blue-500 mt-1">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
};

export default ExperienceWindow;
