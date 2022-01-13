import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export interface IProps {
  show: boolean;
  name?: string;
  onSubmit: (repoName: string) => void;
  onClose: () => void;
}

function RepoNameModal(props: IProps) {
  const { show, name, onSubmit, onClose } = props;
  const [repoName, setRepoName] = useState(name ?? '');
  const handleChangeName = (e: React.ChangeEvent<HTMLInputElement>) =>
    setRepoName(e.currentTarget.value);
  const handleSubmit = () => {
    onSubmit(repoName);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="repoName">
            <Form.Label>Repo name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter a name"
              onChange={handleChangeName}
              value={repoName}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Save Changes
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default RepoNameModal;
