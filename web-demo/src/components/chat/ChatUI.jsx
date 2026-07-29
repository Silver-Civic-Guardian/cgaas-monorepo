import React from 'react';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';

const ChatUI = ({ messages = [], isTyping = false, inputValue = '' }) => {
  return (
    <div data-testid="chat-ui" className="flex flex-col h-screen max-w-md mx-auto bg-line-bg shadow-xl overflow-hidden relative">
      <header className="bg-line-green text-white p-4 flex items-center justify-between z-10 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-line-green font-bold text-xl">
            CG
          </div>
          <div>
            <h1 className="font-bold text-lg leading-tight">Civic Guardian</h1>
            <p className="text-xs opacity-90">Official Account</p>
          </div>
        </div>
        <button className="p-2 hover:bg-white/10 rounded-full transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="3" y1="12" x2="21" y2="12"></line>
            <line x1="3" y1="6" x2="21" y2="6"></line>
            <line x1="3" y1="18" x2="21" y2="18"></line>
          </svg>
        </button>
      </header>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="text-center my-4">
          <span className="bg-black/20 text-white text-xs px-3 py-1 rounded-full">Today</span>
        </div>
        
        {messages.map((msg) => (
          <MessageBubble key={msg.id} msg={msg} />
        ))}
        
        {isTyping && (
          <div className="flex justify-start">
            <div className="w-8 h-8 bg-white rounded-full flex-shrink-0 mr-2 flex items-center justify-center text-line-green font-bold text-xs mt-1">
              CG
            </div>
            <div className="flex flex-col items-start max-w-[75%]">
              <div 
                className="px-4 py-3 rounded-2xl relative bg-white text-black rounded-tl-sm flex items-center gap-1"
                style={{ boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}
              >
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
              </div>
            </div>
          </div>
        )}
      </div>

      <MessageInput 
        inputValue={inputValue}
        isLoading={isTyping}
      />
    </div>
  );
};

export default ChatUI;
