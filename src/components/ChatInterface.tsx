
import React, { useState, useRef, useEffect } from 'react';
import { Send, FileText, Calendar, Users, Brain } from 'lucide-react';
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
  messages: Message[];
  onSendMessage: (message: string) => void;
}

const ChatInterface: React.FC<ChatInterfaceProps> = ({ messages, onSendMessage }) => {
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Show typing indicator when waiting for a response
  useEffect(() => {
    const hasUserMessage = messages.some(msg => msg.role === 'user');
    const hasMatchingAssistantMessage = messages.filter(msg => msg.role === 'assistant').length === 
                                       messages.filter(msg => msg.role === 'user').length;
    
    setIsTyping(hasUserMessage && !hasMatchingAssistantMessage);
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!inputValue.trim()) return;
    onSendMessage(inputValue);
    setInputValue('');
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
    <div className="min-h-screen flex flex-col bg-white dark:bg-hcp-dark">
      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col h-screen">
        {/* Messages */}
        <div className="flex-1 overflow-y-auto py-6 px-4 md:px-6 space-y-6">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <Brain className="w-12 h-12 text-hcp-primary mx-auto mb-4" />
                <h2 className="text-xl font-medium text-gray-700 dark:text-gray-300">Welcome to Agastya</h2>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Type a message to start chatting</p>
              </div>
            </div>
          ) : (
            messages.map((message) => (
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
            ))
          )}
          
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
        <div className="border-t border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 p-3 md:p-4 w-full">
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
