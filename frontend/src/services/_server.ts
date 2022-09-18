import axios, { Method } from 'axios';

const BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export class Server {
  static async request<T>(args: {
    method: Method,
    url: string,
    data?: any
  }): Promise<T> {
    const { method, url, data } = args;
    const authorizationHeader = localStorage.getItem('access') ? {
      "Authorization": `Bearer ${localStorage.getItem('access')}`
    } : undefined;

    return axios
      .request({
        method,
        url,
        baseURL: BASE_URL,
        data,
        responseType: 'json',
        headers: authorizationHeader,
      }).then(res => {
        const { data } = res;

        return data;
      }).catch((err) => {
        if (err && err.isAxiosError) {
          const errResponse = err.response;

          if (errResponse) {
            const { data } = errResponse;

            Object.values(data).forEach((errMessage: any) => {
              throw errMessage;
            })
          }
        }

        throw err;
      });
  }
}
