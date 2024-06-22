import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";

// Firebase Config
// export const firebaseConfig = {
//   apiKey: "",
//   authDomain: "",
//   projectId: "",
//   storageBucket: "",
//   messagingSenderId: "",
//   appId: "",
//   measurementId: "",
// };

const firebaseConfig = {
  apiKey: "AIzaSyC3IU86tZSOB0NnwHZMHjWfGRAj57mEEyM",
  authDomain: "granny-007.firebaseapp.com",
  projectId: "granny-007",
  storageBucket: "granny-007.appspot.com",
  messagingSenderId: "234326460966",
  appId: "1:234326460966:web:9ac1c50465d4916df134e7",
  measurementId: "G-HG74TZB38G"
};


const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
const storage = getStorage(app);

export { db, storage };

export const initializeFirebase = () => {
  return app;
};
