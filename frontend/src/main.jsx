import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')).render(
  // BrowserRouter enables a SPA - Single Page Application.
  // Which doesnt need routing. Paging is done within one route. 
  <BrowserRouter>
    <App />
  </BrowserRouter>,
)
