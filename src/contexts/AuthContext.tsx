import React, { createContext, useContext, useState, useEffect, type ReactNode } from 'react';
import { useSignMessage } from 'wagmi';

interface User {
  id: string;
  username: string;
  walletAddress: string;
  provider: 'metamask' | 'walletconnect' | 'injected';
  signature?: string;
  signedAt?: number;
  isVerified: boolean;
}

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  isSigningMessage: boolean;
  connectWallet: (address: string, provider: 'metamask' | 'walletconnect' | 'injected') => Promise<void>;
  disconnectWallet: () => void;
  signAndVerify: () => Promise<boolean>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { signMessageAsync, isPending: isSigningMessage } = useSignMessage();

  const isAuthenticated = !!user && user.isVerified;

  useEffect(() => {
    // Check for existing auth data in localStorage
    const savedUser = localStorage.getItem('roma_user');
    if (savedUser) {
      try {
        const parsedUser = JSON.parse(savedUser);
        // Check if signature is still valid (24 hours)
        const isSignatureValid = parsedUser.signedAt &&
          Date.now() - parsedUser.signedAt < 24 * 60 * 60 * 1000;

        if (isSignatureValid && parsedUser.isVerified) {
          setUser(parsedUser);
        } else {
          // Signature expired, remove from storage
          localStorage.removeItem('roma_user');
        }
      } catch (error) {
        console.error('Failed to parse saved user data:', error);
        localStorage.removeItem('roma_user');
      }
    }
    setIsLoading(false);
  }, []);

  const connectWallet = async (address: string, provider: 'metamask' | 'walletconnect' | 'injected') => {
    // Create wallet user (not verified yet)
    const newUser: User = {
      id: `wallet_${address}`,
      username: `${address.slice(0, 6)}...${address.slice(-4)}`,
      walletAddress: address,
      provider,
      isVerified: false,
    };

    setUser(newUser);
  };

  const signAndVerify = async (): Promise<boolean> => {
    if (!user) {
      console.error('No user connected');
      return false;
    }

    try {
      // Create message to sign
      const message = `Welcome to ROMA NFT!\n\nSign this message to verify you own this wallet.\n\nWallet: ${user.walletAddress}\nTimestamp: ${Date.now()}`;

      // Request signature from wallet
      const signature = await signMessageAsync({ message });

      // Update user with signature
      const verifiedUser: User = {
        ...user,
        signature,
        signedAt: Date.now(),
        isVerified: true,
      };

      setUser(verifiedUser);
      localStorage.setItem('roma_user', JSON.stringify(verifiedUser));

      console.log('✅ Wallet verified with signature:', signature);
      return true;
    } catch (error) {
      console.error('Failed to sign message:', error);
      return false;
    }
  };

  const disconnectWallet = () => {
    setUser(null);
    localStorage.removeItem('roma_user');
  };

  const value: AuthContextType = {
    user,
    isAuthenticated,
    isLoading,
    isSigningMessage,
    connectWallet,
    disconnectWallet,
    signAndVerify,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};