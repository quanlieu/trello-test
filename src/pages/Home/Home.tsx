import { useState, useEffect, useMemo, useCallback } from 'react';

import { Link } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import RepoNameModal from '../../components/modals/RepoNameModal';
import { actions } from './actions';

const NEW = 'New';

function Home() {
  const dispatch = useAppDispatch();
  const { repos } = useAppSelector((state) => state.home);
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

  const createNewRepo = async (repoName: string) =>
    dispatch(actions.createNewRepoStart({ name: repoName }));

  const renameRepo = async (repoId: string, repoName: string) =>
    dispatch(actions.renameRepoStart({ id: repoId, name: repoName }));

  const handleDeleteClick = async (repoId: string) =>
    dispatch(actions.deleteRepoStart({ id: repoId }));

  useEffect(() => {
    dispatch(actions.getAllReposStart());
  }, [dispatch]);

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
