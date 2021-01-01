import { createHttpLink } from '@apollo/client'

const uri = process.env.BACKEND_URI || 'http://localhost:5000/graphql'

export default createHttpLink({ uri })
