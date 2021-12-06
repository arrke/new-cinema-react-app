const axios = require('axios');

export const getAllMovies = async () => {
  return await axios.get('http://localhost:3000/movies')
  .then((response) => {return response.data})
  .catch((error) => console.log(error))
}

export const getMovieByID = async (id) => {
  return await axios.get('http://localhost:3000/movies/'+id)
  .then((response) => {return response.data})
  .catch((error) => console.log(error))
}

export const updateMovie = async (id,title,runtime,image) => {
  return await axios.put(`http://localhost:3000/movies/${id}`, {
    title: title,
    runtime: runtime,
    image: image
  })
  .then((response) => {return response.data})
  .catch((error) => console.log(error))
}

export const deleteMovie = async (id) => {
  return await axios.delete(`http://localhost:3000/movies/${id}`)
  .then((response) => {return response.data})
  .catch((error) => console.log(error))
}

export const addMovie = async (id,title, runtime, image) => {
  return await axios.post("http://localhost:3000/movies",
  {
    id: id,
    title: title,
    runtime: runtime,
    image: image
  })
  .then((response) => {return response.data})
  .catch((error) => console.log(error))
}