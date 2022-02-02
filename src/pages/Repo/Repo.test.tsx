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
import * as cardApi from '../../apis/card';
import { OPEN, CONFIRMED, FALSE_POSITIVE, FIXED } from '../../constants/lists';
import Repo from './Repo';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  // eslint-disable-next-line testing-library/no-node-access
  useParams: () => ({ id: '1' }),
}));

jest.mock('../components/List', () => ({
  __esModule: true,
  // @ts-ignore
  default: (props) => {
    const handleChange = (e: any) => {
      props.onChangeCardState({
        text: 'lorem',
        note: 'ipsum',
        newList: e.target.value,
        id: 'card-id',
      });
    };
    return (
      <div data-testid={props.listId}>
        {props.listName}
        <input onChange={handleChange} data-testid={`${props.listId}-input`} />
      </div>
    );
  },
}));

describe('Repo', () => {
  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  it('should load a repo and render 4 list', async () => {
    const response: AxiosResponse = {
      data: {
        name: 'lorem',
        id: '1',
        lists: [
          {
            title: OPEN,
            cards: [],
            id: 'open-list',
          },
          {
            title: CONFIRMED,
            cards: [],
            id: 'confirm-list',
          },
          {
            title: FALSE_POSITIVE,
            cards: [],
            id: 'false-list',
          },
          {
            title: FIXED,
            cards: [],
            id: 'fixed-list',
          },
        ],
      },
      status: 0,
      statusText: '',
      headers: {},
      config: {},
    };

    jest
      .spyOn(reposApi, 'getRepo')
      .mockImplementation(() => new Promise((resolve) => resolve(response)));

    render(<Repo />);

    await waitFor(() => {
      expect(screen.getByText(OPEN)).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText(CONFIRMED)).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText(FALSE_POSITIVE)).toBeInTheDocument();
    });
    await waitFor(() => {
      expect(screen.getByText(FIXED)).toBeInTheDocument();
    });
  });

  it('should delete card and create new one with to change its state', async () => {
    const response: AxiosResponse = {
      data: {
        name: 'lorem',
        id: '1',
        lists: [
          {
            title: OPEN,
            cards: [
              { text: 'Vulnerability 1', id: 'm-card' },
              { text: 'Vulnerability 2', id: 'n-card' },
            ],
            id: 'open-list',
          },
          {
            title: CONFIRMED,
            cards: [],
            id: 'confirm-list',
          },
          {
            title: FALSE_POSITIVE,
            cards: [],
            id: 'false-list',
          },
          {
            title: FIXED,
            cards: [],
            id: 'fixed-list',
          },
        ],
      },
      status: 0,
      statusText: '',
      headers: {},
      config: {},
    };

    jest
      .spyOn(reposApi, 'getRepo')
      .mockImplementation(() => new Promise((resolve) => resolve(response)));

    jest
      .spyOn(cardApi, 'postCard')
      .mockImplementation(() => new Promise((resolve) => resolve(response)));

    jest
      .spyOn(cardApi, 'deleteCard')
      .mockImplementation(() => new Promise((resolve) => resolve(response)));

    render(<Repo />);

    await waitFor(() => {
      expect(screen.getByTestId('open-list-input')).toBeInTheDocument();
    });

    fireEvent.change(screen.getByTestId('open-list-input'), {
      target: { value: CONFIRMED },
    });

    await waitFor(() => {
      expect(cardApi.postCard).toHaveBeenCalledWith("confirm-list", "lorem", "ipsum");
    });

    await waitFor(() => {
      expect(cardApi.deleteCard).toHaveBeenCalledWith('card-id');
    });
  });
});
