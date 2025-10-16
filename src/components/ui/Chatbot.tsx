import { useState, useRef, useEffect } from 'react';
import { X, Sparkles } from 'lucide-react';
import './Chatbot.css';
import './ChatMessage.css';
import './ChatInput.css';
import ChatMessage from './ChatMessage';
import ChatInput from './ChatInput';
import QuickActions from './QuickActions';
import type { Message } from '../../types/chat';
// Switch between different AI providers
// import { sendMessageWithFunctions } from '../../services/api/openai';
// import { sendMessageWithFunctions } from '../../services/api/openrouter';
// import { sendMessageWithFunctions } from '../../services/api/deepseek';
import { sendMessageWithFunctions } from '../../services/api/gemini';
import { executeFunctionCall } from '../../services/ai/functionHandlers';
import { useNavigate } from 'react-router-dom';

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: '👋 **Welcome to ROMA NFT Marketplace!**\n\nI\'m ROMA AI, your intelligent NFT assistant with **ACTION CAPABILITIES**! I can:\n\n🎨 **Search & Filter NFTs** - "Show me Azuki NFTs under 10 ETH"\n💎 **Analyze Collections** - "Analyze Bored Ape Yacht Club"\n🛒 **Manage Cart & Favorites** - "Add this to my cart"\n📊 **Market Intelligence** - "Show market stats"\n🔔 **Price Alerts** - "Alert me when BAYC drops below 15 ETH"\n💰 **Investment Advice** - "What should I buy with 5 ETH?"\n🔗 **Navigate** - "Take me to marketplace"\n\n**Try these commands:**\n• "Search for rare Azuki NFTs"\n• "Analyze CryptoPunks"\n• "Show me market statistics"\n• "What\'s the best investment for 10 ETH?"\n\nI don\'t just talk - I take action! 🚀',
      role: 'assistant',
      timestamp: new Date()
    }
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [showQuickActions, setShowQuickActions] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async (content: string) => {
    console.log('🤖 Chatbot: Sending message:', content);

    const userMessage: Message = {
      id: Date.now().toString(),
      content,
      role: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    try {
      console.log('🤖 Chatbot: Calling Gemini with function calling...');

      // Call Gemini with function calling capability
      const response = await sendMessageWithFunctions(content);
      console.log('🤖 Chatbot: Received response:', response);

      // Check if AI wants to call a function
      if (response.functionCall) {
        console.log('🎯 Function call detected:', response.functionCall);

        // Execute the function
        const functionResult = executeFunctionCall(
          response.functionCall.name,
          response.functionCall.arguments
        );

        console.log('✅ Function result:', functionResult);

        // Handle navigation actions
        if (functionResult.action) {
          if (functionResult.action.type === 'NAVIGATE') {
            setTimeout(() => {
              navigate(`/${functionResult.action.payload.page}`);
            }, 1500);
          } else if (functionResult.action.type === 'NAVIGATE_WITH_FILTERS') {
            setTimeout(() => {
              navigate(`/${functionResult.action.payload.page}`, {
                state: { filters: functionResult.action.payload.filters }
              });
            }, 1500);
          }
        }

        // Show function result to user
        const botMessage: Message = {
          id: (Date.now() + 1).toString(),
          content: functionResult.message,
          role: 'assistant',
          timestamp: new Date(),
          functionCall: response.functionCall,
          functionResult: functionResult
        };

        setMessages(prev => [...prev, botMessage]);
        setIsLoading(false);
      } else {
        // Regular text response - add streaming effect
        const botMessageId = (Date.now() + 1).toString();
        const botMessage: Message = {
          id: botMessageId,
          content: '',
          role: 'assistant',
          timestamp: new Date()
        };
        setMessages(prev => [...prev, botMessage]);
        setIsLoading(false);

        // Streaming text effect
        const words = response.content.split(' ');
        let currentText = '';

        for (let i = 0; i < words.length; i++) {
          currentText += (i > 0 ? ' ' : '') + words[i];

          setMessages(prev => prev.map(msg =>
            msg.id === botMessageId
              ? { ...msg, content: currentText }
              : msg
          ));

          await new Promise(resolve => setTimeout(resolve, 20 + Math.random() * 60));
        }
      }

    } catch (error) {
      console.error('🤖 Chatbot: Unexpected error:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Sorry, I encountered an unexpected error. Please try again.',
        role: 'assistant',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
      setIsLoading(false);
    }
  };

  const handleQuickAction = (prompt: string) => {
    handleSendMessage(prompt);
  };

  // Sentient Logo Component
  const SentientLogo = ({ size = 28, className = '', color = 'currentColor' }: { size?: number; className?: string; color?: string }) => (
    <svg 
      width={size} 
      height={size * 0.9375} 
      viewBox="0 0 46 44" 
      fill="none" 
      className={className}
      style={{ color }}
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="M28.8775 8.62635L34.2677 8.597C34.8285 8.597 35.3487 8.80614 35.7398 9.19141C36.1309 9.57668 36.3522 10.094 36.3522 10.6518L36.3818 16.0455C36.3854 16.695 36.913 17.2123 37.5661 17.2123H37.5734L43.8565 17.1756C44.5096 17.172 45.0298 16.6473 45.0298 15.9978L44.9929 9.71611C44.9892 9.06666 44.4616 8.5493 43.8086 8.5493L38.4183 8.57865C37.2746 8.58232 36.3375 7.66134 36.3301 6.52755L36.3006 1.16681C36.2969 0.517361 35.7693 0 35.1163 0L28.8332 0.0330245C28.1802 0.0366937 27.66 0.561393 27.66 1.21085L27.6932 7.45954C27.6969 8.10899 28.2244 8.62635 28.8775 8.62635Z" fill="currentColor"/>
      <path d="M17.1081 35.104L11.7178 35.1333C10.5741 35.137 9.63699 34.216 9.62961 33.0822L9.6001 27.7215C9.59641 27.072 9.06882 26.5547 8.41579 26.5547L2.13271 26.5877C1.47968 26.5914 0.959473 27.1161 0.959473 27.7655L0.992676 34.0142C0.996366 34.6637 1.52395 35.181 2.17698 35.181L7.56723 35.1517C8.12802 35.1517 8.64823 35.3608 9.03931 35.7461C9.43039 36.1313 9.65175 36.6487 9.65175 37.2064L9.68127 42.6002C9.68496 43.2496 10.2125 43.767 10.8656 43.767H10.8729L17.156 43.7303C17.8091 43.7266 18.3293 43.2019 18.3293 42.5525L18.2924 36.2708C18.2887 35.6213 17.7611 35.104 17.1081 35.104Z" fill="currentColor"/>
      <path d="M43.8673 26.5913L37.5843 26.5583C36.9312 26.5583 36.4036 27.0756 36.3999 27.7251L36.3704 33.0858C36.3631 34.2196 35.4259 35.1406 34.2822 35.1369L28.892 35.1076C28.2389 35.1076 27.7114 35.6249 27.7077 36.2744L27.6708 42.5561C27.6708 43.2055 28.191 43.7302 28.844 43.7339L35.1271 43.7706H35.1345C35.7875 43.7706 36.3151 43.2532 36.3188 42.6038L36.3483 37.21C36.3483 36.6523 36.5697 36.1349 36.9607 35.7497C37.3518 35.3644 37.872 35.1553 38.4328 35.1553L43.8231 35.1846C44.4761 35.1846 45.0037 34.6673 45.0074 34.0178L45.0406 27.7691C45.0406 27.1197 44.5204 26.595 43.8673 26.5913Z" fill="currentColor"/>
      <path d="M2.14748 17.1756L8.43057 17.2123H8.43795C9.09097 17.2123 9.61856 16.695 9.62225 16.0455L9.65177 10.6518C9.65177 10.094 9.87313 9.57668 10.2642 9.19141C10.6553 8.80614 11.1755 8.597 11.7363 8.597L17.1265 8.62635C17.7796 8.62635 18.3072 8.10899 18.3108 7.45954L18.344 1.21085C18.344 0.561393 17.8238 0.0366937 17.1708 0.0330245L10.8877 0C10.2347 0 9.70711 0.517361 9.70342 1.16681L9.6739 6.52755C9.66652 7.66134 8.72941 8.58232 7.58569 8.57865L2.19544 8.5493C1.54242 8.5493 1.01483 9.06666 1.01114 9.71611L0.974247 15.9978C0.974247 16.6473 1.49446 17.172 2.14748 17.1756Z" fill="currentColor"/>
      <path d="M31.1205 28.9579L31.0836 23.0724C31.08 22.4634 30.5856 21.979 29.9731 21.979L24.926 22.0047C23.8561 22.0084 22.978 21.1461 22.9706 20.082L22.9448 15.0625C22.9411 14.4534 22.4467 13.9691 21.8343 13.9691L15.9496 13.9985C15.3372 14.0021 14.8502 14.4938 14.8502 15.1029L14.8797 20.9553C14.8834 21.5644 15.3778 22.0487 15.9902 22.0487L21.0373 22.023C21.5649 22.023 22.0519 22.2212 22.4172 22.5808C22.7824 22.9404 22.9891 23.4247 22.9891 23.9494L23.0149 29.0019C23.0186 29.611 23.513 30.0953 24.1254 30.0953H24.1328L30.0174 30.0587C30.6298 30.055 31.1169 29.5633 31.1169 28.9542L31.1205 28.9579Z" fill="currentColor"/>
    </svg>
  );

  return (
    <>
      {/* Chat Toggle Button */}
      <button
        className={`chat-toggle ${isOpen ? 'open' : ''}`}
        onClick={() => setIsOpen(!isOpen)}
      >
        {isOpen ? <X size={24} /> : <SentientLogo size={28} className="sentient-logo" color="#ff69b4" />}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <div className="header-content">
              <SentientLogo size={22} className="header-logo" color="#ff69b4" />
              <span>ROMA • AI Agent (Gemini)</span>
            </div>
            <div className="header-actions">
              <button
                className="quick-actions-toggle"
                title="Show Quick Actions"
                onClick={() => setShowQuickActions((v) => !v)}
              >
                <Sparkles size={18} />
              </button>
              <button
                className="close-button"
                onClick={() => setIsOpen(false)}
              >
                <X size={18} />
              </button>
            </div>
          </div>

          {showQuickActions && (
            <QuickActions onActionClick={(prompt) => {
              handleQuickAction(prompt);
              setShowQuickActions(false);
            }} />
          )}

          <div className="chat-messages">
            {/* Remove auto QuickActions here, only show via header button */}
            {messages.map((message) => (
              <ChatMessage key={message.id} message={message} />
            ))}
            {isLoading && (
              <div className="typing-indicator">
                <div className="typing-dots">
                  <span></span>
                  <span></span>
                  <span></span>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <ChatInput
            onSendMessage={handleSendMessage}
            disabled={isLoading}
          />
        </div>
      )}
    </>
  );
};

export default Chatbot;