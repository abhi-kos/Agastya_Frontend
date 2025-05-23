
import React, { useState, useRef, useEffect } from 'react';
import { Send, User, Bot, ArrowLeft, Sparkles, FileText, Calendar, Users } from 'lucide-react';
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
      content: "Hello! I'm your HCP Assistant. I can help you with research queries, panel support, and conference information. What would you like to know today?",
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
      return "I found several relevant research articles for your query. Based on the latest publications in PubMed, here are the most relevant findings: [Research results would be displayed here with citations and abstracts from your vector database]";
    } else if (queryLower.includes('panel') || queryLower.includes('honorarium') || queryLower.includes('profile')) {
      return "I can help you with panel-related queries. Let me check your current status and available options. [Panel support information would be retrieved from your SQL database]";
    } else if (queryLower.includes('conference') || queryLower.includes('meeting') || queryLower.includes('event')) {
      return "Here are the upcoming conferences relevant to your specialty: [Conference information would be displayed with dates, locations, and registration details]";
    } else {
      return "I understand you're looking for information. Could you please specify if you need help with research articles, panel support, or conference information? This will help me provide you with the most accurate assistance.";
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
        return <Sparkles className="w-4 h-4 text-hcp-primary" />;
    }
  };

  return (
    <div className="min-h-screen bg-hcp-dark flex flex-col">
      {/* Header */}
      <div className="bg-black/40 backdrop-blur-sm border-b border-gray-800 p-4">
        <div className="max-w-4xl mx-auto flex items-center gap-4">
          <Button
            variant="ghost"
            size="sm"
            onClick={onBack}
            className="text-gray-400 hover:text-white hover:bg-gray-800"
          >
            <ArrowLeft className="w-5 h-5" />
          </Button>
          
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-br from-hcp-primary to-hcp-teal rounded-xl flex items-center justify-center">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-white">HCP Assistant</h1>
              <p className="text-sm text-gray-400">Research • Panel Support • Conferences</p>
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="max-w-4xl mx-auto space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex gap-4 animate-fade-in-up ${
                message.role === 'user' ? 'justify-end' : 'justify-start'
              }`}
            >
              {message.role === 'assistant' && (
                <div className="w-8 h-8 bg-gradient-to-br from-hcp-teal to-hcp-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Bot className="w-4 h-4 text-white" />
                </div>
              )}
              
              <div
                className={`max-w-[80%] p-4 rounded-2xl shadow-lg ${
                  message.role === 'user'
                    ? 'chat-message-user text-white ml-12'
                    : 'chat-message-assistant text-gray-100'
                }`}
              >
                {message.role === 'assistant' && message.type && (
                  <div className="flex items-center gap-2 mb-2 pb-2 border-b border-gray-700">
                    {getMessageIcon(message.type)}
                    <span className="text-xs text-gray-400 uppercase tracking-wide">
                      {message.type} Query
                    </span>
                  </div>
                )}
                
                <p className="text-sm leading-relaxed whitespace-pre-wrap">
                  {message.content}
                </p>
                
                <div className="text-xs text-gray-400 mt-2">
                  {message.timestamp.toLocaleTimeString()}
                </div>
              </div>
              
              {message.role === 'user' && (
                <div className="w-8 h-8 bg-gradient-to-br from-hcp-purple to-hcp-pink rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <User className="w-4 h-4 text-white" />
                </div>
              )}
            </div>
          ))}
          
          {isTyping && (
            <div className="flex gap-4 animate-fade-in-up">
              <div className="w-8 h-8 bg-gradient-to-br from-hcp-teal to-hcp-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                <Bot className="w-4 h-4 text-white" />
              </div>
              <div className="chat-message-assistant text-gray-100 p-4 rounded-2xl shadow-lg">
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
      <div className="bg-black/40 backdrop-blur-sm border-t border-gray-800 p-4">
        <div className="max-w-4xl mx-auto">
          <div className="relative flex items-end gap-3">
            <div className="flex-1 relative">
              <Textarea
                ref={textareaRef}
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask about research, panel support, or conferences..."
                className="min-h-[60px] max-h-[120px] bg-gray-900/50 border-gray-700 text-gray-100 placeholder-gray-400 resize-none pr-12 rounded-2xl focus:ring-2 focus:ring-hcp-primary focus:border-transparent"
                disabled={isTyping}
              />
            </div>
            
            <Button
              onClick={handleSend}
              disabled={!inputValue.trim() || isTyping}
              className="bg-gradient-to-r from-hcp-primary to-hcp-teal hover:from-hcp-primary/90 hover:to-hcp-teal/90 rounded-2xl h-[60px] px-6 shadow-lg hover:shadow-hcp-primary/25 transition-all duration-300 hover:scale-105"
            >
              <Send className="w-5 h-5" />
            </Button>
          </div>
          
          <p className="text-xs text-gray-500 mt-2 text-center">
            Press Enter to send, Shift+Enter for new line
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatInterface;
