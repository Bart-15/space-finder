import axios, { type AxiosInstance } from 'axios';

// eslint-disable-next-line import/extensions
import Output from '../../../space-finder-backend-service/outputs.json';

export const axiosPrivate: AxiosInstance = axios.create({
  baseURL: Output.ApiStack.SpaceApiEndpointDA7E4050,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const setHeaderToken = (token: string) => {
  axiosPrivate.defaults.headers.common.Authorization = `Bearer ${token}`;
};

export const removeHeaderToken = () => {
  delete axiosPrivate.defaults.headers.common.Authorization;
};
