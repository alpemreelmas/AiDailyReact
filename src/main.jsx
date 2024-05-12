import React from 'react'
import ReactDOM from 'react-dom/client'
import {RouterProvider} from "react-router-dom";
import {router} from "./routes.jsx";
import {AuthProvider} from "./hooks/useAuth.jsx";
import 'react-toastify/dist/ReactToastify.css';
import {ToastContainer} from "react-toastify";

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
      <AuthProvider>
          <ToastContainer/>
        <RouterProvider router={router} />
      </AuthProvider>
  </React.StrictMode>,
)
