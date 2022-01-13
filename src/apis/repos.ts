import http from './http-common';
import { IServerResponseRepos, IRepo } from '../types/repo';

export const getAllRepos = () => {
  return http.get<IServerResponseRepos>('repo');
};

export const getRepo = (id: string) => {
  return http.get<IRepo>(`repo/${id}`);
};

export const postRepo = (name: string) => {
  return http.post<IRepo>('repo', { name });
};
