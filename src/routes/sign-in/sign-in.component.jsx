import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";

const SignIn = () => {
  const signIn = async () => {
    const { user } = await signInWithGooglePopup()
    console.log("response", user)
    const userDockRef = await createUserDocumentFromAuth(user)
  }

  return (
    <div>
      <div>Sign in Page</div>
      <button onClick={signIn}>Sign In With Google</button>
    </div>
  )
}

export default SignIn