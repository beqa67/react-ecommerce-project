import { signInWithGooglePopup, createUserDocumentFromAuth } from "../../utils/firebase/firebase.utils";
import SignUpForm from "../../components/sign-up-form/sign-up-form.component";

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
      <SignUpForm />
    </div>
  )
}

export default SignIn