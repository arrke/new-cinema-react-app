const axios = require('axios');

export const getReservedSeetsById = async (id) => {
  const seets =  await axios.get('http://localhost:3000/reserved_seats?_expand=seat',
  {
    params:{
      screeningId: id
    }
  })
  .then((response) => {return response.data})
  .catch((error) => console.log(error))
  return seets
}