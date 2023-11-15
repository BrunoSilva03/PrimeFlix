import axios from 'axios'

//CHAVE DA API: 60f04d056b064f913e494202bf2286d1

//BASE DA URL: https://api.themoviedb.org/3/

const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3/'
});

export default api;