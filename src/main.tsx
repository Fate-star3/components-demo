import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter as Router } from 'react-router-dom'

import App from './App'

import '@/styles/reset.scss'
import Loading from '@/components/Loading'
import Toast from '@/components/Toast'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <Router>
    <App />
    {Loading.init()}
    {Toast.init()}
    {/* {React.createElement(Loading.init)}
    {React.createElement(Toast.init)} */}
    {/* {React.createElement('div', { class: 'fixed', id: 'name' }, [
      React.createElement('span'),
      React.createElement('span'),
      React.createElement('span')
    ])} */}
  </Router>
)
