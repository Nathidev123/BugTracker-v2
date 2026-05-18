import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { TicketContextProvider } from './components/context/ticketContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <TicketContextProvider>
      <App />
    </TicketContextProvider>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

