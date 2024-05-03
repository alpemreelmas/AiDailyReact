import React from 'react'
import ReactDOM from 'react-dom/client'
import {
    BrowserRouter,
} from "react-router-dom";
import {Routes} from "./routes.jsx";
import {AuthProvider} from "./hooks/useAuth.jsx";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <BrowserRouter>
          <AuthProvider>
              <Routes />
          </AuthProvider>
      </BrowserRouter>
  </React.StrictMode>,
)
