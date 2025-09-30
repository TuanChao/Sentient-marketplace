import { BrowserRouter as Router } from 'react-router-dom';
import { WagmiProvider } from 'wagmi';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RainbowKitProvider, darkTheme } from '@rainbow-me/rainbowkit';
import { config } from './config/rainbowkit';
import { AuthProvider } from './contexts/AuthContext';
import Layout from './layout/Layout';
import AppRoutes from './routes';
import Chatbot from './components/ui/Chatbot';
import './App.css';
import '@rainbow-me/rainbowkit/styles.css';

const queryClient = new QueryClient();

function App() {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider
          theme={darkTheme({
            accentColor: '#8a2be2',
            accentColorForeground: 'white',
            borderRadius: 'medium',
            fontStack: 'system',
          })}
        >
          <AuthProvider>
            <Router>
              <Layout>
                <AppRoutes />
                <Chatbot />
              </Layout>
            </Router>
          </AuthProvider>
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
