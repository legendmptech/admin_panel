import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { collection, getFirestore, getDocs } from "firebase/firestore";

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FBASE_API_KEY,
  authDomain: process.env.REACT_APP_FBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FBASE_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_FBASE_APP_ID,
  measurementId: process.env.REACT_APP_FBASE_MEASUREMENT_ID,
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const fstore = getFirestore();
export const fanalytics = getAnalytics(app);
export const portfoliosRef = collection(fstore, "portfolios");
getDocs(portfoliosRef)
  .then((snapshot) => {
    let folios = [];
    snapshot.docs.forEach((doc) => {
      folios.push({ ...doc.data(), id: doc.id });
    });
  })
  .catch((err) => console.log(err));
