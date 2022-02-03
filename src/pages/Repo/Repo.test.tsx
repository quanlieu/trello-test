import React from 'react';
import { render, screen, cleanup } from '@testing-library/react';

import { actions } from './actions';
import * as mockLists from '../../constants/lists';
import Repo from './Repo';

const mockDispatch = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  // eslint-disable-next-line testing-library/no-node-access
  useParams: () => ({ id: '1' }),
}));

jest.mock('../../app/hooks', () => ({
  ...jest.requireActual('../../app/hooks'),
  useAppSelector: () => ({
    name: 'lorem',
    id: '1',
    lists: [
      {
        title: mockLists.OPEN,
        cards: [],
        id: 'open-list',
      },
      {
        title: mockLists.CONFIRMED,
        cards: [],
        id: 'confirm-list',
      },
      {
        title: mockLists.FALSE_POSITIVE,
        cards: [],
        id: 'false-list',
      },
      {
        title: mockLists.FIXED,
        cards: [],
        id: 'fixed-list',
      },
    ],
  }),
  useAppDispatch: () => mockDispatch,
}));

jest.mock('./partials/List', () => ({
  __esModule: true,
  default: (props: any) => props.list.title,
}));

describe('Repo', () => {
  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  it('should load a repo and render 4 list', async () => {
    render(<Repo />);
    expect(mockDispatch).toHaveBeenLastCalledWith(
      actions.getRepoStart({ id: '1' })
    );
    expect(screen.getByText(mockLists.OPEN)).toBeInTheDocument();
    expect(screen.getByText(mockLists.CONFIRMED)).toBeInTheDocument();
    expect(screen.getByText(mockLists.FALSE_POSITIVE)).toBeInTheDocument();
    expect(screen.getByText(mockLists.FIXED)).toBeInTheDocument();
  });
});
