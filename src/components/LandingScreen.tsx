
import React, { useState } from 'react';
import { Send, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface LandingScreenProps {
  onSendMessage: (message: string) => void;
}

const LandingScreen: React.FC<LandingScreenProps> = ({ onSendMessage }) => {
  const [inputValue, setInputValue] = useState('');

  const handleSend = () => {
    if (inputValue.trim()) {
      onSendMessage(inputValue);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="min-h-screen bg-white dark:bg-hcp-dark flex flex-col relative overflow-hidden">
      {/* Gradient shift background animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute inset-0 opacity-[0.10]"
          style={{
            background: 'linear-gradient(-45deg, #1E41EB, #795DED, #39C7A5, #EA4970, #FFCA42)',
            backgroundSize: '400% 400%',
            animation: 'gradient-shift 15s ease-in-out infinite',
            filter: 'blur(80px)'
          }}
        />
      </div>

      {/* ChatGPT-style Chat Interface with Gemini Greeting */}
      <div className="flex flex-col flex-1 max-w-3xl w-full mx-auto px-4 relative z-10">
        {/* Greeting Section */}
        <div className="flex-1 flex flex-col items-center justify-center mb-24">
          {/* Logo */}
          <div className="flex justify-center mb-6">
            <div className="w-16 h-16 bg-white dark:bg-black/20 rounded-xl flex items-center justify-center shadow-sm">
              <Brain className="w-8 h-8 text-hcp-primary animate-pulse-glow" />
            </div>
          </div>
          
          {/* Gemini-style Greeting with Animation */}
          <div className="text-center mb-10">
            <h1 className="text-4xl md:text-5xl font-semibold text-gray-900 dark:text-gray-100 font-playfair mb-6 animate-fade-in-up">
              Welcome Doctor, I am Agastya
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Your intelligent research and panel support tool. How can I assist you today?
            </p>
          </div>

          {/* Example Suggestions (ChatGPT style) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div 
              onClick={() => onSendMessage("Find recent research on cardiovascular medicine")}
              className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
            >
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Find recent research on cardiovascular medicine</h3>
            </div>
            
            <div 
              onClick={() => onSendMessage("Update my panel profile information")}
              className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
            >
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Update my panel profile information</h3>
            </div>
            
            <div 
              onClick={() => onSendMessage("Find conferences in my specialty for 2025")}
              className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
            >
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Find conferences in my specialty for 2025</h3>
            </div>
            
            <div 
              onClick={() => onSendMessage("How do I submit my honorarium request?")}
              className="p-4 border border-gray-200 dark:border-gray-800 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
            >
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">How do I submit my honorarium request?</h3>
            </div>
          </div>
        </div>

        {/* Input Area - Fixed at bottom like ChatGPT */}
        <div className="sticky bottom-6 w-full mb-6">
          <div className="relative">
            <Textarea
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Message Agastya..."
              className="min-h-[56px] max-h-[200px] pr-12 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 shadow-lg resize-none rounded-lg focus:ring-1 focus:ring-hcp-primary focus:border-hcp-primary"
              rows={1}
            />
            
            <Button
              onClick={handleSend}
              disabled={!inputValue.trim()}
              className="absolute right-2 bottom-2 h-10 w-10 p-0 rounded-md bg-hcp-primary hover:bg-hcp-primary/90 text-white flex items-center justify-center"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
          
          <p className="text-xs text-gray-500 mt-2 text-center">
            Secure • HIPAA-Compliant • For Healthcare Professionals
          </p>
        </div>
      </div>
    </div>
  );
};

export default LandingScreen;
