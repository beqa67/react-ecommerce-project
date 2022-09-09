import { useState } from "react";

import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";



import style  from './sign-in-form.style.module.scss'

const defaultFormFields = {
  email: '',
  password: ''
}

const SignInForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { email, password } = formFields

  const resetFields = () => {
    setFormFields(defaultFormFields)
  }

  const signInWithGoogle = async () => {
    await signInWithGooglePopup()

  }

  const handleSubmit = async (event) => {
    event.preventDefault()


    try {
      const { user } = await signInAuthUserWithEmailAndPassword(email, password)
      // setCurrentUser(user)
      resetFields()
    } catch (error) {
      console.log("error", error)
    }
  }

  const handleChange = (event) => {
    const { name, value } = event.target

    setFormFields({...formFields, [name]: value})
  }

  return (
    <div className={style['sign-up-container']}>
      <h2>Already have an Account ? </h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>
       <div> {email}</div>
        <FormInput label="email" type="email" onChange={handleChange} required name="email" value={email} />

        <FormInput label="Passowrd" type="password" onChange={handleChange} required name="password" value={password}/>
        <div className="sign-in-buttons">
          <Button type="submit">Sign In</Button>
          <Button type="button" buttonType="google" onClick={signInWithGoogle}>Google Sign in</Button>
        </div>
      </form>
    </div>
  )
}

export default SignInForm