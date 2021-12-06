const axios = require('axios');

export const getSeetsByIds = async (ids) => {
  let newIds = ids.map((id, ind)=> {
    if(ind != ids.length-1)
      return `id=${id}&`;
    else
      return `id=${id}`;
  })
  const seets =  await axios.get('http://localhost:3000/seats?'+newIds.join(''))
  .then((response) => {return response.data})
  .catch((error) => console.log(error))
  return seets
}

export const getSeatsByBranch = async(branchId) => {
  const seets =  await axios.get('http://localhost:3000/seats?',
  {
    params: {
      branchId: branchId
    }
  })
  .then((response) => {return response.data})
  .catch((error) => console.log(error))
  return seets
}


export const getAllSeats = async() => {
  return await getSeatsByBranch()
}