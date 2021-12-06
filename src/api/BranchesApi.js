const axios = require('axios');

export const getAllBranches = async () => {
  return await axios.get('http://localhost:3000/branches')
  .then((response) => {return response.data})
  .catch((error) => console.log(error))
}


