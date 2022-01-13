import { IList } from "./list";

export interface IServerResponseRepos {
  repos: Array<IRepo>;
}
export interface IRepo {
  id: string;
  name: string;
  lists: IList[];
}