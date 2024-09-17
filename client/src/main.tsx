import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import { AuthProvider } from './context/authContext';


ReactDOM.createRoot(document.getElementById('root')!).render(
  <AuthProvider>
    <App />
  </AuthProvider>,
)
