export interface IServerResponseRepos {
  repos: Array<IRepo>;
}
export interface IRepo {
  id: string;
  name: string;
}