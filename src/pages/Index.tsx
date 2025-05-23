
import React, { useState } from 'react';
import LandingScreen from '@/components/LandingScreen';
import ChatInterface from '@/components/ChatInterface';

const Index = () => {
  const [showChat, setShowChat] = useState(false);

  const handleStartChat = () => {
    setShowChat(true);
  };

  const handleBackToLanding = () => {
    setShowChat(false);
  };

  return (
    <div className="min-h-screen">
      {showChat ? (
        <ChatInterface onBack={handleBackToLanding} />
      ) : (
        <LandingScreen onStartChat={handleStartChat} />
      )}
    </div>
  );
};

export default Index;
