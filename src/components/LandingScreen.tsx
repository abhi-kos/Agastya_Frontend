
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
          className="absolute inset-0 opacity-[0.18]"
          style={{
            background: 'linear-gradient(-45deg, #1E41EB 0%, #795DED 20%, #39C7A5 40%, #EA4970 60%, #FFCA42 80%, #1E41EB 100%)',
            backgroundSize: '400% 400%',
            animation: 'gradient-shift 15s ease-in-out infinite',
            filter: 'blur(60px)'
          }}
        />
      </div>

      {/* ChatGPT-style Chat Interface with Gemini Greeting */}
      <div className="flex flex-col flex-1 max-w-3xl w-full mx-auto px-4 relative z-10">
        {/* Greeting Section */}
        <div className="flex-1 flex flex-col items-center justify-center mb-12 mt-6">
          {/* Logo and Product Name */}
          <div className="flex flex-col items-center mb-5" id="logo-container">
            <div className="w-14 h-14 bg-white dark:bg-black/20 rounded-xl flex items-center justify-center shadow-sm">
              <Brain className="w-7 h-7 text-hcp-primary animate-pulse-glow" />
            </div>
            <div className="text-lg font-semibold mt-2 text-hcp-primary dark:text-hcp-primary">
              Agastya
            </div>
          </div>
          
          {/* Gemini-style Greeting with Animation */}
          <div className="text-center mb-6">
            <h1 className="text-3xl md:text-4xl font-semibold text-gray-900 dark:text-gray-100 font-playfair mb-3 animate-fade-in-up">
              Hello Doctor [Name]
            </h1>
            <p className="text-base text-gray-600 dark:text-gray-300 max-w-2xl mx-auto animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
              Your intelligent research and panel support tool. How can I assist you today?
            </p>
          </div>

          {/* Example Suggestions (ChatGPT style) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 w-full max-w-2xl animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div 
              onClick={() => onSendMessage("Find recent research on cardiovascular medicine")}
              className="p-3 border border-black dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
            >
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Find recent research on cardiovascular medicine</h3>
            </div>
            
            <div 
              onClick={() => onSendMessage("Update my panel profile information")}
              className="p-3 border border-black dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
            >
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Update my panel profile information</h3>
            </div>
            
            <div 
              onClick={() => onSendMessage("Find conferences in my specialty for 2025")}
              className="p-3 border border-black dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
            >
              <h3 className="text-sm font-medium text-gray-900 dark:text-gray-100">Find conferences in my specialty for 2025</h3>
            </div>
            
            <div 
              onClick={() => onSendMessage("How do I submit my honorarium request?")}
              className="p-3 border border-black dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors cursor-pointer"
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
              placeholder="Ask me anything..."
              className="min-h-[56px] max-h-[200px] pr-12 bg-white dark:bg-gray-800 border border-black dark:border-gray-600 shadow-lg resize-none rounded-lg focus:ring-1 focus:ring-hcp-primary focus:border-hcp-primary"
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
          
          <div className="flex justify-center mt-2">
            <div className="h-6 flex items-center">
              <svg width="100" height="24" viewBox="0 0 300 72" fill="none" xmlns="http://www.w3.org/2000/svg" className="opacity-80 hover:opacity-100 transition-opacity">
                <path d="M276.317 0.720703H23.6833C10.9599 0.720703 0.600098 11.0805 0.600098 23.8039V48.1973C0.600098 60.9207 10.9599 71.2805 23.6833 71.2805H276.317C289.04 71.2805 299.4 60.9207 299.4 48.1973V23.8039C299.4 11.0805 289.04 0.720703 276.317 0.720703Z" fill="black"/>
                <path d="M38.16 18.0039L63.6 53.0439H48.2401L30.24 30.1639L38.16 18.0039Z" fill="white"/>
                <path d="M64.32 53.0449H78.48L53.52 18.0049H39.36L64.32 53.0449Z" fill="white"/>
                <path d="M105.36 32.3641C105.36 35.1241 102.12 37.4041 98.16 37.4041C94.2 37.4041 90.96 35.1241 90.96 32.3641C90.96 29.6041 94.2 27.3241 98.16 27.3241C102.12 27.3241 105.36 29.6041 105.36 32.3641Z" fill="white"/>
                <path d="M87 43.4439C87 46.2039 83.76 48.4839 79.8 48.4839C75.84 48.4839 72.6 46.2039 72.6 43.4439C72.6 40.6839 75.84 38.4039 79.8 38.4039C83.76 38.4039 87 40.6839 87 43.4439Z" fill="white"/>
                <path d="M123.601 40.0839C130.441 40.0839 134.641 36.8039 134.641 31.4839C134.641 26.1639 130.441 22.8839 123.601 22.8839H114.961V48.4839H119.161V40.0839H123.601ZM119.161 36.4839V26.4839H123.601C127.681 26.4839 130.201 28.2839 130.201 31.4839C130.201 34.6839 127.681 36.4839 123.601 36.4839H119.161Z" fill="white"/>
                <path d="M137.52 48.4839H157.2V44.8839H141.72V37.4039H156V33.8039H141.72V26.4839H157.2V22.8839H137.52V48.4839Z" fill="white"/>
                <path d="M187.681 24.8839C185.281 23.2839 182.281 22.4839 178.961 22.4839C169.681 22.4839 164.121 28.5639 164.121 36.0839C164.121 43.6039 169.921 49.2839 179.441 49.2839C182.961 49.2839 186.401 48.4439 189.041 46.6039L187.681 43.6439C185.441 45.0839 182.721 45.7239 179.921 45.7239C173.681 45.7239 168.881 42.0039 168.561 36.1639H190.321C190.401 34.9639 190.321 33.6039 190.321 33.6039C190.321 28.5639 188.801 25.7639 187.681 24.8839ZM178.961 26.0839C184.401 26.0839 186.321 30.4839 186.321 33.0839H168.561C168.881 30.1639 171.441 26.0839 178.961 26.0839Z" fill="white"/>
                <path d="M211.201 22.4839C203.601 22.4839 197.841 27.8039 197.841 35.9639C197.841 44.1239 203.601 49.4039 211.201 49.4039C218.801 49.4039 224.561 44.1239 224.561 35.9639C224.561 27.8039 218.881 22.4839 211.201 22.4839ZM211.201 45.8439C206.081 45.8439 202.281 41.7639 202.281 35.9639C202.281 30.1639 206.081 26.0839 211.201 26.0839C216.321 26.0839 220.121 30.1639 220.121 35.9639C220.121 41.7639 216.321 45.8439 211.201 45.8439Z" fill="white"/>
                <path d="M238.8 22.8839H225.12V26.4839H231.6V48.4839H235.8V26.4839H242.28V22.8839H238.8Z" fill="white"/>
                <path d="M268.64 48.4839L262.32 38.4839C265.76 37.2039 267.68 34.6039 267.68 31.2039C267.68 26.0039 263.76 22.8839 257.52 22.8839H246.4V48.4839H250.6V38.8839H256.96L262.56 48.4839H268.64ZM250.6 35.2839V26.4839H257.52C261.36 26.4839 263.28 28.3239 263.28 31.2039C263.28 33.8439 261.36 35.2839 257.52 35.2839H250.6Z" fill="white"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingScreen;
