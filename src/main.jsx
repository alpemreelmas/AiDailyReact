import React from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider} from "react-router-dom";
import {router} from "./routes.jsx";
import {AuthProvider} from "./hooks/useAuth.jsx";


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
  </React.StrictMode>,
)
