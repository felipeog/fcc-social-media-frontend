import { useState } from 'react'

export const useForm = ({ callback, initialState = {} }) => {
  // state
  const [values, setValues] = useState(initialState)

  // functions
  const handleInputChange = (event) => {
    const { name, value } = event.target

    setValues((values) => ({
      ...values,
      [name]: value,
    }))
  }

  const handleFormSubmit = (event) => {
    event.preventDefault()
    callback()
  }

  return {
    values,
    handleInputChange,
    handleFormSubmit,
  }
}
