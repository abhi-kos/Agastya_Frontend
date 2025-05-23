
import React from 'react';
import { Brain, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LandingScreenProps {
  onStartChat: () => void;
}

const LandingScreen: React.FC<LandingScreenProps> = ({ onStartChat }) => {
  return (
    <div className="min-h-screen bg-white dark:bg-hcp-dark flex items-center justify-center relative">
      {/* Subtle Background */}
      <div className="absolute inset-0 opacity-5">
        <div 
          className="absolute top-1/4 left-1/3 w-96 h-96 rounded-full blur-3xl"
          style={{ 
            background: 'radial-gradient(circle, rgba(57, 199, 165, 0.4) 0%, transparent 70%)',
          }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-96 h-96 rounded-full blur-3xl"
          style={{ 
            background: 'radial-gradient(circle, rgba(121, 93, 237, 0.3) 0%, transparent 70%)',
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 max-w-3xl w-full px-6 py-12">
        <div className="text-center space-y-8">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-white dark:bg-black/20 rounded-xl flex items-center justify-center shadow-sm">
              <Brain className="w-8 h-8 text-hcp-primary" />
            </div>
          </div>
          
          {/* Main Title */}
          <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 dark:text-gray-100 font-playfair">
            HCP Assistant
          </h1>
          
          {/* Description */}
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            An intelligent research and panel support tool for healthcare professionals. Access research articles, conference information, and panel management in one place.
          </p>
          
          <div className="pt-4">
            <Button
              onClick={onStartChat}
              className="h-12 px-8 text-base font-medium bg-hcp-primary hover:bg-hcp-primary/90 text-white rounded-lg shadow-sm"
            >
              Access Assistant
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </div>
          
          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-12 text-left">
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Research Access</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Search the latest medical research and publications with intelligent query processing.</p>
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Panel Management</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Manage honorarium, update your profile, and handle panel-related tasks efficiently.</p>
            </div>
            
            <div className="p-4">
              <h3 className="text-lg font-medium text-gray-900 dark:text-gray-100 mb-2">Conference Information</h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm">Find relevant conferences, dates, and specialty information in one convenient place.</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Footer */}
      <div className="absolute bottom-4 w-full text-center text-sm text-gray-500">
        Secure • HIPAA-Compliant • For Healthcare Professionals
      </div>
    </div>
  );
};

export default LandingScreen;
