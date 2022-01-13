import http from './http-common';
import { IRepo } from '../types/repo';

export const postList = (repoId: string, title: string) => {
  return http.post<IRepo>(`/repo/${repoId}/list`, { title });
};
