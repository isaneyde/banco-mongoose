import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
<<<<<<< HEAD
=======


>>>>>>> aec8dfbe89a3b09dcf9fa9a0854828eafab8bb6d
import { Routes } from "./routes.tsx";
import{AuthProvider} from "./contexts/authContext.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    
      <AuthProvider>
   <Routes />
      </AuthProvider>
  
  </StrictMode>
);

<<<<<<< HEAD
=======

>>>>>>> aec8dfbe89a3b09dcf9fa9a0854828eafab8bb6d
