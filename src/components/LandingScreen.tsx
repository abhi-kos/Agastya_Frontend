
import React from 'react';
import { Sparkles, Brain, Stethoscope, MessageSquare } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface LandingScreenProps {
  onStartChat: () => void;
}

const LandingScreen: React.FC<LandingScreenProps> = ({ onStartChat }) => {
  return (
    <div className="min-h-screen bg-hcp-dark relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 floating-shapes">
        <div 
          className="absolute top-1/4 left-1/3 w-64 h-64 rounded-full opacity-20 blur-3xl"
          style={{ 
            background: 'radial-gradient(circle, #795DED 0%, transparent 70%)',
            animation: 'float 10s ease-in-out infinite'
          }}
        />
        <div 
          className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-15 blur-3xl"
          style={{ 
            background: 'radial-gradient(circle, #FFCA42 0%, transparent 70%)',
            animation: 'float 12s ease-in-out infinite reverse'
          }}
        />
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen px-6 text-center">
        {/* Hero Section */}
        <div className="max-w-4xl mx-auto animate-fade-in-up">
          {/* Logo/Icon */}
          <div className="mb-8 flex justify-center">
            <div className="relative">
              <div className="w-20 h-20 bg-gradient-to-br from-hcp-primary to-hcp-teal rounded-2xl flex items-center justify-center shadow-2xl animate-pulse-glow">
                <Brain className="w-10 h-10 text-white" />
              </div>
              <Sparkles className="absolute -top-2 -right-2 w-6 h-6 text-hcp-gold animate-pulse" />
            </div>
          </div>

          {/* Main Heading with Gradient Text */}
          <h1 className="text-6xl md:text-7xl lg:text-8xl font-playfair font-extrabold mb-6 leading-tight">
            <span className="animate-text-gradient">
              HCP Assistant
            </span>
          </h1>

          {/* Subtitle */}
          <p className="text-xl md:text-2xl text-gray-300 mb-4 font-medium max-w-3xl mx-auto leading-relaxed">
            AI-Powered Research & Panel Support for Healthcare Professionals
          </p>

          <p className="text-lg text-gray-400 mb-12 max-w-2xl mx-auto">
            Get instant access to research articles, conference information, and panel support queries through intelligent conversation.
          </p>

          {/* Feature Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12 max-w-4xl mx-auto">
            <div className="bg-black/20 backdrop-blur-sm border border-hcp-teal/20 rounded-2xl p-6 hover:bg-black/30 transition-all duration-300 hover:scale-105">
              <Stethoscope className="w-8 h-8 text-hcp-teal mb-4 mx-auto" />
              <h3 className="text-lg font-semibold text-white mb-2">Research Queries</h3>
              <p className="text-gray-400 text-sm">Access latest medical research and articles through intelligent search</p>
            </div>

            <div className="bg-black/20 backdrop-blur-sm border border-hcp-purple/20 rounded-2xl p-6 hover:bg-black/30 transition-all duration-300 hover:scale-105">
              <MessageSquare className="w-8 h-8 text-hcp-purple mb-4 mx-auto" />
              <h3 className="text-lg font-semibold text-white mb-2">Panel Support</h3>
              <p className="text-gray-400 text-sm">Get help with honorarium, profile updates, and panel management</p>
            </div>

            <div className="bg-black/20 backdrop-blur-sm border border-hcp-gold/20 rounded-2xl p-6 hover:bg-black/30 transition-all duration-300 hover:scale-105">
              <Sparkles className="w-8 h-8 text-hcp-gold mb-4 mx-auto" />
              <h3 className="text-lg font-semibold text-white mb-2">Conference Info</h3>
              <p className="text-gray-400 text-sm">Find conference details, dates, and specialty information</p>
            </div>
          </div>

          {/* CTA Button */}
          <Button
            onClick={onStartChat}
            size="lg"
            className="bg-gradient-to-r from-hcp-primary to-hcp-teal hover:from-hcp-primary/90 hover:to-hcp-teal/90 text-white px-12 py-6 text-xl font-semibold rounded-full shadow-2xl hover:shadow-hcp-primary/25 transition-all duration-300 hover:scale-105 animate-pulse-glow"
          >
            Start Conversation
            <MessageSquare className="ml-3 w-6 h-6" />
          </Button>

          <p className="text-sm text-gray-500 mt-6">
            Secure • HIPAA-Compliant • Professional
          </p>
        </div>
      </div>

      {/* Bottom Gradient */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-hcp-dark to-transparent" />
    </div>
  );
};

export default LandingScreen;
