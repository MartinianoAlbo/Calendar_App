import { useState } from 'react'

export const useForm = (initialState = {}) => {
  const [formValues, setFormValues] = useState(initialState)

  const resetInput = () => {
    setFormValues(initialState)
  }

  const handleInputChange = (e) => {
    console.log(e.target.value);
    console.log('desde useForm');
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value,
    })
  }

  return [formValues,setFormValues, handleInputChange, resetInput]
}