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

export const createReservedSeets = async (seats, branchId, nameAndSurname, screeningId) => {
  return await axios.post("http://localhost:3000/reserved_seats",
  {
    seats: seats,
    branchId: branchId,
    nameAndSurname: nameAndSurname,
    screeningId: screeningId
  })
  .then((response) => {return response.data})
  .catch((error) => console.log(error))
}