import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';

import List from '../components/List';
import { getRepo } from '../apis/repos';
import { postCard, deleteCard } from '../apis/card';
import { IRepo } from '../types/repo';
import { IList } from '../types/list';
import { OPEN, CONFIRMED, FALSE_POSITIVE, FIXED } from '../constants/lists';

function Repo() {
  const { id } = useParams();
  const [repo, setRepo] = useState<IRepo>();

  const loadRepo = useCallback(async () => {
    try {
      if (id) {
        const response = await getRepo(id);
        setRepo(response.data);
      }
    } catch (error) {
      console.error(error);
    }
  }, [id]);

  const changeCardState = useCallback(async ({
    text,
    note,
    newList,
    id,
  }: {
    id: string;
    text: string;
    note: string;
    newList: string;
  }) => {
    // Change card to another list is actually delete the card and create a new one
    //   so Repo should handle it instead of list
    const listId = repo?.lists.find((v) => v.title === newList)?.id;
    if (listId && id) {
      const promises = [deleteCard(id), postCard(listId, text, note)];
      await Promise.all(promises);
      loadRepo();
    }
  }, [loadRepo, repo]);

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

  let openList: IList;
  let confirmList: IList;
  let falsePositiveList: IList;
  let fixedList: IList;
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

  return (
    <Container fluid>
      <Row>
        <h1>{repo.name}</h1>
      </Row>
      <Row>
        {
          // @ts-ignore
          openList && (
            <Col sm={6} lg={3} className="mb-2">
              <List
                listId={openList.id}
                listName={openList.title}
                vulnerabilityCards={openList.cards}
                onReload={loadRepo}
                onChangeCardState={changeCardState}
              />
            </Col>
          )
        }
        {
          // @ts-ignore
          confirmList && (
            <Col sm={6} lg={3} className="mb-2">
              <List
                listId={confirmList.id}
                listName={confirmList.title}
                vulnerabilityCards={confirmList.cards}
                onReload={loadRepo}
                onChangeCardState={changeCardState}
              />
            </Col>
          )
        }
        {
          // @ts-ignore
          falsePositiveList && (
            <Col sm={6} lg={3} className="mb-2">
              <List
                listId={falsePositiveList.id}
                listName={falsePositiveList.title}
                vulnerabilityCards={falsePositiveList.cards}
                onReload={loadRepo}
                onChangeCardState={changeCardState}
              />
            </Col>
          )
        }
        {
          // @ts-ignore
          fixedList && (
            <Col sm={6} lg={3} className="mb-2">
              <List
                listId={fixedList.id}
                listName={fixedList.title}
                vulnerabilityCards={fixedList.cards}
                onReload={loadRepo}
                onChangeCardState={changeCardState}
              />
            </Col>
          )
        }
      </Row>
    </Container>
  );
}

export default Repo;
