export type Message = {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: Date;
  functionCall?: {
    name: string;
    arguments: string;
  };
  functionResult?: {
    success: boolean;
    message: string;
    data?: any;
  };
}

export type ChatState = {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
}