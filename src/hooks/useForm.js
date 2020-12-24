import { useState } from 'react'

export const useForm = ({ callback, initialState = {} }) => {
  const [values, setValues] = useState(initialState)

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
