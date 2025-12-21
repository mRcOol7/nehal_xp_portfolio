import React, { useState } from 'react';
import { Mail, Send, Github, Linkedin, Globe, Loader2 } from 'lucide-react';
import { toast } from 'sonner';

const ContactWindow: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all fields');
      return;
    }
    
    setIsSubmitting(true);
    
    try {
      // Send message to API endpoint
      const response = await fetch('https://nehal-xp-porfolio-backend.vercel.app/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        toast.success('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' });
      } else {
        toast.error(result.message || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      toast.error('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const socialLinks = [
    {
      label: 'LinkedIn',
      icon: <Linkedin className="w-5 h-5" />,
      url: 'https://linkedin.com/in/nehal-chauhan19',
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      label: 'GitHub',
      icon: <Github className="w-5 h-5" />,
      url: 'https://github.com/mRcOol7',
      color: 'bg-gray-800 hover:bg-gray-900',
    },
    {
      label: 'Portfolio',
      icon: <Globe className="w-5 h-5" />,
      url: 'https://nehalchauhanportfolio.vercel.app',
      color: 'bg-green-600 hover:bg-green-700',
    },
  ];

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2 mb-4">
        <Mail className="w-6 h-6 text-blue-600" />
        <h2 className="text-lg font-bold text-gray-800">Contact Me</h2>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Name:</label>
          <input
            type="text"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="xp-input"
            placeholder="Your name"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Email:</label>
          <input
            type="email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="xp-input"
            placeholder="your.email@example.com"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">Message:</label>
          <textarea
            value={formData.message}
            onChange={(e) => setFormData({ ...formData, message: e.target.value })}
            className="xp-input min-h-24 resize-none"
            placeholder="Your message..."
            rows={4}
          />
        </div>

        <button 
          type="submit" 
          className="xp-button flex items-center gap-2"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Sending...</span>
            </>
          ) : (
            <>
              <Send className="w-4 h-4" />
              <span>Send Message</span>
            </>
          )}
        </button>
      </form>

      <div className="border-t border-gray-300 pt-4">
        <p className="text-sm text-gray-600 mb-3">Or connect with me on:</p>
        <div className="flex flex-wrap gap-2">
          {socialLinks.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`${link.color} text-white px-3 py-1.5 rounded text-sm flex items-center gap-2 transition-colors`}
            >
              {link.icon}
              <span>{link.label}</span>
            </a>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContactWindow;
