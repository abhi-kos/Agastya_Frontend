
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
              <img 
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAAAyCAYAAAAZUZThAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsMAAA7DAcdvqGQAAAYNSURBVHhe7ZxNi1xFEMf/GjVRMawfQMTF6EnEg0fBg5c9ed1v4MmP4MkPoJ48JeDRiyAe9eIHCKIggkbMJhnzdp7sa/dMz053VXfV9PTsfvr/Qa3pftszPd319KurqruejcQYY4wxxhhjjDHGGGOMMcYYY4wxxhhjjDHGpLEtfueSw+Hw6tra2sna2trCMN8yEURfjeyu/i3OJdt70X/Yvh79gfHEOKPttbkvDPc73J2dO3fk8OjB6PwdceZRtg7i10vHjs7vP398fHFb9p2yi3QQduD29vbJ09PT/QuhI8nJ02+O9yTSDhDOHz06vi6KmbOTPe3C1m78vPDh0ebZ6t6MY3q7grvvXtELZfhmt8tXr82GyI7Ctw6OPyvONESCR3A3JtDn7DujP7YLzbm4SG0jehg5/vk+PfWKuPMo6n61HQQ2Nzd39vf3pzuHE8lBJnzSjgJHEMdBDvC1JkQckcdkptE4mOVBEAPBLSVCzntQcvBx+vCzM2JaSOK+dbv+Wt7KffZsHP/+d3CyjyenRu1b0JgTpFJeUo2RmnPkElOHLu9XEQ6SIzzUgtLSKg7XoNTV1KFZYq7RR9F9kHPMWRCHBL9iGNpJrUGHUFSqefSonZhrLCtlOojlVXN/ZudBJOFGacpDLcIfCmbHdGd98OzJ+vrliRT3r96ajLa+LM4FKCq9JaxOlGZVqDWnPnOIKMiY75oisWI5D6IQcRKYG8R4oPYeYBgOcm6m1JTuW9Ccc1pqzeF5iqPMI6dzHMSMMV/gnAcxSsb00J0HWVcfEynngCUtl+YdpnO4SpQrROcZl7OaahFLRArXIsL7a6+8Nnq7fe/kYHtzF58OBoujLE6ogHMQxTiHVqXbbQix16rSOotmO8eiuFZlp2gQUWXN4TpVLEOtUsgZVNY6SEh1uYPqFCjntTXR5qi0W27VqFY126kxkCw+D1JzrnUQY5ZMcyLdwrS6vXyehblGTGNzSAl1lqyvl6BUZGU1RzEslgqJX3rvKoVnHaT2XIidk1iGWtX6/39ALAepUfvSS68gkFMxYnvRoQZxNXKmADkdnFPdLmv3TYya8yVqj5WH6ZzFcbPmC0qtZBAlMb9WOcOcnvvEyq15sEWtuc6iy99qjbFIeXeeJqXXnILqJPdV54md7ncd7jVqBDI153N+/kN7FIk9GgSp5a+Ui6iKNmP0OTXXJfX+TXnzQLRHsIFCcR6Ejb2LvVYN1A4RxzDrp5SaqWFsCky61hXRaqcGfTVOzdRjDDXLwUkHUbLMGKRv8Ai5ie3Q1PuWrozyxCq5ZlKHuNK/P2ZY53AI43NaGgtXefEN6ztFOQfIGUJ2zdRwDnWhRKnJx5q1E0sX5iQcPA8Z4nSw5reZuWscaUqoyGZYlFSzLkasCkxJkaMopWue87cx5tTmDo2iHYRPxGIaMKeEqJcWjEKYs8Q2Vm7HKLkOi85t1ZBev5zyFuuAUPLnRLFq9nPL0FqPFuIrGPlfjZT5FZ/VsyaiZn6n5Nai9hAbW8+UdVJeZ6k9C3MLVkhoTt/1l1wHDOs7RQ6ybGcpXU+JoTnp6SRa+ahWNXMLqRZ6RbpgShfTtYmtGdQsdRtCIzNIiVF6E/dF6LIJjVmdOteZNRODut5ga1Mjnx3AdCe1dbmIVudoJaS2cyxPaqgVu8AC9S/5PEiXXM6hPtehwUXq0DontXMU0LbMWYyTihpbeysRT8r8I2Y4iS30dgPqOoFGNWKOkVJLOggTpVZHbgbmK3K+qBYT6lQnSU0lUkXeV5LapCB3RNVSq5rX1UKVg5jlyKlMq6R2aqLLreYdxMwp3aC1qF0fDSlDrNLEX1Aqbi4cqm6NJNZ9DpDHqqjVsq/7DPxB6mgWearMS0C5obJFhrxWGF6Wg9R2jn7lKEmJGsZUMPW7zGr0OSHvrB30K2QHzTtI6S9irSJT8TtWmObsGhTKEKtlH46hUI87Za3zVrZ0jaeBa1JjJy9Da7640A85+jCFGnhDiG5fHNv9oJkmfYqSwjKXWKv2PRXThMk/XL+q3tHyK84mrhtYeb22WXkezmEdbAwyBuHXIFu9nMPOYYa9s/VVvZTDRznjpzPzMizRfb9HGWON/9H/ZcieRzLGGGOMMcYYY4wxxhhjjDHGGGOMMcYYY4wxpiqj0X+2qdEMF0HwdwAAAABJRU5ErkJggg=="
                alt="ZoomRx Logo" 
                className="h-5 opacity-80 hover:opacity-100 transition-opacity"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LandingScreen;
