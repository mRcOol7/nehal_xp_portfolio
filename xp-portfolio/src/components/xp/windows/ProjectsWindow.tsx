import React, { useState } from 'react';
import { Code, Globe, Shield, FileText, TrendingUp, ArrowLeft, RefreshCw, Home, X, Github } from 'lucide-react';

interface Project {
  title: string;
  url: string;
  icon: React.ReactNode;
  features: string[];
  description: string;
  githubUrl?: string;
}

const ProjectsWindow: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentUrl, setCurrentUrl] = useState('C:\\My Documents\\Projects');

  const projects: Project[] = [
    {
      title: 'Personal Portfolio Website',
      url: 'https://nehalchauhanportfolio.vercel.app',
      icon: <Globe className="w-5 h-5 text-blue-500" />,
      features: [
        '3D models via Three.js',
        'AR support',
        'AOS animations',
        'Email contact form',
      ],
      description: 'A modern portfolio website featuring immersive 3D experiences and augmented reality integration. Built with cutting-edge web technologies to showcase projects in an interactive and engaging way.',
    },
    {
      title: 'Secure Social Authentication Platform',
      url: 'https://esg-internship.vercel.app',
      icon: <Shield className="w-5 h-5 text-green-500" />,
      features: [
        'OAuth login via Google/Twitter/Facebook',
        'NextAuth, TypeScript, TiDB, Redis',
        'JWT validation & protected routes',
      ],
      description: 'A robust authentication solution supporting multiple social login providers. Implements industry-standard security practices with JWT tokens, session management, and protected route middleware.',
    },
    {
      title: 'Invoice Management System',
      url: 'https://internship-esg.vercel.app',
      icon: <FileText className="w-5 h-5 text-purple-500" />,
      features: [
        'React + Node.js',
        'Cloudinary uploads',
        'PDF generation',
        'Dashboard with rich text editor',
      ],
      description: 'A comprehensive invoicing solution for freelancers and small businesses. Features automated PDF generation, cloud-based file storage, and an intuitive dashboard for managing clients and payments.',
    },
    {
      title: 'Stock Market Analytics Dashboard',
      url: 'https://stock-analytics.dev',
      githubUrl: 'https://github.com/mRcOol7/stock-data',
      icon: <TrendingUp className="w-5 h-5 text-red-500" />,
      features: [
        'Real-time NSE tracking',
        'Candlestick charts via ApexCharts',
      ],
      description: 'A real-time stock market analytics platform providing live data from the National Stock Exchange. Features interactive candlestick charts, technical indicators, and portfolio tracking capabilities.',
    },
  ];

  const handleProjectClick = (project: Project) => {
    setIsLoading(true);
    setCurrentUrl(project.url);
    
    setTimeout(() => {
      setSelectedProject(project);
      setIsLoading(false);
    }, 1500);
  };

  const handleBack = () => {
    setSelectedProject(null);
    setCurrentUrl('C:\\My Documents\\Projects');
  };

  const handleRefresh = () => {
    if (selectedProject) {
      setIsLoading(true);
      setTimeout(() => setIsLoading(false), 800);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Browser Toolbar */}
      <div className="bg-gradient-to-b from-[#f6f8fc] to-[#e8eef7] border-b border-[#919b9c] p-1">
        {/* Navigation Buttons */}
        <div className="flex items-center gap-1 mb-1">
          <button
            onClick={handleBack}
            disabled={!selectedProject}
            className={`p-1 rounded ${selectedProject ? 'hover:bg-[#cce4f7] active:bg-[#99c9ef]' : 'opacity-50'}`}
          >
            <ArrowLeft className="w-4 h-4 text-[#1c3d5a]" />
          </button>
          <button
            onClick={handleRefresh}
            className="p-1 rounded hover:bg-[#cce4f7] active:bg-[#99c9ef]"
          >
            <RefreshCw className={`w-4 h-4 text-[#1c3d5a] ${isLoading ? 'animate-spin' : ''}`} />
          </button>
          <button
            onClick={handleBack}
            className="p-1 rounded hover:bg-[#cce4f7] active:bg-[#99c9ef]"
          >
            <Home className="w-4 h-4 text-[#1c3d5a]" />
          </button>
        </div>

        {/* Address Bar */}
        <div className="flex items-center gap-2">
          <span className="text-xs text-[#1c3d5a] font-semibold">Address</span>
          <div className="flex-1 flex items-center bg-white border border-[#7f9db9] rounded-sm px-2 py-1">
            {selectedProject ? (
              <Globe className="w-3 h-3 text-blue-500 mr-2 flex-shrink-0" />
            ) : (
              <Code className="w-3 h-3 text-yellow-600 mr-2 flex-shrink-0" />
            )}
            <input
              type="text"
              value={currentUrl}
              readOnly
              className="flex-1 text-xs bg-transparent outline-none text-[#000080]"
            />
          </div>
          <button className="px-3 py-1 text-xs bg-[#f0f0f0] border border-[#7f9db9] rounded-sm hover:bg-[#e0e0e0] active:bg-[#d0d0d0]">
            Go
          </button>
        </div>
      </div>

      {/* Loading Bar */}
      {isLoading && (
        <div className="h-1 bg-[#e0e0e0] overflow-hidden">
          <div className="h-full bg-[#0078d4] animate-loading-bar" />
        </div>
      )}

      {/* Content Area */}
      <div className="flex-1 bg-white overflow-auto">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-full">
            <div className="w-8 h-8 border-2 border-[#0078d4] border-t-transparent rounded-full animate-spin mb-2" />
            <span className="text-xs text-gray-500">Loading {currentUrl}...</span>
          </div>
        ) : selectedProject ? (
          /* Project Detail View */
          <div className="p-4 animate-fade-in">
            {/* Website Header */}
            <div className="bg-gradient-to-r from-[#1e3a5f] to-[#2d5a87] text-white p-4 rounded-t-lg">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white/20 rounded-lg flex items-center justify-center">
                  {selectedProject.icon}
                </div>
                <div>
                  <h1 className="text-lg font-bold">{selectedProject.title}</h1>
                  <p className="text-xs text-blue-200">{selectedProject.url}</p>
                </div>
              </div>
            </div>

            {/* Website Content */}
            <div className="border border-t-0 border-gray-200 rounded-b-lg p-4">
              {/* Action Buttons */}
              <div className="mb-4 flex gap-2">
                {selectedProject.githubUrl ? (
                  <button
                    onClick={() => window.open(selectedProject.githubUrl, '_blank')}
                    className="flex-1 bg-gradient-to-b from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800 text-white px-4 py-2 rounded text-sm font-medium transition-all flex items-center justify-center gap-2"
                  >
                    <Github className="w-4 h-4" />
                    View on GitHub
                  </button>
                ) : (
                  <button
                    onClick={() => window.open(selectedProject.url, '_blank')}
                    className="flex-1 bg-gradient-to-b from-[#4285f4] to-[#1967d2] hover:from-[#357ae8] hover:to-[#1557b0] text-white px-4 py-2 rounded text-sm font-medium transition-all flex items-center justify-center gap-2"
                  >
                    <Globe className="w-4 h-4" />
                    Visit Live Website
                  </button>
                )}
                {!selectedProject.githubUrl && (
                  <button
                    onClick={() => window.open(selectedProject.url, '_blank')}
                    className="px-4 py-2 border border-gray-300 rounded text-sm hover:bg-gray-50 transition-all"
                  >
                    Open
                  </button>
                )}
              </div>

              <h2 className="text-sm font-bold text-gray-800 mb-2">About This Project</h2>
              <p className="text-xs text-gray-600 mb-4 leading-relaxed">
                {selectedProject.description}
              </p>

              <h2 className="text-sm font-bold text-gray-800 mb-2">Key Features</h2>
              <div className="grid gap-2">
                {selectedProject.features.map((feature, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 p-2 bg-[#f0f7ff] rounded border border-[#cce4f7]"
                  >
                    <span className="w-5 h-5 bg-green-500 rounded-full flex items-center justify-center text-white text-xs">✓</span>
                    <span className="text-xs text-gray-700">{feature}</span>
                  </div>
                ))}
              </div>

              <div className="mt-4 pt-4 border-t border-gray-200">
                <p className="text-[10px] text-gray-400 text-center">
                  © 2024 Nehal Chauhan. All rights reserved.
                </p>
              </div>
            </div>
          </div>
        ) : (
          /* Project List View */
          <div className="p-4">
            <div className="flex items-center gap-2 mb-4">
              <Code className="w-6 h-6 text-purple-600" />
              <h2 className="text-lg font-bold text-gray-800">Projects</h2>
            </div>

            <div className="grid gap-3">
              {projects.map((project, index) => (
                <div
                  key={index}
                  onClick={() => handleProjectClick(project)}
                  className="border border-gray-300 rounded p-3 bg-white hover:bg-blue-50 transition-colors cursor-pointer group"
                >
                  <div className="flex items-center gap-2 mb-2">
                    {project.icon}
                    <h3 className="font-bold text-gray-800 text-sm group-hover:text-blue-600 group-hover:underline">
                      {project.title}
                    </h3>
                  </div>
                  <p className="text-xs text-blue-500 mb-2">{project.url}</p>
                  <ul className="space-y-1 ml-7">
                    {project.features.slice(0, 2).map((feature, i) => (
                      <li key={i} className="text-xs text-gray-600 flex items-start gap-1">
                        <span className="text-green-500">✓</span>
                        <span>{feature}</span>
                      </li>
                    ))}
                    {project.features.length > 2 && (
                      <li className="text-xs text-gray-400">
                        +{project.features.length - 2} more features
                      </li>
                    )}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Status Bar */}
      <div className="bg-[#ece9d8] border-t border-[#919b9c] px-2 py-0.5 flex items-center justify-between">
        <span className="text-[10px] text-gray-600">
          {isLoading ? 'Opening page...' : selectedProject ? 'Done' : `${projects.length} project(s)`}
        </span>
        <span className="text-[10px] text-gray-600">Internet Explorer</span>
      </div>
    </div>
  );
};

export default ProjectsWindow;
