import React from 'react';
import { useTranslation } from '../../hooks/useTranslation';

const MessageBubble = ({ msg }) => {
  const { t } = useTranslation();

  return (
    <div className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
      {msg.sender === 'bot' && (
        <div className="w-8 h-8 bg-white rounded-full flex-shrink-0 mr-2 flex items-center justify-center text-line-green font-bold text-xs mt-1">
          CG
        </div>
      )}
      <div className={`flex flex-col ${msg.sender === 'user' ? 'items-end' : 'items-start'} max-w-[75%]`}>
        <div 
          className={`px-4 py-2 rounded-2xl relative ${
            msg.sender === 'user' 
              ? 'bg-line-bubble text-black rounded-tr-sm' 
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
              <span className="font-bold text-red-600 text-sm">{t('protectYourself')}</span>
            </div>
            <div className="p-3">
              <p className="text-sm text-gray-700 leading-snug">{t('scamWarning')}</p>
              <button className="mt-3 w-full py-2 bg-gray-50 hover:bg-gray-100 text-gray-700 text-xs font-semibold rounded-lg border border-gray-200 transition-colors">
                {t('learnMoreScams')}
              </button>
            </div>
          </div>
        )}

        <span className="text-[10px] text-white/80 mt-1 px-1">{msg.time}</span>
      </div>
    </div>
  );
};

export default MessageBubble;
