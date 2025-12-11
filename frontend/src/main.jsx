import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'

import App from './App.jsx'
import { Authprovider } from './context/Authcontext.jsx'
import { SocketProvider } from './context/Socketcontext.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Authprovider>
    <SocketProvider>
      <App />
    </SocketProvider>
    </Authprovider>
  </StrictMode>,
)
