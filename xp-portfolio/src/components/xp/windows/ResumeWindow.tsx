import React from 'react';
import { FileText, Download, ExternalLink } from 'lucide-react';
import resumePDF from '@/assets/ResumeNehal.pdf';

const ResumeWindow: React.FC = () => {
  const handleDownload = () => {
    // Create a download link for the PDF
    const link = document.createElement('a');
    link.href = resumePDF;
    link.download = 'Nehal_Chauhan_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleViewInNewTab = () => {
    window.open(resumePDF, '_blank');
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="w-6 h-6 text-red-600" />
        <h2 className="text-lg font-bold text-gray-800">Resume.pdf</h2>
      </div>

      <div className="border border-gray-300 rounded p-4 bg-white">
        {/* PDF Preview */}
        <div className="mb-4">
          <iframe
            src={resumePDF}
            className="w-full h-96 border border-gray-300 rounded"
            title="Resume Preview"
          />
        </div>
        
        {/* Action Buttons */}
        <div className="flex justify-center gap-4">
          <button
            onClick={handleViewInNewTab}
            className="xp-button flex items-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            <span>View in New Tab</span>
          </button>
          
          <button
            onClick={handleDownload}
            className="xp-button flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            <span>Download Resume</span>
          </button>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-300 rounded p-3">
        <div className="flex items-start gap-2">
          <FileText className="w-4 h-4 text-blue-600 flex-shrink-0 mt-0.5" />
          <p className="text-xs text-blue-800">
            Your resume is displayed above. You can view it inline, open it in a new tab, or download it directly.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ResumeWindow;
