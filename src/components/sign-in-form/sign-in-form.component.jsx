import { useState } from "react";

import {
  createUserDocumentFromAuth,
  signInWithGooglePopup,
  signInAuthUserWithEmailAndPassword
} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

import './sign-in-form.style.scss'

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
    const { user } = await signInWithGooglePopup()
    await createUserDocumentFromAuth(user)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()


    try {
      const response = await signInAuthUserWithEmailAndPassword(email, password)
      console.log("response", response)
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
    <div className='sign-up-container'>
      <h2>Already have an Account ? </h2>
      <span>Sign in with your email and password</span>
      <form onSubmit={handleSubmit}>

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