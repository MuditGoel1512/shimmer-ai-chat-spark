
import React from 'react';
import ChatContainer from '@/components/ChatContainer';
import StarsBackground from '@/components/StarsBackground';

const Index = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden bg-black">
      <StarsBackground />
      
      {/* Header */}
      <div className="z-10 text-center mb-8 animate-fade-in">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 text-white">
          <span className="bg-gradient-to-r from-gradient-start to-gradient-end inline-block text-transparent bg-clip-text">
            Professional AI Assistant
          </span>
        </h1>
        <p className="max-w-2xl text-white/70">
          Empowering businesses with data-driven insights and intelligent solutions.
          Experience enterprise-grade AI assistance with our secure and responsive platform.
        </p>
      </div>
      
      {/* Chat container with subtle floating animation */}
      <div className="z-10 animate-float">
        <ChatContainer />
      </div>
      
      {/* Footer */}
      <div className="z-10 mt-8 text-sm text-white/50 animate-fade-in">
        <p>© 2025 Professional AI - Enterprise Solutions</p>
      </div>
      
      {/* Subtle gradient elements */}
      <div className="fixed bottom-0 left-0 w-full h-40 bg-gradient-to-t from-gradient-start/10 to-transparent opacity-50 z-0"></div>
      <div className="absolute top-[30%] left-[20%] w-32 h-32 rounded-full bg-gradient-start/10 blur-3xl"></div>
      <div className="absolute bottom-[20%] right-[15%] w-40 h-40 rounded-full bg-gradient-end/10 blur-3xl"></div>
    </div>
  );
};

export default Index;
