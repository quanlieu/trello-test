import React from 'react';
import {
  render,
  screen,
  fireEvent,
  cleanup,
  waitFor,
} from '@testing-library/react';

import * as cardApi from '../apis/card';
import { OPEN, CONFIRMED } from '../constants/lists';
import List, { IProps } from './List';

describe('List', () => {
  let props: IProps;

  beforeEach(() => {
    props = {
      listId: 'list-id',
      listName: OPEN,
      vulnerabilityCards: [
        { text: 'Vulnerability 1', id: 'm-card' },
        { text: 'Vulnerability 2', id: 'n-card' },
      ],
      onReload: jest.fn(),
      onChangeCardState: jest.fn(),
    };
  });

  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  it('should render list and vulnerability cards', async () => {
    render(<List {...props} />);
    expect(screen.getByText(OPEN)).toBeInTheDocument();
    expect(screen.getByText('Vulnerability 1')).toBeInTheDocument();
    expect(screen.getByText('Vulnerability 2')).toBeInTheDocument();
  });

  it('should submit new card', async () => {
    props.vulnerabilityCards = [];
    render(<List {...props} />);
    jest
      .spyOn(cardApi, 'postCard')
      // @ts-ignore
      .mockImplementation(() => new Promise((resolve) => resolve({})));

    fireEvent.click(screen.getByTestId('new-card-btn'));
    expect(
      screen.getByText('Vulnerability card information')
    ).toBeInTheDocument();

    fireEvent.change(screen.getByTestId('card-text'), {
      target: { value: 'lorem' },
    });
    fireEvent.change(screen.getByTestId('card-note'), {
      target: { value: 'ipsum' },
    });
    fireEvent.click(screen.getByTestId('submit-btn'));

    await waitFor(() => {
      expect(cardApi.postCard).toHaveBeenCalledWith(
        'list-id',
        'lorem',
        'ipsum'
      );
    });
    await waitFor(() => {
      expect(
        screen.queryByText('Vulnerability card information')
      ).not.toBeInTheDocument();
    });
  });

  it('should update existing card', async () => {
    render(<List {...props} />);
    jest
      .spyOn(cardApi, 'putCard')
      // @ts-ignore
      .mockImplementation(() => new Promise((resolve) => resolve({})));

    expect(screen.getByText('Vulnerability 1')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('edit-card-btn-m-card'));
    expect(
      screen.getByText('Vulnerability card information')
    ).toBeInTheDocument();

    fireEvent.change(screen.getByTestId('card-text'), {
      target: { value: 'Vulnerability A' },
    });
    fireEvent.change(screen.getByTestId('card-note'), {
      target: { value: 'Vulnerability A note' },
    });
    fireEvent.click(screen.getByTestId('submit-btn'));

    await waitFor(() => {
      expect(cardApi.putCard).toHaveBeenCalledWith(
        'm-card',
        'Vulnerability A',
        'Vulnerability A note'
      );
    });
    await waitFor(() => {
      expect(
        screen.queryByText('Vulnerability card information')
      ).not.toBeInTheDocument();
    });
  });

  it('should delete existing card', async () => {
    render(<List {...props} />);
    jest
      .spyOn(cardApi, 'deleteCard')
      // @ts-ignore
      .mockImplementation(() => new Promise((resolve) => resolve({})));

    expect(screen.getByText('Vulnerability 1')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('delete-card-btn-m-card'));

    await waitFor(() => {
      expect(cardApi.deleteCard).toHaveBeenCalledWith('m-card');
    });
    await waitFor(() => {
      expect(
        screen.queryByText('Vulnerability card information')
      ).not.toBeInTheDocument();
    });
  });

  it('Change vulnerability card state should call onChangeCardState', async () => {
    render(<List {...props} />);
    jest
      .spyOn(cardApi, 'postCard')
      // @ts-ignore
      .mockImplementation(() => new Promise((resolve) => resolve({})));
    jest
      .spyOn(cardApi, 'deleteCard')
      // @ts-ignore
      .mockImplementation(() => new Promise((resolve) => resolve({})));

    fireEvent.click(screen.getByTestId('edit-card-btn-m-card'));
    fireEvent.change(screen.getByTestId('select-state'), {
      target: { value: CONFIRMED },
    });
    fireEvent.click(screen.getByTestId('submit-btn'));
    await waitFor(() => {
      expect(props.onChangeCardState).toHaveBeenCalledWith({
        id: 'm-card',
        newList: 'Confirmed',
        note: '',
        text: 'Vulnerability 1',
      });
    });
  });
});
