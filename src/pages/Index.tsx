
import React, { useState } from 'react';
import LandingScreen from '@/components/LandingScreen';
import ChatInterface from '@/components/ChatInterface';

const Index = () => {
  const [showLanding, setShowLanding] = useState(true);
  const [messages, setMessages] = useState<Array<any>>([]);
  
  const handleSendMessage = (message: string) => {
    // Add user message
    const userMessage = {
      id: Date.now().toString(),
      content: message,
      role: 'user',
      timestamp: new Date(),
    };
    
    // Transition from landing to chat
    setShowLanding(false);
    
    // Update messages
    setMessages(prev => [...prev, userMessage]);
    
    // Simulate AI response
    setTimeout(() => {
      const assistantMessage = {
        id: (Date.now() + 1).toString(),
        content: generateResponse(message),
        role: 'assistant',
        timestamp: new Date(),
        type: getMessageType(message),
      };
      setMessages(prev => [...prev, assistantMessage]);
    }, 1000);
  };
  
  // Helper functions for generating responses
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
  
  const getMessageType = (query: string): 'research' | 'panel' | 'conference' => {
    const queryLower = query.toLowerCase();
    if (queryLower.includes('research') || queryLower.includes('study') || queryLower.includes('article')) {
      return 'research';
    } else if (queryLower.includes('panel') || queryLower.includes('honorarium')) {
      return 'panel';
    } else {
      return 'conference';
    }
  };

  return (
    <div className="min-h-screen">
      {showLanding ? (
        <div className="transition-all duration-300">
          <LandingScreen onSendMessage={handleSendMessage} />
        </div>
      ) : (
        <div className="transition-all duration-300 animate-fade-in">
          <ChatInterface messages={messages} onSendMessage={handleSendMessage} />
        </div>
      )}
    </div>
  );
};

export default Index;
