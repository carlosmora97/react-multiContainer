import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'


export default defineConfig({
    plugins: [react()],
    server: {
       watch: {
            usePolling: true,
        },
        hmr: {
            protocol: 'ws', // Use WebSocket
            host: 'localhost', // Specify the host that matches your Docker configuration
            clientPort: 3050, // WebSocket port for HMR (separate from the HTTP server port)
        },
        host: true, // Enable hosting on all interfaces; necessary for accessing the app from outside the Docker container
        strictPort: true,
        port: 3000, // HTTP server port, accessible from outside
    },

});