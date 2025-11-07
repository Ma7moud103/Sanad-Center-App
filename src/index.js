import React from 'react';
import ReactDOM from 'react-dom/client';
  import 'react-toastify/dist/ReactToastify.css';
import './index.css';
import "./i18n"
import App from './App';
import {
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query'
const queryClient = new QueryClient()




const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
        <QueryClientProvider client={queryClient}>
      <App />
        </QueryClientProvider>

);

