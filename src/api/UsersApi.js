const axios = require('axios');

export const createUser = async (email, password) => {
  return await axios.post('http://localhost:3000/users', 
    {
      email: email,
      password: password
    }
  )
  .then((response) => {return response.data})
  .catch((error) => console.log(error))
}

export const loginAsUser = async (email, password) => {
  return await axios.get('http://localhost:3000/users?', 
    {
      params: {
        email: email,
        password: password
      }
    }
  )
  .then((response) => {return response.data})
  .catch((error) => console.log(error))
}