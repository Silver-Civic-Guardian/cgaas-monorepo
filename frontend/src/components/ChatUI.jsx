import React, { useState } from 'react';

const ChatUI = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello! How can I help you today?', sender: 'bot', time: '10:00 AM' },
    { id: 2, text: 'I want to report a pothole on Main St.', sender: 'user', time: '10:01 AM' },
    { id: 3, text: 'Thank you. Could you please provide a photo or more specific location details?', sender: 'bot', time: '10:01 AM' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!inputValue.trim() || isLoading) return;
    
    const userText = inputValue;
    const newMessage = {
      id: Date.now(),
      text: userText,
      sender: 'user',
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
    
    setMessages(prev => [...prev, newMessage]);
    setInputValue('');
    setIsLoading(true);

    try {
      const response = await fetch('http://localhost:3000/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userText }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      
      const botMessage = {
        id: Date.now() + 1,
        text: data.responseText,
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        intent: data.intent,
        teachableMoment: data.teachableMoment
      };

      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      console.error('Error sending message:', error);
      const errorMessage = {
        id: Date.now() + 1,
        text: 'Sorry, I encountered an error processing your request.',
        sender: 'bot',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-[#7494C0] shadow-xl overflow-hidden relative">
      <header className="bg-[#00B900] text-white p-4 flex items-center justify-between z-10 shadow-sm">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-[#00B900] font-bold text-xl">
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
          <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            {msg.sender === 'bot' && (
              <div className="w-8 h-8 bg-white rounded-full flex-shrink-0 mr-2 flex items-center justify-center text-[#00B900] font-bold text-xs mt-1">
                CG
              </div>
            )}
            <div className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} max-w-[75%]`}>
              <div 
                className={`px-4 py-2 rounded-2xl relative ${
                  msg.sender === 'user' 
                    ? 'bg-[#85E249] text-black rounded-tr-sm' 
                    : 'bg-white text-black rounded-tl-sm'
                }`}
                style={{
                  boxShadow: '0 1px 2px rgba(0,0,0,0.1)'
                }}
              >
                <p className="text-[15px] leading-relaxed break-words">{msg.text}</p>
              </div>
              
              {msg.teachableMoment && (
                <div className="mt-2 bg-white rounded-xl overflow-hidden shadow-sm w-full max-w-[260px]">
                  <div className="bg-red-50 p-3 border-b border-red-100 flex items-center gap-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#ef4444" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
                      <line x1="12" y1="9" x2="12" y2="13"></line>
                      <line x1="12" y1="17" x2="12.01" y2="17"></line>
                    </svg>
                    <span className="font-bold text-red-600 text-sm">Protect Yourself!</span>
                  </div>
                  <div className="p-3">
                    <p className="text-sm text-gray-700 leading-snug">Never click links promising free money or unexpected prizes. Official organizations will not ask you to claim funds this way.</p>
                    <button className="mt-3 w-full py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-semibold rounded-lg border border-gray-200 transition-colors">
                      Learn more about scams
                    </button>
                  </div>
                </div>
              )}

              <span className="text-[10px] text-white/80 mt-1 px-1">{msg.time}</span>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="w-8 h-8 bg-white rounded-full flex-shrink-0 mr-2 flex items-center justify-center text-[#00B900] font-bold text-xs mt-1">
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

      <div className="bg-white p-2 flex items-end gap-2 border-t border-gray-200">
        <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="5" x2="12" y2="19"></line>
            <line x1="5" y1="12" x2="19" y2="12"></line>
          </svg>
        </button>
        <form onSubmit={handleSend} className="flex-1 flex items-end gap-2">
          <textarea 
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Aa"
            className="w-full bg-gray-100 rounded-2xl px-4 py-2 max-h-32 min-h-[40px] resize-none focus:outline-none focus:ring-1 focus:ring-[#00B900]"
            rows="1"
            onKeyDown={(e) => {
              if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                handleSend(e);
              }
            }}
          />
          <button 
            type="submit" 
            disabled={!inputValue.trim() || isLoading}
            className={`p-2 rounded-full transition-colors ${
              inputValue.trim() && !isLoading ? 'text-[#00B900] hover:bg-gray-100' : 'text-gray-300'
            }`}
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChatUI;