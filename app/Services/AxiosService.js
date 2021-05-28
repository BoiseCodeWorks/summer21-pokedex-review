export const pokeApi = axios.create({
  baseURL: "https://pokeapi.co/api/v2/pokemon",
  timeout: 10000
})


export const sandboxApi = axios.create({
  baseURL: "https://bcw-sandbox.herokuapp.com/api/harrison/pokemon",
  timeout: 10000
})