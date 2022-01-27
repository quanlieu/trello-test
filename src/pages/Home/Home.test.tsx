import React from 'react';
import {
  render,
  screen,
  fireEvent,
  cleanup,
  waitFor,
} from '@testing-library/react';
import { AxiosResponse } from 'axios';

import * as reposApi from '../../apis/repos';
import * as listApi from '../../apis/list';
import { OPEN, CONFIRMED, FALSE_POSITIVE, FIXED } from '../../constants/lists';
import Home from './Home';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  // eslint-disable-next-line testing-library/no-node-access
  Link: (props: any) => <a href="http://#">{props.children}</a>,
}));

describe('Home', () => {
  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  it('should create new repo with 4 list then close modal and reload all', async () => {
    const response: AxiosResponse = {
      data: {
        id: '1',
        repos: [],
      },
      status: 0,
      statusText: '',
      headers: {},
      config: {},
    };
    jest
      .spyOn(reposApi, 'postRepo')
      .mockImplementation(() => new Promise((resolve) => resolve(response)));
    jest
      .spyOn(reposApi, 'getAllRepos')
      .mockImplementation(() => new Promise((resolve) => resolve(response)));
    jest
      .spyOn(listApi, 'postList')
      .mockImplementation(() => new Promise((resolve) => resolve(response)));
    render(<Home />);
    fireEvent.click(screen.getByTestId('new-repo-btn'));
    const modalTitle = screen.getByText('Repo information');
    expect(modalTitle).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('submit-btn'));
    await waitFor(() => {
      expect(listApi.postList).toHaveBeenCalledTimes(4);
    });
    await waitFor(() => {
      // @ts-ignore
      expect(listApi.postList.mock.calls).toEqual([
        ['1', OPEN],
        ['1', CONFIRMED],
        ['1', FALSE_POSITIVE],
        ['1', FIXED],
      ]);
    });
    await waitFor(() => {
      expect(modalTitle).not.toBeInTheDocument();
    });
  });

  it('should rename a repo', async () => {
    const response: AxiosResponse = {
      data: {
        repos: [
          {
            id: '1',
            name: 'lorem repo',
          },
        ],
      },
      status: 0,
      statusText: '',
      headers: {},
      config: {},
    };
    jest
      .spyOn(reposApi, 'putRepoName')
      .mockImplementation(() => new Promise((resolve) => resolve(response)));
    jest
      .spyOn(reposApi, 'getAllRepos')
      .mockImplementation(() => new Promise((resolve) => resolve(response)));

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText('lorem repo')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId('rename-btn'));
    const modalTitle = screen.getByText('Repo information');
    expect(modalTitle).toBeInTheDocument();

    const input = screen.getByTestId('repo-name');
    fireEvent.change(input, { target: { value: 'ipsum repo' } });
    fireEvent.click(screen.getByTestId('submit-btn'));

    await waitFor(() => {
      expect(reposApi.putRepoName).toHaveBeenCalledWith('1', 'ipsum repo');
    });
    await waitFor(() => {
      expect(modalTitle).not.toBeInTheDocument();
    });
  });

  it('should delete a repo', async () => {
    const response: AxiosResponse = {
      data: {
        repos: [
          {
            id: '1',
            name: 'lorem repo',
          },
        ],
      },
      status: 0,
      statusText: '',
      headers: {},
      config: {},
    };
    jest
      .spyOn(reposApi, 'deleteRepo')
      .mockImplementation(() => new Promise((resolve) => resolve(response)));
    jest
      .spyOn(reposApi, 'getAllRepos')
      .mockImplementation(() => new Promise((resolve) => resolve(response)));

    render(<Home />);

    await waitFor(() => {
      expect(screen.getByText('lorem repo')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByTestId('delete-btn'));

    await waitFor(() => {
      expect(reposApi.deleteRepo).toHaveBeenCalledWith('1');
    });
  });
});
