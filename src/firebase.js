import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyBwRxYDussE-MDgbMz8EPbMeMXyHqYhM-I",
  authDomain: "test-react-867b8.firebaseapp.com",
  projectId: "test-react-867b8",
  storageBucket: "test-react-867b8.firebasestorage.app",
  messagingSenderId: "534584279547",
  appId: "1:534584279547:web:97d5004ddb2d9263f28b5e",
  measurementId: "G-HS7C16JD2R"
};

const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app); 
const storage = getStorage(app); // ІНІЦІАЛІЗАЦІЯ
export { app, analytics, auth, db, storage }; // ДОДАЙТЕ `storage` до експорту
