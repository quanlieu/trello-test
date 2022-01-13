import { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export interface IProps {
  show: boolean;
  text?: string;
  note?: string;
  onSubmit: (text: string, note: string) => void;
  onClose: () => void;
}

function CardInfoModal(props: IProps) {
  const { show, onSubmit, onClose } = props;

  const [text, setText] = useState(props.text ?? '');
  const [note, setNote] = useState(props.note ?? '');
  const handleChangeText = (e: React.ChangeEvent<HTMLInputElement>) =>
    setText(e.currentTarget.value);
  const handleChangeNote = (e: React.ChangeEvent<HTMLInputElement>) =>
    setNote(e.currentTarget.value);
  const handleSubmit = () => {
    onSubmit(text, note);
    onClose();
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Modal heading</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="text">
            <Form.Label>Vulnerability Card content</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter card content"
              onChange={handleChangeText}
              value={text}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="text">
            <Form.Label>Vulnerability Card note</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter card note"
              onChange={handleChangeNote}
              value={note}
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

export default CardInfoModal;
