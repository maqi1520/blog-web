import axios, { AxiosResponse } from 'axios'

const request = axios.create({
  baseURL: process.env.API_URL || '' + '/api',
  headers: {
    'Content-Type': 'application/json; charset=utf-8',
  },
})

// Add a request interceptor
request.interceptors.request.use(
  function (config) {
    const token = sessionStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// Add a response interceptor
request.interceptors.response.use(
  function (response: AxiosResponse) {
    return response
  },
  function (error) {
    return Promise.reject(error.response.data)
  }
)
export default request

export const register = (data: { password: string; email: string }) => {
  return request.post('/auth/register', data).then((res) => res.data)
}

export const login = <T>(data: { password: string; email: string }) => {
  return request.post<T>('/auth/login', data).then((res) => res.data)
}

export const getArticles = <T>(params?: {
  pageNum?: string
  pageSize?: string
}) => {
  return axios
    .get<T>(process.env.API_URL + '/api/articles', { params })
    .then((res) => res.data)
}

export const getArticle = <T>(id: string) => {
  return axios
    .get<T>(process.env.API_URL + `/api/articles/${id}`)
    .then((res) => res.data)
}
