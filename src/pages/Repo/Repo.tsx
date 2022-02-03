import { useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';

import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { actions } from './actions';
import List from './partials/List';
import { IList } from '../../types/list';
import { OPEN, CONFIRMED, FALSE_POSITIVE, FIXED } from '../../constants/lists';

const emptyList: IList = { id: '', title: '', cards: [] }

function Repo() {
  const { id = '' } = useParams();
  const dispatch = useAppDispatch();
  const { repo } = useAppSelector((state) => state.repo);

  const loadRepo = useCallback(async () => {
    dispatch(actions.getRepoStart({ id }));
  }, [dispatch, id]);

  useEffect(() => {
    loadRepo();
  }, [loadRepo]);

  if (!repo) {
    return (
      <Container className="mt-4">
        <Spinner animation="border" />
      </Container>
    );
  }

  let openList = emptyList;
  let confirmList = emptyList;
  let falsePositiveList = emptyList;
  let fixedList = emptyList;
  repo.lists.forEach((list) => {
    switch (list.title) {
      case OPEN:
        openList = list;
        break;
      case CONFIRMED:
        confirmList = list;
        break;
      case FALSE_POSITIVE:
        falsePositiveList = list;
        break;
      case FIXED:
        fixedList = list;
        break;
    }
  });
  const orderedList = [openList, confirmList, falsePositiveList, fixedList];

  return (
    <Container fluid>
      <Row>
        <h1>{repo.name}</h1>
      </Row>
      <Row>
        {orderedList.map((list) => (
          <Col sm={6} lg={3} className="mb-2" key={list.id}>
            <List
              listId={list?.id}
              listName={list?.title}
              cards={list?.cards}
            />
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Repo;
