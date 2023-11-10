import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import { Analytics } from "@vercel/analytics/react";
import "/fonts/ModernWarfare-8MM6z.ttf?url";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
     <Analytics />
  </React.StrictMode>,
)
