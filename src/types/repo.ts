export interface IServerResponseRepo {
  repos: Array<IRepo>;
}
export interface IRepo {
  id: string;
  name: string;
}