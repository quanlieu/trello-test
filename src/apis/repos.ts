import http from './http-common';
import { IServerResponseRepo } from '../types/repo';

export const getAllRepos = () => {
  return http.get<IServerResponseRepo>('repo');
};
