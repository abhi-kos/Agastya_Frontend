
import React, { useState, useRef, useEffect } from 'react';
import { Send, ArrowLeft, FileText, Calendar, Users, Brain } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  type?: 'research' | 'panel' | 'conference';
}

interface ChatInterfaceProps {
  onBack: () => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ onBack }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: "Hello Doctor, I'm Agastya, your HCP Research & Panel Assistant. I can help you find medical research publications, manage panel support tasks, and provide conference information. What would you like assistance with today?",
      role: 'assistant',
      timestamp: new Date(),
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputValue,
      role: 'user',
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: generateResponse(inputValue),
        role: 'assistant',
        timestamp: new Date(),
        type: getQueryType(inputValue),
      };
      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 1500);
  };

  const generateResponse = (query: string): string => {
    const queryLower = query.toLowerCase();
    
    if (queryLower.includes('research') || queryLower.includes('study') || queryLower.includes('article')) {
      return "Based on your query, I've found several relevant research articles from recent publications. Here are the key findings and citations that might be helpful for your work:";
    } else if (queryLower.includes('panel') || queryLower.includes('honorarium') || queryLower.includes('profile')) {
      return "I've accessed your panel information. Here's the current status and available options related to your request:";
    } else if (queryLower.includes('conference') || queryLower.includes('meeting') || queryLower.includes('event')) {
      return "Here are the upcoming conferences in your specialty area, with dates, locations, and registration details:";
    } else {
      return "I understand you're looking for information. To provide the most relevant assistance, could you specify whether you need help with research publications, panel management, or conference information?";
    }
  };

  const getQueryType = (query: string): 'research' | 'panel' | 'conference' => {
    const queryLower = query.toLowerCase();
    if (queryLower.includes('research') || queryLower.includes('study') || queryLower.includes('article')) {
      return 'research';
    } else if (queryLower.includes('panel') || queryLower.includes('honorarium')) {
      return 'panel';
    } else {
      return 'conference';
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const getMessageIcon = (type?: string) => {
    switch (type) {
      case 'research':
        return <FileText className="w-4 h-4 text-hcp-teal" />;
      case 'panel':
        return <Users className="w-4 h-4 text-hcp-purple" />;
      case 'conference':
        return <Calendar className="w-4 h-4 text-hcp-gold" />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen flex flex-row bg-white dark:bg-hcp-dark">
      {/* Sidebar - ChatGPT Style */}
      <div className="w-64 bg-gray-50 dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 h-screen hidden md:flex flex-col">
        <div className="p-4 border-b border-gray-200 dark:border-gray-800">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-gray-600 dark:text-gray-300 w-full justify-start gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </Button>
        </div>
        
        <div className="p-4 flex-1">
          <h2 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">Recent Conversations</h2>
          <div className="space-y-1">
            <div className="px-3 py-2 rounded-md bg-hcp-primary/10 text-hcp-primary dark:text-hcp-teal text-sm cursor-pointer">
              Current Session
            </div>
            {/* Placeholder for previous conversations */}
            <div className="px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-sm cursor-pointer text-gray-700 dark:text-gray-300">
              Research on Cardiovascular...
            </div>
            <div className="px-3 py-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-sm cursor-pointer text-gray-700 dark:text-gray-300">
              Panel Management - April
            </div>
          </div>
        </div>
        
        <div className="p-4 border-t border-gray-200 dark:border-gray-800">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-white dark:bg-gray-800 rounded-md flex items-center justify-center">
              <Brain className="w-4 h-4 text-hcp-primary" />
            </div>
            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Agastya</span>
          </div>
        </div>
      </div>
      
      {/* Mobile header - only visible on small screens */}
      <div className="md:hidden fixed top-0 left-0 right-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="p-3 flex items-center justify-between">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-gray-500"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <div className="flex items-center gap-2">
            <Brain className="w-5 h-5 text-hcp-primary" />
            <h1 className="text-lg font-medium text-gray-800 dark:text-gray-100">Agastya</h1>
          </div>
          
          <div className="w-5">
            {/* Placeholder for balance */}
          </div>
        </div>
      </div>

      {/* Main Chat Area - ChatGPT Style */}
      <div className="flex-1 flex flex-col h-screen">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto py-6 px-4 md:px-6 md:pt-6 md:pb-24 space-y-6 mt-14 md:mt-0">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              } animate-fade-in-up`}
            >
              <div
                className={`max-w-[85%] md:max-w-2xl lg:max-w-3xl p-4 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-hcp-primary text-white'
                    : 'bg-gray-50 dark:bg-gray-800 text-gray-800 dark:text-gray-100 shadow-sm'
                }`}
              >
                {message.role === 'assistant' && message.type && (
                  <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-200 dark:border-gray-700">
                    {getMessageIcon(message.type)}
                    <span className="text-xs uppercase tracking-wider font-medium text-gray-500 dark:text-gray-400">
                      {message.type} Information
                    </span>
                  </div>
                )}
                
                <div className="text-sm md:text-base leading-relaxed whitespace-pre-wrap">
                  {message.content}
                </div>
                
                <div className="text-xs text-gray-400 dark:text-gray-500 mt-2 text-right">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start animate-fade-in-up">
              <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg max-w-[85%] md:max-w-2xl lg:max-w-3xl">
                <div className="flex items-center gap-2">
                  <div className="typing-indicator text-gray-600 dark:text-gray-300">Thinking</div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area - Fixed at bottom */}
        <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-3 md:p-4 w-full absolute bottom-0 left-0 right-0">
          <div className="max-w-3xl mx-auto relative">
            <Textarea
              ref={textareaRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Message Agastya..."
              className="min-h-[56px] max-h-[200px] pr-12 bg-white dark:bg-gray-800 border-gray-300 dark:border-gray-700 resize-none rounded-lg focus:ring-1 focus:ring-hcp-primary focus:border-hcp-primary"
              disabled={isTyping}
            />
            
            <Button
              onClick={handleSend}
              disabled={!inputValue.trim() || isTyping}
              className="absolute right-2 bottom-2 h-10 w-10 p-0 rounded-md bg-hcp-primary hover:bg-hcp-primary/90 text-white flex items-center justify-center"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
          
          <p className="text-xs text-gray-500 mt-2 text-center">
            Enter to send • Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
