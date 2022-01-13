import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import NewRepo from '../modals/NewRepo';
import { getAllRepos, postRepo, deleteRepo } from '../apis/repos';
import { postList } from '../apis/list';
import { IRepo } from '../types/repo';
import { OPEN, CONFIRMED, FALSE_POSITIVE, FIXED } from '../constants/lists';

function Home() {
  const [repos, setRepos] = useState<IRepo[]>([]);
  const [showNewRepoModal, setShowNewRepoModal] = useState(false);

  const handleClose = useCallback(() => setShowNewRepoModal(false), []);

  const handleShow = useCallback(() => setShowNewRepoModal(true), []);

  const handleSubmit = async (repoName: string) => {
    try {
      const postRepoResponse = await postRepo(repoName);
      postList(postRepoResponse.data.id, OPEN);
      postList(postRepoResponse.data.id, CONFIRMED);
      postList(postRepoResponse.data.id, FALSE_POSITIVE);
      postList(postRepoResponse.data.id, FIXED);
      const allReposResponse = await getAllRepos();
      setRepos(allReposResponse.data.repos);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (repoId: string) => {
    try {
      const m = await deleteRepo(repoId);
      console.log(m);
      const response = await getAllRepos();
      setRepos(response.data.repos);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    async function getApi() {
      try {
        const response = await getAllRepos();
        setRepos(response.data.repos);
      } catch (error) {
        console.error(error);
      }
    }
    getApi();
  }, []);

  return (
    <Container fluid>
      <NewRepo
        show={showNewRepoModal}
        onClose={handleClose}
        onSubmit={handleSubmit}
      />
      <Row>
        <h1>All repository</h1>
      </Row>
      <Row>
        <Col xs={6} sm={4} md={3} className="mb-4">
          <Card>
            <Card.Body className="text-center">
              <Button variant="primary" onClick={handleShow}>
                New repo
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <Row>
        {repos.map((v) => (
          <Col key={v.id} xs={6} sm={4} md={3} className="mb-4">
            <Card>
              <Card.Body className="text-center">
                <Col></Col>
                <Button variant="link">
                  <Link to={`/repo/${v.id}`}>{v.name}</Link>
                </Button>
                <br />
                <Button variant="danger" onClick={() => handleDelete(v.id)}>
                  Delete
                </Button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}

export default Home;
