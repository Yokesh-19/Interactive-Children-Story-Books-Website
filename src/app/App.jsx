import { BrowserRouter } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import AppRoutes from '@/routes/AppRoutes';

export default function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
      <Toaster
        position="top-center"
        toastOptions={{
          style: {
            borderRadius: '1rem',
            background: '#2d2154',
            color: '#fff',
            fontFamily: 'Quicksand, sans-serif',
            fontWeight: 600,
          },
        }}
      />
    </BrowserRouter>
  );
}