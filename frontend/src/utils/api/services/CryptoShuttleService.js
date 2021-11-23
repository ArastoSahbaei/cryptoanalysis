import http from '../CryptoShuttleAPI'

const topChart = () => {
    return http.get("/rest/topchart?currency=usd")
}

const marketGraph = (slug) => {
    return http.get(`/rest/market/graph?coin=${slug}`)
}

const loginUser = (userLogin) => {
    
    return http.post("/user/login", userLogin,  {
        
    } );
}


const logoutUser = () => {

    return http.get("/user/logout")
}


const trendingInfo = () => {
    return http.get("/rest/trending/info")
}


const registerUser = (userObject) => {
    return http.post("/user/register", userObject)
}

const coinInfo = (slug) => {
    return http.get(`/rest/market/info?coin=${slug}`)
}

const forecastInfo = (slug, token) => {
    return http.get(`/rest/forecast/coins?coin=${slug}`, {
        headers: {'Authorization': 'Bearer ' + token}
    })
}

const lastViewed = (coins) => {
    return http.get(`/rest/market/info?coin=${coins[0]}, ${coins[1]}, ${coins[2]}, ${coins[3]}, ${coins[4]}`)
}

const saveForecast = (forecastInfo) => {
    return http.post("/user/forecasts", forecastInfo)
}


const search = () => {
    return http.get("/rest/coins/search")
}

const globalMarketInfo = (slug) => {
    return http.get(`/rest/market/global-market-data`)
}

const getLoggedInUser = (token) => {
    return http.get('/rest/get-user', {
        headers: {'Authorization': 'Bearer ' + token}
    })
}

const getSavedForecasts = (id) => {
    return http.get('/user/forecasts', {params: {'id': id}})
}

const lesserForecastInfo = (slug) => {
    return http.get(`rest/forecast/lesser/coins?coin=${slug}`)
}

export default { topChart, loginUser, logoutUser, registerUser, marketGraph, trendingInfo, coinInfo, forecastInfo, lastViewed, globalMarketInfo, search, saveForecast, getLoggedInUser, getSavedForecasts, lesserForecastInfo}

