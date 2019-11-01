import axios from 'axios'
import axiosRetry from 'axios-retry'

const httpClient = axios.create({
  baseURL: (process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000/api/v1'),
  timeout: parseInt((process.env.REACT_APP_API_TIMEOUT || 4000), 10)
})

axiosRetry(httpClient, {
  retries: 2,
  retryDelay: axiosRetry.exponentialDelay
})

export default httpClient