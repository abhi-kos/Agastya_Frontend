
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
      content: "Hello, I'm your HCP Research & Panel Assistant. I can help you find medical research publications, manage panel support tasks, and provide conference information. What would you like assistance with today?",
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
    <div className="min-h-screen bg-gray-50 dark:bg-hcp-dark flex flex-col">
      {/* Header */}
      <div className="bg-white dark:bg-black/20 border-b border-gray-200 dark:border-gray-800">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
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
              <h1 className="text-lg font-medium text-gray-800 dark:text-gray-100">HCP Assistant</h1>
            </div>
          </div>
          
          <div className="text-sm text-gray-500">Healthcare Professional Research & Panel Support</div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto py-6 px-4">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              <div
                className={`max-w-[85%] p-4 rounded-lg ${
                  message.role === 'user'
                    ? 'bg-hcp-primary/10 text-gray-800 dark:text-white'
                    : 'bg-white dark:bg-gray-800 shadow-sm border border-gray-100 dark:border-gray-700 text-gray-800 dark:text-gray-100'
                }`}
              >
                {message.role === 'assistant' && message.type && (
                  <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-100 dark:border-gray-700">
                    {getMessageIcon(message.type)}
                    <span className="text-xs uppercase tracking-wider font-medium text-gray-500 dark:text-gray-400">
                      {message.type} Information
                    </span>
                  </div>
                )}
                
                <div className="text-sm leading-relaxed whitespace-pre-wrap">
                  {message.content}
                </div>
                
                <div className="text-xs text-gray-400 mt-2 text-right">
                  {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </div>
              </div>
            </div>
          ))}
          
          {isTyping && (
            <div className="flex justify-start">
              <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-100 dark:border-gray-700 max-w-[85%]">
                <div className="flex items-center gap-2">
                  <div className="typing-indicator">Thinking</div>
                </div>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>
      </div>

      {/* Input Area */}
      <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-4">
        <div className="max-w-3xl mx-auto">
          <div className="flex items-end gap-3">
            <Textarea
              ref={textareaRef}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about research articles, panel support, or conferences..."
              className="min-h-[56px] max-h-[120px] bg-gray-50 dark:bg-gray-800 border-gray-300 dark:border-gray-700 resize-none rounded-lg focus:ring-1 focus:ring-hcp-primary focus:border-hcp-primary"
              disabled={isTyping}
            />
            
            <Button
              onClick={handleSend}
              disabled={!inputValue.trim() || isTyping}
              className="h-[56px] px-4 bg-hcp-primary hover:bg-hcp-primary/90 text-white"
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
