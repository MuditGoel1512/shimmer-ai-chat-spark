
import React, { useState, useRef, useEffect } from 'react';
import { Send, Image, FileText, Code, Mic, MoreHorizontal, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Tooltip } from './ui/tooltip';
import { TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';
import { MessageSquare } from 'lucide-react';

type Message = {
  id: string;
  content: string;
  sender: 'user' | 'ai';
  timestamp: Date;
};

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);
  
  // Auto scroll to bottom on new messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === '') return;
    
    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      content: input,
      sender: 'user',
      timestamp: new Date(),
    };
    
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);
    
    // Simulate AI response after a delay
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: getAIResponse(input),
        sender: 'ai',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1500);
  };

  // Professional AI responses
  const getAIResponse = (userInput: string): string => {
    const responses = [
      "Based on my analysis, I recommend the following strategy for your business needs.",
      "I've reviewed the data and can provide you with a detailed assessment of market trends.",
      "According to industry standards, your approach aligns with best practices in this sector.",
      "The information you've provided suggests several opportunities for optimization.",
      "I've identified key areas where efficiency improvements could yield significant returns.",
      "My recommendation would be to focus on these specific metrics for better outcomes."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-4 bg-black/70 border-b border-white/5">
        <div className="flex items-center gap-2">
          <div className="bg-white/5 rounded-full p-1 text-white">
            <Plus size={16} />
          </div>
          <h2 className="font-semibold text-white">New Conversation</h2>
        </div>
        <Button variant="ghost" size="icon" className="rounded-full text-white/70 hover:text-white hover:bg-white/10">
          <MoreHorizontal size={18} />
        </Button>
      </div>

      {/* Empty state for no messages */}
      {messages.length === 0 && (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-6">
          <div className="bg-gradient-to-r from-gradient-start to-gradient-end p-3 rounded-full">
            <MessageSquare size={24} className="text-white" />
          </div>
          <h3 className="text-xl font-bold text-white">
            Professional AI Assistant
          </h3>
          <p className="text-sm text-white/70 max-w-xs">
            Get insights, recommendations, and answers to your business inquiries
          </p>
        </div>
      )}

      {/* Messages container */}
      <div 
        ref={chatContainerRef} 
        className="flex-1 overflow-y-auto p-4 space-y-4"
        style={{
          background: 'linear-gradient(180deg, #0a0a0a 0%, #000000 100%)',
          backgroundAttachment: 'fixed'
        }}
      >
        {messages.map((message) => (
          <div
            key={message.id}
            className={`max-w-[85%] ${
              message.sender === 'user' ? 'ml-auto' : 'mr-auto'
            } animate-fade-in`}
          >
            <div
              className={`p-3 rounded-lg ${
                message.sender === 'user'
                  ? 'bg-gradient-to-r from-gradient-start to-gradient-end text-white rounded-tr-none'
                  : 'bg-white/5 backdrop-blur-sm border border-white/5 rounded-tl-none'
              }`}
            >
              {message.content}
            </div>
            <div
              className={`text-xs text-white/50 mt-1 ${
                message.sender === 'user' ? 'text-right' : 'text-left'
              }`}
            >
              {message.timestamp.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
              })}
            </div>
          </div>
        ))}
        
        {/* AI typing indicator */}
        {isTyping && (
          <div className="mr-auto animate-fade-in">
            <div className="p-3 bg-white/5 backdrop-blur-sm border border-white/5 rounded-lg rounded-tl-none flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-gradient-start animate-pulse"></div>
              <div className="w-2 h-2 rounded-full bg-white/70 animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 rounded-full bg-gradient-end animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Tools section */}
      <div className="flex items-center justify-between py-2 px-4 border-t border-white/5 bg-black/70">
        <div className="flex gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors">
                  <Image size={18} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Add image</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors">
                  <FileText size={18} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Upload document</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors">
                  <Code size={18} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Code input</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full text-white/50 hover:text-white hover:bg-white/10 transition-colors">
                  <Mic size={18} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Voice input</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </div>

      {/* Input form */}
      <form onSubmit={handleSubmit} className="p-3 bg-black/80 border-t border-white/5 m-0">
        <div className="flex gap-2 bg-white/5 rounded-lg p-1">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-white/40 text-white"
          />
          <Button 
            type="submit" 
            size="icon"
            disabled={input.trim() === ''}
            className={`rounded-lg ${input.trim() === '' ? 'bg-white/10 text-white/40' : 'bg-gradient-to-r from-gradient-start to-gradient-end text-white'}`}
          >
            <Send size={18} />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;
