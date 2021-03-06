import http from './http-common';
import { ICard } from '../types/card';

export const postCard = ({
  listId,
  text,
  note,
}: {
  listId: string;
  text: string;
  note: string;
}) => {
  return http.post<ICard>(`/list/${listId}/card`, { text, note });
};

export const putCard = ({
  id,
  text,
  note,
}: {
  id: string;
  text: string;
  note: string;
}) => {
  return http.put<any>(`/card/${id}`, { id, text, note });
};

export const deleteCard = ({ id }: { id: string }) => {
  return http.delete<any>(`/card/${id}`);
};
