import React from 'react';
import { Code, Database, Wrench, TestTube, Sparkles } from 'lucide-react';

const SkillsWindow: React.FC = () => {
  const skillCategories = [
    {
      title: 'Languages',
      icon: <Code className="w-5 h-5 text-blue-600" />,
      skills: ['JavaScript', 'Java', 'HTML5', 'CSS', 'SQL'],
      color: 'bg-blue-100 border-blue-300',
    },
    {
      title: 'Frameworks',
      icon: <Sparkles className="w-5 h-5 text-green-600" />,
      skills: ['React', 'Next.js', 'Node.js', 'Express', 'Tailwind CSS'],
      color: 'bg-green-100 border-green-300',
    },
    {
      title: 'Tools & Databases',
      icon: <Database className="w-5 h-5 text-purple-600" />,
      skills: ['Git', 'GitHub', 'Android Studio', 'MongoDB', 'Redis', 'TiDB', 'Firebase'],
      color: 'bg-purple-100 border-purple-300',
    },
    {
      title: 'Testing',
      icon: <TestTube className="w-5 h-5 text-red-600" />,
      skills: ['Manual QA', 'API Testing', 'JWT'],
      color: 'bg-red-100 border-red-300',
    },
    {
      title: 'Others',
      icon: <Wrench className="w-5 h-5 text-amber-600" />,
      skills: ['Cloudinary', 'Responsive Design', 'AR Lens Development'],
      color: 'bg-amber-100 border-amber-300',
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Code className="w-6 h-6 text-green-600" />
        <h2 className="text-lg font-bold text-gray-800">Technical Skills</h2>
      </div>

      {skillCategories.map((category, index) => (
        <div
          key={index}
          className={`border rounded p-3 ${category.color}`}
        >
          <div className="flex items-center gap-2 mb-2">
            {category.icon}
            <h3 className="font-bold text-gray-800">{category.title}</h3>
          </div>
          <div className="flex flex-wrap gap-1">
            {category.skills.map((skill, i) => (
              <span
                key={i}
                className="bg-white px-2 py-0.5 rounded text-xs border border-gray-300 text-gray-700"
              >
                {skill}
              </span>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SkillsWindow;
