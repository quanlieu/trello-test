import { screen, fireEvent, cleanup } from '@testing-library/react';

import { actions } from '../actions';
import renderWithRedux from '../../../utils/test';
import * as cardApi from '../../../apis/card';
import { OPEN, CONFIRMED } from '../../../constants/lists';
import List, { IProps } from './List';

const mockDispatch = jest.fn();

jest.mock('../../../app/hooks', () => ({
  ...jest.requireActual('../../../app/hooks'),
  useAppDispatch: () => mockDispatch,
}));

describe('List', () => {
  let props: IProps;

  beforeEach(() => {
    props = {
      list: {
        id: 'list-id',
        title: OPEN,
        cards: [
          { text: 'Vulnerability 1', id: 'm-card' },
          { text: 'Vulnerability 2', id: 'n-card' },
        ],
      },
    };
  });

  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  it('should render list and Cards', async () => {
    renderWithRedux(<List {...props} />);
    expect(screen.getByText(OPEN)).toBeInTheDocument();
    expect(screen.getByText('Vulnerability 1')).toBeInTheDocument();
    expect(screen.getByText('Vulnerability 2')).toBeInTheDocument();
  });

  it('should submit new card', async () => {
    props.list.cards = [];
    renderWithRedux(<List {...props} />);
    jest
      .spyOn(cardApi, 'postCard')
      // @ts-ignore
      .mockImplementation(() => new Promise((resolve) => resolve({})));

    fireEvent.click(screen.getByTestId('new-card-btn'));
    expect(screen.getByText('Card information')).toBeInTheDocument();

    fireEvent.change(screen.getByTestId('card-text'), {
      target: { value: 'lorem' },
    });
    fireEvent.change(screen.getByTestId('card-note'), {
      target: { value: 'ipsum' },
    });
    fireEvent.click(screen.getByTestId('submit-btn'));

    expect(mockDispatch).toHaveBeenLastCalledWith(
      actions.createNewCardStart({
        listId: 'list-id',
        note: 'ipsum',
        text: 'lorem',
      })
    );
    expect(screen.queryByText('Card information')).not.toBeInTheDocument();
  });

  it('should update existing card info', async () => {
    renderWithRedux(<List {...props} />);

    expect(screen.getByText('Vulnerability 1')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('edit-card-btn-m-card'));
    expect(screen.getByText('Card information')).toBeInTheDocument();

    fireEvent.change(screen.getByTestId('card-text'), {
      target: { value: 'Vulnerability A' },
    });
    fireEvent.change(screen.getByTestId('card-note'), {
      target: { value: 'Vulnerability A note' },
    });
    fireEvent.click(screen.getByTestId('submit-btn'));

    expect(mockDispatch).toHaveBeenLastCalledWith(
      actions.updateCardInfoStart({
        id: 'm-card',
        text: 'Vulnerability A',
        note: 'Vulnerability A note',
      })
    );
    expect(screen.queryByText('Card information')).not.toBeInTheDocument();
  });

  it('should update existing card state', async () => {
    renderWithRedux(<List {...props} />);
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
    expect(mockDispatch).toHaveBeenLastCalledWith(
      actions.updateCardStateStart({
        id: 'm-card',
        newList: 'Confirmed',
        note: '',
        text: 'Vulnerability 1',
      })
    );
    expect(screen.queryByText('Card information')).not.toBeInTheDocument();
  });

  it('should delete existing card', async () => {
    renderWithRedux(<List {...props} />);

    expect(screen.getByText('Vulnerability 1')).toBeInTheDocument();
    fireEvent.click(screen.getByTestId('delete-card-btn-m-card'));

    expect(mockDispatch).toHaveBeenLastCalledWith(
      actions.deleteCardStart({
        id: 'm-card',
      })
    );
    expect(screen.queryByText('Card information')).not.toBeInTheDocument();
  });
});
