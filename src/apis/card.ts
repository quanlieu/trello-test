import http from './http-common';
import { ICard } from '../types/card';

export const postCard = (listId: string, text: string, note: string) => {
  return http.post<ICard>(`/list/${listId}/card`, { text, note });
};

export const putCard = (id: string, text: string, note: string) => {
  return http.put<any>(`/card/${id}`, { id, text, note });
};
