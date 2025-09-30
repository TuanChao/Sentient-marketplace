import React, { useState } from 'react';
import { Send } from 'lucide-react';
import './ChatInput.css';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled: boolean;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form className="chat-input-form" onSubmit={handleSubmit}>
      <div className="input-container">
        <textarea
          className="chat-textarea"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Share your thoughts with NOVA..."
          disabled={disabled}
          rows={1}
        />
        <button
          type="submit"
          className={`send-button ${disabled ? 'disabled' : ''}`}
          disabled={disabled || !message.trim()}
        >
          <Send size={20} />
        </button>
      </div>
    </form>
  );
};

export default ChatInput;