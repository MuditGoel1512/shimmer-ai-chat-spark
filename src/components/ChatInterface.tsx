
import React, { useState, useRef, useEffect } from 'react';
import { Send, Image, Code, FileText, Mic, MoreHorizontal, Plus } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Tooltip } from './ui/tooltip';
import { TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

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

  // Mock AI responses
  const getAIResponse = (userInput: string): string => {
    const responses = [
      "I'm analyzing the blockchain data for your request...",
      "That's an interesting question about cryptocurrencies.",
      "Based on the current market trends, I'd suggest looking into this further.",
      "There are several factors to consider when evaluating this blockchain solution.",
      "I can help you understand how this technology works in simple terms.",
      "Let me gather some relevant information about this crypto project for you."
    ];
    
    return responses[Math.floor(Math.random() * responses.length)];
  };

  return (
    <div className="h-full flex flex-col">
      {/* Header */}
      <div className="flex justify-between items-center p-4 glass-panel">
        <div className="flex items-center gap-2">
          <div className="bg-shimmer-primary rounded-full p-1 text-white">
            <Plus size={16} />
          </div>
          <h2 className="font-bold">Ask AI</h2>
        </div>
        <Button variant="ghost" size="icon" className="rounded-full">
          <MoreHorizontal size={18} />
        </Button>
      </div>

      {/* Empty state for no messages */}
      {messages.length === 0 && (
        <div className="flex-1 flex flex-col items-center justify-center text-center p-8 space-y-6">
          <div className="text-yellow-300 text-4xl animate-pulse">👋</div>
          <h3 className="text-xl font-bold shimmer-text animate-shimmer">
            Ask 'Y' with your prompt.
          </h3>
          <p className="text-sm text-muted-foreground">
            AI-Powered Conversational User Interface for Cryptocurrency
          </p>
        </div>
      )}

      {/* Messages container */}
      <div 
        ref={chatContainerRef} 
        className="flex-1 overflow-y-auto p-4 space-y-4"
        style={{
          background: 'radial-gradient(circle at center, #1f1d38 0%, #0f0926 100%)',
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
              className={`p-3 rounded-2xl ${
                message.sender === 'user'
                  ? 'bg-shimmer-primary text-white rounded-tr-none'
                  : 'glass-panel rounded-tl-none'
              }`}
            >
              {message.content}
            </div>
            <div
              className={`text-xs text-muted-foreground mt-1 ${
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
            <div className="p-3 glass-panel rounded-2xl rounded-tl-none flex gap-1.5">
              <div className="w-2 h-2 rounded-full bg-shimmer-primary animate-pulse"></div>
              <div className="w-2 h-2 rounded-full bg-shimmer-secondary animate-pulse" style={{ animationDelay: '0.2s' }}></div>
              <div className="w-2 h-2 rounded-full bg-shimmer-tertiary animate-pulse" style={{ animationDelay: '0.4s' }}></div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>

      {/* Tools section */}
      <div className="flex items-center justify-between py-2 px-4 border-t border-white/5">
        <div className="flex gap-1">
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-white hover:bg-shimmer-dark-blue transition-colors">
                  <Image size={18} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Create image</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-white hover:bg-shimmer-dark-blue transition-colors">
                  <FileText size={18} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Summarize text</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-white hover:bg-shimmer-dark-blue transition-colors">
                  <Code size={18} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Code</TooltipContent>
            </Tooltip>
          </TooltipProvider>
          
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="rounded-full text-muted-foreground hover:text-white hover:bg-shimmer-dark-blue transition-colors">
                  <Mic size={18} />
                </Button>
              </TooltipTrigger>
              <TooltipContent>Voice input</TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        
        <Button variant="ghost" size="sm" className="text-sm text-muted-foreground hover:text-white">
          More
        </Button>
      </div>

      {/* Input form */}
      <form onSubmit={handleSubmit} className="p-3 glass-panel m-3">
        <div className="flex gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Message Shimmer AI..."
            className="flex-1 bg-transparent border-none focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/60"
          />
          <Button 
            type="submit" 
            size="icon"
            disabled={input.trim() === ''}
            className={`rounded-full ${input.trim() === '' ? 'bg-shimmer-dark-blue text-muted-foreground' : 'shimmer-bg text-white'}`}
          >
            <Send size={18} />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default ChatInterface;
