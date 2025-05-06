
import React, { useState } from 'react';
import { MessageSquare } from 'lucide-react';
import ChatInterface from './ChatInterface';
import { cn } from '@/lib/utils';

const ChatContainer: React.FC = () => {
  const [isMinimized, setIsMinimized] = useState(false);

  return (
    <div 
      className={cn(
        "w-full max-w-md transition-all duration-300 ease-in-out",
        isMinimized ? "h-16" : "h-[600px]"
      )}
    >
      <div className="w-full h-full flex flex-col rounded-xl overflow-hidden border border-white/10 shadow-lg backdrop-blur-md bg-black/80">
        {isMinimized ? (
          <button 
            onClick={() => setIsMinimized(false)} 
            className="w-full h-full flex items-center justify-between px-6 bg-gradient-to-r from-black to-[#0a1929]"
          >
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-gradient-start to-gradient-end w-8 h-8 rounded-full flex items-center justify-center shadow-soft">
                <MessageSquare size={16} className="text-white" />
              </div>
              <span className="font-medium text-white">Professional AI Assistant</span>
            </div>
            <span className="text-xs bg-white/10 text-white/80 px-3 py-1 rounded-full border border-white/10">
              Expand
            </span>
          </button>
        ) : (
          <div className="flex flex-col h-full">
            <div 
              onClick={() => setIsMinimized(true)}
              className="p-4 bg-gradient-to-r from-black to-[#0a1929] backdrop-blur cursor-pointer hover:bg-black/90 transition-colors flex justify-between items-center border-b border-white/5"
            >
              <div className="flex items-center gap-2">
                <div className="bg-gradient-to-r from-gradient-start to-gradient-end w-8 h-8 rounded-full flex items-center justify-center shadow-soft">
                  <MessageSquare size={16} className="text-white" />
                </div>
                <h1 className="font-medium text-white">Professional AI Assistant</h1>
              </div>
              <div className="text-xs px-3 py-1 rounded-full bg-white/10 border border-white/10 text-white/80 hover:bg-white/20 transition-colors">Minimize</div>
            </div>
            
            <div className="flex-1 overflow-hidden">
              <ChatInterface />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatContainer;
