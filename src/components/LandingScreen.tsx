
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
            <div className="h-6 flex items-center opacity-80 hover:opacity-100 transition-opacity">
              {/* ZoomRx Logo */}
              <svg width="100" height="24" viewBox="0 0 180 40" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M38.5801 9.23792H41.3573V29.8335H38.5801V9.23792Z" fill="#000000"/>
                <path d="M31.5451 16.7868H28.7964C28.9356 16.1963 29.0048 15.4859 29.0048 14.4674C29.0048 10.3573 26.4975 9.22948 21.1396 9.22948H11.3174V11.9782H21.0419C25.0827 11.9782 26.1851 12.4202 26.1851 14.6347C26.1851 15.4011 26.1159 16.0792 26.0183 16.7868H13.9508C9.24973 16.7868 7.27512 18.2734 7.27512 22.9675C7.27512 26.8305 8.88346 29.8335 15.5592 29.8335H31.5451V16.7868ZM28.7679 27.0848H17.1108C12.2343 27.0848 10.0518 25.8841 10.0518 22.7402C10.0518 19.9095 11.1827 19.5266 13.9793 19.5266H28.7679V27.0848Z" fill="#000000"/>
                <path d="M33.8716 11.9782H43.9991C46.6456 11.9782 47.6503 12.0036 48.5102 12.1793V9.22948H33.8716V11.9782Z" fill="#000000"/>
                <path d="M80.1946 9.24274H77.4173V29.8384H80.1946V9.24274Z" fill="#000000"/>
                <path d="M71.12 22.9455C71.12 18.5308 69.0068 16.5868 60.5903 16.5868H57.5726C56.5394 16.5868 56.2174 16.4478 56.2174 15.6989V14.4729C56.2174 13.6024 56.7834 13.3412 57.8451 13.3412H72.8566V10.6941H58.6208C54.8832 10.6941 53.3982 12.0586 53.3982 14.8642V15.4079C53.3982 18.1773 54.9809 19.3517 57.7705 19.3517H61.6235C67.2515 19.3517 68.2846 19.9207 68.2846 23.1291V23.5457C68.2846 25.8868 67.438 26.4053 66.0508 26.4053H50.6293V29.1432H65.3926C70.7221 29.1432 71.12 26.8952 71.12 24.071V22.9455Z" fill="#000000"/>
                <path d="M86.1013 16.7963H83.3525C83.4917 16.2058 83.5609 15.4954 83.5609 14.4769C83.5609 10.3668 81.0536 9.23891 75.6957 9.23891H65.8783V11.9876H75.6026C79.6434 11.9876 80.7458 12.4297 80.7458 14.6442C80.7458 15.4106 80.6766 16.0887 80.579 16.7963H68.3437C63.748 16.7963 61.768 18.2829 61.768 22.977C61.768 26.84 63.3764 29.843 70.0521 29.843H86.0966L86.1013 16.7963ZM83.324 27.0942H71.6132C66.7367 27.0942 64.5542 25.8936 64.5542 22.7496C64.5542 19.919 65.6851 19.536 68.4817 19.536H83.2703L83.324 27.0942Z" fill="#000000"/>
                <path d="M141.376 9.24274H138.599V29.8384H141.376V9.24274Z" fill="#000000"/>
                <path d="M130.922 22.9455C130.922 18.5308 128.809 16.5868 120.392 16.5868H117.375C116.336 16.5868 116.02 16.4478 116.02 15.6989V14.4729C116.02 13.6024 116.586 13.3412 117.647 13.3412H132.659V10.6941H118.423C114.685 10.6941 113.2 12.0586 113.2 14.8642V15.4079C113.2 18.1773 114.783 19.3517 117.573 19.3517H121.426C127.054 19.3517 128.087 19.9207 128.087 23.1291V23.5457C128.087 25.8868 127.24 26.4053 125.853 26.4053H110.432V29.1432H125.195C130.524 29.1432 130.922 26.8952 130.922 24.071V22.9455Z" fill="#000000"/>
                <path d="M108.096 9.23792H105.318V29.8335H108.096V9.23792Z" fill="#000000"/>
                <path d="M93.1363 11.9782H103.264C105.91 11.9782 106.915 12.0036 107.775 12.1793V9.22948H93.1363V11.9782Z" fill="#000000"/>
                <path d="M145.828 9.24274H143.05V29.8384H145.828V9.24274Z" fill="#000000"/>
                <path d="M157.961 16.7963H155.217C155.357 16.2058 155.426 15.4954 155.426 14.4769C155.426 10.3668 152.918 9.23891 147.56 9.23891H137.743V11.9876H147.467C151.507 11.9876 152.61 12.4297 152.61 14.6442C152.61 15.4106 152.541 16.0887 152.443 16.7963H140.213C135.612 16.7963 133.637 18.2829 133.637 22.977C133.637 26.84 135.245 29.843 141.921 29.843H157.961V16.7963ZM155.189 27.0942H143.477C138.606 27.0942 136.423 25.8936 136.423 22.7496C136.423 19.919 137.554 19.536 140.351 19.536H155.139L155.189 27.0942Z" fill="#000000"/>
                <path d="M180 16.692H168.582L180 29.8383H175.576L164.352 16.692H161.906V29.8383H159.129V9.23755H178.968C181.079 9.23755 183 10.1543 183 13.0469C183 15.378 181.946 16.692 180 16.692ZM177.576 13.965C178.307 13.965 180.057 13.8449 180.057 12.7529C180.057 11.4766 178.002 11.9783 176.667 11.9783H161.906V13.965H177.576Z" fill="#000000"/>
                <path d="M0.000244141 29.8383H4.60613L18.5968 9.23755H13.9862L0.000244141 29.8383Z" fill="#000000"/>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingScreen;
