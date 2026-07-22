import React from 'react';

const MessageInput = ({ inputValue, setInputValue, isLoading, handleSend }) => {
  return (
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
          className="w-full bg-gray-100 rounded-2xl px-4 py-2 max-h-32 min-h-[40px] resize-none focus:outline-none focus:ring-1 focus:ring-line-green"
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
            inputValue.trim() && !isLoading ? 'text-line-green hover:bg-gray-100' : 'text-gray-300'
          }`}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="22" y1="2" x2="11" y2="13"></line>
            <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
          </svg>
        </button>
      </form>
    </div>
  );
};

export default MessageInput;
