
import React, { useState } from 'react';
import LandingScreen from '@/components/LandingScreen';
import ChatInterface from '@/components/ChatInterface';

const Index = () => {
  const [showChat, setShowChat] = useState(false);
  const [initialMessage, setInitialMessage] = useState('');

  const handleStartChat = (message?: string) => {
    if (message) {
      setInitialMessage(message);
    }
    setShowChat(true);
  };

  return (
    <div className="min-h-screen">
      {showChat ? (
        <ChatInterface 
          onBack={() => setShowChat(false)} 
          initialMessage={initialMessage}
        />
      ) : (
        <LandingScreen onStartChat={handleStartChat} />
      )}
    </div>
  );
};

export default Index;
