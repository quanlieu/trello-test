import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';

import List from '../components/List';
import { getRepo } from '../apis/repos';
import { IRepo } from '../types/repo';
import { IList } from '../types/list';
import { OPEN, CONFIRMED, FALSE_POSITIVE, FIXED } from '../constants/lists';

function Repo() {
  const { id } = useParams();
  const [repo, setRepo] = useState<IRepo>();

  useEffect(() => {
    async function getApi() {
      try {
        if (id) {
          const response = await getRepo(id);
          setRepo(response.data);
        }
      } catch (error) {
        console.error(error);
      }
    }
    getApi();
  }, [id]);
  if (!repo) {
    return (
      <Container className="mt-4">
        <Spinner animation="border" />
      </Container>
    );
  }

  // TODO: filter the repo into 4 list and pass the data to them
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
        <h1>The name of repo</h1>
      </Row>
      <Row>
        {
          // @ts-ignore
          openList && (
            <Col sm={6} lg={3} className="mb-2">
              <List
                listName={openList.title}
                vulnerabilityCards={openList.cards}
              />
            </Col>
          )
        }
        {
          // @ts-ignore
          confirmList && (
            <Col sm={6} lg={3} className="mb-2">
              <List
                listName={confirmList.title}
                vulnerabilityCards={confirmList.cards}
              />
            </Col>
          )
        }
        {
          // @ts-ignore
          falsePositiveList && (
            <Col sm={6} lg={3} className="mb-2">
              <List
                listName={falsePositiveList.title}
                vulnerabilityCards={falsePositiveList.cards}
              />
            </Col>
          )
        }
        {
          // @ts-ignore
          fixedList && (
            <Col sm={6} lg={3} className="mb-2">
              <List
                listName={fixedList.title}
                vulnerabilityCards={fixedList.cards}
              />
            </Col>
          )
        }
      </Row>
    </Container>
  );
}

export default Repo;
