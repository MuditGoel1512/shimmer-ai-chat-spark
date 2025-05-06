
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
      <div className="w-full h-full flex flex-col rounded-lg overflow-hidden glass-panel border border-white/10 shadow-lg">
        {isMinimized ? (
          <button 
            onClick={() => setIsMinimized(false)} 
            className="w-full h-full flex items-center justify-between px-6 bg-black/90"
          >
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-r from-gradient-start to-gradient-end w-8 h-8 rounded-full flex items-center justify-center">
                <MessageSquare size={16} className="text-white" />
              </div>
              <span className="font-medium text-white">Professional AI Assistant</span>
            </div>
            <span className="text-xs bg-white/10 text-white/80 px-2 py-1 rounded-full">
              Expand
            </span>
          </button>
        ) : (
          <div className="flex flex-col h-full">
            <div 
              onClick={() => setIsMinimized(true)}
              className="p-3 bg-black/90 backdrop-blur cursor-pointer hover:bg-black/80 transition-colors flex justify-between items-center border-b border-white/5"
            >
              <div className="flex items-center gap-2">
                <div className="bg-gradient-to-r from-gradient-start to-gradient-end w-7 h-7 rounded-full flex items-center justify-center">
                  <MessageSquare size={14} className="text-white" />
                </div>
                <h1 className="font-medium text-white">Professional AI Assistant</h1>
              </div>
              <div className="text-xs text-muted-foreground">Minimize</div>
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
