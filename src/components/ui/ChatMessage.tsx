import React from 'react';
import { type Message } from '../../types/chat';
import './ChatMessage.css';

interface ChatMessageProps {
  message: Message;
}

const ChatMessage: React.FC<ChatMessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  // Format message content with proper line breaks and markdown-like formatting
  const formatMessage = (content: string) => {
    return content
      // Convert **text** to bold
      .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
      // Convert bullet points • to proper list items
      .replace(/^• (.*$)/gm, '<div class="bullet-point">• $1</div>')
      // Convert markdown-style bullet points
      .replace(/^- (.*$)/gm, '<div class="bullet-point">• $1</div>')
      // Add proper line breaks
      .replace(/\n/g, '<br />')
      // Format sections with emoji headers
      .replace(/^(🔥|📈|💰|🎯|⚠️|🟢|🟡|🔴|📊|💡|🎨|✨|🏪|💼|🛒|📋|🔍|⚙️)(.*?):/gm, '<div class="section-header">$1$2:</div>')
      // Format numbered lists
      .replace(/^(\d+\.)\s*(.*$)/gm, '<div class="numbered-item">$1 $2</div>');
  };

  return (
    <div className={`message ${isUser ? 'user-message' : 'bot-message'}`}>
      <div className="message-content">
        <div 
          className="message-text"
          dangerouslySetInnerHTML={{ __html: formatMessage(message.content) }}
        />
        <div className="message-time">
          {message.timestamp.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};

export default ChatMessage;