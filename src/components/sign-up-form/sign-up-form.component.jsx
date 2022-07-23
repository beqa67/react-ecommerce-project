import { useState } from "react";

import {createAuthUserWithEmailAndPassword, createUserDocumentFromAuth} from "../../utils/firebase/firebase.utils";
import FormInput from "../form-input/form-input.component";
import Button from "../button/button.component";

const defaultFormFields = {
  displayName: '',
  email: '',
  password: '',
  confirmPassword: ''
}

const SignUpForm = () => {
  const [formFields, setFormFields] = useState(defaultFormFields)
  const { displayName, email, password, confirmPassword } = formFields

  const resetFields = () => {
    setFormFields(defaultFormFields)
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (password !== confirmPassword) {
      alert("password do not match")
      return
    }

    try {
      const { user } = await createAuthUserWithEmailAndPassword(email, password)
      await createUserDocumentFromAuth(user, {displayName})
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
      <h2>Dont't have an Account ? </h2>
      <span>Sign up with your email and password</span>
      <form onSubmit={handleSubmit}>

        <FormInput label="Display Name" type="text" onChange={handleChange} required name="displayName" value={displayName} />

        <FormInput label="email" type="email" onChange={handleChange} required name="email" value={email} />

        <FormInput label="Passowrd" type="password" onChange={handleChange} required name="password" value={password}/>

        <FormInput label="Confirm Password" type="password" onChange={handleChange} required name="confirmPassword" value={confirmPassword} />
        {/*<FormInput*/}
        {/*  label="Display Name"*/}
        {/*  inputOptions={{*/}
        {/*    type: "text",*/}
        {/*    onChange: handleChange,*/}
        {/*    required: true,*/}
        {/*    name: "displayName",*/}
        {/*    value: displayName*/}
        {/*  }}/>*/}
        <Button type="submit">Sign Up</Button>
      </form>
    </div>
  )
}

export default SignUpForm