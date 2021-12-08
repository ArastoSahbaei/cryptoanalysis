import axios from 'axios';

/* const development = "http://127.0.0.1:5000" */
const production = "https://obscure-cliffs-37126.herokuapp.com/"

const CryptoShuttleAPI = axios.create({
    baseURL: /* development, */ production,
    headers: {'Content-Type': 'application/json'}
})

export default CryptoShuttleAPI