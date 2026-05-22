import { Web3Provider } from '../components/Web3Context';
import { Toaster } from 'react-hot-toast';
import '../styles/globals.css';

export default function App({ Component, pageProps }) {
  return (
    <Web3Provider>
      <Toaster
        position="bottom-right"
        toastOptions={{
          style: {
            background: '#faf6f0',
            color: '#1a1208',
            border: '1px solid rgba(26,18,8,0.15)',
            fontFamily: "'Crimson Pro', serif",
            fontSize: '15px',
            boxShadow: '0 4px 20px rgba(26,18,8,0.12)',
          },
          success: { iconTheme: { primary: '#2d6a4f', secondary: '#faf6f0' } },
          error:   { iconTheme: { primary: '#c0392b', secondary: '#faf6f0' } },
          loading: { iconTheme: { primary: '#d4870a', secondary: '#faf6f0' } },
        }}
      />
      <Component {...pageProps} />
    </Web3Provider>
  );
}
