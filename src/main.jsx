import React from 'react'
import ReactDOM from 'react-dom/client'
import { Provider } from 'react-redux'
import { Analytics } from "@vercel/analytics/react"
import App from './App.jsx'
import { store } from './redux/store'   // ✅ import store
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
      <Analytics />
    </Provider>
  </React.StrictMode>,
)