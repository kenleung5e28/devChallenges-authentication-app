import { initializeApp } from "firebase/app"
import { getAuth } from "firebase/auth"

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
const auth = getAuth(app)

export { app, auth }