import { useState, useEffect, useMemo, useCallback } from 'react';
import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

import RepoNameModal from '../modals/RepoNameModal';
import { getAllRepos, postRepo, putRepoName, deleteRepo } from '../apis/repos';
import { postList } from '../apis/list';
import { IRepo } from '../types/repo';
import { OPEN, CONFIRMED, FALSE_POSITIVE, FIXED } from '../constants/lists';

const NEW = 'New';

function Home() {
  const [repos, setRepos] = useState<IRepo[]>([]);
  const [selectedRepoId, setSelectedRepoId] = useState('');
  const selectedRepo = useMemo(
    () => repos.find((e) => e.id === selectedRepoId),
    [repos, selectedRepoId]
  );

  const handleClose = useCallback(() => setSelectedRepoId(''), []);

  const handleNewRepoClick = useCallback(() => setSelectedRepoId(NEW), []);

  const handleRenameClick = (repoId: string) => setSelectedRepoId(repoId);

  const handleModalSubmit = (repoName: string) => {
    if (selectedRepoId === NEW) {
      createNewRepo(repoName);
    } else {
      renameRepo(selectedRepoId, repoName);
    }
  };

  const createNewRepo = async (repoName: string) => {
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

  const renameRepo = async (repoId: string, repoName: string) => {
    try {
      await putRepoName(repoId, repoName);
      const response = await getAllRepos();
      setRepos(response.data.repos);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteClick = async (repoId: string) => {
    try {
      await deleteRepo(repoId);
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
      {!!selectedRepoId && (
        <RepoNameModal
          show={!!selectedRepoId}
          onClose={handleClose}
          onSubmit={handleModalSubmit}
          name={selectedRepo?.name}
        />
      )}
      <Row>
        <h1>All repository</h1>
      </Row>
      <Row>
        <Col xs={6} sm={4} md={3} className="mb-4">
          <Card>
            <Card.Body className="text-center">
              <Button
                variant="primary"
                onClick={handleNewRepoClick}
                data-testid="new-repo-btn"
              >
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
                <Button
                  variant="outline-secondary"
                  onClick={() => handleRenameClick(v.id)}
                  data-testid="rename-btn"
                >
                  Rename
                </Button>
                <Button
                  className="m-2"
                  variant="danger"
                  onClick={() => handleDeleteClick(v.id)}
                  data-testid="delete-btn"
                >
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
