import axios, { AxiosRequestConfig, AxiosRequestHeaders } from 'axios';

import { User } from '../../../../shared/types';
import { baseUrl } from '../data/constants/axios.constants';

export function getJWTHeader(user: User): AxiosRequestHeaders {
  return { Authorization: `Bearer ${user.token}` };
}

const config: AxiosRequestConfig = { baseURL: baseUrl };
export const axiosInstance = axios.create(config);
