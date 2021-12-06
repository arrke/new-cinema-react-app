const axios = require('axios');

export const getAllRepertoire = async () => {
  const screening =  await axios.get('http://localhost:3000/screenings?_expand=movie&_embed=reserved_seats&_expand=branch')
  .then((response) => {return response.data})
  .catch((error) => console.log(error))
  return screening
}

export const getRepertoireById = async (id) => {
  const screening =  await axios.get(`http://localhost:3000/screenings?id=${id}&_expand=movie&_embed=reserved_seats&_expand=branch`)
  .then((response) => {return response.data})
  .catch((error) => console.log(error))
  return screening
}