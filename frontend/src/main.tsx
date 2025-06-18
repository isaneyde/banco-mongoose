import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'


import { Routes } from "./routes.tsx";
import{AuthProvider} from "./contexts/authContext.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    
      <AuthProvider>
   <Routes />
      </AuthProvider>
  
  </StrictMode>
);

