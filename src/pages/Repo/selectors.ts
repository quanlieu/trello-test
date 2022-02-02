import type { RootState } from '../../app/store';

export const selectRepoStore = (state: RootState) => state.repo;
export const selectRepo = (state: RootState) => selectRepoStore(state).repo;
