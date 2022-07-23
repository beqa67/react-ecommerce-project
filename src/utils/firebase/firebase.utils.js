import { initializeApp } from "firebase/app";
import { getAuth, signInWithRedirect, signInWithPopup, GoogleAuthProvider, createUserWithEmailAndPassword } from "firebase/auth"
import { getFirestore, doc, getDoc, setDoc  } from "firebase/firestore"

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBgbtHsfRAqESZOTrP2d_xojLCY831Xzz0",
  authDomain: "devmeetup-4a75a.firebaseapp.com",
  databaseURL: "https://devmeetup-4a75a.firebaseio.com",
  projectId: "devmeetup-4a75a",
  storageBucket: "devmeetup-4a75a.appspot.com",
  messagingSenderId: "197841593205",
  appId: "1:197841593205:web:5076e6af139aee0d51693c",
  measurementId: "G-9TGT7PBV7X"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider()

provider.setCustomParameters({
  prompt: "select_account"
})

export const auth = getAuth()
export const signInWithGooglePopup = () => signInWithPopup(auth, provider)

const db = getFirestore()

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}) => {
  if (!userAuth) return
  const userDockRef = doc(db, 'users', userAuth.uid)

  console.log("userDockRef",userDockRef)

  const userSnapshot = await getDoc(userDockRef)

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth
    const createdAt = new Date()

    try {
      await setDoc(userDockRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation
      })
    } catch (error) {
      console.log("error created user", error.message)
    }
  }

  return userDockRef
}

export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return
  console.log("email", email)
  console.log("password", password)
  return await createUserWithEmailAndPassword(auth, email, password)
}