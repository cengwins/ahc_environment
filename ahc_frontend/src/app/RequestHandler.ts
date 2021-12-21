import axios, { AxiosRequestHeaders } from 'axios';

export default class RequestHandler {
  public axiosInstance;

  constructor() {
    const headers = localStorage.getItem('token') ? { Authorization: localStorage.getItem('token') } : {};

    this.axiosInstance = axios.create({
      baseURL: 'http://localhost:8000/api/',
      timeout: 5000,
      headers: headers as AxiosRequestHeaders,
    });
  }

  async request(url: string, requestType: 'post' | 'get' | 'put', data?: any) {
    let result;

    switch (requestType) {
      case 'get':
        result = await this.axiosInstance.get(url);
        break;
      case 'post':
        result = await this.axiosInstance.post(url, data);
        break;
      case 'put':
        result = await this.axiosInstance.put(url, data);
        break;
      default:
        throw Error('Undefined requestType');
    }

    if (result.status === 200) return result.data;

    throw Error(result.data);
  }
}
