import React from 'react'
import ReactDOM from 'react-dom/client'
import { initializeApp } from "firebase/app"
import App from './App'
import './index.css'

// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCP4qzM6VghePkD1mLPPzaPXZAP9KF9fws",
  authDomain: "devchallenges-cyleung.firebaseapp.com",
  projectId: "devchallenges-cyleung",
  storageBucket: "devchallenges-cyleung.appspot.com",
  messagingSenderId: "827561160301",
  appId: "1:827561160301:web:036b94047fbaeade4c5964"
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
)
