import axios from 'axios';

export function post(url: String, params: any) {
  return axios.post(`${process.env.REACT_APP_BACKGROUND_SERVER_URL}` +
      `${process.env.REACT_APP_BACKGROUND_APPLICATION_NAME}` + url, params)
}
