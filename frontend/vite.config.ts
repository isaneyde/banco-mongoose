import path from "path"
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
<<<<<<< HEAD
import tailwindcss from '@tailwindcss/vite'

=======
import tailwindcss from "@tailwindcss/vite"


// https://vite.dev/config/
>>>>>>> aec8dfbe89a3b09dcf9fa9a0854828eafab8bb6d
export default defineConfig({
  plugins: [react(), tailwindcss()],
    server: {
    port: 5004 //
  },
<<<<<<< HEAD
  resolve: {
=======
   resolve: {

>>>>>>> aec8dfbe89a3b09dcf9fa9a0854828eafab8bb6d
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
 
})
