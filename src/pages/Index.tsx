
import React from 'react';
import ChatContainer from '@/components/ChatContainer';
import StarsBackground from '@/components/StarsBackground';

const Index = () => {
  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center p-4 overflow-hidden">
      <StarsBackground />
      
      {/* Header */}
      <div className="z-10 text-center mb-8 animate-fade-in">
        <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 shimmer-text animate-shimmer">
          Shimmer AI Chat Spark
        </h1>
        <p className="max-w-2xl text-muted-foreground">
          Experience the future of conversational AI with our modern, responsive interface. 
          Ask questions, get insights, and enjoy a seamless interaction experience.
        </p>
      </div>
      
      {/* Chat container with floating animation */}
      <div className="z-10 floating-element">
        <ChatContainer />
      </div>
      
      {/* Footer */}
      <div className="z-10 mt-8 text-sm text-muted-foreground animate-fade-in">
        <p>© 2025 Shimmer AI - Built with modern React, Tailwind, and shadcn/ui</p>
      </div>
      
      {/* Decorative elements */}
      <div className="fixed bottom-0 left-0 w-full h-40 bg-gradient-to-t from-shimmer-primary/10 to-transparent opacity-50 z-0"></div>
      <div className="absolute top-[30%] left-[20%] w-32 h-32 rounded-full bg-shimmer-primary/20 blur-3xl"></div>
      <div className="absolute bottom-[20%] right-[15%] w-40 h-40 rounded-full bg-shimmer-tertiary/10 blur-3xl"></div>
    </div>
  );
};

export default Index;
