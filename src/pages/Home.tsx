import { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import NewRepo from '../modals/NewRepo';
import { getAllRepos, postRepo } from '../apis/repos';
import { IRepo } from '../types/repo';

function Home() {
  const [repos, setRepos] = useState<IRepo[]>([]);
  const [showNewRepoModal, setShowNewRepoModal] = useState(false);

  const handleClose = useCallback(() => setShowNewRepoModal(false), []);

  const handleShow = useCallback(() => setShowNewRepoModal(true), []);

  const handleSubmit = async (repoName: string) => {
    try {
      await postRepo(repoName);
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
        <Col xs={6} sm={4} md={3}>
          <Card>
            <Card.Body className="text-center">
              <Button variant="primary" onClick={handleShow}>
                New repo
              </Button>
            </Card.Body>
          </Card>
        </Col>
        {repos.map((v) => (
          <Col key={v.id} xs={6} sm={4} md={3} className="mb-4">
            <Card>
              <Card.Body className="text-center">
                <Button variant="link">
                  <Link to={`/repo/${v.id}`}>{v.name}</Link>
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
