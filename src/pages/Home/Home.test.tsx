import { screen, fireEvent, cleanup } from '@testing-library/react';
import renderWithRedux from '../../utils/test';

import { actions } from './actions';
import Home from './Home';

const mockDispatch = jest.fn();

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  // eslint-disable-next-line testing-library/no-node-access
  Link: (props: any) => <a href="http://#">{props.children}</a>,
}));

jest.mock('../../app/hooks', () => ({
  ...jest.requireActual('../../app/hooks'),
  useAppSelector: () => ({
    repos: [
      {
        id: '1',
        name: 'lorem repo',
      },
    ],
  }),
  useAppDispatch: () => mockDispatch,
}));

describe('Home', () => {
  afterEach(() => {
    cleanup();
    jest.restoreAllMocks();
  });

  it('should dispatch create new repo', async () => {
    renderWithRedux(<Home />);
    fireEvent.click(screen.getByTestId('new-repo-btn'));
    const modalTitle = screen.getByText('Repo information');
    expect(modalTitle).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('submit-btn'));
    expect(mockDispatch).toHaveBeenLastCalledWith(
      actions.createNewRepoStart({ name: '' })
    );
    expect(modalTitle).not.toBeInTheDocument();
  });

  it('should dispatch rename repo', async () => {
    renderWithRedux(<Home />);
    expect(screen.getByText('lorem repo')).toBeInTheDocument();

    fireEvent.click(screen.getByTestId('rename-btn'));
    const modalTitle = screen.getByText('Repo information');
    expect(modalTitle).toBeInTheDocument();

    const input = screen.getByTestId('repo-name');
    fireEvent.change(input, { target: { value: 'ipsum repo' } });
    fireEvent.click(screen.getByTestId('submit-btn'));
    expect(mockDispatch).toHaveBeenLastCalledWith(
      actions.renameRepoStart({ id: '1', name: 'ipsum repo' })
    );
    expect(modalTitle).not.toBeInTheDocument();
  });

  it('should dispatch delete repo', async () => {
    renderWithRedux(<Home />);
    fireEvent.click(screen.getByTestId('delete-btn'));
    expect(mockDispatch).toHaveBeenLastCalledWith(
      actions.deleteRepoStart({ id: '1' })
    );
  });
});
